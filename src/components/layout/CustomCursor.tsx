import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const CustomCursor = () => {
    const dotRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Only on desktop
        if (typeof window === 'undefined' || window.innerWidth < 768) return

        const dot = dotRef.current!
        const ring = ringRef.current!

        let mouseX = 0
        let mouseY = 0
        let ringX = 0
        let ringY = 0

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY
            gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.1, ease: 'power2.out' })
        }

        const lerp = () => {
            ringX += (mouseX - ringX) * 0.12
            ringY += (mouseY - ringY) * 0.12
            gsap.set(ring, { x: ringX, y: ringY })
            requestAnimationFrame(lerp)
        }

        const onEnter = () => ring.classList.add('hovering')
        const onLeave = () => ring.classList.remove('hovering')

        window.addEventListener('mousemove', onMouseMove)

        const interactables = document.querySelectorAll('a, button, [data-cursor]')
        interactables.forEach((el) => {
            el.addEventListener('mouseenter', onEnter)
            el.addEventListener('mouseleave', onLeave)
        })

        const id = requestAnimationFrame(lerp)

        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            interactables.forEach((el) => {
                el.removeEventListener('mouseenter', onEnter)
                el.removeEventListener('mouseleave', onLeave)
            })
            cancelAnimationFrame(id)
        }
    }, [])

    return (
        <>
            <div ref={dotRef} className="cursor-dot hidden md:block" />
            <div ref={ringRef} className="cursor-ring hidden md:block" />
        </>
    )
}

export default CustomCursor

