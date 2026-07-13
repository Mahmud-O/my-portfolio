import { useEffect, useState, useRef } from 'react'

interface ScrambledTextProps {
  text: string
  className?: string
  delay?: number
}

export function ScrambledText({ text, className = '', delay = 0 }: ScrambledTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const containerRef = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const chars = '01_-/\\|[]{}<>*#&%$+=!?'
    const length = text.length

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          observer.disconnect()

          setTimeout(() => {
            let iterations = 0
            const interval = setInterval(() => {
              setDisplayText(() => {
                return text
                  .split('')
                  .map((char, index) => {
                    if (char === ' ') return ' '
                    if (index < iterations) return text[index]
                    return chars[Math.floor(Math.random() * chars.length)]
                  })
                  .join('')
              })

              iterations += 0.35 // reveals approx 1 character per cycle
              if (iterations >= length) {
                clearInterval(interval)
                setDisplayText(text)
              }
            }, 30)
          }, delay)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [text, delay])

  return (
    <span ref={containerRef} className={className}>
      {displayText}
    </span>
  )
}
