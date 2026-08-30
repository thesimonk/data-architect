import React, { useState } from 'react';
import { ShieldCheck, Lock, Copy, Check, Terminal, Sparkles } from 'lucide-react';
import { soundEngine } from '../../utils/soundUtils';

export const ZeroTrustSecuritySandbox: React.FC = () => {
  const [maskingType, setMaskingType] = useState<'sha256' | 'fpe' | 'differential'>('sha256');
  const [rowFiltering, setRowFiltering] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const sqlPolicySnippet = `-- Zero-Trust Attribute-Based Access Control (ABAC) Policy Spec
-- Engine: Immuta / OPA / Trino Dynamic Security Policy

CREATE MASKING POLICY pii_column_mask AS (val STRING) 
RETURNS STRING ->
  CASE 
    WHEN current_role() IN ('Data_Admin', 'Compliance_Auditor') THEN val
    WHEN current_role() IN ('Analyst') THEN ${
      maskingType === 'sha256' 
        ? "sha256(concat(val, 'SALT_KEY_2026'))" 
        : maskingType === 'fpe' 
        ? "regexp_replace(val, '(^.+)(.{4}$)', 'XXXX-XXXX-$2')"
        : "concat(substr(val, 1, 2), '***', laplace_noise(val, 0.1))"
    }
    ELSE '***REDACTED***'
  END;

${rowFiltering ? `-- Dynamic Row-Level Tenant Security Filter
CREATE ROW FILTER POLICY tenant_isolation_policy AS (tenant_id STRING)
RETURNS BOOLEAN ->
  current_user_tenant() = tenant_id OR current_role() = 'Super_Admin';` : ''}`;

  const handleCopyCode = () => {
    soundEngine.playSuccess();
    navigator.clipboard.writeText(sqlPolicySnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto py-2">
      
      {/* Header Banner */}
      <div className="p-8 rounded-3xl glass-panel border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-amber-950/90 text-amber-300 border border-amber-500/40 shadow-inner">
              <Lock className="h-5 w-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Zero-Trust Security & PII Masking Engine
            </h1>
          </div>
          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
            Configure dynamic Attribute-Based Access Control (ABAC) column masking algorithms and row-level tenant security isolation policies.
          </p>
        </div>
      </div>

      {/* Grid: Controls (5 cols) vs Live Policy Spec (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controls Panel */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800/80 space-y-6">
          <h3 className="text-sm font-extrabold text-white border-b border-slate-800/80 pb-4 flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span>Anonymization & Security Parameters</span>
          </h3>

          <div className="space-y-3">
            <label className="block text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">Column Anonymization Technique</label>
            <div className="space-y-2.5 text-xs font-mono">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setMaskingType('sha256');
                }}
                className={`w-full p-4 rounded-2xl border text-left transition-all ${
                  maskingType === 'sha256' ? 'bg-amber-950/80 text-amber-300 border-amber-500 font-bold shadow-lg purple-glow' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                SHA-256 Hashing + Salt (Irreversible)
              </button>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setMaskingType('fpe');
                }}
                className={`w-full p-4 rounded-2xl border text-left transition-all ${
                  maskingType === 'fpe' ? 'bg-amber-950/80 text-amber-300 border-amber-500 font-bold shadow-lg purple-glow' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Format-Preserving Masking (XXXX-1234)
              </button>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setMaskingType('differential');
                }}
                className={`w-full p-4 rounded-2xl border text-left transition-all ${
                  maskingType === 'differential' ? 'bg-amber-950/80 text-amber-300 border-amber-500 font-bold shadow-lg purple-glow' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Differential Privacy (Laplace Noise)
              </button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-slate-200 block">Row-Level Tenant Isolation</span>
              <span className="text-[10px] text-slate-400 font-mono">Enforce multi-tenant SQL row filters</span>
            </div>
            <input
              type="checkbox"
              checked={rowFiltering}
              onChange={(e) => {
                soundEngine.playClick();
                setRowFiltering(e.target.checked);
              }}
              className="w-5 h-5 rounded border-slate-700 text-amber-500 focus:ring-0 cursor-pointer accent-amber-500"
            />
          </div>
        </div>

        {/* Live SQL DDL Code Spec (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800/80 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div className="flex items-center space-x-2">
              <Terminal className="h-4 w-4 text-amber-400" />
              <h3 className="text-sm font-extrabold text-white">
                Generated SQL ABAC Policy DDL
              </h3>
            </div>
            <button
              onClick={handleCopyCode}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 transition-all"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied' : 'Copy DDL'}</span>
            </button>
          </div>

          <pre className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 text-xs font-mono text-amber-300 overflow-x-auto max-h-[380px] leading-relaxed shadow-inner">
            <code>{sqlPolicySnippet}</code>
          </pre>
        </div>

      </div>
    </div>
  );
};
