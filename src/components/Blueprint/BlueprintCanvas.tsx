import React, { useState } from 'react';
import { BLUEPRINT_LAYERS } from '../../data/blueprintLayers';
import { LayerComponent, ParadigmId } from '../../types/architecture';
import { LayerNode } from './LayerNode';
import { ComponentDetailModal } from './ComponentDetailModal';
import { soundEngine } from '../../utils/soundUtils';
import { 
  ArrowRight, 
  Layers, 
  Filter, 
  Zap, 
  Database, 
  Cpu, 
  Server, 
  BrainCircuit, 
  Shield, 
  BarChart3,
  Play,
  Pause,
  Sparkles,
  Activity
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  ArrowRightCircle: Zap,
  Database,
  Cpu,
  Server,
  BrainCircuit,
  Shield,
  BarChart3,
};

export const BlueprintCanvas: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<LayerComponent | null>(null);
  const [selectedParadigmFilter, setSelectedParadigmFilter] = useState<ParadigmId | 'all'>('all');
  const [isSimulatingStream, setIsSimulatingStream] = useState<boolean>(true);

  const paradigms = [
    { id: 'all', label: 'All Architectures' },
    { id: 'medallion-lakehouse', label: 'Medallion Lakehouse' },
    { id: 'data-mesh', label: 'Data Mesh' },
    { id: 'realtime-kappa', label: 'Streaming Kappa' },
    { id: 'modern-data-stack', label: 'Modern Data Stack' },
    { id: 'sovereign-hybrid', label: 'Sovereign Hybrid' },
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto py-2">
      
      {/* Canvas Header Banner & Interactive Stream Controls */}
      <div className="p-8 rounded-3xl glass-panel border border-slate-800/80 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-cyan-950/90 text-cyan-300 border border-cyan-500/40 shadow-inner">
              <Layers className="h-5 w-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              7-Tier Enterprise Blueprint Canvas
            </h1>
          </div>
          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
            End-to-end architecture breakdown across 7 enterprise stack layers. Click any component to inspect tech specifications, cloud vendor mappings, and integration code snippets.
          </p>
        </div>

        {/* Action Stream Flow Simulation Toggle */}
        <div className="flex items-center space-x-3 shrink-0 relative z-10">
          <button
            onClick={() => {
              soundEngine.playClick();
              setIsSimulatingStream(!isSimulatingStream);
            }}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all border shadow-lg ${
              isSimulatingStream
                ? 'bg-cyan-950/90 text-cyan-300 border-cyan-500/50 cyan-glow'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {isSimulatingStream ? <Pause className="h-4 w-4 text-cyan-400" /> : <Play className="h-4 w-4 text-emerald-400" />}
            <span>{isSimulatingStream ? 'Stream Simulation Active' : 'Simulate Data Stream'}</span>
          </button>
        </div>
      </div>

      {/* Paradigm Filter Pills */}
      <div className="flex items-center space-x-2 p-2.5 rounded-2xl glass-panel border border-slate-800/80 overflow-x-auto text-xs scrollbar-none">
        <Filter className="h-4 w-4 text-cyan-400 ml-3 shrink-0" />
        <span className="text-slate-400 font-mono font-bold shrink-0 mr-2 text-[11px] uppercase tracking-wider">
          Filter Paradigm:
        </span>
        {paradigms.map((p) => {
          const isActive = selectedParadigmFilter === p.id;
          return (
            <button
              key={p.id}
              onClick={() => {
                soundEngine.playClick();
                setSelectedParadigmFilter(p.id as ParadigmId | 'all');
              }}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all shrink-0 whitespace-nowrap text-xs ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg cyan-glow scale-105'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      {/* Animated Stream Flow Particle Line */}
      <div className="hidden lg:flex items-center justify-between px-8 py-4 rounded-2xl glass-panel border border-slate-800/80 text-xs text-slate-400 relative overflow-hidden">
        {isSimulatingStream && (
          <div className="animate-particle-flow" />
        )}

        {BLUEPRINT_LAYERS.map((layer, idx) => (
          <React.Fragment key={layer.id}>
            <div className="flex items-center space-x-2 font-mono text-[11px] text-cyan-300 z-10">
              <span className="w-6 h-6 rounded-full bg-cyan-950 text-cyan-300 flex items-center justify-center font-bold text-[10px] border border-cyan-500/50 shadow-inner">
                {idx + 1}
              </span>
              <span className="font-extrabold text-slate-200">{layer.shortName}</span>
            </div>
            {idx < BLUEPRINT_LAYERS.length - 1 && (
              <div className="flex items-center text-slate-600 animate-pulse z-10">
                <ArrowRight className="h-4 w-4 text-cyan-500/60" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* 7 Pipeline Layers Grid */}
      <div className="space-y-6">
        {BLUEPRINT_LAYERS.map((layer) => {
          const IconComp = ICON_MAP[layer.iconName] || Layers;
          
          return (
            <div 
              key={layer.id}
              className="p-6 rounded-3xl glass-panel border border-slate-800/80 space-y-5 relative overflow-hidden"
            >
              {/* Layer Header */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-cyan-400 shadow-inner">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white tracking-tight">
                      {layer.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {layer.description}
                    </p>
                  </div>
                </div>

                <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-950 text-cyan-400 border border-slate-800">
                  <Sparkles className="h-3 w-3 text-cyan-400 mr-1.5" />
                  Layer {layer.order} of 7
                </span>
              </div>

              {/* Components Cards Bento Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {layer.components.map((comp) => (
                  <LayerNode
                    key={comp.id}
                    component={comp}
                    onClick={() => setSelectedComponent(comp)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Spec Detail Modal */}
      <ComponentDetailModal
        component={selectedComponent}
        onClose={() => setSelectedComponent(null)}
      />
    </div>
  );
};
