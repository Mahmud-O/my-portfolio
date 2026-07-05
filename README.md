# My Portfolio

A personal portfolio website for Mahmoud Osama (mahmoud25osama) built with React, Vite, TypeScript, and Tailwind CSS. The site showcases projects, skills, and provides an easy way for visitors to contact me.

## Live demo
[mahmoud-osama.com](https://mahmoudosama.netlify.app/)

## Overview

This repository contains a modern, responsive React single-page portfolio application using Vite and TypeScript. It uses Tailwind CSS v4 and reusable components/utilities to make adding new sections or projects straightforward.

## Key Features

- React single-page app powered by Vite
- TypeScript for safer, self-documenting code
- Tailwind CSS v4 with a custom theme setup
- Reusable components in src/components for consistent UI
- Responsive design optimized for desktop, tablet, and mobile
- Project gallery with descriptions and links to demos / repositories
- Contact form powered by EmailJS

## Tech Stack

- React
- Vite
- TypeScript
- Tailwind CSS v4
- GSAP and Framer Motion
- EmailJS
- npm

## Project structure

- src/main.tsx - Vite/React entry point
- src/App.tsx - Main application composition
- src/index.css - Global styles and Tailwind theme tokens
- src/components/ - Reusable UI components
- src/lib/ - Utilities, constants, types, and data
- public/ - Static assets

## Getting started

Prerequisites:
- Node.js 18+ recommended
- npm

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Open the local URL printed by Vite, usually http://localhost:5173.

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Add or update projects

Projects are declared in src/lib/data/projects.ts. To add a project:
1. Add a new entry with title, description, tech, image, and links.
2. Make sure the image exists under public/.
3. Run the build before deploying.

## Deployment

This app deploys easily to Netlify, Vercel, GitHub Pages, or any static host that can serve the Vite dist output.

Use:
- Build command: `npm run build`
- Publish directory: `dist`

## Contact

- GitHub: https://github.com/mahmoud25osama
- Email: mahmoud4h5@gmail.com