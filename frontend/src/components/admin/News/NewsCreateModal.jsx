import React, { useState } from "react";
import Modal from "../../common/Modal";
import { apiFetch } from "../../../lib/api";

export default function NewsCreateModal({ open, onClose, onCreated }) {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("DRAFT");
  const [publishAt, setPublishAt] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const body = {
        title,
        excerpt,
        content,
        status,
        publishAt: status === "SCHEDULED" && publishAt ? new Date(publishAt).toISOString() : undefined,
      };
      const res = await apiFetch("/admin/news", { method: "POST", body: JSON.stringify(body) });
      if (!res.ok) throw new Error("Failed to create post");
      const post = await res.json();
      onCreated?.(post);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to create post");
    } finally {
      setSaving(false);
    }
  }

  const footer = (
    <>
      <button
        type="button"
        className="px-4 py-2 rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200"
        onClick={onClose}
        disabled={saving}
      >
        Cancel
      </button>
      <button
        form="newsCreateForm"
        type="submit"
        className="px-4 py-2 rounded-md bg-[#7B9BC4] text-white hover:bg-[#8DB4A8]"
        disabled={saving || !title}
      >
        {saving ? "Saving..." : "Create Post"}
      </button>
    </>
  );

  return (
    <Modal open={open} onClose={onClose} title="Create News / Update" footer={footer}>
      <form id="newsCreateForm" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Title *</label>
          <input
            className="mt-1 w-full rounded-md border border-slate-300 p-2 focus:ring-indigo-500 focus:outline-none"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Excerpt</label>
          <textarea
            className="mt-1 w-full rounded-md border border-slate-300 p-2 focus:ring-indigo-500 focus:outline-none"
            rows={3}
            value={excerpt}
            onChange={(e)=>setExcerpt(e.target.value)}
            placeholder="Short summary shown in lists"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Content</label>
          <textarea
            className="mt-1 w-full rounded-md border border-slate-300 p-2 focus:ring-indigo-500 focus:outline-none"
            rows={6}
            value={content}
            onChange={(e)=>setContent(e.target.value)}
            placeholder="Full post content"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Status</label>
            <select
              className="mt-1 w-full rounded-md border border-slate-300 p-2 focus:ring-indigo-500 focus:outline-none"
              value={status}
              onChange={(e)=>setStatus(e.target.value)}
            >
              <option value="DRAFT">Draft</option>
              <option value="SCHEDULED">Scheduled</option>
              <option value="PUBLISHED">Published</option>
            </select>
          </div>
          {status === "SCHEDULED" && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700">Publish At</label>
              <input
                type="datetime-local"
                className="mt-1 w-full rounded-md border border-slate-300 p-2 focus:ring-indigo-500 focus:outline-none"
                value={publishAt}
                onChange={(e)=>setPublishAt(e.target.value)}
              />
            </div>
          )}
        </div>

        {error && <div className="text-sm text-red-600">{error}</div>}
      </form>
    </Modal>
  );
}