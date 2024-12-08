import React from 'react';
import { ThemeToggle } from '../theme/ThemeToggle';
import { DataManagement } from '../data/DataManagement';
import { NotificationBell } from '../notifications/NotificationBell';
import { BOC, Employee, VRF } from '../../types';

interface HeaderProps {
  employees: Employee[];
  bocs: BOC[];
  vrfs: VRF[];
  onRestore: (data: { employees: Employee[], bocs: BOC[], vrfs: VRF[] }) => void;
  onNotificationClick: () => void;
}

export function Header({
  employees,
  bocs,
  vrfs,
  onRestore,
  onNotificationClick
}: HeaderProps) {
  return (
    <header className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-lg shadow-custom sticky top-0 z-30">
      <div className="max-w-[95%] xl:max-w-[90%] 2xl:max-w-[85%] mx-auto px-6 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-dark-accent-blue dark:to-blue-700 bg-clip-text text-transparent">
          SICIM Security Department
        </h1>
        <div className="flex items-center gap-6">
          <ThemeToggle />
          <DataManagement
            employees={employees}
            bocs={bocs}
            vrfs={vrfs}
            onRestore={onRestore}
          />
          <NotificationBell
            bocs={bocs}
            vrfs={vrfs}
            onClick={onNotificationClick}
          />
        </div>
      </div>
    </header>
  );
}
