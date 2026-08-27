# ADAM Financial Opportunity Orchestration

## Purpose

This document defines ADAM's first financial operating boundary inside the private Azazeleous repository. ADAM may discover, classify, compare, monitor, and report opportunities. It does not autonomously move funds, place trades, custody assets, bypass controls, or represent a human as a regulated financial professional.

## Pipeline

`DISCOVER -> INGEST -> NORMALIZE -> VERIFY -> SCORE -> RISK REVIEW -> LEGAL/COMPLIANCE CHECK -> OPPORTUNITY MEMO -> HUMAN APPROVAL -> EXECUTE OUTSIDE ADAM -> RECONCILE -> MEASURE -> ARCHIVE -> LEARN`

Every opportunity receives a stable ID and provenance record. Claims without an attributable source remain unverified.

## Agent model

ADAM is the coordinator. Disposable CLI agents are bounded workers with explicit capabilities and least-privilege inputs/outputs.

### Worker roles

- `discover`: find candidate opportunities from approved public or authenticated data sources.
- `research`: extract facts, terms, dates, fees, counterparties, and source references.
- `market`: collect market structure, liquidity, pricing, and volatility observations where legally and technically permitted.
- `risk`: identify downside, concentration, liquidity, counterparty, operational, and model risks.
- `compliance`: flag jurisdiction, licensing, sanctions, KYC/AML, securities/commodity, tax, and platform-policy questions for human review.
- `compare`: rank opportunities against explicit criteria without presenting rankings as guarantees.
- `monitor`: watch previously validated opportunities for material changes.
- `reconcile`: compare expected versus observed outcomes and preserve evidence.

Workers are stateless by default. Persistent state belongs in the ledger and approved memory stores, not in hidden agent prompts.

## Opportunity scoring

Scores are decision-support metadata, not investment advice. At minimum record:

- expected value assumptions
- probability assumptions and confidence
- downside exposure
- liquidity/exit constraints
- fees and friction
- time horizon
- source quality
- data freshness
- legal/compliance status
- operational complexity
- reproducibility

A missing critical field produces `INCOMPLETE`, not a fabricated value.

## Crypto / digital-asset research

ADAM may research crypto-sector infrastructure and opportunities using the same pipeline. Competitive work should emphasize measurable engineering advantages: execution latency, settlement efficiency, interoperability, observability, security, cost, and reliability. No market-manipulation, credential theft, unauthorized access, wash trading, or deceptive activity is part of the system.

The phrase `iso+beat` is retained as an unresolved project reference until an authoritative project artifact identifies its exact meaning. No implementation is inferred from the name alone.

## Growth loop

ADAM's growth is measured by:

1. coverage of legitimate data sources
2. provenance completeness
3. verification precision
4. false-positive/false-negative review
5. reproducibility
6. risk detection quality
7. latency from discovery to validated memo
8. operational reliability
9. cost per validated opportunity
10. post-decision reconciliation quality

Growth proposals must produce evidence and a rollback path before promotion.

## No-mock rule

Production evidence must come from real execution against real permitted resources. Tests may use deterministic fixtures where required by software testing, but fixtures must never be represented as live financial opportunities, live balances, live market data, or production outcomes.

## Approval boundary

`DISCOVER`, `RESEARCH`, `VERIFY`, `SCORE`, `MONITOR`, and `REPORT` may be automated within credentials and permissions explicitly granted to a worker.

`TRANSFER FUNDS`, `PLACE ORDER`, `SIGN TRANSACTION`, `CHANGE CUSTODY`, `CHANGE ACCESS CONTROL`, and other irreversible financial actions require an explicit human-controlled boundary outside the autonomous worker loop.
