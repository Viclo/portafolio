import { Resend } from "resend";
import type { NextRequest } from "next/server";

/**
 * Contact form endpoint.
 *
 * The API key lives only here — it is never sent to the browser. The visitor's
 * address goes in Reply-To rather than From: sending *as* them would fail SPF
 * and DMARC on the verified domain and land the mail in spam.
 */

const TO = process.env.CONTACT_TO_EMAIL;
const FROM = process.env.CONTACT_FROM_EMAIL;

const LIMITS = {
  name: { min: 1, max: 100 },
  email: { max: 254 },
  message: { min: 10, max: 5000 },
};

/* Deliberately loose — real validation is the reply bouncing, not a clever regex */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Per-instance rate limit. Serverless means each cold instance gets its own
 * map, so this throttles bursts rather than enforcing a global quota — enough
 * to stop a naive script without pulling in Redis for a contact form.
 */
const MAX_PER_WINDOW = 5;
const WINDOW_MS = 10 * 60 * 1000;
const recentByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (recentByIp.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_PER_WINDOW) {
    recentByIp.set(ip, recent);
    return true;
  }

  recent.push(now);
  recentByIp.set(ip, recent);

  /* Keep the map from growing without bound on a long-lived instance */
  if (recentByIp.size > 5000) {
    for (const [key, times] of recentByIp) {
      if (times.every((t) => now - t >= WINDOW_MS)) recentByIp.delete(key);
    }
  }

  return false;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fail(error: string, status: number) {
  return Response.json({ error }, { status });
}

export async function POST(request: NextRequest) {
  if (!process.env.RESEND_API_KEY || !TO || !FROM) {
    console.error(
      "Contact form is not configured: RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL are all required."
    );
    return fail("The contact form isn't configured right now. Please email me directly.", 500);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return fail("Invalid request.", 400);
  }

  const body = payload as Record<string, unknown>;

  /* Honeypot: hidden from real users, irresistible to bots. Report success so
     the bot has nothing to learn from, but never send the mail. */
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return Response.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  /* Re-validate everything the client checked — anyone can POST here directly */
  if (name.length < LIMITS.name.min || name.length > LIMITS.name.max) {
    return fail("Please enter your name.", 400);
  }
  if (email.length > LIMITS.email.max || !EMAIL_RE.test(email)) {
    return fail("Please enter a valid email address.", 400);
  }
  if (message.length < LIMITS.message.min) {
    return fail("Please write a slightly longer message.", 400);
  }
  if (message.length > LIMITS.message.max) {
    return fail("That message is too long. Please keep it under 5000 characters.", 400);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return fail("Too many messages from this connection. Please try again later.", 429);
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: FROM,
    to: [TO],
    replyTo: email,
    subject: `Portfolio enquiry from ${name}`,
    text: `Name:    ${name}\nEmail:   ${email}\n\n${message}\n`,
    html: `
      <div style="font-family:ui-sans-serif,system-ui,sans-serif;line-height:1.6;color:#0e1124">
        <h2 style="margin:0 0 16px;font-size:18px">New portfolio enquiry</h2>
        <p style="margin:0 0 4px"><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p style="margin:0 0 16px"><strong>Email:</strong>
          <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>
        </p>
        <div style="padding:16px;border-left:3px solid #2b4eff;background:#f4f5fa;white-space:pre-wrap">${escapeHtml(
          message
        )}</div>
      </div>
    `,
  });

  if (error) {
    console.error("Resend rejected the message:", error);
    /* Surface the provider's reason while developing — it names the exact
       misconfiguration (unverified domain, restricted recipient, bad key).
       Never leaked in production. */
    const detail =
      process.env.NODE_ENV === "development" && error.message ? ` [${error.message}]` : "";
    return fail(`Couldn't send the message. Please email me directly instead.${detail}`, 502);
  }

  /* The id is the handle for this send in https://resend.com/emails */
  console.log(`Contact email accepted by Resend: ${data?.id} → ${TO}`);

  return Response.json({ ok: true });
}
