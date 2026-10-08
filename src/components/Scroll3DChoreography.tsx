import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ArrowRight, Box, Layers } from 'lucide-react';

interface Scroll3DChoreographyProps {
  onOpenStudio: () => void;
}

interface ChoreographyStage {
  step: string;
  phase: string;
  title: string;
  description: string;
  telemetry: string;
  explodeLabel: string;
}

const STAGES: ChoreographyStage[] = [
  {
    step: '01 / 04',
    phase: 'WIREFRAME CAD INGESTION',
    title: 'Sub-Millimeter Quad-Mesh Topology & Blueprint Alignment',
    description:
      'As you scroll down, watch our 3D pipeline in real time. Every project begins as a watertight subdivision wireframe calibrated directly from your STEP/IGES or architectural DWG blueprints.',
    telemetry: 'MODE: WIREFRAME · EXPLODE: 0% · FOV: 40mm',
    explodeLabel: 'Assembled Wireframe',
  },
  {
    step: '02 / 04',
    phase: 'MECHANICAL EXPLOSION & INTERNAL AUDIT',
    title: 'Multi-Part Assembly Separation & Tolerance Verification',
    description:
      'Scrolling further separates the 3D assembly along axial vectors—exposing internal turbine rotors, optical sapphire lenses, structural cores, and bevelled chamfers for engineering sign-off.',
    telemetry: 'MODE: CLAY + WIRE · EXPLODE: 100% · PARTS: 38 SUB-MESHES',
    explodeLabel: '100% Exploded Cutaway',
  },
  {
    step: '03 / 04',
    phase: 'PBR SHADER & RAY-TRACED LOOKDEV',
    title: 'Anisotropic Titanium, Brushed Gold & Caustic Glass Shaders',
    description:
      'Physical materials lock onto every surface: 8K micro-roughness maps, metallic clearcoats, and HDRI studio light rigs calculate real-time reflections across the exploded geometry.',
    telemetry: 'MODE: ACEScg PBR · EXPLODE: 55% · LIGHTS: 3-POINT STUDIO RIG',
    explodeLabel: 'LookDev Shader Pass',
  },
  {
    step: '04 / 04',
    phase: 'FINAL PRODUCTION MASTER',
    title: 'Reassembled 8K Render & Real-Time WebGL Digital Twin',
    description:
      'The assembly locks back into final production tolerances—ready for 8K print campaigns, 60fps exploded product films, or interactive Apple Vision Pro USDZ & WebGL deployment.',
    telemetry: 'MODE: FINAL PRODUCTION · EXPLODE: 0% · EXPORT: 8K EXR / GLB',
    explodeLabel: 'Production Master',
  },
];

/**
 * Interactive 3D Scroll-Driven Choreography Section:
 * As the user scrolls through this 4-stage track, a sticky Three.js WebGL canvas
 * dynamically orbits the camera, morphs shaders (Wireframe -> Clay -> PBR), and
 * explodes/reassembles a multi-part 3D coaxial turbine & architectural core.
 */
