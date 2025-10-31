import React, { useEffect, useRef, useState } from "react";

const DEFAULTS = {
  ttsEnabled: false,
  highContrast: false,
  fontPx: 16,
  minFontPx: 12,
  maxFontPx: 24,
  ttsLang: "en-US",
};

function storageKeys(prefix = "a11y") {
  return {
    tts: `${prefix}_tts_enabled`,
    contrast: `${prefix}_high_contrast`,
    fontSize: `${prefix}_root_font_size_px`,
  };
}

export default function AccessibilityPanel({
  storagePrefix = "a11y",
  defaultFontPx = DEFAULTS.fontPx,
  minFontPx = DEFAULTS.minFontPx,
  maxFontPx = DEFAULTS.maxFontPx,
  ttsLang = DEFAULTS.ttsLang,
  initialOpen = false,
  position = "bottom-right",
  showTTS = true,
  showContrast = true,
  showTextSize = true,
}) {
  const KEYS = storageKeys(storagePrefix);

  const [panelOpen, setPanelOpen] = useState(initialOpen);

  const [ttsEnabled, setTtsEnabled] = useState(DEFAULTS.ttsEnabled);
  const [contrast, setContrast] = useState(DEFAULTS.highContrast);
  const [fontPx, setFontPx] = useState(defaultFontPx);

  const clickHandlerRef = useRef(null);

  useEffect(() => {
    const savedTts = localStorage.getItem(KEYS.tts);
    const savedContrast = localStorage.getItem(KEYS.contrast);
    const savedFont = localStorage.getItem(KEYS.fontSize);

    if (savedTts != null) setTtsEnabled(savedTts === "1");
    if (savedContrast != null) setContrast(savedContrast === "1");
    if (savedFont != null && !Number.isNaN(parseInt(savedFont, 10))) {
      const px = Math.min(maxFontPx, Math.max(minFontPx, parseInt(savedFont, 10)));
      setFontPx(px);
    }
  }, [KEYS.tts, KEYS.contrast, KEYS.fontSize, minFontPx, maxFontPx]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.fontSize = `${fontPx}px`;
    localStorage.setItem(KEYS.fontSize, String(fontPx));
  }, [fontPx, KEYS.fontSize]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("high-contrast", contrast);
    localStorage.setItem(KEYS.contrast, contrast ? "1" : "0");
  }, [contrast, KEYS.contrast]);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const canSpeak = !!synth;

    const stopSpeaking = () => {
      try { synth?.cancel(); } catch {}
    };

    const speak = (text) => {
      if (!canSpeak) return;
      if (!text || !text.trim()) return;
      stopSpeaking();
      const utter = new SpeechSynthesisUtterance(text.trim());
      utter.rate = 1;
      utter.pitch = 1;
      utter.lang = ttsLang;
      synth.speak(utter);
    };

    const onClickRead = (e) => {
      const node = e.target;
      const tag = (node.tagName || "").toLowerCase();
      if (["input", "button", "select", "textarea"].includes(tag)) return;
      if (node.closest('[data-a11y-ignore="1"]')) return;

      const selection = window.getSelection?.();
      const selected = selection && String(selection.toString());
      if (selected) {
        speak(selected);
        return;
      }
      const container = node.closest("[data-tts]") || node;
      speak(container.textContent);
    };

    if (ttsEnabled) {
      document.body.addEventListener("click", onClickRead, true);
      clickHandlerRef.current = onClickRead;
      localStorage.setItem(KEYS.tts, "1");
    } else {
      if (clickHandlerRef.current) {
        document.body.removeEventListener("click", clickHandlerRef.current, true);
        clickHandlerRef.current = null;
      }
      stopSpeaking();
      localStorage.setItem(KEYS.tts, "0");
    }

    return () => {
      if (clickHandlerRef.current) {
        document.body.removeEventListener("click", clickHandlerRef.current, true);
        clickHandlerRef.current = null;
      }
      stopSpeaking();
    };
  }, [ttsEnabled, ttsLang, KEYS.tts]);

  // helpers
  const incFont = () => setFontPx((v) => Math.min(maxFontPx, v + 2));
  const decFont = () => setFontPx((v) => Math.max(minFontPx, v - 2));
  const resetFont = () => setFontPx(defaultFontPx);

  const posClass = {
    "bottom-right": "bottom-5 right-5",
    "bottom-left": "bottom-5 left-5",
    "top-right": "top-5 right-5",
    "top-left": "top-5 left-5",
  }[position] || "bottom-5 right-5";

  return (
    <div className={`fixed ${posClass} z-50`} role="region" aria-label="Accessibility options">
      {/* FAB */}
      <button
        aria-expanded={panelOpen}
        aria-controls="a11y-panel"
        onClick={() => setPanelOpen((o) => !o)}
        className="rounded-full p-3 shadow-lg bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        title="Accessibility options"
      >
        ♿
      </button>

      {/* Panel */}
      {panelOpen && (
        <div
          id="a11y-panel"
          className="mt-2 w-72 rounded-2xl bg-white shadow-xl ring-1 ring-slate-200 p-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Accessibility</h3>
            <button
              onClick={() => setPanelOpen(false)}
              className="text-slate-500 hover:text-slate-700"
              data-a11y-ignore="1"
              aria-label="Close accessibility panel"
              title="Close"
            >
              ✕
            </button>
          </div>

          <div className="mt-3 space-y-4">
            {showTTS && (
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-medium">Text-to-Speech</div>
                  <p className="text-sm text-slate-600">
                    When enabled, click any text (or select text) to hear it.
                  </p>
                </div>
                <button
                  onClick={() => setTtsEnabled((v) => !v)}
                  className={`shrink-0 px-3 py-1.5 rounded-md border ${
                    ttsEnabled ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-800 hover:bg-slate-50"
                  }`}
                  aria-pressed={ttsEnabled}
                  title="Toggle text-to-speech"
                >
                  {ttsEnabled ? "On" : "Off"}
                </button>
              </div>
            )}

            {showContrast && (
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-medium">High Contrast</div>
                  <p className="text-sm text-slate-600">Increases text contrast and outlines UI.</p>
                </div>
                <button
                  onClick={() => setContrast((v) => !v)}
                  className={`shrink-0 px-3 py-1.5 rounded-md border ${
                    contrast ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-800 hover:bg-slate-50"
                  }`}
                  aria-pressed={contrast}
                  title="Toggle high contrast"
                >
                  {contrast ? "On" : "Off"}
                </button>
              </div>
            )}

            {showTextSize && (
              <div className="space-y-2">
                <div className="font-medium">Text Size</div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={decFont}
                    className="px-3 py-1.5 rounded-md border bg-white hover:bg-slate-50"
                    title="Decrease text size"
                  >
                    A−
                  </button>
                  <button
                    onClick={resetFont}
                    className="px-3 py-1.5 rounded-md border bg-white hover:bg-slate-50"
                    title="Reset text size"
                  >
                    Reset
                  </button>
                  <button
                    onClick={incFont}
                    className="px-3 py-1.5 rounded-md border bg-white hover:bg-slate-50"
                    title="Increase text size"
                  >
                    A+
                  </button>
                  <span className="ml-auto text-xs text-slate-500 tabular-nums" aria-live="polite">
                    {fontPx}px
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
