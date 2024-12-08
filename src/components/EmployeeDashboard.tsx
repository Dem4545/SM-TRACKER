import React, { useState, useRef } from 'react';
import { ChevronUp, ChevronDown, AlertCircle, Plus, Filter, FileDown, FileUp } from 'lucide-react';
import { BOC, Employee, VRF, SortConfig } from '../types';
import { EmployeeTable } from './EmployeeTable';
import { EmployeeForm } from './EmployeeForm';
import { FilterModal } from './FilterModal';
import { SearchInput } from './SearchInput';
import { POBWidget } from './POBWidget';
import * as XLSX from 'xlsx';
import { generateId } from '../utils';

interface Filters {
  nationality: string;
  position: string;
  pobStatus: 'All' | 'IN' | 'OUT';
  bocExpiryRange: 'All' | '≤7' | '7-14' | '15-30' | '>30';
  vrfExpiryRange: 'All' | '≤7' | '7-14' | '15-30';
  bloodType: 'All' | 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
}

interface EmployeeDashboardProps {
  employees: Employee[];
  bocs: BOC[];
  vrfs: VRF[];
  onAddEmployee: (employee: Omit<Employee, 'id'>) => void;
  onEditEmployee: (employee: Employee) => void;
  onDeleteEmployee: (id: string) => void;
}

