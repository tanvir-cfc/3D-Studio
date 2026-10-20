import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Plus,
  Minus,
  CheckCircle2,
  Eye,
  Star,
  Sparkles,
  Send,
  Copy,
  Check,
  Compass,
  Cpu,
  TrendingUp,
  X,
  ExternalLink,
  Layers,
  Activity,
  Box,
  Share2,
} from 'lucide-react';
import {
  MUSEMIND_SERVICES,
  MUSEMIND_FAQS,
  MusemindCaseStudy,
} from '../data/musemindData';
import { ScrollExpand3DContainer } from './MusemindScrollEffects';
import { Scroll3DSection } from './Scroll3DReveal';
import { WeAre3DEffect } from './WeAre3DEffect';
import { BrandLogosMarquee } from './BrandLogosMarquee';
import { HeroGlassVideo } from './HeroGlassVideo';
import { getFullShareableUrl } from '../utils/routes';

interface HomeTwoMusemindProps {
  onNavigatePage: (page: string) => void;
  onSelectService?: (serviceId: string) => void;
  onSelectProject?: (project: any) => void;
  onSelectModel?: (presetId: any) => void;
}

export const HomeTwoMusemind: React.FC<HomeTwoMusemindProps> = ({
  onNavigatePage,
  onSelectService,
}) => {
  const [activeFaq, setActiveFaq] = useState<string>('faq-1');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [boonActiveTab, setBoonActiveTab] = useState<'exploded' | 'wireframe' | 'turntable'>('exploded');
  const [copiedServiceId, setCopiedServiceId] = useState<string | null>(null);

  const handleCopyServiceLink = (e: React.MouseEvent, serviceId: string) => {
    e.stopPropagation();
    const url = getFullShareableUrl('service-detail', serviceId);
    navigator.clipboard.writeText(url);
    setCopiedServiceId(serviceId);
    setTimeout(() => {
      setCopiedServiceId(null);
    }, 2500);
  };

  // 3D Commission inquiry form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formService, setFormService] = useState('Hard-Surface & Industrial CAD Modeling');
  const [formBudget, setFormBudget] = useState('$7,500 – $15,000 (Multi-Angle Product Suite + Turntable Animation)');
  const [formMessage, setFormMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('studio@3dmodelingcompany.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formMessage.trim()) {
      setFormError('Please fill in your name, work email, and 3D project requirements.');
      return;
    }
    setFormError('');
    setFormSubmitted(true);
  };

  return (
    <div className="bg-[#FFFFFF] text-[#0A0A0E] selection:bg-[#D4FF00] selection:text-[#0A0A0E] transition-colors duration-150">
      {/* =====================================================================
          1. TOP HERO SECTION:
          Left: Monumental 3D Studio Headline & Direct CTAs
          Right: Frosted Glass Effect 3D Showreel Video Player (HeroGlassVideo)
      ====================================================================== */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-[#E5E7EB] bg-white overflow-hidden">
        {/* Subtle ambient light glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[380px] bg-[#D4FF00]/12 blur-[140px] pointer-events-none rounded-none" />

        <div className="max-w-[1320px] mx-auto px-6 relative z-10 space-y-8 lg:space-y-10">
          {/* Top Status & Accreditation Badge */}
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F4F5F7] border border-[#E5E7EB] text-xs font-mono-tabular">
              <span className="w-2 h-2 bg-[#10B981] animate-pulse inline-block" />
              <span className="text-[#0A0A0E] font-bold">3D MODELING & CGI STUDIO</span>
              <span className="text-[#D1D5DB]">/</span>
              <span className="text-[#52525B]">GLOBAL PIPELINE</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono-tabular text-[#6B7280]">
              <span className="text-[#0A0A0E] font-bold">4.9/5 RATED</span>
              <span>· TOP 1% STUDIO</span>
            </div>
          </div>

          {/* Hero Grid: Left Content + Right Floating Glass Effect Video */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Hero Content (Reduced Text, High Punch) */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-extrabold tracking-tight text-[#0A0A0E] leading-[0.98]">
                Concepts into <span className="bg-[#D4FF00] px-2.5 py-0.5 inline-block text-[#0A0A0E]">Hyper-Real 3D.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#52525B] leading-relaxed max-w-xl">
                Production-ready 3D modeling, photorealistic CGI renders, and real-time WebGL assets for visionary brands.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => onNavigatePage('contact')}
                  className="py-3.5 px-6 bg-[#0A0A0E] hover:bg-[#27272A] text-white font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-colors cursor-pointer shadow-md hover:shadow-lg"
                >
                  <span>Start a 3D Project</span>
                  <ArrowRight className="w-4 h-4 text-[#D4FF00]" />
                </button>
                <a
                  href="#boon-section"
                  className="py-3.5 px-5 bg-white hover:bg-[#F4F5F7] text-[#0A0A0E] border border-[#E5E7EB] font-bold text-xs inline-flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <Eye className="w-4 h-4 text-[#0A0A0E]" />
                  <span>View Selected Work</span>
                </a>
              </div>
            </div>

            {/* Right Side: Frosted Glass Effect Video Player (HeroGlassVideo) */}
            <div className="lg:col-span-5 relative">
              <HeroGlassVideo />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. "Trusted By 350+ Global Brands" WITH HORIZONTAL SCROLLING LOGOS
      ====================================================================== */}
      <section className="py-14 sm:py-16 border-b border-[#E5E7EB] bg-[#F9FAFB] overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-5">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[#D4FF00] border border-black/30" />
              <h2 className="text-sm sm:text-base font-mono-tabular font-extrabold tracking-wider uppercase text-[#0A0A0E]">
                Trusted By 350+ Global Brands & Entertainment Studios
              </h2>
            </div>
            <span className="text-xs font-mono-tabular text-[#6B7280]">
              GAMING · AUTOMOTIVE · CONSUMER TECH · INDUSTRIAL HARDWARE · AEROSPACE
            </span>
          </div>

          {/* Continuous Smooth Horizontal Scrolling Logos Marquee */}
          <BrandLogosMarquee />
        </div>
      </section>

      {/* =====================================================================
          3. "One Partner. From Strategy to Scale"
          & Dashboard Image with 3D Perspective Scroll-Expand Effect
      ====================================================================== */}
      <section className="py-24 lg:py-32 border-b border-[#E5E7EB] bg-white">
        <div className="max-w-[1320px] mx-auto px-6 space-y-16">
          <div className="text-center max-w-4xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-mono-tabular px-3 py-1 bg-[#F4F5F7] border border-[#E5E7EB] text-[#0A0A0E] font-bold tracking-wider">
              <Compass className="w-3.5 h-3.5 text-[#0A0A0E]" />
              <span>END-TO-END 3D PIPELINE PARTNERSHIP</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#0A0A0E] leading-tight">
              One 3D Studio. From Concept Sculpt to Real-Time Scale.
            </h2>

            <p className="text-base sm:text-lg text-[#52525B] leading-relaxed max-w-2xl mx-auto">
              We bring digital sculpting, precision CAD hard-surface modeling, PBR look-development, and real-time optimization together to engineer production-ready 3D assets for games, commercials, e-commerce, and the industrial metaverse.
            </p>
          </div>

          {/* 4 Foundation Pillars under Strategy to Scale */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#F9FAFB] border border-[#E5E7EB] space-y-3 hover:border-[#0A0A0E] transition-colors shadow-2xs">
              <div className="text-xs font-mono-tabular text-[#0A0A0E] font-bold">01 / CONCEPT & SCULPT</div>
              <h3 className="text-lg font-display font-bold text-[#0A0A0E]">Anatomy & Hard-Surface</h3>
              <p className="text-xs text-[#52525B] leading-relaxed">
                ZBrush digital sculpting, industrial CAD conversion, concept art translation, and sub-d topology blueprinting.
              </p>
            </div>

            <div className="p-6 bg-[#F9FAFB] border border-[#E5E7EB] space-y-3 hover:border-[#0A0A0E] transition-colors shadow-2xs">
              <div className="text-xs font-mono-tabular text-[#0A0A0E] font-bold">02 / TEXTURING & LOOKDEV</div>
              <h3 className="text-lg font-display font-bold text-[#0A0A0E]">Physically-Based Rendering</h3>
              <p className="text-xs text-[#52525B] leading-relaxed">
                8K photorealistic material generation, ray-traced subsurface scattering, and custom procedural shaders in Substance 3D.
              </p>
            </div>

            <div className="p-6 bg-[#F9FAFB] border border-[#E5E7EB] space-y-3 hover:border-[#0A0A0E] transition-colors shadow-2xs">
              <div className="text-xs font-mono-tabular text-[#0A0A0E] font-bold">03 / RIGGING & ANIMATION</div>
              <h3 className="text-lg font-display font-bold text-[#0A0A0E]">Kinematic Dynamics</h3>
              <p className="text-xs text-[#52525B] leading-relaxed">
                Production-ready skeleton rigs, micro-mechanical joint constraints, photoreal product exploded views, and turntable motion.
              </p>
            </div>

            <div className="p-6 bg-[#F9FAFB] border border-[#E5E7EB] space-y-3 hover:border-[#0A0A0E] transition-colors shadow-2xs">
              <div className="text-xs font-mono-tabular text-[#0A0A0E] font-bold">04 / REAL-TIME SCALE</div>
              <h3 className="text-lg font-display font-bold text-[#0A0A0E]">Sub-50ms WebGL & Engine</h3>
              <p className="text-xs text-[#52525B] leading-relaxed">
                LOD generation, GLTF/USDZ mesh compression, polygon decimation, and instant browser rendering for 3D web configurators.
              </p>
            </div>
          </div>

          {/* 3D Viewport Inspector with 3D Perspective Scroll-Expand Effect */}
          <div className="pt-8">
            <div className="border-t border-[#E5E7EB] pt-12 text-center space-y-3 pb-6">
              <span className="text-xs font-mono-tabular text-[#6B7280] uppercase tracking-wider font-bold">
                SCROLL-REACTIVE 3D ASSET INSPECTOR · 3D PERSPECTIVE ZOOM
              </span>
            </div>

            <ScrollExpand3DContainer>
              <div className="border border-[#E5E7EB] bg-[#F4F5F7] p-4 sm:p-8 shadow-2xl overflow-hidden">
                <div className="bg-white border border-[#E5E7EB] shadow-lg overflow-hidden">
                  {/* Viewport Header Bar */}
                  <div className="px-5 py-3.5 bg-[#F9FAFB] border-b border-[#E5E7EB] flex items-center justify-between text-xs font-mono-tabular">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                      </div>
                      <span className="font-bold text-[#0A0A0E]">STUDIO VIEWPORT ENGINE · 3D REAL-TIME INSPECTOR V4.2</span>
                    </div>
                    <div className="flex items-center gap-3 text-[#6B7280]">
                      <span className="hidden sm:inline">RAYTRACING ACCELERATED</span>
                      <span className="px-2 py-0.5 bg-[#D4FF00] text-[#0A0A0E] font-bold">ACTIVE</span>
                    </div>
                  </div>

                  {/* High-Fidelity 3D Viewport Graphics & Metrics */}
                  <div className="p-6 sm:p-10 space-y-8 bg-white">
                    {/* Top Stat Gauges */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="p-5 bg-[#F9FAFB] border border-[#E5E7EB] space-y-1">
                        <span className="text-[11px] font-mono-tabular text-[#6B7280]">POLYGON TOPOLOGY</span>
                        <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#0A0A0E]">1,420,800 Polys</div>
                        <span className="text-xs text-emerald-600 font-bold inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> 100% Quad Mesh (Zero N-Gons)
                        </span>
                      </div>
                      <div className="p-5 bg-[#F9FAFB] border border-[#E5E7EB] space-y-1">
                        <span className="text-[11px] font-mono-tabular text-[#6B7280]">TEXTURE RESOLUTION</span>
                        <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#0A0A0E]">8K PBR Maps</div>
                        <span className="text-xs text-emerald-600 font-bold inline-flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" /> Multi-Layer Substance LookDev
                        </span>
                      </div>
                      <div className="p-5 bg-[#F9FAFB] border border-[#E5E7EB] space-y-1">
                        <span className="text-[11px] font-mono-tabular text-[#6B7280]">REAL-TIME FRAME LATENCY</span>
                        <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#0A0A0E]">60 FPS WebGL</div>
                        <span className="text-xs text-[#0A0A0E] font-mono-tabular">Under 4.2 MB compressed GLTF</span>
                      </div>
                    </div>

                    {/* Interactive Vector Analytics Graph + Viewport Preview */}
                    <div className="border border-[#E5E7EB] bg-[#FAFAFA] p-6 space-y-6">
                      <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB] text-xs font-mono-tabular">
                        <span className="font-bold text-[#0A0A0E]">GPU RAY-TRACED FRAME RENDERING VELOCITY & OPTIMIZATION</span>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold">OCTANE / REDSHIFT</span>
                          <span className="text-[#6B7280]">16.4ms / Frame</span>
                        </div>
                      </div>

                      {/* SVG Metric Chart */}
                      <div className="h-44 sm:h-56 w-full relative">
                        <svg className="w-full h-full" viewBox="0 0 600 160" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#D4FF00" stopOpacity="0.45" />
                              <stop offset="100%" stopColor="#D4FF00" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M 0 140 Q 75 110 150 90 T 300 70 T 450 35 T 600 15 L 600 160 L 0 160 Z"
                            fill="url(#chartGrad)"
                          />
                          <path
                            d="M 0 140 Q 75 110 150 90 T 300 70 T 450 35 T 600 15"
                            fill="none"
                            stroke="#0A0A0E"
                            strokeWidth="3"
                          />
                          {/* Data Nodes */}
                          <circle cx="150" cy="90" r="4" fill="#0A0A0E" stroke="#D4FF00" strokeWidth="2" />
                          <circle cx="300" cy="70" r="4" fill="#0A0A0E" stroke="#D4FF00" strokeWidth="2" />
                          <circle cx="450" cy="35" r="4" fill="#0A0A0E" stroke="#D4FF00" strokeWidth="2" />
                          <circle cx="600" cy="15" r="5" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
                        </svg>

                        {/* Floating Collaborative Cursors */}
                        <div className="absolute top-1/4 left-1/3 px-2 py-1 bg-[#0A0A0E] text-white text-[10px] font-mono-tabular font-bold shadow-md flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-[#D4FF00] rounded-full animate-ping" />
                          <span>Alex (Lead 3D Artist) inspecting sub-division surface topology</span>
                        </div>
                      </div>
                    </div>

                    {/* 3D Visual Mockup Image */}
                    <div className="aspect-16/9 sm:aspect-21/9 w-full bg-[#0E0E12] border border-[#E5E7EB] overflow-hidden relative">
                      <img
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80"
                        alt="Precision 3D Mechanical CAD Exploded View"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-6">
                        <span className="px-3 py-1.5 bg-white text-[#0A0A0E] font-mono-tabular font-bold text-xs shadow-md border border-[#E5E7EB]">
                          PRECISION MECHANICAL CAD EXPLODED VIEW & HIGH-POLY HARD SURFACE
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollExpand3DContainer>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. "Boon — Industrial Hardware & 3D Digital Twin" FEATURED SECTION
      ====================================================================== */}
      <section id="boon-section" className="py-24 lg:py-32 border-b border-[#E5E7EB] bg-[#F9FAFB]">
        <Scroll3DSection className="max-w-[1320px] mx-auto px-6 space-y-14">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E5E7EB]">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono-tabular px-2.5 py-1 bg-[#0A0A0E] text-white font-bold tracking-wider">
                FEATURED 3D WORK · INDUSTRIAL HARDWARE & ROBOTICS
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#0A0A0E] leading-tight">
                Boon — Next-Gen Robotic Hardware & 3D Digital Twin
              </h2>
            </div>
            <div className="text-xs font-mono-tabular text-[#6B7280] max-w-sm">
              PRECISION CAD MODELING, EXPLODED MECHANICAL VIEWS & REAL-TIME WEBGL CONFIGURATOR
            </div>
          </div>

          {/* Boon Showcase Card */}
          <div className="border border-[#E5E7EB] bg-white shadow-xl grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
            {/* Left Narrative */}
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-8 border-b lg:border-b-0 lg:border-r border-[#E5E7EB]">
              <div className="space-y-6">
                <div className="flex items-center justify-between text-xs font-mono-tabular">
                  <span className="px-2.5 py-1 bg-[#D4FF00] text-[#0A0A0E] font-bold">
                    INDUSTRIAL ROBOTICS
                  </span>
                  <span className="text-[#6B7280]">SAN FRANCISCO, CA</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#0A0A0E] leading-tight">
                  Engineering a Photorealistic 3D Digital Twin for Autonomous Hardware.
                </h3>

                <p className="text-sm text-[#52525B] leading-relaxed">
                  Boon needed high-precision 3D hard-surface models and photorealistic CGI visuals to showcase their autonomous robotic hardware before physical manufacturing. We converted raw SolidWorks CAD blueprints into quad-clean subdivision meshes, crafted 8K tactile PBR materials (powder-coated aluminum, anodized titanium, optical sensors), and built an interactive 3D web configurator.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E5E7EB] text-xs font-mono-tabular">
                  <div>
                    <span className="text-[#9CA3AF] block font-semibold">SCOPE</span>
                    <span className="text-[#0A0A0E] font-bold">CAD to Sub-D, 8K PBR, WebGL</span>
                  </div>
                  <div>
                    <span className="text-[#9CA3AF] block font-semibold">OUTCOME</span>
                    <span className="text-[#0A0A0E] font-bold">+142% Pre-Order Conversions</span>
                  </div>
                </div>

                {/* Interactive Screen Tabs */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-mono-tabular text-[#6B7280] block font-bold">
                    PREVIEW 3D ASSET VIEWPORT:
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setBoonActiveTab('exploded')}
                      className={`px-3 py-1.5 text-xs font-mono-tabular font-bold border transition-colors cursor-pointer ${
                        boonActiveTab === 'exploded'
                          ? 'bg-[#0A0A0E] text-white border-[#0A0A0E]'
                          : 'bg-white text-[#4B5563] border-[#E5E7EB] hover:bg-[#F4F5F7]'
                      }`}
                    >
                      Exploded View
                    </button>
                    <button
                      type="button"
                      onClick={() => setBoonActiveTab('wireframe')}
                      className={`px-3 py-1.5 text-xs font-mono-tabular font-bold border transition-colors cursor-pointer ${
                        boonActiveTab === 'wireframe'
                          ? 'bg-[#0A0A0E] text-white border-[#0A0A0E]'
                          : 'bg-white text-[#4B5563] border-[#E5E7EB] hover:bg-[#F4F5F7]'
                      }`}
                    >
                      PBR Wireframe
                    </button>
                    <button
                      type="button"
                      onClick={() => setBoonActiveTab('turntable')}
                      className={`px-3 py-1.5 text-xs font-mono-tabular font-bold border transition-colors cursor-pointer ${
                        boonActiveTab === 'turntable'
                          ? 'bg-[#0A0A0E] text-white border-[#0A0A0E]'
                          : 'bg-white text-[#4B5563] border-[#E5E7EB] hover:bg-[#F4F5F7]'
                      }`}
                    >
                      Turntable 360°
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#E5E7EB]">
                <div className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] space-y-1">
                  <div className="text-xs font-mono-tabular text-[#4B5563] font-bold uppercase">
                    Verified Performance:
                  </div>
                  <div className="text-sm font-bold text-[#0A0A0E]">
                    Reduced interactive 3D asset load time to under 1.8 seconds while maintaining 60 FPS across mobile and desktop browsers.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCaseStudy('boon')}
                  className="w-full py-3 px-4 bg-[#0A0A0E] hover:bg-[#27272A] text-white text-xs font-bold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <span>Explore Boon 3D Case Study</span>
                  <ArrowUpRight className="w-4 h-4 text-[#D4FF00]" />
                </button>
              </div>
            </div>

            {/* Right Multi-Image Showcase */}
            <div className="lg:col-span-7 bg-[#F4F5F7] p-6 sm:p-10 flex items-center justify-center">
              <div className="w-full space-y-4">
                <div className="aspect-16/9 w-full bg-[#0E0E12] border border-[#E5E7EB] shadow-md overflow-hidden relative">
                  <img
                    src={
                      boonActiveTab === 'exploded'
                        ? 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=80'
                        : boonActiveTab === 'wireframe'
                        ? 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80'
                        : 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1400&q=80'
                    }
                    alt="Boon 3D Hardware Digital Twin Viewport"
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />
                  <div className="absolute bottom-3 left-3 px-3 py-1 bg-white/95 backdrop-blur-md border border-[#E5E7EB] text-[11px] font-mono-tabular font-bold text-[#0A0A0E]">
                    {boonActiveTab.toUpperCase()} · 100% QUAD SUBDIVISION GEOMETRY
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-4/3 bg-[#111116] border border-[#E5E7EB] shadow-2xs overflow-hidden relative group">
                    <img
                      src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
                      alt="Precision Macro Hardware Details"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold font-mono-tabular">
                      8K PBR MATERIAL MACRO
                    </div>
                  </div>
                  <div className="aspect-4/3 bg-[#111116] border border-[#E5E7EB] shadow-2xs overflow-hidden relative group">
                    <img
                      src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"
                      alt="High-Poly Surface Topology"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold font-mono-tabular">
                      RAY-TRACED LIGHTING
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Scroll3DSection>
      </section>

      {/* =====================================================================
          5. "Panther" SCI-FI VEHICLE & CINEMATIC CGI SECTION
      ====================================================================== */}
      <section className="py-24 lg:py-32 border-b border-[#E5E7EB] bg-white">
        <Scroll3DSection className="max-w-[1320px] mx-auto px-6 space-y-14">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E5E7EB]">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono-tabular px-2.5 py-1 bg-[#0A0A0E] text-white font-bold tracking-wider">
                FEATURED 3D WORK · AUTOMOTIVE & AEROSPACE CGI
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#0A0A0E] leading-tight">
                Panther — Sci-Fi Cybernetic Vehicle & Cinematic Visual Effects
              </h2>
            </div>
            <div className="text-xs font-mono-tabular text-[#6B7280] max-w-sm">
              HYPER-DETAILED HARD-SURFACE SCULPTING, PROCEDURAL SHADERS & 4K OCTANE RENDERING
            </div>
          </div>

          {/* Panther Showcase Card */}
          <div className="border border-[#E5E7EB] bg-[#0A0A0E] text-white shadow-2xl grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
            {/* Left Narrative */}
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-8 border-b lg:border-b-0 lg:border-r border-white/10">
              <div className="space-y-6">
                <div className="flex items-center justify-between text-xs font-mono-tabular">
                  <span className="px-2.5 py-1 bg-[#D4FF00] text-[#0A0A0E] font-bold">
                    AUTOMOTIVE CGI
                  </span>
                  <span className="text-[#9CA3AF]">AUSTIN, TX</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white leading-tight">
                  Crafting a Cinematic 3D Concept Vehicle for Next-Generation Mobility.
                </h3>

                <p className="text-sm text-[#9CA3AF] leading-relaxed">
                  Panther commissioned our studio to design, model, and render a futuristic autonomous electric hypercar. Our artists modeled over 4.8 million polygons across aerodynamic chassis components, custom carbon-fiber weave textures, active aerodynamic spoilers, and interior HUD holographic displays for launch keynote visuals.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs font-mono-tabular">
                  <div>
                    <span className="text-[#6B7280] block font-semibold">GLOBAL IMPACT</span>
                    <span className="text-[#D4FF00] font-bold">3.2M Global Launch Views</span>
                  </div>
                  <div>
                    <span className="text-[#6B7280] block font-semibold">HONOR</span>
                    <span className="text-white font-bold">ArtStation Studio Pick</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="p-4 bg-white/5 border border-white/10 space-y-1">
                  <div className="text-xs font-mono-tabular text-[#D4FF00] font-bold uppercase">
                    Verified Outcome:
                  </div>
                  <div className="text-sm text-[#E2E8F0]">
                    Delivered 18 cinematic 8K hero keyframes and a 60-second real-time Unreal Engine 5 showcase video.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCaseStudy('panther')}
                  className="w-full py-3 px-4 bg-white hover:bg-[#F4F5F7] text-[#0A0A0E] text-xs font-bold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
                >
                  <span>Explore Panther 3D Case Study</span>
                  <ArrowUpRight className="w-4 h-4 text-[#0A0A0E]" />
                </button>
              </div>
            </div>

            {/* Right Panther Visual Image */}
            <div className="lg:col-span-7 bg-[#14141B] p-6 sm:p-10 flex items-center justify-center">
              <div className="w-full aspect-16/9 bg-[#070709] border border-white/15 overflow-hidden shadow-2xl relative">
                <img
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80"
                  alt="Panther Sci-Fi Hypercar 3D CGI"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                  <span className="px-3 py-1 bg-[#0A0A0E] text-[#D4FF00] border border-white/20 font-mono-tabular font-bold text-xs">
                    UNREAL ENGINE 5 REAL-TIME RAY-TRACED AUTOMOTIVE PIPELINE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Scroll3DSection>
      </section>

      {/* =====================================================================
          6. "We are..." WITH INTERACTIVE 3D EFFECT
      ====================================================================== */}
      <section className="py-24 lg:py-32 border-b border-[#E5E7EB] bg-[#F9FAFB] relative overflow-hidden">
        <Scroll3DSection className="max-w-[1320px] mx-auto px-6 space-y-14 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left "We are..." Statement & Achievements */}
            <div className="lg:col-span-6 space-y-8">
              <div className="inline-flex items-center gap-2 text-xs font-mono-tabular px-2.5 py-1 bg-[#E5E7EB] text-[#0A0A0E] font-bold tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>WHO WE ARE</span>
              </div>

              <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-[#0A0A0E] leading-tight">
                We are...
              </h2>

              <p className="text-base sm:text-lg text-[#52525B] leading-relaxed">
                A world-class collective of 3D sculptors, technical directors, and real-time computational engineers pushing the bleeding edge of computer graphics and spatial product visualization.
              </p>

              {/* Numbered Achievements List */}
              <div className="divide-y divide-[#E5E7EB] border-t border-b border-[#E5E7EB] text-xs font-mono-tabular">
                <div className="py-3.5 flex items-center justify-between">
                  <span className="text-[#6B7280]">001. Studio Honors</span>
                  <span className="font-extrabold text-[#0A0A0E] text-base">18+ CG Awards</span>
                </div>
                <div className="py-3.5 flex items-center justify-between">
                  <span className="text-[#6B7280]">002. Production Experience</span>
                  <span className="font-extrabold text-[#0A0A0E] text-base">8+ Years in 3D</span>
                </div>
                <div className="py-3.5 flex items-center justify-between">
                  <span className="text-[#6B7280]">003. Global Studio Hubs</span>
                  <span className="font-extrabold text-[#0A0A0E] text-base">6 Studios Worldwide</span>
                </div>
                <div className="py-3.5 flex items-center justify-between">
                  <span className="text-[#6B7280]">004. 3D Artists & Technical Directors</span>
                  <span className="font-extrabold text-[#0A0A0E] text-base">85+ Specialists</span>
                </div>
                <div className="py-3.5 flex items-center justify-between">
                  <span className="text-[#6B7280]">005. Production 3D Assets Shipped</span>
                  <span className="font-extrabold text-[#0A0A0E] text-base">12,000+ Worldwide</span>
                </div>
              </div>
            </div>

            {/* Right: Live Interactive Three.js 3D Spatial Canvas */}
            <div className="lg:col-span-6 bg-white border border-[#E5E7EB] shadow-xl p-4 sm:p-6 relative">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] text-xs font-mono-tabular">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#D4FF00] border border-black/30" />
                  <span className="font-bold text-[#0A0A0E]">INTERACTIVE 3D SPATIAL KINETICS</span>
                </div>
                <span className="text-[#6B7280]">MOVE CURSOR TO ROTATE</span>
              </div>

              {/* Three.js 3D Canvas */}
              <WeAre3DEffect className="my-2" />

              <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-xs font-mono-tabular text-[#6B7280]">
                <span>ORBITAL GEOMETRY ENGINE</span>
                <span className="font-bold text-[#0A0A0E]">REAL-TIME 3D LAB</span>
              </div>
            </div>
          </div>
        </Scroll3DSection>
      </section>

      {/* =====================================================================
          7. "End-to-End 3D Modeling Capabilities"
      ====================================================================== */}
      <section className="py-24 lg:py-32 border-b border-[#E5E7EB] bg-white">
        <Scroll3DSection className="max-w-[1320px] mx-auto px-6 space-y-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E5E7EB]">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono-tabular px-2.5 py-1 bg-[#F4F5F7] text-[#0A0A0E] font-bold tracking-wider mb-2">
                CORE 3D EXPERTISE
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#0A0A0E] leading-tight">
                End-to-End 3D Modeling Capabilities.
              </h2>
            </div>
            <p className="text-sm text-[#52525B] max-w-md leading-relaxed">
              From engineering CAD retopology and procedural PBR shading to character sculpting and 60 FPS WebGL engines, our artists deliver production-ready 3D precision.
            </p>
          </div>

          {/* 6 Capabilities Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MUSEMIND_SERVICES.map((item, idx) => {
              const serviceIdMap: Record<number, string> = {
                0: '3d-modeling',
                1: 'photorealistic-rendering',
                2: 'ar-vr-visualization',
                3: 'character-sculpting',
                4: 'animation-walkthroughs',
                5: 'archviz-digital-twins',
              };
              const targetServiceId = serviceIdMap[idx] || '3d-modeling';

              return (
                <div
                  key={item.title}
                  onClick={() => {
                    if (onSelectService) {
                      onSelectService(targetServiceId);
                    } else {
                      onNavigatePage('services');
                    }
                  }}
                  className="p-8 bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[#0A0A0E] transition-all flex flex-col justify-between space-y-6 shadow-2xs group cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono-tabular">
                      <span className="px-2 py-0.5 bg-[#0A0A0E] text-white font-bold">
                        CAPABILITY 0{idx + 1}
                      </span>
                      <span className="text-[#6B7280]">{item.leadTime}</span>
                    </div>

                    <h3 className="text-2xl font-display font-extrabold text-[#0A0A0E] group-hover:text-black transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#52525B] leading-relaxed">
                      {item.summary}
                    </p>

                    <ul className="space-y-1.5 pt-2 text-xs text-[#4B5563]">
                      {item.capabilities.slice(0, 3).map((cap) => (
                        <li key={cap} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-[#E5E7EB] flex items-center justify-between text-xs font-mono-tabular">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#6B7280] group-hover:text-[#0A0A0E] font-semibold">View Service Page</span>
                      <span className="p-1.5 bg-white group-hover:bg-[#0A0A0E] text-[#0A0A0E] group-hover:text-white transition-colors">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleCopyServiceLink(e, targetServiceId)}
                      title="Copy shareable link for client"
                      className="px-2.5 py-1 bg-white hover:bg-[#D4FF00] text-[#0A0A0E] border border-[#E5E7EB] font-bold text-[11px] inline-flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                    >
                      {copiedServiceId === targetServiceId ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3 h-3 text-[#6B7280]" />
                          <span>Share</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </Scroll3DSection>
      </section>

      {/* =====================================================================
          8. "Built by Specialists. Connected by One Goal."
      ====================================================================== */}
      <section className="py-24 lg:py-32 border-b border-[#E5E7EB] bg-[#F9FAFB]">
        <Scroll3DSection className="max-w-[1320px] mx-auto px-6 space-y-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E5E7EB]">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono-tabular px-2.5 py-1 bg-[#E5E7EB] text-[#0A0A0E] font-bold tracking-wider mb-2">
                STUDIO TEAM & PIPELINE
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#0A0A0E] leading-tight">
                Built by Specialists. Connected by One Goal.
              </h2>
            </div>
            <p className="text-sm text-[#52525B] max-w-md leading-relaxed">
              We are a global multidisciplinary 3D studio where digital sculptors, look-development artists, and real-time shader engineers collaborate seamlessly from initial CAD to final render.
            </p>
          </div>

          {/* Specialist Units Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 bg-white border border-[#E5E7EB] space-y-4 shadow-2xs hover:border-[#0A0A0E] transition-colors">
              <div className="w-10 h-10 bg-[#0A0A0E] text-white flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="text-lg font-display font-bold text-[#0A0A0E]">3D Sculptors & CAD Modelers</h3>
              <p className="text-xs text-[#52525B] leading-relaxed">
                Masters of organic anatomy, Class-A surfacing, precision topology, and micron-accurate engineering CAD models.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#E5E7EB] space-y-4 shadow-2xs hover:border-[#0A0A0E] transition-colors">
              <div className="w-10 h-10 bg-[#0A0A0E] text-white flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="text-lg font-display font-bold text-[#0A0A0E]">Texture & LookDev Artists</h3>
              <p className="text-xs text-[#52525B] leading-relaxed">
                Shader wizards handcrafting 8K PBR textures, procedural roughness maps, anisotropic metals, and subsurface scatter materials.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#E5E7EB] space-y-4 shadow-2xs hover:border-[#0A0A0E] transition-colors">
              <div className="w-10 h-10 bg-[#0A0A0E] text-white flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="text-lg font-display font-bold text-[#0A0A0E]">Riggers & Technical Directors</h3>
              <p className="text-xs text-[#52525B] leading-relaxed">
                Specialists engineering kinematic skeletons, dynamic cloth and fluid physics, and mechanical exploded-view animations.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#E5E7EB] space-y-4 shadow-2xs hover:border-[#0A0A0E] transition-colors">
              <div className="w-10 h-10 bg-[#0A0A0E] text-white flex items-center justify-center font-bold">
                04
              </div>
              <h3 className="text-lg font-display font-bold text-[#0A0A0E]">Real-Time & WebGL Engineers</h3>
              <p className="text-xs text-[#52525B] leading-relaxed">
                Creative developers optimizing Draco/Meshopt compression, WebGL shaders, and Three.js 60fps web experiences.
              </p>
            </div>
          </div>
        </Scroll3DSection>
      </section>

      {/* =====================================================================
          9. FREQUENTLY ASKED QUESTIONS (FAQ Accordion)
      ====================================================================== */}
      <section className="py-24 lg:py-32 border-b border-[#E5E7EB] bg-white">
        <Scroll3DSection className="max-w-[1320px] mx-auto px-6 space-y-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono-tabular px-2.5 py-1 bg-[#F4F5F7] text-[#0A0A0E] font-bold tracking-wider">
                3D FAQ
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#0A0A0E]">
                Frequently Asked Questions.
              </h2>
              <p className="text-sm text-[#52525B] leading-relaxed">
                Have specific questions regarding source CAD file inputs, polygon budgets, 8K PBR texture sets, or commercial licensing? Everything answered upfront.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => onNavigatePage('contact')}
                  className="py-3 px-6 bg-[#0A0A0E] hover:bg-[#27272A] text-white font-bold text-xs inline-flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
                >
                  <span>Ask a Specific 3D Question</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4FF00]" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 divide-y divide-[#E5E7EB] border-t border-b border-[#E5E7EB]">
              {MUSEMIND_FAQS.map((faq) => {
                const isOpen = activeFaq === faq.id;
                return (
                  <div key={faq.id} className="py-6">
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? '' : faq.id)}
                      className="w-full flex items-center justify-between gap-4 text-left cursor-pointer group"
                      aria-expanded={isOpen}
                    >
                      <div>
                        <span className="text-xs font-mono-tabular text-[#6B7280] block mb-1">
                          {faq.category}
                        </span>
                        <span className="text-base font-display font-bold text-[#0A0A0E] group-hover:text-black transition-colors">
                          {faq.question}
                        </span>
                      </div>
                      <span className="p-2 border border-[#E5E7EB] bg-[#F4F5F7] text-[#0A0A0E] shrink-0">
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="mt-3 pr-8 text-sm text-[#52525B] leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Scroll3DSection>
      </section>

      {/* =====================================================================
          10. HIGH-IMPACT FINAL CTA: "Have a 3D Project in Mind? Let's Render It."
      ====================================================================== */}
      <section className="py-24 lg:py-32 bg-[#F9FAFB] text-[#0A0A0E]">
        <Scroll3DSection className="max-w-[1320px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-6 space-y-8">
              <div className="inline-flex items-center gap-2 text-xs font-mono-tabular px-2.5 py-1 bg-[#E5E7EB] text-[#0A0A0E] font-bold tracking-wider">
                <Send className="w-3.5 h-3.5" />
                <span>START A 3D CONVERSATION</span>
              </div>

              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-[#0A0A0E] leading-[0.98]">
                Have a 3D Project in Mind? Let’s <span className="bg-[#D4FF00] px-2.5 py-0.5 inline-block text-[#0A0A0E]">Render It.</span>
              </h2>

              <p className="text-base sm:text-lg text-[#52525B] leading-relaxed max-w-xl">
                Ready to elevate your product visuals with photorealistic 3D models and real-time CGI? Send us your concept sketches, CAD files, or reference brief, and we'll deliver a comprehensive 3D production estimate within 24 hours.
              </p>

              {/* Direct Email Copy Box */}
              <div className="p-4 bg-white border border-[#E5E7EB] shadow-sm flex items-center justify-between gap-4 max-w-md">
                <div>
                  <div className="text-[10px] font-mono-tabular text-[#6B7280] font-semibold">DIRECT STUDIO INQUIRIES</div>
                  <div className="text-sm font-mono-tabular text-[#0A0A0E] font-bold">
                    studio@3dmodelingcompany.com
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-3.5 py-2 bg-[#0A0A0E] hover:bg-[#27272A] text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#D4FF00]" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-2 text-xs font-mono-tabular text-[#52525B]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span>Mutual NDA executed prior to reviewing proprietary CAD/3D files</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span>100% full commercial IP transfer & raw source file handoff</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span>Direct Slack access to Senior Technical Director & 3D Lead</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E7EB] text-xs text-[#6B7280] space-y-1">
                <div><strong>US Studio:</strong> Los Angeles & New York · <strong>European Studio:</strong> London, UK & Berlin</div>
                <div><strong>Asia Pacific Studio:</strong> Tokyo, Japan & Seoul</div>
              </div>
            </div>

            {/* Embedded Clean White 3D Commission Form */}
            <div className="lg:col-span-6 bg-white border border-[#E5E7EB] shadow-lg p-8 sm:p-12 space-y-5">
              {formSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 bg-[#0A0A0E] text-[#D4FF00] flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-[#0A0A0E]">
                    3D Project Brief Received
                  </h3>
                  <p className="text-sm text-[#52525B] max-w-md mx-auto">
                    Thank you, {formName}. Our technical directors have received your{' '}
                    {formService} brief and will deliver a production estimate to {formEmail} within 4 business hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormSubmitted(false)}
                    className="py-2.5 px-5 bg-[#0A0A0E] text-white hover:bg-[#27272A] text-xs font-bold transition-colors cursor-pointer"
                  >
                    Send Another 3D Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>
                  <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                    <h3 className="text-lg font-display font-bold text-[#0A0A0E]">
                      Request 3D Production Quote
                    </h3>
                    <span className="text-xs text-[#0A0A0E] font-mono-tabular font-bold bg-[#D4FF00] px-2 py-0.5">
                      RESPONSE &lt; 4 HOURS
                    </span>
                  </div>

                  {formError && (
                    <div className="p-3 bg-red-50 border border-red-300 text-xs text-red-800">
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-[#4B5563]">Your Name *</label>
                      <input
                        type="text"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-3.5 py-2.5 bg-[#F9FAFB] border border-[#D1D5DB] text-[#0A0A0E] text-xs focus:outline-none focus:border-[#0A0A0E] focus:bg-white rounded-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-[#4B5563]">Work Email *</label>
                      <input
                        type="email"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="sarah@company.com"
                        className="w-full px-3.5 py-2.5 bg-[#F9FAFB] border border-[#D1D5DB] text-[#0A0A0E] text-xs focus:outline-none focus:border-[#0A0A0E] focus:bg-white rounded-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-[#4B5563]">Company / Brand</label>
                      <input
                        type="text"
                        value={formCompany}
                        onChange={(e) => setFormCompany(e.target.value)}
                        placeholder="Company or Studio Name"
                        className="w-full px-3.5 py-2.5 bg-[#F9FAFB] border border-[#D1D5DB] text-[#0A0A0E] text-xs focus:outline-none focus:border-[#0A0A0E] focus:bg-white rounded-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-[#4B5563]">Primary 3D Service</label>
                      <select
                        value={formService}
                        onChange={(e) => setFormService(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#F9FAFB] border border-[#D1D5DB] text-[#0A0A0E] text-xs focus:outline-none focus:border-[#0A0A0E] focus:bg-white rounded-none"
                      >
                        <option>Hard-Surface & Industrial CAD Modeling</option>
                        <option>Photorealistic Product CGI & Turntable Animation</option>
                        <option>Real-Time WebGL & Interactive 3D Configurator</option>
                        <option>Organic Character & Creature Digital Sculpting</option>
                        <option>Architectural Visualization & Metaverse Digital Twin</option>
                        <option>Full-Scale Commercial 3D Asset Library</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#4B5563]">Estimated Project Budget</label>
                    <select
                      value={formBudget}
                      onChange={(e) => setFormBudget(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#F9FAFB] border border-[#D1D5DB] text-[#0A0A0E] text-xs focus:outline-none focus:border-[#0A0A0E] focus:bg-white rounded-none"
                    >
                      <option>$3,000 – $7,500 (Single High-Poly Product Model + 8K Renders)</option>
                      <option>$7,500 – $15,000 (Multi-Angle Product Suite + Turntable Animation)</option>
                      <option>$15,000 – $35,000 (Complete Real-Time 3D WebGL Configurator)</option>
                      <option>$35,000+ (Enterprise 3D Asset Pipeline / Ongoing Production)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#4B5563]">3D Project Requirements & Source Files *</label>
                    <textarea
                      rows={3}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="Tell us about your 3D asset requirements, source files (CAD, STEP, sketches, scans), polygon budget, and intended platform (WebGL, Unreal Engine, Film, E-Commerce)..."
                      className="w-full px-3.5 py-2.5 bg-[#F9FAFB] border border-[#D1D5DB] text-[#0A0A0E] text-xs focus:outline-none focus:border-[#0A0A0E] focus:bg-white rounded-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 bg-[#0A0A0E] hover:bg-[#27272A] text-white font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                  >
                    <span>Submit 3D Project Brief</span>
                    <ArrowRight className="w-4 h-4 text-[#D4FF00]" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </Scroll3DSection>
      </section>

      {/* =====================================================================
          11. CASE STUDY MODAL (Interactive deep dive for Boon & Panther)
      ====================================================================== */}
      {selectedCaseStudy && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedCaseStudy(null)}
        >
          <div
            className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#E5E7EB] shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] px-6 py-4 flex items-center justify-between z-10">
              <span className="text-xs font-mono-tabular font-bold text-[#0A0A0E]">
                3D CASE STUDY · {selectedCaseStudy.toUpperCase()}
              </span>
              <button
                type="button"
                onClick={() => setSelectedCaseStudy(null)}
                className="p-1 hover:bg-[#F4F5F7] text-[#0A0A0E] cursor-pointer"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-10 space-y-8 text-[#0A0A0E]">
              {selectedCaseStudy === 'boon' ? (
                <>
                  <div className="space-y-3">
                    <span className="px-2.5 py-1 bg-[#D4FF00] text-[#0A0A0E] text-xs font-bold font-mono-tabular">
                      INDUSTRIAL ROBOTICS & 3D DIGITAL TWIN
                    </span>
                    <h3 className="text-3xl font-display font-extrabold">
                      Boon — Autonomous Hardware Digital Twin & Interactive Configurator
                    </h3>
                    <p className="text-sm text-[#52525B]">
                      San Francisco, CA · Completed in 4 Weeks
                    </p>
                  </div>

                  <div className="aspect-16/9 bg-[#0E0E12] overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=80"
                      alt="Boon 3D Hardware Model"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-[#F9FAFB] border border-[#E5E7EB] text-xs font-mono-tabular">
                    <div>
                      <span className="text-[#6B7280] block">POLYGONS</span>
                      <span className="text-base font-bold text-[#0A0A0E]">1.4M Quad Sub-D</span>
                    </div>
                    <div>
                      <span className="text-[#6B7280] block">PBR MATERIALS</span>
                      <span className="text-base font-bold text-[#0A0A0E]">8K Multi-Layer</span>
                    </div>
                    <div>
                      <span className="text-[#6B7280] block">WEBGL SPEED</span>
                      <span className="text-base font-bold text-[#0A0A0E]">Sub-1.8s Load / 60 FPS</span>
                    </div>
                  </div>

                  <div className="space-y-4 text-sm text-[#52525B] leading-relaxed">
                    <h4 className="text-base font-display font-bold text-[#0A0A0E]">The Challenge</h4>
                    <p>
                      Boon had engineered a groundbreaking autonomous industrial robot, but needed photorealistic 3D visualization to secure multi-million dollar supply contracts before physical tooling was completed.
                    </p>

                    <h4 className="text-base font-display font-bold text-[#0A0A0E]">Our 3D Solution</h4>
                    <p>
                      We ingested raw SolidWorks engineering files containing over 800 individual fasteners and internal circuitry. Our sculptors retopologized each shell into clean quad-dominant subdivision surfaces, modeled micro-chamfers to capture realistic specular highlights, authored procedural powder-coated finishes, and packaged an interactive Three.js 3D web configurator.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E5E7EB] flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCaseStudy(null);
                        onNavigatePage('contact');
                      }}
                      className="py-3 px-6 bg-[#0A0A0E] text-white hover:bg-[#27272A] text-xs font-bold inline-flex items-center gap-2 cursor-pointer"
                    >
                      <span>Commission a Similar 3D Model</span>
                      <ArrowRight className="w-4 h-4 text-[#D4FF00]" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-3">
                    <span className="px-2.5 py-1 bg-[#D4FF00] text-[#0A0A0E] text-xs font-bold font-mono-tabular">
                      AUTOMOTIVE CGI & CINEMATIC VFX
                    </span>
                    <h3 className="text-3xl font-display font-extrabold">
                      Panther — Sci-Fi Cybernetic Vehicle Concept & Unreal Engine 5 Pipeline
                    </h3>
                    <p className="text-sm text-[#52525B]">
                      Austin, TX · Completed in 6 Weeks
                    </p>
                  </div>

                  <div className="aspect-16/9 bg-[#070709] overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80"
                      alt="Panther Sci-Fi Hypercar"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-[#F9FAFB] border border-[#E5E7EB] text-xs font-mono-tabular">
                    <div>
                      <span className="text-[#6B7280] block">POLYGONS</span>
                      <span className="text-base font-bold text-[#0A0A0E]">4.8M Polygons</span>
                    </div>
                    <div>
                      <span className="text-[#6B7280] block">RENDER ENGINE</span>
                      <span className="text-base font-bold text-[#0A0A0E]">Unreal Engine 5 / Octane</span>
                    </div>
                    <div>
                      <span className="text-[#6B7280] block">IMPACT</span>
                      <span className="text-base font-bold text-[#0A0A0E]">3.2M Global Launch Views</span>
                    </div>
                  </div>

                  <div className="space-y-4 text-sm text-[#52525B] leading-relaxed">
                    <h4 className="text-base font-display font-bold text-[#0A0A0E]">The Challenge</h4>
                    <p>
                      Panther required a head-turning, cinematic launch video and high-resolution print stills for their autonomous electric concept vehicle announcement at a major international automotive expo.
                    </p>

                    <h4 className="text-base font-display font-bold text-[#0A0A0E]">Our 3D Solution</h4>
                    <p>
                      Our hard-surface modelers constructed aerodynamic body panels from scratch using Class-A surfacing techniques. We developed anisotropic carbon-fiber weave shaders, illuminated LED matrix light strips with true spectral caustics, and rendered the sequence in Unreal Engine 5 using Lumen dynamic global illumination and Nanite geometry virtualization.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E5E7EB] flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCaseStudy(null);
                        onNavigatePage('contact');
                      }}
                      className="py-3 px-6 bg-[#0A0A0E] text-white hover:bg-[#27272A] text-xs font-bold inline-flex items-center gap-2 cursor-pointer"
                    >
                      <span>Commission Automotive 3D CGI</span>
                      <ArrowRight className="w-4 h-4 text-[#D4FF00]" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification when Client Link is copied from capabilities */}
      {copiedServiceId && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0A0A0E] text-white px-5 py-3 border border-[#D4FF00] shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <CheckCircle2 className="w-4 h-4 text-[#D4FF00] shrink-0" />
          <div className="text-xs font-mono-tabular">
            <span className="font-bold text-[#D4FF00]">Link Copied:</span>{' '}
            <span className="text-[#E2E8F0] select-all">{getFullShareableUrl('service-detail', copiedServiceId)}</span>
          </div>
        </div>
      )}
    </div>
  );
};
