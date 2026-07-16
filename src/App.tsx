import { lazy, Suspense, useEffect, useRef, useState, type ComponentType } from 'react'
import Navbar from './components/layout/Navbar'
import HeroSection from './components/sections/Hero'
import Preloader from './components/ui/Preloader'
import { AnimatePresence } from 'framer-motion'
import SmoothScroll from './components/ui/SmoothScroll'
import PortfolioReveal from './components/ui/PortfolioReveal'
import WelcomeSection from './components/sections/Welcome'

import ExperienceSection from './components/sections/Experience'
import ServicesSection from './components/sections/Services'
import ProjectsSection from './components/sections/Projects'
import ContactSection from './components/sections/Contact'
import Footer from './components/layout/Footer'

const BackToTopLazy = lazy(() => import('./components/ui/BackToTop'))

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
      <BackToTopLazy />
    </Suspense>
  )
}

function App() {
  const [isSiteLoaded, setIsSiteLoaded] = useState(false)

  useEffect(() => {
    if (isSiteLoaded) {
      window.__portfolioLoaded = true
      window.dispatchEvent(new Event('portfolio-loaded'))
    }
  }, [isSiteLoaded])

  const handlePreloaderComplete = () => {
    setIsSiteLoaded(true)
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {!isSiteLoaded && (
          <Preloader onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>
      <div className="min-h-screen font-inter antialiased bg-black relative">
        <SmoothScroll />
        {/* <ScrollHUDTracker /> */}
        <Navbar />

        {/* Fixed Background Layer for Flashlight Portfolio Reveal */}
        <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-auto">
          <PortfolioReveal />
        </div>

        {/* Scrolling Overlay Content */}
        <main className="relative w-full overflow-hidden bg-black mt-[100vh] z-10 shadow-[0_-20px_50px_rgba(220,38,38,0.15)] border-t border-white/10">
          <HeroSection />
          <WelcomeSection />
          <ExperienceSection />
        </main>

        {/* Natural Sibling Sections to prevent GSAP pinning conflicts */}
        <ProjectsSection />
        <ServicesSection />
        <ContactSection />
        <Footer />
        <DeferredBackToTop />
      </div>
    </>
  )
}

export default App