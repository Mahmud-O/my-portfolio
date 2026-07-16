import { useEffect, useRef, useState } from 'react'
import { projects } from '@/lib/data/projects'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ProjectsSection() {
  const [folderOpen, setFolderOpen] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const folderBackRef = useRef<HTMLDivElement>(null)
  const folderFrontRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const mobileCardsRef = useRef<(HTMLDivElement | null)[]>([])
  const mobileCarouselRef = useRef<HTMLDivElement>(null)

  // Display at most 8 projects for the 3x3 folder dispersion layout
  const displayProjects = [...projects].reverse()

  const getGridPos = (index: number) => {
    let row = 0, col = 0
    if (index < 3) {
      row = 0; col = index
    } else if (index === 3) {
      row = 1; col = 0 // Middle row, left card
    } else if (index === 4) {
      row = 1; col = 2 // Middle row, right card
    } else {
      row = 2; col = index - 5 // Bottom row
    }
    return { row, col }
  }

  // Effect to initialize GSAP scroll-triggered animations
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Set initial folder stacking center coordinates
      gsap.set([folderBackRef.current, folderFrontRef.current], {
        xPercent: -50,
        yPercent: -50,
      })

      // Front flap rotates from the bottom margin edge
      if (folderFrontRef.current) {
        gsap.set(folderFrontRef.current, { transformOrigin: 'bottom center' })
      }

      // Pack desktop cards inside folder initially
      cardsRef.current.forEach((card) => {
        if (!card) return
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          rotation: gsap.utils.random(-6, 6),
          scale: 0.8,
          x: 0,
          y: 0,
          opacity: 0,
        })
      })

      let mm = gsap.matchMedia()

      mm.add(
        {
          isDesktop: '(min-width: 768px)',
          isMobile: '(max-width: 767px)',
        },
        (context) => {
          const { isDesktop, isMobile } = context.conditions as { isDesktop: boolean; isMobile: boolean }

          if (isDesktop) {
            let floatTween: gsap.core.Tween | null = null

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 50%',
                end: 'bottom 50%',
                toggleActions: 'play reverse play reverse',
                onEnter: () => { floatTween?.kill() },
                onEnterBack: () => { floatTween?.kill() },
                onLeave: () => { floatTween?.kill() },
                onLeaveBack: () => { floatTween?.kill() },
              },
              onComplete: () => {
                setFolderOpen(true)
                // Apply idle floating physics to cards upon dispersion completion
                floatTween = gsap.to(cardsRef.current.filter(Boolean), {
                  y: '+=12',
                  rotation: '+=1',
                  duration: 3.5,
                  yoyo: true,
                  repeat: -1,
                  ease: 'sine.inOut',
                  stagger: { amount: 1.5, from: 'random' },
                })
              },
              onReverseComplete: () => {
                setFolderOpen(false)
              }
            })

            // 1. Fold down the folder's front flap
            tl.to(folderFrontRef.current, {
              rotationX: -130,
              duration: 1.2,
              ease: 'power3.inOut',
            })

            // 2. Rise card stack upwards from pocket
            tl.to(cardsRef.current.filter(Boolean), {
              y: -120,
              scale: 0.85,
              opacity: 1,
              zIndex: 70, // Bring above the folded flap
              duration: 0.6,
              stagger: 0.04,
              ease: 'back.out(1.2)',
            }, '-=0.6')

            // 3. Disperse cards into their grid positions
            tl.to(cardsRef.current.filter(Boolean), {
              x: (i) => {
                const card = cardsRef.current[i]
                const w = card?.offsetWidth || 340
                const gap = 40
                const { col } = getGridPos(i)
                return (col - 1) * (w + gap)
              },
              y: (i) => {
                const card = cardsRef.current[i]
                const h = card?.offsetHeight || 480
                const gap = 40
                const { row } = getGridPos(i)
                return (row - 1) * (h + gap)
              },
              rotation: () => gsap.utils.random(-4, 4),
              scale: 1,
              duration: 1.4,
              stagger: { amount: 0.4, from: 'center' },
              ease: 'expo.out',
            }, '-=0.2')
          }

          if (isMobile) {
            const cardW = window.innerWidth * 0.75
            const gap = 24

            // Pull mobile cards center inside the folder initially
            mobileCardsRef.current.forEach((card, i) => {
              if (!card) return
              gsap.set(card, {
                x: -(i * (cardW + gap)),
                y: 0,
                scale: 0.4,
                opacity: 0,
                rotation: gsap.utils.random(-15, 15),
              })
            })

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 60%',
              },
            })

            // 1. Fold down flap
            tl.to(folderFrontRef.current, {
              rotationX: -130,
              duration: 0.8,
              ease: 'power3.inOut',
            })

            // 2. Rise stack
            tl.to(mobileCardsRef.current.filter(Boolean), {
              y: -100,
              opacity: 1,
              scale: 0.85,
              duration: 0.6,
              stagger: 0.05,
              ease: 'back.out(1.2)',
            }, '-=0.4')

            // 3. Align slide items horizontally
            tl.to(mobileCardsRef.current.filter(Boolean), {
              x: 0,
              y: 0,
              rotation: 0,
              scale: (i) => (i === 0 ? 1 : 0.92),
              opacity: (i) => (i === 0 ? 1 : 0.5),
              duration: 0.8,
              stagger: 0.08,
              ease: 'expo.out',
              onComplete: () => {
                if (mobileCarouselRef.current) {
                  mobileCarouselRef.current.style.overflowX = 'auto'
                  mobileCarouselRef.current.style.pointerEvents = 'auto'
                }
              },
            }, '-=0.2')

            // Drag/scroll snapping interpolation logic
            if (mobileCarouselRef.current) {
              const carousel = mobileCarouselRef.current
              const onScroll = () => {
                const scrollLeft = carousel.scrollLeft
                mobileCardsRef.current.forEach((card, i) => {
                  if (!card) return
                  const cardCenter = i * (cardW + gap)
                  const dist = Math.abs(scrollLeft - cardCenter)
                  const maxDist = cardW + gap
                  const progress = Math.max(0, 1 - dist / maxDist)

                  gsap.set(card, {
                    scale: 0.92 + 0.08 * progress,
                    opacity: 0.5 + 0.5 * progress,
                  })
                })
              }

              carousel.addEventListener('scroll', onScroll, { passive: true })
              return () => {
                carousel.removeEventListener('scroll', onScroll)
              }
            }
          }
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="projects"
      ref={containerRef}
      className="bg-black min-h-[100svh] md:min-h-[150vh] relative font-sans overflow-x-clip text-white w-full flex items-center justify-center py-20 md:py-40"
    >
      {/* Background Typography */}
      <div className="absolute top-0 left-0 w-full flex items-start justify-center pointer-events-none z-0 pt-1 md:pt-0">
        <h1 className="text-[15vw] sm:text-[18vw] md:text-[22vw] font-black text-white/30 tracking-tighter leading-none whitespace-nowrap uppercase">
          My Work
        </h1>
      </div>

      {/* Crimson Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-[#dc2626]/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Main Perspective Container */}
      <div className="mt-12 relative w-full max-w-7xl h-full flex items-center justify-center perspective-2000 z-10">
        {/* 3D Perspective Folder Layout (Desktop Only) */}
        {displayProjects.length > 0 && (
          <div className="hidden md:flex relative w-full h-[600px] items-center justify-center z-10 select-none">
            <div className="relative w-0 h-0">
              {/* Folder Back Cover */}
              <div
                ref={folderBackRef}
                className="absolute w-[80vw] md:w-[32vw] max-w-[380px] aspect-video bg-[#3b0811] rounded-[24px] shadow-[0_20px_50px_rgba(220,38,38,0.25)] flex items-center justify-center border border-white/5"
                style={{ zIndex: 5 }}
              >
                {/* Folder Top Tab */}
                <div className="absolute -top-5 left-6 w-32 h-8 bg-[#1e0307] rounded-t-xl border-t border-x border-white/5" />
                <div className="relative z-10 text-[#dc2626]/40 font-black text-2xl tracking-widest uppercase">
                  Archive
                </div>
              </div>

              {/* Dispersing Project Cards */}
              {displayProjects.map((project, i) => (
                <div
                  key={project.id}
                  ref={(el) => {
                    cardsRef.current[i] = el
                  }}
                  className="absolute w-[80vw] md:w-[26vw] max-w-[340px] aspect-video will-change-transform hover:!z-[100]"
                  style={{ zIndex: folderOpen ? 70 + i : 10 + i }}
                >
                  <div className="w-full h-full rounded-[24px] md:rounded-[28px] overflow-hidden border border-white/10 bg-[#111111]/80 backdrop-blur-md shadow-[0_15px_35px_rgba(0,0,0,0.4)] transition-all duration-500 group hover:scale-[1.03] hover:shadow-[0_30px_60px_rgba(220,38,38,0.2)] hover:-translate-y-2 cursor-pointer relative z-10 will-change-transform">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" loading="lazy" />
                    
                    {/* Explore Overlay */}
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6"
                    >
                      <h3 className="text-white font-bold text-base md:text-lg mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{project.title}</h3>
                      <span className="text-[#dc2626] font-mono tracking-wider text-[10px] md:text-xs font-semibold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">EXPLORE // Live Project</span>
                    </a>
                    
                    {/* Glow ring on hover */}
                    <div className="absolute inset-0 border-[3px] border-transparent group-hover:border-[#dc2626]/40 rounded-[24px] md:rounded-[28px] transition-colors duration-500 pointer-events-none" />
                  </div>
                </div>
              ))}

              {/* Folder Front Cover Flap */}
              <div
                ref={folderFrontRef}
                className="absolute w-[80vw] md:w-[32vw] max-w-[380px] aspect-video pointer-events-none will-change-transform"
                style={{ zIndex: 60 }}
              >
                <div className="absolute bottom-0 w-full h-[85%] bg-[#dc2626] rounded-b-[24px] rounded-t-md shadow-[0_-10px_30px_rgba(0,0,0,0.4)] flex flex-col justify-end p-6 border-t border-white/20">
                  <div className="absolute inset-0 rounded-b-[24px] shadow-[inset_0_-10px_20px_rgba(255,255,255,0.05)]" />
                  <div className="w-16 h-1.5 bg-black/20 rounded-full mx-auto mb-2" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Swipeable Carousel Overlay */}
      {displayProjects.length > 0 && (
        <div
          ref={mobileCarouselRef}
          className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-auto py-12 flex items-center gap-6 px-[12.5vw] pointer-events-none z-[100] snap-x snap-mandatory overflow-x-hidden hide-scrollbar"
        >
          {displayProjects.map((project, i) => (
            <div
              key={`mob-${project.id}`}
              ref={(el) => {
                mobileCardsRef.current[i] = el
              }}
              className="shrink-0 w-[75vw] aspect-video snap-center will-change-transform relative z-10 pointer-events-auto"
            >
              <div className="w-full h-full rounded-[24px] md:rounded-[28px] overflow-hidden border border-white/10 bg-[#111111]/80 backdrop-blur-md shadow-[0_15px_35px_rgba(0,0,0,0.4)] transition-all duration-500">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
