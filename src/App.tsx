/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Plus,
  Minus,
  CheckCircle2,
  Eye,
  Sun,
  Moon,
  Box,
  Layers,
} from 'lucide-react';
import {
  PORTFOLIO_ITEMS,
  SERVICES,
  PROCESS_STEPS,
  FAQS,
  CLIENT_BRANDS,
  PortfolioItem,
} from './data/studioData';
import { BrandLogo } from './components/BrandLogo';
import { RenderInspector } from './components/RenderInspector';
import {
  Interactive3DModelViewer,
  MODEL_PRESETS,
  ModelPresetId,
} from './components/Interactive3DModelViewer';
import { QuoteCalculator, QuoteConfiguration } from './components/QuoteCalculator';
import { ProjectLightboxModal } from './components/ProjectLightboxModal';

export type PageId = 'home' | 'services' | 'models' | 'portfolio' | 'estimator' | 'contact';

export default function App() {
  // Default to Light theme ('light'), switchable to Dark ('dark')
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Multi-Page Navigation State (Separate dedicated pages)
  const [activePage, setActivePage] = useState<PageId>('home');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Scroll to top when changing pages
  const navigateToPage = (page: PageId) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Portfolio Category Filter State
  const [portfolioFilter, setPortfolioFilter] = useState<
    'all' | 'architectural' | 'product' | 'automotive' | 'industrial'
  >('all');

  // Selected 3D Model Preset in the 3D Studio Page
  const [selectedStudioModel, setSelectedStudioModel] = useState<ModelPresetId>('supercar');

  // Selected Project for Fullscreen Lightbox
  const [activeLightboxProject, setActiveLightboxProject] = useState<PortfolioItem | null>(null);

  // Active Process Step State
  const [activeProcessIndex, setActiveProcessIndex] = useState<number>(0);

  // Active FAQ Accordion State
  const [openFaqId, setOpenFaqId] = useState<string>('faq-1');

  // Lead Capture / Project Brief Form State
  const [formName, setFormName] = useState<string>('');
  const [formEmail, setFormEmail] = useState<string>('');
  const [formCompany, setFormCompany] = useState<string>('');
  const [formDiscipline, setFormDiscipline] = useState<string>('Architectural Visualization');
  const [formBudget, setFormBudget] = useState<string>('$2,500 – $5,000');
  const [formMessage, setFormMessage] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [attachedQuote, setAttachedQuote] = useState<QuoteConfiguration | null>(null);

  // Filtered Portfolio Items
  const filteredPortfolio =
    portfolioFilter === 'all'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === portfolioFilter);

  // Handle Quote Estimator -> Brief Form transfer (Switches to Contact Page)
  const handleApplyQuoteToBrief = (config: QuoteConfiguration) => {
    setAttachedQuote(config);
    setFormDiscipline(config.projectTypeLabel);
    setFormBudget(
      `Estimated $${config.estimatedTotal.toLocaleString()} USD (${config.estimatedDays})`
    );
    setFormMessage(
      `Configured Scope: ${config.quantity}x ${config.projectTypeLabel} · ${config.complexityLabel} · ${config.resolutionLabel} (Est. $${config.estimatedTotal.toLocaleString()} USD). Please review our timeline and CAD handover requirements.`
    );
    navigateToPage('contact');
  };

  // Handle 3D Model Viewer -> Commission Similar Model
  const handleCommission3DModel = (presetName: string, polyStats: string) => {
    setFormDiscipline('3D Product Modeling & Studio CGI');
    setFormMessage(
      `We would like to commission a production-ready 3D model similar to the interactive "${presetName}" (${polyStats}) inspected in your 3D Studio.`
    );
    navigateToPage('contact');
  };

  // Handle Lightbox -> Commission Similar Project
  const handleCommissionSimilar = (project: PortfolioItem) => {
    setActiveLightboxProject(null);
    setFormDiscipline(project.categoryLabel);
    setFormMessage(
      `We are interested in commissioning a 3D production similar in fidelity to "${project.title}" (${project.resolution}).`
    );
    navigateToPage('contact');
  };

  // Validate and submit contact form
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formEmail.trim())) {
      setFormError('Please provide a valid work email address.');
      return;
    }
    if (!formMessage.trim() || formMessage.trim().length < 10) {
      setFormError('Please include a brief overview of your 3D project requirements.');
      return;
    }

    setFormSubmitted(true);
  };

  const NAV_ITEMS: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'models', label: '3D Studio' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'estimator', label: 'Estimator' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-[#F6F6F2] text-[#090A0C] dark:bg-[#090A0C] dark:text-[#F4F4F0] flex flex-col transition-colors duration-150">
      {/* =====================================================================
          TOP BAR CONTRACT (Strict 1-Row, 3-Zone Contract, Zero Radius)
          Zone 1: Uploaded Brand Logo
          Zone 2: 6 single-line page navigation links
          Zone 3: 2 primary actions (Theme Switcher + Request Project Quote)
      ====================================================================== */}
      <header className="sticky top-0 z-40 h-16 border-b border-black/15 dark:border-white/10 bg-[#F6F6F2]/95 dark:bg-[#090A0C]/95 backdrop-blur-md transition-colors duration-150">
        <div className="max-w-[1280px] mx-auto h-full px-6 flex items-center justify-between gap-4">
          {/* Zone 1: Brand Logo */}
          <button
            type="button"
            onClick={() => navigateToPage('home')}
            className="text-left cursor-pointer focus:outline-none shrink-0"
            aria-label="3D Modeling Company Home"
          >
            <BrandLogo className="h-10 sm:h-11" />
          </button>

          {/* Zone 2: Dedicated Multi-Page Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
            {NAV_ITEMS.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigateToPage(item.id)}
                  className={`py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
                    isActive
                      ? 'border-[#090A0C] dark:border-[#FACC15] text-[#090A0C] dark:text-[#F4F4F0] font-semibold'
                      : 'border-transparent text-[#475569] dark:text-[#94A3B8] hover:text-[#090A0C] dark:hover:text-[#F4F4F0]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action CTA */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => navigateToPage('contact')}
              className="py-2 px-4 text-xs sm:text-sm font-semibold bg-[#090A0C] hover:bg-[#1E293B] text-[#FACC15] dark:bg-[#FACC15] dark:hover:bg-[#EAB308] dark:text-[#090A0C] rounded-none transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Secondary Page Switcher Bar (Visible only on small screens) */}
      <div className="md:hidden flex items-center overflow-x-auto border-b border-black/15 dark:border-white/10 bg-white dark:bg-[#121418] px-4 py-2 gap-2">
        {NAV_ITEMS.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => navigateToPage(item.id)}
              className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer border ${
                isActive
                  ? 'bg-[#090A0C] text-[#FACC15] border-[#090A0C] dark:bg-[#FACC15] dark:text-[#090A0C]'
                  : 'bg-[#F6F6F2] dark:bg-[#090A0C] text-[#475569] dark:text-[#94A3B8] border-black/10 dark:border-white/10'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* =====================================================================
          MULTI-PAGE ROUTER VIEWPORT
      ====================================================================== */}
      <main className="flex-1">
        {/* -------------------------------------------------------------------
            PAGE 1: HOME PAGE
        -------------------------------------------------------------------- */}
        {activePage === 'home' && (
          <div>
            {/* Hero Section */}
            <section className="pt-12 pb-20 lg:pt-16 lg:pb-24 border-b border-black/15 dark:border-white/10">
              <div className="max-w-[1280px] mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12">
                  <div className="lg:col-span-8 space-y-5">
                    <div className="flex items-center gap-2 text-xs text-[#475569] dark:text-[#94A3B8]">
                      <span>Leading Global 3D Modeling Company</span>
                      <span aria-hidden="true">·</span>
                      <span>New York, Zurich & Tokyo</span>
                      <span aria-hidden="true">·</span>
                      <span>ISO-27001 NDA Protected</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-[#090A0C] dark:text-[#F4F4F0] leading-[1.06] max-w-3xl">
                      Photorealistic 3D Modeling & Architectural CGI Engineered to Convert.
                    </h1>
                  </div>

                  <div className="lg:col-span-4 space-y-6">
                    <p className="text-base text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                      Trusted 3D Modeling Company delivering high-quality 3D models, ray-traced
                      renders, and interactive WebGL visualizations for architects, luxury brands,
                      and hardware manufacturers worldwide.
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => navigateToPage('models')}
                        className="py-3 px-6 bg-[#090A0C] hover:bg-[#1E293B] text-[#FACC15] dark:bg-[#FACC15] dark:hover:bg-[#EAB308] dark:text-[#090A0C] font-semibold text-sm rounded-none transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <Box className="w-4 h-4" />
                        <span>Launch Interactive 3D Studio</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => navigateToPage('portfolio')}
                        className="py-3 px-5 text-sm font-medium text-[#090A0C] dark:text-[#F4F4F0] bg-white dark:bg-[#121418] hover:bg-black/5 dark:hover:bg-white/5 border border-black/20 dark:border-white/15 rounded-none transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        View 8K Portfolio
                      </button>
                    </div>
                  </div>
                </div>

                {/* Live Interactive 3D WebGL Model Embedded Directly on Home */}
                <div className="mb-14">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-semibold text-[#090A0C] dark:text-[#F4F4F0]">
                        Interactive Real-Time 3D Viewport
                      </span>
                      <span aria-hidden="true" className="text-[#475569] dark:text-[#94A3B8]">
                        ·
                      </span>
                      <span className="text-[#475569] dark:text-[#94A3B8]">
                        Rotate, zoom, switch between PBR / Clay / Wireframe, and explode assemblies
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigateToPage('models')}
                      className="text-xs font-semibold text-[#090A0C] dark:text-[#FACC15] hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Open Fullscreen 3D Model Lab</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <Interactive3DModelViewer
                    initialPreset="turbine"
                    onSelectPresetForQuote={handleCommission3DModel}
                  />
                </div>

                {/* Verified Studio Production Metrics */}
                <div className="pt-10 border-t border-black/15 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div>
                    <div className="text-3xl lg:text-4xl font-display font-bold text-[#090A0C] dark:text-[#F4F4F0] font-mono-tabular">
                      140+
                    </div>
                    <div className="text-sm font-semibold text-[#090A0C] dark:text-[#F4F4F0] mt-1">
                      Global Enterprise Clients
                    </div>
                    <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-1">
                      Architectural firms, watchmakers, and industrial OEMs across 18 countries.
                    </p>
                  </div>

                  <div>
                    <div className="text-3xl lg:text-4xl font-display font-bold text-[#090A0C] dark:text-[#F4F4F0] font-mono-tabular">
                      12 Years
                    </div>
                    <div className="text-sm font-semibold text-[#090A0C] dark:text-[#F4F4F0] mt-1">
                      Production CGI Track Record
                    </div>
                    <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-1">
                      Over 4,200 bespoke 3D models and architectural scenes delivered on schedule.
                    </p>
                  </div>

                  <div>
                    <div className="text-3xl lg:text-4xl font-display font-bold text-[#090A0C] dark:text-[#F4F4F0] font-mono-tabular">
                      3 Studios
                    </div>
                    <div className="text-sm font-semibold text-[#090A0C] dark:text-[#F4F4F0] mt-1">
                      Follow-the-Sun Production Hubs
                    </div>
                    <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-1">
                      New York, Zurich, and Tokyo hubs enabling 24-hour rendering turnaround.
                    </p>
                  </div>

                  <div>
                    <div className="text-3xl lg:text-4xl font-display font-bold text-[#090A0C] dark:text-[#F4F4F0] font-mono-tabular">
                      42 Senior
                    </div>
                    <div className="text-sm font-semibold text-[#090A0C] dark:text-[#F4F4F0] mt-1">
                      3D Artists & LookDev Leads
                    </div>
                    <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-1">
                      Specialists in V-Ray, Octane, Corona, Unreal Engine 5, and SolidWorks CAD.
                    </p>
                  </div>
                </div>

                {/* Trusted By Global Brands */}
                <div className="mt-12 pt-8 border-t border-black/10 dark:border-white/5 flex flex-wrap items-center justify-between gap-6">
                  <span className="text-xs text-[#475569] dark:text-[#94A3B8]">
                    Trusted by architectural & product teams at:
                  </span>
                  <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                    {CLIENT_BRANDS.map((brand) => (
                      <div key={brand.name} className="flex items-center gap-2 text-xs">
                        <span className="font-display font-bold tracking-wider text-[#090A0C] dark:text-[#E2E8F0]">
                          {brand.name}
                        </span>
                        <span className="text-black/25 dark:text-white/25" aria-hidden="true">
                          /
                        </span>
                        <span className="text-[#475569] dark:text-[#94A3B8]">{brand.sector}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Home Section 2: 8K Before/After Render Pass Inspector */}
            <section className="py-20 border-b border-black/15 dark:border-white/10 bg-[#EFEFE9] dark:bg-[#0B0D10]">
              <div className="max-w-[1280px] mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                  <div>
                    <div className="text-xs text-[#B45309] dark:text-[#FACC15] font-semibold mb-2">
                      Sub-Millimeter LookDev & Ray-Tracing
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#090A0C] dark:text-[#F4F4F0]">
                      Compare Subdivision Mesh vs. Final 8K Render.
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigateToPage('services')}
                    className="py-2.5 px-5 bg-[#090A0C] text-[#F6F6F2] dark:bg-white dark:text-[#090A0C] text-xs font-semibold inline-flex items-center gap-2 self-start cursor-pointer"
                  >
                    <span>Explore All 4 Services</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <RenderInspector
                  image={PORTFOLIO_ITEMS[0].image}
                  title="Lake Zurich Cantilever Residence · Keller & Partner Architekten"
                  subtitle="Interactive Subdivision Geometry vs. Final 8K V-Ray Twilight Render"
                  polyCount="48.4M Polygons"
                  resolution="7680 × 4320 px · 32-Bit EXR"
                  engine="V-Ray 7"
                  onOpenLightbox={() => setActiveLightboxProject(PORTFOLIO_ITEMS[0])}
                />
              </div>
            </section>

            {/* Home Section 3: Dedicated Page Directory & Vikram Kline Testimonial */}
            <section className="py-20">
              <div className="max-w-[1280px] mx-auto px-6 space-y-16">
                {/* Quick Navigation Cards to Dedicated Pages */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div
                    onClick={() => navigateToPage('services')}
                    className="p-6 border border-black/15 dark:border-white/10 bg-white dark:bg-[#121418] hover:border-[#090A0C] dark:hover:border-[#FACC15] transition-colors cursor-pointer flex flex-col justify-between space-y-6"
                  >
                    <div>
                      <span className="text-xs font-mono-tabular text-[#B45309] dark:text-[#FACC15]">
                        01 / PAGE
                      </span>
                      <h3 className="text-xl font-display font-bold text-[#090A0C] dark:text-[#F4F4F0] mt-2">
                        3D Services & 4-Step Pipeline
                      </h3>
                      <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-2 leading-relaxed">
                        Detailed specifications on 3D modeling, architectural rendering, 60fps
                        animations, and our 4-stage production workflow.
                      </p>
                    </div>
                    <span className="text-xs font-semibold inline-flex items-center gap-1.5 text-[#090A0C] dark:text-[#FACC15]">
                      <span>Open Services Page</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <div
                    onClick={() => navigateToPage('models')}
                    className="p-6 border border-black/15 dark:border-white/10 bg-white dark:bg-[#121418] hover:border-[#090A0C] dark:hover:border-[#FACC15] transition-colors cursor-pointer flex flex-col justify-between space-y-6"
                  >
                    <div>
                      <span className="text-xs font-mono-tabular text-[#B45309] dark:text-[#FACC15]">
                        02 / PAGE
                      </span>
                      <h3 className="text-xl font-display font-bold text-[#090A0C] dark:text-[#F4F4F0] mt-2">
                        Interactive 3D Model Studio
                      </h3>
                      <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-2 leading-relaxed">
                        Inspect real-time Three.js WebGL models in your browser—toggle quad
                        wireframes, clay matcaps, and exploded mechanical views.
                      </p>
                    </div>
                    <span className="text-xs font-semibold inline-flex items-center gap-1.5 text-[#090A0C] dark:text-[#FACC15]">
                      <span>Open 3D Studio Page</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <div
                    onClick={() => navigateToPage('portfolio')}
                    className="p-6 border border-black/15 dark:border-white/10 bg-white dark:bg-[#121418] hover:border-[#090A0C] dark:hover:border-[#FACC15] transition-colors cursor-pointer flex flex-col justify-between space-y-6"
                  >
                    <div>
                      <span className="text-xs font-mono-tabular text-[#B45309] dark:text-[#FACC15]">
                        03 / PAGE
                      </span>
                      <h3 className="text-xl font-display font-bold text-[#090A0C] dark:text-[#F4F4F0] mt-2">
                        8K Portfolio & Case Studies
                      </h3>
                      <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-2 leading-relaxed">
                        Browse completed architectural, horology, automotive, and aerospace projects
                        with verified commercial impact metrics.
                      </p>
                    </div>
                    <span className="text-xs font-semibold inline-flex items-center gap-1.5 text-[#090A0C] dark:text-[#FACC15]">
                      <span>Open Portfolio Page</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <div
                    onClick={() => navigateToPage('estimator')}
                    className="p-6 border border-black/15 dark:border-white/10 bg-white dark:bg-[#121418] hover:border-[#090A0C] dark:hover:border-[#FACC15] transition-colors cursor-pointer flex flex-col justify-between space-y-6"
                  >
                    <div>
                      <span className="text-xs font-mono-tabular text-[#B45309] dark:text-[#FACC15]">
                        04 / PAGE
                      </span>
                      <h3 className="text-xl font-display font-bold text-[#090A0C] dark:text-[#F4F4F0] mt-2">
                        Instant Cost Estimator & FAQ
                      </h3>
                      <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-2 leading-relaxed">
                        Configure your project deliverables, polygon complexity, and output
                        resolutions for an instant baseline quote.
                      </p>
                    </div>
                    <span className="text-xs font-semibold inline-flex items-center gap-1.5 text-[#090A0C] dark:text-[#FACC15]">
                      <span>Open Estimator Page</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Attributable Client Testimonial */}
                <div className="border border-black/15 dark:border-white/10 bg-white dark:bg-[#121418] p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-2 text-xs text-[#B45309] dark:text-[#FACC15] font-semibold">
                      <span>Verified Client Outcome</span>
                      <span aria-hidden="true">·</span>
                      <span>Luxury Product & E-Commerce Visualization</span>
                    </div>
                    <blockquote className="text-lg sm:text-xl font-display text-[#090A0C] dark:text-[#F4F4F0] leading-relaxed">
                      “Working with the 3D Modeling Company was a game-changer. Before partnering
                      with their studio, our physical jewelry and watch photography delayed campaign
                      launches by six weeks. Their attention to micro-surface detail and
                      photorealistic 3D renders helped us showcase our products across global retail
                      channels and lifted pre-order conversions by 165%.”
                    </blockquote>
                    <div className="flex items-center gap-3 pt-2 text-xs">
                      <div className="w-9 h-9 bg-[#090A0C] text-[#FACC15] flex items-center justify-center font-display font-bold">
                        VK
                      </div>
                      <div>
                        <div className="font-semibold text-[#090A0C] dark:text-[#F4F4F0]">
                          Vikram Kline
                        </div>
                        <div className="text-[#475569] dark:text-[#94A3B8]">
                          Chief Executive Officer · Marketplace Luxury Group LLC
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 lg:border-l lg:border-black/15 dark:lg:border-white/10 lg:pl-8 space-y-4">
                    <div className="text-sm font-semibold text-[#090A0C] dark:text-[#F4F4F0]">
                      Grow Your Business With Professional 3D Solutions:
                    </div>
                    <ul className="space-y-2.5 text-xs text-[#475569] dark:text-[#94A3B8]">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#B45309] dark:text-[#FACC15] shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-[#090A0C] dark:text-[#F4F4F0]">
                            Impress clients and investors instantly:
                          </strong>{' '}
                          Present unbuilt architecture and pre-tooled hardware in 8K clarity.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#B45309] dark:text-[#FACC15] shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-[#090A0C] dark:text-[#F4F4F0]">
                            Save time and reduce design mistakes:
                          </strong>{' '}
                          Validate material combinations, lighting, and proportions digitally.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#B45309] dark:text-[#FACC15] shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-[#090A0C] dark:text-[#F4F4F0]">
                            Market products with photorealistic visuals:
                          </strong>{' '}
                          Deploy one master 3D model across print billboards, 60fps video, and AR.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* -------------------------------------------------------------------
            PAGE 2: SERVICES & 4-STAGE PIPELINE PAGE
        -------------------------------------------------------------------- */}
        {activePage === 'services' && (
          <div>
            <section className="py-16 lg:py-24 border-b border-black/15 dark:border-white/10">
              <div className="max-w-[1280px] mx-auto px-6">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 pb-8 border-b border-black/15 dark:border-white/10">
                  <div>
                    <div className="text-xs text-[#B45309] dark:text-[#FACC15] font-semibold mb-2">
                      Dedicated Services & Capabilities Page
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-display font-bold text-[#090A0C] dark:text-[#F4F4F0] max-w-2xl">
                      Innovative 3D Design Solutions.
                    </h1>
                  </div>
                  <p className="text-sm text-[#475569] dark:text-[#94A3B8] max-w-md leading-relaxed">
                    We bring your ideas to life with pure realistic 3D solutions, immersive
                    experiences, and modern visualization technologies across four specialized
                    production pipelines.
                  </p>
                </div>

                {/* Asymmetric Bento Grid of the 4 Services */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {SERVICES.map((service, idx) => {
                    const isWide = idx === 0 || idx === 3;
                    return (
                      <article
                        key={service.id}
                        className={`${
                          isWide ? 'lg:col-span-7' : 'lg:col-span-5'
                        } border border-black/15 dark:border-white/10 bg-white dark:bg-[#121418] overflow-hidden flex flex-col justify-between group hover:border-black/40 dark:hover:border-white/25 transition-colors`}
                      >
                        <div className="relative aspect-16/9 w-full overflow-hidden bg-[#0D0F12]">
                          <img
                            src={service.image}
                            alt={service.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-[#E2E8F0]">
                            <span className="font-mono-tabular text-[#FACC15] font-semibold">
                              Lead Time: {service.leadTime}
                            </span>
                            <span className="text-[#CBD5E1] font-mono-tabular">
                              {service.formats}
                            </span>
                          </div>
                        </div>

                        <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                          <div className="space-y-3">
                            <h2 className="text-xl sm:text-2xl font-display font-bold text-[#090A0C] dark:text-[#F4F4F0]">
                              {service.title}
                            </h2>
                            <p className="text-xs font-medium text-[#1E293B] dark:text-[#E2E8F0]">
                              {service.subtitle}
                            </p>
                            <p className="text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                              {service.description}
                            </p>
                          </div>

                          <div className="pt-5 border-t border-black/10 dark:border-white/10 space-y-3">
                            <div className="text-xs text-[#475569] dark:text-[#94A3B8]">
                              <span className="text-[#090A0C] dark:text-[#F4F4F0] font-semibold">
                                Deliverables:{' '}
                              </span>
                              <span>{service.deliverables}</span>
                            </div>

                            <div className="flex items-center justify-between gap-4 pt-1">
                              <span className="text-xs text-[#B45309] dark:text-[#FACC15] font-medium">
                                {service.outcomeStat}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  setFormDiscipline(service.title);
                                  navigateToPage('estimator');
                                }}
                                className="text-xs font-semibold text-[#090A0C] dark:text-[#F4F4F0] hover:text-[#B45309] dark:hover:text-[#FACC15] inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors cursor-pointer"
                              >
                                <span>Calculate Service Cost</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* 4-Stage Production Workflow Section */}
            <section className="py-20 bg-[#EFEFE9] dark:bg-[#0B0D10]">
              <div className="max-w-[1280px] mx-auto px-6">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
                  <div>
                    <div className="text-xs text-[#B45309] dark:text-[#FACC15] font-semibold mb-2">
                      Structured Studio Workflow
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#090A0C] dark:text-[#F4F4F0]">
                      Bring Your Vision to Life in 4 Steps.
                    </h2>
                  </div>
                  <p className="text-sm text-[#475569] dark:text-[#94A3B8] max-w-md">
                    Every project moves through four auditable milestones with interactive browser
                    sign-offs at geometry, shader, and final mastering gates.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {PROCESS_STEPS.map((step, index) => {
                    const isSelected = activeProcessIndex === index;
                    return (
                      <div
                        key={step.number}
                        onClick={() => setActiveProcessIndex(index)}
                        className={`p-6 border transition-colors cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-white dark:bg-[#121418] border-[#090A0C] dark:border-[#FACC15] border-2'
                            : 'bg-[#F6F6F2] dark:bg-[#0D0F12] border-black/15 dark:border-white/10 hover:border-black/40 dark:hover:border-white/25'
                        }`}
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-mono-tabular text-[#B45309] dark:text-[#FACC15] font-semibold">
                              Stage {step.number} · {step.duration}
                            </span>
                            <span className="text-[#475569] dark:text-[#94A3B8]">{step.phase}</span>
                          </div>

                          <h3 className="text-lg font-display font-bold text-[#090A0C] dark:text-[#F4F4F0]">
                            {step.title}
                          </h3>

                          <p className="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                            {step.summary}
                          </p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10 space-y-2">
                          <div className="text-[11px] text-[#475569] dark:text-[#94A3B8] font-mono-tabular">
                            {step.technicalDetails}
                          </div>
                          <div className="text-xs font-semibold text-[#090A0C] dark:text-[#E2E8F0]">
                            Milestone: {step.clientMilestone}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Why Choose Us — 6 Pillar Grid */}
                <div className="mt-16 pt-14 border-t border-black/15 dark:border-white/10">
                  <div className="mb-8">
                    <h3 className="text-xl font-display font-bold text-[#090A0C] dark:text-[#F4F4F0]">
                      Why Choose Us For 3D Services?
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-6 bg-white dark:bg-[#121418] border border-black/15 dark:border-white/10 space-y-2">
                      <div className="text-sm font-semibold text-[#090A0C] dark:text-[#F4F4F0]">
                        01. Expert 3D Artists
                      </div>
                      <p className="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                        Our team of skilled 3D designers and modelers creates accurate, detailed,
                        and lifelike 3D models with watertight quad topology.
                      </p>
                    </div>
                    <div className="p-6 bg-white dark:bg-[#121418] border border-black/15 dark:border-white/10 space-y-2">
                      <div className="text-sm font-semibold text-[#090A0C] dark:text-[#F4F4F0]">
                        02. Cutting-Edge Technology
                      </div>
                      <p className="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                        We utilize V-Ray 7, OctaneRender, Corona 12, and Unreal Engine 5.5
                        path-tracing with ACEScg linear color spaces.
                      </p>
                    </div>
                    <div className="p-6 bg-white dark:bg-[#121418] border border-black/15 dark:border-white/10 space-y-2">
                      <div className="text-sm font-semibold text-[#090A0C] dark:text-[#F4F4F0]">
                        03. Attention to Detail
                      </div>
                      <p className="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                        From textures and lighting to proportions and perspective, we meticulously
                        refine every element to achieve pixel-perfect results.
                      </p>
                    </div>
                    <div className="p-6 bg-white dark:bg-[#121418] border border-black/15 dark:border-white/10 space-y-2">
                      <div className="text-sm font-semibold text-[#090A0C] dark:text-[#F4F4F0]">
                        04. Collaborative Workflow
                      </div>
                      <p className="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                        Annotate directly on 360-degree clay turntables and high-res look-dev proofs
                        in your browser without installing 3D software.
                      </p>
                    </div>
                    <div className="p-6 bg-white dark:bg-[#121418] border border-black/15 dark:border-white/10 space-y-2">
                      <div className="text-sm font-semibold text-[#090A0C] dark:text-[#F4F4F0]">
                        05. Dedicated Support
                      </div>
                      <p className="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                        Every client gets a dedicated technical project manager for smooth
                        communication, timely delivery, and hassle-free management.
                      </p>
                    </div>
                    <div className="p-6 bg-white dark:bg-[#121418] border border-black/15 dark:border-white/10 space-y-2">
                      <div className="text-sm font-semibold text-[#090A0C] dark:text-[#F4F4F0]">
                        06. Data Security & Reliability
                      </div>
                      <p className="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                        Your files, CAD models, and business data are fully protected under strict
                        mutual NDA protocols and encrypted studio storage.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* -------------------------------------------------------------------
            PAGE 3: INTERACTIVE 3D MODEL STUDIO PAGE (10 Real WebGL 3D Models)
        -------------------------------------------------------------------- */}
        {activePage === 'models' && (
          <section className="py-16 lg:py-24">
            <div className="max-w-[1280px] mx-auto px-6 space-y-14">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-black/15 dark:border-white/10">
                <div>
                  <div className="text-xs text-[#B45309] dark:text-[#FACC15] font-semibold mb-2">
                    Interactive WebGL 3D Inspection Lab · 10 Live Procedural Models
                  </div>
                  <h1 className="text-4xl sm:text-5xl font-display font-bold text-[#090A0C] dark:text-[#F4F4F0]">
                    Real-Time 3D Model Studio.
                  </h1>
                </div>
                <p className="text-sm text-[#475569] dark:text-[#94A3B8] max-w-md leading-relaxed">
                  Inspect 10 live multi-part 3D models directly in your browser—spanning
                  Architecture, Supercars, Modular Furniture, Fine Jewelry, Robotics, Skyscrapers,
                  and Aerospace UAVs. Test PBR shaders, clay matcaps, quad wireframes, and exploded
                  cutaway views.
                </p>
              </div>

              {/* Full Interactive Three.js 3D Model Viewer */}
              <Interactive3DModelViewer
                initialPreset={selectedStudioModel}
                onSelectPresetForQuote={handleCommission3DModel}
              />

              {/* Interactive 10-Model Catalog Grid */}
              <div className="pt-8 border-t border-black/15 dark:border-white/10 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <div className="text-xs text-[#B45309] dark:text-[#FACC15] font-semibold mb-1">
                      Complete Interactive Asset Library
                    </div>
                    <h2 className="text-2xl font-display font-bold text-[#090A0C] dark:text-[#F4F4F0]">
                      Select Any 3D Model Below to Load in the WebGL Viewport
                    </h2>
                  </div>
                  <span className="text-xs font-mono-tabular text-[#475569] dark:text-[#94A3B8]">
                    10 Production-Grade Multi-Part Assemblies
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {MODEL_PRESETS.map((model, index) => {
                    const isSelected = selectedStudioModel === model.id;
                    return (
                      <button
                        key={model.id}
                        type="button"
                        onClick={() => {
                          setSelectedStudioModel(model.id);
                          window.scrollTo({ top: 120, behavior: 'smooth' });
                        }}
                        className={`text-left p-4 border transition-colors cursor-pointer flex flex-col justify-between space-y-4 ${
                          isSelected
                            ? 'bg-white dark:bg-[#181B22] border-[#090A0C] dark:border-[#FACC15] border-2'
                            : 'bg-[#EFEFE9] dark:bg-[#121418] border-black/15 dark:border-white/10 hover:border-black/40 dark:hover:border-white/30'
                        }`}
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[11px] font-mono-tabular text-[#B45309] dark:text-[#FACC15]">
                            <span>MODEL 0{index + 1}</span>
                            <span>{model.formats.split(' · ')[0]}</span>
                          </div>
                          <div className="text-sm font-display font-bold text-[#090A0C] dark:text-[#F4F4F0]">
                            {model.name}
                          </div>
                          <div className="text-[11px] text-[#475569] dark:text-[#94A3B8]">
                            {model.category}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] font-mono-tabular">
                          <span className="text-[#475569] dark:text-[#94A3B8]">
                            {model.polygons.split(' ')[0]} Quads
                          </span>
                          <span className="font-semibold text-[#090A0C] dark:text-[#FACC15]">
                            {isSelected ? 'Loaded ●' : 'Load 3D →'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Secondary 2D/3D Render Pass Comparison Slider */}
              <div className="pt-8 border-t border-black/15 dark:border-white/10 space-y-6">
                <div>
                  <div className="text-xs text-[#B45309] dark:text-[#FACC15] font-semibold mb-1">
                    8K Offline Path-Tracing Comparison
                  </div>
                  <h2 className="text-2xl font-display font-bold text-[#090A0C] dark:text-[#F4F4F0]">
                    Wireframe Mesh vs. Final Ray-Traced Master
                  </h2>
                </div>

                <RenderInspector
                  image={PORTFOLIO_ITEMS[4].image}
                  title="Acoustic Turbine & Optical Sensor Assembly · Helios Defense & Optics"
                  subtitle="Drag divider to compare quad topology against final Redshift/Houdini render"
                  polyCount="14.5M Polygons"
                  resolution="4K 60fps + Interactive WebGL"
                  engine="Redshift · Houdini"
                  onOpenLightbox={() => setActiveLightboxProject(PORTFOLIO_ITEMS[4])}
                />
              </div>
            </div>
          </section>
        )}

        {/* -------------------------------------------------------------------
            PAGE 4: PORTFOLIO & CASE STUDIES PAGE
        -------------------------------------------------------------------- */}
        {activePage === 'portfolio' && (
          <section className="py-16 lg:py-24">
            <div className="max-w-[1280px] mx-auto px-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-black/15 dark:border-white/10">
                <div>
                  <div className="text-xs text-[#B45309] dark:text-[#FACC15] font-semibold mb-2">
                    Selected 8K Works & Case Studies
                  </div>
                  <h1 className="text-4xl sm:text-5xl font-display font-bold text-[#090A0C] dark:text-[#F4F4F0]">
                    Get Stunning 3D Results.
                  </h1>
                </div>

                {/* Interactive Category Filter Tabs */}
                <div className="flex flex-wrap items-center gap-0.5 p-1 bg-white dark:bg-[#121418] border border-black/15 dark:border-white/10 self-start">
                  {[
                    { id: 'all', label: 'All Works' },
                    { id: 'architectural', label: 'Architectural & Interior' },
                    { id: 'product', label: 'Luxury Product CGI' },
                    { id: 'automotive', label: 'Automotive' },
                    { id: 'industrial', label: 'Technical Cutaways' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setPortfolioFilter(tab.id as typeof portfolioFilter)}
                      className={`px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        portfolioFilter === tab.id
                          ? 'bg-[#090A0C] text-[#FACC15] dark:bg-[#FACC15] dark:text-[#090A0C] font-semibold'
                          : 'text-[#475569] dark:text-[#94A3B8] hover:text-[#090A0C] dark:hover:text-[#F4F4F0]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Portfolio Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
                {filteredPortfolio.map((item, idx) => {
                  const spanClass =
                    filteredPortfolio.length === 5
                      ? idx === 0
                        ? 'lg:col-span-7'
                        : idx === 1
                        ? 'lg:col-span-5'
                        : 'lg:col-span-4'
                      : 'lg:col-span-6';

                  return (
                    <div
                      key={item.id}
                      onClick={() => setActiveLightboxProject(item)}
                      className={`${spanClass} group border border-black/15 dark:border-white/10 bg-white dark:bg-[#121418] overflow-hidden flex flex-col justify-between cursor-pointer hover:border-[#090A0C] dark:hover:border-[#FACC15] transition-colors`}
                    >
                      <div className="relative aspect-4/3 w-full overflow-hidden bg-[#090A0C]">
                        <img
                          src={item.image}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-200"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#E2E8F0]">
                          <span className="font-mono-tabular">{item.polyCount}</span>
                          <span className="inline-flex items-center gap-1 text-[#FACC15] font-semibold">
                            <Eye className="w-3.5 h-3.5" />
                            <span>Inspect 8K Case Study</span>
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex items-center gap-2 text-xs text-[#475569] dark:text-[#94A3B8] mb-2">
                            <span>{item.categoryLabel}</span>
                            <span aria-hidden="true">·</span>
                            <span>{item.client}</span>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono-tabular">{item.year}</span>
                          </div>

                          <h2 className="text-lg font-display font-bold text-[#090A0C] dark:text-[#F4F4F0] group-hover:text-[#B45309] dark:group-hover:text-[#FACC15] transition-colors">
                            {item.title}
                          </h2>
                          <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-2 leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-black/10 dark:border-white/10 text-xs">
                          <span className="text-[#475569] dark:text-[#94A3B8]">Outcome: </span>
                          <span className="text-[#090A0C] dark:text-[#F4F4F0] font-medium">
                            {item.impactMetric}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* -------------------------------------------------------------------
            PAGE 5: ESTIMATOR & FAQ PAGE
        -------------------------------------------------------------------- */}
        {activePage === 'estimator' && (
          <div>
            <section className="py-16 lg:py-24 border-b border-black/15 dark:border-white/10 bg-[#EFEFE9] dark:bg-[#0B0D10]">
              <div className="max-w-[1280px] mx-auto px-6">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
                  <div>
                    <div className="text-xs text-[#B45309] dark:text-[#FACC15] font-semibold mb-2">
                      Instant Production Estimator
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-display font-bold text-[#090A0C] dark:text-[#F4F4F0]">
                      Configure Your 3D Scope & Quote.
                    </h1>
                  </div>
                  <p className="text-sm text-[#475569] dark:text-[#94A3B8] max-w-md">
                    Select your discipline, geometric complexity, and output resolution to calculate
                    an instant baseline investment and transfer it directly to your project brief.
                  </p>
                </div>

                <QuoteCalculator onApplyQuoteToBrief={handleApplyQuoteToBrief} />
              </div>
            </section>

            {/* Technical FAQs */}
            <section className="py-20">
              <div className="max-w-[1280px] mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  <div className="lg:col-span-5 space-y-4">
                    <div className="text-xs text-[#B45309] dark:text-[#FACC15] font-semibold">
                      Technical & Commercial FAQs
                    </div>
                    <h2 className="text-3xl font-display font-bold text-[#090A0C] dark:text-[#F4F4F0]">
                      Common Questions (FAQs).
                    </h2>
                    <p className="text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                      Everything you need to know about file handovers, revision stages, rendering
                      resolutions, and intellectual property rights.
                    </p>
                  </div>

                  <div className="lg:col-span-7 divide-y divide-black/15 dark:divide-white/10 border-t border-b border-black/15 dark:border-white/10">
                    {FAQS.map((faq) => {
                      const isOpen = openFaqId === faq.id;
                      return (
                        <div key={faq.id} className="py-5">
                          <button
                            type="button"
                            onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                            className="w-full flex items-center justify-between gap-4 text-left cursor-pointer group"
                            aria-expanded={isOpen}
                          >
                            <div>
                              <span className="text-xs text-[#475569] dark:text-[#94A3B8] block mb-1">
                                {faq.category}
                              </span>
                              <span className="text-base font-display font-semibold text-[#090A0C] dark:text-[#F4F4F0] group-hover:text-[#B45309] dark:group-hover:text-[#FACC15] transition-colors">
                                {faq.question}
                              </span>
                            </div>
                            <span className="p-2 border border-black/15 dark:border-white/10 bg-white dark:bg-[#121418] text-[#475569] dark:text-[#94A3B8] shrink-0">
                              {isOpen ? (
                                <Minus className="w-4 h-4" />
                              ) : (
                                <Plus className="w-4 h-4" />
                              )}
                            </span>
                          </button>

                          {isOpen && (
                            <div className="mt-3 pr-10 text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* -------------------------------------------------------------------
            PAGE 6: CONTACT & PROJECT BRIEFING PAGE
        -------------------------------------------------------------------- */}
        {activePage === 'contact' && (
          <section className="py-16 lg:py-24">
            <div className="max-w-[1280px] mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-5 space-y-6">
                  <div className="text-xs text-[#B45309] dark:text-[#FACC15] font-semibold">
                    Direct Studio Consultation
                  </div>
                  <h1 className="text-3xl sm:text-5xl font-display font-bold text-[#090A0C] dark:text-[#F4F4F0]">
                    Facing Challenges? Let’s Discuss Your Idea.
                  </h1>
                  <p className="text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                    Struggling to explain your ideas with flat drawings? Having a hard time
                    convincing clients or investors of 2D concepts? With realistic 3D models and
                    high-quality renders, we solve these problems and make your vision crystal
                    clear.
                  </p>

                  {/* Senior Technical Producer Card */}
                  <div className="p-6 border border-black/15 dark:border-white/10 bg-white dark:bg-[#121418] space-y-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 bg-[#090A0C] text-[#FACC15] flex items-center justify-center font-display font-bold text-base shrink-0">
                        AR
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#090A0C] dark:text-[#F4F4F0]">
                          Adam Richter
                        </div>
                        <div className="text-xs text-[#475569] dark:text-[#94A3B8]">
                          Head of 3D Production & Architecture · New York Desk
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                      “Every brief submitted here goes directly to our senior modeling leads. If you
                      have STEP, Revit, Rhino, or sketch files ready, we prepare a complimentary
                      geometry audit and fixed quote within 4 business hours.”
                    </p>
                    <div className="pt-3 border-t border-black/10 dark:border-white/10 space-y-1.5 text-xs text-[#090A0C] dark:text-[#E2E8F0] font-mono-tabular">
                      <div>Address: 123 Main Street, Suite 1400, New York, NY 10001</div>
                      <div>Email: studio@3dmodelingcompany.com</div>
                      <div>Phone: +1 (212) 555-0194 · Mon–Fri 9:00 AM – 6:00 PM EST</div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Validated Lead Capture Form */}
                <div className="lg:col-span-7 border border-black/15 dark:border-white/10 bg-white dark:bg-[#121418] p-6 sm:p-10">
                  {formSubmitted ? (
                    <div className="py-12 text-center space-y-5">
                      <div className="w-14 h-14 bg-[#090A0C] text-[#FACC15] border border-[#090A0C] dark:border-[#FACC15] flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                      <h2 className="text-2xl font-display font-bold text-[#090A0C] dark:text-[#F4F4F0]">
                        Project Brief Received by Our Production Desk
                      </h2>
                      <p className="text-sm text-[#475569] dark:text-[#94A3B8] max-w-md mx-auto leading-relaxed">
                        Thank you,{' '}
                        <span className="text-[#090A0C] dark:text-[#F4F4F0] font-semibold">
                          {formName}
                        </span>
                        . Adam Richter and our LookDev team have received your{' '}
                        <span className="text-[#090A0C] dark:text-[#F4F4F0]">{formDiscipline}</span>{' '}
                        inquiry and will respond to{' '}
                        <span className="text-[#090A0C] dark:text-[#F4F4F0] font-mono-tabular">
                          {formEmail}
                        </span>{' '}
                        within 4 business hours.
                      </p>
                      <div className="pt-4">
                        <button
                          type="button"
                          onClick={() => {
                            setFormSubmitted(false);
                            setFormMessage('');
                          }}
                          className="py-2.5 px-5 text-xs font-semibold bg-[#F6F6F2] dark:bg-[#181B22] text-[#090A0C] dark:text-[#F4F4F0] border border-black/20 dark:border-white/15 cursor-pointer"
                        >
                          Submit Another Project Brief
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-5" noValidate>
                      <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
                        <h2 className="text-lg font-display font-bold text-[#090A0C] dark:text-[#F4F4F0]">
                          Request Fixed-Scope Production Proposal
                        </h2>
                        <span className="text-xs text-[#475569] dark:text-[#94A3B8]">
                          Mutual NDA included
                        </span>
                      </div>

                      {attachedQuote && (
                        <div className="p-3.5 bg-[#F6F6F2] dark:bg-[#090A0C] border border-[#090A0C] dark:border-[#FACC15] flex items-center justify-between gap-3 text-xs">
                          <div>
                            <span className="text-[#B45309] dark:text-[#FACC15] font-semibold">
                              Attached Estimator Scope:{' '}
                            </span>
                            <span className="text-[#090A0C] dark:text-[#F4F4F0]">
                              {attachedQuote.quantity}× {attachedQuote.projectTypeLabel} ($
                              {attachedQuote.estimatedTotal.toLocaleString()} USD)
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setAttachedQuote(null)}
                            className="text-[#475569] dark:text-[#94A3B8] hover:text-[#090A0C] dark:hover:text-[#F4F4F0] underline cursor-pointer shrink-0"
                          >
                            Clear
                          </button>
                        </div>
                      )}

                      {formError && (
                        <div
                          role="alert"
                          className="p-3.5 bg-red-50 dark:bg-red-950/60 border border-red-600/50 text-xs text-red-800 dark:text-red-200"
                        >
                          {formError}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label
                            htmlFor="brief-name"
                            className="block text-xs font-medium text-[#090A0C] dark:text-[#E2E8F0] mb-2"
                          >
                            Full Name *
                          </label>
                          <input
                            id="brief-name"
                            type="text"
                            required
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            placeholder="e.g. Elena Rostova"
                            className="w-full px-4 py-2.5 text-sm bg-[#F6F6F2] dark:bg-[#090A0C] border border-black/20 dark:border-white/15 text-[#090A0C] dark:text-[#F4F4F0] placeholder-[#64748B] focus:outline-none focus:border-[#090A0C] dark:focus:border-[#FACC15]"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="brief-email"
                            className="block text-xs font-medium text-[#090A0C] dark:text-[#E2E8F0] mb-2"
                          >
                            Work Email *
                          </label>
                          <input
                            id="brief-email"
                            type="email"
                            required
                            value={formEmail}
                            onChange={(e) => setFormEmail(e.target.value)}
                            placeholder="elena@architecture-firm.com"
                            className="w-full px-4 py-2.5 text-sm bg-[#F6F6F2] dark:bg-[#090A0C] border border-black/20 dark:border-white/15 text-[#090A0C] dark:text-[#F4F4F0] placeholder-[#64748B] focus:outline-none focus:border-[#090A0C] dark:focus:border-[#FACC15]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label
                            htmlFor="brief-company"
                            className="block text-xs font-medium text-[#090A0C] dark:text-[#E2E8F0] mb-2"
                          >
                            Organization / Studio
                          </label>
                          <input
                            id="brief-company"
                            type="text"
                            value={formCompany}
                            onChange={(e) => setFormCompany(e.target.value)}
                            placeholder="e.g. Keller & Partner Architekten"
                            className="w-full px-4 py-2.5 text-sm bg-[#F6F6F2] dark:bg-[#090A0C] border border-black/20 dark:border-white/15 text-[#090A0C] dark:text-[#F4F4F0] placeholder-[#64748B] focus:outline-none focus:border-[#090A0C] dark:focus:border-[#FACC15]"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="brief-discipline"
                            className="block text-xs font-medium text-[#090A0C] dark:text-[#E2E8F0] mb-2"
                          >
                            Primary 3D Discipline
                          </label>
                          <select
                            id="brief-discipline"
                            value={formDiscipline}
                            onChange={(e) => setFormDiscipline(e.target.value)}
                            className="w-full px-4 py-2.5 text-sm bg-[#F6F6F2] dark:bg-[#090A0C] border border-black/20 dark:border-white/15 text-[#090A0C] dark:text-[#F4F4F0] focus:outline-none focus:border-[#090A0C] dark:focus:border-[#FACC15]"
                          >
                            <option value="Architectural Visualization">
                              Architectural Visualization (Exterior / Interior)
                            </option>
                            <option value="3D Product Modeling & Studio CGI">
                              3D Product Modeling & Studio CGI
                            </option>
                            <option value="3D Animation & Exploded Walkthroughs">
                              3D Animation & Exploded Walkthroughs
                            </option>
                            <option value="AR/VR & WebGL Spatial Assets">
                              AR/VR & WebGL Spatial Assets
                            </option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="brief-message"
                          className="block text-xs font-medium text-[#090A0C] dark:text-[#E2E8F0] mb-2"
                        >
                          Project Scope, Available CAD/Drawings & Target Delivery Date *
                        </label>
                        <textarea
                          id="brief-message"
                          rows={4}
                          required
                          value={formMessage}
                          onChange={(e) => setFormMessage(e.target.value)}
                          placeholder="Describe your product or architectural project, available input files (STEP, DWG, sketches), and desired number of renders or animations..."
                          className="w-full px-4 py-3 text-sm bg-[#F6F6F2] dark:bg-[#090A0C] border border-black/20 dark:border-white/15 text-[#090A0C] dark:text-[#F4F4F0] placeholder-[#64748B] focus:outline-none focus:border-[#090A0C] dark:focus:border-[#FACC15]"
                        />
                      </div>

                      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <span className="text-xs text-[#475569] dark:text-[#94A3B8]">
                          Response guaranteed within 4 business hours (Mon–Fri, 9:00 AM – 6:00 PM
                          EST)
                        </span>
                        <button
                          type="submit"
                          className="py-3 px-6 bg-[#090A0C] hover:bg-[#1E293B] text-[#FACC15] dark:bg-[#FACC15] dark:hover:bg-[#EAB308] dark:text-[#090A0C] font-semibold text-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          Send Project Brief
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* =====================================================================
          QUIET EDITORIAL FOOTER WITH UPDATED BRAND LOGO & PAGE ROUTING
      ====================================================================== */}
      <footer className="border-t border-black/15 dark:border-white/10 bg-[#F6F6F2] dark:bg-[#090A0C] py-16 text-xs text-[#475569] dark:text-[#94A3B8] transition-colors duration-150">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-black/15 dark:border-white/10">
            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-4">
              <button
                type="button"
                onClick={() => navigateToPage('home')}
                className="text-left cursor-pointer"
              >
                <BrandLogo className="h-10" />
              </button>
              <p className="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed max-w-sm">
                Global 3D modeling, photorealistic ray-traced rendering, architectural
                visualization, and WebXR spatial production studio.
              </p>
              <div className="pt-1 text-xs text-[#090A0C] dark:text-[#E2E8F0] font-mono-tabular">
                New York · Zurich · Tokyo
              </div>
            </div>

            {/* Services Column */}
            <div className="lg:col-span-3 space-y-2.5">
              <div className="text-xs font-semibold text-[#090A0C] dark:text-[#F4F4F0] mb-3">
                3D Capabilities
              </div>
              <ul className="space-y-2">
                <li>
                  <button
                    type="button"
                    onClick={() => navigateToPage('services')}
                    className="hover:text-[#090A0C] dark:hover:text-[#F4F4F0] transition-colors cursor-pointer"
                  >
                    Precision CAD & Subdivision Modeling
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateToPage('services')}
                    className="hover:text-[#090A0C] dark:hover:text-[#F4F4F0] transition-colors cursor-pointer"
                  >
                    Architectural Exterior & Interior CGI
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateToPage('models')}
                    className="hover:text-[#090A0C] dark:hover:text-[#F4F4F0] transition-colors cursor-pointer"
                  >
                    Interactive WebGL 3D Model Studio
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateToPage('services')}
                    className="hover:text-[#090A0C] dark:hover:text-[#F4F4F0] transition-colors cursor-pointer"
                  >
                    60fps Technical & Exploded Animation
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateToPage('services')}
                    className="hover:text-[#090A0C] dark:hover:text-[#F4F4F0] transition-colors cursor-pointer"
                  >
                    WebGL, glTF 2.0 & Apple Vision USDZ
                  </button>
                </li>
              </ul>
            </div>

            {/* Dedicated Pages Column */}
            <div className="lg:col-span-2 space-y-2.5">
              <div className="text-xs font-semibold text-[#090A0C] dark:text-[#F4F4F0] mb-3">
                Pages
              </div>
              <ul className="space-y-2">
                {NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => navigateToPage(item.id)}
                      className="hover:text-[#090A0C] dark:hover:text-[#F4F4F0] transition-colors cursor-pointer"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Studio Contact Details */}
            <div className="lg:col-span-3 space-y-2.5">
              <div className="text-xs font-semibold text-[#090A0C] dark:text-[#F4F4F0] mb-3">
                Get In Touch
              </div>
              <p className="text-[#090A0C] dark:text-[#E2E8F0]">
                123 Main Street, Suite 1400, New York, NY 10001
              </p>
              <p className="font-mono-tabular">Email: studio@3dmodelingcompany.com</p>
              <p className="font-mono-tabular">Phone: +1 (212) 555-0194</p>
              <p>Hours: Mon–Fri 9:00 AM – 6:00 PM EST</p>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>© {new Date().getFullYear()} 3D Modeling Company LLC. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => navigateToPage('contact')}
                className="hover:text-[#090A0C] dark:hover:text-[#F4F4F0] transition-colors cursor-pointer"
              >
                Mutual NDA Protocol
              </button>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => navigateToPage('estimator')}
                className="hover:text-[#090A0C] dark:hover:text-[#F4F4F0] transition-colors cursor-pointer"
              >
                Commercial IP Terms
              </button>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => navigateToPage('contact')}
                className="hover:text-[#090A0C] dark:hover:text-[#F4F4F0] transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Fullscreen 8K Case Study Lightbox Modal */}
      <ProjectLightboxModal
        project={activeLightboxProject}
        onClose={() => setActiveLightboxProject(null)}
        onRequestSimilarProject={handleCommissionSimilar}
      />

      {/* Minimal, Unobtrusive Bottom-Right Theme Toggle (Zero Radius) */}
      <button
        type="button"
        onClick={toggleTheme}
        title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        aria-label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        className="fixed bottom-4 right-4 z-40 w-8 h-8 flex items-center justify-center border border-black/20 dark:border-white/15 bg-white/90 dark:bg-[#121418]/90 text-[#090A0C] dark:text-[#F4F4F0] opacity-70 hover:opacity-100 hover:border-black dark:hover:border-[#FACC15] rounded-none transition-all cursor-pointer"
      >
        {theme === 'light' ? (
          <Moon className="w-3.5 h-3.5" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-[#FACC15]" />
        )}
      </button>
    </div>
  );
}
