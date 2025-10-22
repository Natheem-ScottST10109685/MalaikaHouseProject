import React from "react";
import "./guidelines.css";

const PartnershipGuidelines = () => {
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
            <a href="#guidelines" className="nav-item active">📋 Partnership Guidelines</a>
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
            <h1 className="page-title">Partnership Guidelines</h1>
          </div>
          <div className="top-bar-actions">
            <button className="contact-btn">📞 Contact Malaika</button>
          </div>
        </div>

        <div className="content-area">
        
          <div className="guidelines-header">
            <div className="guidelines-content">
              <div className="guidelines-icon">📋</div>
              <h2 className="guidelines-title">External Partnership Guidelines</h2>
              <p className="guidelines-subtitle">
                Comprehensive guide for external partners working with Malaika House to ensure safe, effective, and compliant club operations
              </p>
              <div className="last-updated">Last updated: September 2025 | Version 3.2</div>
            </div>
          </div>

          
          <div className="toc-section">
            <h3 className="toc-title">Quick Navigation</h3>
            <div className="toc-grid">
              <a href="#partnership-overview" className="toc-item">
                <div className="toc-item-title">🤝 Partnership Overview</div>
                <div className="toc-item-desc">Understanding our collaboration model and expectations</div>
              </a>
              <a href="#safeguarding" className="toc-item">
                <div className="toc-item-title">🛡️ Safeguarding Policies</div>
                <div className="toc-item-desc">Child protection and safety requirements</div>
              </a>
              <a href="#operational" className="toc-item">
                <div className="toc-item-title">⚙️ Operational Standards</div>
                <div className="toc-item-desc">Session planning and delivery guidelines</div>
              </a>
              <a href="#communication" className="toc-item">
                <div className="toc-item-title">💬 Communication Protocols</div>
                <div className="toc-item-desc">How to engage with participants and families</div>
              </a>
              <a href="#data-privacy" className="toc-item">
                <div className="toc-item-title">🔒 Data & Privacy</div>
                <div className="toc-item-desc">Information handling and confidentiality</div>
              </a>
              <a href="#emergency" className="toc-item">
                <div className="toc-item-title">🚨 Emergency Procedures</div>
                <div className="toc-item-desc">Crisis management and incident reporting</div>
              </a>
            </div>
          </div>

        
        </div>
      </main>
    </div>
  );
};

export default PartnershipGuidelines;
