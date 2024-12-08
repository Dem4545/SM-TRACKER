import React, { useState } from 'react';
import { Employee, SortConfig } from '../types';
import { Edit2, Trash2, Info } from 'lucide-react';
import { EmployeeInfoModal } from './EmployeeInfoModal';

interface EmployeeTableProps {
  employees: Employee[];
  sortConfig: SortConfig;
  onSort: (key: string) => void;
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

const getExpiryColor = (days: number) => {
  if (days <= 0) return 'text-red-600';
  if (days <= 10) return 'text-red-500 font-bold';
  if (days <= 20) return 'text-yellow-600';
  return 'text-green-600';
};

export function EmployeeTable({ 
  employees, 
  sortConfig, 
  onSort, 
  onEdit, 
  onDelete 
}: EmployeeTableProps) {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const getSortIndicator = (key: string) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
    }
    return '';
  };

  const formatDate = (date: string) => {
    return date ? new Date(date).toLocaleDateString() : '-';
  };

  const formatDays = (days: number) => {
    return `${days}`;
  };

  const getPOBStatus = (arrival: string, departure: string) => {
    const today = new Date();
    const arrivalDate = new Date(arrival);
    const departureDate = new Date(departure);
    
    if (today >= arrivalDate && today <= departureDate) {
      return { status: 'IN', color: 'text-green-600' };
    } else {
      return { status: 'OUT', color: 'text-red-600' };
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              {[
                { key: 'no', label: 'No#' },
                { key: 'firstName', label: 'Name' },
                { key: 'nationality', label: 'Nationality' },
                { key: 'passportNumber', label: 'Passport Number' },
                { key: 'position', label: 'Position' },
                { key: 'arrival', label: 'Arrival' },
                { key: 'departure', label: 'Departure' },
                { key: 'pob', label: 'POB' },
                { key: 'bocNumber', label: 'BOC Number' },
                { key: 'bocExpiry', label: 'BOC Expiry' },
                { key: 'bocExpiryDays', label: 'BOC Days' },
                { key: 'badge', label: 'Badge' },
                { key: 'vrfNumber', label: 'VRF Number' },
                { key: 'vrfExpiry', label: 'VRF Expiry' },
                { key: 'vrfExpiryDays', label: 'VRF Days' },
                { key: 'note', label: 'Note' },
                { key: 'info', label: 'Info' }
              ].map(({ key, label }) => (
                <th
                  key={key}
                  onClick={() => key !== 'info' && onSort(key)}
                  className={`px-4 py-2 text-center text-sm font-semibold text-gray-600 whitespace-nowrap ${
                    key !== 'info' ? 'cursor-pointer hover:bg-gray-100' : ''
                  }`}
                >
                  {label}{getSortIndicator(key)}
                </th>
              ))}
              <th className="px-4 py-2 text-center text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {employees.map((employee, index) => {
              const pobStatus = getPOBStatus(employee.arrival, employee.departure);
              const hasBadge = Boolean(employee.badge);
              
              return (
                <tr key={employee.id} className="hover:bg-[#63ADF2] hover:bg-opacity-20 transition-colors duration-150">
                  <td className="px-4 py-2 text-sm text-gray-900 text-center whitespace-nowrap">{index + 1}</td>
                  <td className="px-4 py-2 text-sm text-gray-900 text-center whitespace-nowrap">
                    {`${employee.firstName} ${employee.lastName}`}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900 text-center whitespace-nowrap">{employee.nationality}</td>
                  <td className="px-4 py-2 text-sm text-gray-900 text-center whitespace-nowrap">{employee.passportNumber}</td>
                  <td className="px-4 py-2 text-sm text-gray-900 text-center whitespace-nowrap">{employee.position}</td>
                  <td className="px-4 py-2 text-sm text-gray-900 text-center whitespace-nowrap">{formatDate(employee.arrival)}</td>
                  <td className="px-4 py-2 text-sm text-gray-900 text-center whitespace-nowrap">{formatDate(employee.departure)}</td>
                  <td className={`px-4 py-2 text-sm font-medium text-center whitespace-nowrap ${pobStatus.color}`}>
                    {pobStatus.status}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900 text-center whitespace-nowrap">{employee.bocNumber}</td>
                  <td className="px-4 py-2 text-sm text-gray-900 text-center whitespace-nowrap">{formatDate(employee.bocExpiry)}</td>
                  <td className={`px-4 py-2 text-sm font-medium text-center whitespace-nowrap ${getExpiryColor(employee.bocExpiryDays)}`}>
                    {formatDays(employee.bocExpiryDays)}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900 text-center whitespace-nowrap">{employee.badge}</td>
                  <td className={`px-4 py-2 text-sm text-gray-900 text-center whitespace-nowrap ${hasBadge ? 'bg-yellow-50' : ''}`}>
                    {hasBadge ? '-' : employee.vrfNumber}
                  </td>
                  <td className={`px-4 py-2 text-sm text-gray-900 text-center whitespace-nowrap ${hasBadge ? 'bg-yellow-50' : ''}`}>
                    {hasBadge ? '-' : formatDate(employee.vrfExpiry)}
                  </td>
                  <td className={`px-4 py-2 text-sm text-gray-900 text-center whitespace-nowrap ${hasBadge ? 'bg-yellow-50' : ''} ${!hasBadge ? getExpiryColor(employee.vrfExpiryDays) : ''}`}>
                    {hasBadge ? '-' : formatDays(employee.vrfExpiryDays)}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900 text-center whitespace-nowrap">{employee.note || '-'}</td>
                  <td className="px-4 py-2 text-sm text-gray-900 text-center whitespace-nowrap">
                    <button
                      onClick={() => setSelectedEmployee(employee)}
                      className="text-blue-600 hover:text-blue-800"
                      title="View employee info"
                    >
                      <Info className="h-4 w-4" />
                    </button>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900 text-center whitespace-nowrap">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => onEdit(employee)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit employee"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDelete(employee.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete employee"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selectedEmployee && (
        <EmployeeInfoModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
    </>
  );
}
