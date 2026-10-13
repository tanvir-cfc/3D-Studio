import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface WeAre3DEffectProps {
  className?: string;
}

/**
 * Interactive 3D Spatial Canvas for Musemind "We Are..." Section
 * Renders smooth procedural floating geometric crystal nodes and connected data particles
 * with cursor parallax and continuous orbital rotation.
 */
export const WeAre3DEffect: React.FC<WeAre3DEffectProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xd4ff00, 2.5);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x0a0a0e, 1.5);
    dirLight2.position.set(-5, -6, -4);
    scene.add(dirLight2);

    // Group for objects
    const group = new THREE.Group();
    scene.add(group);

    // Core Icosahedron with Wireframe + Translucent Glass Feel
    const icoGeo = new THREE.IcosahedronGeometry(2, 1);
    const icoMat = new THREE.MeshPhysicalMaterial({
      color: 0x111116,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.85,
      thickness: 1.5,
      transparent: true,
      opacity: 0.85,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(icoGeo, icoMat);
    group.add(coreMesh);

    // Wireframe overlay in Volt Lime
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xd4ff00,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireMesh = new THREE.Mesh(icoGeo, wireMat);
    wireMesh.scale.set(1.005, 1.005, 1.005);
    group.add(wireMesh);

    // Surrounding floating orbital nodes (Toruses & Spheres)
    const nodeCount = 14;
    const nodes: THREE.Mesh[] = [];
    const nodeGeos = [
      new THREE.SphereGeometry(0.14, 16, 16),
      new THREE.TorusGeometry(0.25, 0.06, 12, 24),
      new THREE.BoxGeometry(0.24, 0.24, 0.24),
    ];

    for (let i = 0; i < nodeCount; i++) {
      const g = nodeGeos[i % nodeGeos.length];
      const mat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0xd4ff00 : 0x0a0a0e,
        roughness: 0.2,
        metalness: 0.8,
      });
      const mesh = new THREE.Mesh(g, mat);
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 3.2 + (i % 3) * 0.4;
      mesh.position.set(
        Math.cos(angle) * radius,
        (Math.sin(angle * 2) * 1.2),
        Math.sin(angle) * radius
      );
      nodes.push(mesh);
      group.add(mesh);
    }

    // Interactive mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 2;
      mouseY = y * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let reqId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth rotation
      coreMesh.rotation.y = elapsedTime * 0.25;
      coreMesh.rotation.x = elapsedTime * 0.15;
      wireMesh.rotation.y = coreMesh.rotation.y;
      wireMesh.rotation.x = coreMesh.rotation.x;

      nodes.forEach((node, idx) => {
        node.rotation.x += 0.02;
        node.rotation.y += 0.015;
        node.position.y += Math.sin(elapsedTime * 2 + idx) * 0.005;
      });

      // Target camera tilt based on mouse
      group.rotation.y += (mouseX * 0.6 - group.rotation.y) * 0.05;
      group.rotation.x += (-mouseY * 0.4 - group.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-[400px] sm:h-[480px] flex items-center justify-center overflow-hidden ${className}`}
      aria-label="Interactive 3D Geometric Spatial Model"
    />
  );
};
