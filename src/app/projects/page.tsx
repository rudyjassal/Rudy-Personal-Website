"use client";

import FisheyeText from "@/components/FisheyeText";

const CATEGORIES = [
  {
    name: "Ventures",
    items: [
      {
        title: "TigerClip — Sports Analytics Platform",
        desc: "Built and sold TigerClip, a basketball analytics platform that automated stat tracking, video tagging, and performance benchmarking. Developed proprietary offensive and defensive rating models that improved player evaluation accuracy by ~50%, and closed a $10K pilot with NBA player Andrew Wiggins."
      },
      {
        title: "Tiger Management Services — Bookkeeping Startup",
        desc: "Co-founded a student-run bookkeeping consultancy serving sole proprietorships with automated Excel and QuickBooks workflows. Won the Skills Canada Applause Award, Top 7 of 400+ teams across Ontario and Quebec.",
        link: { label: "→ Watch the pitch", url: "https://www.youtube.com/watch?v=0dgSB37whCA" }
      },
      {
        title: "Phiner (current)",
        desc: "Building the default for data."
      }
    ]
  },
  {
    name: "Finance & Research",
    items: [
      {
        title: "Prasad & Company LLP — Accounting Intern",
        desc: "Interned at an accounting firm during tax season, the most junior person in the room by far. Everyone was racing to close files before CRA deadlines, but something about one client's investment portfolio didn't sit right with me. So instead of moving on, I pulled every broker statement and journal entry I could find and started cross-checking them line by line. I ended up uncovering over $500K in fraudulent transactions that the rest of the firm had missed, a hidden loophole that was artificially offsetting taxable losses. That was the first time I realized how fragile financial systems are when they're optimized for speed over accuracy."
      },
      {
        title: "Emanay Capital Advisors — Analyst Intern",
        desc: "Build financial models (DCF, DSCR, SBA 7(a)) to evaluate $100M+ in deal flow for lower middle-market M&A."
      },
      {
        title: "Robo Stock Advisor",
        desc: "Built an algorithmic portfolio engine parsing 1,000+ tickers, not to chase returns, but to engineer stability cutting correlation from 0.62 to 0.23 and halving annualized volatility against the S&P 500."
      },
      {
        title: "Event-Driven Stock Portfolio",
        desc: "Built a live market analytics system modeling event-driven investing and risk optimization. Achieved 14.9% average ROI and 7.45% ROA on simulated trades across names like Nvidia and Amazon. Backtested M&A arbitrage and short-term strategies against 1,000+ data points, outperforming baseline benchmarks across multiple scenarios."
      }
    ]
  },
  {
    name: "Community & Leadership",
    items: [
      {
        title: "Thornhill Youth Investment Committee — Founder",
        desc: "Scaled a regional student investing network from 1 to 5+ schools. Partnered with financial professionals to run workshops, trading simulations, and a Canada-wide investment competition with 1,000+ participants, sponsored by TD Bank and the ACES Chapter."
      },
      {
        title: "Waterloo Venture Group — Founder Programs Associate",
        desc: "Provide pro-bono GTM and growth support to early-stage startups (including OpenNote, YC S25). Organize events with Waterloo Velocity during Toronto and Waterloo Tech Week."
      },
      {
        title: "Teach For India — Student Teacher",
        desc: "Built and led an experiential math and financial literacy program for 100+ underprivileged students. The curriculum is now part of Teach For India's national network, reaching 33M+ students."
      }
    ]
  },
  {
    name: "High School",
    items: [
      {
        title: "Student Council — Minister of Communications",
        desc: "Led a team of 15 running school-wide engagement campaigns. Managed marketing for semi-formal, movie nights, and open mic — ticket sales grew 70% and student participation hit record highs."
      },
      {
        title: "High School Science Council — Founder",
        desc: "Turned the Science Council into an active STEM organization with weekly experiments, speaker events, and a regional science fair drawing 10+ schools across York Region."
      },
      {
        title: "Model UN — President",
        desc: "Ran workshops and debate simulations, trained new delegates, and helped host the Canada MUN conference."
      },
      {
        title: "High School Newspaper — Finance Editor",
        desc: "Wrote and edited articles on markets and economic trends, translating financial topics for a student audience and expanding the paper's readership."
      },
      {
        title: "YRDSB Entrepreneurship — Representative & Judge",
        desc: "Won the YRDSB Entrepreneurship Showcase, then returned the following year as a judge and guest speaker."
      }
    ]
  }
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-black text-white py-12 lg:py-24 px-6">
      <main className="site-content w-full max-w-[850px] mx-auto relative z-10 px-6">
        <header className="mb-24 pt-12 lg:pt-16">
          <h1 className="text-6xl font-serif mb-6">
            <span id="projects-headline" className="inline-block">
              <FisheyeText>Projects</FisheyeText>
            </span>
          </h1>
          <p className="text-muted font-sans tracking-wide uppercase text-sm">
            A running log of things I've built, led, or shipped.
          </p>
        </header>

        <div className="space-y-24 pb-32">
          {CATEGORIES.map((cat) => (
            <section key={cat.name}>
              <h2 className="text-[11px] uppercase tracking-[0.3em] text-accent font-sans mb-12 border-b border-white/10 pb-4">
                <FisheyeText>{cat.name}</FisheyeText>
              </h2>
              <div className="space-y-16">
                {cat.items.map((item, idx) => (
                  <div key={idx} className="group">
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-3">
                      <h3 className="text-xl font-serif text-white group-hover:text-accent transition-colors">
                        <FisheyeText>{item.title}</FisheyeText>
                      </h3>
                    </div>
                    <p className="text-muted font-serif text-[16px] leading-relaxed max-w-[750px]">
                      <FisheyeText>{item.desc}</FisheyeText>
                    </p>
                    {item.link && (
                      <a 
                        href={item.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 text-[12px] uppercase tracking-widest text-accent hover:opacity-70 transition-opacity"
                      >
                        {item.link.label}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
