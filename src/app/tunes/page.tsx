"use client";

import { useEffect, useState } from "react";
import FisheyeText from "@/components/FisheyeText";

type Track = {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  url: string;
};

const MOCK_TRACKS: Track[] = [
  { id: "1", title: "Starboy", artist: "The Weeknd", albumArt: "https://i.scdn.co/image/ab67616d0000b2734718e2b124f792294b22c44b", url: "#" },
  { id: "2", title: "Blinding Lights", artist: "The Weeknd", albumArt: "https://i.scdn.co/image/ab67616d0000b2738863bc98b23e2c90442e9734", url: "#" },
  { id: "3", title: "God's Plan", artist: "Drake", albumArt: "https://i.scdn.co/image/ab67616d0000b273f90117d69d72111d95368a62", url: "#" },
  { id: "4", title: "One Dance", artist: "Drake", albumArt: "https://i.scdn.co/image/ab67616d0000b273941a346473138981442c5B2a", url: "#" },
  { id: "5", title: "Humble", artist: "Kendrick Lamar", albumArt: "https://i.scdn.co/image/ab67616d0000b273d434914c8695d735e5d3c880", url: "#" },
  { id: "6", title: "Levitating", artist: "Dua Lipa", albumArt: "https://i.scdn.co/image/ab67616d0000b273bd0e468696956627d0f983a4", url: "#" },
];

export default function TunesPage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const res = await fetch("/api/top-tracks");
        if (!res.ok) throw new Error("API not configured");
        const data = await res.json();
        setTracks(data);
      } catch {
        setTracks(MOCK_TRACKS);
      } finally {
        setLoading(false);
      }
    }
    fetchTracks();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white py-12 lg:py-24 px-6">
      <main className="site-content w-full max-w-[850px] mx-auto relative z-10 px-6">
        <header className="mb-16 pt-12 lg:pt-16">
          <h1 className="text-6xl font-serif mb-4">
            <span id="tunes-headline" className="inline-block">
              <FisheyeText>Tunes</FisheyeText>
            </span>
          </h1>
          <p className="text-muted font-sans tracking-wide uppercase text-sm">
            What I&apos;ve been listening to lately
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {tracks.map((track) => (
            <a 
              key={track.id} 
              href={track.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative block aspect-square overflow-hidden rounded-lg bg-bg-panel transition-transform hover:scale-105"
            >
              <img 
                src={track.albumArt} 
                alt={track.title}
                className="absolute inset-0 w-full h-full object-cover transition-opacity group-hover:opacity-40"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="font-serif text-lg leading-tight mb-1">{track.title}</h3>
                <p className="text-sm text-muted mb-4">{track.artist}</p>
                <span className="text-[10px] uppercase tracking-[0.2em] text-accent">Listen ↗</span>
              </div>
            </a>
          ))}
        </div>

        {!loading && tracks.length === 0 && (
          <div className="text-center py-24 border border-dashed border-panel-border rounded-xl">
            <p className="text-muted mb-4">No top tracks found for your account yet.</p>
            <p className="text-sm opacity-60 max-w-md mx-auto">
              Make sure your Spotify or Apple Music is connected to Last.fm and that you&apos;ve scrobbled some tracks recently!
            </p>
          </div>
        )}

        {loading && (
          <div className="flex justify-center mt-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white"></div>
          </div>
        )}
      </main>
    </div>
  );
}
