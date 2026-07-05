import type { Project } from '@/lib/types'
import { FaArrowUpRightFromSquare, FaGithub } from 'react-icons/fa6'

function getTechLabel(tech: Project['tech']) {
  const value = Array.isArray(tech) ? tech[0] : tech

  switch (value) {
    case 'html,css':
      return 'HTML/CSS'
    case 'js':
      return 'JavaScript'
    case 'nextjs':
      return 'Next.js'
    case 'react':
      return 'React'
    default:
      return value
  }
}

export default function ProjectCard({ project }: { project: Project }) {
  const Icon = project.techIcon?.icon
  const techLabel = getTechLabel(project.tech)

  return (
    <article className="project-card group relative flex h-full flex-col overflow-hidden rounded-lg border border-white/[0.08] bg-[#101010]/85 shadow-[0_18px_70px_rgba(0,0,0,0.28)] transition-[border-color,background,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-red-400/30 hover:bg-[#121212] hover:shadow-[0_24px_90px_rgba(0,0,0,0.42)]">
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block aspect-[16/10] overflow-hidden bg-slate-950"
        aria-label={`Open ${project.title}`}
      >
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-95"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a]/70 via-transparent to-[#0a0a0a]/20 opacity-90" />

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
          <div className="inline-flex min-w-0 items-center gap-2 rounded-md border border-white/[0.07] bg-white/[0.035] px-2.5 py-1.5">
            {Icon && <Icon size={14} className={project.techIcon?.color} />}
            <span className="truncate text-[11px] font-mono text-slate-400">{techLabel}</span>
          </div>

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

        <h3 className="mb-2 text-base font-semibold leading-snug text-slate-100 transition group-hover:text-white">
          {project.title}
        </h3>

        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-slate-500">
          {project.description}
        </p>

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
    </article>
  )
}
