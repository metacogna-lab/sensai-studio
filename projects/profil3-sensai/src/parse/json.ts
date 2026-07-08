/** Robust JSON extraction from model output. Never trust naive JSON.parse. */
const strip = (s: string) => String(s).replace(/```(?:json)?/gi, '');
function spans(s: string, open: string, close: string): string[] {
  const out: string[] = []; let depth = 0, start = -1;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === open) { if (depth === 0) start = i; depth++; }
    else if (c === close && depth > 0 && --depth === 0 && start >= 0) { out.push(s.slice(start, i + 1)); start = -1; }
  }
  return out;
}
export function parseLastObject(text: string): Record<string, unknown> | null {
  const s = strip(text);
  try { const d = JSON.parse(s.trim()); if (d && typeof d === 'object' && !Array.isArray(d)) return d as any; } catch {}
  for (const span of spans(s, '{', '}').reverse()) { try { const d = JSON.parse(span); if (d && typeof d === 'object') return d as any; } catch {} }
  return null;
}
export function parseLastArray(text: string): unknown[] | null {
  const s = strip(text);
  try { const d = JSON.parse(s.trim()); if (Array.isArray(d)) return d; } catch {}
  for (const span of spans(s, '[', ']').reverse()) { try { const d = JSON.parse(span); if (Array.isArray(d)) return d; } catch {} }
  return null;
}
