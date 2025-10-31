import React from "react";

export default function PlansTable({ plans, onCreate, onEdit, onSubscribers, onDelete }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Subscription Plans</h2>
        <button className="px-4 py-2 bg-[#7B9BC4] text-white rounded-lg hover:bg-[#8DB4A8]" onClick={onCreate}>
          + Create Plan
        </button>
      </div>

      <div className="grid gap-3">
        {plans.map(p => (
          <div key={p.id} className="border rounded p-4 flex justify-between items-start">
            <div>
              <div className="font-semibold text-gray-800">{p.name}</div>
              <div className="text-sm text-gray-600">{p.description || "—"}</div>
              <div className="text-sm text-[#7B9BC4] mt-1">R{(p.price ?? 0).toFixed(2)} / {p.period}</div>
              <div className="text-xs text-gray-500 mt-1">
                Scope: {p.scope || "ALL"}
                {p.scope === "CLUB" && p.clubId && <> • Club: {p.club?.name || p.clubId}</>}
                {p.scope === "EVENT_TAG" && p.eventTag && <> • Tag: {p.eventTag}</>}
              </div>
              <div className="text-xs mt-1">
                <span className={`px-2 py-0.5 rounded ${p.active ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-700"}`}>
                  {p.active ? "Active" : "Inactive"}
                </span>{" "}
                • Auto-apply: <strong>{p.autoApplyEvents ? "Yes" : "No"}</strong>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="px-3 py-1 rounded bg-indigo-100 hover:bg-indigo-200 text-sm" onClick={() => onSubscribers?.(p)}>
                Subscribers
              </button>
              <button className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-sm" onClick={() => onEdit?.(p)}>
                Edit
              </button>
              <button className="px-3 py-1 rounded bg-red-100 hover:bg-red-200 text-red-700 text-sm" onClick={() => onDelete?.(p)}>
                Delete
              </button>
            </div>
          </div>
        ))}
        {plans.length === 0 && <div className="text-gray-500">No plans yet.</div>}
      </div>
    </div>
  );
}
