import { ReferenceArticle } from '../types/architecture';

export const REFERENCE_ARTICLES: ReferenceArticle[] = [
  {
    id: 'iceberg-table-format-internals',
    category: 'Storage & Formats',
    title: 'Apache Iceberg Metadata Architecture & ACID Internals',
    summary: 'How Iceberg replaces folder-based partitioning with explicit snapshot manifest trees to enable ACID transactions, time travel, and zero-copy branching.',
    content: `Traditional Hive-style data lakes rely on directory paths (e.g., s3://bucket/table/year=2024/month=08/) to partition data. This approach suffers from fatal flaws at petabyte scale: expensive filesystem list operations, lack of ACID guarantees, and inability to evolve partition specs without rewriting historical data.

Apache Iceberg solves this by introducing an explicit 3-layer metadata tree:
1. Catalog Pointer: Points to the current Metadata File (e.g. v4.metadata.json).
2. Manifest List: Lists all Manifest Files that compose a table snapshot.
3. Manifest Files: Lists individual Parquet data files along with column-level min/max stats, partition values, and null counts.

Key Enterprise Benefits:
- O(1) Metadata Operations: Queries scan metadata files in milliseconds without issuing thousands of S3 LIST requests.
- Hidden Partitioning: Partition transforms (e.g. days(ts)) are handled under the hood. Users query where ts >= '2024-01-01' without knowing partition column names.
- Schema & Partition Evolution: Add, rename, or drop columns without breaking downstream queries or rewriting past files.`,
    keyTakeaways: [
      'Metadata manifest trees enable ACID transactions on plain S3 / ADLS object storage.',
      'Hidden partitioning prevents users from breaking queries by omitting partition keys.',
      'Time travel snapshot IDs enable zero-copy table branching for staging ML pipeline runs.'
    ],
    codeExample: {
      title: 'PySpark Iceberg Time Travel & Table Branching',
      language: 'python',
      code: `# Read Iceberg table at specific snapshot timestamp
df_historical = spark.read \\
    .option("as-of-timestamp", "1724400000000") \\
    .table("catalog.analytics.orders")

# Create a zero-copy table branch for experimental ML training
spark.sql("ALTER TABLE catalog.analytics.orders CREATE BRANCH ml_experiment_v2")`
    }
  },
  {
    id: 'data-contracts-specification',
    category: 'Governance & Contracts',
    title: 'Enterprise Data Contracts & Schema Evolution Framework',
    summary: 'Defining formal API-like contracts between operational producers and downstream analytical consumers to prevent breaking changes.',
    content: `In legacy data architectures, operational software engineers alter database schemas (e.g. dropping a column or changing a timestamp format) without warning, breaking downstream analytical dashboards and ML models.

Data Contracts treat data streams and data products as formal APIs backed by SLA guarantees.

A Production Data Contract specifies:
- Schema Definition: Strict JSON Schema, Protobuf, or Avro definition.
- Quality Rules: Assertions that must pass before data is published (e.g. order_total > 0).
- SLA Commitment: Latency, availability, and change notification lead times (e.g. 30 days notice before breaking changes).
- PII & Security Classification: Clear labeling of sensitive fields for dynamic masking.`,
    keyTakeaways: [
      'Shift schema enforcement upstream to source microservices and CI/CD pull requests.',
      'Use Automated Data Contract CLI tools to validate pull requests against consumer schemas.',
      'Decouple operational schemas from analytical models using CDC and semantic mapping.'
    ],
    codeExample: {
      title: 'Data Contract Spec in YAML',
      language: 'yaml',
      code: `dataset: customer_events
version: 2.1.0
owner: domain-sales-eng@enterprise.com
sla:
  freshness: 5m
  availability: 99.9%
schema:
  - name: event_id
    type: string
    required: true
    primaryKey: true
  - name: user_email
    type: string
    pii: true
    masking: md5_hash
  - name: amount
    type: decimal(10,2)
    qualityRules:
      - rule: "amount > 0"`
    }
  },
  {
    id: 'finops-cost-optimization',
    category: 'FinOps & Cost',
    title: 'Enterprise FinOps: Reducing Cloud Warehouse & Lakehouse Spend by 50%',
    summary: 'Actionable strategies for optimizing Spark memory, Iceberg compaction, Snowflake warehouse auto-suspend, and Trino pushdown predicates.',
    content: `Cloud analytics infrastructure costs grow non-linearly with data volume unless proactive FinOps practices are enforced.

Key Optimization Vectors:
1. Small File Problem & Iceberg Bin-Packing: Millions of 10KB Parquet files cause massive S3 API GET charges and slow down query plan generation. Running regular Spark bin-packing compacts small files into optimal 128MB-512MB Parquet blocks.
2. Predicate Pushdown & Columnar Pruning: Ensure query engines (Trino, Snowflake) read only the exact columns and partitions requested. Never execute SELECT * in automated scheduled jobs.
3. Compute Autoscaling & Spot Instances: Run Spark batch ETL jobs on AWS EC2 Spot or GCP Preemptible nodes, saving up to 70% compared to On-Demand compute.`,
    keyTakeaways: [
      'Schedule automated table maintenance (bin-packing compaction & snapshot cleanup) weekly.',
      'Enforce dbt model query timeouts and warehouse auto-suspend after 60 seconds of inactivity.',
      'Store Bronze data in ZSTD-compressed Parquet formats on low-cost object storage.'
    ]
  },
  {
    id: 'genai-rag-architecture',
    category: 'AI & Semantic',
    title: 'Architecting High-Performance RAG & Vector Search Data Pipelines',
    summary: 'Integrating unstructured document ingestion, chunking strategies, dense vector embeddings, and hybrid BM25 + Vector retrieval.',
    content: `Generative AI applications require continuous data pipelines to ingest enterprise documents (PDFs, Confluence pages, Slack channels), transform them into vector embeddings, and index them for sub-15ms semantic search.

Architectural Pipeline Steps:
1. Unstructured Document Ingestion: Extract raw text from PDFs, HTML, and Markdown using specialized parsers (Unstructured.io, Apache Tika).
2. Semantic Chunking: Divide documents into meaningful 512-token chunks with 10% overlap to preserve context across boundaries.
3. Embedding Generation: Pass text chunks to an embedding model (e.g. text-embedding-3-large) to generate 1536-dimensional vectors.
4. Hybrid Search Retrieval: Combine sparse keyword search (BM25) with dense vector cosine distance to achieve maximum recall accuracy.`,
    keyTakeaways: [
      'Hybrid search (BM25 + Vector) outperforms vector-only search by 25% on domain-specific jargon.',
      'Store raw document chunks alongside vector embeddings in metadata-rich stores (pgvector, Milvus).',
      'Use active metadata line-age to revoke LLM access to document embeddings when source permissions change.'
    ]
  }
];
