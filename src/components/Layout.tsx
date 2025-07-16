import React from 'react';
import { useLocation } from 'react-router-dom';
import { Navigation } from './Navigation';
import { CommandLine } from './CommandLine';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-[var(--terminal-bg)] text-[var(--terminal-fg)] font-mono">
      {!isHomePage && <Navigation />}
      <main className="pb-20">
        {children}
      </main>
      <CommandLine />
    </div>
  );
}
