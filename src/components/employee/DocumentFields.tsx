import React from 'react';
import { BOC, VRF } from '../../types';

interface DocumentFieldsProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  bocs: BOC[];
  vrfs: VRF[];
  employee?: { bocNumber?: string; vrfNumber?: string; };
}

export function DocumentFields({ formData, handleChange, bocs, vrfs, employee }: DocumentFieldsProps) {
  const availableBOCs = bocs.filter(boc => 
    boc.status !== 'Expired' && 
    (boc.status === 'Available' || boc.bocNumber === employee?.bocNumber)
  );

  const availableVRFs = vrfs.filter(vrf => 
    vrf.status !== 'Expired' && 
    (vrf.status === 'Available' || vrf.vrfNumber === employee?.vrfNumber)
  );

  return (
    <>
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
    </>
  );
}
