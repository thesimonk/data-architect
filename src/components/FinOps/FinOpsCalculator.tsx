import React, { useState } from 'react';
import { DollarSign, Calculator, TrendingDown, Layers, Server, HardDrive, Cpu, ShieldCheck, Sparkles } from 'lucide-react';
import { soundEngine } from '../../utils/soundUtils';

export const FinOpsCalculator: React.FC = () => {
  const [ingestionTbPerDay, setIngestionTbPerDay] = useState<number>(10);
  const [queryConcurrency, setQueryConcurrency] = useState<number>(150);
  const [retentionMonths, setRetentionMonths] = useState<number>(24);

  // Dynamic cost model calculations
  const totalStorageTb = ingestionTbPerDay * 30 * retentionMonths;
  const storageCostUsd = Math.round(totalStorageTb * 20); // ~$20 / TB / mo on S3/ADLS
  const computeCostUsd = Math.round(queryConcurrency * 120 + ingestionTbPerDay * 150); // Compute credits
  const ingestionCostUsd = Math.round(ingestionTbPerDay * 30 * 4.5); // Kafka / CDC egress
  const governanceCostUsd = Math.round(1500 + totalStorageTb * 0.5);

  const totalLakehouseCostUsd = storageCostUsd + computeCostUsd + ingestionCostUsd + governanceCostUsd;
  const totalMdsCostUsd = Math.round(totalLakehouseCostUsd * 2.1); // Proprietary warehouse credits scale higher
  const totalDataMeshCostUsd = Math.round(totalLakehouseCostUsd * 1.35); // Self-serve platform overhead
  const totalKappaCostUsd = Math.round(totalLakehouseCostUsd * 1.25); // Streaming state overhead

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto py-2">
      
      {/* Header Banner */}
      <div className="p-8 rounded-3xl glass-panel border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 shadow-inner">
              <Calculator className="h-5 w-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Enterprise FinOps Spend & Scale Simulator
            </h1>
          </div>
          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
            Model petabyte-scale infrastructure TCO (Object Storage, Compute Credits, Network Ingestion, Governance) across architectural paradigms.
          </p>
        </div>

        {/* Total Cost Display Badge */}
        <div className="flex items-center space-x-4 bg-slate-950/90 p-4 rounded-3xl border border-emerald-500/30 emerald-glow shadow-2xl shrink-0 relative z-10">
          <DollarSign className="h-6 w-6 text-emerald-400" />
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">Est. Lakehouse TCO</span>
            <span className="text-xl font-mono font-black text-emerald-400">
              {formatCurrency(totalLakehouseCostUsd)} / mo
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Controls Sliders (5 cols) vs Cost Visualizer (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controls Slider Panel */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800/80 space-y-6">
          <h3 className="text-sm font-extrabold text-white border-b border-slate-800/80 pb-4 flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span>Workload Drivers</span>
          </h3>

          {/* Slider 1: Daily Ingestion Volume */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-slate-300">Daily Ingestion Volume</span>
              <span className="font-mono font-black text-cyan-300">{ingestionTbPerDay} TB / day</span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              step="1"
              value={ingestionTbPerDay}
              onChange={(e) => setIngestionTbPerDay(Number(e.target.value))}
              className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400 border border-slate-800"
            />
            <span className="text-[10px] text-slate-400 block font-mono">
              Cumulative 30-Day Volume: {(ingestionTbPerDay * 30).toLocaleString()} TB
            </span>
          </div>

          {/* Slider 2: Query Concurrency */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-slate-300">Peak Query Concurrency</span>
              <span className="font-mono font-black text-cyan-300">{queryConcurrency} Concurrent Users</span>
            </div>
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={queryConcurrency}
              onChange={(e) => setQueryConcurrency(Number(e.target.value))}
              className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400 border border-slate-800"
            />
          </div>

          {/* Slider 3: Retention Period */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-slate-300">Data Retention Horizon</span>
              <span className="font-mono font-black text-cyan-300">{retentionMonths} Months ({Math.round(retentionMonths / 12 * 10) / 10} yrs)</span>
            </div>
            <input
              type="range"
              min="3"
              max="60"
              step="3"
              value={retentionMonths}
              onChange={(e) => setRetentionMonths(Number(e.target.value))}
              className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400 border border-slate-800"
            />
          </div>

          {/* Cost Category Breakdown Cards */}
          <div className="pt-4 border-t border-slate-800/80 space-y-3">
            <span className="font-mono font-bold text-slate-400 text-[10px] uppercase tracking-wider block">
              Cost Layer Breakdown:
            </span>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl glass-card">
                <span className="text-[10px] text-slate-400 font-mono block mb-0.5">Object Storage</span>
                <span className="font-mono font-bold text-cyan-300 text-sm">{formatCurrency(storageCostUsd)}</span>
              </div>
              <div className="p-3.5 rounded-2xl glass-card">
                <span className="text-[10px] text-slate-400 font-mono block mb-0.5">Compute Engine</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">{formatCurrency(computeCostUsd)}</span>
              </div>
              <div className="p-3.5 rounded-2xl glass-card">
                <span className="text-[10px] text-slate-400 font-mono block mb-0.5">Ingestion & CDC</span>
                <span className="font-mono font-bold text-purple-400 text-sm">{formatCurrency(ingestionCostUsd)}</span>
              </div>
              <div className="p-3.5 rounded-2xl glass-card">
                <span className="text-[10px] text-slate-400 font-mono block mb-0.5">Governance</span>
                <span className="font-mono font-bold text-amber-400 text-sm">{formatCurrency(governanceCostUsd)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Comparative Architecture Spend Visualizer */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800/80 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
              <TrendingDown className="h-4 w-4 text-emerald-400" />
              <span>Comparative Paradigm Spend Breakdown</span>
            </h3>
            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-700/60">
              Lakehouse Saves ~52% vs SaaS DW
            </span>
          </div>

          <div className="space-y-5 pt-2">
            {/* Medallion Lakehouse Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-cyan-300">1. Medallion Lakehouse (Iceberg + S3 + Trino)</span>
                <span className="font-mono font-black text-emerald-400">{formatCurrency(totalLakehouseCostUsd)} / mo</span>
              </div>
              <div className="w-full bg-slate-950 h-4 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500 cyan-glow"
                  style={{ width: '48%' }}
                />
              </div>
            </div>

            {/* Streaming Kappa Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-slate-300">2. Real-Time Streaming Kappa (Kafka + Flink)</span>
                <span className="font-mono font-bold text-slate-300">{formatCurrency(totalKappaCostUsd)} / mo</span>
              </div>
              <div className="w-full bg-slate-950 h-4 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  className="h-full rounded-full bg-slate-600 transition-all duration-500"
                  style={{ width: '60%' }}
                />
              </div>
            </div>

            {/* Data Mesh Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-slate-300">3. Data Mesh (Decentralized Mesh Platform)</span>
                <span className="font-mono font-bold text-slate-300">{formatCurrency(totalDataMeshCostUsd)} / mo</span>
              </div>
              <div className="w-full bg-slate-950 h-4 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  className="h-full rounded-full bg-slate-600 transition-all duration-500"
                  style={{ width: '65%' }}
                />
              </div>
            </div>

            {/* Modern Data Stack Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-slate-300">4. Modern Data Stack (SaaS Cloud DW)</span>
                <span className="font-mono font-bold text-rose-400">{formatCurrency(totalMdsCostUsd)} / mo</span>
              </div>
              <div className="w-full bg-slate-950 h-4 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  className="h-full rounded-full bg-rose-500/80 transition-all duration-500"
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80 text-xs text-slate-300 space-y-2">
            <span className="font-mono font-bold text-cyan-400 uppercase text-[10px] block">FinOps Optimization Rationale</span>
            <p className="leading-relaxed text-[11px]">
              Decoupling compute from open object storage (Apache Iceberg on S3/ADLS) eliminates proprietary warehouse compute markups, generating over 50% TCO savings at petabyte scale.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
