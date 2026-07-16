import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const PROFILE_IMAGE_SRC = '/img/gen/modern style 3.png'

export default function PortfolioReveal() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cropBoxRef = useRef<HTMLDivElement>(null)
  const holeRectRef = useRef<SVGRectElement>(null)

  const [bgColor, setBgColor] = useState('bg-black')

  // Custom dark themed background color palette
  const colors = [
    'bg-black',
    'bg-[#111111]',
    'bg-[#1e0307]',
    'bg-[#3b0811]',
    'bg-[#580b18]',
    'bg-[#7f1d1d]',
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section || !cropBoxRef.current || !holeRectRef.current) return

    // Set initial state
    gsap.set([cropBoxRef.current, holeRectRef.current], {
      scale: 0.8,
      opacity: 0,
      transformOrigin: '50% 50%',
    })

    // GSAP quickTo for high performance cursor follow lag
    const xToBox = gsap.quickTo(cropBoxRef.current, 'x', { duration: 0.8, ease: 'power3.out' })
    const yToBox = gsap.quickTo(cropBoxRef.current, 'y', { duration: 0.8, ease: 'power3.out' })
    const xToHole = gsap.quickTo(holeRectRef.current, 'x', { duration: 0.8, ease: 'power3.out' })
    const yToHole = gsap.quickTo(holeRectRef.current, 'y', { duration: 0.8, ease: 'power3.out' })

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const boxSize = 280
      const targetX = x - boxSize / 2
      const targetY = y - boxSize / 2

      xToBox(targetX)
      yToBox(targetY)
      xToHole(targetX)
      yToHole(targetY)
    }

    const handleMouseEnter = () => {
      gsap.to([cropBoxRef.current, holeRectRef.current], {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.5)',
      })
    }

    const handleMouseLeave = () => {
      gsap.to([cropBoxRef.current, holeRectRef.current], {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        ease: 'power2.inOut',
      })
    }

    section.addEventListener('mousemove', handleMouseMove)
    section.addEventListener('mouseenter', handleMouseEnter)
    section.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      section.removeEventListener('mousemove', handleMouseMove)
      section.removeEventListener('mouseenter', handleMouseEnter)
      section.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Shared inner content structure
  const contentJSX = (
    <>
      {/* Background Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 select-none">
        <h1 className="text-[18vw] font-black text-white leading-none tracking-tighter">
          PO
          <span className="text-transparent [-webkit-text-stroke:4px_#dc2626]">R</span>
          TF
          <span className="text-transparent [-webkit-text-stroke:4px_#dc2626]">O</span>
          LIO
        </h1>
      </div>

      {/* Center Image Content */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-6">
        <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md flex justify-center z-20">
          <img
            src={PROFILE_IMAGE_SRC}
            alt="Portfolio Portrait"
            className="w-full h-auto border-4 border-white/15 shadow-2xl rounded-2xl"
          />
        </div>
      </div>
    </>
  )

  return (
    <section
      ref={sectionRef}
      className={`relative w-full h-screen ${bgColor} transition-colors duration-500 overflow-hidden flex items-center justify-center cursor-crosshair`}
    >
      {/* Layer 1: Base Layer (Sharp) */}
      {contentJSX}

      {/* Layer 2: Backdrop Blur Overlay */}
      <div
        className="absolute inset-0 z-30 pointer-events-none"
        style={{
          WebkitBackdropFilter: 'blur(6px) brightness(0.65)',
          backdropFilter: 'blur(6px) brightness(0.65)',
        }}
      />

      {/* SVG Mask Definition */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <filter id="soft-edges" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="15" />
          </filter>
          <mask id="reveal-mask">
            <rect width="100%" height="100%" fill="black" />
            <rect
              ref={holeRectRef}
              width="280"
              height="280"
              fill="white"
              x="0"
              y="0"
              filter="url(#soft-edges)"
            />
          </mask>
        </defs>
      </svg>

      {/* Layer 3: Reveal Layer (Clipped duplication overlay) */}
      <div
        className={`absolute inset-0 z-40 pointer-events-none ${bgColor} transition-colors duration-500 flex items-center justify-center`}
        style={{
          WebkitMaskImage: 'url(#reveal-mask)',
          maskImage: 'url(#reveal-mask)',
        }}
      >
        {contentJSX}
      </div>

      {/* Layer 4: Dashed Crop Box Outline */}
      <div
        ref={cropBoxRef}
        className="absolute top-0 left-0 z-50 pointer-events-none flex items-center justify-center"
        style={{ width: 280, height: 280 }}
      >
        <div className="absolute inset-0 shadow-[0_0_25px_rgba(220,38,38,0.25)]" />
        <svg className="absolute inset-0 w-full h-full">
          <rect
            width="100%"
            height="100%"
            fill="none"
            stroke="#dc2626"
            strokeWidth="2.5"
            className="marching-ants"
          />
        </svg>
        <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-[#dc2626] border border-white" />
        <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#dc2626] border border-white" />
        <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-[#dc2626] border border-white" />
        <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[#dc2626] border border-white" />
      </div>

      {/* Layer 5: Color Selector Panel */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-transparent pointer-events-auto">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setBgColor(color)}
            className={`w-6 h-6 md:w-8 md:h-8 rounded-full shadow-md transition-all duration-300 hover:scale-110 ${color} ${
              bgColor === color
                ? 'scale-110 ring-4 ring-white/60 shadow-[0_0_15px_rgba(220,38,38,0.5)]'
                : 'border-2 border-white/40 hover:border-white'
            }`}
            aria-label="Change background color"
          />
        ))}
      </div>
    </section>
  )
}
