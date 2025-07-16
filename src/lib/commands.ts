type Theme = 'dark' | 'light';

export interface CommandContextType {
  history: string[];
  executeCommand: (command: string) => string;
  clearHistory: () => void;
}

export interface Command {
  name: string;
  description: string;
  execute: (args: string[], navigate: (path: string) => void, theme?: Theme, setTheme?: (theme: Theme) => void) => string;
}

export const commands: { [key: string]: Command } = {};

export const registerCommand = (command: Command) => {
  commands[command.name] = command;
};
