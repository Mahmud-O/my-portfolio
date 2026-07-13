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
// About Section Types
// ============================================================================
export type SkillCategory = 'Frontend' | 'Backend' | 'Database' | 'Tools'

export interface Skill {
  icon: IconType
  label: string
  color: string
  category: SkillCategory
}

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

export interface ServiceItem {
  title: string
  description: string
  icon: IconType
  accent: string
  features: string[]
}

export interface ContactLink {
  icon: IconType
  label: string
  value: string
  href: string
  accent: string
  bg: string
}

export interface Stat {
  value: string
  label: string
  icon: IconType
}

// ============================================================================
// Snake Game Types
// ============================================================================
export interface SnakePosition {
  x: number
  y: number
}

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

export interface GameState {
  snake: SnakePosition[]
  food: SnakePosition
  direction: Direction
  isGameOver: boolean
  score: number
  isPlaying: boolean
}

// ============================================================================
// UI/Navigation Types
// ============================================================================
export interface Tab {
  id: string
  label: string
}

export type SectionKey = 'personal-info' | 'contacts' | 'find-me'
export type ItemKey = 'bio' | 'education' | 'skills'

// ============================================================================
// Legacy Types (for backward compatibility)
// ============================================================================
/** @deprecated Use Project instead */
export type projectType = Project
/** @deprecated Use Tab instead */
export type TabType = Tab
/** @deprecated Use SnakePosition instead */
export type SnakePositionType = SnakePosition
/** @deprecated Use Direction instead */
export type DirectionType = Direction
