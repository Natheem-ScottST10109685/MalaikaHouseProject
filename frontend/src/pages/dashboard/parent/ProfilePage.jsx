import React from "react";
import "../styles/profile.css";

const ProfilePage = () => {
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
            <a href="#dashboard" className="nav-item">
              📊 Dashboard
            </a>
            <a href="#child-progress" className="nav-item">
              📈 Child Progress
            </a>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Sessions</div>
            <a href="#schedule" className="nav-item">
              📅 Schedule
            </a>
            <a href="#book-session" className="nav-item">
              ➕ Book Session
            </a>
            <a href="#session-history" className="nav-item">
              📋 Session History
            </a>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Subscription</div>
            <a href="#subscription" className="nav-item">
              💳 Subscription Management
            </a>
            <a href="#payments" className="nav-item">
              💰 Payment History
            </a>
            <a href="#auto-renewal" className="nav-item">
              🔄 Auto-Renewal
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
            <a href="#feedback" className="nav-item">
              📝 Feedback
            </a>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Account</div>
            <a href="#profile" className="nav-item active">
              👤 Profile
            </a>
            <a href="#settings" className="nav-item">
              ⚙️ Settings
            </a>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="top-bar">
          <h1 className="page-title">Profile & Account</h1>
          <div className="top-bar-actions">
            <button className="btn btn-secondary">📥 Export Data</button>
            <button className="btn btn-primary">💾 Save Changes</button>
          </div>
        </div>

        <div className="content-area">
          {/* Profile Header */}
          <div className="profile-header">
            <div className="profile-avatar">
              SM
              <div className="avatar-edit">📷</div>
            </div>
            <div className="profile-info">
              <h2>Sarah Mitchell</h2>
              <p className="profile-subtitle">
                Parent Account • Member since March 2025
              </p>
              <div className="membership-badge">Heart Program Family</div>
            </div>
          </div>

          {/* Profile Sections */}
          <div className="profile-sections">
            {/* Personal Information */}
            <div className="profile-card">
              <h3 className="section-title">
                <div className="section-icon">👤</div>
                Personal Information
              </h3>

              <form className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-input" value="Sarah" readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-input" value="Mitchell" readOnly />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-input"
                    value="sarah.mitchell@email.com"
                    readOnly
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input type="tel" className="form-input" value="+27 21 555 0123" readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Alternative Phone</label>
                    <input type="tel" className="form-input" value="+27 82 555 0456" readOnly />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Home Address</label>
                  <input
                    type="text"
                    className="form-input"
                    value="12 Oak Avenue, Newlands, Cape Town, 7700"
                    readOnly
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">City</label>
                    <input type="text" className="form-input" value="Cape Town" readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Postal Code</label>
                    <input type="text" className="form-input" value="7700" readOnly />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  Update Information
                </button>
              </form>
            </div>

            {/* Account Details */}
            <div className="profile-card">
              <h3 className="section-title">
                <div className="section-icon">🔐</div>
                Account Details
              </h3>

              <div className="info-item">
                <span className="info-label">Account ID:</span>
                <span className="info-value">MH-PAR-2025-0123</span>
              </div>

              <div className="info-item">
                <span className="info-label">Member Since:</span>
                <span className="info-value">March 15, 2025</span>
              </div>

              <div className="info-item">
                <span className="info-label">Account Type:</span>
                <span className="info-value">Internal Parent</span>
              </div>

              <div className="info-item">
                <span className="info-label">Subscription Status:</span>
                <span className="info-value active-status">Active</span>
              </div>

              <div className="info-item">
                <span className="info-label">Next Billing:</span>
                <span className="info-value">December 1, 2025</span>
              </div>

              <div className="info-item">
                <span className="info-label">Password:</span>
                <button className="edit-btn">Change Password</button>
              </div>

              <div className="info-item">
                <span className="info-label">Two-Factor Auth:</span>
                <button className="edit-btn">Enable 2FA</button>
              </div>
            </div>
          </div>

          {/* Child Profile */}
          <div className="child-profile">
            <h3 className="section-title">
              <div className="section-icon">👶</div>
              Child Information
            </h3>

            <div className="child-header">
              <div className="child-avatar">E</div>
              <div className="child-details">
                <h3>Emma Mitchell</h3>
                <div className="child-program-badge">Heart Program Member</div>
              </div>
            </div>

            <div className="child-info-grid">
              <div className="info-item">
                <span className="info-label">Age:</span>
                <span className="info-value">8 years old</span>
              </div>
              <div className="info-item">
                <span className="info-label">Date of Birth:</span>
                <span className="info-value">March 12, 2017</span>
              </div>
              <div className="info-item">
                <span className="info-label">Program Start:</span>
                <span className="info-value">March 20, 2025</span>
              </div>
              <div className="info-item">
                <span className="info-label">Primary Therapist:</span>
                <span className="info-value">Ms. Johnson</span>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="privacy-settings">
            <h3 className="section-title">
              <div className="section-icon">🔒</div>
              Privacy & Communication Settings
            </h3>

            {["Email Notifications", "SMS Notifications", "Share Progress with School", "Research Participation", "Marketing Communications"].map((label, index) => (
              <div key={index} className="toggle-setting">
                <div className="setting-info">
                  <h4>{label}</h4>
                  <p className="setting-description">
                    Manage communication preferences related to {label.toLowerCase()}.
                  </p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked={index !== 2 && index !== 4} />
                  <span className="slider"></span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
