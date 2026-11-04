import React, { useEffect, useState } from 'react';
import { ProjectDetail } from '../types';
import { ExternalLink, X, Share2, Check, Copy, FileText, RefreshCw, AlertCircle, Layers } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, WhatsAppIcon } from './Icons';
import { ProjectStatsSection } from './ProjectStatsSection';
import { MarkdownViewer } from './MarkdownViewer';
import { extractRepoNameFromUrl, fetchRepoReadme } from '../utils/githubStats';

interface ProjectModalProps {
  project: ProjectDetail | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'readme'>('overview');
  const [copied, setCopied] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  // README state
  const [readmeContent, setReadmeContent] = useState<string | null>(null);
  const [readmeLoading, setReadmeLoading] = useState(false);
  const [readmeError, setReadmeError] = useState<string | null>(null);

  const repoName = project?.github ? extractRepoNameFromUrl(project.github) : null;

  // Fetch README when project changes
  useEffect(() => {
    if (!project || !repoName) {
      setReadmeContent(null);
      setReadmeLoading(false);
      setReadmeError(null);
      return;
    }

    let isMounted = true;
    setReadmeLoading(true);
    setReadmeError(null);

    fetchRepoReadme(repoName)
      .then((text) => {
        if (isMounted) {
          setReadmeContent(text);
          setReadmeLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.warn('README fetch notice:', err.message);
          setReadmeError('Unable to load README directly via API. The repository might not have a README file or rate limits apply.');
          setReadmeLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [project, repoName]);

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
      setActiveTab('overview');
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
  const shareText = `Check out "${project.title}" by Sathwik Ganji (Cloud & DevOps Engineer): ${shareUrl}`;

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
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

  const handleRetryReadme = () => {
    if (!repoName) return;
    setReadmeLoading(true);
    setReadmeError(null);
    fetchRepoReadme(repoName)
      .then((text) => {
        setReadmeContent(text);
        setReadmeLoading(false);
      })
      .catch(() => {
        setReadmeError('Unable to load README from GitHub.');
        setReadmeLoading(false);
      });
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

        {/* Modal View Tabs: Overview vs README.md */}
        <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-xs'
                : 'text-gray-400 hover:text-white border border-transparent'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Architecture &amp; Overview</span>
          </button>

          {project.github && (
            <button
              onClick={() => setActiveTab('readme')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'readme'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-xs'
                  : 'text-gray-400 hover:text-white border border-transparent'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>README.md</span>
              {readmeLoading && <RefreshCw className="w-3 h-3 animate-spin text-amber-400" />}
              {readmeContent && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-0.5" />
              )}
            </button>
          )}
        </div>

        {/* Tab 1: Overview & Architecture View */}
        {activeTab === 'overview' && (
          <div>
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
          </div>
        )}

        {/* Tab 2: GitHub README.md View */}
        {activeTab === 'readme' && (
          <div className="min-h-[250px] mb-6">
            {readmeLoading ? (
              <div className="py-16 text-center flex flex-col items-center justify-center gap-3">
                <RefreshCw className="w-7 h-7 text-amber-400 animate-spin" />
                <span className="text-xs md:text-sm text-gray-300 font-mono">
                  Fetching README.md from GitHub API for <strong>{repoName}</strong>...
                </span>
              </div>
            ) : readmeContent ? (
              <div className="p-5 md:p-6 rounded-xl border border-white/10 bg-white/5">
                <MarkdownViewer content={readmeContent} repoName={repoName || undefined} />
              </div>
            ) : (
              <div className="p-8 rounded-xl border border-white/10 bg-white/5 text-center flex flex-col items-center justify-center gap-3">
                <AlertCircle className="w-8 h-8 text-amber-400" />
                <h4 className="font-bold text-base text-white">README.md Notice</h4>
                <p className="text-xs md:text-sm text-gray-300 max-w-md">
                  {readmeError || 'Could not automatically load the README.md from GitHub API.'}
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={handleRetryReadme}
                    className="px-4 py-2 rounded-xl text-xs font-bold border border-white/20 hover:border-amber-400 text-white transition-colors cursor-pointer"
                  >
                    Retry Fetching
                  </button>
                  {project.github && (
                    <a
                      href={`${project.github}#readme`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-gray-950 transition-all hover:brightness-110"
                      style={{ backgroundColor: 'var(--aws-orange)' }}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      View on GitHub →
                    </a>
                  )}
                </div>
              </div>
            )}
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
