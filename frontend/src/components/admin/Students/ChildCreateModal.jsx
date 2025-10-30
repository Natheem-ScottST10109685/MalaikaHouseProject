import React, { useState } from "react";
import Modal from "../../common/Modal";
import { apiFetch } from "../../../lib/api";

export default function ChildCreateModal({ open, onClose, onCreated }) {
  const [firstName, setFirst] = useState("");
  const [lastName, setLast] = useState("");
  const [dateOfBirth, setDob] = useState("");
  const [grade, setGrade] = useState("");
  const [notes, setNotes] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true); setError("");
    try {
      const res = await apiFetch("/admin/children", {
        method: "POST",
        body: JSON.stringify({ firstName, lastName, dateOfBirth, grade, notes, parentEmail }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || "Failed to create student");
        return;
      }
      const child = await res.json();
      onCreated?.(child);
      onClose();
    } catch {
      setError("Network error.");
    } finally {
      setSaving(false);
    }
  }

  const footer = (
    <>
      <button className="px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200" onClick={onClose} disabled={saving}>Cancel</button>
      <button form="childCreateForm" type="submit" className="px-4 py-2 rounded-md bg-[#7B9BC4] text-white hover:bg-[#8DB4A8]" disabled={saving || !firstName || !lastName || !parentEmail}>
        {saving ? "Creating..." : "Create Student"}
      </button>
    </>
  );

  return (
    <Modal open={open} onClose={onClose} title="Add Student" footer={footer}>
      <form id="childCreateForm" onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-700">First name</label>
            <input className="mt-1 w-full border rounded p-2" value={firstName} onChange={e=>setFirst(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Last name</label>
            <input className="mt-1 w-full border rounded p-2" value={lastName} onChange={e=>setLast(e.target.value)} required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-700">Date of Birth</label>
            <input type="date" className="mt-1 w-full border rounded p-2" value={dateOfBirth} onChange={e=>setDob(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Grade</label>
            <input className="mt-1 w-full border rounded p-2" value={grade} onChange={e=>setGrade(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Parent Email</label>
            <input type="email" className="mt-1 w-full border rounded p-2" value={parentEmail} onChange={e=>setParentEmail(e.target.value)} required />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Notes</label>
          <textarea className="mt-1 w-full border rounded p-2" rows={3} value={notes} onChange={e=>setNotes(e.target.value)} />
        </div>

        {error && <div className="text-sm text-red-600">{error}</div>}
      </form>
    </Modal>
  );
}
