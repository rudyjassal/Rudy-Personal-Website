"use client";

import FisheyeText from "@/components/FisheyeText";
import DashList from "@/components/DashList";

const STORY = [
  { year: "2006", desc: "Born in New Delhi." },
  { year: "2007", desc: "Moved to Nigeria. Flew Emirates business class for the first (and only) time in my life so far." },
  { year: "2008", desc: "Crawled around and got pampered." },
  { year: "2009", desc: "Moved to India." },
  { year: "2011", desc: "Visited Canada for the first time. Had no idea I'd end up moving here one day." },
  { year: "2012", desc: "Thought the world was ending. Collected Geronimo Stilton books instead." },
  { year: "2015", desc: "Moved to Uganda." },
  { year: "2016", desc: "Made my first close friends." },
  { year: "2017", desc: "Started a band with my best friends. Didn't last long, none of us could play an instrument, just a shared love for 80s/90s music." },
  { year: "2018", desc: "Moved back to India. Joined Sherwood College, a boarding school in the mountains (also where the biggest actor in Bollywood went)." },
  { year: "2019", desc: "Hated boarding school. Moved back to New Delhi." },
  { year: "2020", desc: "Joined Ryan International. Did Model UN for the first time during lockdown." },
  { year: "2021", desc: "Liked a girl for the first time. She didn't like me back but either way, we up." },
  { year: "2022", desc: "Back to school in person. Backpacked across Europe for a month: France, Switzerland, Sweden, Denmark, Netherlands, Italy. Check the photo dump." },
  { year: "2023", desc: "Sat the Indian national board exams, placed in the top 25% of the country, then moved to Canada." },
  { year: "2024", desc: "Started new ventures. Went back to India for the summer." },
  { year: "2025", desc: "Graduated high school." },
  { year: "2026", desc: "Building the default for data." },
];

export default function LifeStoryPage() {
  return (
    <div className="min-h-screen bg-black text-white py-12 lg:py-24 px-6">
      <main className="site-content w-full max-w-[850px] mx-auto relative z-10 px-6">
        <header className="mb-16 pt-12 lg:pt-16">
          <h1 className="text-6xl font-serif mb-8">
            <span id="life-story-headline" className="inline-block">
              <FisheyeText>Life Story</FisheyeText>
            </span>
          </h1>
          <p className="text-muted font-sans tracking-wide uppercase text-sm mb-12">
            A timeline
          </p>
        </header>

        <section className="pb-24">
          <DashList 
            items={STORY.map(item => (
              <div key={item.year} className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 py-1">
                <span className="font-serif text-lg text-white whitespace-nowrap">
                  <FisheyeText>{item.year}</FisheyeText>
                </span>
                <span className="text-muted/60 font-serif hidden md:inline">—</span>
                <span className="text-muted font-serif text-[17px] leading-relaxed">
                  <FisheyeText>{item.desc}</FisheyeText>
                </span>
              </div>
            ))} 
          />
        </section>
      </main>
    </div>
  );
}
