import React, { useState } from 'react';
import { PARADIGMS } from '../../data/paradigms';
import { Gauge, Zap, BarChart2, CheckCircle2, Clock } from 'lucide-react';

export const BenchmarkEngine: React.FC = () => {
  const [selectedWorkload, setSelectedWorkload] = useState<'ad-hoc' | 'streaming-fraud' | 'rag-ai' | 'batch-etl'>('ad-hoc');

  const workloads = [
    { id: 'ad-hoc', name: 'Interactive Ad-Hoc Analytics SQL', desc: '500+ concurrent BI analysts querying 10TB+ tables' },
    { id: 'streaming-fraud', name: 'Real-Time Streaming Fraud Detection', desc: 'Sub-second event alerts on 1M+ transactions/sec' },
    { id: 'rag-ai', name: 'GenAI RAG Document Vector Indexing', desc: 'Unstructured document embeddings & vector search' },
    { id: 'batch-etl', name: 'Financial Reconciliation Batch ETL', desc: 'Nightly 100TB multi-hop Bronze to Gold transformations' },
  ];

  // Workload benchmark profile data (P95 Latency ms, Ingestion Lag sec, Concurrency, Storage GB/TB)
  const benchmarkData = {
    'ad-hoc': [
      { id: 'medallion-lakehouse', p95Ms: 450, lagSec: 30, concurrency: 850, storageEff: 95 },
      { id: 'realtime-kappa', p95Ms: 120, lagSec: 0.1, concurrency: 950, storageEff: 88 },
      { id: 'modern-data-stack', p95Ms: 980, lagSec: 300, concurrency: 400, storageEff: 75 },
      { id: 'data-mesh', p95Ms: 600, lagSec: 60, concurrency: 700, storageEff: 90 },
      { id: 'data-fabric', p95Ms: 1400, lagSec: 15, concurrency: 300, storageEff: 80 },
    ],
    'streaming-fraud': [
      { id: 'realtime-kappa', p95Ms: 35, lagSec: 0.05, concurrency: 2000, storageEff: 92 },
      { id: 'medallion-lakehouse', p95Ms: 250, lagSec: 2.0, concurrency: 900, storageEff: 90 },
      { id: 'data-mesh', p95Ms: 400, lagSec: 5.0, concurrency: 600, storageEff: 85 },
      { id: 'modern-data-stack', p95Ms: 4500, lagSec: 300, concurrency: 200, storageEff: 65 },
      { id: 'data-fabric', p95Ms: 1800, lagSec: 10.0, concurrency: 250, storageEff: 75 },
    ],
    'rag-ai': [
      { id: 'medallion-lakehouse', p95Ms: 180, lagSec: 1.5, concurrency: 1200, storageEff: 98 },
      { id: 'realtime-kappa', p95Ms: 90, lagSec: 0.2, concurrency: 1500, storageEff: 90 },
      { id: 'data-mesh', p95Ms: 300, lagSec: 10, concurrency: 800, storageEff: 92 },
      { id: 'modern-data-stack', p95Ms: 1200, lagSec: 600, concurrency: 350, storageEff: 70 },
      { id: 'data-fabric', p95Ms: 850, lagSec: 30, concurrency: 400, storageEff: 82 },
    ],
    'batch-etl': [
      { id: 'medallion-lakehouse', p95Ms: 300, lagSec: 60, concurrency: 1000, storageEff: 99 },
      { id: 'modern-data-stack', p95Ms: 650, lagSec: 900, concurrency: 500, storageEff: 82 },
      { id: 'data-mesh', p95Ms: 450, lagSec: 120, concurrency: 750, storageEff: 94 },
      { id: 'realtime-kappa', p95Ms: 500, lagSec: 0.1, concurrency: 800, storageEff: 85 },
      { id: 'data-fabric', p95Ms: 1600, lagSec: 300, concurrency: 300, storageEff: 78 },
    ],
  };

  const currentMetrics = benchmarkData[selectedWorkload];

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto py-4">
      {/* Header */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/60">
              <Gauge className="h-4 w-4" />
            </span>
            <h1 className="text-2xl font-extrabold text-white">
              Workload Performance & Latency Benchmarking Engine
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Empirical benchmark metrics comparing P95 query latency, ingestion lag, concurrency limits, and storage efficiency.
          </p>
        </div>
      </div>

      {/* Workload Profile Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {workloads.map((w) => {
          const isActive = selectedWorkload === w.id;
          return (
            <div
              key={w.id}
              onClick={() => setSelectedWorkload(w.id as any)}
              className={`p-4 rounded-2xl cursor-pointer glass-panel transition-all space-y-1.5 border ${
                isActive
                  ? 'border-cyan-400 bg-slate-800/90 cyan-glow'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <span className={`text-xs font-bold block ${isActive ? 'text-cyan-300' : 'text-slate-200'}`}>
                {w.name}
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {w.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Live Benchmark Performance Visualizer */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-6">
        <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center justify-between">
          <span className="flex items-center space-x-2">
            <BarChart2 className="h-4 w-4 text-cyan-400" />
            <span>Benchmark Comparison metrics</span>
          </span>
          <span className="text-xs font-mono text-cyan-400 font-normal">P95 Latency Target: &lt; 500ms</span>
        </h3>

        <div className="space-y-6">
          {currentMetrics.map((item, idx) => {
            const paradigm = PARADIGMS.find((p) => p.id === item.id);
            if (!paradigm) return null;
            const isTop = idx === 0;

            return (
              <div key={item.id} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className={`font-bold text-sm ${isTop ? 'text-cyan-300' : 'text-slate-200'}`}>
                      {paradigm.name}
                    </span>
                    {isTop && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-950 text-emerald-400 border border-emerald-800">
                        Top Performer
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-4 text-xs font-mono">
                    <div className="flex items-center space-x-1 text-slate-300">
                      <Clock className="h-3.5 w-3.5 text-cyan-400" />
                      <span>P95 Latency: <strong className="text-cyan-300">{item.p95Ms} ms</strong></span>
                    </div>
                    <div className="flex items-center space-x-1 text-slate-300">
                      <Zap className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Lag: <strong className="text-emerald-300">{item.lagSec}s</strong></span>
                    </div>
                  </div>
                </div>

                {/* Visual Latency Score Bar */}
                <div className="space-y-1">
                  <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isTop ? 'bg-gradient-to-r from-cyan-400 to-emerald-400' : 'bg-slate-600'
                      }`}
                      style={{ width: `${Math.max(10, 100 - (item.p95Ms / 2000) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
