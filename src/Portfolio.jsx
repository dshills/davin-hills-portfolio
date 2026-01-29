import React, { useState, useEffect, useRef } from 'react';
import articles from './data/articles.json';
import openSourceProjects from './data/repos.json';

const themes = {
  dark: {
    name: 'Dark',
    bgPrimary: '#0a0a0b',
    bgSecondary: '#111113',
    bgTertiary: '#18181b',
    accent: '#d4a853',
    accentGlow: '#f5c96320',
    textPrimary: '#fafafa',
    textSecondary: '#a1a1aa',
    textMuted: '#52525b',
    border: '#27272a',
  },
  light: {
    name: 'Light',
    bgPrimary: '#fafafa',
    bgSecondary: '#f4f4f5',
    bgTertiary: '#e4e4e7',
    accent: '#b8860b',
    accentGlow: '#b8860b20',
    textPrimary: '#18181b',
    textSecondary: '#52525b',
    textMuted: '#a1a1aa',
    border: '#d4d4d8',
  },
  forest: {
    name: 'Forest',
    bgPrimary: '#0a0f0a',
    bgSecondary: '#0f1a0f',
    bgTertiary: '#1a2a1a',
    accent: '#7cb342',
    accentGlow: '#7cb34220',
    textPrimary: '#e8f5e9',
    textSecondary: '#a5d6a7',
    textMuted: '#4a6a4a',
    border: '#2e4a2e',
  },
  warm: {
    name: 'Warm',
    bgPrimary: '#0f0a0a',
    bgSecondary: '#1a0f0f',
    bgTertiary: '#2a1a1a',
    accent: '#e57373',
    accentGlow: '#e5737320',
    textPrimary: '#fce4ec',
    textSecondary: '#f8bbd9',
    textMuted: '#6a4a4a',
    border: '#4a2e2e',
  },
  tokyonight: {
    name: 'Tokyo Night',
    bgPrimary: '#1a1b26',
    bgSecondary: '#16161e',
    bgTertiary: '#292e42',
    accent: '#7aa2f7',
    accentGlow: '#7aa2f720',
    textPrimary: '#c0caf5',
    textSecondary: '#a9b1d6',
    textMuted: '#565f89',
    border: '#292e42',
  },
};

