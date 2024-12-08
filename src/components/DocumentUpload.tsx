import React, { useState } from 'react';
import { Upload, X, File, Download } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadDate: string;
}

interface DocumentUploadProps {
  documentType: 'passport' | 'boc' | 'vrf';
  documents: Document[];
  onUpload: (file: File) => void;
  onDelete: (documentId: string) => void;
}

export function DocumentUpload({ 
  documentType, 
  documents, 
  onUpload, 
  onDelete 
}: DocumentUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    const validFiles = files.filter(file => allowedTypes.includes(file.type));
    
    if (validFiles.length !== files.length) {
      alert('Only PDF, JPEG, and PNG files are allowed');
    }

    validFiles.forEach(file => onUpload(file));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFiles(files);
    }
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-6 text-center
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
        `}
      >
        <input
          type="file"
          id={`file-upload-${documentType}`}
          className="hidden"
          onChange={handleFileSelect}
          accept=".pdf,.jpg,.jpeg,.png"
          multiple
        />
        <label
          htmlFor={`file-upload-${documentType}`}
          className="cursor-pointer"
        >
          <Upload className="w-8 h-8 mx-auto text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Drag and drop files here, or click to select
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Supports PDF, JPEG, PNG (max 10MB)
          </p>
        </label>
      </div>

      {documents.length > 0 && (
        <div className="space-y-2">
          {documents.map(doc => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <File className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                  <p className="text-xs text-gray-500">
                    Uploaded on {new Date(doc.uploadDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <a
                  href={doc.url}
                  download
                  className="p-1 text-blue-600 hover:text-blue-800"
                  title="Download"
                >
                  <Download className="w-4 h-4" />
                </a>
                <button
                  onClick={() => onDelete(doc.id)}
                  className="p-1 text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
