import { useState, useMemo } from "react";
import { NavLink, Link } from "react-router-dom";
import NavSearch from "../../components/public/NavSearch";

const linkBase = "px-3 py-2 rounded-md text-sm font-medium transition-colors";
const linkActive = "text-indigo-700 underline underline-offset-8 decoration-2";
const linkIdle = "text-slate-700 hover:text-indigo-700 hover:bg-slate-50";
const linkClass = ({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`;

export default function PublicNav() {
  const [open, setOpen] = useState(false);

  const searchIndex = useMemo(
    () => [
      { path: "/", label: "Home", keywords: ["landing", "malaika house", "start"], snippet: "Heart-focused learning & support" },
      { path: "/what-we-offer", label: "What We Offer", keywords: ["programs", "clubs", "sessions", "heart program"] },
      { path: "/our-story", label: "Our Story", keywords: ["mission", "values", "journey", "approach"] },
      { path: "/staff-supporters", label: "Staff & Supporters", keywords: ["team", "leadership", "partners", "sponsors"] },
      { path: "/parent-info", label: "Parent Info", keywords: ["fees", "pricing", "application", "guidelines", "resources"] },
      { path: "/book-a-visit", label: "Book a Visit", keywords: ["visit", "schedule", "tour", "onsite", "online"] },
      { path: "/contact-us", label: "Contact Us", keywords: ["email", "phone", "faq", "support"] },
    ],
    []
  );

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <nav className="max-w-8xl mx-auto flex items-center justify-between gap-3 px-4 py-2.5">
        {/* Logo */}
        <Link to="/" className="inline-flex items-center gap-3 shrink-0">
          <img
            src="https://i.postimg.cc/9QhL2Tz3/2022-12-10-Malaika-House-Name-only-png.png"
            alt="Malaika House"
            className="h-9 md:h-10"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          <li><NavLink to="/" end className={linkClass}>Home</NavLink></li>
          <li><NavLink to="/what-we-offer" className={linkClass}>What We Offer</NavLink></li>
          <li><NavLink to="/our-story" className={linkClass}>Our Story</NavLink></li>
          <li><NavLink to="/staff-supporters" className={linkClass}>Staff & Supporters</NavLink></li>
          <li><NavLink to="/parent-info" className={linkClass}>Parent Info</NavLink></li>
          <li><NavLink to="/book-a-visit" className={linkClass}>Book a Visit</NavLink></li>
          <li><NavLink to="/contact-us" className={linkClass}>Contact Us</NavLink></li>
        </ul>

        {/* Desktop search + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <NavSearch index={searchIndex} variant="desktop" />
          <Link
            to="/login"
            className="h-9 inline-flex items-center rounded-md bg-indigo-600 px-3 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </nav>

      {/* Mobile panel */}
      <div
        className={`md:hidden overflow-hidden border-t transition-[max-height,opacity] duration-300 ${
          open ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        } bg-white`}
      >
        <ul className="max-w-6xl mx-auto px-4 py-3 space-y-2">
          {[
            { to: "/", label: "Home", end: true },
            { to: "/what-we-offer", label: "What We Offer" },
            { to: "/our-story", label: "Our Story" },
            { to: "/staff-supporters", label: "Staff & Supporters" },
            { to: "/parent-info", label: "Parent Info" },
            { to: "/book-a-visit", label: "Book a Visit" },
            { to: "/contact-us", label: "Contact Us" },
          ].map(({ to, label, end }) => (
            <li key={to}>
              <NavLink to={to} end={end} className={linkClass} onClick={() => setOpen(false)}>
                {label}
              </NavLink>
            </li>
          ))}

          {/* mobile search + CTA */}
          <li className="pt-2">
            <div className="flex items-center gap-2">
              <NavSearch index={searchIndex} variant="mobile" className="flex-1" />
              <Link
                to="/parent"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 items-center rounded-md bg-indigo-600 px-3 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Parent
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
}
