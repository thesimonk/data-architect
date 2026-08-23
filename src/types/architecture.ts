export type ParadigmId = 
  | 'data-mesh'
  | 'medallion-lakehouse'
  | 'data-fabric'
  | 'modern-data-stack'
  | 'realtime-kappa'
  | 'sovereign-hybrid';

export interface ArchitectureParadigm {
  id: ParadigmId;
  name: string;
  tagline: string;
  description: string;
  bestFor: string[];
  keyPrinciples: string[];
  recommendedTechStack: {
    ingestion: string[];
    storage: string[];
    processing: string[];
    governance: string[];
    serving: string[];
  };
  tradeoffs: {
    pros: string[];
    cons: string[];
  };
  complexityScore: number; // 1-10
  tcoScore: number; // 1-10 (higher means more cost-effective)
  scalabilityScore: number; // 1-10
  governanceMaturityRequired: number; // 1-10
}

export interface WizardQuestion {
  id: string;
  category: 'topology' | 'velocity' | 'volume' | 'compliance' | 'ai' | 'team' | 'cloud';
  title: string;
  subtitle: string;
  iconName: string;
  options: {
    id: string;
    label: string;
    description: string;
    scores: Record<ParadigmId, number>;
  }[];
}

export interface LayerComponent {
  id: string;
  name: string;
  shortDesc: string;
  fullDescription: string;
  layerId: string;
  status: 'recommended' | 'optional' | 'legacy' | 'emerging';
  techOptions: {
    openSource: string[];
    cloudNative: string[];
    commercialSaaS: string[];
  };
  responsibilities: string[];
  antiPatterns: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  sampleConfigSnippet?: {
    language: string;
    code: string;
  };
}

export interface BlueprintLayer {
  id: string;
  name: string;
  shortName: string;
  order: number;
  description: string;
  iconName: string;
  colorTheme: 'cyan' | 'blue' | 'emerald' | 'purple' | 'amber' | 'rose' | 'indigo';
  components: LayerComponent[];
}

export interface ComparisonDimension {
  id: string;
  category: 'Architecture' | 'Operations' | 'Business & Team' | 'Technology';
  name: string;
  description: string;
  scores: Record<ParadigmId, {
    score: number; // 1-5
    summary: string;
  }>;
}

export interface DataContractSpec {
  domain: string;
  dataProductName: string;
  version: string;
  ownerTeam: string;
  slaLatency: string;
  qualityChecks: string[];
  schemaFields: {
    name: string;
    type: string;
    pii: boolean;
    description: string;
  }[];
  consumerPolicy: string;
}

export interface ReferenceArticle {
  id: string;
  category: 'Patterns' | 'Storage & Formats' | 'Governance & Contracts' | 'FinOps & Cost' | 'AI & Semantic';
  title: string;
  summary: string;
  content: string;
  keyTakeaways: string[];
  codeExample?: {
    title: string;
    language: string;
    code: string;
  };
}

export interface RecommendationResult {
  primaryParadigm: ArchitectureParadigm;
  secondaryParadigm: ArchitectureParadigm;
  matchScore: number; // 0-100%
  breakdown: {
    paradigmId: ParadigmId;
    score: number;
    maxPossibleScore: number;
    percentage: number;
  }[];
  rationale: string[];
  keyRisksToWatch: string[];
  firstSteps: string[];
}
