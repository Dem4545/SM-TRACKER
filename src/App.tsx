import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { BOCDashboard } from './components/BOCDashboard';
import { VRFDashboard } from './components/VRFDashboard';
import { EmployeeDashboard } from './components/EmployeeDashboard';
import { AirportDashboard } from './components/AirportDashboard';
import { TabNavigation } from './components/TabNavigation';
import { NotificationPanel } from './components/notifications';
import { BOC, Employee, VRF } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { generateId } from './utils';

export function App() {
  const [activeTab, setActiveTab] = useLocalStorage<'employees' | 'airport' | 'boc' | 'vrf'>('activeTab', 'employees');
  const [bocs, setBocs] = useLocalStorage<BOC[]>('bocs', []);
  const [vrfs, setVRFs] = useLocalStorage<VRF[]>('vrfs', []);
  const [employees, setEmployees] = useLocalStorage<Employee[]>('employees', []);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);

  const handleDataRestore = (data: { employees: Employee[], bocs: BOC[], vrfs: VRF[] }) => {
    setEmployees(data.employees);
    setBocs(data.bocs);
    setVRFs(data.vrfs);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 dark:from-dark-background dark:to-dark-card">
      <Header
        employees={employees}
        bocs={bocs}
        vrfs={vrfs}
        onRestore={handleDataRestore}
        onNotificationClick={() => setIsNotificationPanelOpen(true)}
      />

      <main className="max-w-[95%] xl:max-w-[90%] 2xl:max-w-[85%] mx-auto px-6 py-8">
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="mt-8">
          {activeTab === 'boc' ? (
            <BOCDashboard
              bocs={bocs}
              employees={employees}
              onAddBOC={(bocData) => setBocs(prev => [...prev, { ...bocData, id: generateId() }])}
              onEditBOC={(boc) => setBocs(prev => prev.map(b => b.id === boc.id ? boc : b))}
            />
          ) : activeTab === 'vrf' ? (
            <VRFDashboard
              vrfs={vrfs}
              employees={employees}
              onAddVRF={(vrfData) => setVRFs(prev => [...prev, { ...vrfData, id: generateId() }])}
              onEditVRF={(vrf) => setVRFs(prev => prev.map(v => v.id === vrf.id ? vrf : v))}
            />
          ) : activeTab === 'airport' ? (
            <AirportDashboard employees={employees} />
          ) : (
            <EmployeeDashboard
              employees={employees}
              bocs={bocs}
              vrfs={vrfs}
              onAddEmployee={(employeeData) => setEmployees(prev => [...prev, { ...employeeData, id: generateId() }])}
              onEditEmployee={(employee) => setEmployees(prev => prev.map(e => e.id === employee.id ? employee : e))}
              onDeleteEmployee={(id) => setEmployees(prev => prev.filter(e => e.id !== id))}
            />
          )}
        </div>
      </main>

      {isNotificationPanelOpen && (
        <NotificationPanel
          bocs={bocs}
          vrfs={vrfs}
          onClose={() => setIsNotificationPanelOpen(false)}
        />
      )}
    </div>
  );
}
