import React, { useState } from 'react';
import { WIZARD_QUESTIONS } from '../../data/wizardQuestions';
import { PRESET_PROFILES } from '../../data/presetProfiles';
import { RecommendationResult } from '../../types/architecture';
import { calculateArchitectureRecommendation } from '../../utils/recommendationEngine';
import { soundEngine } from '../../utils/soundUtils';
import { QuestionStep } from './QuestionStep';
import { RecommendationResultView } from './RecommendationResult';
import { Zap, Sparkles, SlidersHorizontal, ChevronRight } from 'lucide-react';

interface DecisionWizardProps {
  onNavigateToBlueprint: () => void;
  onRecommendationCalculated?: (rec: RecommendationResult, answers: Record<string, string>) => void;
}

export const DecisionWizard: React.FC<DecisionWizardProps> = ({
  onNavigateToBlueprint,
  onRecommendationCalculated,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({
    topology: 'decentralized-domains',
    velocity: 'microbatch-minutes',
    volume: 'petabyte-scale',
    compliance: 'federated-policy',
    ai: 'genai-rag-heavy',
    team: 'python-dbt-sql',
    cloud: 'open-source-decoupled',
  });
  const [result, setResult] = useState<RecommendationResult | null>(null);

  const currentQuestion = WIZARD_QUESTIONS[currentStepIndex];

  const handleSelectOption = (optionId: string) => {
    soundEngine.playClick();
    const updated = { ...answers, [currentQuestion.id]: optionId };
    setAnswers(updated);
  };

  const handleSelectPreset = (presetAnswers: Record<string, string>) => {
    soundEngine.playSuccess();
    setAnswers(presetAnswers);
    const computed = calculateArchitectureRecommendation(presetAnswers);
    setResult(computed);
    if (onRecommendationCalculated) {
      onRecommendationCalculated(computed, presetAnswers);
    }
  };

  const handleNext = () => {
    soundEngine.playClick();
    if (currentStepIndex < WIZARD_QUESTIONS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      const computed = calculateArchitectureRecommendation(answers);
      setResult(computed);
      if (onRecommendationCalculated) {
        onRecommendationCalculated(computed, answers);
      }
    }
  };

  const handlePrev = () => {
    soundEngine.playClick();
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleReset = () => {
    soundEngine.playClick();
    setResult(null);
    setCurrentStepIndex(0);
  };

  return (
    <div className="max-w-6xl mx-auto py-2">
      {!result ? (
        <div className="p-8 rounded-3xl glass-panel border border-slate-800/80 shadow-2xl space-y-8 relative overflow-hidden">
          
          {/* Subtle Ambient Background Light */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header & Instant Presets Section */}
          <div className="border-b border-slate-800/80 pb-6 space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="p-2 rounded-xl bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <h1 className="text-2xl font-black text-white tracking-tight">
                    Enterprise Data Architecture Decision Engine
                  </h1>
                </div>
                <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                  Evaluate real-time operational drivers across 7 core architectural dimensions or launch a pre-validated enterprise profile.
                </p>
              </div>

              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400">
                <SlidersHorizontal className="h-3.5 w-3.5 text-cyan-400" />
                <span>Deterministic Scoring Engine</span>
              </div>
            </div>

            {/* Instant Enterprise Profiles Bar */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="uppercase font-mono font-bold text-cyan-400 tracking-wider flex items-center space-x-1.5">
                  <Zap className="h-3 w-3 text-cyan-400" />
                  <span>1-Click Industry Benchmark Profiles:</span>
                </span>
                <span className="text-slate-500">Auto-populates all 7 dimensions</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {PRESET_PROFILES.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset.answers)}
                    className="p-4 rounded-2xl glass-card glass-card-hover text-left transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-extrabold text-xs text-slate-200 group-hover:text-cyan-300 transition-colors">
                          {preset.name}
                        </span>
                        <ChevronRight className="h-3.5 w-3.5 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                      </div>
                      <span className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed block">
                        {preset.tagline}
                      </span>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
                      <span className="font-mono text-cyan-400">Instant Run</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <QuestionStep
            question={currentQuestion}
            currentStepIndex={currentStepIndex}
            totalSteps={WIZARD_QUESTIONS.length}
            selectedOptionId={answers[currentQuestion.id]}
            onSelectOption={handleSelectOption}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        </div>
      ) : (
        <RecommendationResultView
          result={result}
          onReset={handleReset}
          onNavigateToBlueprint={onNavigateToBlueprint}
        />
      )}
    </div>
  );
};
