import React, { useState, useMemo } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export interface QuoteConfiguration {
  projectType: 'product' | 'architectural' | 'animation' | 'ar-vr';
  projectTypeLabel: string;
  complexity: 'standard' | 'bespoke' | 'engineering';
  complexityLabel: string;
  resolution: '4k' | '8k' | 'realtime';
  resolutionLabel: string;
  quantity: number;
  estimatedTotal: number;
  estimatedDays: string;
}

interface QuoteCalculatorProps {
  onApplyQuoteToBrief: (config: QuoteConfiguration) => void;
}

const PROJECT_TYPES = [
  {
    id: 'product' as const,
    label: '3D Product Modeling & Studio CGI',
    basePrice: 650,
    baseDays: 4,
    unitLabel: 'SKUs / Views',
    desc: 'Consumer electronics, luxury watches, jewelry, furniture, and packaging.',
  },
  {
    id: 'architectural' as const,
    label: 'Architectural & Interior Visualization',
    basePrice: 1450,
    baseDays: 6,
    unitLabel: 'Camera Angles',
    desc: 'Exterior pavilions, residential penthouses, commercial towers, and lighting studies.',
  },
  {
    id: 'animation' as const,
    label: '3D Animation & Exploded Walkthroughs',
    basePrice: 3200,
    baseDays: 10,
    unitLabel: '15-Sec Sequences',
    desc: '60fps product reveal films, mechanical cutaway animations, and aerial fly-throughs.',
  },
  {
    id: 'ar-vr' as const,
    label: 'AR/VR & WebGL Spatial Assets',
    basePrice: 1100,
    baseDays: 5,
    unitLabel: 'Interactive Models',
    desc: 'Draco-compressed glTF, Apple Vision Pro USDZ, and real-time configurator models.',
  },
];

const COMPLEXITY_TIERS = [
  {
    id: 'standard' as const,
    label: 'Standard Geometry',
    multiplier: 1.0,
    dayOffset: 0,
    detail: 'Clean hard-surface objects or existing CAD/STEP files provided',
  },
  {
    id: 'bespoke' as const,
    label: 'High-Detail Organic & Custom Shaders',
    multiplier: 1.45,
    dayOffset: 2,
    detail: 'Intricate fabrics, displaced concrete, foliage, or scratch-built from 2D sketches',
  },
  {
    id: 'engineering' as const,
    label: 'Sub-Millimeter Internal Cutaway',
    multiplier: 1.85,
    dayOffset: 4,
    detail: 'Exposed mechanical assemblies, watch movements, or multi-state animations',
  },
];

const RESOLUTION_OPTIONS = [
  {
    id: '4k' as const,
    label: '4K Digital & Web Master',
    multiplier: 1.0,
    spec: '3840 × 2160 px · 16-bit PNG/TIFF + Optimized FBX/OBJ',
  },
  {
    id: '8k' as const,
    label: '8K Print & 32-Bit EXR Suite',
    multiplier: 1.25,
    spec: '7680 × 4320 px · Multi-Pass Cryptomatte EXR + Source Scene',
  },
  {
    id: 'realtime' as const,
    label: '8K Stills + WebXR / USDZ Twin',
    multiplier: 1.4,
    spec: 'Full Print Suite + Interactive glTF 2.0 & iOS AR QuickLook Package',
  },
];

