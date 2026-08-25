import React, { useState } from 'react';
import { Header } from './components/Header';
import { DecisionWizard } from './components/Wizard/DecisionWizard';
import { BlueprintCanvas } from './components/Blueprint/BlueprintCanvas';
import { PipelineNodeCanvas } from './components/Canvas/PipelineNodeCanvas';
import { DomainTopologyModeler } from './components/Mesh/DomainTopologyModeler';
import { RagArchitectSandbox } from './components/Rag/RagArchitectSandbox';
import { PacelcSimulator } from './components/Pacelc/PacelcSimulator';
import { DisasterRecoverySimulator } from './components/DisasterRecovery/DisasterRecoverySimulator';
import { ZeroTrustSecuritySandbox } from './components/Security/ZeroTrustSecuritySandbox';
import { MigrationEstimator } from './components/Migration/MigrationEstimator';
import { ParadigmMatrix } from './components/Matrix/ParadigmMatrix';
import { RadarChart } from './components/Charts/RadarChart';
import { BenchmarkEngine } from './components/Benchmark/BenchmarkEngine';
import { FinOpsCalculator } from './components/FinOps/FinOpsCalculator';
import { DataQualitySandbox } from './components/DataQuality/DataQualitySandbox';
import { ContractBuilder } from './components/DataProduct/ContractBuilder';
import { KnowledgeBase } from './components/Reference/KnowledgeBase';
import { ExecutiveReportModal } from './components/Export/ExecutiveReportModal';
import { ExecutiveDeckMode } from './components/Executive/ExecutiveDeckMode';
import { RecommendationResult } from './types/architecture';
import { CloudVendor, CLOUD_MAPPINGS } from './data/cloudMapping';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('wizard');
  const [cloudVendor, setCloudVendor] = useState<CloudVendor>('aws');
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isDeckOpen, setIsDeckOpen] = useState<boolean>(false);
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

  const activeCloud = CLOUD_MAPPINGS[cloudVendor];

  return (
    <div className="min-h-screen flex flex-col bg-grid-pattern relative overflow-hidden">
      
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none animate-orb-1" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none animate-orb-2" />

      {/* Top Sticky Header & Tab Nav */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenDeck={() => setIsDeckOpen(true)}
        cloudVendor={cloudVendor}
        setCloudVendor={setCloudVendor}
      />

      {/* Cloud Context Notification Strip */}
      <div className="bg-slate-900/80 border-b border-slate-800 py-1.5 px-4 text-center text-xs z-10 flex items-center justify-center space-x-2">
        <span className="text-slate-400">Active Cloud Vendor Context:</span>
        <span className="font-bold font-mono text-cyan-300" style={{ color: activeCloud.badgeColor }}>
          {activeCloud.name}
        </span>
        <span className="text-slate-600">|</span>
        <span className="text-slate-400">Blueprint components translated automatically</span>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 z-10">
        {activeTab === 'wizard' && (
          <DecisionWizard
            onNavigateToBlueprint={() => setActiveTab('blueprint')}
            onRecommendationCalculated={handleRecommendationCalculated}
          />
        )}

        {activeTab === 'blueprint' && <BlueprintCanvas />}

        {activeTab === 'cable-canvas' && <PipelineNodeCanvas />}

        {activeTab === 'mesh-domain' && <DomainTopologyModeler />}

        {activeTab === 'rag-sandbox' && <RagArchitectSandbox />}

        {activeTab === 'pacelc' && <PacelcSimulator />}

        {activeTab === 'dr-sim' && <DisasterRecoverySimulator />}

        {activeTab === 'security' && <ZeroTrustSecuritySandbox />}

        {activeTab === 'migration' && <MigrationEstimator />}

        {activeTab === 'matrix' && <ParadigmMatrix />}

        {activeTab === 'radar' && <RadarChart />}

        {activeTab === 'benchmarks' && <BenchmarkEngine />}

        {activeTab === 'finops' && <FinOpsCalculator />}

        {activeTab === 'quality' && <DataQualitySandbox />}

        {activeTab === 'contract' && <ContractBuilder />}

        {activeTab === 'reference' && <KnowledgeBase />}
      </main>

      {/* Executive Footer */}
      <footer className="border-t border-slate-800/80 glass-panel py-6 text-center text-xs text-slate-500 mt-12 z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-400">ArchitectIQ v5.0 Master Edition</span>
            <span>•</span>
            <span className="text-slate-500">Enterprise Data Architecture Framework & Selection Suite</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-slate-400 text-[11px]">
            <button onClick={() => setActiveTab('wizard')} className="hover:text-cyan-400 transition-colors">Decision Engine</button>
            <span>•</span>
            <button onClick={() => setActiveTab('blueprint')} className="hover:text-cyan-400 transition-colors">7-Tier Blueprint</button>
            <span>•</span>
            <button onClick={() => setActiveTab('pacelc')} className="hover:text-cyan-400 transition-colors">PACELC Engine</button>
            <span>•</span>
            <button onClick={() => setActiveTab('dr-sim')} className="hover:text-cyan-400 transition-colors">Disaster Recovery</button>
            <span>•</span>
            <button onClick={() => setActiveTab('migration')} className="hover:text-cyan-400 transition-colors">Migration Estimator</button>
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

      {/* Executive C-Suite Slide Deck Presentation View */}
      <ExecutiveDeckMode
        isOpen={isDeckOpen}
        onClose={() => setIsDeckOpen(false)}
        recommendation={computedRecommendation}
      />
    </div>
  );
}

export default App;
