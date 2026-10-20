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

// Global Brand Clients for 3D Modeling & CGI
export const MUSEMIND_CLIENTS = [
  { name: 'SONY', sector: 'Consumer Electronics & Gaming' },
  { name: 'APPLE', sector: 'Spatial Hardware & Devices' },
  { name: 'TESLA', sector: 'Automotive & Clean Energy' },
  { name: 'EPIC GAMES', sector: 'Real-Time 3D & Unreal Engine' },
  { name: 'NIKE', sector: 'Digital Footwear & Apparel' },
  { name: 'LOGITECH', sector: 'Ergonomic Hardware' },
  { name: 'PANTHER', sector: 'Cybernetic Vehicle Tech' },
  { name: 'BOON', sector: 'Autonomous Robotics' },
  { name: 'BOSE', sector: 'Acoustic Industrial Design' },
];

export const MUSEMIND_METRICS = [
  {
    number: '12,000+',
    label: 'Production 3D Assets Shipped',
    detail: 'From high-poly cinematics to ultra-optimized sub-50ms real-time WebGL models.',
  },
  {
    number: '85+',
    label: '3D Artists & Technical Directors',
    detail: 'Master sculptors, look-dev artists, rigging specialists, and real-time shader engineers.',
  },
  {
    number: '99.4%',
    label: 'Client Approval Rate',
    detail: 'Photorealistic precision calibrated against real-world material physics and CAD specs.',
  },
  {
    number: '< 1.8s',
    label: 'Real-Time WebGL Load Latency',
    detail: 'Draco & Meshopt compressed GLTF/USDZ assets for frictionless 3D e-commerce.',
  },
];

