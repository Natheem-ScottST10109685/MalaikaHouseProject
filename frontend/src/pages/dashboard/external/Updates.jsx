import React from "react";
import "./updates.css";

const updatesData = [
  {
    date: "September 26, 2025",
    category: "Training",
    categoryClass: "category-training",
    title: "New Mandatory Training Module: Digital Safeguarding",
    summary:
      "A comprehensive new training module on digital safeguarding and online safety is now available for all external partners.",
    content: (
      <>
        <p>
          We're introducing a new mandatory training module focusing on digital safeguarding practices, particularly important as more programs incorporate online elements.
        </p>
        <h3>What's Covered:</h3>
        <ul>
          <li>Online safety protocols for virtual sessions</li>
          <li>Digital privacy protection for participants</li>
          <li>Recognizing and responding to online risks</li>
          <li>Secure communication practices</li>
        </ul>
        <p>
          All external partners must complete this module by October 31, 2025. The training is available through your dashboard and takes approximately 2 hours to complete.
        </p>
      </>
    ),
    tags: ["Mandatory", "Digital Safety", "Deadline: Oct 31"],
    buttons: [
      { label: "Start Training", type: "primary" },
      { label: "Learn More", type: "secondary" },
    ],
  },
  {
    date: "September 23, 2025",
    category: "Policy",
    categoryClass: "category-policy",
    title: "Updated Partnership Agreement Terms",
    summary:
      "Important updates to partnership agreements include new insurance requirements and revised reporting procedures.",
    content: (
      <>
        <p>
          We've updated our partnership agreements to better reflect current best practices and regulatory requirements.
        </p>
        <h3>Key Changes:</h3>
        <ul>
          <li>Increased minimum insurance coverage to $15 million</li>
          <li>Monthly reporting requirements now include participant satisfaction surveys</li>
          <li>New background check renewal timeline (every 2 years)</li>
          <li>Enhanced incident reporting procedures</li>
        </ul>
        <p>
          Existing partners have until January 1, 2026, to comply with new requirements. Our partnership team will contact you individually to discuss implementation.
        </p>
      </>
    ),
    tags: ["Important", "Legal", "Action Required"],
    buttons: [
      { label: "View Changes", type: "primary" },
      { label: "Schedule Meeting", type: "secondary" },
    ],
  },

];

const UpdatesPage = () => {
  return (
    <div className="dashboard-container">
      
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
            <a href="#updates" className="nav-item active">📢 Updates</a>
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
            <h1 className="page-title">Updates & Announcements</h1>
          </div>
          <div className="top-bar-actions">
            <button className="contact-btn">📞 Contact Malaika</button>
          </div>
        </div>

        <div className="content-area">
         
          <div className="updates-header">
            <div className="updates-content">
              <div className="updates-icon">📢</div>
              <h2 className="updates-title">Updates & Announcements</h2>
              <p className="updates-subtitle">
                Stay informed with the latest news, policy changes, training opportunities, and important announcements from Malaika House
              </p>
            </div>
          </div>

         
          <div className="notification-prefs">
            <h3 className="prefs-title">🔔 Notification Preferences</h3>
            <div className="prefs-grid">
              {["Email Notifications", "Policy Updates", "Training Announcements", "System Maintenance"].map((pref, i) => (
                <div key={i} className="pref-item">
                  <span className="pref-label">{pref}</span>
                  <div className={`toggle-switch ${i < 3 ? "active" : ""}`}></div>
                </div>
              ))}
            </div>
          </div>

       
          <div className="controls-section">
            <div className="controls-grid">
              <div className="search-group">
                <label className="search-label">Search Updates</label>
                <input type="text" className="search-input" placeholder="Search announcements, policies, training..." />
              </div>
              <div className="filter-tabs">
                {["All", "Policy", "Training", "System", "Urgent"].map((tab, i) => (
                  <button key={i} className={`filter-tab ${i === 0 ? "active" : ""}`}>{tab}</button>
                ))}
              </div>
              <select className="sort-dropdown">
                {["Newest First", "Oldest First", "Most Important", "Category"].map((option, i) => (
                  <option key={i}>{option}</option>
                ))}
              </select>
            </div>
          </div>

     
          <div className="updates-timeline">
            <div className="timeline-line"></div>
            {updatesData.map((update, i) => (
              <div key={i} className="update-item">
                <div className="update-header">
                  <div className="update-meta">
                    <div className="update-date">{update.date}</div>
                    <div className={`update-category ${update.categoryClass}`}>{update.category}</div>
                  </div>
                  <h3 className="update-title">{update.title}</h3>
                  <p className="update-summary">{update.summary}</p>
                </div>
                <div className="update-content">{update.content}</div>
                <div className="update-actions">
                  <div className="update-tags">
                    {update.tags.map((tag, j) => <span key={j} className="update-tag">{tag}</span>)}
                  </div>
                  <div className="update-buttons">
                    {update.buttons.map((btn, j) => (
                      <button key={j} className={`btn btn-${btn.type}`}>{btn.label}</button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="archive-section">
            <button className="archive-btn">📁 View Archived Updates</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UpdatesPage;
