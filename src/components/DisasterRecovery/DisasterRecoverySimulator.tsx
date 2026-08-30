import React, { useState } from 'react';
import { Network, ShieldCheck, Clock, CheckCircle2, Copy, Check, Sparkles, Terminal } from 'lucide-react';
import { soundEngine } from '../../utils/soundUtils';

export const DisasterRecoverySimulator: React.FC = () => {
  const [rpoSec, setRpoSec] = useState<number>(30); // 0s to 1800s
  const [rtoHours, setRtoHours] = useState<number>(1); // 0.1h to 12h
  const [copied, setCopied] = useState<boolean>(false);

  // Dynamic DR Strategy recommendation logic
  let strategyName = 'Active-Active Multi-Region Cross-Cloud';
  let strategyDesc = 'Zero data loss RPO with automated DNS failover and bidirectional Kafka MirrorMaker 2 replication.';
  let costMultiplier = 2.4;

  if (rpoSec >= 300 && rtoHours >= 4) {
    strategyName = 'Active-Passive Warm Standby (Pilot Light)';
    strategyDesc = 'Low-cost S3 cross-region object replication with on-demand Spark cluster spin-up.';
    costMultiplier = 1.2;
  } else if (rpoSec >= 60 && rtoHours >= 1) {
    strategyName = 'Active-Passive Warm Standby with Hot Catalog';
    strategyDesc = 'Continuous REST Iceberg metadata catalog replication with pre-warmed Trino clusters.';
    costMultiplier = 1.6;
  }

  const replicationSnippet = `# Enterprise Multi-Region Disaster Recovery Spec
# 1. Kafka MirrorMaker 2 Replication Config
clusters:
  - primary: us-east-1
  - secondary: eu-west-1
topics:
  - telemetry.*
  - orders.*
sync.topic.configs: true
emit.heartbeats: true

# 2. Apache Iceberg REST Catalog Snapshot Mirroring
catalog.sync.frequency: "${rpoSec}s"
s3.cross.region.replication:
  destination.bucket: "s3://eu-west-1-disaster-recovery-lake"
  kms.key: "arn:aws:kms:eu-west-1:1234567890:key/dr-key"`;

  const handleCopyCode = () => {
    soundEngine.playSuccess();
    navigator.clipboard.writeText(replicationSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto py-2">
      
      {/* Header Banner */}
      <div className="p-8 rounded-3xl glass-panel border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 shadow-inner">
              <Network className="h-5 w-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Enterprise Disaster Recovery & RPO/RTO Simulator
            </h1>
          </div>
          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
            Model Recovery Point Objective (RPO) and Recovery Time Objective (RTO) targets to compute multi-region DR replication architecture strategies.
          </p>
        </div>

        {/* Overhead Telemetry Badge */}
        <div className="flex items-center space-x-4 bg-slate-950/90 p-4 rounded-3xl border border-emerald-500/30 emerald-glow shadow-2xl shrink-0 relative z-10">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">Est. DR Infra Overhead</span>
            <span className="font-mono text-base font-black text-emerald-400">+{Math.round((costMultiplier - 1) * 100)}% Infra</span>
          </div>
        </div>
      </div>

      {/* Grid: Sliders Controls (5 cols) vs DR Architecture Strategy (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sliders Panel */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800/80 space-y-6">
          <h3 className="text-sm font-extrabold text-white border-b border-slate-800/80 pb-4 flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span>RPO & RTO SLA Parameters</span>
          </h3>

          {/* Slider 1: RPO */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-slate-300">Recovery Point Objective (RPO)</span>
              <span className="font-mono font-black text-cyan-300">{rpoSec} Seconds ({Math.round(rpoSec / 60 * 10) / 10} mins)</span>
            </div>
            <input
              type="range"
              min="0"
              max="1800"
              step="30"
              value={rpoSec}
              onChange={(e) => setRpoSec(Number(e.target.value))}
              className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400 border border-slate-800"
            />
            <span className="text-[10px] text-slate-400 block">Maximum acceptable data loss window during a region outage.</span>
          </div>

          {/* Slider 2: RTO */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-slate-300">Recovery Time Objective (RTO)</span>
              <span className="font-mono font-black text-cyan-300">{rtoHours} Hours</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="12"
              step="0.5"
              value={rtoHours}
              onChange={(e) => setRtoHours(Number(e.target.value))}
              className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400 border border-slate-800"
            />
            <span className="text-[10px] text-slate-400 block">Maximum downtime allowed before full analytical operational recovery.</span>
          </div>
        </div>

        {/* DR Strategy Result Panel */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800/80 space-y-6 shadow-2xl">
          <div className="space-y-2 border-b border-slate-800/80 pb-4">
            <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 tracking-wider">Recommended DR Strategy</span>
            <h3 className="text-2xl font-black text-white">{strategyName}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{strategyDesc}</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono font-bold text-cyan-400 flex items-center space-x-1.5">
                <Terminal className="h-4 w-4" />
                <span>Multi-Region Replication Spec</span>
              </span>
              <button
                onClick={handleCopyCode}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 transition-all"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Config'}</span>
              </button>
            </div>

            <pre className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 text-xs font-mono text-cyan-300 overflow-x-auto max-h-[320px] leading-relaxed shadow-inner">
              <code>{replicationSnippet}</code>
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
};
