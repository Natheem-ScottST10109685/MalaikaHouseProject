import React from "react";
import "./feedback.css";

const FeedbackPage = () => {
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
            <a href="#updates" className="nav-item">📢 Updates</a>
            <a href="#feedback" className="nav-item active">📝 Feedback</a>
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
          <h1 className="page-title">Feedback & Reviews</h1>
        </div>

        <div className="content-area">
          {/* Feedback Header */}
          <div className="feedback-header">
            <h2>Share Your Experience</h2>
            <p className="feedback-subtitle">
              Your feedback helps us improve our services and support Emma’s development journey
            </p>
            <div className="satisfaction-score">
              <div className="score-number">4.8</div>
              <div>
                <div className="score-label">Overall Satisfaction</div>
                <div style={{ color: "#ffd700" }}>★★★★★</div>
              </div>
            </div>
          </div>

          {/* Feedback Sections */}
          <div className="feedback-sections">
            <div className="feedback-card">
              <h3 className="section-title">
                <div className="section-icon">⭐</div>
                Rate Our Services
              </h3>

              {["Overall Service Quality", "Staff Professionalism", "Communication Quality", "Emma's Progress"].map(
                (label, index) => (
                  <div className="rating-group" key={index}>
                    <label className="rating-label">{label}</label>
                    <div className="star-rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="star">★</span>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Feedback Form */}
            <div className="feedback-card">
              <h3 className="section-title">
                <div className="section-icon">💭</div>
                Detailed Feedback
              </h3>

              <form className="feedback-form">
                <div className="form-group">
                  <label className="form-label">Feedback Category</label>
                  <select className="form-input form-select">
                    <option value="">Select category...</option>
                    <option value="general">General Feedback</option>
                    <option value="session">Session Quality</option>
                    <option value="staff">Staff Performance</option>
                    <option value="facilities">Facilities & Environment</option>
                    <option value="communication">Communication</option>
                    <option value="billing">Billing & Payments</option>
                    <option value="suggestion">Suggestion</option>
                    <option value="complaint">Complaint</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Your Feedback</label>
                  <textarea
                    className="form-input form-textarea"
                    placeholder="Please share your thoughts, suggestions, or concerns..."
                  ></textarea>
                </div>

                <div className="form-group">
                  <label className="form-label">What’s working well?</label>
                  <div className="checkbox-group">
                    {[
                      "Emma's progress is clearly visible",
                      "Staff shows genuine care",
                      "Regular communication",
                      "Flexible scheduling",
                      "Safe, welcoming environment",
                    ].map((text, idx) => (
                      <div className="checkbox-item" key={idx}>
                        <input type="checkbox" id={`check-${idx}`} />
                        <label htmlFor={`check-${idx}`} className="checkbox-label">{text}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Would you recommend Malaika House?</label>
                  <select className="form-input form-select">
                    <option value="">Select...</option>
                    <option value="definitely">Definitely</option>
                    <option value="probably">Probably</option>
                    <option value="maybe">Maybe</option>
                    <option value="probably-not">Probably not</option>
                    <option value="definitely-not">Definitely not</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary">Submit Feedback</button>
              </form>
            </div>
          </div>

          {/* Previous Feedback */}
          <div className="previous-feedback">
            <h3 className="section-title">
              <div className="section-icon">📋</div>
              Your Previous Feedback
            </h3>

            {[{
              date: "October 15, 2025",
              stars: "★★★★★",
              category: "Session Quality",
              content:
                "Emma has shown remarkable progress in her social skills. Ms. Johnson's approach is very effective, and Emma looks forward to each session. The art therapy activities are particularly engaging.",
              responseFrom: "Ms. Johnson",
              response:
                "Thank you so much for your positive feedback, Sarah! It's wonderful to hear that Emma is enjoying the art therapy activities.",
            },
            {
              date: "September 22, 2025",
              stars: "★★★★☆",
              category: "Communication",
              content:
                "Could we have more frequent updates about Emma's daily activities?",
              responseFrom: "Admin Team",
              response:
                "We appreciate this suggestion! We've implemented weekly progress summaries and will be sending them every Friday.",
            },
            {
              date: "November 20, 2025",
              stars: "★★★★★",
              category: "Suggestion",
              content:
                "Would it be possible to have a parent workshop on supporting Emma's development at home?",
              status: "Under Review",
            }].map((item, idx) => (
              <div className="feedback-item" key={idx}>
                <div className="feedback-header-item">
                  <div className="feedback-date">{item.date}</div>
                  <div className={`feedback-status ${item.status ? "status-pending" : "status-responded"}`}>
                    {item.status || "Responded"}
                  </div>
                </div>
                <div className="feedback-rating">
                  <span style={{ color: "#ffd700" }}>{item.stars}</span>
                  <span className="ml-2 text-accent-purple">{item.category}</span>
                </div>
                <div className="feedback-content">{`"${item.content}"`}</div>
                {item.response && (
                  <div className="feedback-response">
                    <div className="response-header">
                      Response from {item.responseFrom}:
                    </div>
                    <div className="response-content">{`"${item.response}"`}</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <h3 className="section-title">
              <div className="section-icon">🚀</div>
              Quick Actions
            </h3>

            <div className="action-buttons">
              {[
                { icon: "📞", title: "Request Callback", desc: "Speak directly with Emma's lead therapist" },
                { icon: "📅", title: "Schedule Meeting", desc: "Book a progress review meeting" },
                { icon: "📚", title: "Parent Resources", desc: "Access home activity guides" },
                { icon: "💌", title: "Anonymous Feedback", desc: "Submit confidential feedback" },
              ].map((action, idx) => (
                <button className="action-card" key={idx}>
                  <span className="action-icon">{action.icon}</span>
                  <div className="action-title">{action.title}</div>
                  <div className="action-desc">{action.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FeedbackPage;
