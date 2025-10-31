import React, { useState, useEffect } from "react";
import { apiFetch } from "../../../lib/api";

export default function ParentSettingsForm({ me, onUpdated }) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);

  const [emailForm, setEmailForm] = useState({ email: me?.email || "" });
  const [pwdForm, setPwdForm] = useState({ currentPassword: "", newPassword: "", confirm: "" });

  useEffect(() => {
    if (me?.email) setEmailForm({ email: me.email });
  }, [me]);

  async function submitEmail() {
    setBusy(true); setMsg(null);
    const res = await apiFetch("/parent/profile", {
      method: "PATCH",
      body: JSON.stringify({ email: emailForm.email }),
    });
    setBusy(false);
    if (!res.ok) {
      const e = await res.json().catch(() => ({}));
      setMsg({ type: "error", text: e?.error || "Failed to update email" });
      return;
    }
    const { user } = await res.json();
    onUpdated?.(user);
    setMsg({ type: "ok", text: "Email updated successfully." });
  }

  async function submitPassword() {
    if (pwdForm.newPassword !== pwdForm.confirm) {
      setMsg({ type: "warn", text: "New password and confirmation do not match." });
      return;
    }
    setBusy(true); setMsg(null);
    const res = await apiFetch("/parent/change-password", {
      method: "POST",
      body: JSON.stringify({
        currentPassword: pwdForm.currentPassword,
        newPassword: pwdForm.newPassword,
      }),
    });
    setBusy(false);
    if (!res.ok) {
      const e = await res.json().catch(() => ({}));
      setMsg({ type: "error", text: e?.error || "Failed to change password" });
      return;
    }
    setPwdForm({ currentPassword: "", newPassword: "", confirm: "" });
    setMsg({ type: "ok", text: "Password changed successfully." });
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-8">
      <h2 className="text-xl font-semibold">Account Settings</h2>

      {msg && (
        <div className={`p-3 rounded ${
          msg.type === "ok" ? "bg-green-50 text-green-700"
          : msg.type === "warn" ? "bg-yellow-50 text-yellow-700"
          : "bg-red-50 text-red-700"
        }`}>
          {msg.text}
        </div>
      )}

      <div className="border rounded-lg p-4">
        <div className="font-medium mb-3">Update Email</div>
        <div className="grid sm:grid-cols-[1fr_auto] gap-3">
          <input
            className="border rounded p-2"
            type="email"
            value={emailForm.email}
            onChange={(e)=>setEmailForm({ email: e.target.value })}
          />
          <button
            className="px-4 py-2 bg-[#7B9BC4] text-white rounded-lg hover:bg-[#8DB4A8] disabled:opacity-60"
            onClick={submitEmail}
            disabled={busy || !emailForm.email}
          >
            {busy ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <div className="font-medium mb-3">Change Password</div>
        <div className="grid gap-3 sm:grid-cols-3">
          <input
            className="border rounded p-2"
            type="password"
            placeholder="Current"
            value={pwdForm.currentPassword}
            onChange={(e)=>setPwdForm(f=>({...f, currentPassword:e.target.value}))}
          />
          <input
            className="border rounded p-2"
            type="password"
            placeholder="New"
            value={pwdForm.newPassword}
            onChange={(e)=>setPwdForm(f=>({...f, newPassword:e.target.value}))}
          />
          <input
            className="border rounded p-2"
            type="password"
            placeholder="Confirm"
            value={pwdForm.confirm}
            onChange={(e)=>setPwdForm(f=>({...f, confirm:e.target.value}))}
          />
        </div>
        <div className="mt-3">
          <button
            className="px-4 py-2 bg-[#7B9BC4] text-white rounded-lg hover:bg-[#8DB4A8] disabled:opacity-60"
            onClick={submitPassword}
            disabled={busy || !pwdForm.currentPassword || !pwdForm.newPassword || !pwdForm.confirm}
          >
            {busy ? "Saving…" : "Change Password"}
          </button>
        </div>
      </div>
    </div>
  );
}
