import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Scroll3DBackgroundProps {
  theme: 'light' | 'dark';
  activePage: string;
}

/**
 * Full-viewport Three.js 3D Spatial Background that reacts to window scroll position,
 * scroll velocity, and cursor parallax—giving the entire website a real-time 3D spatial depth feel.
 */
export const Scroll3DBackground: React.FC<Scroll3DBackgroundProps> = ({ theme, activePage }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      120
    );
    camera.position.set(0, 2.5, 18);

    const isDark = theme === 'dark';
    const primaryLineColor = isDark ? 0xfacc15 : 0x090a0c;
    const secondaryLineColor = isDark ? 0x38bdf8 : 0x64748b;
    const gridColorMain = isDark ? 0x222631 : 0xd8d8d0;
    const gridColorSub = isDark ? 0x151821 : 0xe5e5de;

    // Root 3D world group that moves & rotates with scroll
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // 1. Architectural Perspective Floor & Ceiling Reference Grids
    const floorGrid = new THREE.GridHelper(90, 45, gridColorMain, gridColorSub);
    floorGrid.position.y = -6.5;
    (floorGrid.material as THREE.Material).transparent = true;
    (floorGrid.material as THREE.Material).opacity = isDark ? 0.42 : 0.48;
    worldGroup.add(floorGrid);

    const ceilingGrid = new THREE.GridHelper(90, 30, gridColorSub, gridColorSub);
    ceilingGrid.position.y = 11.5;
    (ceilingGrid.material as THREE.Material).transparent = true;
    (ceilingGrid.material as THREE.Material).opacity = isDark ? 0.16 : 0.22;
    worldGroup.add(ceilingGrid);

    // 2. Floating 3D Architectural & CAD Wireframe Monuments along the Z-scroll corridor
    const wireMatPrimary = new THREE.MeshBasicMaterial({
      color: primaryLineColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.14 : 0.09,
    });

    const wireMatSecondary = new THREE.MeshBasicMaterial({
      color: secondaryLineColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.12 : 0.08,
    });

    const solidAccentMat = new THREE.MeshBasicMaterial({
      color: 0xfacc15,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.25 : 0.2,
    });

    const floatingMeshes: {
      mesh: THREE.Object3D;
      rotSpeedX: number;
      rotSpeedY: number;
      baseY: number;
      floatPhase: number;
    }[] = [];

    // Monument A: Geodesic Icosahedron Cage (Right foreground)
    const icoGeo = new THREE.IcosahedronGeometry(3.2, 1);
    const icoMesh = new THREE.Mesh(icoGeo, wireMatPrimary);
    icoMesh.position.set(11, 1.5, 4);
    worldGroup.add(icoMesh);
    floatingMeshes.push({
      mesh: icoMesh,
      rotSpeedX: 0.002,
      rotSpeedY: 0.0035,
      baseY: 1.5,
      floatPhase: 0,
    });

    // Monument B: Parametric Torus Knot (Left mid-ground)
    const knotGeo = new THREE.TorusKnotGeometry(2.6, 0.55, 64, 10, 2, 3);
    const knotMesh = new THREE.Mesh(knotGeo, wireMatSecondary);
    knotMesh.position.set(-12, 2.2, -10);
    worldGroup.add(knotMesh);
    floatingMeshes.push({
      mesh: knotMesh,
      rotSpeedX: -0.0025,
      rotSpeedY: 0.002,
      baseY: 2.2,
      floatPhase: 1.4,
    });

    // Monument C: Nested Architectural Cube Frame (Right deep corridor)
    const cubeGroup = new THREE.Group();
    const outerCube = new THREE.Mesh(new THREE.BoxGeometry(4.8, 4.8, 4.8, 2, 2, 2), wireMatPrimary);
    const innerCube = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.6, 2.6, 1, 1, 1), solidAccentMat);
    innerCube.rotation.set(Math.PI / 4, Math.PI / 4, 0);
    cubeGroup.add(outerCube, innerCube);
    cubeGroup.position.set(12.5, 0.5, -24);
    worldGroup.add(cubeGroup);
    floatingMeshes.push({
      mesh: cubeGroup,
      rotSpeedX: 0.0018,
      rotSpeedY: -0.003,
      baseY: 0.5,
      floatPhase: 2.8,
    });

    // Monument D: Axial Turbine Ring Array (Left deep corridor)
    const ringGroup = new THREE.Group();
    for (let i = 0; i < 3; i++) {
      const torus = new THREE.Mesh(
        new THREE.TorusGeometry(2.2 + i * 0.9, 0.08, 8, 36),
        i === 1 ? solidAccentMat : wireMatSecondary
      );
      torus.rotation.x = (i * Math.PI) / 3;
      ringGroup.add(torus);
    }
    ringGroup.position.set(-11, 1.0, -38);
    worldGroup.add(ringGroup);
    floatingMeshes.push({
      mesh: ringGroup,
      rotSpeedX: 0.003,
      rotSpeedY: 0.0025,
      baseY: 1.0,
      floatPhase: 4.1,
    });

    // Monument E: Octahedral Structural Spire (Center-Right far)
    const octaMesh = new THREE.Mesh(new THREE.OctahedronGeometry(3.8, 1), wireMatPrimary);
    octaMesh.position.set(9.5, 2.0, -52);
    worldGroup.add(octaMesh);
    floatingMeshes.push({
      mesh: octaMesh,
      rotSpeedX: -0.002,
      rotSpeedY: 0.004,
      baseY: 2.0,
      floatPhase: 5.2,
    });

    // 3. Spatial Coordinate Crosshair Nodes (Vertex Points in 3D Space)
    const nodeCount = 120;
    const positions = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 44;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = 12 - Math.random() * 80;
    }
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pointsMat = new THREE.PointsMaterial({
      color: primaryLineColor,
      size: 0.14,
      transparent: true,
      opacity: isDark ? 0.35 : 0.25,
    });
    const pointsCloud = new THREE.Points(pointsGeo, pointsMat);
    worldGroup.add(pointsCloud);

    // Scroll & Mouse Tracking State
    let targetScrollRatio = 0;
    let currentScrollRatio = 0;
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const updateScrollTarget = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const rawScroll = window.scrollY;
      const delta = rawScroll - lastScrollY;
      lastScrollY = rawScroll;
      scrollVelocity = Math.max(-40, Math.min(40, delta));
      targetScrollRatio = Math.max(0, Math.min(1, rawScroll / maxScroll));
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      updateScrollTarget();
    };

    window.addEventListener('scroll', updateScrollTarget, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);
    updateScrollTarget();

    let frameId = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // Smooth damping toward scroll target
      currentScrollRatio += (targetScrollRatio - currentScrollRatio) * 0.07;
      scrollVelocity *= 0.92;
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Drive 3D Camera along the Z-corridor with subtle bank & pitch from scroll velocity
      const targetZ = 18 - currentScrollRatio * 56;
      camera.position.z = targetZ;
      camera.position.x = currentMouseX * 1.6 + Math.sin(currentScrollRatio * Math.PI * 2) * 1.4;
      camera.position.y = 2.2 - currentMouseY * 0.9 + Math.cos(currentScrollRatio * Math.PI) * 0.8;

      // Dynamic 3D pitch & roll from scroll velocity
      const pitchAngle = scrollVelocity * 0.0045;
      const rollAngle = -currentMouseX * 0.03 + Math.sin(currentScrollRatio * Math.PI * 3) * 0.025;
      camera.rotation.x = pitchAngle;
      camera.rotation.z = rollAngle;
      camera.rotation.y = -currentMouseX * 0.04;

      // Rotate floating 3D CAD wireframes with extra boost during scroll
      const velocityBoost = 1 + Math.abs(scrollVelocity) * 0.18;
      const time = performance.now() * 0.001;

      floatingMeshes.forEach((item) => {
        item.mesh.rotation.x += item.rotSpeedX * velocityBoost + scrollVelocity * 0.0012;
        item.mesh.rotation.y += item.rotSpeedY * velocityBoost + scrollVelocity * 0.0018;
        item.mesh.position.y = item.baseY + Math.sin(time + item.floatPhase) * 0.45;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', updateScrollTarget);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [theme, activePage]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
