import React, { useEffect, useState } from "react";
import { apiFetch } from "../../lib/api";

export default function ParentProfile() {
  const [data, setData] = useState({ user: null, children: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await apiFetch("/parent/profile");
        if (!r.ok) throw new Error("Failed to load profile");
        const payload = await r.json();
        if (alive) setData({ user: payload.user, children: payload.children || [] });
      } catch (e) {
        if (alive) setError(e?.message || "Failed to load profile");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  if (loading) return <div className="p-4 text-sm text-gray-500">Loading profile…</div>;
  if (error) return <div className="p-4 text-sm text-red-600">{error}</div>;
  if (!data.user) return null;

  const u = data.user;

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* User card */}
      <div className="md:col-span-1 p-6 rounded-2xl border bg-white shadow-sm">
        <h3 className="text-lg font-semibold">Parent Account</h3>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-500">Email</dt>
            <dd className="font-medium">{u.email}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Role</dt>
            <dd className="font-medium">{u.role}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Status</dt>
            <dd className="font-medium">{u.isActive ? "Active" : "Inactive"}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Created</dt>
            <dd className="font-medium">{new Date(u.createdAt).toLocaleDateString()}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Updated</dt>
            <dd className="font-medium">{new Date(u.updatedAt).toLocaleDateString()}</dd>
          </div>
          {u.mustResetPassword ? (
            <div className="text-xs px-2 py-1 rounded bg-yellow-50 text-yellow-700 inline-block">
              Password reset required
            </div>
          ) : null}
        </dl>
      </div>

      {/* Children list */}
      <div className="md:col-span-2 p-6 rounded-2xl border bg-white shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Linked Children</h3>
        </div>
        {data.children?.length ? (
          <ul className="divide-y">
            {data.children.map((c) => (
              <li key={c.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    {c.firstName} {c.lastName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {c.dateOfBirth ? new Date(c.dateOfBirth).toLocaleDateString() : "DOB not set"}
                    {c.grade ? ` • Grade ${c.grade}` : ""}
                  </p>
                  <p className="text-xs text-gray-400">
                    Linked {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "—"}
                  </p>
                </div>
                <span
                  className={
                    "text-xs px-2 py-0.5 rounded-full " +
                    (c.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600")
                  }
                >
                  {c.isActive ? "Active" : "Inactive"}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No children linked yet.</p>
        )}
      </div>
    </div>
  );
}