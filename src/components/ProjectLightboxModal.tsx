import React, { useEffect } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import { PortfolioItem } from '../data/studioData';

interface ProjectLightboxModalProps {
  project: PortfolioItem | null;
  onClose: () => void;
  onRequestSimilarProject: (project: PortfolioItem) => void;
}

export const ProjectLightboxModal: React.FC<ProjectLightboxModalProps> = ({
  project,
  onClose,
  onRequestSimilarProject,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-project-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl rounded-none bg-white dark:bg-[#121418] border border-black/20 dark:border-white/15 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/10 dark:border-white/10 bg-[#F6F6F2] dark:bg-[#090A0C]">
          <div className="flex items-center gap-2 text-xs text-[#475569] dark:text-[#94A3B8]">
            <span className="text-[#090A0C] dark:text-[#F4F4F0] font-semibold">
              {project.client}
            </span>
            <span aria-hidden="true">·</span>
            <span>{project.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-tabular">{project.year}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#475569] dark:text-[#94A3B8] hover:text-[#090A0C] dark:hover:text-[#F4F4F0] bg-white dark:bg-[#181B22] hover:bg-black/5 dark:hover:bg-white/10 border border-black/15 dark:border-white/10 rounded-none transition-colors cursor-pointer"
            aria-label="Close case study viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* High-Resolution Visual Container */}
          <div className="lg:col-span-7 bg-[#090A0C] flex items-center justify-center relative min-h-[320px] lg:min-h-[520px]">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 bg-[#090A0C]/90 backdrop-blur-sm px-4 py-2.5 rounded-none border border-white/15 text-xs text-[#E2E8F0] font-mono-tabular">
              <span>{project.renderEngine}</span>
              <span>·</span>
              <span>{project.polyCount}</span>
              <span>·</span>
              <span>{project.resolution}</span>
            </div>
          </div>

          {/* Case Study Technical Breakdown */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white dark:bg-[#121418]">
            <div className="space-y-5">
              <div>
                <h3
                  id="lightbox-project-title"
                  className="text-2xl font-display font-bold text-[#090A0C] dark:text-[#F4F4F0]"
                >
                  {project.title}
                </h3>
                <p className="text-sm text-[#475569] dark:text-[#94A3B8] mt-2 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Verified Outcome Highlight */}
              <div className="p-4 rounded-none bg-[#F6F6F2] dark:bg-[#090A0C] border border-black/15 dark:border-white/10">
                <div className="text-xs text-[#475569] dark:text-[#94A3B8] mb-1">
                  Measured Commercial Outcome
                </div>
                <div className="text-sm font-semibold text-[#B45309] dark:text-[#F59E0B]">
                  {project.impactMetric}
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="text-xs font-semibold text-[#090A0C] dark:text-[#F4F4F0] mb-1">
                    Engineering & Visualization Challenge
                  </h4>
                  <p className="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                    {project.challenge}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#090A0C] dark:text-[#F4F4F0] mb-1">
                    Studio Pipeline Solution
                  </h4>
                  <p className="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Unboxed Technical Metadata */}
              <div className="pt-3 border-t border-black/10 dark:border-white/10 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#475569] dark:text-[#94A3B8] block">
                    Delivery Turnaround
                  </span>
                  <span className="font-mono-tabular text-[#090A0C] dark:text-[#F4F4F0] font-semibold">
                    {project.turnaround}
                  </span>
                </div>
                <div>
                  <span className="text-[#475569] dark:text-[#94A3B8] block">
                    Master Resolution
                  </span>
                  <span className="font-mono-tabular text-[#090A0C] dark:text-[#F4F4F0] font-semibold">
                    {project.resolution}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center gap-3">
              <button
                type="button"
                onClick={() => onRequestSimilarProject(project)}
                className="w-full py-3 px-4 bg-[#090A0C] hover:bg-[#1E293B] text-[#F6F6F2] dark:bg-[#F59E0B] dark:hover:bg-[#D97706] dark:text-[#090A0C] font-semibold text-xs sm:text-sm rounded-none transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>Commission Similar 3D Production</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
