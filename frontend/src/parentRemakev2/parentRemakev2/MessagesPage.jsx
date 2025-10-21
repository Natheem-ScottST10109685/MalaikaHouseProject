import React, { useState, useRef, useEffect } from "react";
import "../styles/messages.css"; // ✅ your external CSS file

export default function MessagesPage() {
  const [currentConversation, setCurrentConversation] = useState("ms-johnson");
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load conversation content
  useEffect(() => {
    setMessages(getConversation(currentConversation));
  }, [currentConversation]);

  // Simulate loading conversations
  const getConversation = (id) => {
    const templates = {
      "ms-johnson": [
        { type: "received", sender: "MJ", text: "Hello Sarah! I wanted to reach out about Emma's session today. She had a wonderful time and showed remarkable progress in her social interactions.", time: "Today, 2:30 PM" },
        { type: "received", sender: "MJ", text: "During our group art activity, Emma naturally took on a leadership role and helped another child who was feeling overwhelmed. Her empathy and communication skills really shone through.", time: "Today, 2:32 PM" },
        { type: "sent", sender: "S", text: "That's wonderful to hear! Emma has been talking about the art activities at home and seems really excited about them.", time: "Today, 3:15 PM" },
        { type: "sent", sender: "S", text: "She mentioned helping someone today but wasn't specific about what happened. Thank you for sharing the details!", time: "Today, 3:16 PM" },
      ],
      "dr-smith": [
        { type: "received", sender: "DS", text: "Hi Sarah, I wanted to follow up on Emma's progress with conflict resolution skills. She's been making excellent strides!", time: "Yesterday, 10:30 AM" },
        { type: "received", sender: "DS", text: "During yesterday's group session, she successfully mediated a disagreement between two peers. Her approach was very mature and empathetic.", time: "Yesterday, 10:32 AM" },
      ],
      "admin-team": [
        { type: "received", sender: "AT", text: "Hello Sarah, Emma's monthly progress report is now available in your dashboard. Please take a moment to review her achievements this month.", time: "3 days ago, 9:00 AM" },
        { type: "sent", sender: "S", text: "Thank you! I'll review it today.", time: "3 days ago, 11:15 AM" },
      ],
      "dr-williams": [
        { type: "sent", sender: "S", text: "Hi Dr. Williams, I wanted to share some observations about Emma's behavior at home that might be relevant to her sessions.", time: "1 week ago, 2:00 PM" },
        { type: "received", sender: "DW", text: "Thank you for sharing those observations, Sarah. They're very helpful for understanding Emma's overall progress. I've noted them in her file.", time: "1 week ago, 4:30 PM" },
      ],
      "finance-team": [
        { type: "received", sender: "FT", text: "Good day Sarah, your payment for November has been processed successfully. Receipt reference: MH-NOV-2025-001", time: "2 weeks ago, 8:00 AM" },
        { type: "sent", sender: "S", text: "Perfect, thank you for the confirmation!", time: "2 weeks ago, 8:45 AM" },
      ],
    };
    return templates[id] || templates["ms-johnson"];
  };

  const handleSend = () => {
    if (!messageText.trim()) return;
    const newMsg = {
      type: "sent",
      sender: "S",
      text: messageText.trim(),
      time: "Now",
    };
    setMessages((prev) => [...prev, newMsg]);
    setMessageText("");
    simulateResponse();
  };

  const simulateResponse = () => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          type: "received",
          sender: "MJ",
          text: "Thank you for your response! I'll send you a calendar invite for a call this week to discuss Emma's progress further.",
          time: "Now",
        },
      ]);
    }, 3000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

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
            <a href="#messages" className="nav-item active">💬 Messages</a>
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
          <h1 className="page-title">Messages</h1>
          <div className="top-bar-actions">
            <button className="btn btn-secondary">📋 Message History</button>
            <button className="btn btn-primary">✉️ New Message</button>
          </div>
        </div>

        <div className="content-area">
          <div className="messages-container">
            {/* Conversations Panel */}
            <div className="conversations-panel">
              <div className="panel-header">
                <div className="panel-title">Conversations</div>
                <div className="search-box">
                  <span className="search-icon">🔍</span>
                  <input type="text" className="search-input" placeholder="Search conversations..." />
                </div>
              </div>

              <div className="conversation-list">
                {["ms-johnson", "dr-smith", "admin-team", "dr-williams", "finance-team"].map((id) => (
                  <div
                    key={id}
                    className={`conversation-item ${currentConversation === id ? "active" : ""}`}
                    onClick={() => setCurrentConversation(id)}
                  >
                    <div className="conversation-header">
                      <div className="staff-name">
                        {id === "ms-johnson" ? "Ms. Johnson" :
                         id === "dr-smith" ? "Dr. Smith" :
                         id === "admin-team" ? "Admin Team" :
                         id === "dr-williams" ? "Dr. Williams" : "Finance Team"}
                      </div>
                      <div className="conversation-time">{
                        id === "ms-johnson" ? "2 hours ago" :
                        id === "dr-smith" ? "Yesterday" :
                        id === "admin-team" ? "3 days ago" :
                        id === "dr-williams" ? "1 week ago" : "2 weeks ago"
                      }</div>
                    </div>
                    <div className="staff-role">
                      {id === "ms-johnson" ? "Lead Art Therapist" :
                       id === "dr-smith" ? "Social Skills Specialist" :
                       id === "admin-team" ? "Administrative Support" :
                       id === "dr-williams" ? "Behavioral Therapist" : "Billing & Payments"}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Panel */}
            <div className="chat-panel">
              <div className="chat-header">
                <div className="chat-staff-info">
                  <div className="staff-avatar">
                    {currentConversation === "ms-johnson" ? "MJ" :
                     currentConversation === "dr-smith" ? "DS" :
                     currentConversation === "admin-team" ? "AT" :
                     currentConversation === "dr-williams" ? "DW" : "FT"}
                  </div>
                  <div className="staff-details">
                    <h3>
                      {currentConversation === "ms-johnson" ? "Ms. Johnson" :
                       currentConversation === "dr-smith" ? "Dr. Smith" :
                       currentConversation === "admin-team" ? "Admin Team" :
                       currentConversation === "dr-williams" ? "Dr. Williams" : "Finance Team"}
                    </h3>
                    <div className="staff-role-detail">Online now</div>
                  </div>
                </div>
                <div className="chat-actions">
                  <button className="action-btn btn-call">📞 Call</button>
                  <button className="action-btn btn-video">📹 Video</button>
                </div>
              </div>

              <div className="messages-area">
                {messages.map((msg, index) => (
                  <div key={index} className={`message ${msg.type}`}>
                    <div className="message-avatar">{msg.sender}</div>
                    <div className="message-content">
                      <div className="message-text">{msg.text}</div>
                      <div className="message-time">{msg.time}</div>
                    </div>
                  </div>
                ))}
                {typing && <div className="typing-indicator">Ms. Johnson is typing...</div>}
                <div ref={messagesEndRef} />
              </div>

              <div className="message-input-area">
                <div className="input-container">
                  <textarea
                    className="message-input"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    rows={1}
                  />
                  <div className="input-actions">
                    <button className="attachment-btn" title="Attach file">📎</button>
                    <button className="send-btn" onClick={handleSend} disabled={!messageText.trim()} title="Send message">➤</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
