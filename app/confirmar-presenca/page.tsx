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

      <div className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Image
                src="/monograma-white.png"
                alt="Monograma Rafaela & Lucas"
                width={80}
                height={80}
                className="w-16 h-16 md:w-20 md:h-20"
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-light tracking-wider mb-2">CONFIRMAR PRESENÇA</h1>
            <p className="text-[#cb9072] text-sm tracking-widest">SUA PRESENÇA É MUITO IMPORTANTE PARA NÓS</p>
          </div>

          

          <section className="mb-16">
            <div className="border-t border-b border-[#5c4d46]/30 py-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-light tracking-wider text-center mb-8 text-[#eec7b4]">
                FORMULÁRIO
              </h2>

              <div className="space-y-8">
                <div className="mt-8 text-center">
                  <p className="text-base text-[#eec7b4]">
                    Por favor, coloque o seu nome no formulário abaixo para confirmar sua presença no nosso grande dia.
                  </p>
                  <p className="text-base text-[#eec7b4]">
                    Basta rolar a página e escrever seu nome no campo indicado abaixo de "Confirme sua presença".
                  </p>
                  <div className="bg-[#5c4d46] border border-[#cb9072] rounded-lg overflow-hidden mt-8">
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
                </div>
              </div>
            </div>
          </section>
                
          <section className="mb-16">
            <div className="border-t border-b border-[#5c4d46]/30 py-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-light tracking-wider text-center mb-8 text-[#eec7b4]">
                LISTA DE PRESENTES
              </h2>

              <div className="space-y-8">
                <div className="mt-8 text-center">
                  <p className="text-base text-[#eec7b4] mb-4">
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
          </section>
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
