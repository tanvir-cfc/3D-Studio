import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Box, Eye, Layers } from 'lucide-react';
import { PORTFOLIO_ITEMS, PortfolioItem, SERVICES } from '../data/studioData';
import { MODEL_PRESETS, ModelPresetId } from './Interactive3DModelViewer';

/**
 * 1. MUSEMIND-STYLE HERO SCROLL-EXPAND 3D CONTAINER
 * Starts framed with 3D perspective tilt & scale (0.88, rotateX 9deg) and smoothly expands
 * to 100% full width (scale 1, rotateX 0deg) as the user scrolls down the hero.
 */
export const ScrollExpand3DContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0 -> 1

  useEffect(() => {
    let rafId = 0;
    const update = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // When top of element moves from 75% of viewport height up to 15% of viewport height
      const raw = (vh * 0.78 - rect.top) / (vh * 0.58);
      const clamped = Math.max(0, Math.min(1, raw));
      setProgress(clamped);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const scale = 0.88 + progress * 0.12;
  const rotateX = (1 - progress) * 9;
  const translateY = (1 - progress) * 24;

  return (
    <div ref={wrapRef} className="w-full" style={{ perspective: '1600px' }}>
      <div
        style={{
          transform: `perspective(1600px) rotateX(${rotateX.toFixed(2)}deg) scale(${scale.toFixed(
            4
          )}) translateY(${translateY.toFixed(1)}px)`,
          transformOrigin: 'center top',
          willChange: 'transform',
        }}
        className="transition-transform duration-75 ease-out rounded-none"
      >
        {children}
      </div>
    </div>
  );
};

/**
 * 2. MUSEMIND-STYLE VELOCITY-REACTIVE KINETIC MARQUEE
 * Accelerates with scroll velocity, reverses direction when scrolling up vs. down,
 * and applies dynamic velocity skew.
 */
export const VelocityScrollMarquee: React.FC = () => {
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let pos1 = 0;
    let pos2 = -50;
    let lastScrollY = window.scrollY;
    let velocity = 0;
    let direction = 1;
    let rafId = 0;

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY;
      lastScrollY = currentY;
      if (Math.abs(delta) > 0.5) {
        direction = delta > 0 ? 1 : -1;
        velocity = Math.min(32, Math.abs(delta) * 0.45);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      velocity *= 0.92;

      const speed = (0.035 + velocity * 0.035) * direction;
      pos1 -= speed;
      pos2 += speed;

      if (pos1 <= -50) pos1 += 50;
      if (pos1 > 0) pos1 -= 50;

      if (pos2 <= -50) pos2 += 50;
      if (pos2 > 0) pos2 -= 50;

      const skew = Math.max(-8, Math.min(8, velocity * direction * 0.35));

      if (track1Ref.current) {
        track1Ref.current.style.transform = `translate3d(${pos1.toFixed(
          3
        )}%, 0, 0) skewX(${-skew.toFixed(2)}deg)`;
      }
      if (track2Ref.current) {
        track2Ref.current.style.transform = `translate3d(${pos2.toFixed(
          3
        )}%, 0, 0) skewX(${skew.toFixed(2)}deg)`;
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const row1Items = [
    'PHOTOREALISTIC 8K CGI',
    'SUB-MILLIMETER CAD MODELING',
    'ARCHITECTURAL VISUALIZATION',
    'REAL-TIME WEBGL & USDZ',
    'UNREAL ENGINE 5 DIGITAL TWINS',
    'V-RAY & OCTANE LOOKDEV',
  ];

  const row2Items = [
    'WATER-TIGHT QUAD TOPOLOGY',
    '60FPS EXPLODED ANIMATIONS',
    'ANISOTROPIC PBR SHADERS',
    'LUXURY HOROLOGY & PRODUCT CGI',
    'NEW YORK · ZURICH · TOKYO',
    'ISO-27001 NDA PROTECTED',
  ];

  return (
    <section
      className="py-10 border-b border-black/15 dark:border-white/10 bg-[#090A0C] text-[#F4F4F0] overflow-hidden select-none"
      aria-label="Studio Capabilities Kinetic Marquee"
    >
      <div className="space-y-4">
        {/* Row 1 */}
        <div className="flex overflow-hidden whitespace-nowrap">
          <div ref={track1Ref} className="flex items-center shrink-0 will-change-transform">
            {[...row1Items, ...row1Items].map((text, idx) => (
              <div key={idx} className="flex items-center">
                <span className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight px-6 text-[#F4F4F0]">
                  {text}
                </span>
                <span className="w-3 h-3 bg-[#FACC15] inline-block shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 (Counter-Scrolling Outline / Accent Style) */}
        <div className="flex overflow-hidden whitespace-nowrap border-t border-white/10 pt-4">
          <div ref={track2Ref} className="flex items-center shrink-0 will-change-transform">
            {[...row2Items, ...row2Items].map((text, idx) => (
              <div key={idx} className="flex items-center">
                <span className="text-xl sm:text-3xl lg:text-4xl font-mono-tabular font-semibold tracking-wider px-6 text-[#FACC15]">
                  {text}
                </span>
                <span className="text-white/30 px-2 font-mono-tabular">///</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * 3. MUSEMIND-STYLE STICKY STACKING 3D CARDS DECK
 * As you scroll down, each full-width showcase card pins at the top while the next card
 * slides smoothly up over it, causing underlying cards to scale down in 3D space (scale 0.92, rotateX).
 */
interface StickyStackingDeckProps {
  onSelectProject: (project: PortfolioItem) => void;
  onNavigatePortfolio: () => void;
}

export const StickyStackingDeck: React.FC<StickyStackingDeckProps> = ({
  onSelectProject,
  onNavigatePortfolio,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let rafId = 0;

    const updateCards = () => {
      cardRefs.current.forEach((card, idx) => {
        if (!card) return;
        const nextCard = cardRefs.current[idx + 1];
        if (!nextCard) {
          card.style.transform = 'perspective(1400px) scale(1) rotateX(0deg) translateZ(0px)';
          card.style.filter = 'brightness(1)';
          return;
        }

        const cardRect = card.getBoundingClientRect();
        const nextRect = nextCard.getBoundingClientRect();
        const overlapStart = window.innerHeight * 0.85;
        const stickyTop = 88 + idx * 18;

        // Calculate how far nextCard has slid up toward this pinned card
        const distance = nextRect.top - stickyTop;
        const maxDistance = overlapStart - stickyTop;
        const overlapRatio = Math.max(0, Math.min(1, 1 - distance / Math.max(1, maxDistance)));

        if (cardRect.top <= stickyTop + 6 && overlapRatio > 0) {
          const scale = 1 - overlapRatio * 0.065;
          const rotateX = -overlapRatio * 4.5;
          const translateY = -overlapRatio * 14;
          const brightness = 1 - overlapRatio * 0.32;

          card.style.transform = `perspective(1400px) translateY(${translateY.toFixed(
            1
          )}px) scale(${scale.toFixed(4)}) rotateX(${rotateX.toFixed(2)}deg)`;
          card.style.filter = `brightness(${brightness.toFixed(2)})`;
        } else {
          card.style.transform = 'perspective(1400px) scale(1) rotateX(0deg) translateZ(0px)';
          card.style.filter = 'brightness(1)';
        }
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateCards);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    updateCards();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-20 lg:py-28 border-b border-black/15 dark:border-white/10"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="text-xs font-mono-tabular text-[#B45309] dark:text-[#FACC15] font-semibold mb-2">
              01 — STICKY 3D CASE STUDY STACK (SCROLL DOWN)
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#090A0C] dark:text-[#F4F4F0] leading-[1.06]">
              Featured 8K Productions.
            </h2>
          </div>
          <button
            type="button"
            onClick={onNavigatePortfolio}
            className="py-3 px-6 bg-[#090A0C] text-[#FACC15] dark:bg-[#FACC15] dark:text-[#090A0C] text-xs font-semibold inline-flex items-center gap-2 self-start cursor-pointer"
          >
            <span>Explore Full Portfolio Archive</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Sticky Stacking Cards Container */}
        <div className="space-y-12 pb-8">
          {PORTFOLIO_ITEMS.map((item, idx) => {
            const topOffset = 88 + idx * 18;
            return (
              <div
                key={item.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                style={{
                  position: 'sticky',
                  top: `${topOffset}px`,
                  zIndex: 10 + idx,
                  transformOrigin: 'center top',
                  willChange: 'transform, filter',
                }}
                className="transition-transform duration-75 ease-out"
              >
                <div
                  onClick={() => onSelectProject(item)}
                  className="border-2 border-black/20 dark:border-white/15 bg-white dark:bg-[#121418] grid grid-cols-1 lg:grid-cols-12 overflow-hidden cursor-pointer group shadow-2xl"
                >
                  {/* Left: Project Technical Narrative */}
                  <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-black/15 dark:border-white/10 bg-white dark:bg-[#121418]">
                    <div className="space-y-5">
                      <div className="flex items-center justify-between text-xs font-mono-tabular">
                        <span className="px-2.5 py-1 bg-[#090A0C] text-[#FACC15] dark:bg-[#FACC15] dark:text-[#090A0C] font-bold">
                          PROJECT 0{idx + 1} / 0{PORTFOLIO_ITEMS.length}
                        </span>
                        <span className="text-[#475569] dark:text-[#94A3B8]">
                          {item.categoryLabel}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#090A0C] dark:text-[#F4F4F0] group-hover:text-[#B45309] dark:group-hover:text-[#FACC15] transition-colors leading-tight">
                        {item.title}
                      </h3>

                      <p className="text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                        {item.description}
                      </p>

                      {/* Technical Specs Matrix */}
                      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-black/10 dark:border-white/10 text-xs font-mono-tabular">
                        <div>
                          <div className="text-[#475569] dark:text-[#94A3B8] text-[10px]">
                            GEOMETRY
                          </div>
                          <div className="text-[#090A0C] dark:text-[#F4F4F0] font-semibold">
                            {item.polyCount}
                          </div>
                        </div>
                        <div>
                          <div className="text-[#475569] dark:text-[#94A3B8] text-[10px]">
                            ENGINE
                          </div>
                          <div className="text-[#090A0C] dark:text-[#F4F4F0] font-semibold">
                            {item.renderEngine}
                          </div>
                        </div>
                        <div>
                          <div className="text-[#475569] dark:text-[#94A3B8] text-[10px]">
                            MASTER OUTPUT
                          </div>
                          <div className="text-[#090A0C] dark:text-[#F4F4F0] font-semibold">
                            {item.resolution}
                          </div>
                        </div>
                        <div>
                          <div className="text-[#475569] dark:text-[#94A3B8] text-[10px]">
                            CLIENT
                          </div>
                          <div className="text-[#090A0C] dark:text-[#F4F4F0] font-semibold truncate">
                            {item.client}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-black/15 dark:border-white/10 flex items-center justify-between gap-4">
                      <div className="text-xs">
                        <span className="text-[#B45309] dark:text-[#FACC15] font-semibold block">
                          Verified Commercial Impact:
                        </span>
                        <span className="text-[#090A0C] dark:text-[#F4F4F0] font-medium">
                          {item.impactMetric}
                        </span>
                      </div>
                      <span className="p-3 bg-[#090A0C] text-[#FACC15] dark:bg-[#FACC15] dark:text-[#090A0C] shrink-0 group-hover:translate-x-1 transition-transform">
                        <Eye className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  {/* Right: High-Res 8K Visual Viewport with Zoom Parallax */}
                  <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[420px] bg-[#090A0C] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
                    <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs font-mono-tabular text-white">
                      <span className="px-2.5 py-1 bg-black/80 border border-white/20">
                        {item.resolution}
                      </span>
                      <span className="px-3 py-1 bg-[#FACC15] text-[#090A0C] font-bold inline-flex items-center gap-1.5">
                        <span>Click to Inspect 8K Lightbox</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/**
 * 4. MUSEMIND-STYLE PINNED HORIZONTAL 3D SCROLL GALLERY
 * Scrolling vertically through this pinned section glides a horizontal 3D track of all 10
 * interactive 3D models & services with 3D perspective skew based on scroll velocity.
 */
interface PinnedHorizontal3DStripProps {
  onSelectModelInStudio: (presetId: ModelPresetId) => void;
}

export const PinnedHorizontal3DStrip: React.FC<PinnedHorizontal3DStripProps> = ({
  onSelectModelInStudio,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollRatio, setScrollRatio] = useState(0);
  const [velocitySkew, setVelocitySkew] = useState(0);

  useEffect(() => {
    let lastY = window.scrollY;
    let rafId = 0;

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const totalScroll = Math.max(1, rect.height - vh);
      const current = -rect.top;
      const clamped = Math.max(0, Math.min(1, current / totalScroll));

      const delta = window.scrollY - lastY;
      lastY = window.scrollY;
      const skew = Math.max(-5, Math.min(5, delta * 0.12));

      setScrollRatio(clamped);
      setVelocitySkew(skew);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    handleScroll();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Translate from 0% to -66% horizontally as vertical scroll goes 0 -> 1
  const translateXPercent = -(scrollRatio * 66);

  return (
    <section
      ref={sectionRef}
      className="relative h-[260vh] border-b border-black/15 dark:border-white/10 bg-[#090A0C] text-[#F4F4F0]"
    >
      <div className="sticky top-16 h-[calc(100vh-4rem)] flex flex-col justify-between py-10 overflow-hidden">
        {/* Top Header + Horizontal Scroll Progress Bar */}
        <div className="max-w-[1280px] w-full mx-auto px-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono-tabular text-[#FACC15] font-semibold mb-1.5 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" />
              <span>02 — HORIZONTAL 3D ASSET REEL (SCROLL DOWN TO GLIDE)</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-white">
              10 Interactive WebGL 3D Assemblies Ready to Inspect.
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-mono-tabular text-[#94A3B8]">
              REEL PROGRESS: {Math.round(scrollRatio * 100)}%
            </span>
            <div className="w-32 h-1.5 bg-white/15 overflow-hidden">
              <div
                className="h-full bg-[#FACC15] transition-all duration-75"
                style={{ width: `${Math.max(5, scrollRatio * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Horizontal Moving 3D Cards Strip */}
        <div className="w-full overflow-hidden my-auto py-4">
          <div
            style={{
              transform: `translate3d(${translateXPercent.toFixed(
                3
              )}%, 0, 0) perspective(1200px) rotateY(${(velocitySkew * 0.7).toFixed(2)}deg)`,
              willChange: 'transform',
            }}
            className="flex items-stretch gap-6 px-6 sm:px-12 w-[285%] sm:w-[240%] lg:w-[210%] transition-transform duration-75 ease-out"
          >
            {MODEL_PRESETS.map((model, idx) => {
              const previewImg =
                PORTFOLIO_ITEMS[idx % PORTFOLIO_ITEMS.length]?.image || SERVICES[0].image;
              return (
                <div
                  key={model.id}
                  onClick={() => onSelectModelInStudio(model.id)}
                  className="w-[310px] sm:w-[360px] shrink-0 border border-white/15 bg-[#12151C] hover:border-[#FACC15] transition-colors flex flex-col justify-between cursor-pointer group"
                >
                  {/* Top Visual Header */}
                  <div className="relative h-44 bg-[#08090C] overflow-hidden border-b border-white/10">
                    <img
                      src={previewImg}
                      alt={model.name}
                      referrerPolicy="no-referrer"
                      style={{
                        transform: `scale(1.12) translateX(${(
                          (scrollRatio - 0.5) *
                          28
                        ).toFixed(1)}px)`,
                      }}
                      className="w-full h-full object-cover opacity-55 group-hover:opacity-85 transition-opacity duration-200"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12151C] via-black/30 to-transparent" />
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono-tabular">
                      <span className="px-2 py-0.5 bg-[#FACC15] text-[#090A0C] font-bold">
                        3D MODEL #{String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="px-2 py-0.5 bg-black/80 text-white border border-white/15">
                        {model.polygons}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="text-[11px] font-mono-tabular text-[#FACC15]">
                        {model.category}
                      </div>
                      <h3 className="text-lg font-display font-bold text-white leading-snug">
                        {model.name}
                      </h3>
                    </div>
                  </div>

                  {/* Specs & Action */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <p className="text-xs text-[#94A3B8] leading-relaxed">{model.description}</p>

                    <div className="pt-3 border-t border-white/10 space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-mono-tabular text-[#CBD5E1]">
                        <span>FORMATS:</span>
                        <span>{model.formats}</span>
                      </div>
                      <div className="w-full py-2.5 px-3 bg-white/5 group-hover:bg-[#FACC15] text-white group-hover:text-[#090A0C] text-xs font-semibold flex items-center justify-between transition-colors">
                        <span className="inline-flex items-center gap-1.5">
                          <Box className="w-3.5 h-3.5" />
                          <span>Launch Live 3D Model</span>
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Caption */}
        <div className="max-w-[1280px] w-full mx-auto px-6 flex items-center justify-between text-xs font-mono-tabular text-[#94A3B8]">
          <span>CLICK ANY CARD TO OPEN LIVE WEBGL 3D VIEWPORT</span>
          <span>ZERO BORDER-RADIUS · ACEScg COLOR PIPELINE</span>
        </div>
      </div>
    </section>
  );
};
