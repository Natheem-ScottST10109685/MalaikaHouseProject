import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavSearch({
  index,
  placeholder = "Search…",
  variant = "desktop",
  className = "",
}) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const popoverRef = useRef(null);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    const scored = (index || []).map((it) => {
      const hayLabel = (it.label || "").toLowerCase();
      const hayPath = (it.path || "").toLowerCase();
      const hayKw = (it.keywords || []).join(" ").toLowerCase();

      let score = 0;
      if (hayLabel.includes(query)) score += 5;
      if (hayPath.includes(query)) score += 3;
      if (hayKw.includes(query)) score += 2;

      if (hayLabel.startsWith(query)) score += 2;

      return { ...it, _score: score };
    });
    return scored
      .filter((r) => r._score > 0)
      .sort((a, b) => b._score - a._score)
      .slice(0, 8);
  }, [q, index]);

  useEffect(() => {
    setActive(0);
  }, [results.length]);

  useEffect(() => {
    const onClick = (e) => {
      if (!open) return;
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (results.length) {
      navigate(results[active]?.path);
      setOpen(false);
      setQ("");
    }
  };

  const onKeyDown = (e) => {
    if (!open && ["ArrowDown", "ArrowUp"].includes(e.key)) {
      setOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, Math.max(0, results.length - 1)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      if (results[active]) {
        e.preventDefault();
        navigate(results[active].path);
        setOpen(false);
        setQ("");
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const wrapperClasses =
    variant === "desktop"
      ? "relative"
      : "relative w-full";

  const inputClasses =
    variant === "desktop"
      ? "h-9 w-44 rounded-md border border-slate-300 bg-white pl-8 pr-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      : "h-10 w-full rounded-md border border-slate-300 bg-white pl-8 pr-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500";

  const iconSize = variant === "desktop" ? 16 : 16;

  return (
    <form
      className={`${wrapperClasses} ${className}`}
      role="search"
      onSubmit={onSubmit}
      autoComplete="off"
    >
      <span className="pointer-events-none absolute inset-y-0 left-2 inline-flex items-center">
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 20 20"
          aria-hidden="true"
          className="text-slate-400"
        >
          <path
            fill="currentColor"
            d="M12.9 14.32a8 8 0 1 1 1.41-1.41l3.4 3.4a1 1 0 0 1-1.42 1.42l-3.39-3.41ZM14 8a6 6 0 1 0-12 0a6 6 0 0 0 12 0Z"
          />
        </svg>
      </span>
      <input
        ref={inputRef}
        type="search"
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
        }}
        onFocus={() => q && setOpen(true)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        aria-label="Search site"
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls="navsearch-listbox"
        className={inputClasses}
      />

      {/* Suggestions */}
      {open && results.length > 0 && (
        <div
          ref={popoverRef}
          id="navsearch-listbox"
          role="listbox"
          className="absolute z-50 mt-1 w-[min(24rem,90vw)] rounded-md border border-slate-200 bg-white shadow-lg"
        >
          <ul className="max-h-72 overflow-auto py-1 text-sm">
            {results.map((r, i) => {
              const isActive = i === active;
              return (
                <li key={r.path}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    className={`block w-full px-3 py-2 text-left ${
                      isActive ? "bg-indigo-50 text-indigo-700" : "hover:bg-slate-50"
                    }`}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => {
                      navigate(r.path);
                      setOpen(false);
                      setQ("");
                    }}
                  >
                    <div className="font-medium">{r.label}</div>
                    {r.snippet && (
                      <div className="text-xs text-slate-500">{r.snippet}</div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </form>
  );
}
