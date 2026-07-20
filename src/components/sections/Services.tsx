import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { ParallaxOrb } from '@/components/ui/ParallaxOrb'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ServiceItem } from '@/lib/types'
import { services } from '@/lib/constants'
import { createCardVariants, iconBoxVariants, featureVariants, featureItemVariants, dotVariants } from '@/lib/animations'

gsap.registerPlugin(ScrollTrigger)

const cardVariants = createCardVariants(-10, 1.03, '0 28px 70px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.1)')

// Accent colors for each card to fade the solid background to on active scroll
const servicesBgColors = [
  '#2a0406', // 1. Red Accent
  '#7f1d1d', // 2. Dark Deep Red
  '#13031f', // 3. Glowing Purple
  '#031707', // 4. Glowing Green
  '#17020d', // 5. Pink Accented
  '#140d01', // 6. Yellow / Amber Accent
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const bgRefs = useRef<(HTMLDivElement | null)[]>([])
  const textRefs = useRef<(HTMLHeadingElement | null)[]>([])

  const displayServices: Array<ServiceItem & { isVirtual?: boolean }> = [
    ...services,
    {
      title: 'Virtual Card',
      description: 'Virtual Card',
      icon: services[0].icon,
      accent: 'transparent',
      features: [],
      image: '',
      isVirtual: true,
    }
  ]

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia()

      // Desktop: 3D Curved Arc Pinned Scroll
      mm.add('(min-width: 769px)', () => {
        // Position card indices arced along the virtual massive circle
        const updateCards = (p: number) => {
          cardsRef.current.forEach((card, i) => {
            if (!card) return
            const offset = i - p

            // Perfect circular bend formulas
            const radius = 1800 // Circle radius below viewport
            const angleSpread = 18 // Degrees spread between cards

            const angle = offset * angleSpread
            const rad = (angle * Math.PI) / 180

            const x = Math.sin(rad) * radius
            const y = radius - Math.cos(rad) * radius // Drops down along arcing curve
            const z = -Math.abs(offset) * 50

            const scale = Math.max(0.4, 1 - Math.abs(offset) * 0.15)
            const rotateZ = angle // Tilt arcing tangentially
            const opacity = Math.max(0.1, 1 - Math.abs(offset) * 0.3)
            const zIndex = Math.round(100 - Math.abs(offset) * 10)

            gsap.set(card, {
              x,
              y,
              z,
              scale,
              rotationZ: rotateZ,
              rotationY: 0,
              opacity: displayServices[i]?.isVirtual ? 0 : opacity,
              zIndex,
            })
          })

          // Fade backgrounds & headers according to active scroll index
          bgRefs.current.forEach((bg, i) => {
            if (!bg) return
            const itemOpacity = Math.max(0, 1 - Math.abs(i - p))
            gsap.set(bg, { opacity: itemOpacity })

            if (textRefs.current[i]) {
              gsap.set(textRefs.current[i], { opacity: itemOpacity })
            }
          })
        }

        // Initialize positions
        updateCards(0)

        // Pinned view scrub trigger
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=500%', // 500vh scroll depth duration
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress * (displayServices.length - 1)
            updateCards(p)
          },
        })
      })

      // Mobile: Straight Horizontal Pinned Scroll
      mm.add('(max-width: 768px)', () => {
        const updateCardsMobile = (p: number) => {
          const cardWidth = Math.min(window.innerWidth * 0.82, 350)
          const spacing = cardWidth + 20
          cardsRef.current.forEach((card, i) => {
            if (!card) return
            const offset = i - p
            const x = offset * spacing
            const scale = Math.max(0.82, 1 - Math.abs(offset) * 0.12)
            const opacity = displayServices[i]?.isVirtual ? 0 : Math.max(0, 1 - Math.abs(offset) * 0.5)
            const zIndex = Math.round(100 - Math.abs(offset) * 10)

            gsap.set(card, {
              x,
              y: 0,
              z: 0,
              scale,
              rotationZ: 0,
              rotationY: 0,
              opacity,
              zIndex,
            })
          })

          bgRefs.current.forEach((bg, i) => {
            if (!bg) return
            const itemOpacity = Math.max(0, 1 - Math.abs(i - p))
            gsap.set(bg, { opacity: itemOpacity })

            if (textRefs.current[i]) {
              gsap.set(textRefs.current[i], { opacity: itemOpacity })
            }
          })
        }

        updateCardsMobile(0)

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=400%',
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress * (displayServices.length - 1)
            updateCardsMobile(p)
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center md:perspective-[1000px] border-t border-white/5"
    >
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-20">
        <ParallaxOrb
          className="absolute top-40 right-20 w-56 h-56 md:w-100 md:h-100 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(220,53,58,0.2) 0%, rgba(220,53,58,0.06) 50%, transparent 100%)',
          }}
          speedX={0.03}
          speedY={0.02}
          scrollSpeed={-0.12}
        />
        <ParallaxOrb
          className="absolute bottom-20 left-10 w-48 h-48 md:w-87.5 md:h-87.5 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(158,42,47,0.15) 0%, rgba(158,42,47,0.04) 50%, transparent 100%)',
          }}
          speedX={-0.02}
          speedY={0.04}
          scrollSpeed={-0.08}
        />
      </div>

      {/* Dynamic Crimson/Charcoal background colors */}
      {displayServices.map((_, i) => (
        <div
          key={`bg-${i}`}
          ref={(el) => {
            bgRefs.current[i] = el
          }}
          className="absolute inset-0 z-0 pointer-events-none opacity-0 transition-colors duration-500"
          style={{ backgroundColor: servicesBgColors[i] || '#000000' }}
        />
      ))}

      {/* Watermark Titles */}
      <div className="absolute top-10 md:top-0 left-0 w-full h-fit md:h-full flex items-start md:items-center justify-center z-0 pointer-events-none select-none">
        {displayServices.map((_, i) => (
          <h1
            key={`text-${i}`}
            ref={(el) => {
              textRefs.current[i] = el
            }}
            className="absolute text-[22vw] md:text-[18vw] font-black uppercase text-white/10 md:text-transparent leading-none tracking-tighter mix-blend-overlay"
            style={{
              WebkitTextStroke: '2px rgba(255,255,255,0.15)',
              opacity: 0,
            }}
          >
            SERVICES
          </h1>
        ))}
      </div>

      {/* Cards Container */}
      <div className="relative w-full h-full flex items-center justify-center z-10 md:transform-3d overflow-hidden">
        {displayServices.map((service, i) => (
          <div
            key={service.title || `virtual-${i}`}
            ref={(el) => {
              cardsRef.current[i] = el
            }}
            className={`absolute shrink-0 w-[82vw] sm:w-[350px] md:w-[420px] h-[460px] md:h-[530px] rounded-[30px] flex flex-col justify-between will-change-transform z-10 pointer-events-auto ${service.isVirtual ? 'opacity-0! pointer-events-none!' : ''}`}
          >
            {!service.isVirtual && <ServiceCard service={service} index={i} />}
          </div>
        ))}
      </div>
    </section>
  )
}

