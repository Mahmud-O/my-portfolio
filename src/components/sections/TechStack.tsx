import {
  FaReact,
  FaNodeJs,
  FaJs,
  FaHtml5,
  FaGitAlt,
  FaGithub,
  FaFigma,
  FaDocker,
} from 'react-icons/fa6'
import { RiNextjsFill, RiTailwindCssFill } from 'react-icons/ri'
import {
  SiTypescript,
  SiMongodb,
  SiExpress,
  SiPostgresql,
  SiNestjs,
  SiRedis,
} from 'react-icons/si'

const row1 = [
  { icon: FaReact, label: 'React.js', color: '#c8353a' },
  { icon: RiNextjsFill, label: 'Next.js', color: '#ffffff' },
  { icon: SiTypescript, label: 'TypeScript', color: '#60a5fa' },
  { icon: FaJs, label: 'JavaScript', color: '#fcd34d' },
  { icon: RiTailwindCssFill, label: 'Tailwind CSS', color: '#c8353a' },
  { icon: FaNodeJs, label: 'Node.js', color: '#22c55e' },
  { icon: SiExpress, label: 'Express.js', color: '#ffffff' },
  { icon: SiNestjs, label: 'NestJS', color: '#e0234e' },
]

const row2 = [
  { icon: SiMongodb, label: 'MongoDB', color: '#4ade80' },
  { icon: SiPostgresql, label: 'PostgreSQL', color: '#60a5fa' },
  { icon: SiRedis, label: 'Redis', color: '#f87171' },
  { icon: FaDocker, label: 'Docker', color: '#2496ed' },
  { icon: FaGitAlt, label: 'Git', color: '#fb7185' },
  { icon: FaGithub, label: 'GitHub', color: '#ffffff' },
  { icon: FaFigma, label: 'Figma', color: '#f472b6' },
  { icon: FaHtml5, label: 'HTML5/CSS3', color: '#fb923c' },
]

// Duplicate rows multiple times to ensure seamless infinite looping on ultrawide monitors
const fullRow1 = [...row1, ...row1, ...row1, ...row1]
const fullRow2 = [...row2, ...row2, ...row2, ...row2]

export default function TechStackSection() {
  return (
    <section className="w-full bg-[#050505] border-y border-white/4 py-16 md:py-20 relative ">
      <div
        className="relative  w-full select-none"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)',
        }}
      >
        {/* Left-scrolling row */}
        <div
          className="flex gap-3 lg:gap-4 whitespace-nowrap w-max mb-4 lg:mb-5 animate-marquee-left hover:[animation-play-state:paused] cursor-pointer"
          style={{ animationDuration: '28s' }}
        >
          {fullRow1.map(({ icon: Icon, label, color }, i) => (
            <div
              key={`row1-${i}`}
              className="group inline-flex items-center gap-2 px-4 lg:px-6 py-2.5 lg:py-3 rounded-full border border-white/6 bg-white/3 text-xs lg:text-sm text-slate-300 font-mono shrink-0 transition-all duration-300 hover:border-red-400/30 hover:bg-[#101010] hover:scale-102"
            >
              <Icon size={14} className="lg:size-5 transition-transform duration-300 group-hover:scale-110" style={{ color }} />
              {label}
            </div>
          ))}
        </div>

        {/* Right-scrolling row */}
        <div
          className="flex gap-3 lg:gap-4 whitespace-nowrap w-max animate-marquee-right hover:[animation-play-state:paused] cursor-pointer"
          style={{ animationDuration: '32s' }}
        >
          {fullRow2.map(({ icon: Icon, label, color }, i) => (
            <div
              key={`row2-${i}`}
              className="group inline-flex items-center gap-2 px-4 lg:px-6 py-2.5 lg:py-3 rounded-full border border-white/6 bg-white/3 text-xs lg:text-sm text-slate-300 font-mono shrink-0 transition-all duration-300 hover:border-red-400/30 hover:bg-[#101010] hover:scale-102"
            >
              <Icon size={14} className="lg:size-5 transition-transform duration-300 group-hover:scale-110" style={{ color }} />
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
