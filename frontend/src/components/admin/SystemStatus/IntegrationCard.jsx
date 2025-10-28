export default function IntegrationCard({ name, status, description, onClick }) {
  const badgeClass =
    status === 'Connected'
      ? 'bg-green-100 text-green-800'
      : status === 'Error'
      ? 'bg-red-100 text-red-800'
      : 'bg-gray-100 text-gray-600';

  return (
    <div
      className="p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="font-medium text-gray-800">{name}</div>
        <div className={`px-2 py-1 ${badgeClass} text-xs rounded-full`}>{status}</div>
      </div>
      <div className="text-sm text-gray-600">{description}</div>
    </div>
  );
}
