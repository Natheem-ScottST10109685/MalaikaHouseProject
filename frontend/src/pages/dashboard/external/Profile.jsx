import React from "react";
import "./profile.css";

const ProfilePage = () => {
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
            <a href="#updates" className="nav-item">📢 Updates</a>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Account</div>
            <a href="#profile" className="nav-item active">👤 Profile</a>
            <a href="#settings" className="nav-item">⚙️ Settings</a>
          </div>
        </nav>
      </aside>

      
      <div className="sidebar-overlay" id="sidebarOverlay"></div>

   
      <main className="main-content">
        <div className="top-bar">
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <button className="mobile-menu-btn" id="mobileMenuBtn">☰</button>
            <h1 className="page-title">Profile</h1>
          </div>
          <div className="top-bar-actions">
            <button className="contact-btn">📞 Contact Malaika</button>
          </div>
        </div>

        <div className="content-area">
          <div className="profile-grid">
           
            <div className="profile-card">
              <div className="profile-avatar">
                MJ
                <div className="avatar-edit">✏️</div>
              </div>
              <h2 className="profile-name">Marcus Johnson</h2>
              <p className="profile-role">External Partner</p>

              <div className="profile-stats">
                <div className="stat-item">
                  <div className="stat-number">3</div>
                  <div className="stat-label">Active Clubs</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">47</div>
                  <div className="stat-label">Participants</div>
                </div>
              </div>

              <div className="profile-actions">
                <button className="btn btn-primary">📤 Export Profile</button>
                <button className="btn btn-secondary">🔐 Change Password</button>
              </div>
            </div>

            <div className="profile-sections">
              
              <div className="profile-section">
                <div className="section-header">
                  <h3 className="section-title">👤 Personal Information</h3>
                  <button className="edit-btn">✏️ Edit</button>
                </div>
                <div className="info-grid">
                  {[
                    { label: "Full Name", value: "Marcus James Johnson" },
                    { label: "Email Address", value: "marcus.johnson@squarepeg.org.au" },
                    { label: "Phone Number", value: "+61 400 123 456" },
                    { label: "Emergency Contact", value: "Sarah Johnson - +61 400 654 321" },
                    { label: "Preferred Contact Method", value: "Email" },
                    { label: "Languages Spoken", value: "English, Spanish (Conversational)" },
                  ].map((info, i) => (
                    <div key={i} className="info-group">
                      <label className="info-label">{info.label}</label>
                      <div className="info-value editable">{info.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="profile-section">
                <div className="section-header">
                  <h3 className="section-title">🏢 Organization Details</h3>
                  <button className="edit-btn">✏️ Edit</button>
                </div>
                <div className="info-grid">
                  {[
                    { label: "Organization Name", value: "Square Peg Foundation" },
                    { label: "ABN", value: "12 345 678 901" },
                    { label: "Position/Title", value: "Program Director" },
                    { label: "Organization Address", value: "123 Community Street, Melbourne VIC 3000" },
                    { label: "Partnership Start Date", value: "March 15, 2024" },
                    { label: "Partnership Agreement", value: "Standard External Partner - Renewed Annually" },
                  ].map((info, i) => (
                    <div key={i} className="info-group">
                      <label className="info-label">{info.label}</label>
                      <div className="info-value editable">{info.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="profile-section">
                <div className="section-header">
                  <h3 className="section-title">🎓 Qualifications & Certifications</h3>
                  <button className="edit-btn">+ Add Certification</button>
                </div>
                <div className="cert-grid">
                  {[
                    { icon: "📜", name: "Diploma in Community Services", details: "TAFE NSW - Completed 2019", status: "Current" },
                    { icon: "🛡️", name: "Working with Children Check", details: "Victoria - Expires March 2027", status: "Current" },
                    { icon: "🩺", name: "First Aid & CPR Certification", details: "Red Cross - Expires December 2025", status: "Expiring Soon" },
                    { icon: "🧠", name: "Mental Health First Aid", details: "Mental Health First Aid Australia - Completed August 2025", status: "Current" },
                    { icon: "🔒", name: "Malaika House Safeguarding Training", details: "Completed September 2025 - Annual Renewal Required", status: "Current" },
                  ].map((cert, i) => (
                    <div key={i} className="cert-item">
                      <div className="cert-icon">{cert.icon}</div>
                      <div className="cert-info">
                        <div className="cert-name">{cert.name}</div>
                        <div className="cert-details">{cert.details}</div>
                      </div>
                      <div className={`cert-status status-${cert.status.toLowerCase().replace(/\s/g, '-')}`}>
                        {cert.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

          
              <div className="profile-section">
                <div className="section-header">
                  <h3 className="section-title">📊 Recent Activity</h3>
                  <button className="edit-btn">View All</button>
                </div>
                <div className="activity-timeline">
                  {[
                    { icon: "📝", title: "Monthly Report Submitted", description: "September club activity report submitted successfully", time: "2 days ago" },
                    { icon: "🎓", title: "Training Completed", description: "Completed Digital Safeguarding training module", time: "1 week ago" },
                    { icon: "👥", title: "Session Conducted", description: "Teen Square Pegs life skills workshop - 15 participants", time: "1 week ago" },
                    { icon: "📞", title: "Support Request Resolved", description: "Dashboard login issue resolved by technical support", time: "2 weeks ago" },
                    { icon: "📅", title: "Partnership Review Meeting", description: "Quarterly partnership review completed with positive feedback", time: "3 weeks ago" },
                  ].map((activity, i) => (
                    <div key={i} className="activity-item">
                      <div className="activity-icon">{activity.icon}</div>
                      <div className="activity-content">
                        <div className="activity-title">{activity.title}</div>
                        <div className="activity-description">{activity.description}</div>
                        <div className="activity-time">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
