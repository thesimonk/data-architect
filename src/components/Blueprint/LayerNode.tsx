import React from 'react';
import { LayerComponent } from '../../types/architecture';
import { Sparkles, ArrowUpRight } from 'lucide-react';

interface LayerNodeProps {
  component: LayerComponent;
  onClick: () => void;
}

export const LayerNode: React.FC<LayerNodeProps> = ({ component, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="p-4 rounded-xl glass-panel glass-panel-hover cursor-pointer border border-slate-800 hover:border-cyan-500/50 flex flex-col justify-between space-y-3 relative group"
    >
      <div className="flex items-start justify-between">
        <h4 className="font-bold text-xs text-slate-100 group-hover:text-cyan-300 transition-colors">
          {component.name}
        </h4>
        <ArrowUpRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0 ml-2" />
      </div>

      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
        {component.shortDesc}
      </p>

      <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[10px]">
        <span className="font-mono text-cyan-400/90 font-medium">
          {component.techOptions.openSource[0] || component.techOptions.cloudNative[0]}
        </span>
        <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
          <Sparkles className="h-2.5 w-2.5 text-cyan-400 mr-1" />
          Spec
        </span>
      </div>
    </div>
  );
};
