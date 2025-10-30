import React, { useEffect, useState } from "react";
import Modal from "../../common/Modal";
import { apiFetch } from "../../../lib/api";

export default function PlanSubscribersModal({ open, onClose, plan }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    if (!plan?.id) return;
    setLoading(true);
    const res = await apiFetch(`/admin/subscriptions/${plan.id}/subscribers`);
    if (res.ok) {
      setItems(await res.json());
    }
    setLoading(false);
  }

  useEffect(() => { if (open) load(); }, [open, plan?.id]);

  const footer = (
    <button className="px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200" onClick={onClose}>
      Close
    </button>
  );

  return (
    <Modal open={open} onClose={onClose} title={`Subscribers – ${plan?.name ?? ""}`} footer={footer}>
      {loading && <div className="text-sm text-slate-600">Loading…</div>}
      {!loading && items.length === 0 && <div className="text-sm text-slate-600">No subscribers yet.</div>}

      {!loading && items.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Children</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map(sub => (
                <tr key={sub.id}>
                  <td className="px-4 py-2 text-sm text-gray-900">{sub.parent?.email}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {(sub.children || []).map(ch => ch.child?.firstName + " " + ch.child?.lastName).join(", ")}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">{sub.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Modal>
  );
}
