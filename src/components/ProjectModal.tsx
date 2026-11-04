import React, { useEffect, useState } from 'react';
import { ProjectDetail } from '../types';
import { ExternalLink, X, Share2, Check, Copy } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, WhatsAppIcon } from './Icons';
import { ProjectStatsSection } from './ProjectStatsSection';

interface ProjectModalProps {
  project: ProjectDetail | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setCopied(false);
      setShowShareOptions(false);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const shareUrl = project.github || project.demo || window.location.href;
  const shareTitle = `${project.title} | Sathwik Ganji Portfolio`;
  const shareText = `Check out "${project.title}" by Sathwik Ganji (Cloud & DevOps Engineer): ${shareUrl}`;

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = shareUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 3200);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
  const whatsAppShareUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md modal-backdrop-anim"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 md:p-8 rounded-2xl border shadow-2xl modal-box-anim"
        style={{
          backgroundColor: '#111820',
          borderColor: 'rgba(255, 153, 0, 0.35)',
          color: '#f3f4f6'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Success Notification Toast */}
        {copied && (
          <div
            className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-emerald-500/95 text-white font-bold text-xs md:text-sm shadow-xl flex items-center gap-2 border border-emerald-300 animate-fadeIn"
            role="status"
          >
            <Check className="w-4 h-4 text-white" />
            <span>Project link copied to clipboard! Ready to share.</span>
          </div>
        )}

        {/* Top Controls: Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-xl border border-white/20 text-gray-300 hover:text-white hover:border-white transition-colors cursor-pointer bg-white/5"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--aws-orange)' }}>
          {project.kicker || 'ENGINEERING PROJECT'}
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4 pr-12">
          {project.title}
        </h2>

        <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
          {project.description}
        </p>

        {project.stats && (
          <div className="mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 block mb-2">
              GitHub Summary Statistics
            </span>
            <ProjectStatsSection stats={project.stats} />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl border border-white/10 bg-white/5">
            <strong className="block text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--aws-orange-light)' }}>
              Technologies
            </strong>
            <span className="text-sm text-gray-200">{project.tech}</span>
          </div>

          <div className="p-4 rounded-xl border border-white/10 bg-white/5">
            <strong className="block text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--aws-orange-light)' }}>
              Engineering Focus
            </strong>
            <span className="text-sm text-gray-200">{project.focus}</span>
          </div>
        </div>

        {project.architecture && (
          <div className="mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-2">
              Architecture / Workflow Pipeline
            </span>
            <pre
              className="p-4 rounded-xl border font-mono text-xs md:text-sm leading-relaxed overflow-x-auto whitespace-pre text-sky-300"
              style={{
                backgroundColor: 'rgba(83, 159, 229, 0.05)',
                borderColor: 'rgba(83, 159, 229, 0.25)'
              }}
            >
              {project.architecture}
            </pre>
          </div>
        )}

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-gray-950 transition-all hover:brightness-110 shadow"
              style={{ backgroundColor: 'var(--aws-orange)' }}
            >
              <GithubIcon className="w-4 h-4" />
              View GitHub →
            </a>
          )}

          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white border border-white/20 hover:border-white transition-all bg-white/5"
            >
              <ExternalLink className="w-4 h-4" />
              Open Live Demo ↗
            </a>
          )}

          {/* Social Media Share Button */}
          <button
            onClick={handleCopyLink}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider border transition-all cursor-pointer ${
              copied
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.3)]'
                : 'border-white/20 hover:border-amber-400 text-gray-200 hover:text-white bg-white/5'
            }`}
            title="Copy project link to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-amber-400" />
                <span>Share Project</span>
              </>
            )}
          </button>

          {/* Toggle Direct Social Media Share Links */}
          <button
            type="button"
            onClick={() => setShowShareOptions(!showShareOptions)}
            className="p-2.5 rounded-xl border border-white/15 text-gray-400 hover:text-white hover:border-white/40 transition-colors bg-white/5 text-xs font-semibold flex items-center gap-1 cursor-pointer"
            title="More social sharing options"
          >
            <span>Social</span>
            <span className="text-[10px]">{showShareOptions ? '▲' : '▼'}</span>
          </button>
        </div>

        {/* Expandable Social Sharing Strip */}
        {showShareOptions && (
          <div className="mt-4 p-3.5 rounded-xl border border-white/10 bg-white/5 flex flex-wrap items-center justify-between gap-3 text-xs animate-fadeIn">
            <span className="text-gray-300 font-medium flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-amber-400" /> Share on Social Media:
            </span>
            <div className="flex items-center gap-2.5">
              <a
                href={linkedInShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-300 hover:bg-blue-600 hover:text-white transition-all text-xs font-semibold"
                title="Share to LinkedIn"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                LinkedIn
              </a>

              <a
                href={twitterShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/20 border border-sky-400/40 text-sky-300 hover:bg-sky-500 hover:text-white transition-all text-xs font-semibold"
                title="Share to Twitter / X"
              >
                <TwitterIcon className="w-3.5 h-3.5" />
                Twitter / X
              </a>

              <a
                href={whatsAppShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600 hover:text-white transition-all text-xs font-semibold"
                title="Share to WhatsApp"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                WhatsApp
              </a>

              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-gray-200 hover:bg-white/20 transition-all text-xs font-semibold cursor-pointer"
                title="Copy direct link"
              >
                <Copy className="w-3.5 h-3.5 text-amber-400" />
                Copy URL
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
