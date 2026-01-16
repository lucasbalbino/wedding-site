"use client"

import { useState, Suspense } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { usePhoneParam } from "@/hooks/use-phone-param"
import { ArrowLeft, MapPin, Coffee, Trees as Tree, Car, Home } from "lucide-react"

function DicasGoianiaContent() {
  const router = useRouter()
  const { addPhoneToUrl } = usePhoneParam()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#080a09] text-[#f8f7f3]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080a09]/95 backdrop-blur-sm border-b border-[#5c4d46]/20">
        <div className="px-4 py-4 flex items-center justify-between lg:justify-center">
          <button
            onClick={() => router.back()}
            className="lg:hidden text-[#f8f7f3] p-2 hover:text-[#eec7b4] transition-colors"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <div className="hidden lg:flex items-center gap-12">
            <Link
              href={addPhoneToUrl("/")}
              className="text-[#f8f7f3] hover:text-[#eec7b4] transition-colors font-light text-sm tracking-wide"
            >
              Início
            </Link>
            <Link
              href={addPhoneToUrl("/confirmar-presenca")}
              className="text-[#f8f7f3] hover:text-[#eec7b4] transition-colors font-light text-sm tracking-wide"
            >
              Confirmar Presença
            </Link>
            <Link
              href={addPhoneToUrl("/lista-presentes")}
              className="text-[#f8f7f3] hover:text-[#eec7b4] transition-colors font-light text-sm tracking-wide"
            >
              Lista de Presentes
            </Link>
            <Link
              href={addPhoneToUrl("/informacoes")}
              className="text-[#f8f7f3] hover:text-[#eec7b4] transition-colors font-light text-sm tracking-wide"
            >
              Informações
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-[#f8f7f3] p-2 ml-auto"
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
                <Link
                  href={addPhoneToUrl("/informacoes")}
                  className="text-[#f8f7f3] hover:text-[#eec7b4] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Informações
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="pt-20 pb-12 px-4 pt-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
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
            <h1 className="text-3xl md:text-4xl font-light tracking-wider mb-2">DICAS DE GOIÂNIA</h1>
            <p className="text-[#cb9072] text-sm tracking-widest">EXPLORE A CIDADE E REGIÃO</p>
            <p className="text-lg mt-8 text-[#f8f7f3]/80 max-w-2xl mx-auto">
              Para quem está vindo de fora, preparamos algumas sugestões especiais de lugares para conhecer em Goiânia e
              cidades próximas!
            </p>
          </div>

          {/* Onde se Hospedar */}
          <section className="mb-16 lg:mb-24">
            <div className="border-t border-b border-[#5c4d46]/30 py-8 mb-8 lg:py-12 lg:mb-12">
              <div className="flex items-center justify-center gap-3 mb-8">
                <Home className="w-6 h-6 lg:w-8 lg:h-8 text-[#cb9072]" />
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wider text-center text-[#eec7b4]">
                  ONDE SE HOSPEDAR
                </h2>
              </div>

              <p className="text-center text-[#f8f7f3]/80 mb-8 max-w-2xl mx-auto">
                Recomendamos se hospedar em um desses bairros próximos ao local do casamento:
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="border border-[#5c4d46]/30 rounded-lg p-6 hover:border-[#cb9072]/50 transition-colors">
                  <h3 className="text-xl lg:text-2xl font-light text-[#eec7b4] mb-3">Setor Bueno</h3>
                  <p className="text-[#f8f7f3]/80">
                    Bairro nobre e bem localizado, com diversos hotéis e fácil acesso ao local do evento.
                  </p>
                </div>

                <div className="border border-[#5c4d46]/30 rounded-lg p-6 hover:border-[#cb9072]/50 transition-colors">
                  <h3 className="text-xl lg:text-2xl font-light text-[#eec7b4] mb-3">Setor Marista</h3>
                  <p className="text-[#f8f7f3]/80">
                    Região central com ótima infraestrutura, restaurantes e opções de hospedagem variadas.
                  </p>
                </div>

                <div className="border border-[#5c4d46]/30 rounded-lg p-6 hover:border-[#cb9072]/50 transition-colors">
                  <h3 className="text-xl lg:text-2xl font-light text-[#eec7b4] mb-3">Jardim Goiás</h3>
                  <p className="text-[#f8f7f3]/80">
                    Bairro moderno e sofisticado, próximo ao Parque Flamboyant e com excelentes opções de acomodação.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Parques e Feiras */}
          <section className="mb-16 lg:mb-24">
            <div className="border-t border-b border-[#5c4d46]/30 py-8 mb-8 lg:py-12 lg:mb-12">
              <div className="flex items-center justify-center gap-3 mb-8">
                <Tree className="w-6 h-6 lg:w-8 lg:h-8 text-[#cb9072]" />
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wider text-center text-[#eec7b4]">
                  PARQUES E FEIRAS DE RUA
                </h2>
              </div>

              <p className="text-center text-[#f8f7f3]/80 mb-8 max-w-2xl mx-auto">
                Goiânia tem muitos espaços verdes ótimos para caminhadas, piqueniques e relaxar ao ar livre, além de feiras que são tradicionais na cidade.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src="/parques-e-feiras-1.jpeg"
                    alt="Parques em Goiânia 1"
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src="/parques-e-feiras-2.jpeg"
                    alt="Parques em Goiânia 2"
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src="/parques-e-feiras-3.jpeg"
                    alt="Feiras em Goiânia"
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>

              <div className="space-y-8">
                {/* Parques */}
                <div>
                  <h3 className="text-xl lg:text-2xl font-light mb-4 text-[#eec7b4]">Parques</h3>
                  <ul className="space-y-3 text-[#f8f7f3]/80">
                    <li className="flex items-start gap-2">
                      <span className="text-[#cb9072] mt-1">•</span>
                      <span>
                        <strong className="text-[#f8f7f3]">Parque Flamboyant</strong> - grande área com lagos, ciclovias
                        e espaços para caminhar.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#cb9072] mt-1">•</span>
                      <span>
                        <strong className="text-[#f8f7f3]">Parque Vaca Brava</strong> - um dos mais visitados da cidade,
                        com lago e pista de caminhada.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#cb9072] mt-1">•</span>
                      <span>
                        <strong className="text-[#f8f7f3]">Lago das Rosas + Zoológico de Goiânia</strong> - ótimo para
                        famílias e passeios com crianças.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Feiras */}
                <div>
                  <h3 className="text-xl lg:text-2xl font-light mb-4 text-[#eec7b4]">Feiras de Rua</h3>
                  <ul className="space-y-3 text-[#f8f7f3]/80">
                    <li className="flex items-start gap-2">
                      <span className="text-[#cb9072] mt-1">•</span>
                      <span>
                        <strong className="text-[#f8f7f3]">Feira da Lua</strong> (sábados à noite) - feira tradicional
                        com comidas típicas, artesanato e produtos locais.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#cb9072] mt-1">•</span>
                      <span>
                        <strong className="text-[#f8f7f3]">Feira do Sol</strong> (domingos à tarde) - uma das feiras
                        mais queridas da cidade, com comidas e grandes variedades de produtos.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#cb9072] mt-1">•</span>
                      <span>
                        <strong className="text-[#f8f7f3]">Feira Hippie + Rua 44</strong> (final de semana) - feira
                        muito popular, cheia de roupas, acessórios e lembranças.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Restaurantes e Bares */}
          <section className="mb-16 lg:mb-24">
            <div className="border-t border-b border-[#5c4d46]/30 py-8 mb-8 lg:py-12 lg:mb-12">
              <div className="flex items-center justify-center gap-3 mb-8">
                <Coffee className="w-6 h-6 lg:w-8 lg:h-8 text-[#cb9072]" />
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wider text-center text-[#eec7b4]">
                  CAFÉS E RESTAURANTES
                </h2>
              </div>

              <p className="text-center text-[#f8f7f3]/80 mb-8 max-w-2xl mx-auto">
                Goiânia tem uma cena gastronômica vibrante, com opções que vão de cafés acolhedores a bares animados.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src="/cafes-e-restaurantes-1.jpeg"
                    alt="Cafés em Goiânia"
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src="/cafes-e-restaurantes-2.jpeg"
                    alt="Restaurantes em Goiânia"
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src="/cafes-e-restaurantes-3.jpeg"
                    alt="Bares em Goiânia"
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>

              <div className="space-y-8">
                {/* Cafés */}
                <div>
                  <h3 className="text-xl lg:text-2xl font-light mb-4 text-[#eec7b4]">Cafés e lugares para relaxar</h3>
                  <ul className="space-y-3 text-[#f8f7f3]/80">
                    <li className="flex items-start gap-2">
                      <span className="text-[#cb9072] mt-1">•</span>
                      <span>
                        <strong className="text-[#f8f7f3]">Sax Coffee & More</strong> - clássico da cidade, ótimo para café da manhã.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#cb9072] mt-1">•</span>
                      <span>
                        <strong className="text-[#f8f7f3]">Café Biano</strong> - ambiente agradável e tranquilo.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#cb9072] mt-1">•</span>
                      <span>
                        <strong className="text-[#f8f7f3]">Cariño Coffee Cafeteria</strong> - café especial e ambiente
                        descontraído.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Bares */}
                <div>
                  <h3 className="text-xl lg:text-2xl font-light mb-4 text-[#eec7b4]">Restaurantes e bares</h3>
                  <ul className="space-y-3 text-[#f8f7f3]/80">
                    <li className="flex items-start gap-2">
                      <span className="text-[#cb9072] mt-1">•</span>
                      <span>
                        <strong className="text-[#f8f7f3]">Caseratto</strong> - restaurante tradicional com clima descontraído.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#cb9072] mt-1">•</span>
                      <span>
                        <strong className="text-[#f8f7f3]">Garibaldi</strong> - restaurante com brinquedoteca gigante e muitas opções de pratos.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#cb9072] mt-1">•</span>
                      <span>
                        <strong className="text-[#f8f7f3]">Abruzzo</strong> - comida italiana com ambientação única.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#cb9072] mt-1">•</span>
                      <span>
                        <strong className="text-[#f8f7f3]">Vikings Pub</strong> - ambiente animado com opções de drinks
                        e chopp.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Cidades Próximas */}
          <section className="mb-16 lg:mb-24">
            <div className="border-t border-b border-[#5c4d46]/30 py-8 mb-8 lg:py-12 lg:mb-12">
              <div className="flex items-center justify-center gap-3 mb-8">
                <Car className="w-6 h-6 lg:w-8 lg:h-8 text-[#cb9072]" />
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wider text-center text-[#eec7b4]">
                  CIDADES PRÓXIMAS
                </h2>
              </div>

              <p className="text-center text-[#f8f7f3]/80 mb-8 max-w-2xl mx-auto">
                Para quem quiser explorar além de Goiânia, aqui vão opções imperdíveis de bate-volta ou fim de semana.
              </p>

              <div className="space-y-8">
                {/* Pirenópolis */}
                <div className="border border-[#5c4d46]/30 rounded-lg p-6 hover:border-[#cb9072]/50 transition-colors">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="rounded-lg overflow-hidden">
                      <Image
                        src="/pirenopolis-1.jpeg"
                        alt="Pirenópolis - Centro Histórico"
                        width={400}
                        height={250}
                        className="w-full h-40 object-cover"
                      />
                    </div>
                    <div className="rounded-lg overflow-hidden">
                      <Image
                        src="/pirenopolis-2.jpeg"
                        alt="Pirenópolis - Cachoeiras"
                        width={400}
                        height={250}
                        className="w-full h-40 object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="w-5 h-5 text-[#cb9072] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl lg:text-2xl font-light text-[#eec7b4] mb-2">Pirenópolis</h3>
                      <p className="text-sm text-[#f8f7f3]/60 mb-3">~128 km de Goiânia - cerca de 2h de carro</p>
                      <p className="text-[#f8f7f3]/80 mb-3">
                        <strong className="text-[#f8f7f3]">Como ir:</strong> Carro pela GO-431 ou ônibus a partir da
                        Rodoviária.
                      </p>
                      <p className="text-[#f8f7f3]/80 mb-2">
                        <strong className="text-[#f8f7f3]">O que fazer:</strong>
                      </p>
                      <ul className="space-y-2 text-[#f8f7f3]/80">
                        <li className="flex items-start gap-2">
                          <span className="text-[#cb9072] mt-1">•</span>
                          <span>Centro Histórico com casarões coloniais e cafés charmosos (famosa Rua do Lazer)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#cb9072] mt-1">•</span>
                          <span>Cachoeiras incríveis nos arredores (Usina Velha, Meia Lua e outras)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#cb9072] mt-1">•</span>
                          <span>Trilha e natureza no Parque Estadual dos Pireneus</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Cidade de Goiás */}
                <div className="border border-[#5c4d46]/30 rounded-lg p-6 hover:border-[#cb9072]/50 transition-colors">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="rounded-lg overflow-hidden">
                      <Image
                        src="/goias-velho-1.jpeg"
                        alt="Cidade de Goiás - Centro Histórico"
                        width={400}
                        height={250}
                        className="w-full h-40 object-cover"
                      />
                    </div>
                    <div className="rounded-lg overflow-hidden">
                      <Image
                        src="/goias-velho-2.jpeg"
                        alt="Cidade de Goiás - Arquitetura"
                        width={400}
                        height={250}
                        className="w-full h-40 object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="w-5 h-5 text-[#cb9072] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl lg:text-2xl font-light text-[#eec7b4] mb-2">
                        Cidade de Goiás (Goiás Velho)
                      </h3>
                      <p className="text-sm text-[#f8f7f3]/60 mb-3">~141 km de Goiânia - cerca de 2h30 de carro</p>
                      <p className="text-[#f8f7f3]/80 mb-3">
                        <strong className="text-[#f8f7f3]">Como ir:</strong> Carro pela BR-070.
                      </p>
                      <p className="text-[#f8f7f3]/80 mb-2">
                        <strong className="text-[#f8f7f3]">O que fazer:</strong>
                      </p>
                      <ul className="space-y-2 text-[#f8f7f3]/80">
                        <li className="flex items-start gap-2">
                          <span className="text-[#cb9072] mt-1">•</span>
                          <span>Centro histórico tombado pela UNESCO, com ruas de pedra e arquitetura colonial</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#cb9072] mt-1">•</span>
                          <span>Visitar museus, casas históricas e cafés locais</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#cb9072] mt-1">•</span>
                          <span>Igreja de São Francisco de Paula e outros prédios históricos</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Caldas Novas */}
                <div className="border border-[#5c4d46]/30 rounded-lg p-6 hover:border-[#cb9072]/50 transition-colors">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="rounded-lg overflow-hidden">
                      <Image
                        src="/caldas-novas-1.jpeg"
                        alt="Caldas Novas - Águas Termais"
                        width={400}
                        height={250}
                        className="w-full h-40 object-cover"
                      />
                    </div>
                    <div className="rounded-lg overflow-hidden">
                      <Image
                        src="/caldas-novas-2.jpeg"
                        alt="Caldas Novas - Hot Park"
                        width={400}
                        height={250}
                        className="w-full h-40 object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="w-5 h-5 text-[#cb9072] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl lg:text-2xl font-light text-[#eec7b4] mb-2">Caldas Novas</h3>
                      <p className="text-sm text-[#f8f7f3]/60 mb-3">~170 km de Goiânia - cerca de 2h30 de carro</p>
                      <p className="text-[#f8f7f3]/80 mb-3">
                        <strong className="text-[#f8f7f3]">Como ir:</strong> BR-153 e depois GO-139.
                      </p>
                      <p className="text-[#f8f7f3]/80 mb-2">
                        <strong className="text-[#f8f7f3]">O que fazer:</strong>
                      </p>
                      <ul className="space-y-2 text-[#f8f7f3]/80">
                        <li className="flex items-start gap-2">
                          <span className="text-[#cb9072] mt-1">•</span>
                          <span>Águas termais e parques aquáticos</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#cb9072] mt-1">•</span>
                          <span>
                            Hot Park (Rio Quente) - grande parque aquático com piscinas de água quente e atrações para
                            todas as idades
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#cb9072] mt-1">•</span>
                          <span>Resorts com piscinas termais e spa</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Brasília */}
                <div className="border border-[#5c4d46]/30 rounded-lg p-6 hover:border-[#cb9072]/50 transition-colors">
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="w-5 h-5 text-[#cb9072] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl lg:text-2xl font-light text-[#eec7b4] mb-2">Brasília (DF)</h3>
                      <p className="text-sm text-[#f8f7f3]/60 mb-3">~200 km de Goiânia - cerca de 2h30 a 3h de carro</p>
                      <p className="text-[#f8f7f3]/80 mb-3">
                        <strong className="text-[#f8f7f3]">Como ir:</strong> BR-060 direto ou ônibus saindo da
                        rodoviária.
                      </p>
                      <p className="text-[#f8f7f3]/80 mb-2">
                        <strong className="text-[#f8f7f3]">O que fazer:</strong>
                      </p>
                      <ul className="space-y-2 text-[#f8f7f3]/80">
                        <li className="flex items-start gap-2">
                          <span className="text-[#cb9072] mt-1">•</span>
                          <span>Esplanada dos Ministérios, Congresso Nacional e obras de Oscar Niemeyer</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#cb9072] mt-1">•</span>
                          <span>Catedral de Brasília e parques urbanos</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#cb9072] mt-1">•</span>
                          <span>Restaurantes modernos e vida noturna diferenciada</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default function DicasGoianiaPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#080a09] flex items-center justify-center">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Image src="/monograma-white.png" alt="LR" width={60} height={60} className="w-16 h-16" />
            </div>
            <p className="text-[#f8f7f3]">Carregando...</p>
          </div>
        </div>
      }
    >
      <DicasGoianiaContent />
    </Suspense>
  )
}
