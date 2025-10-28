export default function KpiRow({ items }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {items.map((k) => (
        <div key={k.label} className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="text-3xl">{k.emoji}</div>
            <div className="text-sm text-green-600">{k.delta}</div>
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">{k.value}</div>
          <div className="text-sm text-gray-600">{k.label}</div>
        </div>
      ))}
    </div>
  );
}