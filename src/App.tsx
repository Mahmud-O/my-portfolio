import { lazy, Suspense, useEffect, useRef, useState, type ComponentType } from 'react'
import Navbar from './components/layout/Navbar'
import HeroSection from './components/sections/Hero'
import TechStackSection from './components/sections/TechStack'
import { ScrollHUDTracker } from './components/ui/ScrollHUDTracker'
import Preloader from './components/ui/Preloader'
import { AnimatePresence } from 'framer-motion'

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
  rootMargin = '0px',
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

  useEffect(() => {
    if (shouldLoad) {
      const timer = setTimeout(() => {
        import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
          ScrollTrigger.refresh()
        })
      }, 250)
      return () => clearTimeout(timer)
    }
  }, [shouldLoad])

  if (!shouldLoad) {
    return <section id={id} ref={ref} className="min-h-screen bg-black" />
  }

  return (
    <Suspense fallback={<section id={id} className="min-h-screen bg-black" />}>
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

  if (!shouldLoad) return <div ref={ref} className="min-h-32 bg-black" />

  return (
    <Suspense fallback={<div className="min-h-32 bg-black" />}>
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
  const [isSiteLoaded, setIsSiteLoaded] = useState(false)

  const handlePreloaderComplete = () => {
    setIsSiteLoaded(true)
    window.__portfolioLoaded = true
    window.dispatchEvent(new Event('portfolio-loaded'))
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {!isSiteLoaded && (
          <Preloader onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>
      <div className="min-h-screen flex flex-col font-inter antialiased bg-black relative">
        <ScrollHUDTracker />
        <Navbar />
        <main className="flex-1">
          <HeroSection />
          <TechStackSection />
          <DeferredSection id="about" component={AboutSection} />
          <DeferredSection id="experience" component={ExperienceSection} />
          <DeferredSection id="services" component={ServicesSection} />
          <DeferredSection id="projects" component={ProjectsSection} />
          <DeferredSection id="contact" component={ContactSection} />
        </main>
        <DeferredFooter />
        <DeferredBackToTop />
      </div>
    </>
  )
}

export default App