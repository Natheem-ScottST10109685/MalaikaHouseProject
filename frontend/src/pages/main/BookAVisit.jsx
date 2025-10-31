import React, { useEffect, useMemo, useRef, useState } from "react";
import AccessibilityPanel from "../../components/public/AccessibilityPanel";

export default function BookAVisit() {
  const [visitType, setVisitType] = useState("");
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [calDate, setCalDate] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });

  const observerRef = useRef(null);

  useEffect(() => {
    const opts = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, opts);
    document.querySelectorAll(".reveal").forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  const todayYMD = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return toYMD(d);
  }, []);

  function toYMD(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  function fromYMD(ymd) {
    const [y, m, d] = ymd.split("-").map(Number);
    return new Date(y, m - 1, d, 12, 0, 0, 0);
  }

  const monthLabel = useMemo(
    () =>
      calDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
    [calDate]
  );

  const calendarCells = useMemo(() => {
    const start = new Date(calDate.getFullYear(), calDate.getMonth(), 1);
    const end = new Date(calDate.getFullYear(), calDate.getMonth() + 1, 0);
    const firstWeekday = start.getDay();
    const daysInMonth = end.getDate();

    const cells = [];
    const headers = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    cells.push(
      ...headers.map((h) => ({
        type: "header",
        label: h,
        key: `h-${h}`,
      }))
    );

    for (let i = 0; i < firstWeekday; i++) {
      cells.push({ type: "blank", key: `b-${i}` });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(calDate.getFullYear(), calDate.getMonth(), d);
      const ymd = toYMD(dateObj);
      const isPast = ymd < todayYMD;
      cells.push({
        type: "day",
        ymd,
        label: d,
        disabled: isPast,
        key: ymd,
      });
    }
    return cells;
  }, [calDate, todayYMD]);

  function prevMonth() {
    setCalDate((prev) => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() - 1);
      return d;
    });
    setSelectedDate(null);
    setSelectedTime(null);
  }

  function nextMonth() {
    setCalDate((prev) => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() + 1);
      return d;
    });
    setSelectedDate(null);
    setSelectedTime(null);
  }

  function handleDayClick(cell) {
    if (cell.disabled) return;
    setSelectedDate(cell.ymd === selectedDate ? null : cell.ymd);
    setSelectedTime(null);
  }

  function handleAgeSelect(age) {
    setSelectedAge((prev) => (prev === age ? null : age));
  }

  function handleTimeSelect(t) {
    setSelectedTime(t);
  }

  function handleSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;

  const parentName = form.parentName.value?.trim();
  const email = form.email.value?.trim();
  const phone = form.phone.value?.trim();
  const programInterest = form.programInterest.value?.trim() || "";
  const childName = form.childName.value?.trim() || "";
  const childAge = form.childAge.value ? Number(form.childAge.value) : null;
  const specialNeeds = form.specialNeeds.value?.trim() || "";
  const questions = form.questions.value?.trim() || "";

  if (!visitType || !parentName || !email || !phone) {
    alert("Please fill in all required fields.");
    return;
  }
  if (!selectedDate || !selectedTime) {
    alert("Please select a date and time for your visit.");
    return;
  }

  const payload = {
    visitType,
    ageGroup: selectedAge,
    date: selectedDate,
    time: selectedTime,
    parentName,
    email,
    phone,
    programInterest,
    childName,
    childAge,
    specialNeeds,
    questions,
    source: "BookAVisit",
    submittedAt: new Date().toISOString(),
  };

  setSubmitting(true);
  fetch("/api/public/visit-requests", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then(async (res) => {
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to submit booking.");
      }
      return res.json();
    })
    .then(() => {
      alert("Visit scheduled successfully! A confirmation email has been sent.");
      form.reset();
      setVisitType("");
      setSelectedAge(null);
      setSelectedDate(null);
      setSelectedTime(null);
    })
    .catch((err) => {
      console.error(err);
      alert(err.message || "Could not submit your booking. Please try again.");
    })
    .finally(() => setSubmitting(false));
}

  const timeSlots = ["09:00", "10:30", "14:00", "15:30"];
  const card = "card rounded-2xl bg-white shadow-md ring-1 ring-slate-200 p-5 transition hover:shadow-lg";

  return (
    <div className="min-h-screen bg-white text-slate-900" data-tts>
      <AccessibilityPanel
        position="bottom-right"
        storagePrefix="a11y"
        ttsLang="en-US"
        defaultFontPx={16}
        minFontPx={12}
        maxFontPx={24}
        showTTS
        showContrast
        showTextSize
      />

      {/* Header / Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white py-16" data-tts>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Book a Visit</h1>
          <p className="mt-4 max-w-2xl mx-auto text-indigo-50">
            Schedule your visit to experience Malaika House firsthand and discover how we can support your child's
            unique learning journey.
          </p>
        </div>
      </section>

      {/* Options */}
      <section className="py-12" data-tts>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold">Visit Options</h2>
          <p className="text-slate-600">Choose the format that works best for your family.</p>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className={`${card} reveal`}>
              <div className="flex items-center gap-3">
                <div className="text-2xl">🏠</div>
                <div>
                  <div className="font-semibold">On-Site Visit</div>
                  <div className="text-sm text-slate-500">Experience our facility in person</div>
                </div>
              </div>
              <ul className="mt-4 list-disc pl-5 space-y-1 text-sm text-slate-700">
                <li>Tour our learning spaces</li>
                <li>Meet our team in person</li>
                <li>Observe programs in action</li>
                <li>Child can experience environment</li>
                <li>Hands-on activity demonstration</li>
                <li>Face-to-face consultation</li>
              </ul>
              <button
                data-a11y-ignore="1"
                onClick={() => {
                  setVisitType("onsite");
                  document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="mt-4 rounded-md bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
              >
                Book On-Site Visit
              </button>
            </div>

            <div className={`${card} reveal`}>
              <div className="flex items-center gap-3">
                <div className="text-2xl">💻</div>
                <div>
                  <div className="font-semibold">Online Consultation</div>
                  <div className="text-sm text-slate-500">Connect from the comfort of home</div>
                </div>
              </div>
              <ul className="mt-4 list-disc pl-5 space-y-1 text-sm text-slate-700">
                <li>Virtual facility tour</li>
                <li>Video consultation with staff</li>
                <li>Program overview presentation</li>
                <li>Q&amp;A session</li>
                <li>Flexible scheduling</li>
                <li>Follow-up resources provided</li>
              </ul>
              <button
                data-a11y-ignore="1"
                onClick={() => {
                  setVisitType("online");
                  document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="mt-4 rounded-md bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
              >
                Book Online Visit
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Booking form */}
      <section id="booking-form" className="py-12 bg-slate-50" data-tts>
        <div className="max-w-6xl mx-auto px-4">
          <div className={`${card} reveal max-w-4xl mx-auto`}>
            <h2 className="text-2xl font-semibold mb-6">Visit Booking Form</h2>

            <form onSubmit={handleSubmit} data-a11y-ignore="1">
              {/* Visit Type */}
              <div className="mb-6">
                <h3 className="font-medium">Visit Type</h3>
                <label htmlFor="visitType" className="mt-2 block text-sm">
                  Visit Type
                </label>
                <select
                  id="visitType"
                  name="visitType"
                  value={visitType}
                  onChange={(e) => setVisitType(e.target.value)}
                  required
                  className="mt-1 block w-full rounded border p-2"
                >
                  <option value="">Select visit type...</option>
                  <option value="onsite">On-Site Visit</option>
                  <option value="online">Online Consultation</option>
                </select>
              </div>

              {/* Preferences */}
              <div className="mb-6">
                <h3 className="font-medium">Visit Preferences</h3>
                <div className="mt-3 grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block">Age Group</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {[
                        ["early-years", "Early Years (3-6)"],
                        ["primary", "Primary (7-11)"],
                        ["secondary", "Secondary (12-16)"],
                        ["teen", "Teen (17+)"],
                      ].map(([key, label]) => (
                        <button
                          type="button"
                          key={key}
                          onClick={() => handleAgeSelect(key)}
                          className={`age-tag rounded px-3 py-1 text-sm ${
                            selectedAge === key ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-800"
                          }`}
                          data-a11y-ignore="1"
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="programInterest" className="block text-sm">
                      Program Interest
                    </label>
                    <select id="programInterest" name="programInterest" className="mt-1 block w-full rounded border p-2">
                      <option value="">Select program...</option>
                      <option value="heart-program">Heart Program</option>
                      <option value="clubs">Club Programs</option>
                      <option value="sessions">Malaika House Sessions</option>
                      <option value="general">General Information</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-6">
                <h3 className="font-medium">Contact Information</h3>
                <div className="mt-3 grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="parentName" className="block text-sm">
                      Parent/Guardian Name *
                    </label>
                    <input id="parentName" name="parentName" required className="mt-1 block w-full rounded border p-2" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm">
                      Email Address *
                    </label>
                    <input type="email" id="email" name="email" required className="mt-1 block w-full rounded border p-2" />
                  </div>
                </div>
                <div className="mt-3 grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm">
                      Phone Number *
                    </label>
                    <input id="phone" name="phone" required className="mt-1 block w-full rounded border p-2" />
                  </div>
                  <div>
                    <label htmlFor="childName" className="block text-sm">
                      Child's Name
                    </label>
                    <input id="childName" name="childName" className="mt-1 block w-full rounded border p-2" />
                  </div>
                </div>
                <div className="mt-3">
                  <label htmlFor="childAge" className="block text-sm">
                    Child's Age
                  </label>
                  <input type="number" id="childAge" name="childAge" min="3" max="18" className="mt-1 block w-32 rounded border p-2" />
                </div>
              </div>

              {/* Schedule */}
              <div className="mb-6">
                <h3 className="font-medium">Schedule Your Visit</h3>

                <div className="mt-3">
                  <div className="mb-3 flex items-center justify-between" data-a11y-ignore="1">
                    <button type="button" onClick={prevMonth} className="rounded border px-3 py-1">
                      ← Previous
                    </button>
                    <div className="text-lg font-medium">{monthLabel}</div>
                    <button type="button" onClick={nextMonth} className="rounded border px-3 py-1">
                      Next →
                    </button>
                  </div>

                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 gap-1 rounded-lg border bg-white p-2" data-a11y-ignore="1">
                    {calendarCells.map((cell) => {
                      if (cell.type === "header") {
                        return (
                          <div
                            key={cell.key}
                            className="p-2 text-center text-sm font-semibold text-white bg-slate-700 rounded"
                          >
                            {cell.label}
                          </div>
                        );
                      }
                      if (cell.type === "blank") {
                        return <div key={cell.key} className="p-4 rounded opacity-0" />;
                      }
                      const isSelected = selectedDate === cell.ymd;
                      const base = "p-3 text-center rounded cursor-pointer transition select-none";
                      const disabled = cell.disabled
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                        : "hover:bg-slate-100";
                      const selected = isSelected ? "bg-indigo-600 text-white hover:bg-indigo-600" : "";
                      return (
                        <div
                          key={cell.key}
                          className={`${base} ${disabled} ${selected}`}
                          onClick={() => handleDayClick(cell)}
                          aria-disabled={cell.disabled}
                        >
                          {cell.label}
                        </div>
                      );
                    })}
                  </div>

                  {/* Time slots */}
                  {selectedDate && (
                    <div className="mt-4 grid grid-cols-2 gap-2" data-a11y-ignore="1">
                      {timeSlots.map((t) => {
                        const isSel = selectedTime === t;
                        return (
                          <button
                            type="button"
                            key={t}
                            onClick={() => handleTimeSelect(t)}
                            className={`time-slot rounded border p-3 text-center ${
                              isSel ? "bg-indigo-600 text-white border-indigo-600" : "hover:bg-slate-100"
                            }`}
                          >
                            {formatTime(t)}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Info */}
              <div className="mb-6">
                <h3 className="font-medium">Additional Information</h3>
                <div className="mt-2">
                  <label htmlFor="specialNeeds" className="block text-sm">
                    Special Needs or Accommodations
                  </label>
                  <textarea
                    id="specialNeeds"
                    name="specialNeeds"
                    placeholder="Please let us know about any specific needs, interests, or concerns we should be aware of..."
                    className="mt-1 block w-full rounded border p-2"
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor="questions" className="block text-sm">
                    Questions or Comments
                  </label>
                  <textarea
                    id="questions"
                    name="questions"
                    placeholder="Any questions you'd like us to address during your visit..."
                    className="mt-1 block w-full rounded border p-2"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="rounded bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
                  disabled={submitting}
                >
                  {submitting ? "Scheduling..." : "Schedule Visit"}
                </button>
                <p className="mt-4 text-sm text-indigo-600">
                  You will receive a confirmation email with visit details and any preparation materials.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact info */}
      <section className="py-12" data-tts>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold">Need Help Booking?</h2>
          <p className="text-slate-600">Our team is here to help you schedule the perfect visit for your family.</p>

          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <div className="card reveal text-center" data-tts>
              <div className="text-3xl">📞</div>
              <h4 className="mt-2 font-semibold">Call Us</h4>
              <p className="mt-1 text-sm">
                +27 (0) 123 456 789
                <br />
                Monday – Friday, 8AM – 5PM
              </p>
            </div>
            <div className="card reveal text-center" data-tts>
              <div className="text-3xl">✉️</div>
              <h4 className="mt-2 font-semibold">Email Us</h4>
              <p className="mt-1 text-sm">
                visits@malaikahouse.co.za
                <br />
                We respond within 24 hours
              </p>
            </div>
            <div className="card reveal text-center" data-tts>
              <div className="text-3xl">📍</div>
              <h4 className="mt-2 font-semibold">Visit Us</h4>
              <p className="mt-1 text-sm">
                123 Learning Street
                <br />
                Cape Town, South Africa
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  function formatTime(t) {
    const [hh, mm] = t.split(":").map(Number);
    const d = new Date();
    d.setHours(hh, mm, 0, 0);
    return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  }
}