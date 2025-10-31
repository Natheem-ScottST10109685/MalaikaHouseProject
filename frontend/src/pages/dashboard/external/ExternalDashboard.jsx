import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/dashboard/SideBar";
import BellDropdown from "../../../components/common/BellDropdown";
import { apiFetch, setAccessToken } from "../../../lib/api";
import Modal from "../../../components/common/Modal";
import ChildSwitcher from "../../../components/parent/dashboard/ChildSwitcher";
import ScheduleList from "../../../components/parent/sessions/ScheduleList";
import SessionHistoryList from "../../../components/parent/sessions/SessionHistoryList";
import ParentSubscriptions from "../../../components/parent/subscriptions/ParentSubscriptions";

const THEME = {
  brand600: "#6b5ca5",
  brand500: "#7a6fc0",
  brand400: "#a084e8",
  chipBg:   "#efe7ff",
  chipText: "#6b5ca5",
  ink900:   "#1f2937",
  mutedBg:  "#f5f6f8",
};

function LogoutConfirm({ open, onClose, onConfirm }) {
  const footer = (
    <>
      <button className="px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200" onClick={onClose}>
        Cancel
      </button>
      <button
        className="px-4 py-2 rounded-md text-white hover:brightness-95"
        style={{ backgroundColor: THEME.brand600 }}
        onClick={onConfirm}
      >
        Logout
      </button>
    </>
  );
  return (
    <Modal open={open} onClose={onClose} title="Confirm Logout" footer={footer}>
      <p className="text-sm text-slate-600">Are you sure you want to log out?</p>
    </Modal>
  );
}

function ParentKpis({ kpis }) {
  const items = [
    { emoji: "🎯", value: kpis?.sessionsRemaining ?? 0, label: "Sessions Left" },
    { emoji: "📅", value: kpis?.upcomingCount ?? 0, label: "Upcoming Sessions" },
    { emoji: "🌟", value: kpis?.progressScore ?? "—", label: "Progress Score" },
    { emoji: "💳", value: kpis?.planName ?? "—", label: "Plan" },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      {items.map((k) => (
        <div key={k.label} className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-start mb-2">
            <div className="text-2xl">{k.emoji}</div>
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">{k.value}</div>
          <div className="text-sm text-gray-600">{k.label}</div>
        </div>
      ))}
    </div>
  );
}

