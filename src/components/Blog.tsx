import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Tag, FileText, ArrowLeft, Search } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'building-modern-react-apps.md',
    displayTitle: 'Building Modern React Applications with TypeScript',
    date: '2024-12-01',
    readTime: '8 min read',
    tags: ['React', 'TypeScript', 'JavaScript'],
    excerpt: 'Exploring best practices for building scalable React applications with TypeScript, including patterns for component architecture and state management.',
    content: `# Building Modern React Applications with TypeScript

## Introduction

TypeScript has become an essential tool for modern React development, providing type safety and improved developer experience. In this post, we'll explore best practices for building scalable React applications.

## Component Architecture

When building React applications with TypeScript, it's important to establish clear patterns for component architecture:

\`\`\`typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  onClick: () => void;
  children: React.ReactNode;
}

export function Button({ variant, size, onClick, children }: ButtonProps) {
  return (
    <button 
      className={\`btn btn-\${variant} btn-\${size}\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
\`\`\`

## State Management

For complex applications, consider using Zustand or Redux Toolkit for global state management:

\`\`\`typescript
import { create } from 'zustand';

interface AppState {
  user: User | null;
  theme: 'light' | 'dark';
  setUser: (user: User) => void;
  toggleTheme: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  theme: 'dark',
  setUser: (user) => set({ user }),
  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'light' ? 'dark' : 'light' 
  })),
}));
\`\`\`

## Conclusion

By following these patterns and leveraging TypeScript's type system, you can build more maintainable and scalable React applications.`
  },
  {
    id: 2,
    title: 'terminal-ui-design.md',
    displayTitle: 'Creating Terminal-Inspired User Interfaces',
    date: '2024-11-15',
    readTime: '6 min read',
    tags: ['UI/UX', 'CSS', 'Design'],
    excerpt: 'How to design beautiful terminal-inspired interfaces that combine nostalgia with modern usability principles.',
    content: `# Creating Terminal-Inspired User Interfaces

## The Appeal of Terminal Aesthetics

Terminal interfaces have a unique appeal that combines functionality with nostalgia. They represent a direct connection to the computer, stripped of unnecessary decoration.

## Design Principles

1. **Monospace Typography**: Use fonts like JetBrains Mono or Fira Code
2. **Limited Color Palette**: Stick to terminal color schemes like Nord or Solarized
3. **Consistent Spacing**: Use an 8px grid system
4. **Subtle Animations**: Add life without breaking the terminal feel

## Implementation Tips

\`\`\`css
.terminal-window {
  background: #2e3440;
  border: 1px solid #4c566a;
  border-radius: 8px;
  font-family: 'JetBrains Mono', monospace;
}

.terminal-header {
  background: #3b4252;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}
\`\`\`

## Accessibility Considerations

Remember to maintain good contrast ratios and provide alternatives for color-only information.`
  },
  {
    id: 3,
    title: 'fullstack-deployment.md',
    displayTitle: 'Full-Stack Deployment Strategies for 2024',
    date: '2024-10-28',
    readTime: '12 min read',
    tags: ['DevOps', 'Docker', 'AWS'],
    excerpt: 'Modern deployment strategies for full-stack applications, including containerization, CI/CD, and cloud platforms.',
    content: `# Full-Stack Deployment Strategies for 2024

## Overview

Deploying full-stack applications has become more sophisticated with the rise of containerization and cloud-native technologies.

## Container-First Approach

\`\`\`dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS runtime
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

## CI/CD Pipelines

Modern deployment relies heavily on automated pipelines that test, build, and deploy applications.

## Cloud Platforms

- **Vercel**: Perfect for frontend applications
- **Railway**: Great for full-stack applications
- **AWS/GCP**: For enterprise-scale deployments

## Monitoring and Observability

Don't forget to implement proper monitoring and logging for production applications.`
  }
];

