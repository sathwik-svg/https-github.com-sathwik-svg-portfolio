import React from 'react';
import { Download, FileText, CheckCircle, ExternalLink, Award } from 'lucide-react';
import { ATSScoreSection } from '../components/ATSScoreSection';

export const ResumePage: React.FC = () => {
  const resumePdfPath = '/assets/documents/resume.pdf';

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-6 py-12 md:py-16 text-center">
      <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4" style={{ color: 'var(--text-main)' }}>
        My Resume.
      </h1>

      <p className="max-w-xl mx-auto text-sm md:text-base leading-relaxed mb-8" style={{ color: 'var(--text-muted)' }}>
        Take a look at my qualifications and experience. You can also download a copy for your records.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
        <a
          href={resumePdfPath}
          download="Sathwik_Ganji_Resume.pdf"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all hover:scale-105 shadow-lg cursor-pointer"
          style={{
            backgroundColor: 'var(--btn-bg)',
            color: 'var(--btn-text)'
          }}
        >
          <Download className="w-4 h-4" />
          Download PDF
        </a>

        <a
          href={resumePdfPath}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all hover:scale-105 border cursor-pointer"
          style={{
            backgroundColor: 'var(--btn-sec-bg)',
            color: 'var(--btn-sec-text)',
            borderColor: 'var(--btn-sec-border)'
          }}
        >
          <ExternalLink className="w-4 h-4" />
          Open PDF in New Tab
        </a>

        <a
          href="https://www.credly.com/users/sathwik-ganji"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all hover:scale-105 border"
          style={{
            borderColor: 'rgba(255, 153, 0, 0.4)',
            backgroundColor: 'rgba(255, 153, 0, 0.08)',
            color: 'var(--aws-orange-light)'
          }}
        >
          <Award className="w-4 h-4 text-amber-400" />
          Credly Badges
        </a>
      </div>

      {/* Summary Highlights */}
      <div
        className="text-left p-6 md:p-8 rounded-2xl border mb-10 grid grid-cols-1 md:grid-cols-2 gap-6"
        style={{
          backgroundColor: 'var(--panel)',
          borderColor: 'var(--panel-border)'
        }}
      >
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-2 text-blue-400">
            Education
          </h3>
          <p className="text-base font-bold" style={{ color: 'var(--text-main)' }}>
            Vasireddy Venkatadri International Technological University (VVITU)
          </p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            B.Tech in Computer Science &amp; Engineering
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-2 text-amber-400">
            Target Roles
          </h3>
          <p className="text-base font-bold" style={{ color: 'var(--text-main)' }}>
            Cloud Engineer · DevOps Engineer · SRE
          </p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Long-term: Cloud Solutions Architect
          </p>
        </div>
      </div>

      {/* ATS Resume Readiness Score Section */}
      <ATSScoreSection />

      {/* Embedded PDF Viewer Container */}
      <div
        className="w-full rounded-2xl border overflow-hidden shadow-2xl relative"
        style={{
          borderColor: 'var(--panel-border)',
          backgroundColor: '#1a1a1a',
          minHeight: '680px'
        }}
      >
        <iframe
          src={resumePdfPath}
          className="w-full h-[680px] md:h-[840px] border-none"
          title="Sathwik Ganji Resume"
        />
      </div>

      <p className="text-xs mt-6 opacity-60" style={{ color: 'var(--text-muted)' }}>
        Last updated: August 2026
      </p>
    </div>
  );
};
