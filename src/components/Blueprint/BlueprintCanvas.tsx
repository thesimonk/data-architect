import React, { useState } from 'react';
import { BLUEPRINT_LAYERS } from '../../data/blueprintLayers';
import { LayerComponent } from '../../types/architecture';
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
  const [stackFilter, setStackFilter] = useState<'all' | 'oss' | 'cloud' | 'saas'>('all');

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto py-4">
      
      {/* Canvas Header & Filter Controls */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
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
            Interactive pipeline mapping data flow from Ingestion to Governance and Consumption. Click any block for spec details & anti-patterns.
          </p>
        </div>

        {/* Stack Filter Pills */}
        <div className="flex items-center space-x-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 text-xs">
          <Filter className="h-3.5 w-3.5 text-slate-400 ml-2" />
          <button
            onClick={() => setStackFilter('all')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              stackFilter === 'all' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Tech Stack
          </button>
          <button
            onClick={() => setStackFilter('oss')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              stackFilter === 'oss' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Open Source Core
          </button>
          <button
            onClick={() => setStackFilter('cloud')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              stackFilter === 'cloud' ? 'bg-blue-500 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Cloud Native
          </button>
        </div>
      </div>

      {/* Animated Pipeline Flow Connector Bar */}
      <div className="hidden lg:flex items-center justify-between px-6 py-3 rounded-2xl glass-panel border border-slate-800 text-xs text-slate-400 overflow-x-auto">
        {BLUEPRINT_LAYERS.map((layer, idx) => (
          <React.Fragment key={layer.id}>
            <div className="flex items-center space-x-2 font-mono text-[11px] text-cyan-300">
              <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold text-[10px] border border-cyan-700">
                {idx + 1}
              </span>
              <span>{layer.shortName}</span>
            </div>
            {idx < BLUEPRINT_LAYERS.length - 1 && (
              <div className="flex items-center text-slate-600 animate-pulse">
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
