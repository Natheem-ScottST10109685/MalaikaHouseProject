import React from "react";
import "./participants.css";
///important note, for this section i tried to add in seeded data like the others but was having isssues so hardcoded instead

const ParticipantsOverview = () => {
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
            <a href="#schedule" className="nav-item">📅 Schedule</a>
            <a href="#participants" className="nav-item active">👥 Participants (Limited)</a>
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

    
      <div className="sidebar-overlay" id="sidebarOverlay"></div>

      
      <main className="main-content">
        <div className="top-bar">
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <button className="mobile-menu-btn" id="mobileMenuBtn">☰</button>
            <h1 className="page-title">Participants Overview</h1>
          </div>
          <div className="top-bar-actions">
            <button className="contact-btn">📞 Contact Malaika</button>
          </div>
        </div>

        <div className="content-area">
        
          <div className="access-notice">
            <div className="notice-content">
              <div className="notice-icon">🛡️</div>
              <div className="notice-text">
                <div className="notice-title">External Partner Access - Privacy Protected</div>
                <div className="notice-description">
                  As an external partner, you have access to anonymized participant statistics and club-level information only. Individual participant details are protected under our privacy and safeguarding policies.
                </div>
              </div>
            </div>
          </div>

         
          <div className="stats-section">
            <h2 className="stats-title">Your Club Participant Statistics</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">47</div>
                <div className="stat-label">Total Participants</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">18</div>
                <div className="stat-label">Kids Club (6-10)</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">15</div>
                <div className="stat-label">Teen Club (13-17)</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">14</div>
                <div className="stat-label">Adult Club (18+)</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">92%</div>
                <div className="stat-label">Average Attendance</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">4.8</div>
                <div className="stat-label">Session Rating</div>
              </div>
            </div>
          </div>

          <div className="controls-section">
            <h3 className="controls-title">Limited Search and Filtering</h3>
            <div className="search-filters-grid">
              <div className="control-group">
                <label className="control-label">Search by Group/Age Range</label>
                <input type="text" className="control-input" placeholder="Search by age group or club..." />
              </div>
              <div className="control-group">
                <label className="control-label">Club Filter</label>
                <select className="control-input">
                  <option>All Your Clubs</option>
                  <option>Kids Club</option>
                  <option>Teen Club</option>
                  <option>Adult Club</option>
                </select>
              </div>
              <div className="control-group">
                <label className="control-label">Status Filter</label>
                <select className="control-input">
                  <option>All Active</option>
                  <option>Regular Attendees</option>
                  <option>New Participants</option>
                  <option>Returning</option>
                </select>
              </div>
              <div className="control-group">
                <button className="btn btn-primary">Apply Filters</button>
              </div>
            </div>
          </div>

          <div className="privacy-protection">
            <div className="privacy-content">
              <div className="privacy-icon">🔒</div>
              <h2 className="privacy-title">Individual Participant Information Protected</h2>
              <p className="privacy-text">
                To ensure participant privacy and comply with data protection regulations, individual participant details, names, and personal information are not accessible through external partner accounts. You can access anonymized group statistics and session-level information for effective program management.
              </p>
            </div>
          </div>

          
          <div className="clubs-overview">
            <h2 className="clubs-title">Club Participation Overview</h2>
            <div className="clubs-grid">
           
              <div className="club-overview-card">
                <div className="club-header">
                  <div className="club-name">Square Peg Kids Club</div>
                  <div className="club-count">18</div>
                </div>
                <div className="club-details">
                  Weekly sessions for children aged 6-10. Focus on social skills development, creative activities, and peer interaction.
                </div>
                <div className="club-metrics">
                  <div className="metric-item">
                    <div className="metric-value">94%</div>
                    <div className="metric-label">Attendance</div>
                  </div>
                  <div className="metric-item">
                    <div className="metric-value">12</div>
                    <div className="metric-label">Sessions/Month</div>
                  </div>
                  <div className="metric-item">
                    <div className="metric-value">4.9</div>
                    <div className="metric-label">Rating</div>
                  </div>
                </div>
              </div>

              
              <div className="club-overview-card">
                <div className="club-header">
                  <div className="club-name">Teen Square Pegs</div>
                  <div className="club-count">15</div>
                </div>
                <div className="club-details">
                  Bi-weekly sessions for teenagers aged 13-17. Focus on life skills, independence, and peer support.
                </div>
                <div className="club-metrics">
                  <div className="metric-item">
                    <div className="metric-value">87%</div>
                    <div className="metric-label">Attendance</div>
                  </div>
                  <div className="metric-item">
                    <div className="metric-value">8</div>
                    <div className="metric-label">Sessions/Month</div>
                  </div>
                  <div className="metric-item">
                    <div className="metric-value">4.7</div>
                    <div className="metric-label">Rating</div>
                  </div>
                </div>
              </div>

              
              <div className="club-overview-card">
                <div className="club-header">
                  <div className="club-name">Adult Square Pegs</div>
                  <div className="club-count">14</div>
                </div>
                <div className="club-details">
                  Monthly support groups and activities for adults 18+. Community building, skill sharing, and peer mentorship opportunities.
                </div>
                <div className="club-metrics">
                  <div className="metric-item">
                    <div className="metric-value">92%</div>
                    <div className="metric-label">Attendance</div>
                  </div>
                  <div className="metric-item">
                    <div className="metric-value">4</div>
                    <div className="metric-label">Sessions/Month</div>
                  </div>
                  <div className="metric-item">
                    <div className="metric-value">4.8</div>
                    <div className="metric-label">Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

         
          <div className="actions-section">
            <button className="action-button">📊 Request Detailed Analytics</button>
            <button className="action-button">📞 Schedule Parent Communication</button>
            <button className="action-button">📋 Download Club Summaries</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ParticipantsOverview;
