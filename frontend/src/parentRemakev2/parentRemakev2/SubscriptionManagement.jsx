import React from "react";
import "./SubscriptionManagement.css"; // optional external css

const SubscriptionManagement = () => {
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
            <a href="#subscription" className="nav-item active">💳 Subscription Management</a>
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
          <h1 className="page-title">Subscription Management</h1>
        </div>

        <div className="content-area">
          {/* Subscription Header */}
          <div className="subscription-header">
            <div className="header-info">
              <h2>2025 Session Pass</h2>
              <p className="header-subtitle">
                Unlimited Heart Program sessions with priority booking
              </p>
              <div className="status-badge">Active Subscription</div>
            </div>
            <div className="renewal-info">
              <div className="renewal-date">Dec 1, 2025</div>
              <div className="renewal-label">Next Billing Date</div>
            </div>
            <div className="renewal-info">
              <div className="renewal-date">R2,450</div>
              <div className="renewal-label">Monthly Amount</div>
            </div>
          </div>

          {/* Subscription Content */}
          <div className="subscription-content">
            {/* Current Plan */}
            <div className="current-plan">
              <div className="plan-header">
                <div className="plan-name">2025 Session Pass</div>
                <div className="plan-price">
                  <div className="price-amount">R2,450</div>
                  <div className="price-period">per month</div>
                </div>
              </div>

              <ul className="plan-features">
                <li>Unlimited Heart Program sessions</li>
                <li>Priority booking access</li>
                <li>Monthly progress assessments</li>
                <li>Individual and group sessions</li>
                <li>Creative arts workshops</li>
                <li>Social skills development</li>
                <li>Parent consultation sessions</li>
                <li>Digital progress reports</li>
                <li>Emergency session availability</li>
              </ul>

              <div className="usage-stats">
                <h4 className="usage-title">Current Month Usage</h4>
                <div className="usage-item">
                  <span className="usage-label">Sessions Attended:</span>
                  <span className="usage-value">6 / Unlimited</span>
                </div>
                <div className="usage-item">
                  <span className="usage-label">Sessions Remaining:</span>
                  <span className="usage-value">2 this month</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: "75%" }}></div>
                </div>
                <div className="usage-item">
                  <span className="usage-label">Next Session:</span>
                  <span className="usage-value">Nov 29, 2025</span>
                </div>
              </div>

              <button className="btn btn-secondary">Modify Plan</button>
              <button className="btn btn-danger">Cancel Subscription</button>
            </div>

            {/* Available Plans */}
            <div className="available-plans">
              <h3 className="section-title">Available Plans</h3>

              <div className="plans-grid">
                <div className="plan-option recommended">
                  <div className="plan-option-header">
                    <div className="plan-option-name">2025 Session Pass</div>
                    <div className="plan-option-price">R2,450/mo</div>
                  </div>
                  <div className="plan-description">
                    Unlimited access to all Heart Program services with priority booking
                  </div>
                  <ul className="plan-features-small">
                    <li>Unlimited sessions</li>
                    <li>Priority booking</li>
                    <li>Progress assessments</li>
                    <li>Parent consultations</li>
                    <li>Digital reports</li>
                    <li>Emergency sessions</li>
                  </ul>
                </div>

                <div className="plan-option">
                  <div className="plan-option-header">
                    <div className="plan-option-name">Standard Plan</div>
                    <div className="plan-option-price">R1,850/mo</div>
                  </div>
                  <div className="plan-description">
                    8 sessions per month with regular booking access
                  </div>
                  <ul className="plan-features-small">
                    <li>8 sessions per month</li>
                    <li>Regular booking</li>
                    <li>Quarterly assessments</li>
                    <li>Progress reports</li>
                    <li>Group workshops</li>
                    <li>Parent resources</li>
                  </ul>
                </div>

                <div className="plan-option">
                  <div className="plan-option-header">
                    <div className="plan-option-name">Basic Plan</div>
                    <div className="plan-option-price">R1,250/mo</div>
                  </div>
                  <div className="plan-description">
                    4 sessions per month ideal for maintenance phase
                  </div>
                  <ul className="plan-features-small">
                    <li>4 sessions per month</li>
                    <li>Standard booking</li>
                    <li>Basic assessments</li>
                    <li>Session summaries</li>
                    <li>Parent portal access</li>
                    <li>Email support</li>
                  </ul>
                </div>

                <div className="plan-option">
                  <div className="plan-option-header">
                    <div className="plan-option-name">Pay-Per-Session</div>
                    <div className="plan-option-price">R385/session</div>
                  </div>
                  <div className="plan-description">
                    Flexible option for occasional sessions without commitment
                  </div>
                  <ul className="plan-features-small">
                    <li>No monthly commitment</li>
                    <li>Book as needed</li>
                    <li>48-hour cancellation</li>
                    <li>Basic session notes</li>
                    <li>Email summaries</li>
                    <li>Standard support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="payment-method">
            <h3 className="section-title">Payment Methods</h3>

            <div className="payment-cards">
              <div className="card-item active">
                <div className="card-info">
                  <div className="card-icon">VISA</div>
                  <div className="card-details">
                    <div className="card-number">•••• •••• •••• 4532</div>
                    <div className="card-expiry">Expires 12/27</div>
                  </div>
                </div>
                <div className="card-actions">
                  <button className="action-btn btn-edit">Edit</button>
                  <button className="action-btn btn-delete">Remove</button>
                </div>
              </div>

              <div className="card-item">
                <div className="card-info">
                  <div className="card-icon">MC</div>
                  <div className="card-details">
                    <div className="card-number">•••• •••• •••• 8901</div>
                    <div className="card-expiry">Expires 08/26</div>
                  </div>
                </div>
                <div className="card-actions">
                  <button className="action-btn btn-edit">Edit</button>
                  <button className="action-btn btn-delete">Remove</button>
                </div>
              </div>
            </div>

            <button className="btn btn-primary">Add New Payment Method</button>
          </div>

          {/* Billing History */}
          <div className="billing-history">
            <h3 className="section-title">Recent Billing History</h3>

            <table className="history-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Invoice</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Nov 1, 2025</td>
                  <td>2025 Session Pass - Monthly Subscription</td>
                  <td>R2,450.00</td>
                  <td><span className="status-paid">Paid</span></td>
                  <td><a href="#" className="invoice-link">Download</a></td>
                </tr>
                <tr>
                  <td>Oct 1, 2025</td>
                  <td>2025 Session Pass - Monthly Subscription</td>
                  <td>R2,450.00</td>
                  <td><span className="status-paid">Paid</span></td>
                  <td><a href="#" className="invoice-link">Download</a></td>
                </tr>
                <tr>
                  <td>Sep 1, 2025</td>
                  <td>2025 Session Pass - Monthly Subscription</td>
                  <td>R2,450.00</td>
                  <td><span className="status-paid">Paid</span></td>
                  <td><a href="#" className="invoice-link">Download</a></td>
                </tr>
                <tr>
                  <td>Aug 15, 2025</td>
                  <td>Additional Session - Party for Two</td>
                  <td>R750.00</td>
                  <td><span className="status-paid">Paid</span></td>
                  <td><a href="#" className="invoice-link">Download</a></td>
                </tr>
                <tr>
                  <td>Aug 1, 2025</td>
                  <td>2025 Session Pass - Monthly Subscription</td>
                  <td>R2,450.00</td>
                  <td><span className="status-paid">Paid</span></td>
                  <td><a href="#" className="invoice-link">Download</a></td>
                </tr>
                <tr>
                  <td>Dec 1, 2025</td>
                  <td>2025 Session Pass - Monthly Subscription (Upcoming)</td>
                  <td>R2,450.00</td>
                  <td><span className="status-pending">Pending</span></td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubscriptionManagement;
