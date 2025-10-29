import React from "react";

export default function Modal({ open, onClose, title, children, footer}) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-[100]">
        {/* backdrop */}
        <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
        />
        {/* dialog */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b">
                <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
                <button
                onClick={onClose}
                className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-slate-100 text-slate-600"
                aria-label="Close"
                >
                ✕
                </button>
            </div>

            <div className="px-6 py-5">{children}</div>

            {footer && (
                <div className="px-6 py-4 border-t bg-slate-50 rounded-b-2xl">
                <div className="flex items-center justify-end gap-2">{footer}</div>
                </div>
            )}
            </div>
        </div>
        </div>
    );
}