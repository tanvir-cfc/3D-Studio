import React, { useEffect, useRef, useState } from 'react';

interface Scroll3DSectionProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

/**
 * Wraps page sections in a 3D perspective stage that dynamically tilts (rotateX)
 * and translates along the Z-axis (translateZ) based on live viewport scroll position.
 */
export const Scroll3DSection: React.FC<Scroll3DSectionProps> = ({
  children,
  className = '',
  intensity = 1,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<string>(
    'perspective(1400px) rotateX(0deg) translateZ(0px) scale(1)'
  );

  useEffect(() => {
    let rafId = 0;

    const update3DScroll = () => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height * 0.5;
      const viewportCenter = viewHeight * 0.5;

      // Normalized distance from viewport center (-1 at top, 0 at center, +1 at bottom)
      const normDist = (elementCenter - viewportCenter) / (viewHeight * 0.85);
      const clamped = Math.max(-1, Math.min(1, normDist));

      // Subtle architectural 3D pitch & Z-depth when entering/leaving viewport
      const absDist = Math.abs(clamped);
      const deadZone = absDist < 0.22 ? 0 : (absDist - 0.22) / 0.78;
      const sign = clamped > 0 ? 1 : -1;

      const rotateX = sign * deadZone * 6.5 * intensity;
      const translateZ = -deadZone * 42 * intensity;
      const scale = 1 - deadZone * 0.022 * intensity;

      setTransformStyle(
        `perspective(1400px) rotateX(${rotateX.toFixed(2)}deg) translateZ(${translateZ.toFixed(
          1
        )}px) scale(${scale.toFixed(3)})`
      );
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update3DScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update3DScroll();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [intensity]);

  return (
    <div
      ref={ref}
      style={{
        transform: transformStyle,
        transformOrigin: 'center center',
        willChange: 'transform',
      }}
      className={`transition-transform duration-150 ease-out ${className}`}
    >
      {children}
    </div>
  );
};

interface Tilt3DCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  onClick?: () => void;
}

/**
 * Interactive 3D spatial tilt card with strict zero border-radius.
 * Responds to cursor coordinates with 3D rotateX / rotateY / translateZ depth.
 */
export const Tilt3DCard: React.FC<Tilt3DCardProps> = ({
  children,
  className = '',
  maxTilt = 5,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltTransform, setTiltTransform] = useState<string>(
    'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

    const rotY = x * maxTilt * 2;
    const rotX = -y * maxTilt * 2;

    setTiltTransform(
      `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(
        2
      )}deg) translateZ(8px)`
    );
  };

  const handleMouseLeave = () => {
    setTiltTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)');
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: tiltTransform,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      className={`transition-transform duration-150 ease-out rounded-none ${className}`}
    >
      {children}
    </div>
  );
};
