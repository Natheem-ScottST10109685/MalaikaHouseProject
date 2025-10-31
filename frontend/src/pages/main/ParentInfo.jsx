import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import AccessibilityPanel from "../../components/public/AccessibilityPanel";

export default function ParentInfo() {
  const observerRef = useRef(null);

  useEffect(() => {
    const handleAnchorClick = (e) => {
      const href = e.currentTarget.getAttribute("href");
      if (!href?.startsWith("#")) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((a) => a.addEventListener("click", handleAnchorClick));

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

    return () => {
      anchors.forEach((a) => a.removeEventListener("click", handleAnchorClick));
      observerRef.current?.disconnect();
    };
  }, []);

  const sectionTitle = "text-2xl font-semibold";
  const sectionSub = "text-slate-600";

  return (
    <div className="bg-white text-slate-900" data-tts>
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

      {/* Page header */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white py-16" data-tts>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Parent Information</h1>
          <p className="mt-4 max-w-2xl mx-auto text-indigo-50">
            Everything you need to know about joining the Malaika House community and supporting your child's journey.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <a
              href="#fees"
              className="rounded-md bg-white px-4 py-2 font-semibold text-indigo-700 shadow hover:shadow-md"
              data-a11y-ignore="1"
            >
              Fees & Pricing
            </a>
            <a
              href="#application"
              className="rounded-md border border-white/80 px-4 py-2 text-white hover:bg-white/10"
              data-a11y-ignore="1"
            >
              Application
            </a>
            <a
              href="#guidelines"
              className="rounded-md border border-white/80 px-4 py-2 text-white hover:bg-white/10"
              data-a11y-ignore="1"
            >
              Guidelines
            </a>
            <a
              href="#resources"
              className="rounded-md border border-white/80 px-4 py-2 text-white hover:bg-white/10"
              data-a11y-ignore="1"
            >
              Resources
            </a>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="py-12" data-tts>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <a href="#fees" className="card reveal text-center" data-a11y-ignore="1">
              <div className="text-3xl">💰</div>
              <h3 className="mt-2 font-semibold">Fees & Pricing</h3>
              <p className="mt-2 text-sm text-slate-600">Transparent pricing for all programs and services.</p>
            </a>
            <a href="#application" className="card reveal text-center" data-a11y-ignore="1">
              <div className="text-3xl">📝</div>
              <h3 className="mt-2 font-semibold">Application Process</h3>
              <p className="mt-2 text-sm text-slate-600">Step-by-step guide to joining our community.</p>
            </a>
            <a href="#guidelines" className="card reveal text-center" data-a11y-ignore="1">
              <div className="text-3xl">📋</div>
              <h3 className="mt-2 font-semibold">Guidelines & Expectations</h3>
              <p className="mt-2 text-sm text-slate-600">How we work together to support each child.</p>
            </a>
            <a href="#resources" className="card reveal text-center" data-a11y-ignore="1">
              <div className="text-3xl">📚</div>
              <h3 className="mt-2 font-semibold">Support Resources</h3>
              <p className="mt-2 text-sm text-slate-600">Materials and tools to support your child’s journey.</p>
            </a>
          </div>
        </div>
      </section>

      {/* Fees */}
      <section id="fees" className="py-12 bg-slate-50" data-tts>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className={sectionTitle}>Fees & Pricing</h2>
          <p className={sectionSub}>
            Flexible options designed to keep our programs accessible while ensuring quality support.
          </p>

          <div className="grid lg:grid-cols-3 gap-6 mt-6">
            {/* Solo */}
            <div className="card reveal" data-tts>
              <div>
                <div className="text-sm font-medium text-slate-500">Solo Entry</div>
                <div className="mt-1 text-2xl font-bold">R450</div>
                <div className="text-sm text-slate-500">per session</div>
              </div>
              <ul className="mt-4 list-disc pl-5 text-sm text-slate-700 space-y-1">
                <li>Individual focused session</li>
                <li>Personalized attention</li>
                <li>Flexible scheduling</li>
                <li>Progress tracking</li>
                <li>Family consultation included</li>
              </ul>
              <div className="mt-4">
                <Link
                  to="/book-a-visit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700"
                  data-a11y-ignore="1"
                >
                  Book Session
                </Link>
              </div>
            </div>

            {/* Party for Two */}
            <div className="card reveal relative ring-2 ring-indigo-200" data-tts>
              <div className="absolute -top-3 right-4 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow">
                Most Popular
              </div>
              <div>
                <div className="text-sm font-medium text-slate-500">Party for Two</div>
                <div className="mt-1 text-2xl font-bold">R750</div>
                <div className="text-sm text-slate-500">per session (2 children)</div>
              </div>
              <ul className="mt-4 list-disc pl-5 text-sm text-slate-700 space-y-1">
                <li>Paired learning experience</li>
                <li>Social skill development</li>
                <li>Peer interaction opportunities</li>
                <li>Shared activities and games</li>
                <li>Family support for both families</li>
              </ul>
              <div className="mt-4">
                <Link
                  to="/book-a-visit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700"
                  data-a11y-ignore="1"
                >
                  Book for Two
                </Link>
              </div>
            </div>

            {/* Term pass */}
            <div className="card reveal" data-tts>
              <div>
                <div className="text-sm font-medium text-slate-500">2025 Session Pass</div>
                <div className="mt-1 text-2xl font-bold">R2,200</div>
                <div className="text-sm text-slate-500">per term (July 22 - Oct)</div>
              </div>
              <ul className="mt-4 list-disc pl-5 text-sm text-slate-700 space-y-1">
                <li>Full term access</li>
                <li>Multiple weekly sessions</li>
                <li>Priority booking</li>
                <li>Comprehensive progress reports</li>
                <li>Family support program</li>
                <li>Auto-renewal option</li>
              </ul>
              <div className="mt-4">
                <Link
                  to="/book-a-visit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700"
                  data-a11y-ignore="1"
                >
                  Get Term Pass
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 card reveal" data-tts>
            <h3 className="font-semibold">Payment & Booking Information</h3>
            <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Payments must be processed before booking confirmation.</li>
              <li>Cancellations can be transferred to new sessions.</li>
              <li>Financial assistance available — contact us to discuss options.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Application */}
      <section id="application" className="py-12" data-tts>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className={sectionTitle}>Application Process</h2>
          <p className={sectionSub}>
            A simple, supportive process designed to ensure the best fit for your child and our community.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {[
              { n: 1, title: "Contact Us", text: "Reach out via phone, email, or the contact form to learn about our programs and approach." },
              { n: 2, title: "Schedule a Visit", text: "Visit our facility, meet our team, and see if Malaika House is the right fit." },
              { n: 3, title: "Choose Your Program", text: "Select the option that best meets your child's needs and your schedule." },
              { n: 4, title: "Complete Booking", text: "Fill out forms, process payment, and book your child's first session." },
            ].map((s) => (
              <div key={s.n} className="card reveal" data-tts>
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white text-sm font-semibold">
                  {s.n}
                </div>
                <h4 className="mt-2 font-semibold">{s.title}</h4>
                <p className="mt-1 text-sm text-slate-700">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guidelines */}
      <section id="guidelines" className="py-12 bg-slate-50" data-tts>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className={sectionTitle}>Guidelines & Expectations</h2>
          <p className={sectionSub}>
            Our shared commitments to creating a safe, supportive, and effective learning environment.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <div className="card reveal" data-tts>
              <div className="text-2xl">🤝</div>
              <h4 className="mt-2 font-semibold">Family Partnership</h4>
              <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 space-y-1">
                <li>Open communication with staff</li>
                <li>Regular progress meetings</li>
                <li>Collaborative goal setting</li>
                <li>Celebrate successes</li>
                <li>Problem-solve together</li>
              </ul>
            </div>

            <div className="card reveal" data-tts>
              <div className="text-2xl">📅</div>
              <h4 className="mt-2 font-semibold">Attendance & Scheduling</h4>
              <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 space-y-1">
                <li>Consistent attendance encouraged</li>
                <li>24-hour cancellation notice</li>
                <li>Flexible rescheduling</li>
                <li>Term-based planning</li>
                <li>Google Calendar integration</li>
              </ul>
            </div>

            <div className="card reveal" data-tts>
              <div className="text-2xl">🛡️</div>
              <h4 className="mt-2 font-semibold">Safety & Well-being</h4>
              <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 space-y-1">
                <li>Physical and emotional safety first</li>
                <li>Inclusive, respectful environment</li>
                <li>Clear behavioral expectations</li>
                <li>Crisis support protocols</li>
                <li>Confidentiality maintained</li>
              </ul>
            </div>

            <div className="card reveal" data-tts>
              <div className="text-2xl">📞</div>
              <h4 className="mt-2 font-semibold">Communication</h4>
              <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 space-y-1">
                <li>Regular progress updates</li>
                <li>Multiple communication channels</li>
                <li>Prompt response to concerns</li>
                <li>Family education & support</li>
                <li>Community-building opportunities</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section id="resources" className="py-12" data-tts>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className={sectionTitle}>Support Resources</h2>
          <p className={sectionSub}>
            Tools, materials, and information to support your child's learning journey at home and beyond.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {[
              { icon: "📖", title: "Parent Handbook", text: "Our approaches, policies, and practical tips for supporting neurodivergent learners." },
              { icon: "🎯", title: "Learning Activities", text: "Home-based activities designed to reinforce skills and concepts." },
              { icon: "🧠", title: "Neurodiversity Info", text: "Materials about learning styles, strengths, and support strategies." },
              { icon: "👥", title: "Community Resources", text: "Directory of local services, support groups, and organizations." },
              { icon: "📱", title: "Digital Tools", text: "Recommended apps, websites, and digital resources." },
              { icon: "💬", title: "Parent Network", text: "Connect with other Malaika House families for support and friendship." },
            ].map((r) => (
              <Link key={r.title} to="/contact-us" className="card reveal" data-tts>
                <div className="text-2xl">{r.icon}</div>
                <h4 className="mt-2 font-semibold">{r.title}</h4>
                <p className="mt-1 text-sm text-slate-700">{r.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-indigo-700 text-white" data-tts>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold">Ready to get started?</h2>
          <p className="text-indigo-100">
            We’re here to answer your questions and help you find the right program fit.
          </p>
          <div className="mt-6 flex gap-3">
            <Link
              to="/book-a-visit"
              className="rounded-md bg-white px-4 py-2 font-semibold text-indigo-700 shadow hover:shadow-md"
              data-a11y-ignore="1"
            >
              Book a Visit
            </Link>
            <Link
              to="/contact-us"
              className="rounded-md border border-white/80 px-4 py-2 text-white hover:bg-white/10"
              data-a11y-ignore="1"
            >
              Get Information
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
