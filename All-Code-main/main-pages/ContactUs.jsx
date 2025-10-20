import React, { useEffect, useState } from 'react';

// ContactUs component
// - Contains contact methods, a contact form, FAQ accordion, and location details
// - Simple client-side validation and simulated form submission
export default function ContactUs() {
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Set up FAQ toggle behavior: attach click handlers to elements with .faq-question
    // This mirrors the behavior from the original static page.
    function toggleFAQElement(e) {
      const el = e.currentTarget;
      const answer = el.nextElementSibling;
      const toggle = el.querySelector('.faq-toggle');

      // Close other answers
      document.querySelectorAll('.faq-answer').forEach(otherAnswer => {
        if (otherAnswer !== answer) {
          otherAnswer.classList.remove('active');
          const prev = otherAnswer.previousElementSibling;
          const prevToggle = prev && prev.querySelector('.faq-toggle');
          if (prevToggle) prevToggle.textContent = '+';
        }
      });

      // Toggle this one
      if (answer.classList.contains('active')) {
        answer.classList.remove('active');
        if (toggle) toggle.textContent = '+';
      } else {
        answer.classList.add('active');
        if (toggle) toggle.textContent = '−';
      }
    }

    const questions = document.querySelectorAll('.faq-question');
    questions.forEach(q => q.addEventListener('click', toggleFAQElement));

    return () => questions.forEach(q => q.removeEventListener('click', toggleFAQElement));
  }, []);

  // Form submit handler: performs basic validation and simulates sending
  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const firstName = form.firstName.value.trim();
    const lastName = form.lastName.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!firstName || !lastName || !email || !subject || !message) {
      alert('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn ? submitBtn.textContent : 'Send Message';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }

    setTimeout(() => {
      alert("Thank you for your message! We'll get back to you within 24 hours.");
      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
      setSubmitting(false);
    }, 1500);
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
            <li><a href="/book-a-visit" className="hover:underline">Book a Visit</a></li>
            <li><a href="/contact-us" className="font-semibold">Contact Us</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="page-header bg-indigo-700 text-white py-14">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold">Contact Us</h1>
            <p className="mt-2">We're here to support you and answer any questions about our programs, services, or how Malaika House can help your family</p>
          </div>
        </section>

        <section className="contact-methods py-10">
          <div className="container mx-auto px-4">
            <div className="methods-grid grid md:grid-cols-3 gap-6">
              <div className="method-card border rounded-lg p-6 text-center">
                <div className="method-icon text-3xl">📞</div>
                <h3 className="mt-2 font-semibold">Phone Support</h3>
                <p className="method-details text-sm mt-2">Speak directly with our team for immediate assistance and personalized guidance</p>
                <div className="method-info mt-3 text-sm">
                  <strong>General Inquiries:</strong><br />+27 (0) 123 456 789
                </div>
                <a href="tel:+27123456789" className="method-cta inline-block mt-4 bg-indigo-600 text-white px-4 py-2 rounded">Call Now</a>
              </div>

              <div className="method-card border rounded-lg p-6 text-center">
                <div className="method-icon text-3xl">✉️</div>
                <h3 className="mt-2 font-semibold">Email Support</h3>
                <p className="method-details text-sm mt-2">Send us detailed questions and receive comprehensive responses within 24 hours</p>
                <div className="method-info mt-3 text-sm">
                  <strong>General Information:</strong><br />info@malaikahouse.co.za
                </div>
                <a href="mailto:info@malaikahouse.co.za" className="method-cta inline-block mt-4 bg-indigo-600 text-white px-4 py-2 rounded">Send Email</a>
              </div>

              <div className="method-card border rounded-lg p-6 text-center">
                <div className="method-icon text-3xl">📠</div>
                <h3 className="mt-2 font-semibold">FAX Services</h3>
                <p className="method-details text-sm mt-2">For official documents, forms, and confidential communications</p>
                <div className="method-info mt-3 text-sm">FAX: +27 123 456 790</div>
                <span className="method-cta inline-block mt-4 px-4 py-2 rounded bg-slate-100 text-slate-700">FAX: +27 123 456 790</span>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-form-section py-10 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold">Send Us a Message</h2>
            <p className="text-slate-600">Have a question or need more information? Fill out the form below and we'll get back to you as soon as possible</p>

            <div className="form-container mt-6 max-w-3xl">
              <form id="contactForm" onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm">First Name *</label>
                    <input name="firstName" required className="mt-1 block w-full border rounded p-2" />
                  </div>
                  <div>
                    <label className="block text-sm">Last Name *</label>
                    <input name="lastName" required className="mt-1 block w-full border rounded p-2" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm">Email Address *</label>
                    <input name="email" type="email" required className="mt-1 block w-full border rounded p-2" />
                  </div>
                  <div>
                    <label className="block text-sm">Phone Number</label>
                    <input name="phone" type="tel" className="mt-1 block w-full border rounded p-2" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm">Inquiry Type</label>
                  <select name="inquiryType" className="mt-1 block w-full border rounded p-2">
                    <option value="">Select inquiry type...</option>
                    <option value="general">General Information</option>
                    <option value="heart-program">Heart Program</option>
                    <option value="clubs">Club Programs</option>
                    <option value="sessions">Malaika House Sessions</option>
                    <option value="visit">Schedule a Visit</option>
                    <option value="support">Family Support</option>
                    <option value="partnership">Partnership Opportunities</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm">Subject *</label>
                  <input name="subject" required placeholder="Brief description of your inquiry" className="mt-1 block w-full border rounded p-2" />
                </div>

                <div>
                  <label className="block text-sm">Message *</label>
                  <textarea name="message" required placeholder="Please provide details about your inquiry..." className="mt-1 block w-full border rounded p-2" />
                </div>

                <div>
                  <button type="submit" className="submit-btn bg-indigo-600 text-white px-4 py-2 rounded" disabled={submitting}>{submitting ? 'Sending...' : 'Send Message'}</button>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section className="faq-section py-10">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
            <p className="text-slate-600">Quick answers to common questions about Malaika House and our services</p>

            <div className="faq-container mt-6 space-y-4">
              {/** Each FAQ item uses .faq-question and .faq-answer to enable the DOM-based toggle set up in useEffect */}
              <div className="faq-item bg-white p-4 rounded shadow">
                <div className="faq-question cursor-pointer flex justify-between items-center">
                  <h4 className="font-semibold">How do I know if Malaika House is right for my child?</h4>
                  <span className="faq-toggle">+</span>
                </div>
                <div className="faq-answer mt-2 hidden">
                  <p>The best way is to book a visit! We encourage families to experience our environment firsthand. Our team will discuss your child's needs and help determine if our approach aligns with your goals.</p>
                </div>
              </div>

              <div className="faq-item bg-white p-4 rounded shadow">
                <div className="faq-question cursor-pointer flex justify-between items-center">
                  <h4 className="font-semibold">Do you offer financial assistance or payment plans?</h4>
                  <span className="faq-toggle">+</span>
                </div>
                <div className="faq-answer mt-2 hidden">
                  <p>Yes, we offer sliding scale fees and payment plans based on family circumstances. Please contact us confidentially to discuss options.</p>
                </div>
              </div>

              {/* Additional FAQ items omitted for brevity in the JSX — add as needed */}
            </div>
          </div>
        </section>

        <section className="location-section py-10 bg-slate-50">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-semibold">Visit Our Location</h2>
              <p className="mt-2 text-sm"><strong>Address:</strong><br />123 Learning Street<br />Observatory, Cape Town<br />Western Cape, 7925<br />South Africa</p>
              <p className="mt-2 text-sm"><strong>Parking:</strong> On-site parking available<br /><strong>Accessibility:</strong> Wheelchair accessible facility</p>
            </div>
            <div className="map-placeholder flex items-center justify-center bg-white rounded p-6">
              <div className="text-center">
                <div className="text-5xl mb-3">🗺️</div>
                <p>Interactive Map Integration (add Google Maps or another map provider here)</p>
              </div>
            </div>
          </div>
        </section>

        <section className="emergency-section py-10">
          <div className="container mx-auto px-4">
            <div className="emergency-content bg-white p-6 rounded shadow text-center">
              <h3 className="text-xl font-semibold">Emergency or Urgent Support</h3>
              <p className="mt-2">If you need immediate assistance or have an urgent concern about your child's well-being, please don't hesitate to contact us.</p>
              <div className="emergency-number mt-3 text-2xl font-bold">+27 (0) 123 456 789</div>
              <p className="mt-2 text-sm">For after-hours emergencies, leave a message and we will respond as quickly as possible. For immediate crisis support, please contact local emergency services.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer bg-slate-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Malaika House. All rights reserved. | We're here to support you and your family every step of the way.</p>
        </div>
      </footer>
    </div>
  );
}
