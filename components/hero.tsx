"use client"

import { motion } from "framer-motion"
import { ArrowDown, Play, Sparkles } from 'lucide-react'
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.12),transparent_45%),linear-gradient(135deg,rgba(14,165,233,0.08),transparent_35%,rgba(245,158,11,0.06))]" />
        <div className="absolute inset-x-0 top-28 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div className="absolute left-1/2 top-20 h-[70vh] w-[78vw] -translate-x-1/2 rounded-[36px] border border-white/10 bg-[linear-gradient(115deg,rgba(255,255,255,0.08),rgba(255,255,255,0.015))] shadow-[0_40px_160px_rgba(0,0,0,0.45)]" />
        <div className="absolute left-[12%] top-[24%] hidden h-48 w-24 -rotate-12 rounded-[18px] border border-white/10 bg-white/[0.04] md:block" />
        <div className="absolute right-[11%] bottom-[18%] hidden h-56 w-32 rotate-12 rounded-[18px] border border-amber-200/20 bg-amber-200/[0.04] lg:block" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-medium text-white/80 uppercase tracking-wider">
              Powered by Sora 2
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-balance"
        >
          Omni Video
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-2xl md:text-3xl text-white/80 font-medium mb-4"
        >
          AI Video Generator
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed text-balance"
        >
          Transform your ideas into stunning videos with Omni Video. 
          Our server-side APIMart Sora 2 integration delivers professional-quality AI video generation with multiple resolutions and flexible durations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link 
            href="#generator"
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-semibold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.5)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Play className="w-5 h-5" />
              Start Creating
            </span>
          </Link>
          <Link 
            href="#features"
            className="px-8 py-4 glass rounded-full font-semibold text-lg text-white hover:bg-white/10 transition-all hover:scale-105"
          >
            Learn More
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/40 uppercase tracking-widest">Create Now</span>
        <ArrowDown className="w-4 h-4 text-white/40 animate-bounce" />
      </motion.div>
    </section>
  )
}
