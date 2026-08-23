import { BlueprintLayer } from '../types/architecture';

export const BLUEPRINT_LAYERS: BlueprintLayer[] = [
  {
    id: 'ingestion',
    name: '1. Ingestion & Streaming Tier',
    shortName: 'Ingestion',
    order: 1,
    description: 'Captures raw events, operational database changes (CDC), batch SaaS files, and IoT telemetry.',
    iconName: 'ArrowRightCircle',
    colorTheme: 'cyan',
    components: [
      {
        id: 'kafka-event-stream',
        name: 'Distributed Event Streaming (Apache Kafka / Redpanda)',
        shortDesc: 'High-throughput append-only event log for streaming raw events & CDC.',
        fullDescription: 'Serves as the central nervous system for continuous event streaming. Receives event streams from microservices, web apps, and IoT devices with sub-50ms latency guarantees.',
        layerId: 'ingestion',
        status: 'recommended',
        techOptions: {
          openSource: ['Apache Kafka', 'Redpanda', 'Apache Pulsar'],
          cloudNative: ['AWS Kinesis', 'Azure Event Hubs', 'GCP Pub/Sub'],
          commercialSaaS: ['Confluent Cloud', 'Aiven for Kafka']
        },
        responsibilities: [
          'Buffer incoming high-velocity data streams to prevent downstream target overload',
          'Enforce schema registry contracts (Avro / Protobuf) on message payloads',
          'Provide multi-day event replay capabilities for analytical backfills'
        ],
        antiPatterns: [
          'Using Kafka as a permanent long-term database store',
          'Bypassing Schema Registry allowing unvalidated JSON payloads to poison streams'
        ],
        metrics: [
          { label: 'Throughput', value: '1M+ msgs/sec' },
          { label: 'Latency', value: '< 20ms' },
          { label: 'Retention', value: '7 - 30 Days' }
        ],
        sampleConfigSnippet: {
          language: 'json',
          code: `{
  "topic": "telemetry.orders.v1",
  "partitions": 12,
  "replicationFactor": 3,
  "cleanupPolicy": "compact,delete",
  "schemaValidation": true
}`
        }
      },
      {
        id: 'cdc-debezium',
        name: 'Change Data Capture (Debezium / Fivetran)',
        shortDesc: 'Non-blocking transaction log parser for PostgreSQL, MySQL & Oracle DBs.',
        fullDescription: 'Captures row-level INSERT, UPDATE, and DELETE changes directly from operational database transaction logs without imposing query overhead on primary DB instances.',
        layerId: 'ingestion',
        status: 'recommended',
        techOptions: {
          openSource: ['Debezium Engine', 'Estuary Flow'],
          cloudNative: ['AWS DMS', 'GCP Datastream'],
          commercialSaaS: ['Fivetran CDC', 'Airbyte Enterprise']
        },
        responsibilities: [
          'Stream operational database state changes in real-time',
          'Capture tombstone markers for hard-deleted records',
          'Maintain exact operational transaction ordering via DB WAL/log sequence numbers'
        ],
        antiPatterns: [
          'Running scheduled SELECT * FROM table queries every minute instead of true log-based CDC',
          'Lacking schema evolution management when operational columns are altered'
        ],
        metrics: [
          { label: 'Lag', value: '< 2 seconds' },
          { label: 'DB Impact', value: '< 1% CPU' }
        ]
      }
    ]
  },
  {
    id: 'storage',
    name: '2. Lakehouse & Storage Tier',
    shortName: 'Lakehouse Storage',
    order: 2,
    description: 'Decoupled, scalable open object storage utilizing open table formats (Iceberg, Delta) for Bronze/Silver/Gold data.',
    iconName: 'Database',
    colorTheme: 'blue',
    components: [
      {
        id: 'apache-iceberg',
        name: 'Apache Iceberg Open Table Format',
        shortDesc: 'High-performance open table format for huge analytic datasets with ACID transactions.',
        fullDescription: 'Provides database-like SQL table capabilities (ACID, schema evolution, partition spec evolution, time travel) directly on top of raw cloud object storage (S3/ADLS).',
        layerId: 'storage',
        status: 'recommended',
        techOptions: {
          openSource: ['Apache Iceberg', 'Delta Lake 3.0', 'Apache Hudi'],
          cloudNative: ['AWS Glue Catalog', 'Snowflake Iceberg Tables'],
          commercialSaaS: ['Tabular (Databricks)', 'Dremio']
        },
        responsibilities: [
          'Maintain ACID table metadata manifest files without scanning object storage prefixes',
          'Support hidden partitioning, allowing non-disruptive partition spec migration',
          'Enable time-travel queries for historical audit and rollback'
        ],
        antiPatterns: [
          'Failing to run background compaction jobs resulting in millions of 1KB small files',
          'Directly mutating object storage files outside the catalog manifest engine'
        ],
        metrics: [
          { label: 'File Format', value: 'Parquet / ORC' },
          { label: 'Catalog Spec', value: 'REST Catalog / Nessie' },
          { label: 'Compression', value: 'ZSTD / Snappy' }
        ],
        sampleConfigSnippet: {
          language: 'sql',
          code: `CREATE TABLE catalog.db.customer_orders (
  order_id BIGINT,
  customer_id STRING,
  amount DECIMAL(10,2),
  order_ts TIMESTAMP
)
USING iceberg
PARTITIONED BY (days(order_ts))
TBLPROPERTIES ('write.parquet.compression-codec'='zstd');`
        }
      },
      {
        id: 'cloud-object-store',
        name: 'Unified Cloud Object Storage (S3 / ADLS / MinIO)',
        shortDesc: 'Low-cost, highly durable storage foundation for raw and curated data layers.',
        fullDescription: 'Stores petabytes of structured Parquet, semi-structured JSON, and unstructured audio/images with 99.999999999% (11 9s) durability.',
        layerId: 'storage',
        status: 'recommended',
        techOptions: {
          openSource: ['MinIO Enterprise', 'Ceph Object Storage'],
          cloudNative: ['AWS S3', 'Azure Blob / ADLS Gen2', 'Google Cloud Storage'],
          commercialSaaS: ['Cloudflare R2']
        },
        responsibilities: [
          'Provide persistent, infinitely scalable storage decoupled from compute nodes',
          'Enforce object lifecycle policies (moving Bronze logs to Glacier after 90 days)',
          'Provide server-side encryption at rest (KMS / BYOK)'
        ],
        antiPatterns: [
          'Storing raw data in uncompressed CSV or plain JSON formats',
          'Exposing public S3 buckets without IAM role-based access'
        ],
        metrics: [
          { label: 'Durability', value: '99.999999999%' },
          { label: 'Cost', value: '~$0.02 / GB / mo' }
        ]
      }
    ]
  },
  {
    id: 'processing',
    name: '3. Processing & Orchestration Tier',
    shortName: 'Processing',
    order: 3,
    description: 'Executes batch SQL, distributed Spark compute, streaming Flink transformations, and dbt pipelines.',
    iconName: 'Cpu',
    colorTheme: 'emerald',
    components: [
      {
        id: 'spark-compute',
        name: 'Distributed Compute Engine (Apache Spark / Ray)',
        shortDesc: 'Scale-out distributed execution engine for heavy ETL, Iceberg compaction, and ML feature jobs.',
        fullDescription: 'Processes petabytes of data across distributed worker nodes. Runs Spark SQL, PySpark, and Spark Streaming workloads.',
        layerId: 'processing',
        status: 'recommended',
        techOptions: {
          openSource: ['Apache Spark', 'Ray Framework', 'DuckDB (Single-node)'],
          cloudNative: ['AWS EMR', 'GCP Dataproc'],
          commercialSaaS: ['Databricks Unified Engine', 'Anyscale']
        },
        responsibilities: [
          'Transform raw Bronze tables into cleansed, deduplicated Silver tables',
          'Execute memory-intensive matrix multiplication and feature extraction for AI models',
          'Perform Iceberg table maintenance (bin-packing compaction & expire snapshots)'
        ],
        antiPatterns: [
          'Using Spark for simple 10MB SQL queries where DuckDB or warehouse SQL is 100x faster',
          'Hardcoding executor memory without autoscaling rules'
        ],
        metrics: [
          { label: 'Scale', value: '10,000+ Cores' },
          { label: 'Throughput', value: 'Multi-TB / hr' }
        ],
        sampleConfigSnippet: {
          language: 'python',
          code: `# PySpark Iceberg Compaction
from pyspark.sql import SparkSession

spark = SparkSession.builder \\
    .appName("IcebergCompaction") \\
    .config("spark.sql.extensions", "org.apache.iceberg.spark.extensions.IcebergSparkSessionExtensions") \\
    .getOrCreate()

spark.sql("CALL catalog.system.rewrite_data_files('db.customer_orders')")`
        }
      },
      {
        id: 'dbt-orchestration',
        name: 'Analytics Engineering & Orchestration (dbt + Dagster)',
        shortDesc: 'Version-controlled modular SQL transformations with data testing & DAG orchestration.',
        fullDescription: 'Empowers analytics engineers to build modular Gold data marts using dbt, integrated with Dagster / Airflow for dependency graph execution and data quality asset checks.',
        layerId: 'processing',
        status: 'recommended',
        techOptions: {
          openSource: ['dbt-core', 'Dagster', 'Apache Airflow', 'SQLMesh'],
          cloudNative: ['AWS Step Functions', 'GCP Cloud Composer'],
          commercialSaaS: ['dbt Cloud', 'Astronomer Airflow']
        },
        responsibilities: [
          'Transform Silver tables into business-curated Gold dimensional models (Star Schema)',
          'Execute automated data freshness and assertions (unique, not_null, foreign keys)',
          'Generate interactive lineage graphs across transformation steps'
        ],
        antiPatterns: [
          'Putting raw business logic inside BI tool measures instead of governed dbt models',
          'Building giant monolithic SQL models with 2,000 lines of unreadable nested CTEs'
        ],
        metrics: [
          { label: 'Models', value: '1,000+ Modular SQL' },
          { label: 'Test Coverage', value: '100% Core PKs' }
        ]
      }
    ]
  },
  {
    id: 'serving',
    name: '4. Serving & Query Engine Tier',
    shortName: 'Serving & Query',
    order: 4,
    description: 'High-performance SQL query engines, cloud data warehouses, and real-time OLAP stores.',
    iconName: 'Server',
    colorTheme: 'purple',
    components: [
      {
        id: 'trino-federation',
        name: 'Distributed SQL Query Engine (Trino / Starburst)',
        shortDesc: 'Sub-second federated SQL query engine over Iceberg, S3, PostgreSQL, and Snowflake.',
        fullDescription: 'Allows analytical queries directly over cloud object storage without needing to ingest data into a expensive proprietary warehouse first.',
        layerId: 'serving',
        status: 'recommended',
        techOptions: {
          openSource: ['Trino (formerly PrestoSQL)', 'DuckDB'],
          cloudNative: ['AWS Athena', 'GCP BigQuery Omni'],
          commercialSaaS: ['Starburst Enterprise', 'Snowflake Iceberg Query Engine']
        },
        responsibilities: [
          'Execute sub-second interactive ad-hoc SQL queries over petabytes in object storage',
          'Federate queries across disparate storage engines (e.g. JOIN Iceberg S3 with Postgres Operational DB)',
          'Enforce resource group memory limits to prevent runaway queries'
        ],
        antiPatterns: [
          'Using Trino for row-by-row high-frequency operational updates',
          'Failing to leverage push-down predicates to Iceberg catalog'
        ],
        metrics: [
          { label: 'Query P95', value: '< 800ms' },
          { label: 'Concurrency', value: '500+ Queries' }
        ]
      },
      {
        id: 'clickhouse-olap',
        name: 'Real-Time Columnar OLAP (ClickHouse / Pinot)',
        shortDesc: 'Sub-second real-time columnar analytical engine for real-time dashboards & customer apps.',
        fullDescription: 'Designed for hyper-fast aggregate analytics over billions of event rows with sub-100ms response times for customer-facing analytics.',
        layerId: 'serving',
        status: 'recommended',
        techOptions: {
          openSource: ['ClickHouse', 'Apache Pinot', 'StarRocks'],
          cloudNative: ['AWS Timestream', 'GCP BigQuery Realtime'],
          commercialSaaS: ['ClickHouse Cloud', 'Tinybird']
        },
        responsibilities: [
          'Serve user-facing analytics applications and customer portals',
          'Ingest directly from Kafka streams with real-time materialized views',
          'Execute instant GROUP BY aggregations across billions of records'
        ],
        antiPatterns: [
          'Using ClickHouse as a transactional database with heavy multi-table point UPDATEs',
          'Using un-vectorized row storage'
        ],
        metrics: [
          { label: 'Query Latency', value: '< 50ms' },
          { label: 'Scan Rate', value: '2B rows/sec/node' }
        ]
      }
    ]
  },
  {
    id: 'semantic',
    name: '5. Semantic Layer & AI / Vector Tier',
    shortName: 'Semantic & AI',
    order: 5,
    description: 'Standardizes metric definitions, semantic models, Vector embeddings, and LLM RAG context retrieval.',
    iconName: 'BrainCircuit',
    colorTheme: 'indigo',
    components: [
      {
        id: 'cube-semantic-layer',
        name: 'Governed Semantic Layer (Cube.js / dbt Semantic Layer)',
        shortDesc: 'Centralized metric definition layer ensuring consistent KPI logic across BI tools.',
        fullDescription: 'Acts as an abstraction layer sitting between query engines and downstream reporting tools. Guarantees that "Net Revenue" or "Active User" is calculated identically in PowerBI, Metabase, and AI agents.',
        layerId: 'semantic',
        status: 'recommended',
        techOptions: {
          openSource: ['Cube.js Core', 'MetricFlow'],
          cloudNative: ['Looker LookML'],
          commercialSaaS: ['Cube Cloud', 'dbt Semantic Layer']
        },
        responsibilities: [
          'Centralize KPI metrics, dimensions, and join relationships in code',
          'Provide pre-aggregations and caching to accelerate BI dashboard loads',
          'Expose REST, GraphQL, and SQL Postgres-compatible interfaces to downstream apps'
        ],
        antiPatterns: [
          'Defining metric calculations separately in Tableau, PowerBI, and Excel files',
          'Bypassing semantic security rules in API calls'
        ],
        metrics: [
          { label: 'Metric Consistency', value: '100%' },
          { label: 'Cache Hit Rate', value: '92%' }
        ],
        sampleConfigSnippet: {
          language: 'javascript',
          code: `cube(\`Orders\`, {
  sql: \`SELECT * FROM catalog.gold.orders\`,
  measures: {
    totalRevenue: {
      sql: \`amount\`,
      type: \`sum\`
    }
  },
  dimensions: {
    status: {
      sql: \`status\`,
      type: \`string\`
    }
  }
});`
        }
      },
      {
        id: 'vector-ai-store',
        name: 'AI Vector Store & Retrieval Engine (Pinecone / Milvus / pgvector)',
        shortDesc: 'Stores document embeddings and high-dimensional vectors for GenAI LLM RAG pipelines.',
        fullDescription: 'Indexes document chunks, PDF text, and unstructured metadata into vector embeddings (e.g. OpenAI text-embedding-3) for fast semantic similarity search by AI agents.',
        layerId: 'semantic',
        status: 'recommended',
        techOptions: {
          openSource: ['Milvus', 'Qdrant', 'pgvector (PostgreSQL)', 'Weaviate'],
          cloudNative: ['AWS OpenSearch Vector', 'GCP Vertex Vector Search'],
          commercialSaaS: ['Pinecone', 'MongoDB Atlas Vector']
        },
        responsibilities: [
          'Index dense vector embeddings for unstructured document chunks',
          'Execute Approximate Nearest Neighbor (ANN) search with cosine similarity',
          'Provide real-time context retrieval for Enterprise LLM RAG applications'
        ],
        antiPatterns: [
          'Storing raw embeddings in unindexed JSON blobs requiring brute-force scans',
          'Lacking document versioning and metadata filtering'
        ],
        metrics: [
          { label: 'Recall Rate', value: '98% @ K=10' },
          { label: 'Search Latency', value: '< 15ms' }
        ]
      }
    ]
  },
  {
    id: 'governance',
    name: '6. Governance, Security & Lineage Tier',
    shortName: 'Governance',
    order: 6,
    description: 'Enforces zero-trust access control, automated column lineage, PII masking, and data contracts.',
    iconName: 'Shield',
    colorTheme: 'amber',
    components: [
      {
        id: 'openmetadata-catalog',
        name: 'Active Data Catalog & Lineage (OpenMetadata / Apache Atlas)',
        shortDesc: 'Automated end-to-end lineage, data discovery, and column-level impact analysis.',
        fullDescription: 'Crawls databases, Iceberg catalogs, dbt models, and BI reports to automatically map data movement across the entire enterprise.',
        layerId: 'governance',
        status: 'recommended',
        techOptions: {
          openSource: ['OpenMetadata', 'Apache Atlas', 'DataHub (LinkedIn)'],
          cloudNative: ['AWS Glue Data Catalog', 'GCP Dataplex', 'Microsoft Purview'],
          commercialSaaS: ['Atlan', 'Collibra', 'Alation']
        },
        responsibilities: [
          'Maintain an automated enterprise data dictionary and business glossary',
          'Provide column-level lineage from raw source ingestion to final executive dashboard',
          'Track data asset ownership, tags, and SLA performance'
        ],
        antiPatterns: [
          'Maintaining static data dictionary spreadsheets in SharePoint',
          'Lacking automated crawl integrations for dbt and BI tools'
        ],
        metrics: [
          { label: 'Lineage Accuracy', value: '100% Automated' },
          { label: 'Discovery Time', value: '< 30s' }
        ]
      },
      {
        id: 'immuta-security',
        name: 'Policy Engine & Data Security (Immuta / OPA)',
        shortDesc: 'Dynamic Attribute-Based Access Control (ABAC) and automated PII masking.',
        fullDescription: 'Applies fine-grained security policies dynamically at query runtime. Automatically masks SSNs, credit cards, and PII based on user roles and region permissions.',
        layerId: 'governance',
        status: 'recommended',
        techOptions: {
          openSource: ['Open Policy Agent (OPA)', 'Apache Ranger'],
          cloudNative: ['AWS Lake Formation'],
          commercialSaaS: ['Immuta Platform', 'Privacera']
        },
        responsibilities: [
          'Dynamically redact and hash sensitive columns based on user entitlement',
          'Enforce row-level tenant filtering for multi-tenant data products',
          'Log unified audit trails for compliance reporting (GDPR / HIPAA)'
        ],
        antiPatterns: [
          'Creating hundreds of duplicate physical database views for each user role',
          'Hardcoding static database user passwords in application scripts'
        ],
        metrics: [
          { label: 'Policy Overhead', value: '< 3ms' },
          { label: 'Audit Trail', value: '100% Immutable' }
        ]
      }
    ]
  },
  {
    id: 'consumption',
    name: '7. Consumption & Action Tier',
    shortName: 'Consumption',
    order: 7,
    description: 'Delivers insights to executive dashboards, embedded analytics, reverse ETL, and autonomous AI agents.',
    iconName: 'BarChart3',
    colorTheme: 'rose',
    components: [
      {
        id: 'bi-dashboards',
        name: 'Executive BI & Embedded Analytics (Metabase / PowerBI)',
        shortDesc: 'Self-serve data visualization, interactive executive scorecards, and embedded reports.',
        fullDescription: 'Consumes governed data from the semantic layer and query engines to deliver high-impact visual scorecards, trend charts, and operational metrics.',
        layerId: 'consumption',
        status: 'recommended',
        techOptions: {
          openSource: ['Metabase', 'Apache Superset', 'Lightdash'],
          cloudNative: ['AWS QuickSight', 'GCP Looker Studio'],
          commercialSaaS: ['Tableau Software', 'PowerBI Enterprise', 'ThoughtSpot']
        },
        responsibilities: [
          'Deliver self-serve reporting for non-technical business stakeholders',
          'Provide interactive drill-downs from macro metrics to transaction rows',
          'Schedule automated email/Slack alerts for key performance threshold breaches'
        ],
        antiPatterns: [
          'Executing un-cached heavy SQL queries every time a user refreshes a tab',
          'Creating 500 duplicate dashboards with conflicting metric definitions'
        ],
        metrics: [
          { label: 'Dashboard P90', value: '< 1.5s' },
          { label: 'Active Users', value: '1,000+' }
        ]
      },
      {
        id: 'reverse-etl-ai',
        name: 'Reverse ETL & Autonomous AI Agents (Census / LangChain)',
        shortDesc: 'Syncs curated Gold data back into operational CRMs and triggers automated AI workflows.',
        fullDescription: 'Operationalizes data by pushing customer health scores, propensity scores, and enriched attributes directly into Salesforce, HubSpot, Zendesk, and LLM Agent tools.',
        layerId: 'consumption',
        status: 'recommended',
        techOptions: {
          openSource: ['LangChain / LlamaIndex Agents', 'Singer Connectors'],
          cloudNative: ['AWS AppFlow'],
          commercialSaaS: ['Census', 'Hightouch', 'Zapier Enterprise']
        },
        responsibilities: [
          'Synchronize curated analytical fields back into SaaS operational tools',
          'Trigger real-time webhook actions and automated LLM agent workflows',
          'Ensure operational systems reflect unified 360-degree customer records'
        ],
        antiPatterns: [
          'Writing fragile custom Python script CRON jobs to sync records to Salesforce APIs',
          'Overwriting manual CRM edits without field-level update policies'
        ],
        metrics: [
          { label: 'Sync Reliability', value: '99.9%' },
          { label: 'Trigger Latency', value: '< 1 min' }
        ]
      }
    ]
  }
];
