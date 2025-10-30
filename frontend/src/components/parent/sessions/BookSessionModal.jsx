import React, { useEffect, useState } from "react";
import Modal from "../../common/Modal";
import { apiFetch } from "../../../lib/api";

export default function BookSessionModal({ open, onClose, childrenList = [], onBooked }) {
  const [childId, setChildId] = useState("");
  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    setError("");
    if (childrenList.length && !childId) setChildId(childrenList[0].id);
    (async () => {
      setLoading(true);
      try {
        const res = await apiFetch("/parent/events");
        if (res.ok) {
          const data = await res.json();
          setEvents(data.items || []);
          if (!eventId && (data.items?.length ?? 0) > 0) {
            setEventId(data.items[0].id);
          }
        } else {
          setError("Failed to load events.");
        }
      } catch {
        setError("Network error loading events.");
      } finally {
        setLoading(false);
      }
    })();
  }, [open, childrenList, childId, eventId]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!childId || !eventId) { setError("Please select a student and an event."); return; }
    setSaving(true);
    setError("");
    try {
      const res = await apiFetch("/parent/appointments", {
        method: "POST",
        body: JSON.stringify({ childId, eventId }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || "Failed to book.");
        return;
      }
      const created = await res.json();
      onBooked?.(created);
      onClose();
    } catch {
      setError("Network error. Try again.");
    } finally {
      setSaving(false);
    }
  }

  const footer = (
    <>
      <button className="px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200" onClick={onClose} disabled={saving}>
        Cancel
      </button>
      <button form="bookEventForm" type="submit" disabled={saving || loading} className="px-4 py-2 rounded-md bg-[#7B9BC4] text-white hover:bg-[#8DB4A8]">
        {saving ? "Booking…" : "Book"}
      </button>
    </>
  );

  return (
    <Modal open={open} onClose={onClose} title="Book a Scheduled Event" footer={footer}>
      <form id="bookEventForm" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Student</label>
          <select
            value={childId}
            onChange={(e) => setChildId(e.target.value)}
            className="mt-1 w-full border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
            required
          >
            {childrenList.map(c => (
              <option key={c.id} value={c.id}>
                {c.firstName} {c.lastName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Available Events</label>
          <div className="mt-2 max-h-72 overflow-auto space-y-2">
            {loading && <div className="text-sm text-gray-500">Loading events…</div>}
            {!loading && events.length === 0 && <div className="text-sm text-gray-500">No upcoming events.</div>}
            {!loading && events.map(ev => {
              const when = `${new Date(ev.startAt).toLocaleString()} – ${new Date(ev.endAt).toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"})}`;
              return (
                <label key={ev.id} className="flex gap-3 p-3 rounded border hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="event"
                    value={ev.id}
                    checked={eventId === ev.id}
                    onChange={() => setEventId(ev.id)}
                  />
                  <div className="flex-1">
                    <div className="font-medium text-slate-800">{ev.title}</div>
                    <div className="text-xs text-slate-600">{ev.type} • {ev.location || "On site"}</div>
                    <div className="text-xs text-slate-500">{when}</div>
                  </div>
                  <span className="self-start px-2 py-1 text-xs rounded bg-gray-100">{ev.status}</span>
                </label>
              );
            })}
          </div>
        </div>

        {error && <div className="text-sm text-red-600">{error}</div>}
      </form>
    </Modal>
  );
}
