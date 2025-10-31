import React, { useEffect } from "react";
import AccessibilityPanel from "../../components/public/AccessibilityPanel";

export default function Home() {
  useEffect(() => {
    const anchors = document.querySelectorAll('a[href^="#"]');
    const onClick = (e) => {
      const href = e.currentTarget.getAttribute("href");
      if (!href?.startsWith("#")) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    };
    anchors.forEach((a) => a.addEventListener("click", onClick));
    return () => anchors.forEach((a) => a.removeEventListener("click", onClick));
  }, []);

  const card = "rounded-2xl bg-white shadow-md ring-1 ring-slate-200 p-5 transition hover:shadow-lg";
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

      {/* HERO */}
      <section id="home" className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white py-20" data-tts>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Heart-Focused Learning & Support
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-indigo-50">
            Empowering neurodivergent learners through inclusive, accessible programs designed
            to nurture every child's unique potential
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <a
              href="#heart-program"
              className="inline-flex items-center rounded-md bg-white px-4 py-2 font-semibold text-indigo-600 shadow hover:shadow-md"
            >
              Join Heart Program
            </a>
            <a
              href="#malaika-house"
              className="inline-flex items-center rounded-md border border-white px-4 py-2 text-white hover:bg-white/10"
            >
              Explore Malaika House
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-12" data-tts>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className={sectionTitle}>About Malaika House</h2>
          <p className={sectionSub}>
            We believe every child deserves support that honors their unique learning style and
            celebrates their individual strengths
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className={card + " text-center"} data-tts>
              <div className="text-3xl">♥</div>
              <h3 className="mt-2 font-semibold">Heart-Centered Approach</h3>
              <p className="mt-2 text-sm text-slate-600">
                Our programs focus on emotional intelligence, empathy, and building meaningful
                connections while supporting academic growth.
              </p>
            </div>
            <div className={card + " text-center"} data-tts>
              <div className="text-3xl">🌈</div>
              <h3 className="mt-2 font-semibold">Inclusive Environment</h3>
              <p className="mt-2 text-sm text-slate-600">
                We celebrate neurodiversity and create spaces where every learner feels valued,
                understood, and supported.
              </p>
            </div>
            <div className={card + " text-center"} data-tts>
              <div className="text-3xl">🎯</div>
              <h3 className="mt-2 font-semibold">Personalized Learning</h3>
              <p className="mt-2 text-sm text-slate-600">
                Tailored programs that adapt to each child's unique needs, interests, and
                learning preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="heart-program" className="py-12 bg-slate-50" data-tts>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className={sectionTitle}>Our Programs</h2>
          <p className={sectionSub}>Comprehensive support through specialized programs and inclusive club activities</p>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className={card} data-tts>
              <div>
                <h3 className="font-semibold">Heart Program</h3>
                <p className="text-sm text-slate-500">Exclusive Membership Program</p>
              </div>
              <div className="mt-3">
                <p className="text-sm text-slate-700">
                  Our flagship program designed for neurodivergent learners, offering specialized support and resources.
                </p>
                <ul className="list-disc pl-5 mt-2 text-sm space-y-1 text-slate-700">
                  <li>Everyone & Anyone sessions</li>
                  <li>Malaika House Morning Sessions</li>
                  <li>Personalized learning plans</li>
                  <li>Family support resources</li>
                  <li>Progress tracking and reporting</li>
                </ul>
                <a href="/what-we-offer" className="inline-block mt-4 rounded-md bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700" data-a11y-ignore="1">
                  Learn More
                </a>
              </div>
            </div>

            <div className={card} data-tts>
              <div>
                <h3 className="font-semibold">Club Programs</h3>
                <p className="text-sm text-slate-500">Internal & External Partnerships</p>
              </div>
              <div className="mt-3">
                <p className="text-sm text-slate-700">
                  Diverse club activities that build social skills, explore interests, and create community connections.
                </p>
                <ul className="list-disc pl-5 mt-2 text-sm space-y-1 text-slate-700">
                  <li>Dungeons & Dragons Club</li>
                  <li>Adventure Sessions</li>
                  <li>Curiosity Club</li>
                  <li>Square Peg Clubs</li>
                  <li>Quicket Club Partnership</li>
                </ul>
                <a href="/what-we-offer" className="inline-block mt-4 rounded-md bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700" data-a11y-ignore="1">
                  Explore Clubs
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="malaika-house" className="py-12 bg-indigo-700 text-white" data-tts>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold">Get In Touch</h2>
          <p className="text-indigo-100">
            Ready to start your journey with Malaika House? We're here to help.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="rounded-2xl bg-indigo-600 p-5 shadow-md ring-1 ring-white/10 text-center" data-tts>
              <h4 className="font-semibold">Visit Us</h4>
              <p className="mt-2 text-sm text-indigo-100">
                Schedule a visit to see our facilities and meet our team. We offer both on-site and online consultation options.
              </p>
            </div>
            <div className="rounded-2xl bg-indigo-600 p-5 shadow-md ring-1 ring-white/10 text-center" data-tts>
              <h4 className="font-semibold">Get Information</h4>
              <p className="mt-2 text-sm text-indigo-100">
                Have questions about our programs, fees, or application process? Contact us for detailed information.
              </p>
            </div>
            <div className="rounded-2xl bg-indigo-600 p-5 shadow-md ring-1 ring-white/10 text-center" data-tts>
              <h4 className="font-semibold">Join Our Community</h4>
              <p className="mt-2 text-sm text-indigo-100">
                Subscribe to our newsletter for updates on events, new programs, and success stories.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
