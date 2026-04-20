import { ScrollFrameSequence } from "@/components/ScrollFrameSequence";

const FRAME_COUNT = 603;
const framePath = (i: number) =>
  `/frames/frame_${String(i).padStart(4, "0")}.jpg`;

const Index = () => {
  return (
    <main className="relative bg-background text-foreground">
      {/* Fixed overlay UI on top of scrubbing canvas */}
      <ScrollFrameSequence
        frameCount={FRAME_COUNT}
        framePath={framePath}
        className="relative"
      />

      {/* Overlay sections — positioned over the sticky canvas via negative margin */}
      <div className="pointer-events-none fixed inset-0 z-10">
        <Section1 />
      </div>

      {/* Content after the scroll sequence */}
      <section className="relative z-20 bg-background py-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-6 text-4xl font-semibold tracking-tight md:text-6xl">
            Engineered, end to end.
          </h2>
          <p className="text-lg text-muted-foreground">
            Every component crafted, every motion deliberate. Scroll to rebuild.
          </p>
        </div>
      </section>
    </main>
  );
};

const Section1 = () => (
  <div className="flex h-full w-full flex-col items-center justify-between py-16 text-center">
    <div className="px-6">
      <p className="mb-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        V12 · Hand assembled
      </p>
      <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
        Built before your eyes.
      </h1>
    </div>
    <div className="flex flex-col items-center gap-2 text-muted-foreground">
      <span className="text-xs uppercase tracking-widest">Scroll</span>
      <div className="h-10 w-px bg-foreground/30" />
    </div>
  </div>
);

export default Index;
