import React from 'react';
import { ExternalLink, Check } from 'lucide-react';

export const OperatingSystemsPage: React.FC = () => {
  const osList = [
    {
      id: 'windows',
      icon: '🪟',
      title: 'Windows',
      desc: 'Windows administration, troubleshooting, networking, PowerShell and system maintenance.',
      tags: ['CMD', 'PowerShell', 'Windows 11'],
      features: [
        'System troubleshooting',
        'Network diagnostics',
        'Windows Update & servicing',
        'Services & processes',
        'Storage & disk tools',
        'Drivers & devices'
      ],
      link: 'https://learn.microsoft.com/windows/',
      linkText: 'Microsoft Windows Docs →'
    },
    {
      id: 'linux',
      icon: '🐧',
      title: 'Linux',
      desc: 'Linux administration with practical experience in Ubuntu Server, SSH, networking, Docker and cloud infrastructure.',
      tags: ['Ubuntu', 'Bash', 'SSH', 'Docker'],
      features: [
        'Ubuntu Server administration',
        'Linux troubleshooting & logs',
        'SSH & networking diagnostics',
        'Package management (apt)',
        'Services & systemd units',
        'Docker & container runtimes'
      ],
      link: 'https://ubuntu.com/server/docs',
      linkText: 'Ubuntu Server Docs →'
    },
    {
      id: 'macos',
      icon: '🍎',
      title: 'macOS',
      desc: 'macOS command-line concepts, system tools, networking, storage and administration fundamentals.',
      tags: ['Terminal', 'Unix', 'Networking'],
      features: [
        'Terminal & zsh commands',
        'System troubleshooting',
        'Network diagnostics',
        'Storage management',
        'Processes & launchd services',
        'System administration'
      ],
      link: 'https://support.apple.com/macos',
      linkText: 'Apple macOS Support →'
    }
  ];

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto px-6 py-12 md:py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4" style={{ color: 'var(--text-main)' }}>
          Operating Systems.
        </h1>
        <p className="text-sm md:text-base leading-relaxed opacity-75" style={{ color: 'var(--text-muted)' }}>
          Practical systems knowledge across Windows, Linux and macOS, with a focus on troubleshooting,
          networking, administration, automation and cloud infrastructure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {osList.map((os) => (
          <section
            key={os.id}
            className="p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between shadow-sm hover:shadow-xl"
            style={{
              backgroundColor: 'var(--panel)',
              borderColor: 'rgba(120, 180, 255, 0.2)'
            }}
          >
            <div>
              <div className="text-5xl mb-4 select-none">{os.icon}</div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-main)' }}>
                {os.title}
              </h2>
              <p className="text-sm leading-relaxed mb-6 opacity-80" style={{ color: 'var(--text-muted)' }}>
                {os.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {os.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-semibold border"
                    style={{
                      borderColor: 'rgba(120, 180, 255, 0.25)',
                      backgroundColor: 'rgba(120, 180, 255, 0.05)',
                      color: 'var(--accent)'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Checklist */}
              <ul className="space-y-2.5 mb-8">
                {os.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs md:text-sm opacity-80" style={{ color: 'var(--text-main)' }}>
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={os.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-xs font-bold border transition-all hover:scale-[1.02]"
              style={{
                borderColor: 'rgba(120, 180, 255, 0.3)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                color: 'var(--text-main)'
              }}
            >
              <span>{os.linkText}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </section>
        ))}
      </div>
    </div>
  );
};
