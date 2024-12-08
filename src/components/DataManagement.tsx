import React, { useRef } from 'react';
import { Save, Upload } from 'lucide-react';
import { BOC, Employee, VRF } from '../types';

interface DataManagementProps {
  employees: Employee[];
  bocs: BOC[];
  vrfs: VRF[];
  onRestore: (data: { employees: Employee[], bocs: BOC[], vrfs: VRF[] }) => void;
}

export function DataManagement({ employees, bocs, vrfs, onRestore }: DataManagementProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    const data = {
      employees,
      bocs,
      vrfs,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'security-department-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        onRestore(data);
      } catch (error) {
        console.error('Error parsing backup file:', error);
        alert('Invalid backup file format');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleSave}
        className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
        title="Save data backup"
      >
        <Save className="w-5 h-5" />
      </button>
      <button
        onClick={handleUpload}
        className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
        title="Restore data from backup"
      >
        <Upload className="w-5 h-5" />
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        className="hidden"
      />
    </div>
  );
}
