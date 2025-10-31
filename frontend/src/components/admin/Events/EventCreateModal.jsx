import React, { useEffect, useState } from "react";
import { apiFetch } from "../../../lib/api";

export default function EventCreateModal({ open, onClose, onCreated, defaultClubId }) {
  const [clubs, setClubs] = useState([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);

  const [form, setForm] = useState({
    title: "", type: "",
    startAt: "", endAt: "",
    location: "", facilitator: "",
    status: "Upcoming",

    clubId: "",
    audience: "BOTH",
    visibility: "PUBLIC",
    publishStatus: "PUBLISHED",

    capacity: "",
    price: "",
  });

  useEffect(() => {
    if (open && defaultClubId) {
      setForm((f) => ({ ...f, clubId: defaultClubId || "" }));
    }
  }, [open, defaultClubId]);

  useEffect(() => {
    if (!open) return;
    (async () => {
      const r = await apiFetch("/admin/clubs");
      if (r.ok) setClubs(await r.json());
    })();
  }, [open]);

  if (!open) return null;

  function validateRequired() {
    if (!form.title.trim()) return "Title is required";
    if (!form.type.trim()) return "Type is required";
    if (!form.startAt) return "Start datetime is required";
    if (!form.endAt) return "End datetime is required";
    return null;
  }

  async function handleCreate() {
    const v = validateRequired();
    if (v) { setErr(v); return; }

    setBusy(true); setErr(null);

    try {
      const payload = {
        title: form.title.trim(),
        type: form.type.trim(),
        startAt: new Date(form.startAt).toISOString(),
        endAt: new Date(form.endAt).toISOString(),
        location: form.location?.trim() || null,
        facilitator: form.facilitator?.trim() || null,
        status: form.status || "Upcoming",

        clubId: form.clubId || null,
        audience: form.audience,
        visibility: form.visibility,
        publishStatus: form.publishStatus,

        capacity: form.capacity !== "" ? Number(form.capacity) : null,
        price: form.price !== "" ? Number(form.price) : null,
      };

      const res = await apiFetch("/admin/events", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        setErr(e?.error || "Failed to create event");
        return;
      }

      const ev = await res.json();
      onCreated?.(ev);
      onClose?.();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Create Event</h3>
        {err && <div className="p-2 mb-3 text-sm bg-red-50 text-red-700 rounded">{err}</div>}

        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              className="w-full border rounded p-2"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Type (tag)</label>
            <input
              className="w-full border rounded p-2"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Start</label>
            <input
              type="datetime-local"
              className="w-full border rounded p-2"
              value={form.startAt}
              onChange={(e) => setForm({ ...form, startAt: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">End</label>
            <input
              type="datetime-local"
              className="w-full border rounded p-2"
              value={form.endAt}
              onChange={(e) => setForm({ ...form, endAt: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              className="w-full border rounded p-2"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Facilitator</label>
            <input
              className="w-full border rounded p-2"
              value={form.facilitator}
              onChange={(e) => setForm({ ...form, facilitator: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Club (optional)</label>
            <select
              className="w-full border rounded p-2"
              value={form.clubId}
              onChange={(e) => setForm({ ...form, clubId: e.target.value })}
            >
              <option value="">— Standalone —</option>
              {clubs.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Audience</label>
            <select
              className="w-full border rounded p-2"
              value={form.audience}
              onChange={(e) => setForm({ ...form, audience: e.target.value })}
            >
              <option value="BOTH">BOTH</option>
              <option value="INTERNAL">INTERNAL</option>
              <option value="EXTERNAL">EXTERNAL</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Visibility</label>
            <select
              className="w-full border rounded p-2"
              value={form.visibility}
              onChange={(e) => setForm({ ...form, visibility: e.target.value })}
            >
              <option value="PUBLIC">PUBLIC</option>
              <option value="PRIVATE">PRIVATE</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Publish Status</label>
            <select
              className="w-full border rounded p-2"
              value={form.publishStatus}
              onChange={(e) => setForm({ ...form, publishStatus: e.target.value })}
            >
              <option value="DRAFT">DRAFT</option>
              <option value="PUBLISHED">PUBLISHED</option>
              <option value="ARCHIVED">ARCHIVED</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Capacity (optional)</label>
            <input
              type="number"
              min="0"
              className="w-full border rounded p-2"
              value={form.capacity}
              onChange={(e) => setForm({ ...form, capacity: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Price (optional)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="w-full border rounded p-2"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button className="px-3 py-2 rounded bg-slate-100 hover:bg-slate-200" onClick={onClose} disabled={busy}>
            Cancel
          </button>
          <button
            className="px-3 py-2 rounded bg-[#7B9BC4] text-white hover:bg-[#8DB4A8]"
            onClick={handleCreate}
            disabled={busy}
          >
            {busy ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
