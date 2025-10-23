import React, { useState } from 'react';

const Notifications = () => {
    const [sidebarActive, setSidebarActive] = useState(false);
    const [masterToggles, setMasterToggles] = useState({ system: true, payments: true, users: true });
    const [optionToggles, setOptionToggles] = useState({ backups: false, paymentsSuccess: true, paymentsFail: true, registrations: true, bookings: false, cancellations: true });
    const [filter, setFilter] = useState('All');
    const [notifications, setNotifications] = useState([
        { id: 1, type: 'error', title: 'MailChimp Integration Error', message: 'Connection to MailChimp API failed. Newsletter sync has been paused.', category: 'System Alert', time: '2 minutes ago', unread: true },
        { id: 2, type: 'success', title: 'Payment Received', message: 'R850.00 payment from Sarah Mitchell for Heart Program session', category: 'Payment', time: '15 minutes ago', unread: true },
        { id: 3, type: 'info', title: 'New Parent Registration', message: 'Michael Thompson registered with child Emma (age 9)', category: 'User Activity', time: '1 hour ago', unread: false },
        { id: 4, type: 'warning', title: 'Session Cancellation', message: "Rodriguez family cancelled tomorrow's 2:00 PM session", category: 'Scheduling', time: '2 hours ago', unread: false },
        { id: 5, type: 'info', title: 'Session Reminder', message: 'Emma Mitchell has a Heart Program session in 30 minutes', category: 'Scheduling', time: '4 hours ago', unread: true }
    ]);

    const templates = [
        { id: 1, name: 'Session Reminder', desc: 'Automated reminders for upcoming sessions' },
        { id: 2, name: 'Payment Confirmation', desc: 'Payment receipt and confirmation' },
        { id: 3, name: 'Welcome Message', desc: 'New parent welcome and orientation' }
    ];

    const toggleMaster = (key) => {
        setMasterToggles(prev => ({ ...prev, [key]: !prev[key] }));
        alert(`${key} notifications ${!masterToggles[key] ? 'enabled' : 'disabled'}`);
    };

    const toggleOption = (key) => {
        setOptionToggles(prev => ({ ...prev, [key]: !prev[key] }));
        alert(`${key} ${!optionToggles[key] ? 'enabled' : 'disabled'}`);
    };

    const markRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
    };

    const dismiss = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const filtered = notifications.filter(n => filter === 'All' || n.category === filter || (filter === 'Unread' && n.unread));

    return (
        <div className="flex-1 min-h-0">
            <div className="bg-white shadow-sm px-8 py-6 flex justify-between items-center sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <button onClick={() => setSidebarActive(s => !s)} className="px-3 py-2 bg-[#7B9BC4] text-white rounded md:hidden">☰</button>
                    <h1 className="text-3xl font-bold text-[#5D5A7A]">🔔 Notifications</h1>
                </div>

                <div className="flex gap-4">
                    <button onClick={() => { setNotifications(prev => prev.map(n => ({ ...n, unread: false }))); alert('All notifications marked as read'); }} className="px-4 py-2 rounded-lg bg-gray-100 text-[#5D5A7A]">Mark All Read</button>
                    <button onClick={() => alert('Opening notification composer...')} className="px-4 py-2 rounded-lg bg-[#7B9BC4] text-white">Send Notification</button>
                </div>
            </div>

            <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white rounded-xl p-4 shadow-md text-center"> <div className="text-2xl font-bold">23</div><div className="text-sm text-[#6B5F7A]">Total Today</div></div>
                        <div className="bg-white rounded-xl p-4 shadow-md text-center"> <div className="text-2xl font-bold">7</div><div className="text-sm text-[#6B5F7A]">Unread</div></div>
                        <div className="bg-white rounded-xl p-4 shadow-md text-center"> <div className="text-2xl font-bold">2</div><div className="text-sm text-[#6B5F7A]">High Priority</div></div>
                        <div className="bg-white rounded-xl p-4 shadow-md text-center"> <div className="text-2xl font-bold">156</div><div className="text-sm text-[#6B5F7A]">This Week</div></div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="flex justify-between items-center mb-4 border-b pb-4">
                            <h2 className="text-xl font-semibold text-[#5D5A7A]">Notification Settings</h2>
                            <button onClick={() => { setMasterToggles({ system: true, payments: true, users: true }); setOptionToggles({}); alert('Settings reset to default'); }} className="px-3 py-2 rounded bg-gray-100">Reset to Default</button>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded">
                                <div className="flex justify-between items-center mb-3">
                                    <div className="font-semibold">System Notifications</div>
                                    <button onClick={() => toggleMaster('system')} className={`w-12 h-6 rounded-full ${masterToggles.system ? 'bg-[#8DB4A8]' : 'bg-gray-300'}`}></button>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="font-medium">System Errors</div>
                                            <div className="text-sm text-[#6B5F7A]">Critical system failures and errors</div>
                                        </div>
                                        <button onClick={() => toggleOption('backups')} className={`w-10 h-5 rounded-full ${optionToggles.backups ? 'bg-[#7B9BC4]' : 'bg-gray-300'}`}></button>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="font-medium">Integration Status</div>
                                            <div className="text-sm text-[#6B5F7A]">Third-party integration updates</div>
                                        </div>
                                        <button onClick={() => toggleOption('integrations')} className={`w-10 h-5 rounded-full ${optionToggles.integrations ? 'bg-[#7B9BC4]' : 'bg-gray-300'}`}></button>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded">
                                <div className="flex justify-between items-center mb-3">
                                    <div className="font-semibold">Payment Notifications</div>
                                    <button onClick={() => toggleMaster('payments')} className={`w-12 h-6 rounded-full ${masterToggles.payments ? 'bg-[#8DB4A8]' : 'bg-gray-300'}`}></button>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="font-medium">Payment Success</div>
                                            <div className="text-sm text-[#6B5F7A]">Successful payment confirmations</div>
                                        </div>
                                        <button onClick={() => toggleOption('paymentsSuccess')} className={`w-10 h-5 rounded-full ${optionToggles.paymentsSuccess ? 'bg-[#7B9BC4]' : 'bg-gray-300'}`}></button>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="font-medium">Payment Failures</div>
                                            <div className="text-sm text-[#6B5F7A]">Failed payment alerts</div>
                                        </div>
                                        <button onClick={() => toggleOption('paymentsFail')} className={`w-10 h-5 rounded-full ${optionToggles.paymentsFail ? 'bg-[#7B9BC4]' : 'bg-gray-300'}`}></button>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded">
                                <div className="flex justify-between items-center mb-3">
                                    <div className="font-semibold">User Activity</div>
                                    <button onClick={() => toggleMaster('users')} className={`w-12 h-6 rounded-full ${masterToggles.users ? 'bg-[#8DB4A8]' : 'bg-gray-300'}`}></button>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="font-medium">New Registrations</div>
                                            <div className="text-sm text-[#6B5F7A]">New parent and child registrations</div>
                                        </div>
                                        <button onClick={() => toggleOption('registrations')} className={`w-10 h-5 rounded-full ${optionToggles.registrations ? 'bg-[#7B9BC4]' : 'bg-gray-300'}`}></button>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="font-medium">Session Bookings</div>
                                            <div className="text-sm text-[#6B5F7A]">New session booking alerts</div>
                                        </div>
                                        <button onClick={() => toggleOption('bookings')} className={`w-10 h-5 rounded-full ${optionToggles.bookings ? 'bg-[#7B9BC4]' : 'bg-gray-300'}`}></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="flex justify-between items-center mb-4 border-b pb-4">
                            <h2 className="text-xl font-semibold text-[#5D5A7A]">Recent Notifications</h2>
                            <div>
                                <button onClick={() => setNotifications([]) || alert('All notifications cleared')} className="px-3 py-2 rounded bg-gray-100">Clear All</button>
                            </div>
                        </div>

                        <div className="flex gap-2 mb-4 flex-wrap">
                            {['All', 'System', 'Payment', 'Users', 'Unread'].map(c => (
                                <button key={c} onClick={() => setFilter(c)} className={`px-3 py-1 rounded ${filter === c ? 'bg-[#7B9BC4] text-white' : 'bg-gray-100 text-[#5D5A7A]'}`}>{c}</button>
                            ))}
                        </div>

                        <div className="space-y-3">
                            {filtered.map(n => (
                                <div key={n.id} className={`p-4 rounded-lg ${n.unread ? 'bg-gray-50 border-l-4 border-[#7B9BC4]' : 'bg-white'}`}>
                                    <div className="flex gap-4 items-start">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${n.type === 'success' ? 'bg-green-500' : n.type === 'error' ? 'bg-red-500' : n.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'}`}>{n.type === 'success' ? '✔' : n.type === 'error' ? '!' : n.type === 'warning' ? '⚠' : 'i'}</div>
                                        <div className="flex-1">
                                            <div className="font-semibold text-[#5D5A7A]">{n.title}</div>
                                            <div className="text-sm text-[#6B5F7A] mb-2">{n.message}</div>
                                            <div className="text-xs text-[#6B5F7A]">{n.category} • {n.time}</div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            {n.unread && <button onClick={() => markRead(n.id)} className="px-2 py-1 rounded bg-[#7B9BC4] text-white">✓</button>}
                                            <button onClick={() => dismiss(n.id)} className="px-2 py-1 rounded bg-gray-200">✕</button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {filtered.length === 0 && <div className="text-sm text-[#6B5F7A]">No notifications to show.</div>}
                        </div>
                    </div>
                </div>

                <aside className="space-y-6">
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-[#5D5A7A]">Notification Templates</h3>
                            <button onClick={() => alert('Create Template')} className="px-3 py-1 rounded bg-gray-100">Create Template</button>
                        </div>

                        <div className="space-y-2">
                            {templates.map(t => (
                                <div key={t.id} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                                    <div>
                                        <div className="font-medium text-[#5D5A7A]">{t.name}</div>
                                        <div className="text-sm text-[#6B5F7A]">{t.desc}</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => alert(`Edit ${t.name}`)} className="px-2 py-1 rounded bg-[#7B9BC4] text-white">Edit</button>
                                        <button onClick={() => alert(`Send ${t.name}`)} className="px-2 py-1 rounded bg-[#8DB4A8] text-white">Send</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Notifications;
