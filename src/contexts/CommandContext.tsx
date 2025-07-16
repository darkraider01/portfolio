import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import { commands } from '../lib/commands';
import '../commands';

interface CommandContextType {
  history: string[];
  executeCommand: (command: string) => void;
  clearHistory: () => void;
}

const CommandContext = createContext<CommandContextType | undefined>(undefined);

export function CommandProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<string[]>([]);
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const addToHistory = useCallback((output: string) => {
    setHistory(prev => [...prev, output]);
  }, []);

  const initialBootMessages = [
    "[ 0.000000] Booting PortfolioOS...",
    "[ 0.123456] Initializing developer.exe",
    "[ 0.234567] Loading skills... OK",
    "[ 0.345678] Mounting projects filesystem... OK",
    "[ 0.456789] Starting creativity daemon... OK",
    "[ 0.567890] Enabling problem-solving mode... OK",
    "[ 0.678901] Loading passion for technology... OK",
    "[ 0.789012] System ready. Welcome to my portfolio!",
  ];

  React.useEffect(() => {
    setHistory(initialBootMessages);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const executeCommand = useCallback((command: string) => {
    const [cmd, ...args] = command.trim().split(' ');
    const commandObj = commands[cmd.toLowerCase()];
    
    addToHistory(`$ ${command}`);

    if (commandObj) {
        const output = commandObj.execute(args, navigate, theme, setTheme);
        if (output === 'clear') {
            clearHistory();
        } else {
            addToHistory(output);
        }
    } else {
        const suggestions = Object.keys(commands);
        const suggestion = suggestions.find(s => s.includes(cmd.toLowerCase().substring(0, 3)));
        
        const errorMessage = `Command not found: ${command}
${suggestion ? `\nDid you mean: ${suggestion}?` : ''}
Type 'help' for available commands.`;
        addToHistory(errorMessage);
    }
  }, [addToHistory, navigate, theme, setTheme, clearHistory]);

  return (
    <CommandContext.Provider value={{ history, executeCommand, clearHistory }}>
      {children}
    </CommandContext.Provider>
  );
}

export function useCommand() {
  const context = useContext(CommandContext);
  if (context === undefined) {
    throw new Error('useCommand must be used within a CommandProvider');
  }
  return context;
}
