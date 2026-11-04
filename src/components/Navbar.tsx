import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Operating Systems', path: '/operating-systems' },
    { name: 'Resume', path: '/resume' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="sticky top-0 w-full z-50 backdrop-blur-md transition-colors duration-300 border-b"
      style={{
        backgroundColor: 'var(--nav-bg)',
        borderColor: 'var(--nav-border)'
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <NavLink
          to="/"
          className="text-2xl font-extrabold tracking-tight transition-transform hover:scale-105"
          style={{ color: 'var(--text-main)' }}
        >
          SG.
        </NavLink>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:opacity-100 ${
                  isActive ? 'font-semibold' : 'opacity-70'
                }`
              }
              style={({ isActive }) => ({
                color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
                borderBottom: isActive ? '2px solid var(--accent)' : 'none',
                paddingBottom: '2px'
              })}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-all hover:scale-110 cursor-pointer flex items-center justify-center"
            style={{
              backgroundColor: 'var(--panel)',
              color: 'var(--text-main)',
              border: '1px solid var(--panel-border)'
            }}
            aria-label="Toggle Theme"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-600" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg cursor-pointer"
            style={{ color: 'var(--text-main)' }}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="md:hidden px-6 pt-2 pb-6 border-b flex flex-col gap-4 animate-fadeIn"
          style={{
            backgroundColor: 'var(--nav-bg)',
            borderColor: 'var(--nav-border)'
          }}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `py-2 text-base font-medium transition-colors ${
                  isActive ? 'font-bold' : 'opacity-75'
                }`
              }
              style={({ isActive }) => ({
                color: isActive ? 'var(--accent)' : 'var(--text-main)'
              })}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};
