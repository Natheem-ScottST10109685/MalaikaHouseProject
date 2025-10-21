import { useState } from "react";

export default function AutoRenewal() {
  const [autoRenewal, setAutoRenewal] = useState(true);
  const [paymentRetry, setPaymentRetry] = useState(true);
  const [gracePeriod, setGracePeriod] = useState(true);
  const [cardUpdate, setCardUpdate] = useState(true);
  const [currencyLock, setCurrencyLock] = useState(true);
  const [renewalDate, setRenewalDate] = useState("1");

  const handleToggle = (setter, name) => {
    setter((prev) => {
      const newValue = !prev;
      if (!newValue) {
        switch (name) {
          case "autoRenewal":
            if (
              !confirm(
                "Disable auto-renewal?\n\nYour subscription will not automatically renew on December 1, 2025. You can still manually renew before the expiration date."
              )
            )
              return prev;
            alert(
              "Auto-renewal disabled. You will receive reminders before your subscription expires."
            );
            break;
          case "paymentRetry":
            alert(
              "Payment retry disabled. Make sure your payment method is valid to avoid service interruption."
            );
            break;
          case "gracePeriod":
            alert(
              "Grace period disabled. Service will be suspended immediately if payment fails."
            );
            break;
          case "cardUpdate":
            alert(
              "Automatic card updates disabled. You will need to manually update expired cards."
            );
            break;
          default:
            break;
        }
      }
      return newValue;
    });
  };

  return (
    <div className="flex min-h-screen font-sans bg-off-white text-[var(--dark-purple)]">
      {/* Sidebar */}
      <aside className="bg-gradient-to-b from-[var(--sage-green)] to-[var(--slate-blue)] text-white w-72 min-w-72 h-screen sticky top-0 overflow-y-auto">
        <div className="p-6 bg-white/10 backdrop-blur-md border-b border-white/10">
          <a href="index.html">
            <img
              src="https://i.postimg.cc/9QhL2Tz3/2022-12-10-Malaika-House-Name-only-png.png"
              alt="Malaika House Logo"
              className="h-10"
            />
          </a>
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="font-semibold">Sarah Mitchell</div>
            <div className="text-sm opacity-80">Internal Parent Dashboard</div>
            <div className="bg-white/20 p-3 rounded-lg mt-3">
              <div className="font-semibold">Emma Mitchell (Age 8)</div>
              <div className="text-sm opacity-90">Heart Program Member</div>
            </div>
          </div>
        </div>

        <nav className="py-5 text-sm">
          <div className="mb-6">
            <div className="uppercase text-xs px-5 opacity-70 font-semibold mb-2">
              Overview
            </div>
            <a href="#" className="block px-5 py-2 hover:bg-white/20">
              📊 Dashboard
            </a>
            <a href="#" className="block px-5 py-2 hover:bg-white/20">
              📈 Child Progress
            </a>
          </div>

          <div className="mb-6">
            <div className="uppercase text-xs px-5 opacity-70 font-semibold mb-2">
              Subscription
            </div>
            <a href="#" className="block px-5 py-2 hover:bg-white/20">
              💳 Subscription Management
            </a>
            <a href="#" className="block px-5 py-2 hover:bg-white/20">
              💰 Payment History
            </a>
            <a
              href="#"
              className="block px-5 py-2 bg-white/20 border-l-4 border-white"
            >
              🔄 Auto-Renewal
            </a>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-[var(--off-white)]">
        <div className="bg-white shadow-md p-6 sticky top-0 z-50 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[var(--dark-purple)]">
            Auto-Renewal Settings
          </h1>
        </div>

        <div className="flex-1 p-8 overflow-y-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-[var(--lavender)] to-[var(--sage-green)] text-white p-8 rounded-2xl mb-8 grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Subscription Auto-Renewal</h2>
              <p className="opacity-90 mb-4">
                Manage your automatic subscription renewal preferences and billing
                settings
              </p>
              <div className="flex items-center gap-3 bg-white/20 px-5 py-2 rounded-full w-fit">
                <span
                  className={`w-3 h-3 rounded-full ${
                    autoRenewal ? "bg-green-400" : "bg-red-400"
                  } animate-pulse`}
                ></span>
                <span>
                  {autoRenewal ? "Auto-Renewal Active" : "Auto-Renewal Disabled"}
                </span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-1">Dec 1</div>
              <div className="opacity-90 text-sm">Next Renewal Date</div>
            </div>
          </div>

          {/* Settings Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Renewal Settings */}
            <div className="bg-white rounded-xl shadow-md p-6 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--sage-green)] to-[var(--slate-blue)]"></div>
              <h3 className="flex items-center gap-3 text-lg font-semibold mb-4">
                <span className="bg-[var(--sage-green)] text-white w-9 h-9 flex items-center justify-center rounded-md">
                  🔄
                </span>
                Renewal Settings
              </h3>

              {[
                {
                  label: "Auto-Renewal",
                  desc: "Automatically renew your subscription each month",
                  state: autoRenewal,
                  set: setAutoRenewal,
                  key: "autoRenewal",
                },
                {
                  label: "Payment Retry",
                  desc: "Retry failed payments automatically up to 3 times",
                  state: paymentRetry,
                  set: setPaymentRetry,
                  key: "paymentRetry",
                },
                {
                  label: "Grace Period",
                  desc: "Continue service for 5 days if payment fails",
                  state: gracePeriod,
                  set: setGracePeriod,
                  key: "gracePeriod",
                },
              ].map((s) => (
                <div
                  key={s.key}
                  className="flex justify-between items-center py-4 border-b border-[var(--off-white)] last:border-none"
                >
                  <div>
                    <h4 className="font-semibold">{s.label}</h4>
                    <p className="text-sm text-[var(--accent-purple)]">
                      {s.desc}
                    </p>
                  </div>
                  <label className="relative inline-block w-14 h-8">
                    <input
                      type="checkbox"
                      checked={s.state}
                      onChange={() => handleToggle(s.set, s.key)}
                      className="opacity-0 w-0 h-0"
                    />
                    <span
                      className={`absolute cursor-pointer inset-0 rounded-full transition ${
                        s.state
                          ? "bg-[var(--sage-green)]"
                          : "bg-[var(--light-gray)]"
                      }`}
                    >
                      <span
                        className={`absolute left-1 bottom-1 bg-white w-6 h-6 rounded-full transition ${
                          s.state ? "translate-x-6" : ""
                        }`}
                      ></span>
                    </span>
                  </label>
                </div>
              ))}

              <div className="mt-4">
                <label className="font-medium block mb-2">
                  Renewal Date Preference:
                </label>
                <select
                  value={renewalDate}
                  onChange={(e) => {
                    setRenewalDate(e.target.value);
                    alert(
                      `Renewal date updated to: ${
                        e.target.options[e.target.selectedIndex].text
                      }\n\nThis change will take effect after the next billing cycle.`
                    );
                  }}
                  className="border-2 border-[var(--off-white)] rounded-md p-3 w-full focus:border-[var(--sage-green)]"
                >
                  <option value="1">1st of each month</option>
                  <option value="15">15th of each month</option>
                  <option value="current">Same date as original signup</option>
                </select>
              </div>

              <button
                onClick={() =>
                  alert(
                    "Renewal settings saved successfully!\n\nChanges will take effect immediately and apply to your next billing cycle."
                  )
                }
                className="mt-6 w-full bg-[var(--sage-green)] hover:bg-[var(--slate-blue)] text-white py-3 rounded-md font-semibold"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  if (
                    confirm(
                      "Disable Auto-Renewal?\n\nThis will prevent automatic renewal of your subscription. You can manually renew before expiration or re-enable auto-renewal at any time."
                    )
                  ) {
                    setAutoRenewal(false);
                    alert(
                      "Auto-renewal has been disabled.\n\nYou will receive reminders before expiration."
                    );
                  }
                }}
                className="mt-3 w-full bg-red-50 text-pink-700 border border-red-200 py-3 rounded-md font-semibold"
              >
                Disable Auto-Renewal
              </button>
            </div>

            {/* Payment Settings */}
            <div className="bg-white rounded-xl shadow-md p-6 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--sage-green)] to-[var(--slate-blue)]"></div>
              <h3 className="flex items-center gap-3 text-lg font-semibold mb-4">
                <span className="bg-[var(--sage-green)] text-white w-9 h-9 flex items-center justify-center rounded-md">
                  💳
                </span>
                Payment Settings
              </h3>

              <div className="mb-4">
                <label className="font-medium block mb-2">
                  Primary Payment Method:
                </label>
                <select className="border-2 border-[var(--off-white)] rounded-md p-3 w-full">
                  <option>Visa ending in 4532</option>
                  <option>MasterCard ending in 8901</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="font-medium block mb-2">
                  Backup Payment Method:
                </label>
                <select className="border-2 border-[var(--off-white)] rounded-md p-3 w-full">
                  <option>MasterCard ending in 8901</option>
                  <option>No backup method</option>
                </select>
              </div>

              {[
                {
                  label: "Update Card Automatically",
                  desc: "Update expired cards with new details from bank",
                  state: cardUpdate,
                  set: setCardUpdate,
                  key: "cardUpdate",
                },
                {
                  label: "Currency Protection",
                  desc: "Lock pricing in ZAR to avoid exchange rate fluctuations",
                  state: currencyLock,
                  set: setCurrencyLock,
                  key: "currencyLock",
                },
              ].map((s) => (
                <div
                  key={s.key}
                  className="flex justify-between items-center py-4 border-b border-[var(--off-white)] last:border-none"
                >
                  <div>
                    <h4 className="font-semibold">{s.label}</h4>
                    <p className="text-sm text-[var(--accent-purple)]">
                      {s.desc}
                    </p>
                  </div>
                  <label className="relative inline-block w-14 h-8">
                    <input
                      type="checkbox"
                      checked={s.state}
                      onChange={() => handleToggle(s.set, s.key)}
                      className="opacity-0 w-0 h-0"
                    />
                    <span
                      className={`absolute cursor-pointer inset-0 rounded-full transition ${
                        s.state
                          ? "bg-[var(--sage-green)]"
                          : "bg-[var(--light-gray)]"
                      }`}
                    >
                      <span
                        className={`absolute left-1 bottom-1 bg-white w-6 h-6 rounded-full transition ${
                          s.state ? "translate-x-6" : ""
                        }`}
                      ></span>
                    </span>
                  </label>
                </div>
              ))}

              <button
                onClick={() =>
                  alert(
                    "Opening payment method manager...\n\nRedirecting to secure payment portal..."
                  )
                }
                className="mt-6 w-full bg-[var(--off-white)] hover:bg-[var(--light-gray)] text-[var(--dark-purple)] py-3 rounded-md font-semibold"
              >
                Update Payment Methods
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
