import React from "react";
import "./support.css";

const SupportPage = () => {
  const emergencyContacts = [
    { label: "Emergency Services", info: "10" },
    { label: "Malaika Emergency Line", info: "067 088 9087" },
    { label: "After Hours Supervisor", info: "082 908 0009" },
  ];

  const supportCategories = [
    {
      icon: "📚",
      title: "Training & Development",
      description:
        "Access training materials, professional development opportunities, and skill-building resources for external partners.",
      options: [
        { icon: "🎓", title: "Online Training Modules", desc: "Self-paced learning modules and certifications" },
        { icon: "👥", title: "Group Training Sessions", desc: "Scheduled workshops and skill-building sessions" },
        { icon: "📖", title: "Resource Library", desc: "Comprehensive guides and reference materials" },
      ],
    },
    {
      icon: "💻",
      title: "Technical Support",
      description:
        "Get help with dashboard issues, system access problems, and technical difficulties with external partner tools.",
      options: [
        { icon: "🖥️", title: "Dashboard Issues", desc: "Login problems, navigation, and feature support" },
        { icon: "📱", title: "Mobile Access", desc: "Mobile app support and responsive design help" },
        { icon: "🔐", title: "Account & Security", desc: "Password resets and account access issues" },
      ],
    },
    {
      icon: "🤝",
      title: "Partnership Guidance",
      description:
        "Support for partnership agreements, compliance questions, and collaboration best practices.",
      options: [
        { icon: "📋", title: "Policy Clarification", desc: "Understanding guidelines and requirements" },
        { icon: "⚖️", title: "Compliance Support", desc: "Ensuring adherence to partnership standards" },
        { icon: "🎯", title: "Program Development", desc: "Planning and improving club activities" },
      ],
    },
    {
      icon: "🛡️",
      title: "Safeguarding Support",
      description:
        "Guidance on safeguarding policies, incident reporting, and participant welfare concerns.",
      options: [
        { icon: "📞", title: "Incident Reporting", desc: "How to report and document incidents properly" },
        { icon: "🛡️", title: "Safeguarding Advice", desc: "Child protection and vulnerable adult support" },
        { icon: "📄", title: "Policy Updates", desc: "Latest safeguarding requirements and changes" },
      ],
    },
  ];

  const faqs = [
    {
      question: "How do I report a safeguarding concern?",
      answer:
        "For immediate concerns, call the Malaika House Emergency Line (1800-MALAIKA) or emergency services (000). For non-urgent concerns, complete an incident report through your dashboard and notify your supervisor within 24 hours. All reports are treated confidentially and investigated according to our safeguarding procedures.",
    },
    {
      question: "Can I communicate directly with participant families?",
      answer:
        "No, all family communication must be coordinated through Malaika House staff. This ensures consistent messaging, maintains professional boundaries, and protects both participants and partners. If you need to communicate with families, contact your assigned coordinator who will facilitate the appropriate channels.",
    },
    {
      question: "How often do I need to submit reports?",
      answer:
        "Monthly summary reports are due by the 5th of each month, covering the previous month's activities. Session attendance should be recorded immediately after each session. Incident reports must be submitted within 24 hours of any significant event. You'll receive automatic reminders for all required submissions.",
    },
    {
      question: "What insurance coverage do I need?",
      answer:
        "External partners must maintain current public liability insurance (minimum $10 million) and professional indemnity coverage. You'll also need appropriate venue insurance if hosting sessions. All insurance documents must be provided during the partnership registration process and renewed annually.",
    },
  ];

  const contactForms = [
    {
      icon: "📝",
      title: "General Support Request",
      fields: [
        { label: "Support Category", type: "select", options: ["Technical Issues", "Training & Development", "Partnership Guidance", "Policy Clarification", "Other"] },
        { label: "Priority Level", type: "select", options: ["Normal (2-3 business days)", "Urgent (Next business day)", "Low (Within 1 week)"] },
        { label: "Subject", type: "text" },
        { label: "Description", type: "textarea" },
      ],
      button: "📨 Submit Request",
    },
    {
      icon: "🛡️",
      title: "Safeguarding Inquiry",
      fields: [
        { label: "Inquiry Type", type: "select", options: ["Policy Clarification", "Incident Guidance", "Training Question", "Compliance Check"] },
        { label: "Club/Program", type: "select", options: ["Square Peg Kids Club", "Teen Square Pegs", "Adult Square Pegs", "General/Multiple"] },
        { label: "Question/Concern", type: "textarea" },
      ],
      button: "🛡️ Submit Inquiry",
    },
    {
      icon: "💡",
      title: "Training Request",
      fields: [
        { label: "Training Type", type: "select", options: ["Additional Safeguarding Training", "Specialized Skill Development", "Program-Specific Training", "Refresher Courses", "Custom Training Request"] },
        { label: "Preferred Format", type: "select", options: ["Online/Virtual", "In-Person", "Self-Paced Online", "Group Workshop", "No Preference"] },
        { label: "Number of Staff", type: "number" },
        { label: "Additional Details", type: "textarea" },
      ],
      button: "🎓 Request Training",
    },
  ];

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
            <a href="#participants" className="nav-item">👥 Participants (Limited)</a>
          </div>

          <div className="nav-section">
            <div className="nav-section-title">Resources</div>
            <a href="#materials" className="nav-item">📚 Materials</a>
            <a href="#guidelines" className="nav-item">📋 Partnership Guidelines</a>
            <a href="#support" className="nav-item active">🔧 Support</a>
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
            <h1 className="page-title">Support & Help</h1>
          </div>
          <div className="top-bar-actions">
            <button className="contact-btn">📞 Contact Malaika</button>
          </div>
        </div>

        <div className="content-area">
          {/* Emergency Support */}
          <div className="emergency-support">
            <div className="emergency-content">
              <div className="emergency-icon">🚨</div>
              <h3 className="emergency-title">Emergency Support</h3>
              <p className="emergency-description">
                For urgent safeguarding concerns, medical emergencies, or critical incidents during club sessions
              </p>
              <div className="emergency-contacts">
                {emergencyContacts.map((c, i) => (
                  <div key={i} className="emergency-contact">
                    <div className="contact-label">{c.label}</div>
                    <div className="contact-info">{c.info}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Support Categories */}
          <div className="support-grid">
            {supportCategories.map((category, i) => (
              <div key={i} className="support-category">
                <div className="category-header">
                  <div className="category-icon">{category.icon}</div>
                  <h3 className="category-title">{category.title}</h3>
                </div>
                <p className="category-description">{category.description}</p>
                <div className="support-options">
                  {category.options.map((opt, j) => (
                    <div key={j} className="support-option">
                      <div className="option-icon">{opt.icon}</div>
                      <div className="option-text">
                        <div className="option-title">{opt.title}</div>
                        <div className="option-desc">{opt.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* FAQs */}
          <div className="faq-section">
            <h3 className="faq-title">Frequently Asked Questions</h3>
            <div className="faq-grid">
              {faqs.map((faq, i) => (
                <div key={i} className="faq-item">
                  <div className="faq-question">
                    <span>{faq.question}</span>
                    <span className="faq-icon">▼</span>
                  </div>
                  <div className="faq-answer">{faq.answer}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Forms */}
          <div className="contact-forms">
            {contactForms.map((form, i) => (
              <div key={i} className="contact-form">
                <h3 className="form-title">
                  <span>{form.icon}</span> {form.title}
                </h3>
                <form>
                  {form.fields.map((f, j) => (
                    <div key={j} className="form-group">
                      <label className="form-label">{f.label}</label>
                      {f.type === "text" || f.type === "number" ? (
                        <input type={f.type} className="form-input" placeholder={f.label} min={f.type === "number" ? 1 : undefined} />
                      ) : f.type === "textarea" ? (
                        <textarea className="form-input form-textarea" placeholder={f.label}></textarea>
                      ) : f.type === "select" ? (
                        <select className="form-input form-select">
                          <option>Select {f.label.toLowerCase()}...</option>
                          {f.options.map((opt, k) => (
                            <option key={k}>{opt}</option>
                          ))}
                        </select>
                      ) : null}
                    </div>
                  ))}
                  <button type="submit" className="btn btn-primary">{form.button}</button>
                </form>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SupportPage;
