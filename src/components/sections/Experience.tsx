import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { ScrambledText } from '@/components/ui/ScrambledText'
import { ParallaxOrb } from '@/components/ui/ParallaxOrb'
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
  const lineFillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const header = headerRef.current
    const timeline = timelineRef.current
    const lineFill = lineFillRef.current
    if (!section || !header || !timeline || !lineFill) return

    // Header reveal
    gsap.fromTo(
      header,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    )

    // Vertical Timeline Line scroll fill
    const lineTrigger = ScrollTrigger.create({
      trigger: timeline,
      start: 'top 70%',
      end: 'bottom 60%',
      scrub: true,
      onUpdate: (self) => {
        if (lineFill) {
          lineFill.style.transform = `scaleY(${self.progress})`
        }
      }
    })

    // Staggered reveals and dot triggers for each timeline item
    timeline.querySelectorAll('.timeline-item').forEach((itemEl) => {
      const dot = itemEl.querySelector('.timeline-node-dot')
      const glow = itemEl.querySelector('.timeline-node-glow')
      const cardBody = itemEl.querySelector('.experience-card-body')

      // Card reveal
      gsap.fromTo(
        cardBody,
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: itemEl,
            start: 'top 82%',
            toggleActions: 'play none none none',
          }
        }
      )

      // Timeline node light up
      gsap.fromTo(
        [dot, glow],
        { scale: 0.75, opacity: 0.3 },
        {
          scale: 1.25,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: itemEl,
            start: 'top 65%',
            end: 'bottom 35%',
            toggleActions: 'play reverse play reverse',
          }
        }
      )
    })

    return () => {
      lineTrigger.kill()
    }
  }, [])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative min-h-screen bg-black py-24 sm:py-32 overflow-hidden"
    >
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <ParallaxOrb
          className="absolute top-20 right-10 w-100 h-100 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(200,53,58,0.4) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          speedX={0.02}
          speedY={0.03}
          scrollSpeed={-0.1}
        />
        <ParallaxOrb
          className="absolute bottom-40 left-10 w-75 h-75 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(158,42,47,0.3) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          speedX={-0.03}
          speedY={0.02}
          scrollSpeed={-0.08}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl xl:max-w-7xl 3xl:max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 mb-16 sm:mb-24">
        <div ref={headerRef} className="text-center" style={{ opacity: 0 }}>
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full glass mb-4 sm:mb-6">
            <span className="w-2 h-2 rounded-full bg-crimson-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-mono text-crimson-300">My Journey</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black text-white mb-4">
            <ScrambledText text="Journey & " />
            <span className="gradient-text-violet">
              <ScrambledText text="Milestones" delay={300} />
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto px-2 sm:px-0">
            A timeline of my academic and professional growth
          </p>
        </div>
      </div>

      <div ref={timelineRef} className="relative z-10 max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Central Vertical Timeline Track line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/[0.04] -translate-x-1/2 z-0">
          <div
            ref={lineFillRef}
            className="w-full h-full bg-gradient-to-b from-red-500 to-red-600 origin-top shadow-[0_0_8px_rgba(239,68,68,0.5)]"
            style={{
              transform: 'scaleY(0)',
              transformOrigin: 'top',
              willChange: 'transform',
            }}
          />
        </div>

        <div className="flex flex-col gap-12 sm:gap-16">
          {timelineData.map((item, index) => {
            const isLeft = index % 2 === 0
            return (
              <div
                key={item.id}
                className={`timeline-item relative flex flex-col md:flex-row items-start md:items-center justify-between w-full ${
                  isLeft ? '' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot container */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center w-6 h-6">
                  {/* Outer pulsating ring */}
                  <div
                    className="timeline-node-glow absolute w-6 h-6 rounded-full border border-white/10 scale-75 opacity-40 transition-all duration-300"
                    style={{ borderColor: item.accent }}
                  />
                  {/* Inner dot */}
                  <div
                    className="timeline-node-dot w-3.5 h-3.5 rounded-full border-2 border-black transition-all duration-300"
                    style={{
                      backgroundColor: item.accent,
                      boxShadow: `0 0 12px ${item.accent}40`
                    }}
                  />
                </div>

                {/* Card Container */}
                <div
                  className={`w-full md:w-[45%] ${
                    isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 pl-14'
                  }`}
                >
                  <ExperienceCardBody item={item} alignText={isLeft ? 'right' : 'left'} />
                </div>

                {/* Empty side space container */}
                <div className="hidden md:block md:w-[45%]" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

interface ExperienceCardBodyProps {
  item: TimelineItem
  alignText?: 'left' | 'right'
}

function ExperienceCardBody({ item, alignText = 'left' }: ExperienceCardBodyProps) {
  const [hovered, setHovered] = useState(false)
  const rectRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // 3D Tilt calculations
  const rotateX = useTransform(mouseY, [0, 300], [5, -5])
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
    mouseY.set(150)
  }

  const isAlignedRight = alignText === 'right'

  return (
    <motion.div
      ref={rectRef}
      className={`experience-card-body group relative glass rounded-2xl p-6 border border-white/[0.07] cursor-default overflow-hidden min-h-[260px] h-full flex flex-col justify-between`}
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
      {/* Interactive glowing border mask */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-30"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(130px circle at ${x}px ${y}px, ${item.accent}45, transparent 100%)`
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
        <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t border-l transition-all duration-300 group-hover:w-4.5 group-hover:h-4.5" style={{ borderColor: hovered ? item.accent : 'rgba(255,255,255,0.2)' }} />
        <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t border-r transition-all duration-300 group-hover:w-4.5 group-hover:h-4.5" style={{ borderColor: hovered ? item.accent : 'rgba(255,255,255,0.2)' }} />
        <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b border-l transition-all duration-300 group-hover:w-4.5 group-hover:h-4.5" style={{ borderColor: hovered ? item.accent : 'rgba(255,255,255,0.2)' }} />
        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b border-r transition-all duration-300 group-hover:w-4.5 group-hover:h-4.5" style={{ borderColor: hovered ? item.accent : 'rgba(255,255,255,0.2)' }} />
      </div>

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

      {/* Top border accent line that slides in on hover */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl z-10"
        style={{ backgroundColor: item.accent }}
        initial={{ scaleX: 0, originX: 0 }}
        variants={{
          hover: { scaleX: 1, transition: { duration: 0.35, ease: 'easeOut' } },
          rest: { scaleX: 0 },
        }}
      />

      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className={`flex flex-col ${isAlignedRight ? 'md:items-end' : 'md:items-start'}`}>
          {/* Card header */}
          <div className={`flex items-center gap-3 mb-4 ${isAlignedRight ? 'md:flex-row-reverse' : ''}`}>
            <motion.div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              variants={iconBoxVariants}
              style={{ backgroundColor: `${item.accent}18` }}
            >
              <item.icon size={20} style={{ color: item.accent }} />
            </motion.div>
            <div className="flex-1">
              <motion.span
                className="inline-block px-2.5 py-1 rounded-full text-xs font-mono font-semibold"
                variants={badgeVariants}
                style={{ backgroundColor: `${item.accent}15`, color: item.accent }}
              >
                {item.type === 'experience' ? 'Experience' : 'Education'}
              </motion.span>
            </div>
          </div>

          <h4 className={`text-lg font-bold text-white mb-1 transition-colors ${isAlignedRight ? 'md:text-right text-left' : 'text-left'}`}>
            {item.role}
          </h4>
          <p className={`text-sm font-semibold mb-1 ${isAlignedRight ? 'md:text-right text-left' : 'text-left'}`} style={{ color: item.accent }}>
            {item.org}
          </p>
          <p className={`text-xs text-slate-500 font-mono mb-2 ${isAlignedRight ? 'md:text-right text-left' : 'text-left'}`}>
            {item.period}
          </p>
        </div>

        <p className={`text-slate-400 leading-relaxed text-sm line-clamp-3 mt-3 ${isAlignedRight ? 'md:text-right text-left' : 'text-left'}`}>
          {item.desc}
        </p>
      </div>
    </motion.div>
  )
}
