import React from "react";

export default function PlansTable({ plans, onCreate, onEdit, onSubscribers, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Subscription Plans</h2>
        <button
          className="px-4 py-2 bg-[#7B9BC4] text-white rounded-lg hover:bg-[#8DB4A8]"
          onClick={onCreate}
        >
          + Create Plan
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Children</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Auto Apply</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {plans.map(p => (
              <tr key={p.id}>
                <td className="px-4 py-3 text-sm text-gray-900">{p.name}</td>
                <td className="px-4 py-3 text-sm text-gray-700">R{(p.price ?? 0).toFixed(2)}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{p.period}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{p.maxChildren ?? "—"}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{p.autoApplyEvents ? "Yes" : "No"}</td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex gap-2">
                    <button className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200" onClick={()=>onSubscribers(p)}>
                      Subscribers
                    </button>
                    <button className="px-3 py-1 rounded bg-indigo-100 hover:bg-indigo-200" onClick={()=>onEdit(p)}>
                      Edit
                    </button>
                    <button className="px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200" onClick={()=>onDelete(p)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {plans.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">No plans yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
