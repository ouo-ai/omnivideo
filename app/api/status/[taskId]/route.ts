import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) {
  try {
    const apiKey = process.env.APIMART_API_KEY
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Server configuration error. Please contact support.' },
        { status: 500 }
      )
    }

    const { taskId } = await params

    if (!taskId) {
      return NextResponse.json(
        { error: 'Task ID is required' },
        { status: 400 }
      )
    }

    const response = await fetch(
      `https://api.apimart.ai/v1/tasks/${taskId}?language=en`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    )

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || data.error?.message || data.error || 'Failed to fetch task status' },
        { status: response.status }
      )
    }

    const task = data.data || data
    const rawStatus = typeof task?.status === "string" ? task.status.toLowerCase() : undefined
    const status =
      rawStatus === "success" || rawStatus === "succeeded"
        ? "completed"
        : rawStatus === "running"
          ? "processing"
          : rawStatus
    const videos = Array.isArray(task?.result?.videos) ? task.result.videos : []
    const videoUrls = videos.flatMap((video: { url?: unknown; video_url?: unknown }) => {
      if (Array.isArray(video.url)) {
        return video.url.filter((url): url is string => typeof url === "string")
      }

      if (typeof video.url === "string") {
        return [video.url]
      }

      if (typeof video.video_url === "string") {
        return [video.video_url]
      }

      return []
    })

    return NextResponse.json({
      task_id: task?.id || taskId,
      status,
      progress: task?.progress ?? 0,
      video_urls: videoUrls,
      video_url: videoUrls[0] || null,
      thumbnail_url: task?.result?.thumbnail_url || videos.find((video: { thumbnail_url?: string }) => video.thumbnail_url)?.thumbnail_url || null,
      estimated_time: task?.estimated_time,
      actual_time: task?.actual_time,
      error: task?.error,
      provider_code: data.code,
    })
  } catch (error) {
    console.error('Status API error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
