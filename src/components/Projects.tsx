import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Folder, FileCode, Star, Search, Filter } from 'lucide-react';

const projects = [
  {
    name: 'Fractal Dimension Analysis on Leaves',
    type: 'directory',
    description: 'Exploring the intersection of computer vision and sustainability',
    tech: ['Python', 'Machine Learning', 'Image Processing'],
    stars: 0,
    github: 'https://github.com/darkraider01/leafFD',
    demo: null,
    details: `Working on fractal dimension (FD) analysis of plant leaves to detect diseases, 
nutrient deficiencies, and drought stress. Using image processing and machine learning, 
I extract FD features to predict plant health with real-world agricultural applications.`,
    category: 'machine-learning'
  },
  {
    name: 'config.json',
    type: 'file',
    description: 'Project configuration and metadata',
    tech: ['JSON'],
    stars: 0,
    github: null,
    demo: null,
    details: 'Configuration file containing project settings and metadata.',
    category: 'config'
  },
];

const techColors: { [key: string]: string } = {
  'Python': '#3776AB',
  'Machine Learning': '#FF6F00',
  'Image Processing': '#00BCD4',
  'Java': '#007396',
  'Solidity': '#363636',
  'Rust': '#DEA584',
  'Blockchain': '#4FC08D',
  'DSA': '#9C27B0',
  'Cybersecurity': '#FFC107',
  'LLM Development': '#8BC34A',
  'Open Source Contributions': '#1976D2',
  'Arch Linux': '#1793D1'
};

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const directories = projects.filter(p => p.type === 'directory');
  const files = projects.filter(p => p.type === 'file');

  // Get all unique technologies
  const allTech = Array.from(new Set(directories.flatMap(p => p.tech))).sort();

  // Filter projects based on search and tech filter
  const filteredDirectories = directories.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTech = !selectedTech || project.tech.includes(selectedTech);
    return matchesSearch && matchesTech;
  });

  const handleProjectClick = (project: typeof projects[0]) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedProject(project);
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen pt-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-dot close"></div>
            <div className="terminal-dot minimize"></div>
            <div className="terminal-dot maximize"></div>
            <span className="ml-4 text-sm">brandy@portfolio: ~/projects</span>
          </div>
          
          <div className="p-8">
            <div className="mb-6">
              <div className="text-[var(--terminal-accent)] mb-2">$ ls -la ~/projects</div>
              <div className="text-sm text-[var(--nord4)] mb-4">
                total {projects.length} items
              </div>

              {/* Search and Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--nord4)]" size={16} />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-[var(--nord1)] border border-[var(--nord3)] rounded-lg text-[var(--terminal-fg)] placeholder-[var(--nord4)] focus:border-[var(--terminal-accent)] focus:outline-none"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--nord4)]" size={16} />
                  <select
                    value={selectedTech}
                    onChange={(e) => setSelectedTech(e.target.value)}
                    className="pl-10 pr-8 py-2 bg-[var(--nord1)] border border-[var(--nord3)] rounded-lg text-[var(--terminal-fg)] focus:border-[var(--terminal-accent)] focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="">All Technologies</option>
                    {allTech.map(tech => (
                      <option key={tech} value={tech}>{tech}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Results count */}
              {(searchTerm || selectedTech) && (
                <div className="text-sm text-[var(--nord4)] mb-4">
                  Found {filteredDirectories.length} project{filteredDirectories.length !== 1 ? 's' : ''}
                  {searchTerm && ` matching "${searchTerm}"`}
                  {selectedTech && ` using ${selectedTech}`}
                </div>
              )}
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--terminal-accent)]"></div>
                <span className="ml-3 text-[var(--nord4)]">Loading project...</span>
              </div>
            )}

            {/* Project List */}
            {!isLoading && (
              <div className="space-y-3 mb-8">
                <AnimatePresence>
                  {filteredDirectories.map((project, index) => (
                    <motion.div
                      key={project.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="group"
                    >
                      <div 
                        className="flex items-center gap-3 p-4 rounded-lg border border-[var(--nord3)] hover:border-[var(--terminal-accent)] transition-all cursor-pointer glass-card"
                        onClick={() => handleProjectClick(project)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleProjectClick(project);
                          }
                        }}
                        aria-label={`View details for ${project.name}`}
                      >
                        <Folder className="text-[var(--nord9)] flex-shrink-0" size={20} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-[var(--terminal-fg)] group-hover:text-[var(--terminal-accent)] transition-colors">
                              {project.name}
                            </span>
                            {project.stars > 0 && (
                              <div className="flex items-center gap-1 text-[var(--terminal-warning)]">
                                <Star size={14} />
                                <span className="text-xs">{project.stars}</span>
                              </div>
                            )}
                          </div>
                          <div className="text-sm text-[var(--nord4)] mb-2">
                            {project.description}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech) => (
                              <span 
                                key={tech}
                                className="px-2 py-1 text-xs rounded transition-colors hover:bg-opacity-80"
                                style={{ 
                                  backgroundColor: techColors[tech] ? `${techColors[tech]}20` : 'var(--nord3)',
                                  color: techColors[tech] || 'var(--terminal-fg)',
                                  border: `1px solid ${techColors[tech] || 'var(--nord3)'}40`
                                }}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {project.github && (
                            <motion.a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 rounded-lg bg-[var(--nord1)] hover:bg-[var(--nord2)] transition-colors"
                              onClick={(e) => e.stopPropagation()}
                              aria-label={`View ${project.name} on GitHub`}
                            >
                              <Github size={16} />
                            </motion.a>
                          )}
                          {project.demo && (
                            <motion.a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 rounded-lg bg-[var(--nord1)] hover:bg-[var(--nord2)] transition-colors"
                              onClick={(e) => e.stopPropagation()}
                              aria-label={`View ${project.name} live demo`}
                            >
                              <ExternalLink size={16} />
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {filteredDirectories.length === 0 && (
                  <div className="text-center py-8 text-[var(--nord4)]">
                    No projects found matching your criteria.
                    <br />
                    <button 
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedTech('');
                      }}
                      className="mt-2 text-[var(--terminal-accent)] hover:underline"
                    >
                      Clear filters
                    </button>
                  </div>
                )}

                {files.map((file, index) => (
                  <motion.div
                    key={file.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (filteredDirectories.length + index) * 0.05 }}
                    className="flex items-center gap-3 p-3 text-sm opacity-60"
                  >
                    <FileCode className="text-[var(--nord4)]" size={16} />
                    <span className="text-[var(--nord4)]">{file.name}</span>
                    <span className="text-[var(--nord4)] text-xs">
                      {file.description}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Project Details Modal */}
            <AnimatePresence>
              {selectedProject && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                  onClick={() => setSelectedProject(null)}
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="bg-[var(--terminal-bg)] border border-[var(--nord3)] rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="terminal-header">
                      <div className="terminal-dot close" onClick={() => setSelectedProject(null)}></div>
                      <div className="terminal-dot minimize"></div>
                      <div className="terminal-dot maximize"></div>
                      <span className="ml-4 text-sm">cat ~/projects/{selectedProject.name}/README.md</span>
                    </div>
                    
                    <div className="p-6 overflow-y-auto max-h-[calc(80vh-60px)]">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <h2 className="text-2xl font-bold text-[var(--terminal-accent)]">
                            {selectedProject.name}
                          </h2>
                          {selectedProject.stars > 0 && (
                            <div className="flex items-center gap-1 text-[var(--terminal-warning)]">
                              <Star size={16} />
                              <span>{selectedProject.stars}</span>
                            </div>
                          )}
                        </div>
                        
                        <p className="text-[var(--nord4)]">
                          {selectedProject.details}
                        </p>
                        
                        <div>
                          <h3 className="font-bold mb-2 text-[var(--terminal-fg)]">Technologies Used:</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.tech.map((tech) => (
                              <span 
                                key={tech}
                                className="px-3 py-1 rounded-full text-sm transition-colors"
                                style={{ 
                                  backgroundColor: techColors[tech] ? `${techColors[tech]}20` : 'var(--nord3)',
                                  color: techColors[tech] || 'var(--terminal-fg)',
                                  border: `1px solid ${techColors[tech] || 'var(--nord3)'}40`
                                }}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex gap-4 pt-4">
                          {selectedProject.github && (
                            <motion.a
                              href={selectedProject.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center gap-2 px-4 py-2 bg-[var(--nord3)] hover:bg-[var(--nord2)] rounded-lg transition-colors"
                            >
                              <Github size={16} />
                              View Code
                            </motion.a>
                          )}
                          {selectedProject.demo && (
                            <motion.a
                              href={selectedProject.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center gap-2 px-4 py-2 bg-[var(--terminal-accent)] hover:bg-[var(--nord9)] text-[var(--terminal-bg)] rounded-lg transition-colors"
                            >
                              <ExternalLink size={16} />
                              Live Demo
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
