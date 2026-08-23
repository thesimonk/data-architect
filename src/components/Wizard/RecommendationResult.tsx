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
  ChevronRight
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
      {/* Top Banner Card */}
      <div className="relative overflow-hidden p-8 rounded-3xl glass-panel border border-cyan-500/30 bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Trophy className="w-64 h-64 text-cyan-400" />
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-700/60 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Recommended Target Paradigm</span>
            </span>
            <span className="text-xs text-slate-400">
              Computed via 7-Dimension Enterprise Matrix
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {primaryParadigm.name}
              </h1>
              <p className="text-sm text-cyan-300 font-medium mt-1">
                "{primaryParadigm.tagline}"
              </p>
            </div>

            {/* Score Pill */}
            <div className="flex items-center space-x-3 bg-slate-950/80 p-4 rounded-2xl border border-cyan-500/40 cyan-glow">
              <div className="text-right">
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 font-mono">
                  {matchScore}%
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Architecture Fit
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed max-w-4xl pt-2">
            {primaryParadigm.description}
          </p>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              onClick={onNavigateToBlueprint}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-950/50 transition-all duration-200"
            >
              <Layers className="h-4 w-4" />
              <span>Explore Interactive Blueprint Canvas</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={onReset}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Re-run Assessment</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Breakdown vs Strategic Fit Rationale */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Paradigm Match Breakdown Ranking (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl glass-panel space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center space-x-2">
            <Trophy className="h-4 w-4 text-cyan-400" />
            <span>Paradigm Fit Scoring Matrix</span>
          </h3>
          <p className="text-xs text-slate-400">
            Relative alignment across all 6 enterprise architecture archetypes:
          </p>

          <div className="space-y-3.5 pt-2">
            {breakdown.map((item, idx) => {
              const isTop = idx === 0;
              return (
                <div key={item.paradigmId} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-semibold ${isTop ? 'text-cyan-300' : 'text-slate-300'}`}>
                      {idx + 1}. {item.paradigmId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </span>
                    <span className="font-mono text-slate-400">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isTop
                          ? 'bg-gradient-to-r from-cyan-400 to-emerald-400'
                          : 'bg-slate-600'
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-800">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
              <span className="font-bold text-slate-300">Secondary Hybrid Option:</span>
              <p className="text-slate-400">
                <strong className="text-cyan-400">{secondaryParadigm.name}</strong> can be paired alongside your primary architecture for specialized workload boundaries.
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Architectural Rationale & Stack (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Architectural Rationale */}
          <div className="p-6 rounded-2xl glass-panel space-y-4">
            <h3 className="text-base font-bold text-slate-100 flex items-center space-x-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Architectural Fit Rationale</span>
            </h3>

            <ul className="space-y-2.5">
              {rationale.map((r, i) => (
                <li key={i} className="flex items-start space-x-2.5 text-xs text-slate-300 leading-relaxed">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Tech Stack Grid */}
          <div className="p-6 rounded-2xl glass-panel space-y-4">
            <h3 className="text-base font-bold text-slate-100">
              Recommended Technology Stack
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="font-semibold text-cyan-400 block mb-1">Ingestion</span>
                <span className="text-slate-300 font-mono text-[11px]">
                  {primaryParadigm.recommendedTechStack.ingestion.slice(0, 2).join(', ')}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="font-semibold text-cyan-400 block mb-1">Storage</span>
                <span className="text-slate-300 font-mono text-[11px]">
                  {primaryParadigm.recommendedTechStack.storage.slice(0, 2).join(', ')}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="font-semibold text-cyan-400 block mb-1">Processing</span>
                <span className="text-slate-300 font-mono text-[11px]">
                  {primaryParadigm.recommendedTechStack.processing.slice(0, 2).join(', ')}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="font-semibold text-cyan-400 block mb-1">Governance</span>
                <span className="text-slate-300 font-mono text-[11px]">
                  {primaryParadigm.recommendedTechStack.governance.slice(0, 2).join(', ')}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="font-semibold text-cyan-400 block mb-1">Serving Engine</span>
                <span className="text-slate-300 font-mono text-[11px]">
                  {primaryParadigm.recommendedTechStack.serving.slice(0, 2).join(', ')}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Grid: Risks & First 90 Days Roadmap */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Risks to Watch */}
        <div className="p-6 rounded-2xl glass-panel border-l-4 border-l-amber-500 space-y-4">
          <h3 className="text-base font-bold text-amber-300 flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <span>Critical Anti-Patterns & Risks to Watch</span>
          </h3>

          <ul className="space-y-2 text-xs text-slate-300">
            {keyRisksToWatch.map((risk, i) => (
              <li key={i} className="flex items-start space-x-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Initial Implementation Roadmap */}
        <div className="p-6 rounded-2xl glass-panel border-l-4 border-l-cyan-500 space-y-4">
          <h3 className="text-base font-bold text-cyan-300 flex items-center space-x-2">
            <ChevronRight className="h-4 w-4 text-cyan-400" />
            <span>First 90-Day Implementation Roadmap</span>
          </h3>

          <ol className="space-y-2 text-xs text-slate-300">
            {firstSteps.map((step, i) => (
              <li key={i} className="flex items-start space-x-2">
                <span className="font-mono text-cyan-400 font-bold">{i + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

      </div>
    </div>
  );
};
