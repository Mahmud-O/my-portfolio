import { FaJsSquare } from 'react-icons/fa'
import { FaReact, FaHtml5, FaCss3Alt } from 'react-icons/fa6'
import { RiNextjsFill } from 'react-icons/ri'
import { Project } from '@/lib/types'

export const projects: Project[] = [
    
    {
        id: '1',
        title: 'ShopFlow-ECommerce',
        description:
            'Full-featured e-commerce platform built with React, Redux Toolkit, React Query & Tailwind CSS.',
        tech: 'react',
        techIcon: {
            icon: FaReact,
            bg: 'bg-sky-500/10',
            color: 'text-sky-400',
        },
        image: '/img/projects/project-01.jpg',
        liveUrl: 'https://shopflow-ecommerce.netlify.app/',
        featured: true,
        year: 2024,
    },
    {
        id: '2',
        title: 'TaskFlow-Task-Manager',
        description:
            'Clean & minimal To-Do app with localStorage persistence using Vanilla JavaScript.',
        tech: 'js',
        techIcon: {
            icon: FaJsSquare,
            bg: 'bg-yellow-500/20',
            color: 'text-yellow-400',
        },
        image: '/img/projects/project-02.jpg',
        liveUrl: 'https://mahmoud25osama.github.io/To-Do-List/',
        featured: true,
        year: 2025,
    },
    {
        id: '3',
        title: 'CreatorPreneur-Landing-Page',
        description:
            'Modern landing page with React, Tailwind, Sanity CMS, RTL support & dark mode.',
        tech: 'react',
        techIcon: {
            icon: FaReact,
            bg: 'bg-sky-500/10',
            color: 'text-sky-400',
        },
        image: '/img/projects/project-03.jpg',
        liveUrl: 'https://creatorpreneur-academy.netlify.app/',
        featured: true,
        year: 2024,
    },
    {
        id: '4',
        title: 'Portfolio-V1',
        description:
            'My first professional portfolio built with Next.js and Tailwind CSS.',
        tech: 'nextjs',
        techIcon: {
            icon: RiNextjsFill,
            bg: 'bg-white/10',
            color: 'text-white',
        },
        image: '/img/projects/project-04.jpg',
        liveUrl: 'https://github.com/mahmoud25osama/Portfolio-V1',
        year: 2024,
    },
    {
        id: '5',
        title: 'Weather-App',
        description:
            'Beautiful glassmorphism weather dashboard with real-time data and forecasts.',
        tech: 'js',
        techIcon: {
            icon: FaJsSquare,
            bg: 'bg-yellow-500/20',
            color: 'text-yellow-400',
        },
        image: '/img/projects/project-05.jpg',
        liveUrl: 'https://mahmoud25osama.github.io/Weather-Dashboard/',
        year: 2024,
    },
    {
        id: '6',
        title: 'Streamflix-Clone',
        description:
            'Netflix clone with authentication, protected routes, search & pixel-perfect UI.',
        tech: 'react',
        techIcon: {
            icon: FaReact,
            bg: 'bg-sky-500/10',
            color: 'text-sky-400',
        },
        image: '/img/projects/project-06.jpg',
        liveUrl: 'https://streamflix25.netlify.app',
        year: 2025,
    },
    {
        id: '7',
        title: 'Ali-Dynasty-Chronicles',
        description:
            'Interactive bilingual website about Muhammad Ali Pasha dynasty (1805-1952).',
        tech: 'react',
        techIcon: {
            icon: FaReact,
            bg: 'bg-sky-500/10',
            color: 'text-sky-400',
        },
        image: '/img/projects/project-07.jpg',
        liveUrl: 'https://ali-dynasty-chronicles.netlify.app/',
        year: 2025,
    },
    {
        id: '8',
        title: 'Meal-Explorer',
        description:
            'Recipe discovery app with meal categories and detailed cooking instructions.',
        tech: 'react',
        techIcon: {
            icon: FaReact,
            bg: 'bg-sky-500/10',
            color: 'text-sky-400',
        },
        image: '/img/projects/project-08.jpg',
        liveUrl: 'https://meal25explorer.netlify.app/',
        year: 2025,
    },
    {
        id: '9',
        title: 'Text-Color-Range',
        description:
            'Real-time text color changer using RGB sliders (Vanilla JS + Bootstrap).',
        tech: 'js',
        techIcon: {
            icon: FaJsSquare,
            bg: 'bg-yellow-500/20',
            color: 'text-yellow-400',
        },
        image: '/img/projects/project-09.jpg',
        liveUrl: 'https://mahmoud25osama.github.io/Text-Color-Range/',
        year: 2025,
    },
    {
        id: '10',
        title: 'Library-App',
        description:
            'Simple book library app with add/remove functionality and localStorage.',
        tech: 'js',
        techIcon: {
            icon: FaJsSquare,
            bg: 'bg-yellow-500/20',
            color: 'text-yellow-400',
        },
        image: '/img/projects/project-10.jpg',
        liveUrl: 'https://mahmoud25osama.github.io/Library/',
        year: 2025,
    },
    {
        id: '11',
        title: 'Dashboard-HTML&CSS',
        description:
            'Fully responsive dashboard template built with pure HTML & CSS.',
        tech: 'html,css',
        techIcon: {
            icon: FaHtml5,
            bg: 'bg-orange-500/20',
            color: 'text-orange-500',
        },
        image: '/img/projects/project-11.jpg',
        liveUrl: 'https://mahmoud25osama.github.io/Dashboard_Html_Css/',
        year: 2025,
    },
    {
        id: '12',
        title: 'Leon-Agency-Template',
        description:
            'Modern flat agency landing page converted from PSD to HTML/CSS.',
        tech: 'html,css',
        techIcon: {
            icon: FaCss3Alt,
            bg: 'bg-blue-500/20',
            color: 'text-blue-400',
        },
        image: '/img/projects/project-12.jpg',
        liveUrl: 'https://mahmoud25osama.github.io/Html_Css_Template_one/',
        year: 2025,
    },
    {
        id: '13',
        title: 'Kasper-Creative-Template',
        description: 'Creative one-page portfolio template converted from PSD.',
        tech: 'html,css',
        techIcon: {
            icon: FaCss3Alt,
            bg: 'bg-blue-500/20',
            color: 'text-blue-400',
        },
        image: '/img/projects/project-13.jpg',
        liveUrl: 'https://mahmoud25osama.github.io/HTML_CSS_Template_Two/',
        year: 2025,
    },
    {
        id: '14',
        title: 'Elrouby-World-Template',
        description:
            'Clean agency/portfolio template converted from PSD to code.',
        tech: 'html,css',
        techIcon: {
            icon: FaHtml5,
            bg: 'bg-orange-500/20',
            color: 'text-orange-500',
        },
        image: '/img/projects/project-14.jpg',
        liveUrl:
            'https://mahmoud25osama.github.io/HTML_And_CSS_Template_Three/',
        year: 2025,
    },
    {
        id: '15',
        title: 'Animated-Login-Form',
        description:
            'A lightweight, responsive animated login component built with HTML, CSS . This repository contains a simple, accessible login form with smooth animations that you can drop into any project or use as a starting point for a custom authentication UI.',
        tech: 'html,css',
        techIcon: {
            icon: FaHtml5,
            bg: 'bg-orange-500/20',
            color: 'text-orange-500',
        },
        image: '/img/projects/project-15.jpg',
        liveUrl: 'https://mahmoud25osama.github.io/Animated-Login/',
        year: 2025,
    },
    {
        id: '16',
        title: 'PrepYou.ai',
        description:
            'full-pipeline AI interview preparation platform built for software engineers. It simulates the real hiring process end-to-end — candidates choose their tech major and experience level, submit a job description, assign a target company, then go through AI-powered stages including CV review, MCQ assessment, HR interview, and a live technical interview with a coding challenge. At the end, the platform generates a detailed performance report with actionable feedback.',
        tech: 'react',
        techIcon: {
            icon: FaReact,
            bg: 'bg-blue-500/10',
            color: 'text-blue-400',
        },
        image: '/img/projects/project-16.jpg',
        liveUrl: 'https://prepyouai-waiting-list.vercel.app/',
        featured: true,
        year: 2026,
    },
]
