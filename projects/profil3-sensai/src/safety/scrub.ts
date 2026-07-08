/** Redact personal contact details from text before it is stored (minimization).
 *  Professional research does not need to retain emails/phone/personal handles. */
const EMAIL = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
const PHONE = /(\+?\d[\d\s().-]{7,}\d)/g;
export function scrubContactPii(text: string, enabled = true): string {
  if (!enabled) return text;
  return text.replace(EMAIL, '[email redacted]').replace(PHONE, '[phone redacted]');
}
