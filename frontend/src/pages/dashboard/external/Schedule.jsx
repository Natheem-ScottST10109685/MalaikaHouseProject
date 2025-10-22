import React from "react";
import "./schedule.css";

const SchedulePage = () => {
  const upcomingSessions = [
    {
      title: "Creative Arts Workshop",
      club: "Square Peg Kids Club",
      time: "Tomorrow, 2:00 PM",
      details: "18 participants registered. Focus on collaborative art projects and social interaction skills.",
    },
    {
      title: "Life Skills Development",
      club: "Teen Square Pegs",
      time: "Sept 28, 4:00 PM",
      details: "15 participants. Workshop on practical life skills and independence building.",
    },
    {
      title: "Monthly Support Circle",
      club: "Adult Square Pegs",
      time: "Oct 1, 7:00 PM",
      details: "14 participants expected. Community building and peer support activities.",
    },
  ];

  const calendarDays = [
    { day: 31, otherMonth: true },
    { day: 1 }, { day: 2, sessions: ["scheduled"] }, { day: 3, sessions: ["active", "scheduled"] },
    { day: 4 }, { day: 5, sessions: ["completed"] }, { day: 6 },
    { day: 7 }, { day: 8, sessions: ["active"] }, { day: 9 },
    { day: 10, sessions: ["scheduled", "active"] }, { day: 11 }, { day: 12, sessions: ["completed"] },
    { day: 13 }, { day: 14 }, { day: 15, sessions: ["active"] },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar" id="sidebar">
        <div className="sidebar-header">
          <a href="index.html" className="logo">
            <img
              src="https://i.postimg.cc/9QhL2Tz3/2022-12-10-Malaika-House-Name-only-png.png"
              alt="Malaika House Logo"
              style={{ height: "40px" }}
            />
          </a>
          <div className="partner-info">
            <div className="partner-name">Marcus Johnson</div>
            <div className="partner-role">External Partner</div>
            <div className="organization-info">
              <div className="org-name">Square Peg Foundation</div>
              <div className="org-type">External Club Partner</div>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <div className="nav-section-title">Dashboard</div>
            <a href="#overview" className="nav-item">📊 Overview</a>
            <a href="#clubs" className="nav-item">🎭 My External Clubs</a>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">External Club Management</div>
            <a href="#active-clubs" className="nav-item">✅ Active Clubs</a>
            <a href="#schedule" className="nav-item active">📅 Schedule</a>
            <a href="#participants" className="nav-item">👥 Participants (Limited)</a>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Resources</div>
            <a href="#materials" className="nav-item">📚 Materials</a>
            <a href="#guidelines" className="nav-item">📋 Partnership Guidelines</a>
            <a href="#support" className="nav-item">🔧 Support</a>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Communication</div>
            <a href="#messages" className="nav-item">💬 Messages</a>
            <a href="#updates" className="nav-item">📢 Updates</a>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Account</div>
            <a href="#profile" className="nav-item">👤 Profile</a>
            <a href="#settings" className="nav-item">⚙️ Settings</a>
          </div>
        </nav>
      </aside>

      {/* Sidebar Overlay */}
      <div className="sidebar-overlay" id="sidebarOverlay"></div>

      {/* Main Content */}
      <main className="main-content">
        <div className="top-bar">
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <button className="mobile-menu-btn" id="mobileMenuBtn">☰</button>
            <h1 className="page-title">Schedule Management</h1>
          </div>
          <div className="top-bar-actions">
            <button className="contact-btn">📞 Contact Malaika</button>
          </div>
        </div>

        <div className="content-area">
          {/* Schedule Header */}
          <div className="schedule-header">
            <div className="schedule-content">
              <h2 className="schedule-title">📅 Schedule Management</h2>
              <p className="schedule-subtitle">Manage your external club sessions and events</p>
              <div className="schedule-actions">
                <button className="btn btn-white">+ Schedule New Session</button>
                <button className="btn btn-white">📊 View Reports</button>
              </div>
            </div>
          </div>

          {/* Calendar Navigation */}
          <div className="calendar-nav">
            <button className="nav-btn">‹</button>
            <div className="calendar-month">September 2025</div>
            <button className="nav-btn">›</button>
          </div>

          {/* Legend */}
          <div className="legend">
            {[
              { className: "session-active", label: "Active Sessions" },
              { className: "session-scheduled", label: "Scheduled" },
              { className: "session-completed", label: "Completed" },
            ].map((item, i) => (
              <div key={i} className="legend-item">
                <div className={`legend-dot ${item.className}`}></div>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          {/* Schedule Grid */}
          <div className="schedule-grid">
            {/* Filters */}
            <div className="schedule-filters">
              <h3 className="filter-title">Filters</h3>
              <div className="filter-group">
                <label className="filter-label">Club</label>
                <select className="filter-select">
                  <option>All Clubs</option>
                  <option>Square Peg Kids Club</option>
                  <option>Teen Square Pegs</option>
                  <option>Adult Square Pegs</option>
                </select>
              </div>
              <div className="filter-group">
                <label className="filter-label">Status</label>
                <select className="filter-select">
                  <option>All Sessions</option>
                  <option>Active</option>
                  <option>Scheduled</option>
                  <option>Completed</option>
                </select>
              </div>
              <div className="filter-group">
                <label className="filter-label">View</label>
                <select className="filter-select">
                  <option>Calendar View</option>
                  <option>List View</option>
                  <option>Week View</option>
                </select>
              </div>
            </div>

            {/* Calendar */}
            <div className="calendar-view">
              <div className="calendar-header">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
                  <div key={i} className="day-header">{day}</div>
                ))}
              </div>
              <div className="calendar-body">
                {calendarDays.map((day, i) => (
                  <div
                    key={i}
                    className={`calendar-day ${day.otherMonth ? "day-other-month" : ""}`}
                  >
                    <div className="day-number">{day.day}</div>
                    {day.sessions?.map((session, j) => (
                      <div key={j} className={`session-dot session-${session}`}></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Sessions */}
          <div className="upcoming-sessions">
            <h2 className="section-title">Upcoming Sessions</h2>
            <div className="session-list">
              {upcomingSessions.map((session, i) => (
                <div key={i} className="session-item">
                  <div className="session-header">
                    <div>
                      <div className="session-title">{session.title}</div>
                      <div className="session-club">{session.club}</div>
                    </div>
                    <div className="session-time">{session.time}</div>
                  </div>
                  <div className="session-details">{session.details}</div>
                  <div className="session-actions">
                    <button className="session-btn btn-edit">Edit Session</button>
                    <button className="session-btn btn-cancel">Cancel</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default SchedulePage;
