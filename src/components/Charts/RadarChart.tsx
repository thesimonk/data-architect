import React, { useState } from 'react';
import { PARADIGMS } from '../../data/paradigms';
import { ParadigmId } from '../../types/architecture';
import { ShieldCheck, Sparkles, Sliders } from 'lucide-react';

export const RadarChart: React.FC = () => {
  const [selectedParadigms, setSelectedParadigms] = useState<ParadigmId[]>([
    'medallion-lakehouse',
    'data-mesh',
    'realtime-kappa',
  ]);

  const dimensions = [
    { key: 'tcoScore', label: 'Cost Efficiency' },
    { key: 'complexityScore', label: 'Operational Simplicity', invert: true },
    { key: 'scalabilityScore', label: 'Scalability Limit' },
    { key: 'governanceMaturityRequired', label: 'Governance Maturity' },
    { key: 'autonomyScore', label: 'Team Autonomy', defaultVal: 8 },
    { key: 'aiScore', label: 'AI & Vector Readiness', defaultVal: 9 },
  ];

  const colors: Record<ParadigmId, string> = {
    'medallion-lakehouse': '#00f0ff', // Cyan
    'data-mesh': '#10b981', // Emerald
    'data-fabric': '#f59e0b', // Amber
    'modern-data-stack': '#8b5cf6', // Violet
    'realtime-kappa': '#ec4899', // Pink
    'sovereign-hybrid': '#3b82f6', // Blue
  };

  const toggleParadigm = (id: ParadigmId) => {
    if (selectedParadigms.includes(id)) {
      if (selectedParadigms.length > 1) {
        setSelectedParadigms(selectedParadigms.filter((p) => p !== id));
      }
    } else {
      setSelectedParadigms([...selectedParadigms, id]);
    }
  };

  // Helper to compute SVG radar coordinates for 6 axes (radius = 120)
  const center = 150;
  const radius = 110;
  const numAxes = dimensions.length;

  const getCoordinates = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / numAxes - Math.PI / 2;
    const r = (value / 10) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Generate SVG polygon points for a given paradigm
  const getPolygonPoints = (pId: ParadigmId) => {
    const paradigm = PARADIGMS.find((p) => p.id === pId);
    if (!paradigm) return '';

    return dimensions
      .map((dim, idx) => {
        let val = 7;
        if (dim.key === 'tcoScore') val = paradigm.tcoScore;
        else if (dim.key === 'complexityScore') val = 11 - paradigm.complexityScore; // inverted: higher simplicity = lower complexity score
        else if (dim.key === 'scalabilityScore') val = paradigm.scalabilityScore;
        else if (dim.key === 'governanceMaturityRequired') val = paradigm.governanceMaturityRequired;
        else if (pId === 'data-mesh' && dim.key === 'autonomyScore') val = 10;
        else if (pId === 'realtime-kappa' && dim.key === 'aiScore') val = 10;
        else if (pId === 'medallion-lakehouse' && dim.key === 'aiScore') val = 10;

        const { x, y } = getCoordinates(idx, val);
        return `${x},${y}`;
      })
      .join(' ');
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto py-4">
      {/* Header */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/60">
              <Sliders className="h-4 w-4" />
            </span>
            <h1 className="text-2xl font-extrabold text-white">
              Multi-Axis Architectural Tradeoff Radar
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Evaluate and contrast multi-dimensional trade-offs across Cost, Simplicity, Latency, Autonomy, Governance, and AI Readiness.
          </p>
        </div>
      </div>

      {/* Grid: Paradigm Selector Pills vs SVG Radar Graphic */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Paradigm Filter Selector List (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span>Select Paradigms to Compare</span>
          </h3>

          <div className="space-y-2.5">
            {PARADIGMS.map((p) => {
              const isSelected = selectedParadigms.includes(p.id);
              const color = colors[p.id];
              return (
                <div
                  key={p.id}
                  onClick={() => toggleParadigm(p.id)}
                  className={`p-3.5 rounded-2xl cursor-pointer transition-all flex items-center justify-between border ${
                    isSelected
                      ? 'bg-slate-800/90 border-slate-700 shadow-md'
                      : 'bg-slate-950/60 border-slate-900 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-3.5 h-3.5 rounded-full"
                      style={{ backgroundColor: color, boxShadow: isSelected ? `0 0 12px ${color}` : 'none' }}
                    />
                    <div>
                      <span className="font-bold text-xs text-slate-100 block">{p.name}</span>
                      <span className="text-[10px] text-slate-400 block font-mono">TCO: {p.tcoScore}/10 | Scale: {p.scalabilityScore}/10</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${isSelected ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' : 'text-slate-500'}`}>
                    {isSelected ? 'Active' : 'Add'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* SVG Radar Chart Graphic (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl glass-panel border border-slate-800 flex flex-col items-center justify-center relative min-h-[400px]">
          <svg width="320" height="320" className="overflow-visible">
            {/* Grid Concentric Webs (Levels 2, 4, 6, 8, 10) */}
            {[2, 4, 6, 8, 10].map((level) => {
              const points = dimensions
                .map((_, idx) => {
                  const { x, y } = getCoordinates(idx, level);
                  return `${x},${y}`;
                })
                .join(' ');
              return (
                <polygon
                  key={level}
                  points={points}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="1"
                  strokeDasharray={level === 10 ? 'none' : '3,3'}
                />
              );
            })}

            {/* Radar Spoke Lines */}
            {dimensions.map((dim, idx) => {
              const { x, y } = getCoordinates(idx, 10);
              return (
                <line
                  key={idx}
                  x1={center}
                  y1={center}
                  x2={x}
                  y2={y}
                  stroke="rgba(255, 255, 255, 0.12)"
                  strokeWidth="1"
                />
              );
            })}

            {/* Selected Paradigm Polygons */}
            {selectedParadigms.map((pId) => {
              const points = getPolygonPoints(pId);
              const color = colors[pId];
              return (
                <g key={pId}>
                  <polygon
                    points={points}
                    fill={color}
                    fillOpacity="0.25"
                    stroke={color}
                    strokeWidth="2.5"
                    className="transition-all duration-500"
                  />
                  {dimensions.map((dim, idx) => {
                    const paradigm = PARADIGMS.find((p) => p.id === pId);
                    if (!paradigm) return null;
                    let val = 7;
                    if (dim.key === 'tcoScore') val = paradigm.tcoScore;
                    else if (dim.key === 'complexityScore') val = 11 - paradigm.complexityScore;
                    else if (dim.key === 'scalabilityScore') val = paradigm.scalabilityScore;
                    else if (dim.key === 'governanceMaturityRequired') val = paradigm.governanceMaturityRequired;

                    const { x, y } = getCoordinates(idx, val);
                    return (
                      <circle
                        key={idx}
                        cx={x}
                        cy={y}
                        r="4"
                        fill={color}
                        stroke="#090d16"
                        strokeWidth="1.5"
                      />
                    );
                  })}
                </g>
              );
            })}

            {/* Axis Label Texts */}
            {dimensions.map((dim, idx) => {
              const { x, y } = getCoordinates(idx, 12);
              const isLeft = x < center;
              const textAnchor = Math.abs(x - center) < 15 ? 'middle' : isLeft ? 'end' : 'start';

              return (
                <text
                  key={idx}
                  x={x}
                  y={y}
                  fill="#94a3b8"
                  fontSize="10"
                  fontWeight="600"
                  textAnchor={textAnchor}
                  dominantBaseline="middle"
                  className="font-mono"
                >
                  {dim.label}
                </text>
              );
            })}
          </svg>

          {/* Chart Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 pt-4 border-t border-slate-800/80 text-xs">
            {selectedParadigms.map((pId) => {
              const paradigm = PARADIGMS.find((p) => p.id === pId);
              if (!paradigm) return null;
              return (
                <div key={pId} className="flex items-center space-x-1.5 font-semibold text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colors[pId] }} />
                  <span>{paradigm.name.split(' ')[0]} {paradigm.name.split(' ')[1]}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
