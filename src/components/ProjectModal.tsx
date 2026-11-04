import React, { useEffect } from 'react';
import { ProjectDetail } from '../types';
import { ExternalLink, X } from 'lucide-react';
import { GithubIcon } from './Icons';
import { ProjectStatsSection } from './ProjectStatsSection';

interface ProjectModalProps {
  project: ProjectDetail | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md modal-backdrop-anim"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 md:p-8 rounded-lg border shadow-2xl modal-box-anim"
        style={{
          backgroundColor: '#111820',
          borderColor: 'rgba(255, 153, 0, 0.35)',
          color: '#f3f4f6'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded border border-white/20 text-gray-300 hover:text-white hover:border-white transition-colors cursor-pointer"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--aws-orange)' }}>
          {project.kicker || 'ENGINEERING PROJECT'}
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4 pr-10">
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
          <div className="p-4 rounded border border-white/10 bg-white/5">
            <strong className="block text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--aws-orange-light)' }}>
              Technologies
            </strong>
            <span className="text-sm text-gray-200">{project.tech}</span>
          </div>

          <div className="p-4 rounded border border-white/10 bg-white/5">
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
              className="p-4 rounded border font-mono text-xs md:text-sm leading-relaxed overflow-x-auto whitespace-pre text-sky-300"
              style={{
                backgroundColor: 'rgba(83, 159, 229, 0.05)',
                borderColor: 'rgba(83, 159, 229, 0.25)'
              }}
            >
              {project.architecture}
            </pre>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 pt-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded font-bold text-xs uppercase tracking-wider text-gray-950 transition-all hover:brightness-110"
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded font-bold text-xs uppercase tracking-wider text-white border border-white/20 hover:border-white transition-all bg-white/5"
            >
              <ExternalLink className="w-4 h-4" />
              Open Live Demo ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