export function EmployeeDashboard({ 
  employees, 
  bocs,
  vrfs,
  onAddEmployee,
  onEditEmployee,
  onDeleteEmployee
}: EmployeeDashboardProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({
    nationality: '',
    position: '',
    pobStatus: 'All',
    bocExpiryRange: 'All',
    vrfExpiryRange: 'All',
    bloodType: 'All'
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'lastName',
    direction: 'asc'
  });

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSubmit = (employeeData: Omit<Employee, 'id'>) => {
    if (editingEmployee) {
      onEditEmployee({ ...employeeData, id: editingEmployee.id });
    } else {
      onAddEmployee(employeeData);
    }
    setIsFormOpen(false);
    setEditingEmployee(undefined);
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      onDeleteEmployee(id);
    }
  };

  const exportToExcel = () => {
    const exportData = filteredEmployees.map((emp, index) => ({
      'No#': index + 1,
      'Name': `${emp.firstName} ${emp.lastName}`,
      'Nationality': emp.nationality,
      'Passport Number': emp.passportNumber,
      'Position': emp.position,
      'Arrival': formatDate(emp.arrival),
      'Departure': formatDate(emp.departure),
      'POB': getPOBStatus(emp.arrival, emp.departure),
      'BOC Number': emp.bocNumber,
      'BOC Expiry': formatDate(emp.bocExpiry),
      'BOC Days': emp.bocExpiryDays,
      'Badge': emp.badge || '-',
      'VRF Number': emp.badge ? '-' : emp.vrfNumber,
      'VRF Expiry': emp.badge ? '-' : formatDate(emp.vrfExpiry),
      'VRF Days': emp.badge ? '-' : emp.vrfExpiryDays,
      'Note': emp.note || '-'
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);
    XLSX.utils.book_append_sheet(wb, ws, 'Employees');
    XLSX.writeFile(wb, 'employees.xlsx');
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      jsonData.forEach((row: any) => {
        const [firstName, lastName] = (row['Name'] || '').split(' ');
        const existingEmployee = employees.find(emp => 
          emp.firstName.toLowerCase() === firstName?.toLowerCase() && 
          emp.lastName.toLowerCase() === lastName?.toLowerCase()
        );

        if (!existingEmployee) {
          const newEmployee: Omit<Employee, 'id'> = {
            no: employees.length + 1,
            firstName: firstName || '',
            lastName: lastName || '',
            nationality: row['Nationality'] || '',
            passportNumber: row['Passport Number'] || '',
            position: row['Position'] || '',
            arrival: formatExcelDate(row['Arrival']),
            departure: formatExcelDate(row['Departure']),
            bocNumber: row['BOC Number'] || '',
            bocExpiry: '',
            bocExpiryDays: 0,
            badge: row['Badge'] || '',
            vrfNumber: row['VRF Number'] || '',
            vrfExpiry: '',
            vrfExpiryDays: 0,
            email: '',
            mobilePhone: '',
            bloodType: '',
            note: row['Note'] || ''
          };

          onAddEmployee(newEmployee);
        }
      });
    };
    reader.readAsBinaryString(file);
    event.target.value = '';
  };

  const formatDate = (date: string) => {
    return date ? new Date(date).toLocaleDateString() : '-';
  };

  const formatExcelDate = (date: string | number) => {
    if (!date) return '';
    if (typeof date === 'number') {
      const jsDate = new Date(Math.round((date - 25569) * 86400 * 1000));
      return jsDate.toISOString().split('T')[0];
    }
    return date;
  };

  const getPOBStatus = (arrival: string, departure: string) => {
    const today = new Date();
    const arrivalDate = new Date(arrival);
    const departureDate = new Date(departure);
    return today >= arrivalDate && today <= departureDate ? 'IN' : 'OUT';
  };

  const filterEmployees = (employees: Employee[]) => {
    return employees.filter(emp => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
      const matchesSearch = fullName.includes(searchLower) ||
                          emp.nationality.toLowerCase().includes(searchLower) ||
                          emp.passportNumber.toLowerCase().includes(searchLower) ||
                          emp.position.toLowerCase().includes(searchLower) ||
                          emp.bocNumber.toLowerCase().includes(searchLower) ||
                          emp.vrfNumber.toLowerCase().includes(searchLower);

      if (!matchesSearch) return false;

      // Nationality filter
      if (filters.nationality && !emp.nationality.toLowerCase().includes(filters.nationality.toLowerCase())) {
        return false;
      }

      // Position filter
      if (filters.position && !emp.position.toLowerCase().includes(filters.position.toLowerCase())) {
        return false;
      }

      // POB Status filter
      if (filters.pobStatus !== 'All') {
        const pobStatus = getPOBStatus(emp.arrival, emp.departure);
        if (pobStatus !== filters.pobStatus) {
          return false;
        }
      }

      // BOC Expiry Range filter
      if (filters.bocExpiryRange !== 'All') {
        const days = emp.bocExpiryDays;
        switch (filters.bocExpiryRange) {
          case '≤7':
            if (days > 7) return false;
            break;
          case '7-14':
            if (days <= 7 || days > 14) return false;
            break;
          case '15-30':
            if (days <= 14 || days > 30) return false;
            break;
          case '>30':
            if (days <= 30) return false;
            break;
        }
      }

      // VRF Expiry Range filter
      if (filters.vrfExpiryRange !== 'All' && !emp.badge) {
        const days = emp.vrfExpiryDays;
        switch (filters.vrfExpiryRange) {
          case '≤7':
            if (days > 7) return false;
            break;
          case '7-14':
            if (days <= 7 || days > 14) return false;
            break;
          case '15-30':
            if (days <= 14 || days > 30) return false;
            break;
        }
      }

      // Blood Type filter
      if (filters.bloodType !== 'All' && emp.bloodType !== filters.bloodType) {
        return false;
      }

      return true;
    });
  };

  const handleApplyFilters = (newFilters: Filters) => {
    setFilters(newFilters);
    setIsFilterOpen(false);
  };

  const filteredEmployees = filterEmployees(employees);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <POBWidget employees={employees} />

        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
            <button
              onClick={handleImportClick}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700"
            >
              <FileUp className="w-4 h-4 mr-2" />
              Import Excel
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".xlsx, .xls"
              className="hidden"
            />
            <button
              onClick={exportToExcel}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700"
            >
              <FileDown className="w-4 h-4 mr-2" />
              Export Excel
            </button>
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Employee
            </button>
          </div>

          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search employees..."
          />
        </div>

        <div className="mt-6">
          <EmployeeTable
            employees={filteredEmployees}
            sortConfig={sortConfig}
            onSort={handleSort}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {isFormOpen && (
        <EmployeeForm
          employee={editingEmployee}
          bocs={bocs}
          vrfs={vrfs}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingEmployee(undefined);
          }}
        />
      )}

      {isFilterOpen && (
        <FilterModal
          filters={filters}
          onApplyFilters={handleApplyFilters}
          onClose={() => setIsFilterOpen(false)}
        />
      )}
    </div>
  );
}
