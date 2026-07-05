import { FaFileAlt } from 'react-icons/fa'
import { SnakePosition, Tab, Skill, SkillCategory, Stat, TimelineItem, ServiceItem, ContactLink } from './types'
import {
  FaCss3, FaPhone, FaJs, FaReact, FaGithub, FaGitAlt, FaNodeJs, FaCode,
  FaServer, FaRocket, FaDatabase, FaHtml5, FaCss3Alt, FaNpm, FaFigma,
  FaLinux, FaPalette, FaMobileScreen, FaGaugeHigh, FaGraduationCap,
  FaLinkedin
} from 'react-icons/fa6'
import { IoMdMail } from 'react-icons/io'
import { RiNextjsFill, RiTailwindCssFill } from 'react-icons/ri'
import {
  SiTypescript, SiTailwindcss, SiFirebase, SiSupabase, SiMongodb, SiExpress,
  SiPostgresql, SiRedis, SiPrisma, SiVite, SiPostman, SiJira, SiMysql
} from 'react-icons/si'

// Snake Game Constants
export const GRID_SIZE = 15
export const CELL_SIZE = 16
export const INITIAL_SNAKE: SnakePosition[] = [
    { x: 7, y: 7 },
    { x: 7, y: 8 },
    { x: 7, y: 9 },
]
// Navigation Tabs
export const tabs: Tab[] = [
    { id: '', label: '_hello' },
    {
        id: 'about',
        label: '_about-me',
    },
    {
        id: 'projects',
        label: '_projects',
    },
]
// About Content
export const aboutContent = {
    'bio/summary': `/**
* About Me
*  Passionate and results-driven Full Stack MERN Developer
*  with expertise in modern web technologies including
*  MongoDB, Express.js, React.js, and Node.js.
*  Focused on building responsive, scalable full-stack applications
*  with clean and maintainable code.
*  Strong foundation in JavaScript (ES6+), robust database schemas
*  and UI/UX principles.
*/`,

    'bio/interests': `/**
* Interests & Goals
*  Creating accessible and inclusive web experiences.
*  Exploring advanced React patterns and performance optimization.
*  Contributing to open-source projects and developer communities.
*  Continuous improvement and keeping up with modern technologies.
*/`,

    // 💻 Skills
    'skills/full-stack': `/**
* Full Stack Technologies
*  JavaScript (ES6+), TypeScript,
*  React.js, Node.js, Express.js, MongoDB,
*  Next.js, Tailwind CSS, RESTful APIs,
*  Responsive Design, Redux Toolkit.
*/`,

    'skills/tools': `/**
* Tools & Platforms
*  Git, GitHub (CI/CD & Collaboration),
*  VS Code, npm, Vite, RESTful APIs,
*  JSON, Fetch API, Supabase, Firebase,
*  Vercel, Netlify, GitHub Pages.
*/`,

    'skills/professional-skills': `/**
* Professional Skills
*  Agile/Scrum Workflows, Sprint Planning,
*  Testing & Debugging (Chrome DevTools),
*  Performance Optimization, SEO Best Practices,
*  Team Communication, Code Reviews, Documentation.
*/`,
    'skills/soft-skills': `/**
* Soft Skills
*  Problem-solving: Analytical mindset with focus on clean solutions.
*  Communication: Strong collaboration and feedback skills.
*  Teamwork: Experienced in Agile environments and code reviews.
*  Time Management: Efficient in meeting deadlines under pressure.
*  Adaptability: Always open to learning new tools and frameworks.
*/`,

    // 🎓 Education
    'education/university': `/**
* Education
*  Banha University – Faculty of Science, Egypt
*  Bachelor of Science in Computer Science (2025)
*  Grade: Good
*  Relevant Coursework:
*   - Data Structures & Algorithms
*   - Web Programming
*   - Software Engineering
*   - Database Systems
*   - AI & Computer Networks
*  Graduation Project:
*   "Ali Dynasty Chronicles" – A historical web platform
*   built with React.js and Tailwind CSS.
*/`,

    'education/training': `/**
* Training & Certifications
*  Information Technology Institute (ITI), Egypt
*  Front-End Developer Track (Jul – Sep 2025)
*  - Hands-on with HTML, CSS, JS, and React.js
*  - Agile teamwork, sprint planning, and debugging.
*  Certifications:
*   - 2025 ITI Summer Training Certificate
*   - 2022 React.js, Next.js, Tailwind CSS (Self-Learning)
*/`,

    // 💼 Experience
    'experience/iti-training': `/**
* Experience
*  Information Technology Institute (ITI)
*  Front-End Developer (Training)
*  Duration: Jul – Sep 2025
*  - Built modern web apps using React.js.
*  - Worked in Agile teams and real-world projects.
*  - Focused on debugging, testing, and optimization.
*/`,

    'experience/digilians-internship': `/**
* Full Stack MERN Intern
*  Digilians
*  Duration: Jan 2026 – Present
*  - Built real-world scalable platforms using MongoDB, Express, React, and Node.js.
*  - Practiced Agile workflows, seamless API integrations, and robust database architectures.
*  - Focused on scalable, performant, and user-friendly full-stack application development.
*  - Collaborated closely with teams to deploy production-ready web experiences.
*/`,
}
export const personalInfoItems = [
    {
        title: 'bio',
        color: 'text-pink-400',
        folderColor: 'text-pink-500',
        files: [
            { name: 'summary.txt', icon: FaFileAlt },
            { name: 'interests.txt', icon: FaFileAlt },
        ],
    },
    {
        title: 'skills',
        color: 'text-slate-300',
        folderColor: 'text-slate-400',
        files: [
            { name: 'full-stack.txt', icon: FaFileAlt },
            { name: 'tools.txt', icon: FaFileAlt },
            { name: 'professional-skills.txt', icon: FaFileAlt },
            { name: 'soft-skills.txt', icon: FaFileAlt },
        ],
    },
    {
        title: 'education',
        color: 'text-indigo-400',
        folderColor: 'text-indigo-500',
        files: [
            { name: 'university.txt', icon: FaFileAlt },
            { name: 'training.txt', icon: FaFileAlt },
        ],
    },
    {
        title: 'experience',
        color: 'text-amber-200',
        folderColor: 'text-amber-500',
        files: [
            { name: 'iti-training.txt', icon: FaFileAlt },
            {
                name: 'digilians-internship.txt',
                icon: FaFileAlt,
                path: 'digilians-internship',
            },
        ],
    },
]
// Contact Items
export const contactLinks: ContactLink[] = [
    {
        icon: IoMdMail,
        label: 'Email',
        value: 'mahmoud4h5@gmail.com',
        href: 'mailto:mahmoud4h5@gmail.com',
        accent: '#dc2626',
        bg: 'rgba(220,38,38,0.08)',
    },
    {
        icon: FaPhone,
        label: 'Phone',
        value: '+20 101 607 4277',
        href: 'tel:+201016074277',
        accent: '#ef4444',
        bg: 'rgba(239,68,68,0.08)',
    },
    {
        icon: FaGithub,
        label: 'GitHub',
        value: 'github.com/Mahmoud-O',
        href: 'https://github.com/Mahmoud-O',
        accent: '#e2e8f0',
        bg: 'rgba(255,255,255,0.06)',
    },
]

