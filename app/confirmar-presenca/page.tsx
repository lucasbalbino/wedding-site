"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { usePhoneParam } from "@/hooks/use-phone-param"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

function ConfirmarPresencaContent() {
  const searchParams = useSearchParams()
  const phoneFromUrl = searchParams.get("telefone")
  const { addPhoneToUrl } = usePhoneParam()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const phoneParam = phoneFromUrl ? `?telefone=${phoneFromUrl}` : ""

  return (
    <div className="min-h-screen bg-[#080a09] text-[#f8f7f3]">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080a09]/95 backdrop-blur-sm border-b border-[#5c4d46]/20">
        <div className="px-4 py-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[#f8f7f3] p-2"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {isMobileMenuOpen && (
            <div className="absolute top-full left-4 right-4 bg-[#080a09]/95 backdrop-blur-sm rounded-lg p-4 mt-2 border border-[#5c4d46]/20">
              <div className="flex flex-col space-y-3">
                <Link
                  href={addPhoneToUrl("/")}
                  className="text-[#f8f7f3] hover:text-[#eec7b4] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Início
                </Link>
                <Link
                  href={addPhoneToUrl("/lista-presentes")}
                  className="text-[#f8f7f3] hover:text-[#eec7b4] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Lista de Presentes
                </Link>
                <Link
                  href={addPhoneToUrl("/informacoes")}
                  className="text-[#f8f7f3] hover:text-[#eec7b4] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Informações Gerais
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 mt-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#f8f7f3] mb-4">Confirmar Presença</h1>
            <p className="text-base sm:text-lg text-[#eec7b4] mb-4">Sua presença é muito importante para nós!</p>
            <p className="text-sm sm:text-base text-[#eec7b4]">
              Por favor, coloque o seu nome no formulário abaixo para confirmar sua presença no nosso grande dia.
            </p>
            <p className="text-sm sm:text-base text-[#eec7b4]">
              Basta rolar a página e escrever seu nome no campo indicado abaixo de "Confirme sua presença".
            </p>
          </div>

          <div className="bg-[#5c4d46] border border-[#cb9072] rounded-lg overflow-hidden h-[500px]">
            <iframe
              id="external-rsvp-iframe"
              src="https://assessoriavip.com.br/rsvpUnico/484289f0-2471-11f0-8f46-830f817de8ff"
              className="w-full min-h-[500px] border-0"
              title="Formulário de Confirmação de Presença"
              loading="lazy"
              allow="fullscreen"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
            />
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-[#eec7b4] mb-4">
              Após confirmar sua presença, não se esqueça de escolher um presente da nossa lista!
            </p>
            <Link href={`/lista-presentes${phoneParam}`}>
              <Button
                variant="outline"
                className="border-[#eec7b4] text-[#eec7b4] hover:bg-[#eec7b4] hover:text-[#080a09] bg-transparent rounded-none"
              >
                Ver Lista de Presentes
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ConfirmarPresencaPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#080a09] flex items-center justify-center">
          <div className="text-center">
            <Image src="/monograma-white.png" alt="Monograma" width={120} height={120} className="mx-auto mb-4" />
            <p className="text-[#f8f7f3]">Carregando...</p>
          </div>
        </div>
      }
    >
      <ConfirmarPresencaContent />
    </Suspense>
  )
}
