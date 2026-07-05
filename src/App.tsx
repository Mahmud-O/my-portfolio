import { lazy, Suspense, useEffect, useRef, useState, type ComponentType } from 'react'
import Navbar from './components/layout/Navbar'
import HeroSection from './components/sections/Hero'

const AboutSection = lazy(() => import('./components/sections/About'))
const ExperienceSection = lazy(() => import('./components/sections/Experience'))
const ServicesSection = lazy(() => import('./components/sections/Services'))
const ProjectsSection = lazy(() => import('./components/sections/Projects'))
const ContactSection = lazy(() => import('./components/sections/Contact'))
const Footer = lazy(() => import('./components/layout/Footer'))
const BackToTop = lazy(() => import('./components/ui/BackToTop'))

type DeferredSectionProps = {
  id: string
  component: ComponentType
  rootMargin?: string
}

function DeferredSection({
  id,
  component: Component,
  rootMargin = '700px 0px',
}: DeferredSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    if (shouldLoad) return

    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [rootMargin, shouldLoad])

  if (!shouldLoad) {
    return <section id={id} ref={ref} className="min-h-screen bg-[#0a0a0a]" />
  }

  return (
    <Suspense fallback={<section id={id} className="min-h-screen bg-[#0a0a0a]" />}>
      <Component />
    </Suspense>
  )
}

function DeferredFooter() {
  const ref = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    if (shouldLoad) return

    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '700px 0px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [shouldLoad])

  if (!shouldLoad) return <div ref={ref} className="min-h-32 bg-[#0a0a0a]" />

  return (
    <Suspense fallback={<div className="min-h-32 bg-[#0a0a0a]" />}>
      <Footer />
    </Suspense>
  )
}

function DeferredBackToTop() {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 240) {
        setShouldLoad(true)
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!shouldLoad) return null

  return (
    <Suspense fallback={null}>
      <BackToTop />
    </Suspense>
  )
}

function App() {
  return (
    <div className="min-h-screen flex flex-col font-inter antialiased bg-[#0a0a0a]">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <HeroSection />
        <DeferredSection id="about" component={AboutSection} />
        <DeferredSection id="experience" component={ExperienceSection} />
        <DeferredSection id="services" component={ServicesSection} />
        <DeferredSection id="projects" component={ProjectsSection} />
        <DeferredSection id="contact" component={ContactSection} />
      </main>
      <DeferredFooter />
      <DeferredBackToTop />
    </div>
  )
}

export default App