// Projects & Technologies
export const projects = [
    {
        id: '1',
        title: 'Project 1 // _ui-animations',
        description: 'Duis aute irure dolor in velit esse cillum dolore.',
        image: '/projects/project1.png',
        liveUrl: 'https://example.com/project1',
        repoUrl: 'https://example.com/project1-repo',
        gallery: ['/projects/project1-1.png', '/projects/project1-2.png'],
        buttonText: 'view-project',
        tech: 'react',
    },
    {
        id: '2',
        title: 'Project 2 // _tetris-game',
        description: 'Duis aute irure dolor in velit esse cillum dolore.',
        image: '/projects/project1.png',
        liveUrl: 'https://example.com/project2',
        repoUrl: 'https://example.com/project2-repo',
        gallery: ['/projects/project2-1.png', '/projects/project2-2.png'],
        buttonText: 'view-project',
        tech: 'react js',
    },
    {
        id: '3',
        title: 'Project 3 // _weather-app',
        description: 'Duis aute irure dolor in velit esse cillum dolore.',
        image: '/projects/project3.png',
        liveUrl: 'https://example.com/project3',
        repoUrl: 'https://example.com/project3-repo',
        gallery: ['/projects/project3-1.png', '/projects/project3-2.png'],
        buttonText: 'view-project',
        tech: 'react',
    },
]
export const technologies = [
    {
        id: 'html,css',
        name: 'HTML,CSS',
        icon: FaCss3,
        color: 'text-orange-500',
    },
    { id: 'js', name: 'JavaScript', icon: FaJs, color: 'text-yellow-400' },
    { id: 'react', name: 'React', icon: FaReact, color: 'text-red-400' },
    { id: 'nextjs', name: 'Next.js', icon: RiNextjsFill, color: 'text-white' },
]
// Hero Constants
export const techStack = [
  { icon: FaReact, label: 'React', color: '#dc2626' },
  { icon: RiNextjsFill, label: 'Next.js', color: '#e2e8f0' },
  { icon: SiTypescript, label: 'TypeScript', color: '#60a5fa' },
  { icon: FaJs, label: 'JavaScript', color: '#fcd34d' },
  { icon: SiTailwindcss, label: 'Tailwind', color: '#dc2626' },
  { icon: FaHtml5, label: 'HTML/CSS', color: '#fb923c' },
]

