import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const MODELS = new Set(["sora-2", "sora-2-pro"])
const DURATIONS = new Set([4, 8, 12, 16, 20])
const STANDARD_RESOLUTIONS = new Set(["720p"])
const PRO_RESOLUTIONS = new Set(["720p", "1024p", "1080p"])
const ASPECT_RATIOS = new Set(["16:9", "9:16", "landscape", "portrait"])

function asPublicUrl(value: unknown) {
  if (typeof value !== "string" || !value.trim()) {
    return null
  }

  try {
    const url = new URL(value.trim())
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : null
  } catch {
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.APIMART_API_KEY
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Server configuration error. Please contact support.' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { model, prompt, duration, resolution, aspect_ratio, image_urls } = body

    if (!model || !MODELS.has(model)) {
      return NextResponse.json(
        { error: "Choose a supported model." },
        { status: 400 }
      )
    }

    if (typeof prompt !== "string" || prompt.trim().length < 8) {
      return NextResponse.json(
        { error: "Write a prompt with at least 8 characters." },
        { status: 400 }
      )
    }

    const numericDuration = Number(duration)
    if (!DURATIONS.has(numericDuration)) {
      return NextResponse.json(
        { error: "Choose a supported duration: 4, 8, 12, 16, or 20 seconds." },
        { status: 400 }
      )
    }

    const validResolutions = model === "sora-2-pro" ? PRO_RESOLUTIONS : STANDARD_RESOLUTIONS
    if (!validResolutions.has(resolution)) {
      return NextResponse.json(
        { error: model === "sora-2-pro" ? "Choose 720p, 1024p, or 1080p." : "Sora 2 supports 720p only." },
        { status: 400 }
      )
    }

    const referenceUrls = Array.isArray(image_urls)
      ? image_urls.map(asPublicUrl).filter((url): url is string => Boolean(url)).slice(0, 1)
      : []

    if (image_urls && referenceUrls.length === 0) {
      return NextResponse.json(
        { error: "Reference images must be public http or https URLs." },
        { status: 400 }
      )
    }

    if (referenceUrls.length === 0 && !ASPECT_RATIOS.has(aspect_ratio)) {
      return NextResponse.json(
        { error: "Choose a supported aspect ratio." },
        { status: 400 }
      )
    }

    const payload: Record<string, unknown> = {
      model,
      prompt: prompt.trim(),
      duration: numericDuration,
      resolution,
    }

    if (referenceUrls.length > 0) {
      payload.image_urls = referenceUrls
    } else {
      payload.aspect_ratio = aspect_ratio
    }

    const response = await fetch('https://api.apimart.ai/v1/videos/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || data.error?.message || data.error || 'Failed to start video generation' },
        { status: response.status }
      )
    }

    const submitted = Array.isArray(data.data) ? data.data[0] : data.data
    const taskId = submitted?.task_id || submitted?.id

    if (!taskId) {
      return NextResponse.json(
        { error: "APIMart accepted the request but did not return a task ID.", provider: data },
        { status: 502 }
      )
    }

    return NextResponse.json({
      task_id: taskId,
      status: submitted?.status || "submitted",
      provider_code: data.code,
    })
  } catch (error) {
    console.error('Generation API error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
