import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Project } from '@/lib/types'
import { FaArrowUpRightFromSquare, FaGithub } from 'react-icons/fa6'

export default function ProjectCard({ project }: { project: Project }) {
  const Icon = project?.techIcon?.icon

  /* â”€â”€ subtle magnetic tilt on hover â”€â”€ */
  const cardRef = useRef<HTMLDivElement>(null)
  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const springRotX = useSpring(rotX, { stiffness: 200, damping: 20 })
  const springRotY = useSpring(rotY, { stiffness: 200, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = cardRef.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    const cx = left + width  / 2
    const cy = top  + height / 2
    rotX.set(((e.clientY - cy) / height) * -10)
    rotY.set(((e.clientX - cx) / width )  *  10)
  }
  const handleMouseLeave = () => { rotX.set(0); rotY.set(0) }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotX,
        rotateY: springRotY,
        transformPerspective: 800,
      }}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="project-card group relative flex flex-col rounded-2xl overflow-hidden
                 gradient-border bg-[rgba(255,255,255,0.03)] h-full"
    >
      {/* â”€â”€ Image â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-900/50 shrink-0">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover
                     group-hover:scale-108 transition-transform duration-700 ease-out"
        />

        {/* Hover overlay with action buttons */}
        <div className="absolute inset-0 bg-[#0a0a0a]/85 backdrop-blur-sm
                        opacity-0 group-hover:opacity-100 transition-all duration-300
                        flex items-center justify-center gap-3">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass-strong
                       text-white text-xs font-mono hover:scale-105 transition-transform"
            aria-label="Live demo"
          >
            <FaArrowUpRightFromSquare size={12} />
            Live Demo
          </a>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl glass-strong
                         text-white text-xs font-mono hover:scale-105 transition-transform"
              aria-label="GitHub"
            >
              <FaGithub size={12} />
              Source
            </a>
          )}
        </div>

        {/* Year badge */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full
                        text-xs font-mono bg-[#0a0a0a]/75 text-slate-400
                        backdrop-blur-sm border border-white/5">
          {project.year}
        </div>

        {/* Tech icon badge (top-right) */}
        {Icon && (
          <div className={`absolute top-3 right-3 p-2 rounded-xl
                           backdrop-blur-sm border border-white/5 ${project?.techIcon?.bg}`}>
            <Icon size={14} className={project?.techIcon?.color} />
          </div>
        )}

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 inset-x-0 h-8
                        bg-gradient-to-t from-[#0d0d0d] to-transparent" />
      </div>

      {/* â”€â”€ Content â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="text-sm sm:text-base font-semibold text-slate-100
                       font-mono leading-snug line-clamp-2 group-hover:text-white
                       transition-colors">
          {project.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed
                      line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Footer links */}
        <div className="flex items-center justify-between pt-3
                        border-t border-white/5 mt-auto gap-2">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs gradient-text
                       hover:opacity-80 transition-opacity font-mono group/link"
          >
            <FaArrowUpRightFromSquare
              size={10}
              className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
            />
            Live Demo
          </a>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-slate-600
                         hover:text-slate-400 transition-colors font-mono group/gh"
            >
              <FaGithub
                size={12}
                className="group-hover/gh:scale-110 transition-transform"
              />
              GitHub
            </a>
          )}
        </div>
      </div>

      {/* Subtle inner glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                      transition-opacity duration-500 pointer-events-none"
           style={{ boxShadow: 'inset 0 0 40px rgba(185,28,28,0.06)' }} />
    </motion.div>
  )
}

