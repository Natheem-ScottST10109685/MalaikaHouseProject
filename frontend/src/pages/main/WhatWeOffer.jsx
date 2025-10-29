import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function WhatWeOffer() {
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
    <div className="bg-white text-slate-900">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">What We Offer</h1>
          <p className="mt-4 max-w-2xl mx-auto text-indigo-50">
            Comprehensive programs and services designed to support neurodivergent learners and their families
            through every step of their journey.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <a href="#heart-program" className="rounded-md bg-white px-4 py-2 font-semibold text-indigo-700 shadow hover:shadow-md">
              Heart Program
            </a>
            <a href="#clubs" className="rounded-md border border-white/80 px-4 py-2 text-white hover:bg-white/10">
              Clubs
            </a>
            <a href="#sessions" className="rounded-md border border-white/80 px-4 py-2 text-white hover:bg-white/10">
              Sessions
            </a>
          </div>
        </div>
      </section>

      {/* Heart Program */}
      <section id="heart-program" className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className={sectionTitle}>Heart Program — Exclusive Membership</h2>
          <p className={sectionSub}>
            Our flagship program provides comprehensive support for neurodivergent learners through personalized
            approaches and inclusive community building.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <div className="card reveal text-center">
              <div className="text-3xl">👥</div>
              <h4 className="mt-2 font-semibold">Everyone & Anyone</h4>
              <p className="mt-2 text-sm text-slate-600">
                Open enrollment sessions welcoming all learners regardless of background or ability.
              </p>
            </div>
            <div className="card reveal text-center">
              <div className="text-3xl">🌅</div>
              <h4 className="mt-2 font-semibold">Morning Sessions</h4>
              <p className="mt-2 text-sm text-slate-600">
                Specialized morning programs designed specifically for our student members.
              </p>
            </div>
            <div className="card reveal text-center">
              <div className="text-3xl">📋</div>
              <h4 className="mt-2 font-semibold">Individual Plans</h4>
              <p className="mt-2 text-sm text-slate-600">
                Customized learning and support plans tailored to each child's unique needs.
              </p>
            </div>
            <div className="card reveal text-center">
              <div className="text-3xl">👨‍👩‍👧‍👦</div>
              <h4 className="mt-2 font-semibold">Family Support</h4>
              <p className="mt-2 text-sm text-slate-600">
                Resources and guidance for families navigating neurodivergent learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Clubs */}
      <section id="clubs" className="py-12 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className={sectionTitle}>Club Programs</h2>
          <p className={sectionSub}>
            Diverse activities that foster social connections, explore interests, and build confidence in supportive environments.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {/* Internal Clubs */}
            <div className="card reveal">
              <h3 className="font-semibold">Internal Clubs</h3>
              <p className="text-sm text-slate-600 mt-1">
                Clubs managed directly by Malaika House staff, aligned with our heart-focused approach.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>
                  <div className="font-medium">Dungeons & Dragons Club</div>
                  <div className="text-slate-500">Fantasy role-playing that builds creativity and social skills</div>
                </li>
                <li>
                  <div className="font-medium">Adventure Sessions</div>
                  <div className="text-slate-500">Outdoor and experiential learning opportunities</div>
                </li>
                <li>
                  <div className="font-medium">Curiosity Club</div>
                  <div className="text-slate-500">Science, exploration, and discovery-based activities</div>
                </li>
                <li>
                  <div className="font-medium">Morning Circle Time</div>
                  <div className="text-slate-500">Daily community building and emotional check-ins</div>
                </li>
              </ul>
            </div>

            {/* External Partner Clubs */}
            <div className="card reveal">
              <h3 className="font-semibold">External Partner Clubs</h3>
              <p className="text-sm text-slate-600 mt-1">
                Collaborations with trusted partner organizations to expand opportunities for our learners.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>
                  <div className="font-medium">Square Peg Kids Club</div>
                  <div className="text-slate-500">Specialized programs for neurodivergent children</div>
                </li>
                <li>
                  <div className="font-medium">Square Peg Teens Club</div>
                  <div className="text-slate-500">Teen-focused activities and social development</div>
                </li>
                <li>
                  <div className="font-medium">Adult Square Pegs Club</div>
                  <div className="text-slate-500">Support and activities for neurodivergent adults</div>
                </li>
                <li>
                  <div className="font-medium">Quicket Club Partnership</div>
                  <div className="text-slate-500">Special events and ticketed activities</div>
                </li>
              </ul>
            </div>

            {/* Team WIL Integration */}
            <div className="card reveal">
              <h3 className="font-semibold">Team WIL Integration</h3>
              <p className="text-sm text-slate-600 mt-1">
                Connecting with broader community initiatives and learning opportunities.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>
                  <div className="font-medium">Neurodiversity Training</div>
                  <div className="text-slate-500">Educational workshops and awareness sessions</div>
                </li>
                <li>
                  <div className="font-medium">Community Fundraising</div>
                  <div className="text-slate-500">BackaBuddy and other fundraising initiatives</div>
                </li>
                <li>
                  <div className="font-medium">Google Docs Integration</div>
                  <div className="text-slate-500">Digital collaboration and documentation</div>
                </li>
                <li>
                  <div className="font-medium">Forms Management</div>
                  <div className="text-slate-500">Streamlined registration and communication</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sessions */}
      <section id="sessions" className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className={sectionTitle}>Malaika House Sessions</h2>
          <p className={sectionSub}>
            Flexible session options designed to meet diverse scheduling needs and learning preferences.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="card reveal">
              <h4 className="font-semibold">Solo Entry Sessions</h4>
              <p className="text-sm text-slate-600 mt-1">
                Individual focused sessions for personalized attention and support.
              </p>
              <ul className="mt-3 list-disc pl-5 text-sm text-slate-700 space-y-1">
                <li>One-on-one attention</li>
                <li>Customized pace and approach</li>
                <li>Flexible scheduling</li>
                <li>Progress tracking</li>
              </ul>
            </div>

            <div className="card reveal">
              <h4 className="font-semibold">Party for Two</h4>
              <p className="text-sm text-slate-600 mt-1">
                Paired learning sessions that encourage peer interaction and collaborative skills.
              </p>
              <ul className="mt-3 list-disc pl-5 text-sm text-slate-700 space-y-1">
                <li>Social skill development</li>
                <li>Peer learning opportunities</li>
                <li>Shared experiences</li>
                <li>Friendship building</li>
              </ul>
            </div>

            <div className="card reveal">
              <h4 className="font-semibold">2025 Session Pass</h4>
              <p className="text-sm text-slate-600 mt-1">
                Full-term access providing comprehensive support throughout the school term.
              </p>
              <ul className="mt-3 list-disc pl-5 text-sm text-slate-700 space-y-1">
                <li>July 22 - October term</li>
                <li>Multiple weekly sessions</li>
                <li>Priority booking</li>
                <li>Family support included</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold">Ready to Join Our Community?</h2>
          <p className="text-indigo-100">
            Take the first step towards a supportive, inclusive learning environment where your child can thrive.
            We're here to answer your questions and help you find the right program fit.
          </p>
          <div className="mt-6 flex gap-3">
            <Link
              to="/book-a-visit"
              className="rounded-md bg-white px-4 py-2 font-semibold text-indigo-700 shadow hover:shadow-md"
            >
              Book a Visit
            </Link>
            <Link
              to="/contact-us"
              className="rounded-md border border-white/80 px-4 py-2 text-white hover:bg-white/10"
            >
              Get Information
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}