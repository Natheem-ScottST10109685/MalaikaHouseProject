import React, { useState } from "react";
import Modal from "../../common/Modal";
import { apiFetch } from "../../../lib/api";

export default function ClubCreateModal({ open, onClose, onCreated }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tier, setTier] = useState("");
  const [monthlyFee, setMonthlyFee] = useState("");
  const [sessions, setSessions] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await apiFetch("/admin/clubs", {
        method: "POST",
        body: JSON.stringify({
          name,
          description,
          tier,
          monthlyFee: parseFloat(monthlyFee) || 0,
          sessions: parseInt(sessions) || 0,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || "Failed to create club.");
      } else {
        const newClub = await res.json();
        onCreated?.(newClub);
        onClose();
      }
    } catch {
      setError("Network error.");
    } finally {
      setSaving(false);
    }
  }

  const footer = (
    <>
      <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-slate-100 hover:bg-slate-200">
        Cancel
      </button>
      <button type="submit" form="createClubForm" disabled={saving || !name}
        className="px-4 py-2 rounded bg-[#7B9BC4] text-white hover:bg-[#8DB4A8]">
        {saving ? "Saving..." : "Create Club"}
      </button>
    </>
  );

  return (
    <Modal open={open} onClose={onClose} title="Create New Club" footer={footer}>
      <form id="createClubForm" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Club Name</label>
          <input className="w-full border border-slate-300 p-2 rounded" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Description</label>
          <textarea className="w-full border border-slate-300 p-2 rounded" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Tier</label>
            <input className="w-full border border-slate-300 p-2 rounded" value={tier} onChange={(e) => setTier(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Monthly Fee (R)</label>
            <input type="number" className="w-full border border-slate-300 p-2 rounded" value={monthlyFee} onChange={(e) => setMonthlyFee(e.target.value)} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Sessions per Month</label>
          <input type="number" className="w-full border border-slate-300 p-2 rounded" value={sessions} onChange={(e) => setSessions(e.target.value)} />
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
      </form>
    </Modal>
  );
}
