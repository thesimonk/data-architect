import React, { useState } from 'react';
import { WIZARD_QUESTIONS } from '../../data/wizardQuestions';
import { PRESET_PROFILES } from '../../data/presetProfiles';
import { RecommendationResult } from '../../types/architecture';
import { calculateArchitectureRecommendation } from '../../utils/recommendationEngine';
import { soundEngine } from '../../utils/soundUtils';
import { QuestionStep } from './QuestionStep';
import { RecommendationResultView } from './RecommendationResult';
import { Zap, Sparkles } from 'lucide-react';

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
    <div className="max-w-6xl mx-auto py-4">
      {!result ? (
        <div className="p-8 rounded-3xl glass-panel border border-slate-800 shadow-xl space-y-6">
          
          {/* Header & Instant Presets Bar */}
          <div className="border-b border-slate-800 pb-5 space-y-4">
            <div>
              <h1 className="text-2xl font-black text-white flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-cyan-400" />
                <span>Enterprise Data Architecture Decision Engine</span>
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Select your operational drivers across 7 architectural dimensions or choose a 1-click enterprise preset profile.
              </p>
            </div>

            {/* Instant Enterprise Presets Bar */}
            <div className="space-y-2 pt-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                Instant Enterprise Presets (1-Click Evaluation):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {PRESET_PROFILES.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset.answers)}
                    className="p-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 text-left transition-all group"
                  >
                    <span className="font-bold text-xs text-slate-200 group-hover:text-cyan-300 block mb-0.5">
                      {preset.name}
                    </span>
                    <span className="text-[10px] text-slate-400 line-clamp-2 block leading-relaxed">
                      {preset.tagline}
                    </span>
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
