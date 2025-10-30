import React, { useEffect, useState } from "react";
import { apiFetch } from "../../../lib/api";

export default function AccountSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [me, setMe] = useState(null);

  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNew, setConfirmNew] = useState("");

  const [error, setError] = useState("");
  const [okMsg, setOkMsg] = useState("");

  useEffect(() => {
    let active = true;
    (async () => {
      const res = await apiFetch("/users/me");
      if (res.ok) {
        const data = await res.json();
        if (active) {
          setMe(data);
          setEmail(data.email || "");
        }
      }
      if (active) setLoading(false);
    })();
    return () => { active = false; };
  }, []);

  async function saveProfile(e) {
    e.preventDefault();
    setError(""); setOkMsg("");
    setSaving(true);
    try {
      const res = await apiFetch("/users/me", {
        method: "PATCH",
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data?.error?.code === "EMAIL_TAKEN") setError("That email is already in use.");
        else setError(data?.error?.code || "Failed to update profile.");
        return;
      }
      const updated = await res.json();
      setOkMsg("Profile updated.");
      setMe(updated);
    } finally {
      setSaving(false);
    }
  }

  async function changePassword(e) {
    e.preventDefault();
    setError(""); setOkMsg("");
    if (!currentPassword || !newPassword) return setError("Enter current and new password.");
    if (newPassword !== confirmNew) return setError("New passwords do not match.");
    setSaving(true);
    try {
      const res = await apiFetch("/users/me", {
        method: "PATCH",
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data?.error?.code === "CURRENT_PASSWORD_INCORRECT") setError("Current password is incorrect.");
        else setError(data?.error?.code || "Failed to change password.");
        return;
      }
      await res.json();
      setOkMsg("Password changed.");
      setCurrentPassword(""); setNewPassword(""); setConfirmNew("");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="p-6">Loading…</div>;

  return (
    <div className="grid gap-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>
        <form onSubmit={saveProfile} className="grid gap-4 max-w-lg">
          <div>
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="text-sm text-slate-500">
            Role: <span className="font-medium">{me?.role}</span>
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}
          {okMsg && <div className="text-sm text-emerald-600">{okMsg}</div>}

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
            >
              {saving ? "Saving…" : "Save Profile"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow p-6 max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={changePassword} className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Current Password</label>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">New Password</label>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Confirm New Password</label>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={confirmNew}
              onChange={e => setConfirmNew(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}
          {okMsg && <div className="text-sm text-emerald-600">{okMsg}</div>}

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
            >
              {saving ? "Updating…" : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
