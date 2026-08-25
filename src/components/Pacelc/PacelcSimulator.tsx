import React, { useState } from 'react';
import { Sliders, ShieldCheck, CheckCircle2, AlertTriangle, Zap, Server } from 'lucide-react';
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
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto py-4">
      {/* Header */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/60">
              <Sliders className="h-4 w-4" />
            </span>
            <h1 className="text-2xl font-extrabold text-white">
              PACELC Theorem Interactive Tradeoff Engine
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Evaluate PACELC guarantees (If Partitioned: Availability vs Consistency; Else: Latency vs Consistency) across distributed data stores.
          </p>
        </div>
      </div>

      {/* Grid: Controls (5 cols) vs Evaluation (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Priority Selector (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl glass-panel border border-slate-800 space-y-6">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
            PACELC Tradeoff Requirements
          </h3>

          {/* Condition 1: Under Network Partition (P) */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-cyan-400 uppercase tracking-wider">
              If Network Partition Occurs (P):
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setPartitionPriority('availability');
                }}
                className={`p-3 rounded-xl border font-bold transition-all ${
                  partitionPriority === 'availability'
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                    : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                High Availability (PA)
              </button>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setPartitionPriority('consistency');
                }}
                className={`p-3 rounded-xl border font-bold transition-all ${
                  partitionPriority === 'consistency'
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                    : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                Strict Consistency (PC)
              </button>
            </div>
          </div>

          {/* Condition 2: Normal Operations (E) */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Else Normal Execution (E):
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setNormalPriority('latency');
                }}
                className={`p-3 rounded-xl border font-bold transition-all ${
                  normalPriority === 'latency'
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
                    : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                Low Latency (EL)
              </button>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setNormalPriority('consistency');
                }}
                className={`p-3 rounded-xl border font-bold transition-all ${
                  normalPriority === 'consistency'
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
                    : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                Strong Consistency (EC)
              </button>
            </div>
          </div>
        </div>

        {/* Engine Match Results (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center justify-between">
            <span>Engine Alignment Matrix</span>
            <span className="font-mono text-xs font-bold text-cyan-400">Target PACELC: P{partitionPriority.charAt(0).toUpperCase()} / E{normalPriority.charAt(0).toUpperCase()}</span>
          </h3>

          <div className="space-y-3">
            {engineProfiles.map((engine, idx) => {
              const targetCode = `P${partitionPriority.charAt(0).toUpperCase()}/E${normalPriority.charAt(0).toUpperCase()}`;
              const isMatched = engine.pacelc.includes(targetCode.substring(0, 2)) || engine.pacelc.includes(targetCode.substring(3));

              return (
                <div key={idx} className={`p-4 rounded-2xl border transition-all space-y-1 ${
                  isMatched ? 'bg-slate-900 border-cyan-500/50 shadow-md' : 'bg-slate-950/60 border-slate-900 opacity-60'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-100">{engine.name}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                      isMatched ? 'bg-cyan-950 text-cyan-300 border-cyan-700' : 'bg-slate-900 text-slate-500 border-slate-800'
                    }`}>
                      {engine.pacelc}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
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
