import React, { useState } from "react";
import "../styles/schedule.css";

const SchedulePage = () => {
  const [view, setView] = useState("Month");
  const [month, setMonth] = useState("November 2025");

  const handlePrevMonth = () => setMonth("October 2025");
  const handleNextMonth = () => setMonth("December 2025");

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <a href="index.html" className="logo">
            <img
              src="https://i.postimg.cc/9QhL2Tz3/2022-12-10-Malaika-House-Name-only-png.png"
              alt="Malaika House Logo"
              style={{ height: "40px" }}
            />
          </a>
          <div className="parent-info">
            <div className="parent-name">Sarah Mitchell</div>
            <div className="parent-role">Internal Parent Dashboard</div>
            <div className="child-info">
              <div className="child-name">Emma Mitchell (Age 8)</div>
              <div className="child-program">Heart Program Member</div>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <div className="nav-section-title">Overview</div>
            <a href="#dashboard" className="nav-item">📊 Dashboard</a>
            <a href="#child-progress" className="nav-item">📈 Child Progress</a>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Sessions</div>
            <a href="#schedule" className="nav-item active">📅 Schedule</a>
            <a href="#book-session" className="nav-item">➕ Book Session</a>
            <a href="#session-history" className="nav-item">📋 Session History</a>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Subscription</div>
            <a href="#subscription" className="nav-item">💳 Subscription Management</a>
            <a href="#payments" className="nav-item">💰 Payment History</a>
            <a href="#auto-renewal" className="nav-item">🔄 Auto-Renewal</a>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Communication</div>
            <a href="#messages" className="nav-item">💬 Messages</a>
            <a href="#updates" className="nav-item">📢 Updates</a>
            <a href="#feedback" className="nav-item">📝 Feedback</a>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Account</div>
            <a href="#profile" className="nav-item">👤 Profile</a>
            <a href="#settings" className="nav-item">⚙️ Settings</a>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="top-bar">
          <h1 className="page-title">Schedule</h1>
          <div className="top-bar-actions">
            <button className="btn btn-secondary">📅 Sync Google Calendar</button>
            <button className="btn btn-primary">➕ Book Session</button>
          </div>
        </div>

        <div className="content-area">
          {/* Schedule Header */}
          <div className="schedule-header">
            <div className="schedule-info">
              <h2>Emma's {month} Schedule</h2>
              <p className="schedule-summary">
                2 sessions remaining this month • Auto-renewal active
              </p>
            </div>
            <div className="schedule-stats">
              <div className="stat-number">4</div>
              <div className="stat-label">Upcoming Sessions</div>
            </div>
          </div>

          {/* Calendar View */}
          <div className="calendar-container">
            <div className="calendar-header">
              <div className="calendar-nav">
                <button className="nav-btn" onClick={handlePrevMonth}>←</button>
                <div className="current-month">{month}</div>
                <button className="nav-btn" onClick={handleNextMonth}>→</button>
              </div>
              <div className="view-toggle">
                {["Month", "Week", "List"].map((v) => (
                  <button
                    key={v}
                    className={`view-btn ${view === v ? "active" : ""}`}
                    onClick={() => setView(v)}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="calendar-grid">
              {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
                <div key={d} className="calendar-day-header">{d}</div>
              ))}
              {/* Hardcoded days */}
              {[...Array(35)].map((_, i) => (
                <div key={i} className="calendar-day">
                  <div className="day-number">{i + 1}</div>
                  {i === 7 && <span className="session-indicator heart-program">Heart Program 2:00 PM</span>}
                  {i === 12 && <span className="session-indicator creative-arts">Creative Arts 10:00 AM</span>}
                  {i === 21 && <span className="session-indicator heart-program">Heart Program 2:00 PM</span>}
                  {i === 28 && <span className="session-indicator social-skills">Social Skills 1:00 PM</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Sessions & Legend */}
          <div className="upcoming-sessions">
            <div className="sessions-list">
              <div className="section-header">
                <h2 className="section-title">Upcoming Sessions</h2>
                <button className="btn btn-secondary">View All</button>
              </div>

              <div className="session-item">
                <div className="session-time">
                  <div className="session-date">Nov 29</div>
                  <div className="session-hour">1:00 PM</div>
                </div>
                <div className="session-details">
                  <div className="session-title">Social Skills Workshop</div>
                  <div className="session-type">Group Session • 90 minutes</div>
                  <div className="session-location">📍 Main Activity Room</div>
                </div>
                <div className="session-actions">
                  <button className="action-btn btn-reschedule">Reschedule</button>
                  <button className="action-btn btn-cancel">Cancel</button>
                </div>
              </div>

              <div className="session-item">
                <div className="session-time">
                  <div className="session-date">Dec 6</div>
                  <div className="session-hour">2:00 PM</div>
                </div>
                <div className="session-details">
                  <div className="session-title">Heart Program Session</div>
                  <div className="session-type">Individual Session • 60 minutes</div>
                  <div className="session-location">📍 Therapy Room B</div>
                </div>
                <div className="session-actions">
                  <button className="action-btn btn-reschedule">Reschedule</button>
                  <button className="action-btn btn-cancel">Cancel</button>
                </div>
              </div>
            </div>

            <div className="calendar-legend">
              <div className="section-header">
                <h2 className="section-title">Session Types</h2>
              </div>
              <div className="legend-item"><div className="legend-color heart-program"></div><span>Heart Program</span></div>
              <div className="legend-item"><div className="legend-color social-skills"></div><span>Social Skills</span></div>
              <div className="legend-item"><div className="legend-color creative-arts"></div><span>Creative Arts</span></div>

              <div className="quick-actions">
                <h3>Quick Actions</h3>
                <button className="btn btn-primary w-full">📅 Book New Session</button>
                <button className="btn btn-secondary w-full">📋 Session History</button>
                <button className="btn btn-secondary w-full">⚙️ Notification Settings</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SchedulePage;
