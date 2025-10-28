export default function RecentActivityTable({ rows, onViewAll }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Recent User Activity</h2>
        <button
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          onClick={onViewAll}
        >
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() =>
                  alert(
                    `Action: ${item.action}\nBy: ${item.actorEmail || '(system)'} (${item.actorRole || '-'})\n` +
                    `Target: ${item.targetType || '-'} ${item.targetId || ''}\nStatus: ${item.status}\n` +
                    `When: ${new Date(item.createdAt).toLocaleString()}`
                  )
                }
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.actorEmail || 'System'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.actorRole || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.action.replaceAll('_', ' ')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.status === 'SUCCESS' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(item.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">No Recent Activity.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
