import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import SkillCard from '@/components/ui/SkillCard'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skills, skillCategories, stats, categoryColor } from '@/lib/constants'
import { createCardVariants, iconBoxVariants } from '@/lib/animations'

gsap.registerPlugin(ScrollTrigger)

const cardVariants = createCardVariants(-6, 1, '0 20px 60px rgba(200,53,58,0.18), 0 4px 24px rgba(0,0,0,0.5)');
/* â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export default function AboutSection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const headerRef   = useRef<HTMLDivElement>(null)
  const contentRef  = useRef<HTMLDivElement>(null)
  const statsRef    = useRef<HTMLDivElement>(null)
  const skillsRef   = useRef<HTMLDivElement>(null)



  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 85%' } })

      gsap.fromTo(contentRef.current, { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: contentRef.current, start: 'top 85%' } })

      if (statsRef.current) {
        gsap.fromTo(statsRef.current.querySelectorAll('.stat-card'),
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1,
            ease: 'back.out(1.4)', scrollTrigger: { trigger: statsRef.current, start: 'top 85%' } })
      }

      if (skillsRef.current) {
        gsap.fromTo(skillsRef.current.querySelectorAll('.skill-item'),
          { opacity: 0, y: 24, scale: 0.88 },
          { opacity: 1, y: 0,  scale: 1,    duration: 0.45, stagger: 0.04,
            ease: 'back.out(1.7)', scrollTrigger: { trigger: skillsRef.current, start: 'top 78%' } })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])


  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen bg-[#0a0a0a] py-24 overflow-hidden"
    >
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-[400px] h-[400px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(200,53,58,0.4) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-40 right-10 w-[300px] h-[300px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(158,42,47,0.4) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      <div className="relative z-10 max-w-6xl xl:max-w-7xl 3xl:max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">

        {/* â”€â”€ Section Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div ref={headerRef} className="text-center mb-12 sm:mb-16" style={{ opacity: 0 }}>
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full glass mb-4 sm:mb-6">
            <span className="w-2 h-2 rounded-full bg-crimson-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-mono text-crimson-300">Get to know me</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black text-white mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto px-2 sm:px-0">
            Passionate about building scalable solutions and crafting beautiful user experiences
          </p>
        </div>

        {/* â”€â”€ Bio + Stats â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div ref={contentRef} className="max-w-6xl mx-auto mb-20" style={{ opacity: 0 }}>
          <motion.div className="glass rounded-2xl p-8 mb-6 border border-white/[0.08] cursor-default"
            initial="rest" whileHover="hover" variants={cardVariants}>
            <h3 className="text-2xl font-bold text-white mb-4">Full Stack MERN Developer</h3>
            <p className="text-slate-400 leading-relaxed mb-4">
              I&apos;m a passionate developer from Egypt, specializing in building robust, scalable
              web applications from the ground up. I love architecting RESTful APIs, designing
              secure database schemas, and crafting seamless, pixel-perfect user interfaces using
              modern JavaScript frameworks.
            </p>
            <p className="text-slate-400 leading-relaxed">
              With hands-on experience in the MERN stack, I transform complex problems into
              elegant, efficient solutions. Every project is an opportunity to learn, grow,
              and push the boundaries of what&apos;s possible on the web.
            </p>
          </motion.div>

          <motion.div className="glass rounded-2xl p-6 mb-10 border-l-4 border-crimson-500/60 cursor-default"
            initial={{ opacity: 0.85 }}
            whileHover={{ opacity: 1, x: 6, borderLeftColor: 'rgba(200,53,58,1)', transition: { duration: 0.25 } }}>
            <p className="text-slate-300 italic text-lg">
              &ldquo;Code is poetry, and every pixel tells a story.&rdquo;
            </p>
          </motion.div>

          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map(({ value, label, icon: Icon }, index) => (
              <motion.div key={label}
                className="stat-card glass rounded-2xl p-5 text-center cursor-default border border-white/[0.06]"
                initial="rest" whileHover="hover" variants={cardVariants} style={{ opacity: 0 }}>
                <motion.div className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center"
                  variants={iconBoxVariants}
                  style={{ background: `linear-gradient(135deg, ${index % 2 === 0 ? 'rgba(200,53,58,0.2)' : 'rgba(158,42,47,0.2)'} 0%, ${index % 2 === 0 ? 'rgba(158,42,47,0.1)' : 'rgba(200,53,58,0.1)'} 100%)` }}>
                  <Icon size={22} className={index % 2 === 0 ? 'text-slate-300' : 'text-slate-400'} />
                </motion.div>
                <p className="text-3xl font-black gradient-text mb-1">{value}</p>
                <p className="text-sm text-slate-500 font-medium">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* â”€â”€ Skills Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div ref={skillsRef} className="mb-20">
          {/* Sub-header */}
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-2">Skills &amp; Technologies</h3>
            <p className="text-slate-500 text-sm">Tools I use to bring ideas to life</p>
          </div>

          {/* Skill grid grouped by category */}
          <div className="space-y-8">
            {skillCategories.map((category) => {
              const accent = categoryColor[category]
              return (
                <div key={category}>
                  {/* Category heading */}
                  <div className="flex items-center gap-3 mb-4">
                    <motion.span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: accent }}
                      animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    />
                    <h4 className="text-xs font-mono uppercase tracking-widest"
                      style={{ color: accent }}>
                      {category}
                    </h4>
                    <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${accent}40, transparent)` }} />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {skills
                      .filter((s) => s.category === category)
                      .map((skill) => (
                        <SkillCard key={skill.label} icon={skill.icon} label={skill.label} color={skill.color} />
                      ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Skill count badge */}
          <motion.p
            className="text-center text-xs text-slate-600 font-mono mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {skills.length} technologies
          </motion.p>
        </div>
      </div>
    </section>
  )
}

