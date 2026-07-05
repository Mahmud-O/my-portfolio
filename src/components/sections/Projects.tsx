import { useState } from 'react'
import { projects } from '@/lib/data/projects'
import { TechFilter } from '@/lib/types'
import { LuSearch } from 'react-icons/lu'
import ProjectCard from './ProjectCard'

const filters: { id: TechFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'react', label: 'React' },
  { id: 'js', label: 'JavaScript' },
  { id: 'html,css', label: 'HTML/CSS' },
]

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<TechFilter>('react')

  const getTech = (p: { tech: string | string[] }): string => {
    if (Array.isArray(p.tech)) return p.tech[0]
    return p.tech
  }

  const filtered = (
    activeFilter === 'all'
      ? [...projects]
      : projects.filter((p) => getTech(p) === activeFilter)
  ).reverse()

  return (
    <section id="projects" className="min-h-screen bg-[#0a0a0a] pt-32 pb-24 relative overflow-hidden">
      <div className="max-w-6xl xl:max-w-7xl 3xl:max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="mb-12 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black text-white mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto px-2 sm:px-0">
            A collection of full-stack applications and projects I&apos;ve built.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap justify-center items-center gap-1 rounded-lg border border-white/[0.08] bg-white/[0.04] p-1.5 backdrop-blur-2xl max-w-[90vw]">
            {filters.map((f) => {
              const active = activeFilter === f.id

              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`relative px-4 sm:px-5 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-300 ${
                    active ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {active && (
                    <span
                      className="absolute inset-0 rounded-md"
                      style={{
                        background: 'linear-gradient(135deg, rgba(220,38,38,0.24), rgba(127,29,29,0.18))',
                        border: '1px solid rgba(220,38,38,0.34)',
                      }}
                    />
                  )}
                  <span className="relative z-10">{f.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-slate-600 flex flex-col items-center">
            <LuSearch className="text-4xl mb-3" />
            <p className="text-lg">No projects in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  )
}
