import React, { useEffect, useState } from "react";
import { apiFetch } from "../../../lib/api";
import EventCreateModal from "../Events/EventCreateModal";
import EventEditModal from "../Events/EventEditModal";

export default function ClubDetailModal({ open, onClose, clubId }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);

  const [clubData, setClubData] = useState(null);
  const [events, setEvents] = useState([]);

  const [createEventOpen, setCreateEventOpen] = useState(false);
  const [editEvent, setEditEvent] = useState(null);

  useEffect(() => {
    if (!open || !clubId) return;

    let cancelled = false;
    (async () => {
      setBusy(true);
      setErr(null);
      const r = await apiFetch(`/admin/clubs/${clubId}`);
      setBusy(false);
      if (!r.ok) {
        setErr("Failed to load club");
        return;
      }
      const d = await r.json();
      if (cancelled) return;

      setClubData(d.club || null);
      setEvents(Array.isArray(d.events) ? d.events : []);
    })();

    return () => { cancelled = true; };
  }, [open, clubId]);

  async function onDeleteEvent(ev) {
    if (!confirm(`Delete event "${ev.title}"? This cannot be undone.`)) return;
    const r = await apiFetch(`/admin/events/${ev.id}`, { method: "DELETE" });
    if (!r.ok) {
      const e = await r.json().catch(() => ({}));
      alert(e?.error || "Failed to delete event");
      return;
    }
    setEvents(prev => prev.filter(e => e.id !== ev.id));
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 p-4 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl p-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">
            Club: {clubData?.name ?? "…"}
          </h3>
          <button
            className="px-3 py-1 rounded bg-slate-100 hover:bg-slate-200"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        {err && (
          <div className="p-2 text-sm bg-red-50 text-red-700 rounded mb-3">
            {err}
          </div>
        )}
        {busy && <div className="text-sm text-slate-600">Loading…</div>}

        {clubData && (
          <>
            <div className="text-sm text-slate-600 mb-4">
              {clubData.description || "No description"}
              <br />
              {clubData.tier ? `${clubData.tier} • ` : ""}
              R{clubData.monthlyFee ?? 0}/month • {clubData.sessions ?? 0} sessions
            </div>

            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold">Events in this club</h4>
              <button
                className="px-3 py-2 rounded bg-[#7B9BC4] text-white hover:bg-[#8DB4A8]"
                onClick={() => setCreateEventOpen(true)}
              >
                + Add Event
              </button>
            </div>

            <div className="grid gap-3">
              {events.map((ev) => {
                const s = new Date(ev.startAt);
                const e = new Date(ev.endAt);
                return (
                  <div
                    key={ev.id}
                    className="bg-white border rounded-lg p-4 flex justify-between items-start"
                  >
                    <div>
                      <div className="font-semibold text-gray-800">{ev.title}</div>
                      <div className="text-sm text-gray-500">
                        {s.toLocaleString()} –{" "}
                        {e.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} • {ev.type}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Audience: {ev.audience} • Visibility: {ev.visibility}
                        {typeof ev.capacity === "number" ? ` • Cap: ${ev.capacity}` : ""}
                        {typeof ev.price === "number" ? ` • R${ev.price.toFixed(2)}` : ""}
                      </div>
                      {ev.location && (
                        <div className="text-xs text-gray-500 mt-1">
                          Location: {ev.location}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 rounded bg-indigo-100 hover:bg-indigo-200 text-sm"
                        onClick={() => setEditEvent(ev)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 rounded bg-red-100 hover:bg-red-200 text-red-700 text-sm"
                        onClick={() => onDeleteEvent(ev)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
              {events.length === 0 && (
                <div className="text-sm text-slate-500">No events yet.</div>
              )}
            </div>
          </>
        )}

        <EventCreateModal
          open={createEventOpen}
          onClose={() => setCreateEventOpen(false)}
          onCreated={(ev) => {
            setEvents((prev) => [...prev, ev]);
            setCreateEventOpen(false);
          }}
          defaultClubId={clubId}
        />

        {editEvent && (
          <EventEditModal
            open={!!editEvent}
            event={editEvent}
            onClose={() => setEditEvent(null)}
            onSaved={(updated) => {
              setEvents((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
              setEditEvent(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
