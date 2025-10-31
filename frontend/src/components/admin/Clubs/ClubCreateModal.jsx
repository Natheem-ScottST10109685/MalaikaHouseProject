import React, { useState } from "react";
import { apiFetch } from "../../../lib/api";

export default function ClubCreateModal({ open, onClose, onCreated }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tier, setTier] = useState("");
  const [monthlyFee, setMonthlyFee] = useState("");
  const [sessions, setSessions] = useState("");

  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);

  if (!open) return null;

  async function handleCreate() {
    setBusy(true); setErr(null);
    const body = {
      name,
      description: description || undefined,
      tier: tier || undefined,
      monthlyFee: monthlyFee !== "" ? Number(monthlyFee) : undefined,
      sessions: sessions !== "" ? Number(sessions) : undefined,
    };
    const res = await apiFetch("/admin/clubs", { method: "POST", body: JSON.stringify(body) });
    setBusy(false);
    if (!res.ok) {
      const e = await res.json().catch(() => ({}));
      setErr(e?.error || "Failed to create club");
      return;
    }
    const club = await res.json();
    onCreated?.(club);
    onClose?.();
  }

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Create Club</h3>
        {err && <div className="p-2 mb-3 text-sm bg-red-50 text-red-700 rounded">{err}</div>}

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input className="w-full border rounded p-2" value={name} onChange={(e)=>setName(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea className="w-full border rounded p-2" value={description} onChange={(e)=>setDescription(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tier (optional)</label>
            <input className="w-full border rounded p-2" value={tier} onChange={(e)=>setTier(e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Monthly Fee (optional)</label>
              <input className="w-full border rounded p-2" value={monthlyFee} onChange={(e)=>setMonthlyFee(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sessions (optional)</label>
              <input className="w-full border rounded p-2" value={sessions} onChange={(e)=>setSessions(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button className="px-3 py-2 rounded bg-slate-100 hover:bg-slate-200" onClick={onClose} disabled={busy}>Cancel</button>
          <button className="px-3 py-2 rounded bg-[#7B9BC4] text-white hover:bg-[#8DB4A8]" onClick={handleCreate} disabled={busy}>
            {busy ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
