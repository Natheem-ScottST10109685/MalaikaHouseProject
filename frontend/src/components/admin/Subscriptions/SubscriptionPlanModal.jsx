import React, { useEffect, useState } from "react";
import { apiFetch } from "../../../lib/api";

export default function SubscriptionPlanModal({ open, onClose, plan, onSaved }) {
  const isEdit = !!plan;
  const [clubs, setClubs] = useState([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);

  const [form, setForm] = useState({
    name: plan?.name ?? "",
    description: plan?.description ?? "",
    price: plan?.price ?? 0,
    period: plan?.period ?? "monthly",
    durationMonths: plan?.durationMonths ?? "",
    maxChildren: plan?.maxChildren ?? "",
    autoApplyEvents: plan?.autoApplyEvents ?? true,
    active: plan?.active ?? true,

    scope: plan?.scope ?? "ALL",
    clubId: plan?.clubId ?? "",
    eventTag: plan?.eventTag ?? "",
  });

  useEffect(() => {
    if (!open) return;
    (async () => {
      const r = await apiFetch("/admin/clubs?active=true");
      if (r.ok) setClubs(await r.json());
    })();
  }, [open]);

  if (!open) return null;

  async function handleSave() {
    setBusy(true); setErr(null);
    const payload = {
      ...form,
      price: Number(form.price),
      durationMonths: form.durationMonths ? Number(form.durationMonths) : null,
      maxChildren: form.maxChildren ? Number(form.maxChildren) : null,
      clubId: form.scope === "CLUB" ? (form.clubId || null) : null,
      eventTag: form.scope === "EVENT_TAG" ? (form.eventTag || null) : null,
    };
    const url = isEdit ? `/admin/subscriptions/${plan.id}` : "/admin/subscriptions";
    const method = isEdit ? "PATCH" : "POST";
    const res = await apiFetch(url, { method, body: JSON.stringify(payload) });
    setBusy(false);
    if (!res.ok) {
      const e = await res.json().catch(()=>({}));
      setErr(e?.error || "Save failed");
      return;
    }
    onSaved?.();
    onClose?.();
  }

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">{isEdit ? "Edit Plan" : "Create Plan"}</h3>
        {err && <div className="p-2 mb-3 text-sm bg-red-50 text-red-700 rounded">{err}</div>}

        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input className="w-full border rounded p-2" value={form.name}
              onChange={(e)=>setForm({...form, name: e.target.value})}/>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input className="w-full border rounded p-2" value={form.price}
              onChange={(e)=>setForm({...form, price: e.target.value})}/>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea className="w-full border rounded p-2" value={form.description}
              onChange={(e)=>setForm({...form, description: e.target.value})}/>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Period</label>
            <select className="w-full border rounded p-2" value={form.period}
              onChange={(e)=>setForm({...form, period: e.target.value})}>
              <option value="monthly">monthly</option>
              <option value="quarterly">quarterly</option>
              <option value="yearly">yearly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Duration (months)</label>
            <input className="w-full border rounded p-2" value={form.durationMonths}
              onChange={(e)=>setForm({...form, durationMonths: e.target.value})}/>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Max children</label>
            <input className="w-full border rounded p-2" value={form.maxChildren}
              onChange={(e)=>setForm({...form, maxChildren: e.target.value})}/>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Scope</label>
            <select className="w-full border rounded p-2" value={form.scope}
              onChange={(e)=>setForm({...form, scope: e.target.value})}>
              <option value="ALL">ALL</option>
              <option value="CLUB">CLUB</option>
              <option value="EVENT_TAG">EVENT_TAG</option>
            </select>
          </div>

          {form.scope === "CLUB" && (
            <div>
              <label className="block text-sm font-medium mb-1">Club</label>
              <select className="w-full border rounded p-2" value={form.clubId}
                onChange={(e)=>setForm({...form, clubId: e.target.value})}>
                <option value="">Select club…</option>
                {clubs.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          )}

          {form.scope === "EVENT_TAG" && (
            <div>
              <label className="block text-sm font-medium mb-1">Event tag (matches Event.type)</label>
              <input className="w-full border rounded p-2" value={form.eventTag}
                onChange={(e)=>setForm({...form, eventTag: e.target.value})}/>
            </div>
          )}

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="rounded" checked={form.autoApplyEvents}
              onChange={(e)=>setForm({...form, autoApplyEvents: e.target.checked})} />
            Auto-apply future events
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="rounded" checked={form.active}
              onChange={(e)=>setForm({...form, active: e.target.checked})} />
            Active
          </label>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button className="px-3 py-2 rounded bg-slate-100 hover:bg-slate-200" onClick={onClose} disabled={busy}>Cancel</button>
          <button className="px-3 py-2 rounded bg-[#7B9BC4] text-white hover:bg-[#8DB4A8]" onClick={handleSave} disabled={busy}>
            {busy ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
