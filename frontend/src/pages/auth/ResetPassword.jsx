import React, { useEffect, useState } from "react";
import { apiFetch } from "../../lib/api";

export default function ResetPassword() {
  const [token, setToken] = useState("");
  const [stage, setStage] = useState("checking");
  const [error, setError] = useState("");
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("token") || "";
    setToken(t);

    if (!t) {
      setStage("invalid");
      return;
    }

    (async () => {
      try {
        const res = await apiFetch("/auth/validate-reset-token", {
          method: "POST",
          body: JSON.stringify({ token: t }),
        });
        const data = await res.json().catch(() => ({}));
        setStage(data?.ok ? "ready" : "invalid");
      } catch {
        setStage("invalid");
      }
    })();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!pw1 || pw1.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (pw1 !== pw2) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setStage("submitting");
      const res = await apiFetch("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, password: pw1 }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setError(d?.error === "invalid_or_expired" ? "This reset link is invalid or has expired." : "Could not reset password.");
        setStage("ready");
        return;
      }
      setStage("success");
      setTimeout(() => {
        window.location.assign("/login");
      }, 1200);
    } catch {
      setError("Network error. Please try again.");
      setStage("ready");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <div className="text-center mb-6">
          <img
            src="https://i.postimg.cc/9QhL2Tz3/2022-12-10-Malaika-House-Name-only-png.png"
            alt="Malaika House"
            className="h-10 mx-auto"
          />
          <h1 className="mt-4 text-xl font-semibold text-slate-800">Reset your password</h1>
          <p className="text-sm text-slate-600">Choose a new password to access your account.</p>
        </div>

        {stage === "checking" && (
          <div className="text-center text-slate-600">Checking your reset link…</div>
        )}

        {stage === "invalid" && (
          <div className="text-center">
            <div className="text-red-600 font-medium">This reset link is invalid or has expired.</div>
            <a href="/login" className="inline-block mt-4 text-indigo-600 hover:underline">
              Return to sign in
            </a>
          </div>
        )}

        {(stage === "ready" || stage === "submitting") && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">New password</label>
              <input
                type="password"
                className="mt-1 block w-full rounded-md border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={pw1}
                onChange={(e) => setPw1(e.target.value)}
                placeholder="At least 8 characters"
                minLength={8}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Confirm password</label>
              <input
                type="password"
                className="mt-1 block w-full rounded-md border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={pw2}
                onChange={(e) => setPw2(e.target.value)}
                required
              />
            </div>

            {error && <div className="text-sm text-red-600">{error}</div>}

            <button
              type="submit"
              disabled={stage === "submitting"}
              className="w-full h-10 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
            >
              {stage === "submitting" ? "Updating…" : "Update Password"}
            </button>
          </form>
        )}

        {stage === "success" && (
          <div className="text-center">
            <div className="text-green-600 font-medium">Password updated successfully!</div>
            <div className="text-sm text-slate-600 mt-1">Redirecting to sign in…</div>
          </div>
        )}
      </div>
    </div>
  );
}
