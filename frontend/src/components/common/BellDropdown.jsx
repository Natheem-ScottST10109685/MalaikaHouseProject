import React, { useEffect, useRef, useState } from "react";
import { apiFetch } from "../../lib/api";

export default function BellDropdown({
  unreadCount: unreadCountProp = 0,
  onViewAll,
  buttonClassName = "",
  label = null,
  scope = "user",
  ...props
}) {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(unreadCountProp);
  const [items, setItems] = useState([]);
  const ref = useRef(null);
  const base = scope === "admin" ? "/admin/notifications" : "/notifications";

  async function loadUnreadCount() {
    const res = await apiFetch(`${base}/unread-count`);
    if (res.ok) {
      const { count } = await res.json();
      setCount(count);
    }
  }

  async function loadLatest() {
    const res = await apiFetch(`${base}?limit=10`);
    if (res.ok) {
      const { items } = await res.json();
      setItems(items);
    }
  }

  useEffect(() => {
    loadUnreadCount();
    const t = setInterval(loadUnreadCount, 60_000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    function onDoc(e) {
      if (open && ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  async function toggle() {
    if (!open) await loadLatest();
    setOpen(v => !v);
  }

  async function markRead(id, isRead) {
    const res = await apiFetch(`${base}/${id}/read`, {
      method: "PATCH",
      body: JSON.stringify({ isRead }),
    });
    if (res.ok) {
      setItems(prev => prev.map(n => (n.id === id ? { ...n, isRead } : n)));
      loadUnreadCount();
    }
  }

  async function markAllRead() {
    const res = await apiFetch(`${base}/mark-all-read`, { method: "POST" });
    if (res.ok) {
      setItems(prev => prev.map(n => ({ ...n, isRead: true })));
      setCount(0);
    }
  }

  return (
    <div className="relative" ref={ref}>
      <button
        className={buttonClassName}
        aria-label="Notifications"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={toggle}
      >
        🔔 {label}
        {(count ?? 0) > 0 && (
          <span className="ml-2 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-red-500 px-1 text-xs font-semibold text-white">
            {count}
          </span>
        )}
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-lg border p-2 z-50"
          role="menu"
        >
          <div className="flex items-center justify-between px-2 py-1">
            <div className="font-semibold text-slate-700">Notifications</div>
            <div className="flex gap-2">
              <button
                className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200"
                onClick={markAllRead}
              >
                Mark all read
              </button>
              <button
                className="text-xs px-2 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                onClick={() => { setOpen(false); onViewAll?.(); }}
              >
                View all
              </button>
            </div>
          </div>

          <div className="max-h-80 overflow-auto divide-y">
            {items.length === 0 && (
              <div className="text-sm text-gray-500 p-4 text-center">No notifications</div>
            )}
            {items.map(n => (
              <div key={n.id} className="p-3 flex gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${n.isRead ? 'bg-gray-300' : 'bg-red-500'}`} />
                <div className="flex-1">
                  <div className="font-medium text-slate-800">{n.title}</div>
                  <div className="text-sm text-slate-600">{n.message}</div>
                  <div className="text-xs text-slate-400 mt-1">
                    {new Date(n.createdAt).toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={() => markRead(n.id, !n.isRead)}
                  className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 self-start"
                >
                  {n.isRead ? "Mark unread" : "Mark read"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
