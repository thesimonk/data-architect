import React, { useState } from 'react';
import { BLUEPRINT_LAYERS } from '../../data/blueprintLayers';
import { LayerComponent } from '../../types/architecture';
import { ComponentDetailModal } from '../Blueprint/ComponentDetailModal';
import { Layers, Zap, Play, Pause, ArrowRight, Activity, Cpu } from 'lucide-react';

export const PipelineNodeCanvas: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<LayerComponent | null>(null);
  const [streamVelocity, setStreamVelocity] = useState<number>(5); // 1 to 10
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Define canvas layer nodes
  const nodes = BLUEPRINT_LAYERS.map((layer, idx) => ({
    id: layer.id,
    name: layer.shortName,
    fullName: layer.name,
    order: layer.order,
    comp: layer.components[0],
    x: 80 + idx * 165,
    y: idx % 2 === 0 ? 120 : 200,
  }));

  // Generate SVG Bezier curve path string between two node coordinates
  const createBezierPath = (x1: number, y1: number, x2: number, y2: number) => {
    const dx = x2 - x1;
    const cx1 = x1 + dx * 0.5;
    const cy1 = y1;
    const cx2 = x1 + dx * 0.5;
    const cy2 = y2;
    return `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto py-4">
      {/* Canvas Header */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/60">
              <Activity className="h-4 w-4" />
            </span>
            <h1 className="text-2xl font-extrabold text-white">
              Interactive SVG Pipeline Cable Canvas
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Visual SVG Bezier cable graph mapping data stream velocity across all 7 architecture layers. Adjust throughput speed in real time.
          </p>
        </div>

        {/* Speed Slider & Pause Toggle */}
        <div className="flex items-center space-x-4 bg-slate-900/90 p-3 rounded-2xl border border-slate-800 text-xs">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 transition-all"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 text-emerald-400" />}
          </button>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Throughput Velocity:</span>
              <span className="font-mono text-cyan-400 font-bold">{(streamVelocity * 250).toLocaleString()}k msgs/sec</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={streamVelocity}
              onChange={(e) => setStreamVelocity(Number(e.target.value))}
              className="w-36 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* SVG Bezier Node Canvas Box */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-800 relative overflow-x-auto min-h-[380px] bg-slate-950/90">
        <svg width="1180" height="320" className="overflow-visible">
          <defs>
            <linearGradient id="cableGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
            </linearGradient>

            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* SVG Bezier Connection Cables */}
          {nodes.map((node, idx) => {
            if (idx === nodes.length - 1) return null;
            const nextNode = nodes[idx + 1];
            const pathD = createBezierPath(node.x + 60, node.y + 20, nextNode.x - 60, nextNode.y + 20);

            return (
              <g key={node.id}>
                {/* Background Shadow Cable */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                {/* Active Animated Cable */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="url(#cableGradient)"
                  strokeWidth="2.5"
                  strokeDasharray="8 6"
                  className={isPlaying ? 'animate-pulse' : ''}
                />

                {/* Animated Particles flowing on Cable */}
                {isPlaying && (
                  <circle r="4" fill="#00f0ff" filter="url(#glow)">
                    <animateMotion
                      path={pathD}
                      dur={`${11 - streamVelocity}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </g>
            );
          })}

          {/* Nodes Rendering */}
          {nodes.map((node) => (
            <g
              key={node.id}
              transform={`translate(${node.x - 60}, ${node.y - 25})`}
              onClick={() => setSelectedComponent(node.comp)}
              className="cursor-pointer group"
            >
              {/* Node Card Rectangle */}
              <rect
                width="120"
                height="70"
                rx="14"
                fill="#0f172a"
                stroke="rgba(56, 189, 248, 0.3)"
                strokeWidth="1.5"
                className="group-hover:stroke-cyan-400 group-hover:fill-slate-800 transition-all duration-300"
              />

              {/* Node Title & Layer Badge */}
              <text x="60" y="24" fill="#00f0ff" fontSize="10" fontWeight="bold" textAnchor="middle" className="font-mono uppercase tracking-wider">
                Layer {node.order}
              </text>
              <text x="60" y="42" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle">
                {node.name}
              </text>
              <text x="60" y="56" fill="#64748b" fontSize="9" textAnchor="middle">
                {node.comp.techOptions.openSource[0] || node.comp.name.split(' ')[0]}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Detail Drawer Modal */}
      <ComponentDetailModal
        component={selectedComponent}
        onClose={() => setSelectedComponent(null)}
      />
    </div>
  );
};
