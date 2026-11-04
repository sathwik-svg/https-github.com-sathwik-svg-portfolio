import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/Icons';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');

    // Simulate sending with responsive feedback
    setTimeout(() => {
      setStatus('success');
      // Also open mailto link as a direct fallback
      const mailtoLink = `mailto:ganjisathwik73@gmail.com?subject=Contact from ${encodeURIComponent(
        formData.name
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoLink;
    }, 800);
  };

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto px-6 py-12 md:py-16">
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4" style={{ color: 'var(--text-main)' }}>
              Let's <span className="text-glow text-blue-500">Talk.</span>
            </h1>
            <p className="text-base md:text-lg leading-relaxed opacity-85" style={{ color: 'var(--text-muted)' }}>
              Have a question or want to work together? Leave your details and I'll get back to you as soon as possible.
            </p>
          </div>

          {/* Opportunities Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border self-start text-xs md:text-sm font-semibold"
            style={{
              backgroundColor: 'rgba(80, 200, 130, 0.08)',
              borderColor: 'rgba(80, 200, 130, 0.25)',
              color: '#34d399'
            }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] animate-pulse" />
            Open to professional opportunities
          </div>

          {/* Contact Cards */}
          <div className="grid gap-3.5 mt-2">
            <a
              href="mailto:ganjisathwik73@gmail.com"
              className="flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 hover:translate-x-1.5 hover:border-blue-500/60 shadow-sm"
              style={{
                backgroundColor: 'var(--panel)',
                borderColor: 'rgba(120, 180, 255, 0.2)',
                color: 'var(--text-main)'
              }}
            >
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-wider opacity-60">Email</span>
                <span className="text-sm font-semibold">ganjisathwik73@gmail.com</span>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/sathwik-svg/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 hover:translate-x-1.5 hover:border-blue-500/60 shadow-sm"
              style={{
                backgroundColor: 'var(--panel)',
                borderColor: 'rgba(120, 180, 255, 0.2)',
                color: 'var(--text-main)'
              }}
            >
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                <LinkedinIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-wider opacity-60">LinkedIn</span>
                <span className="text-sm font-semibold">Connect with me on LinkedIn</span>
              </div>
            </a>

            <div
              className="flex items-center gap-4 p-4 rounded-xl border"
              style={{
                backgroundColor: 'var(--panel)',
                borderColor: 'rgba(120, 180, 255, 0.2)',
                color: 'var(--text-main)'
              }}
            >
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-wider opacity-60">Location</span>
                <span className="text-sm font-semibold">Andhra Pradesh, India</span>
              </div>
            </div>

            <a
              href="https://github.com/sathwik-svg"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 hover:translate-x-1.5 hover:border-blue-500/60 shadow-sm"
              style={{
                backgroundColor: 'var(--panel)',
                borderColor: 'rgba(120, 180, 255, 0.2)',
                color: 'var(--text-main)'
              }}
            >
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                <GithubIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-wider opacity-60">GitHub</span>
                <span className="text-sm font-semibold">github.com/sathwik-svg</span>
              </div>
            </a>
          </div>
        </div>

        {/* Right Column: Send a Message Form */}
        <div className="lg:col-span-6">
          <div
            className="p-8 md:p-10 rounded-3xl border shadow-xl relative overflow-hidden"
            style={{
              backgroundColor: 'var(--card-bg)',
              borderColor: 'rgba(120, 180, 255, 0.2)'
            }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text-main)' }}>
              Send a Message
            </h2>
            <p className="text-sm mb-6 opacity-75" style={{ color: 'var(--text-muted)' }}>
              Whether you're looking for a developer, have a project in mind, or just want to connect, feel free to reach out.
            </p>

            {status === 'success' ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center flex flex-col items-center gap-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                <h3 className="font-bold text-lg" style={{ color: 'var(--text-main)' }}>
                  Message Ready!
                </h3>
                <p className="text-xs md:text-sm text-emerald-300">
                  Thank you! Your email client has been prepared. I look forward to connecting with you.
                </p>
                <button
                  onClick={() => {
                    setStatus('idle');
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="mt-3 px-4 py-2 rounded-lg text-xs font-bold border border-emerald-500/40 cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-main)' }}>
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="What's your name?"
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:border-blue-500"
                    style={{
                      backgroundColor: 'var(--panel)',
                      borderColor: 'rgba(120, 180, 255, 0.2)',
                      color: 'var(--text-main)'
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-main)' }}>
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Where can I reach you?"
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:border-blue-500"
                    style={{
                      backgroundColor: 'var(--panel)',
                      borderColor: 'rgba(120, 180, 255, 0.2)',
                      color: 'var(--text-main)'
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-main)' }}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="What would you like to discuss?"
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:border-blue-500 resize-none"
                    style={{
                      backgroundColor: 'var(--panel)',
                      borderColor: 'rgba(120, 180, 255, 0.2)',
                      color: 'var(--text-main)'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-4 rounded-xl font-bold text-sm tracking-wide text-white transition-all hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  style={{
                    background: 'linear-gradient(120deg, #4b8cff, #7b61ff)'
                  }}
                >
                  <Send className="w-4 h-4" />
                  {status === 'sending' ? 'Preparing Message...' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
