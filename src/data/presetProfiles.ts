export interface PresetProfile {
  id: string;
  name: string;
  tagline: string;
  answers: Record<string, string>;
}

export const PRESET_PROFILES: PresetProfile[] = [
  {
    id: 'fintech-streaming',
    name: 'Global FinTech Streaming Fraud Lakehouse',
    tagline: 'Sub-second real-time fraud alerts with 1M+ msgs/sec throughput and strict PCI-DSS audit compliance.',
    answers: {
      topology: 'hybrid-federated',
      velocity: 'realtime-subsecond',
      volume: 'petabyte-scale',
      compliance: 'federated-policy',
      ai: 'predictive-ml',
      team: 'distributed-systems',
      cloud: 'open-source-decoupled',
    },
  },
  {
    id: 'fortune500-mesh',
    name: 'Fortune 500 Multi-Domain Data Mesh',
    tagline: 'Decentralized domain ownership across 50+ product squads with federated computational governance.',
    answers: {
      topology: 'decentralized-domains',
      velocity: 'microbatch-minutes',
      volume: 'petabyte-scale',
      compliance: 'federated-policy',
      ai: 'bi-reporting',
      team: 'python-dbt-sql',
      cloud: 'open-source-decoupled',
    },
  },
  {
    id: 'healthcare-sovereign',
    name: 'Healthcare Sovereign Patient Data Platform',
    tagline: 'Air-gapped zero-trust multi-region patient records adhering to strict HIPAA & GDPR residency laws.',
    answers: {
      topology: 'decentralized-domains',
      velocity: 'batch-daily',
      volume: 'terabyte-scale',
      compliance: 'sovereign-strict',
      ai: 'bi-reporting',
      team: 'python-dbt-sql',
      cloud: 'hybrid-onprem-cloud',
    },
  },
  {
    id: 'ecommerce-rag',
    name: 'E-Commerce GenAI RAG Recommendation Engine',
    tagline: 'High-dimensional vector embeddings & semantic search powering real-time conversational LLM agents.',
    answers: {
      topology: 'hybrid-federated',
      velocity: 'realtime-subsecond',
      volume: 'terabyte-scale',
      compliance: 'standard-compliance',
      ai: 'genai-rag-heavy',
      team: 'python-dbt-sql',
      cloud: 'single-cloud-saas',
    },
  },
];
