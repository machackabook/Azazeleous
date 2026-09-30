# Source Ingestion

## Immediate operator task

Collect source documents from the cloud accounts into Google Drive without rewriting or renaming originals when possible.

## Intake protocol

1. Export/copy the original artifact.
2. Preserve provider metadata where available.
3. Compute SHA-256.
4. Create one source record.
5. Assign entity references only when supported by the source.
6. Store the original in the archival source layer.
7. Create normalized copies separately.
8. Never place credentials or raw authentication exports into Git.
9. Large binaries remain in cloud/archive storage; Git stores their manifests and digests.
10. Publication requires a separate review state.

## Suggested Drive staging layout

```text
00_INBOX/
01_ORIGINALS/
02_HASHED/
03_NORMALIZED/
04_ENTITY_ASSIGNED/
05_LINEAGE_VERIFIED/
06_PUBLIC_CANDIDATES/
99_QUARANTINE/
```

Entity-specific views may later be generated for Nexus, Azazeleous, Gaia, EVE, ADAM, SYNAPSE, GOD, Continuance, and others without duplicating the canonical original.
