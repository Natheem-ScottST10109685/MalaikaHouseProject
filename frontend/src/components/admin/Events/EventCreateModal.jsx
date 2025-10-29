import React, { useState } from "react";
import Modal from "../../common/Modal";
import { apiFetch } from "../../../lib/api";

export default function EventCreateModal({ open, onClose, onCreated }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Heart Program");
  const [date, setDate] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [location, setLocation] = useState("");
  const [facilitator, setFacilitator] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const res = await apiFetch("/admin/events", {
        method: "POST",
        body: JSON.stringify({ title, type, date, timeStart, timeEnd, location, facilitator }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || "Could not create event.");
        return;
      }

      const data = await res.json();
      onCreated?.(data);
      onClose();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const footer = (
    <>
      <button
        type="button"
        onClick={onClose}
        className="px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200"
        disabled={saving}
      >
        Cancel
      </button>
      <button
        form="createEventForm"
        type="submit"
        className="px-4 py-2 rounded-md bg-[#7B9BC4] text-white hover:bg-[#8DB4A8]"
        disabled={saving || !title || !date}
      >
        {saving ? "Creating..." : "Create Event"}
      </button>
    </>
  );

  return (
    <Modal open={open} onClose={onClose} title="Create New Event" footer={footer}>
      <form id="createEventForm" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            className="w-full border p-2 rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Date</label>
          <input
            type="date"
            className="w-full border p-2 rounded-md"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium">Start Time</label>
            <input type="time" className="w-full border p-2 rounded-md" value={timeStart} onChange={(e) => setTimeStart(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium">End Time</label>
            <input type="time" className="w-full border p-2 rounded-md" value={timeEnd} onChange={(e) => setTimeEnd(e.target.value)} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Type</label>
          <select className="w-full border p-2 rounded-md" value={type} onChange={(e) => setType(e.target.value)}>
            <option>Heart Program</option>
            <option>Club</option>
            <option>Session</option>
            <option>Workshop</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Location</label>
          <input type="text" className="w-full border p-2 rounded-md" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>

        <div>
          <label className="block text-sm font-medium">Facilitator</label>
          <input type="text" className="w-full border p-2 rounded-md" value={facilitator} onChange={(e) => setFacilitator(e.target.value)} />
        </div>

        {error && <div className="text-sm text-red-600">{error}</div>}
      </form>
    </Modal>
  );
}