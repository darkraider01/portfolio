import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ChevronUp, Volume2, VolumeX, Keyboard } from 'lucide-react';
import { useCommand } from '../contexts/CommandContext';

const availableCommands = [
  'help', 'home', 'projects', 'resume', 'blog', 'about', 'whoami', 'ls', 'pwd', 
  'clear', 'contact', 'neofetch', 'theme',
  'skills', 'exit'
];

export function CommandLine() {
  const [input, setInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [height, setHeight] = useState(60); // Initial height for collapsed state
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { history, executeCommand, clearHistory } = useCommand();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const getCommandSuggestions = (input: string) => {
    if (!input.trim()) return [];
    return availableCommands.filter(cmd => 
      cmd.toLowerCase().startsWith(input.toLowerCase())
    ).slice(0, 5);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input);
      setCommandHistory(prev => [...prev, input]);
      setHistoryIndex(-1);
      setSuggestions([]);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsExpanded(false);
      setSuggestions([]);
      setHeight(60); // Reset height on collapse
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const currentSuggestions = getCommandSuggestions(input);
      if (currentSuggestions.length === 1) {
        setInput(currentSuggestions[0]);
        setSuggestions([]);
      } else if (currentSuggestions.length > 1) {
        setSuggestions(currentSuggestions);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
        setSuggestions([]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
        setSuggestions([]);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    setSuggestions(getCommandSuggestions(value));
  };

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleMouseMove = (e: MouseEvent) => {
    const newHeight = window.innerHeight - e.clientY;
    setHeight(Math.max(60, newHeight)); // Minimum height of 60px
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // Global keyboard shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsExpanded(true);
        setHeight(450); // Default expanded height
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? height : 60 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-[var(--nord1)] border-t border-[var(--nord3)] glass-effect"
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between p-4 cursor-pointer"
          onClick={() => {
            setIsExpanded(!isExpanded);
            setHeight(isExpanded ? 60 : 450); // Toggle between collapsed and default expanded height
          }}
        >
          <div className="flex items-center gap-2">
            <Terminal size={20} className="text-[var(--terminal-accent)]" />
            <span className="font-bold">Terminal</span>
            <span className="text-sm text-[var(--nord4)]">
              - Primary navigation interface
            </span>
            <div className="hidden sm:flex items-center gap-2 ml-4 text-xs text-[var(--nord4)]">
              <Keyboard size={14} />
              <span>Ctrl+K to focus</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaying(!isPlaying);
              }}
              className="p-1 rounded hover:bg-[var(--nord2)] transition-colors"
              title={isPlaying ? 'Pause music' : 'Play music'}
            >
              {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronUp size={20} />
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-4 pb-4 h-full overflow-hidden"
            >
              {/* Command History */}
              <div className="h-64 overflow-y-auto mb-4 p-3 bg-[var(--terminal-bg)] rounded-lg border border-[var(--nord3)] font-mono text-sm">
                  <div className="space-y-1">
                    {history.map((line, index) => (
                      <div key={index} className="whitespace-pre-wrap">
                        {line}
                      </div>
                    ))}
                  </div>
              </div>

              {/* Command Input */}
              <div className="relative">
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                  <span className="text-[var(--terminal-accent)] font-bold">➜</span>
                  <span className="text-[var(--nord9)]">~/portfolio</span>
                  <span className="text-[var(--terminal-fg)]">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent border-none outline-none text-[var(--terminal-fg)] font-mono"
                    placeholder="Type a command... (try 'help' or press Tab)"
                    autoComplete="off"
                  />
                </form>

                {/* Command Suggestions */}
                {suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 right-0 mt-1 bg-[var(--terminal-bg)] border border-[var(--nord3)] rounded-lg p-2 z-10"
                  >
                    <div className="text-xs text-[var(--nord4)] mb-1">Suggestions:</div>
                    <div className="flex flex-wrap gap-1">
                      {suggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => {
                            setInput(suggestion);
                            setSuggestions([]);
                            inputRef.current?.focus();
                          }}
                          className="px-2 py-1 text-xs bg-[var(--nord3)] hover:bg-[var(--nord2)] rounded transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Quick Commands */}
              <div className="mt-3 flex flex-wrap gap-2">
                {['help', 'projects', 'resume', 'blog', 'about', 'contact', 'clear'].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => {
                      executeCommand(cmd);
                    }}
                    className="px-3 py-1 text-xs bg-[var(--nord3)] hover:bg-[var(--nord2)] rounded transition-colors"
                  >
                    {cmd}
                  </button>
                ))}
              </div>

              {/* Terminal Stats */}
              <div className="mt-3 text-xs text-[var(--nord4)] flex justify-between">
                <span>Commands executed: {commandHistory.length}</span>
                <span>Music: {isPlaying ? 'Playing' : 'Paused'}</span>
                <span>History: {history.length} lines</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {isExpanded && (
          <div
            className="absolute top-0 left-0 right-0 h-2 bg-transparent cursor-ns-resize"
            onMouseDown={(e) => {
              e.preventDefault();
              document.addEventListener('mousemove', handleMouseMove);
              document.addEventListener('mouseup', handleMouseUp);
            }}
          />
        )}
      </motion.div>
      <audio ref={audioRef} src="/rainy-lofi-city-lofi-music-332746.mp3" loop />
    </div>
  );
}
