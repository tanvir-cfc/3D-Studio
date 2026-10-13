import heroArchvizImg from '../assets/images/hero_archviz_pavilion_1791465171624.jpg';
import luxuryChronographImg from '../assets/images/render_luxury_chronograph_1791465184572.jpg';
import interiorLoftImg from '../assets/images/render_interior_loft_1791465196071.jpg';
import automotiveConceptImg from '../assets/images/render_automotive_concept_1791465207009.jpg';
import industrialCutawayImg from '../assets/images/render_industrial_cutaway_1791465217823.jpg';

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  category: 'architectural' | 'product' | 'automotive' | 'industrial';
  categoryLabel: string;
  year: string;
  resolution: string;
  polyCount: string;
  renderEngine: string;
  turnaround: string;
  impactMetric: string;
  description: string;
  challenge: string;
  solution: string;
  image: string;
  featured?: boolean;
}

export interface ServiceItem {
  number: string;
  id: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string;
  formats: string;
  leadTime: string;
  outcomeStat: string;
  image: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  phase: string;
  duration: string;
  summary: string;
  technicalDetails: string;
  clientMilestone: string;
  renderPassMode: 'wireframe' | 'clay' | 'shader' | 'final';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'cantilever-pavilion',
    title: 'Lake Zurich Cantilever Residence',
    client: 'Keller & Partner Architekten',
    category: 'architectural',
    categoryLabel: 'Architectural Visualization',
    year: '2026',
    resolution: '8K EXR · 32-bit Linear',
    polyCount: '48.4M Polygons',
    renderEngine: 'V-Ray 7 · Chaos Vantage',
    turnaround: '9 Business Days',
    impactMetric: '100% Pre-Construction Approval & $14.2M Private Sale',
    description:
      'Photorealistic twilight architectural visualization of a board-formed brutalist concrete residence cantilevered over Lake Zurich, engineered for pre-construction municipal approval and private investor presentation.',
    challenge:
      'The architectural firm needed to prove how the 14-meter concrete overhang and warm interior recessed lighting interacted with the natural alpine twilight without building a physical scale model.',
    solution:
      'We authored custom displacement maps for the board-formed concrete, simulated physically accurate water caustics and sky dome HDRI lighting, and delivered 12 high-dynamic-range stills plus a real-time Unreal Engine 5 walkthrough.',
    image: heroArchvizImg,
    featured: true,
  },
  {
    id: 'tourbillon-chronograph',
    title: 'Calibre 09 Tourbillon & Sapphire Collection',
    client: 'Vacheron & Söhne Horology',
    category: 'product',
    categoryLabel: '3D Product Modeling & CGI',
    year: '2026',
    resolution: '8K Macro · Sub-Micron CAD',
    polyCount: '19.2M Polygons',
    renderEngine: 'OctaneRender · Cinema 4D',
    turnaround: '7 Business Days',
    impactMetric: '+165% Pre-Order Conversion Across Global Digital Flagships',
    description:
      'Sub-millimeter CAD-to-CGI product visualization of an exposed tourbillon mechanical chronograph in brushed Grade-5 titanium and 18k rose gold, paired with a bespoke royal sapphire signet ring.',
    challenge:
      'Physical prototypes were six months away from completion, but the brand needed flagship campaign imagery and 360-degree e-commerce turntables ahead of the Geneva Watch Days exhibition.',
    solution:
      'Starting from raw STEP engineering files, we re-topologized 214 internal watch movement gears, authored physically based anisotropic brushed metal shaders, and calculated real dispersion caustics through the domed sapphire crystal.',
    image: luxuryChronographImg,
    featured: false,
  },
  {
    id: 'tribeca-penthouse-loft',
    title: 'Tribeca Double-Height Penthouse Interior',
    client: 'Vanguard Residential Development',
    category: 'architectural',
    categoryLabel: 'Interior CGI & Virtual Staging',
    year: '2026',
    resolution: '6K Stills · 360° WebXR Tour',
    polyCount: '34.8M Polygons',
    renderEngine: 'Corona Renderer 12',
    turnaround: '6 Business Days',
    impactMetric: '4 Penthouse Units Reserved Off-Plan in 21 Days ($38M Volume)',
    description:
      'Full interior 3D modeling and daylight simulation for a double-height Manhattan loft featuring bespoke full-grain cognac leather seating, honed Roman travertine, and industrial steel fenestration.',
    challenge:
      'Buyers struggled to visualize warmth and acoustic comfort from raw structural floor plans in a bare concrete shell.',
    solution:
      'We modeled custom furniture pieces down to the saddle stitching and micro-scratches, calibrated natural morning sun-sky portals, and produced interactive material-swap views for prospective buyers.',
    image: interiorLoftImg,
    featured: false,
  },
  {
    id: 'aerolith-gt-concept',
    title: 'Aerolith GT Electric Concept Coupé',
    client: 'Aether Mobility GmbH',
    category: 'automotive',
    categoryLabel: 'Automotive & Industrial CGI',
    year: '2026',
    resolution: '8K Studio + Real-Time USDZ',
    polyCount: '28.6M Polygons',
    renderEngine: 'Unreal Engine 5.5 · Path Tracer',
    turnaround: '11 Business Days',
    impactMetric: 'Featured at Munich Mobility Show & 2.4M Launch Film Views',
    description:
      'Class-A NURBS surface modeling and dramatic darkroom studio visualization of an electric grand tourer concept with exposed forged carbon aerodynamics.',
    challenge:
      'The design team required unified 3D assets that could simultaneously power 8K print billboards, an interactive iPad configurator, and an LED stage backdrop.',
    solution:
      'We built a multi-LOD Universal Scene Description (USD) pipeline with multi-layer car paint flake shaders and custom overhead linear softbox light rigs.',
    image: automotiveConceptImg,
    featured: false,
  },
  {
    id: 'aerospace-turbine-cutaway',
    title: 'Acoustic Turbine & Optical Sensor Assembly',
    client: 'Helios Defense & Optics',
    category: 'industrial',
    categoryLabel: 'Technical Exploded Animation',
    year: '2025',
    resolution: '4K 60fps + Interactive WebGL',
    polyCount: '14.5M Polygons',
    renderEngine: 'Redshift · Houdini',
    turnaround: '8 Business Days',
    impactMetric: 'Reduced Enterprise Sales Cycle by 34% in Technical Briefings',
    description:
      'Precision isometric exploded view and mechanical assembly visualization of an aerospace acoustic turbine core and multi-element optical sensor housing.',
    challenge:
      'Complex internal tolerances and copper rotor assemblies were impossible to photograph or explain clearly using 2D engineering blueprints.',
    solution:
      'We converted proprietary SolidWorks assemblies into clean quad-mesh topology, animated a synchronized exploded-view sequence, and rendered annotated technical stills for stakeholder documentation.',
    image: industrialCutawayImg,
    featured: true,
  },
];

