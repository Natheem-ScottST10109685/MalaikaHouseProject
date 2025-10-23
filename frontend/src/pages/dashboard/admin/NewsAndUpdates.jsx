import React, { useState } from 'react';

const NewsAndUpdates = () => {
    const [activeTab, setActiveTab] = useState('All Posts');

    const posts = [
        { id: 1, title: 'Heart Program Expansion Announcement', status: 'Published', date: 'Oct 15, 2024', author: 'Amarta', excerpt: "We're excited to announce the expansion of our Heart Program to include new therapeutic approaches and extended session times...", icon: '📢' },
        { id: 2, title: 'October Success Stories', status: 'Published', date: 'Oct 12, 2024', author: 'Elria', excerpt: 'Celebrating the amazing achievements of our Heart Program participants this month...', icon: '🎉' },
        { id: 3, title: 'New Resource Library Launch', status: 'Draft', date: '', author: 'Maria', excerpt: 'Introducing our comprehensive resource library for parents and caregivers...', icon: '📚' },
        { id: 4, title: 'Partnership with Adventure Club SA', status: 'Scheduled', date: 'Oct 25, 2024', author: 'Amarta', excerpt: "We're thrilled to announce our new partnership with Adventure Club SA...", icon: '🤝' },
        { id: 5, title: 'Understanding Sensory Processing', status: 'Published', date: 'Oct 8, 2024', author: 'Jessica', excerpt: 'A comprehensive guide for parents to understand sensory processing differences...', icon: '💡' }
    ];

    const stats = { total: 23, month: 8, drafts: 5, subscribers: 425, openRate: '89%' };

    const filtered = posts.filter(p => {
        if (activeTab === 'All Posts') return true;
        if (activeTab === 'Published') return p.status === 'Published';
        if (activeTab === 'Drafts') return p.status === 'Draft';
        if (activeTab === 'Scheduled') return p.status === 'Scheduled';
        return true;
    });

    const handlePreview = (title) => alert(`Opening preview for ${title}...`);
    const handleEdit = (title) => alert(`Opening editor for ${title}...`);

    return (
        <div className="flex-1 min-h-0">
            <div className="bg-white shadow-sm px-8 py-6 flex justify-between items-center sticky top-0 z-10">
                <h1 className="text-3xl font-bold text-[#5D5A7A]">News & Updates</h1>
                <div className="flex gap-4">
                    <button onClick={() => alert('Opening newsletter composer...')} className="px-4 py-2 rounded-lg bg-gray-100 text-[#5D5A7A] font-semibold">Send Newsletter</button>
                    <button onClick={() => alert('Opening post creation editor...')} className="px-4 py-2 rounded-lg bg-[#7B9BC4] text-white font-semibold">+ Create Post</button>
                </div>
            </div>

            <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="bg-white rounded-xl p-4 shadow-md text-center">
                            <div className="text-2xl font-bold">{stats.total}</div>
                            <div className="text-sm text-[#6B5F7A]">Total Posts</div>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-md text-center">
                            <div className="text-2xl font-bold">{stats.month}</div>
                            <div className="text-sm text-[#6B5F7A]">This Month</div>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-md text-center">
                            <div className="text-2xl font-bold">{stats.drafts}</div>
                            <div className="text-sm text-[#6B5F7A]">Drafts</div>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-md text-center">
                            <div className="text-2xl font-bold">{stats.subscribers}</div>
                            <div className="text-sm text-[#6B5F7A]">Subscribers</div>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-md text-center">
                            <div className="text-2xl font-bold">{stats.openRate}</div>
                            <div className="text-sm text-[#6B5F7A]">Open Rate</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="flex justify-between items-center mb-4 border-b pb-4">
                            <h2 className="text-xl font-semibold text-[#5D5A7A]">Recent Articles</h2>
                            <button onClick={() => alert('Opening recent articles list...')} className="px-3 py-2 rounded bg-gray-100">View All</button>
                        </div>

                        <div className="flex gap-3 mb-6">
                            {['All Posts', 'Published', 'Drafts', 'Scheduled'].map(tab => (
                                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-full ${activeTab === tab ? 'bg-[#7B9BC4] text-white' : 'bg-gray-100 text-[#6B5F7A]'}`}>{tab}</button>
                            ))}
                        </div>

                        <div className="space-y-4">
                            {filtered.map(post => (
                                <div key={post.id} className="flex items-start gap-4 p-3 rounded hover:bg-gray-50 cursor-pointer">
                                    <div className="w-14 h-14 rounded-md bg-[#A594C7] text-white flex items-center justify-center text-xl">{post.icon}</div>
                                    <div className="flex-1">
                                        <div className="font-semibold text-[#5D5A7A]">{post.title}</div>
                                        <div className="text-xs text-[#6B5F7A] mb-2">{post.status} • {post.date || 'Draft'} • By: {post.author}</div>
                                        <div className="text-sm text-[#6B5F7A]">{post.excerpt}</div>
                                    </div>
                                    <div className="flex flex-col gap-2 items-end">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${post.status === 'Published' ? 'bg-green-100 text-green-600' : post.status === 'Draft' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'}`}>{post.status}</span>
                                        <div className="flex gap-1">
                                            <button onClick={() => handlePreview(post.title)} className="px-2 py-1 rounded bg-[#7B9BC4] text-white">👁️</button>
                                            <button onClick={() => handleEdit(post.title)} className="px-2 py-1 rounded bg-[#A594C7] text-white">✏️</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="flex justify-between items-center mb-4 border-b pb-4">
                            <h2 className="text-xl font-semibold text-[#5D5A7A]">Recent Activity</h2>
                            <button onClick={() => alert('Opening activity log...')} className="px-3 py-2 rounded bg-gray-100">View All Activity</button>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">✏️</div>
                                <div>
                                    <div className="text-sm text-[#5D5A7A]">Heart Program Expansion Announcement published</div>
                                    <div className="text-xs text-[#6B5F7A]">2 hours ago</div>
                                </div>
                                <div className="ml-auto text-sm text-[#6B5F7A]">👁️ 45 • ❤️ 12 • 💬 3</div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">📊</div>
                                <div>
                                    <div className="text-sm text-[#5D5A7A]">Newsletter sent to 425 subscribers</div>
                                    <div className="text-xs text-[#6B5F7A]">1 day ago</div>
                                </div>
                                <div className="ml-auto text-sm text-[#6B5F7A]">📧 89% • 🔗 41%</div>
                            </div>

                        </div>
                    </div>
                </div>

                <aside className="space-y-6">
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <h3 className="text-lg font-semibold text-[#5D5A7A] mb-4">Quick Actions</h3>
                        <button onClick={() => alert('Write Article')} className="w-full text-left p-3 rounded bg-gray-100 mb-2">✍️ Write Article</button>
                        <button onClick={() => alert('View Analytics')} className="w-full text-left p-3 rounded bg-gray-100 mb-2">📊 View Analytics</button>
                        <button onClick={() => alert('Create Newsletter')} className="w-full text-left p-3 rounded bg-gray-100 mb-2">✉️ Create Newsletter</button>
                        <button onClick={() => alert('Schedule Post')} className="w-full text-left p-3 rounded bg-gray-100 mb-2">🗓️ Schedule Post</button>
                        <button onClick={() => alert('Manage Subscribers')} className="w-full text-left p-3 rounded bg-gray-100">👥 Manage Subscribers</button>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-[#5D5A7A]">Newsletter Stats</h3>
                            <button onClick={() => alert('View Report')} className="px-3 py-1 rounded bg-gray-100">View Report</button>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                            <div className="text-sm text-[#6B5F7A]">Last Newsletter: Oct 12, 2024</div>
                            <div className="text-sm text-[#6B5F7A]">Opens: 378/425 (89%)</div>
                            <div className="text-sm text-[#6B5F7A]">Click Rate: 156/378 (41%)</div>
                            <div className="text-sm text-[#6B5F7A]">New Subscribers: +23 this week</div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default NewsAndUpdates;
