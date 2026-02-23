export default function TestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen galaxy-bg text-white">
      {children}
    </div>
  )
}
