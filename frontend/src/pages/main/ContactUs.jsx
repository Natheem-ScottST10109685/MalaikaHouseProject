import React, { useEffect, useRef, useState } from "react";
import AccessibilityPanel from "../../components/public/AccessibilityPanel";

export default function ContactUs() {
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
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

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      firstName: String(fd.get("firstName") || "").trim(),
      lastName: String(fd.get("lastName") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      inquiryType: String(fd.get("inquiryType") || ""),
      subject: String(fd.get("subject") || "").trim(),
      message: String(fd.get("message") || "").trim(),
      source: "contact-us",
      submittedAt: new Date().toISOString(),
    };

    if (!payload.firstName || !payload.lastName || !payload.email || !payload.subject || !payload.message) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch("/api/public/contact-messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || "Could not send your message. Please try again.");
      }

      alert("Thanks! Your message was sent. We’ve also emailed you a confirmation.");
      form.reset();
    } catch (err) {
      alert(err?.message || "Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  }

  const faqs = [
    {
      q: "How do I know if Malaika House is right for my child?",
      a: "The best way is to book a visit. You can experience our environment first-hand and talk through your child's needs with our team to see if our approach aligns with your goals.",
    },
    {
      q: "Do you offer financial assistance or payment plans?",
      a: "Yes — we offer sliding scale fees and payment plans based on family circumstances. Reach out confidentially and we’ll discuss options together.",
    },
  ];

  const phoneHref = "tel:+27123456789";
  const mailHref = `mailto:info@malaikahouse.co.za?subject=${encodeURIComponent(
    "Malaika House — General Information"
  )}`;

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

      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white py-16" data-tts>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Contact Us</h1>
          <p className="mt-4 max-w-2xl mx-auto text-indigo-50">
            We're here to support you and answer any questions about our programs, services, or how Malaika House can help
            your family.
          </p>
        </div>
      </section>

      {/* Contact methods */}
      <section className="py-12" data-tts>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card reveal text-center min-h-[360px]" data-tts>
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 text-3xl text-white">
                📞
              </div>
              <h3 className="text-lg font-semibold">Phone Support</h3>
              <p className="mt-2 text-sm text-slate-600">
                Speak directly with our team for immediate assistance and personalized guidance.
              </p>
              <div className="mt-4 rounded-lg bg-slate-50 p-4 text-sm">
                <strong>General Inquiries:</strong>
                <br />
                +27 (0) 123 456 789
              </div>
              <a
                href={phoneHref}
                onClick={() => {
                  if (typeof window !== "undefined") window.location.href = phoneHref;
                }}
                className="mt-6 inline-block rounded-full bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
                data-a11y-ignore="1"
              >
                Call Now
              </a>
            </div>

            <div className="card reveal text-center min-h-[360px]" data-tts>
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 text-3xl text-white">
                ✉️
              </div>
              <h3 className="text-lg font-semibold">Email Support</h3>
              <p className="mt-2 text-sm text-slate-600">
                Send us detailed questions and receive a comprehensive response within 24 hours.
              </p>
              <div className="mt-4 rounded-lg bg-slate-50 p-4 text-sm">
                <strong>General Information:</strong>
                <br />
                info@malaikahouse.co.za
              </div>
              <a
                href={mailHref}
                className="mt-6 inline-block rounded-full bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
                data-a11y-ignore="1"
              >
                Send Email
              </a>
            </div>

            <div className="card reveal text-center min-h-[360px]" data-tts>
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 text-3xl text-white">
                📠
              </div>
              <h3 className="text-lg font-semibold">FAX Services</h3>
              <p className="mt-2 text-sm text-slate-600">
                For official documents, forms, and confidential communications.
              </p>
              <div className="mt-4 rounded-lg bg-slate-50 p-4 text-sm">FAX: +27 123 456 790</div>
              <span className="mt-6 inline-block rounded-full bg-slate-100 px-4 py-2 text-slate-700" data-a11y-ignore="1">
                FAX: +27 123 456 790
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="bg-slate-50 py-12" data-tts>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-2xl font-semibold">Send Us a Message</h2>
          <p className="mt-2 text-center text-slate-600">
            Have a question or need more information? Fill out the form and we’ll get back to you soon.
          </p>

        <div className="mx-auto mt-8 max-w-3xl">
            <form onSubmit={handleSubmit} className="card reveal space-y-6" data-a11y-ignore="1">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700">First Name *</label>
                  <input
                    name="firstName"
                    required
                    className="mt-1 block w-full rounded border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Last Name *</label>
                  <input
                    name="lastName"
                    required
                    className="mt-1 block w-full rounded border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="mt-1 block w-full rounded border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    className="mt-1 block w-full rounded border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Inquiry Type</label>
                <select
                  name="inquiryType"
                  className="mt-1 block w-full rounded border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
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
                <label className="block text-sm font-medium text-slate-700">Subject *</label>
                <input
                  name="subject"
                  required
                  placeholder="Brief description of your inquiry"
                  className="mt-1 block w-full rounded border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Message *</label>
                <textarea
                  name="message"
                  required
                  placeholder="Please provide details about your inquiry..."
                  className="mt-1 block h-36 w-full rounded border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
                >
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12" data-tts>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
          <p className="text-slate-600">Quick answers to common questions about Malaika House and our services.</p>

          <div className="mt-6 space-y-4">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={i} className="card reveal" data-tts>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between text-left"
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    data-a11y-ignore="1"
                  >
                    <h4 className="font-semibold">{f.q}</h4>
                    <span className="text-xl">{open ? "−" : "+"}</span>
                  </button>
                  {open && <div className="mt-2 text-slate-700">{f.a}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="bg-slate-50 py-12" data-tts>
        <div className="max-w-6xl mx-auto grid gap-6 px-4 md:grid-cols-2">
          <div data-tts>
            <h2 className="text-2xl font-semibold">Visit Our Location</h2>
            <p className="mt-2 text-sm">
              <strong>Address:</strong>
              <br />
              123 Learning Street
              <br />
              Observatory, Cape Town
              <br />
              Western Cape, 7925
              <br />
              South Africa
            </p>
            <p className="mt-2 text-sm">
              <strong>Parking:</strong> On-site parking available
              <br />
              <strong>Accessibility:</strong> Wheelchair accessible facility
            </p>
          </div>
          <div className="card reveal flex items-center justify-center" data-tts>
            <div className="text-center">
              <div className="mb-3 text-5xl">🗺️</div>
              <p>Interactive Map Integration (Google Maps or another provider)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency */}
      <section className="py-12" data-tts>
        <div className="max-w-6xl mx-auto px-4">
          <div className="card reveal text-center">
            <h3 className="text-xl font-semibold">Emergency or Urgent Support</h3>
            <p className="mt-2">
              If you need immediate assistance or have an urgent concern about your child's well-being, please contact us.
            </p>
            <div className="mt-3 text-2xl font-bold">+27 (0) 123 456 789</div>
            <p className="mt-2 text-sm text-slate-700">
              For after-hours emergencies, leave a message and we will respond as quickly as possible. For immediate crisis
              support, please contact local emergency services.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}