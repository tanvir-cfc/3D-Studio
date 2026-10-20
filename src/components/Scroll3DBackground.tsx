import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Scroll3DBackgroundProps {
  theme: 'light' | 'dark';
  activePage: string;
}

/**
 * Modern, ultra-clean ambient background animation.
 * Replaces intrusive wireframe grids and heavy rotating geometric shapes
 * with an elegant, fluid particle field and soft ambient floating light orbs
 * that gently react to mouse movement and scroll velocity.
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

    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 25;

    const isLightHome = activePage === 'home' || theme === 'light';

    // 1. Soft Circular Particle Texture
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.6)');
      gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.15)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const circleTexture = createCircleTexture();

    // 2. Multi-Layer Subtle Spatial Particle Waves
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const scaleArray = new Float32Array(particleCount);
    const speedArray = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      posArray[i * 3] = (Math.random() - 0.5) * 60;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 45;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 30;

      scaleArray[i] = 0.6 + Math.random() * 1.4;
      speedArray[i] = 0.2 + Math.random() * 0.8;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Particle color: subtle slate/lime in light mode, golden/cyan in dark mode
    const particleColor = isLightHome ? 0x0a0a0e : 0xfacc15;
    const particleOpacity = isLightHome ? 0.12 : 0.22;

    const particleMat = new THREE.PointsMaterial({
      size: isLightHome ? 0.7 : 0.9,
      color: particleColor,
      transparent: true,
      opacity: particleOpacity,
      map: circleTexture || undefined,
      blending: isLightHome ? THREE.NormalBlending : THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 3. Floating Soft Ambient Glowing Light Orbs (Very subtle organic depth)
    const orbGroup = new THREE.Group();
    scene.add(orbGroup);

    const orbCount = 3;
    const orbs: { mesh: THREE.Mesh; basePos: THREE.Vector3; speed: number; phase: number }[] = [];

    const orbColors = isLightHome
      ? [0xd4ff00, 0x10b981, 0x60a5fa]
      : [0xfacc15, 0x38bdf8, 0xa855f7];

    for (let i = 0; i < orbCount; i++) {
      const orbGeo = new THREE.SphereGeometry(4 + i * 2, 24, 24);
      const orbMat = new THREE.MeshBasicMaterial({
        color: orbColors[i % orbColors.length],
        transparent: true,
        opacity: isLightHome ? 0.035 : 0.05,
        wireframe: false,
      });

      const orbMesh = new THREE.Mesh(orbGeo, orbMat);
      const basePos = new THREE.Vector3(
        (i - 1) * 16 + (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 12,
        -10 - i * 5
      );
      orbMesh.position.copy(basePos);
      orbGroup.add(orbMesh);

      orbs.push({
        mesh: orbMesh,
        basePos,
        speed: 0.3 + i * 0.15,
        phase: i * 2,
      });
    }

    // Mouse parallax tracking with smooth easing
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    // Scroll reactive depth
    let scrollY = window.scrollY;
    let targetScrollY = window.scrollY;

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      const newW = window.innerWidth;
      const newH = window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop with delta time
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth interpolation for mouse & scroll
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      scrollY += (targetScrollY - scrollY) * 0.08;

      // Subtle camera parallax without violent jumping
      camera.position.x = mouseX * 2.5;
      camera.position.y = mouseY * 2.0 - scrollY * 0.005;
      camera.lookAt(0, 0, 0);

      // Rotate particle cloud very gently
      particles.rotation.y = time * 0.02 + mouseX * 0.1;
      particles.rotation.x = Math.sin(time * 0.015) * 0.05;

      // Gently breathe particle positions
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(time * speedArray[i] + i) * 0.02;
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Gently float ambient light orbs
      orbs.forEach((orb) => {
        orb.mesh.position.x = orb.basePos.x + Math.sin(time * orb.speed + orb.phase) * 3;
        orb.mesh.position.y = orb.basePos.y + Math.cos(time * orb.speed * 0.8 + orb.phase) * 2;
        orb.mesh.position.z = orb.basePos.z + Math.sin(time * 0.2 + orb.phase) * 2;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      if (circleTexture) circleTexture.dispose();
    };
  }, [theme, activePage]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-90 transition-opacity duration-300"
    />
  );
};
