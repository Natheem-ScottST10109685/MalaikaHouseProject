import React, { useEffect, useState } from 'react';
import '/CSS/adminDash.css';
import { apiFetch } from '../../../lib/api'

export default function AdminOverview() {
    const [sidebarActive, setSidebarActive] = useState(false);
    const [activeNav, setActiveNav] = useState('#overview');
    const [pageTitle, setPageTitle] = useState('Dashboard Overview');
    const [me, setMe ] = useState(null);
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

    async function loadUsers({ page = 1, q = usersQuery, role = usersRoleFilter } = {}) {
        const params = new URLSearchParams({
            page: String(page),
            pageSize: String(usersData.pageSize),
        });
        if (q) params.set('q', q);
        if (role) params. set('role', role);

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
            if (window.innerWidth > 768) {
                setSidebarActive(false);
            }
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
        let active= true;

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
            const res = await apiFetch('/admin/activity?page=1&pageSize==10');
            if (res.ok) {
                const d = await res.json();
                if (active) setRecentActivity(d.items || []);
            }
        })();
        return () => { active = false }
    }, []);

    function toggleSidebar() {
        setSidebarActive(s => !s);
    }

    function closeSidebar() {
        setSidebarActive(false);
    }

    function onNavClick(e, href) {
        e.preventDefault();
        setActiveNav(href);
        const text = e.currentTarget.textContent.trim();
        setPageTitle(text);
        if (window.innerWidth <= 768) closeSidebar();

        const role = currentRoleFromNav(href);
        if (['#users', '#internal-parents', 'external-people', '#staff'].includes(href)) {
            setUsersRoleFilter(role);
            setUsersQuery('');
            loadUsers({ page: 1, q: '', role });
        }
    }

    function onUsersSearchSubmit(e) {
        e.preventDefault();
        loadUsers({ page: 1, q: usersQuery });
    }

    function onUsersPrev() {
        const p = Math.max(1, usersData.page - 1);
        if (p !== usersData.page) loadUsers({ page: p });
    }

    function onUsersNext() {
        if (usersData.hasMore) loadUsers({ page: usersData.page + 1 });
    }

    async function showNotifications() {
        const res = await apiFetch('/admin/notifications?limit=20');
        if (!res.ok) {
            alert('Could not load notifications');
            return;
        }
        const items = await res.json();
        setNotifications(items);

        const lines = items.map(n => 
            `• [${new DataTransfer(n.createdAt).toLocaleString()}] (${n.severity}) ${n.title}\n ${n.message}${n.read ? '' : ' [UNREAD]'}`
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
            options.map(([, label], i) => `${i +1}. ${label}`).join('\n')
        );
        if (!choice) return;

        const idx = parseInt(choice, 10) - 1;
        const selected = options[idx];
        if (!selected) {
            alert('Invalid selection.');
            return;
        }
        const [role, label] = selected;

        const email = prompt(`Enter email for ${label}`);
        if (!email) return;

        (async () => {
            try {
                const res = await apiFetch('/admin/users', {
                    method: 'POST',
                    body: JSON.stringify({ email, role }),
                });
                if (!res.ok) {
                    const data = await res.json().catch(() => ({}));
                    if (res.status === 409 || data?.error?.code === 'EMAIL_TAKEN') {
                        alert('A user with that email already exists.');
                        return;
                    }
                    alert('Could not create user.');
                    return;
                }
                const data = await res.json();
                alert(
                    `${label} created successfully.\n\n` +
                    `Email: ${data.email}\nRole: ${data.role}\n` +
                    `Temporary Password (Share Securely): ${data.tempPassword}\n\n` +
                    `The user should login and change their password immediately.`
                );
            } catch (e) {
                console.error(e);
                alert('Network error creating user.');
            }
        })();
    }

    return (
        <div className="dashboard-container">
            <aside className={`sidebar ${sidebarActive ? 'active' : ''}`} id="sidebar">
                <div className="sidebar-header">
                    <a href="/" className="logo">
                        <img src="https://i.postimg.cc/9QhL2Tz3/2022-12-10-Malaika-House-Name-only-png.png" alt="Malaika House Logo" style={{ height: 40 }} />
                    </a>
                    <div className="admin-info">
                        <div className="admin-name">{me?.email ?? 'Admin'}</div>
                        <div className="admin-role">{me?.role ?? 'ADMIN'}</div>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <div className="nav-section">
                        <div className="nav-section-title">Dashboard</div>
                        <a href="#overview" className={`nav-item ${activeNav === '#overview' ? 'active' : ''}`} onClick={(e) => onNavClick(e, '#overview')}>📊 Overview</a>
                        <a href="#analytics" className={`nav-item ${activeNav === '#analytics' ? 'active' : ''}`} onClick={(e) => onNavClick(e, '#analytics')}>📈 Analytics & Reports</a>
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

            <main className="main-content">
                <div className="top-bar">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                        <button className="mobile-menu-btn" id="mobileMenuBtn" onClick={toggleSidebar}>☰</button>
                        <h1 className="page-title">{pageTitle}</h1>
                    </div>
                    <div className="top-bar-actions">
                        <button className="notification-btn" onClick={showNotifications}>
                            🔔
                            <span className="notification-badge">{unreadCount}</span>
                        </button>
                        <button className="btn btn-primary" onClick={onAddNew}>+ Add New</button>
                    </div>
                </div>

                <div className="content-area">

                    {(['#users', '#internal-parents', '#external-people', '#staff'].includes(activeNav)) ? (
                        <div className="content-section">
                            <div className="section-header">
                                <h2 className="section-title">
                                    {activeNav === '#users' ? 'All Users'
                                        : activeNav === '#internal-parents' ? 'Internal Parents'
                                        : activeNav === '#external-people' ? 'External Partners'
                                        : 'Staff'}
                                </h2>
                                <div className="section-actions" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                    <form onSubmit={onUsersSearchSubmit} style={{ display: 'flex', gap: 8 }}>
                                        <input
                                            type="search"
                                            placeholder="Search Email"
                                            value={usersQuery}
                                            onChange={(e) => setUsersQuery(e.target.value)}
                                            className="form-input"
                                            style={{ maxWidth: 220 }}
                                        />
                                        <button className="btn btn-secondary" type="submit">Search</button>
                                    </form>
                                    <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                                        <button className="btn btn-secondary" onClick={onUsersPrev} disabled={usersData.page <= 1}>Prev</button>
                                        <button className="btn btn-secondary" onClick={onUsersNext} disabled={!usersData.hasMore}>Next</button>
                                    </div>
                                </div>
                            </div>

                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Joined</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usersData.items.map(u => (
                                        <tr key={u.id}>
                                            <td>{u.email}</td>
                                            <td>
                                                {u.role === 'PARENT' ? 'Internal Parent'
                                                    : u.role === 'PARTNER' ? 'External Partner'
                                                    : u.role === 'STAFF' ? 'Staff'
                                                    : 'Admin'}
                                            </td>
                                            <td>{new Date(u.createdAt).toLocaleString()}</td>
                                            <td>
                                                <button className="btn btn-secondary" onClick={() => alert(`View ${u.email}`)}>View</button>{' '}
                                                <button className="btn btn-secondary" onClick={() => alert(`Edit ${u.email}`)}>Edit</button>{' '}
                                                <button className="btn btn-secondary" onClick={() => alert(`Disable ${u.email}`)}>Disable</button>
                                            </td>
                                        </tr>
                                    ))}
                                    {usersData.items.length === 0 && (
                                        <tr>
                                            <td colSpan={4} style={{ textAlign: 'center', opacity: 0.7, padding: 16 }}>
                                                No Users Found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            <div style={{ marginTop: 8, opacity: 0.7 }}>
                                Page {usersData.page} - Total {usersData.total}
                            </div>
                        </div>
                    ) : null }

                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-header">
                                <div className="stat-icon">👥</div>
                                <div className="stat-trend up">↗ 12%</div>
                            </div>
                            <div className="stat-number">{userStats.total}</div>
                            <div className="stat-label">Total Users</div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-header">
                                <div className="stat-icon">❤️</div>
                                <div className="stat-trend up">↗ 8%</div>
                            </div>
                            <div className="stat-number">{userStats.parents}</div>
                            <div className="stat-label">Heart Program Members</div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-header">
                                <div className="stat-icon">📅</div>
                                <div className="stat-trend up">↗ 15%</div>
                            </div>
                            <div className="stat-number">{stats.sessionsThisMonth}</div>
                            <div className="stat-label">Sessions This Month</div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-header">
                                <div className="stat-icon">💰</div>
                                <div className="stat-trend up">↗ 5%</div>
                            </div>
                            <div className="stat-number">R{Number(stats.revenueMonthly).toLocaleString('en-ZA')}</div>
                            <div className="stat-label">Monthly Revenue</div>
                        </div>
                    </div>

                    <div className="dashboard-grid">
                        <div className="content-section">
                            <div className="section-header">
                                <h2 className="section-title">Recent User Activity</h2>
                                <div className="section-actions">
                                    <button className="btn btn-secondary">View All</button>
                                </div>
                            </div>

                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Type</th>
                                        <th>Action</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentActivity.map(item => (
                                        <tr ley={item.id} onClick={() => alert(
                                        `Action: ${item.action}\nBy: ${item.actorEmail || '(system'} (${item.actorRole || '-'})\n` +
                                        `Target: ${item.targetType || '-'} ${item.targetId || ''}\nStatus: ${item.status}\n` +
                                        `When: ${new Date(item.createdAt).toLocaleString()}`
                                    )} style={{ cursor: 'pointer' }}>
                                        <td>{item.actorEmail || 'System'}</td>
                                        <td>{item.actorRole || '-'}</td>
                                        <td>{item.action.replaceAll('_', ' ')}</td>
                                        <td><span className={`status-badge ${item.status === 'SUCCESS' ? 'status-active' : 'status-pending'}`}>{item.status}</span></td>
                                        <td>{new Date(item.createdAt).toLocaleString()}</td>
                                    </tr>
                                ))}
                                {recentActivity.length === 0 && (
                                    <tr>
                                        <td colSpan={5} style={{ textAlign: 'center', opacity: 0.7, padding: 16 }}>
                                            No Recent Activity.
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>

                        <div className="content-section">
                            <div className="section-header">
                                <h2 className="section-title">System Status</h2>
                            </div>

                            <div className="integration-grid">
                                <div className="integration-card" onClick={() => alert('Google Calendar Integration\nStatus: Connected\n\nClick to manage integration settings and view detailed logs.')} style={{ cursor: 'pointer' }}>
                                    <div className="integration-header">
                                        <div className="integration-name">Google Calendar</div>
                                        <div className="integration-status status-connected">Connected</div>
                                    </div>
                                    <div className="integration-desc">Booking system sync active</div>
                                </div>

                                <div className="integration-card" onClick={() => alert('Payment Gateway Integration\nStatus: Connected\n\nClick to manage integration settings and view detailed logs.')} style={{ cursor: 'pointer' }}>
                                    <div className="integration-header">
                                        <div className="integration-name">Payment Gateway</div>
                                        <div className="integration-status status-connected">Connected</div>
                                    </div>
                                    <div className="integration-desc">Secure payments processing</div>
                                </div>

                                <div className="integration-card" onClick={() => alert('Notion CMS Integration\nStatus: Connected\n\nClick to manage integration settings and view detailed logs.')} style={{ cursor: 'pointer' }}>
                                    <div className="integration-header">
                                        <div className="integration-name">Notion CMS</div>
                                        <div className="integration-status status-connected">Connected</div>
                                    </div>
                                    <div className="integration-desc">Content management active</div>
                                </div>

                                <div className="integration-card" onClick={() => alert('MailChimp Integration\nStatus: Error\n\nClick to manage integration settings and view detailed logs.')} style={{ cursor: 'pointer' }}>
                                    <div className="integration-header">
                                        <div className="integration-name">MailChimp</div>
                                        <div className="integration-status status-error">Error</div>
                                    </div>
                                    <div className="integration-desc">Newsletter sync requires attention</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="content-section">
                        <div className="section-header">
                            <h2 className="section-title">User Management Overview</h2>
                            <div className="section-actions">
                                <button className="btn btn-primary">+ Add User</button>
                                <button className="btn btn-secondary">Manage All</button>
                            </div>
                        </div>

                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-header">
                                    <div className="stat-icon">👨‍👩‍👧‍👦</div>
                                </div>
                                <div className="stat-number">{userStats.parents}</div>
                                <div className="stat-label">Internal Parents</div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-header">
                                    <div className="stat-icon">🤝</div>
                                </div>
                                <div className="stat-number">{userStats.partners}</div>
                                <div className="stat-label">External Partners</div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-header">
                                    <div className="stat-icon">👨‍🏫</div>
                                </div>
                                <div className="stat-number">{userStats.staff}</div>
                                <div className="stat-label">Staff Members</div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-header">
                                    <div className="stat-icon">📧</div>
                                </div>
                                <div className="stat-number">425</div>
                                <div className="stat-label">Mailing List Subscribers</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
