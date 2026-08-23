import React, { useState } from 'react';
import { DataContractSpec } from '../../types/architecture';
import { FileCode2, Plus, Trash2, Copy, Check, Download, ShieldAlert } from 'lucide-react';
import { downloadFile } from '../../utils/exportUtils';

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
    setContract((prev) => ({
      ...prev,
      schemaFields: [
        ...prev.schemaFields,
        { name: 'new_attribute', type: 'STRING', pii: false, description: 'Attribute description' },
      ],
    }));
  };

  const handleRemoveField = (index: number) => {
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
    navigator.clipboard.writeText(yamlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadYaml = () => {
    downloadFile(`${contract.dataProductName}_contract.yaml`, yamlOutput, 'text/yaml');
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto py-4">
      
      {/* Header */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/60">
              <FileCode2 className="h-4 w-4" />
            </span>
            <h1 className="text-2xl font-extrabold text-white">
              Data Product Contract Modeler
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Build production-grade Data Product manifests enforcing schema contracts, quality assertions, and PII masking policies.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopyYaml}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-all"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Manifest'}</span>
          </button>
          <button
            onClick={handleDownloadYaml}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-semibold text-slate-950 transition-all"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download YAML</span>
          </button>
        </div>
      </div>

      {/* Grid: Editor vs Live Spec Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Editor Form (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl glass-panel border border-slate-800 space-y-6">
          <h3 className="text-base font-bold text-slate-100 pb-2 border-b border-slate-800">
            Data Product Metadata & SLAs
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Business Domain</label>
              <input
                type="text"
                value={contract.domain}
                onChange={(e) => setContract({ ...contract, domain: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-medium focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Data Product Name</label>
              <input
                type="text"
                value={contract.dataProductName}
                onChange={(e) => setContract({ ...contract, dataProductName: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-medium focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Owner Engineering Team</label>
              <input
                type="text"
                value={contract.ownerTeam}
                onChange={(e) => setContract({ ...contract, ownerTeam: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-medium focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">SLA Latency Freshness</label>
              <input
                type="text"
                value={contract.slaLatency}
                onChange={(e) => setContract({ ...contract, slaLatency: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-medium focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Schema Fields Editor */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Schema Field Definitions
              </h4>
              <button
                onClick={handleAddField}
                className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-cyan-300 transition-all"
              >
                <Plus className="h-3 w-3" />
                <span>Add Field</span>
              </button>
            </div>

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {contract.schemaFields.map((field, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3 text-xs">
                  <input
                    type="text"
                    value={field.name}
                    onChange={(e) => {
                      const updated = [...contract.schemaFields];
                      updated[idx].name = e.target.value;
                      setContract({ ...contract, schemaFields: updated });
                    }}
                    className="w-1/3 p-1.5 rounded bg-slate-900 border border-slate-700 text-slate-100 font-mono text-[11px]"
                  />
                  <select
                    value={field.type}
                    onChange={(e) => {
                      const updated = [...contract.schemaFields];
                      updated[idx].type = e.target.value;
                      setContract({ ...contract, schemaFields: updated });
                    }}
                    className="w-1/4 p-1.5 rounded bg-slate-900 border border-slate-700 text-cyan-300 font-mono text-[11px]"
                  >
                    <option value="STRING">STRING</option>
                    <option value="BIGINT">BIGINT</option>
                    <option value="DECIMAL(12,2)">DECIMAL</option>
                    <option value="TIMESTAMP">TIMESTAMP</option>
                    <option value="BOOLEAN">BOOLEAN</option>
                    <option value="VECTOR(1536)">VECTOR</option>
                  </select>

                  <label className="flex items-center space-x-1.5 text-[11px] text-slate-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={field.pii}
                      onChange={(e) => {
                        const updated = [...contract.schemaFields];
                        updated[idx].pii = e.target.checked;
                        setContract({ ...contract, schemaFields: updated });
                      }}
                      className="rounded border-slate-700 text-cyan-500 focus:ring-0"
                    />
                    <span className={field.pii ? 'text-amber-400 font-bold' : ''}>PII Mask</span>
                  </label>

                  <button
                    onClick={() => handleRemoveField(idx)}
                    className="p-1 rounded text-slate-500 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live YAML Manifest Code Block (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
              <ShieldAlert className="h-4 w-4 text-cyan-400" />
              <span>Live Data Contract Spec (YAML)</span>
            </h3>
            <span className="font-mono text-[10px] text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              Valid API Spec
            </span>
          </div>

          <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto max-h-[500px]">
            <code>{yamlOutput}</code>
          </pre>
        </div>

      </div>
    </div>
  );
};
