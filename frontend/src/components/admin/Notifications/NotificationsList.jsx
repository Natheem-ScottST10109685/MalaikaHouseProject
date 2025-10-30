import React, { useEffect, useState } from "react";
import { apiFetch } from "../../../lib/api";

export default function NotificationsList() {
  const [items, setItems] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(true);

  async function load(cursor) {
    setLoading(true);
    const qs = new URLSearchParams();
    qs.set("limit", "20");
    if (cursor) qs.set("cursor", cursor);
    const res = await apiFetch(`/admin/notifications?${qs.toString()}`);
    setLoading(false);
    if (!res.ok) return;
    const data = await res.json();
    if (!cursor) {
      setItems(data.items || []);
    } else {
      setItems(prev => [...prev, ...(data.items || [])]);
    }
    setNextCursor(data.nextCursor ?? null);
  }

  useEffect(() => {
    load();
  }, []);

  async function setRead(id, isRead) {
    const res = await apiFetch(`/admin/notifications/${id}/read`, {
      method: "PATCH",
      body: JSON.stringify({ isRead }),
    });
    if (res.ok) {
      setItems(prev => prev.map(n => n.id === id ? { ...n, isRead } : n));
    }
  }

  async function markAllRead() {
    const res = await apiFetch("/admin/notifications/mark-all-read", { method: "POST" });
    if (res.ok) {
      setItems(prev => prev.map(n => ({ ...n, isRead: true })));
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">All Notifications</h2>
        <button className="px-3 py-2 rounded bg-gray-100 hover:bg-gray-200" onClick={markAllRead}>
          Mark all read
        </button>
      </div>

      {loading && <div className="text-gray-500">Loading…</div>}

      <div className="divide-y">
        {items.map(n => (
          <div className="py-3 flex gap-3 items-start" key={n.id}>
            <div className={`w-2 h-2 rounded-full mt-2 ${n.isRead ? 'bg-gray-300' : 'bg-red-500'}`} />
            <div className="flex-1">
              <div className="font-medium text-slate-800">{n.title}</div>
              <div className="text-sm text-slate-600">{n.message}</div>
              <div className="text-xs text-slate-400 mt-1">{new Date(n.createdAt).toLocaleString()}</div>
            </div>
            <button
              className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200"
              onClick={() => setRead(n.id, !n.isRead)}
            >
              {n.isRead ? "Mark unread" : "Mark read"}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center">
        {nextCursor ? (
          <button className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200" onClick={() => load(nextCursor)}>
            Load more
          </button>
        ) : (
          !loading && <div className="text-sm text-gray-500">No more notifications</div>
        )}
      </div>
    </div>
  );
}
