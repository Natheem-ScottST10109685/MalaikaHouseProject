import React from "react";
import "./updates.css";

const UpdatesPage = () => {
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
            <a href="#schedule" className="nav-item">📅 Schedule</a>
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
            <a href="#updates" className="nav-item active">📢 Updates</a>
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
          <h1 className="page-title">Updates & Announcements</h1>
          <div className="top-bar-actions">
            <button className="btn btn-secondary">🔔 Notification Settings</button>
            <button className="btn btn-primary">📧 Subscribe to Newsletter</button>
          </div>
        </div>

        <div className="content-area">
          {/* Header */}
          <div className="updates-header">
            <h2>Stay Informed</h2>
            <p className="updates-subtitle">
              Important news, updates, and announcements from the Malaika House team
            </p>
            <div className="notification-status">
              <div className="status-dot"></div>
              <span>Notifications Active</span>
            </div>
          </div>

          {/* Filters */}
          <div className="filters-bar">
            <div className="filter-group">
              <label className="filter-label">Category:</label>
              <select className="filter-select">
                <option>All Categories</option>
                <option>Urgent</option>
                <option>Important</option>
                <option>General</option>
                <option>Events</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Time Period:</label>
              <select className="filter-select">
                <option>All Time</option>
                <option>This Week</option>
                <option>This Month</option>
                <option>Last 3 Months</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Status:</label>
              <select className="filter-select">
                <option>All Updates</option>
                <option>Unread Only</option>
                <option>Read Only</option>
              </select>
            </div>
          </div>

          {/* Updates List */}
          <div className="updates-list">
            <div className="update-card important">
              <div className="unread-indicator"></div>
              <div className="update-header">
                <div className="update-category category-important">Important</div>
                <div className="update-date">November 25, 2025</div>
              </div>
              <h3 className="update-title">New Safety Protocols Implementation</h3>
              <div className="update-content">
                <p>We are implementing enhanced safety protocols effective December 1, 2025...</p>
                <p>Please ensure your emergency contact information is current.</p>
              </div>
              <div className="attachment-list">
                <a href="#" className="attachment-item">📄 Safety Protocol Guide.pdf</a>
                <a href="#" className="attachment-item">📋 Emergency Contact Form.pdf</a>
              </div>
              <div className="update-footer">
                <div className="update-author">
                  <div className="author-avatar">AT</div>
                  <span>Admin Team</span>
                </div>
                <div className="update-actions">
                  <button className="action-btn btn-read">Mark as Read</button>
                  <button className="action-btn btn-share">Share</button>
                </div>
              </div>
            </div>

            {/* Add other update cards the same way, hardcoded */}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button className="page-btn" disabled>←</button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <button className="page-btn">→</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UpdatesPage;
