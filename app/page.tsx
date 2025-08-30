import { Suspense } from "react"
import { HomeContent } from "@/components/home-content"

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-primary flex items-center justify-center">
          <div className="text-white text-center">
            <div className="font-serif text-8xl font-bold mb-4">LR</div>
            <p className="font-sans text-lg tracking-[0.2em] font-light">Carregando...</p>
          </div>
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  )
}
