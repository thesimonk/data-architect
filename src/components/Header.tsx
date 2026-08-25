import React, { useState } from 'react';
import { CloudVendor } from '../data/cloudMapping';
import { soundEngine } from '../utils/soundUtils';
import { 
  Sparkles, 
  Layers, 
  GitBranch, 
  Table2, 
  FileCode2, 
  BookOpen, 
  Calculator,
  Download,
  Activity,
  Sliders,
  Gauge,
  Presentation,
  Volume2,
  VolumeX,
  Cloud,
  Network,
  Cpu,
  ShieldCheck,
  Lock,
  RefreshCw
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenExport: () => void;
  onOpenDeck: () => void;
  cloudVendor: CloudVendor;
  setCloudVendor: (vendor: CloudVendor) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenExport,
  onOpenDeck,
  cloudVendor,
  setCloudVendor,
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(soundEngine.getMuted());

  const navItems = [
    { id: 'wizard', label: 'Decision Engine', icon: Sparkles },
    { id: 'blueprint', label: '7-Tier Blueprint', icon: Layers },
    { id: 'cable-canvas', label: 'SVG Cable Graph', icon: Activity },
    { id: 'mesh-domain', label: 'Domain Modeler', icon: Network },
    { id: 'rag-sandbox', label: 'RAG Architect', icon: Cpu },
    { id: 'pacelc', label: 'PACELC Engine', icon: Sliders },
    { id: 'dr-sim', label: 'Disaster Recovery', icon: Network },
    { id: 'security', label: 'Zero-Trust Security', icon: Lock },
    { id: 'migration', label: 'Migration Estimator', icon: RefreshCw },
    { id: 'matrix', label: 'Paradigm Matrix', icon: Table2 },
    { id: 'radar', label: 'Tradeoff Radar', icon: Sliders },
    { id: 'benchmarks', label: 'Workload Benchmarks', icon: Gauge },
    { id: 'finops', label: 'FinOps Simulator', icon: Calculator },
    { id: 'quality', label: 'Data Quality Sandbox', icon: ShieldCheck },
    { id: 'contract', label: 'Data Product Modeler', icon: FileCode2 },
    { id: 'reference', label: 'Reference Compendium', icon: BookOpen },
  ];

  const handleTabClick = (id: string) => {
    soundEngine.playClick();
    setActiveTab(id);
  };

  const handleToggleMute = () => {
    const newMute = soundEngine.toggleMute();
    setIsMuted(newMute);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleTabClick('wizard')}>
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 text-white shadow-lg shadow-cyan-500/25">
              <GitBranch className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-300">
                  ArchitectIQ
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold font-mono bg-cyan-950/80 text-cyan-400 border border-cyan-700/60">
                  v5.0 Master
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Enterprise Data Architecture Framework & Selection Suite
              </p>
            </div>
          </div>

          {/* Cloud Vendor Selector & Quick Actions */}
          <div className="flex items-center space-x-2.5">
            {/* Cloud Vendor Switcher */}
            <div className="flex items-center space-x-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs">
              <Cloud className="h-3.5 w-3.5 text-cyan-400 ml-2 hidden sm:block" />
              {(['aws', 'azure', 'gcp', 'hybrid'] as CloudVendor[]).map((v) => (
                <button
                  key={v}
                  onClick={() => {
                    soundEngine.playClick();
                    setCloudVendor(v);
                  }}
                  className={`px-2.5 py-1 rounded-lg font-bold font-mono uppercase transition-all text-[10px] ${
                    cloudVendor === v
                      ? 'bg-cyan-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>

            {/* Mute Toggle */}
            <button
              onClick={handleToggleMute}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all"
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-cyan-400" />}
            </button>

            {/* Pitch Deck Button */}
            <button
              onClick={() => {
                soundEngine.playClick();
                onOpenDeck();
              }}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
            >
              <Presentation className="h-3.5 w-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Pitch Deck</span>
            </button>

            {/* Export Spec Button */}
            <button
              onClick={() => {
                soundEngine.playClick();
                onOpenExport();
              }}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-cyan-950/50 transition-all duration-200"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export Spec</span>
            </button>
          </div>
        </div>

        {/* Scrollable Navigation Tabs Bar */}
        <nav className="flex space-x-1.5 overflow-x-auto py-2 border-t border-slate-800/60 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-slate-800/90 text-cyan-300 border border-cyan-500/40 cyan-glow shadow-inner'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