function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const [hovered, setHovered] = useState(false)
  const rectRef = useRef<HTMLDivElement>(null)
  const cardRectRef = useRef<DOMRect | null>(null)
  const [isTouch, setIsTouch] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // 3D Tilt calculations
  const rotateX = useTransform(mouseY, [0, 480], [4, -4])
  const rotateY = useTransform(mouseX, [0, 420], [-4, 4])

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  function handleMouseEnter() {
    if (isTouch) return
    setHovered(true)
    if (rectRef.current) {
      cardRectRef.current = rectRef.current.getBoundingClientRect()
    }
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (isTouch) return
    if (!cardRectRef.current && rectRef.current) {
      cardRectRef.current = rectRef.current.getBoundingClientRect()
    }
    const rect = cardRectRef.current
    if (!rect) return
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  function handleMouseLeave() {
    if (isTouch) return
    setHovered(false)
    cardRectRef.current = null
    mouseX.set(210)
    mouseY.set(240)
  }

  const formattedIndex = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      ref={rectRef}
      className="group relative glass rounded-[30px] p-4 cursor-default overflow-hidden border border-white/[0.07] bg-[#101010]/85 h-full flex flex-col justify-between"
      initial="rest"
      whileHover="hover"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
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
        className="absolute inset-0 rounded-[30px] pointer-events-none z-30"
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
        <div
          className="absolute top-0 left-0 w-3.5 h-3.5 border-t border-l transition-all duration-300 group-hover:w-4.5 group-hover:h-4.5"
          style={{ borderColor: hovered ? service.accent : 'rgba(255,255,255,0.2)' }}
        />
        <div
          className="absolute top-0 right-0 w-3.5 h-3.5 border-t border-r transition-all duration-300 group-hover:w-4.5 group-hover:h-4.5"
          style={{ borderColor: hovered ? service.accent : 'rgba(255,255,255,0.2)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b border-l transition-all duration-300 group-hover:w-4.5 group-hover:h-4.5"
          style={{ borderColor: hovered ? service.accent : 'rgba(255,255,255,0.2)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b border-r transition-all duration-300 group-hover:w-4.5 group-hover:h-4.5"
          style={{ borderColor: hovered ? service.accent : 'rgba(255,255,255,0.2)' }}
        />
      </div>

      {/* Spotlight tracker */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(circle at ${x}px ${y}px, ${service.accent}25 0%, transparent 65%)`
          ),
        }}
      />

      {/* Top hover accent bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-[30px] z-10"
        style={{ backgroundColor: service.accent }}
        initial={{ scaleX: 0, originX: 0 }}
        variants={{
          hover: { scaleX: 1, transition: { duration: 0.35, ease: 'easeOut' } },
          rest: { scaleX: 0 },
        }}
      />

      {/* Full Card Image (wow_portfolio style) */}
      <div className="w-full h-full rounded-[20px] overflow-hidden relative z-10 select-none">
        <img
          src={service.image || `/img/projects/project-0${(index % 12) + 1}.jpg`}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Floating Icon Box */}
        <motion.div
          className="absolute top-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 backdrop-blur-md bg-black/40 z-30"
          variants={iconBoxVariants}
        >
          <service.icon size={18} style={{ color: service.accent }} />
        </motion.div>
        
        {/* Index Number */}
        <span className="absolute top-4 right-4 font-mono text-[9px] tracking-widest text-white/70 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/5 uppercase z-30">
          {formattedIndex} // SVC
        </span>

        {/* Bottom Title Overlay (Glassmorphism caption) */}
        <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl border border-white/10 bg-black/60 backdrop-blur-md z-30 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <h3 className="text-sm md:text-base font-bold text-white mb-1">{service.title}</h3>
          <p className="text-slate-300 text-[10px] md:text-xs leading-relaxed line-clamp-2 mb-2">{service.description}</p>
          {/* Feature badge tags list */}
          <div className="flex flex-wrap gap-1 mt-2">
            {service.features.map((feat) => (
              <span
                key={feat}
                className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[8px] md:text-[9px] font-medium text-slate-300"
              >
                {feat}
              </span>
            ))}
          </div>
        </div>

        {/* Inner Glossy Reflection / Shadow Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20 pointer-events-none" />
      </div>
    </motion.div>
  )
}
