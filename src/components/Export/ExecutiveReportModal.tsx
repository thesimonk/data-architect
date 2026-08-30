import React, { useState } from 'react';
import { RecommendationResult } from '../../types/architecture';
import { generateExecutiveMarkdownReport, downloadFile } from '../../utils/exportUtils';
import { X, Copy, Check, Download, FileText, Sparkles } from 'lucide-react';
import { soundEngine } from '../../utils/soundUtils';

interface ExecutiveReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  recommendation: RecommendationResult | null;
  answers: Record<string, string>;
}

export const ExecutiveReportModal: React.FC<ExecutiveReportModalProps> = ({
  isOpen,
  onClose,
  recommendation,
  answers,
}) => {
  const [copied, setCopied] = useState(false);
  const [format, setFormat] = useState<'markdown' | 'json'>('markdown');

  if (!isOpen) return null;

  // Fallback default recommendation if modal opened before wizard completion
  const dummyRec: RecommendationResult = recommendation || {
    primaryParadigm: {
      id: 'medallion-lakehouse',
      name: 'Medallion Lakehouse Architecture',
      tagline: 'Unified Bronze-Silver-Gold ACID Storage Layer',
      description: 'Combines open table formats (Apache Iceberg) with ACID SQL table reliability.',
      bestFor: ['Enterprises standardizing on open table formats'],
      keyPrinciples: ['Multi-hop Bronze/Silver/Gold data layers'],
      recommendedTechStack: {
        ingestion: ['Apache Kafka', 'Debezium CDC'],
        storage: ['Apache Iceberg', 'AWS S3'],
        processing: ['Apache Spark', 'dbt-core'],
        governance: ['Unity Catalog', 'OpenLineage'],
        serving: ['Trino', 'ClickHouse'],
      },
      tradeoffs: { pros: ['Zero vendor lock-in'], cons: ['Catalog management required'] },
      complexityScore: 6,
      tcoScore: 9,
      scalabilityScore: 10,
      governanceMaturityRequired: 7,
    },
    secondaryParadigm: {
      id: 'data-mesh',
      name: 'Data Mesh Architecture',
      tagline: 'Domain-Driven Decentralized Data Products',
      description: 'Domain squads own data products.',
      bestFor: ['Large enterprises'],
      keyPrinciples: ['Domain ownership'],
      recommendedTechStack: { ingestion: [], storage: [], processing: [], governance: [], serving: [] },
      tradeoffs: { pros: [], cons: [] },
      complexityScore: 9,
      tcoScore: 6,
      scalabilityScore: 10,
      governanceMaturityRequired: 9,
    },
    matchScore: 94,
    breakdown: [],
    rationale: ['Petabyte scale object storage saves 70% TCO compared to proprietary cloud warehouses.'],
    keyRisksToWatch: ['Small file compaction overhead in Iceberg catalogs.'],
    firstSteps: ['Establish PoC on Apache Iceberg REST catalog.'],
  };

  const markdownContent = generateExecutiveMarkdownReport(dummyRec, answers);
  const jsonContent = JSON.stringify({ recommendation: dummyRec, answers }, null, 2);

  const activeContent = format === 'markdown' ? markdownContent : jsonContent;

  const handleCopy = () => {
    soundEngine.playSuccess();
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    soundEngine.playSuccess();
    const ext = format === 'markdown' ? 'md' : 'json';
    const mime = format === 'markdown' ? 'text/markdown' : 'application/json';
    downloadFile(`Executive_Architecture_Blueprint.${ext}`, activeContent, mime);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-fade-in text-slate-100">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl glass-panel border border-cyan-500/40 shadow-2xl space-y-6 text-slate-100 bg-slate-950"
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
        <div className="flex items-center space-x-3.5 pr-10">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white shadow-lg cyan-glow">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Export Executive Architecture Proposal
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Export a C-Suite executive specification document ready for architecture review boards.
            </p>
          </div>
        </div>

        {/* Format Selector & Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-2xl bg-slate-900/90 border border-slate-800 gap-3">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold">
            <button
              onClick={() => {
                soundEngine.playClick();
                setFormat('markdown');
              }}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                format === 'markdown'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Markdown Proposal (.md)
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                setFormat('json');
              }}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                format === 'json'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              JSON Spec (.json)
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 transition-all"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Content'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-xs font-extrabold text-white shadow-lg cyan-glow transition-all"
            >
              <Download className="h-4 w-4" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* Code / Text Preview */}
        <pre className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto max-h-[450px] leading-relaxed shadow-inner">
          <code>{activeContent}</code>
        </pre>
      </div>
    </div>
  );
};
