import LeftColumnContent from "@/components/LeftColumnContent";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-accent selection:text-black">
      <main className="site-content w-full max-w-[850px] mx-auto relative z-10 px-6 pt-16 lg:pt-24 pb-[60vh]">
        <LeftColumnContent />
      </main>
    </div>
  );
}
