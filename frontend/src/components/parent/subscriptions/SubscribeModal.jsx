import React, { useState } from "react";
import Modal from "../../common/Modal";
import { apiFetch } from "../../../lib/api";

export default function SubscribeModal({ open, onClose, plan, childrenList, onSubscribed }) {
  const [selectedChildIds, setSelectedChildIds] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function toggleChild(id) {
    setSelectedChildIds(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  }

  async function handleSubscribe() {
    if (selectedChildIds.length === 0) {
      setError("Please select at least one child.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const res = await apiFetch("/parent/subscriptions", {
        method: "POST",
        body: JSON.stringify({ planId: plan.id, childIds: selectedChildIds }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || "Failed to subscribe.");
      }
      setSuccess(true);
      onSubscribed?.();
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  const footer = (
    <>
      <button
        onClick={onClose}
        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-md"
        disabled={saving}
      >
        Cancel
      </button>
      <button
        onClick={handleSubscribe}
        className="px-4 py-2 bg-[#7B9BC4] text-white hover:bg-[#8DB4A8] rounded-md"
        disabled={saving}
      >
        {saving ? "Subscribing…" : "Subscribe"}
      </button>
    </>
  );

  return (
    <Modal open={open} onClose={onClose} title={`Subscribe to ${plan?.name || ""}`} footer={footer}>
      {error && <div className="text-sm text-red-600 mb-3">{error}</div>}
      {success && <div className="text-sm text-green-600 mb-3">Subscribed successfully!</div>}

      <div className="space-y-4">
        <div>
          <div className="font-semibold text-gray-800">{plan?.name}</div>
          <div className="text-sm text-gray-500">{plan?.description}</div>
          <div className="mt-1 text-sm text-[#7B9BC4] font-medium">
            R{plan?.price?.toFixed(2)} / {plan?.period}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-700 mb-1">Select Children</h4>
          {childrenList.length === 0 ? (
            <div className="text-sm text-gray-500">
              No children linked to your account. Please contact admin.
            </div>
          ) : (
            <div className="space-y-2">
              {childrenList.map(c => (
                <label
                  key={c.id}
                  className="flex items-center gap-2 border p-2 rounded-md hover:bg-slate-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedChildIds.includes(c.id)}
                    onChange={() => toggleChild(c.id)}
                  />
                  <span>{c.firstName} {c.lastName}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
