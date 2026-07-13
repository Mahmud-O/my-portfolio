import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { ScrambledText } from '@/components/ui/ScrambledText'
import { ParallaxOrb } from '@/components/ui/ParallaxOrb'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ServiceItem } from '@/lib/types'
import { services } from '@/lib/constants'
import { createCardVariants, iconBoxVariants, featureVariants, featureItemVariants, dotVariants } from '@/lib/animations'

gsap.registerPlugin(ScrollTrigger)

const cardVariants = createCardVariants(-10, 1.03, '0 28px 70px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.1)');

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const header = headerRef.current
    const track = trackRef.current
    if (!section || !header || !track) return

    // Header Animation
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

    // Staggered Cards Reveal Animation
    gsap.fromTo(
      track.querySelectorAll('.service-card'),
      { opacity: 0, y: 40, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: track,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      }
    )
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative min-h-screen bg-black py-24 sm:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <ParallaxOrb
          className="absolute top-40 right-20 w-100 h-100 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(200,53,58,0.4) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          speedX={0.03}
          speedY={0.02}
          scrollSpeed={-0.12}
        />
        <ParallaxOrb
          className="absolute bottom-20 left-10 w-87.5 h-87.5 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(158,42,47,0.3) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          speedX={-0.02}
          speedY={0.04}
          scrollSpeed={-0.08}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl xl:max-w-7xl 3xl:max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 mb-12 sm:mb-16">
        <div ref={headerRef} className="text-center" style={{ opacity: 0 }}>
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full glass mb-4 sm:mb-6">
            <span className="w-2 h-2 rounded-full bg-crimson-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-mono text-crimson-300">What I Offer</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black text-white mb-4">
            <ScrambledText text="My " />
            <span className="gradient-text">
              <ScrambledText text="Services" delay={150} />
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto px-2 sm:px-0">
            Comprehensive web development solutions tailored to your needs
          </p>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-6xl xl:max-w-7xl 3xl:max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div
          ref={trackRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {services.map((service, index) => (
            <div key={service.title} className="w-full">
              <ServiceCard service={service} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
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

  const formattedIndex = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      ref={rectRef}
      className="service-card group relative glass rounded-2xl p-6 cursor-default overflow-hidden border border-white/[0.07] h-[390px] flex flex-col justify-between"
      initial="rest"
      whileHover="hover"
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
            ([x, y]) => `radial-gradient(130px circle at ${x}px ${y}px, ${service.accent}45, transparent 100%)`
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
        <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t border-l transition-all duration-300 group-hover:w-4.5 group-hover:h-4.5" style={{ borderColor: hovered ? service.accent : 'rgba(255,255,255,0.2)' }} />
        <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t border-r transition-all duration-300 group-hover:w-4.5 group-hover:h-4.5" style={{ borderColor: hovered ? service.accent : 'rgba(255,255,255,0.2)' }} />
        <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b border-l transition-all duration-300 group-hover:w-4.5 group-hover:h-4.5" style={{ borderColor: hovered ? service.accent : 'rgba(255,255,255,0.2)' }} />
        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b border-r transition-all duration-300 group-hover:w-4.5 group-hover:h-4.5" style={{ borderColor: hovered ? service.accent : 'rgba(255,255,255,0.2)' }} />
      </div>

      {/* Cursor tracking spotlight */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(circle at ${x}px ${y}px, ${service.accent}25 0%, transparent 60%)`
          ),
        }}
      />

      {/* Top border accent line that slides in on hover */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl z-10"
        style={{ backgroundColor: service.accent }}
        initial={{ scaleX: 0, originX: 0 }}
        variants={{
          hover: { scaleX: 1, transition: { duration: 0.35, ease: 'easeOut' } },
          rest: { scaleX: 0 },
        }}
      />

      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="flex flex-col">
          {/* Icon and Index */}
          <div className="flex items-center justify-between mb-5">
            <motion.div
              className="relative w-12 h-12 rounded-xl flex items-center justify-center"
              variants={iconBoxVariants}
              style={{ backgroundColor: `${service.accent}15` }}
            >
              <service.icon size={22} style={{ color: service.accent }} />
            </motion.div>
            <span className="font-mono text-[10px] tracking-widest text-slate-500 group-hover:text-slate-400 transition-colors">
              {formattedIndex} // SERVICE
            </span>
          </div>

          {/* Title */}
          <motion.h4
            className="text-lg font-bold text-white mb-2 relative"
            variants={{
              rest: { color: 'rgb(255 255 255)' },
              hover: { color: 'rgb(226 232 240)', transition: { duration: 0.2 } },
            }}
          >
            {service.title}
          </motion.h4>

          {/* Description */}
          <p className="text-slate-400 text-sm leading-relaxed relative line-clamp-3">
            {service.description}
          </p>
        </div>

        {/* Feature list */}
        <motion.ul className="space-y-1.5 relative mt-4" variants={featureVariants}>
          {service.features.map((feat) => (
            <motion.li
              key={feat}
              className="flex items-center gap-2 text-sm"
              variants={featureItemVariants}
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                variants={dotVariants}
                style={{ backgroundColor: service.accent }}
              />
              {feat}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  )
}
