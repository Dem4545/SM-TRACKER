import React, { useRef } from 'react';
import { FileDown, FileUp } from 'lucide-react';

interface ExcelButtonsProps {
  onImport: (data: any[]) => void;
  onExport: () => void;
  className?: string;
}

export function ExcelButtons({ onImport, onExport, className = '' }: ExcelButtonsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        onImport(data);
      } catch (error) {
        console.error('Error parsing file:', error);
        alert('Invalid file format');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      <button
        onClick={handleImportClick}
        className="inline-flex items-center px-4 py-2 bg-indigo-600 dark:bg-dark-accent-blue text-white text-sm font-medium rounded-md hover:bg-indigo-700 dark:hover:bg-blue-700"
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
        onClick={onExport}
        className="inline-flex items-center px-4 py-2 bg-indigo-600 dark:bg-dark-accent-blue text-white text-sm font-medium rounded-md hover:bg-indigo-700 dark:hover:bg-blue-700"
      >
        <FileDown className="w-4 h-4 mr-2" />
        Export Excel
      </button>
    </div>
  );
}
