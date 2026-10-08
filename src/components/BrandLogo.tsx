import React, { useState } from 'react';
import logoUrl from '../assets/images/logo.webp';

interface BrandLogoProps {
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = 'h-10' }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <span className={`inline-flex items-center select-none shrink-0 ${className}`}>
      {!imgError ? (
        <img
          src={logoUrl}
          alt="3D Modeling Company"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="h-full w-auto object-contain"
        />
      ) : (
        <span className="text-lg font-display font-bold tracking-tight text-[#090A0C] dark:text-[#F4F4F0]">
          3D Modeling Company
        </span>
      )}
    </span>
  );
};
