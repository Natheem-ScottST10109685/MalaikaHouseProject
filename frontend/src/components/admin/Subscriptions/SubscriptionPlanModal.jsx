import React, { useEffect, useState } from "react";
import Modal from "../../common/Modal";
import { apiFetch } from "../../../lib/api";

export default function SubscriptionPlanModal({ open, onClose, onSaved, plan=null }) {
  const isEdit = !!plan;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [period, setPeriod] = useState("monthly");
  const [durationMonths, setDurationMonths] = useState("");
  const [maxChildren, setMaxChildren] = useState("");
  const [autoApplyEvents, setAutoApplyEvents] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (plan) {
      setName(plan.name ?? "");
      setDescription(plan.description ?? "");
      setPrice(String(plan.price ?? ""));
      setPeriod(plan.period ?? "monthly");
      setDurationMonths(plan.durationMonths ?? "");
      setMaxChildren(plan.maxChildren ?? "");
      setAutoApplyEvents(!!plan.autoApplyEvents);
    } else {
      setName("");
      setDescription("");
      setPrice("");
      setPeriod("monthly");
      setDurationMonths("");
      setMaxChildren("");
      setAutoApplyEvents(true);
    }
    setError("");
  }, [plan, open]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const body = {
      name,
      description: description || undefined,
      price: Number(price),
      period,
      durationMonths: durationMonths ? Number(durationMonths) : undefined,
      maxChildren: maxChildren ? Number(maxChildren) : undefined,
      autoApplyEvents,
    };

    try {
      const res = await apiFetch(isEdit ? `/admin/subscriptions/${plan.id}` : `/admin/subscriptions`, {
        method: isEdit ? "PATCH" : "POST",
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || "Failed to save plan");
      }
      const saved = await res.json();
      onSaved?.(saved);
      onClose();
    } catch (e) {
      setError(e.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  const footer = (
    <>
      <button className="px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200" onClick={onClose} disabled={saving}>
        Cancel
      </button>
      <button
        type="submit"
        form="planForm"
        className="px-4 py-2 rounded-md bg-[#7B9BC4] text-white hover:bg-[#8DB4A8]"
        disabled={saving}
      >
        {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Plan"}
      </button>
    </>
  );

  return (
    <Modal open={open} onClose={onClose} title={isEdit ? "Edit Subscription Plan" : "Create Subscription Plan"} footer={footer}>
      <form id="planForm" onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-sm text-red-600">{error}</div>}

        <div>
          <label className="block text-sm font-medium text-slate-700">Name</label>
          <input
            className="mt-1 w-full border border-slate-300 rounded-md p-2"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Description</label>
          <textarea
            className="mt-1 w-full border border-slate-300 rounded-md p-2"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-700">Price (R)</label>
            <input
              type="number"
              step="0.01"
              className="mt-1 w-full border border-slate-300 rounded-md p-2"
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Period</label>
            <select
              className="mt-1 w-full border border-slate-300 rounded-md p-2"
              value={period}
              onChange={(e)=>setPeriod(e.target.value)}
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Duration (months)</label>
            <input
              type="number"
              className="mt-1 w-full border border-slate-300 rounded-md p-2"
              value={durationMonths}
              onChange={(e)=>setDurationMonths(e.target.value)}
              placeholder="optional"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Max Children</label>
            <input
              type="number"
              className="mt-1 w-full border border-slate-300 rounded-md p-2"
              value={maxChildren}
              onChange={(e)=>setMaxChildren(e.target.value)}
              placeholder="optional"
            />
          </div>
        </div>

        <label className="inline-flex items-center gap-2">
          <input type="checkbox" checked={autoApplyEvents} onChange={(e)=>setAutoApplyEvents(e.target.checked)} />
          <span className="text-sm text-slate-700">Auto-apply to future events</span>
        </label>
      </form>
    </Modal>
  );
}