export const Scroll3DChoreography: React.FC<Scroll3DChoreographyProps> = ({ onOpenStudio }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasMountRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState<number>(0); // 0 to 1
  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);

  useEffect(() => {
    const mount = canvasMountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    const width = mount.clientWidth || 640;
    const height = mount.clientHeight || 520;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    mount.innerHTML = '';
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b0d11);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(6.5, 4.2, 8.5);
    camera.lookAt(0, 0, 0);

    // Studio Lighting Rig
    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xfffbeb, 2.8);
    keyLight.position.set(8, 12, 9);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.5);
    rimLight.position.set(-9, 5, -8);
    scene.add(rimLight);

    const accentLight = new THREE.PointLight(0xfacc15, 2.0, 18);
    accentLight.position.set(0, -3, 4);
    scene.add(accentLight);

    // Reference Grid
    const grid = new THREE.GridHelper(18, 18, 0x2d3342, 0x181c24);
    grid.position.y = -2.6;
    scene.add(grid);

    // Multi-Part 3D Scroll Assembly Group
    const assemblyGroup = new THREE.Group();
    scene.add(assemblyGroup);

    // Materials that dynamically morph based on scroll progress
    const pbrMaterials: {
      mat: THREE.MeshStandardMaterial;
      origColor: number;
      origMetal: number;
      origRough: number;
    }[] = [];

    const makeDynamicMat = (
      color: number,
      metalness: number,
      roughness: number,
      emissive: number = 0x000000
    ) => {
      const mat = new THREE.MeshStandardMaterial({
        color,
        metalness,
        roughness,
        emissive,
        emissiveIntensity: emissive ? 0.35 : 0,
      });
      pbrMaterials.push({
        mat,
        origColor: color,
        origMetal: metalness,
        origRough: roughness,
      });
      return mat;
    };

    const addPart = (
      geo: THREE.BufferGeometry,
      mat: THREE.MeshStandardMaterial,
      basePos: [number, number, number],
      explodeVec: [number, number, number],
      baseRot: [number, number, number] = [0, 0, 0],
      spinAxis?: 'x' | 'y' | 'z',
      spinSpeed: number = 0
    ) => {
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...basePos);
      mesh.rotation.set(...baseRot);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = {
        basePos: new THREE.Vector3(...basePos),
        explodeVec: new THREE.Vector3(...explodeVec),
        spinAxis,
        spinSpeed,
      };
      assemblyGroup.add(mesh);
    };

    const titaniumMat = makeDynamicMat(0x94a3b8, 0.88, 0.22);
    const darkCarbonMat = makeDynamicMat(0x1e293b, 0.55, 0.35);
    const goldCoreMat = makeDynamicMat(0xfacc15, 0.92, 0.16);
    const copperCoilMat = makeDynamicMat(0xd97706, 0.85, 0.24);
    const glassLensMat = makeDynamicMat(0x38bdf8, 0.2, 0.1, 0x0284c7);

    // 1. Central Aerospace & Architectural Gyro Core
    addPart(
      new THREE.CylinderGeometry(0.55, 0.55, 5.2, 32),
      goldCoreMat,
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, Math.PI / 2],
      'x',
      0.015
    );

    // 2. Front Intake Shroud Ring (Explodes Left -X)
    addPart(
      new THREE.TorusGeometry(1.85, 0.22, 20, 48),
      titaniumMat,
      [-1.75, 0, 0],
      [-2.4, 0, 0],
      [0, Math.PI / 2, 0]
    );

    // 3. Front Optical Sapphire Dome (Explodes far Left -X)
    addPart(
      new THREE.CylinderGeometry(1.3, 1.5, 0.4, 32),
      glassLensMat,
      [-2.3, 0, 0],
      [-3.5, 0, 0],
      [0, 0, Math.PI / 2]
    );

    // 4. High-Speed Compressor Rotor Blades (14 blades, radial + axial explosion)
    const bladeGeo = new THREE.BoxGeometry(0.12, 1.35, 0.38);
    for (let i = 0; i < 14; i++) {
      const angle = (i / 14) * Math.PI * 2;
      const r = 1.1;
      const y = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      addPart(
        bladeGeo,
        goldCoreMat,
        [-1.05, y, z],
        [-1.4, Math.cos(angle) * 1.4, Math.sin(angle) * 1.4],
        [angle, 0.4, 0]
      );
    }

    // 5. Electromagnetic Stator Copper Core (Explodes Upward +Y)
    addPart(
      new THREE.TorusGeometry(1.4, 0.32, 20, 40),
      copperCoilMat,
      [0, 0, 0],
      [0, 2.1, 0],
      [0, Math.PI / 2, 0],
      'x',
      -0.01
    );

    // 6. Upper & Lower Split Carbon Containment Shells (Explode +Y / -Y and +Z / -Z)
    addPart(
      new THREE.CylinderGeometry(2.05, 2.05, 2.2, 32, 1, true, 0, Math.PI),
      darkCarbonMat,
      [0.15, 0, 0],
      [0, 2.4, 1.2],
      [0, 0, Math.PI / 2]
    );
    addPart(
      new THREE.CylinderGeometry(2.05, 2.05, 2.2, 32, 1, true, Math.PI, Math.PI),
      darkCarbonMat,
      [0.15, 0, 0],
      [0, -2.4, -1.2],
      [0, 0, Math.PI / 2]
    );

    // 7. Rear Exhaust Vectoring Nozzle (Explodes Right +X)
    addPart(
      new THREE.CylinderGeometry(1.3, 1.9, 1.5, 32, 1, true),
      titaniumMat,
      [1.85, 0, 0],
      [2.7, 0, 0],
      [0, 0, Math.PI / 2]
    );

    // 8. Outer Structural Gimbal Rings (Explode Outward Z)
    addPart(
      new THREE.TorusGeometry(2.45, 0.08, 16, 64),
      goldCoreMat,
      [0, 0, 0],
      [0, 0, 2.5],
      [Math.PI / 4, 0, 0],
      'z',
      0.008
    );
    addPart(
      new THREE.TorusGeometry(2.65, 0.08, 16, 64),
      titaniumMat,
      [0, 0, 0],
      [0, 0, -2.5],
      [-Math.PI / 4, 0, 0],
      'y',
      -0.008
    );

    let targetProgress = 0;
    let smoothProgress = 0;

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      const totalScrollable = Math.max(1, rect.height - viewHeight);
      const scrolled = -rect.top;
      const ratio = Math.max(0, Math.min(1, scrolled / totalScrollable));
      targetProgress = ratio;
      setScrollProgress(ratio);

      const stageIndex = Math.min(3, Math.floor(ratio * 4));
      setActiveStageIdx(stageIndex);
    };

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth || 640;
      const h = mount.clientHeight || 520;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      handleScroll();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleScroll();

    let animId = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      smoothProgress += (targetProgress - smoothProgress) * 0.09;

      // Compute explosion curve:
      // 0.0 -> 0.15: 0% to 25%
      // 0.15 -> 0.55: peaks at 100% exploded
      // 0.55 -> 0.85: holds ~60% exploded during shader pass
      // 0.85 -> 1.0: reassembles cleanly to 0%
      const explodeBell = Math.sin(smoothProgress * Math.PI);
      const explodeAmount = Math.pow(explodeBell, 0.85);

      // Update shaders based on scroll stage:
      // Stage 0 (0 - 0.25): Wireframe mode
      // Stage 1 (0.25 - 0.5): Clay mode
      // Stage 2 & 3 (0.5 - 1.0): Full PBR mode
      const isWireframeStage = smoothProgress < 0.24;
      const isClayStage = smoothProgress >= 0.24 && smoothProgress < 0.52;

      pbrMaterials.forEach((item) => {
        if (isWireframeStage) {
          item.mat.wireframe = true;
          item.mat.color.setHex(0xfacc15);
          item.mat.metalness = 0.1;
          item.mat.roughness = 0.8;
        } else if (isClayStage) {
          item.mat.wireframe = false;
          item.mat.color.setHex(0xd6d5ce);
          item.mat.metalness = 0.08;
          item.mat.roughness = 0.72;
        } else {
          item.mat.wireframe = false;
          item.mat.color.setHex(item.origColor);
          item.mat.metalness = item.origMetal;
          item.mat.roughness = item.origRough;
        }
      });

      // Apply scroll-driven explosion & rotation to every sub-part
      assemblyGroup.children.forEach((child) => {
        const mesh = child as THREE.Mesh;
        const basePos = mesh.userData.basePos as THREE.Vector3;
        const explodeVec = mesh.userData.explodeVec as THREE.Vector3;
        if (basePos && explodeVec) {
          mesh.position.x = basePos.x + explodeVec.x * explodeAmount;
          mesh.position.y = basePos.y + explodeVec.y * explodeAmount;
          mesh.position.z = basePos.z + explodeVec.z * explodeAmount;
        }
        if (mesh.userData.spinAxis === 'x') {
          mesh.rotation.x += mesh.userData.spinSpeed;
        } else if (mesh.userData.spinAxis === 'y') {
          mesh.rotation.y += mesh.userData.spinSpeed;
        } else if (mesh.userData.spinAxis === 'z') {
          mesh.rotation.z += mesh.userData.spinSpeed;
        }
      });

      // Scroll-driven 3D Camera Orbit around the assembly
      const orbitAngle = smoothProgress * Math.PI * 1.65 + 0.6;
      const radius = 8.8 - explodeAmount * 1.1;
      camera.position.x = Math.cos(orbitAngle) * radius;
      camera.position.z = Math.sin(orbitAngle) * radius;
      camera.position.y = 2.8 + Math.sin(smoothProgress * Math.PI * 2) * 1.8;
      camera.lookAt(0, 0, 0);

      // Whole assembly subtle pitch with scroll
      assemblyGroup.rotation.y = smoothProgress * 0.8;
      assemblyGroup.rotation.z = Math.sin(smoothProgress * Math.PI) * 0.18;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  const currentStage = STAGES[activeStageIdx] || STAGES[0];
  const explodePercentage = Math.round(Math.pow(Math.sin(scrollProgress * Math.PI), 0.85) * 100);

  return (
    <section
      ref={sectionRef}
      className="relative border-b border-black/15 dark:border-white/10 bg-[#EFEFE9]/90 dark:bg-[#0D0F13]/90"
    >
      {/* Tall Scroll Track (240vh) for Smooth 3D Scroll Scrubbing */}
      <div className="max-w-[1280px] mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Sticky Live Scroll-Controlled 3D WebGL Viewport */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <div className="border border-black/20 dark:border-white/15 bg-[#0B0D11] overflow-hidden">
              {/* Viewport Top Telemetry Header */}
              <div className="px-4 py-3 bg-[#12151C] border-b border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono-tabular">
                <div className="flex items-center gap-2 text-[#F4F4F0]">
                  <Box className="w-3.5 h-3.5 text-[#FACC15]" />
                  <span className="font-semibold">SCROLL-DRIVEN 3D ENGINE</span>
                  <span className="text-white/30">·</span>
                  <span className="text-[#FACC15]">{currentStage.explodeLabel}</span>
                </div>
                <div className="text-[#94A3B8]">
                  SCROLL: {Math.round(scrollProgress * 100)}% · EXPLODE: {explodePercentage}%
                </div>
              </div>

              {/* Three.js Canvas Mount */}
              <div ref={canvasMountRef} className="w-full h-[380px] sm:h-[460px] relative" />

              {/* Viewport Bottom Scroll Progress & Stage Bar */}
              <div className="p-4 bg-[#12151C] border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono-tabular text-[#94A3B8]">
                  <span>{currentStage.telemetry}</span>
                  <span className="text-[#FACC15]">SCROLL PAGE TO ORBIT & EXPLODE 3D</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-[#FACC15] transition-all duration-75"
                    style={{ width: `${Math.max(4, scrollProgress * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Scroll-Triggered 3D Engineering Stage Cards */}
          <div className="lg:col-span-5 space-y-12 lg:py-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#B45309] dark:text-[#FACC15]">
                <Layers className="w-3.5 h-3.5" />
                <span>Interactive 3D Scroll Choreography</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#090A0C] dark:text-[#F4F4F0] leading-tight">
                Scroll to Dissect Our 3D Engineering Pipeline.
              </h2>
              <p className="text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                As you scroll down this section, the live WebGL viewport on the left dynamically
                transitions from quad wireframe to exploded mechanical assembly and full ACEScg
                ray-traced shaders.
              </p>
            </div>

            <div className="space-y-8">
              {STAGES.map((stage, idx) => {
                const isActive = idx === activeStageIdx;
                return (
                  <div
                    key={stage.step}
                    className={`p-6 border transition-all duration-300 ${
                      isActive
                        ? 'bg-white dark:bg-[#14171F] border-[#090A0C] dark:border-[#FACC15] border-2 translate-x-1'
                        : 'bg-[#F6F6F2]/80 dark:bg-[#090A0C]/80 border-black/15 dark:border-white/10 opacity-65'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono-tabular mb-2">
                      <span className="font-semibold text-[#B45309] dark:text-[#FACC15]">
                        STAGE {stage.step}
                      </span>
                      <span className="text-[#475569] dark:text-[#94A3B8]">{stage.phase}</span>
                    </div>
                    <h3 className="text-xl font-display font-bold text-[#090A0C] dark:text-[#F4F4F0] mb-2">
                      {stage.title}
                    </h3>
                    <p className="text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed mb-4">
                      {stage.description}
                    </p>
                    <div className="pt-3 border-t border-black/10 dark:border-white/10 text-[11px] font-mono-tabular text-[#090A0C] dark:text-[#E2E8F0]">
                      {stage.telemetry}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={onOpenStudio}
              className="w-full py-3.5 px-6 bg-[#090A0C] hover:bg-[#1E293B] text-[#FACC15] dark:bg-[#FACC15] dark:hover:bg-[#EAB308] dark:text-[#090A0C] font-semibold text-sm rounded-none transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Inspect All 10 Models in Fullscreen 3D Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