export const MUSEMIND_SERVICES: MusemindService[] = [
  {
    number: '01',
    title: 'Hard-Surface & Industrial CAD Modeling',
    tagline: 'Micron-accurate 3D topology engineered from engineering CAD and concept blueprints.',
    summary:
      'We convert complex engineering CAD (STEP, IGES, SolidWorks) into flawless quad-dominant subdivision surfaces. Perfect edge-flow, zero pinching, and optimized bevels tailored for cinematic close-ups and industrial presentations.',
    capabilities: [
      'CAD to Subdivision Surface Retopology',
      'Precision Mechanical & Bevel Engineering',
      'Exploded Assembly & Cutaway Modeling',
      'Clean All-Quad Topology (Zero N-Gons)',
      'Cinema 4D, Maya, Blender & Rhino Workflows',
    ],
    deliverables: 'Production-ready FBX, OBJ, STEP, and native DCC files with organized hierarchy',
    leadTime: '1 – 3 Weeks',
    iconName: 'Cpu',
  },
  {
    number: '02',
    title: 'Photorealistic PBR LookDev & Texturing',
    tagline: 'Physically accurate materials with real-world surface micro-imperfections.',
    summary:
      'Using Substance 3D Painter, Designer, and Octane/V-Ray, we author multi-layer PBR textures up to 8K resolution. Anisotropic brushed metals, refractive optical glass, sub-surface skin scattering, and realistic wear gradients.',
    capabilities: [
      'Multi-Layer 8K PBR Maps (Albedo, Normal, Roughness)',
      'Subsurface Scattering (SSS) & Translucency',
      'Custom Procedural Shader Development',
      'Micro-Scratches & Surface Imperfection Maps',
      'ACES Color Managed Look-Development',
    ],
    deliverables: '8K EXR / PNG Texture Sets, Octane / Arnold Shaders, Substance Painter Assets',
    leadTime: '1 – 2 Weeks',
    iconName: 'Sparkles',
  },
  {
    number: '03',
    title: 'Real-Time WebGL & 3D Web Configurators',
    tagline: 'Interactive 3D product visualizers running at 60 FPS directly in the browser.',
    summary:
      'Transform static e-commerce into spatial, tactile product experiences. We engineer Three.js, React Three Fiber, and WebGL configurators with real-time material swapping, exploded views, and AR Quick Look integration.',
    capabilities: [
      'Interactive Real-Time 3D Web Configurators',
      'Draco & Meshopt Compression (Under 5MB)',
      'Apple AR Quick Look (USDZ) & Google Scene Viewer',
      'Dynamic Material, Color & Feature Customizers',
      'Touch-Optimized Camera Orbit & Hotspot Annotations',
    ],
    deliverables: 'Production Three.js / React components, GLTF/GLB binary, USDZ AR assets',
    leadTime: '3 – 5 Weeks',
    iconName: 'Globe',
  },
  {
    number: '04',
    title: 'Character & Creature Digital Sculpting',
    tagline: 'Hyper-detailed organic sculpts with lifelike anatomy and dynamic expressiveness.',
    summary:
      'From photorealistic digital humans to high-concept creatures and stylized mascots. We sculpt organic forms in ZBrush with anatomical precision, complete with production-ready animation topology and displacement maps.',
    capabilities: [
      'ZBrush High-Poly Digital Sculpting',
      'Production Animation Retopology & UV Unwrapping',
      'FACS Facial Blendshapes & Expressive Morphs',
      'Marvelous Designer Cloth & Garment Simulation',
      'XGen Hair & Fur Grooming Pipelines',
    ],
    deliverables: 'ZTL sculpt files, animation-ready low-poly meshes, 32-bit displacement maps',
    leadTime: '3 – 6 Weeks',
    iconName: 'Layers',
  },
  {
    number: '05',
    title: 'Product CGI & Commercial Animation',
    tagline: 'Cinematic lighting, dynamic motion graphics, and photoreal 4K turntables.',
    summary:
      'Eliminate costly physical studio photography. We create cinematic 3D product commercial animations, slow-motion fluid interactions, mechanical disassembly reels, and 4K marketing assets with ray-traced lighting.',
    capabilities: [
      '4K 60FPS Commercial Turntable Reels',
      'Mechanical Assembly & Disassembly Animations',
      'Studio Ray-Traced Lighting & Caustics',
      'Houdini Physics, Particle & Smoke Dynamics',
      'High-Resolution Print-Ready CGI Renders (8K+)',
    ],
    deliverables: 'Master 4K ProRes renders, transparent PNG image sequences, 360 interactive spins',
    leadTime: '2 – 4 Weeks',
    iconName: 'Layout',
  },
  {
    number: '06',
    title: 'Architectural Visualization & Digital Twins',
    tagline: 'Spatial environments, exterior architecture, and real-time Unreal Engine 5 walk-throughs.',
    summary:
      'We craft photorealistic architectural renderings, interior design spatial visualizers, and interactive virtual tours. Lumen lighting and Nanite geometry in Unreal Engine 5 bring commercial developments to life before ground is broken.',
    capabilities: [
      'Photorealistic Architectural Exterior & Interior Renders',
      'Real-Time Walkthroughs in Unreal Engine 5',
      'Interactive Spatial Floorplans & Material Swatches',
      'Accurate Solar Study & Daytime/Nighttime Lighting',
      'VR Headset Immersion (Meta Quest & Apple Vision Pro)',
    ],
    deliverables: '8K Architectural Still Renders, UE5 Executable Walkthroughs, 360 Panoramas',
    leadTime: '3 – 6 Weeks',
    iconName: 'Compass',
  },
];

export const MUSEMIND_CASE_STUDIES: MusemindCaseStudy[] = [
  {
    id: 'boon',
    title: 'Boon — Ergonomic Autonomous Robotics & 3D Digital Twin',
    client: 'Boon Technologies · San Francisco, CA',
    category: 'Industrial Hardware & 3D Configurator',
    deliverables: 'CAD Conversion, 8K PBR Texturing, Real-Time WebGL Configurator',
    impactMetric: '+142% Pre-Order Conversions',
    impactDetail: 'Delivered sub-1.8s load times for real-time 3D models with 60 FPS performance across mobile and desktop browsers.',
    description:
      'Boon needed high-precision 3D hard-surface models and photorealistic CGI visuals to showcase their autonomous robotic hardware before physical manufacturing. We converted raw SolidWorks CAD blueprints into quad-clean subdivision meshes, crafted 8K tactile PBR materials (powder-coated aluminum, anodized titanium, optical sensors), and built an interactive 3D web configurator.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=80',
    year: '2025',
    platforms: 'Three.js WebGL · 4K CGI Renders · USDZ AR',
  },
  {
    id: 'panther',
    title: 'Panther — Cybernetic Hypercar Concept & Cinematic CGI',
    client: 'Panther Mobility · Austin, TX',
    category: 'Automotive CGI & Hard-Surface Modeling',
    deliverables: 'Aerodynamic CAD Modeling, Ray-Traced Shaders, Unreal Engine 5 Reel',
    impactMetric: '3.2M Global Launch Views',
    impactDetail: 'Featured as ArtStation Studio Pick and accelerated corporate investment inquiries with 18 cinematic 8K hero keyframes.',
    description:
      'Panther commissioned our studio to design, model, and render a futuristic autonomous electric hypercar. Our artists modeled over 4.8 million polygons across aerodynamic chassis components, custom carbon-fiber weave textures, active aerodynamic spoilers, and interior HUD holographic displays for launch keynote visuals.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80',
    year: '2025',
    platforms: 'Unreal Engine 5 · Octane Render · 8K Master Plates',
  },
  {
    id: 'chronos',
    title: 'Chronos — Luxury Horology Timepiece & Exploded Mechanical CGI',
    client: 'Chronos Horology · Geneva, Switzerland',
    category: 'Luxury Product Visualization',
    deliverables: 'Micron CAD Modeling, 300+ Individual Gear Assemblies, 4K Macro Turntable',
    impactMetric: '100% Collector Pre-Allocation Sold Out',
    impactDetail: 'Produced ultra-macro 8K renders highlighting sapphire crystal anti-reflective coating, tourbillon escapement, and hand-chamfered bridges.',
    description:
      'A masterclass in micro-mechanical 3D engineering. We modeled all 328 individual components of a complex mechanical watch movement, applying realistic brushed Geneva stripes, blued titanium screws, and synthetic ruby bearings.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=80',
    year: '2025',
    platforms: 'Cinema 4D · Redshift · Macro CGI',
  },
  {
    id: 'aero-drone',
    title: 'Valkyrie — Autonomous Surveillance Drone & 3D Interactive Manual',
    client: 'Valkyrie Aerospace · Munich, Germany',
    category: 'Aerospace & Real-Time 3D',
    deliverables: 'Carbon-Fiber Hard-Surface Mesh, Thermal Camera Shaders, Three.js 3D Manual',
    impactMetric: '-65% Technician Training Hours',
    impactDetail: 'Engineered an interactive 3D WebGL exploded-view manual allowing technicians to inspect and rotate modular components in real time.',
    description:
      'Created a digital twin for next-generation aerospace drone surveillance. Features clean low-poly LODs alongside high-poly cinematic masters, complete with animated gimbal pitch-and-roll mechanics and thermal sensor visualizers.',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1400&q=80',
    year: '2024',
    platforms: 'Three.js WebGL · SolidWorks to Blender',
  },
];

