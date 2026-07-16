import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Testimonial {
  image: string
  name: string
  handle: string
  text: string
}

const testimonialsData: Testimonial[] = [
  {
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200',
    name: 'Sarah Jenkins',
    handle: '@sarahj_dev',
    text: 'Mahmoud is an exceptional developer. His expertise in React and Node.js helped us ship our product ahead of schedule.',
  },
  {
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200',
    name: 'David Kross',
    handle: '@davidk_cto',
    text: 'Amazing attention to detail. The UI components are incredibly smooth, and the backend codebase is highly optimized.',
  },
  {
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200',
    name: 'Emily Chen',
    handle: '@emily_founder',
    text: 'Working with Mahmoud was a breeze. He delivered a fast, secure, and beautiful website that our clients absolutely love.',
  },
  {
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200',
    name: 'Marcus Miller',
    handle: '@marcusm_tech',
    text: 'His full-stack capabilities are impressive. He solved our database bottlenecks easily and built a fantastic UI.',
  },
]

function TestimonialCard({ card }: { card: Testimonial }) {
  return (
    <div className="p-5 rounded-xl mx-4 shadow-lg hover:shadow-crimson-500/5 transition-all duration-300 w-80 shrink-0 bg-[#111111] border border-white/[0.06] flex flex-col justify-between">
      <div className="flex gap-3">
        <img className="w-11 h-11 rounded-full object-cover border border-white/10" src={card.image} alt={card.name} />
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1.5">
            <p className="font-semibold text-sm text-white">{card.name}</p>
            {/* Crimson Verification Badge */}
            <svg className="fill-[#dc2626]" width="14" height="14" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z" />
            </svg>
          </div>
          <span className="text-xs text-slate-500">{card.handle}</span>
        </div>
      </div>
      <p className="text-sm pt-4 text-slate-300 leading-relaxed">{card.text}</p>
    </div>
  )
}

export default function WelcomeSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const heroImgNode = document.querySelector('#hero-image') as HTMLElement
      if (!heroImgNode || !sectionRef.current) return

      // GSAP scroll trigger to scale and translate the hero image to welcome screen
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom', // When welcome top enters viewport bottom
          end: 'top top',    // When welcome top hits viewport top
          scrub: 1,
        },
      })

      tl.to(heroImgNode, {
        y: () => {
          const rect = heroImgNode.getBoundingClientRect()
          const originalTopY = rect.top + window.scrollY

          const welcomeRect = sectionRef.current!.getBoundingClientRect()
          const welcomeTopY = welcomeRect.top + window.scrollY

          // Position the top of the image (head) so the face centers on the watermark
          // On mobile, we offset down by 12vh to keep the face visible under the navbar.
          // On desktop, we offset slightly up by 8vh to match wow_portfolio.
          const offset = window.innerWidth < 1024
            ? (window.innerHeight * 0.12)
            : -(window.innerHeight * 0.08)

          const targetTopY = welcomeTopY + offset
          return targetTopY - originalTopY
        },
        scale: () => (window.innerWidth < 1024 ? 2.8 : 3.8),
        transformOrigin: 'top center',
        x: () => {
          if (window.innerWidth < 1024) return 0 // Move straight down on small screens
          const rect = heroImgNode.getBoundingClientRect()
          const originalCenterX = rect.left + window.scrollX + rect.width / 2
          const targetCenterX = window.innerWidth / 2
          return targetCenterX - originalCenterX
        },
        ease: 'power2.inOut',
      }, 0)

      // Fade and slide the watermark text
      tl.fromTo(
        '.welcome-huge-text',
        {
          y: -100,
          scale: 0.9,
          opacity: 0,
        },
        {
          y: 0,
          scale: 1,
          opacity: 0.45, // Enhanced watermark visibility
          ease: 'power2.out',
        },
        0
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="welcome"
      className="relative w-full h-[200vh] bg-transparent text-white flex flex-col items-center justify-start overflow-hidden pointer-events-none"
    >
      {/* Screen 1: Welcome Watermark Banner */}
      
      <div className="w-full h-screen text-center z-0 flex flex-col items-center justify-center relative">
        <h2 className="welcome-huge-text text-[28vw] sm:text-[20vw] md:text-[14vw] font-black uppercase tracking-tighter text-white leading-none whitespace-nowrap px-4">
          WELCOME
        </h2>
        <p className="welcome-huge-text mt-2 text-zinc-500 font-medium tracking-widest uppercase text-xs md:text-base">
          To my creative space
        </p>
      </div>

      {/* Screen 2: Client Testimonials Marquee */}
      <div className="w-full h-screen z-20 flex flex-col justify-center gap-8 md:gap-12 relative bg-black border-t border-white/5 pointer-events-auto shadow-[0_-30px_60px_rgba(0,0,0,0.8)]">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#dc2626]/5 rounded-full blur-[160px] pointer-events-none z-0" />

        {/* Shadow gradient to fade the top edge transition */}
        <div className="absolute -top-32 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />

        <div className="text-center z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] animate-pulse" />
            <span className="text-[10px] md:text-xs font-mono tracking-wider text-slate-400 uppercase">Testimonials</span>
          </div>
          <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-2">
            Client Love
          </h3>
          <p className="text-slate-400 font-medium text-xs md:text-sm">What partners are saying</p>
        </div>

        <div className="flex flex-col gap-6 relative z-10">
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes marqueeScroll {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .marquee-inner {
              animation: marqueeScroll 12s linear infinite;
            }
            @media (min-width: 768px) {
              .marquee-inner {
                animation: marqueeScroll 30s linear infinite;
              }
            }
            .marquee-reverse {
              animation-direction: reverse;
            }
          `}} />

          {/* Row 1: Scrolling Left */}
          <div className="marquee-row w-full mx-auto max-w-[100vw] overflow-hidden relative">
            <div className="absolute left-0 top-0 h-full w-20 md:w-32 z-10 pointer-events-none bg-gradient-to-r from-black to-transparent" />
            <div className="marquee-inner flex transform-gpu min-w-[200%]">
              {[...testimonialsData, ...testimonialsData, ...testimonialsData, ...testimonialsData].map((card, index) => (
                <TestimonialCard key={`t1-${index}`} card={card} />
              ))}
            </div>
            <div className="absolute right-0 top-0 h-full w-20 md:w-32 z-10 pointer-events-none bg-gradient-to-l from-black to-transparent" />
          </div>

          {/* Row 2: Scrolling Right (Reverse) */}
          <div className="marquee-row w-full mx-auto max-w-[100vw] overflow-hidden relative">
            <div className="absolute left-0 top-0 h-full w-20 md:w-32 z-10 pointer-events-none bg-gradient-to-r from-black to-transparent" />
            <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%]">
              {[...testimonialsData, ...testimonialsData, ...testimonialsData, ...testimonialsData].map((card, index) => (
                <TestimonialCard key={`t2-${index}`} card={card} />
              ))}
            </div>
            <div className="absolute right-0 top-0 h-full w-20 md:w-32 z-10 pointer-events-none bg-gradient-to-l from-black to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
