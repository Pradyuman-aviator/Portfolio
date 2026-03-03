import { NextResponse } from "next/server";

const LASTFM_API_KEY = "749a4e74a1c6e516f25831016751906f";
const LASTFM_USERNAME = "Pradyuman32";

interface LastFmTrack {
  name: string;
  artist: { "#text": string };
  album: { "#text": string };
  image: Array<{ "#text": string; size: string }>;
  url: string;
  "@attr"?: { nowplaying: string };
  date?: { uts: string; "#text": string };
}

interface DeezerSearchResult {
  data?: Array<{
    preview: string;
    title: string;
    artist: { name: string };
  }>;
}

interface iTunesSearchResult {
  results?: Array<{
    previewUrl: string;
    trackName: string;
    artistName: string;
  }>;
}

async function getPreviewFromDeezer(
  trackName: string,
  artist: string
): Promise<string | null> {
  try {
    // Try full query first
    const query = encodeURIComponent(`${artist} ${trackName}`);
    const res = await fetch(
      `https://api.deezer.com/search?q=${query}&limit=3`,
      { cache: "no-store" }
    );
    const data = (await res.json()) as DeezerSearchResult;
    const preview = data?.data?.find((t) => t.preview)?.preview;
    if (preview) return preview;

    // Fallback: search by track name only
    const fallbackQuery = encodeURIComponent(trackName);
    const fallbackRes = await fetch(
      `https://api.deezer.com/search?q=${fallbackQuery}&limit=3`,
      { cache: "no-store" }
    );
    const fallbackData = (await fallbackRes.json()) as DeezerSearchResult;
    return fallbackData?.data?.find((t) => t.preview)?.preview || null;
  } catch {
    return null;
  }
}

async function getPreviewFromiTunes(
  trackName: string,
  artist: string
): Promise<string | null> {
  try {
    const query = encodeURIComponent(`${artist} ${trackName}`);
    const res = await fetch(
      `https://itunes.apple.com/search?term=${query}&media=music&limit=3`,
      { cache: "no-store" }
    );
    const data = (await res.json()) as iTunesSearchResult;
    return data?.results?.[0]?.previewUrl || null;
  } catch {
    return null;
  }
}

async function getPreviewUrl(
  trackName: string,
  artist: string
): Promise<string | null> {
  // Try Deezer first (usually better quality previews)
  const deezerPreview = await getPreviewFromDeezer(trackName, artist);
  if (deezerPreview) return deezerPreview;

  // Fallback to iTunes Search API
  const itunesPreview = await getPreviewFromiTunes(trackName, artist);
  if (itunesPreview) return itunesPreview;

  return null;
}

export async function GET() {
  try {
    const res = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=1`,
      { cache: "no-store" }
    );

    const data = (await res.json()) as {
      recenttracks?: {
        track?: LastFmTrack[];
      };
    };

    const track = data?.recenttracks?.track?.[0];
    if (!track) {
      return NextResponse.json(
        { track: null },
        {
          headers: {
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
          },
        }
      );
    }

    const image =
      track.image?.find((img) => img.size === "extralarge")?.["#text"] ||
      track.image?.find((img) => img.size === "large")?.["#text"] ||
      track.image?.[0]?.["#text"] ||
      "";

    const isNowPlaying = track["@attr"]?.nowplaying === "true";

    // Fetch 30-second audio preview (tries Deezer, then iTunes)
    const previewUrl = await getPreviewUrl(track.name, track.artist["#text"]);

    return NextResponse.json(
      {
        track: {
          name: track.name,
          artist: track.artist["#text"],
          album: track.album["#text"],
          image,
          url: track.url,
          isNowPlaying,
          playedAt: track.date?.["#text"] || null,
          previewUrl,
        },
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    );
  } catch {
    return NextResponse.json({ track: null }, { status: 500 });
  }
}
