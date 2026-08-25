import React, { useState } from 'react';
import { ShieldCheck, Lock, Copy, Check, Terminal } from 'lucide-react';
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
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto py-4">
      {/* Header */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-amber-950 text-amber-400 border border-amber-800/60">
              <Lock className="h-4 w-4" />
            </span>
            <h1 className="text-2xl font-extrabold text-white">
              Zero-Trust Security & PII Anonymization Policy Engine
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Build dynamic Attribute-Based Access Control (ABAC) policies, column masking rules, and row-level tenant security filters.
          </p>
        </div>
      </div>

      {/* Grid: Controls (5 cols) vs Live Policy Code Spec (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controls Panel */}
        <div className="lg:col-span-5 p-6 rounded-3xl glass-panel border border-slate-800 space-y-6">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
            Security Policy Parameters
          </h3>

          <div className="space-y-3">
            <label className="block text-xs font-semibold text-slate-300">Column Anonymization Technique</label>
            <div className="space-y-2 text-xs">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setMaskingType('sha256');
                }}
                className={`w-full p-3 rounded-xl border text-left transition-all ${
                  maskingType === 'sha256' ? 'bg-amber-950/80 text-amber-300 border-amber-600 font-bold' : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                SHA-256 Hashing with Salt (Irreversible)
              </button>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setMaskingType('fpe');
                }}
                className={`w-full p-3 rounded-xl border text-left transition-all ${
                  maskingType === 'fpe' ? 'bg-amber-950/80 text-amber-300 border-amber-600 font-bold' : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                Format-Preserving Masking (e.g. XXXX-XXXX-1234)
              </button>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setMaskingType('differential');
                }}
                className={`w-full p-3 rounded-xl border text-left transition-all ${
                  maskingType === 'differential' ? 'bg-amber-950/80 text-amber-300 border-amber-600 font-bold' : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                Differential Privacy (Laplace Noise Injection)
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs pt-2">
            <div>
              <span className="font-semibold text-slate-200 block">Row-Level Tenant Isolation</span>
              <span className="text-[10px] text-slate-500">Enforce multi-tenant dataset security</span>
            </div>
            <input
              type="checkbox"
              checked={rowFiltering}
              onChange={(e) => setRowFiltering(e.target.checked)}
              className="rounded border-slate-700 text-amber-500 focus:ring-0"
            />
          </div>
        </div>

        {/* Live SQL Policy Spec Viewer (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Terminal className="h-4 w-4 text-amber-400" />
              <span>Generated SQL ABAC DDL Policy Spec</span>
            </h3>
            <button
              onClick={handleCopyCode}
              className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-all"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied' : 'Copy DDL'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-amber-300 overflow-x-auto max-h-[380px]">
            <code>{sqlPolicySnippet}</code>
          </pre>
        </div>

      </div>
    </div>
  );
};
