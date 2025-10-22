import React from "react";
import "./materials.css";

const MaterialsPage = () => {
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
            <a href="#overview" className="nav-item">
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
            <a href="#materials" className="nav-item active">
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
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <button className="mobile-menu-btn" id="mobileMenuBtn">
              ☰
            </button>
            <h1 className="page-title">Materials & Resources</h1>
          </div>
          <div className="top-bar-actions">
            <button className="contact-btn">📞 Contact Malaika</button>
          </div>
        </div>

        <div className="content-area">
          {/* Materials Header */}
          <div className="materials-header">
            <div className="materials-content">
              <h2 className="materials-title">📚 Materials & Resources</h2>
              <p className="materials-subtitle">
                Access training materials, guidelines, and resources for your
                external clubs
              </p>
              <div className="materials-actions">
                <button className="btn btn-white">📤 Upload Material</button>
                <button className="btn btn-white">📊 Usage Reports</button>
              </div>
            </div>
          </div>

          {/* Search Section */}
          <div className="search-section">
            <div className="search-grid">
              <input
                type="text"
                className="search-input"
                placeholder="Search materials, documents, guides..."
              />
              <button className="btn btn-primary">🔍 Search</button>
            </div>
          </div>

          {/* Categories Navigation */}
          <div className="categories-nav">
            <button className="category-btn active">All Materials</button>
            <button className="category-btn">Training Guides</button>
            <button className="category-btn">Activity Templates</button>
            <button className="category-btn">Forms & Documents</button>
            <button className="category-btn">Video Resources</button>
            <button className="category-btn">Partnership Tools</button>
          </div>

          {/* Quick Links Section */}
          <div className="quick-links">
            <h3 className="quick-links-title">Quick Access Resources</h3>
            <div className="links-grid">
              <a href="#" className="quick-link">
                <div className="link-icon">📋</div>
                <div className="link-content">
                  <div className="link-title">Partnership Guidelines</div>
                  <div className="link-desc">
                    Complete partnership handbook and policies
                  </div>
                </div>
              </a>

              <a href="#" className="quick-link">
                <div className="link-icon">🎯</div>
                <div className="link-content">
                  <div className="link-title">Activity Planning Templates</div>
                  <div className="link-desc">
                    Ready-to-use session planning tools
                  </div>
                </div>
              </a>

              <a href="#" className="quick-link">
                <div className="link-icon">📊</div>
                <div className="link-content">
                  <div className="link-title">Assessment Forms</div>
                  <div className="link-desc">
                    Participant evaluation and progress forms
                  </div>
                </div>
              </a>

              <a href="#" className="quick-link">
                <div className="link-icon">🔧</div>
                <div className="link-content">
                  <div className="link-title">Emergency Procedures</div>
                  <div className="link-desc">
                    Safety protocols and contact information
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Materials Grid */}
          <div className="materials-grid">
            {[
              {
                type: "PDF",
                icon: "📄",
                title: "External Partner Training Manual",
                desc: "Comprehensive guide covering partnership protocols, safety procedures, and best practices for external club management.",
                club: "All Clubs",
                date: "Updated: Sept 15, 2025",
              },
              {
                type: "VIDEO",
                icon: "🎥",
                title: "Kids Club Activity Ideas",
                desc: "Video collection of engaging activities and games suitable for children aged 6-10 in external club settings.",
                club: "Kids Club",
                date: "Added: Sept 10, 2025",
              },
              {
                type: "DOC",
                icon: "📝",
                title: "Session Planning Template",
                desc: "Structured template for planning and documenting external club sessions, including objectives and evaluation criteria.",
                club: "All Clubs",
                date: "Updated: Sept 5, 2025",
              },
              {
                type: "PDF",
                icon: "📋",
                title: "Teen Engagement Strategies",
                desc: "Specialized guidance for working with teenagers, including communication techniques and age-appropriate activities.",
                club: "Teen Club",
                date: "Added: Aug 28, 2025",
              },
              {
                type: "FORM",
                icon: "📊",
                title: "Incident Report Form",
                desc: "Official form for documenting any incidents or concerns during external club sessions, with clear reporting procedures.",
                club: "All Clubs",
                date: "Updated: Sept 1, 2025",
              },
              {
                type: "PDF",
                icon: "🧩",
                title: "Adult Club Facilitation Guide",
                desc: "Comprehensive resource for facilitating adult support groups and activities, including discussion topics and group dynamics.",
                club: "Adult Club",
                date: "Added: Aug 20, 2025",
              },
            ].map((m, i) => (
              <div key={i} className="material-card">
                <div className="material-preview">
                  <div className="material-type">{m.type}</div>
                  {m.icon}
                </div>
                <div className="material-content">
                  <h3 className="material-title">{m.title}</h3>
                  <p className="material-description">{m.desc}</p>
                  <div className="material-meta">
                    <span className="material-club">{m.club}</span>
                    <span className="material-date">{m.date}</span>
                  </div>
                  <div className="material-actions">
                    <button className="action-btn btn-download">
                      📥 Download
                    </button>
                    <button className="action-btn btn-share">📤 Share</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Uploads */}
          <div className="recent-uploads">
            <h2 className="section-title">Recently Added Materials</h2>

            <div className="uploads-list">
              <div className="upload-item">
                <div className="upload-icon">📄</div>
                <div className="upload-info">
                  <div className="upload-title">Updated Safety Protocols</div>
                  <div className="upload-details">
                    Revised emergency procedures and contact information
                  </div>
                </div>
                <div className="upload-meta">
                  <div>2 days ago</div>
                  <div>by Malaika Admin</div>
                </div>
              </div>

              <div className="upload-item">
                <div className="upload-icon">🎥</div>
                <div className="upload-info">
                  <div className="upload-title">New Activity Demo Videos</div>
                  <div className="upload-details">
                    Three new demonstration videos for sensory activities
                  </div>
                </div>
                <div className="upload-meta">
                  <div>5 days ago</div>
                  <div>by Training Team</div>
                </div>
              </div>

              <div className="upload-item">
                <div className="upload-icon">📋</div>
                <div className="upload-info">
                  <div className="upload-title">Quarterly Assessment Form</div>
                  <div className="upload-details">
                    New participant progress evaluation template
                  </div>
                </div>
                <div className="upload-meta">
                  <div>1 week ago</div>
                  <div>by Program Coordinator</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MaterialsPage;
