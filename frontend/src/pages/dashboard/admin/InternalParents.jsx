import React, { useState, useMemo } from 'react';

const InternalParents = () => {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [programFilter, setProgramFilter] = useState('All Programs');

    const parents = [
        {
            id: 1,
            initials: 'SM',
            name: 'Sarah Mitchell',
            email: 'sarah.mitchell@email.com',
            phone: '+27 82 456 7890',
            children: ['Emma (8)', 'James (6)'],
            plan: 'Heart Program Premium',
            used: '8/12',
            nextPayment: 'Oct 15, 2024',
            status: 'active'
        },
        {
            id: 2,
            initials: 'DC',
            name: 'David Chen',
            email: 'david.chen@email.com',
            phone: '+27 84 789 0123',
            children: ['Alex (10)'],
            plan: 'Malaika Sessions Standard',
            used: '4/6',
            nextPayment: 'Oct 20, 2024',
            status: 'active'
        },
        {
            id: 3,
            initials: 'LR',
            name: 'Lisa Rodriguez',
            email: 'lisa.rodriguez@email.com',
            phone: '+27 83 567 8901',
            children: ['Sofia (9)', 'Miguel (7)', 'Carlos (5)'],
            plan: 'Heart Program Family',
            used: '15/20',
            nextPayment: 'Oct 12, 2024',
            status: 'pending'
        },
        {
            id: 4,
            initials: 'MJ',
            name: 'Michael Johnson',
            email: 'm.johnson@email.com',
            phone: '+27 85 234 5678',
            children: ['Zoe (11)'],
            plan: 'Internal Clubs Access',
            used: '3/8',
            nextPayment: 'Oct 25, 2024',
            status: 'active'
        }
    ];

    const filtered = useMemo(() => {
        return parents.filter(p => {
            const q = search.toLowerCase();
            const matchesSearch =
                p.name.toLowerCase().includes(q) ||
                p.email.toLowerCase().includes(q) ||
                p.children.join(' ').toLowerCase().includes(q);

            const matchesStatus = statusFilter === 'All Status' ||
                (statusFilter === 'Active Subscriptions' && p.status === 'active') ||
                (statusFilter === 'Pending Payment' && p.status === 'pending') ||
                (statusFilter === 'Suspended' && p.status === 'suspended');

            const matchesProgram = programFilter === 'All Programs' ||
                (programFilter === 'Heart Program' && p.plan.toLowerCase().includes('heart')) ||
                (programFilter === 'Malaika Sessions' && p.plan.toLowerCase().includes('malaika')) ||
                (programFilter === 'Internal Clubs' && p.plan.toLowerCase().includes('clubs'));

            return matchesSearch && matchesStatus && matchesProgram;
        });
    }, [search, statusFilter, programFilter]);

    const handleView = (name) => alert(`Opening detailed profile for ${name}...`);
    const handleEdit = (name) => alert(`Opening edit form for ${name}...`);
    const handleMessage = (name) => alert(`Opening message composer for ${name}...`);

    return (
        <div className="flex-1 min-h-0">
            <div className="bg-white shadow-sm px-8 py-6 flex justify-between items-center sticky top-0 z-10">
                <h1 className="text-3xl font-bold text-[#5D5A7A]">Internal Parents</h1>
                <div className="flex gap-4">
                    <button onClick={() => alert('Opening newsletter composer...')} className="px-4 py-2 rounded-lg bg-gray-100 text-[#5D5A7A] font-semibold hover:bg-gray-200">Send Newsletter</button>
                    <button onClick={() => alert('Opening Add New Parent form...')} className="px-4 py-2 rounded-lg bg-[#7B9BC4] text-white font-semibold hover:bg-[#8DB4A8]">+ Add Parent</button>
                </div>
            </div>

            <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="text-3xl font-bold text-[#5D5A7A]">89</div>
                        <div className="text-sm text-[#6B5F7A]">Total Parents</div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="text-3xl font-bold text-[#5D5A7A]">142</div>
                        <div className="text-sm text-[#6B5F7A]">Children Enrolled</div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="text-3xl font-bold text-[#5D5A7A]">284</div>
                        <div className="text-sm text-[#6B5F7A]">Active Sessions</div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="text-3xl font-bold text-[#5D5A7A]">R89,250</div>
                        <div className="text-sm text-[#6B5F7A]">Monthly Revenue</div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md mb-8 flex flex-wrap gap-4 items-center">
                    <div className="flex items-center gap-2">
                        <label className="font-semibold text-[#5D5A7A]">Status:</label>
                        <select className="p-2 border rounded-lg" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                            <option>All Status</option>
                            <option>Active Subscriptions</option>
                            <option>Pending Payment</option>
                            <option>Suspended</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="font-semibold text-[#5D5A7A]">Program:</label>
                        <select className="p-2 border rounded-lg" value={programFilter} onChange={(e) => setProgramFilter(e.target.value)}>
                            <option>All Programs</option>
                            <option>Heart Program</option>
                            <option>Malaika Sessions</option>
                            <option>Internal Clubs</option>
                        </select>
                    </div>

                    <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search parents by name, email, or children..." className="flex-1 min-w-[200px] p-2 border rounded-lg" />
                </div>

                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mb-8">
                    {filtered.map(parent => (
                        <div key={parent.id} className="bg-white rounded-xl p-6 shadow-md">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 rounded-full bg-[#A594C7] text-white flex items-center justify-center font-bold">{parent.initials}</div>
                                <div>
                                    <h3 className="text-lg font-semibold text-[#5D5A7A]">{parent.name}</h3>
                                    <div className="text-sm text-[#6B5F7A]">{parent.email}</div>
                                    <div className="text-sm text-[#6B5F7A]">{parent.phone}</div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="text-sm font-semibold text-[#5D5A7A] mb-2">Children ({parent.children.length})</div>
                                <div className="flex flex-wrap gap-2">
                                    {parent.children.map((c, i) => (
                                        <span key={i} className="inline-block bg-gray-100 text-[#7B9BC4] px-3 py-1 rounded-full text-sm">{c}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="subscription-info mb-4 bg-gray-50 p-4 rounded">
                                <div className="text-sm font-semibold text-[#5D5A7A]">Subscription Details</div>
                                <div className="text-sm text-[#6B5F7A]">Plan: {parent.plan}</div>
                                <div className="text-sm text-[#6B5F7A]">Sessions: {parent.used} used this month</div>
                                <div className="text-sm text-[#6B5F7A]">Next Payment: {parent.nextPayment}</div>
                                <div className="text-sm mt-2">Status: <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${parent.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>{parent.status}</span></div>
                            </div>

                            <div className="flex justify-end gap-3">
                                <button onClick={() => handleView(parent.name)} className="px-3 py-2 rounded bg-[#7B9BC4] text-white">👁️</button>
                                <button onClick={() => handleEdit(parent.name)} className="px-3 py-2 rounded bg-[#A594C7] text-white">✏️</button>
                                <button onClick={() => handleMessage(parent.name)} className="px-3 py-2 rounded bg-[#8DB4A8] text-white">💬</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="flex justify-between items-center mb-4 border-b pb-4">
                        <h2 className="text-xl font-semibold text-[#5D5A7A]">Recent Parent Activity</h2>
                        <button onClick={() => alert('Opening activity list...')} className="px-3 py-2 rounded bg-gray-100">View All</button>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">📅</div>
                            <div>
                                <div className="text-sm text-[#5D5A7A]">Sarah Mitchell booked Heart Program session for Emma</div>
                                <div className="text-xs text-[#6B5F7A]">2 hours ago</div>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">💳</div>
                            <div>
                                <div className="text-sm text-[#5D5A7A]">David Chen completed payment for October subscription</div>
                                <div className="text-xs text-[#6B5F7A]">4 hours ago</div>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">✏️</div>
                            <div>
                                <div className="text-sm text-[#5D5A7A]">Lisa Rodriguez updated child profile information</div>
                                <div className="text-xs text-[#6B5F7A]">1 day ago</div>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">📞</div>
                            <div>
                                <div className="text-sm text-[#5D5A7A]">Michael Johnson requested callback for program consultation</div>
                                <div className="text-xs text-[#6B5F7A]">2 days ago</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InternalParents;
