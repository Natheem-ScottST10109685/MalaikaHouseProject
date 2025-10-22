import React, { useEffect, useState } from 'react';
import '/CSS/adminDash.css';

export default function AdminOverview() {
    const [sidebarActive, setSidebarActive] = useState(false);
    const [activeNav, setActiveNav] = useState('#overview');
    const [pageTitle, setPageTitle] = useState('Dashboard Overview');

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth > 768) {
                setSidebarActive(false);
            }
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
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
        // Derive a readable title from the link text
        const text = e.currentTarget.textContent.trim();
        setPageTitle(text);
        if (window.innerWidth <= 768) closeSidebar();
    }

    function showNotifications() {
        alert('System Notifications:\n• Payment gateway maintenance scheduled\n• New Heart Program applications: 5\n• Monthly backup completed successfully');
    }

    function onAddNew() {
        const options = [
            'Add Internal Parent',
            'Add External Partner',
            'Add Staff Member',
            'Create Event',
            'Write News Update',
            'Schedule Malaika Session'
        ];
        const choice = prompt('What would you like to create?\n' + options.map((opt, i) => `${i + 1}. ${opt}`).join('\n'));
        if (choice) {
            alert(`Opening ${options[parseInt(choice) - 1] || 'new item'} creation form...`);
        }
    }

    // Static rows and integration cards from original HTML
    return (
        <div className="dashboard-container">
            <aside className={`sidebar ${sidebarActive ? 'active' : ''}`} id="sidebar">
                <div className="sidebar-header">
                    <a href="/" className="logo">
                        <img src="https://i.postimg.cc/9QhL2Tz3/2022-12-10-Malaika-House-Name-only-png.png" alt="Malaika House Logo" style={{ height: 40 }} />
                    </a>
                    <div className="admin-info">
                        <div className="admin-name">Amarta</div>
                        <div className="admin-role">Co-Founder & Director</div>
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
                            <span className="notification-badge">3</span>
                        </button>
                        <button className="btn btn-primary" onClick={onAddNew}>+ Add New</button>
                    </div>
                </div>

                <div className="content-area">
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-header">
                                <div className="stat-icon">👥</div>
                                <div className="stat-trend up">↗ 12%</div>
                            </div>
                            <div className="stat-number">147</div>
                            <div className="stat-label">Total Users</div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-header">
                                <div className="stat-icon">❤️</div>
                                <div className="stat-trend up">↗ 8%</div>
                            </div>
                            <div className="stat-number">73</div>
                            <div className="stat-label">Heart Program Members</div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-header">
                                <div className="stat-icon">📅</div>
                                <div className="stat-trend up">↗ 15%</div>
                            </div>
                            <div className="stat-number">284</div>
                            <div className="stat-label">Sessions This Month</div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-header">
                                <div className="stat-icon">💰</div>
                                <div className="stat-trend up">↗ 5%</div>
                            </div>
                            <div className="stat-number">R98,350</div>
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
                                    <tr onClick={() => alert('Opening detailed view for Sarah Mitchell (Internal Parent)...')} style={{ cursor: 'pointer' }}>
                                        <td>Sarah Mitchell</td>
                                        <td>Internal Parent</td>
                                        <td>Booked Heart Program session</td>
                                        <td><span className="status-badge status-active">Confirmed</span></td>
                                        <td>2 hours ago</td>
                                    </tr>
                                    <tr onClick={() => alert('Opening detailed view for Marcus Johnson (External Partner)...')} style={{ cursor: 'pointer' }}>
                                        <td>Marcus Johnson</td>
                                        <td>External Partner</td>
                                        <td>Updated Square Peg club details</td>
                                        <td><span className="status-badge status-active">Complete</span></td>
                                        <td>4 hours ago</td>
                                    </tr>
                                    <tr onClick={() => alert('Opening detailed view for David Chen (Internal Parent)...')} style={{ cursor: 'pointer' }}>
                                        <td>David Chen</td>
                                        <td>Internal Parent</td>
                                        <td>Updated child profile</td>
                                        <td><span className="status-badge status-active">Complete</span></td>
                                        <td>1 day ago</td>
                                    </tr>
                                    <tr onClick={() => alert('Opening detailed view for Team WIL Admin (External Partner)...')} style={{ cursor: 'pointer' }}>
                                        <td>Team WIL Admin</td>
                                        <td>External Partner</td>
                                        <td>Synced training materials</td>
                                        <td><span className="status-badge status-pending">In Progress</span></td>
                                        <td>2 days ago</td>
                                    </tr>
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
                                <div className="stat-number">89</div>
                                <div className="stat-label">Internal Parents</div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-header">
                                    <div className="stat-icon">🤝</div>
                                </div>
                                <div className="stat-number">12</div>
                                <div className="stat-label">External Partners</div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-header">
                                    <div className="stat-icon">👨‍🏫</div>
                                </div>
                                <div className="stat-number">15</div>
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
