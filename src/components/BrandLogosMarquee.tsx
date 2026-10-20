import React from 'react';

interface BrandLogoItem {
  id: string;
  name: string;
  category: string;
  svg: React.ReactNode;
}

const BRAND_LOGOS: BrandLogoItem[] = [
  {
    id: 'sony',
    name: 'Sony',
    category: 'Interactive Gaming & VFX',
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 100 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="4" y="21" fill="currentColor" fontFamily="system-ui, -apple-system, sans-serif" fontSize="20" fontWeight="900" letterSpacing="1px">SONY</text>
      </svg>
    ),
  },
  {
    id: 'apple',
    name: 'Apple',
    category: 'Spatial Hardware & AR',
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 90 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 6C17.2 4.6 17.8 2.8 17.6 1C16 1.1 14.2 2 13.2 3.2C12.3 4.3 11.6 6 11.8 7.8C13.5 7.9 15.1 7 16 6ZM18.2 8.3C15.8 8.4 13.8 9.9 12.6 9.9C11.4 9.9 9.8 8.6 8 8.6C5.5 8.6 3 10.1 1.7 12.4C-0.9 17 1 23.7 3.5 27.4C4.8 29.2 6.2 31.2 8.2 31.1C10.1 31 10.8 29.8 13.1 29.8C15.4 29.8 16.1 31.1 18.1 31.1C20.1 31.1 21.4 29.3 22.6 27.5C24.1 25.4 24.7 23.3 24.8 23.1C24.6 23 20.7 21.5 20.7 16.9C20.7 13 23.8 11.1 24 11C22.1 8.2 19.2 8.4 18.2 8.3Z" transform="scale(0.7) translate(2, 2)" fill="currentColor"/>
        <text x="24" y="20" fill="currentColor" fontFamily="system-ui, -apple-system, sans-serif" fontSize="16" fontWeight="700">Apple</text>
      </svg>
    ),
  },
  {
    id: 'tesla',
    name: 'Tesla',
    category: 'Automotive CAD & Aero',
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 110 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 4L14 24M4 7C9 5 19 5 24 7M14 4L4 14M14 4L24 14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
        <text x="32" y="21" fill="currentColor" fontFamily="system-ui, -apple-system, sans-serif" fontSize="17" fontWeight="900" letterSpacing="2px">TESLA</text>
      </svg>
    ),
  },
  {
    id: 'epic',
    name: 'Epic Games',
    category: 'Unreal Engine 5 Real-Time',
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 135 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4L16 2L20 18L10 26L4 20L4 4Z" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M8 8H14M8 13H13M8 18H15" stroke="currentColor" strokeWidth="1.8"/>
        <text x="26" y="20" fill="currentColor" fontFamily="system-ui, -apple-system, sans-serif" fontSize="15" fontWeight="800" letterSpacing="0.5px">EPIC GAMES</text>
      </svg>
    ),
  },
  {
    id: 'nike',
    name: 'Nike',
    category: '3D Footwear & Digital Apparel',
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 95 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 16C9 19 16 19 25 7C22 17 12 24 3 16Z" fill="currentColor"/>
        <text x="32" y="20" fill="currentColor" fontFamily="system-ui, -apple-system, sans-serif" fontSize="18" fontWeight="900" fontStyle="italic">NIKE</text>
      </svg>
    ),
  },
  {
    id: 'logitech',
    name: 'Logitech',
    category: 'Ergonomic Hardware CAD',
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 115 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="14" r="7" stroke="currentColor" strokeWidth="2.2"/>
        <path d="M10 9V14H15" stroke="currentColor" strokeWidth="2"/>
        <text x="24" y="20" fill="currentColor" fontFamily="system-ui, -apple-system, sans-serif" fontSize="16" fontWeight="700">logitech</text>
      </svg>
    ),
  },
  {
    id: 'panther',
    name: 'Panther',
    category: 'Sci-Fi Vehicle CGI',
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 115 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6L14 2L24 6V14C24 19.5 19.7 24.5 14 26C8.3 24.5 4 19.5 4 14V6Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
        <path d="M14 8L18 14H10L14 8Z" fill="currentColor"/>
        <text x="30" y="20" fill="currentColor" fontFamily="system-ui, -apple-system, sans-serif" fontSize="16" fontWeight="800" letterSpacing="0.5px">PANTHER</text>
      </svg>
    ),
  },
  {
    id: 'boon',
    name: 'Boon',
    category: 'Autonomous Robotics 3D',
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 100 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4C7.58172 4 4 7.58172 4 12V24H12C16.4183 24 20 20.4183 20 16C20 13.5 18.8 11.3 17 9.8C18.2 8.4 19 6.6 19 4.5C19 4.2 18.9 4 18.8 3.8C17.2 3.9 15.6 4.3 14.2 5C13.5 4.4 12.8 4 12 4Z" fill="currentColor" fillOpacity="0.85"/>
        <text x="26" y="20" fill="currentColor" fontFamily="system-ui, -apple-system, sans-serif" fontSize="18" fontWeight="800" letterSpacing="-0.5px">boon</text>
      </svg>
    ),
  },
  {
    id: 'bose',
    name: 'Bose',
    category: 'Acoustic Product Visualization',
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 95 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="4" y="20" fill="currentColor" fontFamily="system-ui, -apple-system, sans-serif" fontSize="19" fontWeight="900" fontStyle="italic" letterSpacing="1px">BOSE</text>
      </svg>
    ),
  },
  {
    id: 'meta',
    name: 'Meta',
    category: 'Metaverse & Spatial Avatars',
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 100 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 14C6 8.5 10 5 15 5C19.5 5 22.5 8.5 25.5 12.5C28.5 8.5 31.5 5 36 5C41 5 45 8.5 45 14C45 19.5 41 23 36 23C31.5 23 28.5 19.5 25.5 15.5C22.5 19.5 19.5 23 15 23C10 23 6 19.5 6 14ZM15 8C11.5 8 9.5 10.5 9.5 14C9.5 17.5 11.5 20 15 20C18 20 20.5 17.5 23 14C20.5 10.5 18 8 15 8ZM36 8C33 8 30.5 10.5 28 14C30.5 17.5 33 20 36 20C39.5 20 41.5 17.5 41.5 14C41.5 10.5 39.5 8 36 8Z" fill="currentColor"/>
        <text x="52" y="20" fill="currentColor" fontFamily="system-ui, -apple-system, sans-serif" fontSize="17" fontWeight="700">Meta</text>
      </svg>
    ),
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    category: 'HoloLens & Xbox 3D Games',
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 135 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="4" width="9" height="9" fill="currentColor" fillOpacity="0.9"/>
        <rect x="13" y="4" width="9" height="9" fill="currentColor" fillOpacity="0.7"/>
        <rect x="2" y="15" width="9" height="9" fill="currentColor" fillOpacity="0.7"/>
        <rect x="13" y="15" width="9" height="9" fill="currentColor" fillOpacity="0.9"/>
        <text x="28" y="20" fill="currentColor" fontFamily="system-ui, -apple-system, sans-serif" fontSize="16" fontWeight="600" letterSpacing="-0.3px">Microsoft</text>
      </svg>
    ),
  },
  {
    id: 'threejs',
    name: 'Three.js',
    category: 'Real-Time WebGL 60FPS',
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 115 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6L14 2L24 6L24 18L14 24L4 18Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M4 6L14 12L24 6M14 12V24" stroke="currentColor" strokeWidth="1.8"/>
        <text x="30" y="20" fill="currentColor" fontFamily="system-ui, -apple-system, sans-serif" fontSize="16" fontWeight="800">three.js</text>
      </svg>
    ),
  },
];

export const BrandLogosMarquee: React.FC = () => {
  return (
    <div className="w-full overflow-hidden relative select-none py-4">
      {/* Subtle left & right gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-[#F9FAFB] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-[#F9FAFB] to-transparent z-10 pointer-events-none" />

      {/* Marquee Track 1 (Infinite Seamless Loop) */}
      <div className="flex w-max items-center gap-12 sm:gap-16 hover:[animation-play-state:paused] animate-[marquee_40s_linear_infinite]">
        {/* Render twice for continuous loop */}
        {[...BRAND_LOGOS, ...BRAND_LOGOS].map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="flex items-center gap-2.5 px-4 py-3 bg-white border border-[#E5E7EB] shadow-2xs hover:border-[#0A0A0E] text-[#111827] hover:text-[#000000] transition-all cursor-default shrink-0 group"
          >
            <div className="opacity-80 group-hover:opacity-100 transition-opacity">
              {item.svg}
            </div>
            <span className="hidden sm:inline-block text-[10px] font-mono-tabular px-1.5 py-0.5 bg-[#F3F4F6] text-[#6B7280] group-hover:text-[#0A0A0E]">
              {item.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
