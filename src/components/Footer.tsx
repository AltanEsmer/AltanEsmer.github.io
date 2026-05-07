import { GitFork, ExternalLink, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-6 bg-bg">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-4 text-center">
        {/* ASCII art — hidden on mobile */}
        <pre className="font-mono text-xs text-port-text/20 hidden sm:block leading-tight select-none overflow-x-auto">
          {`  ___  _  _____  ___  _  _     ___  __  __  __  __  ___  ___
 | _ \\| ||_   _|/ _ \\| \\| |   | __|/ _||  \\/  || __|| _ \\/ __|
 |   /| |__| | | (_) | .\` | _ | _| \\_ \\| |\\/| || _| |   /\\__ \\
 |_|_\\|____|_|  \\___/|_|\\_|(_)|___|___/|_|  |_||___||_|_\\|___/`}
        </pre>

        {/* Always-visible name */}
        <span className="gradient-text font-bold text-xl">Altan Esmer</span>

        {/* Social links */}
        <ul className="flex items-center gap-6 text-port-text/50">
          <li>
            <a
              href="https://github.com/AltanEsmer"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-port-text transition-colors text-sm font-mono"
            >
              <GitFork size={14} />
              GitHub
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-1.5 hover:text-port-text transition-colors text-sm font-mono"
            >
              <ExternalLink size={14} />
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href="mailto:esmeraltan@gmail.com"
              className="flex items-center gap-1.5 hover:text-port-text transition-colors text-sm font-mono"
            >
              <Mail size={14} />
              Email
            </a>
          </li>
        </ul>

        {/* Copyright */}
        <p className="text-port-text/40 text-sm font-mono mt-4">
          © 2026 Altan Esmer · Crafted with 🧠 and TypeScript
        </p>
      </div>
    </footer>
  );
}
