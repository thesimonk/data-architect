import React, { useState } from 'react';
import { Network, Plus, Trash2, ShieldCheck, Database, Layers, ArrowUpRight } from 'lucide-react';
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
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto py-4">
      {/* Header */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/60">
              <Network className="h-4 w-4" />
            </span>
            <h1 className="text-2xl font-extrabold text-white">
              Data Mesh Domain Topology & Inter-Product Modeler
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Model domain ownership boundaries, publish autonomous Data Products, and visualize cross-domain contract dependencies.
          </p>
        </div>

        {/* Add Domain Input */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="New Domain Name (e.g. Customer)..."
            value={newDomainName}
            onChange={(e) => setNewDomainName(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 w-60"
          />
          <button
            onClick={handleAddDomain}
            className="flex items-center space-x-1 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-slate-950 transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>Add Domain</span>
          </button>
        </div>
      </div>

      {/* Grid: Domain Topology SVG Graph (7 cols) vs Domain Manifest Editor (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Interactive SVG Inter-Domain Dependency Graph (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl glass-panel border border-slate-800 space-y-4 bg-slate-950/90 relative overflow-hidden min-h-[420px]">
          <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <Layers className="h-4 w-4 text-cyan-400" />
              <span>Inter-Domain Data Product Dependency Map</span>
            </span>
            <span className="text-[10px] font-mono text-cyan-400 font-normal">Federated Mesh Active</span>
          </h3>

          {/* SVG Canvas showing Domain Nodes and Dependency Links */}
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
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      opacity="0.6"
                    />
                    <circle r="3" fill={dom.color}>
                      <animateMotion path={pathD} dur="4s" repeatCount="indefinite" />
                    </circle>
                  </g>
                );
              });
            })}

            {/* Draw Domain Cards */}
            {domains.map((dom, idx) => {
              const x = 50 + (idx % 2) * 260;
              const y = 30 + Math.floor(idx / 2) * 130;

              return (
                <g key={dom.id} transform={`translate(${x}, ${y})`}>
                  <rect
                    width="200"
                    height="85"
                    rx="16"
                    fill="#0f172a"
                    stroke={dom.color}
                    strokeWidth="1.5"
                    className="shadow-xl"
                  />
                  <text x="16" y="24" fill="#f8fafc" fontSize="11" fontWeight="bold">
                    {dom.name}
                  </text>
                  <text x="16" y="42" fill="#64748b" fontSize="9" className="font-mono">
                    Owner: {dom.owner}
                  </text>
                  <text x="16" y="60" fill={dom.color} fontSize="10" fontWeight="bold">
                    📦 {dom.dataProducts.length} Data Product(s)
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Domain Data Products Spec Editor (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3">
            Domain Data Product Registry
          </h3>

          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
            {domains.map((dom) => (
              <div key={dom.id} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: dom.color }} />
                    <span className="font-bold text-xs text-slate-100">{dom.name}</span>
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

                <div className="space-y-1.5 pt-1">
                  {dom.dataProducts.map((dp, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-cyan-300">{dp.name}</span>
                        <span className="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 text-[9px] font-mono border border-cyan-800">
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
