import React, { useState, useEffect } from 'react';
import { Employee, BOC, VRF } from '../types';
import { X } from 'lucide-react';

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

  const availableBOCs = bocs.filter(boc => 
    boc.status !== 'Expired' && 
    (boc.status === 'Available' || boc.bocNumber === employee?.bocNumber)
  );

  const availableVRFs = vrfs.filter(vrf => 
    vrf.status !== 'Expired' && 
    (vrf.status === 'Available' || vrf.vrfNumber === employee?.vrfNumber)
  );

  const calculatePOB = (arrival: string, departure: string) => {
    if (!arrival || !departure) return '';
    
    const today = new Date();
    const arrivalDate = new Date(arrival);
    const departureDate = new Date(departure);
    
    if (today >= arrivalDate && today <= departureDate) {
      return 'IN';
    }
    return 'OUT';
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
            <div>
              <label className="block text-sm font-medium text-gray-700">No.</label>
              <input
                type="number"
                name="no"
                value={formData.no}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Nationality</label>
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Passport Number</label>
              <input
                type="text"
                name="passportNumber"
                value={formData.passportNumber}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Position</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Arrival Date</label>
              <input
                type="date"
                name="arrival"
                value={formData.arrival}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Departure Date</label>
              <input
                type="date"
                name="departure"
                value={formData.departure}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">POB Status</label>
              <div className={`mt-1 px-3 py-2 rounded-md border ${
                calculatePOB(formData.arrival, formData.departure) === 'IN' 
                  ? 'bg-green-100 text-green-800 border-green-200'
                  : 'bg-red-100 text-red-800 border-red-200'
              }`}>
                {calculatePOB(formData.arrival, formData.departure) || 'Not Set'}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">BOC Number</label>
              <select
                name="bocNumber"
                value={formData.bocNumber}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              >
                <option value="">Select BOC Number</option>
                {availableBOCs.map(boc => (
                  <option key={boc.id} value={boc.bocNumber}>
                    {boc.bocNumber}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">BOC Expiry</label>
              <input
                type="text"
                value={formData.bocExpiry ? new Date(formData.bocExpiry).toLocaleDateString() : ''}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">BOC Expiry Days</label>
              <input
                type="text"
                value={formData.bocExpiryDays ? `${formData.bocExpiryDays} days` : ''}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Badge Number</label>
              <input
                type="text"
                name="badge"
                value={formData.badge}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">VRF Number</label>
              <select
                name="vrfNumber"
                value={formData.vrfNumber}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                  formData.badge ? 'bg-gray-100' : ''
                }`}
                disabled={Boolean(formData.badge)}
                required={!formData.badge}
              >
                <option value="">Select VRF Number</option>
                {availableVRFs.map(vrf => (
                  <option key={vrf.id} value={vrf.vrfNumber}>
                    {vrf.vrfNumber}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">VRF Expiry</label>
              <input
                type="text"
                value={formData.vrfExpiry && !formData.badge ? new Date(formData.vrfExpiry).toLocaleDateString() : ''}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Mobile Phone</label>
              <input
                type="tel"
                name="mobilePhone"
                value={formData.mobilePhone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Blood Type</label>
              <select
                name="bloodType"
                value={formData.bloodType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              >
                <option value="">Select Blood Type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
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
