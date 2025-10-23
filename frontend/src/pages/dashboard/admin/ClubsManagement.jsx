import React from 'react';

const participants = [
    { id: 1, initials: 'EM', name: 'Emma Mitchell (8)', details: 'Social Skills Focus • Started: Jan 2024', progress: 78 },
    { id: 2, initials: 'AX', name: 'Alex Chen (10)', details: 'Communication Support • Started: Mar 2024', progress: 65 },
    { id: 3, initials: 'SF', name: 'Sofia Rodriguez (9)', details: 'Sensory Integration • Started: Feb 2024', progress: 82 }
];

export default function ClubsManagement() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold flex items-center gap-2"><span className="text-red-500">❤️</span> Heart Program Management</h1>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-white border rounded-md text-sm">Program Report</button>
                        <button className="px-4 py-2 bg-slate-800 text-white rounded-md text-sm">+ Add Participant</button>
                    </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4 mb-6">
                    <div className="col-span-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white rounded-md p-4 shadow text-center">
                            <div className="text-2xl font-bold">73</div>
                            <div className="text-sm text-slate-500">Total Participants</div>
                        </div>
                        <div className="bg-white rounded-md p-4 shadow text-center">
                            <div className="text-2xl font-bold">156</div>
                            <div className="text-sm text-slate-500">Sessions This Month</div>
                        </div>
                        <div className="bg-white rounded-md p-4 shadow text-center">
                            <div className="text-2xl font-bold">4.8</div>
                            <div className="text-sm text-slate-500">Avg Progress Score</div>
                        </div>
                        <div className="bg-white rounded-md p-4 shadow text-center">
                            <div className="text-2xl font-bold">R67,200</div>
                            <div className="text-sm text-slate-500">Monthly Revenue</div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Active Participants</h2>
                            <button className="px-3 py-1 border rounded">View All</button>
                        </div>

                        <div className="space-y-3">
                            {participants.map(p => (
                                <div key={p.id} className="flex items-center gap-4 p-3 rounded-md bg-slate-50 hover:bg-slate-100 cursor-pointer" onClick={() => alert(`Opening detailed profile for ${p.name}...`)}>
                                    <div className="w-12 h-12 rounded-full bg-emerald-400 text-white flex items-center justify-center font-bold">{p.initials}</div>
                                    <div className="flex-1">
                                        <div className="font-semibold">{p.name}</div>
                                        <div className="text-sm text-slate-500">{p.details}</div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-28 bg-slate-100 rounded-full h-2 overflow-hidden">
                                            <div className="h-full bg-emerald-400" style={{ width: `${p.progress}%` }} />
                                        </div>
                                        <div className="text-sm font-semibold text-slate-600">{p.progress}%</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow">
                        <h2 className="text-lg font-semibold mb-4">Program Tiers</h2>
                        <div className="space-y-3">
                            <div className="p-3 rounded-md bg-slate-50 border-l-4 border-slate-400">
                                <div className="flex justify-between items-center">
                                    <div className="font-semibold">Everyone & Anyone</div>
                                    <div className="text-sm bg-emerald-400 text-white px-2 rounded-full">32</div>
                                </div>
                                <div className="text-sm text-slate-500">Open enrollment program for all participants</div>
                                <div className="font-bold mt-2">R850/month • 8 sessions</div>
                            </div>

                            <div className="p-3 rounded-md bg-slate-50 border-l-4 border-slate-400">
                                <div className="flex justify-between items-center">
                                    <div className="font-semibold">Malaika House Morning</div>
                                    <div className="text-sm bg-emerald-400 text-white px-2 rounded-full">25</div>
                                </div>
                                <div className="text-sm text-slate-500">Intensive morning sessions for students</div>
                                <div className="font-bold mt-2">R1,200/month • 12 sessions</div>
                            </div>

                            <div className="p-3 rounded-md bg-slate-50 border-l-4 border-slate-400">
                                <div className="flex justify-between items-center">
                                    <div className="font-semibold">Premium Support</div>
                                    <div className="text-sm bg-emerald-400 text-white px-2 rounded-full">16</div>
                                </div>
                                <div className="text-sm text-slate-500">Advanced one-on-one and small group sessions</div>
                                <div className="font-bold mt-2">R1,850/month • 16 sessions</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 bg-white rounded-2xl p-6 shadow">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Today's Sessions</h2>
                        <div className="flex gap-2">
                            <button className="w-9 h-9 rounded-full bg-slate-100">‹</button>
                            <button className="w-9 h-9 rounded-full bg-slate-100">›</button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-3">
                        <div className="p-4 rounded bg-rose-50 border">
                            <div className="font-semibold">9:00 AM</div>
                            <div className="text-sm text-slate-500">Emma M. - Social Skills</div>
                        </div>
                        <div className="p-4 rounded bg-rose-50 border">
                            <div className="font-semibold">10:00 AM</div>
                            <div className="text-sm text-slate-500">Group Session (4)</div>
                        </div>
                        <div className="p-4 rounded bg-white border">
                            <div className="font-semibold">11:00 AM</div>
                            <div className="text-sm text-slate-500">Available</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
