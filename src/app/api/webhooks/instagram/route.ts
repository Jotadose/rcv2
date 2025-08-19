import { NextResponse } from "next/server";
import crypto from "crypto";

// Cache symbol consistent with instagram media route to invalidate on updates
const IG_CACHE_SYMBOL = Symbol.for("__rc_reformas_ig_cache");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CacheEntry = { data: any; fetchedAt: number };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GlobalWithCache = typeof globalThis & { [IG_CACHE_SYMBOL]?: CacheEntry };

function clearInstagramCache() {
  const g = globalThis as GlobalWithCache;
  if (g[IG_CACHE_SYMBOL]) delete g[IG_CACHE_SYMBOL];
}

// Verification (GET) - Facebook/Instagram Webhook handshake
export async function GET(req: Request) {
  const url = new URL(req.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.INSTAGRAM_VERIFY_TOKEN) {
    return new Response(challenge || "", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }
  return new Response("Forbidden", { status: 403 });
}

// Webhook updates (POST)
export async function POST(req: Request) {
  const appSecret = process.env.INSTAGRAM_APP_SECRET;
  if (!appSecret) {
    return NextResponse.json(
      { error: "INSTAGRAM_APP_SECRET not configured" },
      { status: 500 }
    );
  }

  const rawBody = await req.text();
  const signature = req.headers.get("x-hub-signature-256");

  if (signature) {
    const expected =
      "sha256=" +
      crypto.createHmac("sha256", appSecret).update(rawBody).digest("hex");
    try {
      const valid = crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expected)
      );
      if (!valid)
        return NextResponse.json(
          { error: "Invalid signature" },
          { status: 401 }
        );
    } catch {
      return NextResponse.json(
        { error: "Invalid signature compare" },
        { status: 401 }
      );
    }
  }

  try {
    const json = JSON.parse(rawBody || "{}");
    const isArray = Array.isArray(json.entry);
    if (isArray) clearInstagramCache();
    return NextResponse.json({ received: true, cacheCleared: isArray });
  } catch (e: any) {
    return NextResponse.json(
      { error: "Invalid JSON", message: e.message },
      { status: 400 }
    );
  }
}
