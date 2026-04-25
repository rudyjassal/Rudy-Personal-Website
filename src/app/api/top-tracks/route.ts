import { NextResponse } from "next/server";

const API_KEY = process.env.LASTFM_API_KEY;
const USERNAME = process.env.LASTFM_USER || process.env.LASTFM_USERNAME;

const LASTFM_STAR_HASH = "2a96cbd8b46e442fc41c2b86b821562f";

async function getAlbumArt(trackName: string, artistName: string, lastFmUrl: string) {
  // If Last.fm gives us the placeholder star or nothing, use iTunes
  if (!lastFmUrl || lastFmUrl.includes(LASTFM_STAR_HASH)) {
    try {
      const itunesUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(`${trackName} ${artistName}`)}&entity=song&limit=1`;
      const res = await fetch(itunesUrl);
      const data = await res.json();
      if (data.results && data.results[0]) {
        // Return 600x600 artwork
        return data.results[0].artworkUrl100.replace("100x100bb", "600x600bb");
      }
    } catch {
      // Ignore error
    }
  }
  return lastFmUrl || "https://via.placeholder.com/600?text=No+Cover";
}

export async function GET() {
  try {
    if (!API_KEY || !USERNAME) {
      return NextResponse.json({ error: "Missing Last.fm credentials" }, { status: 500 });
    }

    // user.getrecenttracks is truly real-time (shows what you're listening to right NOW)
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=20`;
    
    const response = await fetch(url, { 
      cache: 'no-store' // Disable caching for truly real-time updates
    });
    const data = await response.json();
    
    if (data.error || !data.recenttracks?.track) {
      return NextResponse.json([]);
    }

    const tracks = await Promise.all(
      data.recenttracks.track.map(async (track: { mbid?: string; name: string; artist: { '#text'?: string; name?: string }; image: { '#text': string }[] }) => ({
        id: track.mbid || track.name + (track.artist['#text'] || track.artist.name),
        title: track.name,
        artist: track.artist['#text'] || track.artist.name,
        albumArt: await getAlbumArt(track.name, (track.artist['#text'] || track.artist.name || ""), track.image[3]["#text"]),
        url: `https://open.spotify.com/search/${encodeURIComponent(`${track.name} ${(track.artist['#text'] || track.artist.name || "")}`)}`,
      }))
    );

    return NextResponse.json(tracks);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
