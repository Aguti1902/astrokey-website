interface LegalPageProps {
  title: string
  children: React.ReactNode
}

export default function LegalPage({ title, children }: LegalPageProps) {
  return (
    <div className="pt-28 pb-20">
      <div className="section-container">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-12">{title}</h1>
        <div className="prose prose-invert prose-lg max-w-none [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-10 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-8 [&>h3]:mb-3 [&>p]:text-white/60 [&>p]:leading-relaxed [&>ul]:text-white/60 [&>ul]:space-y-2 [&>li]:text-white/60">
          {children}
        </div>
      </div>
    </div>
  )
}
