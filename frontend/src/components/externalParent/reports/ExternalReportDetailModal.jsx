import React from "react";
import Modal from "../../common/Modal";

export default function ExternalReportDetailModal({ open, onClose, report }) {
  if (!report) return null;

  const childName = [report.child?.firstName, report.child?.lastName].filter(Boolean).join(" ");
  const eventLine = report.event
    ? `${report.event.title} • ${new Date(report.event.startAt).toLocaleString()}`
    : "—";

  const metric = (label, value) => (
    <div className="flex justify-between py-1">
      <span className="text-sm text-slate-600">{label}</span>
      <span className="text-sm font-medium text-slate-800">{value ?? "—"}/5</span>
    </div>
  );

  const footer = (
    <button className="px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200" onClick={onClose}>
      Close
    </button>
  );

  return (
    <Modal open={open} onClose={onClose} title="Student Report" footer={footer}>
      <div className="space-y-4">
        <div className="bg-slate-50 rounded-lg p-3 text-sm">
          <div><span className="text-slate-500">Student:</span> <span className="font-medium text-slate-800">{childName || "—"}</span></div>
          <div><span className="text-slate-500">Event:</span> <span className="text-slate-800">{eventLine}</span></div>
          <div><span className="text-slate-500">Created at:</span> <span className="text-slate-800">{report.createdAt ? new Date(report.createdAt).toLocaleString() : "—"}</span></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white">
          <div className="border rounded-lg p-3">
            <div className="font-semibold text-slate-800 mb-2">Metrics</div>
            {metric("Social Skills", report.socialSkills)}
            {metric("Teamwork", report.teamwork)}
            {metric("Participation", report.participation)}
            {metric("Focus", report.focus)}
            {metric("Creativity", report.creativity)}
            {metric("Effort", report.effort)}
            {metric("Discipline", report.discipline)}
          </div>

          <div className="border rounded-lg p-3">
            <div className="font-semibold text-slate-800 mb-2">Progress Score</div>
            <div className="text-3xl font-bold text-[#7B9BC4]">
              {report.progressScore ?? "—"} / 10
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-3">
          <div className="font-semibold text-slate-800 mb-2">Overall Comment</div>
          <p className="text-sm text-slate-700 whitespace-pre-wrap">
            {report.overallComment || "—"}
          </p>
        </div>
      </div>
    </Modal>
  );
}