export const SERVICES: ServiceItem[] = [
  {
    number: '01',
    id: '3d-modeling',
    title: '01. Precision 3D Modeling & CAD Conversion',
    subtitle: 'Sub-millimeter subdivision, NURBS, and clean quad-mesh geometry',
    description:
      'We transform 2D blueprints, rough industrial sketches, STEP/IGES engineering files, or physical reference photos into watertight, production-ready 3D geometry. Every asset is built with clean quad topology, calibrated UV unwrapping, and modular hierarchy for seamless downstream rendering or manufacturing.',
    deliverables: 'High-Poly Subdivision Mesh · Low-Poly Real-Time LODs · 4K/8K PBR Texture Sets',
    formats: 'FBX · OBJ · USDZ · glTF 2.0 · Blend · 3ds Max · STEP',
    leadTime: '3–5 Business Days per Asset',
    outcomeStat: 'Zero-defect geometry verified across 4,200+ commercial SKUs',
    image: luxuryChronographImg,
  },
  {
    number: '02',
    id: 'photorealistic-rendering',
    title: '02. Photorealistic Studio & Architectural Rendering',
    subtitle: 'Physically based ray-tracing, bespoke shaders, and editorial lighting',
    description:
      'Replace expensive physical photo shoots and location staging with indistinguishable 8K CGI. We engineer micro-surface imperfections, subsurface scattering, glass caustics, and natural daylight simulation so architects, real estate developers, and luxury brands can market products months before manufacturing completes.',
    deliverables: '8K Print-Ready Stills · 32-Bit Multi-Layer EXR · Color-Graded Campaign Masters',
    formats: 'TIFF · PNG · OpenEXR · ACEScg Color Pipeline',
    leadTime: '5–8 Business Days per Scene',
    outcomeStat: '68% average reduction in visual production cost vs. physical shoots',
    image: heroArchvizImg,
  },
  {
    number: '03',
    id: 'animation-walkthroughs',
    title: '03. 3D Animation, Exploded Views & Walkthroughs',
    subtitle: '60fps cinematic camera choreography and mechanical simulations',
    description:
      'Bring static architecture and complex hardware to life through fluid motion. From atmospheric architectural fly-throughs with shifting golden-hour light to exploded technical cutaways demonstrating internal engineering mechanisms, we direct and render broadcast-grade motion sequences.',
    deliverables: '4K 60fps Master Film · Social Vertical Cutdowns · Annotated Technical Loops',
    formats: 'Apple ProRes 4444 · MP4 (H.265) · Frame Sequences',
    leadTime: '10–14 Business Days',
    outcomeStat: '+210% investor engagement hold-time during pitch presentations',
    image: industrialCutawayImg,
  },
  {
    number: '04',
    id: 'ar-vr-visualization',
    title: '04. AR/VR & Real-Time Spatial Visualization',
    subtitle: 'WebXR product configurators, Apple Vision Pro USDZ, and Unreal 5 twins',
    description:
      'Deploy interactive 3D experiences directly in your customers’ browsers or spatial headsets. We optimize high-resolution models into lightweight, Draco-compressed glTF and USDZ assets with real-time material switching, dimension overlays, and instant augmented reality placement.',
    deliverables: 'Interactive WebGL Configurator · Native iOS QuickLook USDZ · Unreal 5 Package',
    formats: 'glTF / GLB · USDZ · Unreal Engine 5.5 · Unity',
    leadTime: '7–10 Business Days',
    outcomeStat: '3.2× higher e-commerce add-to-cart rate with live 3D inspection',
    image: automotiveConceptImg,
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: '01. Concept & Technical Briefing',
    phase: 'Discovery & CAD Audit',
    duration: 'Day 1–2',
    summary:
      'Every project begins with a structured technical alignment. We review your CAD blueprints, architectural DWG plans, material swatch references, or rough industrial sketches, defining exact camera focal lengths, target platforms, and polygon budgets.',
    technicalDetails: 'Blueprint ingestion · Camera blocking · Scale & unit calibration (mm/cm) · Lighting moodboard',
    clientMilestone: 'Signed-off 3D clay camera blockout & composition angles',
    renderPassMode: 'wireframe',
  },
  {
    number: '02',
    title: '02. Precision Modeling & Detailing',
    phase: 'Subdivision & Topology',
    duration: 'Day 3–5',
    summary:
      'Our senior 3D modelers construct watertight quad-mesh geometry and NURBS surfaces. Whether sculpting bespoke upholstery seams, architectural facade joinery, or sub-millimeter watch gears, we verify proportions and silhouette accuracy from every angle.',
    technicalDetails: 'Quad-dominant topology · Chamfer & bevel edge control · UV unwrapping · High-to-low poly baking',
    clientMilestone: 'Interactive 360° clay & wireframe geometry inspection link',
    renderPassMode: 'clay',
  },
  {
    number: '03',
    title: '03. PBR Texturing, Lighting & Ray-Tracing',
    phase: 'LookDev & Shader Engineering',
    duration: 'Day 6–8',
    summary:
      'This is where physical realism emerges. We author custom 8K PBR shaders with micro-roughness maps, anisotropy, and subsurface scattering, then illuminate the scene using ACEScg linear light rigs and HDRI environment domes.',
    technicalDetails: '8K Substance PBR maps · Ray-traced caustics & GI · Volumetric atmosphere · Physical camera exposure',
    clientMilestone: 'Watermarked 4K look-development proofs for material & lighting review',
    renderPassMode: 'shader',
  },
  {
    number: '04',
    title: '04. Review, Post-Production & Final Delivery',
    phase: '32-Bit Compositing & Handover',
    duration: 'Day 9–10',
    summary:
      'Following your feedback rounds, we render final 8K frames with deep-channel cryptomattes, perform optical color grading, and package all native 3D source files, textures, and real-time web assets under strict NDA protection.',
    technicalDetails: '32-bit EXR multi-pass compositing · Cryptomatte isolation · ACES color mastering · Multi-format export',
    clientMilestone: 'Uncompressed 8K masters + organized source asset repository',
    renderPassMode: 'final',
  },
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Deliverables & Formats',
    question: 'What 3D file formats and image resolutions do you deliver?',
    answer:
      'For still renderings, we deliver uncompressed 16-bit/32-bit TIFF, PNG, and multi-layer OpenEXR files up to 8K resolution (7680 × 4320 px) with isolated alpha masks and material cryptomattes. For 3D models and real-time assets, we provide native source files (.blend, .max, .c4d, .ma) alongside universal exchange formats including FBX, OBJ, USDZ (for Apple iOS AR), glTF/GLB (for WebGL), and STEP/IGES when engineering compatibility is required.',
  },
  {
    id: 'faq-2',
    category: 'Realism & Input Requirements',
    question: 'Do we need finished CAD files to start, or can you work from sketches and photos?',
    answer:
      'We work with whatever starting material you have. If you have engineering STEP/IGES or architectural Revit/DWG files, we ingest them directly with zero dimensional drift. If your product or building is still in the concept stage, our modelers can build accurate 3D geometry from 2D hand sketches, moodboards, physical material swatches, or smartphone reference photos with basic dimensions.',
  },
  {
    id: 'faq-3',
    category: 'Timeline & Revisions',
    question: 'How long does a typical 3D modeling and rendering project take?',
    answer:
      'Single-product 3D modeling and studio rendering typically takes 4 to 6 business days. Full architectural interior or exterior visualization packages (4–6 camera angles) take 7 to 10 business days, while 4K 60fps animations or interactive WebGL configurators range from 2 to 3 weeks. Every project includes structured revision gates at the geometry (clay) stage and the lighting/material stage so nothing is left to chance.',
  },
  {
    id: 'faq-4',
    category: 'Pricing & Scoping',
    question: 'How is pricing structured for custom 3D visualization projects?',
    answer:
      'We price projects transparently based on geometric complexity, number of camera angles or SKUs, and required output formats—never vague hourly estimates. Individual studio product renders start at $650 per SKU (with volume discounts for 10+ SKU catalogs), architectural visualization suites range from $2,400 to $6,500, and custom animations or AR configurators are scoped with a fixed-fee milestone schedule. Use our interactive estimator below for an instant baseline quote.',
  },
  {
    id: 'faq-5',
    category: 'Security & IP',
    question: 'How do you protect unreleased product designs and confidential architectural plans?',
    answer:
      'Data security is built into our studio workflow. We execute mutual Non-Disclosure Agreements (NDAs) prior to receiving any blueprints or CAD files. All project files are stored on encrypted, access-controlled studio servers, never used to train third-party generative models, and upon final payment, 100% of intellectual property rights and source files transfer exclusively to your organization.',
  },
  {
    id: 'faq-6',
    category: 'Client Industries',
    question: 'Who benefits most from partnering with 3D Modeling Company?',
    answer:
      'We partner with four core groups: (1) Architects and real estate developers securing zoning approvals and off-plan unit reservations; (2) Hardware, watch, jewelry, and furniture brands launching e-commerce catalogs before physical manufacturing finishes; (3) Industrial and aerospace engineering teams explaining complex internal assemblies; and (4) Creative agencies needing photorealistic CGI key visuals.',
  },
];

