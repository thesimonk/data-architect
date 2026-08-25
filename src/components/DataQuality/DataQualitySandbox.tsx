import React, { useState } from 'react';
import { ShieldCheck, Play, CheckCircle2, AlertTriangle, XCircle, RefreshCw } from 'lucide-react';

export const DataQualitySandbox: React.FC = () => {
  const [freshnessSlaSec, setFreshnessSlaSec] = useState<number>(300);
  const [maxNullPercentage, setMaxNullPercentage] = useState<number>(1.0);
  const [schemaDriftBlock, setSchemaDriftBlock] = useState<boolean>(true);

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{
    status: 'PASSED' | 'QUARANTINED' | 'FAILED';
    processedRows: number;
    passedRows: number;
    quarantinedRows: number;
    logEntries: string[];
  } | null>(null);

  const handleRunEvaluation = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      const isQuarantine = maxNullPercentage < 0.5 || freshnessSlaSec < 60;
      
      setTestResult({
        status: isQuarantine ? 'QUARANTINED' : 'PASSED',
        processedRows: 1250000,
        passedRows: isQuarantine ? 1241000 : 1250000,
        quarantinedRows: isQuarantine ? 9000 : 0,
        logEntries: [
          `[INFO] Ingested 1,250,000 incoming records from Kafka topic telemetry.orders.v1`,
          `[CHECK] Primary Key Uniqueness Assertion: 100% Passed (0 duplicates)`,
          `[CHECK] Freshness SLA: Target < ${freshnessSlaSec}s | Actual: 42s (PASSED)`,
          `[CHECK] Null Rate Assertion: Target < ${maxNullPercentage}% | Actual: ${isQuarantine ? '0.72%' : '0.12%'} ${isQuarantine ? '(FAIL -> Quarantined 9,000 rows to Dead Letter Table)' : '(PASSED)'}`,
          `[CHECK] Schema Evolution Contract: 0 Breaking Changes Detected`,
          `[RESULT] Execution Status: ${isQuarantine ? 'QUARANTINED (Non-blocking Bronze isolation applied)' : 'PASSED (Published to Iceberg Silver Catalog)'}`,
        ],
      });
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto py-4">
      {/* Header */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800/60">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <h1 className="text-2xl font-extrabold text-white">
              Data Quality Assertion & Quarantine Simulator
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulate computational contract enforcement, schema validation, and automated quarantine routing for streaming pipelines.
          </p>
        </div>

        <button
          onClick={handleRunEvaluation}
          disabled={isRunning}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-slate-950 shadow-lg shadow-emerald-950/50 transition-all"
        >
          {isRunning ? <RefreshCw className="h-4 w-4 animate-spin text-slate-950" /> : <Play className="h-4 w-4 text-slate-950" />}
          <span>{isRunning ? 'Evaluating Stream...' : 'Run Assertion Engine'}</span>
        </button>
      </div>

      {/* Grid: Assertion Rules Configuration (5 cols) vs Execution Output (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Rules Config Panel */}
        <div className="lg:col-span-5 p-6 rounded-3xl glass-panel border border-slate-800 space-y-6">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
            Assertion Contract Parameters
          </h3>

          {/* Rule 1: Freshness SLA */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Freshness SLA Threshold</span>
              <span className="font-mono text-cyan-400 font-bold">{freshnessSlaSec} Seconds</span>
            </div>
            <input
              type="range"
              min="30"
              max="900"
              step="30"
              value={freshnessSlaSec}
              onChange={(e) => setFreshnessSlaSec(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          {/* Rule 2: Max Null Percentage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Max Null Rate Tolerance</span>
              <span className="font-mono text-cyan-400 font-bold">{maxNullPercentage}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="5.0"
              step="0.1"
              value={maxNullPercentage}
              onChange={(e) => setMaxNullPercentage(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          {/* Rule 3: Schema Drift Action */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <span className="font-semibold text-slate-200 block">Strict Schema Drift Action</span>
              <span className="text-[10px] text-slate-500">Block unannounced column deletions</span>
            </div>
            <input
              type="checkbox"
              checked={schemaDriftBlock}
              onChange={(e) => setSchemaDriftBlock(e.target.checked)}
              className="rounded border-slate-700 text-emerald-500 focus:ring-0"
            />
          </div>
        </div>

        {/* Evaluation Output Panel */}
        <div className="lg:col-span-7 p-6 rounded-3xl glass-panel border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white">
              Assertion Log & Isolation Output
            </h3>
            {testResult && (
              <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono border ${
                testResult.status === 'PASSED'
                  ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                  : 'bg-amber-950 text-amber-400 border-amber-800'
              }`}>
                {testResult.status}
              </span>
            )}
          </div>

          {testResult ? (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Processed Rows</span>
                  <span className="font-mono text-sm font-bold text-slate-200">{testResult.processedRows.toLocaleString()}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Passed to Silver</span>
                  <span className="font-mono text-sm font-bold text-emerald-400">{testResult.passedRows.toLocaleString()}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Quarantined</span>
                  <span className="font-mono text-sm font-bold text-amber-400">{testResult.quarantinedRows.toLocaleString()}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 space-y-1.5 overflow-x-auto">
                {testResult.logEntries.map((log, i) => (
                  <div key={i} className="leading-relaxed">{log}</div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-slate-500 space-y-2">
              <ShieldCheck className="h-8 w-8 text-slate-600 mx-auto" />
              <p>Click "Run Assertion Engine" to evaluate streaming data contracts.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
