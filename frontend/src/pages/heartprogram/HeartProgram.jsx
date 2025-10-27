import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const HeartProgram = () => {
  /// Sample data
  const programStats = [
    { icon: '👥', trend: '↗ 12%', value: '73', label: 'Total Participants' },
    { icon: '📈', trend: '↗ 8%', value: '156', label: 'Sessions This Month' },
    { icon: '⭐', trend: '↗ 15%', value: '4.8', label: 'Avg Progress Score' },
    { icon: '💰', trend: '↗ 5%', value: 'R67,200', label: 'Monthly Revenue' }
  ];

  const activeParticipants = [
    { initials: 'EM', name: 'Emma Mitchell (8)', details: 'Social Skills Focus • Started: Jan 2024', progress: 78 },
    { initials: 'AX', name: 'Alex Chen (10)', details: 'Communication Support • Started: Mar 2024', progress: 65 },
    { initials: 'SF', name: 'Sofia Rodriguez (9)', details: 'Sensory Integration • Started: Feb 2024', progress: 82 },
    { initials: 'JM', name: 'James Mitchell (6)', details: 'Behavioral Support • Started: Apr 2024', progress: 45 },
    { initials: 'ZJ', name: 'Zoe Johnson (11)', details: 'Academic Support • Started: Jan 2024', progress: 91 }
  ];

  const programTiers = [
    { name: 'Everyone & Anyone', count: 32, description: 'Open enrollment program for all participants', price: 'R850/month • 8 sessions' },
    { name: 'Malaika House Morning', count: 25, description: 'Intensive morning sessions for students', price: 'R1,200/month • 12 sessions' },
    { name: 'Premium Support', count: 16, description: 'Advanced one-on-one and small group sessions', price: 'R1,850/month • 16 sessions' }
  ];

  const todaysSessions = [
    { time: '9:00 AM', status: 'Emma M. - Social Skills', type: 'booked' },
    { time: '10:00 AM', status: 'Group Session (4)', type: 'booked' },
    { time: '11:00 AM', status: 'Available', type: 'available' },
    { time: '1:00 PM', status: 'Alex C. - Communication', type: 'booked' },
    { time: '2:00 PM', status: 'Sofia R. - Sensory', type: 'booked' },
    { time: '3:00 PM', status: 'Available', type: 'available' }
  ];

  const facilitators = [
    { initials: 'JM', name: 'Jessica Miller', role: 'Senior Heart Program Facilitator', status: 'busy', statusText: 'In Session (until 11:00)' },
    { initials: 'A', name: 'Amarta', role: 'Co-Founder & Program Director', status: 'available', statusText: 'Available' },
    { initials: 'EP', name: 'Elria Patterson', role: 'Co-Founder & Creative Director', status: 'available', statusText: 'Available' },
    { initials: 'MW', name: 'Maria Williams', role: 'Program Support Specialist', status: 'unavailable', statusText: 'Off Today' }
  ];

  const handleParticipantClick = (participant) => {
    alert(`Opening detailed profile for ${participant.name}...`);
  };

  const handleTimeSlotClick = (slot) => {
    if (slot.status === 'Available') {
      alert(`Booking session for ${slot.time}...`);
    } else {
      alert(`Viewing session details for ${slot.time}: ${slot.status}...`);
    }
  };

  const handleTierClick = (tier) => {
    alert(`Managing ${tier.name} tier participants...`);
  };

  const handleFacilitatorClick = (facilitator) => {
    alert(`Opening schedule for ${facilitator.name}...`);
  };

  const handleAddParticipant = () => {
    alert('Opening Add New Participant form...');
  };

  const handleProgramReport = () => {
    alert('Generating Heart Program performance report...');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-[#9dcd5a]';
      case 'busy': return 'bg-[#dc5022]';
      case 'unavailable': return 'bg-[#22293c]';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6e7]">
      {/* Top Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl text-[#dc5022]">❤️</span>
              <h1 className="text-2xl font-bold text-[#22293c]">Heart Program Management</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={handleProgramReport}>
                Program Report
              </Button>
              <Button className="bg-[#dc5022] hover:bg-[#c4461e] text-white" onClick={handleAddParticipant}>
                + Add Participant
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Program Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programStats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#dc5022] to-[#9dcd5a]"></div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#dc5022] to-[#9dcd5a] flex items-center justify-center text-white text-xl">
                    {stat.icon}
                  </div>
                  <Badge variant="secondary" className="bg-[#9dcd5a]/20 text-[#22293c]">
                    {stat.trend}
                  </Badge>
                </div>
                <div className="text-3xl font-bold text-[#22293c] mb-1">{stat.value}</div>
                <div className="text-sm text-[#22293c]/80 font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Program Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Participants */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#f4f6e7]">
                  <h2 className="text-xl font-semibold text-[#22293c]">Active Participants</h2>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
                <div className="space-y-4">
                  {activeParticipants.map((participant, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-4 rounded-lg bg-[#f4f6e7] hover:bg-[#66b1b2]/10 cursor-pointer transition-all duration-200 hover:translate-x-1"
                      onClick={() => handleParticipantClick(participant)}
                    >
                      <Avatar className="h-12 w-12 bg-[#9dcd5a]">
                        <AvatarFallback className="text-white font-semibold">
                          {participant.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-[#22293c] truncate">
                          {participant.name}
                        </div>
                        <div className="text-sm text-[#22293c]/70 truncate">
                          {participant.details}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-20 h-2 bg-[#f4f6e7] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#9dcd5a] rounded-full transition-all duration-300"
                            style={{ width: `${participant.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-[#22293c] min-w-10">
                          {participant.progress}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Program Tiers */}
          <div>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-[#22293c]">Program Tiers</h2>
                </div>
                <div className="space-y-4">
                  {programTiers.map((tier, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-[#f4f6e7] border-l-4 border-[#66b1b2] cursor-pointer hover:bg-[#66b1b2]/10 transition-colors duration-200"
                      onClick={() => handleTierClick(tier)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold text-[#22293c]">{tier.name}</div>
                        <Badge className="bg-[#9dcd5a] text-[#22293c]">
                          {tier.count}
                        </Badge>
                      </div>
                      <div className="text-sm text-[#22293c]/70 mb-2">{tier.description}</div>
                      <div className="text-sm font-semibold text-[#22293c]">{tier.price}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Session Calendar */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[#22293c]">Today's Sessions - October 15, 2024</h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" className="w-9 h-9 rounded-full">
                  ‹
                </Button>
                <Button variant="outline" size="icon" className="w-9 h-9 rounded-full">
                  ›
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {todaysSessions.map((slot, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg text-center cursor-pointer transition-all duration-200 border-2 ${
                    slot.type === 'booked' 
                      ? 'bg-[#9dcd5a]/10 border-[#9dcd5a] hover:border-[#9dcd5a]/70' 
                      : 'bg-[#dc5022]/10 border-[#dc5022] hover:border-[#dc5022]/70'
                  }`}
                  onClick={() => handleTimeSlotClick(slot)}
                >
                  <div className="font-semibold text-[#22293c] mb-1">{slot.time}</div>
                  <div className="text-sm text-[#22293c]/70">{slot.status}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Facilitator Schedule */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#f4f6e7]">
              <h2 className="text-xl font-semibold text-[#22293c]">Heart Program Facilitators</h2>
              <Button variant="outline" size="sm">
                Schedule Overview
              </Button>
            </div>
            <div className="space-y-4">
              {facilitators.map((facilitator, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-[#f4f6e7] cursor-pointer transition-colors duration-200"
                  onClick={() => handleFacilitatorClick(facilitator)}
                >
                  <Avatar className="h-10 w-10 bg-[#66b1b2]">
                    <AvatarFallback className="text-white text-sm font-semibold">
                      {facilitator.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[#22293c] truncate">
                      {facilitator.name}
                    </div>
                    <div className="text-sm text-[#22293c]/70 truncate">
                      {facilitator.role}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(facilitator.status)}`}></div>
                    <span className="text-sm text-[#22293c]/70 whitespace-nowrap">
                      {facilitator.statusText}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HeartProgram;