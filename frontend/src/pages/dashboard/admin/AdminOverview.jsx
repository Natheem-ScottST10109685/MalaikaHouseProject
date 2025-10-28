import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../../lib/api';
import { SystemStatus } from "../../../components/admin/SystemStatus";
import KpiRow from "../../../components/admin/Kpi/KpiRow";
import UsersTable from "../../../components/admin/Users/UsersTable";
import RecentActivityTable from "../../../components/admin/Activity/RecentActivityTable";

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

  const [usersData, setUsersData] = useState({
    items: [],
    page: 1,
    pageSize: 10,
    total: 0,
    hasMore: false,
  });
  const [usersRoleFilter, setUsersRoleFilter] = useState('');
  const [usersQuery, setUsersQuery] = useState('');

  function currentRoleFromNav(href) {
    switch (href) {
      case '#users': return '';
      case '#internal-parents': return 'PARENT';
      case '#external-people': return 'PARTNER';
      case '#staff': return 'STAFF';
      default: return '';
    }
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

  function toggleSidebar() { setSidebarActive(s => !s); }
  function closeSidebar() { setSidebarActive(false); }

  function onNavClick(e, href) {
    e.preventDefault();
    setActiveNav(href);
    const text = e.currentTarget.textContent.trim();
    setPageTitle(text);
    if (window.innerWidth <= 768) closeSidebar();

    const role = currentRoleFromNav(href);
    if (['#users', '#internal-parents', '#external-people', '#staff'].includes(href)) {
      setUsersRoleFilter(role);
      setUsersQuery('');
      loadUsers({ page: 1, q: '', role });
    }
  }

  function onUsersSearchSubmit(e) { e.preventDefault(); loadUsers({ page: 1, q: usersQuery }); }
  function onUsersPrev() { const p = Math.max(1, usersData.page - 1); if (p !== usersData.page) loadUsers({ page: p }); }
  function onUsersNext() { if (usersData.hasMore) loadUsers({ page: usersData.page + 1 }); }

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

  function onAddNew() {
    const options = [
      ['PARENT', 'Add Internal Parent'],
      ['PARTNER', 'Add External Partner'],
      ['STAFF', 'Add Staff Member'],
      ['ADMIN', 'Add Admin'],
    ];
    const choice = prompt(
      'What would you like to create?\n' +
      options.map(([, label], i) => `${i + 1}. ${label}`).join('\n')
    );
    if (!choice) return;
    const idx = parseInt(choice, 10) - 1;
    const selected = options[idx];
    if (!selected) { alert('Invalid selection.'); return; }
    const [role, label] = selected;
    const email = prompt(`Enter email for ${label}`);
    if (!email) return;

    (async () => {
      try {
        const res = await apiFetch('/admin/users', { method: 'POST', body: JSON.stringify({ email, role }) });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          if (res.status === 409 || data?.error?.code === 'EMAIL_TAKEN') { alert('A user with that email already exists.'); return; }
          alert('Could not create user.'); return;
        }
        const data = await res.json();
        alert(`${label} created successfully.\n\nEmail: ${data.email}\nRole: ${data.role}\nTemporary Password (Share Securely): ${data.tempPassword}\n\nThe user should login and change their password immediately.`);
      } catch (e) { console.error(e); alert('Network error creating user.'); }
    })();
  }

  const kpis = [
    { emoji: '👥', delta: '↗ 12%', value: userStats.total, label: 'Total Users' },
    { emoji: '❤️', delta: '↗ 8%', value: userStats.parents, label: 'Heart Program Members' },
    { emoji: '📅', delta: '↗ 15%', value: stats.sessionsThisMonth, label: 'Sessions This Month' },
    { emoji: '💰', delta: '↗ 5%', value: `R${Number(stats.revenueMonthly).toLocaleString('en-ZA')}`, label: 'Monthly Revenue' },
  ];

  return (
    <div className="flex min-h-screen">
      <aside className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${sidebarActive ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 bg-[#5D5A7A] text-white`} id="sidebar">
        <div className="p-5 bg-[#6B5F7A]">
          <a href="/" className="block">
            <img src="https://i.postimg.cc/9QhL2Tz3/2022-12-10-Malaika-House-Name-only-png.png" alt="Malaika House Logo" className="h-10" />
          </a>
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="font-semibold">{me?.email ?? 'Admin'}</div>
            <div className="text-sm opacity-80">{me?.role ?? 'ADMIN'}</div>
          </div>
        </div>

        <nav className="py-5">
          <div className="mb-6">
            <div className="px-5 pb-2 text-xs uppercase tracking-wider opacity-60 font-semibold">Dashboard</div>
            <a href="#overview" className={`flex items-center px-5 py-3 text-white hover:bg-white/10 transition-colors ${activeNav === '#overview' ? 'border-l-4 border-[#7B9BC4] bg-white/10' : 'border-l-4 border-transparent'}`} onClick={(e) => onNavClick(e, '#overview')}>📊 Overview</a>
            <a href="#analytics" className={`flex items-center px-5 py-3 text-white hover:bg-white/10 transition-colors ${activeNav === '#analytics' ? 'border-l-4 border-[#7B9BC4] bg-white/10' : 'border-l-4 border-transparent'}`} onClick={(e) => onNavClick(e, '#analytics')}>📈 Analytics & Reports</a>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">User Management</div>
            <a href="#users" className={`nav-item ${activeNav === '#users' ? 'active' : ''}`} onClick={(e) => onNavClick(e, '#users')}>👥 All Users</a>
            <a href="#internal-parents" className={`nav-item ${activeNav === '#internal-parents' ? 'active' : ''}`} onClick={(e) => onNavClick(e, '#internal-parents')}>👨‍👩‍👧‍👦 Internal Parents</a>
            <a href="#external-people" className={`nav-item ${activeNav === '#external-people' ? 'active' : ''}`} onClick={(e) => onNavClick(e, '#external-people')}>🤝 External People</a>
            <a href="#staff" className={`nav-item ${activeNav === '#staff' ? 'active' : ''}`} onClick={(e) => onNavClick(e, '#staff')}>👨‍🏫 Staff</a>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Content Management</div>
            <a href="#pages" className={`nav-item ${activeNav === '#pages' ? 'active' : ''}`} onClick={(e) => onNavClick(e, '#pages')}>📄 Pages</a>
            <a href="#events" className={`nav-item ${activeNav === '#events' ? 'active' : ''}`} onClick={(e) => onNavClick(e, '#events')}>📅 Events</a>
            <a href="#news" className={`nav-item ${activeNav === '#news' ? 'active' : ''}`} onClick={(e) => onNavClick(e, '#news')}>📰 News & Updates</a>
            <a href="#supporter-updates" className={`nav-item ${activeNav === '#supporter-updates' ? 'active' : ''}`} onClick={(e) => onNavClick(e, '#supporter-updates')}>🏆 Supporter Updates</a>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Programs</div>
            <a href="#heart-program" className={`nav-item ${activeNav === '#heart-program' ? 'active' : ''}`} onClick={(e) => onNavClick(e, '#heart-program')}>❤️ Heart Program</a>
            <a href="#clubs" className={`nav-item ${activeNav === '#clubs' ? 'active' : ''}`} onClick={(e) => onNavClick(e, '#clubs')}>🎭 Clubs</a>
            <a href="#malaika-sessions" className={`nav-item ${activeNav === '#malaika-sessions' ? 'active' : ''}`} onClick={(e) => onNavClick(e, '#malaika-sessions')}>🎯 Malaika Sessions</a>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">System</div>
            <a href="#integrations" className={`nav-item ${activeNav === '#integrations' ? 'active' : ''}`} onClick={(e) => onNavClick(e, '#integrations')}>🔗 Integrations</a>
            <a href="#payments" className={`nav-item ${activeNav === '#payments' ? 'active' : ''}`} onClick={(e) => onNavClick(e, '#payments')}>💳 Payment Gateway</a>
            <a href="#notifications" className={`nav-item ${activeNav === '#notifications' ? 'active' : ''}`} onClick={(e) => onNavClick(e, '#notifications')}>🔔 Notifications</a>
            <a href="#settings" className={`nav-item ${activeNav === '#settings' ? 'active' : ''}`} onClick={(e) => onNavClick(e, '#settings')}>⚙️ Settings</a>
          </div>
        </nav>
      </aside>

      <div className={`sidebar-overlay ${sidebarActive ? 'active' : ''}`} id="sidebarOverlay" onClick={closeSidebar} />

      <main className="flex-1 ml-0 md:ml-64 min-h-screen bg-[#F5F5F5]">
        <div className="sticky top-0 z-30 bg-white shadow-sm px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg" onClick={toggleSidebar}>☰</button>
            <h1 className="text-2xl font-bold text-gray-800">{pageTitle}</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full" onClick={showNotifications}>
              🔔
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center transform translate-x-1 -translate-y-1">
                  {unreadCount}
                </span>
              )}
            </button>
            <button className="px-4 py-2 bg-[#7B9BC4] text-white rounded-lg hover:bg-[#8DB4A8] transition-colors" onClick={onAddNew}>
              + Add New
            </button>
          </div>
        </div>

        <div className="p-6 overflow-auto">
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
            />
          )}

          <KpiRow items={kpis} />

          <div className="grid grid-cols-1 gap-6">
            <RecentActivityTable rows={recentActivity} onViewAll={() => alert('View all activity')} />

            <SystemStatus />
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">User Management Overview</h2>
              <div className="flex gap-4">
                <button className="px-4 py-2 bg-[#7B9BC4] text-white rounded-lg hover:bg-[#8DB4A8] transition-colors" onClick={onAddNew}>+ Add User</button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors" onClick={() => alert('Manage all users')}>Manage All</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-6"><div className="flex justify-between items-start mb-4"><div className="text-3xl">👨‍👩‍👧‍👦</div></div><div className="text-2xl font-bold text-gray-800 mb-1">{userStats.parents}</div><div className="text-sm text-gray-600">Internal Parents</div></div>
              <div className="bg-white border border-gray-200 rounded-lg p-6"><div className="flex justify-between items-start mb-4"><div className="text-3xl">🤝</div></div><div className="text-2xl font-bold text-gray-800 mb-1">{userStats.partners}</div><div className="text-sm text-gray-600">External Partners</div></div>
              <div className="bg-white border border-gray-200 rounded-lg p-6"><div className="flex justify-between items-start mb-4"><div className="text-3xl">👨‍🏫</div></div><div className="text-2xl font-bold text-gray-800 mb-1">{userStats.staff}</div><div className="text-sm text-gray-600">Staff Members</div></div>
              <div className="bg-white border border-gray-200 rounded-lg p-6"><div className="flex justify-between items-start mb-4"><div className="text-3xl">📧</div></div><div className="text-2xl font-bold text-gray-800 mb-1">425</div><div className="text-sm text-gray-600">Mailing List Subscribers</div></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
