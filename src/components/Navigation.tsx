import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal } from 'lucide-react';

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-[var(--nord3)]">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-[var(--terminal-accent)] hover:text-[var(--nord9)] transition-colors">
            <Terminal size={24} />
            <span className="font-bold text-lg">PortfolioOS</span>
          </Link>
          
          <div className="text-sm text-[var(--nord4)]">
            Type <code className="bg-[var(--nord3)] px-1 rounded">help</code> in terminal for navigation
          </div>
        </div>
      </div>
    </nav>
  );
}