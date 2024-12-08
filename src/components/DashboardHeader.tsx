import React from 'react';
import { Plus, FileDown, FileUp, Filter } from 'lucide-react';
import { SearchInput } from './SearchInput';

interface DashboardHeaderProps {
  employeeCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onImportClick: () => void;
  onExportClick: () => void;
  onFilterClick: () => void;
  onAddClick: () => void;
}

export function DashboardHeader({
  employeeCount,
  searchQuery,
  onSearchChange,
  onImportClick,
  onExportClick,
  onFilterClick,
  onAddClick,
}: DashboardHeaderProps) {
  return (
    <div className="px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Employee Records ({employeeCount})
        </h2>
        <div className="flex space-x-4">
          <SearchInput
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Search employees..."
          />
          <button
            onClick={onFilterClick}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Filter className="w-5 h-5 mr-2" />
            Filter
          </button>
          <button
            onClick={onImportClick}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
          >
            <FileUp className="w-5 h-5 mr-2" />
            Import Excel
          </button>
          <button
            onClick={onExportClick}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
          >
            <FileDown className="w-5 h-5 mr-2" />
            Export Excel
          </button>
          <button
            onClick={onAddClick}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Employee
          </button>
        </div>
      </div>
    </div>
  );
}
