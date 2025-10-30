import React from "react";

export default function ScheduleList({ items }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center border-b pb-3 mb-4">
        <h2 className="font-semibold text-lg text-[#5D5A7A]">Schedule</h2>
      </div>

      {items.length === 0 && <div className="text-sm text-gray-500">No sessions scheduled.</div>}

      <div className="space-y-3">
        {items.map(s => (
          <div key={s.id} className="bg-[#F5F5F5] p-4 rounded-lg flex justify-between items-center">
            <div>
              <div className="font-semibold text-[#5D5A7A]">
                {new Date(s.startAt).toLocaleString()} — {new Date(s.endAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
              <div className="text-sm text-[#6B5F7A]">
                {s.type} • {s.location || "On site"} • {s.child?.firstName} {s.child?.lastName}
              </div>
            </div>
            <div className="bg-[#7B9BC4]/20 text-[#7B9BC4] px-3 py-1 rounded-full text-xs font-semibold">
              {s.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
