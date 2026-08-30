import React, { useState } from 'react';
import { DataContractSpec } from '../../types/architecture';
import { FileCode2, Plus, Trash2, Copy, Check, Download, ShieldAlert, Sparkles, Terminal } from 'lucide-react';
import { downloadFile } from '../../utils/exportUtils';
import { soundEngine } from '../../utils/soundUtils';

export const ContractBuilder: React.FC = () => {
  const [contract, setContract] = useState<DataContractSpec>({
    domain: 'Finance & Payments',
    dataProductName: 'CustomerTransactions',
    version: '1.2.0',
    ownerTeam: 'payments-core-eng@enterprise.com',
    slaLatency: '5 Minutes',
    qualityChecks: [
      'transaction_id IS NOT NULL',
      'amount > 0.00',
      'currency IN ("USD", "EUR", "GBP")',
    ],
    schemaFields: [
      { name: 'transaction_id', type: 'BIGINT', pii: false, description: 'Unique surrogate PK' },
      { name: 'customer_email', type: 'STRING', pii: true, description: 'Customer email address (MD5 hashed)' },
      { name: 'amount', type: 'DECIMAL(12,2)', pii: false, description: 'Gross transaction amount' },
      { name: 'created_at', type: 'TIMESTAMP', pii: false, description: 'UTC Event timestamp' },
    ],
    consumerPolicy: 'Internal Domain Access via Governed REST API or Iceberg Silver Share',
  });

  const [copied, setCopied] = useState(false);

  const handleAddField = () => {
    soundEngine.playClick();
    setContract((prev) => ({
      ...prev,
      schemaFields: [
        ...prev.schemaFields,
        { name: 'new_attribute', type: 'STRING', pii: false, description: 'Attribute description' },
      ],
    }));
  };

  const handleRemoveField = (index: number) => {
    soundEngine.playClick();
    setContract((prev) => ({
      ...prev,
      schemaFields: prev.schemaFields.filter((_, i) => i !== index),
    }));
  };

  const yamlOutput = `dataset: ${contract.dataProductName}
domain: ${contract.domain}
version: ${contract.version}
owner: ${contract.ownerTeam}
sla:
  freshness: ${contract.slaLatency}
  availability: 99.99%
qualityRules:
${contract.qualityChecks.map((q) => `  - ${q}`).join('\n')}
schema:
${contract.schemaFields
  .map(
    (f) =>
      `  - name: ${f.name}\n    type: ${f.type}\n    pii: ${f.pii}\n    description: "${f.description}"`
  )
  .join('\n')}
consumerPolicy: "${contract.consumerPolicy}"`;

  const handleCopyYaml = () => {
    soundEngine.playSuccess();
    navigator.clipboard.writeText(yamlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadYaml = () => {
    soundEngine.playSuccess();
    downloadFile(`${contract.dataProductName}_contract.yaml`, yamlOutput, 'text/yaml');
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto py-2">
      
      {/* Header Banner */}
      <div className="p-8 rounded-3xl glass-panel border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-cyan-950/90 text-cyan-300 border border-cyan-500/40 shadow-inner">
              <FileCode2 className="h-5 w-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Data Product Contract Modeler
            </h1>
          </div>
          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
            Construct production Data Product contracts specifying schema attributes, SLA freshness tolerances, data quality assertions, and PII masking policies.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0 relative z-10">
          <button
            onClick={handleCopyYaml}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 transition-all"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? 'Copied Manifest' : 'Copy YAML'}</span>
          </button>
          <button
            onClick={handleDownloadYaml}
            className="flex items-center space-x-1.5 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-xs font-extrabold text-white shadow-lg cyan-glow transition-all"
          >
            <Download className="h-4 w-4" />
            <span>Download Spec</span>
          </button>
        </div>
      </div>

      {/* Grid: Form Editor vs Live Spec Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Editor Form (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800/80 space-y-6">
          <h3 className="text-sm font-extrabold text-white border-b border-slate-800/80 pb-4 flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span>Data Product Metadata & SLAs</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
            <div>
              <label className="block text-slate-400 font-mono text-[10px] uppercase font-bold mb-1">Business Domain</label>
              <input
                type="text"
                value={contract.domain}
                onChange={(e) => setContract({ ...contract, domain: e.target.value })}
                className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-slate-100 font-medium focus:border-cyan-500/60 focus:outline-none shadow-inner"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-mono text-[10px] uppercase font-bold mb-1">Data Product Name</label>
              <input
                type="text"
                value={contract.dataProductName}
                onChange={(e) => setContract({ ...contract, dataProductName: e.target.value })}
                className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-slate-100 font-medium focus:border-cyan-500/60 focus:outline-none shadow-inner"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-mono text-[10px] uppercase font-bold mb-1">Owner Engineering Team</label>
              <input
                type="text"
                value={contract.ownerTeam}
                onChange={(e) => setContract({ ...contract, ownerTeam: e.target.value })}
                className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-slate-100 font-medium focus:border-cyan-500/60 focus:outline-none shadow-inner"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-mono text-[10px] uppercase font-bold mb-1">SLA Latency Freshness</label>
              <input
                type="text"
                value={contract.slaLatency}
                onChange={(e) => setContract({ ...contract, slaLatency: e.target.value })}
                className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-slate-100 font-medium focus:border-cyan-500/60 focus:outline-none shadow-inner"
              />
            </div>
          </div>

          {/* Schema Fields Editor */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Schema Attributes ({contract.schemaFields.length})
              </h4>
              <button
                onClick={handleAddField}
                className="flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-cyan-300 transition-all"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Attribute</span>
              </button>
            </div>

            <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
              {contract.schemaFields.map((field, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 text-xs">
                  <input
                    type="text"
                    value={field.name}
                    onChange={(e) => {
                      const updated = [...contract.schemaFields];
                      updated[idx].name = e.target.value;
                      setContract({ ...contract, schemaFields: updated });
                    }}
                    className="w-full sm:w-1/3 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 font-mono text-xs"
                  />
                  <select
                    value={field.type}
                    onChange={(e) => {
                      const updated = [...contract.schemaFields];
                      updated[idx].type = e.target.value;
                      setContract({ ...contract, schemaFields: updated });
                    }}
                    className="w-full sm:w-1/4 p-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 font-mono text-xs"
                  >
                    <option value="STRING">STRING</option>
                    <option value="BIGINT">BIGINT</option>
                    <option value="DECIMAL(12,2)">DECIMAL</option>
                    <option value="TIMESTAMP">TIMESTAMP</option>
                    <option value="BOOLEAN">BOOLEAN</option>
                    <option value="VECTOR(1536)">VECTOR</option>
                  </select>

                  <label className="flex items-center space-x-1.5 text-xs text-slate-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={field.pii}
                      onChange={(e) => {
                        const updated = [...contract.schemaFields];
                        updated[idx].pii = e.target.checked;
                        setContract({ ...contract, schemaFields: updated });
                      }}
                      className="w-4 h-4 rounded border-slate-700 text-cyan-500 focus:ring-0 accent-cyan-500"
                    />
                    <span className={field.pii ? 'text-amber-400 font-mono font-bold' : 'font-mono'}>PII</span>
                  </label>

                  <button
                    onClick={() => handleRemoveField(idx)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live YAML Spec Output (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800/80 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div className="flex items-center space-x-2">
              <Terminal className="h-4 w-4 text-cyan-400" />
              <h3 className="text-sm font-extrabold text-white">
                Live Data Contract Manifest (YAML)
              </h3>
            </div>
            <span className="font-mono text-[10px] text-emerald-400 font-bold bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-700">
              Valid Spec
            </span>
          </div>

          <pre className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 text-xs font-mono text-cyan-300 overflow-x-auto max-h-[480px] leading-relaxed shadow-inner">
            <code>{yamlOutput}</code>
          </pre>
        </div>

      </div>
    </div>
  );
};
