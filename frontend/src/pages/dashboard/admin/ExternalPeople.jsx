import React, { useState, useMemo } from 'react';

const ExternalPeople = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('All Types');
    const [statusFilter, setStatusFilter] = useState('All Status');

    // Just some sample data replace with actual data from backend Shaun
    const partners = [
        {
            id: 1,
            name: 'Marcus Johnson - Square Peg Club',
            email: 'marcus@squarepegclub.co.za',
            phone: '+27 81 234 5678',
            description: 'Kids & Teens creativity club',
            type: 'Club Partners',
            status: 'active'
        },
        {
            id: 2,
            name: 'Team WIL Project',
            email: 'admin@teamwil.co.za',
            phone: '+27 85 901 2345',
            description: 'Neurodiversity training program',
            type: 'Club Partners',
            status: 'pending'
        },
        {
            id: 3,
            name: 'Adventure Club SA',
            email: 'info@adventureclub.co.za',
            phone: '+27 82 456 7890',
            description: 'Outdoor activities and adventures',
            type: 'Club Partners',
            status: 'active'
        },
        {
            id: 4,
            name: 'Dr. Sarah Thompson',
            email: 's.thompson@psychology.co.za',
            phone: '+27 83 567 8901',
            description: 'Educational Psychologist',
            type: 'Collaborators',
            status: 'active'
        },
        {
            id: 5,
            name: 'BackaBuddy Platform',
            email: 'support@backabuddy.co.za',
            phone: '+27 21 447 1818',
            description: 'Fundraising platform support',
            type: 'Collaborators',
            status: 'active'
        }
    ];

    const timeline = [
        {
            id: 1,
            icon: '🤝',
            text: 'New partnership established with Adventure Club SA',
            date: '3 days ago'
        },
        {
            id: 2,
            icon: '📄',
            text: 'Contract renewal signed with Square Peg Club',
            date: '1 week ago'
        },
        {
            id: 3,
            icon: '🎯',
            text: 'Team WIL Project training session conducted',
            date: '2 weeks ago'
        },
        {
            id: 4,
            icon: '💬',
            text: 'Monthly review meeting with Dr. Sarah Thompson',
            date: '3 weeks ago'
        }
    ];

    const stats = [
        { id: 1, number: '12', label: 'Total Partners' },
        { id: 2, number: '8', label: 'Active Partnerships' },
        { id: 3, number: '6', label: 'External Clubs' },
        { id: 4, number: '2', label: 'Collaborators' },
        { id: 5, number: '345', label: 'Joint Sessions' }
    ];

    // Filter partners based on search term and filters
    const filteredPartners = useMemo(() => {
        return partners.filter(partner => {
            const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                partner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                partner.description.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesType = typeFilter === 'All Types' || partner.type === typeFilter;
            const matchesStatus = statusFilter === 'All Status' || partner.status === statusFilter.toLowerCase();

            return matchesSearch && matchesType && matchesStatus;
        });
    }, [partners, searchTerm, typeFilter, statusFilter]);

    // Group partners by type
    const groupedPartners = useMemo(() => {
        const groups = {};
        filteredPartners.forEach(partner => {
            if (!groups[partner.type]) {
                groups[partner.type] = [];
            }
            groups[partner.type].push(partner);
        });
        return groups;
    }, [filteredPartners]);

    const handleViewPartner = (partnerName) => {
        alert(`Opening detailed profile for ${partnerName}...`);
    };

    const handleEditPartner = (partnerName) => {
        alert(`Opening edit form for ${partnerName}...`);
    };

    return (
        <div className="flex-1 min-h-0">
            {/* Top Bar */}
            <div className="bg-white shadow-sm px-8 py-6 flex justify-between items-center sticky top-0 z-10">
                <h1 className="text-3xl font-bold text-[#5D5A7A]">External People</h1>
                <div className="flex gap-4">
                    <button
                        className="px-4 py-2 rounded-lg bg-gray-100 text-[#5D5A7A] font-semibold hover:bg-gray-200 transition-colors"
                        onClick={() => alert('Generating partnership report...')}
                    >
                        Partnership Report
                    </button>
                    <button
                        className="px-4 py-2 rounded-lg bg-[#7B9BC4] text-white font-semibold hover:bg-[#8DB4A8] transition-colors"
                        onClick={() => alert('Opening Add New Partner form...')}
                    >
                        + Add Partner
                    </button>
                </div>
            </div>

            <div className="p-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
                    {stats.map(stat => (
                        <div key={stat.id} className="bg-white rounded-xl p-6 shadow-md hover:-translate-y-1 transition-transform relative overflow-hidden text-center">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A594C7] to-[#7B9BC4]"></div>
                            <div className="text-4xl font-bold text-[#5D5A7A] mb-2">{stat.number}</div>
                            <div className="text-sm font-medium text-[#6B5F7A]">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Filter Bar */}
                <div className="bg-white rounded-xl p-6 shadow-md mb-8 flex flex-wrap gap-4 items-center">
                    <div className="flex items-center gap-2">
                        <label className="font-semibold text-[#5D5A7A]">Type:</label>
                        <select
                            className="p-2 border rounded-lg"
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                        >
                            <option>All Types</option>
                            <option>Club Partners</option>
                            <option>Collaborators</option>
                            <option>Service Providers</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="font-semibold text-[#5D5A7A]">Status:</label>
                        <select
                            className="p-2 border rounded-lg"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option>All Status</option>
                            <option>Active</option>
                            <option>Pending</option>
                            <option>Inactive</option>
                        </select>
                    </div>
                    <input
                        type="text"
                        placeholder="Search partners by name or organization..."
                        className="flex-1 min-w-[200px] p-2 border rounded-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Partner Categories */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {Object.entries(groupedPartners).map(([type, partners]) => (
                        <div key={type} className="bg-white rounded-xl p-6 shadow-md">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                                <div className="w-10 h-10 rounded-full bg-[#A594C7] text-white flex items-center justify-center text-xl">
                                    {type === 'Club Partners' ? '🎭' : '🤝'}
                                </div>
                                <h2 className="text-xl font-semibold text-[#5D5A7A]">{type}</h2>
                            </div>

                            <div className="space-y-4">
                                {partners.map(partner => (
                                    <div key={partner.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-opacity-75 hover:translate-x-1 transition-all">
                                        <div>
                                            <div className="font-semibold text-[#5D5A7A]">{partner.name}</div>
                                            <div className="text-sm text-[#6B5F7A]">{partner.email}</div>
                                            <div className="text-sm text-[#6B5F7A]">{partner.phone}</div>
                                            <div className="text-sm italic text-[#6B5F7A]">{partner.description}</div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase
                        ${partner.status === 'active' ? 'bg-green-100 text-green-600' :
                                                    partner.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                                                        'bg-gray-100 text-gray-600'}`}>
                                                {partner.status}
                                            </span>
                                            <div className="flex gap-1">
                                                <button
                                                    onClick={() => handleViewPartner(partner.name)}
                                                    className="p-2 bg-[#7B9BC4] text-white rounded hover:bg-[#8DB4A8] transition-colors"
                                                >
                                                    👁️
                                                </button>
                                                <button
                                                    onClick={() => handleEditPartner(partner.name)}
                                                    className="p-2 bg-[#A594C7] text-white rounded hover:bg-[#6B5F7A] transition-colors"
                                                >
                                                    ✏️
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Timeline */}
                <div className="bg-white rounded-xl p-6 shadow-md">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b">
                        <h2 className="text-xl font-semibold text-[#5D5A7A]">Recent Partnership Activity</h2>
                        <button className="px-4 py-2 rounded-lg bg-gray-100 text-[#5D5A7A] font-semibold hover:bg-gray-200 transition-colors">
                            View All
                        </button>
                    </div>

                    <div className="space-y-6">
                        {timeline.map(item => (
                            <div key={item.id} className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#8DB4A8] text-white flex items-center justify-center">
                                    {item.icon}
                                </div>
                                <div>
                                    <div className="text-[#5D5A7A]">{item.text}</div>
                                    <div className="text-sm text-[#6B5F7A]">{item.date}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExternalPeople;