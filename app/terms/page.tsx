import Link from "next/link"

export const metadata = {
  title: "Terms of Service | Omni Video",
  description: "Terms for using Omni Video, an AI video generation interface powered by server-side APIMart Sora 2 integration.",
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <Link href="/" className="text-sm text-cyan-300 hover:text-cyan-200">
          Back to Omni Video
        </Link>
        <h1 className="mt-8 text-4xl font-bold tracking-tight">Terms of Service</h1>
        <div className="mt-8 space-y-6 text-white/65 leading-relaxed">
          <p>
            Omni Video provides a web interface for submitting AI video generation tasks through APIMart. Availability, processing time, and output quality depend on the upstream provider and selected model settings.
          </p>
          <p>
            You are responsible for prompts, reference image URLs, and generated outputs you request. Do not use Omni Video for unlawful, infringing, abusive, or deceptive content.
          </p>
          <p>
            Outputs may be delayed, fail, or vary from the prompt. Omni Video is provided without a guarantee that any particular generation will complete or meet a specific creative expectation.
          </p>
          <p>
            By using the generator, you agree to follow applicable laws and any APIMart or model-provider rules that govern generated media.
          </p>
        </div>
      </div>
    </main>
  )
}