export const CLIENT_BRANDS = [
  { name: 'KELLER ARCHITEKTEN', sector: 'Zurich · Architecture' },
  { name: 'VACHERON HOROLOGY', sector: 'Geneva · Luxury Goods' },
  { name: 'AETHER MOBILITY', sector: 'Munich · Automotive' },
  { name: 'VANGUARD ESTATES', sector: 'New York · Real Estate' },
  { name: 'HELIOS OPTICS', sector: 'Boston · Aerospace' },
  { name: 'NORDIC FORM STUDIO', sector: 'Copenhagen · Furniture' },
];

export interface AwardItem {
  id: string;
  year: string;
  title: string;
  organization: string;
  category: string;
  badge: string;
}

export const AWARDS: AwardItem[] = [
  {
    id: 'award-1',
    year: '2026',
    title: 'Site of the Day Nominee',
    organization: 'Awwwards Global',
    category: 'Real-Time WebGL & Spatial Architecture',
    badge: 'AWWWARDS SOTD',
  },
  {
    id: 'award-2',
    year: '2025',
    title: 'Curator 3D & CGI Showcase Winner',
    organization: 'Behance Interaction & 3D Network',
    category: 'Precision Watch & Tourbillon CGI',
    badge: 'BEHANCE FEATURE',
  },
  {
    id: 'award-3',
    year: '2025',
    title: 'Top 3D Modeling & CGI Agency Globally',
    organization: 'Clutch B2B Leaders',
    category: '4.9/5 Star Verified Client Rating',
    badge: 'CLUTCH TOP 1%',
  },
  {
    id: 'award-4',
    year: '2024',
    title: 'ArchViz Visualizer of the Year Finalist',
    organization: 'CGArchitect Awards',
    category: 'Brutalist Concrete Pavilion Twilight Series',
    badge: 'CGARCHITECT FINALIST',
  },
  {
    id: 'award-5',
    year: '2024',
    title: 'Excellence in Technical Mechanical Motion',
    organization: 'Visual Effects Society (VES) Forum',
    category: 'Aerospace Turbine Exploded Engineering 3D',
    badge: 'VES RECOGNITION',
  },
];

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  avatarInitials: string;
  projectType: string;
  outcomeMetric: string;
  rating: number;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    quote:
      'Working with 3D Modeling Company was a decisive commercial turning point. Before engaging their LookDev team, physical sample photography delayed our horology catalog launches by 6 weeks. Their sub-micron micro-bevel precision and caustic sapphire light calculation yielded an instantaneous +165% pre-order conversion surge across our global digital flagships.',
    author: 'Vikram Kline',
    role: 'Chief Executive Officer',
    company: 'Marketplace Luxury Group LLC',
    location: 'Geneva & New York',
    avatarInitials: 'VK',
    projectType: 'High Horology CAD-to-CGI',
    outcomeMetric: '+165% Pre-Order Conversion',
    rating: 5,
  },
  {
    id: 'test-2',
    quote:
      'In luxury architectural development, municipal approval and off-plan sales demand absolute realism. 3D Modeling Company translated our complex Revit blueprints into an 8K twilight lakefront villa with photorealistic concrete displacement and alpine reflection. The property achieved full municipal sign-off and closed a $14.2M private reservation before ground was broken.',
    author: 'Elena Rostova',
    role: 'Lead Architect & Partner',
    company: 'Keller & Partner Architekten',
    location: 'Zurich, Switzerland',
    avatarInitials: 'ER',
    projectType: 'Architectural Visualization & UE5 Walkthrough',
    outcomeMetric: '$14.2M Off-Plan Private Sale',
    rating: 5,
  },
  {
    id: 'test-3',
    quote:
      'Explaining our proprietary coaxial turbine assembly to enterprise aerospace stakeholders using 2D technical drawings was losing us deals. Their team converted our raw SolidWorks files into synchronized 60fps exploded cutaways and an interactive WebGL inspector. It slashed our enterprise technical briefing cycle by 34% within one quarter.',
    author: 'Dr. Marcus Vance',
    role: 'VP of Product Engineering',
    company: 'Helios Defense & Optics',
    location: 'Boston, MA',
    avatarInitials: 'MV',
    projectType: 'Exploded Mechanical Animation',
    outcomeMetric: '-34% Enterprise Sales Cycle Duration',
    rating: 5,
  },
];

