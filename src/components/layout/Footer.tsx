import { NAV_LINKS } from '@/lib/constants'

const FOOTER_PORTRAIT_SRC = '/img/gen/modern style avatar.png'

export default function Footer() {
  const year = new Date().getFullYear()
  const marqueeText = 'WEB DEVELOPER • MAHMOUD OSAMA • FULLSTACK • MERN DEVELOPER • PORTFOLIO • '.repeat(3)

  return (
    <footer className="w-full bg-[#dc2626] text-black rounded-t-[50px] md:rounded-t-[100px] pt-16 pb-12 px-8 overflow-hidden relative shadow-[0_-20px_50px_rgba(220,38,38,0.15)] z-30 border-t border-red-400/20">

      {/* Massive Infinite Marquee Background Text */}
      <div className="absolute top-8 md:top-12 left-0 w-full pointer-events-none opacity-[0.06] z-0 flex flex-col gap-0 overflow-hidden select-none">
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes slide-left {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          @keyframes slide-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0%); }
          }
          .animate-slide-left {
            animation: slide-left 45s linear infinite;
          }
          .animate-slide-right {
            animation: slide-right 45s linear infinite;
          }
        `}} />

        {/* Layer 1: Left */}
        <div className="flex whitespace-nowrap animate-slide-left w-max">
          <h1 className="text-[14vw] lg:text-[7.5vw] font-black uppercase tracking-tighter text-black leading-none pr-8">
            {marqueeText}
          </h1>
          <h1 className="text-[14vw] lg:text-[7.5vw] font-black uppercase tracking-tighter text-black leading-none pr-8">
            {marqueeText}
          </h1>
        </div>

        {/* Layer 2: Right */}
        <div className="flex whitespace-nowrap animate-slide-right w-max">
          <h1 className="text-[14vw] lg:text-[7.5vw] font-black uppercase tracking-tighter text-black leading-none pr-8">
            {marqueeText}
          </h1>
          <h1 className="text-[14vw] lg:text-[7.5vw] font-black uppercase tracking-tighter text-black leading-none pr-8">
            {marqueeText}
          </h1>
        </div>

        {/* Layer 3: Left */}
        <div className="flex whitespace-nowrap animate-slide-left w-max">
          <h1 className="text-[14vw] lg:text-[7.5vw] font-black uppercase tracking-tighter text-black leading-none pr-8">
            {marqueeText}
          </h1>
          <h1 className="text-[14vw] lg:text-[7.5vw] font-black uppercase tracking-tighter text-black leading-none pr-8">
            {marqueeText}
          </h1>
        </div>

        {/* Layer 4: Right (LinkedIn Focus) */}
        <div className="flex whitespace-nowrap animate-slide-right w-max">
          <h1 className="text-[14vw] lg:text-[7.5vw] font-black uppercase tracking-tighter text-black leading-none pr-8">
            {"FOLLOW ON LINKEDIN • ".repeat(8)}
          </h1>
          <h1 className="text-[14vw] lg:text-[7.5vw] font-black uppercase tracking-tighter text-black leading-none pr-8">
            {"FOLLOW ON LINKEDIN • ".repeat(8)}
          </h1>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-12 w-full max-w-7xl mx-auto">

        {/* Profile Card Area */}
        <div className="flex flex-col items-center justify-center w-full mb-4 z-10">
          {/* Profile Image */}
          <img
            src={FOOTER_PORTRAIT_SRC}
            alt="Mahmoud Osama Footer Portrait"
            className="w-64 h-64 md:w-80 md:h-80 lg:w-[420px] lg:h-[420px] object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.35)] mb-6 select-none"
            loading="lazy"
          />

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com/in/mahmoud25osama"
              target="_blank"
              rel="noreferrer"
              className="bg-black hover:bg-zinc-900 text-white font-bold py-3.5 px-8 md:px-12 rounded-xl transition-all shadow-lg hover:shadow-black/25 text-xs md:text-sm tracking-widest uppercase"
            >
              Follow
            </a>
            <a
              href="https://wa.me/+201016074277"
              target="_blank"
              rel="noreferrer"
              className="bg-zinc-100 hover:bg-white text-zinc-900 font-bold py-3.5 px-8 md:px-12 rounded-xl transition-all shadow-lg hover:shadow-white/20 text-xs md:text-sm tracking-widest uppercase"
            >
              Message
            </a>
          </div>
        </div>

        {/* Logo and Tagline */}
        <div className="flex flex-col items-center text-center">
          <a href="#" className="text-4xl md:text-5xl font-black tracking-tight flex items-center gap-1.5 select-none">
            <span className="text-black">Mahmoud</span>
            <span className="text-white drop-shadow-md"> Osama.</span>
          </a>
          <p className="mt-4 text-zinc-900 font-medium max-w-md text-sm md:text-base leading-relaxed px-4">
            Crafting responsive, secure, and beautiful Full stack applications with modern layouts and fluid animations.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 md:gap-12 px-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs md:text-sm uppercase tracking-widest font-bold text-zinc-900 hover:text-white transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Divider line */}
        <div className="w-full max-w-4xl h-[1.5px] bg-black/10 rounded-full mt-2" />

        {/* Copyright and Legal links */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl text-xs font-bold text-zinc-800 text-center md:text-left gap-4 md:gap-0">
          <p className="px-4">© {year} Mahmoud Osama. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
