import React, { useState } from 'react';
import { Employee } from '../types';
import { SearchInput } from './SearchInput';
import { Calendar, Clock } from 'lucide-react';
import { ExcelButtons } from './ExcelButtons';
import * as XLSX from 'xlsx';

interface AirportDashboardProps {
  employees: Employee[];
}

export function AirportDashboard({ employees }: AirportDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

  const getUpcomingArrivals = () => {
    return employees.filter(emp => {
      const arrivalDate = new Date(emp.arrival);
      return arrivalDate >= today && arrivalDate <= nextWeek;
    }).sort((a, b) => new Date(a.arrival).getTime() - new Date(b.arrival).getTime());
  };

  const getUpcomingDepartures = () => {
    return employees.filter(emp => {
      const departureDate = new Date(emp.departure);
      return departureDate >= today && departureDate <= nextWeek;
    }).sort((a, b) => new Date(b.departure).getTime() - new Date(a.departure).getTime());
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit'
      })
    };
  };

  const handleExport = () => {
    const arrivals = getUpcomingArrivals().map(emp => ({
      'Type': 'Arrival',
      'Name': `${emp.firstName} ${emp.lastName}`,
      'Position': emp.position,
      'Date': formatDateTime(emp.arrival).date,
      'Time': formatDateTime(emp.arrival).time
    }));

    const departures = getUpcomingDepartures().map(emp => ({
      'Type': 'Departure',
      'Name': `${emp.firstName} ${emp.lastName}`,
      'Position': emp.position,
      'Date': formatDateTime(emp.departure).date,
      'Time': formatDateTime(emp.departure).time
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([...arrivals, ...departures]);
    XLSX.utils.book_append_sheet(wb, ws, 'Airport Schedule');
    XLSX.writeFile(wb, 'airport-schedule.xlsx');
  };

  const handleImport = (data: any[]) => {
    // Handle import logic if needed
    console.log('Imported data:', data);
  };

  const upcomingArrivals = getUpcomingArrivals();
  const upcomingDepartures = getUpcomingDepartures();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Airport Schedule</h2>
        <div className="flex items-center gap-4">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search schedules..."
          />
          <ExcelButtons
            onImport={handleImport}
            onExport={handleExport}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Arrivals */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-green-50 border-b border-green-100">
            <h3 className="text-lg font-semibold text-green-800">Upcoming Arrivals</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {upcomingArrivals.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500">
                No upcoming arrivals in the next 7 days
              </div>
            ) : (
              upcomingArrivals.map(emp => {
                const { date, time } = formatDateTime(emp.arrival);
                return (
                  <div key={emp.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {emp.firstName} {emp.lastName}
                        </h4>
                        <p className="text-sm text-gray-600">{emp.position}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-1" />
                          {date}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-1" />
                          {time}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Departures */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-blue-50 border-b border-blue-100">
            <h3 className="text-lg font-semibold text-blue-800">Upcoming Departures</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {upcomingDepartures.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500">
                No upcoming departures in the next 7 days
              </div>
            ) : (
              upcomingDepartures.map(emp => {
                const { date, time } = formatDateTime(emp.departure);
                return (
                  <div key={emp.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {emp.firstName} {emp.lastName}
                        </h4>
                        <p className="text-sm text-gray-600">{emp.position}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-1" />
                          {date}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-1" />
                          {time}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
