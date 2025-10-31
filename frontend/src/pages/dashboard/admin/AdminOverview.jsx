import React, { useEffect, useState } from 'react';
import { apiFetch, setAccessToken } from '../../../lib/api';
import { SystemStatus } from "../../../components/admin/SystemStatus";
import KpiRow from "../../../components/admin/Kpi/KpiRow";
import UsersTable from "../../../components/admin/Users/UsersTable";
import RecentActivityTable from "../../../components/admin/Activity/RecentActivityTable";
import Sidebar from "../../../components/dashboard/SideBar";
import UserCreateModal from '../../../components/admin/Users/UserCreateModal';
import EventCreateModal from '../../../components/admin/Events/EventCreateModal';
import ClubCreateModal from '../../../components/admin/Clubs/ClubCreateModal';
import NewsCreateModal from '../../../components/admin/News/NewsCreateModal';
import BellDropdown from '../../../components/common/BellDropdown';
import NotificationsList from '../../../components/admin/Notifications/NotificationsList';
import ActivityList from '../../../components/admin/Activity/ActivityList';
import ChildCreateModal from '../../../components/admin/Students/ChildCreateModal';
import StudentsTable from '../../../components/admin/Students/StudentsTable';
import ChildModal from '../../../components/admin/Students/ChildModal';
import AccountSettings from '../../../components/admin/Settings/AccountSettings';
import PlansTable from '../../../components/admin/Subscriptions/PlansTable';
import SubscriptionPlanModal from "../../../components/admin/Subscriptions/SubscriptionPlanModal";
import PlanSubscribersModal from "../../../components/admin/Subscriptions/PlanSubscribersModal";
import StudentReportsPage from "./StudentReportsPage";
import ClubDetailModal from "../../../components/admin/Clubs/ClubDetailModal";

