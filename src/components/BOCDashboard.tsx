import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { BOC, Employee } from '../types';
import { BOCForm } from './BOCForm';
import { ExcelButtons } from './ExcelButtons';
import * as XLSX from 'xlsx';

interface BOCDashboardProps {
  bocs: BOC[];
  employees?: Employee[];
  onAddBOC: (bocData: Omit<BOC, 'id' | 'bocExpiryDays' | 'status'>) => void;
  onEditBOC: (boc: BOC) => void;
}

export function BOCDashboard({ 
  bocs,
  employees,
  onAddBOC,
  onEditBOC,
}: BOCDashboardProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBOC, setEditingBOC] = useState<BOC | undefined>();

  const handleSubmit = (bocData: Omit<BOC, 'id' | 'bocExpiryDays' | 'status'>) => {
    if (editingBOC) {
      onEditBOC({ ...bocData, id: editingBOC.id, bocExpiryDays: editingBOC.bocExpiryDays, status: editingBOC.status });
    } else {
      onAddBOC(bocData);
    }
    setIsFormOpen(false);
    setEditingBOC(undefined);
  };

  const handleExport = () => {
    const exportData = bocs.map(boc => ({
      'BOC Number': boc.bocNumber,
      'Issue Date': new Date(boc.bocIssued).toLocaleDateString(),
      'Expiry Date': new Date(boc.bocExpiry).toLocaleDateString(),
      'Days Until Expiry': boc.bocExpiryDays,
      'Status': boc.status,
      'Comments': boc.comments || '-'
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);
    XLSX.utils.book_append_sheet(wb, ws, 'BOCs');
    XLSX.writeFile(wb, 'boc-records.xlsx');
  };

  const handleImport = (data: any[]) => {
    data.forEach(row => {
      const bocData = {
        bocNumber: row['BOC Number'],
        bocIssued: new Date(row['Issue Date']).toISOString(),
        bocExpiry: new Date(row['Expiry Date']).toISOString(),
        comments: row['Comments'] !== '-' ? row['Comments'] : ''
      };
      onAddBOC(bocData);
    });
  };

  return (
    <div className="bg-white dark:bg-dark-card rounded-lg shadow-custom overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-border flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-text-primary">BOC Records</h2>
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
            Add BOC Record
          </button>
        </div>
      </div>

      {/* BOC Table would go here */}

      {isFormOpen && (
        <BOCForm
          boc={editingBOC}
          onSubmit={handleSubmit}
          onClose={() => {
            setIsFormOpen(false);
            setEditingBOC(undefined);
          }}
          employees={employees}
        />
      )}
    </div>
  );
}
