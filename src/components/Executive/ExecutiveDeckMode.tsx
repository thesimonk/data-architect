import React, { useState } from 'react';
import { RecommendationResult } from '../../types/architecture';
import { X, ChevronLeft, ChevronRight, Trophy, ShieldCheck, Layers, FileText, CheckCircle2 } from 'lucide-react';

interface ExecutiveDeckModeProps {
  isOpen: boolean;
  onClose: () => void;
  recommendation: RecommendationResult | null;
}

export const ExecutiveDeckMode: React.FC<ExecutiveDeckModeProps> = ({
  isOpen,
  onClose,
  recommendation,
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const totalSlides = 3;

  if (!isOpen) return null;

  const rec = recommendation?.primaryParadigm || {
    name: 'Medallion Lakehouse Architecture',
    tagline: 'Unified Bronze-Silver-Gold ACID Storage Layer',
    description: 'Combines open table formats (Apache Iceberg) with ACID SQL table reliability.',
    recommendedTechStack: {
      ingestion: ['Apache Kafka', 'Debezium CDC'],
      storage: ['Apache Iceberg', 'AWS S3'],
      processing: ['Apache Spark', 'dbt-core'],
      governance: ['Unity Catalog', 'OpenLineage'],
      serving: ['Trino', 'ClickHouse'],
    },
    tradeoffs: { pros: ['Zero vendor lock-in', '50%+ TCO Savings'], cons: ['Catalog management'] },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-2xl animate-fade-in text-slate-100">
      <div className="relative w-full max-w-5xl h-[85vh] p-8 rounded-3xl glass-panel border border-cyan-500/40 shadow-2xl flex flex-col justify-between bg-slate-900">
        {/* Slide Controls Top Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-950 text-cyan-400 border border-cyan-700">
              Executive Review Deck
            </span>
            <span className="text-xs text-slate-400 font-mono">Slide {currentSlide} of {totalSlides}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Slide 1: Paradigm Recommendation */}
        {currentSlide === 1 && (
          <div className="space-y-6 animate-fade-in my-auto">
            <span className="text-xs font-bold uppercase text-cyan-400 tracking-wider">Strategic Recommendation</span>
            <h1 className="text-4xl font-extrabold text-white">{rec.name}</h1>
            <p className="text-sm text-cyan-300 font-medium font-mono">"{rec.tagline}"</p>
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">{rec.description}</p>
            
            <div className="grid grid-cols-2 gap-4 pt-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-emerald-400 block mb-1">Key Advantage</span>
                <span className="text-slate-300">Decouples compute from storage, eliminating proprietary warehouse compute credit lock-in.</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-cyan-400 block mb-1">Scale Limit</span>
                <span className="text-slate-300">Petabyte+ scale capable with zero-copy table branching for GenAI RAG models.</span>
              </div>
            </div>
          </div>
        )}

        {/* Slide 2: Technology Stack */}
        {currentSlide === 2 && (
          <div className="space-y-6 animate-fade-in my-auto">
            <span className="text-xs font-bold uppercase text-cyan-400 tracking-wider">Target Technical Architecture</span>
            <h2 className="text-3xl font-bold text-white">Recommended Target Technology Stack</h2>
            
            <div className="grid grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-cyan-400 block mb-2">Ingestion & Streaming</span>
                <span className="font-mono text-slate-200">{rec.recommendedTechStack.ingestion.join(', ')}</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-cyan-400 block mb-2">Storage & Format</span>
                <span className="font-mono text-slate-200">{rec.recommendedTechStack.storage.join(', ')}</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-cyan-400 block mb-2">Compute & Processing</span>
                <span className="font-mono text-slate-200">{rec.recommendedTechStack.processing.join(', ')}</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-cyan-400 block mb-2">Governance & Catalog</span>
                <span className="font-mono text-slate-200">{rec.recommendedTechStack.governance.join(', ')}</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="font-bold text-cyan-400 block mb-2">Serving Engine</span>
                <span className="font-mono text-slate-200">{rec.recommendedTechStack.serving.join(', ')}</span>
              </div>
            </div>
          </div>
        )}

        {/* Slide 3: Roadmap */}
        {currentSlide === 3 && (
          <div className="space-y-6 animate-fade-in my-auto">
            <span className="text-xs font-bold uppercase text-cyan-400 tracking-wider">Implementation Execution</span>
            <h2 className="text-3xl font-bold text-white">First 90-Day Execution Roadmap</h2>
            
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start space-x-3">
                <span className="font-mono text-cyan-400 font-bold text-base">01</span>
                <div>
                  <span className="font-bold text-slate-100 block">Days 1 - 30: PoC & Catalog Standardization</span>
                  <span className="text-slate-400">Establish open Iceberg catalog and standardize raw Bronze ingestion pipelines.</span>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start space-x-3">
                <span className="font-mono text-cyan-400 font-bold text-base">02</span>
                <div>
                  <span className="font-bold text-slate-100 block">Days 31 - 60: Data Contracts & Governance</span>
                  <span className="text-slate-400">Deploy automated Data Contract assertions for top 5 operational DB sources.</span>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start space-x-3">
                <span className="font-mono text-cyan-400 font-bold text-base">03</span>
                <div>
                  <span className="font-bold text-slate-100 block">Days 61 - 90: Federated Serving & Semantic Migration</span>
                  <span className="text-slate-400">Migrate executive BI reporting and ML feature pipelines to governed Gold layer.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Slide Navigation Footer */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-4">
          <button
            onClick={() => setCurrentSlide(Math.max(1, currentSlide - 1))}
            disabled={currentSlide === 1}
            className={`flex items-center space-x-1 px-4 py-2 rounded-xl text-xs font-semibold ${
              currentSlide === 1 ? 'opacity-40 cursor-not-allowed bg-slate-900 text-slate-600' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous Slide</span>
          </button>

          <button
            onClick={() => setCurrentSlide(Math.min(totalSlides, currentSlide + 1))}
            disabled={currentSlide === totalSlides}
            className={`flex items-center space-x-1 px-4 py-2 rounded-xl text-xs font-semibold ${
              currentSlide === totalSlides ? 'opacity-40 cursor-not-allowed bg-slate-900 text-slate-600' : 'bg-cyan-600 text-slate-950 hover:bg-cyan-500 font-bold'
            }`}
          >
            <span>Next Slide</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
