# Canonical Architecture

## Control loop

```text
Cloud sources / device sources
        ↓
Immutable source ingest
        ↓
Lineage registry
        ↓
Normalization + classification
        ↓
Entity assignment
        ↓
ADAM plan
        ↓
Lockstep verification
        ↓
Approved executor
        ↓
Physical / cloud target
        ↓
EVE re-verification
        ↓
Ledger receipt
        ↓
GitHub canonical state
```

## Planes

### Source plane
Google Drive, OneDrive, iCloud, GitHub, local device exports, recovery media, and future supported providers.

### Identity plane
Stable entity IDs represent Nexus, Azazeleous, Gaia, EVE, ADAM, SYNAPSE, GOD, Continuance, and future entities. Email addresses are contact endpoints, not identity roots.

### Device plane
Physical hosts and mobile/media endpoints are inventoried independently from the entities that operate through them.

### Storage plane
A federated NAS policy may allocate up to 10% of eligible local storage per enrolled device. Allocation is opt-in per device, revocable, quota-bound, encrypted, and never assumes writable access to vendor/system partitions.

### GitOps plane
GitHub contains desired state, schemas, manifests, policies, workflows, receipts, and promoted documentation. High-frequency raw telemetry and large binary archives remain external and are referenced by digest.

### Publication plane
Private source-of-truth records remain private. Public releases are generated only from reviewed, provenance-linked material.
