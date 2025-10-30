import React, { useEffect, useState } from "react";
import { apiFetch } from "../../../lib/api";
import SubscribeModal from "./SubscribeModal";

export default function ParentSubscriptions({ childrenList }) {
  const [plans, setPlans] = useState([]);
  const [activeSubs, setActiveSubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  async function loadPlans() {
    const r = await apiFetch("/parent/subscriptions/plans");
    if (r.ok) setPlans(await r.json());
  }

  async function loadActive() {
    const r = await apiFetch("/parent/subscriptions/active");
    if (r.ok) setActiveSubs(await r.json());
  }

  useEffect(() => {
    Promise.all([loadPlans(), loadActive()]).then(() => setLoading(false));
  }, []);

  function openSubscribe(plan) {
    setSelectedPlan(plan);
    setModalOpen(true);
  }

  if (loading) {
    return <div className="text-gray-600">Loading subscriptions...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-[#5D5A7A] mb-4">Your Active Subscriptions</h2>

        {activeSubs.length === 0 && (
          <div className="text-sm text-gray-500">You don’t have any active subscriptions.</div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {activeSubs.map(sub => (
            <div key={sub.id} className="border rounded-lg p-4 bg-slate-50 shadow-sm">
              <div className="font-semibold text-gray-800">{sub.plan?.name}</div>
              <div className="text-sm text-gray-600">{sub.plan?.description}</div>
              <div className="mt-2 text-sm text-[#7B9BC4]">
                R{sub.plan?.price?.toFixed(2)} / {sub.plan?.period}
              </div>
              <div className="mt-3 text-xs text-gray-500">
                Children: {(sub.children || []).map(c => c.child?.firstName).join(", ") || "—"}
              </div>
              <div className="mt-2 text-xs text-green-600">Status: {sub.status}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#5D5A7A]">Available Plans</h2>
          <button
            onClick={loadPlans}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
          >
            Refresh
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map(plan => (
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
            <div className="text-sm text-gray-500">No subscription plans available.</div>
          )}
        </div>
      </div>

      {/* Modal */}
      <SubscribeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        plan={selectedPlan}
        childrenList={childrenList}
        onSubscribed={() => {
          setModalOpen(false);
          loadActive();
        }}
      />
    </div>
  );
}
