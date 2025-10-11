"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePhoneParam } from "@/hooks/use-phone-param"
import { MapPin, Clock, Calendar, Instagram } from "lucide-react"

function InformacoesContent() {
  const { addPhoneToUrl } = usePhoneParam()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
                  href={addPhoneToUrl("/confirmar-presenca")}
                  className="text-[#f8f7f3] hover:text-[#eec7b4] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Confirmar Presença
                </Link>
                <Link
                  href={addPhoneToUrl("/lista-presentes")}
                  className="text-[#f8f7f3] hover:text-[#eec7b4] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Lista de Presentes
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
            <h1 className="text-3xl md:text-4xl font-light tracking-wider mb-2">INFORMAÇÕES GERAIS</h1>
            <p className="text-[#cb9072] text-sm tracking-widest">TUDO QUE VOCÊ PRECISA SABER</p>
          </div>

          <section className="mb-16">
            <div className="border-t border-b border-[#5c4d46]/30 py-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-light tracking-wider text-center mb-8 text-[#eec7b4]">
                DETALHES DO CASAMENTO
              </h2>

              <div className="space-y-8">
                {/* Data */}
                <div className="flex items-start gap-4">
                  <Calendar className="w-6 h-6 text-[#cb9072] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium mb-1 text-[#eec7b4]">Data</h3>
                    <p className="text-[#f8f7f3]/80">20 de Abril de 2026</p>
                  </div>
                </div>

                {/* Horário */}
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-[#cb9072] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium mb-1 text-[#eec7b4]">Horário</h3>
                    <p className="text-[#f8f7f3]/80">16h00</p>
                  </div>
                </div>

                {/* Local */}
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-[#cb9072] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-[#eec7b4]">Local</h3>
                    <p className="text-xl font-light mb-2">Kauai Eventos</p>
                    <p className="text-[#f8f7f3]/80 text-sm mb-2">
                      Alameda Juazeiro do Norte, 475 - Parque Amazonia
                      <br />
                      Goiânia - GO, 74840-500
                    </p>
                    <a
                      href="https://www.instagram.com/kauaieventos"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#cb9072] hover:text-[#eec7b4] transition-colors text-sm"
                    >
                      <Instagram className="w-4 h-4" />
                      @kauaieventos
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-light tracking-wider text-center mb-8 text-[#eec7b4]">
              COMO CHEGAR
            </h2>
            <div className="w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden border border-[#5c4d46]/30">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3820.915552545354!2d-49.2833295248499!3d-16.731064884048468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef0cc11037763%3A0x6fef5190e0275407!2sKauai%20Eventos!5e0!3m2!1spt-BR!2sbr!4v1760155069666!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização Kauai Eventos"
              />
            </div>
            <div className="text-center mt-4">
              <a
                href="https://maps.app.goo.gl/PCqazvXAQ2r8hbYn7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#cb9072] hover:text-[#eec7b4] transition-colors"
              >
                <MapPin className="w-4 h-4" />
                Abrir no Google Maps
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default function InformacoesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#080a09] flex items-center justify-center">
          <div className="text-center">
            <Image
              src="/monograma-white.png"
              alt="Monograma"
              width={80}
              height={80}
              className="w-20 h-20 mx-auto mb-4"
            />
            <p className="text-[#f8f7f3]">Carregando...</p>
          </div>
        </div>
      }
    >
      <InformacoesContent />
    </Suspense>
  )
}
