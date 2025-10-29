import React, { useState } from "react";
import { apiFetch } from "../../lib/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [stage, setStage] = useState("idle");
  const [err, setErr] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    setStage("sending");
    try {
      const res = await apiFetch("/admin/request-password-reset", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStage("sent");
    } catch {
      setErr("Could not send reset email. Please try again.");
      setStage("idle");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <div className="text-center mb-6">
          <img
            className="h-10 mx-auto"
            src="https://i.postimg.cc/9QhL2Tz3/2022-12-10-Malaika-House-Name-only-png.png"
            alt="Malaika House"
          />
          <h1 className="mt-4 text-xl font-semibold text-slate-800">Forgot your password?</h1>
          <p className="text-sm text-slate-600">Enter your email and we’ll send you a reset link.</p>
        </div>

        {stage === "sent" ? (
          <div className="text-center">
            <div className="text-green-600 font-medium">If that email exists, we’ve sent a reset link.</div>
            <a href="/login" className="inline-block mt-4 text-indigo-600 hover:underline">Back to sign in</a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Email address</label>
              <input
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="you@example.com"
              />
            </div>

            {err && <div className="text-sm text-red-600">{err}</div>}

            <button
              type="submit"
              disabled={stage === "sending" || !email.trim()}
              className="w-full h-10 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
            >
              {stage === "sending" ? "Sending…" : "Send reset link"}
            </button>

            <div className="text-center text-sm mt-3">
              <a href="/login" className="text-indigo-600 hover:underline">Back to sign in</a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
