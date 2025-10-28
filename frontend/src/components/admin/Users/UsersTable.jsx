export default function UsersTable({
  headerTitle,
  query, onQueryChange, onSearchSubmit,
  page, hasMore, onPrev, onNext,
  rows, total
}) {
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
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-[220px]"
            />
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors" type="submit">
              Search
            </button>
          </form>
          <div className="ml-auto flex gap-2">
            <button
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={onPrev}
              disabled={page <= 1}
            >
              Prev
            </button>
            <button
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.map((u) => (
            <tr key={u.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{u.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {u.role === 'PARENT' ? 'Internal Parent' :
                 u.role === 'PARTNER' ? 'External Partner' :
                 u.role === 'STAFF'   ? 'Staff' : 'Admin'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(u.createdAt).toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-2" onClick={() => alert(`View ${u.email}`)}>View</button>
                <button className="text-purple-600 hover:text-purple-900 mr-2" onClick={() => alert(`Edit ${u.email}`)}>Edit</button>
                <button className="text-red-600 hover:text-red-900" onClick={() => alert(`Disable ${u.email}`)}>Disable</button>
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

      <div style={{ marginTop: 8, opacity: 0.7 }}>
        Page {page} - Total {total}
      </div>
    </div>
  );
}
