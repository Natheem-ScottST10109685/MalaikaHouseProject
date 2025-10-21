import React, { useState } from "react";
import "../styles/paymentHistory.css"; // External stylesheet

const PaymentHistory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const openModal = (transactionId) => {
    setSelectedTransaction(transactionId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

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
            <a href="#payments" className="nav-item active">
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
            <a href="#profile" className="nav-item">
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
          <h1 className="page-title">Payment History</h1>
          <div className="top-bar-actions">
            <button className="btn btn-secondary">📊 Tax Summary</button>
            <button className="btn btn-primary">📥 Export All</button>
          </div>
        </div>

        <div className="content-area">
          {/* Payment Summary */}
          <div className="payment-summary">
            {[
              { value: "R14,700", label: "Total Paid (2025)" },
              { value: "R2,450", label: "Average Monthly" },
              { value: "15", label: "Total Transactions" },
              { value: "R2,450", label: "Next Payment" },
            ].map((item, i) => (
              <div className="summary-stat" key={i}>
                <div className="stat-value">{item.value}</div>
                <div className="stat-label">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="filters-bar">
            <div className="filter-group">
              <label className="filter-label">Year:</label>
              <select className="filter-select">
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="all">All Years</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Status:</label>
              <select className="filter-select">
                <option value="all">All Statuses</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Payment Method:</label>
              <select className="filter-select">
                <option value="all">All Methods</option>
                <option value="visa">Visa</option>
                <option value="mastercard">MasterCard</option>
                <option value="eft">EFT</option>
                <option value="cash">Cash</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Date Range:</label>
              <div className="date-range">
                <input type="date" className="date-input" defaultValue="2025-01-01" />
                <span>to</span>
                <input type="date" className="date-input" defaultValue="2025-11-26" />
              </div>
            </div>
          </div>

          {/* Payment Table */}
          <div className="payment-table">
            <h3 className="section-title">Transaction History</h3>

            <div className="table-container">
              <table className="payment-list">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Payment Method</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Reference</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Example Row */}
                  <tr onClick={() => openModal("TX-2025-11-001")}>
                    <td>Nov 1, 2025</td>
                    <td>2025 Session Pass - Monthly Subscription</td>
                    <td>
                      <div className="payment-method">
                        <div className="method-icon">VISA</div>
                        <span>•••• 4532</span>
                      </div>
                    </td>
                    <td className="amount-negative">-R2,450.00</td>
                    <td>
                      <span className="status-badge status-paid">Paid</span>
                    </td>
                    <td>MH-NOV-2025-001</td>
                    <td>
                      <div className="action-buttons">
                        <button className="action-btn btn-invoice">Invoice</button>
                        <button className="action-btn btn-receipt">Receipt</button>
                      </div>
                    </td>
                  </tr>
                  {/* ... other rows identical to your HTML ... */}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button className="page-btn" disabled>←</button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <button className="page-btn">→</button>
          </div>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <>
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="transaction-details">
            <div className="modal-header">
              <h3 className="section-title">Transaction Details</h3>
              <button className="close-btn" onClick={closeModal}>
                &times;
              </button>
            </div>

            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Transaction ID:</span>
                <span className="detail-value">{selectedTransaction}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Processed By:</span>
                <span className="detail-value">Malaika House Finance</span>
              </div>
            </div>

            <div className="tax-summary">
              <h4>Tax Information</h4>
              <div className="detail-item">
                <span className="detail-label">Subtotal:</span>
                <span className="detail-value">R2,130.43</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">VAT (15%):</span>
                <span className="detail-value">R319.57</span>
              </div>
              <div className="detail-item total">
                <span className="detail-label">
                  <strong>Total Amount:</strong>
                </span>
                <span className="detail-value">
                  <strong>R2,450.00</strong>
                </span>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn btn-primary">Download Invoice</button>
              <button className="btn btn-secondary">Email Receipt</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentHistory;
