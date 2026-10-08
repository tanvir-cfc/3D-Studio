import React, { useState, useRef, useCallback } from 'react';
import { MoveHorizontal, Layers, Maximize2 } from 'lucide-react';

export type RenderPassMode = 'wireframe' | 'clay' | 'shader' | 'final';

interface RenderInspectorProps {
  image: string;
  title: string;
  subtitle: string;
  polyCount: string;
  resolution: string;
  engine: string;
  onOpenLightbox?: () => void;
}

export const RenderInspector: React.FC<RenderInspectorProps> = ({
  image,
  title,
  subtitle,
  polyCount,
  resolution,
  engine,
  onOpenLightbox,
}) => {
  const [sliderPos, setSliderPos] = useState<number>(58);
  const [leftPass, setLeftPass] = useState<'wireframe' | 'clay'>('wireframe');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [imgError, setImgError] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateSliderFromClientX = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = Math.round((x / rect.width) * 100);
    setSliderPos(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updateSliderFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateSliderFromClientX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPos((prev) => Math.max(5, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPos((prev) => Math.min(95, prev + 5));
    }
  };

  return (
    <div className="relative rounded-none border border-black/15 dark:border-white/10 bg-white dark:bg-[#121418] overflow-hidden select-none">
      {/* Top Viewport Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-black/10 dark:border-white/10 bg-[#EFEFE9] dark:bg-[#0D0F12]">
        <div className="flex items-center gap-2 text-xs text-[#475569] dark:text-[#94A3B8]">
          <span className="font-semibold text-[#090A0C] dark:text-[#F4F4F0]">{title}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono-tabular">{polyCount}</span>
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          <span className="hidden sm:inline font-mono-tabular">{resolution}</span>
        </div>

        {/* Interactive Pass Selector (Functional Segmented Control, Zero Radius) */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5 p-0.5 bg-[#E2E2DC] dark:bg-[#181B22] rounded-none border border-black/10 dark:border-white/5">
            <button
              type="button"
              onClick={() => setLeftPass('wireframe')}
              className={`px-3 py-1.5 text-xs font-medium rounded-none transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                leftPass === 'wireframe'
                  ? 'bg-[#090A0C] text-[#F6F6F2] dark:bg-[#F59E0B] dark:text-[#090A0C] font-semibold'
                  : 'text-[#475569] dark:text-[#94A3B8] hover:text-[#090A0C] dark:hover:text-[#F4F4F0]'
              }`}
            >
              Wireframe Mesh
            </button>
            <button
              type="button"
              onClick={() => setLeftPass('clay')}
              className={`px-3 py-1.5 text-xs font-medium rounded-none transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                leftPass === 'clay'
                  ? 'bg-[#090A0C] text-[#F6F6F2] dark:bg-[#F59E0B] dark:text-[#090A0C] font-semibold'
                  : 'text-[#475569] dark:text-[#94A3B8] hover:text-[#090A0C] dark:hover:text-[#F4F4F0]'
              }`}
            >
              Clay Ambient Occlusion
            </button>
          </div>

          {onOpenLightbox && (
            <button
              type="button"
              onClick={onOpenLightbox}
              title="Inspect Fullscreen 8K Render"
              className="p-2 text-[#475569] dark:text-[#94A3B8] hover:text-[#090A0C] dark:hover:text-[#F4F4F0] bg-white dark:bg-[#181B22] hover:bg-black/5 dark:hover:bg-white/10 rounded-none border border-black/15 dark:border-white/10 transition-colors cursor-pointer"
              aria-label="Open fullscreen render viewer"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Interactive Split-Screen Viewport */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="slider"
        aria-label="Compare 3D geometry pass with final photorealistic ray-traced render"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={sliderPos}
        className="relative aspect-16/9 w-full overflow-hidden cursor-ew-resize focus-visible:outline-2 focus-visible:outline-[#F59E0B]"
      >
        {imgError ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#EFEFE9] dark:bg-[#121418] p-8 text-center">
            <Layers className="w-10 h-10 text-[#F59E0B] mb-3" />
            <p className="text-base font-semibold text-[#090A0C] dark:text-[#F4F4F0]">{title}</p>
            <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-1">{subtitle}</p>
          </div>
        ) : (
          <>
            {/* Base Layer: Final Photorealistic 8K Render (Right Side) */}
            <img
              src={image}
              alt={`${title} - Final Photorealistic Render`}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />

            {/* Clipped Layer: Wireframe or Clay Pass Simulation (Left Side) */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <img
                src={image}
                alt={`${title} - ${leftPass === 'wireframe' ? 'Wireframe Topology' : 'Clay Shading'} Pass`}
                referrerPolicy="no-referrer"
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-150 ${
                  leftPass === 'wireframe'
                    ? 'grayscale contrast-150 brightness-50 invert-[0.12]'
                    : 'grayscale contrast-125 brightness-95 sepia-[0.08]'
                }`}
              />

              {/* Procedural Subdivision Wireframe / Topology Grid Overlay */}
              {leftPass === 'wireframe' ? (
                <div
                  className="absolute inset-0 opacity-75"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, rgba(245, 158, 11, 0.24) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(245, 158, 11, 0.24) 1px, transparent 1px),
                      linear-gradient(45deg, rgba(245, 158, 11, 0.12) 25%, transparent 25%, transparent 75%, rgba(245, 158, 11, 0.12) 75%)
                    `,
                    backgroundSize: '28px 28px, 28px 28px, 56px 56px',
                  }}
                />
              ) : (
                <div className="absolute inset-0 bg-[#1E222B]/35 mix-blend-multiply" />
              )}

              {/* Left Pass Label */}
              <div className="absolute top-4 left-4 text-xs font-mono-tabular text-[#F4F4F0] bg-[#090A0C]/85 backdrop-blur-sm px-3 py-1.5 rounded-none border border-white/15">
                {leftPass === 'wireframe'
                  ? 'Pass 01 · Subdivision Quad Wireframe'
                  : 'Pass 02 · Clay Ambient Occlusion'}
              </div>
            </div>

            {/* Right Pass Label */}
            <div className="absolute top-4 right-4 text-xs font-mono-tabular text-[#F4F4F0] bg-[#090A0C]/85 backdrop-blur-sm px-3 py-1.5 rounded-none border border-white/15 pointer-events-none">
              Pass 04 · Final Ray-Traced Master ({engine})
            </div>

            {/* Bottom Scrim & Quick Preset Buttons */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-4 flex flex-wrap items-end justify-between gap-4 pointer-events-none">
              <div className="text-xs text-[#E2E8F0]">
                <span className="font-medium text-white">{subtitle}</span>
                <span className="mx-2 text-white/40">·</span>
                <span className="text-[#CBD5E1]">Drag divider to inspect geometry vs. final shaders</span>
              </div>

              <div className="flex items-center gap-1.5 pointer-events-auto">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSliderPos(85);
                  }}
                  className="px-2.5 py-1 text-xs font-mono-tabular bg-[#090A0C]/85 hover:bg-[#090A0C] text-[#F4F4F0] rounded-none border border-white/20 transition-colors whitespace-nowrap cursor-pointer"
                >
                  85% Mesh
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSliderPos(50);
                  }}
                  className="px-2.5 py-1 text-xs font-mono-tabular bg-[#090A0C]/85 hover:bg-[#090A0C] text-[#F4F4F0] rounded-none border border-white/20 transition-colors whitespace-nowrap cursor-pointer"
                >
                  50/50 Split
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSliderPos(12);
                  }}
                  className="px-2.5 py-1 text-xs font-mono-tabular bg-[#090A0C]/85 hover:bg-[#090A0C] text-[#F4F4F0] rounded-none border border-white/20 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Final Render
                </button>
              </div>
            </div>

            {/* Vertical Divider Handle (Sharp Square Geometry, Zero Radius) */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-[#F59E0B] pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-none bg-[#F59E0B] text-[#090A0C] shadow-lg flex items-center justify-center border-2 border-[#090A0C] transition-transform duration-150">
                <MoveHorizontal className="w-5 h-5" />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
