import React, { useMemo, useState } from 'react';

const sampleUsers = [
    { id: 1, name: 'Sarah Mitchell', details: 'Parent of Emma, James', type: 'Internal Parent', contact: 'sarah.mitchell@email.com', phone: '+27 82 456 7890', status: 'Active', joined: 'Jan 15, 2024', lastActive: '2 hours ago' },
    { id: 2, name: 'Marcus Johnson', details: 'Square Peg Club Partner', type: 'External', contact: 'marcus@squarepegclub.co.za', phone: '+27 81 234 5678', status: 'Active', joined: 'Mar 3, 2024', lastActive: '4 hours ago' },
    { id: 3, name: 'Elria Patterson', details: 'Co-Founder', type: 'Staff', contact: 'elria@malaikahouse.co.za', phone: '+27 83 567 8901', status: 'Active', joined: 'Dec 1, 2023', lastActive: '1 hour ago' },
    { id: 4, name: 'David Chen', details: 'Parent of Alex', type: 'Internal Parent', contact: 'david.chen@email.com', phone: '+27 84 789 0123', status: 'Active', joined: 'Feb 20, 2024', lastActive: '1 day ago' },
    { id: 5, name: 'Team WIL Admin', details: 'External Partner', type: 'External', contact: 'admin@teamwil.co.za', phone: '+27 85 901 2345', status: 'Pending', joined: 'Apr 10, 2024', lastActive: '2 days ago' }
];

export default function AllUsers() {
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('All Types');
    const [statusFilter, setStatusFilter] = useState('All Status');

    const filtered = useMemo(() => {
        return sampleUsers.filter(u => {
            const text = (u.name + ' ' + u.details + ' ' + u.contact + ' ' + u.phone).toLowerCase();
            if (search && !text.includes(search.toLowerCase())) return false;
            if (typeFilter !== 'All Types' && u.type !== typeFilter) return false;
            if (statusFilter !== 'All Status' && u.status !== statusFilter) return false;
            return true;
        });
    }, [search, typeFilter, statusFilter]);

    const counts = useMemo(() => ({
        total: sampleUsers.length,
        internal: sampleUsers.filter(u => u.type === 'Internal Parent').length,
        external: sampleUsers.filter(u => u.type === 'External').length,
        staff: sampleUsers.filter(u => u.type === 'Staff').length,
        inactive: sampleUsers.filter(u => u.status !== 'Active').length
    }), []);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">All Users</h1>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-white border rounded-md text-sm">Export</button>
                        <button className="px-4 py-2 bg-slate-800 text-white rounded-md text-sm">+ Add User</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                    <div className="md:col-span-5 grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="bg-white rounded-md p-4 shadow text-center">
                            <div className="text-2xl font-bold">{counts.total}</div>
                            <div className="text-sm text-slate-500">Total Users</div>
                        </div>
                        <div className="bg-white rounded-md p-4 shadow text-center">
                            <div className="text-2xl font-bold">{counts.internal}</div>
                            <div className="text-sm text-slate-500">Internal Parents</div>
                        </div>
                        <div className="bg-white rounded-md p-4 shadow text-center">
                            <div className="text-2xl font-bold">{counts.external}</div>
                            <div className="text-sm text-slate-500">External People</div>
                        </div>
                        <div className="bg-white rounded-md p-4 shadow text-center">
                            <div className="text-2xl font-bold">{counts.staff}</div>
                            <div className="text-sm text-slate-500">Staff Members</div>
                        </div>
                        <div className="bg-white rounded-md p-4 shadow text-center">
                            <div className="text-2xl font-bold">{counts.inactive}</div>
                            <div className="text-sm text-slate-500">Inactive Users</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-md shadow mb-6 flex flex-wrap gap-4 items-center">
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium">User Type:</label>
                        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="border rounded p-2 text-sm">
                            <option>All Types</option>
                            <option>Internal Parent</option>
                            <option>External</option>
                            <option>Staff</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium">Status:</label>
                        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border rounded p-2 text-sm">
                            <option>All Status</option>
                            <option>Active</option>
                            <option>Pending</option>
                            <option>Inactive</option>
                        </select>
                    </div>

                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users by name, email, or phone..." className="flex-1 min-w-[180px] border rounded p-2" />
                </div>

                <div className="bg-white rounded-md shadow overflow-auto">
                    <table className="w-full table-auto">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="text-left p-4">User</th>
                                <th className="text-left p-4">Type</th>
                                <th className="text-left p-4">Contact</th>
                                <th className="text-left p-4">Status</th>
                                <th className="text-left p-4">Joined</th>
                                <th className="text-left p-4">Last Active</th>
                                <th className="text-left p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(u => (
                                <tr key={u.id} className="hover:bg-slate-50">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center font-bold">{u.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</div>
                                            <div>
                                                <div className="font-semibold">{u.name}</div>
                                                <div className="text-sm text-slate-500">{u.details}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4"><span className="text-xs font-semibold uppercase px-2 py-1 rounded" style={{ background: u.type === 'Internal Parent' ? 'rgba(123,155,196,0.15)' : u.type === 'External' ? 'rgba(165,148,199,0.15)' : 'rgba(141,180,168,0.15)' }}>{u.type}</span></td>
                                    <td className="p-4">
                                        <div>{u.contact}</div>
                                        <div className="text-sm text-slate-500">{u.phone}</div>
                                    </td>
                                    <td className="p-4"><span className="text-xs font-semibold rounded px-2 py-1" style={{ background: u.status === 'Active' ? 'rgba(141,180,168,0.15)' : 'rgba(255,193,7,0.15)' }}>{u.status}</span></td>
                                    <td className="p-4">{u.joined}</td>
                                    <td className="p-4">{u.lastActive}</td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <button onClick={() => alert(`Opening detailed profile for ${u.name}...`)} className="px-2 py-1 bg-slate-800 text-white rounded">👁️</button>
                                            <button onClick={() => alert(`Opening edit form for ${u.name}...`)} className="px-2 py-1 bg-indigo-200 rounded">✏️</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-center mt-6 gap-2">
                    <button className="px-3 py-1 border rounded">‹ Previous</button>
                    <button className="px-3 py-1 bg-slate-800 text-white rounded">1</button>
                    <button className="px-3 py-1 border rounded">2</button>
                    <button className="px-3 py-1 border rounded">3</button>
                    <button className="px-3 py-1 border rounded">Next ›</button>
                </div>
            </div>
        </div>
    );
}
