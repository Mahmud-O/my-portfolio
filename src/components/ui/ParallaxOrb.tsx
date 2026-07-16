import { useEffect, useRef } from 'react'

interface ParallaxOrbProps {
  className?: string
  style?: React.CSSProperties
  speedX?: number
  speedY?: number
  scrollSpeed?: number
}

export function ParallaxOrb({
  className = '',
  style = {},
  speedX = 0.03,
  speedY = 0.03,
  scrollSpeed = -0.15,
}: ParallaxOrbProps) {
  const orbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = orbRef.current
    if (!el) return

    let mouseX = 0
    let mouseY = 0
    let currentX = 0
    let currentY = 0
    let currentScrollY = window.scrollY
    let targetScrollY = window.scrollY

    let frameId: number | null = null
    let isLooping = false
    let isIntersecting = false
    let listenersAttached = false

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      mouseX = (e.clientX - centerX) * speedX
      mouseY = (e.clientY - centerY) * speedY
      wakeLoop()
    }

    const handleScroll = () => {
      targetScrollY = window.scrollY
      wakeLoop()
    }

    const updatePosition = () => {
      if (!isIntersecting) {
        isLooping = false
        frameId = null
        return
      }

      currentX += (mouseX - currentX) * 0.05
      currentY += (mouseY - currentY) * 0.05
      currentScrollY += (targetScrollY - currentScrollY) * 0.08

      const totalY = currentY + currentScrollY * scrollSpeed

      if (el) {
        el.style.transform = `translate3d(${currentX}px, ${totalY}px, 0)`
      }

      // Check convergence/settlement
      const deltaX = Math.abs(mouseX - currentX)
      const deltaY = Math.abs(mouseY - currentY)
      const deltaScroll = Math.abs(targetScrollY - currentScrollY)

      if (deltaX < 0.02 && deltaY < 0.02 && deltaScroll < 0.1) {
        // Position has settled, stop the loop to save CPU cycles
        isLooping = false
        frameId = null
      } else {
        frameId = requestAnimationFrame(updatePosition)
      }
    }

    const wakeLoop = () => {
      if (!isLooping && isIntersecting) {
        isLooping = true
        if (frameId) cancelAnimationFrame(frameId)
        frameId = requestAnimationFrame(updatePosition)
      }
    }

    const attachListeners = () => {
      if (listenersAttached) return
      window.addEventListener('mousemove', handleMouseMove, { passive: true })
      window.addEventListener('scroll', handleScroll, { passive: true })
      listenersAttached = true
    }

    const detachListeners = () => {
      if (!listenersAttached) return
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      listenersAttached = false
    }

    // Viewport culling observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting
        if (isIntersecting) {
          attachListeners()
          wakeLoop()
        } else {
          detachListeners()
          if (frameId) {
            cancelAnimationFrame(frameId)
            frameId = null
          }
          isLooping = false
        }
      },
      { threshold: 0 } // triggers as soon as 1px is in viewport
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      detachListeners()
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [speedX, speedY, scrollSpeed])

  const combinedStyles: React.CSSProperties = {
    ...style,
    willChange: 'transform',
  }

  return <div ref={orbRef} className={className} style={combinedStyles} />
}
