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
  RefreshCw,
  Search
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenExport: () => void;
  onOpenDeck: () => void;
  cloudVendor: CloudVendor;
  setCloudVendor: (vendor: CloudVendor) => void;
  onOpenCommandPalette: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenExport,
  onOpenDeck,
  cloudVendor,
  setCloudVendor,
  onOpenCommandPalette,
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(soundEngine.getMuted());
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Modules (16)' },
    { id: 'core', label: 'Core Engine' },
    { id: 'canvas', label: 'Blueprints & Canvas' },
    { id: 'sim', label: 'Simulators' },
    { id: 'gov', label: 'Governance & FinOps' },
  ];

  const navItems = [
    { id: 'wizard', label: 'Decision Engine', category: 'core', icon: Sparkles },
    { id: 'blueprint', label: '7-Tier Blueprint', category: 'canvas', icon: Layers },
    { id: 'cable-canvas', label: 'SVG Cable Graph', category: 'canvas', icon: Activity },
    { id: 'mesh-domain', label: 'Domain Modeler', category: 'canvas', icon: Network },
    { id: 'rag-sandbox', label: 'RAG Architect', category: 'sim', icon: Cpu },
    { id: 'pacelc', label: 'PACELC Engine', category: 'sim', icon: Sliders },
    { id: 'dr-sim', label: 'Disaster Recovery', category: 'sim', icon: Network },
    { id: 'security', label: 'Zero-Trust Security', category: 'sim', icon: Lock },
    { id: 'migration', label: 'Migration Estimator', category: 'sim', icon: RefreshCw },
    { id: 'matrix', label: 'Paradigm Matrix', category: 'gov', icon: Table2 },
    { id: 'radar', label: 'Tradeoff Radar', category: 'gov', icon: Sliders },
    { id: 'benchmarks', label: 'Workload Benchmarks', category: 'gov', icon: Gauge },
    { id: 'finops', label: 'FinOps Simulator', category: 'gov', icon: Calculator },
    { id: 'quality', label: 'Data Quality Sandbox', category: 'gov', icon: ShieldCheck },
    { id: 'contract', label: 'Data Product Modeler', category: 'gov', icon: FileCode2 },
    { id: 'reference', label: 'Reference Compendium', category: 'gov', icon: BookOpen },
  ];

  const filteredNavItems = categoryFilter === 'all'
    ? navItems
    : navItems.filter(item => item.category === categoryFilter);

  const handleTabClick = (id: string) => {
    soundEngine.playClick();
    setActiveTab(id);
  };

  const handleToggleMute = () => {
    const newMute = soundEngine.toggleMute();
    setIsMuted(newMute);
  };

  const vendorStyles: Record<CloudVendor, { bg: string; text: string; border: string }> = {
    aws: { bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/40' },
    azure: { bg: 'bg-blue-500/15', text: 'text-blue-400', border: 'border-blue-500/40' },
    gcp: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/40' },
    hybrid: { bg: 'bg-purple-500/15', text: 'text-purple-400', border: 'border-purple-500/40' },
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 glass-panel shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center space-x-3 cursor-pointer group shrink-0" onClick={() => handleTabClick('wizard')}>
            <div className="relative">
              <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 text-white shadow-lg shadow-cyan-500/30 group-hover:scale-105 transition-transform duration-300">
                <GitBranch className="h-5 w-5 animate-pulse" />
              </div>
              <div className="absolute -inset-1 rounded-2xl bg-cyan-500/20 blur-sm pointer-events-none group-hover:bg-cyan-400/40 transition-colors" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-300">
                  ArchitectIQ
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold font-mono bg-cyan-950/90 text-cyan-300 border border-cyan-500/50 shadow-inner">
                  v5.0 Pro
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                Enterprise Data Architecture & Selection Suite
              </p>
            </div>
          </div>

          {/* Quick Command Search Bar Trigger */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenCommandPalette();
            }}
            className="hidden md:flex items-center justify-between px-3.5 py-1.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-slate-200 transition-all text-xs w-64 group"
          >
            <div className="flex items-center space-x-2">
              <Search className="h-3.5 w-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>Search modules...</span>
            </div>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-700 text-[10px] font-mono text-cyan-300">
              Ctrl+K
            </kbd>
          </button>

          {/* Cloud Vendor Switcher & Top Actions */}
          <div className="flex items-center space-x-2 shrink-0">
            
            {/* Cloud Vendor Switcher Pills */}
            <div className="flex items-center space-x-1 bg-slate-950/90 p-1 rounded-2xl border border-slate-800/80 text-xs">
              <Cloud className="h-3.5 w-3.5 text-cyan-400 ml-2 hidden lg:block" />
              {(['aws', 'azure', 'gcp', 'hybrid'] as CloudVendor[]).map((v) => {
                const isCurrent = cloudVendor === v;
                const style = vendorStyles[v];
                return (
                  <button
                    key={v}
                    onClick={() => {
                      soundEngine.playClick();
                      setCloudVendor(v);
                    }}
                    className={`px-2.5 py-1 rounded-xl font-mono text-[10px] font-extrabold uppercase transition-all duration-200 ${
                      isCurrent
                        ? `${style.bg} ${style.text} ${style.border} border shadow-md scale-105`
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    {v}
                  </button>
                );
              })}
            </div>

            {/* Mobile Search Icon */}
            <button
              onClick={onOpenCommandPalette}
              className="md:hidden p-2 rounded-2xl bg-slate-900 border border-slate-800 text-cyan-400"
              title="Search Modules (Ctrl+K)"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Mute Audio Toggle */}
            <button
              onClick={handleToggleMute}
              className="p-2 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
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
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-2xl text-xs font-semibold bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700 transition-all"
            >
              <Presentation className="h-3.5 w-3.5 text-cyan-400" />
              <span>Pitch Deck</span>
            </button>

            {/* Export Proposal Button */}
            <button
              onClick={() => {
                soundEngine.playClick();
                onOpenExport();
              }}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-cyan-950/50 hover:shadow-cyan-500/25 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Export Spec</span>
            </button>
          </div>
        </div>

        {/* Category Filters + Tab Navigation Bar */}
        <div className="py-2 border-t border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-2">
          
          {/* Category Filter Pills */}
          <div className="flex items-center space-x-1 overflow-x-auto scrollbar-none shrink-0 py-0.5">
            {categories.map((cat) => {
              const isSelected = categoryFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`px-2.5 py-1 rounded-xl text-[10px] font-bold transition-all whitespace-nowrap ${
                    isSelected
                      ? 'bg-cyan-950/90 text-cyan-300 border border-cyan-500/40 shadow-inner'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Module Navigation Tabs */}
          <nav className="flex space-x-1.5 overflow-x-auto py-0.5 scrollbar-none">
            {filteredNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-2xl text-xs font-bold transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-slate-800/90 text-cyan-300 border border-cyan-500/50 cyan-glow shadow-inner scale-105'
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
      </div>
    </header>
  );
};
