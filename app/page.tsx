import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { VideoGenerator } from "@/components/video-generator"
import { Features } from "@/components/features"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
      <Navbar />
      <Hero />
      <VideoGenerator />
      <Features />
      <FAQ />
      <Footer />
    </main>
  )
}
