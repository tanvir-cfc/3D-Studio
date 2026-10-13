export interface MusemindCaseStudy {
  id: string;
  title: string;
  client: string;
  category: string;
  deliverables: string;
  impactMetric: string;
  impactDetail: string;
  description: string;
  image: string;
  year: string;
  platforms: string;
}

export interface MusemindService {
  number: string;
  title: string;
  tagline: string;
  summary: string;
  capabilities: string[];
  deliverables: string;
  leadTime: string;
  iconName: string;
}

export interface MusemindProcessStep {
  step: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
  clientOutcome: string;
}

export interface MusemindTestimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  rating: number;
  metric: string;
  avatarInitials: string;
}

export interface MusemindArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  author: string;
  date: string;
  tags: string[];
}

export interface MusemindFaq {
  id: string;
  question: string;
  category: string;
  answer: string;
}

// Real Client Logos from Musemind
export const MUSEMIND_CLIENTS = [
  { name: 'VISA', sector: 'Global Payments' },
  { name: 'META', sector: 'Social Technology' },
  { name: 'MICROSOFT', sector: 'Enterprise Cloud' },
  { name: 'GOOGLE', sector: 'Search & Ecosystem' },
  { name: 'CISCO', sector: 'Networking & Security' },
  { name: 'PANTHER', sector: 'Cloud Cybersecurity' },
  { name: 'TAMARA', sector: 'Fintech & BNPL' },
  { name: 'TELENOR', sector: 'Telecommunications' },
  { name: 'DUBAI AUTODROME', sector: 'Sports & Entertainment' },
];

export const MUSEMIND_METRICS = [
  {
    number: '500+',
    label: 'Digital Products Launched',
    detail: 'From early-stage seed MVPs to enterprise SaaS platforms used by millions daily.',
  },
  {
    number: '70+',
    label: 'Designers & Strategists',
    detail: 'Senior specialists in UI/UX, user research, motion design, and design systems.',
  },
  {
    number: '98.6%',
    label: 'Client Satisfaction Rate',
    detail: 'Consistent 5-star ratings on Clutch, GoodFirms, and peer recommendation networks.',
  },
  {
    number: '$250M+',
    label: 'Client Venture Funding',
    detail: 'Capital raised by our startup and SaaS partners following our UX/UI product releases.',
  },
];

