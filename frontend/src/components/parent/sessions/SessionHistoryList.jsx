import React from "react";

export default function SessionHistoryList({ items }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center border-b pb-3 mb-4">
        <h2 className="font-semibold text-lg text-[#5D5A7A]">Session History</h2>
      </div>

      {(!items || items.length === 0) && (
        <div className="text-sm text-gray-500">No past sessions yet.</div>
      )}

      <div className="space-y-3">
        {(items || []).map((a) => {
          const s = a.event ? new Date(a.event.startAt) : null;
          const e = a.event ? new Date(a.event.endAt) : null;
          const childName = a.child ? `${a.child.firstName} ${a.child.lastName}` : "—";
          return (
            <div
              key={a.id}
              className="bg-[#F5F5F5] p-4 rounded-lg flex flex-col md:flex-row md:items-center gap-2"
            >
              <div className="flex-1">
                <div className="font-semibold text-[#5D5A7A]">
                  {a.event?.title ?? "Session"} — {childName}
                </div>
                <div className="text-sm text-[#6B5F7A]">
                  {a.event?.type ?? "—"} • {a.event?.location ?? "TBA"}
                </div>
                {s && e && (
                  <div className="text-sm text-[#6B5F7A]">
                    {s.toLocaleDateString()} • {s.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} – {e.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                )}
              </div>
              <span className="px-3 py-1 text-xs rounded bg-gray-100 self-start">
                {a.status ?? "Completed"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
