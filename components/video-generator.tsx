"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import { Play, Loader2, CheckCircle, XCircle, Clock, Image as ImageIcon, Sparkles, Film, Monitor, Ratio, ExternalLink } from "lucide-react"

type Model = "sora-2" | "sora-2-pro"
type Duration = 4 | 8 | 12 | 16 | 20
type Resolution = "720p" | "1024p" | "1080p"
type AspectRatio = "16:9" | "9:16"
type TaskStatus = "submitted" | "queued" | "pending" | "processing" | "completed" | "failed" | "cancelled"

interface TaskResult {
  task_id?: string
  status?: TaskStatus
  progress?: number
  video_url?: string
  video_urls?: string[]
  error?: string
  message?: string
}

const MODELS: { value: Model; label: string; description: string }[] = [
  { value: "sora-2", label: "Omni Video", description: "Standard quality" },
  { value: "sora-2-pro", label: "Omni Video Pro", description: "Higher resolutions" },
]

const DURATIONS: Duration[] = [4, 8, 12, 16, 20]

const RESOLUTIONS: { value: Resolution; label: string; proOnly: boolean }[] = [
  { value: "720p", label: "720p", proOnly: false },
  { value: "1024p", label: "1024p", proOnly: true },
  { value: "1080p", label: "1080p", proOnly: true },
]

const ASPECT_RATIOS: { value: AspectRatio; label: string; icon: string }[] = [
  { value: "16:9", label: "Landscape", icon: "16:9" },
  { value: "9:16", label: "Portrait", icon: "9:16" },
]

