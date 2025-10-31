import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import AccessibilityPanel from "../../components/public/AccessibilityPanel";

export default function OurStory() {
  const observerRef = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      const href = e.currentTarget.getAttribute("href");
      if (!href?.startsWith("#")) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    };
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((a) => a.addEventListener("click", onClick));

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
      anchors.forEach((a) => a.removeEventListener("click", onClick));
      observerRef.current?.disconnect();
    };
  }, []);

  const sectionTitle = "text-2xl font-semibold";
  const sectionSub = "text-slate-600";

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
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Our Story</h1>
          <p className="mt-4 max-w-2xl mx-auto text-indigo-50">
            Born from a vision to create inclusive spaces where neurodivergent learners can thrive,
            Malaika House represents hope, community, and the power of heart-centered education.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <a
              href="#mission"
              className="rounded-md bg-white px-4 py-2 font-semibold text-indigo-700 shadow hover:shadow-md"
              data-a11y-ignore="1"
            >
              Mission
            </a>
            <a
              href="#values"
              className="rounded-md border border-white/80 px-4 py-2 text-white hover:bg-white/10"
              data-a11y-ignore="1"
            >
              Values
            </a>
            <a
              href="#journey"
              className="rounded-md border border-white/80 px-4 py-2 text-white hover:bg-white/10"
              data-a11y-ignore="1"
            >
              Journey
            </a>
            <a
              href="#approach"
              className="rounded-md border border-white/80 px-4 py-2 text-white hover:bg-white/10"
              data-a11y-ignore="1"
            >
              Approach
            </a>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="py-12" data-tts>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-6">
          <div data-tts>
            <h2 className={sectionTitle}>Our Mission</h2>
            <p className="mt-3 text-slate-700">
              At Malaika House, we believe that every child deserves an education that honors their
              unique way of learning and being in the world. Our mission is to create inclusive,
              supportive environments where neurodivergent learners can discover their strengths,
              build confidence, and develop the skills they need to thrive.
            </p>
            <p className="mt-2 text-slate-700">
              We focus on the heart — not just academic achievement, but emotional intelligence,
              empathy, and the profound connections that make learning meaningful.
            </p>
          </div>
          <div className="card reveal text-center" data-tts>
            <div className="text-5xl">♥</div>
            <h3 className="mt-2 font-semibold">Heart-Focused Learning</h3>
            <p className="mt-2 text-sm text-slate-600">
              We put relationships, understanding, and emotional well-being at the center of
              everything we do.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="values" className="py-12 bg-slate-50" data-tts>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className={sectionTitle}>Our Core Values</h2>
          <p className={sectionSub}>
            These principles guide every decision we make and every interaction we have with
            learners, families, and our community.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="card reveal text-center" data-tts>
              <div className="text-3xl">🌈</div>
              <h3 className="mt-2 font-semibold">Celebrate Diversity</h3>
              <p className="mt-2 text-sm text-slate-600">
                We embrace neurodiversity as a natural and valuable part of human experience.
              </p>
            </div>
            <div className="card reveal text-center" data-tts>
              <div className="text-3xl">🤝</div>
              <h3 className="mt-2 font-semibold">Build Connection</h3>
              <p className="mt-2 text-sm text-slate-600">
                Meaningful relationships are the foundation of learning.
              </p>
            </div>
            <div className="card reveal text-center" data-tts>
              <div className="text-3xl">🌱</div>
              <h3 className="mt-2 font-semibold">Foster Growth</h3>
              <p className="mt-2 text-sm text-slate-600">
                We believe in the potential of every learner and create environments that nurture growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="journey" className="py-12" data-tts>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className={sectionTitle}>Our Journey</h2>
          <p className={sectionSub}>The evolution of Malaika House from vision to thriving community.</p>

          <div className="mt-6 space-y-6">
            <div className="card reveal" data-tts>
              <div className="font-bold">2020</div>
              <h4 className="mt-1 font-semibold">The Vision Begins</h4>
              <p className="mt-2 text-sm text-slate-700">
                Recognizing the gap in support for neurodivergent learners, our founders began
                developing the concept of heart-focused education.
              </p>
            </div>
            <div className="card reveal" data-tts>
              <div className="font-bold">2021</div>
              <h4 className="mt-1 font-semibold">Community Building</h4>
              <p className="mt-2 text-sm text-slate-700">
                We started building relationships with families, educators, and support professionals
                who shared our vision.
              </p>
            </div>
            <div className="card reveal" data-tts>
              <div className="font-bold">2022</div>
              <h4 className="mt-1 font-semibold">First Programs Launch</h4>
              <p className="mt-2 text-sm text-slate-700">
                Our initial pilot programs began, serving a small group of learners while we refined
                our approaches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section id="approach" className="py-12 bg-slate-50" data-tts>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className={sectionTitle}>Our Approach</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {[
              {
                n: "1",
                title: "Assessment & Understanding",
                text:
                  "We take time to truly understand each learner's strengths and interests through relationship-based assessment.",
              },
              {
                n: "2",
                title: "Personalized Planning",
                text: "We develop individualized plans that build on strengths while addressing goals.",
              },
              {
                n: "3",
                title: "Relationship Building",
                text:
                  "Strong, trusting relationships with staff and peers form the foundation for learning.",
              },
            ].map((item) => (
              <div key={item.n} className="card reveal text-center" data-tts>
                <div className="text-2xl font-bold">{item.n}</div>
                <h4 className="mt-2 font-semibold">{item.title}</h4>
                <p className="mt-2 text-sm text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team preview CTA */}
      <section className="py-12" data-tts>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className={sectionTitle}>Meet Our Team</h2>
          <p className="mt-2 text-sm text-slate-700">
            Our passionate, dedicated staff bring together expertise in education, psychology,
            therapy, and family support.
          </p>
          <Link
            to="/staff-supporters"
            className="mt-4 inline-flex rounded-md bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
            data-a11y-ignore="1"
          >
            Meet Our Staff & Supporters
          </Link>
        </div>
      </section>
    </div>
  );
}