export const HERO_PHRASES = [
  'scalable, robust web architectures',
  'modern full-stack solutions',
  'fast, beautiful web applications',
]

// About Constants
export const skills: Skill[] = [
  { icon: FaReact,         label: 'React.js',           color: '#c8353a', category: 'Frontend' },
  { icon: RiNextjsFill,    label: 'Next.js',             color: '#e2e8f0', category: 'Frontend' },
  { icon: SiTypescript,    label: 'TypeScript',          color: '#60a5fa', category: 'Frontend' },
  { icon: FaJs,            label: 'JavaScript (ES6+)',   color: '#fcd34d', category: 'Frontend' },
  { icon: RiTailwindCssFill, label: 'Tailwind CSS',     color: '#c8353a', category: 'Frontend' },
  { icon: FaHtml5,         label: 'HTML5',               color: '#fb923c', category: 'Frontend' },
  { icon: FaCss3Alt,       label: 'CSS3',                color: '#60a5fa', category: 'Frontend' },
  { icon: FaNodeJs,        label: 'Node.js',             color: '#22c55e', category: 'Backend'  },
  { icon: SiExpress,       label: 'Express.js',          color: '#e2e8f0', category: 'Backend'  },
  { icon: SiMongodb,       label: 'MongoDB',             color: '#4ade80', category: 'Backend'  },
  { icon: SiFirebase,      label: 'Firebase',            color: '#fbbf24', category: 'Backend'  },
  { icon: SiSupabase,      label: 'Supabase',            color: '#4ade80', category: 'Backend'  },
  { icon: SiPostgresql,    label: 'PostgreSQL',          color: '#60a5fa', category: 'Database' },
  { icon: SiMysql,         label: 'MySQL',               color: '#60a5fa', category: 'Database' },
  { icon: SiRedis,         label: 'Redis',               color: '#f87171', category: 'Database' },
  { icon: SiPrisma,        label: 'Prisma',              color: '#e2e8f0', category: 'Database' },
  { icon: FaGitAlt,        label: 'Git',                 color: '#fb7185', category: 'Tools'    },
  { icon: FaGithub,        label: 'GitHub',              color: '#e2e8f0', category: 'Tools'    },
  { icon: SiVite,          label: 'Vite',                color: '#a78bfa', category: 'Tools'    },
  { icon: SiPostman,       label: 'Postman',             color: '#fb923c', category: 'Tools'    },
  { icon: FaNpm,           label: 'npm/yarn',            color: '#f87171', category: 'Tools'    },
  { icon: FaFigma,         label: 'Figma',               color: '#f472b6', category: 'Tools'    },
  { icon: SiJira,          label: 'Jira',                color: '#60a5fa', category: 'Tools'    },
  { icon: FaLinux,         label: 'Linux',               color: '#fbbf24', category: 'Tools'    },
]

export const skillCategories: SkillCategory[] = ['Frontend', 'Backend', 'Database', 'Tools']

