import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Employee, BOC, VRF } from '../../types';
import { PersonalInfoFields } from './PersonalInfoFields';
import { DateFields } from './DateFields';
import { DocumentFields } from './DocumentFields';
import { ContactFields } from './ContactFields';

interface EmployeeFormProps {
  employee?: Employee;
  bocs: BOC[];
  vrfs: VRF[];
  onSubmit: (employeeData: Omit<Employee, 'id'>) => void;
  onCancel: () => void;
}

export function EmployeeForm({ 
  employee, 
  bocs = [], 
  vrfs = [], 
  onSubmit, 
  onCancel 
}: EmployeeFormProps) {
  const [formData, setFormData] = useState<Omit<Employee, 'id'>>({
    no: employee?.no || 0,
    firstName: employee?.firstName || '',
    lastName: employee?.lastName || '',
    nationality: employee?.nationality || '',
    passportNumber: employee?.passportNumber || '',
    position: employee?.position || '',
    arrival: employee?.arrival || '',
    departure: employee?.departure || '',
    bocNumber: employee?.bocNumber || '',
    bocExpiry: employee?.bocExpiry || '',
    bocExpiryDays: employee?.bocExpiryDays || 0,
    badge: employee?.badge || '',
    vrfNumber: employee?.vrfNumber || '',
    vrfExpiry: employee?.vrfExpiry || '',
    vrfExpiryDays: employee?.vrfExpiryDays || 0,
    email: employee?.email || '',
    mobilePhone: employee?.mobilePhone || '',
    bloodType: employee?.bloodType || '',
    note: employee?.note || ''
  });

  useEffect(() => {
    if (formData.bocNumber) {
      const selectedBOC = bocs.find(boc => boc.bocNumber === formData.bocNumber);
      if (selectedBOC) {
        setFormData(prev => ({
          ...prev,
          bocExpiry: selectedBOC.bocExpiry,
          bocExpiryDays: selectedBOC.bocExpiryDays
        }));
      }
    }
  }, [formData.bocNumber, bocs]);

  useEffect(() => {
    if (formData.vrfNumber && !formData.badge) {
      const selectedVRF = vrfs.find(vrf => vrf.vrfNumber === formData.vrfNumber);
      if (selectedVRF) {
        setFormData(prev => ({
          ...prev,
          vrfExpiry: selectedVRF.vrfExpiry,
          vrfExpiryDays: selectedVRF.vrfExpiryDays
        }));
      }
    }
  }, [formData.vrfNumber, vrfs, formData.badge]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'no' ? parseInt(value) || 0 : value,
      ...(name === 'badge' && value ? {
        vrfNumber: '',
        vrfExpiry: '',
        vrfExpiryDays: 0
      } : {})
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">
            {employee ? 'Edit Employee' : 'Add New Employee'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <PersonalInfoFields formData={formData} handleChange={handleChange} />
            <DateFields formData={formData} handleChange={handleChange} />
            <DocumentFields 
              formData={formData} 
              handleChange={handleChange} 
              bocs={bocs} 
              vrfs={vrfs} 
              employee={employee} 
            />
            <ContactFields formData={formData} handleChange={handleChange} />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              {employee ? 'Update' : 'Add'} Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
