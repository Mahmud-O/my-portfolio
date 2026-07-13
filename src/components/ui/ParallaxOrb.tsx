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
    let mouseX = 0
    let mouseY = 0
    let currentX = 0
    let currentY = 0
    let currentScrollY = window.scrollY
    let targetScrollY = window.scrollY

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      mouseX = (e.clientX - centerX) * speedX
      mouseY = (e.clientY - centerY) * speedY
    }

    const handleScroll = () => {
      targetScrollY = window.scrollY
    }

    const updatePosition = () => {
      currentX += (mouseX - currentX) * 0.05
      currentY += (mouseY - currentY) * 0.05
      currentScrollY += (targetScrollY - currentScrollY) * 0.08

      const totalY = currentY + currentScrollY * scrollSpeed

      if (orbRef.current) {
        orbRef.current.style.transform = `translate3d(${currentX}px, ${totalY}px, 0)`
      }
      requestAnimationFrame(updatePosition)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    const animId = requestAnimationFrame(updatePosition)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(animId)
    }
  }, [speedX, speedY, scrollSpeed])

  return <div ref={orbRef} className={className} style={style} />
}