export const MUSEMIND_SERVICES: MusemindService[] = [
  {
    number: '01',
    title: 'UI/UX Product Design',
    tagline: 'Interfaces that turn complex workflows into effortless digital experiences.',
    summary:
      'We craft intuitive, human-centered interfaces for web applications, SaaS dashboards, and complex enterprise software. Every layout is rooted in cognitive psychology and usability best practices.',
    capabilities: [
      'SaaS Dashboard & Web App Design',
      'Multi-Tier User Flow Architecture',
      'High-Fidelity Interactive Wireframing',
      'Micro-Interactions & Motion Design',
      'Accessibility & WCAG 2.1 AA Compliance',
    ],
    deliverables: 'Interactive Figma Prototype, Component Kits, Production Specs',
    leadTime: '3 – 6 Weeks',
    iconName: 'Layout',
  },
  {
    number: '02',
    title: 'UX Research & Usability Audits',
    tagline: 'Data-driven insights to uncover user friction and drive conversion.',
    summary:
      'We eliminate guesswork through qualitative user interviews, quantitative telemetry analysis, competitor benchmarking, and moderated usability testing to pinpoint exact points of drop-off.',
    capabilities: [
      'In-Depth User Interviews & Personas',
      'Customer Journey & Empathy Mapping',
      'Heuristic Usability Evaluation',
      'Funnel Drop-Off & Drop-In Telemetry',
      'Competitive Product Benchmarking',
    ],
    deliverables: 'Comprehensive UX Audit Deck, Usability Heatmaps, Actionable Roadmap',
    leadTime: '2 – 3 Weeks',
    iconName: 'Search',
  },
  {
    number: '03',
    title: 'Mobile App Design (iOS & Android)',
    tagline: 'Native and cross-platform mobile apps designed for instant adoption.',
    summary:
      'From gesture-driven micro-interactions to thumb-zone ergonomics, we design mobile apps that feel buttery smooth, load fast, and achieve category-leading retention rates.',
    capabilities: [
      'iOS Human Interface Guidelines Design',
      'Android Material 3 Responsive Architecture',
      'Mobile Design Systems & Component Tokens',
      'Haptic & Sound-Integrated Feedback',
      'App Store & Play Store Launch Assets',
    ],
    deliverables: 'Figma Mobile App Master Files, Interactive Click-Through, Asset Slices',
    leadTime: '4 – 8 Weeks',
    iconName: 'Smartphone',
  },
  {
    number: '04',
    title: 'Design Systems & Token Architecture',
    tagline: 'Modular, scalable design libraries engineered for frictionless handoff.',
    summary:
      'We build comprehensive design systems that bridge the gap between design and development. Multi-brand tokens, auto-layout components, and clear documentation enable engineering teams to ship 3x faster.',
    capabilities: [
      'Atomic Design Component Architecture',
      'Figma Variables & Multi-Theme Tokens',
      'Component State Matrix (Hover, Active, Error)',
      'Zeroheight & Storybook Documentation',
      'Governance & Version Control Guidelines',
    ],
    deliverables: 'Master Figma Design System, Semantic Tokens JSON, Documentation Hub',
    leadTime: '4 – 7 Weeks',
    iconName: 'Layers',
  },
  {
    number: '05',
    title: 'Web Design & Webflow Development',
    tagline: 'High-converting marketing sites that tell your story with conviction.',
    summary:
      'Transform your brand into a dynamic, interactive web experience. We combine editorial typography, custom 3D web assets, and clean Webflow/React code to turn visitors into qualified leads.',
    capabilities: [
      'Custom Responsive Marketing Websites',
      'Webflow CMS & Animations Architecture',
      'Interactive 3D / WebGL Integration',
      'SEO & Core Web Vitals Optimization',
      'Headless CMS & React Front-End',
    ],
    deliverables: 'Production Webflow/React Codebase, Custom CMS, Responsive Layouts',
    leadTime: '3 – 5 Weeks',
    iconName: 'Globe',
  },
  {
    number: '06',
    title: 'Brand Strategy & Visual Identity',
    tagline: 'Distinctive brand personalities that stand out in crowded markets.',
    summary:
      'Before opening Figma, we define your core market positioning, customer archetype, and emotional value proposition to create a timeless visual identity that resonates with enterprise buyers.',
    capabilities: [
      'Brand Positioning & Core Manifesto',
      'Logo Suite & Geometric Monograms',
      'Bespoke Typography Pairing & Scales',
      'Color Systems & Kinetic Graphic Devices',
      'Investor Pitch Decks & Marketing Collateral',
    ],
    deliverables: 'Brand Guidelines Manual (PDF), Vector Logo Assets, Presentation Kits',
    leadTime: '3 – 4 Weeks',
    iconName: 'Sparkles',
  },
];

