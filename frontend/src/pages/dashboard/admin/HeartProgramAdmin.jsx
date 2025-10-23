import React, { useState } from 'react';

const HeartProgramAdmin = () => {
    // Sample data - replace with actual data from backend
    const stats = [
        { id: 1, icon: '👥', number: '73', label: 'Total Participants', trend: '12' },
        { id: 2, icon: '📈', number: '156', label: 'Sessions This Month', trend: '8' },
        { id: 3, icon: '⭐', number: '4.8', label: 'Avg Progress Score', trend: '15' },
        { id: 4, icon: '💰', number: 'R67,200', label: 'Monthly Revenue', trend: '5' }
    ];

    const participants = [
        {
            id: 1,
            initials: 'EM',
            name: 'Emma Mitchell',
            age: 8,
            focus: 'Social Skills Focus',
            startDate: 'Jan 2024',
            progress: 78
        },
        {
            id: 2,
            initials: 'AX',
            name: 'Alex Chen',
            age: 10,
            focus: 'Communication Support',
            startDate: 'Mar 2024',
            progress: 65
        },
        {
            id: 3,
            initials: 'SF',
            name: 'Sofia Rodriguez',
            age: 9,
            focus: 'Sensory Integration',
            startDate: 'Feb 2024',
            progress: 82
        },
        {
            id: 4,
            initials: 'JM',
            name: 'James Mitchell',
            age: 6,
            focus: 'Behavioral Support',
            startDate: 'Apr 2024',
            progress: 45
        },
        {
            id: 5,
            initials: 'ZJ',
            name: 'Zoe Johnson',
            age: 11,
            focus: 'Academic Support',
            startDate: 'Jan 2024',
            progress: 91
        }
    ];

    const tiers = [
        {
            id: 1,
            name: 'Everyone & Anyone',
            count: 32,
            description: 'Open enrollment program for all participants',
            price: 'R850/month',
            sessions: '8 sessions'
        },
        {
            id: 2,
            name: 'Malaika House Morning',
            count: 25,
            description: 'Intensive morning sessions for students',
            price: 'R1,200/month',
            sessions: '12 sessions'
        },
        {
            id: 3,
            name: 'Premium Support',
            count: 16,
            description: 'Advanced one-on-one and small group sessions',
            price: 'R1,850/month',
            sessions: '16 sessions'
        }
    ];

    const timeSlots = [
        { id: 1, time: '9:00 AM', status: 'booked', participant: 'Emma M. - Social Skills' },
        { id: 2, time: '10:00 AM', status: 'booked', participant: 'Group Session (4)' },
        { id: 3, time: '11:00 AM', status: 'available', participant: 'Available' },
        { id: 4, time: '1:00 PM', status: 'booked', participant: 'Alex C. - Communication' },
        { id: 5, time: '2:00 PM', status: 'booked', participant: 'Sofia R. - Sensory' },
        { id: 6, time: '3:00 PM', status: 'available', participant: 'Available' }
    ];

    const facilitators = [
        {
            id: 1,
            initials: 'JM',
            name: 'Jessica Miller',
            role: 'Senior Heart Program Facilitator',
            status: 'busy',
            statusText: 'In Session (until 11:00)'
        },
        {
            id: 2,
            initials: 'A',
            name: 'Amarta',
            role: 'Co-Founder & Program Director',
            status: 'available',
            statusText: 'Available'
        },
        {
            id: 3,
            initials: 'EP',
            name: 'Elria Patterson',
            role: 'Co-Founder & Creative Director',
            status: 'available',
            statusText: 'Available'
        },
        {
            id: 4,
            initials: 'MW',
            name: 'Maria Williams',
            role: 'Program Support Specialist',
            status: 'unavailable',
            statusText: 'Off Today'
        }
    ];

    // Event handlers
    const handleParticipantClick = (name) => {
        alert(`Opening detailed profile for ${name}...`);
    };

    const handleTimeSlotClick = (time, status, participant) => {
        if (status === 'available') {
            alert(`Booking session for ${time}...`);
        } else {
            alert(`Viewing session details for ${time}: ${participant}...`);
        }
    };

    return (
        <div className="flex-1 min-h-0">
            {/* Top Bar */}
            <div className="bg-white shadow-sm px-8 py-6 flex justify-between items-center sticky top-0 z-10">
                <h1 className="text-3xl font-bold text-[#5D5A7A] flex items-center gap-3">
                    <span className="text-red-500">❤️</span>
                    Heart Program Management
                </h1>
                <div className="flex gap-4">
                    <button
                        onClick={() => alert('Generating Heart Program performance report...')}
                        className="px-4 py-2 rounded-lg bg-gray-100 text-[#5D5A7A] font-semibold hover:bg-gray-200 transition-colors"
                    >
                        Program Report
                    </button>
                    <button
                        onClick={() => alert('Opening Add New Participant form...')}
                        className="px-4 py-2 rounded-lg bg-[#7B9BC4] text-white font-semibold hover:bg-[#8DB4A8] transition-colors"
                    >
                        + Add Participant
                    </button>
                </div>
            </div>

            <div className="p-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map(stat => (
                        <div key={stat.id} className="bg-white rounded-xl p-6 shadow-md hover:-translate-y-1 transition-transform relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-[#8DB4A8]"></div>
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-[#8DB4A8] text-white flex items-center justify-center text-2xl">
                                    {stat.icon}
                                </div>
                                <div className="text-sm font-semibold text-[#8DB4A8] bg-green-100 px-2 py-1 rounded-full">
                                    ↗ {stat.trend}%
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-[#5D5A7A] mb-1">{stat.number}</div>
                            <div className="text-sm font-medium text-[#6B5F7A]">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Program Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* Active Participants */}
                    <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-md">
                        <div className="flex justify-between items-center mb-6 pb-4 border-b">
                            <h2 className="text-xl font-semibold text-[#5D5A7A]">Active Participants</h2>
                            <button className="px-4 py-2 rounded-lg bg-gray-100 text-[#5D5A7A] font-semibold hover:bg-gray-200 transition-colors">
                                View All
                            </button>
                        </div>

                        <div className="space-y-4">
                            {participants.map(participant => (
                                <div
                                    key={participant.id}
                                    onClick={() => handleParticipantClick(`${participant.name} (${participant.age})`)}
                                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-opacity-75 hover:translate-x-1 transition-all cursor-pointer"
                                >
                                    <div className="w-12 h-12 rounded-full bg-[#8DB4A8] text-white flex items-center justify-center font-bold">
                                        {participant.initials}
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-semibold text-[#5D5A7A]">{participant.name} ({participant.age})</div>
                                        <div className="text-sm text-[#6B5F7A]">{participant.focus} • Started: {participant.startDate}</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-[#8DB4A8] rounded-full"
                                                style={{ width: `${participant.progress}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm font-semibold text-[#6B5F7A]">{participant.progress}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Program Tiers */}
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="mb-6 pb-4 border-b">
                            <h2 className="text-xl font-semibold text-[#5D5A7A]">Program Tiers</h2>
                        </div>

                        <div className="space-y-4">
                            {tiers.map(tier => (
                                <div
                                    key={tier.id}
                                    className="p-4 bg-gray-50 rounded-lg border-l-4 border-[#7B9BC4]"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="font-semibold text-[#5D5A7A]">{tier.name}</div>
                                        <div className="px-2 py-1 bg-[#8DB4A8] text-white text-xs font-semibold rounded-full">
                                            {tier.count}
                                        </div>
                                    </div>
                                    <div className="text-sm text-[#6B5F7A] mb-2">{tier.description}</div>
                                    <div className="text-sm font-bold text-[#5D5A7A]">
                                        {tier.price} • {tier.sessions}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Session Calendar */}
                <div className="bg-white rounded-xl p-6 shadow-md mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-[#5D5A7A]">Today's Sessions - October 15, 2024</h2>
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
                                onClick={() => handleTimeSlotClick(slot.time, slot.status, slot.participant)}
                                className={`p-4 rounded-lg text-center cursor-pointer transition-all border-2
                  ${slot.status === 'booked'
                                        ? 'bg-green-50 border-[#8DB4A8]'
                                        : 'bg-red-50 border-transparent hover:border-[#7B9BC4]'
                                    }`}
                            >
                                <div className="font-semibold text-[#5D5A7A] mb-1">{slot.time}</div>
                                <div className="text-sm text-[#6B5F7A]">{slot.participant}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Facilitator Schedule */}
                <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b">
                        <h2 className="text-xl font-semibold text-[#5D5A7A]">Heart Program Facilitators</h2>
                        <button className="px-4 py-2 rounded-lg bg-gray-100 text-[#5D5A7A] font-semibold hover:bg-gray-200 transition-colors">
                            Schedule Overview
                        </button>
                    </div>

                    <div className="space-y-4">
                        {facilitators.map(facilitator => (
                            <div
                                key={facilitator.id}
                                className="flex items-center gap-4 py-3 border-b last:border-0"
                            >
                                <div className="w-10 h-10 rounded-full bg-[#A594C7] text-white flex items-center justify-center font-bold">
                                    {facilitator.initials}
                                </div>
                                <div className="flex-1">
                                    <div className="font-semibold text-[#5D5A7A]">{facilitator.name}</div>
                                    <div className="text-sm text-[#6B5F7A]">{facilitator.role}</div>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <div className={`w-2 h-2 rounded-full
                    ${facilitator.status === 'available' ? 'bg-[#8DB4A8]' :
                                            facilitator.status === 'busy' ? 'bg-yellow-500' :
                                                'bg-red-500'
                                        }`}
                                    ></div>
                                    <span className="text-[#6B5F7A]">{facilitator.statusText}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeartProgramAdmin;