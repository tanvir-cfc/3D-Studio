import React, { useState } from 'react';
import {
  Share2,
  Copy,
  Check,
  ExternalLink,
  Mail,
  X,
  Link as LinkIcon,
  Sparkles,
} from 'lucide-react';
import { PageId } from '../App';
import { getFullShareableUrl, getRouteHash } from '../utils/routes';
import { getServiceById } from '../data/servicesData';

interface SharePageModalProps {
  isOpen: boolean;
  onClose: () => void;
  activePage: PageId;
  selectedServiceId?: string;
}

export const SharePageModal: React.FC<SharePageModalProps> = ({
  isOpen,
  onClose,
  activePage,
  selectedServiceId,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const fullUrl = getFullShareableUrl(activePage, selectedServiceId);
  const routeHash = getRouteHash(activePage, selectedServiceId);

  let pageTitle = '3D Modeling Studio';
  let pageDescription = 'Review our production capabilities, 3D pipelines, and commercial deliverables.';

  if (activePage === 'service-detail' && selectedServiceId) {
    const service = getServiceById(selectedServiceId);
    if (service) {
      pageTitle = service.title;
      pageDescription = `Dedicated Single Service Scope: ${service.tagline} (Turnaround: ${service.leadTime})`;
    }
  } else if (activePage === 'services') {
    pageTitle = 'All 3D Services & Capabilities Directory';
    pageDescription = 'Complete catalog of CAD retopology, CGI rendering, animations, and WebGL services.';
  } else if (activePage === 'portfolio') {
    pageTitle = 'Commercial 3D Showcase & Render Gallery';
    pageDescription = 'High-resolution renders, topology breakdowns, and client production case studies.';
  } else if (activePage === 'models') {
    pageTitle = 'Interactive Real-Time 3D Studio Viewer';
    pageDescription = 'Interactive 3D viewport with wireframe, lighting, and orbit inspection controls.';
  } else if (activePage === 'estimator') {
    pageTitle = 'Instant 3D Production Quote Estimator';
    pageDescription = 'Interactive scope calculator with real-time budget brackets and milestone timelines.';
  } else if (activePage === 'contact') {
    pageTitle = 'Project Commission & Proposal Brief';
    pageDescription = 'Direct NDA-protected project submission form for custom 3D productions.';
  } else if (activePage === 'home') {
    pageTitle = '3D Modeling Company — Main Studio Presentation';
    pageDescription = 'Award-winning 3D modeling, photorealistic CGI, and real-time spatial assets.';
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const mailtoSubject = encodeURIComponent(`3D Scope Review: ${pageTitle}`);
  const mailtoBody = encodeURIComponent(
    `Hello,\n\nPlease review our dedicated 3D project scope and production specifications here:\n\n${fullUrl}\n\nKey Highlights:\n- ${pageDescription}\n- Includes commercial IP rights and source deliverables.\n\nBest regards,\n3D Modeling Company`
  );
  const mailtoLink = `mailto:?subject=${mailtoSubject}&body=${mailtoBody}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white text-[#0A0A0E] border border-[#E5E7EB] shadow-2xl max-w-lg w-full p-6 sm:p-7 relative space-y-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-modal-title"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-[#6B7280] hover:text-[#0A0A0E] hover:bg-[#F4F5F7] transition-colors cursor-pointer"
          aria-label="Close share dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1.5 pr-8">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#F4F5F7] border border-[#E5E7EB] text-[11px] font-mono-tabular font-bold text-[#0A0A0E]">
            <Share2 className="w-3.5 h-3.5 text-[#0A0A0E]" />
            <span>SHAREABLE CLIENT LINK</span>
          </div>
          <h2 id="share-modal-title" className="text-xl sm:text-2xl font-display font-extrabold text-[#0A0A0E]">
            Share This Page With Your Client
          </h2>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            Send this direct link to clients, stakeholders, or collaborators. It opens directly to this page with full specifications and interactive tools intact.
          </p>
        </div>

        {/* Preview Summary Box */}
        <div className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono-tabular text-[#6B7280]">
            <span>TARGET DESTINATION</span>
            <span className="font-bold text-[#0A0A0E] uppercase">{routeHash}</span>
          </div>
          <div className="text-sm font-bold text-[#0A0A0E] font-display">
            {pageTitle}
          </div>
          <div className="text-xs text-[#52525B] line-clamp-2">
            {pageDescription}
          </div>
        </div>

        {/* Link Input & Copy Button */}
        <div className="space-y-2">
          <label className="block text-xs font-mono-tabular font-bold text-[#0A0A0E]">
            DIRECT SHAREABLE URL
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 px-3 py-2.5 bg-[#F4F5F7] border border-[#E5E7EB] text-xs font-mono-tabular text-[#0A0A0E] overflow-x-auto whitespace-nowrap">
              <LinkIcon className="w-4 h-4 text-[#6B7280] shrink-0" />
              <span className="select-all">{fullUrl}</span>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className={`px-4 py-2.5 font-bold text-xs font-mono-tabular uppercase inline-flex items-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-xs ${
                copied
                  ? 'bg-[#10B981] text-white'
                  : 'bg-[#0A0A0E] hover:bg-[#27272A] text-white hover:shadow-md'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
          {copied && (
            <p className="text-[11px] font-mono-tabular text-emerald-600 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>Full URL copied to clipboard! Ready to paste into email or messages.</span>
            </p>
          )}
        </div>

        {/* Quick Action Buttons */}
        <div className="pt-2 border-t border-[#E5E7EB] flex flex-wrap items-center justify-between gap-3 text-xs">
          <a
            href={mailtoLink}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-[#F4F5F7] text-[#0A0A0E] border border-[#E5E7EB] font-semibold transition-colors cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-[#0A0A0E]" />
            <span>Email Link to Client</span>
          </a>

          <a
            href={fullUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-[#F4F5F7] text-[#0A0A0E] border border-[#E5E7EB] font-semibold transition-colors cursor-pointer"
          >
            <span>Open in New Tab</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#0A0A0E]" />
          </a>
        </div>
      </div>
    </div>
  );
};
