import React, { useState } from 'react';
import { RefreshCw, Clock, AlertTriangle, Layers, Calendar, CheckCircle2, Sparkles } from 'lucide-react';
import { soundEngine } from '../../utils/soundUtils';

export const MigrationEstimator: React.FC = () => {
  const [sourcePlatform, setSourcePlatform] = useState<'hadoop' | 'teradata' | 'oracle' | 'legacy-sql'>('hadoop');
  const [dataVolumeTb, setDataVolumeTb] = useState<number>(500);
  const [pipelineCount, setPipelineCount] = useState<number>(150);

  // Dynamic Migration Effort Calculation
  const difficultyMultiplier = sourcePlatform === 'teradata' ? 1.4 : sourcePlatform === 'oracle' ? 1.3 : sourcePlatform === 'hadoop' ? 1.2 : 1.0;
  const totalPersonMonths = Math.round((pipelineCount * 0.15 + (dataVolumeTb / 100) * 1.2) * difficultyMultiplier);
  const estimatedTimelineMonths = Math.round(totalPersonMonths / 4);
  const riskIndex = Math.min(100, Math.round(30 + pipelineCount * 0.3 + (dataVolumeTb / 50)));

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto py-2">
      
      {/* Header Banner */}
      <div className="p-8 rounded-3xl glass-panel border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-cyan-950/90 text-cyan-300 border border-cyan-500/40 shadow-inner">
              <RefreshCw className="h-5 w-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Legacy Data Platform Migration Effort Estimator
            </h1>
          </div>
          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
            Estimate engineering effort (person-months), risk index score, and execution timeline when migrating legacy monoliths to Lakehouse / Data Mesh architecture.
          </p>
        </div>

        {/* Telemetry Badge */}
        <div className="flex items-center space-x-4 bg-slate-950/90 p-4 rounded-3xl border border-cyan-500/30 cyan-glow shadow-2xl shrink-0 relative z-10">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">Est. Engineering Effort</span>
            <span className="font-mono text-base font-black text-cyan-300">{totalPersonMonths} Person-Months</span>
          </div>
        </div>
      </div>

      {/* Grid: Controls Sliders (5 cols) vs Estimation Roadmap (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controls Panel */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800/80 space-y-6">
          <h3 className="text-sm font-extrabold text-white border-b border-slate-800/80 pb-4 flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span>Legacy Source Platform Specs</span>
          </h3>

          {/* Source Platform Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-mono font-bold text-cyan-400 uppercase">Legacy Source Platform</label>
            <select
              value={sourcePlatform}
              onChange={(e) => {
                soundEngine.playClick();
                setSourcePlatform(e.target.value as any);
              }}
              className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500/60 shadow-inner"
            >
              <option value="hadoop">Hadoop HDFS / MapReduce / Hive</option>
              <option value="teradata">Teradata Enterprise Data Warehouse</option>
              <option value="oracle">Oracle Exadata / PL-SQL Monolith</option>
              <option value="legacy-sql">Legacy On-Prem SQL Server ETL</option>
            </select>
          </div>

          {/* Slider 1: Data Volume */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-slate-300">Historical Data Footprint</span>
              <span className="font-mono font-black text-cyan-300">{dataVolumeTb.toLocaleString()} TB ({Math.round(dataVolumeTb / 1000 * 10) / 10} PB)</span>
            </div>
            <input
              type="range"
              min="50"
              max="5000"
              step="50"
              value={dataVolumeTb}
              onChange={(e) => setDataVolumeTb(Number(e.target.value))}
              className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400 border border-slate-800"
            />
          </div>

          {/* Slider 2: Pipeline Count */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-slate-300">ETL / Stored Procedure Pipelines</span>
              <span className="font-mono font-black text-cyan-300">{pipelineCount} Pipelines</span>
            </div>
            <input
              type="range"
              min="20"
              max="1000"
              step="10"
              value={pipelineCount}
              onChange={(e) => setPipelineCount(Number(e.target.value))}
              className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400 border border-slate-800"
            />
          </div>
        </div>

        {/* Estimation Output & Roadmap (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800/80 space-y-6 shadow-2xl">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-4 rounded-2xl glass-card">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block mb-1">Total Effort</span>
              <span className="font-mono text-sm sm:text-base font-black text-cyan-300">{totalPersonMonths} Person-Mo</span>
            </div>
            <div className="p-4 rounded-2xl glass-card">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block mb-1">Est. Duration</span>
              <span className="font-mono text-sm sm:text-base font-black text-emerald-400">{estimatedTimelineMonths} Months</span>
            </div>
            <div className="p-4 rounded-2xl glass-card">
              <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block mb-1">Risk Index</span>
              <span className="font-mono text-sm sm:text-base font-black text-amber-400">{riskIndex} / 100</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">4-Phase Migration Execution Roadmap</h4>
            
            <div className="space-y-2.5 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start space-x-3">
                <span className="font-mono font-black text-cyan-400 text-sm">1.</span>
                <span><strong className="text-slate-100">Discovery & Automated Translation:</strong> Parse legacy stored procedures into modular SQL / dbt transformations.</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start space-x-3">
                <span className="font-mono font-black text-cyan-400 text-sm">2.</span>
                <span><strong className="text-slate-100">Historical Backfill:</strong> Dual-run CDC replication and initial historical snapshot load into Bronze storage.</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start space-x-3">
                <span className="font-mono font-black text-cyan-400 text-sm">3.</span>
                <span><strong className="text-slate-100">Parallel Validation Run:</strong> Dual-query result reconciliation between legacy DW and target lakehouse.</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start space-x-3">
                <span className="font-mono font-black text-cyan-400 text-sm">4.</span>
                <span><strong className="text-slate-100">Final Cutover:</strong> Decommission legacy compute nodes and freeze legacy software licenses.</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
