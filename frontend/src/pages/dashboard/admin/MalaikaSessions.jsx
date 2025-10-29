import React from 'react';

const MalaikaSessions = () => {
    const overviewStats = [
        { id: 1, icon: '📊', number: '284', label: 'Total Sessions' },
        { id: 2, icon: '📅', number: '45', label: 'This Week' },
        { id: 3, icon: '👥', number: '89', label: 'Active Clients' },
        { id: 4, icon: '⭐', number: '4.9', label: 'Avg Rating' },
        { id: 5, icon: '💰', number: 'R31,200', label: 'Monthly Revenue' }
    ];

    const sessionTypes = [
        {
            id: 1,
            name: 'Individual Sessions',
            count: 156,
            description: 'One-on-one sessions tailored to individual needs and goals. Provides personalized attention and customized support strategies.',
            duration: '60min',
            price: 'R450',
            satisfaction: '95%',
            type: 'individual'
        },
        {
            id: 2,
            name: 'Small Group Sessions',
            count: 89,
            description: 'Sessions for 2-4 participants focusing on social skills, peer interaction, and collaborative learning experiences.',
            duration: '90min',
            price: 'R320',
            satisfaction: '88%',
            type: 'group'
        },
        {
            id: 3,
            name: 'Family Sessions',
            count: 39,
            description: 'Family-inclusive sessions that involve parents and siblings, focusing on communication and support strategies at home.',
            duration: '75min',
            price: 'R580',
            satisfaction: '92%',
            type: 'family'
        }
    ];

    const bookingTiers = [
        {
            id: 1,
            name: 'Solo Entry',
            price: 'R450',
            description: 'Single session booking',
            isPopular: false
        },
        {
            id: 2,
            name: 'Party for Two',
            price: 'R800',
            description: '2 children together • Save R100',
            isPopular: true
        },
        {
            id: 3,
            name: '2025 Session Pass',
            price: 'R3,200',
            description: '8 sessions • Save R400',
            isPopular: false
        },
        {
            id: 4,
            name: 'Term Builder',
            price: 'Custom',
            description: 'Flexible term planning',
            isPopular: false
        }
    ];

    const timeSlots = [
        { id: 1, time: '9:00 AM', status: 'booked', info: 'Individual - Emma M.' },
        { id: 2, time: '10:30 AM', status: 'booked', info: 'Group Session (3)' },
        { id: 3, time: '12:00 PM', status: 'available', info: 'Available' },
        { id: 4, time: '1:30 PM', status: 'booked', info: 'Family - Rodriguez' },
        { id: 5, time: '3:00 PM', status: 'booked', info: 'Individual - Alex C.' },
        { id: 6, time: '4:30 PM', status: 'available', info: 'Available' }
    ];

    const recentSessions = [
        {
            id: 1,
            initials: 'EM',
            name: 'Emma Mitchell',
            type: 'Individual Session',
            details: 'Communication Skills',
            status: 'ongoing',
            time: '9:00 AM'
        },
        {
            id: 2,
            initials: 'GS',
            name: 'Group Session',
            type: 'Group Session',
            details: '3 participants - Social Skills Workshop',
            status: 'completed',
            time: 'Yesterday'
        },
        {
            id: 3,
            initials: 'SF',
            name: 'Sofia Rodriguez',
            type: 'Individual Session',
            details: 'Behavioral Support',
            status: 'completed',
            time: 'Yesterday'
        },
        {
            id: 4,
            initials: 'FR',
            name: 'Rodriguez Family',
            type: 'Family Session',
            details: 'Home Strategies',
            status: 'upcoming',
            time: 'Tomorrow 1:30 PM'
        },
        {
            id: 5,
            initials: 'AX',
            name: 'Alex Chen',
            type: 'Individual Session',
            details: 'Academic Support',
            status: 'upcoming',
            time: 'Today 3:00 PM'
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-600';
            case 'ongoing':
                return 'bg-yellow-100 text-yellow-600';
            case 'upcoming':
                return 'bg-blue-100 text-blue-600';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    };

    const getBorderColor = (type) => {
        switch (type) {
            case 'individual':
                return 'border-l-[#8DB4A8]';
            case 'group':
                return 'border-l-[#7B9BC4]';
            case 'family':
                return 'border-l-[#A594C7]';
            default:
                return 'border-l-gray-300';
        }
    };

    return (
        <div className="flex-1 min-h-0">
            {/* Top Bar */}
            <div className="bg-white shadow-sm px-8 py-6 flex justify-between items-center sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-[#5D5A7A]">
                        <span className="mr-2">🎯</span>
                        Malaika Sessions
                    </h1>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => alert('Generating schedule report...')}
                        className="px-4 py-2 rounded-lg bg-gray-100 text-[#5D5A7A] font-semibold hover:bg-gray-200 transition-colors"
                    >
                        Schedule Report
                    </button>
                    <button
                        onClick={() => alert('Opening session booking form...')}
                        className="px-4 py-2 rounded-lg bg-[#7B9BC4] text-white font-semibold hover:bg-[#8DB4A8] transition-colors"
                    >
                        + Book Session
                    </button>
                </div>
            </div>

            <div className="p-8">
                {/* Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
                    {overviewStats.map(stat => (
                        <div key={stat.id} className="bg-white rounded-xl p-6 shadow-md hover:-translate-y-1 transition-transform relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8DB4A8] to-[#7B9BC4]"></div>
                            <div className="text-3xl mb-4">{stat.icon}</div>
                            <div className="text-3xl font-bold text-[#5D5A7A] mb-1">{stat.number}</div>
                            <div className="text-sm font-medium text-[#6B5F7A]">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* Session Types */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <div className="flex justify-between items-center mb-6 pb-4 border-b">
                                <h2 className="text-xl font-semibold text-[#5D5A7A]">Session Types</h2>
                                <button className="px-4 py-2 rounded-lg bg-gray-100 text-[#5D5A7A] font-semibold hover:bg-gray-200 transition-colors">
                                    Manage Types
                                </button>
                            </div>

                            <div className="space-y-4">
                                {sessionTypes.map(type => (
                                    <div
                                        key={type.id}
                                        className={`bg-gray-50 rounded-lg p-5 border-l-4 ${getBorderColor(type.type)} hover:bg-opacity-75 hover:translate-x-1 transition-all cursor-pointer`}
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="font-semibold text-[#5D5A7A]">{type.name}</div>
                                            <div className="px-2 py-1 bg-[#8DB4A8] text-white text-xs font-semibold rounded-full">
                                                {type.count}
                                            </div>
                                        </div>
                                        <div className="text-sm text-[#6B5F7A] mb-4">{type.description}</div>
                                        <div className="flex gap-8 text-sm">
                                            <div className="text-center">
                                                <div className="font-bold text-[#5D5A7A]">{type.duration}</div>
                                                <div className="text-[#6B5F7A]">Duration</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="font-bold text-[#5D5A7A]">{type.price}</div>
                                                <div className="text-[#6B5F7A]">Price</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="font-bold text-[#5D5A7A]">{type.satisfaction}</div>
                                                <div className="text-[#6B5F7A]">Satisfaction</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Booking Tiers */}
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="mb-6 pb-4 border-b">
                            <h2 className="text-xl font-semibold text-[#5D5A7A]">Booking Tiers</h2>
                        </div>

                        <div className="space-y-4">
                            {bookingTiers.map(tier => (
                                <div
                                    key={tier.id}
                                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer
                    ${tier.isPopular
                                            ? 'border-[#8DB4A8] bg-green-50'
                                            : 'border-transparent bg-gray-50 hover:border-[#7B9BC4]'
                                        }`}
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="font-semibold text-[#5D5A7A]">{tier.name}</div>
                                        {tier.isPopular && (
                                            <div className="px-2 py-1 bg-green-100 text-green-600 text-xs font-semibold rounded-full uppercase">
                                                Popular
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-xl font-bold text-[#5D5A7A] mb-1">{tier.price}</div>
                                    <div className="text-sm text-[#6B5F7A]">{tier.description}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Today's Schedule */}
                <div className="bg-white rounded-xl p-6 shadow-md mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-[#5D5A7A]">Today's Schedule - October 15, 2024</h2>
                        <div className="flex gap-2">
                            <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#7B9BC4] hover:text-white transition-colors flex items-center justify-center">
                                ‹
                            </button>
                            <button className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#7B9BC4] hover:text-white transition-colors flex items-center justify-center">
                                ›
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {timeSlots.map(slot => (
                            <div
                                key={slot.id}
                                className={`p-4 rounded-lg text-center cursor-pointer transition-all border-2
                  ${slot.status === 'booked'
                                        ? 'bg-green-50 border-[#8DB4A8]'
                                        : 'bg-gray-50 border-transparent hover:border-[#7B9BC4]'
                                    }`}
                            >
                                <div className="font-semibold text-[#5D5A7A] mb-1">{slot.time}</div>
                                <div className="text-sm text-[#6B5F7A]">{slot.info}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Sessions */}
                <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b">
                        <h2 className="text-xl font-semibold text-[#5D5A7A]">Recent Sessions</h2>
                        <button className="px-4 py-2 rounded-lg bg-gray-100 text-[#5D5A7A] font-semibold hover:bg-gray-200 transition-colors">
                            View All
                        </button>
                    </div>

                    <div className="space-y-4">
                        {recentSessions.map(session => (
                            <div
                                key={session.id}
                                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-opacity-75 hover:translate-x-1 transition-all cursor-pointer"
                            >
                                <div className="w-10 h-10 rounded-full bg-[#A594C7] text-white flex items-center justify-center font-bold">
                                    {session.initials}
                                </div>
                                <div className="flex-1">
                                    <div className="font-semibold text-[#5D5A7A]">{session.name}</div>
                                    <div className="text-sm text-[#6B5F7A]">{session.type} - {session.details}</div>
                                </div>
                                <div className="text-right">
                                    <div className={`px-2 py-1 rounded-full text-xs font-semibold uppercase mb-1 
                    ${getStatusColor(session.status)}`}>
                                        {session.status}
                                    </div>
                                    <div className="text-sm text-[#6B5F7A]">{session.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MalaikaSessions;