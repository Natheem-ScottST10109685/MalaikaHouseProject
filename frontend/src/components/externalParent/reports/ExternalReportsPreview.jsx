import React from "react";

export default function ExternalReportsPreview({ reports = [], onViewAll, onItemClick, onRefresh }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center border-b pb-3 mb-4">
        <h2 className="font-semibold text-lg text-[#5D5A7A]">Recent Student Reports</h2>
        <div className="flex gap-2">
          <button className="px-3 py-2 text-sm rounded bg-gray-100 hover:bg-gray-200" onClick={onRefresh}>
            Refresh
          </button>
          <button className="px-3 py-2 text-sm rounded bg-gray-100 hover:bg-gray-200" onClick={onViewAll}>
            View All
          </button>
        </div>
      </div>

      {reports.length === 0 && (
        <div className="text-sm text-gray-500">No reports yet.</div>
      )}

      <div className="space-y-3">
        {reports.map((r) => {
          const childName = [r.child?.firstName, r.child?.lastName].filter(Boolean).join(" ");
          const createdAt = r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "—";
          const eventTitle = r.event?.title ? ` • ${r.event.title}` : "";
          return (
            <button
              key={r.id}
              onClick={() => onItemClick?.(r)}
              className="w-full text-left bg-[#F5F5F5] hover:bg-[#B8B5C0]/30 p-4 rounded-lg transition"
            >
              <div className="flex justify-between">
                <div className="font-semibold text-[#5D5A7A]">
                  {(childName || "Student")}{eventTitle}
                </div>
                <div className="text-sm text-[#6B5F7A]">{createdAt}</div>
              </div>
              <div className="text-sm text-[#6B5F7A]">
                Score: {typeof r.progressScore === "number" ? r.progressScore.toFixed(1) : "—"} / 10
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}