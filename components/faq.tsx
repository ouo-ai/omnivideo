"use client"

import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is Omni Video?",
    answer: "Omni Video is an AI video generator powered by Sora 2. It allows you to create professional-quality videos from text prompts with various resolutions, durations, and aspect ratios. Our server-side APIMart integration ensures secure and reliable video generation."
  },
  {
    question: "What models are available?",
    answer: "Omni Video offers two models: Sora 2 (standard quality at 720p) and Sora 2 Pro (higher resolutions up to 1080p). Both models support the full range of durations and aspect ratios."
  },
  {
    question: "What video durations can I create?",
    answer: "You can generate videos with durations of 4, 8, 12, 16, or 20 seconds. These lengths are perfect for social media content, presentations, and short-form video platforms."
  },
  {
    question: "What resolutions are supported?",
    answer: "Omni Video supports 720p resolution with the standard Sora 2 model. With Sora 2 Pro, you can also generate videos in 1024p and 1080p for higher quality output."
  },
  {
    question: "Can I use a reference image?",
    answer: "Yes! Omni Video supports optional reference image URLs. Simply provide a publicly accessible image URL, and the AI will use it as a visual reference when generating your video."
  },
  {
    question: "How long does video generation take?",
    answer: "Generation time varies based on the model, resolution, and duration selected. You can track real-time progress with our status updates showing percentage completion."
  },
  {
    question: "Is my data secure?",
    answer: "Yes. All API calls are processed server-side, meaning your API credentials never reach the browser. Your prompts and generated videos are handled securely through our APIMart integration."
  },
  {
    question: "What aspect ratios are available?",
    answer: "Omni Video supports both 16:9 (landscape) and 9:16 (portrait) aspect ratios, making it easy to create content for YouTube, TikTok, Instagram Reels, and other platforms."
  },
]

export function FAQ() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <section id="faq" className="py-24 md:py-32 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/60 max-w-2xl mx-auto text-balance"
          >
            Everything you need to know about Omni Video
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <GlassCard className="p-6 md:p-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-white/10">
                  <AccordionTrigger className="text-left hover:text-cyan-400 hover:no-underline transition-colors text-lg py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/60 leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}
