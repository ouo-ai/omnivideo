import Link from "next/link"

export const metadata = {
  title: "Privacy Policy | Omni Video",
  description: "How Omni Video handles prompts, reference image URLs, generated video tasks, and server-side APIMart API processing.",
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <Link href="/" className="text-sm text-cyan-300 hover:text-cyan-200">
          Back to Omni Video
        </Link>
        <h1 className="mt-8 text-4xl font-bold tracking-tight">Privacy Policy</h1>
        <div className="mt-8 space-y-6 text-white/65 leading-relaxed">
          <p>
            Omni Video processes prompts, generation settings, optional reference image URLs, and returned task metadata so it can submit and track AI video generation requests through APIMart.
          </p>
          <p>
            API credentials are used only on the server. They are not exposed to the browser or stored in client-side code.
          </p>
          <p>
            Generated task results are returned by APIMart and may include video URLs, processing status, timing, and error details. Do not submit private, confidential, or sensitive material as prompts or reference images.
          </p>
          <p>
            Contact the site operator if you need a task record reviewed or removed from operational systems controlled by Omni Video.
          </p>
        </div>
      </div>
    </main>
  )
}
