import React from 'react';
import { Users, FileText, Key, Plane } from 'lucide-react';

interface TabNavigationProps {
  activeTab: 'employees' | 'airport' | 'boc' | 'vrf';
  onTabChange: (tab: 'employees' | 'airport' | 'boc' | 'vrf') => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="glass rounded-xl p-1 shadow-custom inline-flex">
      <button
        onClick={() => onTabChange('employees')}
        className={`
          flex items-center px-6 py-3 rounded-lg font-medium text-sm transition-all
          ${activeTab === 'employees'
            ? 'gradient-primary text-white shadow-custom'
            : 'text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-dark-text-primary hover:bg-white/50 dark:hover:bg-dark-border/50'
          }
        `}
      >
        <Users className="w-5 h-5 mr-2" />
        Employees
      </button>

      <button
        onClick={() => onTabChange('airport')}
        className={`
          flex items-center px-6 py-3 rounded-lg font-medium text-sm transition-all
          ${activeTab === 'airport'
            ? 'gradient-primary text-white shadow-custom'
            : 'text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-dark-text-primary hover:bg-white/50 dark:hover:bg-dark-border/50'
          }
        `}
      >
        <Plane className="w-5 h-5 mr-2" />
        Airport
      </button>

      <button
        onClick={() => onTabChange('boc')}
        className={`
          flex items-center px-6 py-3 rounded-lg font-medium text-sm transition-all
          ${activeTab === 'boc'
            ? 'gradient-primary text-white shadow-custom'
            : 'text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-dark-text-primary hover:bg-white/50 dark:hover:bg-dark-border/50'
          }
        `}
      >
        <FileText className="w-5 h-5 mr-2" />
        BOC Management
      </button>

      <button
        onClick={() => onTabChange('vrf')}
        className={`
          flex items-center px-6 py-3 rounded-lg font-medium text-sm transition-all
          ${activeTab === 'vrf'
            ? 'gradient-primary text-white shadow-custom'
            : 'text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-dark-text-primary hover:bg-white/50 dark:hover:bg-dark-border/50'
          }
        `}
      >
        <Key className="w-5 h-5 mr-2" />
        VRF Management
      </button>
    </div>
  );
}
