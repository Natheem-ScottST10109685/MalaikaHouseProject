import React, { useState, useEffect } from "react";
import Modal from "../../common/Modal";
import { apiFetch } from "../../../lib/api";

export default function ChildModal({ open, onClose, child, mode = "view", onUpdated, onDeleted }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", dateOfBirth: "", grade: "", notes: "", isActive: true, parentEmail: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (child) {
      setForm({
        firstName: child.firstName || "",
        lastName: child.lastName || "",
        dateOfBirth: child.dateOfBirth ? child.dateOfBirth.slice(0,10) : "",
        grade: child.grade || "",
        notes: child.notes || "",
        isActive: !!child.isActive,
        parentEmail: child.parent?.email || "",
      });
    }
  }, [child]);

  if (!child) return null;
  const readOnly = mode === "view";

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true); setError("");
    try {
      const res = await apiFetch(`/admin/children/${child.id}`, {
        method: "PATCH",
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(()=>({}));
        setError(data?.error || "Failed to update student.");
        return;
      }
      const updated = await res.json();
      onUpdated?.(updated);
      onClose();
    } catch {
      setError("Network error.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDisable() {
    if (!confirm(`Disable ${child.firstName} ${child.lastName}?`)) return;
    setSaving(true);
    try {
      const res = await apiFetch(`/admin/children/${child.id}/disable`, { method: "POST" });
      if (!res.ok) throw new Error();
      onUpdated?.({ ...child, isActive: false });
      onClose();
    } catch { setError("Failed to disable student."); }
    finally { setSaving(false); }
  }

  async function handleDelete() {
    if (!confirm(`Permanently delete ${child.firstName} ${child.lastName}?`)) return;
    setSaving(true);
    try {
      const res = await apiFetch(`/admin/children/${child.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      onDeleted?.(child.id);
      onClose();
    } catch { setError("Failed to delete student."); }
    finally { setSaving(false); }
  }

  const footer = (
    <>
      <button onClick={onClose} className="px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200">Close</button>
      {mode === "edit" && (
        <button form="childEditForm" type="submit" disabled={saving} className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">
          {saving ? "Saving..." : "Save Changes"}
        </button>
      )}
    </>
  );

  return (
    <Modal open={open} onClose={onClose} title={`${mode === "edit" ? "Edit" : "View"} Student`} footer={footer}>
      <form id="childEditForm" onSubmit={handleSave} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-700">First name</label>
            <input disabled={readOnly} className="mt-1 w-full border rounded p-2" value={form.firstName} onChange={e=>setForm(f=>({...f, firstName:e.target.value}))} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Last name</label>
            <input disabled={readOnly} className="mt-1 w-full border rounded p-2" value={form.lastName} onChange={e=>setForm(f=>({...f, lastName:e.target.value}))} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-700">Date of Birth</label>
            <input type="date" disabled={readOnly} className="mt-1 w-full border rounded p-2" value={form.dateOfBirth} onChange={e=>setForm(f=>({...f, dateOfBirth:e.target.value}))} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Grade</label>
            <input disabled={readOnly} className="mt-1 w-full border rounded p-2" value={form.grade} onChange={e=>setForm(f=>({...f, grade:e.target.value}))} />
          </div>
          <div className="flex items-center gap-2">
            <input id="active" type="checkbox" disabled={readOnly} checked={form.isActive} onChange={e=>setForm(f=>({...f, isActive:e.target.checked}))} />
            <label htmlFor="active" className="text-sm text-slate-700">Active</label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Parent Email</label>
          <input type="email" disabled={readOnly} className="mt-1 w-full border rounded p-2" value={form.parentEmail} onChange={e=>setForm(f=>({...f, parentEmail:e.target.value}))} />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Notes</label>
          <textarea disabled={readOnly} className="mt-1 w-full border rounded p-2" rows={3} value={form.notes} onChange={e=>setForm(f=>({...f, notes:e.target.value}))} />
        </div>

        {error && <div className="text-sm text-red-600">{error}</div>}

        {mode === "edit" && (
          <div className="flex justify-between mt-6 pt-4 border-t border-slate-200">
            <button type="button" onClick={handleDisable} disabled={!child.isActive || saving} className="px-3 py-2 rounded-md bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Disable</button>
            <button type="button" onClick={handleDelete} disabled={saving} className="px-3 py-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200">Delete</button>
          </div>
        )}
      </form>
    </Modal>
  );
}
