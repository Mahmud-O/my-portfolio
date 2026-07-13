import { useEffect, useRef, useState } from 'react'
import { FaArrowRight, FaDownload, FaGithub } from 'react-icons/fa6'
import { HERO_PHRASES } from '@/lib/heroData'
import { ParallaxOrb } from '@/components/ui/ParallaxOrb'

const PROFILE_IMAGE_SRC = '/img/personal-portrait-768.jpg'
const PROFILE_IMAGE_SRC_SET = [
  '/img/personal-portrait-768.jpg 768w',
  '/img/personal-portrait-1024.jpg 1024w',
].join(', ')

export default function HeroSection() {
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)
  const [profileImageAvailable, setProfileImageAvailable] = useState(true)

  const containerRef = useRef<HTMLDivElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % HERO_PHRASES.length
      const fullText = HERO_PHRASES[i]

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      )

      setTypingSpeed(isDeleting ? 40 : 80)

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2500)
      } else if (isDeleting && text === '') {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
        setTypingSpeed(400)
      }
    }

    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [text, isDeleting, loopNum, typingSpeed])

  useEffect(() => {
    let mounted = true
    let cleanup: (() => void) | undefined
    let hasLoadedListener = false

    const runAnimation = async () => {
      const { default: gsap } = await import('gsap')
      if (!mounted) return

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

        if (headlineRef.current) {
          const text = headlineRef.current.textContent || ''
          headlineRef.current.innerHTML = text
            .split('')
            .map((ch) =>
              ch === ' '
                ? `<span style="display:inline-block;width:0.3em">&nbsp;</span>`
                : `<span style="display:inline-block;opacity:0;transform:translateY(60px)">${ch}</span>`
            )
            .join('')

          tl.to(
            headlineRef.current.querySelectorAll('span'),
            {
              opacity: 1,
              y: 0,
              duration: 0.06,
              stagger: 0.03,
              ease: 'back.out(1.5)',
            },
            0.2
          )
        }

        tl.fromTo(
          portraitRef.current,
          { opacity: 0, y: 24, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.35)' },
          0.35
        )
        tl.fromTo(subRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, 0.55)
        tl.fromTo(descRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.75)
        tl.fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.9)
        tl.fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.3)

        gsap.to(cursorRef.current, {
          opacity: 0,
          duration: 0.25,
          repeat: -1,
          yoyo: true,
          ease: 'steps(1)',
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
    <section id="hero" ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-grid">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <ParallaxOrb
          className="anim-orb-1 absolute rounded-full opacity-30 w-75 h-75 sm:w-100 sm:h-100 md:w-125 md:h-125 lg:w-150 lg:h-150 xl:w-175 xl:h-175"
          style={{
            top: '-10%',
            right: '-5%',
            background: 'radial-gradient(circle, rgba(220,38,38,0.55) 0%, rgba(220,38,38,0) 70%)',
            filter: 'blur(60px)',
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
            background: 'radial-gradient(circle, rgba(185,28,28,0.45) 0%, rgba(185,28,28,0) 70%)',
            filter: 'blur(60px)',
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
            background: 'radial-gradient(circle, rgba(220,38,38,0.12) 0%, rgba(220,38,38,0) 70%)',
            filter: 'blur(80px)',
          }}
          speedX={0.02}
          speedY={-0.03}
          scrollSpeed={-0.15}
        />
      </div>

      <div className="relative z-10 w-full max-w-4xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-360 3xl:max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 pt-20 sm:pt-28 md:pt-32 lg:pt-34 xl:pt-36 pb-10 sm:pb-20 md:pb-24 lg:pb-28 xl:pb-32">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] xl:grid-cols-[minmax(0,1fr)_23rem] lg:text-left">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left min-w-0">
            <div
              ref={subRef}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-green-500/25 bg-green-500/8 mb-5 sm:mb-6 text-xs sm:text-sm font-mono text-green-400"
              style={{ opacity: 0 }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for opportunities
            </div>

            <h1
              ref={headlineRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl 3xl:text-[7.5rem] font-black text-white mb-4 sm:mb-5 lg:mb-6 tracking-tight leading-[1.05]"
            >
              Mahmoud Osama
            </h1>

            <div className="flex flex-wrap items-baseline justify-center lg:justify-start gap-x-1 mb-6 sm:mb-8 lg:mb-9 min-h-7 sm:min-h-10 lg:min-h-14">
              <p className="text-base xs:text-lg sm:text-xl md:text-2xl xl:text-3xl 2xl:text-4xl font-light text-slate-400 text-center lg:text-left">
                I engineer{' '}
                <span className="gradient-text font-semibold">{text}</span>
              </p>
              <span
                ref={cursorRef}
                className="text-lg sm:text-xl md:text-2xl xl:text-3xl 2xl:text-4xl font-light text-slate-300"
              >
                |
              </span>
            </div>

            <p
              ref={descRef}
              className="text-sm sm:text-base md:text-lg xl:text-xl 2xl:text-2xl text-slate-400 max-w-xl md:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl mx-auto lg:mx-0 leading-relaxed mb-8 sm:mb-12 lg:mb-12 px-2 sm:px-0"
              style={{ opacity: 0 }}
            >
              Full Stack Developer specializing in{' '}
              <span className="gradient-text font-medium">React.js</span> &{' '}
              <span className="gradient-text font-medium">Node.js</span>. Passionate
              about crafting pixel-perfect UIs, robust backends, and accessible
              digital experiences.
            </p>

            <div
              ref={ctaRef}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 lg:gap-5 mb-10 sm:mb-16 lg:mb-0"
              style={{ opacity: 0 }}
            >
              <a
                href="#projects"
                className="btn-primary text-sm sm:text-base lg:text-lg px-6! sm:px-7! lg:px-8! py-2.5! sm:py-3! lg:py-4!"
              >
                View My Work
                <FaArrowRight size={14} className="sm:size-4 lg:size-5" />
              </a>
              <a
                href="/Mahmoud_Osama_Full_Stack.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm sm:text-base lg:text-lg px-6! sm:px-7! lg:px-8! py-2.5! sm:py-3! lg:py-4!"
              >
                <FaDownload size={14} className="sm:size-4 lg:size-5" />
                Download CV
              </a>
              <a
                href="https://github.com/Mahmud-O"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm sm:text-base lg:text-lg px-6! sm:px-7! lg:px-8! py-2.5! sm:py-3! lg:py-4!"
              >
                <FaGithub size={16} className="sm:size-4 lg:size-5" />
                GitHub
              </a>
            </div>
          </div>

          <div
            ref={portraitRef}
            className="relative order-first lg:order-0 mx-auto lg:mx-0 lg:justify-self-end w-30 h-30 sm:w-36 sm:h-36 lg:w-72 lg:h-72 xl:w-82 xl:h-82"
            style={{ opacity: 0 }}
          >
            {/* Isolated Crop Container */}
            <div className="relative w-full h-full rounded-full overflow-hidden p-[2.5px] bg-black shadow-[0_18px_70px_rgba(220,38,38,0.25)] lg:shadow-[0_28px_100px_rgba(220,38,38,0.3)]">

              {/* Conic Gradient rotating inside cropped frame */}
              <div
                className="absolute inset-[-100%] rounded-full animate-conic-rotate pointer-events-none z-0"
                style={{
                  background: 'conic-gradient(from 0deg, #dc2626 0%, #ef4444 25%, transparent 50%, #b91c1c 75%, #dc2626 100%)',
                }}
              />

              {/* Image Panel */}
              <div className="relative z-10 w-full h-full rounded-full overflow-hidden bg-black border border-white/10">
                {profileImageAvailable ? (
                  <img
                    src={PROFILE_IMAGE_SRC}
                    srcSet={PROFILE_IMAGE_SRC_SET}
                    sizes="(min-width: 1280px) 328px, (min-width: 1024px) 288px, (min-width: 640px) 144px, 120px"
                    alt="Mahmoud Osama portrait"
                    width={768}
                    height={768}
                    decoding="async"
                    fetchPriority="high"
                    onError={() => setProfileImageAvailable(false)}
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-slate-900 to-black text-3xl sm:text-4xl lg:text-7xl font-black gradient-text">
                    MO
                  </div>
                )}
              </div>
            </div>

            {/* Status Dot (Remains Unclipped outside Crop Area) */}
            <span className="absolute right-3 bottom-3 lg:right-7 lg:bottom-7 w-5 h-5 lg:w-7 lg:h-7 rounded-full bg-green-400 border-4 border-black shadow-[0_0_18px_rgba(74,222,128,0.7)] z-20" />
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="animate-bounce-y absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        style={{ opacity: 0 }}
      >
        <span className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest font-mono">
          Scroll
        </span>
        <div className="w-px h-8 md:h-12 lg:h-14 bg-linear-to-b from-slate-500 to-transparent" />
      </div>
    </section>
  )
}
