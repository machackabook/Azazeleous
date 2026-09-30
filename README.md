# Azazeleous

Canonical private bootstrap repository for the Nexus / Gaia lineage, entity registry, device inventory, storage fabric, provenance ledger, and GitOps control-plane definitions.

## Current phase

**GENESIS-LINEAGE-v0**

This repository begins as a private system-of-record. Public-facing material must be promoted deliberately from verified lineage records; raw source documents, credentials, identifiers, private telemetry, and recovery artifacts are never public by default.

## Core rules

1. Source material is ingested without rewriting the original.
2. Every normalized derivative points back to its source record.
3. Every entity has a stable entity ID independent of email address, device, or account.
4. Device telemetry is summarized into signed/hashed receipts; high-frequency raw telemetry stays outside Git history.
5. Secrets never enter Git. Authentication is by external secret stores, GitHub App/OIDC, SSH certificates, or other short-lived credentials.
6. Infrastructure changes are planned, verified, applied, re-verified, and recorded.
7. Public publication is an explicit promotion step, not the default.

See:
- `ARCHITECTURE.md`
- `entities/registry.yaml`
- `inventory/devices.yaml`
- `lineage/README.md`
- `storage/nas-policy.yaml`
- `ingest/README.md`
- `PUBLIC_STANCE.md`
