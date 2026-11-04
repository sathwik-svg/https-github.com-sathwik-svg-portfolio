import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, Award, Puzzle, MessageCircle, Layers, CheckCircle2 } from 'lucide-react';
import { ChatMessage } from '../types';

export const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'initial',
      text: "Hi! 👋 I'm Sathwik's portfolio AI assistant. I can explain his **achievements**, **cloud projects**, **problem-solving methodology**, and **communication skills**.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickPrompts = [
    { label: '🏆 Achievements', prompt: 'Explain Sathwik’s key achievements and credentials' },
    { label: '🧩 Problem-Solving', prompt: 'Showcase Sathwik’s problem-solving skills and troubleshooting cases' },
    { label: '🗣️ Communication', prompt: 'How does Sathwik demonstrate strong communication and team collaboration?' },
    { label: '🚀 Cloud Projects', prompt: 'What are Sathwik’s top Cloud & DevOps projects and architecture?' },
    { label: '💼 Why Hire Him?', prompt: 'Why should a company hire Sathwik for a Cloud / DevOps Engineer role?' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [isOpen, messages]);

  const sendQuery = async (queryText: string) => {
    const text = queryText.trim();
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
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      const botReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: data.reply,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.warn('API error, using local fallback:', err);
      // Fallback response
      const fallbackReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: `Sathwik Ganji is a Cloud & DevOps Engineer focused on AWS, Kubernetes, Terraform, Docker, and CI/CD automation. He has built production monitoring dashboards, advanced CI/CD pipelines, and verified his skills with AWS credentials on Credly. Feel free to explore his Projects page or contact him directly!`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuery(inputVal);
  };

  // Render basic markdown formatting inside chat bubble
  const renderMessageText = (text: string) => {
    const lines = text.split('\n');
    return (
      <div className="space-y-1">
        {lines.map((line, idx) => {
          if (line.startsWith('### ')) {
            return (
              <h4 key={idx} className="font-bold text-amber-300 text-xs md:text-sm mt-1 mb-0.5">
                {line.replace('### ', '')}
              </h4>
            );
          }
          if (line.startsWith('- ') || line.startsWith('* ')) {
            return (
              <div key={idx} className="flex items-start gap-1.5 pl-1 my-0.5">
                <span className="text-amber-400 font-bold shrink-0">•</span>
                <span>{renderFormattedLine(line.replace(/^[-*]\s+/, ''))}</span>
              </div>
            );
          }
          if (/^\d+\.\s+/.test(line)) {
            return (
              <div key={idx} className="flex items-start gap-1.5 pl-1 my-0.5">
                <span className="text-sky-400 font-mono text-[11px] font-bold shrink-0">
                  {line.match(/^\d+\./)?.[0]}
                </span>
                <span>{renderFormattedLine(line.replace(/^\d+\.\s+/, ''))}</span>
              </div>
            );
          }
          if (!line.trim()) return null;
          return <p key={idx} className="my-0.5">{renderFormattedLine(line)}</p>;
        })}
      </div>
    );
  };

  const renderFormattedLine = (line: string): React.ReactNode => {
    // Process bold (**text**) and links [text](url)
    const regex = /(\*\*(.*?)\*\*|\[(.*?)\]\((.*?)\))/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(line.substring(lastIndex, match.index));
      }
      if (match[2]) {
        parts.push(<strong key={match.index} className="font-bold text-white">{match[2]}</strong>);
      } else if (match[3] && match[4]) {
        parts.push(
          <a
            key={match.index}
            href={match[4]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 underline hover:text-sky-300"
          >
            {match[3]}
          </a>
        );
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < line.length) {
      parts.push(line.substring(lastIndex));
    }

    return parts.length > 0 ? parts : line;
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
          color: '#ffffff',
          boxShadow: '0 8px 30px rgba(37, 99, 235, 0.45)'
        }}
        aria-label="Toggle Portfolio AI Assistant"
        title="Open Sathwik's AI Assistant"
      >
        <Bot className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-4 sm:right-6 z-40 w-[94vw] sm:w-[420px] h-[560px] max-h-[82vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden modal-box-anim"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--panel-border)'
          }}
        >
          {/* Header */}
          <div
            className="p-4 flex items-center justify-between border-b"
            style={{
              background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.2), rgba(124, 58, 237, 0.2))',
              borderColor: 'var(--panel-border)'
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white shadow">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="text-sm font-bold leading-tight" style={{ color: 'var(--text-main)' }}>
                  Sathwik's Portfolio AI
                </h3>
                <span className="text-[11px] opacity-75 text-emerald-400 flex items-center gap-1 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Explaining Achievements &amp; Skills
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

          {/* Quick Explainer Prompts Strip */}
          <div
            className="p-2 border-b flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              borderColor: 'var(--panel-border)'
            }}
          >
            {quickPrompts.map((qp) => (
              <button
                key={qp.label}
                onClick={() => sendQuery(qp.prompt)}
                disabled={isLoading}
                className="px-2.5 py-1 rounded-full border border-white/10 hover:border-amber-400 hover:bg-amber-500/10 transition-colors whitespace-nowrap shrink-0 text-gray-300 hover:text-white cursor-pointer disabled:opacity-50"
              >
                {qp.label}
              </button>
            ))}
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[88%] p-3.5 rounded-xl text-xs md:text-sm leading-relaxed ${
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
                {msg.sender === 'bot' ? renderMessageText(msg.text) : msg.text}
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
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                <span>AI analyzing Sathwik's profile &amp; skills...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={handleFormSubmit}
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
              placeholder="Ask about achievements, skills, projects..."
              className="flex-1 px-3.5 py-2 text-xs md:text-sm rounded-xl border outline-none transition-colors"
              style={{
                backgroundColor: 'var(--panel)',
                borderColor: 'var(--panel-border)',
                color: 'var(--text-main)'
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !inputVal.trim()}
              className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 transition-colors cursor-pointer shadow"
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
