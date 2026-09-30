# VOID Code-Formatting & Advancement Rules

1. **Originals stay external and immutable.** GitHub receives working copies and derivatives.
2. **One source, many derivatives.** Every enhanced file keeps a parent particle reference.
3. **No silent repair.** Missing or uncertain portions are marked and resolved in a new derivative.
4. **Security before promotion.** Remove credentials, hard-coded secrets and environment-specific identifiers.
5. **Mock/synthetic telemetry is labeled.** It cannot be promoted as observed production evidence.
6. **Runtime claims require proof.** Rendering, compilation and execution are separate verification states.
7. **Exact-byte hashes before VERIFIED.** SHA-256 is computed from the actual source bytes.
8. **Code extraction is modular.** Concatenated multi-module documents are split into runnable files with tests.
9. **Large binaries do not bloat Git history.** Use manifests, Git LFS, or Releases where appropriate.
10. **Public release is derivative-only.** Private source records remain private unless explicitly promoted.
