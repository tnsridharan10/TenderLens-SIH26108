import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar, NavItem } from './components/layout/Sidebar';
import { ArchitectureModal } from './components/layout/ArchitectureModal';
import { DashboardView } from './components/dashboard/DashboardView';
import { NewTenderAnalysisView } from './components/analysis/NewTenderAnalysisView';
import { ProcessingModal } from './components/analysis/ProcessingModal';
import { ResultsView } from './components/results/ResultsView';
import { ComplianceGapView } from './components/gap-analysis/ComplianceGapView';
import { StandardsExplorerView } from './components/explorer/StandardsExplorerView';
import { AmendmentAlertsView } from './components/amendments/AmendmentAlertsView';
import { ComplianceReportView } from './components/report/ComplianceReportView';
import { AuditTrailView } from './components/audit/AuditTrailView';
import { MyTendersView } from './components/tenders/MyTendersView';
import { SettingsArchitectureView } from './components/settings/SettingsArchitectureView';
import { HelpSupportView } from './components/help/HelpSupportView';

import { MOCK_TENDERS, MOCK_AMENDMENT_ALERTS, MOCK_AUDIT_TRAIL } from './data/mockData';
import { Tender } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<NavItem>('dashboard');
  const [tenders, setTenders] = useState<Tender[]>(MOCK_TENDERS);
  const [activeTenderId, setActiveTenderId] = useState<string>(MOCK_TENDERS[0].id);
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('Public Works Department (PWD)');

  // Get active tender object
  const activeTender = tenders.find((t) => t.id === activeTenderId) || tenders[0];

  // Callback when a new file upload analysis finishes
  const handleAnalysisComplete = (newTender: Tender) => {
    setTenders([newTender, ...tenders]);
    setActiveTenderId(newTender.id);
    setIsProcessingModalOpen(false);
    setActiveTab('analysis-results');
  };

  // Callback when officer updates tender (verifying standard or gap)
  const handleUpdateTender = (updatedTender: Tender) => {
    setTenders(tenders.map(t => t.id === updatedTender.id ? updatedTender : t));
  };

  // Select tender and navigate to results
  const handleSelectTender = (tender: Tender) => {
    setActiveTenderId(tender.id);
    setActiveTab('analysis-results');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 selection:bg-teal-500 selection:text-white">
      {/* Top Header Bar */}
      <Header
        selectedDepartment={selectedDepartment}
        onSelectDepartment={setSelectedDepartment}
        onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          amendmentCount={MOCK_AMENDMENT_ALERTS.length}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto pb-12">
          {activeTab === 'dashboard' && (
            <DashboardView
              tenders={tenders}
              amendments={MOCK_AMENDMENT_ALERTS}
              onNavigate={setActiveTab}
              onSelectTender={handleSelectTender}
            />
          )}

          {activeTab === 'new-analysis' && (
            <NewTenderAnalysisView
              currentDepartment={selectedDepartment as any}
              onAnalysisStart={handleAnalysisComplete}
            />
          )}

          {activeTab === 'analysis-results' && (
            <ResultsView
              tender={activeTender}
              onNavigate={setActiveTab}
              onUpdateTender={handleUpdateTender}
            />
          )}

          {activeTab === 'compliance-gap' && (
            <ComplianceGapView
              tender={activeTender}
              onUpdateTender={handleUpdateTender}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'standards-explorer' && (
            <StandardsExplorerView />
          )}

          {activeTab === 'amendment-alerts' && (
            <AmendmentAlertsView
              amendments={MOCK_AMENDMENT_ALERTS}
              tenders={tenders}
              onNavigateToTender={handleSelectTender}
            />
          )}

          {activeTab === 'compliance-reports' && (
            <ComplianceReportView tender={activeTender} />
          )}

          {activeTab === 'audit-trail' && (
            <AuditTrailView />
          )}

          {activeTab === 'my-tenders' && (
            <MyTendersView
              tenders={tenders}
              onSelectTender={handleSelectTender}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsArchitectureView
              onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
            />
          )}

          {activeTab === 'help' && (
            <HelpSupportView />
          )}
        </main>
      </div>

      {/* 7-Step AI Analysis Processing Modal */}
      <ProcessingModal
        isOpen={isProcessingModalOpen}
        onComplete={handleAnalysisComplete}
      />

      {/* Architecture & Backend Stack Blueprint Modal */}
      <ArchitectureModal
        isOpen={isArchitectureModalOpen}
        onClose={() => setIsArchitectureModalOpen(false)}
      />
    </div>
  );
}

export default App;
