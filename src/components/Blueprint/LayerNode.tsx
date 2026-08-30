import React from 'react';
import { LayerComponent } from '../../types/architecture';
import { Sparkles, ArrowUpRight, Cpu } from 'lucide-react';
import { soundEngine } from '../../utils/soundUtils';

interface LayerNodeProps {
  component: LayerComponent;
  onClick: () => void;
}

export const LayerNode: React.FC<LayerNodeProps> = ({ component, onClick }) => {
  const primaryTech = component.techOptions.openSource[0] || component.techOptions.cloudNative[0] || 'Standard';

  const handleClick = () => {
    soundEngine.playClick();
    onClick();
  };

  return (
    <div
      onClick={handleClick}
      className="p-4 rounded-2xl glass-card glass-card-hover cursor-pointer border border-slate-800/80 hover:border-cyan-500/50 flex flex-col justify-between space-y-3 relative group transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="flex items-start justify-between">
        <h4 className="font-extrabold text-xs text-white group-hover:text-cyan-300 transition-colors leading-snug">
          {component.name}
        </h4>
        <div className="p-1 rounded-lg bg-slate-900 text-slate-500 group-hover:text-cyan-400 group-hover:bg-slate-800 transition-colors shrink-0 ml-2">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </div>
      </div>

      <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
        {component.shortDesc}
      </p>

      <div className="flex items-center justify-between pt-2.5 border-t border-slate-800/80 text-[10px]">
        <span className="font-mono font-bold text-cyan-400 flex items-center space-x-1">
          <Cpu className="h-3 w-3 text-cyan-400" />
          <span>{primaryTech}</span>
        </span>
        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-900 text-slate-400 border border-slate-800 group-hover:border-cyan-500/40 group-hover:text-cyan-300 font-mono font-semibold transition-colors">
          <Sparkles className="h-2.5 w-2.5 text-cyan-400 mr-1" />
          Inspect Spec
        </span>
      </div>
    </div>
  );
};
