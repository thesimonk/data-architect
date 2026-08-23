import { WizardQuestion } from '../types/architecture';

export const WIZARD_QUESTIONS: WizardQuestion[] = [
  {
    id: 'topology',
    category: 'topology',
    title: 'Organizational Topology & Team Structure',
    subtitle: 'How is your data engineering and analytical talent organized across the enterprise?',
    iconName: 'Users',
    options: [
      {
        id: 'centralized',
        label: 'Centralized Core Data Team',
        description: 'Single centralized team serving BI reports and pipelines for all business units.',
        scores: {
          'modern-data-stack': 10,
          'medallion-lakehouse': 8,
          'data-fabric': 5,
          'data-mesh': 2,
          'realtime-kappa': 6,
          'sovereign-hybrid': 5,
        }
      },
      {
        id: 'decentralized-domains',
        label: 'Decentralized Domain Business Units',
        description: 'Multiple autonomous product squads and business domains owning their own systems.',
        scores: {
          'data-mesh': 10,
          'data-fabric': 7,
          'medallion-lakehouse': 6,
          'modern-data-stack': 4,
          'realtime-kappa': 5,
          'sovereign-hybrid': 7,
        }
      },
      {
        id: 'hybrid-federated',
        label: 'Federated Core Platform + Domain Analysts',
        description: 'Central data platform team providing self-serve infrastructure to domain squads.',
        scores: {
          'medallion-lakehouse': 9,
          'data-mesh': 9,
          'data-fabric': 8,
          'modern-data-stack': 7,
          'realtime-kappa': 6,
          'sovereign-hybrid': 6,
        }
      }
    ]
  },
  {
    id: 'velocity',
    category: 'velocity',
    title: 'Data Latency & Freshness Requirements',
    subtitle: 'What is the required velocity from data arrival to query or decision execution?',
    iconName: 'Zap',
    options: [
      {
        id: 'realtime-subsecond',
        label: 'Sub-Second Real-Time Streaming',
        description: 'Instant event alerts, inline fraud detection, live telemetry, streaming ML features.',
        scores: {
          'realtime-kappa': 10,
          'medallion-lakehouse': 7,
          'data-mesh': 6,
          'data-fabric': 5,
          'modern-data-stack': 2,
          'sovereign-hybrid': 4,
        }
      },
      {
        id: 'microbatch-minutes',
        label: 'Near Real-Time (5 - 15 minute micro-batches)',
        description: 'Operational dashboards, intra-day reporting, high-frequency inventory tracking.',
        scores: {
          'medallion-lakehouse': 10,
          'modern-data-stack': 8,
          'realtime-kappa': 8,
          'data-mesh': 7,
          'data-fabric': 6,
          'sovereign-hybrid': 6,
        }
      },
      {
        id: 'batch-daily',
        label: 'Standard Scheduled Batch (Hourly / Daily)',
        description: 'Executive reporting, financial reconciliation, traditional BI dashboards.',
        scores: {
          'modern-data-stack': 10,
          'medallion-lakehouse': 9,
          'data-mesh': 7,
          'data-fabric': 7,
          'realtime-kappa': 3,
          'sovereign-hybrid': 7,
        }
      }
    ]
  },
  {
    id: 'volume',
    category: 'volume',
    title: 'Scale & Storage Footprint',
    subtitle: 'What volume of structured, semi-structured, and unstructured data do you manage?',
    iconName: 'Database',
    options: [
      {
        id: 'petabyte-scale',
        label: 'Multi-Petabyte Scale (100TB - 10PB+)',
        description: 'Enormous clickstreams, IoT telemetry, unstructured logs, audio/video embeddings.',
        scores: {
          'medallion-lakehouse': 10,
          'realtime-kappa': 9,
          'data-mesh': 8,
          'sovereign-hybrid': 8,
          'data-fabric': 6,
          'modern-data-stack': 4,
        }
      },
      {
        id: 'terabyte-scale',
        label: 'Terabyte Scale (1TB - 50TB)',
        description: 'Standard enterprise relational data, app events, CRM metrics.',
        scores: {
          'modern-data-stack': 10,
          'medallion-lakehouse': 8,
          'data-fabric': 7,
          'data-mesh': 5,
          'realtime-kappa': 6,
          'sovereign-hybrid': 6,
        }
      },
      {
        id: 'gigabyte-scale',
        label: 'Sub-Terabyte Scale (< 1TB)',
        description: 'Early stage enterprise, transactional reports, core operational tables.',
        scores: {
          'modern-data-stack': 10,
          'medallion-lakehouse': 6,
          'data-fabric': 4,
          'data-mesh': 2,
          'realtime-kappa': 3,
          'sovereign-hybrid': 4,
        }
      }
    ]
  },
  {
    id: 'compliance',
    category: 'compliance',
    title: 'Governance & Regulatory Compliance Strictness',
    subtitle: 'What security policies, privacy standards, and data residency laws apply to your org?',
    iconName: 'ShieldCheck',
    options: [
      {
        id: 'sovereign-strict',
        label: 'Strict Data Sovereignty & Multi-Region Residency',
        description: 'GDPR cross-border restrictions, HIPAA, FedRAMP, air-gapped on-prem requirements.',
        scores: {
          'sovereign-hybrid': 10,
          'data-fabric': 8,
          'data-mesh': 8,
          'medallion-lakehouse': 6,
          'modern-data-stack': 3,
          'realtime-kappa': 5,
        }
      },
      {
        id: 'federated-policy',
        label: 'Enterprise Federated Governance (RBAC / ABAC)',
        description: 'Fine-grained column/row level security, automated lineage, PII masking.',
        scores: {
          'data-mesh': 9,
          'medallion-lakehouse': 9,
          'data-fabric': 9,
          'sovereign-hybrid': 8,
          'modern-data-stack': 6,
          'realtime-kappa': 6,
        }
      },
      {
        id: 'standard-compliance',
        label: 'Standard SOC2 & Internal Audit Controls',
        description: 'Standard role permissions, audit logging, static data access controls.',
        scores: {
          'modern-data-stack': 10,
          'medallion-lakehouse': 8,
          'data-mesh': 6,
          'data-fabric': 6,
          'realtime-kappa': 7,
          'sovereign-hybrid': 5,
        }
      }
    ]
  },
  {
    id: 'ai',
    category: 'ai',
    title: 'AI, LLM RAG & Machine Learning Integration',
    subtitle: 'How closely integrated are GenAI, Vector search, and ML model training into your architecture?',
    iconName: 'Cpu',
    options: [
      {
        id: 'genai-rag-heavy',
        label: 'GenAI LLM RAG Pipelines & Vector Embeddings',
        description: 'Unstructured document processing, real-time semantic search, agentic AI workflows.',
        scores: {
          'medallion-lakehouse': 10,
          'realtime-kappa': 9,
          'data-mesh': 8,
          'data-fabric': 7,
          'modern-data-stack': 5,
          'sovereign-hybrid': 7,
        }
      },
      {
        id: 'predictive-ml',
        label: 'Predictive ML Models & Feature Engineering',
        description: 'Churn prediction, recommendation systems, automated forecasting pipelines.',
        scores: {
          'medallion-lakehouse': 10,
          'realtime-kappa': 8,
          'data-mesh': 7,
          'modern-data-stack': 7,
          'data-fabric': 6,
          'sovereign-hybrid': 6,
        }
      },
      {
        id: 'bi-reporting',
        label: 'Core BI, Dashboards & SQL Reporting Focus',
        description: 'Executive scorecards, financial KPIs, marketing attribution modeling.',
        scores: {
          'modern-data-stack': 10,
          'medallion-lakehouse': 8,
          'data-fabric': 7,
          'data-mesh': 6,
          'realtime-kappa': 4,
          'sovereign-hybrid': 6,
        }
      }
    ]
  },
  {
    id: 'team',
    category: 'team',
    title: 'Engineering Skillset & Technical Depth',
    subtitle: 'What is the primary technical composition of your data engineering team?',
    iconName: 'Wrench',
    options: [
      {
        id: 'distributed-systems',
        label: 'Distributed Systems & Scala/Java/Rust Engineers',
        description: 'Deep background in Spark internals, Flink, C++/Rust optimization, Kubernetes.',
        scores: {
          'medallion-lakehouse': 10,
          'realtime-kappa': 10,
          'sovereign-hybrid': 9,
          'data-mesh': 8,
          'data-fabric': 6,
          'modern-data-stack': 4,
        }
      },
      {
        id: 'python-dbt-sql',
        label: 'Python Data Engineers & dbt SQL Developers',
        description: 'Proficient in Python, SQL data modeling, dbt transforms, Airflow workflows.',
        scores: {
          'modern-data-stack': 10,
          'medallion-lakehouse': 9,
          'data-mesh': 7,
          'data-fabric': 7,
          'realtime-kappa': 5,
          'sovereign-hybrid': 6,
        }
      },
      {
        id: 'bi-sql-analysts',
        label: 'BI Developers & SQL Data Analysts',
        description: 'Focus on writing SQL queries, dashboard creation, and drag-and-drop analytics.',
        scores: {
          'modern-data-stack': 10,
          'data-fabric': 7,
          'medallion-lakehouse': 5,
          'data-mesh': 3,
          'realtime-kappa': 2,
          'sovereign-hybrid': 4,
        }
      }
    ]
  },
  {
    id: 'cloud',
    category: 'cloud',
    title: 'Cloud Vendor Strategy & Infrastructure Control',
    subtitle: 'What is your cloud procurement philosophy and vendor lock-in risk tolerance?',
    iconName: 'Cloud',
    options: [
      {
        id: 'open-source-decoupled',
        label: 'Open-Source Decoupled (Zero Lock-in)',
        description: 'Standardized on Apache Iceberg, Spark, Trino, Kubernetes across multi-cloud.',
        scores: {
          'medallion-lakehouse': 10,
          'realtime-kappa': 9,
          'sovereign-hybrid': 9,
          'data-mesh': 8,
          'data-fabric': 6,
          'modern-data-stack': 3,
        }
      },
      {
        id: 'single-cloud-saas',
        label: 'Single Cloud Managed SaaS (Fully Delegated)',
        description: 'Prefer managed SaaS tools (Snowflake, Fivetran, dbt Cloud) to avoid DevOps.',
        scores: {
          'modern-data-stack': 10,
          'medallion-lakehouse': 7,
          'data-fabric': 7,
          'data-mesh': 5,
          'realtime-kappa': 4,
          'sovereign-hybrid': 2,
        }
      },
      {
        id: 'hybrid-onprem-cloud',
        label: 'Hybrid On-Prem & Cloud Co-existence',
        description: 'Legacy databases on-prem with cloud data lake/warehouse expansion.',
        scores: {
          'sovereign-hybrid': 10,
          'data-fabric': 10,
          'medallion-lakehouse': 8,
          'data-mesh': 7,
          'realtime-kappa': 6,
          'modern-data-stack': 4,
        }
      }
    ]
  }
];
