import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  FileCheck,
  Cpu,
  Layers,
  Sparkles,
  Send,
  Plus,
  Minus,
  Check,
  Copy,
  Shield,
  Box,
  Eye,
  Star,
  Share2,
  Link as LinkIcon,
} from 'lucide-react';
import { ServiceDetailItem, DETAILED_SERVICES } from '../data/servicesData';
import { Scroll3DSection } from './Scroll3DReveal';
import { getFullShareableUrl } from '../utils/routes';

interface ServiceDetailPageProps {
  service: ServiceDetailItem;
  onNavigatePage: (page: string) => void;
  onSelectService: (serviceId: string) => void;
  onCommissionService: (serviceTitle: string, budgetTier?: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  service,
  onNavigatePage,
  onSelectService,
  onCommissionService,
}) => {
  const [activeFaq, setActiveFaq] = useState<string>('0');
  const [selectedPricingTier, setSelectedPricingTier] = useState<string>(service.pricingOptions[1]?.tier || '');
  const [activeViewMode, setActiveViewMode] = useState<'beauty' | 'wireframe' | 'clay'>('beauty');
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const handleCopyLink = () => {
    const fullUrl = getFullShareableUrl('service-detail', service.id);
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2800);
  };

  // Quick commission form within the single service page
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formMessage, setFormMessage] = useState(
    `We would like to commission ${service.title}. Target timeline: ${service.leadTime}.`
  );
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('studio@3dmodelingcompany.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim()) {
      setFormError('Please provide your name and work email address.');
      return;
    }
    setFormError('');
    setFormSubmitted(true);
  };

  // Find next service for bottom navigation
  const currentIndex = DETAILED_SERVICES.findIndex((s) => s.id === service.id);
  const nextService = DETAILED_SERVICES[(currentIndex + 1) % DETAILED_SERVICES.length];
  const prevService = DETAILED_SERVICES[(currentIndex - 1 + DETAILED_SERVICES.length) % DETAILED_SERVICES.length];

  return (
    <div className="bg-[#FFFFFF] text-[#0A0A0E] selection:bg-[#D4FF00] selection:text-[#0A0A0E] min-h-screen">
      {/* =====================================================================
          1. BREADCRUMBS & NAVIGATION BAR
      ====================================================================== */}
      <div className="border-b border-[#E5E7EB] bg-[#F9FAFB] py-4 sticky top-16 z-30 backdrop-blur-md">
        <div className="max-w-[1320px] mx-auto px-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono-tabular">
          <div className="flex items-center gap-2 text-[#6B7280]">
            <button
              type="button"
              onClick={() => onNavigatePage('home')}
              className="hover:text-[#0A0A0E] transition-colors cursor-pointer"
            >
              HOME
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={() => onNavigatePage('services')}
              className="hover:text-[#0A0A0E] transition-colors cursor-pointer"
            >
              SERVICES
            </button>
            <span>/</span>
            <span className="text-[#0A0A0E] font-bold uppercase truncate max-w-[200px] sm:max-w-none">
              {service.title}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleCopyLink}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 font-bold text-xs transition-all cursor-pointer shadow-2xs border ${
                copiedLink
                  ? 'bg-[#10B981] text-white border-emerald-600'
                  : 'bg-[#D4FF00] hover:bg-[#cbf500] text-[#0A0A0E] border-black/30'
              }`}
              title="Copy shareable link for client"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied!' : 'Share to Client'}</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigatePage('services')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E5E7EB] text-[#0A0A0E] font-bold hover:bg-[#0A0A0E] hover:text-white transition-colors cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">All Services</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectService(nextService.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E5E7EB] text-[#0A0A0E] font-bold hover:bg-[#0A0A0E] hover:text-white transition-colors cursor-pointer shadow-2xs"
            >
              <span>Next: {nextService.number}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          2. SERVICE HERO SECTION
      ====================================================================== */}
      <section className="py-16 lg:py-24 border-b border-[#E5E7EB] bg-white relative overflow-hidden">
        {/* Subtle ambient light glow */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-[#D4FF00]/10 blur-[130px] pointer-events-none" />

        <div className="max-w-[1320px] mx-auto px-6 relative z-10 space-y-12">
          {/* Top Pill & Badges */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-[#F4F5F7] border border-[#E5E7EB] text-xs font-mono-tabular">
              <span className="w-2 h-2 bg-[#D4FF00] border border-black/40 inline-block" />
              <span className="text-[#0A0A0E] font-bold">SERVICE {service.number}</span>
              <span className="text-[#D1D5DB]">/</span>
              <span className="text-[#52525B] uppercase">{service.category}</span>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono-tabular text-[#52525B]">
              <div className="flex text-[#F59E0B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="font-bold text-[#0A0A0E]">{service.rating}</span>
              <span className="text-[#D1D5DB]">·</span>
              <span>DIRECT PRODUCTION PIPELINE</span>
            </div>
          </div>

          {/* Main Title & Value Proposition */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-8 space-y-6">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-[#0A0A0E] leading-[1.02]">
                {service.title}
              </h1>

              <p className="text-lg sm:text-xl text-[#52525B] leading-relaxed max-w-3xl">
                {service.tagline}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onCommissionService(service.title, selectedPricingTier)}
                  className="py-3.5 px-6 bg-[#0A0A0E] hover:bg-[#27272A] text-white font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-colors cursor-pointer shadow-md hover:shadow-lg"
                >
                  <span>Commission This Service</span>
                  <ArrowRight className="w-4 h-4 text-[#D4FF00]" />
                </button>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className={`py-3.5 px-5 font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-all cursor-pointer border shadow-2xs ${
                    copiedLink
                      ? 'bg-[#10B981] text-white border-emerald-600'
                      : 'bg-[#D4FF00] hover:bg-[#cbf500] text-[#0A0A0E] border-black/30'
                  }`}
                  title="Copy direct shareable link for client"
                >
                  {copiedLink ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                  <span>{copiedLink ? 'Link Copied!' : 'Share Link With Client'}</span>
                </button>

                <a
                  href="#pricing-section"
                  className="py-3.5 px-5 bg-white hover:bg-[#F4F5F7] text-[#0A0A0E] border border-[#E5E7EB] font-bold text-xs inline-flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
                >
                  <span>View Pricing & Scope</span>
                  <ArrowUpRight className="w-4 h-4 text-[#0A0A0E]" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="py-3.5 px-4 bg-[#F4F5F7] hover:bg-[#E5E7EB] text-[#0A0A0E] border border-[#E5E7EB] font-bold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-[#10B981]" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedEmail ? 'Email Copied!' : 'Copy Studio Email'}</span>
                </button>
              </div>

              {/* Shareable Link Indicator Box for Clients */}
              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono-tabular">
                <span className="text-[#6B7280] font-bold">CLIENT SHARE LINK:</span>
                <span className="px-2.5 py-1 bg-[#F4F5F7] border border-[#E5E7EB] text-[#0A0A0E] font-medium select-all">
                  {getFullShareableUrl('service-detail', service.id)}
                </span>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="text-xs text-[#0A0A0E] font-bold underline hover:no-underline cursor-pointer"
                >
                  {copiedLink ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Quick Service Telemetry Card */}
            <div className="lg:col-span-4 p-6 bg-[#F9FAFB] border border-[#E5E7EB] space-y-5 shadow-2xs">
              <div className="text-xs font-mono-tabular text-[#6B7280] font-bold uppercase pb-3 border-b border-[#E5E7EB]">
                SERVICE SPECIFICATION SUMMARY
              </div>

              <div className="space-y-3.5 text-xs font-mono-tabular">
                <div>
                  <span className="text-[#6B7280] block text-[11px]">ESTIMATED TURNAROUND</span>
                  <span className="text-sm font-bold text-[#0A0A0E] flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-4 h-4 text-[#10B981]" />
                    {service.leadTime}
                  </span>
                </div>

                <div>
                  <span className="text-[#6B7280] block text-[11px]">OUTPUT FORMATS</span>
                  <span className="text-xs font-bold text-[#0A0A0E] block mt-0.5">
                    {service.formats}
                  </span>
                </div>

                <div>
                  <span className="text-[#6B7280] block text-[11px]">BENCHMARK VERIFICATION</span>
                  <span className="text-xs font-bold text-[#0A0A0E] block mt-0.5 text-emerald-700">
                    {service.outcomeStat}
                  </span>
                </div>

                <div className="pt-2 border-t border-[#E5E7EB] flex items-center gap-2 text-[#52525B]">
                  <Shield className="w-4 h-4 text-[#10B981]" />
                  <span>100% Commercial IP Rights Included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. INTERACTIVE ASSET INSPECTION VIEWPORT
      ====================================================================== */}
      <section className="py-16 lg:py-20 border-b border-[#E5E7EB] bg-[#F9FAFB]">
        <div className="max-w-[1320px] mx-auto px-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-4">
            <div>
              <span className="text-xs font-mono-tabular text-[#6B7280] font-bold uppercase block">
                3D ASSET INSPECTION VIEWPORT
              </span>
              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-[#0A0A0E]">
                Production Topology & Shading Inspection
              </h2>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-2 text-xs font-mono-tabular">
              <button
                type="button"
                onClick={() => setActiveViewMode('beauty')}
                className={`px-3 py-1.5 border font-bold transition-colors cursor-pointer ${
                  activeViewMode === 'beauty'
                    ? 'bg-[#0A0A0E] text-white border-[#0A0A0E]'
                    : 'bg-white text-[#4B5563] border-[#E5E7EB] hover:bg-[#F4F5F7]'
                }`}
              >
                Beauty Render
              </button>
              <button
                type="button"
                onClick={() => setActiveViewMode('wireframe')}
                className={`px-3 py-1.5 border font-bold transition-colors cursor-pointer ${
                  activeViewMode === 'wireframe'
                    ? 'bg-[#0A0A0E] text-white border-[#0A0A0E]'
                    : 'bg-white text-[#4B5563] border-[#E5E7EB] hover:bg-[#F4F5F7]'
                }`}
              >
                Quad Wireframe
              </button>
              <button
                type="button"
                onClick={() => setActiveViewMode('clay')}
                className={`px-3 py-1.5 border font-bold transition-colors cursor-pointer ${
                  activeViewMode === 'clay'
                    ? 'bg-[#0A0A0E] text-white border-[#0A0A0E]'
                    : 'bg-white text-[#4B5563] border-[#E5E7EB] hover:bg-[#F4F5F7]'
                }`}
              >
                Ambient Clay
              </button>
            </div>
          </div>

          {/* Large Viewport Container */}
          <div className="border border-[#E5E7EB] bg-[#0E0E12] overflow-hidden shadow-xl relative aspect-16/9 sm:aspect-21/9">
            <img
              src={service.heroImage}
              alt={service.title}
              className={`w-full h-full object-cover transition-all duration-300 ${
                activeViewMode === 'wireframe'
                  ? 'invert contrast-150 opacity-90'
                  : activeViewMode === 'clay'
                  ? 'grayscale contrast-125'
                  : 'brightness-100'
              }`}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-6">
              <div className="space-y-1">
                <span className="px-2.5 py-1 bg-white text-[#0A0A0E] font-mono-tabular font-bold text-xs shadow-md border border-[#E5E7EB] inline-block">
                  {service.title.toUpperCase()} · {activeViewMode.toUpperCase()} PASS
                </span>
                <p className="text-white/80 text-xs font-mono-tabular hidden sm:block">
                  Sub-millimeter edge flow · Tangent-space normal verified · Clean quad topology
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#D4FF00] text-[#0A0A0E] font-mono-tabular font-bold text-xs">
                  4K / 8K MASTER
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. IN-DEPTH SERVICE OVERVIEW & PROBLEM SOLVED
      ====================================================================== */}
      <section className="py-20 lg:py-28 border-b border-[#E5E7EB] bg-white">
        <Scroll3DSection className="max-w-[1320px] mx-auto px-6 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono-tabular px-2.5 py-1 bg-[#F4F5F7] text-[#0A0A0E] font-bold tracking-wider">
                <Cpu className="w-3.5 h-3.5 text-[#0A0A0E]" />
                <span>EXPERT SERVICE METHODOLOGY</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#0A0A0E] leading-tight">
                Engineered for Commercial Impact & Extreme Precision.
              </h2>

              <p className="text-base text-[#52525B] leading-relaxed">
                {service.overview}
              </p>

              {/* Feature Checklist */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono-tabular text-[#6B7280] font-bold uppercase block">
                  CORE TECHNICAL ADVANTAGES:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#0A0A0E] font-mono-tabular">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2 p-2.5 bg-[#F9FAFB] border border-[#E5E7EB]">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: The Challenge This Solves */}
            <div className="lg:col-span-6 space-y-6">
              <div className="p-8 bg-[#F9FAFB] border border-[#E5E7EB] space-y-6 shadow-xs">
                <div className="space-y-2">
                  <span className="text-xs font-mono-tabular text-[#B45309] font-bold uppercase">
                    THE INDUSTRY BOTTLENECK
                  </span>
                  <h3 className="text-xl font-display font-bold text-[#0A0A0E]">
                    The Challenge We Solve for Clients:
                  </h3>
                </div>

                <p className="text-sm text-[#52525B] leading-relaxed">
                  {service.challengeSolves}
                </p>

                <div className="p-4 bg-white border border-[#E5E7EB] space-y-1">
                  <div className="text-xs font-mono-tabular text-[#10B981] font-bold uppercase">
                    PROVEN CLIENT OUTCOME:
                  </div>
                  <div className="text-sm font-bold text-[#0A0A0E]">
                    {service.outcomeStat}
                  </div>
                </div>
              </div>

              {/* Technical Specifications Matrix */}
              <div className="p-8 bg-white border border-[#E5E7EB] space-y-4 shadow-xs">
                <div className="text-xs font-mono-tabular text-[#0A0A0E] font-bold uppercase pb-2 border-b border-[#E5E7EB]">
                  TECHNICAL SPECIFICATIONS MATRIX
                </div>

                <div className="divide-y divide-[#E5E7EB] text-xs font-mono-tabular">
                  {service.specifications.map((spec) => (
                    <div key={spec.label} className="py-2.5 flex items-center justify-between gap-4">
                      <span className="text-[#6B7280]">{spec.label}</span>
                      <span className="font-bold text-[#0A0A0E] text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Scroll3DSection>
      </section>

      {/* =====================================================================
          5. WHAT'S INCLUDED / DETAILED DELIVERABLES
      ====================================================================== */}
      <section className="py-20 lg:py-28 border-b border-[#E5E7EB] bg-[#F9FAFB]">
        <Scroll3DSection className="max-w-[1320px] mx-auto px-6 space-y-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E5E7EB]">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono-tabular px-2.5 py-1 bg-[#0A0A0E] text-white font-bold tracking-wider mb-2">
                DELIVERABLES PACKAGE
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#0A0A0E]">
                What You Receive Upon Completion.
              </h2>
            </div>
            <p className="text-sm text-[#52525B] max-w-md">
              Full commercial handoff with clean hierarchy, organized project files, and verified multi-format exports.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.deliverables.map((deliv, idx) => (
              <div
                key={deliv.title}
                className="p-8 bg-white border border-[#E5E7EB] space-y-4 hover:border-[#0A0A0E] transition-colors shadow-2xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 bg-[#0A0A0E] text-white flex items-center justify-center font-bold font-mono-tabular">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg font-display font-bold text-[#0A0A0E]">
                    {deliv.title}
                  </h3>
                  <p className="text-xs text-[#52525B] leading-relaxed">
                    {deliv.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5E7EB] flex items-center gap-1.5 text-xs font-mono-tabular text-[#10B981] font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Guaranteed Deliverable</span>
                </div>
              </div>
            ))}
          </div>
        </Scroll3DSection>
      </section>

      {/* =====================================================================
          6. DEDICATED 4-STAGE PRODUCTION PIPELINE
      ====================================================================== */}
      <section className="py-20 lg:py-28 border-b border-[#E5E7EB] bg-white">
        <Scroll3DSection className="max-w-[1320px] mx-auto px-6 space-y-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E5E7EB]">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono-tabular px-2.5 py-1 bg-[#F4F5F7] text-[#0A0A0E] font-bold tracking-wider mb-2">
                STEP-BY-STEP WORKFLOW
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#0A0A0E]">
                4-Stage Auditable Production Pipeline.
              </h2>
            </div>
            <p className="text-sm text-[#52525B] max-w-md">
              Every milestone includes interactive browser sign-offs at geometry, shader, and final mastering gates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.pipeline.map((step) => (
              <div
                key={step.step}
                className="p-8 bg-[#F9FAFB] border border-[#E5E7EB] space-y-4 hover:border-[#0A0A0E] transition-colors shadow-2xs"
              >
                <div className="flex items-center justify-between text-xs font-mono-tabular pb-3 border-b border-[#E5E7EB]">
                  <span className="font-extrabold text-[#0A0A0E] text-base">STAGE {step.step}</span>
                  <span className="text-[#6B7280]">{step.duration}</span>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-mono-tabular text-[#6B7280] font-semibold block uppercase">
                    {step.phase}
                  </span>
                  <h3 className="text-lg font-display font-bold text-[#0A0A0E]">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#52525B] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5E7EB] text-xs font-mono-tabular space-y-1">
                  <span className="text-[#6B7280] block text-[10px] font-semibold">STAGE DELIVERABLE:</span>
                  <span className="text-[#0A0A0E] font-bold">{step.deliverable}</span>
                </div>
              </div>
            ))}
          </div>
        </Scroll3DSection>
      </section>

      {/* =====================================================================
          7. PRICING & SCOPE TIERS
      ====================================================================== */}
      <section id="pricing-section" className="py-20 lg:py-28 border-b border-[#E5E7EB] bg-[#F9FAFB]">
        <Scroll3DSection className="max-w-[1320px] mx-auto px-6 space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono-tabular px-2.5 py-1 bg-[#0A0A0E] text-white font-bold tracking-wider">
              PRICING & SCOPE
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#0A0A0E]">
              Transparent Milestone Pricing.
            </h2>
            <p className="text-sm text-[#52525B]">
              Fixed pricing with scheduled revision passes, transparent deliverables, and zero surprise overages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.pricingOptions.map((tier, idx) => {
              const isPopular = idx === 1;
              return (
                <div
                  key={tier.tier}
                  className={`p-8 flex flex-col justify-between space-y-6 transition-all ${
                    isPopular
                      ? 'bg-white border-2 border-[#0A0A0E] shadow-xl relative'
                      : 'bg-white border border-[#E5E7EB] shadow-2xs hover:border-[#0A0A0E]'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#D4FF00] text-[#0A0A0E] text-[10px] font-mono-tabular font-bold uppercase tracking-wider">
                      MOST POPULAR SCOPE
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-xs font-mono-tabular text-[#6B7280] font-semibold block uppercase">
                        TIER 0{idx + 1}
                      </span>
                      <h3 className="text-xl font-display font-bold text-[#0A0A0E]">
                        {tier.tier}
                      </h3>
                    </div>

                    <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#0A0A0E]">
                      {tier.price}
                    </div>

                    <p className="text-xs text-[#52525B] leading-relaxed pb-4 border-b border-[#E5E7EB]">
                      {tier.idealFor}
                    </p>

                    <ul className="space-y-2 text-xs font-mono-tabular text-[#4B5563]">
                      {tier.scope.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => onCommissionService(service.title, tier.tier)}
                    className={`w-full py-3 px-4 font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                      isPopular
                        ? 'bg-[#0A0A0E] hover:bg-[#27272A] text-white shadow-md'
                        : 'bg-[#F4F5F7] hover:bg-[#0A0A0E] text-[#0A0A0E] hover:text-white border border-[#E5E7EB]'
                    }`}
                  >
                    <span>Select {tier.tier}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D4FF00]" />
                  </button>
                </div>
              );
            })}
          </div>
        </Scroll3DSection>
      </section>

      {/* =====================================================================
          8. SERVICE-SPECIFIC FAQS
      ====================================================================== */}
      <section className="py-20 lg:py-28 border-b border-[#E5E7EB] bg-white">
        <Scroll3DSection className="max-w-[1320px] mx-auto px-6 space-y-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono-tabular px-2.5 py-1 bg-[#F4F5F7] text-[#0A0A0E] font-bold tracking-wider">
                TECHNICAL FAQ
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#0A0A0E]">
                Questions on {service.title}?
              </h2>
              <p className="text-sm text-[#52525B]">
                Everything answered upfront regarding file compatibility, turnarounds, revisions, and production requirements.
              </p>
            </div>

            <div className="lg:col-span-7 divide-y divide-[#E5E7EB] border-t border-b border-[#E5E7EB]">
              {service.faqs.map((faq, index) => {
                const isOpen = activeFaq === index.toString();
                return (
                  <div key={faq.question} className="py-6">
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? '' : index.toString())}
                      className="w-full flex items-center justify-between gap-4 text-left cursor-pointer group"
                    >
                      <span className="text-base font-display font-bold text-[#0A0A0E] group-hover:text-black transition-colors">
                        {faq.question}
                      </span>
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
          9. EMBEDDED COMMISSION INQUIRY FORM
      ====================================================================== */}
      <section className="py-20 lg:py-28 bg-[#F9FAFB]">
        <Scroll3DSection className="max-w-[1320px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono-tabular px-2.5 py-1 bg-[#E5E7EB] text-[#0A0A0E] font-bold tracking-wider">
                <Send className="w-3.5 h-3.5" />
                <span>START COMMISSION</span>
              </div>

              <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-[#0A0A0E] leading-tight">
                Ready to Commission <span className="bg-[#D4FF00] px-2 py-0.5 inline-block text-[#0A0A0E]">{service.title}?</span>
              </h2>

              <p className="text-base text-[#52525B] leading-relaxed">
                Send us your CAD files, sketches, or reference brief. Our Technical Directors will evaluate your geometry and respond with a binding fixed estimate within 4 business hours.
              </p>

              <div className="p-4 bg-white border border-[#E5E7EB] shadow-xs flex items-center justify-between gap-4 max-w-md text-xs font-mono-tabular">
                <div>
                  <span className="text-[#6B7280] block text-[10px]">DIRECT INQUIRIES</span>
                  <span className="font-bold text-[#0A0A0E] text-sm">studio@3dmodelingcompany.com</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 bg-[#0A0A0E] text-white font-bold text-xs cursor-pointer hover:bg-[#27272A] transition-colors"
                >
                  {copiedEmail ? 'Copied' : 'Copy'}
                </button>
              </div>

              <div className="space-y-2 text-xs font-mono-tabular text-[#52525B]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span>Mutual NDA executed prior to file inspection</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span>100% intellectual property commercial transfer</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-6 bg-white border border-[#E5E7EB] shadow-lg p-8 sm:p-10 space-y-5">
              {formSubmitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-14 h-14 bg-[#0A0A0E] text-[#D4FF00] flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-[#0A0A0E]">
                    Brief Received
                  </h3>
                  <p className="text-sm text-[#52525B] max-w-md mx-auto">
                    Thank you, {formName}. We have received your inquiry for {service.title} and will respond to {formEmail} within 4 business hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormSubmitted(false)}
                    className="py-2.5 px-5 bg-[#0A0A0E] text-white hover:bg-[#27272A] text-xs font-bold transition-colors cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>
                  <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                    <h3 className="text-lg font-display font-bold text-[#0A0A0E]">
                      Commission Quote Form
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
                        placeholder="Sarah Jenkins"
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

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#4B5563]">Company / Brand</label>
                    <input
                      type="text"
                      value={formCompany}
                      onChange={(e) => setFormCompany(e.target.value)}
                      placeholder="Company Name"
                      className="w-full px-3.5 py-2.5 bg-[#F9FAFB] border border-[#D1D5DB] text-[#0A0A0E] text-xs focus:outline-none focus:border-[#0A0A0E] focus:bg-white rounded-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#4B5563]">Selected Service</label>
                    <input
                      type="text"
                      readOnly
                      value={service.title}
                      className="w-full px-3.5 py-2.5 bg-[#F4F5F7] border border-[#E5E7EB] text-[#0A0A0E] font-bold text-xs rounded-none cursor-not-allowed"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#4B5563]">Project Scope & CAD Details *</label>
                    <textarea
                      rows={3}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#F9FAFB] border border-[#D1D5DB] text-[#0A0A0E] text-xs focus:outline-none focus:border-[#0A0A0E] focus:bg-white rounded-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 bg-[#0A0A0E] hover:bg-[#27272A] text-white font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                  >
                    <span>Submit {service.number} Commission Request</span>
                    <ArrowRight className="w-4 h-4 text-[#D4FF00]" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </Scroll3DSection>
      </section>

      {/* =====================================================================
          10. EXPLORE OTHER SERVICES (Carousel / Bottom Links)
      ====================================================================== */}
      <section className="py-16 border-t border-[#E5E7EB] bg-white">
        <div className="max-w-[1320px] mx-auto px-6 space-y-8">
          <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
            <span className="text-xs font-mono-tabular text-[#6B7280] font-bold uppercase">
              EXPLORE ALL 3D SERVICES
            </span>
            <button
              type="button"
              onClick={() => onNavigatePage('services')}
              className="text-xs font-mono-tabular text-[#0A0A0E] font-bold hover:underline"
            >
              View Full Services Directory →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DETAILED_SERVICES.filter((s) => s.id !== service.id).map((other) => (
              <button
                key={other.id}
                type="button"
                onClick={() => onSelectService(other.id)}
                className="p-6 bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[#0A0A0E] transition-all text-left flex flex-col justify-between space-y-4 group cursor-pointer shadow-2xs"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono-tabular">
                    <span className="px-2 py-0.5 bg-[#0A0A0E] text-white font-bold">
                      {other.number}
                    </span>
                    <span className="text-[#6B7280]">{other.leadTime}</span>
                  </div>
                  <h3 className="text-lg font-display font-bold text-[#0A0A0E] group-hover:text-black transition-colors">
                    {other.title}
                  </h3>
                  <p className="text-xs text-[#52525B] line-clamp-2">
                    {other.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-xs font-mono-tabular text-[#0A0A0E] font-bold">
                  <span>View Single Service Page</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Toast Notification when Client Link is copied */}
      {copiedLink && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0A0A0E] text-white px-5 py-3 border border-[#D4FF00] shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <CheckCircle2 className="w-4 h-4 text-[#D4FF00] shrink-0" />
          <div className="text-xs font-mono-tabular">
            <span className="font-bold text-[#D4FF00]">Link Copied:</span>{' '}
            <span className="text-[#E2E8F0] select-all">{getFullShareableUrl('service-detail', service.id)}</span>
          </div>
        </div>
      )}
    </div>
  );
};
