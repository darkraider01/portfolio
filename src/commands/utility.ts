import { registerCommand, commands } from '../lib/commands';



registerCommand({
    name: 'help',
    description: 'Show this help message',
    execute: () => {
        const commandList = Object.values(commands)
            .map(cmd => `${cmd.name.padEnd(12)} - ${cmd.description}`)
            .join('\n');
        return `Available commands:\n${commandList}`;
    },
});

registerCommand({
    name: 'whoami',
    description: 'Display user information',
    execute: () => `brandy@portfolio:~$ 
Passionate about creating elegant solutions to complex problems.
Specializing in Python, Java, Rust , Blockchain and AI/ML technologies.

Current status: Available for new opportunities
Location: India
Experience: 4years+ experience in coding
Favorite quote: "Code is poetry written in logic"`,
});

registerCommand({
    name: 'ls',
    description: 'List available sections',
    execute: () => {
        const now = new Date();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[now.getMonth()];
        const day = now.getDate().toString().padStart(2, '0');
        const year = now.getFullYear();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');

        return `total 5
drwxr-xr-x  2 brandy brandy 4096 ${month} ${day} ${year} ${hours}:${minutes} projects/
drwxr-xr-x  2 brandy brandy 4096 ${month} ${day} ${year} ${hours}:${minutes} resume/
drwxr-xr-x  2 brandy brandy 4096 ${month} ${day} ${year} ${hours}:${minutes} blog/
drwxr-xr-x  2 brandy brandy 4096 ${month} ${day} ${year} ${hours}:${minutes} about/
-rw-r--r--  1 brandy brandy  256 ${month} ${day} ${year} ${hours}:${minutes} README.md
-rw-r--r--  1 brandy brandy  128 ${month} ${day} ${year} ${hours}:${minutes} contact.txt
-rwxr-xr-x  1 brandy brandy  512 ${month} ${day} ${year} ${hours}:${minutes} skills.sh`;
    },
});

registerCommand({
    name: 'pwd',
    description: 'Show current location',
    execute: () => {
        const currentPath = window.location.pathname;
        if (currentPath === '/') return '/home/brandy';
        if (currentPath === '/projects') return '/home/brandy/projects';
        if (currentPath === '/resume') return '/home/brandy/resume';
        if (currentPath === '/blog') return '/home/brandy/blog';
        if (currentPath === '/about') return '/home/brandy/about';
        return `/home/brandy${currentPath}`;
    },
});

registerCommand({
    name: 'contact',
    description: 'Open contact information',
    execute: () => `Contact Information:
📧 Email: ishanghosh0111@gmail.com
🐙 GitHub: https://github.com/darkraider01
🐦 Twitter: @DarkraiderO
📱 Phone: 7605891779
📍 Location: Kolkata, India`,
});


registerCommand({
    name: 'neofetch',
    description: 'Show system information',
    execute: (args, navigate, theme) => `                    brandy@portfolio
                    ------------------
       .--.         OS: PortfolioOS 1.0
      |o_o |        Host: Professional Developer
      |:_/ |        Kernel: 6.15.3-zen1-1-zen
     //   \\ \\       Uptime: Available for hire
    (|     | )      Shell: /bin/enthusiasm
   /'\\_   _/\`\\      Resolution: Problems → Solutions
   \\___)=(___/      DE: VSCode + Terminal
                    WM: Focus Mode
                    Theme: Nord (${theme})
                    Icons: Lucide React
                    Terminal: Life-long learner
                    CPU: Dual-core: Logic + Creativity
                    GPU: Imagination Accelerator
                    Memory: 64GB (expandable)`,
});

registerCommand({
    name: 'skills',
    description: 'Display skills with progress',
    execute: () => `Skills Assessment:
        
Machine Learning:
ML/DL Development   ████████████████████ 95%
LLM Development     ███████████████████  90%
Python              ████████████████████ 95%

Blockchain:
Solidity            ███████████████████  90%
Web3.js/Ethers.js   ██████████████████   85%

Other:
Java                ████████████████     80%
Rust                ███████████████      75%
Open Source Contrib.████████████████████ 95%
Arch Linux          ███████████████████  90%

Soft Skills:
Problem Solving     ████████████████████ 95%
Communication       ███████████████████  90%
Team Collaboration  ███████████████████  90%
Learning Agility    ████████████████████ 95%`,
});



registerCommand({
    name: 'exit',
    description: 'Close terminal',
    execute: () => 'Goodbye! Thanks for visiting PortfolioOS 👋\n\nTo close the terminal, click the header or press Escape.',
});



registerCommand({
    name: 'clear',
    description: 'Clear terminal history',
    execute: () => {
        return 'clear';
    }
});
