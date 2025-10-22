import React, { useEffect, useState } from 'react';

// BookAVisit component
// - Provides a booking UI for on-site or online visits
// - Contains a small calendar widget (DOM-generated) and simple time-slot selection
// - Uses local React state to track the selected options and submission state
export default function BookAVisit() {
  // Form / UI state
  const [visitType, setVisitType] = useState('');
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [timeSlotsVisible, setTimeSlotsVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // On mount: generate the calendar for the current month and set up
    // a simple intersection observer that animates cards into view.
    // Note: generateCalendar manipulates the DOM directly (keeps parity
    // with the original HTML implementation). A future refactor could
    // render the calendar fully via React state instead.
    generateCalendar();

    // animate option/contact cards on mount
    const cards = document.querySelectorAll('.option-card, .contact-card');
    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Reveal the card when it scrolls into view
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // generateCalendar: creates the calendar grid inside the #calendarGrid element
  // This implementation directly manipulates DOM nodes to create day cells.
  // Pros: quick port from original HTML/JS. Cons: not idiomatic React — consider
  // a state-driven render if you need more complex interactions later.
  function generateCalendar() {
    const grid = document.getElementById('calendarGrid');
    const monthDisplay = document.getElementById('currentMonth');
    if (!grid || !monthDisplay) return;

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    monthDisplay.textContent = new Date(year, month).toLocaleDateString('en-US', {
      month: 'long', year: 'numeric'
    });

    grid.innerHTML = '';

    // Day-of-week headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
      const dayHeader = document.createElement('div');
      dayHeader.className = 'calendar-day font-bold bg-slate-700 text-white p-2';
      dayHeader.textContent = day;
      grid.appendChild(dayHeader);
    });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      const emptyDay = document.createElement('div');
      emptyDay.className = 'calendar-day disabled p-4';
      grid.appendChild(emptyDay);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement('div');
      dayElement.className = 'calendar-day available p-4 cursor-pointer hover:bg-slate-100';
      dayElement.textContent = day;
      const datasetDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      dayElement.dataset.date = datasetDate;

      const dayDate = new Date(year, month, day);
      if (dayDate < new Date().setHours(0, 0, 0, 0)) {
        dayElement.classList.remove('available');
        dayElement.classList.add('disabled');
      }

      // Click handler for each day cell: mark it selected and reveal time slots
      dayElement.addEventListener('click', function () {
        if (!this.classList.contains('disabled')) {
          document.querySelectorAll('.calendar-day.selected').forEach(d => d.classList.remove('selected'));
          this.classList.add('selected');
          setSelectedDate(this.dataset.date);
          setTimeSlotsVisible(true);
        }
      });

      grid.appendChild(dayElement);
    }
  }

  function prevMonth() {
    setCurrentDate(prev => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() - 1);
      return d;
    });
    setTimeout(generateCalendar, 0);
    setTimeSlotsVisible(false);
  }

  function nextMonth() {
    setCurrentDate(prev => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() + 1);
      return d;
    });
    setTimeout(generateCalendar, 0);
    setTimeSlotsVisible(false);
  }

  function handleAgeSelect(age) {
    // Toggle age tag selection (clicking again deselects)
    setSelectedAge(age === selectedAge ? null : age);
  }

  function handleTimeSelect(time) {
    // Choose a time slot for the selected date
    setSelectedTime(time);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!visitType || !e.target.parentName.value || !e.target.email.value || !e.target.phone.value) {
      alert('Please fill in all required fields.');
      return;
    }
    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time for your visit.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      alert('Visit scheduled successfully! You will receive a confirmation email shortly.');
      setSubmitting(false);
      e.target.reset();
      document.querySelectorAll('.calendar-day.selected').forEach(d => d.classList.remove('selected'));
      document.querySelectorAll('.time-slot.selected').forEach(s => s.classList.remove('selected'));
      document.querySelectorAll('.age-tag.selected').forEach(t => t.classList.remove('selected'));
      setSelectedDate(null);
      setSelectedTime(null);
      setTimeSlotsVisible(false);
    }, 1200);
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="header bg-white shadow-sm">
        <nav className="nav-container container mx-auto flex items-center justify-between p-4">
          <a href="/" className="logo inline-flex items-center">
            <img src="https://i.postimg.cc/9QhL2Tz3/2022-12-10-Malaika-House-Name-only-png.png" alt="Malaika House Logo" className="h-10" />
          </a>
          <ul className="nav-menu flex gap-4">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/what-we-offer" className="hover:underline">What We Offer</a></li>
            <li><a href="/our-story" className="hover:underline">Our Story</a></li>
            <li><a href="/staff-supporters" className="hover:underline">Staff & Supporters</a></li>
            <li><a href="/parent-information" className="hover:underline">Parent Information</a></li>
            <li><a href="/book-a-visit" className="font-semibold">Book a Visit</a></li>
            <li><a href="/contact-us" className="hover:underline">Contact Us</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="page-header bg-indigo-700 text-white py-14">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold">Book a Visit</h1>
            <p className="mt-2">Schedule your visit to experience Malaika House firsthand and discover how we can support your child's unique learning journey</p>
          </div>
        </section>

        <section className="booking-options py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold">Visit Options</h2>
            <p className="text-slate-600">Choose the format that works best for your family</p>

            <div className="options-grid grid md:grid-cols-2 gap-6 mt-6">
              <div className="option-card border rounded-lg p-4 shadow-sm">
                <div className="option-header on-site flex items-center gap-3">
                  <div className="option-icon text-2xl">🏠</div>
                  <div>
                    <div className="option-title font-semibold">On-Site Visit</div>
                    <div className="option-subtitle text-sm text-slate-500">Experience our facility in person</div>
                  </div>
                </div>
                <div className="option-content mt-4">
                  <ul className="option-features list-disc pl-5 space-y-1 text-sm">
                    <li>Tour our learning spaces</li>
                    <li>Meet our team in person</li>
                    <li>Observe programs in action</li>
                    <li>Child can experience environment</li>
                    <li>Hands-on activity demonstration</li>
                    <li>Face-to-face consultation</li>
                  </ul>
                  <button onClick={() => { setVisitType('onsite'); document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="option-cta mt-4 bg-indigo-600 text-white px-4 py-2 rounded">Book On-Site Visit</button>
                </div>
              </div>

              <div className="option-card border rounded-lg p-4 shadow-sm">
                <div className="option-header flex items-center gap-3">
                  <div className="option-icon text-2xl">💻</div>
                  <div>
                    <div className="option-title font-semibold">Online Consultation</div>
                    <div className="option-subtitle text-sm text-slate-500">Connect from the comfort of home</div>
                  </div>
                </div>
                <div className="option-content mt-4">
                  <ul className="option-features list-disc pl-5 space-y-1 text-sm">
                    <li>Virtual facility tour</li>
                    <li>Video consultation with staff</li>
                    <li>Program overview presentation</li>
                    <li>Q&A session</li>
                    <li>Flexible scheduling</li>
                    <li>Follow-up resources provided</li>
                  </ul>
                  <button onClick={() => { setVisitType('online'); document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="option-cta mt-4 bg-indigo-600 text-white px-4 py-2 rounded">Book Online Visit</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="booking-form" className="booking-form-section py-12 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="form-container max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-6">Visit Booking Form</h2>

              <form id="visitBookingForm" onSubmit={handleSubmit}>
                <div className="form-section mb-6">
                  <h3 className="font-medium">Visit Type</h3>
                  <div className="form-group mt-2">
                    <label htmlFor="visitType" className="block text-sm">Visit Type</label>
                    <select id="visitType" name="visitType" value={visitType} onChange={(e) => setVisitType(e.target.value)} required className="mt-1 block w-full border rounded p-2">
                      <option value="">Select visit type...</option>
                      <option value="onsite">On-Site Visit</option>
                      <option value="online">Online Consultation</option>
                    </select>
                  </div>
                </div>

                <div className="form-section mb-6">
                  <h3 className="font-medium">Visit Preferences</h3>
                  <div className="filters mt-3 grid md:grid-cols-2 gap-4">
                    <div className="filter-group">
                      <label className="block">Age Group</label>
                      <div className="age-groups flex gap-2 mt-2">
                        <div className={`age-tag cursor-pointer px-3 py-1 rounded ${selectedAge === 'early-years' ? 'bg-indigo-600 text-white' : 'bg-slate-100'}`} onClick={() => handleAgeSelect('early-years')}>Early Years (3-6)</div>
                        <div className={`age-tag cursor-pointer px-3 py-1 rounded ${selectedAge === 'primary' ? 'bg-indigo-600 text-white' : 'bg-slate-100'}`} onClick={() => handleAgeSelect('primary')}>Primary (7-11)</div>
                        <div className={`age-tag cursor-pointer px-3 py-1 rounded ${selectedAge === 'secondary' ? 'bg-indigo-600 text-white' : 'bg-slate-100'}`} onClick={() => handleAgeSelect('secondary')}>Secondary (12-16)</div>
                        <div className={`age-tag cursor-pointer px-3 py-1 rounded ${selectedAge === 'teen' ? 'bg-indigo-600 text-white' : 'bg-slate-100'}`} onClick={() => handleAgeSelect('teen')}>Teen (17+)</div>
                      </div>
                    </div>
                    <div className="filter-group">
                      <label htmlFor="programInterest" className="block text-sm">Program Interest</label>
                      <select id="programInterest" name="programInterest" className="mt-1 block w-full border rounded p-2">
                        <option value="">Select program...</option>
                        <option value="heart-program">Heart Program</option>
                        <option value="clubs">Club Programs</option>
                        <option value="sessions">Malaika House Sessions</option>
                        <option value="general">General Information</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-section mb-6">
                  <h3 className="font-medium">Contact Information</h3>
                  <div className="form-row grid md:grid-cols-2 gap-4 mt-3">
                    <div className="form-group">
                      <label htmlFor="parentName" className="block text-sm">Parent/Guardian Name *</label>
                      <input type="text" id="parentName" name="parentName" required className="mt-1 block w-full border rounded p-2" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="block text-sm">Email Address *</label>
                      <input type="email" id="email" name="email" required className="mt-1 block w-full border rounded p-2" />
                    </div>
                  </div>
                  <div className="form-row grid md:grid-cols-2 gap-4 mt-3">
                    <div className="form-group">
                      <label htmlFor="phone" className="block text-sm">Phone Number *</label>
                      <input type="tel" id="phone" name="phone" required className="mt-1 block w-full border rounded p-2" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="childName" className="block text-sm">Child's Name</label>
                      <input type="text" id="childName" name="childName" className="mt-1 block w-full border rounded p-2" />
                    </div>
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="childAge" className="block text-sm">Child's Age</label>
                    <input type="number" id="childAge" name="childAge" min="3" max="18" className="mt-1 block w-32 border rounded p-2" />
                  </div>
                </div>

                <div className="form-section mb-6">
                  <h3 className="font-medium">Schedule Your Visit</h3>
                  <div className="calendar-container mt-3">
                    <div className="calendar-header flex items-center justify-between mb-3">
                      <button type="button" onClick={prevMonth} className="calendar-nav px-3 py-1 border rounded">← Previous</button>
                      <div id="currentMonth" className="calendar-month text-lg font-medium">{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
                      <button type="button" onClick={nextMonth} className="calendar-nav px-3 py-1 border rounded">Next →</button>
                    </div>
                    <div id="calendarGrid" className="calendar-grid grid grid-cols-7 gap-1 bg-white border rounded-lg p-2"></div>
                    {timeSlotsVisible && (
                      <div id="timeSlots" className="time-slots grid grid-cols-2 gap-2 mt-4">
                        {['09:00', '10:30', '14:00', '15:30'].map(t => (
                          <div key={t} className={`time-slot p-3 border rounded cursor-pointer ${selectedTime === t ? 'bg-indigo-600 text-white' : ''}`} data-time={t} onClick={() => handleTimeSelect(t)}>{formatTime(t)}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-section mb-6">
                  <h3 className="font-medium">Additional Information</h3>
                  <div className="form-group mt-2">
                    <label htmlFor="specialNeeds" className="block text-sm">Special Needs or Accommodations</label>
                    <textarea id="specialNeeds" name="specialNeeds" placeholder="Please let us know about any specific needs, interests, or concerns we should be aware of..." className="mt-1 block w-full border rounded p-2" />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="questions" className="block text-sm">Questions or Comments</label>
                    <textarea id="questions" name="questions" placeholder="Any questions you'd like us to address during your visit..." className="mt-1 block w-full border rounded p-2" />
                  </div>
                </div>

                <div className="submit-section">
                  <button type="submit" className="submit-btn bg-indigo-600 text-white px-4 py-2 rounded" disabled={submitting}>{submitting ? 'Scheduling...' : 'Schedule Visit'}</button>
                  <p className="mt-4 text-indigo-600 text-sm">You will receive a confirmation email with visit details and any preparation materials.</p>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section className="contact-info py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold">Need Help Booking?</h2>
            <p className="text-slate-600">Our team is here to help you schedule the perfect visit for your family</p>

            <div className="contact-grid grid md:grid-cols-3 gap-4 mt-6">
              <div className="contact-card border rounded-lg p-4 text-center">
                <div className="contact-icon text-3xl">📞</div>
                <h4 className="font-semibold mt-2">Call Us</h4>
                <p className="mt-1">+27 (0) 123 456 789<br />Monday - Friday, 8AM - 5PM</p>
              </div>
              <div className="contact-card border rounded-lg p-4 text-center">
                <div className="contact-icon text-3xl">✉️</div>
                <h4 className="font-semibold mt-2">Email Us</h4>
                <p className="mt-1">visits@malaikahouse.co.za<br />We respond within 24 hours</p>
              </div>
              <div className="contact-card border rounded-lg p-4 text-center">
                <div className="contact-icon text-3xl">📍</div>
                <h4 className="font-semibold mt-2">Visit Us</h4>
                <p className="mt-1">123 Learning Street<br />Cape Town, South Africa</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer bg-slate-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Malaika House. All rights reserved. | We look forward to meeting you and your family.</p>
        </div>
      </footer>
    </div>
  );

  function formatTime(t) {
    const [hh, mm] = t.split(':').map(Number);
    const date = new Date();
    date.setHours(hh, mm);
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }
}
