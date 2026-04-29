import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const LASTFM_STAR_HASH = "2a96cbd8b46e442fc41c2b86b821562f";

async function getAlbumArt(trackName: string, artistName: string, lastFmUrl: string): Promise<string> {
  if (!lastFmUrl || lastFmUrl.includes(LASTFM_STAR_HASH) || lastFmUrl === "") {
    try {
      const itunesUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(`${trackName} ${artistName}`)}&entity=song&limit=1`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      
      const res = await fetch(itunesUrl, { signal: controller.signal });
      clearTimeout(timeoutId);
      
      const data = await res.json();
      if (data.results && data.results[0]) {
        return data.results[0].artworkUrl100.replace("100x100bb", "600x600bb");
      }
    } catch (e) {
      console.error("iTunes fetch failed:", e);
    }
  }
  return lastFmUrl || "https://via.placeholder.com/600?text=No+Cover";
}

export async function GET(request: NextRequest): Promise<Response> {
  const API_KEY = process.env.LASTFM_API_KEY || process.env.LAST_FM_API_KEY;
  const USERNAME = process.env.LASTFM_USERNAME || process.env.LAST_FM_USERNAME || process.env.LASTFM_USER || process.env.LAST_FM_USER;
  
  if (!API_KEY || !USERNAME) {
    return new Response(JSON.stringify({ 
      error: "Missing Last.fm credentials in Vercel Production environment." 
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=20`;
    const response = await fetch(url, { cache: 'no-store' });
    
    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Last.fm API returned error" }), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await response.json();
    if (data.error || !data.recenttracks?.track) {
      return new Response(JSON.stringify([]), { 
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const rawTracks = Array.isArray(data.recenttracks.track) 
      ? data.recenttracks.track 
      : [data.recenttracks.track];

    const tracks = await Promise.all(
      rawTracks.map(async (track: any) => {
        const artistName = track.artist?.['#text'] || track.artist?.name || "Unknown Artist";
        const trackName = track.name || "Unknown Track";
        let lastFmArt = "";
        if (track.image && Array.isArray(track.image)) {
          lastFmArt = track.image[3]?.["#text"] || track.image[2]?.["#text"] || track.image[1]?.["#text"] || "";
        }

        return {
          id: track.mbid || `${trackName}-${artistName}-${track.date?.uts || Date.now()}`,
          title: trackName,
          artist: artistName,
          albumArt: await getAlbumArt(trackName, artistName, lastFmArt),
          url: `https://open.spotify.com/search/${encodeURIComponent(`${trackName} ${artistName}`)}`,
          nowPlaying: track['@attr']?.nowplaying === "true"
        };
      })
    );

    return new Response(JSON.stringify(tracks), { 
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify([]), { 
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
