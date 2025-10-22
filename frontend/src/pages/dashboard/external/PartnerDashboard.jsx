import React from "react";

export default function PartnerDashboard() {
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
            <a href="#overview" className="nav-item active">
              📊 Overview
            </a>
            <a href="#clubs" className="nav-item">
              🎭 My External Clubs
            </a>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">External Club Management</div>
            <a href="#active-clubs" className="nav-item">
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

      {/* Sidebar Overlay */}
      <div className="sidebar-overlay" id="sidebarOverlay"></div>

      {/* Main Content */}
      <main className="main-content">
        <div className="top-bar">
          <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
            <button className="mobile-menu-btn" id="mobileMenuBtn">
              ☰
            </button>
            <h1 className="page-title">Partner Dashboard</h1>
          </div>
          <div className="top-bar-actions">
            <button className="contact-btn">📞 Contact Malaika</button>
          </div>
        </div>

        <div className="content-area">
          {/* Access Notice */}
          <div className="access-notice">
            <div className="access-notice-title">External Partner Access</div>
            <div className="access-notice-text">
              You have access to external club management features only. Some
              administrative functions are restricted to maintain privacy and
              security.
            </div>
          </div>

          {/* Welcome Section */}
          <div className="welcome-section">
            <div className="welcome-content">
              <h2 className="welcome-title">Welcome back, Marcus!</h2>
              <p className="welcome-message">
                You have 3 active external clubs with 47 total participants.
                Your programs are making a positive impact in our community!
              </p>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon">🎭</div>
              </div>
              <div className="stat-number">3</div>
              <div className="stat-label">External Clubs Active</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon">👥</div>
              </div>
              <div className="stat-number">47</div>
              <div className="stat-label">Total Participants</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon">📅</div>
              </div>
              <div className="stat-number">12</div>
              <div className="stat-label">Sessions This Month</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon">⭐</div>
              </div>
              <div className="stat-number">4.8</div>
              <div className="stat-label">Average Rating</div>
            </div>
          </div>

          {/* hardcoded for now */}
          <div className="dashboard-grid">
            
            <div className="content-section">
              <div className="section-header">
                <h2 className="section-title">Your External Clubs</h2>
                <div>
                  <button className="btn btn-primary">
                    + Create External Club
                  </button>
                </div>
              </div>

              <div className="club-grid">
                
                <div className="club-card">
                  <div className="club-header">
                    <div>
                      <div className="club-name">Square Peg Kids Club</div>
                      <div className="club-participants">18 participants</div>
                    </div>
                    <div className="club-status status-active">Active</div>
                  </div>
                  <div className="club-description">
                    Weekly external club for children aged 6-10 focusing on
                    social skills, creativity, and peer interaction in a
                    supportive environment.
                  </div>
                  <div className="club-actions">
                    <button className="club-btn club-btn-edit">
                      Manage Club
                    </button>
                    <button className="club-btn club-btn-view">
                      View Details
                    </button>
                  </div>
                </div>

               
                <div className="club-card">
                  <div className="club-header">
                    <div>
                      <div className="club-name">Teen Square Pegs</div>
                      <div className="club-participants">15 participants</div>
                    </div>
                    <div className="club-status status-active">Active</div>
                  </div>
                  <div className="club-description">
                    Bi-weekly teen program for ages 13-17 focusing on life
                    skills, independence, and peer support networks.
                  </div>
                  <div className="club-actions">
                    <button className="club-btn club-btn-edit">
                      Manage Club
                    </button>
                    <button className="club-btn club-btn-view">
                      View Details
                    </button>
                  </div>
                </div>

                <div className="club-card">
                  <div className="club-header">
                    <div>
                      <div className="club-name">Adult Square Pegs</div>
                      <div className="club-participants">14 participants</div>
                    </div>
                    <div className="club-status status-scheduled">
                      Scheduled
                    </div>
                  </div>
                  <div className="club-description">
                    Monthly support group and activities for neurodivergent
                    adults, focusing on community building and skill sharing.
                  </div>
                  <div className="club-actions">
                    <button className="club-btn club-btn-edit">
                      Manage Club
                    </button>
                    <button className="club-btn club-btn-view">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>

            
            <div>
              <div className="content-section" style={{ marginBottom: "20px" }}>
                <div className="section-header">
                  <h2 className="section-title">Quick Actions</h2>
                </div>

                <div className="quick-actions">
                  <a href="#new-club" className="action-card">
                    <div className="action-icon">🎭</div>
                    <div className="action-title">Create External Club</div>
                    <div className="action-desc">Start a new program</div>
                  </a>

                  <a href="#schedule" className="action-card">
                    <div className="action-icon">📅</div>
                    <div className="action-title">Schedule Session</div>
                    <div className="action-desc">Plan upcoming activities</div>
                  </a>

                  <a href="#reports" className="action-card">
                    <div className="action-icon">📊</div>
                    <div className="action-title">View Reports</div>
                    <div className="action-desc">Club activity summaries</div>
                  </a>
                </div>
              </div>

              <div className="content-section">
                <div className="section-header">
                  <h2 className="section-title">Recent Activity</h2>
                </div>

                <div className="activity-item">
                  <div className="activity-header">
                    <div className="activity-title">
                      Teen Square Pegs Session Completed
                    </div>
                    <div className="activity-time">2 hours ago</div>
                  </div>
                  <div className="activity-description">
                    Successfully completed life skills workshop with 14
                    participants. High engagement and positive feedback
                    received.
                  </div>
                </div>

                <div className="activity-item">
                  <div className="activity-header">
                    <div className="activity-title">
                      New Participant Registered
                    </div>
                    <div className="activity-time">1 day ago</div>
                  </div>
                  <div className="activity-description">
                    Alex M. joined the Square Peg Kids Club. Welcome package and
                    orientation scheduled.
                  </div>
                </div>

                <div className="activity-item limited-access">
                  <div className="activity-header">
                    <div className="activity-title">
                      Internal System Update
                    </div>
                    <div className="activity-time">3 days ago</div>
                  </div>
                  <div className="activity-description">
                    Internal administrative updates - external partners have
                    limited access to this information.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
