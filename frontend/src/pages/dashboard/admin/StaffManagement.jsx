import React from 'react';

const StaffManagement = () => {
    const staffStats = [
        { label: 'Total Staff', value: '15' },
        { label: 'Active Today', value: '12' },
        { label: 'Sessions This Month', value: '284' },
        { label: 'Avg Hours/Day', value: '8.5' },
        { label: 'Satisfaction Rating', value: '4.8' }
    ];

    const staffMembers = [
        {
            id: 1,
            name: 'Amarta',
            role: 'Co-Founder & Director',
            badge: 'Founder',
            badgeColor: 'purple',
            avatar: 'A',
            email: 'amarta@malaikahouse.co.za',
            phone: '+27 82 123 4567',
            status: 'available',
            specializations: ['Program Development', 'Strategic Planning', 'Heart Program'],
            schedule: [
                'Mon-Fri: Strategic meetings',
                'Wed: Heart Program sessions',
                'Fri: Staff reviews'
            ]
        },
        {
            id: 2,
            name: 'Elria Patterson',
            role: 'Co-Founder & Creative Director',
            badge: 'Founder',
            badgeColor: 'purple',
            avatar: 'EP',
            email: 'elria@malaikahouse.co.za',
            phone: '+27 83 456 7890',
            status: 'available',
            specializations: ['Creative Arts', 'Brand Development', 'Content Creation'],
            schedule: [
                'Tue/Thu: Creative workshops',
                'Wed: Brand strategy meeting',
                'Fri: Content review'
            ]
        },
        {
            id: 3,
            name: 'Jessica Miller',
            role: 'Senior Heart Program Facilitator',
            badge: 'Facilitator',
            badgeColor: 'blue',
            avatar: 'JM',
            email: 'jessica@malaikahouse.co.za',
            phone: '+27 84 789 0123',
            status: 'busy',
            specializations: ['Neurodiversity Support', 'Group Facilitation', 'Behavioral Therapy'],
            schedule: [
                'Mon-Fri: Heart Program sessions',
                'Tue: Parent consultations',
                'Thu: Training workshop'
            ]
        },
        {
            id: 4,
            name: 'Tom Richards',
            role: 'Operations Manager',
            badge: 'Administration',
            badgeColor: 'indigo',
            avatar: 'TR',
            email: 'tom@malaikahouse.co.za',
            phone: '+27 85 012 3456',
            status: 'available',
            specializations: ['Operations Management', 'Financial Planning', 'System Administration'],
            schedule: [
                'Daily: Operations oversight',
                'Wed: Budget review',
                'Fri: System maintenance'
            ]
        },
        {
            id: 5,
            name: 'Maria Williams',
            role: 'Program Support Specialist',
            badge: 'Support',
            badgeColor: 'green',
            avatar: 'MW',
            email: 'maria@malaikahouse.co.za',
            phone: '+27 86 345 6789',
            status: 'offline',
            specializations: ['Parent Support', 'Session Coordination', 'Documentation'],
            schedule: [
                'Tue-Thu: Parent support calls',
                'Wed: Session planning',
                'Fri: Documentation review'
            ]
        },
        {
            id: 6,
            name: 'David Lee',
            role: 'Club Activities Coordinator',
            badge: 'Facilitator',
            badgeColor: 'blue',
            avatar: 'DL',
            email: 'david@malaikahouse.co.za',
            phone: '+27 87 678 9012',
            status: 'available',
            specializations: ['Activity Planning', 'Youth Engagement', 'Event Coordination'],
            schedule: [
                'Mon/Wed/Fri: Club sessions',
                'Tue: Activity planning',
                'Thu: Event preparation'
            ]
        }
    ];

    const statusColors = {
        available: 'bg-green-500',
        busy: 'bg-yellow-500',
        offline: 'bg-gray-500'
    };

    const statusText = {
        available: 'Available',
        busy: 'In Session',
        offline: 'Off Today'
    };

    const badgeColors = {
        Founder: 'bg-purple-100 text-purple-800',
        Facilitator: 'bg-blue-100 text-blue-800',
        Administration: 'bg-indigo-100 text-indigo-800',
        Support: 'bg-green-100 text-green-800'
    };

    return (
        <div className="p-6">
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Staff Management</h1>
                <div className="flex gap-3">
                    <button className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                        Staff Report
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        + Add Staff Member
                    </button>
                </div>
            </div>

            {/* Staff Overview */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Staff Overview</h2>
                    <button className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                        View Schedule
                    </button>
                </div>

                <div className="grid grid-cols-5 gap-4">
                    {staffStats.map((stat, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
                            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                            <div className="text-sm text-gray-600">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Staff Grid */}
            <div className="grid grid-cols-3 gap-6">
                {staffMembers.map(staff => (
                    <div key={staff.id} className="bg-white rounded-xl shadow-md p-6 relative overflow-hidden">
                        {/* Colored top border */}
                        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500`}></div>

                        {/* Header */}
                        <div className="flex items-center gap-4 mb-4">
                            <div className={`w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-semibold`}>
                                {staff.avatar}
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">{staff.name}</h3>
                                <p className="text-sm text-gray-600">{staff.role}</p>
                                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 ${badgeColors[staff.badge]}`}>
                                    {staff.badge}
                                </span>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="mb-4 space-y-2">
                            <div className="text-sm text-gray-600">📧 {staff.email}</div>
                            <div className="text-sm text-gray-600">📱 {staff.phone}</div>
                            <div className="flex items-center text-sm">
                                <div className={`w-2 h-2 rounded-full mr-2 ${statusColors[staff.status]}`}></div>
                                <span className="text-gray-600">{statusText[staff.status]}</span>
                            </div>
                        </div>

                        {/* Specializations */}
                        <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-800 mb-2">Specializations</h4>
                            <div className="flex flex-wrap gap-2">
                                {staff.specializations.map((spec, index) => (
                                    <span
                                        key={index}
                                        className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                                    >
                                        {spec}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Schedule */}
                        <div className="bg-gray-50 rounded-lg p-3 mb-4">
                            <h4 className="text-sm font-medium text-gray-800 mb-2">This Week</h4>
                            <div className="space-y-1">
                                {staff.schedule.map((item, index) => (
                                    <div key={index} className="text-sm text-gray-600">• {item}</div>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-2">
                            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">👁️</button>
                            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">✏️</button>
                            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">📅</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StaffManagement;