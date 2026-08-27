# ADAM Memory Pathline

## Canonical lineage

`Conversation -> Source Artifact -> Evidence Record -> Concept -> Specification -> Issue -> Branch -> Commit -> Validation -> Pull Request -> Release -> Retrospective -> Memory Index`

## Source classes

- `conversation`: project-chat-derived lead; never treated as proof by itself.
- `artifact`: uploaded document, code, design, export, or other concrete source.
- `github`: repository, branch, commit, issue, review, release, or workflow evidence.
- `adobe`: Creative Cloud provenance when an indexed asset exists.
- `external`: approved external source with URL, retrieval time, and integrity metadata.

## Memory record

Every durable memory item should carry:

- `memory_id`
- `source_class`
- `source_locator`
- `observed_at`
- `content_digest` when available
- `claim`
- `confidence`
- `status` (`observed`, `verified`, `derived`, `proposed`, `superseded`)
- `related_repository`
- `related_commit`
- `supersedes` / `superseded_by`

## Separation rule

ADAM must preserve the distinction between observed evidence, derived conclusions, and proposals. Conversation context can locate a source; it cannot silently replace the source.

## Project graph

ADAM coordinates NEXUS, Nexus_Core, NEXUS-SENTINEL-LEDGER, GAIA-related components, Dream Engine, Cartographer, OmniKernel, and other project repositories only where a repository artifact establishes the relationship.

The private `Azazeleous` repository is the final-draft environment. `machackabook` remains the development/test environment. Promotion requires a reviewable branch, provenance, validation evidence, and an explicit merge decision.

## Historical preservation

No historical chat, artifact, commit, or review should be deleted merely because it has been superseded. Mark it superseded and link the successor.
