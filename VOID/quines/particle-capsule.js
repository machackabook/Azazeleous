/**
 * VOID Quine Capsule v0.1
 * Self-describing transport wrapper for one particle manifest.
 * This is a quine capsule, not a claim of a mathematically minimal pure quine.
 */
export function createVoidCapsule(particle) {
  const envelope = {
    protocol: "void.quine-capsule.v0.1",
    origin_anchor: "NEXUS://0.0.0",
    particle,
    emitted_at: new Date().toISOString()
  };

  const json = JSON.stringify(envelope);
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  const encoded = btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

  return {
    envelope,
    encoded,
    dataUrl: "data:application/vnd.void.particle+json;base64," + btoa(binary)
  };
}

export function decodeVoidCapsule(encoded) {
  const normalized = encoded.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - normalized.length % 4) % 4);
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}
