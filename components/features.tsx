"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { motion } from "framer-motion"
import { Zap, Shield, Globe, Layers, Clock, Sparkles } from 'lucide-react'

const features = [
  {
    icon: <Sparkles className="w-8 h-8 text-cyan-400" />,
    title: "Omni Video Engine",
    description: "Generate videos with Omni Video and Omni Video Pro through our secure APIMart integration.",
  },
  {
    icon: <Layers className="w-8 h-8 text-blue-400" />,
    title: "Multiple Resolutions",
    description: "Choose from 720p, 1024p, or 1080p output. Higher resolutions are available with Omni Video Pro.",
  },
  {
    icon: <Clock className="w-8 h-8 text-teal-400" />,
    title: "Flexible Durations",
    description: "Create videos from 4 to 20 seconds. Perfect for social media clips, presentations, and more.",
  },
  {
    icon: <Globe className="w-8 h-8 text-cyan-400" />,
    title: "Portrait & Landscape",
    description: "Support for both 16:9 landscape and 9:16 portrait aspect ratios for any platform.",
  },
  {
    icon: <Shield className="w-8 h-8 text-blue-400" />,
    title: "Secure Processing",
    description: "All API calls are handled server-side. Your credentials never leave the server.",
  },
  {
    icon: <Zap className="w-8 h-8 text-teal-400" />,
    title: "Real-Time Status",
    description: "Track your video generation progress with live status updates and percentage completion.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-balance"
          >
            Why Choose Omni Video
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/60 max-w-2xl mx-auto text-balance"
          >
            Professional AI video generation with enterprise-grade reliability
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="h-full">
                <div className="mb-6 p-4 rounded-2xl bg-white/5 w-fit group-hover:bg-white/10 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">{feature.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
