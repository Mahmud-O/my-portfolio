import { useEffect, useRef, useState } from 'react'
import { FaGithub, FaLinkedin, FaFacebookF } from 'react-icons/fa6'
import { IoLogoWhatsapp } from 'react-icons/io'
import { ParallaxOrb } from '@/components/ui/ParallaxOrb'

const PROFILE_IMAGE_SRC = '/img/gen/modern style 1.png'

export default function HeroSection() {
  const [profileImageAvailable, setProfileImageAvailable] = useState(true)

  const containerRef = useRef<HTMLDivElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mounted = true
    let cleanup: (() => void) | undefined
    let hasLoadedListener = false

    const runAnimation = async () => {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (!mounted) return

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

        tl.fromTo(
          subRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.1
        )

        tl.fromTo(
          '.hero-heading-line',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
          0.2
        )

        tl.fromTo(
          portraitRef.current,
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.2)' },
          0.35
        )

        tl.fromTo(descRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.6)
        tl.fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.75)
        tl.fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.1)

        // Scroll Parallax for Hero Image
        gsap.to(portraitRef.current, {
          y: 100,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        })

        // Scroll Parallax for Text Content (fades and moves up)
        gsap.to(textRef.current, {
          y: -50,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        })
      }, containerRef)

      cleanup = () => ctx.revert()
    }

    const startAnimation = () => {
      if (!mounted) return
      void runAnimation()
    }

    const handleLoaded = () => {
      startAnimation()
    }

    const checkAndStart = () => {
      if (window.__portfolioLoaded) {
        startAnimation()
      } else {
        window.addEventListener('portfolio-loaded', handleLoaded)
        hasLoadedListener = true
      }
    }

    const idleId = window.requestIdleCallback
      ? window.requestIdleCallback(checkAndStart, { timeout: 1500 })
      : window.setTimeout(checkAndStart, 250)

    return () => {
      mounted = false
      if (window.cancelIdleCallback) {
        window.cancelIdleCallback(idleId)
      } else {
        window.clearTimeout(idleId)
      }
      if (hasLoadedListener) {
        window.removeEventListener('portfolio-loaded', handleLoaded)
      }
      cleanup?.()
    }
  }, [])

  return (
    <section id="hero" ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center bg-grid">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <ParallaxOrb
          className="anim-orb-1 absolute rounded-full opacity-30 w-75 h-75 sm:w-100 sm:h-100 md:w-125 md:h-125 lg:w-150 lg:h-150 xl:w-175 xl:h-175"
          style={{
            top: '-10%',
            right: '-5%',
            background: 'radial-gradient(circle, rgba(220,38,38,0.3) 0%, rgba(220,38,38,0.08) 50%, transparent 100%)',
          }}
          speedX={0.03}
          speedY={0.03}
          scrollSpeed={-0.12}
        />
        <ParallaxOrb
          className="anim-orb-2 absolute rounded-full opacity-25 w-62.5 h-62.5 sm:w-87.5 sm:h-87.5 md:w-100 md:h-100 lg:w-125 lg:h-125 xl:w-150 xl:h-150"
          style={{
            bottom: '-5%',
            left: '-5%',
            background: 'radial-gradient(circle, rgba(185,28,28,0.25) 0%, rgba(185,28,28,0.06) 50%, transparent 100%)',
          }}
          speedX={-0.04}
          speedY={0.02}
          scrollSpeed={-0.08}
        />
        <ParallaxOrb
          className="anim-orb-3 absolute rounded-full opacity-15 w-50 h-50 sm:w-62.5 sm:h-62.5 md:w-75 md:h-75 lg:w-87.5 lg:h-87.5 xl:w-112.5 xl:h-112.5"
          style={{
            top: '40%',
            left: '20%',
            background: 'radial-gradient(circle, rgba(220,38,38,0.08) 0%, rgba(220,38,38,0.02) 50%, transparent 100%)',
          }}
          speedX={0.02}
          speedY={-0.03}
          scrollSpeed={-0.15}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 h-full pt-20 pb-6 lg:pt-24 lg:pb-12">
        <div ref={textRef} className="w-full lg:w-[55%] flex flex-col items-start justify-center text-white z-20 h-full will-change-transform">
          <div ref={subRef} style={{ opacity: 0 }} className="mb-4 text-left">
            <span className="inline-block text-[#dc2626] text-xs sm:text-sm font-bold tracking-[0.3em] uppercase">
              Full-Stack Developer
            </span>
          </div>

          <div className="flex flex-col mb-6 w-full text-left hero-heading-line" style={{ opacity: 0 }}>
            <div className="leading-[0.85] pb-1">
              <h1 className="text-[10vw] lg:text-[5.5rem] xl:text-[6.5rem] font-black uppercase tracking-tighter text-white">
                Hello, I'm
              </h1>
            </div>
            <div className="leading-[0.85] pb-1">
              <h1 className="text-[10vw] lg:text-[5.5rem] xl:text-[6.5rem] font-black uppercase tracking-tighter text-white">
                Mahmoud Osama
              </h1>
            </div>
            <div className="leading-[0.85] pb-1 overflow-hidden h-[9.5vw] lg:h-[4.8rem] xl:h-[5.8rem] relative">
              <style dangerouslySetInnerHTML={{__html: `
                @keyframes text-roll {
                  0%, 20% { transform: translateY(0%); }
                  25%, 45% { transform: translateY(-20%); }
                  50%, 70% { transform: translateY(-40%); }
                  75%, 95% { transform: translateY(-60%); }
                  100% { transform: translateY(-80%); }
                }
                .animate-text-roll {
                  animation: text-roll 8s cubic-bezier(0.25, 1, 0.5, 1) infinite;
                }
              `}} />
              <div className="animate-text-roll flex flex-col">
                {['Developer', 'Freelancer', 'Designer', 'Creator', 'Developer'].map((text, idx) => (
                  <h1
                    key={idx}
                    className="text-[10vw] lg:text-[5.5rem] xl:text-[6.5rem] font-black uppercase tracking-tighter text-transparent [-webkit-text-stroke:2px_#dc2626] m-0 p-0 pb-1 leading-[0.85]"
                  >
                    {text}
                  </h1>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8 max-w-lg text-left">
            <p ref={descRef} style={{ opacity: 0 }} className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">
              Passionate Web Developer crafting modern, interactive, and premium MERN stack web applications with rich animations and responsive layouts.
            </p>
          </div>

          <div
            ref={ctaRef}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10 sm:mb-16 lg:mb-0 select-none"
            style={{ opacity: 0 }}
          >
            {/* WhatsApp */}
            <a
              href="https://wa.me/+201016074277"
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-full bg-white/3 border border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-[#25D366] hover:border-[#25D366] hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] group"
              aria-label="WhatsApp"
            >
              <IoLogoWhatsapp className="w-5 h-5 text-white group-hover:text-white transition-colors" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/ma252002/"
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-full bg-white/3 border border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-[#0a66c2] hover:border-[#0a66c2] hover:shadow-[0_0_20px_rgba(10,102,194,0.4)] group"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5 text-white group-hover:text-white transition-colors" />
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/mahmoud.osama.550367"
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-full bg-white/3 border border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-[#1877F2] hover:border-[#1877F2] hover:shadow-[0_0_20px_rgba(24,119,242,0.4)] group"
              aria-label="Facebook"
            >
              <FaFacebookF className="w-4 h-4 text-white group-hover:text-white transition-colors animate-none" />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/Mahmud-O"
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-full bg-white/3 border border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-[#dc2626] hover:border-[#dc2626] hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] group"
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5 text-white group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>

        <div
          ref={portraitRef}
          className="w-full lg:w-[45%] flex justify-center items-center h-full z-10 pt-4 lg:pt-0"
          style={{ opacity: 0 }}
        >
          {profileImageAvailable ? (
            <img
              id="hero-image"
              src={PROFILE_IMAGE_SRC}
              alt="Mahmoud Osama Developer"
              className="w-full max-w-[280px] lg:max-w-xl max-h-[45vh] lg:max-h-[85vh] object-contain drop-shadow-[0_25px_40px_rgba(220,38,38,0.15)] pointer-events-none will-change-transform"
              loading="eager"
              onError={() => setProfileImageAvailable(false)}
            />
          ) : (
            <div className="w-48 h-48 rounded-full flex items-center justify-center bg-zinc-900 border border-white/10 text-4xl font-black text-white">
              MO
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
