import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import AccessibilityPanel from "../../components/public/AccessibilityPanel";

export default function StaffSupporters() {
  const observerRef = useRef(null);

  useEffect(() => {
    const handleAnchorClick = (e) => {
      const href = e.currentTarget.getAttribute("href");
      if (!href?.startsWith("#")) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });
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

    document.querySelectorAll(".reveal").forEach((el) => {
      observerRef.current?.observe(el);
    });

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

      {/* Page Header */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white py-16" data-tts>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Our Team & Supporters
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-indigo-50">
            Meet the passionate individuals and organizations who make our
            heart-focused mission possible.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <a
              href="#leadership"
              className="rounded-md bg-white px-4 py-2 font-semibold text-indigo-700 shadow hover:shadow-md"
              data-a11y-ignore="1"
            >
              Leadership
            </a>
            <a
              href="#staff"
              className="rounded-md border border-white/80 px-4 py-2 text-white hover:bg-white/10"
              data-a11y-ignore="1"
            >
              Staff
            </a>
            <a
              href="#partners"
              className="rounded-md border border-white/80 px-4 py-2 text-white hover:bg-white/10"
              data-a11y-ignore="1"
            >
              Partners
            </a>
            <a
              href="#supporters"
              className="rounded-md border border-white/80 px-4 py-2 text-white hover:bg-white/10"
              data-a11y-ignore="1"
            >
              Supporters
            </a>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="py-12" data-tts>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className={sectionTitle}>Leadership Team</h2>
          <p className={sectionSub}>
            Our founders and leaders who guide Malaika House with vision, expertise,
            and unwavering commitment to neurodivergent learners.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="card reveal" data-tts>
              <div className="flex items-center gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white font-semibold">
                  A
                </div>
                <div>
                  <div className="font-semibold">Amarta</div>
                  <div className="text-sm text-slate-500">Co-Founder & Director</div>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-700">
                Amarta brings years of experience in education and a deep passion for creating
                inclusive learning environments. Her vision for heart-focused education has been
                the driving force behind Malaika House's development.
              </p>
              <ul className="mt-3 grid sm:grid-cols-2 gap-2 text-sm text-slate-700">
                <li className="rounded-md bg-slate-50 px-3 py-2">Educational Leadership Certification</li>
                <li className="rounded-md bg-slate-50 px-3 py-2">Neurodiversity Training Specialist</li>
                <li className="rounded-md bg-slate-50 px-3 py-2">Curriculum Development</li>
                <li className="rounded-md bg-slate-50 px-3 py-2">Community Partnership Building</li>
              </ul>
            </div>

            <div className="card reveal" data-tts>
              <div className="flex items-center gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white font-semibold">
                  E
                </div>
                <div>
                  <div className="font-semibold">Elria</div>
                  <div className="text-sm text-slate-500">Co-Founder & Creative Director</div>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-700">
                Elria leads our branding, design, and creative initiatives while also managing
                content and events. Her artistic vision ensures that every aspect of Malaika
                House reflects our values and mission.
              </p>
              <ul className="mt-3 grid sm:grid-cols-2 gap-2 text-sm text-slate-700">
                <li className="rounded-md bg-slate-50 px-3 py-2">Brand Development & Design</li>
                <li className="rounded-md bg-slate-50 px-3 py-2">Event Management</li>
                <li className="rounded-md bg-slate-50 px-3 py-2">Creative Content</li>
                <li className="rounded-md bg-slate-50 px-3 py-2">Supporter Relations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Staff */}
      <section id="staff" className="py-12 bg-slate-50" data-tts>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className={sectionTitle}>Our Facilitators & Staff</h2>
          <p className={sectionSub}>
            Dedicated professionals who bring expertise, compassion, and creativity to
            every interaction with our learners and families.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="card reveal flex gap-4" data-tts>
              <div className="text-3xl">👨‍🏫</div>
              <div>
                <div className="font-semibold">Lead Learning Facilitator</div>
                <div className="text-sm text-slate-500">Heart Program Specialist</div>
                <p className="mt-2 text-sm text-slate-700">
                  Specialized in neurodivergent learning approaches with extensive experience in
                  personalized education and social-emotional development.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">Autism Support</span>
                  <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">ADHD Strategies</span>
                  <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">Social Skills</span>
                </div>
              </div>
            </div>

            <div className="card reveal flex gap-4" data-tts>
              <div className="text-3xl">👩‍💼</div>
              <div>
                <div className="font-semibold">Family Support Coordinator</div>
                <div className="text-sm text-slate-500">Parent & Community Liaison</div>
                <p className="mt-2 text-sm text-slate-700">
                  Dedicated to building strong relationships with families and providing resources
                  and guidance throughout the learning journey.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">Family Counseling</span>
                  <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">Resource Navigation</span>
                  <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">Community Building</span>
                </div>
              </div>
            </div>

            <div className="card reveal flex gap-4" data-tts>
              <div className="text-3xl">👨‍🎨</div>
              <div>
                <div className="font-semibold">Creative Arts Facilitator</div>
                <div className="text-sm text-slate-500">Clubs & Activities Coordinator</div>
                <p className="mt-2 text-sm text-slate-700">
                  Brings creativity and play into learning through art, music, drama, and hands-on activities that engage and inspire.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-md bg-fuchsia-50 px-2.5 py-1 text-xs font-medium text-fuchsia-700">Art Therapy</span>
                  <span className="rounded-md bg-fuchsia-50 px-2.5 py-1 text-xs font-medium text-fuchsia-700">Music Integration</span>
                  <span className="rounded-md bg-fuchsia-50 px-2.5 py-1 text-xs font-medium text-fuchsia-700">Creative Expression</span>
                </div>
              </div>
            </div>

            <div className="card reveal flex gap-4" data-tts>
              <div className="text-3xl">👩‍⚕️</div>
              <div>
                <div className="font-semibold">Behavioral Support Specialist</div>
                <div className="text-sm text-slate-500">Therapeutic Services</div>
                <p className="mt-2 text-sm text-slate-700">
                  Provides behavioral support and therapeutic interventions to help learners develop
                  coping strategies and self-regulation skills.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-md bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700">Behavioral Analysis</span>
                  <span className="rounded-md bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700">Self-Regulation</span>
                  <span className="rounded-md bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700">Therapeutic Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="py-12" data-tts>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className={sectionTitle}>Our Partners & Collaborators</h2>
          <p className={sectionSub}>
            Working together with trusted organizations to expand opportunities and support for our community.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <div className="card reveal text-center" data-tts>
              <div className="text-3xl">🧩</div>
              <div className="mt-2 font-semibold">Square Peg</div>
              <p className="mt-2 text-sm text-slate-700">
                Specialized programs for kids, teens, and adults in the neurodivergent community.
              </p>
            </div>
            <div className="card reveal text-center" data-tts>
              <div className="text-3xl">🎫</div>
              <div className="mt-2 font-semibold">Quicket Club</div>
              <p className="mt-2 text-sm text-slate-700">
                Special events and ticketed activities that provide unique experiences for our learners.
              </p>
            </div>
            <div className="card reveal text-center" data-tts>
              <div className="text-3xl">🤝</div>
              <div className="mt-2 font-semibold">Team WIL Project</div>
              <p className="mt-2 text-sm text-slate-700">
                Collaborative initiatives for neurodiversity training, fundraising, and community awareness.
              </p>
            </div>
            <div className="card reveal text-center" data-tts>
              <div className="text-3xl">💰</div>
              <div className="mt-2 font-semibold">BackaBuddy</div>
              <p className="mt-2 text-sm text-slate-700">
                Fundraising platform supporting our mission and helping us reach more families.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supporters */}
      <section id="supporters" className="py-12 bg-slate-50" data-tts>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className={sectionTitle}>Our Supporters & Sponsors</h2>
          <p className={sectionSub}>
            We are grateful to the individuals and organizations who believe in our mission and support our work.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <div className="card reveal text-center" data-tts>
              <div className="text-3xl">💼</div>
              <div className="mt-2 font-semibold">Corporate Sponsor A</div>
              <div className="text-sm text-slate-500">Major Sponsor</div>
              <p className="mt-2 text-sm text-slate-700">
                Significant funding support for our Heart Program and facility operations.
              </p>
            </div>
            <div className="card reveal text-center" data-tts>
              <div className="text-3xl">🏫</div>
              <div className="mt-2 font-semibold">Educational Foundation</div>
              <div className="text-sm text-slate-500">Grant Provider</div>
              <p className="mt-2 text-sm text-slate-700">
                Supporting our research and development of innovative neurodivergent learning approaches.
              </p>
            </div>
            <div className="card reveal text-center" data-tts>
              <div className="text-3xl">❤️</div>
              <div className="mt-2 font-semibold">Community Champions</div>
              <div className="text-sm text-slate-500">Individual Donors</div>
              <p className="mt-2 text-sm text-slate-700">
                Dedicated individuals who contribute regularly to support our mission and programs.
              </p>
            </div>
            <div className="card reveal text-center" data-tts>
              <div className="text-3xl">🏪</div>
              <div className="mt-2 font-semibold">Local Business Network</div>
              <div className="text-sm text-slate-500">In-Kind Supporters</div>
              <p className="mt-2 text-sm text-slate-700">
                Providing services, supplies, and resources that help us operate efficiently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12" data-tts>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className={sectionTitle}>Join Our Team</h2>
          <p className="text-slate-600">
            Are you passionate about neurodivergent education and heart-focused learning? We’re always
            looking for dedicated individuals who share our vision and values.
          </p>
          <div className="mt-6">
            <Link
              to="/contact-us"
              className="rounded-md bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
              data-a11y-ignore="1"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
