import { IconType } from 'react-icons'

// ============================================================================
// Icon Types
// ============================================================================
export interface IconColor {
  icon: IconType
  color: string
  bg: string
}

// ============================================================================
// Project Types
// ============================================================================
export type TechFilter = 'all' | 'React' | 'JavaScript' | 'Next.js' | 'HTML/CSS'

export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  image: string
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
  year?: number
}

// ============================================================================
// Experience Section Types
// ============================================================================
export interface TimelineItem {
  id: string
  period: string
  role: string
  org: string
  desc: string
  accent: string
  icon: IconType
  type: 'experience' | 'education'
}

// ============================================================================
// Services Section Types
// ============================================================================
export interface ServiceItem {
  title: string
  description: string
  icon: IconType
  accent: string
  features: string[]
  image?: string
}

// ============================================================================
// Contact Section Types
// ============================================================================
export interface ContactLink {
  icon: IconType
  label: string
  value: string
  href: string
  accent: string
  bg: string
}
