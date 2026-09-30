# Cryptic Communications v0.1

This derivative turns the uploaded Zenith HTMX virtual-kernel pattern into a **live-first / simulation-fallback** browser communication layer.

GitHub Pages remains static; live services are reached through an authenticated device bridge.

```text
Zenith / GitHub Pages
        |
        v
Cryptic Bridge (localhost or Tailscale HTTPS)
        |
        +-- Ollama
        +-- Gemini API
        +-- SYNAPSE status
        +-- Weaviate status
        +-- Milvus / Knowhere status
        +-- PyGhidra sidecar status
        +-- BroadcastChannel in-browser tab mesh
```

The browser exposes only allowlisted capability IDs. Arbitrary shell forwarding is intentionally not part of the page contract; configuration changes should later be represented as signed remedy/action IDs.

## Quick references
- Alpha: https://share.google/aimode/HC7n2Ft23AtIdNeS3
- Alpha Base64: `aHR0cHM6Ly9zaGFyZS5nb29nbGUvYWltb2RlL0hDN24yRnQyM0F0SWROZVMz`
- Beta: https://share.google/aimode/GLT1lttzwHAP4zqdV
- Beta Base64: `aHR0cHM6Ly9zaGFyZS5nb29nbGUvYWltb2RlL0dMVDFsdHR6d0hBUDR6cWRW`
- Milvus(Knowhere) benchmark: https://ann-benchmarks.com/Milvus(Knowhere).html

The exact text selection for a `#:~:text=` fragment was not supplied, so no fragment is invented.

## Live terminal commands
- `bridge:status`
- `bridge:atoms`
- `vector:status`
- `synapse:status`
- `pyghidra:status`
- `AI: <prompt>`

Any other command falls back to the original virtual kernel rather than being sent to a remote shell.
