import React, { useEffect, useState } from "react";
import { apiFetch } from "../../lib/api";

export default function ParentSettings() {
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);
  const [pwdMsg, setPwdMsg] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const r = await apiFetch("/parent/profile");
      if (!r.ok) return;
      const { user } = await r.json();
      if (alive && user?.email) setEmail(user.email);
    })();
    return () => { alive = false; };
  }, []);

  async function handleSaveEmail(e) {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      const r = await apiFetch("/parent/profile", {
        method: "PATCH",
        body: JSON.stringify({ email }),
      });
      if (!r.ok) throw new Error("Failed to update email");
      setMsg("Email updated");
    } catch (e) {
      setMsg(e?.message || "Failed to update email");
    } finally {
      setSaving(false);
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    setPwdMsg(null);
    const fd = new FormData(e.target);
    const currentPassword = String(fd.get("currentPassword") || "");
    const newPassword = String(fd.get("newPassword") || "");
    const confirmPassword = String(fd.get("confirmPassword") || "");
    if (newPassword !== confirmPassword) {
      setPwdMsg("New passwords do not match");
      return;
    }
    try {
      const r = await apiFetch("/parent/change-password", {
        method: "POST",
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      if (!r.ok) throw new Error("Failed to change password");
      setPwdMsg("Password changed successfully");
      e.target.reset();
    } catch (err) {
      setPwdMsg(err?.message || "Failed to change password");
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Email update */}
      <form onSubmit={handleSaveEmail} className="p-6 rounded-2xl border bg-white shadow-sm space-y-4">
        <h3 className="text-lg font-semibold">Account Email</h3>
        <label className="text-sm">Email
          <input
            className="mt-1 w-full rounded-xl border px-3 py-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl px-4 py-2 bg-indigo-600 text-white disabled:opacity-50"
          >
            Save
          </button>
          {msg && <p className="text-sm text-gray-600 self-center">{msg}</p>}
        </div>
      </form>

      {/* Change password */}
      <form onSubmit={handleChangePassword} className="p-6 rounded-2xl border bg-white shadow-sm space-y-4">
        <h3 className="text-lg font-semibold">Change Password</h3>
        <label className="text-sm">Current Password
          <input name="currentPassword" type="password" className="mt-1 w-full rounded-xl border px-3 py-2" required />
        </label>
        <label className="text-sm">New Password
          <input name="newPassword" type="password" className="mt-1 w-full rounded-xl border px-3 py-2" required />
        </label>
        <label className="text-sm">Confirm New Password
          <input name="confirmPassword" type="password" className="mt-1 w-full rounded-xl border px-3 py-2" required />
        </label>
        <button type="submit" className="rounded-xl px-4 py-2 bg-indigo-600 text-white">Update Password</button>
        {pwdMsg && <p className="text-sm text-gray-600">{pwdMsg}</p>}
      </form>
    </div>
  );
}