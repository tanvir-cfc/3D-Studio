export interface ServiceDetailItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: string;
  heroImage: string;
  leadTime: string;
  formats: string;
  outcomeStat: string;
  rating: string;
  overview: string;
  challengeSolves: string;
  deliverables: {
    title: string;
    description: string;
  }[];
  specifications: {
    label: string;
    value: string;
  }[];
  pipeline: {
    step: string;
    phase: string;
    duration: string;
    title: string;
    description: string;
    deliverable: string;
  }[];
  features: string[];
  pricingOptions: {
    tier: string;
    price: string;
    idealFor: string;
    scope: string[];
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const DETAILED_SERVICES: ServiceDetailItem[] = [
  {
    id: '3d-modeling',
    number: '01',
    title: 'Precision 3D Modeling & CAD Conversion',
    subtitle: 'Sub-millimeter subdivision, NURBS, and clean quad-mesh geometry',
    tagline: 'Micron-accurate 3D topology engineered from engineering CAD and concept blueprints.',
    category: 'Core Geometry & CAD',
    heroImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80',
    leadTime: '3 – 5 Business Days per Asset',
    formats: 'FBX · OBJ · USDZ · glTF 2.0 · Blend · STEP · IGES · Maya',
    outcomeStat: 'Zero-defect geometry verified across 4,200+ commercial SKUs',
    rating: '5.0 / 5.0 (98 Reviews)',
    overview:
      'We convert complex engineering CAD (STEP, IGES, SolidWorks, Rhino) into flawless, watertight quad-dominant subdivision surfaces. Every edge-flow is mathematically aligned to avoid shading artifacts, pinching, or non-manifold geometry, ensuring your 3D models withstand extreme macro close-ups and real-time engine deployments.',
    challengeSolves:
      'Raw engineering CAD files frequently contain millions of disorganized triangular slivers, broken trimmed surfaces, and flipped normals that break downstream rendering engines. We retopologize the entire assembly by hand into clean quad polygons while preserving manufacturing tolerances down to 0.01mm.',
    deliverables: [
      {
        title: 'Master Quad Subdivision Mesh',
        description: 'Watertight all-quad geometry with clean edge loops and calibrated bevel weights for cinematic sub-d smoothing.',
      },
      {
        title: 'Multi-Tier LOD Packages',
        description: 'LOD0 (High-Poly cinematic), LOD1 (Medium desktop WebGL), and LOD2 (Ultra-low mobile AR/real-time) with baked normal maps.',
      },
      {
        title: 'Non-Overlapping UV Layouts',
        description: 'Organized UDIM or single-tile UV unwrapping with zero stretching and optimized pixel density distribution.',
      },
      {
        title: 'Native Source DCC Project Files',
        description: 'Organized outliner hierarchy with clean pivot points, naming conventions, and grouping for Blender, Maya, and Cinema 4D.',
      },
    ],
    specifications: [
      { label: 'Geometry Standard', value: '100% Quad-Dominant (Zero N-Gons)' },
      { label: 'Tolerance Precision', value: '±0.01mm Manufacturing Accuracy' },
      { label: 'Input Formats', value: 'STEP, IGES, SLDPRT, 3DM, DWG, OBJ, STL, Hand Sketches' },
      { label: 'Output Formats', value: 'FBX, OBJ, USDZ, GLTF/GLB, BLEND, C4D, MA' },
      { label: 'UV Mapping', value: 'Manual UDIM Packing (Texel Density Calibrated)' },
      { label: 'Supported Engines', value: 'Unreal Engine 5, Unity, Three.js, Octane, V-Ray, Redshift' },
    ],
    pipeline: [
      {
        step: '01',
        phase: 'Ingestion & CAD Audit',
        duration: 'Day 1',
        title: 'CAD Quality & Tolerance Inspection',
        description: 'We audit raw engineering STEP/IGES files, evaluate curvature continuity, identify missing parts, and establish target polygon budgets for your specific platform.',
        deliverable: 'CAD Audit Report & LOD Polygon Budget Plan',
      },
      {
        step: '02',
        phase: 'Sub-D Topology & Sculpting',
        duration: 'Day 2 – 3',
        title: 'Precision Retopology & Edge Control',
        description: 'Our senior modelers build the quad surface from scratch, adding supporting edge loops, mechanical chamfers, and verified silhouette curvature.',
        deliverable: '360° Grey-Clay Turntable Preview Video',
      },
      {
        step: '03',
        phase: 'UV Unwrapping & Bake Validation',
        duration: 'Day 4',
        title: 'Texel Density & High-to-Low Baking',
        description: 'We unwrap seams along natural mechanical breaks, eliminate distortion, and bake tangent-space normal maps from high-poly masters to low-poly LODs.',
        deliverable: 'Checkerboard UV proof & baked normal map verification',
      },
      {
        step: '04',
        phase: 'Quality Assurance & Delivery',
        duration: 'Day 5',
        title: 'Final Handover & Multi-Format Export',
        description: 'We inspect for non-manifold edges, verify scale units, package all exchange formats, and transfer full intellectual property ownership.',
        deliverable: 'Production-ready asset bundle with 100% IP buyout',
      },
    ],
    features: [
      'Sub-millimeter dimensional accuracy verified against CAD',
      'Quad-dominant subdivision surface topology (zero pinching)',
      'Multi-LOD real-time web optimization (under 5MB compressed)',
      'Comprehensive UV layout with calibrated texel density',
      'Clean scene outliner with standardized naming conventions',
      'Full commercial IP buyout and bilateral NDA protection',
    ],
    pricingOptions: [
      {
        tier: 'Standard Component',
        price: '$1,200 – $2,500',
        idealFor: 'Single mechanical part, consumer product accessory, or industrial enclosure.',
        scope: ['1 Production 3D Model', 'High-poly & Low-poly LOD', 'UV unwrapping', 'FBX, OBJ, GLTF export', '2 revision rounds'],
      },
      {
        tier: 'Complex Assembly',
        price: '$2,500 – $5,500',
        idealFor: 'Multi-part mechanical device, luxury timepiece, robotics, or automotive sub-assembly.',
        scope: ['Full assembly with internal components', 'Exploded-view hierarchy', '3 LOD levels (High, Mid, WebGL)', '32-bit displacement maps', '4 revision rounds'],
      },
      {
        tier: 'Enterprise Pipeline',
        price: 'Custom / Monthly Sprint',
        idealFor: 'Ongoing product catalog digitization, automotive lineups, or hardware startups.',
        scope: ['Dedicated senior 3D modeler team', 'Weekly sprint batches', 'Automated CAD-to-Web pipeline', 'Direct Slack access to Technical Director', 'Unlimited revisions within sprint'],
      },
    ],
    faqs: [
      {
        question: 'Can you work directly from 2D sketches or photographs if we do not have CAD files?',
        answer: 'Yes! Our artists regularly sculpt and model production-grade 3D assets from orthogonal reference photos, industrial design sketches, and dimension callouts. We verify proportions at the grey-clay stage before detailing.',
      },
      {
        question: 'Will the 3D models work in WebGL and mobile browsers without lagging?',
        answer: 'Absolutely. Alongside high-poly masters, we provide real-time LODs with Draco and Meshopt compression under 4MB, ensuring smooth 60 FPS rotation on mobile Safari and Chrome.',
      },
    ],
  },
  {
    id: 'photorealistic-rendering',
    number: '02',
    title: 'Photorealistic Studio & Architectural CGI Rendering',
    subtitle: 'Physically based ray-tracing, bespoke shaders, and editorial lighting',
    tagline: 'Indistinguishable 8K CGI imagery that replaces expensive physical studio photography.',
    category: 'LookDev & Ray-Tracing',
    heroImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80',
    leadTime: '4 – 7 Business Days per Scene',
    formats: '8K EXR · 16-Bit TIFF · Ultra-HD PNG · Color-Graded PSD',
    outcomeStat: '68% visual production cost reduction vs. physical photography',
    rating: '4.98 / 5.0 (124 Reviews)',
    overview:
      'We craft photorealistic CGI renders that look completely indistinguishable from real life. Using OctaneRender, V-Ray, Corona, and Redshift with ACEScg color management, we simulate micro-surface roughness, anisotropic brushed metals, light caustics through optical glass, and volumetric atmospheric illumination.',
    challengeSolves:
      'Physical product photo shoots require weeks of scheduling, costly shipping of delicate prototypes, studio rentals, and retouching crews. With our CGI rendering pipeline, every lighting angle, background environment, and material colorway can be altered instantly with zero physical re-shoots.',
    deliverables: [
      {
        title: '8K Campaign Stills',
        description: 'Ultra-high-resolution marketing stills rendered at 7680x4320 with ray-traced subsurface scattering and depth of field.',
      },
      {
        title: '32-Bit Multi-Pass EXRs',
        description: 'Linear OpenEXR files with dedicated beauty, specular, diffuse, normal, ambient occlusion, and cryptomatte channels.',
      },
      {
        title: 'Editorial Studio Lighting Rigs',
        description: 'Custom HDRI domes and virtual softbox rigs engineered to highlight product silhouettes and material textures.',
      },
      {
        title: 'Commercial Color-Graded Plates',
        description: 'Layered Photoshop PSD masters with non-destructive adjustment curves, reflections, and transparent cutout alphas.',
      },
    ],
    specifications: [
      { label: 'Render Resolution', value: '4K, 8K, 12K+ Print-Ready Canvas' },
      { label: 'Color Management', value: 'ACEScg / Rec.709 Linear Workflow' },
      { label: 'Render Engines', value: 'OctaneRender, V-Ray 7, Corona 12, Redshift' },
      { label: 'Material Accuracy', value: 'Physically Calibrated PBR (Substance 3D)' },
      { label: 'Deliverable Formats', value: '32-Bit OpenEXR, 16-Bit TIFF, Lossless PNG, Layered PSD' },
      { label: 'Lighting Methods', value: 'Custom Studio Softboxes, HDRI Sky Domes, Caustics' },
    ],
    pipeline: [
      {
        step: '01',
        phase: 'Moodboard & Composition Blocking',
        duration: 'Day 1 – 2',
        title: 'Camera Angle & Framing Study',
        description: 'We test multiple focal lengths, lens apertures, and hero camera angles in clay mode to establish dramatic compositions that drive conversions.',
        deliverable: 'Contact sheet of 6 camera compositions for approval',
      },
      {
        step: '02',
        phase: 'Shader Authoring & LookDev',
        duration: 'Day 3 – 4',
        title: '8K PBR Material Crafting',
        description: 'We author realistic surface textures: anisotropic brushed metal, anti-reflective glass, powder-coat speckling, and microscopic leather grain.',
        deliverable: 'High-resolution LookDev proof render under neutral lighting',
      },
      {
        step: '03',
        phase: 'Lighting & Ray-Tracing Pass',
        duration: 'Day 5 – 6',
        title: 'Cinematic Studio Illumination',
        description: 'We place physical virtual softboxes, rim lights, and bounce cards to illuminate specular highlights and subtle reflections.',
        deliverable: 'Full-resolution beauty draft render for client review',
      },
      {
        step: '04',
        phase: 'Master Compositing & Color Grade',
        duration: 'Day 7',
        title: '32-Bit Finishing & Packaging',
        description: 'We composite passes, apply subtle bloom and chromatic dispersion, color grade the image, and deliver master files.',
        deliverable: 'Final 8K master stills + layered PSD files',
      },
    ],
    features: [
      'Indistinguishable photorealism calibrated against real material samples',
      'Multi-pass 32-bit linear EXR output with Cryptomatte segmentation',
      'Virtual product colorways rendered in seconds without re-shooting',
      'Pristine transparent background PNGs ready for e-commerce layouts',
      'Ultra-high DPI output suitable for billboard print and packaging',
      'Complete lighting studio setups preserved for future product iterations',
    ],
    pricingOptions: [
      {
        tier: 'Single Hero Visual',
        price: '$1,500 – $2,800',
        idealFor: '1 hero product shot on clean studio backdrop with 8K resolution.',
        scope: ['1 master camera composition', 'PBR material lookdev', 'Studio lighting rig', '8K still + transparent PNG', '2 revision passes'],
      },
      {
        tier: 'Editorial Campaign Suite',
        price: '$3,800 – $7,500',
        idealFor: 'Complete marketing launch with 5 multi-angle studio stills and lifestyle context.',
        scope: ['5 hero camera angles', 'Macro detail shots', 'Lifestyle / architectural setting', 'Layered PSD files', '3 revision passes'],
      },
      {
        tier: 'Enterprise Product Lineup',
        price: '$8,500+',
        idealFor: 'Full catalog product lines with dozens of color/material SKUs.',
        scope: ['Batch render pipeline', 'Dozens of colorway variations', 'Consistent lighting template', 'Turnkey e-commerce asset pack', 'Dedicated Art Director'],
      },
    ],
    faqs: [
      {
        question: 'Can you match our exact real-world material swatches and Pantone colors?',
        answer: 'Yes. We calibrate materials using spectral IOR values and physical reflectance measurements to ensure exact chromatic accuracy under studio lighting.',
      },
      {
        question: 'Can you render transparent backgrounds for our web shop?',
        answer: 'Yes, all renders include clean alpha channel cutouts, contact ground shadows on transparent layers, and high-contrast masks for web designers.',
      },
    ],
  },
  {
    id: 'animation-walkthroughs',
    number: '03',
    title: '3D Animation, Exploded Mechanical Views & Turntables',
    subtitle: '60fps cinematic camera choreography and mechanical simulations',
    tagline: 'Fluid 4K 60FPS motion graphics and mechanical disassembly that mesmerize viewers.',
    category: 'Motion & Technical CGI',
    heroImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=80',
    leadTime: '7 – 12 Business Days',
    formats: '4K ProRes 4444 · MP4 (H.265) · 360° Interactive Spun Frames',
    outcomeStat: '+210% average hold-time during product demonstrations',
    rating: '4.95 / 5.0 (86 Reviews)',
    overview:
      'We bring static hardware and concepts to life through cinematic camera direction and physics-accurate mechanical motion. From exploded-view cutaways that demonstrate internal engineering to smooth 360-degree turntable loops and architectural fly-throughs, we produce broadcast-caliber 3D motion.',
    challengeSolves:
      'Complex internal mechanisms, optical assemblies, and hardware innovations cannot be seen through physical camera lenses. Our 3D exploded animations peel back outer housings to showcase internal precision engineering clearly and dramatically.',
    deliverables: [
      {
        title: 'Master 4K 60FPS Commercial Reel',
        description: 'Apple ProRes 4444 motion master with uncompressed color fidelity and smooth frame pacing.',
      },
      {
        title: 'Exploded Technical Assembly Cutaway',
        description: 'Synchronized component disassembly animation showing internal gears, sensors, and structural fasteners.',
      },
      {
        title: 'Seamless 360° E-Commerce Turntable',
        description: '36-frame to 72-frame loop sequence for interactive web rotation widgets with smooth scrub response.',
      },
      {
        title: 'Social Cutdowns (9:16 & 1:1)',
        description: 'Re-framed vertical and square cuts optimized for Instagram Reels, TikTok, and LinkedIn marketing campaigns.',
      },
    ],
    specifications: [
      { label: 'Frame Rates', value: '24fps (Cinematic) / 60fps (Fluid Commercial)' },
      { label: 'Master Resolutions', value: '4K Ultra-HD (3840x2160) & DCI 4K' },
      { label: 'Video Codecs', value: 'Apple ProRes 4444, H.265 / HEVC, Lossless PNG Sequence' },
      { label: 'Rigging Standard', value: 'Forward & Inverse Kinematics (FK/IK) Constraints' },
      { label: 'Physics Engines', value: 'Houdini Particle & Rigid Body Dynamics' },
      { label: 'Aspect Ratios', value: '16:9 Landscape, 9:16 Vertical, 1:1 Square' },
    ],
    pipeline: [
      {
        step: '01',
        phase: 'Animatic & Timing Blocking',
        duration: 'Day 1 – 3',
        title: 'Camera Choreography & Storyboard',
        description: 'We block out camera movement, lens transitions, and part movement timing using grey-clay models synced to audio or pacing guidelines.',
        deliverable: 'Low-res animatic video for timing and choreography sign-off',
      },
      {
        step: '02',
        phase: 'Rigging & Kinematics Setup',
        duration: 'Day 4 – 6',
        title: 'Mechanical Constraints & Disassembly Curves',
        description: 'We rig mechanical linkages, gear ratios, pistons, and sliding tracks so every part moves with realistic physics and zero clipping.',
        deliverable: 'Clay mechanical motion proof showing all articulating joints',
      },
      {
        step: '03',
        phase: 'Final Lighting & Render Farm Pass',
        duration: 'Day 7 – 9',
        title: 'High-Sample Ray-Traced Frame Generation',
        description: 'We render the animation sequence across dedicated multi-GPU render nodes with motion blur and depth of field.',
        deliverable: 'Full-color watermarked draft cut with sound effects',
      },
      {
        step: '04',
        phase: 'Color Grading & Multi-Format Delivery',
        duration: 'Day 10 – 12',
        title: 'Post-Production & Master Encoding',
        description: 'We apply final optical grading, export social aspect ratio cuts, generate 360-degree web frame loops, and deliver the ProRes master.',
        deliverable: 'Full master video suite + social cutdowns',
      },
    ],
    features: [
      'Silky 60fps camera choreography with realistic optical depth of field',
      'Complex mechanical exploded views with internal tolerance reveals',
      'Looping 360-degree turntable frames for e-commerce interaction',
      'Dynamic physics simulation: cloth, fluids, sparks, and particle fields',
      'Multi-aspect export: 16:9 widescreen, 9:16 vertical reels, 1:1 square',
      'Studio audio integration with synced kinetic sound design',
    ],
    pricingOptions: [
      {
        tier: '360° Studio Turntable Loop',
        price: '$1,800 – $3,200',
        idealFor: 'Clean 15-second studio turntable showcase with continuous rotation.',
        scope: ['1 product model', '360-degree smooth spin', '4K 60fps ProRes & MP4', 'Web turntable frame sequence', '2 revisions'],
      },
      {
        tier: 'Exploded Mechanical Film (30s)',
        price: '$4,500 – $9,000',
        idealFor: 'Hardware product launch with internal assembly cutaway and dynamic camera shots.',
        scope: ['Full exploded disassembly sequence', 'Macro camera movements', '4K 60fps master', 'Social 9:16 cutdown', '3 revisions'],
      },
      {
        tier: 'Cinematic Commercial (60s+)',
        price: '$12,000+',
        idealFor: 'Full-length brand announcement film with complex environments and visual effects.',
        scope: ['Storyboarding & creative direction', 'Custom fluid/particle physics', 'Broadcast sound design sync', 'Omnichannel deliverables', 'Dedicated VFX Lead'],
      },
    ],
    faqs: [
      {
        question: 'Do you provide the raw frame sequences for our video editors?',
        answer: 'Yes! We deliver uncompressed 16-bit PNG or OpenEXR frame sequences along with master ProRes 4444 files with alpha channels where needed.',
      },
      {
        question: 'How do you handle audio or music sync?',
        answer: 'You can provide your voiceover or audio track upfront, and we will time our camera choreography and exploded keyframes to hit every musical beat.',
      },
    ],
  },
  {
    id: 'ar-vr-visualization',
    number: '04',
    title: 'Real-Time WebGL, AR/VR & 3D Interactive Configurators',
    subtitle: 'WebXR product configurators, Apple Vision Pro USDZ, and Unreal 5 twins',
    tagline: 'Interactive 3D configurators running at silky 60 FPS directly inside any web browser.',
    category: 'Real-Time Spatial Tech',
    heroImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80',
    leadTime: '8 – 14 Business Days',
    formats: 'glTF 2.0 / GLB · USDZ · React Three Fiber · WebGL · Unreal 5',
    outcomeStat: '3.2× higher e-commerce add-to-cart rate with live 3D inspection',
    rating: '5.0 / 5.0 (110 Reviews)',
    overview:
      'Turn passive website visitors into engaged buyers with real-time interactive 3D configurators. We develop Three.js and React Three Fiber components featuring instant color swapping, modular part customization, real-time lighting, and 1-tap Augmented Reality (AR) viewing on iOS and Android.',
    challengeSolves:
      'Standard 3D models are far too heavy (50MB–200MB) to load on mobile browsers without freezing the page. Our technical directors apply mesh quantization, Draco geometry compression, and texture atlasing to bring entire configurators down to under 3.5MB while maintaining 60 FPS performance.',
    deliverables: [
      {
        title: 'Production React / Three.js Component',
        description: 'Drop-in interactive 3D web viewer with touch orbit, zoom constraints, and custom UI controls.',
      },
      {
        title: 'Draco-Compressed GLTF / GLB Binaries',
        description: 'Ultra-lightweight 3D model files optimized for sub-1.8s load times across cellular connections.',
      },
      {
        title: 'Apple AR Quick Look (USDZ) Asset',
        description: 'Native iOS augmented reality files that allow shoppers to place life-sized products directly in their room.',
      },
      {
        title: 'Dynamic Material Swapping Engine',
        description: 'Modular shader logic allowing instant toggling between colors, finishes, and optional hardware modules.',
      },
    ],
    specifications: [
      { label: 'Target Frame Rate', value: '60 FPS Continuous (Mobile & Desktop)' },
      { label: 'Asset Payload Size', value: 'Under 3.5 MB Compressed (Draco / Meshopt)' },
      { label: 'Web Technologies', value: 'Three.js, React Three Fiber, WebGL 2.0, WebXR' },
      { label: 'Mobile AR Support', value: 'Apple Quick Look (USDZ), Android Scene Viewer' },
      { label: 'Texture Optimization', value: 'KTX2 / Basis Universal GPU Compression' },
      { label: 'Analytics Integration', value: 'User Orbit, Zoom & Swatch Click Telemetry' },
    ],
    pipeline: [
      {
        step: '01',
        phase: 'Geometry Optimization & LOD Baking',
        duration: 'Day 1 – 3',
        title: 'Decimation & Normal Map Baking',
        description: 'We decimate heavy CAD geometry to clean low-poly meshes, then bake high-poly surface detail into tangent-space normal maps.',
        deliverable: 'Low-poly mesh audit running at 60 FPS in browser sandbox',
      },
      {
        step: '02',
        phase: 'PBR Texture Compression (KTX2)',
        duration: 'Day 4 – 6',
        title: 'GPU Texture Atlasing & Compression',
        description: 'We combine material channels into unified texture atlases and compress textures using KTX2 / Basis Universal for instant GPU decoding.',
        deliverable: 'Optimized GLB asset under 3.5MB with full material fidelity',
      },
      {
        step: '03',
        phase: 'Interactive UI & Shader Integration',
        duration: 'Day 7 – 10',
        title: 'Customizer Logic & Camera Controls',
        description: 'We code camera orbit limits, smooth damping, material swap states, hotspot annotations, and AR trigger buttons.',
        deliverable: 'Interactive staging link for browser testing across mobile and desktop',
      },
      {
        step: '04',
        phase: 'Deploy & E-Commerce Integration',
        duration: 'Day 11 – 14',
        title: 'Embed Code & Storefront Handover',
        description: 'We provide clear iframe embed code, React component packages, or Shopify/Webflow integration guidelines.',
        deliverable: 'Ready-to-deploy component codebase + AR assets',
      },
    ],
    features: [
      'Sub-1.8s load time with Draco and Meshopt geometry compression',
      'Silky 60 FPS orbit and pinch-zoom on iPhone, Android, and desktop',
      'Dynamic material and finish toggles without page reloads',
      'One-tap Apple Vision Pro and iOS AR Quick Look compatibility',
      'Custom hotspot annotations highlighting product features',
      'Zero external plugins required — works natively in standard browsers',
    ],
    pricingOptions: [
      {
        tier: 'Interactive 3D Web Viewer',
        price: '$2,200 – $4,000',
        idealFor: 'Single product 3D rotation, zoom, and AR Quick Look on product pages.',
        scope: ['Optimized GLTF/GLB asset', 'USDZ AR file', 'Three.js embed script', 'Orbit controls & lighting', '2 revisions'],
      },
      {
        tier: 'Full Multi-Option Configurator',
        price: '$4,800 – $9,500',
        idealFor: 'Customizable products with multiple colorways, finishes, and part options.',
        scope: ['Modular material engine', 'Interactive UI swatch controls', 'Hotspot feature callouts', 'React Three Fiber component', '4 revisions'],
      },
      {
        tier: 'Enterprise Spatial Platform',
        price: '$12,500+',
        idealFor: 'Complex industrial equipment, automotive configurators, or architectural digital twins.',
        scope: ['Multi-tier LOD engine', 'Real-time pricing calculation sync', 'Unreal Engine 5 pixel streaming option', 'Dedicated WebGL engineering sprint'],
      },
    ],
    faqs: [
      {
        question: 'Will this 3D configurator slow down our website loading speed?',
        answer: 'Not at all. We utilize lazy loading, asynchronous worker threads, and GPU-compressed textures so the initial page renders instantly before the 3D model loads.',
      },
      {
        question: 'Can customers view the product in their own living room using Augmented Reality?',
        answer: 'Yes! On iPhones and iPads, tapping the AR icon instantly launches Apple Quick Look. On Android devices, it opens Google Scene Viewer with accurate real-world scale.',
      },
    ],
  },
  {
    id: 'character-sculpting',
    number: '05',
    title: 'Character & Creature Digital Sculpting',
    subtitle: 'Hyper-detailed organic sculpts with lifelike anatomy and dynamic expressiveness',
    tagline: 'Anatomically accurate digital humans, creatures, and stylized mascots ready for cinematic rigging.',
    category: 'Organic Sculpting & Anatomy',
    heroImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1600&q=80',
    leadTime: '8 – 15 Business Days',
    formats: 'ZTL · FBX · OBJ · 32-bit EXR Displacements · Maya',
    outcomeStat: 'Industry-standard FACS blendshapes for facial mocap tracking',
    rating: '4.97 / 5.0 (72 Reviews)',
    overview:
      'From hyper-realistic digital humans to fantastical creatures and stylized brand mascots, our organic sculptors bring characters to life with micro-pore surface fidelity, correct anatomical muscle flow, and production-ready animation topology.',
    challengeSolves:
      'Organic characters frequently deform poorly around shoulders, knees, and mouth corners if the topology does not follow anatomical muscle loops. We build deformation-tested edge flow that bends naturally during motion capture and keyframe animation.',
    deliverables: [
      {
        title: 'ZBrush High-Poly Master Sculpt',
        description: 'Multi-million polygon ZTL file with organized subtools, micro-pore skin detailing, and dynamic posing layers.',
      },
      {
        title: 'Animation Retopology Mesh',
        description: 'Clean quad mesh following muscle edge loops for seamless deforming in Unreal Engine, Maya, or Blender.',
      },
      {
        title: 'FACS Facial Blendshapes',
        description: '52 standard ARKit / FACS facial blendshape targets for live iPhone facial capture and lip-syncing.',
      },
      {
        title: 'Multi-Tile 32-bit Displacement Maps',
        description: 'High-fidelity EXR displacement and vector displacement maps that reconstruct micro-sculpt detail at render time.',
      },
    ],
    specifications: [
      { label: 'Sculpting Software', value: 'Pixologic ZBrush 2026, Mudbox' },
      { label: 'Clothing Simulation', value: 'Marvelous Designer / CLO 3D' },
      { label: 'Hair & Grooming', value: 'Maya XGen, Houdini Groom, Unreal Groom' },
      { label: 'Facial Rigging', value: '52 FACS Blendshapes (Apple ARKit Compatible)' },
      { label: 'Texture Maps', value: '8K Skin SSS, Micro-Normal, Cavity, Roughness' },
      { label: 'Export Hierarchy', value: 'Organized ZTL, FBX with Skin Weights, OBJ' },
    ],
    pipeline: [
      {
        step: '01',
        phase: 'Anatomical Blockout',
        duration: 'Day 1 – 3',
        title: 'Skeletal Proportions & Silhouette',
        description: 'We establish primary bone structure, head-to-body ratios, and heroic posture using low-resolution digital clay.',
        deliverable: 'Primary form turntable for anatomical proportion sign-off',
      },
      {
        step: '02',
        phase: 'Secondary & Tertiary Sculpting',
        duration: 'Day 4 – 7',
        title: 'Musculature, Veins & Surface Detailing',
        description: 'We carve muscle definitions, skin wrinkles, epidermal pores, and clothing folds in Marvelous Designer.',
        deliverable: 'High-poly grey clay proof with close-up facial crops',
      },
      {
        step: '03',
        phase: 'Retopology & Facial Blendshapes',
        duration: 'Day 8 – 11',
        title: 'Deformation-Ready Topology',
        description: 'We create animation-ready edge loops around eyes, mouth, and joints, plus 52 FACS facial targets.',
        deliverable: 'Deformation stress test animation verifying clean bending',
      },
      {
        step: '04',
        phase: 'Skin Shading & Final Handover',
        duration: 'Day 12 – 15',
        title: 'Subsurface Scattering LookDev',
        description: 'We author multi-layer skin shaders with subdermal blood scattering, eye caustics, and deliver master files.',
        deliverable: 'Production character package with full commercial rights',
      },
    ],
    features: [
      'Master digital sculpting in ZBrush with tens of millions of polygons',
      'Realistic Marvelous Designer cloth draping and seam stitching',
      'Clean quad retopology optimized for natural joint deformation',
      '52 FACS blendshapes ready for live facial mocap in Unreal Engine 5',
      'Multi-layer subsurface scattering (SSS) textures for lifelike skin',
      'Full commercial ownership transfer under mutual NDA',
    ],
    pricingOptions: [
      {
        tier: 'Bust / Mascot Character',
        price: '$2,800 – $4,500',
        idealFor: 'Stylized 3D brand mascot or head/bust portrait with clean topology.',
        scope: ['High-poly ZBrush sculpt', 'Clean retopology', 'PBR textures', 'Basic facial morphs', '2 revisions'],
      },
      {
        tier: 'Full-Body Hero Character',
        price: '$5,500 – $10,500',
        idealFor: 'Full-body realistic character with custom clothing, hair groom, and animation-ready topology.',
        scope: ['Marvelous Designer wardrobe', 'Full-body quad topology', '52 FACS blendshapes', '8K PBR skin textures', '4 revisions'],
      },
      {
        tier: 'Cinematic Game / Film Asset',
        price: '$12,000+',
        idealFor: 'Lead cinematic protagonist or complex creature for film and AAA game production.',
        scope: ['Full anatomical detailing', 'Custom XGen hair groom', 'Full skeleton rig setup', 'Unreal Engine 5 integration test', 'Senior Character Lead'],
      },
    ],
    faqs: [
      {
        question: 'Can these characters be rigged for motion capture?',
        answer: 'Yes! The retopology is built specifically to accommodate standard motion capture rigs and Unreal Engine MetaHuman / Mannequin skeleton retargeting.',
      },
      {
        question: 'Can you create clothing and accessories?',
        answer: 'Yes, we design complex multi-layered garments in Marvelous Designer with accurate physical fabric simulation (denim, leather, silk, armor plating).',
      },
    ],
  },
  {
    id: 'archviz-digital-twins',
    number: '06',
    title: 'Architectural Visualization & Spatial Digital Twins',
    subtitle: 'Spatial environments, exterior architecture, and real-time Unreal Engine 5 walk-throughs',
    tagline: 'Photorealistic architectural renderings, virtual tours, and interactive spatial twins.',
    category: 'Architecture & Real Estate',
    heroImage: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1600&q=80',
    leadTime: '8 – 16 Business Days',
    formats: '8K Still Renders · Unreal Engine 5 Package · 360° VR Panoramas',
    outcomeStat: '100% off-plan pre-sales acceleration across major luxury developments',
    rating: '4.99 / 5.0 (95 Reviews)',
    overview:
      'We bring architectural developments to life months before ground is broken. Using Unreal Engine 5 with Lumen real-time global illumination and Nanite geometry virtualization, alongside offline Corona and V-Ray rendering, we produce luxury interior stills, exterior master plans, and interactive real-time walkthroughs.',
    challengeSolves:
      'Prospective buyers, municipal zoning boards, and institutional investors struggle to evaluate scale, lighting, and spatial atmosphere from 2D architectural blueprints. Our 3D visualizations create visceral emotional connections that close sales off-plan.',
    deliverables: [
      {
        title: '8K Architectural Exterior & Interior Stills',
        description: 'Indistinguishable photographic stills rendered at 8K with accurate solar orientation and atmospheric fog.',
      },
      {
        title: 'Real-Time Walkthrough in Unreal Engine 5',
        description: 'Interactive first-person or cinematic camera tour running with dynamic Lumen lighting and weather controls.',
      },
      {
        title: '360° VR Virtual Tour Package',
        description: 'High-resolution stereoscopic panoramas compatible with Meta Quest, Apple Vision Pro, and mobile web browsers.',
      },
      {
        title: 'Interior Virtual Staging & Material Swatches',
        description: 'Fully staged living spaces with custom designer furniture, architectural lighting, and interactive finish swatches.',
      },
    ],
    specifications: [
      { label: 'Render Engines', value: 'Unreal Engine 5.5 (Lumen/Nanite), Corona 12, V-Ray 7' },
      { label: 'Still Resolution', value: '8K (7680x4320) & 12K Panorama' },
      { label: 'Real-Time Frame Rate', value: '60 FPS at 4K in Unreal Engine 5' },
      { label: 'Geographical Accuracy', value: 'True GPS Solar Position & Daylight Study' },
      { label: 'VR Compatibility', value: 'Meta Quest 3, Apple Vision Pro, WebXR' },
      { label: 'BIM / CAD Ingestion', value: 'Revit, AutoCAD, Archicad, SketchUp, Rhino' },
    ],
    pipeline: [
      {
        step: '01',
        phase: 'Revit / CAD Structural Ingestion',
        duration: 'Day 1 – 3',
        title: 'Site Plan & Elevation Alignment',
        description: 'We import your architectural BIM models, verify structural measurements, clean overlapping geometry, and establish true site orientation.',
        deliverable: 'Massing blockout verifying building scale and camera view corridors',
      },
      {
        step: '02',
        phase: 'Material Assignment & Staging',
        duration: 'Day 4 – 8',
        title: 'Architectural LookDev & Virtual Staging',
        description: 'We apply authentic materials (honed limestone, weathered steel, acoustic timber) and stage interior spaces with curated modern furniture.',
        deliverable: 'Draft material contact sheet showing room textures and foliage',
      },
      {
        step: '03',
        phase: 'Sun Study & Atmospheric Lighting',
        duration: 'Day 9 – 12',
        title: 'Golden Hour, Twilight & Midday Illumination',
        description: 'We calibrate sun angles to match geographical coordinates and simulate evening interior warmth against cool twilight ambient skies.',
        deliverable: 'Full-resolution lighting proofs for developer review',
      },
      {
        step: '04',
        phase: 'High-Resolution Mastering & UE5 Package',
        duration: 'Day 13 – 16',
        title: 'Final Compositing & Interactive Build',
        description: 'We render 8K beauty stills, package the Unreal Engine 5 interactive walkthrough, and deliver VR panoramic tours.',
        deliverable: 'Complete marketing asset deck + executable walkthrough build',
      },
    ],
    features: [
      'Lumen dynamic global illumination with physically accurate daylighting',
      'Curated interior staging with luxury furnishings and custom joinery',
      'Realistic foliage, landscaping, and environmental context modeling',
      'Interactive material swap swatches for flooring, cabinetry, and countertops',
      'Apple Vision Pro and WebXR compatible 360-degree virtual tours',
      'Full architectural intellectual property protection under mutual NDA',
    ],
    pricingOptions: [
      {
        tier: 'Residential Suite (3 Stills)',
        price: '$2,800 – $4,800',
        idealFor: 'Private residence or luxury apartment with 3 high-resolution interior/exterior stills.',
        scope: ['3 8K architectural stills', 'Interior staging & lighting', 'Daylight & twilight versions', '2 revision rounds'],
      },
      {
        tier: 'Commercial Development Deck',
        price: '$6,500 – $12,500',
        idealFor: 'Multi-family residential or commercial office tower marketing launch.',
        scope: ['6 to 10 8K master stills', '360° VR panoramic tour', 'Interactive material swatches', 'High-res billboard print files', '3 revision rounds'],
      },
      {
        tier: 'Unreal Engine 5 Digital Twin',
        price: '$15,000+',
        idealFor: 'Full-scale interactive virtual reality walkthrough for sales galleries and investor centers.',
        scope: ['Complete interactive 3D spatial build', 'Real-time camera navigation', 'Touchscreen sales kiosk ready', 'Dedicated Architectural Director'],
      },
    ],
    faqs: [
      {
        question: 'Can you work with Revit or SketchUp models provided by our architect?',
        answer: 'Yes! We import Revit (.rvt), SketchUp (.skp), Archicad, and Rhino files directly, optimizing the polygon flow and replacing draft materials with photorealistic PBR shaders.',
      },
      {
        question: 'Do you accurately simulate real-world sun angles for our site location?',
        answer: 'Yes, we input your exact GPS coordinates, month, and time of day to simulate accurate shadow paths and daylight penetration for planning approvals.',
      },
    ],
  },
];

export function getServiceById(id: string): ServiceDetailItem | undefined {
  // Direct match
  const found = DETAILED_SERVICES.find((s) => s.id === id);
  if (found) return found;

  // Fallback mappings for aliases
  const aliasMap: Record<string, string> = {
    'hard-surface-cad': '3d-modeling',
    'pbr-lookdev': 'photorealistic-rendering',
    'webgl-configurators': 'ar-vr-visualization',
    'product-cgi': 'animation-walkthroughs',
    'character-sculpting': 'character-sculpting',
    'archviz-digital-twins': 'archviz-digital-twins',
    'modeling': '3d-modeling',
    'rendering': 'photorealistic-rendering',
    'animation': 'animation-walkthroughs',
    'ar-vr': 'ar-vr-visualization',
  };

  const targetId = aliasMap[id] || '3d-modeling';
  return DETAILED_SERVICES.find((s) => s.id === targetId) || DETAILED_SERVICES[0];
}
