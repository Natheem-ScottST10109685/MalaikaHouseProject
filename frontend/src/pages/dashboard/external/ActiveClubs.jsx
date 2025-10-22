import React from "react";



export default function ActiveClubs() {
  return (
    <div className="dashboard-container">
      
      <aside className="sidebar" id="sidebar">
        <div className="sidebar-header">
          <a href="index.html" className="sidebar-logo">
            Malaika House
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
            <a href="#overview" className="nav-item">
              📊 Overview
            </a>
            <a href="#clubs" className="nav-item">
              🎭 My External Clubs
            </a>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">External Club Management</div>
            <a href="#active-clubs" className="nav-item active">
              ✅ Active Clubs
            </a>
            <a href="#schedule" className="nav-item">
              📅 Schedule
            </a>
            <a href="#participants" className="nav-item">
              👥 Participants (Limited)
            </a>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Resources</div>
            <a href="#materials" className="nav-item">
              📚 Materials
            </a>
            <a href="#guidelines" className="nav-item">
              📋 Partnership Guidelines
            </a>
            <a href="#support" className="nav-item">
              🔧 Support
            </a>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Communication</div>
            <a href="#messages" className="nav-item">
              💬 Messages
            </a>
            <a href="#updates" className="nav-item">
              📢 Updates
            </a>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Account</div>
            <a href="#profile" className="nav-item">
              👤 Profile
            </a>
            <a href="#settings" className="nav-item">
              ⚙️ Settings
            </a>
          </div>
        </nav>
      </aside>

 
      <main className="main-content">
        <div className="top-bar">
          <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
            <button className="mobile-menu-btn" id="mobileMenuBtn">
              ☰
            </button>
            <h1 className="page-title">✅ Active Clubs</h1>
          </div>

          <div className="top-bar-actions">
            <button className="btn btn-secondary">Export Report</button>
            <button className="btn btn-primary">+ Create New Club</button>
          </div>
        </div>

        <div className="content-area">
         
          <div className="clubs-overview">
            <div className="overview-card">
              <div className="overview-icon">🎭</div>
              <div className="overview-number">3</div>
              <div className="overview-label">Active Clubs</div>
            </div>

            <div className="overview-card">
              <div className="overview-icon">👥</div>
              <div className="overview-number">47</div>
              <div className="overview-label">Total Participants</div>
            </div>

            <div className="overview-card">
              <div className="overview-icon">📅</div>
              <div className="overview-number">15</div>
              <div className="overview-label">Sessions This Month</div>
            </div>

            <div className="overview-card">
              <div className="overview-icon">⭐</div>
              <div className="overview-number">4.8</div>
              <div className="overview-label">Avg Rating</div>
            </div>
          </div>

        
          <div className="clubs-grid">
         
            <div className="club-card">
              <div className="club-header">
                <div className="club-info">
                  <h3>Square Peg Kids Club</h3>
                  <div className="club-category">Ages 6-10 • Weekly</div>
                </div>
                <div className="club-status status-active">Active</div>
              </div>

              <div className="club-description">
                Weekly external club for children aged 6-10 focusing on social
                skills, creativity, and peer interaction in a supportive
                environment designed for neurodivergent children.
              </div>

              <div className="club-stats">
                <div className="stats-row">
                  <span className="stat-label">Participants</span>
                  <span className="stat-value">18/20</span>
                </div>
                <div className="stats-row">
                  <span className="stat-label">Sessions Completed</span>
                  <span className="stat-value">6 this month</span>
                </div>
                <div className="stats-row">
                  <span className="stat-label">Attendance Rate</span>
                  <span className="stat-value">94%</span>
                </div>
                <div className="stats-row">
                  <span className="stat-label">Next Session</span>
                  <span className="stat-value">Tomorrow 2:00 PM</span>
                </div>
              </div>

              <div className="club-schedule">
                <div className="schedule-title">Weekly Schedule</div>
                <div className="schedule-item">• Wednesdays: 2:00 PM - 4:00 PM</div>
                <div className="schedule-item">
                  • Location: Community Center Room A
                </div>
              </div>

              <div className="club-actions">
                <button className="club-btn club-btn-primary">Manage Club</button>
                <button className="club-btn club-btn-secondary">View Reports</button>
              </div>
            </div>

            <div className="club-card">
              <div className="club-header">
                <div className="club-info">
                  <h3>Teen Square Pegs</h3>
                  <div className="club-category">Ages 13-17 • Bi-weekly</div>
                </div>
                <div className="club-status status-active">Active</div>
              </div>

              <div className="club-description">
                Bi-weekly teen program focusing on life skills development,
                independence training, and peer support networks for
                neurodivergent teenagers.
              </div>

              <div className="club-stats">
                <div className="stats-row">
                  <span className="stat-label">Participants</span>
                  <span className="stat-value">15/18</span>
                </div>
                <div className="stats-row">
                  <span className="stat-label">Sessions Completed</span>
                  <span className="stat-value">4 this month</span>
                </div>
                <div className="stats-row">
                  <span className="stat-label">Attendance Rate</span>
                  <span className="stat-value">87%</span>
                </div>
                <div className="stats-row">
                  <span className="stat-label">Next Session</span>
                  <span className="stat-value">Friday 4:00 PM</span>
                </div>
              </div>

              <div className="club-schedule">
                <div className="schedule-title">Bi-weekly Schedule</div>
                <div className="schedule-item">• Fridays: 4:00 PM - 6:00 PM</div>
                <div className="schedule-item">• Location: Youth Center Main Hall</div>
              </div>

              <div className="club-actions">
                <button className="club-btn club-btn-primary">Manage Club</button>
                <button className="club-btn club-btn-secondary">View Reports</button>
              </div>
            </div>

          
            <div className="club-card">
              <div className="club-header">
                <div className="club-info">
                  <h3>Adult Square Pegs</h3>
                  <div className="club-category">Ages 18+ • Monthly</div>
                </div>
                <div className="club-status status-scheduled">Scheduled</div>
              </div>

              <div className="club-description">
                Monthly support group and activities for neurodivergent adults,
                focusing on community building, skill sharing, and professional
                development opportunities.
              </div>

              <div className="club-stats">
                <div className="stats-row">
                  <span className="stat-label">Participants</span>
                  <span className="stat-value">14/16</span>
                </div>
                <div className="stats-row">
                  <span className="stat-label">Sessions Completed</span>
                  <span className="stat-value">1 this month</span>
                </div>
                <div className="stats-row">
                  <span className="stat-label">Attendance Rate</span>
                  <span className="stat-value">92%</span>
                </div>
                <div className="stats-row">
                  <span className="stat-label">Next Session</span>
                  <span className="stat-value">Next Saturday 10:00 AM</span>
                </div>
              </div>

              <div className="club-schedule">
                <div className="schedule-title">Monthly Schedule</div>
                <div className="schedule-item">
                  First Saturday: 10:00 AM - 1:00 PM
                </div>
                <div className="schedule-item">
                   Location: Community Center Conference Room
                </div>
              </div>

              <div className="club-actions">
                <button className="club-btn club-btn-primary">Manage Club</button>
                <button className="club-btn club-btn-secondary">View Reports</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
