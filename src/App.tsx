import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { AiAssistant } from './components/AiAssistant';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { OperatingSystemsPage } from './pages/OperatingSystemsPage';
import { ResumePage } from './pages/ResumePage';
import { ContactPage } from './pages/ContactPage';
import { ProfilePage } from './pages/ProfilePage';
import { ProjectDetail } from './types';

// Scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Subtle ambient particle background from original motion engine
const AmbientParticles: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-blue-500/20 filter blur-xs animate-pulse"
          style={{
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 6 + 4}s`,
            animationDelay: `${Math.random() * 4}s`
          }}
        />
      ))}
    </div>
  );
};

export const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);

  return (
    <div className="min-h-screen flex flex-col relative transition-colors duration-300">
      <ScrollToTop />
      <AmbientParticles />
      <Navbar />

      <main className="flex-1 flex flex-col z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/projects"
            element={<ProjectsPage onSelectProject={(p) => setSelectedProject(p)} />}
          />
          <Route path="/operating-systems" element={<OperatingSystemsPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      <Footer />

      {/* Deep Architecture Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Floating Portfolio AI Assistant */}
      <AiAssistant />
    </div>
  );
};

export default App;
