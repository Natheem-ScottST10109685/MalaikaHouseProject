import React, { useEffect, useRef, useState } from "react";

export default function ChildSwitcher({ childrenList = [], activeChildId, onSelect }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const active = childrenList.find(c => c.id === activeChildId) || childrenList[0];

  useEffect(() => {
    function onDocClick(e) {
      if (open && ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  if (!childrenList.length) return null;

  return (
    <div className="mt-4 relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full text-left bg-white/15 hover:bg-white/20 text-white rounded-lg p-3 transition flex items-center justify-between"
      >
        <div className="truncate">
          <div className="font-semibold truncate">
            {active?.firstName} {active?.lastName}
          </div>
          <div className="text-sm opacity-90 truncate">
            {active?.program ?? "Heart Program Member"}
          </div>
        </div>
        <span className="ml-3">▾</span>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-80 max-w-[85vw] bg-white rounded-xl shadow-lg border p-2">
          <div className="px-2 py-1 font-semibold text-slate-700">Your Children</div>
          <div className="max-h-72 overflow-auto divide-y">
            {childrenList.map(ch => {
              const isActive = ch.id === active?.id;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => { onSelect?.(ch.id); setOpen(false); }}
                  className={`w-full text-left p-3 rounded ${
                    isActive ? "bg-slate-100" : "hover:bg-slate-50"
                  }`}
                >
                  <div className="font-medium text-slate-800 truncate">
                    {ch.firstName} {ch.lastName}
                  </div>
                  <div className="text-sm text-slate-600 truncate">
                    {ch.program ?? ch.grade ?? "Participant"}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