const Portfolio = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('hero');
  const [theme, setTheme] = useState('tokyonight');
  const currentTheme = themes[theme];
  const heroRef = useRef(null);
  const opensourceRef = useRef(null);
  const articlesRef = useRef(null);
  const experienceRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouse);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const experience = [
    { role: 'Architect / Engineer / Fractional CTO', company: 'Hills Consulting', domain: 'hillsconsulting.com', period: '2026 — Present', focus: 'Consulting' },
    { role: 'Chief Technology Officer', company: 'Alopex', domain: 'alopexcare.com', period: '2024 — 2026', focus: 'Healthcare IT' },
    { role: 'Senior Engineer', company: 'Experient', domain: 'experientgroup.com', period: '2023 — 2024', focus: 'Business Integrations' },
    { role: 'Principal Engineer -> Director Enterprise Architecture', company: 'ConnectRN', domain: 'connectrn.com', period: '2021 — 2023', focus: 'Healthcare IT' },
    { role: 'Fractional CTO', company: 'Hills Consulting LLC', domain: 'hillsconsulting.com', period: '2015 — 2021', focus: 'Healthcare Tech' },
    { role: 'Chief Technology Officer', company: 'BettrLife Inc', domain: 'bettrlife.com', period: '2010 — 2015', focus: 'Mobile Health' },
    { role: 'VP Operations', company: 'Eclipsys Corporation', domain: 'eclipsys.com', period: 'Earlier', focus: 'Practice Solutions' },
    { role: 'SVP Operations → Chief Architect', company: 'MediNotes Corporation', domain: 'medinotes.com', period: 'Earlier', focus: 'Healthcare IT' },
  ];

  return (
    <div className="portfolio-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;900&family=JetBrains+Mono:wght@300;400;500&family=Sora:wght@300;400;500;600&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        :root {
          --bg-primary: ${currentTheme.bgPrimary};
          --bg-secondary: ${currentTheme.bgSecondary};
          --bg-tertiary: ${currentTheme.bgTertiary};
          --accent: ${currentTheme.accent};
          --accent-glow: ${currentTheme.accentGlow};
          --text-primary: ${currentTheme.textPrimary};
          --text-secondary: ${currentTheme.textSecondary};
          --text-muted: ${currentTheme.textMuted};
          --border: ${currentTheme.border};
        }

        .portfolio-root {
          background: var(--bg-primary);
          color: var(--text-primary);
          font-family: 'Sora', sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
          cursor: none;
        }

        .custom-cursor {
          position: fixed;
          width: 20px;
          height: 20px;
          border: 2px solid var(--accent);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transition: transform 0.15s ease, opacity 0.15s ease;
          mix-blend-mode: difference;
        }

        .cursor-dot {
          position: fixed;
          width: 6px;
          height: 6px;
          background: var(--accent);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
        }

        .noise-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.03;
          pointer-events: none;
          z-index: 1000;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        .gradient-orb {
          position: fixed;
          width: 800px;
          height: 800px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
          transition: transform 0.3s ease-out;
        }

        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          padding: 2rem 4rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 100;
          mix-blend-mode: difference;
          gap: 2rem;
        }

        .nav-logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .nav-links {
          display: flex;
          gap: 3rem;
          flex: 1;
          justify-content: flex-end;
        }

        .nav-link {
          font-size: 0.85rem;
          font-weight: 400;
          color: var(--text-secondary);
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: color 0.3s ease;
          cursor: none;
          background: none;
          border: none;
          padding: 0;
          font-family: inherit;
        }

        .nav-link:hover {
          color: var(--text-primary);
        }

        .theme-select {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          border: 1px solid var(--border);
          padding: 0.5rem 1rem;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .theme-select:hover {
          border-color: var(--accent);
          color: var(--text-primary);
        }

        .theme-select:focus {
          outline: none;
          border-color: var(--accent);
        }

        .theme-select option {
          background: var(--bg-tertiary);
          color: var(--text-primary);
        }

        section {
          position: relative;
          z-index: 1;
          scroll-margin-top: 100px;
        }

        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 4rem;
          position: relative;
        }

        .hero-content {
          max-width: 1400px;
        }

        .hero-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          color: var(--accent);
          text-transform: uppercase;
          letter-spacing: 0.3em;
          margin-bottom: 2rem;
          opacity: 0;
          animation: fadeSlideUp 1s ease forwards;
          animation-delay: 0.2s;
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(4rem, 12vw, 10rem);
          font-weight: 900;
          line-height: 0.9;
          letter-spacing: -0.03em;
          margin-bottom: 2rem;
        }

        .hero-title span {
          display: block;
          opacity: 0;
          animation: fadeSlideUp 1s ease forwards;
        }

        .hero-title span:nth-child(1) { animation-delay: 0.4s; }
        .hero-title span:nth-child(2) { animation-delay: 0.6s; }

        .hero-title .accent {
          color: var(--accent);
          font-style: italic;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--text-secondary);
          max-width: 600px;
          line-height: 1.8;
          opacity: 0;
          animation: fadeSlideUp 1s ease forwards;
          animation-delay: 0.8s;
        }

        .hero-scroll-indicator {
          position: absolute;
          bottom: 4rem;
          left: 4rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.2em;
        }

        .scroll-line {
          width: 60px;
          height: 1px;
          background: var(--border);
          position: relative;
          overflow: hidden;
        }

        .scroll-line::after {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: var(--accent);
          animation: scrollPulse 2s ease-in-out infinite;
        }

        @keyframes scrollPulse {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }

        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .section-header {
          padding: 8rem 4rem 4rem;
          position: relative;
        }

        .section-number {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          color: var(--accent);
          letter-spacing: 0.2em;
          margin-bottom: 1rem;
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .section-line {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, var(--accent), transparent);
          margin-top: 2rem;
        }

        .opensource-section {
          background: var(--bg-secondary);
        }

        .projects-grid {
          padding: 0 4rem 8rem;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }

        .project-card {
          display: block;
          text-decoration: none;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
          cursor: none;
        }

        .project-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: var(--accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }

        .project-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent);
        }

        .project-card:hover::before {
          transform: scaleX(1);
        }

        .project-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .project-tags {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .project-lang {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          color: var(--accent);
          padding: 0.25rem 0.75rem;
          border: 1px solid var(--accent);
          border-radius: 2px;
        }

        .project-featured {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          color: var(--bg-primary);
          background: var(--accent);
          padding: 0.25rem 0.5rem;
          border-radius: 2px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .project-stars {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .project-name {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1.5rem;
          font-weight: 500;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .project-desc {
          color: var(--text-secondary);
          line-height: 1.7;
          font-size: 0.95rem;
        }

        .project-thumbnail {
          width: 100%;
          height: 140px;
          object-fit: cover;
          border-radius: 4px;
          margin-bottom: 1.5rem;
          border: 1px solid var(--border);
          transition: border-color 0.3s ease;
        }

        .project-card:hover .project-thumbnail {
          border-color: var(--accent);
        }

        .articles-section {
          background: var(--bg-primary);
        }

        .articles-list {
          padding: 0 4rem 8rem;
        }

        .article-item {
          display: grid;
          grid-template-columns: 120px 1fr auto auto;
          gap: 2rem;
          align-items: center;
          padding: 2rem 0;
          border-bottom: 1px solid var(--border);
          transition: all 0.3s ease;
          cursor: none;
          text-decoration: none;
          color: inherit;
        }

        .article-item:hover {
          padding-left: 1rem;
          border-color: var(--accent);
        }

        .article-item:hover .article-title {
          color: var(--accent);
        }

        .article-thumbnail {
          width: 120px;
          height: 80px;
          object-fit: cover;
          border-radius: 4px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          transition: border-color 0.3s ease;
        }

        .article-item:hover .article-thumbnail {
          border-color: var(--accent);
        }

        .article-thumbnail-placeholder {
          width: 120px;
          height: 80px;
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          font-size: 1.5rem;
        }

        .article-content {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .article-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          color: var(--accent);
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }

        .article-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.75rem;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .article-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.25rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .article-reads {
          color: var(--text-secondary);
        }

        .article-arrow {
          font-size: 2rem;
          color: var(--text-muted);
          transition: all 0.3s ease;
        }

        .article-item:hover .article-arrow {
          color: var(--accent);
          transform: translateX(10px);
        }

        .experience-section {
          background: var(--bg-secondary);
          position: relative;
        }

        .experience-list {
          padding: 0 4rem 8rem;
        }

        .experience-item {
          display: grid;
          grid-template-columns: 200px 1fr 200px;
          gap: 4rem;
          padding: 3rem 0;
          border-bottom: 1px solid var(--border);
          position: relative;
        }

        .experience-item::before {
          content: '';
          position: absolute;
          left: 0;
          bottom: -1px;
          width: 0;
          height: 1px;
          background: var(--accent);
          transition: width 0.6s ease;
        }

        .experience-item:hover::before {
          width: 100%;
        }

        .experience-period {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .experience-main {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .experience-logo {
          width: 48px;
          height: 48px;
          object-fit: contain;
          border-radius: 8px;
          background: #fff;
          padding: 6px;
          flex-shrink: 0;
        }

        .experience-content h3 {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .experience-content .company {
          color: var(--accent);
          font-size: 1.1rem;
        }

        .experience-focus {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          color: var(--text-secondary);
          text-align: right;
          padding: 0.5rem 1rem;
          border: 1px solid var(--border);
          align-self: flex-start;
        }

        .footer {
          padding: 8rem 4rem;
          text-align: center;
          position: relative;
          scroll-margin-top: 100px;
        }

        .footer-cta {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 600;
          margin-bottom: 3rem;
        }

        .footer-cta .accent {
          color: var(--accent);
          font-style: italic;
        }

        .footer-links {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-bottom: 4rem;
        }

        .footer-link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          color: var(--text-secondary);
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 1rem 2rem;
          border: 1px solid var(--border);
          transition: all 0.3s ease;
          cursor: none;
        }

        .footer-link:hover {
          color: var(--bg-primary);
          background: var(--accent);
          border-color: var(--accent);
        }

        .footer-copyright {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        @media (max-width: 1024px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }

          .article-item {
            grid-template-columns: 100px 1fr auto;
            gap: 1.5rem;
          }

          .article-thumbnail,
          .article-thumbnail-placeholder {
            width: 100px;
            height: 66px;
          }

          .article-arrow {
            display: none;
          }

          .experience-item {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .experience-logo {
            width: 40px;
            height: 40px;
          }

          .experience-focus {
            text-align: left;
            align-self: flex-start;
          }
        }

        @media (max-width: 768px) {
          .nav {
            padding: 1.5rem 2rem;
          }

          .nav-links {
            display: none;
          }

          .hero {
            padding: 0 2rem;
          }

          .section-header,
          .projects-grid,
          .articles-list,
          .experience-list,
          .footer {
            padding-left: 2rem;
            padding-right: 2rem;
          }

          .article-item {
            grid-template-columns: 80px 1fr;
            gap: 1rem;
          }

          .article-thumbnail,
          .article-thumbnail-placeholder {
            width: 80px;
            height: 53px;
          }

          .article-meta {
            display: none;
          }

          .custom-cursor,
          .cursor-dot {
            display: none;
          }

          .portfolio-root {
            cursor: auto;
          }

          .nav-link,
          .nav-link,
          .project-card,
          .article-item,
          .footer-link {
            cursor: pointer;
          }
        }
      `}</style>

      <div className="noise-overlay" />
      
      <div 
        className="gradient-orb"
        style={{
          transform: `translate(${mousePos.x - 400}px, ${mousePos.y - 400}px)`
        }}
      />

      <div 
        className="custom-cursor"
        style={{
          transform: `translate(${mousePos.x - 10}px, ${mousePos.y - 10}px)`
        }}
      />
      <div 
        className="cursor-dot"
        style={{
          transform: `translate(${mousePos.x - 3}px, ${mousePos.y - 3}px)`
        }}
      />

      <nav className="nav">
        <div className="nav-logo">DH</div>
        <div className="nav-links">
          <button onClick={() => scrollToSection('opensource')} className="nav-link">Open Source</button>
          <button onClick={() => scrollToSection('articles')} className="nav-link">Articles</button>
          <button onClick={() => scrollToSection('experience')} className="nav-link">Experience</button>
          <button onClick={() => scrollToSection('contact')} className="nav-link">Contact</button>
        </div>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="theme-select"
        >
          {Object.entries(themes).map(([key, t]) => (
            <option key={key} value={key}>{t.name}</option>
          ))}
        </select>
      </nav>

      <section className="hero" ref={heroRef}>
        <div className="hero-content">
          <p className="hero-eyebrow">Building Intelligent Systems at Scale</p>
          <h1 className="hero-title">
            <span>Davin</span>
            <span><span className="accent">Hills</span></span>
          </h1>
          <p className="hero-subtitle">
            30+ years shipping software—from Chief Architect to CTO to Technical Director. 
            Currently building AI infrastructure and LLM tooling in Go. 
            Drake University, Computerworld Visionary Award winner.
          </p>
        </div>
        <div className="hero-scroll-indicator">
          <div className="scroll-line" />
          <span>Scroll to explore</span>
        </div>
      </section>

      <section className="opensource-section" id="opensource" ref={opensourceRef}>
        <div className="section-header">
          <p className="section-number">01</p>
          <h2 className="section-title">Open Source</h2>
          <div className="section-line" />
        </div>
        <div className="projects-grid">
          {openSourceProjects.map((project, i) => (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-card" key={i}>
              <div className="project-meta">
                <div className="project-tags">
                  <span className="project-lang">{project.lang}</span>
                  {project.featured && <span className="project-featured">Featured</span>}
                </div>
                <span className="project-stars">★ {project.stars}</span>
              </div>
              {project.thumbnail && (
                <img src={project.thumbnail} alt="" className="project-thumbnail" />
              )}
              <h3 className="project-name">{project.name}</h3>
              <p className="project-desc">{project.description}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="articles-section" id="articles" ref={articlesRef}>
        <div className="section-header">
          <p className="section-number">02</p>
          <h2 className="section-title">Writing</h2>
          <div className="section-line" />
        </div>
        <div className="articles-list">
          {articles.map((article, i) => (
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="article-item" key={i}>
              {article.thumbnail ? (
                <img src={article.thumbnail} alt="" className="article-thumbnail" />
              ) : (
                <div className="article-thumbnail-placeholder">✎</div>
              )}
              <div className="article-content">
                <span className="article-tag">{article.tag}</span>
                <h3 className="article-title">{article.title}</h3>
              </div>
              <div className="article-meta">
                <span>{article.date}</span>
              </div>
              <span className="article-arrow">→</span>
            </a>
          ))}
        </div>
      </section>

      <section className="experience-section" id="experience" ref={experienceRef}>
        <div className="section-header">
          <p className="section-number">03</p>
          <h2 className="section-title">Experience</h2>
          <div className="section-line" />
        </div>
        <div className="experience-list">
          {experience.map((exp, i) => (
            <div className="experience-item" key={i}>
              <span className="experience-period">{exp.period}</span>
              <div className="experience-main">
                <img
                  src={`https://www.google.com/s2/favicons?domain=${exp.domain}&sz=128`}
                  alt={`${exp.company} logo`}
                  className="experience-logo"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div className="experience-content">
                  <h3>{exp.role}</h3>
                  <span className="company">{exp.company}</span>
                </div>
              </div>
              <span className="experience-focus">{exp.focus}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer" id="contact">
        <h2 className="footer-cta">
          Let's build something <span className="accent">remarkable</span>
        </h2>
        <div className="footer-links">
          <a href="https://github.com/dshills" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
          <a href="https://dshills.medium.com" target="_blank" rel="noopener noreferrer" className="footer-link">Medium</a>
          <a href="https://linkedin.com/in/dshills" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
        </div>
        <p className="footer-copyright">© 2025 Davin Hills — Hills Consulting, LLC</p>
      </footer>
    </div>
  );
};

export default Portfolio;
