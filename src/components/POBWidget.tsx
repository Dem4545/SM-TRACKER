import React from 'react';
import { Users } from 'lucide-react';
import { Employee } from '../types';

interface POBWidgetProps {
  employees: Employee[];
}

export function POBWidget({ employees }: POBWidgetProps) {
  const getPOBCounts = () => {
    const today = new Date();
    let inCount = 0;
    let outCount = 0;

    employees.forEach(emp => {
      const arrivalDate = new Date(emp.arrival);
      const departureDate = new Date(emp.departure);
      
      if (today >= arrivalDate && today <= departureDate) {
        inCount++;
      } else {
        outCount++;
      }
    });

    return { inCount, outCount };
  };

  const { inCount, outCount } = getPOBCounts();
  const total = employees.length;

  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
      {/* Total Employees */}
      <div className="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-custom">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-dark-text-secondary mb-2">
              Total Employees
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-dark-text-primary">
              {total}
            </p>
          </div>
          <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shadow-custom">
            <Users className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* POB Status: IN */}
      <div className="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-custom">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-dark-text-secondary mb-2">
              POB Status: IN
            </p>
            <p className="text-3xl font-bold text-green-600 dark:text-dark-accent-green">
              {inCount}
            </p>
          </div>
          <div className="w-12 h-12 gradient-success rounded-xl flex items-center justify-center shadow-custom">
            <Users className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* POB Status: OUT */}
      <div className="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-custom">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-dark-text-secondary mb-2">
              POB Status: OUT
            </p>
            <p className="text-3xl font-bold text-red-600 dark:text-dark-accent-red">
              {outCount}
            </p>
          </div>
          <div className="w-12 h-12 gradient-danger rounded-xl flex items-center justify-center shadow-custom">
            <Users className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
