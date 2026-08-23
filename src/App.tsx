import React, { useState } from 'react';
import { Header } from './components/Header';
import { DecisionWizard } from './components/Wizard/DecisionWizard';
import { BlueprintCanvas } from './components/Blueprint/BlueprintCanvas';
import { ParadigmMatrix } from './components/Matrix/ParadigmMatrix';
import { ContractBuilder } from './components/DataProduct/ContractBuilder';
import { KnowledgeBase } from './components/Reference/KnowledgeBase';
import { ExecutiveReportModal } from './components/Export/ExecutiveReportModal';
import { RecommendationResult } from './types/architecture';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('wizard');
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [computedRecommendation, setComputedRecommendation] = useState<RecommendationResult | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({
    topology: 'decentralized-domains',
    velocity: 'microbatch-minutes',
    volume: 'petabyte-scale',
    compliance: 'federated-policy',
    ai: 'genai-rag-heavy',
    team: 'python-dbt-sql',
    cloud: 'open-source-decoupled',
  });

  const handleRecommendationCalculated = (rec: RecommendationResult, answers: Record<string, string>) => {
    setComputedRecommendation(rec);
    setUserAnswers(answers);
  };

  return (
    <div className="min-h-screen flex flex-col bg-grid-pattern">
      {/* Top Sticky Header & Tab Nav */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenExport={() => setIsExportOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'wizard' && (
          <DecisionWizard
            onNavigateToBlueprint={() => setActiveTab('blueprint')}
            onRecommendationCalculated={handleRecommendationCalculated}
          />
        )}

        {activeTab === 'blueprint' && <BlueprintCanvas />}

        {activeTab === 'matrix' && <ParadigmMatrix />}

        {activeTab === 'contract' && <ContractBuilder />}

        {activeTab === 'reference' && <KnowledgeBase />}
      </main>

      {/* Executive Footer */}
      <footer className="border-t border-slate-800/80 glass-panel py-6 text-center text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            ArchitectIQ • Enterprise Data Architecture Decision Engine & Explorer
          </span>
          <div className="flex items-center space-x-4 text-slate-400">
            <button onClick={() => setActiveTab('wizard')} className="hover:text-cyan-400">Decision Engine</button>
            <span>•</span>
            <button onClick={() => setActiveTab('blueprint')} className="hover:text-cyan-400">Blueprint Canvas</button>
            <span>•</span>
            <button onClick={() => setActiveTab('matrix')} className="hover:text-cyan-400">Paradigm Matrix</button>
          </div>
        </div>
      </footer>

      {/* Download / Export Proposal Modal */}
      <ExecutiveReportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        recommendation={computedRecommendation}
        answers={userAnswers}
      />
    </div>
  );
}

export default App;
