import React, { useEffect, useState } from "react";
import { apiFetch } from "../../../lib/api";

export default function ActivityList() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const [q, setQ] = useState("");
  const [action, setAction] = useState("");
  const [user, setUser] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  async function load(p = 1) {
    setLoading(true);
    const qs = new URLSearchParams({
      page: String(p),
      pageSize: "20",
    });
    if (q) qs.set("q", q);
    if (action) qs.set("action", action);
    if (user) qs.set("user", user);
    if (from) qs.set("from", from);
    if (to) qs.set("to", to);

    const res = await apiFetch(`/admin/activity?${qs.toString()}`);
    setLoading(false);
    if (!res.ok) return;
    const data = await res.json();
    setRows(data.items || []);
    setPage(data.page);
    setHasMore(!!data.hasMore);
    setTotal(data.total || 0);
  }

  useEffect(() => { load(1); }, []);

  function onSubmit(e) { e.preventDefault(); load(1); }

  function onPrev() {
    if (page <= 1) return;
    load(page - 1);
  }
  function onNext() {
    if (!hasMore) return;
    load(page + 1);
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Activity</h2>
        <div className="text-sm text-gray-500">Total: {total.toLocaleString()}</div>
      </div>

      <form onSubmit={onSubmit} className="grid md:grid-cols-5 gap-3 mb-4">
        <input
          className="border rounded p-2 text-sm"
          placeholder="Search..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <input
          className="border rounded p-2 text-sm"
          placeholder="User email"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          className="border rounded p-2 text-sm"
          placeholder="Action (e.g., USER_CREATE)"
          value={action}
          onChange={(e) => setAction(e.target.value)}
        />
        <input
          type="date"
          className="border rounded p-2 text-sm"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <input
          type="date"
          className="border rounded p-2 text-sm"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <div className="md:col-span-5 flex justify-end">
          <button className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">Filter</button>
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-gray-500">When</th>
              <th className="px-4 py-2 text-left text-gray-500">User</th>
              <th className="px-4 py-2 text-left text-gray-500">Action</th>
              <th className="px-4 py-2 text-left text-gray-500">Title / Message</th>
              <th className="px-4 py-2 text-left text-gray-500">Metadata</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((r) => (
              <tr key={r.id}>
                <td className="px-4 py-2">{new Date(r.createdAt).toLocaleString()}</td>
                <td className="px-4 py-2">{r.actorEmail ?? "-"}</td>
                <td className="px-4 py-2 font-medium">{r.action}</td>
                <td className="px-4 py-2">
                  <div className="font-medium text-slate-800">{r.title ?? r.action}</div>
                  {r.message && <div className="text-gray-500">{r.message}</div>}
                </td>
                <td className="px-4 py-2">
                  {r.metadata ? (
                    <code className="text-xs bg-gray-50 rounded px-2 py-1 block max-w-xs overflow-x-auto">
                      {typeof r.metadata === "string" ? r.metadata : JSON.stringify(r.metadata)}
                    </code>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </tr>
            ))}
            {rows.length === 0 && !loading && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">No activity found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          onClick={onPrev}
          disabled={page <= 1}
        >
          Prev
        </button>
        <div className="text-sm text-gray-500">Page {page}</div>
        <button
          className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          onClick={onNext}
          disabled={!hasMore}
        >
          Next
        </button>
      </div>
    </div>
  );
}