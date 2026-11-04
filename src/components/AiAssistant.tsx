import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';

const WEBHOOK_URL =
  'https://server-celebrity-hospitality-voting.trycloudflare.com/webhook/portfolio-ai';

export const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'initial',
      text: "Hi! 👋 I'm Sathwik's portfolio AI assistant. Ask me about his projects, Cloud & DevOps skills, technologies, or portfolio.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [isOpen, messages]);

  // Offline fallback answer generator in case the local Cloudflare tunnel is offline
  const getOfflineAnswer = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('project') || q.includes('work')) {
      return "Sathwik has built several high-impact projects including Project 16 (Production Monitoring Dashboard), Project 15 (Advanced AWS CI/CD with Docker & GitHub Actions), Project 14 (Terraform AWS Infrastructure as Code), Project 13 (AWS Kubernetes CI/CD), and Project 12 (Kubernetes Production Application with PostgreSQL & Redis). You can view full architectures on the Projects page!";
    }
    if (q.includes('skill') || q.includes('tech') || q.includes('stack')) {
      return "Sathwik's core stack centers on Cloud & DevOps: AWS (EC2, S3, Lambda, IAM, VPC), Docker, Kubernetes, Terraform (IaC), Linux/Ubuntu administration, CI/CD pipelines (GitHub Actions), Python, Java, and monitoring with Prometheus & Grafana.";
    }
    if (q.includes('education') || q.includes('college') || q.includes('university') || q.includes('vvit')) {
      return "Sathwik is a Computer Science and Engineering student at Vasireddy Venkatadri Institute of Technology (VVIT) in Andhra Pradesh, India.";
    }
    if (q.includes('certif') || q.includes('credly') || q.includes('badge') || q.includes('aws cert')) {
      return "Sathwik holds verified AWS and cloud learning badges on Credly! You can view all his verified badges at https://www.credly.com/users/sathwik-ganji.";
    }
    if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('phone')) {
      return "You can reach Sathwik directly via email at ganjisathwik73@gmail.com or phone at +91 9440547665. You can also connect with him on LinkedIn (in/sathwik-svg) or submit a message through the Contact page.";
    }
    if (q.includes('resume') || q.includes('cv')) {
      return "You can view and download Sathwik's complete resume on the Resume page or download the PDF directly from the top navigation bar.";
    }
    if (q.includes('os') || q.includes('linux') || q.includes('windows') || q.includes('mac')) {
      return "Sathwik has strong hands-on experience across Linux (Ubuntu Server administration, bash scripting, SSH, systemd), Windows (PowerShell, diagnostics), and macOS. Check the Operating Systems section for technical details!";
    }

    return "Sathwik is a Cloud & DevOps Engineer specializing in AWS, Kubernetes, Terraform, Docker, and CI/CD automation. Feel free to ask about his specific projects, technical skills, credentials, or how to contact him!";
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = inputVal.trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsLoading(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          localTime: new Date().toISOString()
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      const botReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: data.reply || getOfflineAnswer(text),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botReply]);
    } catch {
      // Gracefully answer using internal portfolio knowledge base
      const fallbackReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: getOfflineAnswer(text),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
          color: '#ffffff',
          boxShadow: '0 8px 30px rgba(37, 99, 235, 0.45)'
        }}
        aria-label="Toggle Portfolio AI Assistant"
        title="Open AI Assistant"
      >
        <Bot className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-40 w-[92vw] sm:w-[380px] h-[520px] max-h-[80vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden modal-box-anim"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--panel-border)'
          }}
        >
          {/* Header */}
          <div
            className="p-4 flex items-center justify-between border-b"
            style={{
              background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(124, 58, 237, 0.15))',
              borderColor: 'var(--panel-border)'
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white shadow">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="text-sm font-bold leading-tight" style={{ color: 'var(--text-main)' }}>
                  Portfolio AI
                </h3>
                <span className="text-xs opacity-70" style={{ color: 'var(--text-muted)' }}>
                  Sathwik's Assistant
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
              style={{ color: 'var(--text-muted)' }}
              aria-label="Close Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[85%] p-3 rounded-xl text-xs md:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'ml-auto bg-blue-600 text-white rounded-br-xs'
                    : 'mr-auto rounded-bl-xs border'
                }`}
                style={
                  msg.sender === 'bot'
                    ? {
                        backgroundColor: 'var(--panel)',
                        borderColor: 'var(--panel-border)',
                        color: 'var(--text-main)'
                      }
                    : undefined
                }
              >
                {msg.text}
              </div>
            ))}

            {isLoading && (
              <div
                className="mr-auto p-3 rounded-xl rounded-bl-xs border text-xs italic flex items-center gap-2"
                style={{
                  backgroundColor: 'var(--panel)',
                  borderColor: 'var(--panel-border)',
                  color: 'var(--text-muted)'
                }}
              >
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
                Thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={handleSend}
            className="p-3 border-t flex items-center gap-2"
            style={{
              borderColor: 'var(--panel-border)',
              backgroundColor: 'var(--bg-color)'
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask me something..."
              className="flex-1 px-3 py-2 text-xs md:text-sm rounded-lg border outline-none transition-colors"
              style={{
                backgroundColor: 'var(--panel)',
                borderColor: 'var(--panel-border)',
                color: 'var(--text-main)'
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !inputVal.trim()}
              className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 transition-colors cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
