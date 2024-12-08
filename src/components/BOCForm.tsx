import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { BOC, Employee } from '../types';

interface BOCFormProps {
  boc?: BOC;
  onSubmit: (bocData: Omit<BOC, 'id' | 'bocExpiryDays' | 'status'>) => void;
  onClose: () => void;
  employees?: Employee[];
}

export function BOCForm({ boc, onSubmit, onClose, employees }: BOCFormProps) {
  const [formData, setFormData] = useState({
    bocNumber: '',
    bocIssued: '',
    bocExpiry: '',
    assignedEmployeeId: '',
    comments: '',
  });

  useEffect(() => {
    if (boc) {
      setFormData({
        bocNumber: boc.bocNumber,
        bocIssued: boc.bocIssued,
        bocExpiry: boc.bocExpiry,
        assignedEmployeeId: boc.assignedEmployeeId || '',
        comments: boc.comments || '',
      });
    }
  }, [boc]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      bocNumber: formData.bocNumber,
      bocIssued: formData.bocIssued,
      bocExpiry: formData.bocExpiry,
      assignedEmployeeId: formData.assignedEmployeeId || undefined,
      comments: formData.comments,
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
            {boc ? 'Edit BOC Record' : 'Add BOC Record'}
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
              BOC Number
            </label>
            <input
              type="text"
              name="bocNumber"
              value={formData.bocNumber}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              BOC Issue Date
            </label>
            <input
              type="date"
              name="bocIssued"
              value={formData.bocIssued}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              BOC Expiry Date
            </label>
            <input
              type="date"
              name="bocExpiry"
              value={formData.bocExpiry}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
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
              {boc ? 'Update BOC' : 'Add BOC'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
