import Bio from "@/components/Bio";
import Section from "@/components/Section";
import DashList from "@/components/DashList";
import Elsewhere from "@/components/Elsewhere";
import ExperienceAccordion from "@/components/ExperienceAccordion";
import FisheyeText from "./FisheyeText";

export default function LeftColumnContent() {
  return (
    <>
      {/* ── Title ──────────────────────────────── */}
      <h1
        className="mb-12 flex items-baseline gap-4 flex-wrap"
        style={{
          fontFamily: '"Times New Roman", Times, serif',
          fontWeight: 500,
          fontSize: "clamp(36px, 5vw, 52px)",
          lineHeight: 1.1,
          letterSpacing: "-0.01em",
          color: "var(--text-primary)",
        }}
      >
        <span><FisheyeText>Rudra Jassal</FisheyeText></span>
        <span 
          id="aka-rudy"
          className="text-[clamp(18px,3vw,24px)] opacity-60"
          style={{ 
            fontFamily: '"Brush Script MT", "Lucida Handwriting", "Segoe Print", cursive',
            transform: 'rotate(-3deg) translateY(-2px)',
            display: 'inline-block'
          }}
        >
          <FisheyeText>(aka Rudy)</FisheyeText>
        </span>
      </h1>

      <Bio />

      <Section label="Currently">
        <ul className="dash-list font-serif" style={{ fontSize: "17px" }}>
          <li>
            <a 
              href="https://uwaterloo.ca/future-students/programs/computing-and-financial-management"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:opacity-70 transition-opacity"
            >
              <FisheyeText>CFM</FisheyeText>
              <img src="/waterloo.svg?v=2" alt="Waterloo Crest" className="h-[24px] w-auto object-contain align-middle" />
            </a>
          </li>
          <li>
            <a 
              href="https://phiner.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 hover:opacity-70 transition-opacity"
            >
              <FisheyeText>Building</FisheyeText> 
              <div className="flex items-center gap-5 ml-2">
                <img src="/phiner.svg?v=2" alt="Phiner Logo" style={{ height: '22px', width: 'auto' }} className="object-contain align-middle" />
                
                {/* Squared NVIDIA Logo to match Phiner size */}
                <div className="h-[22px] w-[22px] relative overflow-hidden flex items-center justify-center bg-white rounded-sm">
                  <img 
                    src="/nvidia_new.png" 
                    alt="NVIDIA Logo" 
                    style={{ height: '220%', width: 'auto', maxWidth: 'none', transform: 'translateY(2%)' }} 
                    className="object-contain" 
                  />
                </div>

                <img src="/residency.svg" alt="The Residency Logo" style={{ height: '22px', width: 'auto' }} className="object-contain align-middle" />
                <img src="/forumvc.svg" alt="Forum VC Logo" style={{ height: '22px', width: 'auto' }} className="object-contain align-middle" />
              </div>
            </a>
          </li>
          <li>
            <a 
              href="https://www.instagram.com/p/DXfAxc2kUEi/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 hover:opacity-70 transition-opacity"
            >
              <FisheyeText>Moving to Silicon Valley 💸</FisheyeText>
              <img src="/goldengate.svg" alt="Golden Gate Bridge" className="h-[22px] w-auto object-contain align-middle theme-invert" />
            </a>
          </li>
        </ul>
      </Section>

      <Section label="Previously">
        <DashList 
          items={[
            <ExperienceAccordion 
              key="tigerclip" 
              title="TigerClip" 
              logoSrc="/tigerclip.png" 
              description="Sold my basketball stat analytics software to NBA player Andrew Wiggins." 
            />,
            <ExperienceAccordion 
              key="emanay" 
              title="Emanay Capital" 
              logoSrc="/emanay_logo.png" 
              description="Worked on buy-side mandates worth $250M+" 
            />,
            <ExperienceAccordion 
              key="prasad" 
              title="Prasad & Company LLP" 
              logoSrc="/prasad_logo.png" 
              description="Saved the Canadian Revenue Agency $500k in fraud" 
            />,
            <ExperienceAccordion 
              key="tfi" 
              title="Teach for India" 
              logoSrc="/tfi_logo.png" 
              description="Built a curriculum for 33M+ Indian underprivalaged students over a summer" 
            />
          ]} 
        />
      </Section>

      <Section label="Elsewhere">
        <Elsewhere />
      </Section>
    </>
  );
}
