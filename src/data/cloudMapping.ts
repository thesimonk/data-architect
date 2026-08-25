export type CloudVendor = 'aws' | 'azure' | 'gcp' | 'hybrid';

export interface CloudMapping {
  vendor: CloudVendor;
  name: string;
  badgeColor: string;
  layers: Record<string, {
    primary: string;
    secondary: string;
    description: string;
  }>;
}

export const CLOUD_MAPPINGS: Record<CloudVendor, CloudMapping> = {
  aws: {
    vendor: 'aws',
    name: 'Amazon Web Services (AWS)',
    badgeColor: '#ff9900',
    layers: {
      ingestion: { primary: 'Amazon MSK (Kafka) / Kinesis Data Streams', secondary: 'AWS Glue Ingestion / AppFlow', description: 'Fully managed Kafka streams & serverless stream ingestion.' },
      storage: { primary: 'Amazon S3 + Apache Iceberg on Glue REST Catalog', secondary: 'AWS Lake Formation Storage', description: 'Decoupled S3 object store using open Iceberg table format.' },
      processing: { primary: 'Amazon EMR (Spark) + AWS Glue ETL', secondary: 'Amazon Ray on EKS', description: 'Distributed Spark clusters autoscaling on EC2 / Spot.' },
      serving: { primary: 'Amazon Athena (Trino) / Redshift Serverless', secondary: 'Amazon OpenSearch Analytics', description: 'Serverless interactive SQL queries directly over S3 Iceberg tables.' },
      semantic: { primary: 'Amazon OpenSearch Vector Search / Bedrock', secondary: 'Cube.js on AWS ECS', description: 'Vector embeddings indexed in OpenSearch for Bedrock LLM RAG.' },
      governance: { primary: 'AWS Lake Formation + AWS Glue Data Catalog', secondary: 'Immuta on AWS', description: 'Centralized fine-grained column/row access control.' },
      consumption: { primary: 'Amazon QuickSight / Amazon AppFlow', secondary: 'Embedded Analytics APIs', description: 'Executive scorecards and reverse ETL sync.' },
    }
  },
  azure: {
    vendor: 'azure',
    name: 'Microsoft Azure Data Platform',
    badgeColor: '#0078d4',
    layers: {
      ingestion: { primary: 'Azure Event Hubs for Kafka / Data Factory CDC', secondary: 'Azure Stream Analytics', description: 'Real-time event streams & automated pipeline pipelines.' },
      storage: { primary: 'Azure Data Lake Storage Gen2 (ADLS) + Delta Lake', secondary: 'Azure Blob Storage', description: 'Enterprise object store with Delta Lake ACID table format.' },
      processing: { primary: 'Azure Synapse Analytics (Spark) / Azure Databricks', secondary: 'Azure HDInsight', description: 'Managed Databricks and Synapse Spark compute nodes.' },
      serving: { primary: 'Azure Synapse Dedicated SQL / Trino on AKS', secondary: 'Azure Data Explorer (Kusto)', description: 'High-speed SQL query engine over Delta Lake objects.' },
      semantic: { primary: 'Azure AI Search Vector Store / Cosmos DB', secondary: 'Cube.js on Azure Container Apps', description: 'Hybrid vector search for Enterprise Azure OpenAI RAG.' },
      governance: { primary: 'Microsoft Purview + Azure RBAC', secondary: 'Privacera on Azure', description: 'Automated data lineage and enterprise compliance governance.' },
      consumption: { primary: 'Microsoft PowerBI Enterprise', secondary: 'Azure API Management', description: 'Interactive executive reporting and embedded dashboard APIs.' },
    }
  },
  gcp: {
    vendor: 'gcp',
    name: 'Google Cloud Platform (GCP)',
    badgeColor: '#ea4335',
    layers: {
      ingestion: { primary: 'Google Cloud Pub/Sub / Datastream CDC', secondary: 'Pub/Sub Lite', description: 'Global event streaming log & serverless CDC replication.' },
      storage: { primary: 'Google Cloud Storage (GCS) + Apache Iceberg BigLake', secondary: 'BigQuery Managed Storage', description: 'Global object store with Apache Iceberg open format.' },
      processing: { primary: 'Google Cloud Dataproc (Spark) / Dataflow (Beam)', secondary: 'Dataproc Serverless', description: 'Managed Spark & Apache Beam streaming execution.' },
      serving: { primary: 'Google BigQuery / BigQuery Omni (Federated)', secondary: 'ClickHouse on GKE', description: 'Petabyte-scale serverless analytics query engine.' },
      semantic: { primary: 'Google Vertex AI Vector Search / Matching Engine', secondary: 'Looker Semantic Model', description: 'Ultra-low latency vector matching for Gemini RAG.' },
      governance: { primary: 'Google Dataplex + Cloud IAM Policy Tagging', secondary: 'Atlan on GCP', description: 'Active metadata management and column-level security.' },
      consumption: { primary: 'Looker Enterprise / Looker Studio Pro', secondary: 'Vertex AI Agent Builder', description: 'Governed business intelligence & AI agent actions.' },
    }
  },
  hybrid: {
    vendor: 'hybrid',
    name: 'Sovereign Multi-Cloud Hybrid',
    badgeColor: '#10b981',
    layers: {
      ingestion: { primary: 'Apache Kafka / Redpanda / Debezium CDC', secondary: 'Apache NiFi (On-Prem)', description: 'Open-source distributed streaming on Kubernetes / On-Prem.' },
      storage: { primary: 'MinIO Enterprise / Apache Iceberg REST Catalog', secondary: 'Ceph Object Store', description: 'Sovereign multi-cloud object storage with zero vendor lock-in.' },
      processing: { primary: 'Apache Spark on Kubernetes / Ray / dbt-core', secondary: 'DuckDB Local', description: 'Decoupled open-source compute engines defined as code.' },
      serving: { primary: 'Trino Query Engine / ClickHouse OLAP', secondary: 'Starburst Enterprise', description: 'Sub-second federated SQL across S3, ADLS, GCS, and Postgres.' },
      semantic: { primary: 'pgvector (PostgreSQL) / Milvus / Cube.js', secondary: 'Qdrant / LlamaIndex', description: 'Self-hosted vector stores ensuring zero data leakage.' },
      governance: { primary: 'OpenMetadata / Immuta / Open Policy Agent (OPA)', secondary: 'Apache Ranger', description: 'Zero-trust federated policy enforcement across regions.' },
      consumption: { primary: 'Metabase / Apache Superset / Real-Time GraphQL', secondary: 'Custom Microservice APIs', description: 'Open-source BI and real-time operational APIs.' },
    }
  }
};
