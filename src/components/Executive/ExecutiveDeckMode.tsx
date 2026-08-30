import React, { useState, useEffect } from 'react';
import { RecommendationResult } from '../../types/architecture';
import { X, ChevronLeft, ChevronRight, Trophy, ShieldCheck, Layers, FileText, CheckCircle2, Sparkles } from 'lucide-react';
import { soundEngine } from '../../utils/soundUtils';

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight') {
        setCurrentSlide((prev) => Math.min(totalSlides, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => Math.max(1, prev - 1));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

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

  const handleNextSlide = () => {
    soundEngine.playClick();
    setCurrentSlide(Math.min(totalSlides, currentSlide + 1));
  };

  const handlePrevSlide = () => {
    soundEngine.playClick();
    setCurrentSlide(Math.max(1, currentSlide - 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-2xl animate-fade-in text-slate-100">
      <div 
        className="relative w-full max-w-5xl h-[85vh] p-8 sm:p-10 rounded-3xl glass-panel border border-cyan-500/40 shadow-2xl flex flex-col justify-between bg-slate-950"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Slide Controls Top Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-700/60 shadow-inner">
              C-Suite Executive Pitch Deck
            </span>
            <span className="text-xs text-slate-400 font-mono font-bold">Slide {currentSlide} of {totalSlides}</span>
          </div>

          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="p-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Slide 1: Strategic Recommendation */}
        {currentSlide === 1 && (
          <div className="space-y-6 animate-fade-in my-auto">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              <Sparkles className="h-4 w-4" />
              <span>Target Architectural Paradigm</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">{rec.name}</h1>
            <p className="text-base text-cyan-300 font-semibold font-mono">"{rec.tagline}"</p>
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">{rec.description}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs">
              <div className="p-5 rounded-2xl glass-card border border-emerald-500/30">
                <span className="font-bold text-emerald-400 block mb-1">Key Executive Advantage</span>
                <span className="text-slate-300 leading-relaxed">Decouples compute from open table storage, eliminating proprietary warehouse compute credit lock-in and reducing TCO by over 50%.</span>
              </div>
              <div className="p-5 rounded-2xl glass-card border border-cyan-500/30">
                <span className="font-bold text-cyan-400 block mb-1">Enterprise Scale Target</span>
                <span className="text-slate-300 leading-relaxed">Petabyte+ scale capable with zero-copy table branching for GenAI RAG and real-time analytics.</span>
              </div>
            </div>
          </div>
        )}

        {/* Slide 2: Technology Stack */}
        {currentSlide === 2 && (
          <div className="space-y-6 animate-fade-in my-auto">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              <Layers className="h-4 w-4" />
              <span>Target Technology Stack</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Recommended Target Technology Stack</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl glass-card">
                <span className="font-mono text-[10px] font-bold text-cyan-400 uppercase block mb-1">Ingestion & Streaming</span>
                <span className="font-mono text-slate-200 font-bold">{rec.recommendedTechStack.ingestion.join(', ')}</span>
              </div>
              <div className="p-4 rounded-2xl glass-card">
                <span className="font-mono text-[10px] font-bold text-cyan-400 uppercase block mb-1">Storage & Table Format</span>
                <span className="font-mono text-slate-200 font-bold">{rec.recommendedTechStack.storage.join(', ')}</span>
              </div>
              <div className="p-4 rounded-2xl glass-card">
                <span className="font-mono text-[10px] font-bold text-cyan-400 uppercase block mb-1">Compute & Transformation</span>
                <span className="font-mono text-slate-200 font-bold">{rec.recommendedTechStack.processing.join(', ')}</span>
              </div>
              <div className="p-4 rounded-2xl glass-card">
                <span className="font-mono text-[10px] font-bold text-cyan-400 uppercase block mb-1">Governance & Lineage</span>
                <span className="font-mono text-slate-200 font-bold">{rec.recommendedTechStack.governance.join(', ')}</span>
              </div>
              <div className="p-4 rounded-2xl glass-card">
                <span className="font-mono text-[10px] font-bold text-cyan-400 uppercase block mb-1">Serving Engine</span>
                <span className="font-mono text-slate-200 font-bold">{rec.recommendedTechStack.serving.join(', ')}</span>
              </div>
            </div>
          </div>
        )}

        {/* Slide 3: 90-Day Execution Roadmap */}
        {currentSlide === 3 && (
          <div className="space-y-6 animate-fade-in my-auto">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              <ShieldCheck className="h-4 w-4" />
              <span>Implementation Strategy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">First 90-Day Execution Roadmap</h2>
            
            <div className="space-y-3.5 text-xs">
              <div className="p-4 rounded-2xl glass-card flex items-start space-x-4">
                <span className="font-mono text-cyan-400 font-black text-lg">01</span>
                <div>
                  <span className="font-bold text-white text-sm block">Days 1 - 30: PoC & Open Catalog Standardization</span>
                  <span className="text-slate-300">Establish open Iceberg catalog and standardize raw Bronze ingestion pipelines on S3/ADLS.</span>
                </div>
              </div>
              <div className="p-4 rounded-2xl glass-card flex items-start space-x-4">
                <span className="font-mono text-cyan-400 font-black text-lg">02</span>
                <div>
                  <span className="font-bold text-white text-sm block">Days 31 - 60: Data Contracts & Automated Quality</span>
                  <span className="text-slate-400">Deploy automated Data Contract assertions and PII masking policies for top 5 DB sources.</span>
                </div>
              </div>
              <div className="p-4 rounded-2xl glass-card flex items-start space-x-4">
                <span className="font-mono text-cyan-400 font-black text-lg">03</span>
                <div>
                  <span className="font-bold text-white text-sm block">Days 61 - 90: Federated Serving & Production Migration</span>
                  <span className="text-slate-400">Migrate executive BI reporting and ML feature pipelines to governed Gold layer.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Slide Navigation Footer Bar */}
        <div className="flex items-center justify-between border-t border-slate-800/80 pt-4">
          <button
            onClick={handlePrevSlide}
            disabled={currentSlide === 1}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              currentSlide === 1 
                ? 'opacity-30 cursor-not-allowed bg-slate-900/50 text-slate-600 border border-slate-800' 
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800'
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous Slide</span>
          </button>

          <div className="text-[11px] text-slate-500 hidden sm:block">
            Use <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-cyan-300">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-cyan-300">→</kbd> keys to navigate
          </div>

          <button
            onClick={handleNextSlide}
            disabled={currentSlide === totalSlides}
            className={`flex items-center space-x-2 px-6 py-2.5 rounded-2xl text-xs font-extrabold transition-all duration-300 ${
              currentSlide === totalSlides 
                ? 'opacity-30 cursor-not-allowed bg-slate-900/50 text-slate-600 border border-slate-800' 
                : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg cyan-glow'
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
