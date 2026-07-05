import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TimelineItem } from '@/lib/types'
import { timelineData } from '@/lib/constants'
import { createCardVariants, iconBoxVariants, dotVariants, badgeVariants } from '@/lib/animations'

gsap.registerPlugin(ScrollTrigger)

const cardVariants = createCardVariants();

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: headerRef.current, start: 'top 85%' } }
      )

      if (timelineRef.current) {
        gsap.fromTo(
          timelineRef.current.querySelectorAll('.timeline-item'),
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: timelineRef.current, start: 'top 80%' } }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative min-h-screen bg-[#0a0a0a] py-24 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-20 right-10 w-[400px] h-[400px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(200,53,58,0.4) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute bottom-40 left-10 w-[300px] h-[300px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(158,42,47,0.3) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div ref={headerRef} className="text-center mb-16 sm:mb-20" style={{ opacity: 0 }}>
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full glass mb-4 sm:mb-6">
            <span className="w-2 h-2 rounded-full bg-crimson-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-mono text-crimson-300">My Journey</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black text-white mb-4">
            Journey & <span className="gradient-text-violet">Milestones</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto px-2 sm:px-0">
            A timeline of my academic and professional growth
          </p>
        </div>

        <div ref={timelineRef} className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-600/30 via-slate-500/30 to-slate-600/10 md:-translate-x-1/2" />

          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <ExperienceCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ExperienceCard({ item, index }: { item: TimelineItem; index: number }) {
  const [hovered, setHovered] = useState(false)
  const rectRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // 3D Tilt calculations
  const rotateX = useTransform(mouseY, [0, 200], [5, -5])
  const rotateY = useTransform(mouseX, [0, 400], [-5, 5])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!rectRef.current) return
    const rect = rectRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  function handleMouseLeave() {
    setHovered(false)
    mouseX.set(200)
    mouseY.set(100)
  }

  return (
    <motion.div
      className={`timeline-item relative flex items-start gap-6 md:gap-8 ${
        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
      initial="rest"
      whileHover="hover"
      style={{ opacity: 0 }}
    >
      {/* Timeline dot */}
      <motion.div
        className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full border-2 border-slate-800 md:-translate-x-1/2 z-10"
        variants={dotVariants}
        style={{ backgroundColor: item.accent, boxShadow: `0 0 20px ${item.accent}40` }}
      />

      {/* Card Wrapper */}
      <div className={`ml-14 md:ml-0 md:w-5/12 ${
        index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
      }`}>
        <motion.div
          ref={rectRef}
          className="relative glass rounded-2xl p-6 border border-white/[0.07] cursor-default overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleMouseLeave}
          variants={cardVariants}
          style={{
            rotateX: hovered ? rotateX : 0,
            rotateY: hovered ? rotateY : 0,
            transformPerspective: 1000,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {/* Cursor tracking spotlight */}
          <motion.div
            className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: hovered ? 1 : 0,
              background: useTransform(
                [mouseX, mouseY],
                ([x, y]) => `radial-gradient(circle at ${x}px ${y}px, ${item.accent}20 0%, transparent 60%)`
              ),
            }}
          />

          <div className="relative z-10">
            {/* Card header */}
            <div className={`flex items-center gap-3 mb-4 ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}>
              <motion.div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                variants={iconBoxVariants}
                style={{ backgroundColor: `${item.accent}18` }}
              >
                <item.icon size={20} style={{ color: item.accent }} />
              </motion.div>
              <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                <motion.span
                  className="inline-block px-2.5 py-1 rounded-full text-xs font-mono"
                  variants={badgeVariants}
                  style={{ backgroundColor: `${item.accent}15`, color: item.accent }}
                >
                  {item.type === 'experience' ? 'Experience' : 'Education'}
                </motion.span>
              </div>
            </div>

            <h4 className="text-lg font-bold text-white mb-2 transition-colors">
              {item.role}
            </h4>
            <p className="text-sm font-semibold mb-2" style={{ color: item.accent }}>
              {item.org}
            </p>
            <p className="text-xs text-slate-500 font-mono mb-3">
              {item.period}
            </p>
            <p className="text-slate-400 leading-relaxed text-sm">
              {item.desc}
            </p>
          </div>
        </motion.div>
      </div>

      <div className="hidden md:block md:w-5/12" />
    </motion.div>
  )
}

