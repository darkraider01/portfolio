import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Briefcase, GraduationCap, Award } from 'lucide-react';

const experience = [
  {
    title: 'ML Intern',
    company: 'KnackTech',
    period: 'Dec 2024 - Feb 2025',
    description: 'Worked remotely on machine learning solutions.',
    achievements: [
      'Developed ML solutions remotely'
    ]
  },
  {
    title: 'ML Intern',
    company: 'Unified Mentor',
    period: 'Feb 2025 - April 2025',
    description: 'Contributed remotely to machine learning projects.',
    achievements: [
      'Contributed to ML projects remotely'
    ]
  }
];

const education = [
  {
    degree: 'Bachelors in Technology',
    school: 'Confidential', // Masking sensitive information
    period: 'July 2023 - July 2027',
    
  },
  {
    degree: 'Schooling',
    school: 'Confidential', // Masking sensitive information
    period: '2020 (ICSE), 2023 (ISC)',
    
  }
];

const skills = {
  'Programming Languages': ['Java', 'Python', 'Solidity', 'Rust','JavaScript'],
  'Core Concepts': ['DSA', 'Cybersecurity', 'Blockchain', 'ML/DL Development', 'LLM Development'],
  'Soft Skills': ['Innovation and Collaboration', 'Problem Solving', 'Communication', 'Team Collaboration'],
  'Other Interests': ['Open Source Contributions', 'Arch Linux']
};

const awards = [
  '3rd Runner up in FIFS Gameathon 2025 (March 2025)'
];

export function Resume() {
  const [viewMode, setViewMode] = useState<'terminal'>('terminal');

  return (
    <div className="min-h-screen pt-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-dot close"></div>
            <div className="terminal-dot minimize"></div>
            <div className="terminal-dot maximize"></div>
            <span className="ml-4 text-sm">brandy@portfolio: ~/resume</span>
          </div>
          
          <div className="p-8">
            <div className="mb-6">
              <div className="text-[var(--terminal-accent)] mb-4">$ cat resume.md</div>
              
              {/* View Mode Toggle */}
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={() => setViewMode('terminal')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    viewMode === 'terminal' 
                      ? 'bg-[var(--terminal-accent)] text-[var(--terminal-bg)]' 
                      : 'bg-[var(--nord3)] hover:bg-[var(--nord2)]'
                  }`}
                >
                  <Code size={16} />
                  Terminal View
                </button>
              </div>
            </div>

            <div className="space-y-8">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center space-y-2"
                >
                  <h1 className="text-3xl font-bold text-[var(--terminal-accent)]">BrandyBuck</h1>
                  <p className="text-lg text-[var(--nord4)]">AI/ML & Blockchain Developer</p>
                  <div className="flex justify-center gap-4 text-sm">
                    <span>📧 darkraider0111@gmail.com</span>
                    <span>📱 7605891779</span>
                    <span>📍  India</span>
                  </div>
                </motion.div>

                {/* Skills */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="text-xl font-bold text-[var(--terminal-accent)] mb-4 flex items-center gap-2">
                    <Code size={20} />
                    Skills
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(skills).map(([category, items]) => (
                      <div key={category} className="glass-card">
                        <h3 className="font-bold text-[var(--terminal-fg)] mb-2">{category}</h3>
                        <div className="flex flex-wrap gap-2">
                          {items.map((skill) => (
                            <span 
                              key={skill}
                              className="px-2 py-1 text-xs bg-[var(--nord3)] rounded"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.section>

                {/* Experience */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-xl font-bold text-[var(--terminal-accent)] mb-4 flex items-center gap-2">
                    <Briefcase size={20} />
                    Experience
                  </h2>
                  <div className="space-y-6">
                    {experience.map((job, index) => (
                      <div key={index} className="glass-card">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-[var(--terminal-fg)]">{job.title}</h3>
                          <span className="text-sm text-[var(--nord4)]">{job.period}</span>
                        </div>
                        <p className="text-[var(--terminal-accent)] mb-2">{job.company}</p>
                        <p className="text-[var(--nord4)] mb-3">{job.description}</p>
                        <ul className="space-y-1">
                          {job.achievements.map((achievement, i) => (
                            <li key={i} className="text-sm text-[var(--nord4)] flex items-start gap-2">
                              <span className="text-[var(--terminal-success)]">•</span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.section>

                {/* Education */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-xl font-bold text-[var(--terminal-accent)] mb-4 flex items-center gap-2">
                    <GraduationCap size={20} />
                    Education
                  </h2>
                  <div className="space-y-4">
                    {education.map((edu, index) => (
                      <div key={index} className="glass-card">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-[var(--terminal-fg)]">{edu.degree}</h3>
                            <p className="text-[var(--terminal-accent)]">{edu.school}</p>
                          </div>
                          <span className="text-sm text-[var(--nord4)]">{edu.period}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.section>

                {/* Awards */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h2 className="text-xl font-bold text-[var(--terminal-accent)] mb-4 flex items-center gap-2">
                    <Award size={20} />
                    Awards
                  </h2>
                  <div className="glass-card">
                    <ul className="space-y-2">
                      {awards.map((award, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="text-[var(--terminal-warning)]">🏆</span>
                          <span className="text-[var(--terminal-fg)]">{award}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.section>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
