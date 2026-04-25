export const siteConfig = {
  title: "Rudrashish Jassal",
  description:
    "Rudy Jassal — building Phiner, a large data model for auditor-grade financials.",
  url: "https://rudyjassal.com",
};

export type Footnote = {
  id: number;
  label: string;
  body: string;
  link?: { text: string; href: string };
};

export const bioHTML = `Yoooo, I'm Rudy. I worked as a financial analyst in the past now I replace them.`;

export const footnotes: Footnote[] = [
  {
    id: 1,
    label: "Phiner",
    body: "Co-founder & CEO. LDM-1 parses PDFs, scans, and sub-ledgers into structured financials. 25+ signed LOIs, paid contract, KPMG in procurement, NVIDIA Inception, backed by Velocity. Research paper w/ Waterloo, Cambridge, Stanford faculty on arXiv soon.",
    link: { text: "phiner.ai", href: "https://phiner.ai" },
  },
  {
    id: 2,
    label: "The fraud story",
    body: "Routine reconciliation, found a pattern nobody was looking for. That moment is the through-line for everything since.",
  },
  {
    id: 3,
    label: "Waterloo",
    body: "Computing & Financial Management. President's Scholarship of Distinction. Mentor at Waterloo Venture Group.",
  },
];

export const currently = [
  "Building LDM-1 at Phiner — 25+ LOIs, KPMG procurement",
  "Closing pre-seed via Velocity Fund II Prime",
  "Moving to San Francisco",
];

export const previously = [
  "Sold my basketball stat analytics software to NBA player Andrew Wiggins.",
  "Portfolio engine — cut correlation 0.62→0.23, halved vol vs. S&P 500",
  "Buy-side M&A analyst @ Emanay Capital (3-statement modeling, DCF, comps)",
  "Internships @ Interac, CIBC, Shell",
  "Mentor @ Waterloo Venture Group (Opennote YC S25, Polarity Afore F25)",
];

export const elsewhere = [
  { label: "Twitter", href: "https://x.com/rudy_jassal" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rudrajassal" },
  { label: "GitHub", href: "https://github.com/rudyjassal" },
  { label: "Instagram", href: "https://www.instagram.com/rudy_jassal/" },
  { label: "Email", href: "mailto:rjassal@uwaterloo.ca" },
  { label: "Resume", href: "https://drive.google.com/drive/folders/1LpT56_eFmzfmms0loFWOLcH7qQmba6By?usp=sharing" },
];

