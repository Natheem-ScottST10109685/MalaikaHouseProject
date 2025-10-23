import React, { useState } from 'react';

const PageManagement = () => {
    const [activeFilter, setActiveFilter] = useState('All Pages');

    const pages = [
        {
            id: 1,
            title: 'Home Page',
            lastEdited: '2 hours ago',
            editor: 'Elria',
            status: 'published'
        },
        {
            id: 2,
            title: 'What We Offer',
            lastEdited: '1 day ago',
            editor: 'Amarta',
            status: 'published'
        },
        {
            id: 3,
            title: 'Our Story',
            lastEdited: '3 days ago',
            editor: 'Elria',
            status: 'review'
        },
        {
            id: 4,
            title: 'Staff and Supporters',
            lastEdited: '5 days ago',
            editor: 'Amarta',
            status: 'published'
        },
        {
            id: 5,
            title: 'Parent Information',
            lastEdited: '1 week ago',
            editor: 'Elria',
            status: 'published'
        },
        {
            id: 6,
            title: 'Book a Visit',
            lastEdited: '2 days ago',
            editor: 'Tom',
            status: 'draft'
        }
    ];

    const recentActivity = [
        {
            id: 1,
            icon: '📝',
            text: 'Elria updated the Home Page content',
            time: '2 hours ago'
        },
        {
            id: 2,
            icon: '✅',
            text: 'What We Offer page published successfully',
            time: '1 day ago'
        },
        {
            id: 3,
            icon: '🔄',
            text: 'Content synced from Notion CMS',
            time: '2 days ago'
        },
        {
            id: 4,
            icon: '👀',
            text: 'Our Story page marked for review by Amarta',
            time: '3 days ago'
        }
    ];

    const templates = [
        {
            id: 1,
            icon: '🏠',
            name: 'Landing Page',
            desc: 'Hero section with call-to-action'
        },
        {
            id: 2,
            icon: '📋',
            name: 'Information Page',
            desc: 'Standard content layout'
        },
        {
            id: 3,
            icon: '👥',
            name: 'Team Page',
            desc: 'Staff profiles and bios'
        },
        {
            id: 4,
            icon: '📞',
            name: 'Contact Page',
            desc: 'Contact form and details'
        },
        {
            id: 5,
            icon: '❓',
            name: 'FAQ Page',
            desc: 'Frequently asked questions'
        },
        {
            id: 6,
            icon: '🎯',
            name: 'Program Page',
            desc: 'Program details and enrollment'
        }
    ];

    const filteredPages = activeFilter === 'All Pages'
        ? pages
        : pages.filter(page => page.status === activeFilter.toLowerCase());

    const handleCreatePage = () => {
        // Implement page creation logic
        console.log('Creating new page...');
    };

    const handleSyncNotion = () => {
        // Implement Notion sync logic
        console.log('Syncing with Notion...');
    };

    return (
        <div className="p-6">
            {/* Top Actions */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Page Management</h1>
                <div className="flex gap-3">
                    <button
                        onClick={handleSyncNotion}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                        Sync from Notion
                    </button>
                    <button
                        onClick={handleCreatePage}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        + Create Page
                    </button>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-3 gap-6">
                {/* Pages List */}
                <div className="col-span-2">
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">Website Pages</h2>
                            <button className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                                Preview Site
                            </button>
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex gap-2 mb-6">
                            {['All Pages', 'Published', 'Draft', 'Review'].map(filter => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium ${activeFilter === filter
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>

                        {/* Pages List */}
                        <div className="space-y-3">
                            {filteredPages.map(page => (
                                <div
                                    key={page.id}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
                                >
                                    <div>
                                        <h3 className="font-medium text-gray-800">{page.title}</h3>
                                        <div className="text-sm text-gray-500">
                                            Last edited: {page.lastEdited} • By: {page.editor}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${page.status === 'published'
                                                ? 'bg-green-100 text-green-800'
                                                : page.status === 'draft'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-purple-100 text-purple-800'
                                            }`}>
                                            {page.status.charAt(0).toUpperCase() + page.status.slice(1)}
                                        </span>
                                        <button className="p-2 text-gray-600 hover:bg-gray-200 rounded">
                                            👁️
                                        </button>
                                        <button className="p-2 text-gray-600 hover:bg-gray-200 rounded">
                                            ✏️
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stats Panel */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Page Statistics</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Total Pages</span>
                                <span className="font-semibold">7</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Published</span>
                                <span className="font-semibold">5</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Drafts</span>
                                <span className="font-semibold">1</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Needs Review</span>
                                <span className="font-semibold">1</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Last Update</span>
                                <span className="font-semibold">2 hours ago</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Notion Sync</span>
                                <span className="font-semibold text-green-600">Connected</span>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">Recent Activity</h2>
                            <button className="text-gray-600 hover:text-gray-800">View All</button>
                        </div>
                        <div className="space-y-4">
                            {recentActivity.map(activity => (
                                <div key={activity.id} className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                        {activity.icon}
                                    </div>
                                    <div>
                                        <p className="text-gray-800">{activity.text}</p>
                                        <span className="text-sm text-gray-500">{activity.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Templates Section */}
            <div className="mt-6 bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-xl font-semibold mb-6">Quick Create Templates</h2>
                <div className="grid grid-cols-6 gap-4">
                    {templates.map(template => (
                        <div
                            key={template.id}
                            className="p-4 bg-gray-50 rounded-lg text-center cursor-pointer hover:bg-gray-100"
                        >
                            <div className="text-2xl mb-2">{template.icon}</div>
                            <h3 className="font-medium text-gray-800 mb-1">{template.name}</h3>
                            <p className="text-sm text-gray-500">{template.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PageManagement;