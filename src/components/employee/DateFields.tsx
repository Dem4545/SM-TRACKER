import React from 'react';

interface DateFieldsProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function DateFields({ formData, handleChange }: DateFieldsProps) {
  const calculatePOB = (arrival: string, departure: string) => {
    if (!arrival || !departure) return '';
    
    const today = new Date();
    const arrivalDate = new Date(arrival);
    const departureDate = new Date(departure);
    
    if (today >= arrivalDate && today <= departureDate) {
      return 'IN';
    }
    return 'OUT';
  };

  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700">Arrival Date</label>
        <input
          type="date"
          name="arrival"
          value={formData.arrival}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Departure Date</label>
        <input
          type="date"
          name="departure"
          value={formData.departure}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">POB Status</label>
        <div className={`mt-1 px-3 py-2 rounded-md border ${
          calculatePOB(formData.arrival, formData.departure) === 'IN' 
            ? 'bg-green-100 text-green-800 border-green-200'
            : 'bg-red-100 text-red-800 border-red-200'
        }`}>
          {calculatePOB(formData.arrival, formData.departure) || 'Not Set'}
        </div>
      </div>
    </>
  );
}
