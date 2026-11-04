import React, { useState } from 'react';
import {
  User,
  Award,
  Puzzle,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  Layers,
  Terminal,
  Send,
  RefreshCw,
  ArrowRight,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/Icons';

export const ProfilePage: React.FC = () => {
  // In-page AI Assistant Explainer state
  const [aiPrompt, setAiPrompt] = useState('Explain Sathwik’s key achievements and credentials');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const explainerOptions = [
    {
      title: '🏆 Key Achievements',
      desc: 'AWS credentials, Credly badges & production pipelines',
      prompt: 'Explain Sathwik’s key achievements, credentials, and track record'
    },
    {
      title: '🧩 Problem-Solving Skills',
      desc: 'Root-cause analysis, debugging & failure isolation',
      prompt: 'Showcase Sathwik’s problem-solving skills and troubleshooting cases'
    },
    {
      title: '🗣️ Communication Skills',
      desc: 'Architectural documentation, teamwork & post-mortems',
      prompt: 'How does Sathwik demonstrate strong communication, technical writing, and collaboration?'
    },
    {
      title: '🚀 Top Cloud Projects',
      desc: 'Project 16, Project 15, Terraform, and Kubernetes',
      prompt: 'What are Sathwik’s top Cloud & DevOps projects and architecture?'
    },
    {
      title: '💼 Why Hire Sathwik?',
      desc: 'Value proposition for engineering teams & recruiters',
      prompt: 'Why should a hiring manager recruit Sathwik Ganji as a Cloud or DevOps Engineer?'
    }
  ];

  const handleAskAi = async (promptToAsk: string) => {
    setAiPrompt(promptToAsk);
    setIsAiLoading(true);

    try {
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: promptToAsk })
      });
      if (!res.ok) throw new Error('API failed');
      const data = await res.json();
      setAiResponse(data.reply);
    } catch {
      setAiResponse(
        `Sathwik Ganji is a Cloud & DevOps Engineer specializing in AWS, Kubernetes, Terraform, Docker, and CI/CD. He holds verified AWS credentials on Credly, demonstrates systematic root-cause problem solving, and emphasizes clear architectural documentation and cross-team collaboration.`
      );
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto px-6 py-12 md:py-16">
      {/* Page Header */}
      <div className="mb-12">
        <span
          className="inline-block text-xs font-semibold tracking-wider uppercase mb-3 px-3 py-1 rounded-full border"
          style={{
            borderColor: 'var(--panel-border)',
            backgroundColor: 'var(--panel)',
            color: 'var(--accent)'
          }}
        >
          Engineering Profile &amp; Core Competencies
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4" style={{ color: 'var(--text-main)' }}>
          Profile, Achievements &amp; Skills
        </h1>
        <p className="max-w-3xl text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          An in-depth explanation of Sathwik Ganji's profile, verified cloud achievements, structured problem-solving framework, and engineering communication standards.
        </p>
      </div>

      {/* Profile Overview Card */}
      <section
        className="p-8 md:p-10 rounded-3xl border mb-16 shadow-lg relative overflow-hidden"
        style={{
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--panel-border)'
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <User className="w-4 h-4" /> Professional Profile
            </div>
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text-main)' }}>
              Sathwik Ganji — Cloud &amp; DevOps Engineer
            </h2>
            <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              I am a <strong>Computer Science &amp; Engineering student at Vasireddy Venkatadri Institute of Technology (VVIT)</strong> with a focused specialization in cloud infrastructure, container orchestration, and automated continuous delivery.
            </p>
            <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              My engineering philosophy revolves around <strong>reproducibility</strong> (Infrastructure as Code via Terraform), <strong>reliability</strong> (proactive observability with Prometheus &amp; Grafana), and <strong>velocity</strong> (automated CI/CD pipelines via GitHub Actions).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs md:text-sm">
              <div className="flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                <GraduationCap className="w-4 h-4 text-blue-400 shrink-0" />
                <span><strong>Education:</strong> B.Tech CSE, VVIT</span>
              </div>
              <div className="flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Accreditation:</strong> Verified AWS Badges</span>
              </div>
              <div className="flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                <Layers className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>Career Target:</strong> Cloud &amp; DevOps Engineer</span>
              </div>
              <div className="flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                <Terminal className="w-4 h-4 text-purple-400 shrink-0" />
                <span><strong>Long-Term:</strong> Cloud Solutions Architect</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl border border-white/10 bg-white/5 text-center">
            <img
              src="assets/images/profile.jpg"
              alt="Sathwik Ganji"
              className="w-28 h-28 object-cover rounded-full shadow-xl border-2 border-sky-400/40 mb-3"
            />
            <h3 className="font-bold text-base" style={{ color: 'var(--text-main)' }}>
              Sathwik Ganji
            </h3>
            <span className="text-xs text-sky-400 font-mono mb-4">Cloud &amp; DevOps Specialist</span>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/sathwik-svg"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-white/15 hover:border-white text-gray-300 hover:text-white transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/sathwik-svg/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-white/15 hover:border-white text-gray-300 hover:text-white transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.credly.com/users/sathwik-ganji"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-white/15 hover:border-amber-400 text-amber-400 transition-colors"
                title="Credly Badges"
              >
                <Award className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive AI Assistant Explainer Card */}
      <section
        className="p-8 md:p-10 rounded-3xl border mb-16 shadow-xl relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08), rgba(124, 58, 237, 0.08))',
          borderColor: 'rgba(124, 58, 237, 0.3)'
        }}
      >
        <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" /> AI Profile Assistant
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text-main)' }}>
          Ask the AI Assistant to Explain My Work
        </h2>
        <p className="text-xs md:text-sm mb-6 max-w-2xl opacity-80" style={{ color: 'var(--text-muted)' }}>
          Click any topic below to have the AI assistant synthesize my achievements, project architecture, problem-solving methods, and communication skills in real time.
        </p>

        {/* 1-Click Explainer Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {explainerOptions.map((opt) => (
            <button
              key={opt.title}
              onClick={() => handleAskAi(opt.prompt)}
              className="p-4 rounded-xl border text-left transition-all hover:scale-[1.02] cursor-pointer group"
              style={{
                backgroundColor: 'var(--panel)',
                borderColor: 'var(--panel-border)'
              }}
            >
              <h4 className="font-bold text-xs md:text-sm mb-1 group-hover:text-amber-400 transition-colors" style={{ color: 'var(--text-main)' }}>
                {opt.title}
              </h4>
              <p className="text-[11px] leading-relaxed opacity-70" style={{ color: 'var(--text-muted)' }}>
                {opt.desc}
              </p>
            </button>
          ))}
        </div>

        {/* AI Response Display Box */}
        <div
          className="p-5 md:p-6 rounded-2xl border bg-black/40 shadow-inner"
          style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs">
            <span className="font-mono text-gray-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Prompt: <em>"{aiPrompt}"</em>
            </span>
            {isAiLoading && (
              <span className="text-amber-400 flex items-center gap-1 text-[11px] font-mono">
                <RefreshCw className="w-3 h-3 animate-spin" /> Generating explanation...
              </span>
            )}
          </div>

          {isAiLoading ? (
            <div className="py-8 text-center text-xs text-gray-400 italic">
              AI Assistant is analyzing Sathwik's profile and engineering repository data...
            </div>
          ) : aiResponse ? (
            <div className="text-xs md:text-sm leading-relaxed text-gray-200 whitespace-pre-line space-y-2">
              {aiResponse}
            </div>
          ) : (
            <div className="py-4 text-center text-xs text-gray-400">
              Select one of the topics above to generate an instant explanation of Sathwik's credentials and capabilities.
            </div>
          )}
        </div>
      </section>

      {/* Problem-Solving Skills Showcase */}
      <section className="mb-16">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500 mb-1">
            <Puzzle className="w-4 h-4" /> Technical Problem-Solving
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text-main)' }}>
            Problem-Solving Framework &amp; Investigation
          </h2>
          <p className="text-sm max-w-2xl" style={{ color: 'var(--text-muted)' }}>
            How I approach complex distributed system failures, bottlenecks, and configuration drift.
          </p>
        </div>

        {/* 4 Pillars of Problem Solving */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl border" style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--panel-border)' }}>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono font-bold text-sm mb-3">
              01
            </div>
            <h4 className="font-bold text-sm mb-1.5" style={{ color: 'var(--text-main)' }}>
              Root-Cause Isolation
            </h4>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Separating application logic from networking and environmental factors to pinpoint the exact failure point.
            </p>
          </div>

          <div className="p-5 rounded-2xl border" style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--panel-border)' }}>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-mono font-bold text-sm mb-3">
              02
            </div>
            <h4 className="font-bold text-sm mb-1.5" style={{ color: 'var(--text-main)' }}>
              Declarative Idempotence
            </h4>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Using Terraform and Kubernetes manifests to eliminate human error and ensure repeatable state recovery.
            </p>
          </div>

          <div className="p-5 rounded-2xl border" style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--panel-border)' }}>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-mono font-bold text-sm mb-3">
              03
            </div>
            <h4 className="font-bold text-sm mb-1.5" style={{ color: 'var(--text-main)' }}>
              Container &amp; Network Triage
            </h4>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Diagnosing port collisions, persistent volume permissions, and service mesh connectivity in Docker &amp; K8s.
            </p>
          </div>

          <div className="p-5 rounded-2xl border" style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--panel-border)' }}>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-mono font-bold text-sm mb-3">
              04
            </div>
            <h4 className="font-bold text-sm mb-1.5" style={{ color: 'var(--text-main)' }}>
              Proactive Observability
            </h4>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Instrumenting health probes and Prometheus metrics to detect degradation before users experience outages.
            </p>
          </div>
        </div>

        {/* Real-World Case Studies */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-l-4 border-l-amber-500" style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--panel-border)' }}>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
              Case Study 1 · Architecture Simplification
            </span>
            <h3 className="font-bold text-base mb-2" style={{ color: 'var(--text-main)' }}>
              AI Workflow Timeout → Direct HTTP API
            </h3>
            <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-muted)' }}>
              <strong>Challenge:</strong> Long-running AI agents were prematurely terminating due to execution limits.
            </p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              <strong>Resolution:</strong> Re-architected pipeline to route directly to local Ollama API through Cloudflare tunnels, achieving 100% completion rates.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-l-4 border-l-blue-500" style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--panel-border)' }}>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 block mb-1">
              Case Study 2 · CI/CD Validation
            </span>
            <h3 className="font-bold text-base mb-2" style={{ color: 'var(--text-main)' }}>
              Kubernetes Manifest Pipeline Gate
            </h3>
            <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-muted)' }}>
              <strong>Challenge:</strong> Invalid YAML manifests were breaking cluster state during automated deployments.
            </p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              <strong>Resolution:</strong> Integrated automated kubeval and dry-run validation steps in GitHub Actions before deployment dispatch.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-l-4 border-l-emerald-500" style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--panel-border)' }}>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
              Case Study 3 · Container Isolation
            </span>
            <h3 className="font-bold text-base mb-2" style={{ color: 'var(--text-main)' }}>
              Docker Compose Multi-Service Dependency
            </h3>
            <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-muted)' }}>
              <strong>Challenge:</strong> App containers started before PostgreSQL database initialization, causing startup crashes.
            </p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              <strong>Resolution:</strong> Added health check conditions in docker-compose.yml (`depends_on: service_healthy`) with volume persistence.
            </p>
          </div>
        </div>
      </section>

      {/* Communication & Collaboration Skills Showcase */}
      <section className="mb-16">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-500 mb-1">
            <MessageSquare className="w-4 h-4" /> Professional Communication
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text-main)' }}>
            Communication &amp; Team Collaboration
          </h2>
          <p className="text-sm max-w-2xl" style={{ color: 'var(--text-muted)' }}>
            How I communicate technical concepts, collaborate across teams, and document distributed architectures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border" style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--panel-border)' }}>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base mb-2" style={{ color: 'var(--text-main)' }}>
              Architectural Documentation
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              I craft clear ASCII architecture pipelines and detailed READMEs for every project so software developers and operators understand the exact data and control flow.
            </p>
          </div>

          <div className="p-6 rounded-2xl border" style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--panel-border)' }}>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base mb-2" style={{ color: 'var(--text-main)' }}>
              Dev &amp; Ops Enablement
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              I treat developers as internal customers: building automated build and deployment pipelines that remove friction, reduce cognitive load, and prevent deployment fear.
            </p>
          </div>

          <div className="p-6 rounded-2xl border" style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--panel-border)' }}>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base mb-2" style={{ color: 'var(--text-main)' }}>
              Transparent Post-Mortems
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              When systems fail, I write blameless post-mortems documenting what happened, the root cause, immediate mitigation, and long-term architectural prevention steps.
            </p>
          </div>
        </div>
      </section>

      {/* Verified Achievements & Credly Badges */}
      <section
        className="p-8 rounded-3xl border text-center"
        style={{
          backgroundColor: 'var(--panel)',
          borderColor: 'var(--panel-border)'
        }}
      >
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500 mb-2">
          <Award className="w-4 h-4" /> Verified Credentials
        </div>
        <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-main)' }}>
          Verified AWS &amp; Cloud Badges on Credly
        </h2>
        <p className="text-xs md:text-sm max-w-xl mx-auto mb-6" style={{ color: 'var(--text-muted)' }}>
          My cloud skills are verified through Credly digital credentials covering AWS architecture, compute, networking, and automation.
        </p>
        <a
          href="https://www.credly.com/users/sathwik-ganji"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-gray-950 transition-all hover:scale-105 shadow-md"
          style={{ backgroundColor: 'var(--aws-orange)' }}
        >
          <Award className="w-4 h-4" />
          View Verified Credly Badges →
        </a>
      </section>
    </div>
  );
};
