export const dynamic = 'force-dynamic';

export async function GET() {
  const API_KEY = process.env.LASTFM_API_KEY || process.env.LAST_FM_API_KEY;
  const USERNAME = process.env.LASTFM_USERNAME || process.env.LAST_FM_USERNAME || process.env.LASTFM_USER || process.env.LAST_FM_USER;
  
  if (!API_KEY || !USERNAME) {
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=20`;
    const res = await fetch(url, { cache: 'no-store' });
    const data = await res.json();
    
    if (data.error || !data.recenttracks?.track) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const rawTracks = Array.isArray(data.recenttracks.track) ? data.recenttracks.track : [data.recenttracks.track];
    const tracks = rawTracks.map((track: any) => {
      const artistName = track.artist?.['#text'] || track.artist?.name || "Unknown Artist";
      const trackName = track.name || "Unknown Track";
      let art = "";
      if (track.image && Array.isArray(track.image)) {
        art = track.image[3]?.["#text"] || track.image[2]?.["#text"] || "";
      }
      return {
        id: track.mbid || `${trackName}-${artistName}`,
        title: trackName,
        artist: artistName,
        albumArt: art || "https://via.placeholder.com/600?text=No+Cover",
        url: `https://open.spotify.com/search/${encodeURIComponent(`${trackName} ${artistName}`)}`,
        nowPlaying: track['@attr']?.nowplaying === "true"
      };
    });

    return new Response(JSON.stringify(tracks), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
