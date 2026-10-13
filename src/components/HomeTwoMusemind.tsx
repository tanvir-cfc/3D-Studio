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
  Layout,
  Smartphone,
  Layers,
  Search,
  Compass,
  Cpu,
  TrendingUp,
  X,
  ExternalLink,
  Shield,
  Activity,
  Code2,
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

interface HomeTwoMusemindProps {
  onNavigatePage: (page: string) => void;
  onSelectProject?: (project: any) => void;
  onSelectModel?: (presetId: any) => void;
}

export const HomeTwoMusemind: React.FC<HomeTwoMusemindProps> = ({
  onNavigatePage,
}) => {
  const [activeFaq, setActiveFaq] = useState<string>('faq-1');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [boonActiveTab, setBoonActiveTab] = useState<'dashboard' | 'referrals' | 'analytics'>('dashboard');

  // Proposal inquiry form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formService, setFormService] = useState('UI/UX Product Design (SaaS & Web)');
  const [formBudget, setFormBudget] = useState('$10,000 – $25,000');
  const [formMessage, setFormMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hello@musemind.agency');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formMessage.trim()) {
      setFormError('Please fill in your name, work email, and project scope.');
      return;
    }
    setFormError('');
    setFormSubmitted(true);
  };

  return (
    <div className="bg-[#FFFFFF] text-[#0A0A0E] selection:bg-[#D4FF00] selection:text-[#0A0A0E] transition-colors duration-150">
      {/* =====================================================================
          1. TOP HERO SECTION:
          Left: Monumental Musemind Headline & Direct CTAs
          Right: Frosted Glass Effect Video Showreel Player (HeroGlassVideo)
      ====================================================================== */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-[#E5E7EB] bg-white overflow-hidden">
        {/* Subtle ambient light glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[380px] bg-[#D4FF00]/12 blur-[140px] pointer-events-none rounded-none" />

        <div className="max-w-[1320px] mx-auto px-6 relative z-10 space-y-12">
          {/* Top Status & Accreditation Badges */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-[#F4F5F7] border border-[#E5E7EB] text-xs font-mono-tabular shadow-2xs">
              <span className="w-2 h-2 bg-[#10B981] animate-pulse inline-block" />
              <span className="text-[#0A0A0E] font-bold">DIGITAL PRODUCT DESIGN & CONSULTING AGENCY</span>
              <span className="text-[#D1D5DB]">/</span>
              <span className="text-[#4B5563]">NEW YORK · LONDON · GLOBAL HUB</span>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono-tabular text-[#4B5563]">
              <div className="flex text-[#F59E0B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-[#0A0A0E] font-bold">4.9/5 RATED ON CLUTCH</span>
              <span className="text-[#D1D5DB]">·</span>
              <span className="font-medium">TOP 1% GLOBAL STUDIO</span>
            </div>
          </div>

          {/* Hero Grid: Left Content + Right Floating Glass Effect Video */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-extrabold tracking-tight text-[#0A0A0E] leading-[0.98]">
                Transforming Ideas into <span className="bg-[#D4FF00] px-2.5 py-0.5 inline-block text-[#0A0A0E]">Digital Products</span> That Drive Real Growth.
              </h1>

              <p className="text-base sm:text-lg text-[#52525B] leading-relaxed max-w-2xl">
                We partner with ambitious startups and global enterprises to craft intuitive
                UI/UX, scalable design systems, and digital experiences that captivate users and
                boost revenue.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigatePage('contact')}
                  className="py-3.5 px-6 bg-[#0A0A0E] hover:bg-[#27272A] text-white font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-colors cursor-pointer shadow-md hover:shadow-lg"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="w-4 h-4 text-[#D4FF00]" />
                </button>
                <a
                  href="#boon-section"
                  className="py-3.5 px-5 bg-white hover:bg-[#F4F5F7] text-[#0A0A0E] border border-[#E5E7EB] font-bold text-xs inline-flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <Eye className="w-4 h-4 text-[#0A0A0E]" />
                  <span>Explore Selected Work</span>
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
                Trusted By 350+ Global Brands
              </h2>
            </div>
            <span className="text-xs font-mono-tabular text-[#6B7280]">
              SILICON VALLEY · EUROPE · MIDDLE EAST · ASIA PACIFIC
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
              <span>END-TO-END PRODUCT PARTNERSHIP</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#0A0A0E] leading-tight">
              One Partner. From Strategy to Scale.
            </h2>

            <p className="text-base sm:text-lg text-[#52525B] leading-relaxed max-w-2xl mx-auto">
              We bring strategy, research, design, and development together to solve business
              problems and help validate ideas, improve existing products, and build scalable digital technology.
            </p>
          </div>

          {/* 4 Foundation Pillars under Strategy to Scale */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#F9FAFB] border border-[#E5E7EB] space-y-3 hover:border-[#0A0A0E] transition-colors shadow-2xs">
              <div className="text-xs font-mono-tabular text-[#0A0A0E] font-bold">01 / STRATEGY</div>
              <h3 className="text-lg font-display font-bold text-[#0A0A0E]">Validate & Blueprint</h3>
              <p className="text-xs text-[#52525B] leading-relaxed">
                Market benchmarking, persona mapping, and value proposition definition to build what users actually want.
              </p>
            </div>

            <div className="p-6 bg-[#F9FAFB] border border-[#E5E7EB] space-y-3 hover:border-[#0A0A0E] transition-colors shadow-2xs">
              <div className="text-xs font-mono-tabular text-[#0A0A0E] font-bold">02 / EXPERIENCE</div>
              <h3 className="text-lg font-display font-bold text-[#0A0A0E]">Human-Centered UX</h3>
              <p className="text-xs text-[#52525B] leading-relaxed">
                Cognitive flow optimization, wireframing, and interactive prototypes that turn complex software into joy.
              </p>
            </div>

            <div className="p-6 bg-[#F9FAFB] border border-[#E5E7EB] space-y-3 hover:border-[#0A0A0E] transition-colors shadow-2xs">
              <div className="text-xs font-mono-tabular text-[#0A0A0E] font-bold">03 / TECHNOLOGY</div>
              <h3 className="text-lg font-display font-bold text-[#0A0A0E]">Tokenized Systems</h3>
              <p className="text-xs text-[#52525B] leading-relaxed">
                Figma variables, design tokens, and clean developer handoff so engineers ship at 3x velocity.
              </p>
            </div>

            <div className="p-6 bg-[#F9FAFB] border border-[#E5E7EB] space-y-3 hover:border-[#0A0A0E] transition-colors shadow-2xs">
              <div className="text-xs font-mono-tabular text-[#0A0A0E] font-bold">04 / SCALE</div>
              <h3 className="text-lg font-display font-bold text-[#0A0A0E]">Continuous Growth</h3>
              <p className="text-xs text-[#52525B] leading-relaxed">
                Conversion audits, A/B testing variations, and feature expansions to scale ARR and enterprise retention.
              </p>
            </div>
          </div>

          {/* Dashboard Image with 3D Perspective Scroll-Expand Effect (Musemind Signature) */}
          <div className="pt-8">
            <div className="border-t border-[#E5E7EB] pt-12 text-center space-y-3 pb-6">
              <span className="text-xs font-mono-tabular text-[#6B7280] uppercase tracking-wider font-bold">
                SCROLL-REACTIVE PRODUCT SHOWCASE · 3D PERSPECTIVE ZOOM
              </span>
            </div>

            <ScrollExpand3DContainer>
              <div className="border border-[#E5E7EB] bg-[#F4F5F7] p-4 sm:p-8 shadow-2xl overflow-hidden">
                <div className="bg-white border border-[#E5E7EB] shadow-lg overflow-hidden">
                  {/* Dashboard Header Bar */}
                  <div className="px-5 py-3.5 bg-[#F9FAFB] border-b border-[#E5E7EB] flex items-center justify-between text-xs font-mono-tabular">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                      </div>
                      <span className="font-bold text-[#0A0A0E]">MUSEMIND ENTERPRISE SAAS SYSTEM · V4.2</span>
                    </div>
                    <div className="flex items-center gap-3 text-[#6B7280]">
                      <span className="hidden sm:inline">LIVE TELEMETRY</span>
                      <span className="px-2 py-0.5 bg-[#D4FF00] text-[#0A0A0E] font-bold">ACTIVE</span>
                    </div>
                  </div>

                  {/* High-Fidelity SaaS Dashboard Graphic */}
                  <div className="p-6 sm:p-10 space-y-8 bg-white">
                    {/* Top Stat Gauges */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="p-5 bg-[#F9FAFB] border border-[#E5E7EB] space-y-1">
                        <span className="text-[11px] font-mono-tabular text-[#6B7280]">ACTIVE USERS</span>
                        <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#0A0A0E]">2,845,910</div>
                        <span className="text-xs text-emerald-600 font-bold inline-flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5" /> +28.4% this quarter
                        </span>
                      </div>
                      <div className="p-5 bg-[#F9FAFB] border border-[#E5E7EB] space-y-1">
                        <span className="text-[11px] font-mono-tabular text-[#6B7280]">ONBOARDING COMPLETION</span>
                        <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#0A0A0E]">94.8%</div>
                        <span className="text-xs text-emerald-600 font-bold inline-flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5" /> +16.2% post-redesign
                        </span>
                      </div>
                      <div className="p-5 bg-[#F9FAFB] border border-[#E5E7EB] space-y-1">
                        <span className="text-[11px] font-mono-tabular text-[#6B7280]">SYSTEM VELOCITY</span>
                        <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#0A0A0E]">3.4x Faster</div>
                        <span className="text-xs text-[#0A0A0E] font-mono-tabular">Figma to React Token Sync</span>
                      </div>
                    </div>

                    {/* Interactive Vector Analytics Graph + Dashboard Preview */}
                    <div className="border border-[#E5E7EB] bg-[#FAFAFA] p-6 space-y-6">
                      <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB] text-xs font-mono-tabular">
                        <span className="font-bold text-[#0A0A0E]">MONTHLY CONVERSION & ARR VELOCITY</span>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold">Q1-Q4 RECORD</span>
                          <span className="text-[#6B7280]">$12.4M ARR</span>
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
                          <span>Sarah (Product Lead) inspecting retention funnel</span>
                        </div>
                      </div>
                    </div>

                    {/* Dashboard Visual Mockup Image */}
                    <div className="aspect-16/9 sm:aspect-21/9 w-full bg-[#F3F4F6] border border-[#E5E7EB] overflow-hidden relative">
                      <img
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80"
                        alt="Musemind SaaS Enterprise Dashboard Interface"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                        <span className="px-3 py-1.5 bg-white text-[#0A0A0E] font-mono-tabular font-bold text-xs shadow-md border border-[#E5E7EB]">
                          INTELLIGENT RECRUITING & ANALYTICS PIPELINE
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
          4. "Boon - Web Application Design" FEATURED SECTION
      ====================================================================== */}
      <section id="boon-section" className="py-24 lg:py-32 border-b border-[#E5E7EB] bg-[#F9FAFB]">
        <Scroll3DSection className="max-w-[1320px] mx-auto px-6 space-y-14">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E5E7EB]">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono-tabular px-2.5 py-1 bg-[#0A0A0E] text-white font-bold tracking-wider">
                FEATURED WORK · SAAS PLATFORM
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#0A0A0E] leading-tight">
                Boon — Web Application Design
              </h2>
            </div>
            <div className="text-xs font-mono-tabular text-[#6B7280] max-w-sm">
              MODERN & MINIMAL DESIGN SOLUTION FOR JOB REFERRALS AND APPLICANT TRACKING
            </div>
          </div>

          {/* Boon Showcase Card */}
          <div className="border border-[#E5E7EB] bg-white shadow-xl grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
            {/* Left Narrative */}
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-8 border-b lg:border-b-0 lg:border-r border-[#E5E7EB]">
              <div className="space-y-6">
                <div className="flex items-center justify-between text-xs font-mono-tabular">
                  <span className="px-2.5 py-1 bg-[#D4FF00] text-[#0A0A0E] font-bold">
                    B2B SAAS
                  </span>
                  <span className="text-[#6B7280]">SAN FRANCISCO, CA</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#0A0A0E] leading-tight">
                  Reinventing Employee Referrals with Gamified Simplicity.
                </h3>

                <p className="text-sm text-[#52525B] leading-relaxed">
                  Boon is a talent acquisition SaaS that automates referral tracking and incentive rewards.
                  Musemind conducted comprehensive user research to redesign their core dashboard,
                  introducing a clean 2-step referral flow and real-time bounty leaderboards.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E5E7EB] text-xs font-mono-tabular">
                  <div>
                    <span className="text-[#9CA3AF] block font-semibold">SCOPE</span>
                    <span className="text-[#0A0A0E] font-bold">Product UX, UI & Design System</span>
                  </div>
                  <div>
                    <span className="text-[#9CA3AF] block font-semibold">OUTCOME</span>
                    <span className="text-[#0A0A0E] font-bold">+142% Candidate Submissions</span>
                  </div>
                </div>

                {/* Interactive Screen Tabs */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-mono-tabular text-[#6B7280] block font-bold">
                    PREVIEW INTERFACE SCREEN:
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setBoonActiveTab('dashboard')}
                      className={`px-3 py-1.5 text-xs font-mono-tabular font-bold border transition-colors cursor-pointer ${
                        boonActiveTab === 'dashboard'
                          ? 'bg-[#0A0A0E] text-white border-[#0A0A0E]'
                          : 'bg-white text-[#4B5563] border-[#E5E7EB] hover:bg-[#F4F5F7]'
                      }`}
                    >
                      Bounty Dashboard
                    </button>
                    <button
                      type="button"
                      onClick={() => setBoonActiveTab('referrals')}
                      className={`px-3 py-1.5 text-xs font-mono-tabular font-bold border transition-colors cursor-pointer ${
                        boonActiveTab === 'referrals'
                          ? 'bg-[#0A0A0E] text-white border-[#0A0A0E]'
                          : 'bg-white text-[#4B5563] border-[#E5E7EB] hover:bg-[#F4F5F7]'
                      }`}
                    >
                      Referral Pipeline
                    </button>
                    <button
                      type="button"
                      onClick={() => setBoonActiveTab('analytics')}
                      className={`px-3 py-1.5 text-xs font-mono-tabular font-bold border transition-colors cursor-pointer ${
                        boonActiveTab === 'analytics'
                          ? 'bg-[#0A0A0E] text-white border-[#0A0A0E]'
                          : 'bg-white text-[#4B5563] border-[#E5E7EB] hover:bg-[#F4F5F7]'
                      }`}
                    >
                      Talent Analytics
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#E5E7EB]">
                <div className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] space-y-1">
                  <div className="text-xs font-mono-tabular text-[#4B5563] font-bold uppercase">
                    Verified Client Impact:
                  </div>
                  <div className="text-sm font-bold text-[#0A0A0E]">
                    Reduced referral submission time from 14 minutes down to 3 minutes across 50,000+ recruiters.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCaseStudy('boon')}
                  className="w-full py-3 px-4 bg-[#0A0A0E] hover:bg-[#27272A] text-white text-xs font-bold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <span>Explore Boon Full Case Study</span>
                  <ArrowUpRight className="w-4 h-4 text-[#D4FF00]" />
                </button>
              </div>
            </div>

            {/* Right Multi-Image Showcase */}
            <div className="lg:col-span-7 bg-[#F4F5F7] p-6 sm:p-10 flex items-center justify-center">
              <div className="w-full space-y-4">
                <div className="aspect-16/9 w-full bg-white border border-[#E5E7EB] shadow-md overflow-hidden relative">
                  <img
                    src={
                      boonActiveTab === 'dashboard'
                        ? 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80'
                        : boonActiveTab === 'referrals'
                        ? 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80'
                        : 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1400&q=80'
                    }
                    alt="Boon Web Application Design Interface"
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />
                  <div className="absolute bottom-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-md border border-[#E5E7EB] text-[11px] font-mono-tabular font-bold text-[#0A0A0E]">
                    {boonActiveTab.toUpperCase()} VIEW · FIGMA TO REACT TOKEN SYNC
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-4/3 bg-white border border-[#E5E7EB] shadow-2xs overflow-hidden relative group">
                    <img
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
                      alt="Boon Candidate Referral Pipeline"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold font-mono-tabular">
                      CANDIDATE FUNNEL
                    </div>
                  </div>
                  <div className="aspect-4/3 bg-white border border-[#E5E7EB] shadow-2xs overflow-hidden relative group">
                    <img
                      src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80"
                      alt="Boon Referral Analytics Overview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold font-mono-tabular">
                      METRIC LEADERBOARD
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Scroll3DSection>
      </section>

      {/* =====================================================================
          5. "Panther" CYBERSECURITY SECTION
      ====================================================================== */}
      <section className="py-24 lg:py-32 border-b border-[#E5E7EB] bg-white">
        <Scroll3DSection className="max-w-[1320px] mx-auto px-6 space-y-14">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E5E7EB]">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono-tabular px-2.5 py-1 bg-[#0A0A0E] text-white font-bold tracking-wider">
                FEATURED WORK · CYBERSECURITY PLATFORM
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#0A0A0E] leading-tight">
                Panther — Cybersecurity Platform & Web Redesign
              </h2>
            </div>
            <div className="text-xs font-mono-tabular text-[#6B7280] max-w-sm">
              SIMPLIFYING COMPLEX REAL-TIME DETECTION TELEMETRY & BRAND REFRESH
            </div>
          </div>

          {/* Panther Showcase Card */}
          <div className="border border-[#E5E7EB] bg-[#0A0A0E] text-white shadow-2xl grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
            {/* Left Narrative (High-Tech Contrast) */}
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-8 border-b lg:border-b-0 lg:border-r border-white/10">
              <div className="space-y-6">
                <div className="flex items-center justify-between text-xs font-mono-tabular">
                  <span className="px-2.5 py-1 bg-[#D4FF00] text-[#0A0A0E] font-bold">
                    SECURITY TECH
                  </span>
                  <span className="text-[#9CA3AF]">AUSTIN, TX</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white leading-tight">
                  Turning Massive Security Data Lakes into Real-Time Threat Clarity.
                </h3>

                <p className="text-sm text-[#9CA3AF] leading-relaxed">
                  Panther provides cloud-scale SIEM and automated incident response. Musemind
                  executed a comprehensive brand refresh and website redesign, simplifying developer
                  perception and positioning Panther as the leading security operations platform.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs font-mono-tabular">
                  <div>
                    <span className="text-[#6B7280] block font-semibold">RESULTS</span>
                    <span className="text-[#D4FF00] font-bold">3.2x Enterprise Demos</span>
                  </div>
                  <div>
                    <span className="text-[#6B7280] block font-semibold">MILESTONE</span>
                    <span className="text-white font-bold">Accelerated Series B Funding</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="p-4 bg-white/5 border border-white/10 space-y-1">
                  <div className="text-xs font-mono-tabular text-[#D4FF00] font-bold uppercase">
                    Verified Outcome:
                  </div>
                  <div className="text-sm text-[#E2E8F0]">
                    Modernized developer messaging and accelerated Fortune 500 security team procurement inquiries.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCaseStudy('panther')}
                  className="w-full py-3 px-4 bg-white hover:bg-[#F4F5F7] text-[#0A0A0E] text-xs font-bold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
                >
                  <span>Explore Panther Full Case Study</span>
                  <ArrowUpRight className="w-4 h-4 text-[#0A0A0E]" />
                </button>
              </div>
            </div>

            {/* Right Panther Visual Image */}
            <div className="lg:col-span-7 bg-[#14141B] p-6 sm:p-10 flex items-center justify-center">
              <div className="w-full aspect-16/9 bg-[#070709] border border-white/15 overflow-hidden shadow-2xl relative">
                <img
                  src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=80"
                  alt="Panther Cybersecurity Platform Interface"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                  <span className="px-3 py-1 bg-[#0A0A0E] text-[#D4FF00] border border-white/20 font-mono-tabular font-bold text-xs">
                    REAL-TIME SIEM THREAT DETECTION CONSOLE
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
                Your growth partner, encouraging creativity and individual development while
                creating excellent user experiences in a fast-paced, collaborative atmosphere.
              </p>

              {/* Numbered Achievements List (From Musemind) */}
              <div className="divide-y divide-[#E5E7EB] border-t border-b border-[#E5E7EB] text-xs font-mono-tabular">
                <div className="py-3.5 flex items-center justify-between">
                  <span className="text-[#6B7280]">001. Total Awards</span>
                  <span className="font-extrabold text-[#0A0A0E] text-base">16+ Honors</span>
                </div>
                <div className="py-3.5 flex items-center justify-between">
                  <span className="text-[#6B7280]">002. Years of Services</span>
                  <span className="font-extrabold text-[#0A0A0E] text-base">5+ Years</span>
                </div>
                <div className="py-3.5 flex items-center justify-between">
                  <span className="text-[#6B7280]">003. Locations</span>
                  <span className="font-extrabold text-[#0A0A0E] text-base">6 Global Hubs</span>
                </div>
                <div className="py-3.5 flex items-center justify-between">
                  <span className="text-[#6B7280]">004. Team Members</span>
                  <span className="font-extrabold text-[#0A0A0E] text-base">80+ Specialists</span>
                </div>
                <div className="py-3.5 flex items-center justify-between">
                  <span className="text-[#6B7280]">005. Happy Clients</span>
                  <span className="font-extrabold text-[#0A0A0E] text-base">350+ Worldwide</span>
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
                <span className="font-bold text-[#0A0A0E]">MUSEMIND 3D LAB</span>
              </div>
            </div>
          </div>
        </Scroll3DSection>
      </section>

      {/* =====================================================================
          7. "End-to-End Digital Capabilities"
      ====================================================================== */}
      <section className="py-24 lg:py-32 border-b border-[#E5E7EB] bg-white">
        <Scroll3DSection className="max-w-[1320px] mx-auto px-6 space-y-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E5E7EB]">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono-tabular px-2.5 py-1 bg-[#F4F5F7] text-[#0A0A0E] font-bold tracking-wider mb-2">
                CORE EXPERTISE
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#0A0A0E] leading-tight">
                End-to-End Digital Capabilities.
              </h2>
            </div>
            <p className="text-sm text-[#52525B] max-w-md leading-relaxed">
              From product thinking and experience design to development and launch, our specialists
              work together to advance digital products.
            </p>
          </div>

          {/* 6 Capabilities Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MUSEMIND_SERVICES.map((item, idx) => (
              <div
                key={item.title}
                className="p-8 bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[#0A0A0E] transition-all flex flex-col justify-between space-y-6 shadow-2xs group"
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
                  <span className="text-[#6B7280]">Figma & Code Ready</span>
                  <span className="p-2 bg-white group-hover:bg-[#0A0A0E] text-[#0A0A0E] group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
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
                TEAM & CULTURE
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#0A0A0E] leading-tight">
                Built by Specialists. Connected by One Goal.
              </h2>
            </div>
            <p className="text-sm text-[#52525B] max-w-md leading-relaxed">
              We are a global multidisciplinary studio where UX researchers, visual craftsmen, and
              front-end developers collaborate seamlessly from ideation to production.
            </p>
          </div>

          {/* Specialist Units Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 bg-white border border-[#E5E7EB] space-y-4 shadow-2xs hover:border-[#0A0A0E] transition-colors">
              <div className="w-10 h-10 bg-[#0A0A0E] text-white flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="text-lg font-display font-bold text-[#0A0A0E]">Product Thinkers</h3>
              <p className="text-xs text-[#52525B] leading-relaxed">
                Strategists who map user psychology, business models, and market gaps to establish high-converting product architectures.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#E5E7EB] space-y-4 shadow-2xs hover:border-[#0A0A0E] transition-colors">
              <div className="w-10 h-10 bg-[#0A0A0E] text-white flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="text-lg font-display font-bold text-[#0A0A0E]">UI/UX Craftsmen</h3>
              <p className="text-xs text-[#52525B] leading-relaxed">
                Designers obsessed with typography hierarchy, micro-interactions, responsive states, and human-computer ergonomics.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#E5E7EB] space-y-4 shadow-2xs hover:border-[#0A0A0E] transition-colors">
              <div className="w-10 h-10 bg-[#0A0A0E] text-white flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="text-lg font-display font-bold text-[#0A0A0E]">Token Architects</h3>
              <p className="text-xs text-[#52525B] leading-relaxed">
                Specialists building robust, multi-brand design systems in Figma and code tokens that bridge design and development.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#E5E7EB] space-y-4 shadow-2xs hover:border-[#0A0A0E] transition-colors">
              <div className="w-10 h-10 bg-[#0A0A0E] text-white flex items-center justify-center font-bold">
                04
              </div>
              <h3 className="text-lg font-display font-bold text-[#0A0A0E]">Front-End Engineers</h3>
              <p className="text-xs text-[#52525B] leading-relaxed">
                Creative developers implementing Webflow CMS, React, Next.js, and Three.js with buttery 60fps performance.
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
                FAQ
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#0A0A0E]">
                Frequently Asked Questions.
              </h2>
              <p className="text-sm text-[#52525B] leading-relaxed">
                Have specific questions regarding sprint durations, Figma file deliverables, or
                pricing models? Everything answered upfront.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => onNavigatePage('contact')}
                  className="py-3 px-6 bg-[#0A0A0E] hover:bg-[#27272A] text-white font-bold text-xs inline-flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
                >
                  <span>Ask a Specific Question</span>
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
          10. HIGH-IMPACT FINAL CTA: "Have a Project in Mind? Let's Build It."
      ====================================================================== */}
      <section className="py-24 lg:py-32 bg-[#F9FAFB] text-[#0A0A0E]">
        <Scroll3DSection className="max-w-[1320px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-6 space-y-8">
              <div className="inline-flex items-center gap-2 text-xs font-mono-tabular px-2.5 py-1 bg-[#E5E7EB] text-[#0A0A0E] font-bold tracking-wider">
                <Send className="w-3.5 h-3.5" />
                <span>START A CONVERSATION</span>
              </div>

              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-[#0A0A0E] leading-[0.98]">
                Have a Project in Mind? Let’s <span className="bg-[#D4FF00] px-2.5 py-0.5 inline-block text-[#0A0A0E]">Build It.</span>
              </h2>

              <p className="text-base sm:text-lg text-[#52525B] leading-relaxed max-w-xl">
                Ready to accelerate your product roadmap with award-winning UI/UX? Send us your brief
                and we will prepare a detailed proposal and sprint breakdown within 24 hours.
              </p>

              {/* Direct Email Copy Box */}
              <div className="p-4 bg-white border border-[#E5E7EB] shadow-sm flex items-center justify-between gap-4 max-w-md">
                <div>
                  <div className="text-[10px] font-mono-tabular text-[#6B7280] font-semibold">DIRECT INQUIRIES</div>
                  <div className="text-sm font-mono-tabular text-[#0A0A0E] font-bold">
                    hello@musemind.agency
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
                  <span>Mutual NDA signed before initial discovery calls</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span>Transparent fixed-price milestone quotes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span>Direct Slack access to Senior Design Directors</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E7EB] text-xs text-[#6B7280] space-y-1">
                <div><strong>US Headquarters:</strong> New York, NY · <strong>European Studio:</strong> London, UK</div>
                <div><strong>Global Delivery Hub:</strong> Singapore & International Studio</div>
              </div>
            </div>

            {/* Embedded Clean White Brief Form */}
            <div className="lg:col-span-6 bg-white border border-[#E5E7EB] shadow-lg p-8 sm:p-12 space-y-5">
              {formSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 bg-[#0A0A0E] text-[#D4FF00] flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-[#0A0A0E]">
                    Project Inquiry Received
                  </h3>
                  <p className="text-sm text-[#52525B] max-w-md mx-auto">
                    Thank you, {formName}. Our product strategy leads have received your{' '}
                    {formService} inquiry and will respond to {formEmail} within 4 business hours.
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
                      Request Product Proposal
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
                      <label className="text-xs font-medium text-[#4B5563]">Company / Startup</label>
                      <input
                        type="text"
                        value={formCompany}
                        onChange={(e) => setFormCompany(e.target.value)}
                        placeholder="Company Name"
                        className="w-full px-3.5 py-2.5 bg-[#F9FAFB] border border-[#D1D5DB] text-[#0A0A0E] text-xs focus:outline-none focus:border-[#0A0A0E] focus:bg-white rounded-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-[#4B5563]">Primary Service</label>
                      <select
                        value={formService}
                        onChange={(e) => setFormService(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#F9FAFB] border border-[#D1D5DB] text-[#0A0A0E] text-xs focus:outline-none focus:border-[#0A0A0E] focus:bg-white rounded-none"
                      >
                        <option>UI/UX Product Design (SaaS & Web)</option>
                        <option>Mobile App Design (iOS & Android)</option>
                        <option>UX Research & Usability Audit</option>
                        <option>Design Systems & Token Architecture</option>
                        <option>Web Design & Webflow Development</option>
                        <option>Brand Identity & Strategic Positioning</option>
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
                      <option>$5,000 – $10,000 (Targeted Feature Sprint / UX Audit)</option>
                      <option>$10,000 – $25,000 (Complete Mobile App or Web MVP)</option>
                      <option>$25,000 – $50,000 (Full SaaS Platform + Design System)</option>
                      <option>$50,000+ (Enterprise Digital Transformation / Ongoing Sprint)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#4B5563]">Project Scope & Goals *</label>
                    <textarea
                      rows={3}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="Tell us about your product, current stage (Idea, MVP, Scaling), timeline goals, and desired deliverables..."
                      className="w-full px-3.5 py-2.5 bg-[#F9FAFB] border border-[#D1D5DB] text-[#0A0A0E] text-xs focus:outline-none focus:border-[#0A0A0E] focus:bg-white rounded-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 bg-[#0A0A0E] hover:bg-[#27272A] text-white font-bold text-xs uppercase tracking-wider transition-colors rounded-none flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg"
                  >
                    <span>Submit Project Brief</span>
                    <ArrowRight className="w-4 h-4 text-[#D4FF00]" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </Scroll3DSection>
      </section>

      {/* =====================================================================
          CASE STUDY MODAL (Interactive detail view for Boon or Panther)
      ====================================================================== */}
      {selectedCaseStudy && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white border border-[#E5E7EB] shadow-2xl max-w-3xl w-full p-6 sm:p-10 space-y-6 relative my-8">
            <button
              type="button"
              onClick={() => setSelectedCaseStudy(null)}
              className="absolute top-6 right-6 p-2 bg-[#F4F5F7] hover:bg-[#E5E7EB] text-[#0A0A0E] cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {selectedCaseStudy === 'boon' ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="px-2.5 py-1 bg-[#D4FF00] text-[#0A0A0E] font-bold text-xs font-mono-tabular">
                    B2B SAAS CASE STUDY
                  </span>
                  <h3 className="text-3xl font-display font-extrabold text-[#0A0A0E]">
                    Boon — Web Application Design & Referral Tracking
                  </h3>
                  <p className="text-sm text-[#52525B]">
                    Transforming complex candidate recruitment into an effortless 2-click referral system.
                  </p>
                </div>

                <div className="aspect-16/9 w-full bg-[#F4F5F7] border border-[#E5E7EB] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
                    alt="Boon Case Study Overview"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 p-4 bg-[#F9FAFB] border border-[#E5E7EB] text-xs font-mono-tabular">
                  <div>
                    <span className="text-[#6B7280] block">CANDIDATE LIFT</span>
                    <span className="font-extrabold text-base text-[#0A0A0E]">+142%</span>
                  </div>
                  <div>
                    <span className="text-[#6B7280] block">TIME TO SUBMIT</span>
                    <span className="font-extrabold text-base text-[#0A0A0E]">3 Minutes</span>
                  </div>
                  <div>
                    <span className="text-[#6B7280] block">VENTURE ROUND</span>
                    <span className="font-extrabold text-base text-[#0A0A0E]">$14M Series A</span>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-[#52525B] leading-relaxed">
                  <h4 className="font-display font-bold text-base text-[#0A0A0E]">Key Deliverables:</h4>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>End-to-end recruitment manager and employee dashboard wireframing in Figma</li>
                    <li>Tokenized design system with light/dark contrast specs and WCAG compliance</li>
                    <li>Gamified bounty leaderboards and instant Slack notification integrations</li>
                    <li>Full developer handoff with React component specifications</li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCaseStudy(null);
                      onNavigatePage('contact');
                    }}
                    className="py-3 px-6 bg-[#0A0A0E] text-white font-bold text-xs inline-flex items-center gap-2 cursor-pointer hover:bg-[#27272A]"
                  >
                    <span>Request Similar SaaS Project</span>
                    <ArrowRight className="w-4 h-4 text-[#D4FF00]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCaseStudy(null)}
                    className="text-xs text-[#6B7280] hover:text-[#0A0A0E] cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="px-2.5 py-1 bg-[#0A0A0E] text-[#D4FF00] font-bold text-xs font-mono-tabular">
                    SECURITY TECH CASE STUDY
                  </span>
                  <h3 className="text-3xl font-display font-extrabold text-[#0A0A0E]">
                    Panther — Enterprise SIEM Platform & Brand Refresh
                  </h3>
                  <p className="text-sm text-[#52525B]">
                    Simplifying petabyte-scale security log analysis for Fortune 500 SecOps teams.
                  </p>
                </div>

                <div className="aspect-16/9 w-full bg-[#111116] border border-[#E5E7EB] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80"
                    alt="Panther Case Study Overview"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 p-4 bg-[#F9FAFB] border border-[#E5E7EB] text-xs font-mono-tabular">
                  <div>
                    <span className="text-[#6B7280] block">DEMO CONVERSIONS</span>
                    <span className="font-extrabold text-base text-[#0A0A0E]">3.2x Lift</span>
                  </div>
                  <div>
                    <span className="text-[#6B7280] block">TRIAGE VELOCITY</span>
                    <span className="font-extrabold text-base text-[#0A0A0E]">65% Faster</span>
                  </div>
                  <div>
                    <span className="text-[#6B7280] block">FUNDING ROUND</span>
                    <span className="font-extrabold text-base text-[#0A0A0E]">$120M Raised</span>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-[#52525B] leading-relaxed">
                  <h4 className="font-display font-bold text-base text-[#0A0A0E]">Key Deliverables:</h4>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Full developer portal and marketing site redesign optimized for security engineers</li>
                    <li>Interactive live log telemetry visualization and query builder UI</li>
                    <li>Re-architected brand identity and multi-platform design tokens</li>
                    <li>Technical sales collateral and enterprise product showreel</li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCaseStudy(null);
                      onNavigatePage('contact');
                    }}
                    className="py-3 px-6 bg-[#0A0A0E] text-white font-bold text-xs inline-flex items-center gap-2 cursor-pointer hover:bg-[#27272A]"
                  >
                    <span>Request Security Platform Project</span>
                    <ArrowRight className="w-4 h-4 text-[#D4FF00]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCaseStudy(null)}
                    className="text-xs text-[#6B7280] hover:text-[#0A0A0E] cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
