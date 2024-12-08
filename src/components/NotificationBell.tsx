import React from 'react';
import { Bell } from 'lucide-react';
import { BOC, VRF } from '../types';

interface NotificationBellProps {
  bocs: BOC[];
  vrfs: VRF[];
  onClick: () => void;
}

export function NotificationBell({ bocs, vrfs, onClick }: NotificationBellProps) {
  const getExpiringCount = () => {
    const expiringBOCs = bocs.filter(boc => boc.bocExpiryDays <= 7 && boc.bocExpiryDays > 0);
    const expiringVRFs = vrfs.filter(vrf => vrf.vrfExpiryDays <= 7 && vrf.vrfExpiryDays > 0);
    return expiringBOCs.length + expiringVRFs.length;
  };

  const count = getExpiringCount();

  return (
    <button
      onClick={onClick}
      className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
    >
      <Bell className="w-6 h-6 text-gray-600" />
      {count > 0 && (
        <span className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}
