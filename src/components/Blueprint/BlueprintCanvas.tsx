import React, { useState } from 'react';
import { BLUEPRINT_LAYERS } from '../../data/blueprintLayers';
import { LayerComponent, ParadigmId } from '../../types/architecture';
import { LayerNode } from './LayerNode';
import { ComponentDetailModal } from './ComponentDetailModal';
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
  Sparkles
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
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto py-4">
      
      {/* Canvas Header & Interactive Controls */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/60">
              <Layers className="h-4 w-4" />
            </span>
            <h1 className="text-2xl font-extrabold text-white">
              7-Tier Enterprise Data Blueprint Canvas
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Interactive visual architecture mapping end-to-end data flow. Filter components by architectural paradigm or simulate continuous stream velocity.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Data Stream Simulation Toggle */}
          <button
            onClick={() => setIsSimulatingStream(!isSimulatingStream)}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              isSimulatingStream
                ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/50 cyan-glow'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {isSimulatingStream ? <Pause className="h-3.5 w-3.5 text-cyan-400" /> : <Play className="h-3.5 w-3.5 text-emerald-400" />}
            <span>{isSimulatingStream ? 'Pause Stream Flow' : 'Simulate Data Stream'}</span>
          </button>
        </div>
      </div>

      {/* Paradigm Filter Selector Bar */}
      <div className="flex items-center space-x-2 p-2 rounded-2xl glass-panel border border-slate-800 overflow-x-auto text-xs scrollbar-none">
        <Filter className="h-3.5 w-3.5 text-slate-400 ml-3 shrink-0" />
        <span className="text-slate-400 font-semibold shrink-0 mr-1">Highlight Paradigm:</span>
        {paradigms.map((p) => {
          const isActive = selectedParadigmFilter === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedParadigmFilter(p.id as ParadigmId | 'all')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all shrink-0 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      {/* Animated Pipeline Flow Connector Bar */}
      <div className="hidden lg:flex items-center justify-between px-6 py-3 rounded-2xl glass-panel border border-slate-800 text-xs text-slate-400 relative overflow-hidden">
        {isSimulatingStream && (
          <div className="animate-particle-flow" />
        )}

        {BLUEPRINT_LAYERS.map((layer, idx) => (
          <React.Fragment key={layer.id}>
            <div className="flex items-center space-x-2 font-mono text-[11px] text-cyan-300 z-10">
              <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold text-[10px] border border-cyan-700">
                {idx + 1}
              </span>
              <span>{layer.shortName}</span>
            </div>
            {idx < BLUEPRINT_LAYERS.length - 1 && (
              <div className="flex items-center text-slate-600 animate-pulse z-10">
                <ArrowRight className="h-4 w-4" />
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
              className="p-6 rounded-3xl glass-panel border border-slate-800/80 space-y-4 relative overflow-hidden"
            >
              {/* Layer Header */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-cyan-400">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white">
                      {layer.name}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {layer.description}
                    </p>
                  </div>
                </div>

                <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono bg-slate-900 text-slate-400 border border-slate-800">
                  <Sparkles className="h-3 w-3 text-cyan-400 mr-1" />
                  Layer {layer.order} of 7
                </span>
              </div>

              {/* Components Cards Grid inside Layer */}
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

      {/* Interactive Detail Modal Drawer */}
      <ComponentDetailModal
        component={selectedComponent}
        onClose={() => setSelectedComponent(null)}
      />
    </div>
  );
};
