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
    id: 'pacelc-theorem-analytics',
    category: 'Patterns',
    title: 'PACELC Theorem in Distributed Analytical Systems',
    summary: 'Understanding PACELC guarantees (If Partitioned: Availability vs Consistency; Else: Latency vs Consistency) applied to Iceberg, ClickHouse, and Trino.',
    content: `The CAP theorem only describes system behavior during rare network partitions. PACELC extends CAP by describing system behavior during normal execution.

Formula: If Partitioned (P), choose between Availability (A) and Consistency (C); Else (E), choose between Latency (L) and Consistency (C).

Applying PACELC to Analytics Engines:
- Apache Iceberg (PC/EC): Guarantees strict read/write consistency during network partitions and snapshot consistency during normal operations.
- ClickHouse OLAP (PA/EL): Prioritizes sub-second query latency during normal operations and high availability during node partitions.
- Trino Query Engine (PA/EL): Designed for hyper-fast federated queries where availability and low latency outweigh immediate transactional locks.`,
    keyTakeaways: [
      'Choose PC/EC storage engines (Iceberg, Delta) for financial ledger accuracy.',
      'Choose PA/EL query engines (ClickHouse, Pinot) for real-time customer dashboards.',
      'Tunable consistency allows scaling throughput without compromising multi-region integrity.'
    ]
  },
  {
    id: 'zero-trust-abac-security',
    category: 'Governance & Contracts',
    title: 'Zero-Trust ABAC Data Security with Open Policy Agent (OPA) & Immuta',
    summary: 'Dynamic column hashing, format-preserving encryption, and tenant row-level filtering applied at query execution runtime.',
    content: `Traditional static RBAC (creating 500 physical database views for each department) fails at enterprise scale.

Zero-Trust Attribute-Based Access Control (ABAC) dynamically evaluates 4 contextual vectors at query runtime:
1. User Attributes: Department, Region, Clearance Level.
2. Resource Attributes: Data Sensitivity Tag (PII, Financial, PCI-DSS).
3. Environmental Context: Current Time, Client IP Address, Device Security Posture.
4. Action: Read, Export, Join.

Policy engines intercept Trino / Spark SQL queries to automatically inject format-preserving masking and row filters before byte execution.`,
    keyTakeaways: [
      'Eliminate physical view duplication by standardizing on dynamic ABAC masking policies.',
      'Decouple access policy code from analytical SQL queries using OPA Rego rules.',
      'Log immutable query audit trails for GDPR and HIPAA compliance verification.'
    ]
  },
  {
    id: 'multi-region-iceberg-dr',
    category: 'FinOps & Cost',
    title: 'Active-Active Multi-Cloud Apache Iceberg Disaster Recovery',
    summary: 'Architecting zero RPO data lakehouse replication across AWS S3, Azure ADLS, and Google Cloud Storage.',
    content: `Ensuring multi-region disaster recovery for petabyte data lakes without incurring massive cross-region cloud egress costs requires decoupled metadata replication.

Replication Architecture:
1. Continuous Log Replication: Dual-write streaming logs using Kafka MirrorMaker 2 across regions.
2. Snapshot Metadata Sync: Sync Iceberg REST Catalog snapshot manifests incrementally every 30 seconds.
3. Cold Target Storage: Store secondary data blocks in low-cost Glacier/Coldline storage tiers until disaster failover is triggered.`,
    keyTakeaways: [
      'Sync Iceberg metadata manifests incrementally to cut cross-region network egress by 90%.',
      'Use automated DNS health probes to trigger automated query gateway failover.',
      'Validate multi-region snapshot consistency using automated background hash checks.'
    ]
  }
];
