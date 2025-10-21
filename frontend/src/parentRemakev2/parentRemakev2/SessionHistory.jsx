import React, { useState } from "react";
import "../styles/session-history.css";

const SessionHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <a href="/" className="logo">
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
            <a href="#session-history" className="nav-item active">📋 Session History</a>
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
          <h1 className="page-title">Session History</h1>
          <div className="top-bar-actions">
            <button className="btn btn-secondary">📊 Generate Report</button>
            <button className="btn btn-primary">📥 Export History</button>
          </div>
        </div>

        <div className="content-area">
          <div className="history-header">
            <div className="header-info">
              <h2>Emma's Session History</h2>
              <p className="header-subtitle">
                Complete record of all sessions, reports, and progress notes since enrollment
              </p>
            </div>
            <div className="stat-box">
              <div className="stat-number">24</div>
              <div className="stat-label">Total Sessions</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">95%</div>
              <div className="stat-label">Attendance Rate</div>
            </div>
          </div>

          <div className="filters-bar">
            <div className="filter-group">
              <label className="filter-label">Time Period:</label>
              <select className="filter-select">
                <option>All Time</option>
                <option>Current Term</option>
                <option>Last 3 Months</option>
                <option>Last 6 Months</option>
                <option>This Year</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Session Type:</label>
              <select className="filter-select">
                <option>All Types</option>
                <option>Heart Program</option>
                <option>Social Skills</option>
                <option>Creative Arts</option>
                <option>Assessments</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Status:</label>
              <select className="filter-select">
                <option>All Statuses</option>
                <option>Completed</option>
                <option>Cancelled</option>
                <option>Rescheduled</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Facilitator:</label>
              <select className="filter-select">
                <option>All Facilitators</option>
                <option>Ms. Johnson</option>
                <option>Dr. Smith</option>
                <option>Dr. Williams</option>
              </select>
            </div>
          </div>

          {/* --- PAGINATED SESSION LIST --- */}
          <div className="session-list">
            {currentPage === 1 && (
              <>
                {/* First page: your session cards (kept static) */}
                {/* You can paste your existing 4 session cards here (unchanged HTML) */}
              </>
            )}

            {currentPage !== 1 && (
              <div className="placeholder-page">
                <p>📄 Page {currentPage} - Placeholder session content...</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              className="page-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ←
            </button>

            {[1, 2, 3, 4].map((page) => (
              <button
                key={page}
                className={`page-btn ${page === currentPage ? "active" : ""}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}

            <button
              className="page-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SessionHistory;
