"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePhoneParam } from "@/hooks/use-phone-param"

export function HomeContent() {
  const { addPhoneToUrl } = usePhoneParam()

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const weddingDate = new Date("2026-04-20T00:00:00")

    const updateCountdown = () => {
      const now = new Date()
      const difference = weddingDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }

    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/bw-wedding-portrait.png')`,
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      <nav className="relative z-50 p-4">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {isMobileMenuOpen && (
          <div className="absolute top-full left-4 right-4 bg-black/90 backdrop-blur-sm rounded-lg p-4 mt-2">
            <div className="flex flex-col space-y-3">
              <Link
                href={addPhoneToUrl("/confirmar-presenca")}
                className="text-white hover:text-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Confirmar Presença
              </Link>
              <Link
                href={addPhoneToUrl("/lista-presentes")}
                className="text-white hover:text-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Lista de Presentes
              </Link>
              <Link
                href={addPhoneToUrl("/informacoes")}
                className="text-white hover:text-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Informações Gerais
              </Link>
              <Link
                href={addPhoneToUrl("/nossa-historia")}
                className="text-white hover:text-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Nossa História
              </Link>
            </div>
          </div>
        )}
      </nav>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center text-white">
        <div className="mb-8">
          <div className="mb-4 flex justify-center">
            <Image
              src="/monograma-white.png"
              alt="Monograma Rafaela & Lucas"
              width={120}
              height={120}
              className="w-24 h-24 md:w-32 md:h-32"
            />
          </div>

          <h1 className="font-sans text-lg tracking-[0.2em] font-light mb-2">RAFAELA & LUCAS</h1>

          <p className="font-sans text-sm tracking-[0.15em] font-light mb-2">SAVE THE DATE</p>

          <p className="font-sans text-lg tracking-[0.1em] font-light mb-4">20.04.26</p>

          <div className="flex justify-center gap-4 text-center">
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{timeLeft.days}</span>
              <span className="text-xs tracking-wider">DIAS</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{timeLeft.hours}</span>
              <span className="text-xs tracking-wider">HORAS</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{timeLeft.minutes}</span>
              <span className="text-xs tracking-wider">MIN</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{timeLeft.seconds}</span>
              <span className="text-xs tracking-wider">SEG</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-4 right-4 z-10 space-y-3">
        <Link href={addPhoneToUrl("/confirmar-presenca")}>
          <button className="w-full bg-accent text-primary py-4 rounded-none font-medium text-lg">
            Confirmar Presença
          </button>
        </Link>

        <Link href={addPhoneToUrl("/lista-presentes")}>
          <button className="w-full border-2 border-white text-white py-4 rounded-none font-medium text-lg flex items-center justify-center gap-2">
            Lista de Presentes
          </button>
        </Link>
      </div>
    </div>
  )
}
