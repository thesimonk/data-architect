import React, { useState } from 'react';
import { RecommendationResult } from '../../types/architecture';
import { generateExecutiveMarkdownReport, downloadFile } from '../../utils/exportUtils';
import { X, Copy, Check, Download, FileText } from 'lucide-react';

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
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = format === 'markdown' ? 'md' : 'json';
    const mime = format === 'markdown' ? 'text/markdown' : 'application/json';
    downloadFile(`Executive_Architecture_Blueprint.${ext}`, activeContent, mime);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl glass-panel border border-cyan-500/30 shadow-2xl space-y-6 text-slate-100 bg-slate-900"
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
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 text-white">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">
              Export Executive Architecture Blueprint
            </h2>
            <p className="text-xs text-slate-400">
              Download or copy a ready-to-present technical proposal for leadership and stakeholders.
            </p>
          </div>
        </div>

        {/* Format Selector & Actions Bar */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950 border border-slate-800">
          <div className="flex items-center space-x-2 text-xs font-semibold">
            <button
              onClick={() => setFormat('markdown')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                format === 'markdown'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Markdown Report (.md)
            </button>
            <button
              onClick={() => setFormat('json')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                format === 'json'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              JSON Specification (.json)
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-all"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Content'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center space-x-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-xs font-bold text-white shadow-md transition-all"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* Code / Text Preview */}
        <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto max-h-[450px]">
          <code>{activeContent}</code>
        </pre>
      </div>
    </div>
  );
};
