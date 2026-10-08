import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RotateCcw, Box, Play, Pause } from 'lucide-react';

export type ModelPresetId =
  | 'pavilion'
  | 'turbine'
  | 'chronograph'
  | 'sculpture'
  | 'supercar'
  | 'sofa'
  | 'ring'
  | 'robot'
  | 'skyscraper'
  | 'drone';

export type ShadingMode = 'pbr' | 'clay' | 'wireframe';

interface Interactive3DModelViewerProps {
  initialPreset?: ModelPresetId;
  compact?: boolean;
  onSelectPresetForQuote?: (presetName: string, polyStats: string) => void;
}

export interface ModelMeta {
  id: ModelPresetId;
  name: string;
  shortLabel: string;
  category: string;
  polygons: string;
  vertices: string;
  uvChannels: string;
  formats: string;
  description: string;
}

export const MODEL_PRESETS: ModelMeta[] = [
  {
    id: 'pavilion',
    name: 'Cantilever Brutalist Pavilion',
    shortLabel: 'ArchViz Pavilion',
    category: 'Architectural BIM & Exterior Mesh',
    polygons: '48,420 Quads (LOD0)',
    vertices: '51,180 Verts',
    uvChannels: '2 Channels (Lightmap + 8K UDIM)',
    formats: 'FBX · RVT · USDZ · glTF',
    description:
      'Multi-level cantilevered architectural concrete structure with recessed warm ceiling illumination, structural columns, glass curtain walls, and reflecting pool base.',
  },
  {
    id: 'turbine',
    name: 'Aerospace Coaxial Turbine Core',
    shortLabel: 'Aerospace Turbine',
    category: 'Precision CAD Mechanical Assembly',
    polygons: '64,800 Quads (Sub-D)',
    vertices: '68,210 Verts',
    uvChannels: '3 UDIM Tiles · 16-bit Normal',
    formats: 'STEP · IGES · FBX · GLB',
    description:
      'Explodable multi-stage rotor assembly featuring radial stator blades, copper induction core, precision bearing rings, and anodized housing rings.',
  },
  {
    id: 'chronograph',
    name: 'Calibre 09 Tourbillon Escapement',
    shortLabel: 'Tourbillon Watch',
    category: 'Horology & Luxury Product CGI',
    polygons: '38,900 Quads (Micro-Bevel)',
    vertices: '41,050 Verts',
    uvChannels: 'Anisotropic Brushed Metal UV',
    formats: 'C4D · OBJ · USDZ · STEP',
    description:
      'High-precision horological cage assembly with coaxial balance wheels, rose-gold bezel architecture, sapphire crystal dome, and calibrated crown gear.',
  },
  {
    id: 'supercar',
    name: 'Aerolith GT Electric Concept Chassis',
    shortLabel: 'Electric Supercar',
    category: 'Automotive Class-A Surface & Aero',
    polygons: '82,600 Quads (Class-A NURBS)',
    vertices: '86,940 Verts',
    uvChannels: '4 UDIM Tiles · Flake Car Paint',
    formats: 'ALIAS · FBX · USDZ · VRED',
    description:
      'Aerodynamic electric grand tourer featuring a forged carbon monocoque tub, twin-motor battery skate, glass canopy cockpit, active rear diffuser, and 5-spoke forged wheels.',
  },
  {
    id: 'sofa',
    name: 'Nordic Modular Cognac Leather Sofa',
    shortLabel: 'Modular Sofa',
    category: 'Furniture & E-Commerce Configurator',
    polygons: '29,400 Quads (Marvelous + Sub-D)',
    vertices: '31,120 Verts',
    uvChannels: 'Real-Scale Seam Unwrap (4K PBR)',
    formats: 'MAX · BLEND · GLB · USDZ',
    description:
      'Bespoke L-shaped architectural sectional sofa with full-grain cognac leather cushions, walnut timber plinth, blackened steel legs, and honed Roman travertine coffee table.',
  },
  {
    id: 'ring',
    name: 'Royal Sapphire & Pearl Signet Ring',
    shortLabel: 'Sapphire Ring',
    category: 'Fine Jewelry CAD & Caustic Gemology',
    polygons: '44,200 Quads (MatrixGold CAD)',
    vertices: '45,800 Verts',
    uvChannels: 'Dispersion & IOR Gem Shaders',
    formats: '3DM · STL · OBJ · C4D',
    description:
      '18k rose-gold cathedral band crowned with a multi-facet royal blue cushion sapphire, twin South Sea cultured pearls, and micro-pavé diamond gallery prongs.',
  },
  {
    id: 'robot',
    name: '6-Axis Industrial Robotic Manipulator',
    shortLabel: '6-Axis Robot Arm',
    category: 'Industrial Automation & Digital Twin',
    polygons: '56,300 Quads (Kinematic Rig)',
    vertices: '59,400 Verts',
    uvChannels: '2 UDIM Tiles · Hard-Surface PBR',
    formats: 'STEP · USD · FBX · GLTF',
    description:
      'Articulated 6-DOF factory assembly robot featuring a heavy cast-iron rotating turret, dual hydraulic servo actuators, safety-amber boom arms, and precision pneumatic gripper.',
  },
  {
    id: 'skyscraper',
    name: 'Parametric Diagrid High-Rise Tower',
    shortLabel: 'Diagrid Skyscraper',
    category: 'Urban Masterplan & Facade BIM',
    polygons: '74,500 Quads (Grasshopper BIM)',
    vertices: '79,100 Verts',
    uvChannels: 'Modular Curtain-Wall Trim Sheet',
    formats: 'RVT · 3DM · FBX ·Twinmotion',
    description:
      'Twisting 48-story commercial tower with structural steel diagrid exoskeleton, low-E reflective glass curtain wall, sky-lobby terraces, and illuminated crown spire.',
  },
  {
    id: 'drone',
    name: 'Hexacopter LiDAR Mapping UAV',
    shortLabel: 'LiDAR Hexacopter',
    category: 'Aerospace & Defense Hardware CGI',
    polygons: '49,800 Quads (Sub-D Carbon)',
    vertices: '52,600 Verts',
    uvChannels: 'Carbon Weave & Anodized Alloy',
    formats: 'SOLIDWORKS · FBX · GLB · USDZ',
    description:
      'Autonomous carbon-fiber 6-rotor surveying drone equipped with a 360-degree stabilized optical gimbal, laser LiDAR scanner dome, high-RPM brushless rotors, and retractable landing skids.',
  },
  {
    id: 'sculpture',
    name: 'Parametric Torus Pavilion Knot',
    shortLabel: 'Parametric Knot',
    category: 'Subdivision Surface & Topology Study',
    polygons: '52,000 Quads (Watertight)',
    vertices: '52,000 Verts',
    uvChannels: 'Seamless Continuous Geodesic UV',
    formats: 'Blend · ZTL · FBX · USDZ',
    description:
      'Continuous high-genus mathematical subdivision surface demonstrating zero-pinch quad topology, isotropic edge flow, and clearcoat physical shaders.',
  },
];

