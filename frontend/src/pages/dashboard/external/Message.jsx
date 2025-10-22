import React from "react";
import "./messages.css";

const MessagesPage = () => {
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
            <a href="#messages" className="nav-item active">💬 Messages</a>
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
            <h1 className="page-title">Messages</h1>
          </div>
          <div className="top-bar-actions">
            <button className="contact-btn">📞 Contact Malaika</button>
          </div>
        </div>

        <div className="content-area">
          <div className="messages-container">
           
            <div className="message-sidebar">
              <div className="message-sidebar-header">
                <h2 className="sidebar-title">Communications</h2>
                <div className="message-search">
                  <input type="text" className="search-input" placeholder="Search messages..." />
                  <button className="compose-btn">✏️ New</button>
                </div>
              </div>

              <div className="message-filters">
                <button className="filter-btn active">All</button>
                <button className="filter-btn">Unread</button>
                <button className="filter-btn">Important</button>
                <button className="filter-btn">Training</button>
              </div>

              <div className="message-list">
     
                <div className="message-item active">
                  <div className="message-header">
                    <div className="message-sender">Sarah Mitchell</div>
                    <div className="message-time">2 hours ago</div>
                  </div>
                  <div className="message-subject">Training Session Update - October Schedule</div>
                  <div className="message-preview">
                    We're pleased to confirm the updated training schedule for October...
                  </div>
                  <div className="message-badges">
                    <span className="badge badge-training">Training</span>
                  </div>
                </div>

                <div className="message-item unread">
                  <div className="message-header">
                    <div className="message-sender">Malaika Admin</div>
                    <div className="message-time">5 hours ago</div>
                  </div>
                  <div className="message-subject">Monthly Report Submission Reminder</div>
                  <div className="message-preview">
                    Reminder: your monthly club activity report for September is due...
                  </div>
                  <div className="message-badges">
                    <span className="badge badge-system">System</span>
                  </div>
                </div>

              </div>
            </div>

            <div className="message-main">
              <div className="message-main-header">
                <h3 className="main-message-subject">Training Session Update - October Schedule</h3>
                <div className="main-message-meta">
                  <div className="message-from">
                    <div className="sender-avatar">SM</div>
                    <div className="sender-details">
                      <div className="sender-name">Sarah Mitchell</div>
                      <div className="sender-role">Training Coordinator</div>
                    </div>
                  </div>
                  <div className="message-actions">
                    <button className="action-btn primary">Reply</button>
                    <button className="action-btn">Forward</button>
                    <button className="action-btn">Archive</button>
                  </div>
                </div>
              </div>

              <div className="message-content">
                <p>Dear Marcus,</p>
                <p>I hope this message finds you well. I'm writing to provide you with the updated training schedule for October...</p>

                <h3>October Training Schedule</h3>
                <ul>
                  <li><strong>Safeguarding Refresher Training</strong> - October 12th, 2:00 PM - 4:00 PM (Online)</li>
                  <li><strong>New Assessment Protocols</strong> - October 19th, 10:00 AM - 12:00 PM (In-person/Online hybrid)</li>
                  <li><strong>Emergency Response Procedures</strong> - October 26th, 1:00 PM - 3:00 PM (Online)</li>
                </ul>

                <h3>Action Required</h3>
                <p>Please confirm your availability for the mandatory training sessions by <strong>October 8th</strong>...</p>

                <div className="message-attachments">
                  <div className="attachments-title">Attachments</div>
                  <div className="attachment-list">
                    <div className="attachment-item">
                      <div className="attachment-icon">📅</div>
                      <div className="attachment-info">
                        <div className="attachment-name">October_Training_Calendar.pdf</div>
                        <div className="attachment-size">245 KB</div>
                      </div>
                    </div>
                    <div className="attachment-item">
                      <div className="attachment-icon">📋</div>
                      <div className="attachment-info">
                        <div className="attachment-name">Training_Confirmation_Form.docx</div>
                        <div className="attachment-size">58 KB</div>
                      </div>
                    </div>
                    <div className="attachment-item">
                      <div className="attachment-icon">🔗</div>
                      <div className="attachment-info">
                        <div className="attachment-name">Online_Session_Access_Links.txt</div>
                        <div className="attachment-size">2 KB</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> 
          </div> 
        </div>
      </main>
    </div>
  );
};

export default MessagesPage;
