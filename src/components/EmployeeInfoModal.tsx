import React from 'react';
import { X } from 'lucide-react';
import { Employee } from '../types';

interface EmployeeInfoModalProps {
  employee: Employee;
  onClose: () => void;
}

export function EmployeeInfoModal({ employee, onClose }: EmployeeInfoModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Employee Information</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Contact Information</h3>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Email:</span> {employee.email}
              </p>
              <p className="text-sm">
                <span className="font-medium">Mobile Phone:</span> {employee.mobilePhone}
              </p>
              <p className="text-sm">
                <span className="font-medium">Blood Type:</span> {employee.bloodType}
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
