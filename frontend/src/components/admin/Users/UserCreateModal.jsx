import React, { useState} from "react";
import Modal from "../../common/Modal";
import { apiFetch } from "../../../lib/api";

const ROLES = [
    { value: "PARENT", label: "Internal Parent" },
    { value: "PARTNER", label: "External Partner" },
    { value: "STAFF", label: "Staff Member" },
    { value: "ADMIN", label: "Admin" },
];

export default function UserCreateModal({ open, onClose, onCreated }) {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("PARENT");
    const [sending, setSending] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSending(true);
        try {
            const res = await apiFetch("/admin/users/invite", {
                method: "POST",
                body: JSON.stringify({ email, role }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                if (res.status === 409 || data?.error?.code === "EMAIL_TAKEN") {
                    setError("A user with that email already exists.");
                } else {
                    setError(data?.error || "Could not create user");
                }
                return;
            }

            const data = await res.json();
            onCreated?.(data.user);
            onClose();
        } catch (err) {
            setError("Network error. Please try again.");
        } finally {
            setSending(false);
        }
    }

    const footer = (
        <>
        <button
            type="button"
            className="px-4 py-2 rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200"
            onClick={onClose}
            disabled={sending}
        >
            Cancel
        </button>
        <button
            form="createUserForm"
            type="submit"
            className="px-4 py-2 rounded-md bg-[#7B9BC4] text-white hover:bg-[#8DB4A8]"
            disabled={sending || !email}
        >
            {sending ? "Creating..." : "Create & Send Invite"}
        </button>
        </>
    );

    return (
        <Modal open={open} onClose={onClose} title="Create New User" footer={footer}>
        <form id="createUserForm" onSubmit={handleSubmit} className="space-y-4">
            <div>
            <label className="block text-sm font-medium text-slate-700">Email address</label>
            <input
                type="email"
                className="mt-1 block w-full rounded-md border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="parent@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-slate-700">Role</label>
            <select
                className="mt-1 block w-full rounded-md border border-slate-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={role}
                onChange={(e) => setRole(e.target.value)}
            >
                {ROLES.map(r => (
                <option key={r.value} value={r.value}>{r.label}</option>
                ))}
            </select>
            </div>

            {error && <div className="text-sm text-red-600">{error}</div>}

            <p className="text-xs text-slate-500">
            We’ll create the account and email a one-time link for the user to set their password.
            </p>
        </form>
        </Modal>
    )
}