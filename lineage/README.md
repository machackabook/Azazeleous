# Lineage

The lineage layer reconstructs the chronology from the earliest surviving source material to the present state.

## Record classes

- **source** — untouched original artifact.
- **normalized** — formatting-only derivative.
- **derived** — analysis, extraction, code generation, or transformation.
- **release** — reviewed public or operational output.

## Required lineage fields

Each record must contain:
- record_id
- parent_record_ids
- entity_refs
- source_provider
- source_account_ref
- source_path_ref
- original_timestamp
- ingestion_timestamp
- sha256
- mime_type
- transformation
- verification_state
- publication_state

No normalized or derived document may replace its original source record.
