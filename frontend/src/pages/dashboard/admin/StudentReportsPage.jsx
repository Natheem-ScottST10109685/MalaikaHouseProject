import React, { useEffect, useState } from "react";
import { apiFetch } from "../../../lib/api";
import ReportsTable from "../../../components/admin/reports/ReportsTable";
import ReportFormModal from "../../../components/admin/reports/ReportFormModal";

const BASE = "/api/admin/reports";

export default function StudentReportsPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const [childrenOptions, setChildrenOptions] = useState([]);
  const [eventOptions, setEventOptions] = useState([]);

  async function load() {
    setLoading(true);
    const r = await apiFetch(`${BASE}?limit=50`);
    if (r.ok) {
      const data = await r.json();
      setRows(data.items ?? data ?? []);
    } else {
      setRows([]);
    }
    setLoading(false);
  }

  async function loadLookups() {
    const kids = await apiFetch("/admin/children?pageSize=100");
    if (kids.ok) {
      const d = await kids.json();
      setChildrenOptions(d.items ?? d);
    }
    const ev = await apiFetch("/admin/events?futureOnly=1");
    if (ev.ok) {
      const d = await ev.json();
      setEventOptions(d.items ?? d);
    }
  }

  useEffect(() => { load(); loadLookups(); }, []);

  async function handleDelete(item) {
    if (!confirm("Delete this report?")) return;
    const r = await apiFetch(`${BASE}/${item.id}`, { method: "DELETE" });
    if (r.ok) load();
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Student Reports</h1>
        <button className="px-4 py-2 rounded bg-[#7B9BC4] text-white hover:bg-[#8DB4A8]" onClick={() => { setEditItem(null); setOpen(true); }}>
          + Create Report
        </button>
      </div>

      <ReportsTable
        rows={rows}
        loading={loading}
        onEdit={(r)=>{ setEditItem(r); setOpen(true); }}
        onDelete={handleDelete}
      />

      <ReportFormModal
        open={open}
        onClose={()=>setOpen(false)}
        onSaved={load}
        initial={editItem}
        childrenOptions={childrenOptions}
        eventOptions={eventOptions}
      />
    </div>
  );
}