export const Interactive3DModelViewer: React.FC<Interactive3DModelViewerProps> = ({
  initialPreset = 'pavilion',
  onSelectPresetForQuote,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  const [activePreset, setActivePreset] = useState<ModelPresetId>(initialPreset);
  const [shadingMode, setShadingMode] = useState<ShadingMode>('pbr');
  const [explodedFactor, setExplodedFactor] = useState<number>(0); // 0 to 100
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [webglError, setWebglError] = useState<boolean>(false);

  // Sync if parent updates initialPreset
  useEffect(() => {
    setActivePreset(initialPreset);
    setExplodedFactor(0);
  }, [initialPreset]);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const gridHelperRef = useRef<THREE.GridHelper | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const explodedRef = useRef<number>(0);
  const shadingRef = useRef<ShadingMode>('pbr');

  const currentMeta = MODEL_PRESETS.find((m) => m.id === activePreset) || MODEL_PRESETS[0];

  // Build procedural 3D model geometry inside modelGroup
  const buildModelGeometry = (
    group: THREE.Group,
    preset: ModelPresetId,
    mode: ShadingMode
  ) => {
    while (group.children.length > 0) {
      const child = group.children[0] as THREE.Mesh;
      if (child.geometry) child.geometry.dispose();
      group.remove(child);
    }

    const createMat = (
      colorHex: number,
      metalness: number,
      roughness: number,
      emissiveHex: number = 0x000000,
      emissiveIntensity: number = 0,
      opacity: number = 1
    ) => {
      if (mode === 'wireframe') {
        return new THREE.MeshBasicMaterial({
          color: 0xfacc15,
          wireframe: true,
        });
      }
      if (mode === 'clay') {
        return new THREE.MeshStandardMaterial({
          color: 0xd6d5ce,
          roughness: 0.72,
          metalness: 0.06,
        });
      }
      return new THREE.MeshPhysicalMaterial({
        color: colorHex,
        metalness,
        roughness,
        emissive: emissiveHex,
        emissiveIntensity,
        clearcoat: metalness > 0.5 ? 0.45 : 0.12,
        transparent: opacity < 1,
        opacity,
      });
    };

    const addPart = (
      geometry: THREE.BufferGeometry,
      material: THREE.Material,
      basePos: [number, number, number],
      explodeVec: [number, number, number],
      baseRot: [number, number, number] = [0, 0, 0],
      spinSpeed: [number, number, number] = [0, 0, 0]
    ) => {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(basePos[0], basePos[1], basePos[2]);
      mesh.rotation.set(baseRot[0], baseRot[1], baseRot[2]);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = {
        basePos: new THREE.Vector3(...basePos),
        explodeVec: new THREE.Vector3(...explodeVec),
        spinSpeed: new THREE.Vector3(...spinSpeed),
      };
      group.add(mesh);

      if (mode !== 'wireframe') {
        const edges = new THREE.EdgesGeometry(geometry, 28);
        const lineMat = new THREE.LineBasicMaterial({
          color: mode === 'clay' ? 0x1e293b : 0xffffff,
          transparent: true,
          opacity: mode === 'clay' ? 0.22 : 0.08,
        });
        const lineSeg = new THREE.LineSegments(edges, lineMat);
        mesh.add(lineSeg);
      }
    };

    if (preset === 'pavilion') {
      const concreteMat = createMat(0x94989c, 0.15, 0.65);
      const darkSteelMat = createMat(0x1e242b, 0.85, 0.3);
      const warmWoodMat = createMat(0xb45309, 0.1, 0.5, 0xf59e0b, 0.18);
      const glassMat = createMat(0x38bdf8, 0.9, 0.1, 0x0284c7, 0.1, 0.45);
      const waterMat = createMat(0x0f172a, 0.95, 0.08);

      addPart(new THREE.BoxGeometry(5.2, 0.25, 3.6, 8, 2, 6), concreteMat, [0, -1.1, 0], [0, -0.8, 0]);
      addPart(new THREE.BoxGeometry(3.4, 0.08, 2.2, 6, 1, 6), waterMat, [0.7, -0.95, 0.4], [0, -0.5, 0.4]);
      addPart(new THREE.BoxGeometry(2.2, 1.3, 2.0, 6, 4, 6), concreteMat, [-1.1, -0.35, -0.3], [-0.9, 0, -0.4]);
      addPart(new THREE.BoxGeometry(4.6, 0.22, 2.6, 10, 2, 6), concreteMat, [0.3, 0.35, 0], [0, 0.2, 0]);
      addPart(new THREE.BoxGeometry(3.8, 0.12, 2.1, 6, 1, 4), warmWoodMat, [0.5, 1.38, 0], [0, 0.95, 0]);
      addPart(new THREE.BoxGeometry(3.5, 0.95, 2.0, 6, 4, 4), glassMat, [0.55, 0.9, 0], [0.8, 0.5, 0.6]);
      addPart(new THREE.BoxGeometry(4.9, 0.26, 2.8, 10, 2, 6), concreteMat, [0.35, 1.55, 0], [0, 1.4, 0]);
      [-0.8, 0.4, 1.6, 2.2].forEach((xPos, idx) => {
        addPart(
          new THREE.BoxGeometry(0.08, 1.0, 0.08, 2, 4, 2),
          darkSteelMat,
          [xPos, 0.9, 1.02],
          [0.2 * (idx - 1.5), 0.6, 1.1]
        );
      });
    } else if (preset === 'turbine') {
      const titaniumMat = createMat(0x94a3b8, 0.92, 0.22);
      const copperMat = createMat(0xd97706, 0.88, 0.25, 0xf59e0b, 0.08);
      const anodizedBlackMat = createMat(0x181b22, 0.75, 0.32);
      const chromeMat = createMat(0xe2e8f0, 0.98, 0.12);

      addPart(
        new THREE.CylinderGeometry(0.24, 0.24, 4.8, 32, 8),
        chromeMat,
        [0, 0, 0],
        [0, 0, 0],
        [Math.PI / 2, 0, 0],
        [0, 0, 0.015]
      );
      addPart(
        new THREE.ConeGeometry(0.68, 1.1, 32, 6),
        anodizedBlackMat,
        [0, 0, 2.1],
        [0, 0, 1.8],
        [Math.PI / 2, 0, 0],
        [0, 0, 0.015]
      );
      addPart(
        new THREE.TorusGeometry(1.55, 0.16, 20, 48),
        anodizedBlackMat,
        [0, 0, 1.35],
        [0, 0, 1.4]
      );
      for (let i = 0; i < 18; i++) {
        const angle = (i / 18) * Math.PI * 2;
        const radius = 0.92;
        addPart(
          new THREE.BoxGeometry(0.14, 1.15, 0.04, 2, 4, 1),
          titaniumMat,
          [Math.cos(angle) * radius, Math.sin(angle) * radius, 1.1],
          [Math.cos(angle) * 0.8, Math.sin(angle) * 0.8, 0.95],
          [0.35, 0, angle - Math.PI / 2]
        );
      }
      addPart(
        new THREE.CylinderGeometry(1.18, 1.18, 1.1, 36, 6, false),
        copperMat,
        [0, 0, 0.0],
        [0, 0, 0],
        [Math.PI / 2, 0, 0],
        [0, 0, -0.008]
      );
      addPart(
        new THREE.TorusGeometry(1.42, 0.12, 16, 48),
        titaniumMat,
        [0, 0, 0.0],
        [0, 0.6, 0]
      );
      for (let i = 0; i < 16; i++) {
        const angle = (i / 16) * Math.PI * 2;
        const radius = 0.82;
        addPart(
          new THREE.BoxGeometry(0.12, 0.95, 0.04, 2, 4, 1),
          copperMat,
          [Math.cos(angle) * radius, Math.sin(angle) * radius, -1.05],
          [Math.cos(angle) * 0.7, Math.sin(angle) * 0.7, -0.9],
          [-0.35, 0, angle - Math.PI / 2]
        );
      }
      addPart(
        new THREE.CylinderGeometry(1.05, 1.38, 1.2, 36, 6, true),
        anodizedBlackMat,
        [0, 0, -1.75],
        [0, 0, -1.6],
        [Math.PI / 2, 0, 0]
      );
    } else if (preset === 'chronograph') {
      const roseGoldMat = createMat(0xe5a97c, 0.92, 0.18);
      const titaniumMat = createMat(0x64748b, 0.88, 0.28);
      const sapphireMat = createMat(0x38bdf8, 0.95, 0.05, 0x0284c7, 0.15, 0.32);
      const brassGearMat = createMat(0xf59e0b, 0.9, 0.22, 0xd97706, 0.1);

      addPart(
        new THREE.TorusGeometry(1.75, 0.24, 24, 64),
        roseGoldMat,
        [0, 0, 0],
        [0, 0, 0.6],
        [Math.PI / 3, 0, 0]
      );
      addPart(
        new THREE.CylinderGeometry(1.82, 1.68, 0.45, 48, 4),
        titaniumMat,
        [0, -0.25, -0.15],
        [0, -0.9, -0.5],
        [Math.PI / 2 - Math.PI / 6, 0, 0]
      );
      addPart(
        new THREE.TorusGeometry(1.1, 0.07, 16, 48),
        brassGearMat,
        [0, 0.05, 0.05],
        [0, 0.4, 0.3],
        [Math.PI / 3, 0, 0],
        [0, 0, 0.02]
      );
      addPart(
        new THREE.TorusGeometry(0.68, 0.06, 16, 36),
        roseGoldMat,
        [-0.35, 0.12, 0.12],
        [-0.6, 0.7, 0.5],
        [Math.PI / 3, 0.2, 0],
        [0, 0, -0.03]
      );
      addPart(
        new THREE.TorusGeometry(0.52, 0.05, 16, 32),
        titaniumMat,
        [0.48, 0.1, 0.1],
        [0.6, 0.6, 0.4],
        [Math.PI / 3, -0.15, 0],
        [0, 0, 0.025]
      );
      addPart(
        new THREE.CylinderGeometry(0.28, 0.28, 0.45, 24, 3),
        roseGoldMat,
        [2.05, 0, 0],
        [1.4, 0, 0],
        [0, 0, Math.PI / 2]
      );
      addPart(
        new THREE.CylinderGeometry(1.65, 1.65, 0.12, 48, 2),
        sapphireMat,
        [0, 0.32, 0.22],
        [0, 1.3, 0.9],
        [Math.PI / 2 - Math.PI / 6, 0, 0]
      );
    } else if (preset === 'supercar') {
      const gunmetalPaint = createMat(0x475569, 0.88, 0.18);
      const carbonFiber = createMat(0x181b22, 0.5, 0.35);
      const canopyGlass = createMat(0x0ea5e9, 0.95, 0.08, 0x0284c7, 0.1, 0.48);
      const brakeGold = createMat(0xfacc15, 0.9, 0.22, 0xf59e0b, 0.15);
      const tireRubber = createMat(0x0f172a, 0.15, 0.85);
      const ledGlow = createMat(0xfef08a, 0.2, 0.1, 0xfacc15, 1.2);

      // 1. Carbon Underbody Floor & Diffuser Skate
      addPart(new THREE.BoxGeometry(4.8, 0.16, 2.1, 10, 2, 6), carbonFiber, [0, -0.55, 0], [0, -1.1, 0]);
      // 2. High-Voltage Battery Core Pack
      addPart(new THREE.BoxGeometry(2.8, 0.22, 1.5, 8, 2, 4), brakeGold, [0, -0.35, 0], [0, -0.5, 0]);
      // 3. Sculpted Lower Body Shell
      addPart(new THREE.BoxGeometry(4.5, 0.52, 2.0, 12, 4, 6), gunmetalPaint, [0, -0.05, 0], [0, 0.35, 0]);
      // 4. Front Aero Hood & Splitter
      addPart(new THREE.BoxGeometry(1.35, 0.25, 1.85, 6, 2, 4), gunmetalPaint, [1.65, 0.08, 0], [1.2, 0.5, 0], [0, 0, -0.12]);
      // 5. Teardrop Glass Cockpit Canopy
      addPart(new THREE.BoxGeometry(2.1, 0.52, 1.52, 8, 4, 6), canopyGlass, [-0.15, 0.42, 0], [0, 1.35, 0]);
      // 6. Active Rear Carbon GT Wing
      addPart(new THREE.BoxGeometry(0.45, 0.06, 1.95, 4, 1, 6), carbonFiber, [-2.05, 0.52, 0], [-1.3, 1.1, 0], [0, 0, 0.18]);
      // 7. Front & Rear LED Light Bars
      addPart(new THREE.BoxGeometry(0.08, 0.06, 1.75, 1, 1, 4), ledGlow, [2.26, 0.02, 0], [1.6, 0.2, 0]);
      addPart(new THREE.BoxGeometry(0.08, 0.06, 1.8, 1, 1, 4), ledGlow, [-2.26, 0.15, 0], [-1.6, 0.3, 0]);

      // 8. Four Forged Wheels + Brake Rotors
      const wheelCoords: [number, number, number, number][] = [
        [1.45, -0.35, 1.05, 1],
        [1.45, -0.35, -1.05, -1],
        [-1.45, -0.35, 1.05, 1],
        [-1.45, -0.35, -1.05, -1],
      ];
      wheelCoords.forEach(([wx, wy, wz, dir]) => {
        addPart(
          new THREE.CylinderGeometry(0.46, 0.46, 0.32, 32, 3),
          tireRubber,
          [wx, wy, wz],
          [wx * 0.35, -0.3, dir * 0.95],
          [Math.PI / 2, 0, 0]
        );
        addPart(
          new THREE.CylinderGeometry(0.3, 0.3, 0.34, 20, 2),
          brakeGold,
          [wx, wy, wz],
          [wx * 0.35, -0.3, dir * 1.25],
          [Math.PI / 2, 0, 0]
        );
      });
    } else if (preset === 'sofa') {
      const cognacLeather = createMat(0xb45309, 0.12, 0.42);
      const darkWalnut = createMat(0x451a03, 0.1, 0.55);
      const travertineStone = createMat(0xe2e0d8, 0.05, 0.65);
      const blackSteel = createMat(0x181b22, 0.85, 0.25);

      // 1. Timber Architectural Plinth Frame
      addPart(new THREE.BoxGeometry(4.2, 0.18, 1.6, 8, 2, 4), darkWalnut, [-0.3, -0.65, -0.4], [0, -0.7, 0]);
      addPart(new THREE.BoxGeometry(1.5, 0.18, 1.6, 4, 2, 4), darkWalnut, [1.05, -0.65, 1.15], [0.6, -0.7, 0.6]);

      // 2. Plush Cognac Leather Seat Cushions (3 modular blocks + chaise)
      addPart(new THREE.BoxGeometry(1.32, 0.36, 1.42, 6, 3, 6), cognacLeather, [-1.65, -0.38, -0.38], [-0.9, 0.4, -0.3]);
      addPart(new THREE.BoxGeometry(1.32, 0.36, 1.42, 6, 3, 6), cognacLeather, [-0.3, -0.38, -0.38], [0, 0.5, -0.3]);
      addPart(new THREE.BoxGeometry(1.35, 0.36, 2.95, 6, 3, 8), cognacLeather, [1.05, -0.38, 0.38], [0.9, 0.4, 0.5]);

      // 3. Low-Profile Backrest & Armrest Bolsters
      addPart(new THREE.BoxGeometry(4.15, 0.72, 0.34, 10, 4, 2), cognacLeather, [-0.3, 0.12, -1.02], [0, 1.0, -0.9]);
      addPart(new THREE.BoxGeometry(0.34, 0.62, 1.6, 2, 4, 4), cognacLeather, [-2.28, 0.05, -0.4], [-1.3, 0.6, 0]);
      addPart(new THREE.BoxGeometry(0.34, 0.62, 2.95, 2, 4, 6), cognacLeather, [1.88, 0.05, 0.38], [1.3, 0.6, 0]);

      // 4. Travertine Minimalist Coffee Table
      addPart(new THREE.BoxGeometry(1.85, 0.12, 1.15, 6, 2, 4), travertineStone, [-0.85, -0.48, 1.25], [-0.6, 0.8, 1.1]);
      addPart(new THREE.CylinderGeometry(0.22, 0.22, 0.45, 24, 2), blackSteel, [-1.35, -0.75, 1.25], [-0.8, -0.4, 1.1]);
      addPart(new THREE.CylinderGeometry(0.22, 0.22, 0.45, 24, 2), blackSteel, [-0.35, -0.75, 1.25], [-0.4, -0.4, 1.1]);
    } else if (preset === 'ring') {
      const roseGold = createMat(0xfbbf24, 0.95, 0.14);
      const platinum = createMat(0xe2e8f0, 0.96, 0.12);
      const royalSapphire = createMat(0x1d4ed8, 0.9, 0.05, 0x2563eb, 0.35, 0.82);
      const pearlLustre = createMat(0xfefce8, 0.35, 0.12);

      // 1. Main Cathedral Shank Band
      addPart(
        new THREE.TorusGeometry(1.35, 0.22, 28, 72),
        roseGold,
        [0, -0.15, 0],
        [0, -0.6, 0]
      );
      // 2. Inner Platinum Comfort Bezel Band
      addPart(
        new THREE.TorusGeometry(1.32, 0.16, 24, 64),
        platinum,
        [0, -0.15, 0.12],
        [0, -0.4, 0.7]
      );
      // 3. Crown Basket Gallery
      addPart(
        new THREE.CylinderGeometry(0.72, 0.45, 0.42, 8, 2),
        platinum,
        [0, 1.25, 0],
        [0, 0.6, 0]
      );
      // 4. Faceted Royal Blue Cushion Sapphire Gem
      addPart(
        new THREE.OctahedronGeometry(0.75, 2),
        royalSapphire,
        [0, 1.58, 0],
        [0, 1.65, 0],
        [0, Math.PI / 4, 0],
        [0, 0.012, 0]
      );
      // 5. Twin South Sea Cultured Pearls on Shoulders
      addPart(
        new THREE.SphereGeometry(0.36, 32, 32),
        pearlLustre,
        [-0.92, 0.98, 0],
        [-1.1, 1.1, 0.3]
      );
      addPart(
        new THREE.SphereGeometry(0.36, 32, 32),
        pearlLustre,
        [0.92, 0.98, 0],
        [1.1, 1.1, -0.3]
      );
      // 6. Four Prong Claws
      [
        [-0.45, 1.5, 0.45],
        [0.45, 1.5, 0.45],
        [-0.45, 1.5, -0.45],
        [0.45, 1.5, -0.45],
      ].forEach(([px, py, pz]) => {
        addPart(
          new THREE.CylinderGeometry(0.06, 0.08, 0.55, 12, 2),
          roseGold,
          [px, py, pz],
          [px * 1.4, 1.1, pz * 1.4]
        );
      });
    } else if (preset === 'robot') {
      const safetyAmber = createMat(0xf59e0b, 0.75, 0.24);
      const castIron = createMat(0x1e293b, 0.85, 0.35);
      const chromePiston = createMat(0xe2e8f0, 0.96, 0.12);

      // 1. Heavy Floor Pedestal Base
      addPart(new THREE.CylinderGeometry(1.15, 1.35, 0.38, 36, 3), castIron, [0, -1.25, 0], [0, -1.0, 0]);
      // 2. Axis-1 Rotating Waist Turret
      addPart(new THREE.CylinderGeometry(0.88, 0.98, 0.65, 32, 4), safetyAmber, [0, -0.72, 0], [0, -0.4, 0]);
      // 3. Shoulder Servo Motor Drum
      addPart(
        new THREE.CylinderGeometry(0.52, 0.52, 1.15, 28, 3),
        castIron,
        [0, -0.2, 0],
        [-0.8, 0, 0],
        [0, 0, Math.PI / 2]
      );
      // 4. Lower Articulated Boom Arm
      addPart(
        new THREE.BoxGeometry(0.42, 1.85, 0.48, 4, 8, 4),
        safetyAmber,
        [-0.35, 0.65, 0],
        [-0.6, 0.5, 0.4],
        [0, 0, 0.28]
      );
      // 5. Elbow Joint Housing
      addPart(
        new THREE.CylinderGeometry(0.42, 0.42, 0.95, 24, 3),
        castIron,
        [-0.62, 1.48, 0],
        [-0.9, 1.0, -0.4],
        [0, 0, Math.PI / 2]
      );
      // 6. Upper Forearm Boom
      addPart(
        new THREE.BoxGeometry(1.75, 0.34, 0.36, 8, 3, 3),
        safetyAmber,
        [0.25, 1.62, 0],
        [0.5, 1.2, 0],
        [0, 0, -0.15]
      );
      // 7. 6-DOF Wrist & Pneumatic Gripper Claws
      addPart(
        new THREE.CylinderGeometry(0.24, 0.28, 0.45, 20, 2),
        chromePiston,
        [1.25, 1.48, 0],
        [1.4, 1.3, 0],
        [0, 0, Math.PI / 2]
      );
      addPart(
        new THREE.BoxGeometry(0.42, 0.08, 0.12, 3, 1, 2),
        castIron,
        [1.62, 1.58, 0.14],
        [1.9, 1.5, 0.4]
      );
      addPart(
        new THREE.BoxGeometry(0.42, 0.08, 0.12, 3, 1, 2),
        castIron,
        [1.62, 1.38, -0.14],
        [1.9, 1.2, -0.4]
      );
    } else if (preset === 'skyscraper') {
      const curtainGlass = createMat(0x38bdf8, 0.92, 0.12, 0x0284c7, 0.12, 0.72);
      const steelDiagrid = createMat(0xcbd5e1, 0.9, 0.22);
      const podiumConcrete = createMat(0x64748b, 0.25, 0.6);
      const crownBeacon = createMat(0xfacc15, 0.85, 0.18, 0xf59e0b, 0.35);

      // Urban Podium Plaza
      addPart(new THREE.BoxGeometry(3.4, 0.28, 3.4, 8, 2, 8), podiumConcrete, [0, -1.35, 0], [0, -1.1, 0]);

      // 8 Stacked Twisting Diagrid Tower Tiers
      for (let i = 0; i < 8; i++) {
        const yPos = -1.0 + i * 0.38;
        const scale = 1.0 - i * 0.055;
        const twist = i * 0.14;
        addPart(
          new THREE.BoxGeometry(1.85 * scale, 0.34, 1.85 * scale, 6, 2, 6),
          i % 2 === 0 ? curtainGlass : steelDiagrid,
          [0, yPos, 0],
          [Math.cos(twist * 3) * 0.7, (i - 3.5) * 0.28, Math.sin(twist * 3) * 0.7],
          [0, twist, 0]
        );
      }

      // Illuminated Spire Crown
      addPart(
        new THREE.ConeGeometry(0.55, 0.95, 8, 4),
        crownBeacon,
        [0, 2.15, 0],
        [0, 1.6, 0],
        [0, Math.PI / 8, 0]
      );
    } else if (preset === 'drone') {
      const carbonFrame = createMat(0x1e242b, 0.65, 0.28);
      const goldAnodized = createMat(0xf59e0b, 0.9, 0.2);
      const lidarOptics = createMat(0x38bdf8, 0.95, 0.08, 0x0284c7, 0.25);
      const rotorBladeMat = createMat(0x94a3b8, 0.85, 0.22);

      // 1. Central Hexagonal Avionics Body
      addPart(new THREE.CylinderGeometry(0.85, 0.72, 0.32, 6, 2), carbonFrame, [0, 0.15, 0], [0, 0.4, 0]);
      // 2. Top GPS & LiDAR Telemetry Dome
      addPart(new THREE.CylinderGeometry(0.45, 0.58, 0.22, 24, 2), goldAnodized, [0, 0.42, 0], [0, 1.25, 0]);
      // 3. Bottom 360° Gimbal Camera Sphere
      addPart(new THREE.SphereGeometry(0.38, 28, 28), lidarOptics, [0, -0.32, 0], [0, -1.15, 0]);

      // 4. Six Radial Carbon Booms + Brushless Motors + Spinning Rotors
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const armDist = 1.35;
        const motorDist = 1.95;
        const ax = Math.cos(angle) * armDist;
        const az = Math.sin(angle) * armDist;
        const mx = Math.cos(angle) * motorDist;
        const mz = Math.sin(angle) * motorDist;

        // Boom Arm
        addPart(
          new THREE.BoxGeometry(1.35, 0.09, 0.12, 4, 1, 2),
          carbonFrame,
          [ax, 0.15, az],
          [Math.cos(angle) * 0.7, 0.2, Math.sin(angle) * 0.7],
          [0, -angle, 0]
        );
        // Anodized Motor Bell
        addPart(
          new THREE.CylinderGeometry(0.22, 0.22, 0.24, 20, 2),
          goldAnodized,
          [mx, 0.26, mz],
          [Math.cos(angle) * 1.1, 0.6, Math.sin(angle) * 1.1]
        );
        // High-RPM Propeller Disc
        addPart(
          new THREE.BoxGeometry(1.15, 0.02, 0.14, 4, 1, 1),
          rotorBladeMat,
          [mx, 0.42, mz],
          [Math.cos(angle) * 1.25, 1.15, Math.sin(angle) * 1.25],
          [0, angle, 0],
          [0, i % 2 === 0 ? 0.08 : -0.08, 0]
        );
      }

      // 5. Retractable Carbon Landing Skids
      addPart(new THREE.BoxGeometry(1.8, 0.08, 0.08, 6, 1, 1), carbonFrame, [0, -0.85, 0.75], [0, -0.9, 0.6]);
      addPart(new THREE.BoxGeometry(1.8, 0.08, 0.08, 6, 1, 1), carbonFrame, [0, -0.85, -0.75], [0, -0.9, -0.6]);
    } else if (preset === 'sculpture') {
      const goldSculptMat = createMat(0xf59e0b, 0.88, 0.16);
      const obsidianMat = createMat(0x1e293b, 0.75, 0.25);

      addPart(
        new THREE.TorusKnotGeometry(1.15, 0.34, 160, 28, 2, 3),
        goldSculptMat,
        [0, 0.2, 0],
        [0, 0.5, 0],
        [0, 0, 0],
        [0.004, 0.008, 0]
      );
      addPart(
        new THREE.OctahedronGeometry(0.65, 2),
        obsidianMat,
        [0, 0.2, 0],
        [0, 1.4, 0],
        [0, 0, 0],
        [-0.006, 0.01, 0]
      );
      addPart(
        new THREE.CylinderGeometry(1.6, 1.75, 0.28, 48, 2),
        obsidianMat,
        [0, -1.35, 0],
        [0, -0.9, 0]
      );
    }
  };

  // Initialize Three.js WebGL Viewport
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglError(true);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b0d11);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(4.8, 3.1, 5.4);
    cameraRef.current = camera;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.maxDistance = 14;
    controls.minDistance = 2.2;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 1.2;
    controlsRef.current = controls;

    // Three-Point Studio Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xdbeafe, 0.75);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffbeb, 2.6);
    keyLight.position.set(6, 9, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.1);
    fillLight.position.set(-7, 4, -5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xf59e0b, 1.6);
    rimLight.position.set(0, -5, -6);
    scene.add(rimLight);

    // Architectural Studio Grid Floor
    const gridHelper = new THREE.GridHelper(14, 28, 0xf59e0b, 0x262b36);
    gridHelper.position.y = -1.5;
    scene.add(gridHelper);
    gridHelperRef.current = gridHelper;

    // Model Container Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    buildModelGeometry(modelGroup, activePreset, shadingRef.current);

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setWebglError(true);
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);

    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);

      if (modelGroupRef.current) {
        const exp = explodedRef.current / 100;
        modelGroupRef.current.children.forEach((child) => {
          const basePos = child.userData.basePos as THREE.Vector3 | undefined;
          const explodeVec = child.userData.explodeVec as THREE.Vector3 | undefined;
          const spinSpeed = child.userData.spinSpeed as THREE.Vector3 | undefined;

          if (basePos && explodeVec) {
            const targetX = basePos.x + explodeVec.x * exp;
            const targetY = basePos.y + explodeVec.y * exp;
            const targetZ = basePos.z + explodeVec.z * exp;
            child.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.12);
          }

          if (spinSpeed) {
            child.rotation.x += spinSpeed.x;
            child.rotation.y += spinSpeed.y;
            child.rotation.z += spinSpeed.z;
          }
        });
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(reqId);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  // Update model preset or shading mode dynamically
  useEffect(() => {
    shadingRef.current = shadingMode;
    if (modelGroupRef.current) {
      buildModelGeometry(modelGroupRef.current, activePreset, shadingMode);
    }
  }, [activePreset, shadingMode]);

  useEffect(() => {
    explodedRef.current = explodedFactor;
  }, [explodedFactor]);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  useEffect(() => {
    if (gridHelperRef.current) {
      gridHelperRef.current.visible = showGrid;
    }
  }, [showGrid]);

  const handleResetCamera = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(4.8, 3.1, 5.4);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
    setExplodedFactor(0);
  };

  return (
    <div className="border border-black/20 dark:border-white/15 bg-white dark:bg-[#121418] rounded-none">
      {/* Top Studio Bar: 10 Model Presets & Shading Modes */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 px-4 py-3 border-b border-black/15 dark:border-white/10 bg-[#EFEFE9] dark:bg-[#0D0F12]">
        {/* 10 Real-Time 3D Model Selector Buttons */}
        <div className="flex flex-wrap items-center gap-1">
          {MODEL_PRESETS.map((preset) => {
            const active = activePreset === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  setActivePreset(preset.id);
                  setExplodedFactor(0);
                }}
                className={`px-2.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer border ${
                  active
                    ? 'bg-[#090A0C] text-[#FACC15] border-[#090A0C] dark:bg-[#FACC15] dark:text-[#090A0C] dark:border-[#FACC15]'
                    : 'bg-white dark:bg-[#181B22] text-[#475569] dark:text-[#94A3B8] border-black/15 dark:border-white/10 hover:text-[#090A0C] dark:hover:text-[#F4F4F0]'
                }`}
              >
                {preset.shortLabel}
              </button>
            );
          })}
        </div>

        {/* Viewport Shading Pass Controls */}
        <div className="flex items-center gap-1 shrink-0">
          {(['pbr', 'clay', 'wireframe'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setShadingMode(mode)}
              className={`px-2.5 py-1.5 text-xs font-mono-tabular uppercase transition-colors whitespace-nowrap shrink-0 cursor-pointer border ${
                shadingMode === mode
                  ? 'bg-[#090A0C] text-[#F6F6F2] border-[#090A0C] dark:bg-white dark:text-[#090A0C] dark:border-white font-semibold'
                  : 'bg-white dark:bg-[#181B22] text-[#475569] dark:text-[#94A3B8] border-black/15 dark:border-white/10 hover:text-[#090A0C] dark:hover:text-[#F4F4F0]'
              }`}
            >
              {mode === 'pbr' ? 'PBR Shaded' : mode === 'clay' ? 'Clay Matcap' : 'Quad Wireframe'}
            </button>
          ))}
        </div>
      </div>

      {/* Main WebGL Viewport + Right Inspector Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left 8 Cols: Interactive Three.js Canvas */}
        <div className="lg:col-span-8 relative bg-[#0B0D11] min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] flex flex-col justify-between overflow-hidden">
          {webglError ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-[#F4F4F0]">
              <Box className="w-10 h-10 text-[#F59E0B] mb-3" />
              <p className="text-base font-semibold">Interactive 3D Viewport Fallback</p>
              <p className="text-xs text-[#94A3B8] mt-1 max-w-md">
                {currentMeta.name} · {currentMeta.polygons}
              </p>
            </div>
          ) : (
            <div
              ref={mountRef}
              className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
            />
          )}

          {/* Top Left Semantic HUD Overlay */}
          <div className="relative z-10 p-4 pointer-events-none flex flex-wrap items-start justify-between gap-2">
            <div className="bg-black/75 backdrop-blur-sm border border-white/15 px-3 py-2 text-xs text-[#F4F4F0]">
              <div className="font-semibold text-[#FACC15]">
                LIVE WEBGL 3D ASSET ({MODEL_PRESETS.findIndex((m) => m.id === activePreset) + 1}/
                {MODEL_PRESETS.length}) · {currentMeta.name.toUpperCase()}
              </div>
              <div className="font-mono-tabular text-[11px] text-[#CBD5E1] mt-0.5">
                {currentMeta.polygons} · {currentMeta.vertices} · Left-Drag: Orbit · Scroll: Zoom
              </div>
            </div>

            <div className="flex items-center gap-1.5 pointer-events-auto">
              <button
                type="button"
                onClick={() => setAutoRotate(!autoRotate)}
                className="px-2.5 py-1.5 bg-black/75 hover:bg-black text-xs text-[#F4F4F0] border border-white/20 inline-flex items-center gap-1.5 cursor-pointer"
                title="Toggle Turntable Auto-Rotation"
              >
                {autoRotate ? (
                  <Pause className="w-3.5 h-3.5 text-[#FACC15]" />
                ) : (
                  <Play className="w-3.5 h-3.5" />
                )}
                <span>{autoRotate ? 'Turntable On' : 'Paused'}</span>
              </button>
              <button
                type="button"
                onClick={() => setShowGrid(!showGrid)}
                className="px-2.5 py-1.5 bg-black/75 hover:bg-black text-xs text-[#F4F4F0] border border-white/20 cursor-pointer"
              >
                {showGrid ? 'Hide Grid' : 'Show Grid'}
              </button>
              <button
                type="button"
                onClick={handleResetCamera}
                className="p-1.5 bg-black/75 hover:bg-black text-xs text-[#F4F4F0] border border-white/20 cursor-pointer"
                title="Reset Camera & Exploded View"
                aria-label="Reset 3D camera"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Bottom Interactive Exploded Assembly Slider HUD */}
          <div className="relative z-10 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-[240px] max-w-md bg-black/80 border border-white/15 px-3.5 py-2">
              <label
                htmlFor="explode-range"
                className="text-xs font-mono-tabular text-[#F4F4F0] whitespace-nowrap shrink-0"
              >
                Explode Assembly:{' '}
                <span className="text-[#FACC15] font-semibold">{explodedFactor}%</span>
              </label>
              <input
                id="explode-range"
                type="range"
                min={0}
                max={100}
                value={explodedFactor}
                onChange={(e) => setExplodedFactor(Number(e.target.value))}
                className="w-full accent-[#FACC15] cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setExplodedFactor(0)}
                className="px-2.5 py-1.5 text-xs font-mono-tabular bg-black/80 hover:bg-black text-[#E2E8F0] border border-white/15 cursor-pointer"
              >
                Assembled (0%)
              </button>
              <button
                type="button"
                onClick={() => setExplodedFactor(65)}
                className="px-2.5 py-1.5 text-xs font-mono-tabular bg-black/80 hover:bg-black text-[#FACC15] border border-white/15 cursor-pointer"
              >
                Exploded Cutaway (65%)
              </button>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Real-Time Geometry & Topology Telemetry */}
        <div className="lg:col-span-4 p-6 sm:p-8 border-t lg:border-t-0 lg:border-l border-black/15 dark:border-white/10 flex flex-col justify-between space-y-6 bg-white dark:bg-[#121418]">
          <div className="space-y-4">
            <div>
              <span className="text-xs font-semibold text-[#B45309] dark:text-[#FACC15] block">
                {currentMeta.category}
              </span>
              <h3 className="text-xl font-display font-bold text-[#090A0C] dark:text-[#F4F4F0] mt-1">
                {currentMeta.name}
              </h3>
              <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-2 leading-relaxed">
                {currentMeta.description}
              </p>
            </div>

            {/* Unboxed Clean Technical Spec Table */}
            <div className="pt-4 border-t border-black/10 dark:border-white/10 space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-black/10 dark:border-white/5">
                <span className="text-[#475569] dark:text-[#94A3B8]">Topology Budget</span>
                <span className="font-mono-tabular font-semibold text-[#090A0C] dark:text-[#F4F4F0]">
                  {currentMeta.polygons}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-black/10 dark:border-white/5">
                <span className="text-[#475569] dark:text-[#94A3B8]">Vertex Count</span>
                <span className="font-mono-tabular font-semibold text-[#090A0C] dark:text-[#F4F4F0]">
                  {currentMeta.vertices}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-black/10 dark:border-white/5">
                <span className="text-[#475569] dark:text-[#94A3B8]">UV Layout</span>
                <span className="font-mono-tabular text-[#090A0C] dark:text-[#F4F4F0] text-right">
                  {currentMeta.uvChannels}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-black/10 dark:border-white/5">
                <span className="text-[#475569] dark:text-[#94A3B8]">Delivery Formats</span>
                <span className="font-mono-tabular text-[#090A0C] dark:text-[#F4F4F0]">
                  {currentMeta.formats}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#475569] dark:text-[#94A3B8]">Active Pass</span>
                <span className="font-mono-tabular font-semibold text-[#B45309] dark:text-[#FACC15] uppercase">
                  {shadingMode} · Explode {explodedFactor}%
                </span>
              </div>
            </div>
          </div>

          {onSelectPresetForQuote && (
            <div className="pt-4 border-t border-black/10 dark:border-white/10">
              <button
                type="button"
                onClick={() => onSelectPresetForQuote(currentMeta.name, currentMeta.polygons)}
                className="w-full py-3 px-4 bg-[#090A0C] hover:bg-[#1E293B] text-[#FACC15] dark:bg-[#FACC15] dark:hover:bg-[#EAB308] dark:text-[#090A0C] font-semibold text-xs sm:text-sm transition-colors cursor-pointer whitespace-nowrap"
              >
                Commission Similar 3D Model
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
