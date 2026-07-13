import { useEffect, useState } from 'react'

const sections = [
  { id: 'about', label: 'ABOUT', index: '01' },
  { id: 'experience', label: 'EXPERIENCE', index: '02' },
  { id: 'services', label: 'SERVICES', index: '03' },
  { id: 'projects', label: 'PROJECTS', index: '04' },
  { id: 'contact', label: 'CONTACT', index: '05' },
]

export function ScrollHUDTracker() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    let ticking = false
    let lastProgress = -1
    let lastActiveSection = ''
    let isMounted = true

    const updateScrollHUD = () => {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const totalHeight = documentHeight - viewportHeight

      // 1. Calculate Scroll Progress Percentage
      const progress = totalHeight <= 0
        ? 0
        : Math.min(Math.max(Math.round((scrollY / totalHeight) * 100), 0), 100)

      if (progress !== lastProgress && isMounted) {
        setScrollProgress(progress)
        lastProgress = progress
      }

      // 2. Calculate Active Section based on Viewport Spanning
      // Check if we are at the bottom of the page
      const isAtBottom = viewportHeight + scrollY >= documentHeight - 15
      let currentActive = 'about'

      if (isAtBottom) {
        currentActive = 'contact'
      } else {
        const thresholdY = scrollY + (viewportHeight * 0.35) // 35% down the viewport

        for (let i = 0; i < sections.length; i++) {
          const el = document.getElementById(sections[i].id)
          if (el) {
            const rect = el.getBoundingClientRect()
            const topOffset = rect.top + scrollY
            const bottomOffset = topOffset + el.offsetHeight

            // Check if threshold falls inside this section
            if (thresholdY >= topOffset && thresholdY < bottomOffset) {
              currentActive = sections[i].id
              break
            }
          }
        }
      }

      if (currentActive !== lastActiveSection && isMounted) {
        setActiveSection(currentActive)
        lastActiveSection = currentActive
      }

      ticking = false
    }

    const onScrollOrResize = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollHUD)
        ticking = true
      }
    }

    // Bind scroll and resize triggers
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize, { passive: true })

    // Run initial calculation
    updateScrollHUD()

    return () => {
      isMounted = false
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [])

  const handleLinkClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-6 font-mono select-none">
      {/* System status */}
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]" />
        <span className="text-[9px] font-bold text-slate-500 tracking-[0.2em]">SYS // ACTIVE</span>
      </div>

      {/* Progress display */}
      <div className="flex flex-col items-end">
        <span className="text-[14px] font-black text-slate-100 tabular-nums">
          [ {String(scrollProgress).padStart(3, '0')}% ]
        </span>
        <div className="w-[2px] h-12 bg-white/5 mt-2 relative rounded-full overflow-hidden">
          <div
            className="absolute top-0 right-0 left-0 bg-red-500 transition-all duration-100 shadow-[0_0_8px_#ef4444]"
            style={{ height: `${scrollProgress}%` }}
          />
        </div>
      </div>

      {/* Section List */}
      <div className="flex flex-col gap-4 items-end mt-2">
        {sections.map((s) => {
          const isActive = activeSection === s.id
          return (
            <button
              key={s.id}
              onClick={() => handleLinkClick(s.id)}
              className="group flex items-center gap-3 text-right cursor-pointer outline-none focus:outline-none bg-transparent border-none p-0"
            >
              {/* Text indicator */}
              <span
                className={`text-[9px] tracking-widest font-semibold transition-all duration-300 ${
                  isActive
                    ? 'text-white font-bold drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {s.label}
              </span>

              {/* Number indicator */}
              <span
                className={`text-[10px] font-bold font-mono transition-all duration-300 ${
                  isActive
                    ? 'text-red-500 drop-shadow-[0_0_6px_rgba(239,68,68,0.6)]'
                    : 'text-slate-600 group-hover:text-slate-400'
                }`}
              >
                [{s.index}]
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
