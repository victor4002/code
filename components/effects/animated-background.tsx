"use client";

export function AnimatedBackground() {
  return (
    <>
      {/* Animated Grid */}
      <div className="animated-grid">
        <div className="grid-lines" />
        <div className="grid-glow" />
      </div>

      {/* Floating Particles */}
      <div className="particles-container">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="particle" />
        ))}
      </div>

      {/* Morphing Blobs */}
      <div className="morphing-blob blob-1" />
      <div className="morphing-blob blob-2" />
      <div className="morphing-blob blob-3" />

      {/* Noise Overlay */}
      <div className="noise-overlay" />
      
      {/* Scanlines (subtle) */}
      <div className="scanlines" />
    </>
  );
}
