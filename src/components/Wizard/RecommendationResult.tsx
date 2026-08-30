import React from 'react';
import { RecommendationResult as RecResult } from '../../types/architecture';
import { 
  Trophy, 
  Layers, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight, 
  RotateCcw,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Cpu,
  Database,
  Lock,
  Download
} from 'lucide-react';

interface RecommendationResultProps {
  result: RecResult;
  onReset: () => void;
  onNavigateToBlueprint: () => void;
}

export const RecommendationResultView: React.FC<RecommendationResultProps> = ({
  result,
  onReset,
  onNavigateToBlueprint,
}) => {
  const { primaryParadigm, secondaryParadigm, matchScore, breakdown, rationale, keyRisksToWatch, firstSteps } = result;

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Top Victory Banner Card */}
      <div className="relative overflow-hidden p-8 sm:p-10 rounded-3xl glass-panel border border-cyan-500/40 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/60 shadow-2xl">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-0 p-8 opacity-15 pointer-events-none">
          <Trophy className="w-80 h-80 text-cyan-400" />
        </div>

        <div className="relative z-10 space-y-6">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-950/90 text-cyan-300 border border-cyan-500/50 text-xs font-mono font-bold uppercase tracking-wider shadow-inner">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>Recommended Architecture Paradigm</span>
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Deterministic scoring derived from 7-dimension matrix
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                {primaryParadigm.name}
              </h1>
              <p className="text-base text-cyan-300 font-semibold mt-2 max-w-2xl">
                "{primaryParadigm.tagline}"
              </p>
            </div>

            {/* Radial Match Score Card */}
            <div className="flex items-center space-x-4 bg-slate-950/90 p-5 rounded-3xl border border-cyan-500/40 cyan-glow shadow-2xl shrink-0">
              <div className="relative flex items-center justify-center w-16 h-16">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-800"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-cyan-400"
                    strokeDasharray={`${matchScore}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute font-mono font-black text-lg text-white">
                  {matchScore}%
                </span>
              </div>
              <div>
                <div className="text-xs font-mono font-extrabold uppercase text-cyan-400 tracking-wider">
                  Architecture Fit
                </div>
                <div className="text-[11px] text-slate-400">
                  Optimal Drivers Alignment
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed max-w-4xl pt-1">
            {primaryParadigm.description}
          </p>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onNavigateToBlueprint}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl text-xs font-extrabold bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-xl shadow-cyan-950/60 cyan-glow transition-all transform hover:-translate-y-0.5"
            >
              <Layers className="h-4 w-4" />
              <span>Explore 7-Tier Blueprint Canvas</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={onReset}
              className="inline-flex items-center space-x-2 px-4 py-3 rounded-2xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all"
            >
              <RotateCcw className="h-3.5 w-3.5 text-slate-400" />
              <span>Re-evaluate Assessment</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Matrix Score Breakdown vs Rationale */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Paradigm Match Breakdown Matrix (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl glass-panel border border-slate-800/80 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
              <Trophy className="h-4 w-4 text-cyan-400" />
              <span>Paradigm Alignment Ranking</span>
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-800">
              6 Archetypes
            </span>
          </div>

          <div className="space-y-4 pt-1">
            {breakdown.map((item, idx) => {
              const isTop = idx === 0;
              return (
                <div key={item.paradigmId} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-extrabold ${isTop ? 'text-cyan-300' : 'text-slate-300'}`}>
                      {idx + 1}. {item.paradigmId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </span>
                    <span className="font-mono font-bold text-slate-400">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800 p-0.5">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isTop
                          ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 cyan-glow'
                          : 'bg-slate-700'
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-800/80">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs space-y-1.5">
              <span className="font-mono font-bold text-indigo-400 uppercase text-[10px] block">
                Secondary Hybrid Strategy:
              </span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                <strong className="text-cyan-300">{secondaryParadigm.name}</strong> can be deployed alongside your primary stack to isolate real-time streaming or domain boundaries.
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Architectural Rationale & Stack (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Rationale Cards */}
          <div className="p-6 rounded-3xl glass-panel border border-slate-800/80 space-y-4">
            <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Key Architectural Drivers & Rationale</span>
            </h3>

            <div className="space-y-3">
              {rationale.map((r, i) => (
                <div key={i} className="flex items-start space-x-3 p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/80 text-xs text-slate-200">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{r}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Tech Stack Grid */}
          <div className="p-6 rounded-3xl glass-panel border border-slate-800/80 space-y-4">
            <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
              <Cpu className="h-4 w-4 text-cyan-400" />
              <span>Recommended Target Technology Stack</span>
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl glass-card">
                <span className="font-mono text-[10px] font-bold text-cyan-400 uppercase block mb-1">Ingestion</span>
                <span className="text-slate-200 font-mono text-xs font-semibold">
                  {primaryParadigm.recommendedTechStack.ingestion.slice(0, 2).join(', ')}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl glass-card">
                <span className="font-mono text-[10px] font-bold text-cyan-400 uppercase block mb-1">Storage</span>
                <span className="text-slate-200 font-mono text-xs font-semibold">
                  {primaryParadigm.recommendedTechStack.storage.slice(0, 2).join(', ')}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl glass-card">
                <span className="font-mono text-[10px] font-bold text-cyan-400 uppercase block mb-1">Processing</span>
                <span className="text-slate-200 font-mono text-xs font-semibold">
                  {primaryParadigm.recommendedTechStack.processing.slice(0, 2).join(', ')}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl glass-card">
                <span className="font-mono text-[10px] font-bold text-cyan-400 uppercase block mb-1">Governance</span>
                <span className="text-slate-200 font-mono text-xs font-semibold">
                  {primaryParadigm.recommendedTechStack.governance.slice(0, 2).join(', ')}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl glass-card">
                <span className="font-mono text-[10px] font-bold text-cyan-400 uppercase block mb-1">Serving Engine</span>
                <span className="text-slate-200 font-mono text-xs font-semibold">
                  {primaryParadigm.recommendedTechStack.serving.slice(0, 2).join(', ')}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Grid: Anti-Patterns & 90-Day Roadmap */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Anti-Patterns & Risks */}
        <div className="p-6 rounded-3xl glass-panel border-l-4 border-l-amber-500 border border-slate-800/80 space-y-4">
          <h3 className="text-base font-extrabold text-amber-300 flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <span>Anti-Patterns & Risks to Mitigate</span>
          </h3>

          <div className="space-y-2.5">
            {keyRisksToWatch.map((risk, i) => (
              <div key={i} className="flex items-start space-x-2.5 text-xs text-slate-300 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-amber-400 font-bold">•</span>
                <span className="leading-relaxed">{risk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 90-Day Roadmap */}
        <div className="p-6 rounded-3xl glass-panel border-l-4 border-l-cyan-500 border border-slate-800/80 space-y-4">
          <h3 className="text-base font-extrabold text-cyan-300 flex items-center space-x-2">
            <ChevronRight className="h-4 w-4 text-cyan-400" />
            <span>First 90-Day Implementation Roadmap</span>
          </h3>

          <div className="space-y-2.5">
            {firstSteps.map((step, i) => (
              <div key={i} className="flex items-start space-x-3 text-xs text-slate-300 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="w-5 h-5 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-700/60 flex items-center justify-center font-mono font-bold text-[10px] shrink-0">
                  {i + 1}
                </span>
                <span className="leading-relaxed pt-0.5">{step}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
