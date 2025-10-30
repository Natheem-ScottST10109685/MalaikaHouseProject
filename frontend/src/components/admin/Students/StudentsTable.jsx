import React from "react";

export default function StudentsTable({
  headerTitle,
  query, onQueryChange, onSearchSubmit,
  page, hasMore, onPrev, onNext,
  rows, total,
  onView, onEdit, onDisable, onDelete
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">{headerTitle}</h2>
        <form onSubmit={onSearchSubmit} className="flex gap-2">
          <input
            type="search"
            placeholder="Search name or parent email"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-[260px]"
          />
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200" type="submit">
            Search
          </button>
        </form>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parent</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Active</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {c.firstName} {c.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {c.parent?.email ?? "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.grade ?? "-"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 text-xs rounded-full ${c.isActive ? "bg-green-100 text-green-800" : "bg-slate-200 text-slate-700"}`}>
                    {c.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-2" onClick={() => onView(c)}>View</button>
                  <button className="text-purple-600 hover:text-purple-900 mr-2" onClick={() => onEdit(c)}>Edit</button>
                  <button className="text-yellow-700 hover:text-yellow-900 mr-2" onClick={() => onDisable(c)} disabled={!c.isActive}>Disable</button>
                  <button className="text-red-600 hover:text-red-900" onClick={() => onDelete(c)}>Delete</button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">No Students Found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm opacity-70">Page {page} • Total {total}</div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50" onClick={onPrev} disabled={page <= 1}>Prev</button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50" onClick={onNext} disabled={!hasMore}>Next</button>
        </div>
      </div>
    </div>
  );
}
