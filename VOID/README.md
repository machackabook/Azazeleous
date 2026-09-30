# VOID — Encoded Document Constellation

**State:** private staging genesis  
**Anchor:** `NEXUS://0.0.0`

VOID is the code-facing document constellation for the Nexus lineage.

The original artifacts remain in their source archives/enclaves. This Git layer is intentionally mutable: documents can be normalized, code-formatted, repaired, enhanced, versioned, linked, and promoted without rewriting the originals.

## Particle model

Every known artifact is represented by a **particle orb** in `catalog/index.json`.

A particle currently contains:

- a deterministic VOID particle identifier;
- source reference and filename;
- MIME/type class;
- timeline position;
- 3-D orbital coordinates;
- source/derivative state;
- lineage edges;
- SHA-256 slot for later exact-byte verification.

`content_sha256 = null` means the exact-byte content digest has not yet been promoted into the catalog. It does **not** mean the source is verified.

## Repository roles

```text
catalog/       machine-readable constellation
working/       imported code-facing copies; not originals
stars/         enhanced/verified code structures
lineage/       parent/child chronology records
schemas/       validation contracts
site/          circular 3-D traversal / GitHub Pages candidate
quines/        self-describing particle capsule utilities
reports/       audits, validation and promotion receipts
```

## Promotion states

```text
DISCOVERED
→ CATALOGED
→ NORMALIZED
→ CODE_FORMATTED
→ VERIFIED
→ STAR
→ RELEASED
```

No file advances merely because it renders successfully.

## Scale rule

VOID is designed to scale by keeping Git focused on code, manifests and normalized documents. Large archives, recovery images and high-frequency telemetry remain external or use Git LFS / Releases and are referenced by digest.
