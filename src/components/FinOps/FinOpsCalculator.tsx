import React, { useState } from 'react';
import { DollarSign, Calculator, TrendingDown, Layers, Server, HardDrive, Cpu, ShieldCheck } from 'lucide-react';

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
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto py-4">
      {/* Header */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800/60">
              <Calculator className="h-4 w-4" />
            </span>
            <h1 className="text-2xl font-extrabold text-white">
              Enterprise FinOps Spend & Scale Simulator
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulate petabyte-scale infrastructure cost models (Storage, Compute, Ingestion, Governance) across architectural paradigms.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-slate-900/90 p-3 rounded-2xl border border-slate-800">
          <DollarSign className="h-5 w-5 text-emerald-400" />
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Est. Lakehouse TCO</span>
            <span className="text-lg font-extrabold text-emerald-400 font-mono">
              {formatCurrency(totalLakehouseCostUsd)} / mo
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Sliders Controls (5 cols) vs Cost Visualizer (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Slider Panel */}
        <div className="lg:col-span-5 p-6 rounded-3xl glass-panel border border-slate-800 space-y-6">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
            <Layers className="h-4 w-4 text-cyan-400" />
            <span>Workload Parameters</span>
          </h3>

          {/* Slider 1: Daily Ingestion Volume */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Daily Ingestion Volume</span>
              <span className="font-mono text-cyan-400 font-bold">{ingestionTbPerDay} TB / day</span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              step="1"
              value={ingestionTbPerDay}
              onChange={(e) => setIngestionTbPerDay(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <span className="text-[10px] text-slate-500 block">
              Cumulative 30-Day Volume: {(ingestionTbPerDay * 30).toLocaleString()} TB
            </span>
          </div>

          {/* Slider 2: Query Concurrency */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Peak Query Concurrency</span>
              <span className="font-mono text-cyan-400 font-bold">{queryConcurrency} Concurrent Users</span>
            </div>
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={queryConcurrency}
              onChange={(e) => setQueryConcurrency(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <span className="text-[10px] text-slate-500 block">
              Simultaneous BI, Ad-hoc SQL, & ML inference query throughput.
            </span>
          </div>

          {/* Slider 3: Retention Period */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Data Retention Horizon</span>
              <span className="font-mono text-cyan-400 font-bold">{retentionMonths} Months ({Math.round(retentionMonths / 12 * 10) / 10} yrs)</span>
            </div>
            <input
              type="range"
              min="3"
              max="60"
              step="3"
              value={retentionMonths}
              onChange={(e) => setRetentionMonths(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <span className="text-[10px] text-slate-500 block">
              Total Storage Managed: {totalStorageTb.toLocaleString()} TB ({Math.round(totalStorageTb / 1000 * 10) / 10} PB)
            </span>
          </div>

          {/* Breakdown Pills */}
          <div className="pt-4 border-t border-slate-800 space-y-2.5 text-xs">
            <span className="font-bold text-slate-400 block text-[11px] uppercase tracking-wider">
              Estimated Monthly Cost Tier Breakdown
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Object Storage</span>
                <span className="font-mono font-bold text-cyan-300">{formatCurrency(storageCostUsd)}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Compute Engine</span>
                <span className="font-mono font-bold text-emerald-300">{formatCurrency(computeCostUsd)}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Ingestion & CDC</span>
                <span className="font-mono font-bold text-purple-300">{formatCurrency(ingestionCostUsd)}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Governance & Security</span>
                <span className="font-mono font-bold text-amber-300">{formatCurrency(governanceCostUsd)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Comparative Architecture Spend Visualizer */}
        <div className="lg:col-span-7 p-6 rounded-3xl glass-panel border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <TrendingDown className="h-4 w-4 text-emerald-400" />
              <span>Comparative Paradigm Spend Breakdown</span>
            </h3>
            <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800">
              Lakehouse Saves ~52% vs Proprietary SaaS Warehouse
            </span>
          </div>

          <div className="space-y-5 pt-2">
            {/* Medallion Lakehouse Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-cyan-300">1. Medallion Lakehouse (Iceberg + S3 + Trino)</span>
                <span className="font-mono font-bold text-emerald-400">{formatCurrency(totalLakehouseCostUsd)} / mo</span>
              </div>
              <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500"
                  style={{ width: '48%' }}
                />
              </div>
            </div>

            {/* Streaming Kappa Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300">2. Real-Time Streaming Kappa (Kafka + Flink + ClickHouse)</span>
                <span className="font-mono font-bold text-slate-300">{formatCurrency(totalKappaCostUsd)} / mo</span>
              </div>
              <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full bg-slate-500 transition-all duration-500"
                  style={{ width: '60%' }}
                />
              </div>
            </div>

            {/* Data Mesh Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300">3. Data Mesh (Decentralized Domain Platform)</span>
                <span className="font-mono font-bold text-slate-300">{formatCurrency(totalDataMeshCostUsd)} / mo</span>
              </div>
              <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full bg-slate-500 transition-all duration-500"
                  style={{ width: '65%' }}
                />
              </div>
            </div>

            {/* Modern Data Stack Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300">4. Modern Data Stack (Managed Cloud Warehouse SaaS)</span>
                <span className="font-mono font-bold text-rose-400">{formatCurrency(totalMdsCostUsd)} / mo</span>
              </div>
              <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full bg-rose-500/80 transition-all duration-500"
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 text-xs text-slate-400 space-y-2">
            <span className="font-bold text-cyan-400 block">FinOps Strategy Insight</span>
            <p className="leading-relaxed text-[11px]">
              Decoupling compute (Trino/Spark) from open object storage (Apache Iceberg on AWS S3) eliminates proprietary warehouse compute credit markups, resulting in over 50% TCO savings at petabyte scale.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