export const MUSEMIND_CASE_STUDIES: MusemindCaseStudy[] = [
  {
    id: 'boon',
    title: 'Boon — Intelligent Talent Referral & Applicant Tracking SaaS',
    client: 'Boon Technologies · San Francisco, CA',
    category: 'B2B SaaS & Product Design',
    deliverables: 'End-to-End Web App UX, Interactive Prototype, Design System',
    impactMetric: '+142% Candidate Referral Velocity',
    impactDetail: 'Reduced candidate submission time from 14 minutes down to 3 minutes across 50,000+ active enterprise recruiters.',
    description:
      'Boon sought to reinvent employee referral programs with an automated, reward-driven recruiting platform. We designed an uncluttered, high-velocity interface that simplifies applicant tracking and gives HR teams real-time analytics.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80',
    year: '2025',
    platforms: 'Web SaaS · React Dashboard',
  },
  {
    id: 'prime-iraq',
    title: 'Prime — Next-Generation Bilingual Fintech Banking App',
    client: 'Prime Financial Group · Baghdad & Dubai',
    category: 'Fintech & Mobile UX',
    deliverables: 'iOS & Android App Design, Biometric Security Flow, Arabic/English RTL UX',
    impactMetric: '4.9 App Store Rating & 350K+ Active Users',
    impactDetail: 'Achieved 88% digital onboarding completion rate with instant verification, bypassing traditional branch visits.',
    description:
      'A ground-up mobile banking transformation for the Middle East market. We engineered an ultra-secure, bilingual (Arabic & English) mobile experience featuring seamless RTL layout mirroring, virtual card issuance, and instant peer-to-peer remittances.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1400&q=80',
    year: '2025',
    platforms: 'iOS & Android Native App',
  },
  {
    id: 'arrive',
    title: 'Arrive — AI-Curated Intelligent Travel & Navigation Companion',
    client: 'Arrive Mobility · London, UK',
    category: 'Consumer Mobile App',
    deliverables: 'Mobile UX/UI, Real-Time Map Interfaces, Recommendation Engine',
    impactMetric: '2.4x Daily Active User Growth',
    impactDetail: 'Elevated in-app itinerary saves by 165% through context-aware discovery cards based on local weather and time.',
    description:
      'Arrive needed an intuitive mobile app that redefines travel discovery. We created a spatial, card-driven navigation interface that curates hyper-local dining, transit, and cultural itineraries with minimal cognitive load.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1400&q=80',
    year: '2025',
    platforms: 'iOS App · Apple Watch Companion',
  },
  {
    id: 'trainmate',
    title: 'Trainmate AI — Smart Workout & Adaptive Fitness Experience',
    client: 'Trainmate Inc. · New York, NY',
    category: 'HealthTech & AI Mobile App',
    deliverables: 'Voice-Assisted Workout UI, Macro Tracking, Wearable Sync',
    impactMetric: '+85% 90-Day Subscription Retention',
    impactDetail: 'Surpassed industry benchmark retention by 3.2x by designing frictionless 2-tap workout logging.',
    description:
      'An AI-driven fitness coaching app that personalizes rep-by-rep resistance routines. We designed high-contrast, glanceable workout screens with kinetic progress animations, audio cue feedback, and automated macro calculations.',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1400&q=80',
    year: '2024',
    platforms: 'Mobile App · HealthKit Integration',
  },
  {
    id: 'panther',
    title: 'Panther — Cloud-Scale Cybersecurity Platform & Marketing Web',
    client: 'Panther Labs · Austin, TX',
    category: 'Enterprise Tech & Brand Identity',
    deliverables: 'Brand Identity Redesign, Enterprise Website, Product Illustrations',
    impactMetric: '3.2x Inbound Enterprise Demo Requests',
    impactDetail: 'Modernized developer perception and accelerated Fortune 500 security team procurement inquiries.',
    description:
      'Panther required an authoritative, high-tech digital identity to match its powerful security data platform. We designed an architecturally crisp web experience combining dark-mode data visualizations with high-impact product positioning.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=80',
    year: '2024',
    platforms: 'Next.js Web Experience · Component Library',
  },
  {
    id: 'daxtra',
    title: 'Daxtra — Enterprise AI Recruiting & Semantic Talent Matching',
    client: 'Daxtra Technologies · Richmond, UK',
    category: 'AI Software & Complex Systems',
    deliverables: 'Complex Search UX, Semantic Data Parsing UI, Multi-Tenant Design System',
    impactMetric: '-45% Average Time-to-Fill Key Roles',
    impactDetail: 'Streamlined resume ingestion workflows across 2,000+ staffing agencies handling 10M+ candidates monthly.',
    description:
      'Transforming legacy recruitment software into a sleek, AI-assisted candidate search engine. We streamlined complex boolean query builders into natural-language filters with instant resume preview drawers.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80',
    year: '2024',
    platforms: 'Enterprise Web Platform',
  },
];

export const MUSEMIND_PROCESS_STEPS: MusemindProcessStep[] = [
  {
    step: '01',
    title: 'Discover & Strategy Alignment',
    duration: 'Week 1 – 2',
    description:
      'We dive deep into your business objectives, technical constraints, user pain points, and competitors. Stakeholder interviews and empathy workshops establish clear North Star metrics.',
    deliverables: [
      'Stakeholder Alignment Workshop',
      'User Personas & Customer Journey Maps',
      'Competitive Feature Matrix',
      'Product Requirements Document (PRD)',
    ],
    clientOutcome: 'Zero creative ambiguity and 100% strategic alignment before designing.',
  },
  {
    step: '02',
    title: 'Architecture & Wireframe Validation',
    duration: 'Week 2 – 4',
    description:
      'We translate research into intuitive information architecture, task flows, and low-fidelity wireframes. We test rapid prototypes to validate navigation mental models early.',
    deliverables: [
      'Comprehensive Information Architecture',
      'Low-Fidelity Screen Wireframes',
      'Interactive User Flow Click-Through',
      'Usability Validation Feedback Report',
    ],
    clientOutcome: 'Flawless product flow and validated user journeys before visual styling.',
  },
  {
    step: '03',
    title: 'High-Fidelity UI & Interactive Prototyping',
    duration: 'Week 4 – 7',
    description:
      'We apply high-craft visual design: typography hierarchy, color palette, custom iconography, and micro-animations. We build click-through prototypes that feel identical to a live product.',
    deliverables: [
      'Pixel-Perfect High-Fidelity UI Screens',
      'Realistic Click-Through Figma Prototype',
      'Micro-Interactions & Animation Specs',
      'Design Token Variable Library',
    ],
    clientOutcome: 'Stunning visual craft that excites investors and captivates users.',
  },
  {
    step: '04',
    title: 'Design System & Developer Handoff',
    duration: 'Week 7 – 8',
    description:
      'We organize components into an enterprise-grade design system with documented tokens, auto-layout rules, and responsive states. We collaborate directly with your engineers for QA.',
    deliverables: [
      'Master Component Library in Figma',
      'Semantic Token JSON (Tokens Studio)',
      'Developer Redline Specifications',
      'Post-Launch UI Quality Assurance Pass',
    ],
    clientOutcome: 'Engineers ship 3x faster with zero design discrepancies or rework.',
  },
];

