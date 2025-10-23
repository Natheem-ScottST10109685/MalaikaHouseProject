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

      // Close other answers (using Tailwind 'hidden')
      document.querySelectorAll('.faq-answer').forEach(otherAnswer => {
        if (otherAnswer !== answer) {
          otherAnswer.classList.add('hidden');
          const prev = otherAnswer.previousElementSibling;
          const prevToggle = prev && prev.querySelector('.faq-toggle');
          if (prevToggle) prevToggle.textContent = '+';
        }
      });

      // Toggle this one (use hidden class)
      if (answer.classList.contains('hidden')) {
        answer.classList.remove('hidden');
        if (toggle) toggle.textContent = '−';
      } else {
        answer.classList.add('hidden');
        if (toggle) toggle.textContent = '+';
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
        <nav className="container mx-auto px-4 flex items-center justify-between h-20">
          <a href="/" className="logo inline-flex items-center">
            <img src="https://i.postimg.cc/9QhL2Tz3/2022-12-10-Malaika-House-Name-only-png.png" alt="Malaika House Logo" className="h-10" />
          </a>
          <ul className="hidden md:flex gap-6 text-sm font-medium">
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
        <section className="page-header text-white py-14" style={{ background: 'linear-gradient(135deg,#A594C7,#8DB4A8)' }}>
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold">Contact Us</h1>
            <p className="mt-2 max-w-2xl mx-auto">We're here to support you and answer any questions about our programs, services, or how Malaika House can help your family</p>
          </div>
        </section>

        <section className="contact-methods py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="relative bg-gray-50 rounded-2xl p-8 text-center flex flex-col min-h-[420px] hover:-translate-y-2 transition-transform shadow-sm">
                <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8DB4A8] to-[#7B9BC4] rounded-t-2xl" />
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7B9BC4] to-[#A594C7] flex items-center justify-center text-white text-3xl mx-auto mb-4">📞</div>
                <h3 className="mt-2 text-lg font-semibold">Phone Support</h3>
                <p className="text-sm text-[#6B5F7A] mt-2">Speak directly with our team for immediate assistance and personalized guidance</p>
                <div className="bg-white p-4 rounded-lg mt-4 text-sm">
                  <strong>General Inquiries:</strong><br />+27 (0) 123 456 789
                </div>
                <a href="tel:+27123456789" className="mt-6 inline-block bg-[#7B9BC4] text-white px-4 py-2 rounded-full self-center">Call Now</a>
              </div>

              <div className="relative bg-gray-50 rounded-2xl p-8 text-center flex flex-col min-h-[420px] hover:-translate-y-2 transition-transform shadow-sm">
                <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8DB4A8] to-[#7B9BC4] rounded-t-2xl" />
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7B9BC4] to-[#A594C7] flex items-center justify-center text-white text-3xl mx-auto mb-4">✉️</div>
                <h3 className="mt-2 text-lg font-semibold">Email Support</h3>
                <p className="text-sm text-[#6B5F7A] mt-2">Send us detailed questions and receive comprehensive responses within 24 hours</p>
                <div className="bg-white p-4 rounded-lg mt-4 text-sm">
                  <strong>General Information:</strong><br />info@malaikahouse.co.za
                </div>
                <a href="mailto:info@malaikahouse.co.za" className="mt-6 inline-block bg-[#7B9BC4] text-white px-4 py-2 rounded-full self-center">Send Email</a>
              </div>

              <div className="relative bg-gray-50 rounded-2xl p-8 text-center flex flex-col min-h-[420px] hover:-translate-y-2 transition-transform shadow-sm">
                <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8DB4A8] to-[#7B9BC4] rounded-t-2xl" />
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7B9BC4] to-[#A594C7] flex items-center justify-center text-white text-3xl mx-auto mb-4">📠</div>
                <h3 className="mt-2 text-lg font-semibold">FAX Services</h3>
                <p className="text-sm text-[#6B5F7A] mt-2">For official documents, forms, and confidential communications</p>
                <div className="bg-white p-4 rounded-lg mt-4 text-sm">FAX: +27 123 456 790</div>
                <span className="mt-6 inline-block px-4 py-2 rounded-full bg-slate-100 text-slate-700 self-center">FAX: +27 123 456 790</span>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-form-section py-12 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold text-center">Send Us a Message</h2>
            <p className="text-slate-600 text-center mt-2">Have a question or need more information? Fill out the form below and we'll get back to you as soon as possible</p>

            <div className="mt-8 max-w-3xl mx-auto">
              <form id="contactForm" onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-lg">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name *</label>
                    <input name="firstName" required className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#7B9BC4]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name *</label>
                    <input name="lastName" required className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#7B9BC4]" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address *</label>
                    <input name="email" type="email" required className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#7B9BC4]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input name="phone" type="tel" className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#7B9BC4]" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Inquiry Type</label>
                  <select name="inquiryType" className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#7B9BC4]">
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
                  <label className="block text-sm font-medium text-gray-700">Subject *</label>
                  <input name="subject" required placeholder="Brief description of your inquiry" className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#7B9BC4]" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Message *</label>
                  <textarea name="message" required placeholder="Please provide details about your inquiry..." className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#7B9BC4] h-36" />
                </div>

                <div className="text-center">
                  <button type="submit" className="bg-gradient-to-r from-[#8DB4A8] to-[#7B9BC4] text-white px-6 py-3 rounded-full font-semibold" disabled={submitting}>{submitting ? 'Sending...' : 'Send Message'}</button>
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
              <div className="bg-white p-4 rounded-2xl shadow">
                <div className="faq-question cursor-pointer flex justify-between items-center">
                  <h4 className="font-semibold">How do I know if Malaika House is right for my child?</h4>
                  <span className="faq-toggle text-xl">+</span>
                </div>
                <div className="faq-answer mt-2 hidden text-[#6B5F7A]">
                  <p>The best way is to book a visit! We encourage families to experience our environment firsthand. Our team will discuss your child's needs and help determine if our approach aligns with your goals.</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl shadow">
                <div className="faq-question cursor-pointer flex justify-between items-center">
                  <h4 className="font-semibold">Do you offer financial assistance or payment plans?</h4>
                  <span className="faq-toggle text-xl">+</span>
                </div>
                <div className="faq-answer mt-2 hidden text-[#6B5F7A]">
                  <p>Yes, we offer sliding scale fees and payment plans based on family circumstances. Please contact us confidentially to discuss options.</p>
                </div>
              </div>

              {/* If you want any new FAQs added */}
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