export const MUSEMIND_PROCESS_STEPS: MusemindProcessStep[] = [
  {
    step: '01',
    title: 'CAD Ingestion & Topology Strategy',
    duration: 'Week 1',
    description:
      'We audit your raw engineering CAD files (STEP, IGES, SolidWorks), 2D sketches, or physical reference samples. We define the polygon budget, edge-flow requirements, and LOD milestones based on your deployment platform (Film CGI, Unreal Engine, or WebGL).',
    deliverables: [
      'CAD File Quality & Topology Audit',
      'Polygon Budget & LOD Roadmap',
      'Material Specification & Reference Deck',
      'Production Milestone Schedule',
    ],
    clientOutcome: 'Zero creative ambiguity and a clear blueprint tailored to your target render engine.',
  },
  {
    step: '02',
    title: 'Sub-D Modeling & Precision Sculpting',
    duration: 'Week 1 – 2',
    description:
      'Our sculptors construct quad-dominant subdivision meshes with clean edge loops, zero non-planar faces, and micro-bevel curvature. We deliver 360-degree grey-clay turntable previews for client form validation.',
    deliverables: [
      'High-Poly Quad Subdivision Mesh',
      'Optimized Low-Poly / Real-Time LODs',
      'Grey-Clay Turntable Video Previews',
      'UV Layout & Seam Optimization',
    ],
    clientOutcome: 'Flawless geometry, verified proportions, and perfect silhouette before texturing begins.',
  },
  {
    step: '03',
    title: '8K PBR Texturing & Shader LookDev',
    duration: 'Week 2 – 3',
    description:
      'We handcraft physically-based materials in Substance 3D. We calibrate IOR values, anisotropic roughness, micro-scratches, dust accumulation, and subsurface scattering under standardized HDRI studio lighting.',
    deliverables: [
      '8K PBR Texture Maps (Albedo, Normal, Roughness, Metalness, AO)',
      'Octane / Arnold / Redshift Native Shader Graph',
      'Calibrated Lighting Studio Environments',
      'High-Resolution LookDev Proof Renders',
    ],
    clientOutcome: 'Hyper-realistic surface materials that look completely indistinguishable from real life.',
  },
  {
    step: '04',
    title: 'Rigging, Animation & Final Delivery',
    duration: 'Week 3 – 4',
    description:
      'We rig articulating joints, setup kinematic constraints, animate camera movements, and export multi-format packages (FBX, GLTF, USDZ, BLEND, Cinema 4D). We also provide integration support for Three.js web developers.',
    deliverables: [
      'Fully Rigged & Animated 3D Master Files',
      'Optimized WebGL GLTF / GLB with Draco Compression',
      'Apple AR Quick Look (USDZ) Format',
      'Full Commercial IP Ownership Buyout',
    ],
    clientOutcome: 'Ready-to-deploy 3D assets that ship directly into production, marketing, and real-time engines.',
  },
];

export const MUSEMIND_PILLARS = [
  {
    number: '01',
    title: 'Sub-Millimeter CAD Precision',
    summary:
      'Every curve, seam, and screw thread matches true manufacturing tolerances. We eliminate mesh artifacts, non-manifold geometry, and pinching for cinematic perfection.',
  },
  {
    number: '02',
    title: 'Physically Calibrated PBR Shaders',
    summary:
      'We adhere strictly to real-world physics. Correct index of refraction (IOR), energy conservation, and realistic micro-surface roughness maps ensure realism under any lighting.',
  },
  {
    number: '03',
    title: 'Sub-50ms Real-Time WebGL Scale',
    summary:
      'We don’t just build heavy film models. Our technical directors master mesh quantization, texture atlasing, and Draco compression to deliver 60 FPS 3D configurators online.',
  },
  {
    number: '04',
    title: 'Multi-Format Production Pipeline',
    summary:
      'Receive your 3D models configured natively for Blender, Cinema 4D, Maya, Unreal Engine 5, Omniverse, and WebGL with zero format translation headaches.',
  },
  {
    number: '05',
    title: 'Global Studio Follow-the-Sun Speed',
    summary:
      'With 3D artists across Los Angeles, London, Berlin, and Tokyo, our 24/7 modeling pipeline ensures rapid iterations and lightning-fast turnaround.',
  },
  {
    number: '06',
    title: '100% Full IP Commercial Rights',
    summary:
      'Complete intellectual property ownership transfers to you upon delivery. All high-poly sculpts, raw project files, texture PSDs, and final models are fully yours.',
  },
];

