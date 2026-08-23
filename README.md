# ArchitectIQ | Enterprise Data Architecture Framework & Selection Engine

[![Live Web App](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-00CCFF?style=for-the-badge&logo=github)](https://thesimonk.github.io/data-architecture/)
[![Architecture](https://img.shields.io/badge/Paradigm-Data%20Mesh%20%7C%20Lakehouse%20%7C%20Fabric-059669?style=for-the-badge)](https://github.com/thesimonk/data-architecture)
[![Tech Stack](https://img.shields.io/badge/Stack-React%2018%20%7C%20TypeScript%20%7C%20Vite%20%7C%20Tailwind-6366F1?style=for-the-badge)](https://github.com/thesimonk/data-architecture)

> **Enterprise Data Architecture Decision Engine & Interactive Explorer**  
> Designed to help enterprises evaluate, select, and design optimal data architecture frameworks (Medallion Lakehouse, Data Mesh, Data Fabric, Modern Data Stack, Real-Time Kappa/Streaming, and Sovereign Hybrid Multi-Cloud) based on organizational topology, latency, scale, compliance, and AI/ML requirements.

---

## Live Demo & Access

### Option 1: Live Interactive Web App (Hosted on GitHub Pages)
Launch the interactive application directly in your browser:  
[Launch ArchitectIQ Live Demo](https://thesimonk.github.io/data-architecture/)

### Option 2: Clone & Run Locally
```bash
git clone https://github.com/thesimonk/data-architecture.git
cd data-architecture
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## Architecture Decision Flowchart

The decision engine routes organizational requirements through a 7-dimensional decision matrix:

```mermaid
flowchart TD
    Start([Enterprise Data Requirements]) --> Q1{Organizational Topology}
    
    Q1 -->|Centralized BI Team| Q2{Data Scale & Velocity}
    Q1 -->|Decentralized Business Units| Mesh[Data Mesh Architecture]
    Q1 -->|Hybrid Federated Squads| Q2
    
    Q2 -->|Petabyte + Mixed Unstructured AI/ML| Lakehouse[Medallion Lakehouse Architecture]
    Q2 -->|Sub-Second Real-Time Streaming| Kappa[Real-Time Kappa/Streaming Architecture]
    Q2 -->|Terabyte Batch SQL Reporting| MDS[Modern Data Stack]
    
    Start --> Q3{Compliance & Sovereignty}
    Q3 -->|Strict Cross-Border Data Residency| Sovereign[Sovereign Multi-Cloud Hybrid]
    Q3 -->|Heterogeneous Legacy Silos| Fabric[Data Fabric Architecture]

    Mesh --> Output([Dynamic Architecture Spec & Blueprint])
    Lakehouse --> Output
    Kappa --> Output
    MDS --> Output
    Sovereign --> Output
    Fabric --> Output
```

---

## Key Application Modules

### 1. Interactive Architecture Decision Engine Wizard
- 7-Dimension assessment evaluating **Team Topology**, **Data Latency**, **Volume & Scale**, **Regulatory Compliance**, **AI/LLM Readiness**, **Technical Skillset**, and **Cloud Strategy**.
- Dynamic scoring algorithm generating match percentages, architectural rationale, key risks to watch, and a 90-day implementation roadmap.

### 2. 7-Tier Interactive Blueprint Canvas
- End-to-end pipeline visualization across 7 layers:
  1. **Ingestion & Streaming**: Apache Kafka, Debezium CDC, Fivetran
  2. **Lakehouse & Storage**: Apache Iceberg, Delta Lake, S3 / ADLS
  3. **Processing & Compute**: Apache Spark, dbt-core, Ray, Flink
  4. **Serving & Query Engine**: Trino, ClickHouse, Snowflake, DuckDB
  5. **Semantic Layer & AI**: Cube.js, Vector DBs (Pinecone, pgvector), LlamaIndex
  6. **Governance & Lineage**: OpenMetadata, Immuta, Data Contracts
  7. **Consumption & Action**: Metabase, PowerBI, Reverse ETL, AI Agents
- Interactive node-click deep dives detailing responsibilities, open-source vs SaaS options, anti-patterns, and production code configs.

### 3. Enterprise Paradigm Comparison Matrix
- Side-by-side comparative table evaluating **Data Mesh**, **Medallion Lakehouse**, **Data Fabric**, **Modern Data Stack**, **Real-Time Kappa**, and **Sovereign Hybrid** across 12 strategic dimensions (TCO, Complexity, Latency, Autonomy, AI Readiness, Cloud Lock-in).

### 4. Data Product Contract Modeler
- Interactive sandbox for defining domain data products, schema assertions, SLA latency, PII masking rules, and generating production-ready YAML data contracts.

### 5. Senior Data Architect Reference Compendium
- Deep-dive technical articles covering **Apache Iceberg Metadata Trees**, **Enterprise Data Contracts**, **FinOps Cost Optimization**, and **RAG / Vector Pipeline Architecture**.

### 6. Executive Blueprint Export Generator
- Instant generation and download of formatted Markdown (`.md`) and JSON (`.json`) architecture proposals for executive stakeholders.

---

## Repository Structure

```
data-architecture/
├── .github/
│   └── workflows/
│       └── deploy.yml            # Automated GitHub Pages CI/CD Action
├── src/
│   ├── components/
│   │   ├── Header.tsx            # Navigation bar & portfolio header
│   │   ├── Wizard/               # 7-step decision wizard & results
   │   ├── Blueprint/            # 7-tier pipeline canvas & detail modals
   │   ├── Matrix/               # 12-dimension comparative matrix
   │   ├── DataProduct/          # Data contract YAML modeler
   │   ├── Reference/            # Senior architect reference articles
   │   └── Export/               # Executive report export dialog
   ├── data/
   │   ├── paradigms.ts          # Architecture paradigm definitions
   │   ├── wizardQuestions.ts    # 7 dimension assessment scoring
   │   ├── blueprintLayers.ts    # 7 pipeline layers & components
   │   ├── comparisonMatrix.ts   # 12 comparison dimensions
   │   └── referenceLibrary.ts   # Deep-dive architecture articles
   ├── types/
   │   └── architecture.ts       # TypeScript domain models
   ├── utils/
   │   ├── recommendationEngine.ts # Dynamic scoring algorithm
   │   └── exportUtils.ts        # Markdown & JSON exporter
   ├── App.tsx
   ├── index.css
   └── main.tsx
├── package.json
├── vite.config.ts                # Relative base configuration for GitHub Pages
├── tsconfig.json
├── index.html
└── README.md
```