function UpcomingList({ items }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center border-b pb-3 mb-4">
        <h2 className="font-semibold text-lg text-[#5D5A7A]">Upcoming Sessions</h2>
      </div>
      <div className="space-y-3">
        {items.length === 0 && <div className="text-sm text-gray-500">No upcoming sessions.</div>}
        {items.map((s) => (
          <div key={s.id} className="bg-[#F5F5F5] p-4 rounded-lg flex justify-between items-center">
            <div>
              <div className="font-semibold text-[#5D5A7A]">
                {new Date(s.startAt).toLocaleString()}
              </div>
              <div className="text-sm text-[#6B5F7A]">
                {s.type} • {s.location}
              </div>
            </div>
            <div
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{ backgroundColor: THEME.chipBg, color: THEME.chipText }}
            >
              {s.status ?? "Upcoming"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ExternalParentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("#dashboard");
  const [pageTitle, setPageTitle] = useState("Dashboard");

  const [me, setMe] = useState(null);
  const [children, setChildren] = useState([]);
  const [selectedChildId, setSelectedChildId] = useState(null);

  const [kpis, setKpis] = useState(null);
  const [upcoming, setUpcoming] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [historyItems, setHistoryItems] = useState([]);

  const [logoutOpen, setLogoutOpen] = useState(false);

  const [events, setEvents] = useState([]);
  const [bookingChildByEvent, setBookingChildByEvent] = useState({});
  const [bookingBusy, setBookingBusy] = useState({});
  const [bookingMsg, setBookingMsg] = useState(null);

  const parentSidebarSections = [
    { title: "Overview", items: [
      { href: "#dashboard", label: "Dashboard", icon: "📊" },
      { href: "#progress",  label: "Child Progress", icon: "📈" },
    ]},
    { title: "Sessions", items: [
      { href: "#schedule", label: "Schedule", icon: "📅" },
      { href: "#book",     label: "Book Session", icon: "➕" },
      { href: "#history",  label: "Session History", icon: "📋" },
    ]},
    { title: "Subscription", items: [
      { href: "#subscriptions", label: "Subscriptions", icon: "💳" },
      { href: "#payments", label: "Payment History", icon: "💰" },
    ]},
    { title: "Account", items: [
      { href: "#profile",  label: "Profile", icon: "👤" },
      { href: "#settings", label: "Settings", icon: "⚙️" },
    ]},
  ];

  function onNavClick(href) {
    setActiveNav(href);
    const found = parentSidebarSections.flatMap(s => s.items).find(i => i.href === href);
    if (found?.label) setPageTitle(found.label);
    if (window.innerWidth < 768) setSidebarOpen(false);

    if (href === "#book") loadParentEvents();
    if (href === "#schedule") loadAppointments();
    if (href === "#history") loadHistory();
  }

  async function loadOverview() {
    const r = await apiFetch("/parent/overview?scope=heart");
    if (r.ok) {
      const data = await r.json();
      setMe(data.me);
      setChildren(data.children || []);
      setKpis(data.kpis || null);
      if ((data.children || []).length && !selectedChildId) {
        setSelectedChildId(data.children[0].id);
      }
    }
  }

  async function loadSessions() {
    const s = await apiFetch("/parent/sessions?scope=heart");
    if (s.ok) {
      const data = await s.json();
      setUpcoming((data.upcoming || []).filter(isHeartProgram));
    }
  }

  async function loadAppointments() {
    const res = await apiFetch("/parent/appointments?scope=heart");
    if (res.ok) {
      const data = await res.json();
      setAppointments((data.items || []).filter(isHeartProgram));
    }
  }

  async function loadParentEvents() {
    const r = await apiFetch("/parent/events?program=HEART");
    if (r.ok) {
      const data = await r.json();
      const list = Array.isArray(data) ? data : (data.items ?? data.events ?? []);
      setEvents(list.filter(isHeartProgram));
    } else {
      setEvents([]);
    }
  }

  async function loadHistory() {
    const r = await apiFetch("/parent/appointments/history?scope=heart");
    if (r.ok) {
      const data = await r.json();
      setHistoryItems((data.items || []).filter(isHeartProgram));
    }
  }

  function isHeartProgram(item) {
    const t = `${item?.program || ""} ${item?.type || ""} ${item?.title || ""}`.toLowerCase();
    return /heart/.test(t);
  }

  async function bookEventForChild(eventId) {
    const childId = bookingChildByEvent[eventId];
    if (!childId) {
      setBookingMsg({ type: "warn", text: "Please select a child first." });
      return;
    }
    try {
      setBookingBusy((m) => ({ ...m, [eventId]: true }));
      const res = await apiFetch("/parent/appointments", {
        method: "POST",
        body: JSON.stringify({ childId, eventId }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setBookingMsg({ type: "error", text: err?.error || "Could not book session." });
        return;
      }
      setBookingMsg({ type: "ok", text: "Session booked successfully!" });
      await loadAppointments();
      await loadSessions();
    } catch {
      setBookingMsg({ type: "error", text: "Network error booking session." });
    } finally {
      setBookingBusy((m) => ({ ...m, [eventId]: false }));
    }
  }

  useEffect(() => {
    loadOverview();
    loadSessions();
    loadAppointments();
    loadHistory();
  }, []);

  function onLogoutConfirmed() {
    setAccessToken(null);
    sessionStorage.clear();
    window.location.assign("/login");
  }

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: THEME.mutedBg }}>
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={me}
        sections={parentSidebarSections}
        activeHref={activeNav}
        onItemClick={onNavClick}
        headerSlot={
          <ChildSwitcher
            childrenList={children}
            activeChildId={selectedChildId}
            onSelect={setSelectedChildId}
          />
        }
      />

      <main className="flex-1 ml-0 md:ml-64 min-h-screen">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white shadow-sm px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              onClick={() => setSidebarOpen((s) => !s)}
            >
              ☰
            </button>
            <h1 className="text-2xl font-bold" style={{ color: THEME.ink900 }}>{pageTitle}</h1>
          </div>
          <div className="flex items-center gap-3">
            <BellDropdown base="/notifications" onViewAll={() => onNavClick("#notifications")} />
            <button
              className="px-4 py-2 rounded-lg text-white hover:brightness-95"
              style={{ backgroundColor: THEME.brand600 }}
              onClick={() => setLogoutOpen(true)}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-auto">
          {activeNav === "#dashboard" && (
            <>
              <div
                className="relative text-white p-8 rounded-2xl"
                style={{ background: `linear-gradient(135deg, ${THEME.brand500}, ${THEME.brand400})` }}
              >
                <div className="relative z-10">
                  <h2 className="text-2xl font-semibold mb-2">
                    Welcome back{me ? `, ${me.email.split("@")[0]}` : ""}!
                  </h2>
                  <p className="opacity-95 text-lg">
                    {kpis ? `You have ${kpis.sessionsRemaining} sessions remaining this month.` : "Loading…"}
                  </p>
                </div>
              </div>

              <ParentKpis kpis={kpis} />

              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <UpcomingList items={upcoming} />
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h2 className="font-semibold text-lg mb-2" style={{ color: THEME.ink900 }}>
                    Plan
                  </h2>
                  <div className="bg-[#F5F5F5] p-4 rounded-lg text-sm text-[#6B5F7A]">
                    Plan: {kpis?.planName ?? "—"}<br />
                    Auto-renewal: {kpis?.autoRenewDate ? new Date(kpis.autoRenewDate).toLocaleDateString() : "—"}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      className="px-3 py-2 text-sm rounded text-white hover:brightness-95"
                      style={{ backgroundColor: THEME.brand600 }}
                      onClick={() => onNavClick("#subscriptions")}
                    >
                      Manage Subscription
                    </button>
                    <button className="px-3 py-2 text-sm rounded bg-gray-100 hover:bg-gray-200" onClick={() => onNavClick("#payments")}>
                      Payment History
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeNav === "#progress" && (
            <div className="bg-white p-6 rounded-xl shadow-md">Child progress (Heart Program only)</div>
          )}

          {activeNav === "#schedule" && <ScheduleList items={appointments} />}

          {activeNav === "#book" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold" style={{ color: THEME.ink900 }}>
                  Book a Session (Heart Program)
                </h2>
                <button className="px-3 py-2 text-sm rounded bg-gray-100 hover:bg-gray-200" onClick={loadParentEvents}>
                  Refresh
                </button>
              </div>

              {bookingMsg && (
                <div
                  className={`p-3 rounded ${
                    bookingMsg.type === "ok"
                      ? "bg-green-50 text-green-700"
                      : bookingMsg.type === "warn"
                      ? "bg-yellow-50 text-yellow-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {bookingMsg.text}
                </div>
              )}

              {children.length === 0 && (
                <div className="bg-white p-4 rounded-lg shadow border text-sm text-slate-700">
                  You don’t have any children on your account yet.
                </div>
              )}

              <div className="grid gap-4">
                {(Array.isArray(events) ? events : []).map((ev) => {
                  const start = new Date(ev.startAt);
                  const end = new Date(ev.endAt);
                  const busy = !!bookingBusy[ev.id];

                  return (
                    <div key={ev.id} className="bg-white rounded-lg shadow p-4 flex flex-wrap md:flex-nowrap md:items-center gap-4">
                      <div className="flex-1 min-w-[220px]">
                        <div className="font-semibold text-gray-800">{ev.title}</div>
                        <div className="text-sm text-gray-500">
                          {ev.type} • {ev.location || "TBA"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {start.toLocaleDateString()} • {start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} – {end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>

                      <span
                        className="px-3 py-1 text-xs rounded h-fit"
                        style={{ backgroundColor: THEME.chipBg, color: THEME.chipText }}
                      >
                        {ev.status || "Upcoming"}
                      </span>

                      <div className="flex items-center gap-2 ml-auto">
                        <select
                          className="border rounded p-2 text-sm"
                          value={bookingChildByEvent[ev.id] || ""}
                          onChange={(e) => setBookingChildByEvent((m) => ({ ...m, [ev.id]: e.target.value }))}
                          disabled={children.length === 0 || busy}
                        >
                          <option value="">Select child…</option>
                          {children.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.firstName} {c.lastName}
                            </option>
                          ))}
                        </select>

                        <button
                          className="px-4 py-2 rounded-lg text-white hover:brightness-95 disabled:opacity-60"
                          style={{ backgroundColor: THEME.brand600 }}
                          onClick={() => bookEventForChild(ev.id)}
                          disabled={!bookingChildByEvent[ev.id] || busy || children.length === 0}
                        >
                          {busy ? "Booking…" : "Book"}
                        </button>
                      </div>
                    </div>
                  );
                })}

                {events.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    No upcoming Heart Program events available right now.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeNav === "#history" && <SessionHistoryList items={historyItems} />}

          {activeNav === "#subscriptions" && (
            <ParentSubscriptions
              childrenList={children}
              onChanged={() => {
                loadOverview();
              }}
              filterPlans={(plan) => {
                const t = `${plan?.name || ""} ${plan?.description || ""}`.toLowerCase();
                return /heart/.test(t);
              }}
            />
          )}

          {activeNav === "#payments" && <div className="bg-white p-6 rounded-xl shadow-md">Payment history</div>}
          {activeNav === "#profile" && <div className="bg-white p-6 rounded-xl shadow-md">Profile form</div>}
          {activeNav === "#settings" && <div className="bg-white p-6 rounded-xl shadow-md">Account settings</div>}
        </div>

        <LogoutConfirm
          open={logoutOpen}
          onClose={() => setLogoutOpen(false)}
          onConfirm={onLogoutConfirmed}
        />
      </main>
    </div>
  );
}
