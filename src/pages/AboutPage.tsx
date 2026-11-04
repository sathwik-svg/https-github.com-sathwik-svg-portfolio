import React from 'react';
import { GraduationCap, Target, Layers, Terminal, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const skills = [
    { name: '☁ AWS', desc: 'EC2, S3, Lambda, IAM, VPC, CloudWatch' },
    { name: '🐳 Docker', desc: 'Containerization, Multi-stage builds, Compose' },
    { name: '☸ Kubernetes', desc: 'Pods, Deployments, Services, ConfigMaps, Helm' },
    { name: '🏗 Terraform', desc: 'Infrastructure as Code, Modules, State management' },
    { name: '🐧 Linux', desc: 'Ubuntu Server, Bash scripting, systemd, SSH' },
    { name: '⚙ CI/CD', desc: 'GitHub Actions, automated test, build & deploy' }
  ];

  const highlights = [
    'Automated CI/CD workflows using GitHub Actions and container registries',
    'Infrastructure-as-Code provisioning using Terraform and AWS resources',
    'Orchestrating containerized stateful microservices with Kubernetes',
    'Linux server administration, troubleshooting, and networking',
    'Production observability, health probes, and service monitoring'
  ];

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto px-6 py-12 md:py-16">
      <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8" style={{ color: 'var(--text-main)' }}>
        About Me.
      </h1>

      {/* About Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center mb-16">
        {/* Orbital Floating Profile Image */}
        <div className="md:col-span-4 flex justify-center">
          <div className="relative w-52 h-52 flex items-center justify-center">
            {/* Spinning Orbit Ring with glowing dots */}
            <div className="absolute inset-0 rounded-full border border-sky-400/40 profile-orbit">
              <span className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#38bdf8]" />
              <span className="absolute bottom-2 right-4 w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_12px_#3b82f6]" />
            </div>

            {/* Profile Floating Card */}
            <img
              src="assets/images/profile.jpg"
              alt="Sathwik Ganji"
              className="w-32 h-40 object-cover rounded-xl shadow-2xl profile-float border-2 border-sky-400/30 z-10"
              style={{
                boxShadow: '0 0 35px rgba(80, 160, 255, 0.35)'
              }}
            />
          </div>
        </div>

        {/* Bio Content */}
        <div className="md:col-span-8 flex flex-col gap-4">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text-main)' }}>
            Sathwik Ganji
          </h2>

          <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            I am a <strong className="font-semibold" style={{ color: 'var(--text-main)' }}>Computer Science and Engineering student at Vasireddy Venkatadri Institute of Technology (VVIT)</strong>, focused on Cloud Computing, DevOps and Software Engineering.
          </p>

          <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            I build practical projects using <strong className="font-semibold" style={{ color: 'var(--text-main)' }}>AWS, Linux, Docker, Kubernetes, Terraform, Git, GitHub Actions and CI/CD</strong>, with a focus on automation, deployment, infrastructure and reliable engineering.
          </p>

          <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            I am building toward <strong className="font-semibold" style={{ color: 'var(--text-main)' }}>Cloud Engineer and DevOps Engineer</strong> roles, with a long-term goal of becoming a <strong className="font-semibold" style={{ color: 'var(--text-main)' }}>Cloud Solutions Architect</strong>.
          </p>

          <div className="flex items-center gap-2 pt-2 text-sm font-medium" style={{ color: 'var(--text-main)' }}>
            <GraduationCap className="w-5 h-5 text-blue-500" />
            <span><strong>Education:</strong> B.Tech — Computer Science &amp; Engineering, VVIT</span>
          </div>

          {/* Interactive Tech Orbit Badges */}
          <div className="flex flex-wrap gap-2.5 mt-4">
            {skills.map((skill, idx) => (
              <div
                key={skill.name}
                className="px-3.5 py-2 rounded-full border text-xs md:text-sm font-semibold tech-badge-breathe"
                style={{
                  animationDelay: `${idx * 0.3}s`,
                  borderColor: 'rgba(120, 180, 255, 0.25)',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  color: 'var(--text-main)'
                }}
              >
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Engineering Disciplines */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div
          className="p-6 rounded-2xl border transition-all hover:scale-[1.02]"
          style={{
            backgroundColor: 'var(--panel)',
            borderColor: 'var(--panel-border)'
          }}
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-main)' }}>
            Cloud Infrastructure
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Designing resilient architectures on AWS with VPCs, compute, serverless functions, security groups, and automated Infrastructure as Code with Terraform.
          </p>
        </div>

        <div
          className="p-6 rounded-2xl border transition-all hover:scale-[1.02]"
          style={{
            backgroundColor: 'var(--panel)',
            borderColor: 'var(--panel-border)'
          }}
        >
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-main)' }}>
            DevOps &amp; Automation
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Crafting continuous delivery pipelines with GitHub Actions, containerizing environments with Docker, and orchestrating multi-service setups with Kubernetes.
          </p>
        </div>

        <div
          className="p-6 rounded-2xl border transition-all hover:scale-[1.02]"
          style={{
            backgroundColor: 'var(--panel)',
            borderColor: 'var(--panel-border)'
          }}
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
            <Terminal className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-main)' }}>
            Linux &amp; Systems
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Deep hands-on system administration in Ubuntu Server, bash scripting, process supervision with systemd, SSH network diagnostics, and production observability.
          </p>
        </div>
      </section>

      {/* Practical Experience Highlights */}
      <section
        className="p-8 rounded-2xl border mb-12"
        style={{
          backgroundColor: 'var(--panel)',
          borderColor: 'var(--panel-border)'
        }}
      >
        <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-main)' }}>
          Hands-on Engineering Capabilities
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {highlights.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
