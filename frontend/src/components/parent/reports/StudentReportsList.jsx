import React, { useEffect, useState } from "react";
import { apiFetch } from "../../../lib/api";
import ReportDetailModal from "./ReportDetailModal";

export default function StudentReportsList({ activeChildId }) {
  const [items, setItems] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  async function load() {
    setBusy(true);
    setError(null);
    try {
      const qs = new URLSearchParams();
      if (activeChildId) qs.set("childId", activeChildId);
      const r = await apiFetch(`/api/parent/reports?${qs.toString()}`);
      if (!r.ok) throw new Error("Load failed");
      const data = await r.json();
      setItems(data.items || []);
    } catch (e) {
      setError("Failed to load reports.");
      setItems([]);
    } finally {
      setBusy(false);
    }
  }

  async function openDetail(id) {
    const r = await apiFetch(`/api/parent/reports/${id}`);
    if (r.ok) {
      setSelected(await r.json());
      setOpen(true);
    }
  }

  useEffect(() => { load(); }, [activeChildId]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-[#5D5A7A]">Student Reports</h2>
        <button onClick={load} className="px-3 py-2 text-sm rounded bg-gray-100 hover:bg-gray-200">
          Refresh
        </button>
      </div>

      {busy && <div className="text-sm text-gray-500">Loading…</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}
      {!busy && !error && items.length === 0 && (
        <div className="text-sm text-gray-500">No reports found.</div>
      )}

      <div className="divide-y">
        {items.map((r) => {
          const childName = [r.child?.firstName, r.child?.lastName].filter(Boolean).join(" ");
          const eventLine = r.event
            ? `${r.event.title} • ${new Date(r.event.startAt).toLocaleString()}`
            : "—";

          return (
            <button
              key={r.id}
              onClick={() => openDetail(r.id)}
              className="w-full text-left py-3 hover:bg-gray-50 rounded-lg px-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-800">{childName || "Student"}</div>
                  <div className="text-sm text-slate-600">{eventLine}</div>
                </div>
                <div className="text-[#7B9BC4] font-semibold">{r.progressScore ?? "—"}/10</div>
              </div>
              {r.overallComment && (
                <div className="mt-1 text-sm text-slate-500 line-clamp-2">{r.overallComment}</div>
              )}
              <div className="mt-1 text-xs text-slate-400">
                {new Date(r.createdAt).toLocaleString()}
              </div>
            </button>
          );
        })}
      </div>

      <ReportDetailModal
        open={open}
        onClose={() => setOpen(false)}
        report={selected}
      />
    </div>
  );
}
