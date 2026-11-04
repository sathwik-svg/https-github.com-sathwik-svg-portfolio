import React, { useState } from 'react';
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Phone,
  Copy,
  Check,
  ExternalLink,
  MessageSquare,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, WhatsAppIcon } from '../components/Icons';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'Cloud & DevOps Role (Hiring / Full-Time)',
    message: ''
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const myEmail = 'ganjisathwik73@gmail.com';
  const myPhone = '+919440547665';
  const myFormattedPhone = '+91 94405 47665';

  const inquiryOptions = [
    'Cloud & DevOps Role (Hiring / Full-Time)',
    'Infrastructure & Kubernetes Project',
    'Consulting / Architecture Review',
    'Academic / Research Collaboration',
    'General Discussion & Networking'
  ];

  const quickTemplates = [
    {
      label: '💼 Hiring / Interview',
      type: 'Cloud & DevOps Role (Hiring / Full-Time)',
      text: "Hi Sathwik, I came across your portfolio and would like to discuss an opportunity for a Cloud / DevOps Engineer role with our team."
    },
    {
      label: '☁️ AWS / Terraform Project',
      type: 'Infrastructure & Kubernetes Project',
      text: "Hi Sathwik, we have a project involving AWS infrastructure and Terraform automation and would love to collaborate with you."
    },
    {
      label: '☸️ Kubernetes / CI/CD',
      type: 'Infrastructure & Kubernetes Project',
      text: "Hi Sathwik, I saw your Kubernetes and CI/CD projects and would like to discuss container deployment pipelines."
    },
    {
      label: '👋 Quick Connect',
      type: 'General Discussion & Networking',
      text: "Hi Sathwik, impressive portfolio! I would like to connect with you and follow your engineering journey."
    }
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(myEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(myFormattedPhone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const applyTemplate = (type: string, text: string) => {
    setFormData((prev) => ({
      ...prev,
      inquiryType: type,
      message: text
    }));
  };

  // Generate webmail compose URLs
  const emailSubject = `${formData.inquiryType} - from ${formData.name || 'Portfolio Visitor'}`;
  const emailBody = `Name: ${formData.name}\nEmail: ${formData.email}\nInquiry: ${formData.inquiryType}\n\nMessage:\n${formData.message}`;

  const mailtoUrl = `mailto:${myEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${myEmail}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  const outlookUrl = `https://outlook.office.com/mail/deeplink/compose?to=${myEmail}&subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  const whatsAppUrl = `https://wa.me/919440547665?text=${encodeURIComponent(
    `Hi Sathwik! I'm reaching out from your portfolio regarding: ${formData.inquiryType}.\n\nName: ${formData.name || 'Visitor'}\nEmail: ${formData.email || 'N/A'}\nMessage: ${formData.message || 'I would like to connect.'}`
  )}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');

    setTimeout(() => {
      setStatus('success');
      // Automatically trigger the default mailto client
      window.location.href = mailtoUrl;
    }, 600);
  };

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto px-6 py-12 md:py-16">
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Connect & Details */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3" style={{ color: 'var(--text-main)' }}>
              Let's <span className="text-glow text-blue-500">Connect.</span>
            </h1>
            <p className="text-sm md:text-base leading-relaxed opacity-85" style={{ color: 'var(--text-muted)' }}>
              Whether you're hiring for a <strong>Cloud / DevOps Engineer</strong> role, have an infrastructure project, or want to discuss modern technologies, I'd love to hear from you.
            </p>
          </div>

          {/* Availability Status Badge */}
          <div
            className="p-4 rounded-2xl border flex flex-col gap-2"
            style={{
              backgroundColor: 'rgba(80, 200, 130, 0.06)',
              borderColor: 'rgba(80, 200, 130, 0.25)'
            }}
          >
            <div className="flex items-center gap-2.5 text-xs md:text-sm font-bold text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] animate-pulse" />
              Open to Opportunities
            </div>
            <p className="text-xs leading-relaxed opacity-85" style={{ color: 'var(--text-muted)' }}>
              Seeking Cloud Engineer, DevOps Engineer, Site Reliability Engineer (SRE), or Software Engineer roles.
            </p>
            <div className="flex items-center gap-4 pt-1 text-[11px] font-mono text-emerald-300">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Response: &lt; 24h
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> IST (UTC+5:30)
              </span>
            </div>
          </div>

          {/* Direct Contact Cards */}
          <div className="grid gap-3">
            {/* Email with copy button */}
            <div
              className="p-4 rounded-xl border flex items-center justify-between transition-all hover:border-blue-500/50 shadow-sm"
              style={{
                backgroundColor: 'var(--panel)',
                borderColor: 'var(--panel-border)',
                color: 'var(--text-main)'
              }}
            >
              <a
                href={`mailto:${myEmail}`}
                className="flex items-center gap-3.5 flex-1 min-w-0 mr-2 group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <span className="block text-[11px] uppercase tracking-wider opacity-60">Email Address</span>
                  <span className="text-xs sm:text-sm font-semibold truncate group-hover:text-blue-400 transition-colors">
                    {myEmail}
                  </span>
                </div>
              </a>

              <button
                onClick={handleCopyEmail}
                className="p-2 rounded-lg border border-white/10 hover:border-white/30 text-gray-400 hover:text-white transition-all cursor-pointer flex items-center gap-1 text-xs shrink-0"
                title="Copy email to clipboard"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 text-[11px]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span className="hidden sm:inline text-[11px]">Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/sathwik-svg/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border flex items-center justify-between transition-all hover:translate-x-1 hover:border-blue-500/60 shadow-sm"
              style={{
                backgroundColor: 'var(--panel)',
                borderColor: 'var(--panel-border)',
                color: 'var(--text-main)'
              }}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                  <LinkedinIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[11px] uppercase tracking-wider opacity-60">LinkedIn Profile</span>
                  <span className="text-xs sm:text-sm font-semibold">linkedin.com/in/sathwik-svg</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 opacity-50" />
            </a>

            {/* WhatsApp / Phone */}
            <div
              className="p-4 rounded-xl border flex items-center justify-between transition-all hover:border-emerald-500/50 shadow-sm"
              style={{
                backgroundColor: 'var(--panel)',
                borderColor: 'var(--panel-border)',
                color: 'var(--text-main)'
              }}
            >
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 flex-1 min-w-0 mr-2 group"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                  <WhatsAppIcon className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <span className="block text-[11px] uppercase tracking-wider opacity-60">WhatsApp / Call</span>
                  <span className="text-xs sm:text-sm font-semibold truncate group-hover:text-emerald-400 transition-colors">
                    {myFormattedPhone}
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-1.5 shrink-0">
                <a
                  href={`tel:${myPhone}`}
                  className="p-2 rounded-lg border border-white/10 hover:border-white/30 text-gray-400 hover:text-white transition-all"
                  title="Direct phone call"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <button
                  onClick={handleCopyPhone}
                  className="p-2 rounded-lg border border-white/10 hover:border-white/30 text-gray-400 hover:text-white transition-all cursor-pointer"
                  title="Copy phone number"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* GitHub */}
            <a
              href="https://github.com/sathwik-svg"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border flex items-center justify-between transition-all hover:translate-x-1 hover:border-amber-500/60 shadow-sm"
              style={{
                backgroundColor: 'var(--panel)',
                borderColor: 'var(--panel-border)',
                color: 'var(--text-main)'
              }}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[11px] uppercase tracking-wider opacity-60">GitHub Code</span>
                  <span className="text-xs sm:text-sm font-semibold">github.com/sathwik-svg</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 opacity-50" />
            </a>

            {/* Location */}
            <div
              className="p-4 rounded-xl border flex items-center gap-3.5"
              style={{
                backgroundColor: 'var(--panel)',
                borderColor: 'var(--panel-border)',
                color: 'var(--text-main)'
              }}
            >
              <div className="w-10 h-10 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-wider opacity-60">Location</span>
                <span className="text-xs sm:text-sm font-semibold">Andhra Pradesh, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Send an Email & Message Form */}
        <div className="lg:col-span-7">
          <div
            className="p-6 md:p-8 rounded-3xl border shadow-xl relative overflow-hidden"
            style={{
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--panel-border)'
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text-main)' }}>
                Send Me an Email
              </h2>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                Direct Inbox
              </span>
            </div>

            <p className="text-xs md:text-sm mb-5 opacity-75 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Fill out the form below to email me directly. You can send via your default email app, Gmail, Outlook, or WhatsApp.
            </p>

            {/* Quick Template Buttons */}
            <div className="mb-6 pb-4 border-b" style={{ borderColor: 'var(--panel-border)' }}>
              <span className="block text-[11px] font-bold uppercase tracking-wider mb-2 opacity-70 flex items-center gap-1.5" style={{ color: 'var(--text-main)' }}>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Quick Message Topics:
              </span>
              <div className="flex flex-wrap gap-2">
                {quickTemplates.map((tmpl) => (
                  <button
                    key={tmpl.label}
                    type="button"
                    onClick={() => applyTemplate(tmpl.type, tmpl.text)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 hover:border-amber-500/50 hover:bg-amber-500/10 transition-all cursor-pointer text-left"
                    style={{ color: 'var(--text-main)' }}
                  >
                    {tmpl.label}
                  </button>
                ))}
              </div>
            </div>

            {status === 'success' ? (
              <div className="p-6 md:p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center flex flex-col items-center gap-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 animate-bounce" />
                <div>
                  <h3 className="font-bold text-xl mb-1" style={{ color: 'var(--text-main)' }}>
                    Your Email Client Has Been Opened!
                  </h3>
                  <p className="text-xs md:text-sm text-emerald-300 max-w-md mx-auto">
                    A pre-filled message addressed to <strong>{myEmail}</strong> was created. You can also send or view via the webmail buttons below:
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                  <a
                    href={gmailUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white transition-all shadow"
                  >
                    Open in Gmail ↗
                  </a>
                  <a
                    href={outlookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow"
                  >
                    Open in Outlook ↗
                  </a>
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow"
                  >
                    Send via WhatsApp ↗
                  </a>
                </div>

                <button
                  onClick={() => {
                    setStatus('idle');
                    setFormData({
                      name: '',
                      email: '',
                      inquiryType: 'Cloud & DevOps Role (Hiring / Full-Time)',
                      message: ''
                    });
                  }}
                  className="mt-4 px-4 py-2 rounded-lg text-xs font-bold border border-white/20 text-gray-300 hover:text-white cursor-pointer"
                >
                  Compose Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider mb-1.5 opacity-80" style={{ color: 'var(--text-main)' }}>
                      Your Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe / Hiring Manager"
                      className="w-full px-3.5 py-2.5 rounded-xl border text-xs md:text-sm outline-none transition-all focus:border-amber-500"
                      style={{
                        backgroundColor: 'var(--panel)',
                        borderColor: 'var(--panel-border)',
                        color: 'var(--text-main)'
                      }}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider mb-1.5 opacity-80" style={{ color: 'var(--text-main)' }}>
                      Your Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. name@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border text-xs md:text-sm outline-none transition-all focus:border-amber-500"
                      style={{
                        backgroundColor: 'var(--panel)',
                        borderColor: 'var(--panel-border)',
                        color: 'var(--text-main)'
                      }}
                    />
                  </div>
                </div>

                {/* Inquiry Type */}
                <div>
                  <label htmlFor="inquiryType" className="block text-xs font-bold uppercase tracking-wider mb-1.5 opacity-80" style={{ color: 'var(--text-main)' }}>
                    Inquiry Type / Subject
                  </label>
                  <select
                    id="inquiryType"
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border text-xs md:text-sm outline-none transition-all focus:border-amber-500 cursor-pointer"
                    style={{
                      backgroundColor: 'var(--panel)',
                      borderColor: 'var(--panel-border)',
                      color: 'var(--text-main)'
                    }}
                  >
                    {inquiryOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider mb-1.5 opacity-80" style={{ color: 'var(--text-main)' }}>
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about the role, project, or what you'd like to collaborate on..."
                    className="w-full px-3.5 py-2.5 rounded-xl border text-xs md:text-sm outline-none transition-all focus:border-amber-500 resize-none"
                    style={{
                      backgroundColor: 'var(--panel)',
                      borderColor: 'var(--panel-border)',
                      color: 'var(--text-main)'
                    }}
                  />
                </div>

                {/* Submit and Direct Dispatch Options */}
                <div className="pt-2 flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full py-3.5 rounded-xl font-bold text-xs md:text-sm tracking-wide text-white transition-all hover:scale-[1.01] shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    style={{
                      background: 'linear-gradient(120deg, #2563eb, #7c3aed)'
                    }}
                  >
                    <Send className="w-4 h-4" />
                    {status === 'sending' ? 'Opening Mail Client...' : 'Send Message to Sathwik →'}
                  </button>

                  {/* Webmail Quick Links */}
                  <div className="flex flex-wrap items-center justify-between text-xs pt-2 text-gray-400">
                    <span className="opacity-70">Or send directly via:</span>
                    <div className="flex items-center gap-3">
                      <a
                        href={gmailUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-amber-400 transition-colors flex items-center gap-1 font-medium"
                      >
                        Gmail ↗
                      </a>
                      <span className="opacity-30">•</span>
                      <a
                        href={outlookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-amber-400 transition-colors flex items-center gap-1 font-medium"
                      >
                        Outlook ↗
                      </a>
                      <span className="opacity-30">•</span>
                      <a
                        href={whatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-emerald-400 transition-colors flex items-center gap-1 font-medium"
                      >
                        WhatsApp ↗
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