export const MUSEMIND_PILLARS = [
  {
    number: '01',
    title: 'Insight-Driven, Not Guesswork',
    summary:
      'Every button placement, typographic choice, and information hierarchy is informed by behavioral analytics, usability heatmaps, and user interviews.',
  },
  {
    number: '02',
    title: 'Rapid Bi-Weekly Sprints',
    summary:
      'We work in transparent, agile two-week design sprints. You get continuous Loom video updates, open Figma file access, and direct Slack communication.',
  },
  {
    number: '03',
    title: 'Enterprise Design Token Architecture',
    summary:
      'We don’t hand over static screens. We deliver scalable, multi-theme design tokens engineered to integrate directly with React, iOS Swift, and Android Compose.',
  },
  {
    number: '04',
    title: 'Measurable Commercial Outcomes',
    summary:
      'Our success is tied to your business KPIs: lower bounce rates, higher trial-to-paid conversion, improved retention, and rapid user onboarding.',
  },
  {
    number: '05',
    title: 'Cross-Timezone Global Velocity',
    summary:
      'With design leads across New York, London, and international delivery hubs, we provide follow-the-sun momentum and rapid response times.',
  },
  {
    number: '06',
    title: 'Fixed Milestone Pricing & No Overages',
    summary:
      'Transparent project scopes with binding milestone deliverables and scheduled revision gates. You always know exactly what is being shipped and when.',
  },
];

export const MUSEMIND_AWARDS = [
  {
    year: '2025',
    title: 'Dribbble Select Global Studio',
    organization: 'Dribbble Design Network',
    badge: 'TOP 1% WORLDWIDE',
  },
  {
    year: '2025',
    title: 'Best Mobile Banking UI/UX',
    organization: 'Fintech Design Awards',
    badge: 'GOLD TROPHY',
  },
  {
    year: '2024',
    title: 'Top Global UX Design Agency',
    organization: 'Clutch Leaders Matrix',
    badge: 'RANKED #1 IN B2B',
  },
  {
    year: '2024',
    title: 'Behance Interaction Design Honor',
    organization: 'Adobe Behance Curation Team',
    badge: 'FEATURED SHOWCASE',
  },
  {
    year: '2024',
    title: 'Webby Nominee: Best Product UX',
    organization: 'The Webby Awards',
    badge: 'HONOREE',
  },
];

export const MUSEMIND_TESTIMONIALS: MusemindTestimonial[] = [
  {
    id: 'test-1',
    quote:
      'Musemind completely transformed our SaaS platform. Their UX research pinpointed the exact bottlenecks in our onboarding funnel. Within 60 days of launching the new UI, our trial-to-paid conversion increased by 84%. Their speed and communication were exceptional.',
    author: 'David Sterling',
    role: 'Chief Product Officer',
    company: 'Boon Technologies',
    location: 'San Francisco, CA',
    rating: 5,
    metric: '+84% Trial Conversion Lift',
    avatarInitials: 'DS',
  },
  {
    id: 'test-2',
    quote:
      'Building a bilingual fintech app with full Arabic and English mirroring is extraordinarily difficult. Musemind delivered a world-class banking experience that received a 4.9 rating on the App Store with zero post-launch UI bugs. They are true product partners.',
    author: 'Zaid Al-Mansoor',
    role: 'Head of Digital Banking',
    company: 'Prime Financial Group',
    location: 'Dubai, UAE',
    rating: 5,
    metric: '4.9 App Store Rating & 350K Users',
    avatarInitials: 'ZA',
  },
  {
    id: 'test-3',
    quote:
      'The design system Musemind built for us saved our engineering team at least four months of development. The tokens matched our React code seamlessly. If you want enterprise-grade UI that actually moves business metrics, hire Musemind.',
    author: 'Elena Rostova',
    role: 'VP of Engineering',
    company: 'Panther Labs',
    location: 'Austin, TX',
    rating: 5,
    metric: '3x Engineering Shipping Speed',
    avatarInitials: 'ER',
  },
];

