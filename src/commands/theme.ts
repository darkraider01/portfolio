import { registerCommand } from '../lib/commands';

registerCommand({
  name: 'theme',
  description: 'Change the theme',
  execute: (args, navigate, theme, setTheme) => {
    const newTheme = args[0];
    if (newTheme === 'light' || newTheme === 'dark') {
      setTheme?.(newTheme);
      return `Theme switched to ${newTheme} mode`;
    }
    if (newTheme === 'toggle') {
        const toggledTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme?.(toggledTheme);
        return `Theme toggled to ${toggledTheme} mode`;
    }
    return 'Usage: theme [light|dark|toggle]';
  },
});
