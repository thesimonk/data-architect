import React, { useState } from 'react';
import { LayerComponent } from '../../types/architecture';
import { X, Check, Copy, AlertTriangle, ShieldCheck, Cpu } from 'lucide-react';

interface ComponentDetailModalProps {
  component: LayerComponent | null;
  onClose: () => void;
}

export const ComponentDetailModal: React.FC<ComponentDetailModalProps> = ({
  component,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!component) return null;

  const handleCopyCode = () => {
    if (component.sampleConfigSnippet) {
      navigator.clipboard.writeText(component.sampleConfigSnippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl glass-panel border border-cyan-500/30 shadow-2xl space-y-6 text-slate-100 bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-10">
          <div className="flex items-center space-x-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            <Cpu className="h-4 w-4" />
            <span>Architecture Layer Component</span>
          </div>
          <h2 className="text-2xl font-black text-white">
            {component.name}
          </h2>
          <p className="text-sm text-slate-300">
            {component.fullDescription}
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
          {component.metrics.map((m, idx) => (
            <div key={idx} className="space-y-0.5">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">{m.label}</span>
              <span className="text-sm font-bold text-cyan-300 font-mono">{m.value}</span>
            </div>
          ))}
        </div>

        {/* Tech Stack Options (Open Source vs Cloud Native vs SaaS) */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Industry Technology Implementations
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
              <span className="font-bold text-emerald-400 block mb-1">Open Source Core</span>
              <span className="text-slate-300 font-mono text-[11px]">
                {component.techOptions.openSource.join(', ')}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
              <span className="font-bold text-cyan-400 block mb-1">Cloud Native Managed</span>
              <span className="text-slate-300 font-mono text-[11px]">
                {component.techOptions.cloudNative.join(', ')}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
              <span className="font-bold text-purple-400 block mb-1">Commercial SaaS</span>
              <span className="text-slate-300 font-mono text-[11px]">
                {component.techOptions.commercialSaaS.join(', ')}
              </span>
            </div>
          </div>
        </div>

        {/* Architectural Responsibilities */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Architectural Responsibilities</span>
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {component.responsibilities.map((res, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>{res}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Anti-Patterns to Avoid */}
        <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/50 space-y-2">
          <h3 className="text-xs font-bold text-amber-300 flex items-center space-x-1.5">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <span>Anti-Patterns to Avoid</span>
          </h3>
          <ul className="space-y-1 text-xs text-amber-200/90">
            {component.antiPatterns.map((ap, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>{ap}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Production Configuration Code Snippet */}
        {component.sampleConfigSnippet && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Production Config Spec ({component.sampleConfigSnippet.language})
              </span>
              <button
                onClick={handleCopyCode}
                className="flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-all"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto">
              <code>{component.sampleConfigSnippet.code}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
