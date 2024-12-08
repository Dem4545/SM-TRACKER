import React from 'react';
import { X, AlertCircle } from 'lucide-react';
import { BOC, VRF } from '../../types';

interface NotificationPanelProps {
  bocs: BOC[];
  vrfs: VRF[];
  onClose: () => void;
}

export function NotificationPanel({ bocs, vrfs, onClose }: NotificationPanelProps) {
  const expiringBOCs = bocs.filter(boc => boc.bocExpiryDays <= 7 && boc.bocExpiryDays > 0);
  const expiringVRFs = vrfs.filter(vrf => vrf.vrfExpiryDays <= 7 && vrf.vrfExpiryDays > 0);

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-start justify-end p-4 z-50">
      <div className="w-96 bg-white dark:bg-dark-card rounded-xl shadow-custom-lg mr-4 mt-20">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-dark-border">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-text-primary">Notifications</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 dark:text-dark-text-secondary dark:hover:text-dark-text-primary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 max-h-[80vh] overflow-y-auto">
          {expiringBOCs.length === 0 && expiringVRFs.length === 0 ? (
            <p className="text-gray-500 dark:text-dark-text-secondary text-center py-4">No notifications</p>
          ) : (
            <div className="space-y-4">
              {expiringBOCs.map(boc => (
                <div key={boc.id} className="flex items-start space-x-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-800 dark:text-red-300">
                      BOC {boc.bocNumber} is expiring
                    </p>
                    <p className="text-sm text-red-600 dark:text-red-400">
                      Expires in {boc.bocExpiryDays} days
                    </p>
                  </div>
                </div>
              ))}

              {expiringVRFs.map(vrf => (
                <div key={vrf.id} className="flex items-start space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-500 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                      VRF {vrf.vrfNumber} is expiring
                    </p>
                    <p className="text-sm text-yellow-600 dark:text-yellow-400">
                      Expires in {vrf.vrfExpiryDays} days
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