export default function AdminOverview() {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [activeNav, setActiveNav] = useState('#overview');
  const [pageTitle, setPageTitle] = useState('Dashboard Overview');
  const [me, setMe] = useState(null);
  const [stats, setStats] = useState({ users: 0, parents: 0, admins: 0, sessionsThisMonth: 0, revenueMonthly: 0 });
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [userStats, setUserStats] = useState({ total: 0, admins: 0, parents: 0, partners: 0, staff: 0 });
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [createEventOpen, setCreateEventOpen] = useState(false);
  const [clubs, setClubs] = useState([]);
  const [createClubOpen, setCreatedClubOpen] = useState(false);
  const [news, setNews] = useState([]);
  const [createNewsOpen, setCreateNewsOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [studentsQuery, setStudentsQuery] = useState("");
  const [studentsPage, setStudentsPage] = useState(1);
  const [studentsHasMore, setStudentsHasMore] = useState(false);
  const [studentsTotal, setStudentsTotal] = useState(0);
  const [createStudentOpen, setCreateStudentOpen] = useState(false);
  const [activeStudent, setActiveStudent] = useState(null);
  const [studentModalMode, setStudentModalMode] = useState("view");
  const [plans, setPlans] = useState([]);
  const [planModalOpen, setPlanModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [subsModalOpen, setSubsModalOpen] = useState(false);
  const [subsPlan, setSubsPlan] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [clubDetailId, setClubDetailId] = useState(null);
  const [editClub, setEditClub] = useState(null); 
  const [usersData, setUsersData] = useState({
    items: [],
    page: 1,
    pageSize: 10,
    total: 0,
    hasMore: false,
  });
  const [usersRoleFilter, setUsersRoleFilter] = useState('');
  const [usersQuery, setUsersQuery] = useState('');

  function onAddPlan() {
    setEditingPlan(null);
    setPlanModalOpen(true);
  }

  function onEditPlan(p) {
    setEditingPlan(p);
    setPlanModalOpen(true);
  }

  function onSubscribers(p) {
    setSubsPlan(p);
    setSubsModalOpen(true);
  }
  function onAddNews() {
    setCreateNewsOpen(true);
  }

  function onAddClub() {
    setCreatedClubOpen(true);
  }

  function onAddEvent() {
    setEditingEvent(null);
    setCreateEventOpen(true);
  }

  function onAddNew() {
    setCreateOpen(true);
  }

  function onEditEvent(ev) {
    setEditingEvent(ev);
    setCreateEventOpen(true);
  }

  function onViewClub(c) {
    setClubDetailId(c.id);
  }

  function onEditClub(c) {
    setEditClub(c);
    setCreatedClubOpen(true);
  }

  function handleLogout() {
    setAccessToken(null);
    sessionStorage.removeItem("userRole");
    window.location.assign("/login");
  }

  function currentRoleFromNav(href) {
    switch (href) {
      case '#users': return '';
      case '#internal-parents': return 'PARENT';
      case '#external-people': return 'PARTNER';
      case '#staff': return 'STAFF';
      default: return '';
    }
  }

  function toggleSidebar() { 
    setSidebarActive(s => !s); 
  }

  function closeSidebar() { 
    setSidebarActive(false); 
  }

  function onNavClick(href, clickEvt) {
    setActiveNav(href);
    const found = adminSidebarSections.flatMap(s => s.items).find(i => i.href === href);
    if (found?.label) setPageTitle(found.label);

    const role = currentRoleFromNav(href);
    if (['#users', '#internal-parents', '#external-people', '#staff'].includes(href)) {
      setUsersRoleFilter(role);
      setUsersQuery('');
      loadUsers({ page: 1, q: '', role });
    }

    if (href === "#events") loadEvents();
    if (href === "#clubs") loadClubs();
    if (href === '#students') loadStudents({ page: 1, q: '' });
    if (href === "#subscriptions") loadPlans();
      
  }

  function onUsersSearchSubmit(e) { 
    e.preventDefault(); loadUsers({ page: 1, q: usersQuery }); 
  }

  function onUsersPrev() { 
    const p = Math.max(1, usersData.page - 1); if (p !== usersData.page) loadUsers({ page: p }); 
  }

  function onUsersNext() { 
    if (usersData.hasMore) loadUsers({ page: usersData.page + 1 }); 
  }

  async function loadPlans() {
    const res = await apiFetch("/admin/subscriptions");
    if (res.ok) setPlans(await res.json());
  }

  async function onDeletePlan(p) {
    if (!confirm(`Delete plan "${p.name}"?`)) return;
    const res = await apiFetch(`/admin/subscriptions/${p.id}`, { method: "DELETE" });
    if (res.ok) loadPlans();
    else alert("Failed to delete");
  }

  async function loadUsers({ page = 1, q = usersQuery, role = usersRoleFilter } = {}) {
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(usersData.pageSize),
    });
    if (q) params.set('q', q);
    if (role) params.set('role', role);

    const res = await apiFetch(`/admin/users?${params.toString()}`);
    if (!res.ok) {
      alert('failed to load users');
      return;
    }
    const data = await res.json();
    setUsersData({
      items: data.items || [],
      page: data.page,
      pageSize: data.pageSize,
      total: data.total,
      hasMore: !!data.hasMore,
    });
  }

  async function showNotifications() {
    const res = await apiFetch('/admin/notifications?limit=20');
    if (!res.ok) { alert('Could not load notifications'); return; }
    const items = await res.json();
    setNotifications(items);

    const lines = items.map(n =>
      `• [${new Date(n.createdAt).toLocaleString()}] (${n.severity}) ${n.title}\n ${n.message}${n.read ? '' : ' [UNREAD]'}`
    );
    alert(lines.length ? `System Notifications:\n\n${lines.join('\n\n')}` : 'No Notifications');
    setUnreadCount(0);
  }

  async function loadEvents() {
    const res = await apiFetch("/admin/events");
    if (res.ok) {
      const data = await res.json();
      setEvents(data);
    }
  }

  async function loadClubs() {
    const res = await apiFetch('/admin/clubs');
    if (res.ok) {
      setClubs(await res.json());
    } else {
      console.error('Failed to load clubs');
    }
  }

  async function loadNews() {
    const res = await apiFetch("/admin/news");
    if (res.ok) setNews(await res.json());
  }

  async function loadStudents({ page = 1, q = studentsQuery } = {}) {
    const params = new URLSearchParams({ page: String(page), pageSize: "10" });
    if (q) params.set("q", q);
    const res = await apiFetch(`/admin/children?${params.toString()}`);
    if (res.ok) {
      const d = await res.json();
      setStudents(d.items || []);
      setStudentsPage(d.page);
      setStudentsHasMore(!!d.hasMore);
      setStudentsTotal(d.total);
    }
  }

  async function onDeleteEvent(ev) {
    if (!confirm(`Delete event "${ev.title}"?`)) return;
    const res = await apiFetch(`/admin/events/${ev.id}`, { method: "DELETE" });
    if (!res.ok) {
      const e = await res.json().catch(() => ({}));
      alert(e?.error || "Failed to delete event");
      return;
    }
    loadEvents();
  }

  async function onDeleteClub(c) {
    if (!confirm(`Delete club "${c.name}"? This cannot be undone.`)) return;
    const res = await apiFetch(`/admin/clubs/${c.id}`, { method: "DELETE" });
    if (!res.ok) {
      const e = await res.json().catch(() => ({}));
      alert(e?.error || "Failed to delete club");
      return;
    }
    loadClubs();
  }

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) setSidebarActive(false);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let active = true;
    (async () => {
      const res = await apiFetch('/users/me');
      if (res.ok) {
        const data = await res.json();
        if (active) setMe(data);
      }
    })();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    let active = true;
    (async () => {
      const res = await apiFetch('/admin/dashboard');
      if (res.ok) {
        const d = await res.json();
        if (active) setStats(s => ({ ...s, ...d }));
      }
    })();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    let active = true;
    async function loadUnread() {
      const res = await apiFetch('/admin/notifications/unread-count');
      if (res.ok) {
        const { count } = await res.json();
        if (active) setUnreadCount(count);
      }
    }
    loadUnread();
    const t = setInterval(loadUnread, 60000);
    return () => { active = false; clearInterval(t); };
  }, []);

  useEffect(() => {
    let active = true;
    async function load() {
      const s = await apiFetch('/admin/users/stats');
      if (s.ok) {
        const stats = await s.json();
        if (active) setUserStats(stats);
      }
      const r = await apiFetch('/admin/users?page=1&pageSize=10');
      if (r.ok) {
        const data = await r.json();
        if (active) setRecentUsers(data.items || []);
      }
    }
    load();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    let active = true;
    (async () => {
      const res = await apiFetch('/admin/activity?page=1&pageSize=10');
      if (res.ok) {
        const d = await res.json();
        if (active) setRecentActivity(d.items || []);
      }
    })();
    return () => { active = false };
  }, []);

  const kpis = [
    { emoji: '👥', delta: '↗ 12%', value: userStats.total, label: 'Total Users' },
    { emoji: '❤️', delta: '↗ 8%', value: userStats.parents, label: 'Heart Program Members' },
    { emoji: '📅', delta: '↗ 15%', value: stats.sessionsThisMonth, label: 'Sessions This Month' },
  ];

  const adminSidebarSections = [
    {
      title: "Dashboard",
      items: [
        { href: "#overview", label: "Overview", icon: "📊" },
        { href: "#analytics", label: "Analytics & Reports", icon: "📈" },
      ],
    },
    {
      title: "User Management",
      items: [
        { href: "#users", label: "All Users", icon: "👥" },
        { href: "#internal-parents", label: "Malaika Parents", icon: "👨‍👩‍👧‍👦" },
        { href: "#external-people", label: "External Parents", icon: "🤝" },
        { href: "#staff", label: "Staff & Teachers", icon: "👨‍🏫" },
      ],
    },
    {
      title: "Student Management",
      items: [
        { href: "#students", label: "Students", icon: "🧒" },
        { href: "#student-reports", label: "Student Reports", icon: "📄" },
      ],
    },
    {
      title: "Content Management",
      items: [
        { href: "#news", label: "News & Updates", icon: "📰" },
        { href: "#subscriptions", label: "Subscriptions", icon: "💳" },
      ],
    },
    {
      title: "Programs",
      items: [
        { href: "#events", label: "Events", icon: "📅" },
        { href: "#clubs", label: "Clubs", icon: "🎭" },
      ],
    },
    {
      title: "System",
      items: [
        { href: "#notifications", label: "Notifications", icon: "🔔" },
        { href: "#activity", label: "Activity", icon: "📜" },
        { href: "#settings", label: "Settings", icon: "⚙️" },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar
      open={sidebarActive}
      onClose={closeSidebar}
      user={me}
      sections={adminSidebarSections}
      activeHref={activeNav}
      onItemClick={onNavClick}
      />

      <main className="flex-1 ml-0 md:ml-64 min-h-screen bg-[#F5F5F5]">
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 hover:bg-slate-100"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              ☰
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">{pageTitle}</h1>
          </div>

          <div className="flex items-center gap-2">
            <BellDropdown
              scope="admin"
              unreadCount={unreadCount}
              onViewAll={() => setActiveNav('#notifications')}
              buttonClassName="relative inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-slate-700 hover:bg-slate-100"
              label={<span className="hidden sm:inline">Notifications</span>}
            />

            <button
              onClick={handleLogout}
              className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-slate-700 hover:bg-slate-100"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="p-6 overflow-auto">
          {/* USERS SECTION */}
          {(['#users', '#internal-parents', '#external-people', '#staff'].includes(activeNav)) && (
            <UsersTable
              headerTitle={
                activeNav === '#users' ? 'All Users' :
                activeNav === '#internal-parents' ? 'Internal Parents' :
                activeNav === '#external-people' ? 'External Partners' : 'Staff'
              }
              query={usersQuery}
              onQueryChange={setUsersQuery}
              onSearchSubmit={onUsersSearchSubmit}
              page={usersData.page}
              hasMore={usersData.hasMore}
              onPrev={onUsersPrev}
              onNext={onUsersNext}
              rows={usersData.items}
              total={usersData.total}
              onAddNew={() => setCreateOpen(true)}
              showAddButton
            />
          )}

          {/* EVENTS */}
          <div className="grid gap-4">
            {activeNav === '#events' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Events Management</h2>
                <button
                  className="px-4 py-2 bg-[#7B9BC4] text-white rounded-lg hover:bg-[#8DB4A8]"
                  onClick={onAddEvent}
                >
                  + Create Event
                </button>
              </div>

              <div className="grid gap-4">
                {events.map(ev => {
                  const start = ev.startAt ? new Date(ev.startAt) : null;
                  const end = ev.endAt ? new Date(ev.endAt) : null;
                  const cap = typeof ev.capacity === "number" ? ` • Cap: ${ev.capacity}` : "";
                  const price = typeof ev.price === "number" ? ` • R${ev.price.toFixed(2)}` : "";

                  return (
                    <div key={ev.id} className="bg-white rounded-lg shadow p-4">
                      <div className="flex justify-between">
                        <div>
                          <div className="font-semibold text-gray-800">{ev.title}</div>
                          <div className="text-sm text-gray-500">
                            {start ? start.toLocaleString() : "—"}
                            {end ? ` – ${end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : ""}
                            {ev.type ? ` • ${ev.type}` : ""}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Audience: {ev.audience ?? "—"} • Visibility: {ev.visibility ?? "—"}
                            {ev.club ? ` • Club: ${ev.club.name}` : ""}
                            {cap}{price}
                          </div>
                          {ev.location && (
                            <div className="text-xs text-gray-500 mt-1">Location: {ev.location}</div>
                          )}
                        </div>

                        <div className="flex items-start gap-2">
                          <span className="px-3 py-1 text-xs rounded bg-gray-100">{ev.status ?? "Upcoming"}</span>
                        </div>
                      </div>

                      <div className="mt-3 flex gap-2">
                        <button
                          className="px-3 py-1 rounded bg-indigo-100 hover:bg-indigo-200 text-sm"
                          onClick={() => onEditEvent(ev)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-3 py-1 rounded bg-red-100 hover:bg-red-200 text-sm"
                          onClick={() => onDeleteEvent(ev)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}

                {events.length === 0 && (
                  <div className="text-center text-gray-500 py-8">No events found.</div>
                )}
              </div>

              <EventCreateModal
                open={createEventOpen}
                onClose={() => setCreateEventOpen(false)}
                onCreated={() => { setCreateEventOpen(false); loadEvents(); }}
                event={editingEvent}
              />
            </div>
          )}
          </div>

          {/* CLUBS */}
          {activeNav === '#clubs' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Clubs Management</h2>
              <button
                className="px-4 py-2 bg-[#7B9BC4] text-white rounded-lg hover:bg-[#8DB4A8]"
                onClick={onAddClub}
              >
                + Create Club
              </button>
            </div>

            <div className="grid gap-4">
              {clubs.map(club => (
                <div key={club.id} className="bg-white rounded-lg shadow p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-gray-800">{club.name}</div>
                      <div className="text-sm text-gray-500">{club.description}</div>
                      <div className="text-sm text-gray-500">
                        {club.tier || "—"} • R{club.monthlyFee ?? 0}/month • {club.sessions ?? 0} sessions
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => onViewClub(club)}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-sm"
                      >
                        View
                      </button>
                      <button
                        onClick={() => onEditClub(club)}
                        className="px-3 py-1 bg-indigo-100 hover:bg-indigo-200 rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDeleteClub(club)}
                        className="px-3 py-1 bg-red-100 hover:bg-red-200 rounded text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {clubs.length === 0 && (
                <div className="text-center text-gray-500 py-8">No clubs found.</div>
              )}
            </div>

            <ClubCreateModal
              open={createClubOpen}
              onClose={() => { setCreatedClubOpen(false); setEditClub(null); }}
              onCreated={() => { setCreatedClubOpen(false); setEditClub(null); loadClubs(); }}
              club={editClub}
            />

            {clubDetailId && (
              <ClubDetailModal
                open={!!clubDetailId}
                clubId={clubDetailId}
                onClose={() => setClubDetailId(null)}
                onChanged={() => { setClubDetailId(null); loadClubs(); }}
              />
            )}
          </div>
        )}

          {/* News and Updates Section */}
          {activeNav === '#news' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">News & Updates</h2>
                <button
                  className="px-4 py-2 bg-[#7B9BC4] text-white rounded-lg hover:bg-[#8DB4A8]"
                  onClick={onAddNews}
                >
                  + Create Post
                </button>
              </div>

              <div className="grid gap-4">
                {news.map(post => (
                  <div key={post.id} className="bg-white rounded-lg shadow p-4 flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-gray-800">{post.title}</div>
                      <div className="text-xs text-gray-500 mb-1">
                        {post.status} {post.publishAt ? `• ${new Date(post.publishAt).toLocaleString()}` : ""}
                      </div>
                      <div className="text-sm text-gray-600">{post.excerpt}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {post.status !== "PUBLISHED" && (
                        <button
                          className="px-3 py-1 rounded bg-emerald-100 hover:bg-emerald-200 text-sm"
                          onClick={async () => {
                            const res = await apiFetch(`/admin/news/${post.id}/publish`, { method: "POST" });
                            if (res.ok) {
                              const updated = await res.json();
                              setNews(prev => prev.map(p => p.id === post.id ? updated : p));
                            } else {
                              alert("Failed to publish");
                            }
                          }}
                        >
                          Publish
                        </button>
                      )}
                      <button
                        className="px-3 py-1 rounded bg-indigo-100 hover:bg-indigo-200 text-sm"
                        onClick={() => alert("Open edit modal (optional)")}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 rounded bg-red-100 hover:bg-red-200 text-sm"
                        onClick={async () => {
                          if (!confirm("Delete this post?")) return;
                          const res = await apiFetch(`/admin/news/${post.id}`, { method: "DELETE" });
                          if (res.ok) setNews(prev => prev.filter(p => p.id !== post.id));
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                {news.length === 0 && (
                  <div className="text-center text-gray-500 py-8">No posts yet.</div>
                )}
              </div>

              <NewsCreateModal
                open={createNewsOpen}
                onClose={() => setCreateNewsOpen(false)}
                onCreated={(newPost) => setNews(prev => [newPost, ...prev])}
              />
            </div>
          )}

          {/* Notifications */}
          {activeNav === '#notifications' && (
            <NotificationsList />
          )}

          {/* Recent Activity */}
          {activeNav === '#activity' && (
            <ActivityList />
          )}

          {/* Student Reports */}
          {activeNav === '#student-reports' && (
            <StudentReportsPage />
          )}

          {/* Students */}
          {activeNav === '#students' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Students</h2>
                <button
                  className="px-4 py-2 bg-[#7B9BC4] text-white rounded-lg hover:bg-[#8DB4A8]"
                  onClick={() => setCreateStudentOpen(true)}
                >
                  + Add Student
                </button>
              </div>

              <StudentsTable
                headerTitle="All Students"
                query={studentsQuery}
                onQueryChange={setStudentsQuery}
                onSearchSubmit={(e) => { e.preventDefault(); loadStudents({ page:1, q: studentsQuery }); }}
                page={studentsPage}
                hasMore={studentsHasMore}
                onPrev={() => { const p = Math.max(1, studentsPage - 1); if (p !== studentsPage) loadStudents({ page: p }); }}
                onNext={() => { if (studentsHasMore) loadStudents({ page: studentsPage + 1 }); }}
                rows={students}
                total={studentsTotal}
                onView={(c) => { setActiveStudent(c); setStudentModalMode("view"); }}
                onEdit={(c) => { setActiveStudent(c); setStudentModalMode("edit"); }}
                onDisable={async (c) => {
                  if (!confirm(`Disable ${c.firstName} ${c.lastName}?`)) return;
                  const res = await apiFetch(`/admin/children/${c.id}/disable`, { method: "POST" });
                  if (res.ok) loadStudents({ page: studentsPage, q: studentsQuery });
                }}
                onDelete={async (c) => {
                  if (!confirm(`Delete ${c.firstName} ${c.lastName}?`)) return;
                  const res = await apiFetch(`/admin/children/${c.id}`, { method: "DELETE" });
                  if (res.ok) loadStudents({ page: studentsPage, q: studentsQuery });
                }}
              />

              {/* Create & Edit/View Modals */}
              <ChildCreateModal
                open={createStudentOpen}
                onClose={() => setCreateStudentOpen(false)}
                onCreated={() => loadStudents({ page: 1, q: "" })}
              />
              <ChildModal
                open={!!activeStudent}
                onClose={() => setActiveStudent(null)}
                child={activeStudent}
                mode={studentModalMode}
                onUpdated={() => loadStudents({ page: studentsPage, q: studentsQuery })}
                onDeleted={() => loadStudents({ page: 1, q: studentsQuery })}
              />
            </div>
          )}

          {/* Subscriptions */}
          {activeNav === '#subscriptions' && (
            <>
              <PlansTable
                plans={plans}
                onCreate={onAddPlan}
                onEdit={onEditPlan}
                onSubscribers={onSubscribers}
                onDelete={onDeletePlan}
              />

              <SubscriptionPlanModal
                open={planModalOpen}
                onClose={() => setPlanModalOpen(false)}
                plan={editingPlan}
                onSaved={() => loadPlans()}
              />

              <PlanSubscribersModal
                open={subsModalOpen}
                onClose={() => setSubsModalOpen(false)}
                plan={subsPlan}
              />
            </>
          )}

          {/* OVERVIEW: KPI + USER MANAGEMENT OVERVIEW + SYSTEM STATUS */}
          {activeNav === '#overview' && (
            <>
              <KpiRow items={kpis} />

              <div className="bg-white rounded-xl shadow-md p-6 mt-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">User Management Overview</h2>
                  <div className="flex gap-4">
                    <button
                      className="px-4 py-2 bg-[#7B9BC4] text-white rounded-lg hover:bg-[#8DB4A8] transition-colors"
                      onClick={() => setCreateOpen(true)}
                    >
                      + Add User
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      onClick={() => onNavClick('#users')}
                    >
                      Manage All
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="text-3xl">👨‍👩‍👧‍👦</div>
                    <div className="text-2xl font-bold text-gray-800 mb-1">{userStats.parents}</div>
                    <div className="text-sm text-gray-600">Internal Parents</div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="text-3xl">🤝</div>
                    <div className="text-2xl font-bold text-gray-800 mb-1">{userStats.partners}</div>
                    <div className="text-sm text-gray-600">External Partners</div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="text-3xl">👨‍🏫</div>
                    <div className="text-2xl font-bold text-gray-800 mb-1">{userStats.staff}</div>
                    <div className="text-sm text-gray-600">Staff Members</div>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="text-3xl">📧</div>
                    <div className="text-2xl font-bold text-gray-800 mb-1">425</div>
                    <div className="text-sm text-gray-600">Mailing List Subscribers</div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <SystemStatus />
              </div>
            </>
          )}

          {/* ANALYTICS & REPORTS: KPI + ACTIVITY + SYSTEM STATUS */}
          {activeNav === '#analytics' && (
            <>
              <KpiRow items={kpis} />
              <div className="grid grid-cols-1 gap-6 mt-6">
                <RecentActivityTable rows={recentActivity} onViewAll={() => setActiveNav('#activity')} />
                <SystemStatus />
              </div>
            </>
          )}

          {/* Settings */}
          {activeNav === '#settings' && (
            <div className="p-6">
              <AccountSettings />
            </div>
          )}

          {/* Create User Modal */}
          <UserCreateModal
            open={createOpen}
            onClose={() => setCreateOpen(false)}
            onCreated={() => {
              if (['#users', '#internal-parents', '#external-people', '#staff'].includes(activeNav)) {
                loadUsers({ page: 1, q: '', role: currentRoleFromNav(activeNav) });
              }
            }}
          />
        </div>
      </main>
    </div>
  );
}
