import React, { useState } from 'react';
import { LayerComponent } from '../../types/architecture';
import { X, Check, Copy, AlertTriangle, ShieldCheck, Cpu, Code2, Sparkles } from 'lucide-react';
import { soundEngine } from '../../utils/soundUtils';

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
    soundEngine.playSuccess();
    if (component.sampleConfigSnippet) {
      navigator.clipboard.writeText(component.sampleConfigSnippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-fade-in">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl glass-panel border border-cyan-500/40 shadow-2xl space-y-6 text-slate-100 bg-slate-950"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-all"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-10">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
            <Cpu className="h-4 w-4 text-cyan-400" />
            <span>Layer Architecture Spec</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {component.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {component.fullDescription}
          </p>
        </div>

        {/* Key Operational Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
          {component.metrics.map((m, idx) => (
            <div key={idx} className="space-y-1">
              <span className="text-[10px] text-slate-400 font-mono uppercase font-bold tracking-wider block">{m.label}</span>
              <span className="text-xs font-bold text-cyan-300 font-mono">{m.value}</span>
            </div>
          ))}
        </div>

        {/* Tech Implementations Stack */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>Ecosystem Implementations</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl glass-card border border-emerald-500/30">
              <span className="font-mono text-[10px] font-bold text-emerald-400 uppercase block mb-1">Open Source Core</span>
              <span className="text-slate-200 font-mono text-xs font-semibold">
                {component.techOptions.openSource.join(', ')}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl glass-card border border-cyan-500/30">
              <span className="font-mono text-[10px] font-bold text-cyan-400 uppercase block mb-1">Cloud Managed</span>
              <span className="text-slate-200 font-mono text-xs font-semibold">
                {component.techOptions.cloudNative.join(', ')}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl glass-card border border-purple-500/30">
              <span className="font-mono text-[10px] font-bold text-purple-400 uppercase block mb-1">Commercial SaaS</span>
              <span className="text-slate-200 font-mono text-xs font-semibold">
                {component.techOptions.commercialSaaS.join(', ')}
              </span>
            </div>
          </div>
        </div>

        {/* Architectural Responsibilities */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Architectural Responsibilities</span>
          </h3>
          <div className="space-y-2">
            {component.responsibilities.map((res, idx) => (
              <div key={idx} className="flex items-start space-x-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
                <span className="text-emerald-400 font-bold">•</span>
                <span className="leading-relaxed">{res}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Anti-Patterns */}
        <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-800/60 space-y-2">
          <h3 className="text-xs font-bold text-amber-300 flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <span>Anti-Patterns to Mitigate</span>
          </h3>
          <div className="space-y-1.5">
            {component.antiPatterns.map((ap, idx) => (
              <div key={idx} className="flex items-start space-x-2 text-xs text-amber-200/90">
                <span className="text-amber-400 font-bold">•</span>
                <span>{ap}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sample Production Configuration */}
        {component.sampleConfigSnippet && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center space-x-1.5">
                <Code2 className="h-4 w-4" />
                <span>Config Spec ({component.sampleConfigSnippet.language})</span>
              </span>
              <button
                onClick={handleCopyCode}
                className="flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white transition-all"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Code Snippet'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed shadow-inner">
              <code>{component.sampleConfigSnippet.code}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