export const MUSEMIND_INSIGHTS: MusemindArticle[] = [
  {
    id: 'art-1',
    title: 'How to Build an Enterprise Design System Engineers Actually Want to Use',
    category: 'Design Systems',
    readTime: '6 min read',
    excerpt:
      'Why 70% of design systems fail after 6 months, and how aligning Figma variables with React token trees creates an unbreakable single source of truth.',
    author: 'Nasir Uddin',
    date: 'February 2026',
    tags: ['DesignTokens', 'Figma', 'Engineering'],
  },
  {
    id: 'art-2',
    title: 'The B2B SaaS Redesign Playbook: Doubling Conversions in Under 90 Days',
    category: 'Product Strategy',
    readTime: '8 min read',
    excerpt:
      'A breakdown of how removing 3 unnecessary onboarding steps and introducing contextual empty states propelled a SaaS client to $12M ARR.',
    author: 'Rasel Ahmed',
    date: 'January 2026',
    tags: ['SaaS', 'UXResearch', 'Conversion'],
  },
  {
    id: 'art-3',
    title: 'Designing for Ambient AI: The Next Frontier of Frictionless Interfaces',
    category: 'Emerging Tech',
    readTime: '5 min read',
    excerpt:
      'Moving beyond chat bubbles. How predictive micro-interactions and invisible automation are reshaping modern software UX in 2026.',
    author: 'Fahad Ibn Sayeed',
    date: 'December 2025',
    tags: ['AI_UX', 'InteractionDesign', 'Future'],
  },
];

export const MUSEMIND_FAQS: MusemindFaq[] = [
  {
    id: 'faq-1',
    question: 'How long does an end-to-end digital product design engagement take?',
    category: 'Project Timelines',
    answer:
      'Most comprehensive product engagements range from 4 to 10 weeks depending on complexity. A targeted MVP or mobile app redesign typically takes 4 to 6 weeks, while an enterprise SaaS platform with an accompanying multi-brand design system spans 8 to 12 weeks. We operate in fast, bi-weekly sprints.',
  },
  {
    id: 'faq-2',
    question: 'What exact deliverables will our engineering team receive?',
    category: 'Handoff & Deliverables',
    answer:
      'You receive complete, organized Figma project files with autolayout and responsive constraints, a master design system with components and interactive variants, semantic design tokens (JSON format), developer redline specs, micro-interaction animation values, and an interactive prototype ready for stakeholder presentations.',
  },
  {
    id: 'faq-3',
    question: 'How do you collaborate across different time zones?',
    category: 'Workflow & Communication',
    answer:
      'We have dedicated design hubs in New York, London, and international studios, allowing us to overlap directly with North American, European, and Asian business hours. We communicate daily via a dedicated private Slack channel, conduct weekly sprint reviews via Google Meet/Zoom, and share asynchronous Loom video walkthroughs.',
  },
  {
    id: 'faq-4',
    question: 'What are your engagement models (Fixed Project vs. Dedicated Sprint Team)?',
    category: 'Pricing & Scoping',
    answer:
      'We offer two transparent models: (1) Fixed Milestone Scoping with guaranteed deliverables, scheduled revision passes, and transparent pricing; and (2) Dedicated Monthly Design Sprint Retainers for fast-growing startups and enterprises requiring an embedded senior product design team on ongoing roadmap features.',
  },
  {
    id: 'faq-5',
    question: 'Do you provide front-end development along with UI/UX design?',
    category: 'Development Capabilities',
    answer:
      'Yes! Alongside our core product design practice, we have an expert front-end engineering team specializing in Webflow CMS, React, Next.js, and TypeScript. We can build production-ready marketing websites, customer portals, and web app front-ends that match the approved Figma designs with 100% fidelity.',
  },
  {
    id: 'faq-6',
    question: 'Do you execute a Mutual Non-Disclosure Agreement (NDA)?',
    category: 'Security & Confidentiality',
    answer:
      'Absolutely. We sign mutual NDAs before any initial discovery call or project documentation exchange. All files, customer data, and proprietary concepts remain strictly confidential and transfer entirely to your intellectual property ownership upon milestone completion.',
  },
];
