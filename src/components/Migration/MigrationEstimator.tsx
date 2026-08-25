import React, { useState } from 'react';
import { RefreshCw, Clock, AlertTriangle, Layers, Calendar, CheckCircle2 } from 'lucide-react';

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
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto py-4">
      {/* Header */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/60">
              <RefreshCw className="h-4 w-4" />
            </span>
            <h1 className="text-2xl font-extrabold text-white">
              Legacy Data Platform Migration Effort Estimator
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Calculate engineering team effort (person-months), risk index, and execution timeline when migrating legacy monoliths to Lakehouse / Mesh.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-slate-900/90 p-3 rounded-2xl border border-slate-800 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Est. Team Effort</span>
            <span className="font-mono text-sm font-extrabold text-cyan-400">{totalPersonMonths} Person-Months</span>
          </div>
        </div>
      </div>

      {/* Grid: Controls Sliders (5 cols) vs Migration Roadmap (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controls Panel */}
        <div className="lg:col-span-5 p-6 rounded-3xl glass-panel border border-slate-800 space-y-6">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
            Source Platform Parameters
          </h3>

          {/* Source Platform Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300">Legacy Source Platform</label>
            <select
              value={sourcePlatform}
              onChange={(e) => setSourcePlatform(e.target.value as any)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-cyan-300 focus:outline-none focus:border-cyan-500"
            >
              <option value="hadoop">Hadoop HDFS / MapReduce / Hive</option>
              <option value="teradata">Teradata Enterprise Data Warehouse</option>
              <option value="oracle">Oracle Exadata / PL-SQL Monolith</option>
              <option value="legacy-sql">Legacy On-Prem SQL Server ETL</option>
            </select>
          </div>

          {/* Slider 1: Data Volume */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Historical Data Footprint</span>
              <span className="font-mono text-cyan-400 font-bold">{dataVolumeTb.toLocaleString()} TB ({Math.round(dataVolumeTb / 1000 * 10) / 10} PB)</span>
            </div>
            <input
              type="range"
              min="50"
              max="5000"
              step="50"
              value={dataVolumeTb}
              onChange={(e) => setDataVolumeTb(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          {/* Slider 2: Pipeline Count */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">ETL / Stored Procedure Pipelines</span>
              <span className="font-mono text-cyan-400 font-bold">{pipelineCount} Pipelines</span>
            </div>
            <input
              type="range"
              min="20"
              max="1000"
              step="10"
              value={pipelineCount}
              onChange={(e) => setPipelineCount(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>
        </div>

        {/* Estimation Output & Roadmap (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl glass-panel border border-slate-800 space-y-6">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-500 block">Total Effort</span>
              <span className="font-mono text-sm font-bold text-cyan-400">{totalPersonMonths} Person-Mo</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-500 block">Est. Duration</span>
              <span className="font-mono text-sm font-bold text-emerald-400">{estimatedTimelineMonths} Months</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-500 block">Risk Index</span>
              <span className="font-mono text-sm font-bold text-amber-400">{riskIndex} / 100</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">4-Phase Migration Roadmap</h4>
            
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start space-x-2">
                <span className="font-mono text-cyan-400 font-bold">1.</span>
                <span><strong>Discovery & Schema Translation:</strong> Automated PL-SQL / Hive SQL parsing to modular dbt ddl.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start space-x-2">
                <span className="font-mono text-cyan-400 font-bold">2.</span>
                <span><strong>Historical Backfill:</strong> Dual-run CDC log replication and S3 Iceberg Bronze snapshot load.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start space-x-2">
                <span className="font-mono text-cyan-400 font-bold">3.</span>
                <span><strong>Parallel Validation Run:</strong> Dual-query assertion testing between legacy warehouse and Trino Gold marts.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start space-x-2">
                <span className="font-mono text-cyan-400 font-bold">4.</span>
                <span><strong>Final Cutover:</strong> Decommission legacy instances and freeze legacy compute credits.</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
