import React, { useState } from 'react';
import { WIZARD_QUESTIONS } from '../../data/wizardQuestions';
import { RecommendationResult } from '../../types/architecture';
import { calculateArchitectureRecommendation } from '../../utils/recommendationEngine';
import { QuestionStep } from './QuestionStep';
import { RecommendationResultView } from './RecommendationResult';

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
    const updated = { ...answers, [currentQuestion.id]: optionId };
    setAnswers(updated);
  };

  const handleNext = () => {
    if (currentStepIndex < WIZARD_QUESTIONS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      // Calculate final result
      const computed = calculateArchitectureRecommendation(answers);
      setResult(computed);
      if (onRecommendationCalculated) {
        onRecommendationCalculated(computed, answers);
      }
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleReset = () => {
    setResult(null);
    setCurrentStepIndex(0);
  };

  return (
    <div className="max-w-6xl mx-auto py-4">
      {!result ? (
        <div className="p-8 rounded-3xl glass-panel border border-slate-800 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h1 className="text-2xl font-black text-white">
              Enterprise Data Architecture Decision Engine
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Select your organization's operational drivers across 7 architectural dimensions to calculate your optimal data platform paradigm.
            </p>
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
