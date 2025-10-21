import { useState, useEffect } from "react";

export default function ParentDashboard() {
  const [activeNav, setActiveNav] = useState("📊 Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unread, setUnread] = useState(true);

  // Handle window resize (auto-close sidebar)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (title) => {
    setActiveNav(title);
    setSidebarOpen(false);
  };

  const alertMessage = (msg) => alert(msg);

  return (
    <div className="flex min-h-screen font-sans text-[#5D5A7A] bg-[#F5F5F5]">
      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-[280px] min-w-[280px] bg-gradient-to-b from-[#8DB4A8] to-[#7B9BC4] text-white overflow-y-auto transition-transform duration-300 z-[2000] ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6 bg-white/10 backdrop-blur border-b border-white/10">
          <a href="/" className="flex items-center gap-2">
            <img
              src="https://i.postimg.cc/9QhL2Tz3/2022-12-10-Malaika-House-Name-only-png.png"
              alt="Malaika House Logo"
              className="h-10"
            />
          </a>

          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="font-semibold">Sarah Mitchell</div>
            <div className="text-sm opacity-80">Internal Parent Dashboard</div>

            <div className="bg-white/15 p-3 rounded-lg mt-4">
              <div className="font-semibold">Emma Mitchell (Age 8)</div>
              <div className="text-sm opacity-90">Heart Program Member</div>
            </div>
          </div>
        </div>

        <nav className="py-6">
          {[
            {
              section: "Overview",
              links: ["📊 Dashboard", "📈 Child Progress"],
            },
            {
              section: "Sessions",
              links: ["📅 Schedule", "➕ Book Session", "📋 Session History"],
            },
            {
              section: "Subscription",
              links: [
                "💳 Subscription Management",
                "💰 Payment History",
                "🔄 Auto-Renewal",
              ],
            },
            {
              section: "Communication",
              links: ["💬 Messages", "📢 Updates", "📝 Feedback"],
            },
            { section: "Account", links: ["👤 Profile", "⚙️ Settings"] },
          ].map((group) => (
            <div key={group.section} className="mb-6">
              <div className="px-5 pb-2 text-xs uppercase tracking-wider opacity-70 font-semibold">
                {group.section}
              </div>
              {group.links.map((link) => (
                <button
                  key={link}
                  onClick={() => handleNavClick(link)}
                  className={`block w-full text-left px-5 py-2.5 border-l-4 transition-all duration-200 ${
                    activeNav === link
                      ? "bg-white/15 border-white"
                      : "border-transparent hover:bg-white/10"
                  }`}
                >
                  {link}
                </button>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {/* Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[1500] md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex flex-col flex-1 bg-[#F5F5F5] min-w-0">
        {/* Top Bar */}
        <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-100">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden bg-[#8DB4A8] text-white px-3 py-2 rounded-md text-lg"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>
            <h1 className="text-2xl font-bold text-[#5D5A7A]">
              {activeNav.replace(/^[^A-Za-z]+/, "")}
            </h1>
          </div>
          <button
            className="bg-[#8DB4A8] hover:bg-[#7B9BC4] text-white px-4 py-2 rounded-full font-semibold transition"
            onClick={() =>
              alertMessage(
                "Opening secure messaging interface...\n\nYou can communicate directly with Emma's support team here."
              )
            }
          >
            💬 Message Staff
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Welcome */}
          <div className="relative bg-gradient-to-br from-[#A594C7] to-[#8DB4A8] text-white p-8 rounded-2xl overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl font-semibold mb-2">Welcome back, Sarah!</h2>
              <p className="opacity-95 text-lg">
                Emma has 2 sessions remaining this month. Her social skills have improved
                significantly!
              </p>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "🎯",
                score: "85%",
                title: "Session Attendance",
                width: "85%",
                note: "Excellent attendance this term",
              },
              {
                icon: "🌟",
                score: "Good",
                title: "Social Skills",
                width: "75%",
                note: "Showing great improvement",
              },
              {
                icon: "💙",
                score: "Very Good",
                title: "Emotional Regulation",
                width: "80%",
                note: "Steady progress noted",
              },
              {
                icon: "🎨",
                score: "Excellent",
                title: "Creative Expression",
                width: "90%",
                note: "Outstanding creativity shown",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition cursor-pointer"
                onClick={() =>
                  alertMessage(
                    `Viewing detailed ${card.title} report for Emma...\n\nThis shows comprehensive tracking and professional assessments.`
                  )
                }
              >
                <div className="flex justify-between mb-3">
                  <div className="w-12 h-12 flex items-center justify-center text-xl rounded-lg bg-gradient-to-br from-[#7B9BC4] to-[#A594C7] text-white">
                    {card.icon}
                  </div>
                  <div className="text-[#8DB4A8] font-bold text-2xl">
                    {card.score}
                  </div>
                </div>
                <div className="font-semibold text-[#5D5A7A] mb-2">
                  {card.title}
                </div>
                <div className="w-full h-2 bg-[#F5F5F5] rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-[#8DB4A8] to-[#7B9BC4] transition-all"
                    style={{ width: card.width }}
                  ></div>
                </div>
                <div className="text-sm text-[#6B5F7A]">{card.note}</div>
              </div>
            ))}
          </div>

          {/* Subscription & Sessions */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md space-y-4">
              <div className="flex justify-between border-b pb-3">
                <h2 className="font-semibold text-lg text-[#5D5A7A]">
                  Subscription & Upcoming Sessions
                </h2>
                <button
                  className="bg-[#8DB4A8] hover:bg-[#7B9BC4] text-white px-4 py-2 rounded-md text-sm font-semibold"
                  onClick={() =>
                    alertMessage(
                      "Opening session booking system...\n\nIntegrated with Google Calendar for real-time availability.\nPayment will be processed before confirmation."
                    )
                  }
                >
                  Book New Session
                </button>
              </div>

              <div className="bg-gradient-to-br from-[#7B9BC4] to-[#A594C7] text-white text-center p-5 rounded-xl">
                <div className="text-lg font-bold">2025 Session Pass</div>
                <div className="text-3xl font-bold my-2">2</div>
                <div>Sessions Remaining This Month</div>
                <div className="text-sm opacity-90">
                  Auto-renewal: December 1, 2025
                </div>
              </div>

              <div className="space-y-3">
                {[
                  {
                    date: "November 15, 2025 - 2:00 PM",
                    type: "Heart Program - Social Skills Focus",
                  },
                  {
                    date: "November 22, 2025 - 2:00 PM",
                    type: "Heart Program - Creative Arts",
                  },
                ].map((s) => (
                  <div
                    key={s.date}
                    className="bg-[#F5F5F5] hover:bg-[#B8B5C0]/30 p-4 rounded-lg flex justify-between items-center cursor-pointer transition"
                    onClick={() =>
                      alertMessage(
                        `Session Details: ${s.date}\n\nView full session notes, photos (if permissions granted), and learning objectives achieved.`
                      )
                    }
                  >
                    <div>
                      <div className="font-semibold text-[#5D5A7A]">{s.date}</div>
                      <div className="text-sm text-[#6B5F7A]">{s.type}</div>
                    </div>
                    <div className="bg-[#7B9BC4]/20 text-[#7B9BC4] px-3 py-1 rounded-full text-xs font-semibold">
                      Upcoming
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions & Messages */}
            <div className="space-y-5">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="font-semibold text-lg mb-3 text-[#5D5A7A]">
                  Quick Actions
                </h2>
                <div className="grid gap-3">
                  {[
                    ["📅", "Book Session", "Schedule Emma's next visit"],
                    ["📊", "View Progress", "See detailed reports"],
                    ["💳", "Manage Subscription", "Update payment & plan"],
                  ].map(([icon, title, desc]) => (
                    <button
                      key={title}
                      className="bg-gradient-to-br from-[#A594C7] to-[#7B9BC4] text-white p-4 rounded-lg text-center hover:-translate-y-1 hover:shadow-lg transition"
                      onClick={() =>
                        alertMessage(`Opening ${title} interface...`)
                      }
                    >
                      <div className="text-2xl mb-1">{icon}</div>
                      <div className="font-semibold">{title}</div>
                      <div className="text-sm opacity-90">{desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="font-semibold text-lg mb-3 text-[#5D5A7A]">
                  Recent Messages
                </h2>

                <div
                  className={`p-4 rounded-lg mb-3 border-l-4 transition cursor-pointer ${
                    unread
                      ? "border-[#7B9BC4] bg-[#7B9BC4]/10"
                      : "border-[#8DB4A8] bg-[#F5F5F5]"
                  }`}
                  onClick={() => {
                    alertMessage(
                      "Opening conversation with Ms. Johnson...\n\nSecure messaging system for parent-staff communication."
                    );
                    setUnread(false);
                  }}
                >
                  <div className="flex justify-between mb-2">
                    <div className="font-semibold text-[#5D5A7A]">
                      Ms. Johnson (Lead Facilitator)
                    </div>
                    <div className="text-sm text-[#6B5F7A]">2 hours ago</div>
                  </div>
                  <p className="text-[#6B5F7A]">
                    Emma had a wonderful session today! She showed great leadership and
                    helped another child feel included.
                  </p>
                </div>

                <div
                  className="p-4 rounded-lg border-l-4 border-[#8DB4A8] bg-[#F5F5F5] cursor-pointer hover:bg-[#B8B5C0]/30 transition"
                  onClick={() =>
                    alertMessage(
                      "Opening message from Admin Team...\n\nMonthly progress report is now available."
                    )
                  }
                >
                  <div className="flex justify-between mb-2">
                    <div className="font-semibold text-[#5D5A7A]">Admin Team</div>
                    <div className="text-sm text-[#6B5F7A]">1 day ago</div>
                  </div>
                  <p className="text-[#6B5F7A]">
                    Monthly progress report is now available. Please review Emma's
                    achievements this month.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Session Reports */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="font-semibold text-lg text-[#5D5A7A]">
                Recent Session Reports
              </h2>
              <button className="bg-[#F5F5F5] hover:bg-[#B8B5C0] text-[#5D5A7A] px-4 py-2 rounded-md font-semibold text-sm transition">
                View All Reports
              </button>
            </div>

            {[
              {
                date: "November 8, 2025 - Heart Program Session",
                desc: "Emma participated excellently in collaborative art project. Showed strong peer interaction skills and emotional regulation.",
              },
              {
                date: "November 1, 2025 - Social Skills Workshop",
                desc: "Great progress in communication. Emma took initiative helping a new group member feel welcome and included.",
              },
            ].map((r) => (
              <div
                key={r.date}
                className="bg-[#F5F5F5] hover:bg-[#B8B5C0]/30 p-4 rounded-lg flex justify-between items-start mb-3 cursor-pointer"
                onClick={() =>
                  alertMessage(`Viewing report for ${r.date}`)
                }
              >
                <div>
                  <div className="font-semibold text-[#5D5A7A]">{r.date}</div>
                  <div className="text-sm text-[#6B5F7A]">{r.desc}</div>
                </div>
                <div className="bg-[#8DB4A8]/20 text-[#8DB4A8] px-3 py-1 rounded-full text-xs font-semibold">
                  Completed
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
