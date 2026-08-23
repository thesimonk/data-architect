import { ComparisonDimension } from '../types/architecture';

export const COMPARISON_DIMENSIONS: ComparisonDimension[] = [
  {
    id: 'complexity',
    category: 'Operations',
    name: 'Operational & Infra Complexity',
    description: 'Degree of operational overhead, cluster management, and system administration required.',
    scores: {
      'modern-data-stack': { score: 5, summary: 'Lowest complexity; managed SaaS services handle infrastructure.' },
      'medallion-lakehouse': { score: 3, summary: 'Moderate; catalog and compaction management required.' },
      'data-mesh': { score: 2, summary: 'High; requires self-serve platform & multi-domain infrastructure governance.' },
      'data-fabric': { score: 2, summary: 'High; virtual query optimization and active metadata graphs require expertise.' },
      'realtime-kappa': { score: 2, summary: 'High; streaming state management and Flink cluster ops are complex.' },
      'sovereign-hybrid': { score: 1, summary: 'Highest; multi-region Kubernetes, HSM encryption, and air-gapped networks.' }
    }
  },
  {
    id: 'tco',
    category: 'Operations',
    name: 'Total Cost of Ownership (TCO)',
    description: 'Long-term cost efficiency at scale across compute, storage, licensing, and headcount.',
    scores: {
      'medallion-lakehouse': { score: 5, summary: 'Highest efficiency; open object storage + decoupled compute on Iceberg.' },
      'realtime-kappa': { score: 4, summary: 'Strong; avoids duplicate batch/speed layer infrastructure.' },
      'modern-data-stack': { score: 3, summary: 'Moderate; SaaS licensing + warehouse credit consumption can scale quickly.' },
      'data-mesh': { score: 3, summary: 'Moderate; requires self-serve platform to prevent duplicate domain compute.' },
      'data-fabric': { score: 2, summary: 'Expensive enterprise software virtualization licenses.' },
      'sovereign-hybrid': { score: 2, summary: 'Higher due to multi-region redundant infrastructure.' }
    }
  },
  {
    id: 'scale',
    category: 'Architecture',
    name: 'Scalability Limit (Storage & Compute)',
    description: 'Upper boundary of data storage, throughput, and concurrent query performance.',
    scores: {
      'medallion-lakehouse': { score: 5, summary: 'Petabyte+ scale; object storage + Spark/Trino scales infinitely.' },
      'data-mesh': { score: 5, summary: 'Infinite organizational scale by distributing ownership across domains.' },
      'realtime-kappa': { score: 5, summary: 'Sub-second petabyte scale on Kafka + Flink + ClickHouse.' },
      'sovereign-hybrid': { score: 4, summary: 'Scales globally across sovereign regions.' },
      'data-fabric': { score: 4, summary: 'Scales across existing database assets via query virtualization.' },
      'modern-data-stack': { score: 4, summary: 'High warehouse scale, though costs spike at high concurrency.' }
    }
  },
  {
    id: 'autonomy',
    category: 'Business & Team',
    name: 'Domain & Team Autonomy',
    description: 'Empowers product squads to build, deploy, and own data without central team bottlenecks.',
    scores: {
      'data-mesh': { score: 5, summary: 'Maximum autonomy; domain squads own schemas, pipelines, and SLAs.' },
      'medallion-lakehouse': { score: 4, summary: 'Strong when paired with domain catalogs or Unity Catalog workspaces.' },
      'sovereign-hybrid': { score: 3, summary: 'Regional teams have autonomy within strict boundary rules.' },
      'modern-data-stack': { score: 3, summary: 'Central analytics team usually manages dbt models.' },
      'data-fabric': { score: 3, summary: 'Automated integration bridges team silos.' },
      'realtime-kappa': { score: 2, summary: 'Stream pipelines often require centralized stream ops specialization.' }
    }
  },
  {
    id: 'latency',
    category: 'Technology',
    name: 'Real-Time Query & Event Latency',
    description: 'Freshness of incoming data from source commit to query availability.',
    scores: {
      'realtime-kappa': { score: 5, summary: 'Sub-second event stream processing (< 100ms).' },
      'medallion-lakehouse': { score: 4, summary: 'Near real-time via streaming table sinks (1 - 5 mins).' },
      'data-fabric': { score: 3, summary: 'Query virtualization latency depends on underlying operational DBs.' },
      'sovereign-hybrid': { score: 3, summary: 'Sovereignty boundary checks add minimal networking overhead.' },
      'modern-data-stack': { score: 2, summary: 'Micro-batch to daily scheduled ELT pipelines.' },
      'data-mesh': { score: 3, summary: 'Varies by domain product SLA.' }
    }
  },
  {
    id: 'ai',
    category: 'Technology',
    name: 'AI, LLM & Vector Readiness',
    description: 'Native capability to support unstructured document embeddings, RAG, and ML training.',
    scores: {
      'medallion-lakehouse': { score: 5, summary: 'Native support for unstructured files, Parquet, and Spark ML / PyTorch.' },
      'realtime-kappa': { score: 5, summary: 'Ideal for streaming feature stores and real-time LLM agent context.' },
      'data-mesh': { score: 4, summary: 'Domains publish domain-specific vector data products.' },
      'sovereign-hybrid': { score: 4, summary: 'Sovereign AI models trained locally without data export.' },
      'data-fabric': { score: 3, summary: 'Knowledge graph provides semantic metadata for RAG.' },
      'modern-data-stack': { score: 3, summary: 'Primarily structured tabular SQL; requires external vector DB.' }
    }
  },
  {
    id: 'cloud-lockin',
    category: 'Technology',
    name: 'Vendor Lock-In Avoidance (Portability)',
    description: 'Ability to migrate compute engines or cloud providers without rewriting storage layers.',
    scores: {
      'medallion-lakehouse': { score: 5, summary: 'Zero lock-in with open Apache Iceberg & Parquet standard formats.' },
      'sovereign-hybrid': { score: 5, summary: 'Multi-cloud by design with MinIO, Kubernetes, and open standards.' },
      'realtime-kappa': { score: 4, summary: 'Open source Kafka + Flink + ClickHouse stack.' },
      'data-mesh': { score: 4, summary: 'Decoupled domain products with standardized interfaces.' },
      'data-fabric': { score: 2, summary: 'Vendor lock-in to commercial virtualization/fabric suites.' },
      'modern-data-stack': { score: 2, summary: 'Higher lock-in to proprietary cloud warehouse SQL dialects.' }
    }
  },
  {
    id: 'governance',
    category: 'Business & Team',
    name: 'Federated Governance & Lineage',
    description: 'Automated data contracts, column-level security, and audit compliance.',
    scores: {
      'sovereign-hybrid': { score: 5, summary: 'Maximum compliance with zero-trust data residency rules.' },
      'data-fabric': { score: 5, summary: 'Active metadata graph automatically discovers lineage and policies.' },
      'data-mesh': { score: 5, summary: 'Federated computational governance built into self-serve platform.' },
      'medallion-lakehouse': { score: 4, summary: 'Robust unified catalogs (Unity Catalog, OpenMetadata).' },
      'modern-data-stack': { score: 3, summary: 'Lineage tracked via dbt docs and catalog extensions.' },
      'realtime-kappa': { score: 3, summary: 'Confluent Schema Registry + event lineage.' }
    }
  }
];
