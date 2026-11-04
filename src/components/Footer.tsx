import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full mt-auto py-8 border-t transition-colors duration-300"
      style={{
        borderColor: 'var(--nav-border)',
        backgroundColor: 'var(--bg-color)'
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm"
        style={{ color: 'var(--text-muted)' }}
      >
        <div className="text-center sm:text-left">
          &copy; {currentYear} Sathwik Ganji. All rights reserved.
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/sathwik-svg"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-100 transition-opacity"
            style={{ color: 'var(--text-main)' }}
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/sathwik-svg/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-100 transition-opacity"
            style={{ color: 'var(--text-main)' }}
          >
            LinkedIn
          </a>
          <a
            href="https://twitter.com/sathwik-svg"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-100 transition-opacity"
            style={{ color: 'var(--text-main)' }}
          >
            Twitter / X
          </a>
          <a
            href="https://instagram.com/sathwik-svg"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-100 transition-opacity"
            style={{ color: 'var(--text-main)' }}
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};
