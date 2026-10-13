import React from 'react';

interface BrandLogoItem {
  id: string;
  name: string;
  category: string;
  svg: React.ReactNode;
}

const BRAND_LOGOS: BrandLogoItem[] = [
  {
    id: 'boon',
    name: 'Boon',
    category: 'Talent SaaS',
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 100 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4C7.58172 4 4 7.58172 4 12V24H12C16.4183 24 20 20.4183 20 16C20 13.5 18.8 11.3 17 9.8C18.2 8.4 19 6.6 19 4.5C19 4.2 18.9 4 18.8 3.8C17.2 3.9 15.6 4.3 14.2 5C13.5 4.4 12.8 4 12 4Z" fill="currentColor" fillOpacity="0.85"/>
        <text x="26" y="20" fill="currentColor" fontFamily="system-ui, -apple-system, sans-serif" fontSize="18" fontWeight="800" letterSpacing="-0.5px">boon</text>
      </svg>
    ),
  },
  {
    id: 'panther',
    name: 'Panther',
    category: 'Cloud SIEM',
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 120 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6L14 2L24 6V14C24 19.5 19.7 24.5 14 26C8.3 24.5 4 19.5 4 14V6Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
        <path d="M14 8L18 14H10L14 8Z" fill="currentColor"/>
        <text x="32" y="20" fill="currentColor" fontFamily="system-ui, -apple-system, sans-serif" fontSize="16" fontWeight="800" letterSpacing="0.5px">PANTHER</text>
      </svg>
    ),
  },
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'Fintech Infrastructure',
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 90 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="2" y="21" fill="currentColor" fontFamily="system-ui, -apple-system, sans-serif" fontSize="22" fontWeight="900" letterSpacing="-0.8px">stripe</text>
      </svg>
    ),
  },
  {
    id: 'meta',
    name: 'Meta',
    category: 'Social Tech',
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
    category: 'Cloud Enterprise',
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
    id: 'linear',
    name: 'Linear',
    category: 'Productivity',
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 100 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 14C4 8.47715 8.47715 4 14 4H18L4 18V14Z" fill="currentColor"/>
        <path d="M4 22L22 4H26C26 4 26 4 26 4L4 26V22Z" fill="currentColor" fillOpacity="0.6"/>
        <text x="32" y="20" fill="currentColor" fontFamily="system-ui, -apple-system, sans-serif" fontSize="17" fontWeight="700" letterSpacing="-0.3px">Linear</text>
      </svg>
    ),
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'Frontend Cloud',
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 105 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 5L24 22H4L14 5Z" fill="currentColor"/>
        <text x="32" y="20" fill="currentColor" fontFamily="system-ui, -apple-system, sans-serif" fontSize="17" fontWeight="800" letterSpacing="-0.5px">▲ Vercel</text>
      </svg>
    ),
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'Design Systems',
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 95 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 4H13V10H7C5.34315 10 4 8.65685 4 7C4 5.34315 5.34315 4 7 4Z" fill="currentColor"/>
        <path d="M13 4H19C20.6569 4 22 5.34315 22 7C22 8.65685 20.6569 10 19 10H13V4Z" fill="currentColor" fillOpacity="0.8"/>
        <path d="M7 10H13V16H7C5.34315 16 4 14.6569 4 13C4 11.3431 5.34315 10 7 10Z" fill="currentColor" fillOpacity="0.6"/>
        <path d="M13 10H19C20.6569 10 22 11.3431 22 13C22 14.6569 20.6569 16 19 16H13V10Z" fill="currentColor" fillOpacity="0.8"/>
        <path d="M13 16V22C13 23.6569 11.6569 25 10 25C8.34315 25 7 23.6569 7 22C7 20.3431 8.34315 19 10 19H13V16Z" fill="currentColor" fillOpacity="0.9"/>
        <text x="30" y="20" fill="currentColor" fontFamily="system-ui, -apple-system, sans-serif" fontSize="18" fontWeight="700">Figma</text>
      </svg>
    ),
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'Backend Platform',
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 130 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 3L4 15H14L11 25L22 12H12L13 3Z" fill="currentColor"/>
        <text x="28" y="20" fill="currentColor" fontFamily="system-ui, -apple-system, sans-serif" fontSize="16" fontWeight="800" letterSpacing="-0.3px">supabase</text>
      </svg>
    ),
  },
  {
    id: 'notion',
    name: 'Notion',
    category: 'Connected Workspace',
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 100 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="2.2"/>
        <path d="M10 8V20L18 8V20" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="30" y="20" fill="currentColor" fontFamily="system-ui, -apple-system, sans-serif" fontSize="17" fontWeight="700">Notion</text>
      </svg>
    ),
  },
  {
    id: 'cisco',
    name: 'Cisco',
    category: 'Networking Tech',
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 110 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="14" width="2.5" height="10" fill="currentColor"/>
        <rect x="9" y="10" width="2.5" height="14" fill="currentColor"/>
        <rect x="14" y="6" width="2.5" height="18" fill="currentColor"/>
        <rect x="19" y="10" width="2.5" height="14" fill="currentColor"/>
        <rect x="24" y="14" width="2.5" height="10" fill="currentColor"/>
        <text x="34" y="21" fill="currentColor" fontFamily="system-ui, -apple-system, sans-serif" fontSize="17" fontWeight="900" letterSpacing="1px">CISCO</text>
      </svg>
    ),
  },
  {
    id: 'telenor',
    name: 'Telenor',
    category: 'Telecommunications',
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 120 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="14" r="8" stroke="currentColor" strokeWidth="2.5"/>
        <circle cx="16" cy="10" r="3" fill="currentColor"/>
        <text x="28" y="20" fill="currentColor" fontFamily="system-ui, -apple-system, sans-serif" fontSize="16" fontWeight="700" letterSpacing="0.5px">telenor</text>
      </svg>
    ),
  },
  {
    id: 'tamara',
    name: 'Tamara',
    category: 'MENA Fintech',
    svg: (
      <svg className="h-6 w-auto" viewBox="0 0 110 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="14" r="7" fill="currentColor"/>
        <circle cx="12" cy="14" r="3.5" fill="white"/>
        <text x="26" y="20" fill="currentColor" fontFamily="system-ui, -apple-system, sans-serif" fontSize="17" fontWeight="800" letterSpacing="-0.3px">tamara</text>
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
