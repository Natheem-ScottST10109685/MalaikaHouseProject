import React, { useMemo, useState } from 'react';

const sampleEvents = [
    { id: 1, date: 15, month: 'OCT', title: 'Social Skills Workshop', type: 'Heart Program', time: '2:00 PM - 4:00 PM', location: 'Main Activity Room', facilitator: 'Jessica Miller', status: 'Ongoing', attendees: '12/15' },
    { id: 2, date: 17, month: 'OCT', title: 'Square Peg Creative Club', type: 'Club', time: '10:00 AM - 12:00 PM', location: 'Art Studio', facilitator: 'Marcus Johnson', status: 'Upcoming', attendees: '8/12' },
    { id: 3, date: 20, month: 'OCT', title: 'Individual Support Session', type: 'Session', time: '9:00 AM - 10:00 AM', location: 'Private Room A', facilitator: 'Maria Williams', status: 'Upcoming', attendees: '1/1' }
];

export default function Events() {
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('All Types');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [timeFilter, setTimeFilter] = useState('All Time');

    const filtered = useMemo(() => {
        return sampleEvents.filter(e => {
            const text = (e.title + ' ' + e.type + ' ' + e.facilitator + ' ' + e.location).toLowerCase();
            if (search && !text.includes(search.toLowerCase())) return false;
            if (typeFilter !== 'All Types' && !e.type.toLowerCase().includes(typeFilter.toLowerCase().replace(' activities', ''))) return false;
            if (statusFilter !== 'All Status' && !e.status.toLowerCase().includes(statusFilter.toLowerCase())) return false;
            // timeFilter left as placeholder for further logic
            return true;
        });
    }, [search, typeFilter, statusFilter, timeFilter]);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Events Management</h1>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-white border rounded-md text-sm">Export Calendar</button>
                        <button className="px-4 py-2 bg-slate-800 text-white rounded-md text-sm">+ Create Event</button>
                    </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4 mb-6">
                    <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white rounded-md p-4 shadow text-center">
                            <div className="text-2xl font-bold">24</div>
                            <div className="text-sm text-slate-500">This Month</div>
                        </div>
                        <div className="bg-white rounded-md p-4 shadow text-center">
                            <div className="text-2xl font-bold">8</div>
                            <div className="text-sm text-slate-500">This Week</div>
                        </div>
                        <div className="bg-white rounded-md p-4 shadow text-center">
                            <div className="text-2xl font-bold">3</div>
                            <div className="text-sm text-slate-500">Today</div>
                        </div>
                        <div className="bg-white rounded-md p-4 shadow text-center">
                            <div className="text-2xl font-bold">156</div>
                            <div className="text-sm text-slate-500">Total Attendees</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-md p-4 shadow">
                        <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold">October 2024</div>
                            <div className="flex gap-2">
                                <button className="w-8 h-8 rounded bg-slate-100">‹</button>
                                <button className="w-8 h-8 rounded bg-slate-100">›</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-xs font-semibold text-center">
                            <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-xs mt-2">
                            {Array.from({ length: 31 }).map((_, i) => (
                                <div key={i} className={`p-2 rounded ${[3, 7, 10, 15, 17, 20, 22].includes(i + 1) ? 'bg-emerald-200 font-bold' : ''}`}>{i + 1}</div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-md shadow mb-6 flex flex-wrap gap-4 items-center">
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium">Event Type:</label>
                        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="border rounded p-2 text-sm">
                            <option>All Types</option>
                            <option>Heart Program</option>
                            <option>Club</option>
                            <option>Session</option>
                            <option>Workshop</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium">Status:</label>
                        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border rounded p-2 text-sm">
                            <option>All Status</option>
                            <option>Upcoming</option>
                            <option>Ongoing</option>
                            <option>Completed</option>
                            <option>Cancelled</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium">Time:</label>
                        <select value={timeFilter} onChange={e => setTimeFilter(e.target.value)} className="border rounded p-2 text-sm">
                            <option>All Time</option>
                            <option>Today</option>
                            <option>This Week</option>
                            <option>This Month</option>
                        </select>
                    </div>

                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events by title, description, or facilitator..." className="flex-1 min-w-[180px] border rounded p-2" />
                </div>

                <div className="grid gap-4">
                    {filtered.map(ev => (
                        <div key={ev.id} className="bg-white rounded-2xl p-4 shadow">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="bg-emerald-400 text-white rounded-md p-3 text-center min-w-[60px]"><div className="text-lg font-bold">{ev.date}</div><div className="text-sm">{ev.month}</div></div>
                                    <div>
                                        <div className="text-sm uppercase text-slate-500 font-semibold">{ev.type}</div>
                                        <h3 className="text-lg font-semibold">{ev.title}</h3>
                                        <div className="text-sm text-slate-500 mt-2">
                                            <div className="flex items-center gap-2"><span>🕒</span>{ev.time}</div>
                                            <div className="flex items-center gap-2"><span>📍</span>{ev.location}</div>
                                            <div className="flex items-center gap-2"><span>👨‍🏫</span>{ev.facilitator}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 items-end">
                                    <div className={`text-sm font-semibold px-2 py-1 rounded ${ev.status === 'Ongoing' ? 'bg-emerald-100 text-emerald-700' : ev.status === 'Upcoming' ? 'bg-slate-100 text-slate-700' : 'bg-slate-200 text-slate-700'}`}>{ev.status}</div>
                                    <div className="flex gap-2">
                                        <button onClick={() => alert(`Opening detailed view for ${ev.title}...`)} className="px-3 py-1 bg-slate-800 text-white rounded">👁️</button>
                                        <button onClick={() => alert(`Opening edit form for ${ev.title}...`)} className="px-3 py-1 bg-indigo-200 rounded">✏️</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
