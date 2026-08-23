import React, { useState } from 'react';
import { COMPARISON_DIMENSIONS } from '../../data/comparisonMatrix';
import { PARADIGMS } from '../../data/paradigms';
import { ParadigmId } from '../../types/architecture';
import { Table2, CheckCircle2, HelpCircle } from 'lucide-react';

export const ParadigmMatrix: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [hoveredCell, setHoveredCell] = useState<{ dimId: string; pId: ParadigmId } | null>(null);

  const categories = ['All', 'Architecture', 'Operations', 'Business & Team', 'Technology'];

  const filteredDimensions = selectedCategory === 'All'
    ? COMPARISON_DIMENSIONS
    : COMPARISON_DIMENSIONS.filter((d) => d.category === selectedCategory);

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto py-4">
      
      {/* Matrix Header & Category Filter */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/60">
              <Table2 className="h-4 w-4" />
            </span>
            <h1 className="text-2xl font-extrabold text-white">
              Enterprise Paradigm Comparison Matrix
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Side-by-side comparative evaluation of major enterprise data architecture patterns across 12 strategic dimensions.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Table Card */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-800/80 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-1/4">
                Evaluation Dimension
              </th>
              {PARADIGMS.map((p) => (
                <th key={p.id} className="py-4 px-3 text-xs font-bold text-center text-cyan-300 w-1/8">
                  <div className="truncate font-semibold">{p.name.split(' ')[0]} {p.name.split(' ')[1]}</div>
                  <span className="text-[10px] text-slate-500 font-normal block font-mono">
                    Score: {p.tcoScore}/10
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-xs">
            {filteredDimensions.map((dim) => (
              <tr key={dim.id} className="hover:bg-slate-900/40 transition-colors">
                
                {/* Dimension Label */}
                <td className="py-4 px-4 space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-100">{dim.name}</span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-slate-800 text-slate-400">
                      {dim.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {dim.description}
                  </p>
                </td>

                {/* Scores per Paradigm */}
                {PARADIGMS.map((p) => {
                  const scoreData = dim.scores[p.id] || { score: 3, summary: 'Standard baseline.' };
                  const isHovered = hoveredCell?.dimId === dim.id && hoveredCell?.pId === p.id;

                  return (
                    <td
                      key={p.id}
                      onMouseEnter={() => setHoveredCell({ dimId: dim.id, pId: p.id })}
                      onMouseLeave={() => setHoveredCell(null)}
                      className="py-4 px-3 text-center relative"
                    >
                      <div className="flex flex-col items-center space-y-1">
                        {/* Score Rating Bar */}
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <div
                              key={star}
                              className={`w-2 h-3 rounded-xs transition-all ${
                                star <= scoreData.score
                                  ? 'bg-gradient-to-t from-cyan-600 to-cyan-400'
                                  : 'bg-slate-800'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-mono text-[10px] text-slate-400">
                          {scoreData.score} / 5
                        </span>
                      </div>

                      {/* Tooltip Hover Breakdown */}
                      {isHovered && (
                        <div className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 rounded-xl bg-slate-900 border border-cyan-500/50 shadow-2xl text-left pointer-events-none">
                          <span className="text-[10px] font-bold uppercase text-cyan-400 block mb-1">
                            {p.name} Rationale
                          </span>
                          <p className="text-xs text-slate-200 leading-relaxed">
                            {scoreData.summary}
                          </p>
                        </div>
                      )}
                    </td>
                  );
                })}

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend Footer */}
      <div className="p-4 rounded-2xl glass-panel border border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center space-x-2">
          <HelpCircle className="h-4 w-4 text-cyan-400" />
          <span>Hover over any score cell to read the technical evaluation rationale.</span>
        </div>
        <span className="font-mono text-[11px] text-slate-500">
          5 Bars = Best Performance / Minimal Overhead
        </span>
      </div>
    </div>
  );
};
