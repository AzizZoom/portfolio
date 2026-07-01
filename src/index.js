import initScrollReveal from "./scripts/scrollReveal";
import initTiltEffect from "./scripts/tiltAnimation";
import { targetElements, defaultProps } from "./data/scrollRevealConfig";

// 1. Initialize core template animations
initScrollReveal(targetElements, defaultProps);
initTiltEffect();

// 2. Master System-Aware Dark Mode State Orchestrator
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  if (!themeToggle) return;

  // Establish a live query interface for the device theme channel
  const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

  // Unified theme evaluation function
  const evaluateAndApplyTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    
    // Fallback to system matching rules if no explicit manual preference key is locked
    if (savedTheme === 'dark' || (!savedTheme && systemThemeQuery.matches)) {
      body.classList.add('dark-theme');
      themeToggle.textContent = 'Switch to Light Mode';
    } else {
      body.classList.remove('dark-theme');
      themeToggle.textContent = 'Switch to Dark Mode';
    }
  };

  // Run evaluation once on DOM readiness initialization
  evaluateAndApplyTheme();

  // Manual Overrides Click Event Listener
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    
    if (body.classList.contains('dark-theme')) {
      localStorage.setItem('theme', 'dark');
      themeToggle.textContent = 'Switch to Light Mode';
    } else {
      localStorage.setItem('theme', 'light');
      themeToggle.textContent = 'Switch to Dark Mode';
    }
  });

  // 🚀 LIVE LISTENER: Catches OS/Browser theme changes instantly without a refresh
  systemThemeQuery.addEventListener('change', () => {
    // Only trigger automatic tracking if the visitor has not locked a manual preference
    if (!localStorage.getItem('theme')) {
      evaluateAndApplyTheme();
    }
  });
});