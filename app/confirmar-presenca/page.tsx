"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

function ConfirmarPresencaContent() {
  const searchParams = useSearchParams()
  const phoneFromUrl = searchParams.get("telefone")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const phoneParam = phoneFromUrl ? `?telefone=${phoneFromUrl}` : ""

  return (
    <div className="min-h-screen bg-[#080a09] text-[#f8f7f3]">
      <nav className="fixed top-0 w-full bg-[#080a09]/95 backdrop-blur-sm z-50 border-b border-[#5c4d46]">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href={`/${phoneParam}`} className="flex items-center">
              <Image
                src="/monograma-white.png"
                alt="Monograma Rafaela & Lucas"
                width={40}
                height={40}
                className="w-8 h-8 sm:w-10 sm:h-10"
              />
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#f8f7f3] hover:text-[#eec7b4] transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="bg-[#080a09] border-t border-[#5c4d46]">
            <div className="px-4 py-4 space-y-4">
              <Link
                href={`/confirmar-presenca${phoneParam}`}
                className="block text-[#eec7b4] font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Confirmar Presença
              </Link>
              <Link
                href={`/lista-presentes${phoneParam}`}
                className="block text-[#f8f7f3] hover:text-[#eec7b4] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Lista de Presentes
              </Link>
              <Link
                href={`/informacoes${phoneParam}`}
                className="block text-[#f8f7f3] hover:text-[#eec7b4] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Informações Gerais
              </Link>
            </div>
          </div>
        )}
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

          <div className="bg-[#5c4d46] border border-[#cb9072] rounded-lg overflow-hidden">
            <style jsx>{`
              #external-rsvp-iframe::part(content) .event[data-v-ee01f02d] {
                display: none !important;
              }
            `}</style>
            <iframe
              id="external-rsvp-iframe"
              src="https://assessoriavip.com.br/rsvpUnico/484289f0-2471-11f0-8f46-830f817de8ff"
              className="w-full min-h-[600px] sm:min-h-[800px] border-0"
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
