import React, { useState } from "react";
import Modal from "../../common/Modal";
import { apiFetch } from "../../../lib/api";

export default function UserModal({ open, onClose, user, mode, onUserUpdated, onUserDeleted }) {
  const [email, setEmail] = useState(user?.email ?? "");
  const [role, setRole] = useState(user?.role ?? "PARENT");
  const [isActive, setIsActive] = useState(user?.isActive ?? true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  if (!user) return null;

  const readOnly = mode === "view";

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await apiFetch(`/admin/users/${user.id}`, {
        method: "PUT",
        body: JSON.stringify({ email, role, isActive }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || "Failed to update user.");
      } else {
        const updated = await res.json();
        onUserUpdated?.(updated);
        onClose();
      }
    } catch (err) {
      setError("Network error.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDisable() {
    if (!confirm(`Disable ${user.email}?`)) return;
    setSaving(true);
    try {
      const res = await apiFetch(`/admin/users/${user.id}/disable`, { method: "POST" });
      if (!res.ok) throw new Error("Failed");
      onUserUpdated?.({ ...user, isActive: false });
      onClose();
    } catch {
      setError("Failed to disable user.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm(`Permanently delete ${user.email}?`)) return;
    setSaving(true);
    try {
      const res = await apiFetch(`/admin/users/${user.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      onUserDeleted?.(user.id);
      onClose();
    } catch {
      setError("Failed to delete user.");
    } finally {
      setSaving(false);
    }
  }

  const footer = (
    <>
      <button onClick={onClose} className="px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200">
        Close
      </button>
      {!readOnly && (
        <button
          form="userForm"
          type="submit"
          disabled={saving}
          className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      )}
    </>
  );

  return (
    <Modal open={open} onClose={onClose} title={`${mode === "edit" ? "Edit" : "View"} User`} footer={footer}>
      <form id="userForm" onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            disabled={readOnly}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full border border-slate-300 rounded-md p-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Role</label>
          <select
            disabled={readOnly}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 w-full border border-slate-300 rounded-md p-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="PARENT">Internal Parent</option>
            <option value="PARTNER">External Partner</option>
            <option value="STAFF">Staff Member</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isActive}
            disabled={readOnly}
            onChange={(e) => setIsActive(e.target.checked)}
            id="active"
          />
          <label htmlFor="active" className="text-sm text-slate-700">Active</label>
        </div>

        {error && <div className="text-sm text-red-600">{error}</div>}

        {mode === "edit" && (
          <div className="flex justify-between mt-6 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={handleDisable}
              disabled={!user.isActive || saving}
              className="px-3 py-2 rounded-md bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
            >
              Disable
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={saving}
              className="px-3 py-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200"
            >
              Delete
            </button>
          </div>
        )}
      </form>
    </Modal>
  );
}
