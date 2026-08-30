import React, { useState } from 'react';
import { BLUEPRINT_LAYERS } from '../../data/blueprintLayers';
import { LayerComponent } from '../../types/architecture';
import { ComponentDetailModal } from '../Blueprint/ComponentDetailModal';
import { soundEngine } from '../../utils/soundUtils';
import { Layers, Zap, Play, Pause, Activity, Cpu, Sliders } from 'lucide-react';

export const PipelineNodeCanvas: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<LayerComponent | null>(null);
  const [streamVelocity, setStreamVelocity] = useState<number>(6); // 1 to 10
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Define canvas layer nodes coordinates
  const nodes = BLUEPRINT_LAYERS.map((layer, idx) => ({
    id: layer.id,
    name: layer.shortName,
    fullName: layer.name,
    order: layer.order,
    comp: layer.components[0],
    x: 85 + idx * 165,
    y: idx % 2 === 0 ? 110 : 210,
    latency: `${(idx + 1) * 4.2}ms`,
    throughput: `${((11 - idx) * 1.8).toFixed(1)} GB/s`,
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
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto py-2">
      
      {/* Canvas Header Banner & Speed Controls */}
      <div className="p-8 rounded-3xl glass-panel border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-cyan-950/90 text-cyan-300 border border-cyan-500/40 shadow-inner">
              <Activity className="h-5 w-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Interactive SVG Pipeline Cable Canvas
            </h1>
          </div>
          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
            Real-time visual SVG Bezier cable graph tracing data particle velocity and node latency across all 7 stack layers.
          </p>
        </div>

        {/* Velocity Slider & Pause Toggle */}
        <div className="flex items-center space-x-4 bg-slate-950/90 p-4 rounded-3xl border border-cyan-500/30 cyan-glow shadow-2xl shrink-0 relative z-10">
          <button
            onClick={() => {
              soundEngine.playClick();
              setIsPlaying(!isPlaying);
            }}
            className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 transition-all"
            title={isPlaying ? 'Pause Particle Stream' : 'Resume Particle Stream'}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 text-emerald-400" />}
          </button>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-400 uppercase font-bold">Velocity:</span>
              <span className="font-mono text-cyan-300 font-black">{(streamVelocity * 320).toLocaleString()}k msgs/s</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={streamVelocity}
              onChange={(e) => setStreamVelocity(Number(e.target.value))}
              className="w-40 h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400 border border-slate-800"
            />
          </div>
        </div>
      </div>

      {/* SVG Cable Graph Canvas */}
      <div className="p-8 rounded-3xl glass-panel border border-slate-800/80 relative overflow-x-auto min-h-[420px] bg-slate-950/95 shadow-2xl">
        <svg width="1200" height="340" className="overflow-visible">
          <defs>
            <linearGradient id="cableGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#10b981" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.9" />
            </linearGradient>

            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* SVG Bezier Cables */}
          {nodes.map((node, idx) => {
            if (idx === nodes.length - 1) return null;
            const nextNode = nodes[idx + 1];
            const pathD = createBezierPath(node.x + 65, node.y + 25, nextNode.x - 65, nextNode.y + 25);

            return (
              <g key={node.id}>
                {/* Background Shadow Wire */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.06)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                {/* Active Glowing Cable */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="url(#cableGradient)"
                  strokeWidth="3"
                  strokeDasharray="8 6"
                  className={isPlaying ? 'animate-pulse' : ''}
                />

                {/* Animated Flowing Particles */}
                {isPlaying && (
                  <circle r="5" fill="#00f0ff" filter="url(#glow)">
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

          {/* Nodes Cards Rendering */}
          {nodes.map((node) => (
            <g
              key={node.id}
              transform={`translate(${node.x - 65}, ${node.y - 30})`}
              onClick={() => {
                soundEngine.playClick();
                setSelectedComponent(node.comp);
              }}
              className="cursor-pointer group"
            >
              {/* Card Container */}
              <rect
                width="130"
                height="80"
                rx="16"
                fill="#0b0f19"
                stroke="rgba(56, 189, 248, 0.35)"
                strokeWidth="1.5"
                className="group-hover:stroke-cyan-400 group-hover:fill-slate-900 transition-all duration-300 shadow-xl"
              />

              {/* Title & Badge */}
              <text x="65" y="24" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle" className="font-mono uppercase tracking-widest">
                Layer {node.order}
              </text>
              <text x="65" y="44" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                {node.name}
              </text>
              <text x="65" y="62" fill="#94a3b8" fontSize="9" textAnchor="middle" className="font-mono">
                {node.latency} | {node.throughput}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Component Detail Drawer */}
      <ComponentDetailModal
        component={selectedComponent}
        onClose={() => setSelectedComponent(null)}
      />
    </div>
  );
};
