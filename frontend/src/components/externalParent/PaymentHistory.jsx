import React, { useEffect, useState } from "react";
import { apiFetch } from "../../lib/api";

function centsToCurrency(cents, currency = "ZAR") {
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency })
      .format((cents || 0) / 100);
  } catch {
    return `R ${(cents || 0) / 100}`;
  }
}

function titleCase(s) {
  return (s || "").toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
}

export default function PaymentHistory() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function load() {
    try {
      setError(null);
      setLoading(true);
      const r = await apiFetch("/parent/me/payments");
      if (!r.ok) throw new Error("Failed to load payments");
      const data = await r.json();
      setRows(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e?.message || "Failed to load payments");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        await load();
      } finally {
        if (!alive) return;
      }
    })();
    return () => { alive = false; };
  }, []);

  if (loading) return <div className="p-4 text-sm text-gray-500">Loading payment history…</div>;
  if (error) return (
    <div className="p-6 rounded-2xl border bg-white shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">Payment History</h3>
        <button className="px-3 py-1.5 text-sm rounded bg-gray-100 hover:bg-gray-200" onClick={load}>Retry</button>
      </div>
      <p className="text-sm text-red-600">{error}</p>
    </div>
  );

  if (!rows.length) {
    return (
      <div className="p-6 rounded-2xl border bg-white shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">Payment History</h3>
          <button className="px-3 py-1.5 text-sm rounded bg-gray-100 hover:bg-gray-200" onClick={load}>Refresh</button>
        </div>
        <p className="text-sm text-gray-500">No payments recorded yet.</p>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-2xl border bg-white shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Payment History</h3>
        <button className="px-3 py-1.5 text-sm rounded bg-gray-100 hover:bg-gray-200" onClick={load}>Refresh</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-2 pr-4">Date</th>
              <th className="py-2 pr-4">Amount</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">Method</th>
              <th className="py-2 pr-4">Reference</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id} className="border-b last:border-0">
                <td className="py-2 pr-4">{p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}</td>
                <td className="py-2 pr-4 font-medium">{centsToCurrency(p.amountCents, p.currency || "ZAR")}</td>
                <td className="py-2 pr-4">
                  <span
                    className={
                      "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium " +
                      (p.status === "PAID"
                        ? "bg-green-100 text-green-700"
                        : p.status === "REFUNDED"
                        ? "bg-blue-100 text-blue-700"
                        : p.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700")
                    }
                  >
                    {titleCase(p.status)}
                  </span>
                </td>
                <td className="py-2 pr-4">{p.method ? titleCase(p.method) : "—"}</td>
                <td className="py-2 pr-4 font-mono">{p.reference || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
