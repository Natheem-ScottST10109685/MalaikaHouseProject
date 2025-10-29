import React, { useState } from "react";
import UserModal from "./UserModal";

export default function UsersTable({
  headerTitle,
  query, onQueryChange, onSearchSubmit,
  page, hasMore, onPrev, onNext,
  rows, total
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUser, setModalUser] = useState(null);
  const [modalMode, setModalMode] = useState("view");

  function handleAction(mode, user) {
    setModalUser(user);
    setModalMode(mode);
    setModalOpen(true);
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">{headerTitle}</h2>
        <div className="flex items-center gap-4">
          <form onSubmit={onSearchSubmit} className="flex gap-2">
            <input
              type="search"
              placeholder="Search Email"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 max-w-[220px]"
            />
            <button
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              type="submit"
            >
              Search
            </button>
          </form>
          <div className="ml-auto flex gap-2">
            <button
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
              onClick={onPrev}
              disabled={page <= 1}
            >
              Prev
            </button>
            <button
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
              onClick={onNext}
              disabled={!hasMore}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.map((u) => (
            <tr key={u.id}>
              <td className="px-6 py-4 text-sm text-gray-900">{u.email}</td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {u.role === "PARENT" ? "Internal Parent" :
                 u.role === "PARTNER" ? "External Partner" :
                 u.role === "STAFF" ? "Staff" : "Admin"}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {new Date(u.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900 mr-2" onClick={() => handleAction("view", u)}>View</button>
                <button className="text-blue-600 hover:text-blue-900 mr-2" onClick={() => handleAction("edit", u)}>Edit</button>
                <button className="text-red-600 hover:text-red-900" onClick={() => handleAction("edit", u)}>Disable</button>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center text-gray-500">No Users Found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="mt-2 text-sm text-gray-500 opacity-70">
        Page {page} — Total {total}
      </div>

      {modalOpen && (
        <UserModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          user={modalUser}
          mode={modalMode}
          onUserUpdated={(updated) => {
            const updatedRows = rows.map(r => r.id === updated.id ? updated : r);
          }}
        />
      )}
    </div>
  );
}
