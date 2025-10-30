import React, { useEffect, useState } from "react";
import { apiFetch } from "../../../lib/api";
import SubscribeModal from "./SubscribeModal";

export default function ParentSubscriptions({ childrenList, onChanged }) {
  const [plans, setPlans] = useState([]);
  const [activeSubs, setActiveSubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [busyById, setBusyById] = useState({});
  const [errMsg, setErrMsg] = useState(null);

  async function loadPlans() {
    const r = await apiFetch("/parent/subscriptions/plans");
    if (r.ok) {
      setPlans(await r.json());
    } else {
      setErrMsg("Failed to load plans.");
    }
  }

  async function loadActive() {
    const r = await apiFetch("/parent/subscriptions/active");
    if (r.ok) {
      const data = await r.json();
      setActiveSubs(data.items || []);
    } else {
      setErrMsg("Failed to load your subscriptions.");
    }
  }

  useEffect(() => {
    (async () => {
      await Promise.all([loadPlans(), loadActive()]);
      setLoading(false);
    })();
  }, []);

  function openSubscribe(plan) {
    setSelectedPlan(plan);
    setModalOpen(true);
  }

  async function toggleAutoRenew(subId, nextValue) {
    try {
      setBusyById((m) => ({ ...m, [subId]: true }));
      const res = await apiFetch(`/parent/subscriptions/${subId}/auto-renew`, {
        method: "PATCH",
        body: JSON.stringify({ autoRenew: nextValue }),
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        setErrMsg(e?.error || "Failed to update auto-renew.");
        return;
      }
      setActiveSubs((prev) => prev.map(s => s.id === subId ? { ...s, autoRenew: nextValue } : s));
      onChanged?.();
    } finally {
      setBusyById((m) => ({ ...m, [subId]: false }));
    }
  }

  async function cancelSubscription(subId) {
    if (!confirm("Cancel this subscription?")) return;
    try {
      setBusyById((m) => ({ ...m, [subId]: true }));
      const res = await apiFetch(`/parent/subscriptions/${subId}/cancel`, { method: "POST" });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        setErrMsg(e?.error || "Failed to cancel subscription.");
        return;
      }
      setActiveSubs((prev) =>
        prev.map((s) => (s.id === subId ? { ...s, status: "CANCELLED", autoRenew: false, endDate: new Date().toISOString() } : s))
      );
      onChanged?.();
    } finally {
      setBusyById((m) => ({ ...m, [subId]: false }));
    }
  }

  if (loading) return <div className="text-gray-600">Loading subscriptions...</div>;

  return (
    <div className="space-y-6">
      {errMsg && (
        <div className="p-3 rounded bg-red-50 text-red-700">{errMsg}</div>
      )}

      {/* Active Subscriptions */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-[#5D5A7A] mb-4">
          Your Active Subscriptions
        </h2>

        {activeSubs.length === 0 && (
          <div className="text-sm text-gray-500">
            You don’t have any active subscriptions.
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {activeSubs.map((sub) => {
            const nextBill = sub.nextBillingAt
              ? new Date(sub.nextBillingAt).toLocaleDateString()
              : "—";
            const childrenNames =
              (sub.children || [])
                .map((c) =>
                  [c.child?.firstName, c.child?.lastName]
                    .filter(Boolean)
                    .join(" ")
                )
                .filter(Boolean)
                .join(", ") || "—";
            const busy = !!busyById[sub.id];

            const renewLine = sub.autoRenew
              ? `Renews ${sub.periodLabel} on ${nextBill}`
              : sub.endDate
              ? `Ends on ${new Date(sub.endDate).toLocaleDateString()}`
              : "Not renewing";

            return (
              <div
                key={sub.id}
                className="border rounded-lg p-4 bg-slate-50 shadow-sm"
              >
                <div className="font-semibold text-gray-800">
                  {sub.plan?.name}
                </div>
                <div className="text-sm text-gray-600">
                  {sub.plan?.description}
                </div>

                <div className="mt-2 text-sm text-[#7B9BC4]">
                  R{sub.plan?.price?.toFixed(2)} / {sub.plan?.period}
                </div>

                <div className="mt-3 text-xs text-gray-500">
                  Children: {childrenNames}
                </div>

                <div className="mt-1 text-xs text-gray-500">{renewLine}</div>

                <div className="mt-2 text-xs">
                  <span
                    className={`px-2 py-1 rounded-full ${
                      sub.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {sub.status}
                  </span>{" "}
                  • Auto-renew: <strong>{sub.autoRenew ? "On" : "Off"}</strong>
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-sm disabled:opacity-60"
                    onClick={() => toggleAutoRenew(sub.id, !sub.autoRenew)}
                    disabled={busy || sub.status !== "ACTIVE"}
                  >
                    {sub.autoRenew ? "Disable Auto-renew" : "Enable Auto-renew"}
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-red-100 hover:bg-red-200 text-red-700 text-sm disabled:opacity-60"
                    onClick={() => cancelSubscription(sub.id)}
                    disabled={busy || sub.status !== "ACTIVE"}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>  {/* <-- closes Active Subscriptions card */}

      {/* Available Plans */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#5D5A7A]">
            Available Plans
          </h2>
          <button
            onClick={loadPlans}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
          >
            Refresh
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.id} className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="font-semibold text-gray-800">{plan.name}</div>
              <div className="text-sm text-gray-600 mb-2">{plan.description}</div>
              <div className="text-sm text-[#7B9BC4] mb-2">
                R{plan.price?.toFixed(2)} / {plan.period}
              </div>
              <div className="text-xs text-gray-500 mb-3">
                Max children: {plan.maxChildren ?? "Unlimited"}
              </div>
              <button
                className="px-4 py-2 bg-[#7B9BC4] text-white rounded-lg hover:bg-[#8DB4A8] transition"
                onClick={() => openSubscribe(plan)}
              >
                Subscribe
              </button>
            </div>
          ))}

          {plans.length === 0 && (
            <div className="text-sm text-gray-500">
              No subscription plans available.
            </div>
          )}
        </div>
      </div>

      {/* Subscribe Modal */}
      <SubscribeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        plan={selectedPlan}
        childrenList={childrenList}
        onSubscribed={async () => {
          setModalOpen(false);
          await loadActive();
          onChanged?.();
        }}
      />
    </div>
  );
}
