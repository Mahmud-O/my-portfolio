import { useState, useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import type { Project } from '@/lib/types'
import { FaArrowUpRightFromSquare, FaGithub } from 'react-icons/fa6'

export default function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false)
  const rectRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // 3D Tilt calculations
  const rotateX = useTransform(mouseY, [0, 300], [4, -4])
  const rotateY = useTransform(mouseX, [0, 400], [-4, 4])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!rectRef.current) return
    const rect = rectRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  function handleMouseLeave() {
    setHovered(false)
    mouseX.set(200)
    mouseY.set(150)
  }

  return (
    <motion.div
      ref={rectRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="project-card group relative flex h-full flex-col overflow-hidden rounded-lg border border-white/[0.08] bg-[#101010]/85 shadow-[0_18px_70px_rgba(0,0,0,0.28)] transition-[border-color,background,box-shadow] duration-300 hover:border-red-400/30 hover:bg-[#121212] hover:shadow-[0_24px_90px_rgba(0,0,0,0.42)]"
      style={{
        rotateX: hovered ? rotateX : 0,
        rotateY: hovered ? rotateY : 0,
        transformPerspective: 1000,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Interactive glowing border mask */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none z-30"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(140px circle at ${x}px ${y}px, rgba(239, 68, 68, 0.45), transparent 100%)`
          ),
          padding: '1.5px',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
        }}
      />

      {/* Cybernetic geometric corners */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t border-l border-white/20 transition-all duration-300 group-hover:w-4.5 group-hover:h-4.5 group-hover:border-red-500" />
        <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t border-r border-white/20 transition-all duration-300 group-hover:w-4.5 group-hover:h-4.5 group-hover:border-red-500" />
        <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b border-l border-white/20 transition-all duration-300 group-hover:w-4.5 group-hover:h-4.5 group-hover:border-red-500" />
        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b border-r border-white/20 transition-all duration-300 group-hover:w-4.5 group-hover:h-4.5 group-hover:border-red-500" />
      </div>

      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block aspect-[16/10] overflow-hidden bg-slate-955"
        aria-label={`Open ${project.title}`}
      >
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-95"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/20 opacity-90" />

        <div className="absolute left-3 top-3 flex items-center gap-2">
          {project.featured && (
            <span className="rounded-md border border-red-400/25 bg-red-500/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-red-200 backdrop-blur-md">
              Featured
            </span>
          )}
          {project.year && (
            <span className="rounded-md border border-white/10 bg-black/45 px-2 py-1 text-[10px] font-mono text-slate-300 backdrop-blur-md">
              {project.year}
            </span>
          )}
        </div>

        <span className="absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-black/50 text-white opacity-0 backdrop-blur-md transition duration-300 group-hover:opacity-100">
          <FaArrowUpRightFromSquare size={13} />
        </span>
      </a>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="text-base font-semibold leading-snug text-slate-100 transition group-hover:text-white">
            {project.title}
          </h3>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/[0.07] bg-white/[0.035] text-slate-400 transition hover:border-white/15 hover:text-white"
              aria-label={`${project.title} source code`}
            >
              <FaGithub size={14} />
            </a>
          )}
        </div>

        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-slate-500">
          {project.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-0.5 text-[10px] font-medium text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-red-500 px-3 py-2 text-xs font-semibold text-white shadow-[0_8px_28px_rgba(220,38,38,0.22)] transition hover:bg-red-400"
          >
            Open
            <FaArrowUpRightFromSquare size={11} />
          </a>

          <span className="text-[11px] font-mono text-slate-600">#{project.id.padStart(2, '0')}</span>
        </div>
      </div>
    </motion.div>
  )
}
