import React, { useEffect, useState } from "react";
import { apiFetch } from "../../../lib/api";

export default function ParentProfileView() {
  const [profile, setProfile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);

  async function loadProfile() {
    setBusy(true); setErr(null);
    const r = await apiFetch("/parent/profile");
    setBusy(false);
    if (!r.ok) { setErr("Failed to load profile"); return; }
    setProfile(await r.json());
  }

  useEffect(() => { loadProfile(); }, []);

  if (busy) return <div className="text-sm text-slate-600">Loading…</div>;
  if (err) return <div className="text-sm text-red-600">{err}</div>;
  if (!profile) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Profile</h2>
        <button
          className="px-3 py-2 text-sm rounded bg-gray-100 hover:bg-gray-200"
          onClick={loadProfile}
        >
          Refresh
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="border rounded-lg p-4">
          <div className="text-xs uppercase text-slate-500 mb-2">Account</div>
          <div className="text-sm text-slate-600">Email</div>
          <div className="font-medium">{profile.user.email}</div>
          <div className="text-sm text-slate-600 mt-3">Role</div>
          <div className="font-medium">{profile.user.role}</div>
          <div className="text-xs text-slate-500 mt-3">
            Member since {new Date(profile.user.createdAt).toLocaleDateString()}
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <div className="text-xs uppercase text-slate-500 mb-2">Children Linked</div>
          {profile.children.length === 0 && (
            <div className="text-sm text-slate-500">No children linked.</div>
          )}
          <div className="space-y-2">
            {profile.children.map(c => (
              <div key={c.id} className="flex items-center justify-between bg-slate-50 rounded p-3">
                <div>
                  <div className="font-medium">
                    {c.firstName} {c.lastName}
                  </div>
                  <div className="text-xs text-slate-600">
                    {c.grade ? `Grade: ${c.grade}` : "Grade: —"}
                    {c.dateOfBirth ? ` • DOB: ${new Date(c.dateOfBirth).toLocaleDateString()}` : ""}
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${c.isActive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                  {c.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
