import React, { useState } from 'react';
import { Sliders, ShieldCheck, CheckCircle2, AlertTriangle, Zap, Server, Sparkles } from 'lucide-react';
import { soundEngine } from '../../utils/soundUtils';

export const PacelcSimulator: React.FC = () => {
  const [normalPriority, setNormalPriority] = useState<'latency' | 'consistency'>('latency');
  const [partitionPriority, setPartitionPriority] = useState<'availability' | 'consistency'>('availability');

  const engineProfiles = [
    { name: 'Apache Iceberg (REST Catalog)', pacelc: 'PC/EC', desc: 'Prioritizes Strong Consistency during network partitions (PC) and Consistent read snapshots during normal operations (EC).' },
    { name: 'ClickHouse OLAP Cluster', pacelc: 'PA/EL', desc: 'Prioritizes High Availability during network partitions (PA) and Sub-second Latency during normal operations (EL).' },
    { name: 'Trino Query Engine', pacelc: 'PA/EL', desc: 'Federated query engine prioritizing low query latency and high availability over strong immediate write consistency.' },
    { name: 'Apache Cassandra / ScyllaDB', pacelc: 'PA/EL (Configurable)', desc: 'Tunable consistency level (QUORUM vs LOCAL_ONE) for AP/CP trade-offs.' },
    { name: 'Snowflake Cloud Warehouse', pacelc: 'PC/EC', desc: 'Managed ACID data warehouse ensuring strict transactional consistency.' },
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto py-2">
      
      {/* Header Banner */}
      <div className="p-8 rounded-3xl glass-panel border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-cyan-950/90 text-cyan-300 border border-cyan-500/40 shadow-inner">
              <Sliders className="h-5 w-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              PACELC Theorem Interactive Tradeoff Engine
            </h1>
          </div>
          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
            Evaluate PACELC guarantees (If Partitioned: Availability vs Consistency; Else: Latency vs Consistency) across distributed data engines.
          </p>
        </div>
      </div>

      {/* Grid: Tradeoff Controls vs Alignment Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Tradeoff Controls (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800/80 space-y-6">
          <h3 className="text-sm font-extrabold text-white border-b border-slate-800/80 pb-4 flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span>PACELC Tradeoff Parameters</span>
          </h3>

          {/* Condition 1: Under Network Partition (P) */}
          <div className="space-y-3">
            <label className="block text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              If Network Partition Occurs (P):
            </label>
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setPartitionPriority('availability');
                }}
                className={`p-4 rounded-2xl border font-bold transition-all ${
                  partitionPriority === 'availability'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-400 shadow-lg cyan-glow scale-[1.02]'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                High Availability (PA)
              </button>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setPartitionPriority('consistency');
                }}
                className={`p-4 rounded-2xl border font-bold transition-all ${
                  partitionPriority === 'consistency'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-400 shadow-lg cyan-glow scale-[1.02]'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Strict Consistency (PC)
              </button>
            </div>
          </div>

          {/* Condition 2: Normal Execution (E) */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              Else Normal Execution (E):
            </label>
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setNormalPriority('latency');
                }}
                className={`p-4 rounded-2xl border font-bold transition-all ${
                  normalPriority === 'latency'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-400 shadow-lg emerald-glow scale-[1.02]'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Low Latency (EL)
              </button>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setNormalPriority('consistency');
                }}
                className={`p-4 rounded-2xl border font-bold transition-all ${
                  normalPriority === 'consistency'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-400 shadow-lg emerald-glow scale-[1.02]'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Strong Consistency (EC)
              </button>
            </div>
          </div>
        </div>

        {/* Engine Match Matrix (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800/80 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <h3 className="text-sm font-extrabold text-white">
              Engine Alignment Matrix
            </h3>
            <span className="font-mono text-xs font-bold text-cyan-300 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800">
              Target PACELC: P{partitionPriority.charAt(0).toUpperCase()} / E{normalPriority.charAt(0).toUpperCase()}
            </span>
          </div>

          <div className="space-y-3">
            {engineProfiles.map((engine, idx) => {
              const targetCode = `P${partitionPriority.charAt(0).toUpperCase()}/E${normalPriority.charAt(0).toUpperCase()}`;
              const isMatched = engine.pacelc.includes(targetCode.substring(0, 2)) || engine.pacelc.includes(targetCode.substring(3));

              return (
                <div key={idx} className={`p-4 rounded-2xl border transition-all duration-300 space-y-1.5 ${
                  isMatched ? 'glass-card border-cyan-500/50 shadow-xl cyan-glow' : 'bg-slate-950/60 border-slate-900 opacity-50'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-white">{engine.name}</span>
                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold border ${
                      isMatched ? 'bg-cyan-950 text-cyan-300 border-cyan-700' : 'bg-slate-900 text-slate-500 border-slate-800'
                    }`}>
                      {engine.pacelc}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {engine.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
