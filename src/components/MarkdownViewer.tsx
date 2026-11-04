import React, { useState } from 'react';
import { Copy, Check, FileText, ExternalLink } from 'lucide-react';

interface MarkdownViewerProps {
  content: string;
  repoName?: string;
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content, repoName }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyRaw = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to parse inline styles (bold, italic, code, links, images)
  const renderInline = (text: string): React.ReactNode => {
    // Process markdown badges / linked images: [![Alt](imgSrc)](linkUrl)
    const linkedImageRegex = /\[!\[(.*?)\]\((.*?)\)\]\((.*?)\)/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    // Check for linked badges
    if (linkedImageRegex.test(text)) {
      linkedImageRegex.lastIndex = 0;
      while ((match = linkedImageRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          parts.push(renderSimpleInline(text.substring(lastIndex, match.index)));
        }
        const alt = match[1];
        const imgSrc = match[2];
        const linkUrl = match[3];
        parts.push(
          <a
            key={`badge-${match.index}`}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mr-1.5 mb-1.5 hover:opacity-85 transition-opacity"
          >
            <img src={imgSrc} alt={alt} className="inline h-5 rounded" />
          </a>
        );
        lastIndex = linkedImageRegex.lastIndex;
      }
      if (lastIndex < text.length) {
        parts.push(renderSimpleInline(text.substring(lastIndex)));
      }
      return parts;
    }

    return renderSimpleInline(text);
  };

  const renderSimpleInline = (text: string): React.ReactNode => {
    // Standard images: ![Alt](url)
    // Links: [Text](url)
    // Bold: **text**
    // Inline code: `text`
    const tokenRegex = /(!?\[(.*?)\]\((.*?)\)|\*\*(.*?)\*\*|`([^`]+)`)/g;
    const elements: React.ReactNode[] = [];
    let lastIdx = 0;
    let match: RegExpExecArray | null;

    while ((match = tokenRegex.exec(text)) !== null) {
      if (match.index > lastIdx) {
        elements.push(text.substring(lastIdx, match.index));
      }

      if (match[1].startsWith('![')) {
        // Image
        const alt = match[2];
        const src = match[3];
        elements.push(
          <img
            key={`img-${match.index}`}
            src={src}
            alt={alt}
            className="inline-block max-w-full my-1 rounded border border-white/10"
          />
        );
      } else if (match[1].startsWith('[')) {
        // Link
        const label = match[2];
        const href = match[3];
        elements.push(
          <a
            key={`link-${match.index}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 hover:text-sky-300 underline underline-offset-2 font-medium"
          >
            {label}
          </a>
        );
      } else if (match[4]) {
        // Bold
        elements.push(
          <strong key={`bold-${match.index}`} className="font-bold text-white">
            {match[4]}
          </strong>
        );
      } else if (match[5]) {
        // Inline code
        elements.push(
          <code
            key={`code-${match.index}`}
            className="px-1.5 py-0.5 rounded text-xs font-mono bg-white/10 text-amber-300 border border-white/10"
          >
            {match[5]}
          </code>
        );
      }

      lastIdx = tokenRegex.lastIndex;
    }

    if (lastIdx < text.length) {
      elements.push(text.substring(lastIdx));
    }

    return elements.length > 0 ? elements : text;
  };

  // Split lines into structured blocks
  const lines = content.split('\n');
  const renderedBlocks: React.ReactNode[] = [];

  let inCodeBlock = false;
  let codeBlockLang = '';
  let codeBlockLines: string[] = [];

  let inTable = false;
  let tableRows: string[][] = [];

  const flushCodeBlock = (key: number) => {
    const codeContent = codeBlockLines.join('\n');
    renderedBlocks.push(
      <div key={`code-block-${key}`} className="my-4 rounded-xl border border-sky-400/20 bg-slate-950/70 overflow-hidden shadow-inner">
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5 text-[11px] font-mono text-gray-400">
          <span>{codeBlockLang || 'text'}</span>
          <button
            onClick={() => navigator.clipboard.writeText(codeContent)}
            className="hover:text-white transition-colors cursor-pointer"
            title="Copy code"
          >
            Copy
          </button>
        </div>
        <pre className="p-4 font-mono text-xs md:text-sm text-sky-200 overflow-x-auto whitespace-pre leading-relaxed">
          {codeContent}
        </pre>
      </div>
    );
    codeBlockLines = [];
    codeBlockLang = '';
  };

  const flushTable = (key: number) => {
    if (tableRows.length > 0) {
      const header = tableRows[0];
      const rows = tableRows.slice(1).filter((r) => !r.every((c) => /^[-:| ]+$/.test(c)));

      renderedBlocks.push(
        <div key={`table-${key}`} className="my-4 overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                {header.map((col, idx) => (
                  <th key={idx} className="p-2.5 font-bold text-white">
                    {renderInline(col.trim())}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rIdx) => (
                <tr key={rIdx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="p-2.5 text-gray-300">
                      {renderInline(cell.trim())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    tableRows = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Handle Code Fences
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        flushCodeBlock(i);
        inCodeBlock = false;
      } else {
        if (inTable) {
          flushTable(i);
          inTable = false;
        }
        inCodeBlock = true;
        codeBlockLang = line.trim().replace(/^```/, '').trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      continue;
    }

    // Handle Tables
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      inTable = true;
      const cells = line
        .trim()
        .slice(1, -1)
        .split('|');
      tableRows.push(cells);
      continue;
    } else if (inTable) {
      flushTable(i);
      inTable = false;
    }

    // Blank lines
    if (!line.trim()) {
      continue;
    }

    // Horizontal Rule
    if (/^(\*\*\*|---|___)$/.test(line.trim())) {
      renderedBlocks.push(
        <hr key={`hr-${i}`} className="my-6 border-white/10" />
      );
      continue;
    }

    // Headings
    if (line.startsWith('# ')) {
      renderedBlocks.push(
        <h1 key={`h1-${i}`} className="text-2xl md:text-3xl font-extrabold text-white mt-6 mb-3 pb-2 border-b border-white/10">
          {renderInline(line.replace('# ', ''))}
        </h1>
      );
      continue;
    }
    if (line.startsWith('## ')) {
      renderedBlocks.push(
        <h2 key={`h2-${i}`} className="text-xl md:text-2xl font-bold text-amber-300 mt-6 mb-2.5">
          {renderInline(line.replace('## ', ''))}
        </h2>
      );
      continue;
    }
    if (line.startsWith('### ')) {
      renderedBlocks.push(
        <h3 key={`h3-${i}`} className="text-lg md:text-xl font-bold text-sky-300 mt-5 mb-2">
          {renderInline(line.replace('### ', ''))}
        </h3>
      );
      continue;
    }
    if (line.startsWith('#### ')) {
      renderedBlocks.push(
        <h4 key={`h4-${i}`} className="text-base font-semibold text-gray-200 mt-4 mb-1.5">
          {renderInline(line.replace('#### ', ''))}
        </h4>
      );
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      renderedBlocks.push(
        <blockquote
          key={`quote-${i}`}
          className="my-3 pl-4 py-1.5 border-l-4 border-amber-500 bg-amber-500/5 text-gray-300 italic text-xs md:text-sm rounded-r"
        >
          {renderInline(line.replace(/^>\s*/, ''))}
        </blockquote>
      );
      continue;
    }

    // Bullet List
    if (/^(\*|-)\s+/.test(line.trim())) {
      renderedBlocks.push(
        <div key={`li-${i}`} className="flex items-start gap-2 my-1 text-xs md:text-sm text-gray-300 pl-2">
          <span className="text-amber-400 font-bold shrink-0 mt-0.5">•</span>
          <span className="flex-1">{renderInline(line.trim().replace(/^(\*|-)\s+/, ''))}</span>
        </div>
      );
      continue;
    }

    // Numbered List
    if (/^\d+\.\s+/.test(line.trim())) {
      const num = line.trim().match(/^(\d+)\.\s+/)?.[1] || '1';
      renderedBlocks.push(
        <div key={`oli-${i}`} className="flex items-start gap-2 my-1 text-xs md:text-sm text-gray-300 pl-2">
          <span className="font-mono text-xs text-sky-400 font-bold shrink-0 mt-0.5">{num}.</span>
          <span className="flex-1">{renderInline(line.trim().replace(/^\d+\.\s+/, ''))}</span>
        </div>
      );
      continue;
    }

    // Regular Paragraph
    renderedBlocks.push(
      <p key={`p-${i}`} className="my-2.5 text-xs md:text-sm text-gray-300 leading-relaxed">
        {renderInline(line)}
      </p>
    );
  }

  if (inCodeBlock) flushCodeBlock(lines.length);
  if (inTable) flushTable(lines.length);

  return (
    <div className="relative">
      {/* Top Header of Markdown Container */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
          <FileText className="w-4 h-4 text-amber-400" />
          <span>README.md</span>
          {repoName && <span className="opacity-60">({repoName})</span>}
        </div>

        <button
          onClick={handleCopyRaw}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-medium text-gray-300 transition-colors cursor-pointer"
          title="Copy raw markdown"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Markdown</span>
            </>
          )}
        </button>
      </div>

      {/* Rendered Markdown Body */}
      <div className="prose prose-invert max-w-none text-left">
        {renderedBlocks}
      </div>
    </div>
  );
};
