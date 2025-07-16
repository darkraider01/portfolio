import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCommand } from '../contexts/CommandContext';

const bootSequence = [
  '[    0.000000] Booting PortfolioOS...',
  '[    0.123456] Initializing developer.exe',
  '[    0.234567] Loading skills... OK',
  '[    0.345678] Mounting projects filesystem... OK',
  '[    0.456789] Starting creativity daemon... OK',
  '[    0.567890] Enabling problem-solving mode... OK',
  '[    0.678901] Loading passion for technology... OK',
  '[    0.789012] System ready. Welcome to my portfolio!',
];

const asciiArt = `
 ██████  ██████  ██████  ████████ ███████  ██████  ██      ██  ██████   ██████  ███████ 
 ██   ██ ██    ██ ██   ██    ██    ██      ██    ██ ██      ██ ██    ██ ██    ██ ██      
 ██████  ██    ██ ██████     ██    █████   ██    ██ ██      ██ ██    ██ ██    ██ ███████ 
 ██      ██    ██ ██   ██    ██    ██      ██    ██ ██      ██ ██    ██ ██    ██      ██ 
 ██       ██████  ██   ██    ██    ██       ██████  ███████ ██  ██████   ██████  ███████ 
`;

export function Hero() {
  const [bootComplete, setBootComplete] = useState(false);
  const [showAscii, setShowAscii] = useState(false);
  const { executeCommand } = useCommand();

  useEffect(() => {
    const timer = setTimeout(() => {
      setBootComplete(true);
      setTimeout(() => setShowAscii(true), 500);
    }, bootSequence.length * 600);

    return () => clearTimeout(timer);
  }, []);

  const handleCommandClick = (command: string) => {
    executeCommand(command);
  };

  return (
    <div className="min-h-screen pt-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-dot close"></div>
            <div className="terminal-dot minimize"></div>
            <div className="terminal-dot maximize"></div>
            <span className="ml-4 text-sm">brandy@portfolio: ~</span>
          </div>
          
          <div className="p-8 min-h-[70vh]">
            {/* Boot Sequence */}
            <div className="space-y-2 mb-8">
              {bootSequence.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.6 }}
                  className="text-[var(--terminal-success)] text-sm"
                >
                  {line}
                </motion.div>
              ))}
            </div>

            {/* ASCII Art */}
            {showAscii && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="mb-8"
              >
                <pre className="ascii-art text-xs sm:text-sm lg:text-base overflow-x-auto">
                  {asciiArt}
                </pre>
              </motion.div>
            )}

            {/* Main Content */}
            {bootComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <div className="text-lg">
                    <span className="text-[var(--terminal-accent)]">brandy@portfolio</span>
                    <span className="text-[var(--terminal-fg)]">:~$ whoami</span>
                  </div>
                  
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                    <div className="text-[var(--terminal-fg)]">AI/ML & Blockchain Developer</div>
                    <div className="text-[var(--terminal-accent)] terminal-text-glow">
                      & Creative Problem Solver
                    </div>
                  </div>

                  <div className="text-lg text-[var(--nord4)] max-w-2xl">
                    Passionate about cybersecurity and blockchain, I thrive on building innovative solutions both independently and within
                    collaborative teams. Skilled in Solidity, machine learning, and programming with Java and python, I have hands-on
                    experience developing practical security applications.
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                </div>

                <div className="mt-12 p-4 bg-[var(--nord1)] rounded-lg border border-[var(--nord3)]">
                  <div className="text-sm text-[var(--nord4)] mb-2">📄 README.md</div>
                  <div className="space-y-2">
                    <div># BrandyBuck - AI/ML & Blockchain Developer</div>
                    <div className="text-[var(--nord4)]">
                      Welcome to my digital workspace! I'm a passionate developer who loves 
                      building things that matter. When I'm not coding, you'll find me 
                      exploring new technologies, contributing to open source, or sharing 
                      knowledge with the community.
                    </div>
                    <div className="text-[var(--terminal-accent)]">
                      {'>'} Navigate using the terminal below - type 'help' to get started
                    </div>
                    <div className="text-xs text-[var(--nord4)] mt-2">
                      💡 Pro tip: Explore available commands for more information!
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