export interface InsightArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  author: string;
  tags: string[];
}

export const INSIGHTS_ARTICLES: InsightArticle[] = [
  {
    id: 'insight-1',
    title: 'Why Real-Time WebGL & USDZ Are Replacing Flat E-Commerce Photography in 2026',
    category: 'Spatial Commerce & WebXR',
    date: 'October 2026',
    readTime: '5 min read',
    excerpt:
      'Modern consumers expect interactive 360-degree inspection, material customization, and Apple Vision Pro spatial placement before purchasing high-ticket goods. Here is how leading brands achieve 3.2× higher add-to-cart rates.',
    author: 'LookDev Research Lab',
    tags: ['WebXR', 'USDZ', 'E-Commerce 3D', 'Three.js'],
  },
  {
    id: 'insight-2',
    title: 'Subdivision Quad Topology vs. Triangular Meshes: The Engineering Audit',
    category: '3D Geometry & Pipelines',
    date: 'September 2026',
    readTime: '7 min read',
    excerpt:
      'Why automated mesh decimation creates catastrophic shading artifacts during ray-tracing, and how handcrafted quad topology preserves clean curvature highlights across million-dollar industrial CAD files.',
    author: 'Engineering Modeling Team',
    tags: ['Quad Topology', 'CAD to CGI', 'Subdivision', 'STEP Ingestion'],
  },
  {
    id: 'insight-3',
    title: 'Mastering ACEScg Color Workflows in Architectural Visualization',
    category: 'Lighting & Color Science',
    date: 'August 2026',
    readTime: '6 min read',
    excerpt:
      'Standard sRGB clipping destroys high-dynamic-range sunlight through architectural glass. We explain how an ACEScg 32-bit linear pipeline captures both searing direct sunlight and subtle ambient bounce in single EXR frames.',
    author: 'Lighting & Shading Director',
    tags: ['ACEScg', 'V-Ray 7', 'Corona Renderer', 'OpenEXR'],
  },
];

export const STUDIO_METRICS = [
  {
    number: '140+',
    label: 'Global Enterprise Clients',
    detail: 'Architectural firms, watchmakers, and OEMs in 18 countries.',
  },
  {
    number: '4,200+',
    label: '3D Assets & Scenes Delivered',
    detail: 'Zero-defect watertight geometry verified across 12 years.',
  },
  {
    number: '99.4%',
    label: 'On-Time Milestone Rate',
    detail: 'Structured 4-stage revision gates with browser-based proofs.',
  },
  {
    number: '16',
    label: 'Industry Awards & Features',
    detail: 'Recognized by Awwwards, Behance, Clutch, and CGArchitect.',
  },
];
