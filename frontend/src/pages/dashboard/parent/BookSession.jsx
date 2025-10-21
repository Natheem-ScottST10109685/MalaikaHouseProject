import React from "react";

const BookSession = () => {
  return (
    <div className="dashboard-container flex min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="sidebar w-72 bg-white shadow-lg flex flex-col">
        <div className="sidebar-header p-6 border-b border-gray-200">
          <a href="/" className="logo flex items-center space-x-2">
            <img
              src="https://i.postimg.cc/9QhL2Tz3/2022-12-10-Malaika-House-Name-only-png.png"
              alt="Malaika House Logo"
              className="h-10"
            />
          </a>
          <div className="parent-info mt-4 text-sm">
            <div className="font-semibold text-purple-800">Sarah Mitchell</div>
            <div className="text-gray-500 text-xs">
              Internal Parent Dashboard
            </div>
            <div className="child-info mt-3">
              <div className="font-medium text-purple-700">
                Emma Mitchell (Age 8)
              </div>
              <div className="text-gray-500 text-xs">Heart Program Member</div>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav flex-1 overflow-y-auto p-4">
          <div className="nav-section mb-6">
            <div className="font-semibold text-gray-500 mb-2 uppercase text-xs">
              Overview
            </div>
            <a href="#dashboard" className="block py-2 hover:text-purple-600">
              📊 Dashboard
            </a>
            <a href="#child-progress" className="block py-2 hover:text-purple-600">
              📈 Child Progress
            </a>
          </div>

          <div className="nav-section mb-6">
            <div className="font-semibold text-gray-500 mb-2 uppercase text-xs">
              Sessions
            </div>
            <a href="#schedule" className="block py-2 hover:text-purple-600">
              📅 Schedule
            </a>
            <a
              href="#book-session"
              className="block py-2 text-purple-700 font-semibold"
            >
              ➕ Book Session
            </a>
            <a href="#session-history" className="block py-2 hover:text-purple-600">
              📋 Session History
            </a>
          </div>

          <div className="nav-section mb-6">
            <div className="font-semibold text-gray-500 mb-2 uppercase text-xs">
              Subscription
            </div>
            <a href="#subscription" className="block py-2 hover:text-purple-600">
              💳 Subscription Management
            </a>
            <a href="#payments" className="block py-2 hover:text-purple-600">
              💰 Payment History
            </a>
            <a href="#auto-renewal" className="block py-2 hover:text-purple-600">
              🔄 Auto-Renewal
            </a>
          </div>

          <div className="nav-section mb-6">
            <div className="font-semibold text-gray-500 mb-2 uppercase text-xs">
              Communication
            </div>
            <a href="#messages" className="block py-2 hover:text-purple-600">
              💬 Messages
            </a>
            <a href="#updates" className="block py-2 hover:text-purple-600">
              📢 Updates
            </a>
            <a href="#feedback" className="block py-2 hover:text-purple-600">
              📝 Feedback
            </a>
          </div>

          <div className="nav-section">
            <div className="font-semibold text-gray-500 mb-2 uppercase text-xs">
              Account
            </div>
            <a href="#profile" className="block py-2 hover:text-purple-600">
              👤 Profile
            </a>
            <a href="#settings" className="block py-2 hover:text-purple-600">
              ⚙️ Settings
            </a>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content flex-1 p-8 overflow-y-auto">
        <div className="top-bar mb-6">
          <h1 className="page-title text-2xl font-bold text-purple-800">
            Book Session
          </h1>
        </div>

        <div className="content-area space-y-8">
          {/* Booking Header */}
          <div className="booking-header bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-purple-800">
              Book Emma's Next Session
            </h2>
            <p className="text-gray-500 mt-1">
              Choose from available time slots and session types
            </p>
            <div className="mt-4 text-green-600 font-semibold">
              2 Sessions Remaining This Month
            </div>
          </div>

          {/* Booking Form */}
          <div className="booking-form grid lg:grid-cols-2 gap-6">
            {/* Filters Panel */}
            <div className="filters-panel bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-purple-800 mb-4">
                Session Filters
              </h3>

              {/* Age Group Filter */}
              <div className="mb-5">
                <label className="block font-medium text-gray-700 mb-2">
                  Age Group
                </label>
                <div className="space-y-2">
                  {[
                    "Ages 6-9 (Emma's Group)",
                    "Ages 10-13",
                    "Ages 14-17",
                    "Individual Session",
                  ].map((label, i) => (
                    <label key={i} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="age-group"
                        defaultChecked={i === 0}
                        className="accent-purple-600"
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div className="mb-5">
                <label className="block font-medium text-gray-700 mb-2">
                  Location
                </label>
                <div className="space-y-2">
                  {["On-Site (Malaika House)", "Online Session"].map(
                    (label, i) => (
                      <label key={i} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="location"
                          defaultChecked={i === 0}
                          className="accent-purple-600"
                        />
                        <span>{label}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Preferred Date */}
              <div className="mb-5">
                <label className="block font-medium text-gray-700 mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-purple-500"
                  defaultValue="2025-12-01"
                />
              </div>

              {/* Session Type */}
              <div className="mb-5">
                <label className="block font-medium text-gray-700 mb-2">
                  Session Type
                </label>
                <div className="space-y-2">
                  {[
                    "Heart Program",
                    "Social Skills",
                    "Creative Arts",
                    "Assessment Session",
                  ].map((label, i) => (
                    <label key={i} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="session-type"
                        defaultChecked={i === 0}
                        className="accent-purple-600"
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Booking Tiers */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Booking Options
                </label>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-purple-50">
                    <div className="flex justify-between font-semibold text-purple-800">
                      <span>Solo Entry</span>
                      <span>Included</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">
                      Single session for Emma
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
                      <li>60-minute session</li>
                      <li>Individual or group setting</li>
                      <li>Session report included</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg hover:bg-purple-50 transition">
                    <div className="flex justify-between font-semibold text-purple-800">
                      <span>Party for Two</span>
                      <span>+R750</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">
                      Bring a sibling or friend
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
                      <li>90-minute extended session</li>
                      <li>Peer interaction focus</li>
                      <li>Individual reports for both</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Available Slots */}
            <div className="available-slots bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-purple-800 mb-4">
                Available Time Slots
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    date: "December 6, 2025",
                    time: "2:00 PM - 3:00 PM",
                    facilitator: "Ms. Johnson",
                  },
                  {
                    date: "December 8, 2025",
                    time: "10:00 AM - 11:00 AM",
                    facilitator: "Dr. Smith",
                  },
                  {
                    date: "December 13, 2025",
                    time: "2:00 PM - 3:00 PM",
                    facilitator: "Ms. Johnson",
                    selected: true,
                  },
                  {
                    date: "December 15, 2025",
                    time: "11:00 AM - 12:00 PM",
                    facilitator: "Dr. Williams",
                  },
                ].map((slot, i) => (
                  <div
                    key={i}
                    className={`p-4 border rounded-lg ${
                      slot.selected
                        ? "bg-purple-100 border-purple-400"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="font-medium">{slot.date}</div>
                    <div className="text-sm text-gray-600">{slot.time}</div>
                    <div className="text-sm text-purple-700">
                      {slot.facilitator}
                    </div>
                  </div>
                ))}
              </div>

              {/* Booking Summary */}
              <div className="booking-summary mt-6 border-t pt-4">
                <h4 className="font-semibold text-purple-800 mb-3">
                  Booking Summary
                </h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>Selected Date:</span>
                    <span>December 13, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span>2:00 PM - 3:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Session Type:</span>
                    <span>Heart Program</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Facilitator:</span>
                    <span>Ms. Johnson</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span>On-Site - Therapy Room B</span>
                  </div>
                  <div className="flex justify-between font-semibold text-purple-800">
                    <span>Total Cost:</span>
                    <span>Included in Subscription</span>
                  </div>
                </div>

                <button className="mt-5 w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800 transition">
                  Confirm Booking
                </button>
                <button className="mt-3 w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition">
                  Save as Draft
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookSession;
