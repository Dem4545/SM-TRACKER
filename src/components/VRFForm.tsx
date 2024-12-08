import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { VRF, Employee } from '../types';

interface VRFFormProps {
  vrf?: VRF;
  onSubmit: (vrfData: Omit<VRF, 'id' | 'vrfExpiryDays' | 'status'>) => void;
  onClose: () => void;
  employees?: Employee[];
}

export function VRFForm({ vrf, onSubmit, onClose, employees }: VRFFormProps) {
  const [formData, setFormData] = useState({
    vrfNumber: '',
    vrfIssued: '',
    vrfExpiry: '',
    assignedEmployeeId: '',
    comments: '',
    access: '',
  });

  useEffect(() => {
    if (vrf) {
      setFormData({
        vrfNumber: vrf.vrfNumber,
        vrfIssued: vrf.vrfIssued,
        vrfExpiry: vrf.vrfExpiry,
        assignedEmployeeId: vrf.assignedEmployeeId || '',
        comments: vrf.comments || '',
        access: vrf.access,
      });
    }
  }, [vrf]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      vrfNumber: formData.vrfNumber,
      vrfIssued: formData.vrfIssued,
      vrfExpiry: formData.vrfExpiry,
      assignedEmployeeId: formData.assignedEmployeeId || undefined,
      comments: formData.comments,
      access: formData.access,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">
            {vrf ? 'Edit VRF Record' : 'Add VRF Record'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              VRF Number
            </label>
            <input
              type="text"
              name="vrfNumber"
              value={formData.vrfNumber}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              VRF Issue Date
            </label>
            <input
              type="date"
              name="vrfIssued"
              value={formData.vrfIssued}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              VRF Expiry Date
            </label>
            <input
              type="date"
              name="vrfExpiry"
              value={formData.vrfExpiry}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Access
            </label>
            <input
              type="text"
              name="access"
              value={formData.access}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              placeholder="e.g., Full Access, Limited Access, etc."
            />
          </div>

          {employees && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Assign to Employee (Optional)
              </label>
              <select
                name="assignedEmployeeId"
                value={formData.assignedEmployeeId}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Not Assigned</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.lastName}, {emp.firstName} ({emp.no})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Comments
            </label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              {vrf ? 'Update VRF' : 'Add VRF'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
