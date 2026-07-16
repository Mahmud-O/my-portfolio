import { IoMdMail } from 'react-icons/io'
import {
  FaPhone,
  FaGithub,
  FaLinkedin,
  FaCode,
  FaPalette,
  FaServer,
  FaDatabase,
  FaMobileScreen,
  FaGaugeHigh,
  FaRocket,
  FaGraduationCap
} from 'react-icons/fa6'
import { ContactLink, ServiceItem, TimelineItem } from './types'

// ============================================================================
// Contact Links
// ============================================================================
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
    value: 'github.com/Mahmud-O',
    href: 'https://github.com/Mahmud-O',
    accent: '#e2e8f0',
    bg: 'rgba(255,255,255,0.06)',
  },
]

// ============================================================================
// Services Constants
// ============================================================================
export const services: ServiceItem[] = [
  {
    title: 'Full-Stack Web Development',
    description: 'End-to-end web application development using the MERN stack, from database design to pixel-perfect UIs.',
    icon: FaCode,
    accent: '#c8353a',
    features: ['React.js & Next.js', 'Node.js & Express.js', 'MongoDB & Mongoose', 'RESTful API Design'],
    image: '/img/services/fullstack.png',
  },
  {
    title: 'Front-End Engineering',
    description: 'Building responsive, high-performance user interfaces with modern frameworks and design systems.',
    icon: FaPalette,
    accent: '#9e2a2f',
    features: ['TypeScript & React.js', 'Tailwind CSS & Shadcn UI', 'Responsive Design', 'Performance Optimization'],
    image: '/img/services/frontend.png',
  },
  {
    title: 'Back-End & API Development',
    description: 'Designing robust, scalable server architectures with secure authentication and efficient data handling.',
    icon: FaServer,
    accent: '#a78bfa',
    features: ['RESTful APIs', 'JWT Authentication', 'Database Architecture', 'Middleware & Validation'],
    image: '/img/services/backend.png',
  },
  {
    title: 'Database Design & Management',
    description: 'Structuring efficient database schemas for scalability, speed, and data integrity.',
    icon: FaDatabase,
    accent: '#4ade80',
    features: ['MongoDB & Mongoose', 'PostgreSQL & Prisma', 'Redis Caching', 'Schema Optimization'],
    image: '/img/services/database.png',
  },
  {
    title: 'UI/UX & Responsive Design',
    description: 'Crafting accessible, mobile-first interfaces with smooth interactions and modern aesthetics.',
    icon: FaMobileScreen,
    accent: '#f472b6',
    features: ['Mobile-First Approach', 'CSS Grid & Flexbox', 'Accessibility (a11y)', 'Dark Mode & Theming'],
    image: '/img/services/uiux.png',
  },
  {
    title: 'Performance & SEO Optimization',
    description: 'Optimizing applications for speed, search visibility, and production-grade reliability.',
    icon: FaGaugeHigh,
    accent: '#fbbf24',
    features: ['Core Web Vitals', 'Code Splitting', 'SEO Best Practices', 'Load Time Reduction'],
    image: '/img/services/performance.png',
  },
]

// ============================================================================
// Experience Constants
// ============================================================================
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

// ============================================================================
// Navigation Links
// ============================================================================
export const NAV_LINKS = [
  { name: 'Projects', href: '#projects' },
  { name: 'Services', href: '#services' },
  { name: 'Contact', href: '#contact' },
]

// ============================================================================
// Social Links
// ============================================================================
export const SOCIAL_LINKS = [
  { name: 'GitHub', href: 'https://github.com/Mahmud-O', icon: FaGithub },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/mahmoud25osama', icon: FaLinkedin },
]