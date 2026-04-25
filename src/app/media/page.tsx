"use client";

import { useState } from "react";
import FisheyeText from "@/components/FisheyeText";

const MEDIA_ITEMS = [
  { title: "Succession", type: "Show", poster: "https://image.tmdb.org/t/p/w500/77S99pAs80WlInWpS4TUn7YIu6R.jpg" },
  { title: "Interstellar", type: "Movie", poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6EwfVDxCzs25asSSTr7.jpg" },
  { title: "Beef", type: "Show", poster: "https://image.tmdb.org/t/p/w500/98hRshc5D6VnZidFqSyrW9yUfXh.jpg" },
  { title: "Dune: Part Two", type: "Movie", poster: "https://image.tmdb.org/t/p/w500/czembS0RhiERbtNR7T5KGPvbuog.jpg" },
  { title: "The Bear", type: "Show", poster: "https://image.tmdb.org/t/p/w500/5A6CidpXQf4K6vYhC0kM95W2rVf.jpg" },
  { title: "Oppenheimer", type: "Movie", poster: "https://image.tmdb.org/t/p/w500/8Gxv2mYqlpZZORv9S4n9S7Z9noF.jpg" },
  { title: "Industry", type: "Show", poster: "https://image.tmdb.org/t/p/w500/e9t7RInHk3wFz9S8R8pA8lU9S9q.jpg" },
  { title: "Dark", type: "Show", poster: "https://image.tmdb.org/t/p/w500/apbrfSowvS26m1BDjYAFvUr14pc.jpg" },
];

export default function MediaPage() {
  return (
    <div className="min-h-screen bg-black text-white py-12 lg:py-24 px-6">
      <main className="site-content w-full max-w-[850px] mx-auto relative z-10 px-6 pt-16">
        <header className="mb-16">
          <h1 className="text-6xl font-serif mb-4">
            <span id="media-headline" className="inline-block">
              <FisheyeText>Movies & Shows</FisheyeText>
            </span>
          </h1>
          <p className="text-muted font-sans tracking-wide uppercase text-sm">
            A log of what I'm watching on Netflix & beyond
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-32">
          {MEDIA_ITEMS.map((item, idx) => (
            <div key={idx} className="group relative aspect-[2/3] overflow-hidden rounded-lg bg-bg-panel transition-transform hover:scale-105">
              <img 
                src={item.poster} 
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-opacity group-hover:opacity-40"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/90 to-transparent">
                <span className="text-[10px] uppercase tracking-widest text-accent mb-1">{item.type}</span>
                <h3 className="font-serif text-[15px] leading-tight">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
