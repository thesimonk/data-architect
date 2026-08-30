import React, { useState } from 'react';
import { Network, Plus, Trash2, ShieldCheck, Database, Layers, ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { soundEngine } from '../../utils/soundUtils';

interface DomainNode {
  id: string;
  name: string;
  owner: string;
  color: string;
  dataProducts: {
    name: string;
    sla: string;
    schema: string;
  }[];
  consumesFrom: string[];
}

export const DomainTopologyModeler: React.FC = () => {
  const [domains, setDomains] = useState<DomainNode[]>([
    {
      id: 'sales',
      name: 'Sales & Revenue Domain',
      owner: 'sales-eng@enterprise.com',
      color: '#00f0ff',
      dataProducts: [
        { name: 'CustomerOrdersProduct', sla: '5m Freshness', schema: 'order_id, amount, customer_id' },
        { name: 'ARRSubscriptionState', sla: '1h Freshness', schema: 'subscription_id, arr_value' },
      ],
      consumesFrom: [],
    },
    {
      id: 'marketing',
      name: 'Marketing & Attribution Domain',
      owner: 'mktg-data@enterprise.com',
      color: '#10b981',
      dataProducts: [
        { name: 'AdCampaignAttribution', sla: '15m Freshness', schema: 'campaign_id, channel, cpa' },
      ],
      consumesFrom: ['sales'],
    },
    {
      id: 'supply',
      name: 'Supply Chain & Inventory Domain',
      owner: 'logistics-eng@enterprise.com',
      color: '#8b5cf6',
      dataProducts: [
        { name: 'WarehouseInventoryLevel', sla: '1m Realtime', schema: 'sku_id, warehouse_qty' },
      ],
      consumesFrom: ['sales'],
    },
    {
      id: 'finance',
      name: 'Finance & Compliance Domain',
      owner: 'fin-platform@enterprise.com',
      color: '#f59e0b',
      dataProducts: [
        { name: 'AuditedRevenueLedger', sla: '24h Batch', schema: 'ledger_id, gross_revenue, tax' },
      ],
      consumesFrom: ['sales', 'supply'],
    },
  ]);

  const [newDomainName, setNewDomainName] = useState<string>('');

  const handleAddDomain = () => {
    if (!newDomainName) return;
    soundEngine.playSuccess();
    const id = newDomainName.toLowerCase().replace(/\s+/g, '-');
    setDomains([
      ...domains,
      {
        id,
        name: `${newDomainName} Domain`,
        owner: `${id}-team@enterprise.com`,
        color: '#ec4899',
        dataProducts: [{ name: `${newDomainName}DataProduct`, sla: '15m Freshness', schema: 'id, created_at' }],
        consumesFrom: ['sales'],
      },
    ]);
    setNewDomainName('');
  };

  const handleRemoveDomain = (id: string) => {
    soundEngine.playClick();
    setDomains(domains.filter((d) => d.id !== id));
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto py-2">
      
      {/* Header Banner */}
      <div className="p-8 rounded-3xl glass-panel border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-cyan-950/90 text-cyan-300 border border-cyan-500/40 shadow-inner">
              <Network className="h-5 w-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Data Mesh Domain Topology & Product Modeler
            </h1>
          </div>
          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
            Model decentralized domain boundaries, publish data product manifests, and validate federated data governance links across the enterprise mesh.
          </p>
        </div>

        {/* Add Domain Input Box */}
        <div className="flex items-center space-x-2 shrink-0 relative z-10">
          <input
            type="text"
            placeholder="New Domain Name (e.g. Risk)..."
            value={newDomainName}
            onChange={(e) => setNewDomainName(e.target.value)}
            className="px-4 py-2.5 rounded-2xl bg-slate-950/90 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 w-56 font-sans shadow-inner"
          />
          <button
            onClick={handleAddDomain}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-xs font-extrabold text-white shadow-lg cyan-glow transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>Add Domain</span>
          </button>
        </div>
      </div>

      {/* Grid: Interactive SVG Graph vs Domain Registry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* SVG Inter-Domain Graph (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800/80 space-y-4 bg-slate-950/95 relative overflow-hidden min-h-[420px] shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div className="flex items-center space-x-2">
              <Layers className="h-4 w-4 text-cyan-400" />
              <h3 className="text-sm font-extrabold text-white tracking-tight">
                Federated Mesh Inter-Domain Dependency Graph
              </h3>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              Mesh Active ({domains.length} Domains)
            </span>
          </div>

          <svg width="100%" height="320" className="overflow-visible">
            {/* Draw Dependency Lines */}
            {domains.map((dom, idx) => {
              const x1 = 120 + (idx % 2) * 260;
              const y1 = 70 + Math.floor(idx / 2) * 130;

              return dom.consumesFrom.map((targetId) => {
                const targetIdx = domains.findIndex((d) => d.id === targetId);
                if (targetIdx === -1) return null;
                const x2 = 120 + (targetIdx % 2) * 260;
                const y2 = 70 + Math.floor(targetIdx / 2) * 130;

                const pathD = `M ${x1} ${y1} C ${x1 - 40} ${(y1 + y2) / 2}, ${x2 + 40} ${(y1 + y2) / 2}, ${x2} ${y2}`;

                return (
                  <g key={`${dom.id}-${targetId}`}>
                    <path
                      d={pathD}
                      fill="none"
                      stroke={dom.color}
                      strokeWidth="2.5"
                      strokeDasharray="5 5"
                      opacity="0.6"
                      className="animate-pulse"
                    />
                    <circle r="4" fill={dom.color}>
                      <animateMotion path={pathD} dur="4s" repeatCount="indefinite" />
                    </circle>
                  </g>
                );
              });
            })}

            {/* Draw Domain Rectangles */}
            {domains.map((dom, idx) => {
              const x = 40 + (idx % 2) * 260;
              const y = 25 + Math.floor(idx / 2) * 130;

              return (
                <g key={dom.id} transform={`translate(${x}, ${y})`}>
                  <rect
                    width="210"
                    height="90"
                    rx="18"
                    fill="#0b0f19"
                    stroke={dom.color}
                    strokeWidth="1.5"
                    className="shadow-xl"
                  />
                  <text x="16" y="26" fill="#ffffff" fontSize="12" fontWeight="bold">
                    {dom.name}
                  </text>
                  <text x="16" y="44" fill="#94a3b8" fontSize="9" className="font-mono">
                    Owner: {dom.owner}
                  </text>
                  <text x="16" y="64" fill={dom.color} fontSize="10" fontWeight="bold" className="font-mono">
                    📦 {dom.dataProducts.length} Autonomous Product(s)
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Domain Data Products Registry Editor (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800/80 space-y-4">
          <h3 className="text-sm font-extrabold text-white border-b border-slate-800/80 pb-4">
            Domain Data Product Registry
          </h3>

          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
            {domains.map((dom) => (
              <div key={dom.id} className="p-4 rounded-2xl glass-card space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full shadow-md" style={{ backgroundColor: dom.color }} />
                    <span className="font-extrabold text-xs text-white">{dom.name}</span>
                  </div>
                  {domains.length > 1 && (
                    <button
                      onClick={() => handleRemoveDomain(dom.id)}
                      className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  {dom.dataProducts.map((dp, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-cyan-300">{dp.name}</span>
                        <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 text-[9px] font-mono border border-cyan-700/60">
                          {dp.sla}
                        </span>
                      </div>
                      <span className="text-slate-400 block font-mono text-[10px]">Schema: {dp.schema}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