export const QuoteCalculator: React.FC<QuoteCalculatorProps> = ({ onApplyQuoteToBrief }) => {
  const [projectType, setProjectType] = useState<'product' | 'architectural' | 'animation' | 'ar-vr'>('architectural');
  const [complexity, setComplexity] = useState<'standard' | 'bespoke' | 'engineering'>('bespoke');
  const [resolution, setResolution] = useState<'4k' | '8k' | 'realtime'>('8k');
  const [quantity, setQuantity] = useState<number>(3);

  const calculation = useMemo(() => {
    const selectedType = PROJECT_TYPES.find((p) => p.id === projectType) || PROJECT_TYPES[0];
    const selectedComp = COMPLEXITY_TIERS.find((c) => c.id === complexity) || COMPLEXITY_TIERS[0];
    const selectedRes = RESOLUTION_OPTIONS.find((r) => r.id === resolution) || RESOLUTION_OPTIONS[0];

    const volumeDiscount = quantity >= 6 ? 0.85 : quantity >= 3 ? 0.92 : 1.0;

    const rawTotal =
      selectedType.basePrice *
      selectedComp.multiplier *
      selectedRes.multiplier *
      quantity *
      volumeDiscount;

    const estimatedTotal = Math.round(rawTotal / 50) * 50;
    const minDays = selectedType.baseDays + selectedComp.dayOffset + Math.floor(quantity * 0.8);
    const maxDays = minDays + 3;

    return {
      selectedType,
      selectedComp,
      selectedRes,
      volumeDiscountPercent: Math.round((1 - volumeDiscount) * 100),
      estimatedTotal,
      estimatedDays: `${minDays}–${maxDays} Business Days`,
    };
  }, [projectType, complexity, resolution, quantity]);

  const handleTransferToForm = () => {
    onApplyQuoteToBrief({
      projectType,
      projectTypeLabel: calculation.selectedType.label,
      complexity,
      complexityLabel: calculation.selectedComp.label,
      resolution,
      resolutionLabel: calculation.selectedRes.label,
      quantity,
      estimatedTotal: calculation.estimatedTotal,
      estimatedDays: calculation.estimatedDays,
    });
  };

  return (
    <div className="rounded-none border border-black/15 dark:border-white/10 bg-white dark:bg-[#121418] p-6 lg:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left 7 Columns: Interactive Parameters */}
        <div className="lg:col-span-7 space-y-8">
          {/* Step 1: Discipline */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-[#090A0C] dark:text-[#F4F4F0]">
                1. Select Visualization Discipline
              </label>
              <span className="text-xs text-[#475569] dark:text-[#94A3B8]">Fixed-scope studio pricing</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PROJECT_TYPES.map((item) => {
                const active = projectType === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setProjectType(item.id)}
                    className={`text-left p-4 rounded-none border transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#F6F6F2] dark:bg-[#181B22] border-[#090A0C] dark:border-[#F59E0B] border-2 text-[#090A0C] dark:text-[#F4F4F0]'
                        : 'bg-white dark:bg-[#0D0F12] border-black/15 dark:border-white/10 text-[#475569] dark:text-[#94A3B8] hover:border-black/40 dark:hover:border-white/25 hover:text-[#090A0C] dark:hover:text-[#F4F4F0]'
                    }`}
                  >
                    <div className="text-sm font-semibold text-[#090A0C] dark:text-[#F4F4F0] mb-1">
                      {item.label}
                    </div>
                    <p className="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                      {item.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Geometric & Shader Complexity */}
          <div>
            <label className="block text-sm font-semibold text-[#090A0C] dark:text-[#F4F4F0] mb-3">
              2. Geometric & LookDev Complexity
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {COMPLEXITY_TIERS.map((tier) => {
                const active = complexity === tier.id;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setComplexity(tier.id)}
                    className={`text-left p-3.5 rounded-none border transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#F6F6F2] dark:bg-[#181B22] border-[#090A0C] dark:border-[#F59E0B] border-2 text-[#090A0C] dark:text-[#F4F4F0]'
                        : 'bg-white dark:bg-[#0D0F12] border-black/15 dark:border-white/10 text-[#475569] dark:text-[#94A3B8] hover:border-black/40 dark:hover:border-white/25 hover:text-[#090A0C] dark:hover:text-[#F4F4F0]'
                    }`}
                  >
                    <div className="text-xs font-semibold text-[#090A0C] dark:text-[#F4F4F0] mb-1">
                      {tier.label}
                    </div>
                    <p className="text-xs text-[#475569] dark:text-[#94A3B8] leading-snug">
                      {tier.detail}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Deliverable Spec & Quantity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div>
              <label className="block text-sm font-semibold text-[#090A0C] dark:text-[#F4F4F0] mb-3">
                3. Output Pipeline Specification
              </label>
              <div className="space-y-2">
                {RESOLUTION_OPTIONS.map((res) => {
                  const active = resolution === res.id;
                  return (
                    <button
                      key={res.id}
                      type="button"
                      onClick={() => setResolution(res.id)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-none border transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#F6F6F2] dark:bg-[#181B22] border-[#090A0C] dark:border-[#F59E0B] border-2 text-[#090A0C] dark:text-[#F4F4F0]'
                          : 'bg-white dark:bg-[#0D0F12] border-black/15 dark:border-white/10 text-[#475569] dark:text-[#94A3B8] hover:border-black/40 dark:hover:border-white/25'
                      }`}
                    >
                      <div className="text-xs font-semibold text-[#090A0C] dark:text-[#F4F4F0]">
                        {res.label}
                      </div>
                      <div className="text-[11px] text-[#475569] dark:text-[#94A3B8] truncate">
                        {res.spec}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label
                  htmlFor="quantity-slider"
                  className="text-sm font-semibold text-[#090A0C] dark:text-[#F4F4F0]"
                >
                  4. Volume ({calculation.selectedType.unitLabel})
                </label>
                <span className="text-sm font-mono-tabular font-semibold text-[#B45309] dark:text-[#F59E0B]">
                  {quantity} {calculation.selectedType.unitLabel}
                </span>
              </div>

              <div className="p-4 rounded-none bg-[#F6F6F2] dark:bg-[#0D0F12] border border-black/15 dark:border-white/10 space-y-4">
                <input
                  id="quantity-slider"
                  type="range"
                  min={1}
                  max={12}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full accent-[#090A0C] dark:accent-[#F59E0B] cursor-pointer"
                />
                <div className="flex justify-between text-xs font-mono-tabular text-[#475569] dark:text-[#94A3B8]">
                  <span>1</span>
                  <span>4</span>
                  <span>8</span>
                  <span>12</span>
                </div>
                <p className="text-xs text-[#475569] dark:text-[#94A3B8] pt-1 border-t border-black/10 dark:border-white/5">
                  {calculation.volumeDiscountPercent > 0
                    ? `Includes ${calculation.volumeDiscountPercent}% multi-angle studio batch discount.`
                    : 'Add 3+ angles or SKUs to activate studio batch pricing.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Live Specification & Instant Estimate Summary */}
        <div className="lg:col-span-5 rounded-none bg-[#F6F6F2] dark:bg-[#090A0C] border border-black/15 dark:border-white/10 p-6 lg:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-black/15 dark:border-white/10 pb-4">
            <div>
              <span className="text-xs text-[#475569] dark:text-[#94A3B8] block">
                Estimated Production Investment
              </span>
              <div className="text-3xl lg:text-4xl font-display font-bold text-[#090A0C] dark:text-[#F4F4F0] font-mono-tabular mt-1">
                ${calculation.estimatedTotal.toLocaleString()}
                <span className="text-sm font-normal text-[#475569] dark:text-[#94A3B8] ml-1.5">
                  USD
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-[#475569] dark:text-[#94A3B8] block">Turnaround</span>
              <span className="text-sm font-mono-tabular font-semibold text-[#B45309] dark:text-[#F59E0B]">
                {calculation.estimatedDays}
              </span>
            </div>
          </div>

          {/* Unboxed Clean Specification Breakdown */}
          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-black/10 dark:border-white/5">
              <span className="text-[#475569] dark:text-[#94A3B8]">Discipline</span>
              <span className="text-[#090A0C] dark:text-[#F4F4F0] font-medium text-right">
                {calculation.selectedType.label}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-black/10 dark:border-white/5">
              <span className="text-[#475569] dark:text-[#94A3B8]">Geometry Tier</span>
              <span className="text-[#090A0C] dark:text-[#F4F4F0] font-medium text-right">
                {calculation.selectedComp.label}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-black/10 dark:border-white/5">
              <span className="text-[#475569] dark:text-[#94A3B8]">Master Deliverables</span>
              <span className="text-[#090A0C] dark:text-[#F4F4F0] font-medium text-right">
                {calculation.selectedRes.label}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-black/10 dark:border-white/5">
              <span className="text-[#475569] dark:text-[#94A3B8]">Scope Volume</span>
              <span className="text-[#090A0C] dark:text-[#F4F4F0] font-mono-tabular font-medium">
                {quantity} {calculation.selectedType.unitLabel}
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs text-[#475569] dark:text-[#94A3B8] pt-1">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#D97706] dark:text-[#F59E0B] shrink-0" />
              <span>Includes 2 structured revision rounds (Clay + LookDev)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#D97706] dark:text-[#F59E0B] shrink-0" />
              <span>Full commercial IP transfer & mutual NDA protection</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#D97706] dark:text-[#F59E0B] shrink-0" />
              <span>Dedicated Senior 3D Lead & direct Slack/Frame.io review</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleTransferToForm}
            className="w-full py-3.5 px-5 bg-[#090A0C] hover:bg-[#1E293B] text-[#F6F6F2] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] dark:text-[#090A0C] font-semibold text-sm rounded-none transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <span>Lock Scope & Attach to Project Brief</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
