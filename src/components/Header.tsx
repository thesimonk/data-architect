import React from 'react';
import { 
  Sparkles, 
  Layers, 
  GitBranch, 
  Table2, 
  FileCode2, 
  BookOpen, 
  Download,
  ShieldCheck
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenExport }) => {
  const navItems = [
    { id: 'wizard', label: '1. Decision Engine Wizard', icon: Sparkles },
    { id: 'blueprint', label: '2. Blueprint Canvas', icon: Layers },
    { id: 'matrix', label: '3. Paradigm Matrix', icon: Table2 },
    { id: 'contract', label: '4. Data Product Modeler', icon: FileCode2 },
    { id: 'reference', label: '5. Reference Compendium', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Portfolio Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('wizard')}>
            <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 text-white shadow-lg shadow-cyan-500/20">
              <GitBranch className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-400">
                  ArchitectIQ
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800/50">
                  v2.5 Enterprise
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Enterprise Data Architecture Framework & Selection Engine
              </p>
            </div>
          </div>

          {/* Senior Architect Portfolio Badges */}
          <div className="hidden lg:flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Senior Data Architect Portfolio</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenExport}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-md shadow-cyan-900/30 transition-all duration-200"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export Blueprint</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex space-x-1 overflow-x-auto py-2 border-t border-slate-800/50 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all duration-150 whitespace-nowrap ${
                  isActive
                    ? 'bg-slate-800 text-cyan-400 border border-cyan-500/30 shadow-inner'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
