import React, { useState } from 'react';
import { REFERENCE_ARTICLES } from '../../data/referenceLibrary';
import { BookOpen, Search, Sparkles, CheckCircle2, Copy, Check } from 'lucide-react';

export const KnowledgeBase: React.FC = () => {
  const [selectedArticleId, setSelectedArticleId] = useState<string>(REFERENCE_ARTICLES[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const filteredArticles = REFERENCE_ARTICLES.filter(
    (art) =>
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeArticle = REFERENCE_ARTICLES.find((a) => a.id === selectedArticleId) || REFERENCE_ARTICLES[0];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto py-4">
      
      {/* Header & Search */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/60">
              <BookOpen className="h-4 w-4" />
            </span>
            <h1 className="text-2xl font-extrabold text-white">
              Senior Data Architect Reference Compendium
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Technical deep-dives into storage formats, CAP theorem tradeoffs, FinOps cost optimization, and RAG architectures.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search architectural topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Grid: Article Selector List vs Active Reading View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Article Cards Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-3 max-h-[700px] overflow-y-auto pr-1">
          {filteredArticles.map((art) => {
            const isSelected = art.id === activeArticle.id;
            return (
              <div
                key={art.id}
                onClick={() => setSelectedArticleId(art.id)}
                className={`p-4 rounded-2xl cursor-pointer glass-panel transition-all duration-200 space-y-2 ${
                  isSelected
                    ? 'border-2 border-cyan-400 bg-slate-800/90 cyan-glow'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800/60">
                    {art.category}
                  </span>
                </div>
                <h3 className="font-bold text-xs text-slate-100 leading-snug">
                  {art.title}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {art.summary}
                </p>
              </div>
            );
          })}
        </div>

        {/* Article Content Viewer (8 cols) */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 space-y-6 bg-slate-900/90">
          <div className="space-y-2 border-b border-slate-800 pb-4">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800">
              {activeArticle.category}
            </span>
            <h2 className="text-2xl font-black text-white pt-2">
              {activeArticle.title}
            </h2>
            <p className="text-xs text-cyan-300 font-medium">
              {activeArticle.summary}
            </p>
          </div>

          {/* Body Content */}
          <div className="text-xs text-slate-300 leading-relaxed space-y-4 whitespace-pre-line">
            {activeArticle.content}
          </div>

          {/* Key Takeaways */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center space-x-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Key Architectural Takeaways</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {activeArticle.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Code Example if present */}
          {activeArticle.codeExample && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {activeArticle.codeExample.title} ({activeArticle.codeExample.language})
                </span>
                <button
                  onClick={() => handleCopyCode(activeArticle.codeExample!.code)}
                  className="flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-all"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto">
                <code>{activeArticle.codeExample.code}</code>
              </pre>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
