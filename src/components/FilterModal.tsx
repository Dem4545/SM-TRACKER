import React from 'react';
import { X } from 'lucide-react';

interface FilterModalProps {
  filters: {
    nationality: string;
    position: string;
    pobStatus: 'All' | 'IN' | 'OUT';
    bocExpiryRange: 'All' | '≤7' | '7-14' | '15-30' | '>30';
    vrfExpiryRange: 'All' | '≤7' | '7-14' | '15-30';
    bloodType: 'All' | 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  };
  onApplyFilters: (filters: FilterModalProps['filters']) => void;
  onClose: () => void;
}

export function FilterModal({ filters, onApplyFilters, onClose }: FilterModalProps) {
  const [localFilters, setLocalFilters] = React.useState(filters);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocalFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleClear = () => {
    const clearedFilters = {
      nationality: '',
      position: '',
      pobStatus: 'All',
      bocExpiryRange: 'All',
      vrfExpiryRange: 'All',
      bloodType: 'All'
    };
    setLocalFilters(clearedFilters);
    onApplyFilters(clearedFilters);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Filter Options</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nationality</label>
            <input
              type="text"
              name="nationality"
              value={localFilters.nationality}
              onChange={handleChange}
              placeholder="Filter by nationality..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Position</label>
            <input
              type="text"
              name="position"
              value={localFilters.position}
              onChange={handleChange}
              placeholder="Filter by position..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">POB Status</label>
            <select
              name="pobStatus"
              value={localFilters.pobStatus}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="All">All</option>
              <option value="IN">IN</option>
              <option value="OUT">OUT</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">BOC Expiry Range</label>
            <select
              name="bocExpiryRange"
              value={localFilters.bocExpiryRange}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="All">All</option>
              <option value="≤7">≤ 7 days</option>
              <option value="7-14">7-14 days</option>
              <option value="15-30">15-30 days</option>
              <option value=">30">&gt; 30 days</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">VRF Expiry Range</label>
            <select
              name="vrfExpiryRange"
              value={localFilters.vrfExpiryRange}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="All">All</option>
              <option value="≤7">≤ 7 days</option>
              <option value="7-14">7-14 days</option>
              <option value="15-30">15-30 days</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Blood Type</label>
            <select
              name="bloodType"
              value={localFilters.bloodType}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="All">All</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
        </div>

        <div className="px-6 py-4 border-t flex justify-end space-x-4">
          <button
            onClick={handleClear}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Clear Filters
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
