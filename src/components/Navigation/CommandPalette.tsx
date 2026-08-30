import React, { useState, useEffect } from 'react';
import { CloudVendor } from '../../data/cloudMapping';
import { soundEngine } from '../../utils/soundUtils';
import { 
  Search, 
  Sparkles, 
  Layers, 
  Activity, 
  Network, 
  Cpu, 
  Sliders, 
  Lock, 
  RefreshCw, 
  Table2, 
  Gauge, 
  Calculator, 
  ShieldCheck, 
  FileCode2, 
  BookOpen, 
  Presentation, 
  Download, 
  Cloud,
  X,
  CornerDownLeft
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tabId: string) => void;
  onSelectVendor: (vendor: CloudVendor) => void;
  onOpenDeck: () => void;
  onOpenExport: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectTab,
  onSelectVendor,
  onOpenDeck,
  onOpenExport,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const tools = [
    { id: 'wizard', label: 'Decision Engine', category: 'Core Engine', icon: Sparkles, desc: 'Interactive 7-dimension architectural selection engine' },
    { id: 'blueprint', label: '7-Tier Blueprint', category: 'Blueprints & Canvas', icon: Layers, desc: 'Visual component mapping across 7 stack tiers' },
    { id: 'cable-canvas', label: 'SVG Cable Graph', category: 'Blueprints & Canvas', icon: Activity, desc: 'Interactive data pipeline graph with live metric flows' },
    { id: 'mesh-domain', label: 'Domain Modeler', category: 'Blueprints & Canvas', icon: Network, desc: 'Decentralized Data Mesh topology & data contract links' },
    { id: 'rag-sandbox', label: 'RAG Architect', category: 'Simulators', icon: Cpu, desc: 'Generative AI retrieval pipeline & vector search modeler' },
    { id: 'pacelc', label: 'PACELC Engine', category: 'Simulators', icon: Sliders, desc: 'Latency vs Consistency distributed systems tradeoff simulator' },
    { id: 'dr-sim', label: 'Disaster Recovery', category: 'Simulators', icon: Network, desc: 'RPO/RTO chaos injection failure mode simulator' },
    { id: 'security', label: 'Zero-Trust Security', category: 'Simulators', icon: Lock, desc: 'RBAC, ABAC, encryption & DLP security layer validator' },
    { id: 'migration', label: 'Migration Estimator', category: 'Simulators', icon: RefreshCw, desc: 'Legacy to cloud-native data migration TCO estimator' },
    { id: 'matrix', label: 'Paradigm Matrix', category: 'Governance & Analytics', icon: Table2, desc: 'Comparative matrix across 5 core data paradigms' },
    { id: 'radar', label: 'Tradeoff Radar', category: 'Governance & Analytics', icon: Sliders, desc: 'Multi-dimensional architecture tradeoff radar chart' },
    { id: 'benchmarks', label: 'Workload Benchmarks', category: 'Governance & Analytics', icon: Gauge, desc: 'Workload performance & query engine benchmark suite' },
    { id: 'finops', label: 'FinOps Simulator', category: 'Governance & Analytics', icon: Calculator, desc: 'Cloud storage & compute cost breakdown calculator' },
    { id: 'quality', label: 'Data Quality Sandbox', category: 'Governance & Analytics', icon: ShieldCheck, desc: 'Great Expectations & Soda quality rule validator' },
    { id: 'contract', label: 'Data Product Modeler', category: 'Governance & Analytics', icon: FileCode2, desc: 'Data contract YAML/JSON specification builder' },
    { id: 'reference', label: 'Reference Compendium', category: 'Governance & Analytics', icon: BookOpen, desc: 'Deep dive architecture patterns & reference library' },
  ];

  const actions = [
    { label: 'Switch to AWS Cloud Context', action: () => { onSelectVendor('aws'); onClose(); }, icon: Cloud, badge: 'AWS' },
    { label: 'Switch to Azure Cloud Context', action: () => { onSelectVendor('azure'); onClose(); }, icon: Cloud, badge: 'Azure' },
    { label: 'Switch to GCP Cloud Context', action: () => { onSelectVendor('gcp'); onClose(); }, icon: Cloud, badge: 'GCP' },
    { label: 'Switch to Multi-Cloud Hybrid Context', action: () => { onSelectVendor('hybrid'); onClose(); }, icon: Cloud, badge: 'Hybrid' },
    { label: 'Launch C-Suite Pitch Deck Presentation', action: () => { onOpenDeck(); onClose(); }, icon: Presentation, badge: 'Deck' },
    { label: 'Export Architecture Spec Proposal', action: () => { onOpenExport(); onClose(); }, icon: Download, badge: 'Export' },
  ];

  const filteredTools = tools.filter(t => 
    t.label.toLowerCase().includes(query.toLowerCase()) || 
    t.desc.toLowerCase().includes(query.toLowerCase()) ||
    t.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredActions = actions.filter(a =>
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-2xl glass-panel border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-slate-800/80 bg-slate-900/90 space-x-3">
          <Search className="h-5 w-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a tool name, simulator, preset, or command (e.g. 'RAG', 'FinOps', 'AWS')..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none font-sans"
            autoFocus
          />
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Command Results List */}
        <div className="overflow-y-auto p-3 space-y-4">
          
          {/* Architectural Tools */}
          {filteredTools.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[10px] uppercase font-bold text-cyan-400 tracking-wider font-mono">
                Architectural Modules & Tools ({filteredTools.length})
              </div>
              <div className="mt-1 space-y-1">
                {filteredTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <button
                      key={tool.id}
                      onClick={() => {
                        soundEngine.playClick();
                        onSelectTab(tool.id);
                        onClose();
                      }}
                      className="w-full text-left flex items-center justify-between p-3 rounded-2xl bg-slate-900/40 hover:bg-slate-800/80 hover:border-cyan-500/30 border border-transparent transition-all group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-xl bg-slate-800 text-slate-400 group-hover:text-cyan-300 group-hover:bg-slate-900 border border-slate-700/60 transition-colors">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-xs text-slate-200 group-hover:text-white">
                              {tool.label}
                            </span>
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-slate-950 text-slate-400 border border-slate-800">
                              {tool.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                            {tool.desc}
                          </p>
                        </div>
                      </div>
                      <CornerDownLeft className="h-3.5 w-3.5 text-slate-600 group-hover:text-cyan-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quick Actions & Vendors */}
          {filteredActions.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[10px] uppercase font-bold text-indigo-400 tracking-wider font-mono">
                Quick Vendor & Export Commands ({filteredActions.length})
              </div>
              <div className="mt-1 space-y-1">
                {filteredActions.map((act, idx) => {
                  const Icon = act.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        soundEngine.playClick();
                        act.action();
                      }}
                      className="w-full text-left flex items-center justify-between p-2.5 rounded-2xl bg-slate-900/40 hover:bg-slate-800/80 hover:border-indigo-500/30 border border-transparent transition-all group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-xl bg-slate-800 text-indigo-400 border border-slate-700/60">
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="font-bold text-xs text-slate-200 group-hover:text-white">
                          {act.label}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-indigo-950 text-indigo-300 border border-indigo-800">
                        {act.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {filteredTools.length === 0 && filteredActions.length === 0 && (
            <div className="p-8 text-center text-slate-500 text-xs">
              No matching tools or commands found for "{query}".
            </div>
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="px-5 py-3 border-t border-slate-800/80 bg-slate-950 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center space-x-3">
            <span>Use <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-300">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-300">↓</kbd> to navigate</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-300">Enter</kbd> to select</span>
          </div>
          <div>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-300">ESC</kbd> to close
          </div>
        </div>
      </div>
    </div>
  );
};
