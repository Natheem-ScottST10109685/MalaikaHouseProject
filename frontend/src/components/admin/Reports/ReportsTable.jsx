import React from "react";

export default function ReportsTable({ rows, onEdit, onDelete, loading }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#5D5A7A]">Student Reports</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              {["Child","Event","Score","Created By","Date","Actions"].map(h => (
                <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading && (
              <tr><td colSpan={6} className="px-6 py-4 text-center text-gray-500">Loading…</td></tr>
            )}
            {!loading && rows.length === 0 && (
              <tr><td colSpan={6} className="px-6 py-4 text-center text-gray-500">No reports found.</td></tr>
            )}
            {!loading && rows.map(r => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-6 py-3 text-sm text-gray-900">
                  {r.child?.firstName} {r.child?.lastName}
                </td>
                <td className="px-6 py-3 text-sm text-gray-600">
                  {r.event ? `${r.event.title} • ${new Date(r.event.startAt).toLocaleDateString()}` : "—"}
                </td>
                <td className="px-6 py-3 text-sm">
                  <span className="px-2 py-1 rounded bg-indigo-50 text-indigo-700 font-medium">{r.progressScore ?? "—"}/10</span>
                </td>
                <td className="px-6 py-3 text-sm text-gray-600">{r.createdBy?.email ?? "—"}</td>
                <td className="px-6 py-3 text-sm text-gray-600">{new Date(r.createdAt).toLocaleString()}</td>
                <td className="px-6 py-3 text-sm">
                  <div className="flex gap-2">
                    <button className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200" onClick={() => onEdit(r)}>Edit</button>
                    <button className="px-2 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200" onClick={() => onDelete(r)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
