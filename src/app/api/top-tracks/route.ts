import { NextResponse } from "next/server";
// Last Update: 2026-04-28 01:45 AM

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const LASTFM_STAR_HASH = "2a96cbd8b46e442fc41c2b86b821562f";

async function getAlbumArt(trackName: string, artistName: string, lastFmUrl?: string) {
  // If Last.fm gives us the placeholder star or nothing, use iTunes
  if (!lastFmUrl || lastFmUrl.includes(LASTFM_STAR_HASH) || lastFmUrl === "") {
    try {
      const itunesUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(`${trackName} ${artistName}`)}&entity=song&limit=1`;
      
      // Add a timeout to iTunes fetch to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      
      const res = await fetch(itunesUrl, { signal: controller.signal });
      clearTimeout(timeoutId);
      
      const data = await res.json();
      if (data.results && data.results[0]) {
        // Return 600x600 artwork
        return data.results[0].artworkUrl100.replace("100x100bb", "600x600bb");
      }
    } catch (e) {
      // Ignore error, fallback to Last.fm or placeholder
      console.error("iTunes fetch failed for", trackName, e);
    }
  }
  return lastFmUrl || "https://via.placeholder.com/600?text=No+Cover";
}

export async function GET() {
  const API_KEY = process.env.LASTFM_API_KEY || process.env.LAST_FM_API_KEY;
  const USERNAME = process.env.LASTFM_USERNAME || process.env.LAST_FM_USERNAME || process.env.LASTFM_USER || process.env.LAST_FM_USER;
  
  if (!API_KEY || !USERNAME) {
    const missing = [];
    if (!API_KEY) missing.push("API_KEY");
    if (!USERNAME) missing.push("USERNAME");
    return Response.json({ 
      error: `Missing in Vercel Production: ${missing.join(", ")}. Please check Settings > Environment Variables.` 
    }, { status: 200 });
  }

  console.log(`[Tunes API] Fetching for user: ${USERNAME}`);

    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=20`;
    
    const response = await fetch(url, { cache: 'no-store' });
    
    if (!response.ok) {
      return Response.json({ error: "Last.fm API returned error" }, { status: 200 });
    }

    const data = await response.json();
    
    if (data.error || !data.recenttracks?.track) {
      return Response.json([]);
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

    return Response.json(tracks);
  } catch (error) {
    console.error("Tunes API Route crash:", error);
    return Response.json([], { status: 200 });
  }
}
