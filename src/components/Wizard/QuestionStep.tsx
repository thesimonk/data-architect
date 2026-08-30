import React from 'react';
import { WizardQuestion } from '../../types/architecture';
import { 
  Users, 
  Zap, 
  Database, 
  ShieldCheck, 
  Cpu, 
  Wrench, 
  Cloud,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface QuestionStepProps {
  question: WizardQuestion;
  currentStepIndex: number;
  totalSteps: number;
  selectedOptionId?: string;
  onSelectOption: (optionId: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Users,
  Zap,
  Database,
  ShieldCheck,
  Cpu,
  Wrench,
  Cloud,
};

export const QuestionStep: React.FC<QuestionStepProps> = ({
  question,
  currentStepIndex,
  totalSteps,
  selectedOptionId,
  onSelectOption,
  onNext,
  onPrev,
}) => {
  const IconComponent = ICON_MAP[question.iconName] || Database;
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Progress & Visual Step Nodes Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-cyan-950/90 border border-cyan-500/40 text-cyan-300 shadow-lg shadow-cyan-950/50">
              <IconComponent className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-extrabold uppercase tracking-widest text-cyan-400 flex items-center space-x-1.5">
                <Sparkles className="h-3 w-3 text-cyan-400" />
                <span>Dimension {currentStepIndex + 1} of {totalSteps}</span>
              </span>
              <h2 className="text-2xl font-black text-white tracking-tight">
                {question.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-slate-900/80 px-4 py-2 rounded-2xl border border-slate-800 self-start sm:self-auto">
            <div className="text-right">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Engine Progress</div>
              <div className="text-xs font-mono font-bold text-cyan-300">{progressPercent}% Completed</div>
            </div>
            <div className="w-24 bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800 p-0.5">
              <div 
                className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 h-full rounded-full transition-all duration-500 cyan-glow"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Step Checkpoints Line */}
        <div className="grid grid-cols-7 gap-1.5 pt-1">
          {Array.from({ length: totalSteps }).map((_, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            return (
              <div 
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-cyan-500 cyan-glow' 
                    : isCurrent 
                      ? 'bg-gradient-to-r from-cyan-400 to-indigo-500 animate-pulse' 
                      : 'bg-slate-800/80'
                }`}
              />
            );
          })}
        </div>

        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          {question.subtitle}
        </p>
      </div>

      {/* Option Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {question.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          return (
            <div
              key={opt.id}
              onClick={() => onSelectOption(opt.id)}
              className={`p-6 rounded-3xl cursor-pointer glass-card glass-card-hover flex flex-col justify-between relative overflow-hidden transition-all duration-300 group ${
                isSelected
                  ? 'border-2 border-cyan-400 bg-slate-900/90 cyan-glow shadow-2xl scale-[1.02]'
                  : 'hover:border-slate-700/80'
              }`}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 text-cyan-400 bg-cyan-950 p-1.5 rounded-full border border-cyan-500/50 shadow-md">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              )}

              <div>
                <h3 className="font-extrabold text-white text-base mb-2.5 pr-8 group-hover:text-cyan-300 transition-colors">
                  {opt.label}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {opt.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-mono">Scoring Impact</span>
                <span className={`font-mono font-bold px-2 py-0.5 rounded-md ${
                  isSelected 
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40' 
                    : 'bg-slate-950 text-slate-400 border border-slate-800'
                }`}>
                  {isSelected ? '✓ Selected Driver' : 'Click to Select'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-800/80">
        <button
          onClick={onPrev}
          disabled={currentStepIndex === 0}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            currentStepIndex === 0
              ? 'opacity-30 cursor-not-allowed text-slate-600 bg-slate-900/50 border border-slate-800'
              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Previous Step</span>
        </button>

        <button
          onClick={onNext}
          disabled={!selectedOptionId}
          className={`flex items-center space-x-2 px-7 py-3 rounded-2xl text-xs font-extrabold transition-all duration-300 shadow-xl ${
            !selectedOptionId
              ? 'opacity-40 cursor-not-allowed bg-slate-900 text-slate-500 border border-slate-800'
              : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-cyan-950/60 cyan-glow transform hover:-translate-y-0.5'
          }`}
        >
          <span>{currentStepIndex === totalSteps - 1 ? 'Compute Final Architecture' : 'Next Dimension'}</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