export const stats: Stat[] = [
  { value: '15+', label: 'Projects Built',   icon: FaCode     },
  { value: '3+',  label: 'Years Experience', icon: FaServer   },
  { value: '25+', label: 'Technologies',     icon: FaDatabase },
  { value: '2025',label: 'CS Graduate',      icon: FaRocket   },
]

export const categoryColor: Record<SkillCategory, string> = {
  Frontend: '#c8353a',
  Backend:  '#22c55e',
  Database: '#60a5fa',
  Tools:    '#a78bfa',
}

// Services Constants
export const services: ServiceItem[] = [
  {
    title: 'Full-Stack Web Development',
    description: 'End-to-end web application development using the MERN stack, from database design to pixel-perfect UIs.',
    icon: FaCode,
    accent: '#c8353a',
    features: ['React.js & Next.js', 'Node.js & Express.js', 'MongoDB & Mongoose', 'RESTful API Design'],
  },
  {
    title: 'Front-End Engineering',
    description: 'Building responsive, high-performance user interfaces with modern frameworks and design systems.',
    icon: FaPalette,
    accent: '#9e2a2f',
    features: ['TypeScript & React.js', 'Tailwind CSS & Shadcn UI', 'Responsive Design', 'Performance Optimization'],
  },
  {
    title: 'Back-End & API Development',
    description: 'Designing robust, scalable server architectures with secure authentication and efficient data handling.',
    icon: FaServer,
    accent: '#a78bfa',
    features: ['RESTful APIs', 'JWT Authentication', 'Database Architecture', 'Middleware & Validation'],
  },
  {
    title: 'Database Design & Management',
    description: 'Structuring efficient database schemas for scalability, speed, and data integrity.',
    icon: FaDatabase,
    accent: '#4ade80',
    features: ['MongoDB & Mongoose', 'PostgreSQL & Prisma', 'Redis Caching', 'Schema Optimization'],
  },
  {
    title: 'UI/UX & Responsive Design',
    description: 'Crafting accessible, mobile-first interfaces with smooth interactions and modern aesthetics.',
    icon: FaMobileScreen,
    accent: '#f472b6',
    features: ['Mobile-First Approach', 'CSS Grid & Flexbox', 'Accessibility (a11y)', 'Dark Mode & Theming'],
  },
  {
    title: 'Performance & SEO Optimization',
    description: 'Optimizing applications for speed, search visibility, and production-grade reliability.',
    icon: FaGaugeHigh,
    accent: '#fbbf24',
    features: ['Core Web Vitals', 'Code Splitting', 'SEO Best Practices', 'Load Time Reduction'],
  },
]

// Experience Constants
export const timelineData: TimelineItem[] = [
  {
    id: 'exp-1',
    period: 'Jan 2026 - Present',
    role: 'MERN Stack Developer Trainee',
    org: 'Digital Pioneers Initiative (Digilians) - Egyptian Military Academy, Cairo',
    desc: 'Participating in a comprehensive MERN stack training program (MongoDB, Express.js, React.js, Node.js). Developing full-stack applications, focusing on database design, API creation, and seamless integration.',
    accent: '#c8353a',
    icon: FaCode,
    type: 'experience',
  },
  {
    id: 'exp-2',
    period: 'Aug - Sep 2025',
    role: 'Front-End Developer Training',
    org: 'Information Technology Institute (ITI), Egypt',
    desc: 'Acquired intensive hands-on experience in React.js, UI development, RESTful API integration, and state management. Developed and optimized a full-featured streaming platform clone (StreamFlix), improving user experience by 30%.',
    accent: '#9e2a2f',
    icon: FaRocket,
    type: 'experience',
  },
  {
    id: 'edu-1',
    period: 'Oct 2021 - June 2025',
    role: "Bachelor's Degree in Computer Science",
    org: 'Banha University, Egypt',
    desc: 'Graduated with a Good grade. Graduation Project: Ali Dynasty Chronicles (Excellent grade) - an interactive historical timeline built with React.js, TypeScript and Tailwind CSS. Relevant courses: Data Structures, Web Programming, Software Engineering, AI.',
    accent: '#f63d3dad',
    icon: FaGraduationCap,
    type: 'education',
  },
]

export const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
]

export const SOCIAL_LINKS = [
  { name: 'GitHub', href: 'https://github.com/mahmoud25osama', icon: FaGithub },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/mahmoud25osama', icon: FaLinkedin },
]