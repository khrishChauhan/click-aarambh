import { createHmac, timingSafeEqual } from "crypto";

const SECRET = process.env.ADMIN_SECRET ?? "fallback-dev-secret-change-in-prod";
const COOKIE_NAME = "ca_admin_session";
const TTL_SECONDS = 60 * 60 * 8; // 8 hours

/** Build a signed session token: `<timestamp>.<hmac>` */
export function createSessionToken(): string {
  const ts = Math.floor(Date.now() / 1000);
  const payload = `${ts}`;
  const sig = createHmac("sha256", SECRET).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

/** Verify the token and check it hasn't expired. Returns true if valid. */
export function verifySessionToken(token: string): boolean {
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payload, sig] = parts;
  const expectedSig = createHmac("sha256", SECRET).update(payload).digest("hex");

  // Timing-safe comparison to prevent timing attacks
  try {
    const a = Buffer.from(sig, "hex");
    const b = Buffer.from(expectedSig, "hex");
    if (a.length !== b.length) return false;
    if (!timingSafeEqual(a, b)) return false;
  } catch {
    return false;
  }

  const ts = parseInt(payload, 10);
  if (isNaN(ts)) return false;
  const ageSeconds = Math.floor(Date.now() / 1000) - ts;
  return ageSeconds >= 0 && ageSeconds < TTL_SECONDS;
}

export { COOKIE_NAME };