export function VideoGenerator() {
  const [prompt, setPrompt] = useState("")
  const [model, setModel] = useState<Model>("sora-2")
  const [duration, setDuration] = useState<Duration>(8)
  const [resolution, setResolution] = useState<Resolution>("720p")
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("16:9")
  const [imageUrl, setImageUrl] = useState("")
  
  const [isGenerating, setIsGenerating] = useState(false)
  const [taskId, setTaskId] = useState<string | null>(null)
  const [taskStatus, setTaskStatus] = useState<TaskStatus | null>(null)
  const [progress, setProgress] = useState(0)
  const [videoUrls, setVideoUrls] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  async function pollStatus(id: string) {
    try {
      const response = await fetch(`/api/status/${id}`)
      const data: TaskResult = await response.json()

      if (!response.ok) {
        setError(data.error || data.message || "Failed to check status")
        setTaskStatus("failed")
        setIsGenerating(false)
        return
      }

      const status = data.status
      setTaskStatus(status || null)
      setProgress(data.progress || 0)

      if (status === "completed") {
        const urls = data.video_urls?.length ? data.video_urls : data.video_url ? [data.video_url] : []
        setVideoUrls(urls)
        setIsGenerating(false)
        if (urls.length === 0) {
          setError("The task completed, but APIMart did not return a video URL.")
        }
      } else if (status === "failed" || status === "cancelled") {
        setError(data.error || data.message || `Task ${status}`)
        setIsGenerating(false)
      } else if (status === "submitted" || status === "queued" || status === "pending" || status === "processing") {
        setTimeout(() => {
          void pollStatus(id)
        }, 3000)
      }
    } catch {
      setError("Failed to check generation status")
      setIsGenerating(false)
    }
  }

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt")
      return
    }

    setError(null)
    setVideoUrls([])
    setTaskId(null)
    setTaskStatus(null)
    setProgress(0)
    setIsGenerating(true)

    try {
      const payload: Record<string, unknown> = {
        model,
        prompt: prompt.trim(),
        duration,
        resolution: model === "sora-2" ? "720p" : resolution,
        aspect_ratio: aspectRatio,
      }

      if (imageUrl.trim()) {
        payload.image_urls = [imageUrl.trim()]
      }

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data: TaskResult = await response.json()

      if (!response.ok) {
        setError(data.error || data.message || "Failed to start generation")
        setIsGenerating(false)
        return
      }

      if (data.task_id) {
        setTaskId(data.task_id)
        setTaskStatus(data.status === "submitted" ? "pending" : data.status || "pending")
        void pollStatus(data.task_id)
      } else {
        setError("No task ID returned")
        setIsGenerating(false)
      }
    } catch {
      setError("Failed to start video generation")
      setIsGenerating(false)
    }
  }

  const getStatusIcon = () => {
    switch (taskStatus) {
      case "pending":
      case "queued":
      case "submitted":
        return <Clock className="w-5 h-5 text-yellow-400" />
      case "processing":
        return <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case "failed":
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-400" />
      default:
        return null
    }
  }

  const getStatusText = () => {
    switch (taskStatus) {
      case "pending":
      case "queued":
      case "submitted":
        return "Queued..."
      case "processing":
        return `Generating... ${progress}%`
      case "completed":
        return "Complete!"
      case "failed":
        return "Failed"
      case "cancelled":
        return "Cancelled"
      default:
        return ""
    }
  }

  return (
    <section id="generator" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <GlassCard className="p-6 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
                <Sparkles className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Video Generator</h2>
                <p className="text-white/60 text-sm">Powered by APIMart video generation</p>
              </div>
            </div>

            {/* Prompt Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white/80 mb-2">
                Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your video... e.g., A serene mountain landscape at sunset with flowing clouds"
                className="w-full h-32 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all resize-none"
                disabled={isGenerating}
              />
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Model Selector */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-white/80 mb-2">
                  <Film className="w-4 h-4" />
                  Model
                </label>
                <div className="flex gap-2">
                  {MODELS.map((m) => (
                    <button
                      key={m.value}
                      onClick={() => {
                        setModel(m.value)
                        if (m.value === "sora-2") {
                          setResolution("720p")
                        }
                      }}
                      disabled={isGenerating}
                      className={`flex-1 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                        model === m.value
                          ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
                          : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                      } disabled:opacity-50`}
                    >
                      <div>{m.label}</div>
                      <div className="text-xs opacity-60">{m.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration Selector */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-white/80 mb-2">
                  <Clock className="w-4 h-4" />
                  Duration (seconds)
                </label>
                <div className="flex gap-2">
                  {DURATIONS.map((d) => (
                    <button
                      key={d}
                      onClick={() => setDuration(d)}
                      disabled={isGenerating}
                      className={`flex-1 px-3 py-3 rounded-xl border text-sm font-medium transition-all ${
                        duration === d
                          ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
                          : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                      } disabled:opacity-50`}
                    >
                      {d}s
                    </button>
                  ))}
                </div>
              </div>

              {/* Resolution Selector */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-white/80 mb-2">
                  <Monitor className="w-4 h-4" />
                  Resolution
                </label>
                <div className="flex gap-2">
                  {RESOLUTIONS.map((r) => {
                    const isDisabled = r.proOnly && model !== "sora-2-pro"
                    return (
                      <button
                        key={r.value}
                        onClick={() => !isDisabled && setResolution(r.value)}
                        disabled={isGenerating || isDisabled}
                        className={`flex-1 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                          resolution === r.value
                            ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
                            : isDisabled
                            ? "bg-white/5 border-white/5 text-white/30 cursor-not-allowed"
                            : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                        } disabled:opacity-50`}
                        title={isDisabled ? "Requires Omni Video Pro" : ""}
                      >
                        {r.label}
                        {r.proOnly && <span className="block text-xs opacity-60">Pro</span>}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Aspect Ratio Selector */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-white/80 mb-2">
                  <Ratio className="w-4 h-4" />
                  Aspect Ratio
                </label>
                <div className="flex gap-2">
                  {ASPECT_RATIOS.map((ar) => (
                    <button
                      key={ar.value}
                      onClick={() => setAspectRatio(ar.value)}
                      disabled={isGenerating}
                      className={`flex-1 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                        aspectRatio === ar.value
                          ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
                          : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                      } disabled:opacity-50`}
                    >
                      <div>{ar.label}</div>
                      <div className="text-xs opacity-60">{ar.icon}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Reference Image URL */}
            <div className="mb-8">
              <label className="flex items-center gap-2 text-sm font-medium text-white/80 mb-2">
                <ImageIcon className="w-4 h-4" />
                Reference Image URL (optional)
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/reference-image.jpg"
                className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
                disabled={isGenerating}
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-lg hover:from-cyan-400 hover:to-blue-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Generate Video
                </>
              )}
            </button>

            {/* Status Display */}
            {taskId && (
              <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon()}
                    <span className="text-sm font-medium">{getStatusText()}</span>
                  </div>
                  <span className="text-xs text-white/40 font-mono">ID: {taskId}</span>
                </div>
                {(taskStatus === "pending" || taskStatus === "processing") && (
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.max(progress, 5)}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="mt-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Video Display */}
            {videoUrls.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <div className="rounded-2xl overflow-hidden border border-white/10">
                  <video
                    src={videoUrls[0]}
                    controls
                    autoPlay
                    className="w-full"
                  />
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  {videoUrls.map((url, index) => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open video {videoUrls.length > 1 ? index + 1 : ""}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}
