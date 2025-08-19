import { NextResponse } from "next/server";

// Simple in-memory cache (resets on redeploy / server restart)
interface CacheEntry {
  data: any;
  fetchedAt: number;
}
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 min
const IG_FIELDS =
  "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,username";
const LIMIT = 16;

// Use a symbol on globalThis to avoid TS complaints & name collisions
const IG_CACHE_SYMBOL = Symbol.for("__rc_reformas_ig_cache");
type GlobalWithCache = typeof globalThis & { [IG_CACHE_SYMBOL]?: CacheEntry };

function getCache(): CacheEntry | undefined {
  return (globalThis as GlobalWithCache)[IG_CACHE_SYMBOL];
}
function setCache(entry: CacheEntry) {
  (globalThis as GlobalWithCache)[IG_CACHE_SYMBOL] = entry;
}

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "INSTAGRAM_ACCESS_TOKEN missing in environment" },
      { status: 500 }
    );
  }

  try {
    const cache = getCache();
    const now = Date.now();
    if (cache && now - cache.fetchedAt < CACHE_TTL_MS) {
      return NextResponse.json({ source: "cache", data: cache.data });
    }

    // Step 1: get media IDs
    const mediaRes = await fetch(
      `https://graph.instagram.com/me/media?fields=${encodeURIComponent(
        IG_FIELDS
      )}&access_token=${token}&limit=${LIMIT}`,
      {
        // Ensure we always revalidate after TTL
        cache: "no-store",
      }
    );

    if (!mediaRes.ok) {
      const text = await mediaRes.text();
      return NextResponse.json(
        { error: "Failed to fetch media list", details: text },
        { status: mediaRes.status }
      );
    }

    const json = await mediaRes.json();

    // Filter unsupported or missing media_url
    const filtered = (json.data || []).filter(
      (item: any) => item.media_url || item.thumbnail_url
    );

    const shaped = filtered.map((m: any) => ({
      id: m.id,
      media_type: m.media_type,
      caption: m.caption || "",
      permalink: m.permalink,
      timestamp: m.timestamp,
      username: m.username,
      media_url: m.media_url || m.thumbnail_url,
      thumbnail_url: m.thumbnail_url || m.media_url,
    }));

    setCache({ data: shaped, fetchedAt: now });
    return NextResponse.json({ source: "live", data: shaped, fetchedAt: now });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Unexpected error", message: err?.message || String(err) },
      { status: 500 }
    );
  }
}
