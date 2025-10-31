import React, { useEffect, useState, useMemo } from "react";
import Sidebar from "../../../components/dashboard/SideBar";
import { apiFetch, setAccessToken } from "../../../lib/api";
import Modal from "../../../components/common/Modal";
import ChildSwitcher from "../../../components/parent/dashboard/ChildSwitcher";
import ScheduleList from "../../../components/parent/sessions/ScheduleList";
import SessionHistoryList from "../../../components/parent/sessions/SessionHistoryList";
import StudentReportsList from "../../../components/parent/reports/StudentReportsList";

function LogoutConfirm({ open, onClose, onConfirm }) {
  const footer = (
    <>
      <button className="px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200" onClick={onClose}>Cancel</button>
      <button className="px-4 py-2 rounded-md bg-[#7B9BC4] text-white hover:bg-[#8DB4A8]" onClick={onConfirm}>Logout</button>
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
    { emoji: "🎯", value: kpis?.sessionsRemaining ?? 0, label: "Sessions Left (Year)" },
    { emoji: "📅", value: kpis?.upcomingCount ?? 0, label: "Upcoming (This Month)" },
    { emoji: "🌟", value: kpis?.progressScore ?? "—", label: "Progress Score" },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
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
              <div className="text-sm text-[#6B5F7A]">{s.type} • {s.location || "TBA"}</div>
            </div>
            <div className="bg-[#7B9BC4]/20 text-[#7B9BC4] px-3 py-1 rounded-full text-xs font-semibold">
              {s.status ?? "Upcoming"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function isSameMonthAndYear(date, ref) {
  return date.getMonth() === ref.getMonth() && date.getFullYear() === ref.getFullYear();
}
function isSameYear(date, ref) {
  return date.getFullYear() === ref.getFullYear();
}
function normalizeItems(items) {
  return Array.isArray(items) ? items : [];
}

export default function ParentOverview() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("#dashboard");
  const [pageTitle, setPageTitle] = useState("Dashboard");

  const [me, setMe] = useState(null);
  const [children, setChildren] = useState([]);
  const [selectedChildId, setSelectedChildId] = useState(null);

  const [kpis, setKpis] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const [events, setEvents] = useState([]);
  const [bookingChildByEvent, setBookingChildByEvent] = useState({});
  const [bookingBusy, setBookingBusy] = useState({});
  const [bookingMsg, setBookingMsg] = useState(null);
  const [historyItems, setHistoryItems] = useState([]);
  const [reportSummary, setReportSummary] = useState(null);
  const [recentReports, setRecentReports] = useState([]);

  const [clubs, setClubs] = useState([]);
  const [enrollBusy, setEnrollBusy] = useState({});
  const [enrollMsg, setEnrollMsg] = useState(null);

  const parentSidebarSections = [
    { title: "Overview", items: [
      { href: "#dashboard", label: "Dashboard", icon: "📊" },
      { href: "#reports", label: "Student Reports", icon: "📝" },
    ]},
    { title: "Sessions", items: [
      { href: "#schedule", label: "Schedule", icon: "📅" },
      { href: "#book",     label: "Book Session", icon: "➕" },
      { href: "#clubs",    label: "Clubs", icon: "🎭" },
      { href: "#history",  label: "Session History", icon: "📋" },
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

  async function loadClubs() {
    const r = await apiFetch("/parent/clubs");
    if (r.ok) {
      const d = await r.json();
      setClubs(d.items || []);
    } else {
      setClubs([]);
    }
  }

  async function loadRecentReports(childId) {
    const qs = childId ? `?childId=${encodeURIComponent(childId)}&pageSize=5` : `?pageSize=5`;
    const r = await apiFetch(`/api/parent/reports${qs}`);
    if (r.ok) {
      const data = await r.json();
      setRecentReports(data.items || []);
    } else {
      setRecentReports([]);
    }
  }

  async function loadOverview() {
    const r = await apiFetch("/parent/overview");
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

  async function loadAppointments() {
    const res = await apiFetch("/parent/appointments");
    if (res.ok) {
      const data = await res.json();
      const items = data.items || [];
      setAppointments(items);
    }
  }

  async function loadParentEvents() {
    const r = await apiFetch("/parent/events");
    if (r.ok) {
      const data = await r.json();
      const list = Array.isArray(data) ? data : (data.items ?? data.events ?? []);
      setEvents(list);
    } else {
      console.error("Failed to load /parent/events");
      setEvents([]);
    }
  }

  async function bookEventForChild(eventId) {
    const childId = bookingChildByEvent[eventId] || selectedChildId;
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
      await Promise.all([loadAppointments(), loadHistory()]);
    } catch {
      setBookingMsg({ type: "error", text: "Network error booking session." });
    } finally {
      setBookingBusy((m) => ({ ...m, [eventId]: false }));
    }
  }

  async function loadHistory() {
    const r = await apiFetch("/parent/appointments/history");
    if (r.ok) {
      const data = await r.json();
      setHistoryItems(data.items || []);
    }
  }

  async function loadReportSummary(childId) {
    const qs = childId ? `?childId=${encodeURIComponent(childId)}` : "";
    const r = await apiFetch(`/api/parent/reports/summary${qs}`);
    if (r.ok) {
      const data = await r.json();
      setReportSummary(data);
      setKpis(k => ({
        ...(k || {}),
        progressScore:
          typeof data.overallAvg === "number"
            ? Number(data.overallAvg).toFixed(1)
            : "—",
      }));
    }
  }

  async function enrollChildToClub(clubId) {
    const childId = selectedChildId || children[0]?.id;
    if (!childId) {
      setEnrollMsg({ type: "warn", text: "Please select a child first." });
      return;
    }
    try {
      setEnrollBusy(m => ({ ...m, [clubId]: true }));
      const res = await apiFetch(`/parent/clubs/${clubId}/enroll`, {
        method: "POST",
        body: JSON.stringify({ childId }),
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        setEnrollMsg({ type: "error", text: e?.error || "Could not enroll." });
        return;
      }
      const { created } = await res.json();
      setEnrollMsg({ type: "ok", text: created ? `Enrolled (${created} session${created === 1 ? "" : "s"} added to schedule)` : "No new sessions to add." });
      await loadAppointments();
      await loadSessions();
    } finally {
      setEnrollBusy(m => ({ ...m, [clubId]: false }));
    }
  }

  useEffect(() => {
    if (activeNav === "#clubs") loadClubs();
  }, [activeNav]);

  useEffect(() => {
    loadOverview();
    loadAppointments();
    loadHistory();
    loadReportSummary(null);
    loadRecentReports(null);
  }, []);

  const monthCount = useMemo(() => {
    const now = new Date();
    const items = normalizeItems(appointments)
      .filter(a => !selectedChildId || a.childId === selectedChildId)
      .filter(a => new Date(a.startAt) >= now)
      .filter(a => isSameMonthAndYear(new Date(a.startAt), now));
    return items.length;
  }, [appointments, selectedChildId]);

  const yearRemaining = useMemo(() => {
    const now = new Date();
    const items = normalizeItems(appointments)
      .filter(a => !selectedChildId || a.childId === selectedChildId)
      .filter(a => new Date(a.startAt) >= now)
      .filter(a => isSameYear(new Date(a.startAt), now));
    return items.length;
  }, [appointments, selectedChildId]);

  useEffect(() => {
    setKpis(k => ({
      ...(k || {}),
      upcomingCount: monthCount,
      sessionsRemaining: yearRemaining,
    }));
  }, [monthCount, yearRemaining]);

  useEffect(() => {
    if (selectedChildId) {
      loadReportSummary(selectedChildId);
      loadRecentReports(selectedChildId);
    } else {
      loadRecentReports(null);
    }
  }, [selectedChildId]);

  function onLogoutConfirmed() {
    setAccessToken(null);
    sessionStorage.clear();
    window.location.assign("/login");
  }

  const activeChild = useMemo(
    () => children.find(c => c.id === selectedChildId) || null,
    [children, selectedChildId]
  );

  const childName =
    activeChild ? `${activeChild.firstName || ""} ${activeChild.lastName || ""}`.trim() : null;

  return (
    <div className="flex min-h-screen">
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
            onSelect={(childId) => setSelectedChildId(childId)}
          />
        }
      />

      <main className="flex-1 ml-0 md:ml-64 min-h-screen bg-[#F5F5F5]">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-white shadow-sm px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg" onClick={() => setSidebarOpen(s => !s)}>☰</button>
            <h1 className="text-2xl font-bold text-gray-800">{pageTitle}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
              onClick={() => (window.location.href = "/notifications")}
            >
              Notifications
            </button>
            <button
              className="px-4 py-2 bg-[#7B9BC4] text-white rounded-lg hover:bg-[#8DB4A8] transition-colors"
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
              <div className="relative bg-gradient-to-br from-[#A594C7] to-[#8DB4A8] text-white p-8 rounded-2xl">
                <div className="relative z-10">
                  <h2 className="text-2xl font-semibold mb-1">
                    {childName ? `${childName}` : "Welcome!"}
                  </h2>
                  <p className="opacity-95 text-lg">
                    {typeof kpis?.upcomingCount === "number"
                      ? `${activeChild ? `${activeChild.firstName} ${activeChild.lastName} has` : "You have"} ${kpis.upcomingCount} session${kpis.upcomingCount === 1 ? "" : "s"} this month.`
                      : "Loading…"}
                  </p>
                </div>
              </div>

              {/* KPI cards */}
              <ParentKpis kpis={kpis} />

              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <UpcomingList
                    items={normalizeItems(appointments)
                      .filter(a => !selectedChildId || a.childId === selectedChildId)
                      .filter(a => new Date(a.startAt) >= new Date())
                      .sort((a, b) => new Date(a.startAt) - new Date(b.startAt))
                      .slice(0, 6)}
                  />
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h2 className="font-semibold text-lg text-[#5D5A7A] mb-2">Access</h2>
                  <div className="bg-[#F5F5F5] p-4 rounded-lg text-sm text-[#6B5F7A]">
                    Your child’s access to **Malaika events & clubs** is included as part of the school program.
                    No additional payments are required to book.
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                  <h2 className="font-semibold text-lg text-[#5D5A7A]">Recent Student Reports</h2>
                  <button
                    className="px-3 py-2 text-sm rounded bg-gray-100 hover:bg-gray-200"
                    onClick={() => setActiveNav("#reports")}
                  >
                    View All
                  </button>
                </div>

                {recentReports.length === 0 && (
                  <div className="text-sm text-gray-500">No reports yet.</div>
                )}

                <div className="space-y-3">
                  {recentReports.map(r => (
                    <a
                      key={r.id}
                      href={`/reports/${r.id}`}
                      className="block bg-[#F5F5F5] hover:bg-[#B8B5C0]/30 p-4 rounded-lg transition"
                    >
                      <div className="flex justify-between">
                        <div className="font-semibold text-[#5D5A7A]">
                          {(r.child?.firstName || "") + " " + (r.child?.lastName || "")}
                          {r.event?.title ? ` • ${r.event.title}` : ""}
                        </div>
                        <div className="text-sm text-[#6B5F7A]">
                          {new Date(r.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-sm text-[#6B5F7A]">
                        Score: {typeof r.progressScore === "number" ? r.progressScore.toFixed(1) : "—"} / 10
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeNav === "#schedule" && <ScheduleList items={appointments} />}

          {activeNav === "#book" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-[#5D5A7A]">Book a Session</h2>
                <button
                  onClick={loadParentEvents}
                  className="px-3 py-2 text-sm rounded bg-gray-100 hover:bg-gray-200"
                >
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
                <div className="bg-white p-4 rounded-lg shadow border">
                  <div className="text-sm text-slate-700">
                    You don’t have any children on your account yet. Please contact the
                    administrator to add a child.
                  </div>
                </div>
              )}

              <div className="grid gap-4">
                {(Array.isArray(events) ? events : []).map((ev) => {
                  const start = new Date(ev.startAt);
                  const end = new Date(ev.endAt);
                  const busy = !!bookingBusy[ev.id];

                  return (
                    <div
                      key={ev.id}
                      className="bg-white rounded-lg shadow p-4 flex flex-wrap md:flex-nowrap md:items-center gap-4"
                    >
                      <div className="flex-1 min-w-[220px]">
                        <div className="font-semibold text-gray-800">{ev.title}</div>
                        <div className="text-sm text-gray-500">
                          {ev.type} • {ev.location || "TBA"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {start.toLocaleDateString()} •{" "}
                          {start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} –{" "}
                          {end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                        {ev.club?.name && (
                          <div className="text-xs text-gray-500 mt-1">Club: {ev.club.name}</div>
                        )}
                      </div>

                      <span className="px-3 py-1 text-xs rounded bg-gray-100 h-fit">
                        {ev.status || "Upcoming"}
                      </span>

                      <div className="flex items-center gap-2 ml-auto">
                        <select
                          className="border rounded p-2 text-sm"
                          value={bookingChildByEvent[ev.id] || selectedChildId || ""}
                          onChange={(e) =>
                            setBookingChildByEvent((m) => ({ ...m, [ev.id]: e.target.value }))
                          }
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
                          className="px-4 py-2 bg-[#7B9BC4] text-white rounded-lg hover:bg-[#8DB4A8] disabled:opacity-60"
                          onClick={() => bookEventForChild(ev.id)}
                          disabled={!(bookingChildByEvent[ev.id] || selectedChildId) || busy || children.length === 0}
                        >
                          {busy ? "Booking…" : "Book"}
                        </button>
                      </div>
                    </div>
                  );
                })}

                {events.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    No upcoming events or clubs available right now.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeNav === "#history" && <SessionHistoryList items={historyItems} />}

          {activeNav === "#reports" && (
            <StudentReportsList activeChildId={selectedChildId} />
          )}

          {activeNav === "#clubs" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold text-[#5D5A7A]">Clubs</h2>
              <button
                onClick={loadClubs}
                className="px-3 py-2 text-sm rounded bg-gray-100 hover:bg-gray-200"
              >
                Refresh
              </button>
            </div>

            {enrollMsg && (
              <div
                className={`p-3 rounded ${
                  enrollMsg.type === "ok"
                    ? "bg-green-50 text-green-700"
                    : enrollMsg.type === "warn"
                    ? "bg-yellow-50 text-yellow-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {enrollMsg.text}
              </div>
            )}

            <div className="grid gap-4">
              {clubs.map(club => (
                <div key={club.id} className="bg-white rounded-lg shadow p-4 flex flex-wrap md:flex-nowrap md:items-center gap-4">
                  <div className="flex-1 min-w-[220px]">
                    <div className="font-semibold text-gray-800">{club.name}</div>
                    <div className="text-sm text-gray-500">{club.description || "—"}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Upcoming sessions: {club.upcomingEvents ?? 0}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-auto">
                    <select
                      className="border rounded p-2 text-sm"
                      value={selectedChildId || ""}
                      onChange={(e) => setSelectedChildId(e.target.value)}
                      disabled={children.length === 0 || enrollBusy[club.id]}
                    >
                      <option value="">Select child…</option>
                      {children.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.firstName} {c.lastName}
                        </option>
                      ))}
                    </select>

                    <button
                      className="px-4 py-2 bg-[#7B9BC4] text-white rounded-lg hover:bg-[#8DB4A8] disabled:opacity-60"
                      onClick={() => enrollChildToClub(club.id)}
                      disabled={!selectedChildId || enrollBusy[club.id] || children.length === 0}
                    >
                      {enrollBusy[club.id] ? "Enrolling…" : "Enroll"}
                    </button>
                  </div>
                </div>
              ))}

              {clubs.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  No clubs available right now.
                </div>
              )}
            </div>
          </div>
        )}

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
