import React, { useEffect, useState } from "react";
import Modal from "../../common/Modal";
import { apiFetch } from "../../../lib/api";

const BASE = "/api/admin/reports";

const Metric = ({label, value, onChange}) => (
  <div>
    <div className="flex justify-between">
      <label className="text-sm text-slate-700">{label}</label>
      <span className="text-sm font-medium">{value}</span>
    </div>
    <input type="range" min={1} max={10} step={1} value={value} onChange={e=>onChange(+e.target.value)} className="w-full"/>
  </div>
);

export default function ReportFormModal({ open, onClose, onSaved, initial, childrenOptions = [], eventOptions = [] }) {
  const [form, setForm] = useState({
    childId: "",
    eventId: "",
    socialSkills: 3,
    teamwork: 3,
    participation: 3,
    focus: 3,
    creativity: 3,
    effort: 3,
    discipline: 3,
    overallComment: ""
  });
  const [busy, setBusy] = useState(false);
  const isEdit = !!initial?.id;

  useEffect(() => {
    if (initial) {
      setForm({
        childId: initial.childId || "",
        eventId: initial.eventId || "",
        socialSkills: initial.socialSkills ?? 3,
        teamwork: initial.teamwork ?? 3,
        participation: initial.participation ?? 3,
        focus: initial.focus ?? 3,
        creativity: initial.creativity ?? 3,
        effort: initial.effort ?? 3,
        discipline: initial.discipline ?? 3,
        overallComment: initial.overallComment ?? "",
      });
    }
  }, [initial]);

  async function handleSave() {
    setBusy(true);
    const payload = {
      childId: form.childId,
      eventId: form.eventId || undefined,
      socialSkills: form.socialSkills,
      teamwork: form.teamwork,
      participation: form.participation,
      focus: form.focus,
      creativity: form.creativity,
      effort: form.effort,
      discipline: form.discipline,
      overallComment: form.overallComment || undefined,
    };
    const res = await apiFetch(isEdit ? `${BASE}/${initial.id}` : BASE, {
      method: isEdit ? "PATCH" : "POST",
      body: JSON.stringify(payload),
    });
    setBusy(false);
    if (res.ok) {
      onSaved?.();
      onClose();
    } else {
      const e = await res.json().catch(()=>({}));
      alert(e?.error || "Failed to save report");
    }
  }

  const footer = (
    <>
      <button className="px-4 py-2 rounded bg-slate-100 hover:bg-slate-200" onClick={onClose} disabled={busy}>Cancel</button>
      <button className="px-4 py-2 rounded bg-[#7B9BC4] text-white hover:bg-[#8DB4A8]" onClick={handleSave} disabled={busy}>
        {busy ? "Saving…" : isEdit ? "Save Changes" : "Create Report"}
      </button>
    </>
  );

  return (
    <Modal open={open} onClose={onClose} title={isEdit ? "Edit Student Report" : "Create Student Report"} footer={footer}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-slate-700 mb-1">Child</label>
            <select className="w-full border rounded p-2" value={form.childId} onChange={e=>setForm(f=>({ ...f, childId: e.target.value }))}>
              <option value="">Select child…</option>
              {childrenOptions.map(c => (
                <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-700 mb-1">Event (optional)</label>
            <select className="w-full border rounded p-2" value={form.eventId} onChange={e=>setForm(f=>({ ...f, eventId: e.target.value }))}>
              <option value="">—</option>
              {eventOptions.map(ev => (
                <option key={ev.id} value={ev.id}>{ev.title} • {new Date(ev.startAt).toLocaleDateString()}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Metric label="Social Skills" value={form.socialSkills} onChange={v=>setForm(f=>({...f, socialSkills:v}))}/>
          <Metric label="Teamwork" value={form.teamwork} onChange={v=>setForm(f=>({...f, teamwork:v}))}/>
          <Metric label="Participation" value={form.participation} onChange={v=>setForm(f=>({...f, participation:v}))}/>
          <Metric label="Focus" value={form.focus} onChange={v=>setForm(f=>({...f, focus:v}))}/>
          <Metric label="Creativity" value={form.creativity} onChange={v=>setForm(f=>({...f, creativity:v}))}/>
          <Metric label="Effort" value={form.effort} onChange={v=>setForm(f=>({...f, effort:v}))}/>
          <Metric label="Discipline" value={form.discipline} onChange={v=>setForm(f=>({...f, discipline:v}))}/>
        </div>

        <div>
          <label className="block text-sm text-slate-700 mb-1">Overall Comment</label>
          <textarea className="w-full border rounded p-2" rows={4} value={form.overallComment} onChange={e=>setForm(f=>({...f, overallComment:e.target.value}))}/>
        </div>
      </div>
    </Modal>
  );
}
