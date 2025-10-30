import React from "react";
import { Link } from "react-router-dom";

export default function SideBar({
    open = false,
    onClose,
    user,
    sections = [],
    activeHref = "#overview",
    onItemClick,
    headerSlot,
    logoUrl = "https://i.postimg.cc/9QhL2Tz3/2022-12-10-Malaika-House-Name-only-png.png",
}) {

  const handleClose = () => { if (typeof onClose === "function") onClose(); };

    return (
        <>
      <div
        className={`fixed inset-0 z-40 bg-black/30 md:hidden transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={handleClose}
      />

      <aside
        className={`fixed top-0 left-0 z-50 w-64 h-screen transition-transform md:translate-x-0 bg-[#5D5A7A] text-white
        ${open ? "translate-x-0" : "-translate-x-full"}`}
        aria-label="Sidebar"
      >
        <div className="p-5 bg-[#6B5F7A]">
          <Link to="/" className="block">
            <img src={logoUrl} alt="Malaika House Logo" className="h-10" />
          </Link>

          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="font-semibold truncate">{user?.email ?? 'User'}</div>
            <div className="text-sm opacity-80">{user?.role ?? 'ACCOUNT'}</div>
            {headerSlot}
          </div>
        </div>

        <nav className="py-5 overflow-y-auto h-[calc(100vh-110px)] sidebar-scroll">
          {sections.map((section, idx) => (
            <div key={idx} className="mb-6">
              {section.title ? (
                <div className="px-5 pb-2 text-xs uppercase tracking-wider opacity-70 font-semibold">
                  {section.title}
                </div>
              ) : null}

              <ul className="flex flex-col">
                {section.items.map((item) => {
                  const isActive = activeHref === item.href;
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          onItemClick?.(item.href, e);
                          if (window.innerWidth < 768) handleClose?.();
                        }}
                        className={`flex items-center gap-2 px-5 py-3 text-white hover:bg-white/10 transition-colors
                          border-l-4 ${isActive ? "border-[#7B9BC4] bg-white/10" : "border-transparent"}`}
                      >
                        <span className="text-lg leading-none">{item.icon ?? "•"}</span>
                        <span>{item.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}