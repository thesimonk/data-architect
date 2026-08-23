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
  CheckCircle2
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

  return (
    <div className="space-y-6">
      {/* Progress & Step Indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-800/60 text-cyan-400">
            <IconComponent className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Dimension {currentStepIndex + 1} of {totalSteps}
            </span>
            <h2 className="text-xl font-bold text-slate-100">
              {question.title}
            </h2>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400">Completion</span>
          <div className="w-32 bg-slate-800 h-2 rounded-full mt-1 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-300"
              style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <p className="text-sm text-slate-300">
        {question.subtitle}
      </p>

      {/* Option Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {question.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          return (
            <div
              key={opt.id}
              onClick={() => onSelectOption(opt.id)}
              className={`p-5 rounded-2xl cursor-pointer glass-panel glass-panel-hover flex flex-col justify-between relative overflow-hidden transition-all duration-200 ${
                isSelected
                  ? 'border-2 border-cyan-400 bg-slate-800/90 cyan-glow'
                  : 'hover:border-slate-700'
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 text-cyan-400">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              )}
              
              <div>
                <h3 className="font-bold text-slate-100 text-base mb-2 pr-6">
                  {opt.label}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {opt.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>Scoring weight</span>
                <span className={`font-mono font-medium ${isSelected ? 'text-cyan-300' : 'text-slate-500'}`}>
                  Active
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-800">
        <button
          onClick={onPrev}
          disabled={currentStepIndex === 0}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            currentStepIndex === 0
              ? 'opacity-40 cursor-not-allowed text-slate-600 bg-slate-900'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
          }`}
        >
          Previous Dimension
        </button>

        <button
          onClick={onNext}
          disabled={!selectedOptionId}
          className={`px-6 py-2.5 rounded-xl text-xs font-semibold transition-all shadow-lg ${
            !selectedOptionId
              ? 'opacity-50 cursor-not-allowed bg-slate-800 text-slate-500'
              : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-950/50'
          }`}
        >
          {currentStepIndex === totalSteps - 1 ? 'Compute Recommendation' : 'Next Dimension'}
        </button>
      </div>
    </div>
  );
};
