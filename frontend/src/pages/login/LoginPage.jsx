import React, { useState } from "react";
import { apiFetch, setAccessToken } from "../../lib/api";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const isFormValid = email.trim() && password.trim();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data?.error?.code === "INVALID_CREDENTIALS") {
          throw new Error("Incorrect email or password.");
        }
        throw new Error("Could not sign in. Please try again.");
      }

      const data = await res.json();
      setAccessToken(data.accessToken);
      sessionStorage.setItem("userRole", data.user?.role ?? "");

      const destination =
        data.dashboard ?? (data.user?.role === "ADMIN" ? "/admin" : "/parent");
      window.location.assign(destination);
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* top accent bar for brand */}
      <div className="h-1 bg-gradient-to-r from-indigo-500 via-indigo-400 to-indigo-300" />

      <div className="mx-auto grid min-h-[calc(100vh-4px)] w-full max-w-6xl grid-cols-1 md:grid-cols-2">
        {/* Branding side */}
        <aside className="relative hidden md:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-indigo-600 to-indigo-400 p-10 text-white">
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src="https://i.postimg.cc/D09ZbnHD/2022-12-10-Malaika-House-Main-Logo-PNG-RGB.png"
                alt="Malaika House"
                className="h-12 drop-shadow-md"
              />
            </Link>
            <p className="mt-6 max-w-md text-indigo-50">
              Empowering neurodivergent children and their families through
              inclusive programs, community support, and heart-focused learning.
            </p>
          </div>

          <ul className="grid gap-3">
            {[
              ["🎯", "Heart Program Sessions"],
              ["👥", "Community Support"],
              ["📈", "Progress Tracking"],
              ["🤝", "Partnership Network"],
            ].map(([icon, label]) => (
              <li
                key={label}
                className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm ring-1 ring-white/20"
              >
                <span className="text-xl">{icon}</span>
                <span className="font-medium">{label}</span>
              </li>
            ))}
          </ul>

          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        </aside>

        {/* Form side */}
        <main className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-semibold">Welcome back</h2>
              <p className="mt-1 text-sm text-slate-600">
                Please sign in to continue
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-200"
            >
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="you@example.com"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border border-slate-300 px-3 py-2 pr-10 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-2 inline-flex items-center rounded-md px-2 text-slate-500 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "🙈" : "👁"}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div
                  role="alert"
                  className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-200"
                >
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={!isFormValid || isLoading}
                className="inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {isLoading ? "Logging in…" : "Sign In"}
              </button>

              <div className="flex items-center justify-between text-sm">
                <Link
                  to="/"
                  className="text-slate-600 underline-offset-4 hover:underline"
                >
                  Back to site
                </Link>
                <Link
                  to="/reset-password"
                  className="text-indigo-700 underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
            </form>

            {/* Support */}
            <div className="mt-6 rounded-xl bg-slate-50 p-4 text-center ring-1 ring-slate-200">
              <div className="font-medium">Need help?</div>
              <p className="mt-1 text-sm text-slate-600">
                Contact our support team for assistance with account access or technical issues.
              </p>
              <a
                className="mt-2 inline-block text-sm font-medium text-indigo-700 underline-offset-4 hover:underline"
                href="mailto:support@malaikahouse.com"
              >
                support@malaikahouse.com
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
