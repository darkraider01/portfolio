import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter, MapPin, Coffee, Code, Heart, Download } from 'lucide-react';

const neofetchInfo = [
  { label: 'OS', value: 'PortfolioOS' },
];

const asciiAvatar = `
    ████████████████    
  ██                ██  
██      ████████      ██
██    ██        ██    ██
██  ██  ██    ██  ██  ██
██  ██    ████    ██  ██
██    ██        ██    ██
██      ████████      ██
  ██                ██  
    ████████████████    
`;

const socialLinks = [
  { name: 'GitHub', icon: Github, url: 'https://github.com/darkraider01', color: 'var(--terminal-fg)' },
  { name: 'Twitter', icon: Twitter, url: 'https://x.com/DarkraiderO', color: '#1da1f2' },
  { name: 'Email', icon: Mail, url: 'mailto:ishanghosh0111@gmail.com', color: 'var(--terminal-accent)' },
];

const facts = [
  { icon: Coffee, text: 'Powered by coffee and curiosity' },
  { icon: Code, text: '4+ years of crafting digital experiences' },
  { icon: Heart, text: 'Passionate about cybersecurity and blockchain' },
  { icon: MapPin, text: 'India' },
];

const achievements = [
  { title: 'ML Intern at KnackTech', value: 'Dec 2024 - Feb 2025', description: 'Developed ML solutions remotely' },
  { title: 'ML Intern at Unified Mentor', value: 'Feb 2025 - April 2025', description: 'Contributed to ML projects remotely' },
  { title: '3rd Runner up in FIFS Gameathon 2025', value: 'March 2025', description: 'Awarded for game development' },
  { title: 'Problems Solved', value: '1000+', description: 'Bugs squashed' },
];

export function About() {
  const [displayedInfo, setDisplayedInfo] = useState<typeof neofetchInfo>([]);
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    neofetchInfo.forEach((item, index) => {
      setTimeout(() => {
        setDisplayedInfo(prev => [...prev, item]);
      }, index * 150);
    });
  }, []);

  const downloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:BrandyBuck
ORG: BinaryBandits
EMAIL:ishanghosh0111@gmail.com
NOTE:Passionate about cybersecurity and blockchain, I thrive on building innovative solutions.
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'brandybuck.vcf';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen pt-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-dot close"></div>
            <div className="terminal-dot minimize"></div>
            <div className="terminal-dot maximize"></div>
            <span className="ml-4 text-sm">neofetch</span>
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={() => setIsHighContrast(!isHighContrast)}
                className="text-xs px-2 py-1 bg-[var(--nord3)] hover:bg-[var(--nord2)] rounded transition-colors"
                title="Toggle high contrast mode"
              >
                {isHighContrast ? 'Normal' : 'High Contrast'}
              </button>
            </div>
          </div>
          
          <div className={`p-8 ${isHighContrast ? 'high-contrast' : ''}`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Neofetch Display */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mono"
              >
                <div className="flex gap-6">
                  <div className="text-[var(--terminal-accent)] text-xs leading-tight">
                    <pre>{asciiAvatar}</pre>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="text-[var(--terminal-accent)] font-bold text-lg mb-2">
                      brandy@portfolio
                    </div>
                    <div className="h-px bg-[var(--nord3)] mb-3"></div>
                    {displayedInfo.map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-2 text-sm"
                      >
                        <span className="text-[var(--terminal-accent)] font-bold min-w-[80px]">
                          {item.label}:
                        </span>
                        <span className="text-[var(--terminal-fg)]">{item.value}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* About Content */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold text-[var(--terminal-accent)] mb-4">
                    $ whoami --verbose
                  </h2>
                  <div className="space-y-4 text-[var(--nord4)]">
                    <p>
                      Passionate about cybersecurity and blockchain, I thrive on building innovative solutions both independently and within
                      collaborative teams. Skilled in Solidity, machine learning, and programming with Java and python, I have hands-on
                      experience developing practical security applications.
                    </p>
                    <p>
                      My projects range from AI-driven threat detection systems to decentralized blockchain solutions, where teamwork and
                      problem-solving drive success. Continuously learning and adapting, I enjoy tackling complex challenges in secure
                      systems and automation.
                    </p>
                    <p>
                      Eager to contribute my expertise and enthusiasm to forward-thinking cybersecurity and blockchain organizations.
                    </p>
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h3 className="text-lg font-bold text-[var(--terminal-fg)] mb-3">
                    Achievements
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5 + index * 0.1 }}
                        className="text-center p-3 bg-[var(--nord1)] rounded-lg border border-[var(--nord3)]"
                      >
                        <div className="text-2xl font-bold text-[var(--terminal-accent)]">
                          {achievement.value}
                        </div>
                        <div className="text-sm font-medium text-[var(--terminal-fg)]">
                          {achievement.title}
                        </div>
                        <div className="text-xs text-[var(--nord4)]">
                          {achievement.description}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Fun Facts */}
                <div>
                  <h3 className="text-lg font-bold text-[var(--terminal-fg)] mb-3">
                    Fun Facts
                  </h3>
                  <div className="space-y-2">
                    {facts.map((fact, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <fact.icon size={16} className="text-[var(--terminal-accent)]" />
                        <span className="text-[var(--nord4)]">{fact.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="text-lg font-bold text-[var(--terminal-fg)] mb-3">
                    Connect With Me
                  </h3>
                  <div className="flex gap-4">
                    {socialLinks.map((link, index) => (
                      <motion.a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 + index * 0.1 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 glass-card hover:bg-[var(--nord1)] transition-colors"
                        style={{ borderColor: link.color }}
                        aria-label={`Visit my ${link.name} profile`}
                      >
                        <link.icon size={20} style={{ color: link.color }} />
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Contact Card Download */}
                <motion.button
                  onClick={downloadVCard}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-[var(--terminal-success)] hover:bg-[var(--nord14)] text-[var(--terminal-bg)] rounded-lg transition-colors"
                >
                  <Download size={16} />
                  Download Contact Card
                </motion.button>

                {/* Current Status */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  className="p-4 bg-[var(--nord1)] rounded-lg border border-[var(--nord3)]"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-[var(--terminal-success)] rounded-full animate-pulse"></div>
                    <span className="font-bold text-[var(--terminal-fg)]">Current Status</span>
                  </div>
                  <p className="text-[var(--nord4)] text-sm">
                    🚀 Available for new opportunities | 
                    💡 Always learning something new | 
                    🎯 Building the next big thing
                  </p>
                </motion.div>
              </motion.div>
            </div>

            {/* Terminal Commands */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5 }}
              className="mt-8 p-4 bg-[var(--terminal-bg)] rounded-lg border border-[var(--nord3)]"
            >
              <div className="text-sm text-[var(--nord4)] mb-2">
                Try these commands in the terminal below:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-sm">
                <code className="text-[var(--terminal-accent)]">contact</code>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
