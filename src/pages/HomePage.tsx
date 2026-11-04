import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Cloud, Server, ShieldCheck, Terminal, Cpu } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto px-6 py-12 md:py-20 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        <div className="flex-1 max-w-xl text-center md:text-left">
          <span
            className="inline-block text-xs md:text-sm font-semibold tracking-wider uppercase mb-3 px-3 py-1 rounded-full border"
            style={{
              borderColor: 'var(--panel-border)',
              backgroundColor: 'var(--panel)',
              color: 'var(--accent)'
            }}
          >
            Development | Design | Strategy
          </span>

          <h1
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight"
            style={{ color: 'var(--text-main)' }}
          >
            Hi, I'm <span className="text-glow">Sathwik Ganji.</span>
          </h1>

          <p
            className="text-base md:text-lg mb-8 leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            Cloud &amp; DevOps Engineer focused on AWS, Terraform, Kubernetes, Docker,
            CI/CD, Linux, and modern cloud technologies. Welcome to my portfolio.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <Link
              to="/resume"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-bold text-sm transition-all hover:scale-105 cursor-pointer shadow-lg"
              style={{
                backgroundColor: 'var(--btn-bg)',
                color: 'var(--btn-text)'
              }}
            >
              View Resume
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-bold text-sm transition-all hover:scale-105 border cursor-pointer"
              style={{
                backgroundColor: 'var(--btn-sec-bg)',
                color: 'var(--btn-sec-text)',
                borderColor: 'var(--btn-sec-border)'
              }}
            >
              Let's Talk
            </Link>
          </div>

          {/* Quick tech highlights */}
          <div className="mt-10 pt-6 border-t flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-mono"
            style={{ borderColor: 'var(--panel-border)', color: 'var(--text-muted)' }}
          >
            <span className="flex items-center gap-1.5"><Cloud className="w-3.5 h-3.5 text-amber-500" /> AWS</span>
            <span className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-blue-500" /> Kubernetes</span>
            <span className="flex items-center gap-1.5"><Server className="w-3.5 h-3.5 text-purple-500" /> Terraform</span>
            <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5 text-emerald-500" /> Linux</span>
          </div>
        </div>

        {/* Morphing Blob Hero Image */}
        <div className="flex-1 flex justify-center items-center">
          <div className="relative">
            <div
              className="absolute -inset-4 rounded-full filter blur-2xl opacity-30 animate-pulse"
              style={{ background: 'radial-gradient(circle, #2563eb, #ff9900)' }}
            />
            <img
              src="assets/images/profile.jpg"
              alt="Sathwik Ganji Profile"
              className="relative w-64 h-64 md:w-80 md:h-80 object-cover hero-image-blob shadow-2xl border-4"
              style={{ borderColor: 'var(--btn-sec-border)' }}
            />
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section
        className="w-full py-16 text-center border-t border-b transition-colors"
        style={{
          borderColor: 'var(--nav-border)',
          backgroundColor: 'var(--panel)'
        }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2 text-amber-500">
            <ShieldCheck className="w-4 h-4" />
            Certifications &amp; Badges
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: 'var(--text-main)' }}>
            AWS &amp; Cloud Credentials
          </h2>
          <p className="text-sm md:text-base max-w-xl mx-auto mb-6" style={{ color: 'var(--text-muted)' }}>
            Verified AWS and cloud learning badges from Credly confirming foundational and practical cloud skills.
          </p>

          <a
            href="https://www.credly.com/users/sathwik-ganji"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all hover:scale-105 border shadow-md"
            style={{
              borderColor: 'rgba(120, 180, 255, 0.4)',
              backgroundColor: 'rgba(37, 99, 235, 0.1)',
              color: 'var(--accent)'
            }}
          >
            <Award className="w-5 h-5 text-amber-400" />
            View Verified Credly Badges →
          </a>
        </div>
      </section>
    </div>
  );
};
