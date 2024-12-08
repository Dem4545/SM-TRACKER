import React from 'react';
import { Mail, Phone, Building2, Calendar, Banknote } from 'lucide-react';
import { Employee } from '../types';

interface EmployeeCardProps {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

export function EmployeeCard({ employee, onEdit, onDelete }: EmployeeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            {employee.lastName} {employee.firstName}
          </h3>
          <p className="text-gray-600">{employee.position}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(employee)}
            className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded-md hover:bg-blue-50"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(employee.id)}
            className="text-red-600 hover:text-red-800 px-3 py-1 rounded-md hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center text-gray-600">
          <Building2 className="w-4 h-4 mr-2" />
          <span>{employee.department}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Mail className="w-4 h-4 mr-2" />
          <span>{employee.email}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Phone className="w-4 h-4 mr-2" />
          <span>{employee.phone}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{new Date(employee.hireDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Banknote className="w-4 h-4 mr-2" />
          <span>${employee.salary.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