export const MUSEMIND_AWARDS = [
  {
    year: '2025',
    title: 'ArtStation Studio Showcase Pick',
    organization: 'ArtStation Professional Network',
    badge: 'EDITORIAL HONOR',
  },
  {
    year: '2025',
    title: 'Best Real-Time 3D Web Experience',
    organization: 'FWA of the Day',
    badge: 'FWA WINNER',
  },
  {
    year: '2024',
    title: 'Top Global 3D Visualization Studio',
    organization: 'Clutch Leaders Matrix',
    badge: 'RANKED #1 IN CGI',
  },
  {
    year: '2024',
    title: 'Outstanding Hard-Surface Craft Award',
    organization: 'CGTrader Digital Awards',
    badge: 'GOLD TROPHY',
  },
  {
    year: '2024',
    title: 'Webby Nominee: Interactive 3D Web',
    organization: 'The Webby Awards',
    badge: 'HONOREE',
  },
];

export const MUSEMIND_FAQS: MusemindFaq[] = [
  {
    id: 'faq-1',
    question: 'What source files can I provide to start a 3D modeling project?',
    category: 'Source Files & Input',
    answer:
      'We accept virtually any input format! This includes industrial CAD files (STEP, IGES, SolidWorks, Rhino .3dm, Parasolid .x_t, DXF), high-res photographs from multiple angles, hand sketches, orthographic 2D blueprints, or existing rough 3D scans (OBJ, STL). Our technical artists will audit and retopologize whatever you have into production-ready geometry.',
  },
  {
    id: 'faq-2',
    question: 'What 3D file formats do you deliver upon completion?',
    category: 'Handoff & Deliverables',
    answer:
      'We deliver a comprehensive asset package tailored to your exact pipeline: native DCC files (Blender .blend, Cinema 4D .c4d, Maya .ma/mb), exchange formats (FBX with embedded textures, OBJ/MTL, USD/USDZ for Apple Vision Pro/AR), and web-optimized binaries (GLTF / GLB with Draco or Meshopt compression). 8K PBR textures are packaged in both lossless PNG and 32-bit EXR formats.',
  },
  {
    id: 'faq-3',
    question: 'How do you optimize 3D models for real-time WebGL and mobile browsers?',
    category: 'Optimization & WebGL',
    answer:
      'For web configurators, we target sub-5MB total asset sizes and under 100k polygons while preserving silhouette curvature. We bake high-poly details into tangent-space normal and ambient occlusion maps, combine material draw calls into texture atlases, and compress meshes using Draco and Meshopt. This guarantees silky 60 FPS orbit interactions on both desktop and mobile devices.',
  },
  {
    id: 'faq-4',
    question: 'How long does a typical 3D modeling and rendering commission take?',
    category: 'Timelines & Sprints',
    answer:
      'A standalone hard-surface product model with 8K PBR textures and studio turntable renders typically takes 5 to 10 business days. Complex mechanical assemblies or multi-state exploded views take 2 to 3 weeks. Full interactive WebGL 3D configurators with UI controls span 3 to 6 weeks. We provide interim 360-degree clay turntable videos for continuous feedback throughout.',
  },
  {
    id: 'faq-5',
    question: 'What is your revision and approval process?',
    category: 'Feedback & Revisions',
    answer:
      'Every milestone includes dedicated revision gates: (1) Clay Model Review — validate geometry, proportions, and silhouette before texturing; (2) LookDev & Material Review — review 8K PBR shaders, surface roughness, and colors under HDRI studio lighting; and (3) Final Lighting & Render Polish — fine-tune camera angles, depth of field, and post-processing passes. We iterate until you are 100% satisfied.',
  },
  {
    id: 'faq-6',
    question: 'Do we own the full intellectual property rights to all 3D assets?',
    category: 'IP & Legal',
    answer:
      'Yes, 100%. All intellectual property, copyright, source geometry, ZBrush sculpt files, texture maps, and rendered imagery transfer fully to your ownership upon milestone payment. We also sign strict bilateral Non-Disclosure Agreements (NDAs) prior to receiving proprietary CAD files or unreleased product concepts.',
  },
];
