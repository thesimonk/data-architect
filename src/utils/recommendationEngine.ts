import { PARADIGMS } from '../data/paradigms';
import { WIZARD_QUESTIONS } from '../data/wizardQuestions';
import { ParadigmId, RecommendationResult } from '../types/architecture';

export function calculateArchitectureRecommendation(
  answers: Record<string, string>
): RecommendationResult {
  // Initialize scores map
  const paradigmScores: Record<ParadigmId, number> = {
    'medallion-lakehouse': 0,
    'data-mesh': 0,
    'data-fabric': 0,
    'modern-data-stack': 0,
    'realtime-kappa': 0,
    'sovereign-hybrid': 0,
  };

  const paradigmMaxScores: Record<ParadigmId, number> = {
    'medallion-lakehouse': 0,
    'data-mesh': 0,
    'data-fabric': 0,
    'modern-data-stack': 0,
    'realtime-kappa': 0,
    'sovereign-hybrid': 0,
  };

  // Calculate accumulated score & max possible score per paradigm
  WIZARD_QUESTIONS.forEach((q) => {
    const selectedOptionId = answers[q.id];
    
    // Find max score achievable for this question per paradigm
    const maxScoresForQuestion: Record<ParadigmId, number> = {
      'medallion-lakehouse': 0,
      'data-mesh': 0,
      'data-fabric': 0,
      'modern-data-stack': 0,
      'realtime-kappa': 0,
      'sovereign-hybrid': 0,
    };

    q.options.forEach((opt) => {
      (Object.keys(opt.scores) as ParadigmId[]).forEach((pId) => {
        if (opt.scores[pId] > maxScoresForQuestion[pId]) {
          maxScoresForQuestion[pId] = opt.scores[pId];
        }
      });
    });

    (Object.keys(maxScoresForQuestion) as ParadigmId[]).forEach((pId) => {
      paradigmMaxScores[pId] += maxScoresForQuestion[pId];
    });

    if (selectedOptionId) {
      const selectedOpt = q.options.find((o) => o.id === selectedOptionId);
      if (selectedOpt) {
        (Object.keys(selectedOpt.scores) as ParadigmId[]).forEach((pId) => {
          paradigmScores[pId] += selectedOpt.scores[pId];
        });
      }
    }
  });

  // Calculate percentage scores
  const breakdown = (Object.keys(paradigmScores) as ParadigmId[])
    .map((pId) => {
      const score = paradigmScores[pId];
      const max = paradigmMaxScores[pId] || 1;
      const percentage = Math.min(100, Math.round((score / max) * 100));
      return {
        paradigmId: pId,
        score,
        maxPossibleScore: max,
        percentage,
      };
    })
    .sort((a, b) => b.percentage - a.percentage);

  const primaryId = breakdown[0].paradigmId;
  const secondaryId = breakdown[1].paradigmId;

  const primaryParadigm = PARADIGMS.find((p) => p.id === primaryId) || PARADIGMS[0];
  const secondaryParadigm = PARADIGMS.find((p) => p.id === secondaryId) || PARADIGMS[1];

  // Dynamic Rationale synthesis based on specific answers
  const rationale: string[] = [];
  const risks: string[] = [];
  const firstSteps: string[] = [];

  if (answers.topology === 'decentralized-domains' || answers.topology === 'hybrid-federated') {
    rationale.push(
      `Your organization has decentralized domain squads or federated teams. ${primaryParadigm.name} provides clear domain boundaries without central platform bottlenecks.`
    );
  } else {
    rationale.push(
      `Your centralized data team structure aligns well with ${primaryParadigm.name}'s unified governance model.`
    );
  }

  if (answers.velocity === 'realtime-subsecond') {
    rationale.push(
      `Sub-second streaming requirements require event-driven architecture components built into ${primaryParadigm.name}.`
    );
  } else if (answers.velocity === 'microbatch-minutes') {
    rationale.push(
      `Near real-time micro-batch SLAs are seamlessly handled by ${primaryParadigm.name}'s streaming lakehouse table sinks.`
    );
  }

  if (answers.volume === 'petabyte-scale') {
    rationale.push(
      `At multi-petabyte scale, ${primaryParadigm.name} provides massive cost savings over proprietary SaaS data warehouses by leveraging open object storage.`
    );
  }

  if (answers.compliance === 'sovereign-strict') {
    rationale.push(
      `Strict regulatory compliance and data residency constraints are natively supported via localized zero-trust boundaries.`
    );
  }

  // Key risks synthesis
  if (primaryParadigm.id === 'data-mesh') {
    risks.push('Risk of domain silo duplication if self-serve infrastructure automation is not strictly enforced.');
    risks.push('Organizational resistance during transition from central BI to domain data product owners.');
  } else if (primaryParadigm.id === 'medallion-lakehouse') {
    risks.push('Neglecting background Iceberg snapshot cleanup & file compaction can lead to small-file performance degradation.');
    risks.push('Operational overhead of maintaining an enterprise REST data catalog.');
  } else if (primaryParadigm.id === 'realtime-kappa') {
    risks.push('Stateful streaming joins in Flink require specialized stream engineering expertise.');
    risks.push('Replaying historical event logs requires careful topic retention capacity planning.');
  } else {
    risks.push('Monitor cloud compute credit burn rate during high-concurrency executive dashboard query spikes.');
  }

  // First steps recommendation
  firstSteps.push(`Establish a proof-of-concept (PoC) showcasing ${primaryParadigm.name} on a high-value business domain.`);
  firstSteps.push('Standardize open data formats (Apache Iceberg / Parquet) across all Bronze and Silver pipelines.');
  firstSteps.push('Implement automated Data Contracts for top 5 incoming data source microservices.');
  firstSteps.push('Set up unified metadata catalog (OpenMetadata / Unity Catalog) for enterprise discovery.');

  return {
    primaryParadigm,
    secondaryParadigm,
    matchScore: breakdown[0].percentage,
    breakdown,
    rationale,
    keyRisksToWatch: risks,
    firstSteps,
  };
}
