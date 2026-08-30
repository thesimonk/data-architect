import React, { useState } from 'react';
import { Header } from './components/Header';
import { CommandPalette } from './components/Navigation/CommandPalette';
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
import { Sparkles, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('wizard');
  const [cloudVendor, setCloudVendor] = useState<CloudVendor>('aws');
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isDeckOpen, setIsDeckOpen] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  
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
    <div className="min-h-screen flex flex-col bg-grid-pattern relative overflow-hidden text-slate-100">
      
      {/* Background Ambient Glowing Orbs */}
      <div className="absolute top-1/6 left-10 w-[30rem] h-[30rem] bg-cyan-600/15 rounded-full blur-[120px] pointer-events-none animate-orb-1" />
      <div className="absolute bottom-1/4 right-10 w-[30rem] h-[30rem] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none animate-orb-2" />
      <div className="absolute top-2/3 left-1/3 w-[25rem] h-[25rem] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none animate-orb-3" />

      {/* Top Sticky Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenDeck={() => setIsDeckOpen(true)}
        cloudVendor={cloudVendor}
        setCloudVendor={setCloudVendor}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Cloud Context & Environment Telemetry Banner */}
      <div className="bg-slate-950/80 border-b border-slate-800/80 py-2 px-4 text-xs z-10 flex flex-wrap items-center justify-between max-w-7xl mx-auto w-full gap-2 font-mono">
        <div className="flex items-center space-x-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-slate-400">Target Ecosystem:</span>
          <span className="font-extrabold uppercase px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-cyan-300 shadow-sm" style={{ color: activeCloud.badgeColor }}>
            {activeCloud.name}
          </span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="text-slate-400 hidden sm:inline">Stack Translation Engine Active</span>
        </div>

        <div className="flex items-center space-x-4 text-[11px] text-slate-400">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>SOC2 / HIPAA Compliant Blueprint</span>
          </div>
          <div className="hidden md:flex items-center space-x-1.5">
            <Cpu className="h-3.5 w-3.5 text-indigo-400" />
            <span>AI Architecture Ready</span>
          </div>
        </div>
      </div>

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 z-10">
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
      <footer className="border-t border-slate-800/80 glass-panel py-8 text-center text-xs text-slate-400 mt-16 z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-left">
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 font-black font-mono">
              AIQ
            </div>
            <div>
              <div className="font-extrabold text-slate-200">ArchitectIQ v5.0 Master Edition</div>
              <div className="text-slate-500 text-[11px]">State-of-the-Art Enterprise Architecture & Decision Suite</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-slate-400 text-[11px]">
            <button onClick={() => setActiveTab('wizard')} className="hover:text-cyan-300 transition-colors">Decision Engine</button>
            <span>•</span>
            <button onClick={() => setActiveTab('blueprint')} className="hover:text-cyan-300 transition-colors">7-Tier Blueprint</button>
            <span>•</span>
            <button onClick={() => setActiveTab('cable-canvas')} className="hover:text-cyan-300 transition-colors">SVG Cable Graph</button>
            <span>•</span>
            <button onClick={() => setActiveTab('finops')} className="hover:text-cyan-300 transition-colors">FinOps Calculator</button>
            <span>•</span>
            <button onClick={() => setActiveTab('contract')} className="hover:text-cyan-300 transition-colors">Data Product Builder</button>
          </div>

          <div className="flex items-center space-x-2 text-[11px] text-slate-400">
            <kbd className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-cyan-400 font-mono font-bold">
              Ctrl + K
            </kbd>
            <span>Command Palette</span>
          </div>
        </div>
      </footer>

      {/* Command Palette Keyboard Search Modal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectTab={setActiveTab}
        onSelectVendor={setCloudVendor}
        onOpenDeck={() => setIsDeckOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
      />

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
