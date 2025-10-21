import React from "react";

const ChildProgress = () => {
  return (
    <div className="dashboard-container flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="sidebar w-72 bg-gradient-to-b from-indigo-950 to-indigo-800 text-white p-6 flex flex-col">
        <div className="sidebar-header mb-8">
          <a href="/" className="logo block mb-4">
            <img
              src="https://i.postimg.cc/9QhL2Tz3/2022-12-10-Malaika-House-Name-only-png.png"
              alt="Malaika House Logo"
              className="h-10"
            />
          </a>
          <div className="parent-info text-sm space-y-1">
            <div className="font-semibold text-lg">Sarah Mitchell</div>
            <div className="text-indigo-200">Internal Parent Dashboard</div>
            <div className="child-info mt-3 border-t border-indigo-700 pt-3">
              <div className="font-medium">Emma Mitchell (Age 8)</div>
              <div className="text-indigo-200">Heart Program Member</div>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav flex-1 space-y-6">
          <div>
            <div className="nav-section-title text-indigo-300 text-xs uppercase mb-2">
              Overview
            </div>
            <a href="#dashboard" className="block py-1 hover:text-sage-300">
              📊 Dashboard
            </a>
            <a href="#child-progress" className="block py-1 text-sage-400 font-semibold">
              📈 Child Progress
            </a>
          </div>

          <div>
            <div className="nav-section-title text-indigo-300 text-xs uppercase mb-2">
              Sessions
            </div>
            <a href="#schedule" className="block py-1 hover:text-sage-300">
              📅 Schedule
            </a>
            <a href="#book-session" className="block py-1 hover:text-sage-300">
              ➕ Book Session
            </a>
            <a href="#session-history" className="block py-1 hover:text-sage-300">
              📋 Session History
            </a>
          </div>

          <div>
            <div className="nav-section-title text-indigo-300 text-xs uppercase mb-2">
              Subscription
            </div>
            <a href="#subscription" className="block py-1 hover:text-sage-300">
              💳 Subscription Management
            </a>
            <a href="#payments" className="block py-1 hover:text-sage-300">
              💰 Payment History
            </a>
            <a href="#auto-renewal" className="block py-1 hover:text-sage-300">
              🔄 Auto-Renewal
            </a>
          </div>

          <div>
            <div className="nav-section-title text-indigo-300 text-xs uppercase mb-2">
              Communication
            </div>
            <a href="#messages" className="block py-1 hover:text-sage-300">
              💬 Messages
            </a>
            <a href="#updates" className="block py-1 hover:text-sage-300">
              📢 Updates
            </a>
            <a href="#feedback" className="block py-1 hover:text-sage-300">
              📝 Feedback
            </a>
          </div>

          <div>
            <div className="nav-section-title text-indigo-300 text-xs uppercase mb-2">
              Account
            </div>
            <a href="#profile" className="block py-1 hover:text-sage-300">
              👤 Profile
            </a>
            <a href="#settings" className="block py-1 hover:text-sage-300">
              ⚙️ Settings
            </a>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content flex-1 flex flex-col">
        <div className="top-bar flex justify-between items-center bg-white shadow p-6">
          <h1 className="text-2xl font-semibold text-gray-800">Child Progress</h1>
          <button className="btn btn-primary bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            📥 Download Report
          </button>
        </div>

        <div className="content-area p-8 space-y-10">
          {/* Progress Overview */}
          <div className="progress-overview bg-white rounded-2xl shadow p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800">Emma's Overall Progress</h2>
            <p className="text-gray-500 mb-3">Comprehensive development tracking across all areas</p>
            <div className="overall-score text-5xl font-bold text-indigo-600 mb-2">82%</div>
            <p className="text-gray-600">Showing significant improvement across multiple development areas</p>
          </div>

          {/* Progress Categories */}
          <div className="progress-categories grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[
              {
                icon: "🎯",
                title: "Social Skills Development",
                score: "85%",
                change: "+12% this month",
                progress: "w-[85%]",
                details: [
                  ["Peer Interaction", "Excellent"],
                  ["Communication", "Very Good"],
                  ["Cooperation", "Good"],
                  ["Last Assessment", "Nov 8, 2025"],
                ],
              },
              {
                icon: "💙",
                title: "Emotional Regulation",
                score: "80%",
                change: "+8% this month",
                progress: "w-[80%]",
                details: [
                  ["Self-Awareness", "Very Good"],
                  ["Coping Strategies", "Good"],
                  ["Stress Management", "Improving"],
                  ["Last Assessment", "Nov 5, 2025"],
                ],
              },
              {
                icon: "🎨",
                title: "Creative Expression",
                score: "90%",
                change: "+5% this month",
                progress: "w-[90%]",
                details: [
                  ["Artistic Skills", "Excellent"],
                  ["Innovation", "Outstanding"],
                  ["Self-Expression", "Very Good"],
                  ["Last Assessment", "Nov 10, 2025"],
                ],
              },
              {
                icon: "🧠",
                title: "Cognitive Development",
                score: "78%",
                change: "+15% this month",
                progress: "w-[78%]",
                details: [
                  ["Problem Solving", "Good"],
                  ["Memory & Focus", "Very Good"],
                  ["Critical Thinking", "Improving"],
                  ["Last Assessment", "Nov 3, 2025"],
                ],
              },
            ].map((cat, i) => (
              <div
                key={i}
                className="category-card bg-white rounded-2xl shadow p-6 flex flex-col"
              >
                <div className="category-header flex justify-between items-center mb-4">
                  <div className="category-icon text-3xl">{cat.icon}</div>
                  <div className="text-right">
                    <div className="text-2xl font-semibold text-indigo-600">{cat.score}</div>
                    <div className="text-sm text-green-500">↗ {cat.change}</div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{cat.title}</h3>
                <div className="progress-bar w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div className={`progress-fill bg-indigo-600 h-2 rounded-full ${cat.progress}`}></div>
                </div>
                <div className="category-details text-sm space-y-2">
                  {cat.details.map(([label, value], j) => (
                    <div key={j} className="flex justify-between text-gray-700">
                      <span className="font-medium">{label}:</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Monthly Progress Report */}
          <div className="monthly-report bg-white rounded-2xl shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                November 2025 Progress Timeline
              </h2>
              <button className="btn btn-primary bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                📄 View Full Report
              </button>
            </div>

            <div className="timeline space-y-6">
              {[
                ["November 10, 2025", "Creative Arts Session", "Emma demonstrated exceptional creativity in the group art project. She took initiative to help organize materials and showed strong leadership qualities."],
                ["November 8, 2025", "Social Skills Workshop", "Significant breakthrough in peer interaction. Emma successfully mediated a minor conflict between two group members."],
                ["November 5, 2025", "Emotional Regulation Session", "Emma practiced new coping strategies during a challenging group activity."],
                ["November 3, 2025", "Cognitive Development Assessment", "Emma showed marked improvement in problem-solving activities and improved focus."],
                ["November 1, 2025", "Monthly Goal Setting", "Emma actively participated in setting her own learning goals for November."],
              ].map(([date, title, text], i) => (
                <div key={i} className="timeline-item border-l-4 border-indigo-600 pl-4">
                  <div className="timeline-date text-sm text-indigo-500 font-medium mb-1">
                    {date}
                  </div>
                  <div className="timeline-content text-gray-700">
                    <strong>{title}:</strong> {text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Goals & Achievements */}
          <div className="goals-section grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Current Goals",
                items: [
                  ["Improve peer communication during group activities", "completed"],
                  ["Develop conflict resolution skills", "in-progress"],
                  ["Enhance emotional vocabulary and expression", "in-progress"],
                  ["Lead a group project independently", "planned"],
                  ["Mentor a newer group member", "planned"],
                ],
              },
              {
                title: "Recent Achievements",
                items: [
                  ["Successfully completed art exhibition project", "completed"],
                  ["Demonstrated improved emotional regulation", "completed"],
                  ["Achieved 85% session attendance rate", "completed"],
                  ["Helped integrate new group member", "completed"],
                  ["Showed leadership during team activities", "completed"],
                ],
              },
            ].map((section, i) => (
              <div key={i} className="goals-card bg-white rounded-2xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
                <div className="space-y-3">
                  {section.items.map(([goal, status], j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          status === "completed"
                            ? "bg-green-500"
                            : status === "in-progress"
                            ? "bg-yellow-400"
                            : "bg-gray-400"
                        }`}
                      ></div>
                      <div className="text-gray-700">{goal}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChildProgress;
