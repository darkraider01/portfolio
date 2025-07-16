import { registerCommand } from '../lib/commands';

registerCommand({
  name: 'home',
  description: 'Navigate to home page',
  execute: (args, navigate) => {
    navigate('/');
    return 'Navigating to home...';
  },
});

registerCommand({
  name: 'projects',
  description: 'View my projects',
  execute: (args, navigate) => {
    navigate('/projects');
    return 'Opening projects directory...';
  },
});

registerCommand({
  name: 'resume',
  description: 'View my resume',
  execute: (args, navigate) => {
    navigate('/resume');
    return 'Loading resume...';
  },
});

registerCommand({
  name: 'blog',
  description: 'Read my blog posts',
  execute: (args, navigate) => {
    navigate('/blog');
    return 'Opening blog posts...';
  },
});

registerCommand({
  name: 'about',
  description: 'Learn more about me',
  execute: (args, navigate) => {
    navigate('/about');
    return 'Loading about page...';
  },
});

registerCommand({
    name: 'random',
    description: 'Navigate to random section',
    execute: (args, navigate) => {
        const sections = ['/projects', '/resume', '/blog', '/about'];
        const randomSection = sections[Math.floor(Math.random() * sections.length)];
        navigate(randomSection);
        return `🎲 Random navigation activated! Going to ${randomSection}...`;
    },
});

registerCommand({
    name: 'cd',
    description: 'Change directory',
    execute: (args, navigate) => {
        const target = args.join(' ').trim();
        switch (target) {
            case 'projects':
                navigate('/projects');
                return 'Changed directory to ~/projects';
            case 'resume':
                navigate('/resume');
                return 'Changed directory to ~/resume';
            case 'blog':
                navigate('/blog');
                return 'Changed directory to ~/blog';
            case 'about':
                navigate('/about');
                return 'Changed directory to ~/about';
            case '~':
            case '/':
            case '':
            case 'home':
                navigate('/');
                return 'Changed directory to ~';
            default:
                return `cd: ${target}: No such file or directory`;
        }
    },
});