export function Blog() {
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const filteredPosts = blogPosts.filter(post =>
    post.displayTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handlePostClick = (post: typeof blogPosts[0]) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedPost(post);
      setIsLoading(false);
    }, 300);
  };

  if (selectedPost) {
    return (
      <div className="min-h-screen pt-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-dot close"></div>
              <div className="terminal-dot minimize"></div>
              <div className="terminal-dot maximize"></div>
              <span className="ml-4 text-sm">cat ~/blog/{selectedPost.title}</span>
            </div>
            
            <div className="p-8">
              <motion.button
                onClick={() => setSelectedPost(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 mb-6 text-[var(--terminal-accent)] hover:text-[var(--nord9)] transition-colors"
              >
                <ArrowLeft size={16} />
                Back to blog list
              </motion.button>
              
              <article className="prose prose-invert max-w-none">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-[var(--terminal-accent)] mb-4">
                    {selectedPost.displayTitle}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-[var(--nord4)]">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(selectedPost.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {selectedPost.readTime}
                    </div>
                    <div className="flex items-center gap-2">
                      <Tag size={14} />
                      {selectedPost.tags.join(', ')}
                    </div>
                  </div>
                </div>
                
                <div 
                  className="markdown-content text-[var(--terminal-fg)] leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: selectedPost.content
                      .replace(/\n/g, '<br>')
                      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-[var(--nord1)] p-4 rounded-lg overflow-x-auto"><code>$2</code></pre>')
                      .replace(/`([^`]+)`/g, '<code class="bg-[var(--nord3)] px-1 rounded">$1</code>')
                      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold text-[var(--terminal-accent)] mt-6 mb-3">$1</h2>')
                      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold text-[var(--terminal-accent)] mt-8 mb-4">$1</h1>')
                  }} 
                />
              </article>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-dot close"></div>
            <div className="terminal-dot minimize"></div>
            <div className="terminal-dot maximize"></div>
            <span className="ml-4 text-sm">john@portfolioos: ~/blog</span>
          </div>
          
          <div className="p-8">
            <div className="mb-6">
              <div className="text-[var(--terminal-accent)] mb-2">$ ls -la ~/blog/</div>
              <div className="text-sm text-[var(--nord4)] mb-4">
                total {blogPosts.length} posts
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--nord4)]" size={16} />
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[var(--nord1)] border border-[var(--nord3)] rounded-lg text-[var(--terminal-fg)] placeholder-[var(--nord4)] focus:border-[var(--terminal-accent)] focus:outline-none"
                />
              </div>

              {/* Results count */}
              {searchTerm && (
                <div className="text-sm text-[var(--nord4)] mb-4">
                  Found {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} matching "{searchTerm}"
                </div>
              )}
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--terminal-accent)]"></div>
                <span className="ml-3 text-[var(--nord4)]">Loading post...</span>
              </div>
            )}

            {/* Blog Posts */}
            {!isLoading && (
              <div className="space-y-4">
                <AnimatePresence>
                  {filteredPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="glass-card cursor-pointer group"
                      onClick={() => handlePostClick(post)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handlePostClick(post);
                        }
                      }}
                      aria-label={`Read ${post.displayTitle}`}
                    >
                      <div className="flex items-start gap-4">
                        <FileText className="text-[var(--terminal-accent)] flex-shrink-0 mt-1" size={20} />
                        <div className="flex-1 min-w-0">
                          <h2 className="text-xl font-bold text-[var(--terminal-fg)] group-hover:text-[var(--terminal-accent)] transition-colors mb-2">
                            {post.displayTitle}
                          </h2>
                          <p className="text-[var(--nord4)] mb-3 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-[var(--nord4)]">
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              {new Date(post.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              {post.readTime}
                            </div>
                            <div className="flex gap-2">
                              {post.tags.map((tag) => (
                                <span 
                                  key={tag}
                                  className="px-2 py-1 text-xs bg-[var(--nord3)] rounded hover:bg-[var(--nord2)] transition-colors"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>

                {filteredPosts.length === 0 && (
                  <div className="text-center py-8 text-[var(--nord4)]">
                    No blog posts found matching "{searchTerm}".
                    <br />
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="mt-2 text-[var(--terminal-accent)] hover:underline"
                    >
                      Clear search
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="mt-8 p-4 bg-[var(--nord1)] rounded-lg border border-[var(--nord3)]">
              <div className="text-sm text-[var(--nord4)]">
                💡 <strong>Pro tip:</strong> Use the terminal command <code className="bg-[var(--nord3)] px-1 rounded">blog</code> to navigate here, 
                or <code className="bg-[var(--nord3)] px-1 rounded">random</code> to read a random post!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}