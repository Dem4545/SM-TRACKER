import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { VRF, Employee } from '../types';
import { VRFForm } from './VRFForm';
import { ExcelButtons } from './ExcelButtons';
import * as XLSX from 'xlsx';

interface VRFDashboardProps {
  vrfs: VRF[];
  employees?: Employee[];
  onAddVRF: (vrfData: Omit<VRF, 'id' | 'vrfExpiryDays' | 'status'>) => void;
  onEditVRF: (vrf: VRF) => void;
}

export function VRFDashboard({ 
  vrfs,
  employees,
  onAddVRF,
  onEditVRF,
}: VRFDashboardProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVRF, setEditingVRF] = useState<VRF | undefined>();

  const handleSubmit = (vrfData: Omit<VRF, 'id' | 'vrfExpiryDays' | 'status'>) => {
    if (editingVRF) {
      onEditVRF({ ...vrfData, id: editingVRF.id, vrfExpiryDays: editingVRF.vrfExpiryDays, status: editingVRF.status });
    } else {
      onAddVRF(vrfData);
    }
    setIsFormOpen(false);
    setEditingVRF(undefined);
  };

  const handleExport = () => {
    const exportData = vrfs.map(vrf => ({
      'VRF Number': vrf.vrfNumber,
      'Issue Date': new Date(vrf.vrfIssued).toLocaleDateString(),
      'Expiry Date': new Date(vrf.vrfExpiry).toLocaleDateString(),
      'Days Until Expiry': vrf.vrfExpiryDays,
      'Access Level': vrf.access,
      'Status': vrf.status,
      'Comments': vrf.comments || '-'
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);
    XLSX.utils.book_append_sheet(wb, ws, 'VRFs');
    XLSX.writeFile(wb, 'vrf-records.xlsx');
  };

  const handleImport = (data: any[]) => {
    data.forEach(row => {
      const vrfData = {
        vrfNumber: row['VRF Number'],
        vrfIssued: new Date(row['Issue Date']).toISOString(),
        vrfExpiry: new Date(row['Expiry Date']).toISOString(),
        access: row['Access Level'],
        comments: row['Comments'] !== '-' ? row['Comments'] : ''
      };
      onAddVRF(vrfData);
    });
  };

  return (
    <div className="bg-white dark:bg-dark-card rounded-lg shadow-custom overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-text-primary">VRF Records</h2>
        <div className="flex items-center gap-4">
          <ExcelButtons
            onImport={handleImport}
            onExport={handleExport}
          />
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-dark-accent-blue dark:hover:bg-blue-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add VRF Record
          </button>
        </div>
      </div>

      {/* VRF Table would go here */}

      {isFormOpen && (
        <VRFForm
          vrf={editingVRF}
          onSubmit={handleSubmit}
          onClose={() => {
            setIsFormOpen(false);
            setEditingVRF(undefined);
          }}
          employees={employees}
        />
      )}
    </div>
  );
}
