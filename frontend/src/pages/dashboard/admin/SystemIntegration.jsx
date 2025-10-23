import React from 'react';

const SystemIntegration = () => {
    const metrics = [
        { value: '12', label: 'Active Integrations' },
        { value: '99.7%', label: 'Uptime' },
        { value: '1.2k', label: 'API Calls/Day' },
        { value: '145ms', label: 'Avg Response' }
    ];

    const activeIntegrations = [
        {
            id: 1,
            name: 'Google Calendar',
            logo: 'GC',
            category: 'Scheduling • Calendar',
            description: 'Synchronizes booking schedules, session appointments, and event management with Google Calendar for seamless scheduling.',
            status: 'connected',
            stats: [
                { label: 'Status', value: 'Active' },
                { label: 'Last Sync', value: '5 minutes ago' },
                { label: 'Events Synced', value: '284 this month' }
            ]
        },
        {
            id: 2,
            name: 'Notion CMS',
            logo: 'N',
            category: 'Content • Documentation',
            description: 'Content management system integration for website pages, documentation, and collaborative content creation.',
            status: 'connected',
            stats: [
                { label: 'Status', value: 'Active' },
                { label: 'Last Update', value: '2 hours ago' },
                { label: 'Pages Synced', value: '15 active' }
            ]
        },
        {
            id: 3,
            name: 'MailChimp',
            logo: 'MC',
            category: 'Email • Marketing',
            description: 'Newsletter and email marketing platform for subscriber management. Currently experiencing connection issues.',
            status: 'error',
            stats: [
                { label: 'Status', value: 'Connection Error' },
                { label: 'Last Success', value: '2 days ago' },
                { label: 'Subscribers', value: '425 contacts' }
            ]
        },
        {
            id: 4,
            name: 'Payment Gateway',
            logo: '💳',
            category: 'Payments • Banking',
            description: 'Secure payment processing for session bookings and program subscriptions with automatic billing.',
            status: 'connected',
            stats: [
                { label: 'Status', value: 'Active' },
                { label: 'Transactions', value: '156 this month' },
                { label: 'Success Rate', value: '98.7%' }
            ]
        }
    ];

    const availableIntegrations = [
        { logo: 'SL', name: 'Slack', description: 'Team communication and notifications' },
        { logo: 'ZM', name: 'Zoom', description: 'Virtual session management' },
        { logo: 'MS', name: 'Microsoft Teams', description: 'Collaboration and video calls' },
        { logo: 'TL', name: 'Tally', description: 'Advanced form builder' }
    ];

    const activityLog = [
        {
            type: 'error',
            text: 'MailChimp connection failed - API key expired',
            time: '2 hours ago',
            icon: '⚠️'
        },
        {
            type: 'success',
            text: 'Google Calendar sync completed successfully - 12 events updated',
            time: '5 minutes ago',
            icon: '✅'
        },
        {
            type: 'info',
            text: 'Payment Gateway processed 8 transactions',
            time: '1 hour ago',
            icon: 'ℹ️'
        },
        {
            type: 'success',
            text: 'Notion CMS content synchronized - 3 pages updated',
            time: '2 hours ago',
            icon: '✅'
        }
    ];

    const statusColors = {
        connected: 'bg-green-100 text-green-800',
        error: 'bg-red-100 text-red-800',
        pending: 'bg-yellow-100 text-yellow-800'
    };

    const logTypeColors = {
        error: 'bg-red-500',
        success: 'bg-green-500',
        info: 'bg-blue-500',
        warning: 'bg-yellow-500'
    };

    return (
        <div className="p-6">
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">System Integrations</h1>
                <div className="flex gap-3">
                    <button className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                        View Logs
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        + Add Integration
                    </button>
                </div>
            </div>

            {/* System Health */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">System Health</h2>
                    <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        All Systems Operational
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                    {metrics.map((metric, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
                            <div className="text-2xl font-bold text-gray-800">{metric.value}</div>
                            <div className="text-sm text-gray-600">{metric.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Active Integrations */}
            <div className="grid grid-cols-2 gap-6 mb-6">
                {activeIntegrations.map(integration => (
                    <div
                        key={integration.id}
                        className="bg-white rounded-xl shadow-md p-6 relative overflow-hidden"
                    >
                        {/* Top status bar */}
                        <div className={`absolute top-0 left-0 right-0 h-1 ${integration.status === 'connected'
                                ? 'bg-gradient-to-r from-green-500 to-blue-500'
                                : integration.status === 'error'
                                    ? 'bg-gradient-to-r from-red-500 to-yellow-500'
                                    : 'bg-gradient-to-r from-yellow-500 to-purple-500'
                            }`}></div>

                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xl font-bold">
                                    {integration.logo}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">{integration.name}</h3>
                                    <p className="text-sm text-gray-600">{integration.category}</p>
                                </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[integration.status]}`}>
                                {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
                            </span>
                        </div>

                        <p className="text-gray-600 text-sm mb-4">{integration.description}</p>

                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            {integration.stats.map((stat, index) => (
                                <div key={index} className="flex justify-between items-center mb-1 last:mb-0">
                                    <span className="text-sm text-gray-600">{stat.label}</span>
                                    <span className="text-sm font-medium text-gray-800">{stat.value}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end gap-2">
                            <button className="p-2 text-white bg-blue-600 rounded hover:bg-blue-700" title="Configure">
                                ⚙️
                            </button>
                            <button className="p-2 text-white bg-purple-600 rounded hover:bg-purple-700" title="Test Connection">
                                🔄
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Available Integrations */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Available Integrations</h2>
                    <button className="text-gray-600 hover:text-gray-800">Browse All</button>
                </div>

                <div className="grid grid-cols-4 gap-4">
                    {availableIntegrations.map((integration, index) => (
                        <div
                            key={index}
                            className="p-4 bg-gray-50 rounded-lg text-center hover:bg-gray-100 cursor-pointer"
                        >
                            <div className="w-10 h-10 bg-purple-600 text-white rounded-lg flex items-center justify-center text-lg font-bold mx-auto mb-3">
                                {integration.logo}
                            </div>
                            <h3 className="font-medium text-gray-800 mb-1">{integration.name}</h3>
                            <p className="text-sm text-gray-600">{integration.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Activity Log */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Integration Activity Log</h2>
                    <button className="text-gray-600 hover:text-gray-800">View Full Log</button>
                </div>

                <div className="space-y-4">
                    {activityLog.map((log, index) => (
                        <div key={index} className="flex items-center gap-4">
                            <div className={`w-10 h-10 ${logTypeColors[log.type]} rounded-full flex items-center justify-center text-white`}>
                                {log.icon}
                            </div>
                            <div>
                                <p className="text-gray-800">{log.text}</p>
                                <span className="text-sm text-gray-500">{log.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SystemIntegration;