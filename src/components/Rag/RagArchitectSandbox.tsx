import React, { useState } from 'react';
import { Cpu, Sparkles, CheckCircle2, Copy, Check, Terminal, Layers, Sliders } from 'lucide-react';
import { soundEngine } from '../../utils/soundUtils';

export const RagArchitectSandbox: React.FC = () => {
  const [chunkSize, setChunkSize] = useState<number>(512);
  const [overlapTokens, setOverlapTokens] = useState<number>(64);
  const [vectorDimensions, setVectorDimensions] = useState<number>(1536);
  const [vectorStore, setVectorStore] = useState<'pgvector' | 'pinecone' | 'milvus' | 'qdrant'>('pgvector');
  const [hybridBm25Weight, setHybridBm25Weight] = useState<number>(0.3); // 0.0 to 1.0
  const [copied, setCopied] = useState<boolean>(false);

  // Dynamic RAG metrics calculations
  const estimatedLatencyMs = Math.round(12 + (chunkSize / 128) + (vectorDimensions / 500));
  const estimatedRecallPercentage = Math.round(85 + (hybridBm25Weight > 0.2 && hybridBm25Weight < 0.5 ? 12 : 5));

  const codeSnippet = `# PySpark + LangChain GenAI RAG Pipeline Spec
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import ${vectorStore === 'pgvector' ? 'PGVector' : vectorStore === 'pinecone' ? 'Pinecone' : 'Milvus'}
from langchain_openai import OpenAIEmbeddings

# 1. Semantic Document Chunking
splitter = RecursiveCharacterTextSplitter(
    chunk_size=${chunkSize},
    chunk_overlap=${overlapTokens},
    separators=["\\n\\n", "\\n", " ", ""]
)

# 2. Dense Vector Embeddings Generation (${vectorDimensions} dims)
embeddings = OpenAIEmbeddings(model="text-embedding-3-large")

# 3. Hybrid BM25 (Weight: ${hybridBm25Weight}) + Vector Store Sync (${vectorStore})
vector_db = ${vectorStore === 'pgvector' ? 'PGVector' : 'Pinecone'}.from_documents(
    documents=chunks,
    embedding=embeddings,
    collection_name="enterprise_knowledge_base"
)`;

  const handleCopyCode = () => {
    soundEngine.playSuccess();
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto py-2">
      
      {/* Header Banner */}
      <div className="p-8 rounded-3xl glass-panel border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-indigo-950/90 text-indigo-300 border border-indigo-500/40 shadow-inner">
              <Cpu className="h-5 w-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              GenAI RAG Pipeline Architect Sandbox
            </h1>
          </div>
          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
            Tune document chunking windows, dense vector dimensions, hybrid search weights (BM25 + Dense Vector), and vector database providers for enterprise AI workloads.
          </p>
        </div>

        {/* Live Metrics Telemetry Card */}
        <div className="flex items-center space-x-4 bg-slate-950/90 p-4 rounded-3xl border border-indigo-500/30 cyan-glow shadow-2xl shrink-0 relative z-10">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">Est. Query Latency</span>
            <span className="font-mono text-base font-black text-cyan-300">{estimatedLatencyMs} ms</span>
          </div>
          <div className="border-l border-slate-800/80 pl-4">
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">Recall @ K=10</span>
            <span className="font-mono text-base font-black text-emerald-400">{estimatedRecallPercentage}%</span>
          </div>
        </div>
      </div>

      {/* Grid: Controls Sliders (5 cols) vs Code Spec (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controls Slider Panel (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800/80 space-y-6">
          <h3 className="text-sm font-extrabold text-white border-b border-slate-800/80 pb-4 flex items-center space-x-2">
            <Sliders className="h-4 w-4 text-indigo-400" />
            <span>RAG Pipeline Hyperparameters</span>
          </h3>

          {/* Slider 1: Chunk Size */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-slate-300">Semantic Chunk Size</span>
              <span className="font-mono font-black text-cyan-300">{chunkSize} Tokens</span>
            </div>
            <input
              type="range"
              min="128"
              max="2048"
              step="128"
              value={chunkSize}
              onChange={(e) => setChunkSize(Number(e.target.value))}
              className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400 border border-slate-800"
            />
          </div>

          {/* Slider 2: Token Overlap */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-slate-300">Chunk Overlap Window</span>
              <span className="font-mono font-black text-cyan-300">{overlapTokens} Tokens ({Math.round(overlapTokens / chunkSize * 100)}%)</span>
            </div>
            <input
              type="range"
              min="16"
              max="256"
              step="16"
              value={overlapTokens}
              onChange={(e) => setOverlapTokens(Number(e.target.value))}
              className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400 border border-slate-800"
            />
          </div>

          {/* Target Vector Store Dropdown */}
          <div className="space-y-2">
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase">Target Vector Store</label>
            <select
              value={vectorStore}
              onChange={(e) => setVectorStore(e.target.value as any)}
              className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500/60 shadow-inner"
            >
              <option value="pgvector">pgvector (PostgreSQL Extension - Zero Extra Infra)</option>
              <option value="pinecone">Pinecone Managed SaaS (Sub-10ms Index)</option>
              <option value="milvus">Milvus Open-Source Distributed Cluster</option>
              <option value="qdrant">Qdrant Rust Vector Engine</option>
            </select>
          </div>

          {/* Slider 3: Hybrid Search Ratio */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-slate-300">Hybrid Search Balance</span>
              <span className="font-mono font-black text-emerald-400">
                {Math.round(hybridBm25Weight * 100)}% BM25 / {Math.round((1 - hybridBm25Weight) * 100)}% Vector
              </span>
            </div>
            <input
              type="range"
              min="0.0"
              max="1.0"
              step="0.05"
              value={hybridBm25Weight}
              onChange={(e) => setHybridBm25Weight(Number(e.target.value))}
              className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-emerald-400 border border-slate-800"
            />
          </div>
        </div>

        {/* Live Code Spec Viewer (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800/80 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div className="flex items-center space-x-2">
              <Terminal className="h-4 w-4 text-cyan-400" />
              <h3 className="text-sm font-extrabold text-white">
                Production LangChain RAG Spec
              </h3>
            </div>
            <button
              onClick={handleCopyCode}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 transition-all"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>

          <pre className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 text-xs font-mono text-cyan-300 overflow-x-auto max-h-[420px] leading-relaxed shadow-inner">
            <code>{codeSnippet}</code>
          </pre>
        </div>

      </div>
    </div>
  );
};
