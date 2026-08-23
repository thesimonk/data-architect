import { ArchitectureParadigm } from '../types/architecture';

export const PARADIGMS: ArchitectureParadigm[] = [
  {
    id: 'medallion-lakehouse',
    name: 'Medallion Lakehouse Architecture',
    tagline: 'Unified Bronze-Silver-Gold ACID Storage Layer Bridging Data Lakes and Data Warehouses',
    description: 'Combines the cost-efficiency, open storage formats (Apache Iceberg / Delta Lake), and AI/ML capability of a Data Lake with the ACID transactional integrity, schema enforcement, and SQL performance of a Data Warehouse.',
    bestFor: [
      'Enterprises standardizing on open table formats (Apache Iceberg, Delta Lake)',
      'Organizations needing unified batch & streaming AI/ML pipelines',
      'Centralized to hybrid analytics teams managing petabyte-scale data',
      'Companies reducing expensive proprietary data warehouse lock-in'
    ],
    keyPrinciples: [
      'Multi-hop Bronze (Raw), Silver (Cleansed/Enriched), and Gold (Business Curated) data layers',
      'Open Table Formats with Time Travel, Schema Evolution, and Zero-Copy Clones',
      'Decoupled Compute (Trino, Spark, DuckDB) from Cloud Object Storage (S3, ADLS, GCS)',
      'Single source of truth for both BI reporting and unstructured LLM/RAG training'
    ],
    recommendedTechStack: {
      ingestion: ['Apache Kafka', 'Debezium CDC', 'Airbyte', 'Fivetran'],
      storage: ['Apache Iceberg', 'Delta Lake', 'AWS S3 / Azure ADLS'],
      processing: ['Apache Spark', 'dbt-core', 'Ray', 'Apache Flink'],
      governance: ['Unity Catalog', 'Apache Atlas', 'OpenLineage', 'Immuta'],
      serving: ['Trino', 'Snowflake', 'ClickHouse', 'StarRocks']
    },
    tradeoffs: {
      pros: [
        'Zero vendor lock-in with open-source storage specifications',
        'Consolidates ML, AI, Streaming, and BI into a single storage tier',
        'Eliminates duplicate ETL copy jobs between Data Lakes and Warehouses',
        'Massive cost savings at petabyte scale'
      ],
      cons: [
        'Requires sophisticated data engineering skills for compaction and catalog management',
        'Initial setup of metadata catalogs (REST Catalog, Nessie) requires operational effort'
      ]
    },
    complexityScore: 6,
    tcoScore: 9,
    scalabilityScore: 10,
    governanceMaturityRequired: 7
  },
  {
    id: 'data-mesh',
    name: 'Data Mesh Architecture',
    tagline: 'Domain-Driven Decentralized Architecture with Data as a First-Class Product',
    description: 'Shifts data management from a centralized data team monolith to domain-oriented engineering teams (e.g. Sales, Marketing, Supply Chain). Each domain owns, builds, and serves its own Data Products while adhering to global computational governance standards.',
    bestFor: [
      'Large enterprises with multiple autonomous business units and domain engineering teams',
      'Organizations blocked by centralized data team bottlenecks',
      'Enterprises with high governance maturity and strong domain boundary definitions',
      'Complex organizations scaling beyond 50+ data engineers'
    ],
    keyPrinciples: [
      'Domain Ownership: Domain teams own data schemas, transformation logic, and SLAs',
      'Data as a Product: Data is published with contracts, documentation, and quality guarantees',
      'Self-Serve Data Platform: Automated infrastructure provisioning for domain teams',
      'Federated Computational Governance: Automated policy enforcement (security, compliance, lineage)'
    ],
    recommendedTechStack: {
      ingestion: ['Domain Kafka Clusters', 'Debezium', 'Custom Microservices APIs'],
      storage: ['S3/ADLS Domain Buckets', 'Snowflake Domain Shares', 'Iceberg'],
      processing: ['dbt Core (per domain)', 'Apache Spark', 'Python FastAPI'],
      governance: ['OpenMetadata', 'Atlan', 'Data Contract CLI', 'OPA (Open Policy Agent)'],
      serving: ['Trino Federated Queries', 'GraphQL Semantic Mesh', 'Data Product APIs']
    },
    tradeoffs: {
      pros: [
        'Eliminates centralized data team bottleneck and scales with organizational growth',
        'Fosters deep domain accountability and higher data quality at source',
        'Promotes autonomous velocity for cross-functional product squads'
      ],
      cons: [
        'Requires significant cultural shift and organizational restructuring',
        'Risk of duplicated infrastructure costs if self-serve platform is weak',
        'High governance maturity required to prevent fragmented silos'
      ]
    },
    complexityScore: 9,
    tcoScore: 6,
    scalabilityScore: 10,
    governanceMaturityRequired: 9
  },
  {
    id: 'data-fabric',
    name: 'Data Fabric Architecture',
    tagline: 'Active Metadata-Driven Integration Layer Automating Discovery and Governance',
    description: 'An architectural pattern that uses active metadata, automated machine learning, knowledge graphs, and automated data integration to connect heterogeneous storage systems without requiring massive data migration.',
    bestFor: [
      'Legacy enterprises with heavily fragmented hybrid cloud & on-prem databases',
      'Organizations where data migration is cost-prohibitive',
      'Regulated industries needing enterprise-wide automated lineage and metadata intelligence',
      'Hybrid environments spanning SAP, Mainframe, Cloud Warehouses, and Relational DBs'
    ],
    keyPrinciples: [
      'Active Metadata Management: Dynamically analyzes access logs, queries, and schemas',
      'Knowledge Graph & Knowledge Mesh: Maps semantic relationships across enterprise assets',
      'Automated Data Integration: Dynamic query orchestration and push-down execution',
      'Unified Governance: Policy-driven zero-trust access across multi-cloud stores'
    ],
    recommendedTechStack: {
      ingestion: ['Denodo Dynamic Integration', 'IBM Cloud Pak for Data', 'Informatica IDMC'],
      storage: ['Heterogeneous (Oracle, DB2, Snowflake, S3, SQL Server)'],
      processing: ['Virtualization Engines', 'Spark Virtual Mesh', 'Knowledge Graph DBs'],
      governance: ['Collibra', 'Apache Atlas', 'Privacera', 'Active Metadata Engines'],
      serving: ['Denodo Virtual Layer', 'Trino Query Virtualization', 'Starburst']
    },
    tradeoffs: {
      pros: [
        'No need to migrate legacy operational systems to a unified lake immediately',
        'Active metadata automates data discovery and lineage tracking across silos',
        'Faster time-to-value for enterprise data discovery'
      ],
      cons: [
        'Heavy reliance on proprietary virtualization or fabric vendor platforms',
        'Federated cross-source query latency can be unpredictable without caching'
      ]
    },
    complexityScore: 8,
    tcoScore: 5,
    scalabilityScore: 8,
    governanceMaturityRequired: 8
  },
  {
    id: 'modern-data-stack',
    name: 'Modern Data Stack (MDS)',
    tagline: 'Modular, Cloud-Native Analytical Stack Built for Speed, Simplicity, and Agility',
    description: 'A composable architecture centering around a cloud data warehouse (Snowflake, BigQuery, Databricks), managed SaaS ingestion (Fivetran/Airbyte), SQL-first transformation (dbt), and automated orchestration (Dagster/Astronomer).',
    bestFor: [
      'Fast-growing mid-market to enterprise companies wanting quick time-to-market',
      'Teams with high SQL proficiency looking for developer-friendly tooling',
      'Organizations standardizing on managed cloud warehouse compute',
      'Agile data teams focusing on BI, product analytics, and executive dashboards'
    ],
    keyPrinciples: [
      'ELT over ETL: Load raw data immediately into cloud warehouse before transforming',
      'Software Engineering Best Practices for SQL: Git, CI/CD, testing, and modular dbt packages',
      'SaaS managed components minimizing infrastructure maintenance overhead',
      'Reverse ETL: Pushing curated data insights back into CRM/SaaS tools (Salesforce, HubSpot)'
    ],
    recommendedTechStack: {
      ingestion: ['Fivetran', 'Airbyte SaaS', 'Stitch', 'Portable'],
      storage: ['Snowflake', 'Google BigQuery', 'Databricks SQL'],
      processing: ['dbt Cloud / dbt Core', 'SQLMesh', 'Dagster', 'Apache Airflow'],
      governance: ['dbt Semantic Layer', 'Atlan', 'SelectStar', 'Monte Carlo'],
      serving: ['Metabase', 'Lightdash', 'PowerBI', 'Census / Hightouch (Reverse ETL)']
    },
    tradeoffs: {
      pros: [
        'Rapid setup with minimal DevOps or infrastructure management',
        'Industry-standard tooling with massive community support and talent pool',
        'Version-controlled transformations with integrated unit testing via dbt'
      ],
      cons: [
        'Cloud warehouse compute credits can scale unpredictably if unmonitored',
        'SaaS subscription stack costs add up rapidly across multiple vendors'
      ]
    },
    complexityScore: 3,
    tcoScore: 7,
    scalabilityScore: 8,
    governanceMaturityRequired: 5
  },
  {
    id: 'realtime-kappa',
    name: 'Real-Time Event-Driven (Kappa / Streaming Lakehouse)',
    tagline: 'Sub-Second Event-Driven Pipelines for Real-Time Analytics & Streaming AI',
    description: 'Replaces batch ETL with a single continuous streaming log (Kafka, Redpanda, Pulsar) processed by streaming engine (Flink, Spark Streaming) and stored in real-time OLAP engines (ClickHouse, Apache Pinot) or Iceberg/Paimon table formats.',
    bestFor: [
      'Fintech, Fraud Detection, E-commerce, IoT, and Real-Time AI recommendation engines',
      'Applications requiring sub-second freshness and low-latency event alerts',
      'Organizations processing millions of events per second',
      'Real-time feature store generation for inline ML inference models'
    ],
    keyPrinciples: [
      'Single Streaming Processing Pipeline: Treats historical data as a replayable event stream',
      'Event Sourcing & Log-Centric Storage: Immutable event append-only logs',
      'Stream-Table Duality: Continuous materialization of windowed analytical state',
      'Real-Time Lakehouse Sink: Streaming writes into Iceberg / Apache Paimon'
    ],
    recommendedTechStack: {
      ingestion: ['Apache Kafka', 'Redpanda', 'Apache Pulsar', 'AWS Kinesis'],
      storage: ['ClickHouse', 'Apache Pinot', 'Apache Paimon', 'Apache Iceberg (Append-Only)'],
      processing: ['Apache Flink', 'Spark Structured Streaming', 'Bytewax'],
      governance: ['Confluent Schema Registry', 'Kafka Governance', 'OpenLineage'],
      serving: ['Real-Time GraphQL APIs', 'ClickHouse OLAP', 'Grafana Alerts', 'Feature Stores']
    },
    tradeoffs: {
      pros: [
        'Sub-second latency from event generation to executive alert/dashboard',
        'Eliminates duplicate code paths between batch and speed layers (unlike Lambda architecture)',
        'Ideal foundation for real-time AI agents and streaming feature stores'
      ],
      cons: [
        'Higher operational complexity and debugging difficulty for stateful stream joins',
        'Requires specialized stream engineering expertise'
      ]
    },
    complexityScore: 8,
    tcoScore: 7,
    scalabilityScore: 10,
    governanceMaturityRequired: 7
  },
  {
    id: 'sovereign-hybrid',
    name: 'Sovereign Multi-Cloud Hybrid Architecture',
    tagline: 'Zero-Trust Data Isolation across Multi-Cloud & Local On-Prem Data Centers',
    description: 'Designed for global enterprises subject to strict regulatory sovereignty laws (GDPR, EU Cloud Sovereign, HIPAA, FedRAMP). Ensures compute can run anywhere while sensitive customer data remains strictly isolated in designated geographical or cloud boundaries.',
    bestFor: [
      'Global Banking, Healthcare, Government, and Defense organizations',
      'Enterprises operating across multiple geographical jurisdictions with data residency constraints',
      'Companies with legacy on-prem infrastructure transitioning securely to multi-cloud',
      'Zero-trust security environments requiring hardware security module (HSM) encryption'
    ],
    keyPrinciples: [
      'Data Residency Enforcement: Dynamic query routing based on regional compliance metadata',
      'Bring Your Own Key (BYOK) Encryption: Field-level encryption with client HSM control',
      'Multi-Cloud Portability: Infrastructure defined entirely as code (Terraform, Kubernetes)',
      'Federated Zero-Trust Identity: Strict role and attribute-based access control (ABAC)'
    ],
    recommendedTechStack: {
      ingestion: ['Apache NiFi (On-Prem & Cloud)', 'Kafka Mirrormaker 2', 'AWS Snowball / DirectConnect'],
      storage: ['MinIO Enterprise (On-Prem)', 'Iceberg with KMS Encryption', 'Redhat OpenShift Data Foundation'],
      processing: ['Spark on Kubernetes', 'Trino Sovereign Gateway', 'dbt Core'],
      governance: ['Immuta', 'Privacera', 'Apache Ranger', 'HashiCorp Vault'],
      serving: ['Regional Trino Gateways', 'Encrypted Snowflake Shares', 'Private API Endpoints']
    },
    tradeoffs: {
      pros: [
        'Complete regulatory compliance and elimination of cross-border data leakage risks',
        'Prevents single cloud provider lock-in and vendor leverage',
        'High resiliency across cloud outages'
      ],
      cons: [
        'Highest infrastructure setup and operational maintenance complexity',
        'Network egress and cross-region synchronization overhead'
      ]
    },
    complexityScore: 10,
    tcoScore: 4,
    scalabilityScore: 9,
    governanceMaturityRequired: 10
  }
];
