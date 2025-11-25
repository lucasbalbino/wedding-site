"use client"
import { Suspense, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { usePhoneParam } from "@/hooks/use-phone-param"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

interface TimelineEvent {
  date: string
  title: string
  description: string
  image: string
}

function TimelineContent() {
  const router = useRouter()
  const { addPhoneToUrl } = usePhoneParam()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const timeline: TimelineEvent[] = [
    {
      date: "Março 2019",
      title: "O Primeiro Encontro",
      description:
        "Nos conhecemos em uma festa de amigos em comum na universidade. Lucas estava tímido no canto da sala, e Rafaela, sempre extrovertida, foi conversar com ele. Foi amor à primeira vista - pelo menos para o Lucas! Rafaela demorou um pouco mais para se render ao charme dele.",
      image: "/first-meeting.png",
    },
    {
      date: "Abril 2019",
      title: "O Primeiro Encontro a Sós",
      description:
        "Depois de semanas trocando mensagens, finalmente marcamos nosso primeiro encontro. Fomos ao cinema assistir 'Vingadores: Ultimato' e depois tomamos um sorvete. Lucas estava tão nervoso que derrubou o sorvete na calça! Rafaela riu tanto que soube que ele era especial.",
      image: "/first-date.png",
    },
    {
      date: "Junho 2019",
      title: "Assumindo o Namoro",
      description:
        "Após dois meses se conhecendo melhor, Lucas finalmente teve coragem de pedir Rafaela em namoro durante um pôr do sol no Parque Vaca Brava. Ela disse sim antes mesmo dele terminar a pergunta! Foi o início oficial da nossa jornada juntos.",
      image: "/relationship-start.png",
    },
    {
      date: "Dezembro 2019",
      title: "A Primeira Viagem",
      description:
        "Nossa primeira viagem juntos foi para Caldas Novas. Passamos o Ano Novo lá e foi mágico! Descobrimos que somos parceiros perfeitos de viagem - Lucas planeja tudo nos mínimos detalhes e Rafaela traz a espontaneidade que torna tudo mais divertido.",
      image: "/first-trip.png",
    },
    {
      date: "Fevereiro 2021",
      title: "Morando Juntos",
      description:
        "Decidimos dar o próximo passo e morar juntos. Alugamos um apartamento pequeno mas aconchegante. Foi uma fase de muito aprendizado - descobrimos que Lucas é mais organizado e Rafaela é melhor na cozinha. Nos complementamos perfeitamente!",
      image: "/moving-together.png",
    },
    {
      date: "Julho 2022",
      title: "Viagem dos Sonhos",
      description:
        "Realizamos nossa viagem dos sonhos para a Europa! Visitamos Paris, Roma e Barcelona. Foi em Paris, na Torre Eiffel, que Lucas disse pela primeira vez que queria se casar com Rafaela. Ela chorou de emoção (e ele também, mas não conta para ninguém!).",
      image: "/europe-trip.png",
    },
    {
      date: "Março 2024",
      title: "A Formatura",
      description:
        "Nos formamos juntos na universidade! Foi um momento muito especial porque começamos essa jornada acadêmica juntos e a terminamos lado a lado. Nossas famílias se conheceram melhor nesse dia e já começaram a perguntar sobre casamento.",
      image: "/graduation.png",
    },
    {
      date: "Setembro 2024",
      title: "O Pedido de Casamento",
      description:
        "Lucas planejou tudo em segredo por meses. Organizou um piquenique no mesmo parque onde assumimos o namoro, com a ajuda dos nossos amigos e famílias escondidos. Quando Rafaela chegou e viu a decoração, já sabia o que estava acontecendo. Ela disse SIM antes mesmo dele se ajoelhar!",
      image: "/proposal.png",
    },
    {
      date: "Abril 2026",
      title: "O Grande Dia",
      description:
        "E aqui estamos nós, prestes a nos tornar marido e mulher! Depois de 7 anos juntos, estamos mais apaixonados do que nunca. Obrigado por fazer parte da nossa história e por estar conosco neste dia tão especial. Que nossa jornada continue sendo repleta de amor, risadas e aventuras!",
      image: "/wedding-day.png",
    },
  ]

  return (
    <div className="min-h-screen bg-[#080a09] text-[#f8f7f3]">
      <nav className="fixed top-0 w-full bg-[#080a09]/95 backdrop-blur-sm border-b border-[#5c4d46]/20 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between lg:justify-center gap-4">
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
                Informações Gerais
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
                    Informações Gerais
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4 lg:pt-32 lg:pb-20 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 lg:mb-24">
            <h1 className="font-sans text-4xl lg:text-6xl font-light tracking-wider text-[#f8f7f3] mb-4">
              Nossa História
            </h1>
            <p className="text-lg lg:text-xl text-[#f8f7f3]/80 max-w-3xl mx-auto">
              Uma jornada de amor que começou na universidade e nos trouxe até aqui. Cada momento foi especial e nos
              moldou como casal.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-[#5c4d46]/30 transform lg:-translate-x-0.5"></div>

            <div className="space-y-12 lg:space-y-16">
              {timeline.map((event, index) => (
                <div key={index} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-6 lg:left-1/2 w-4 h-4 lg:w-5 lg:h-5 bg-[#cb9072] rounded-full transform lg:-translate-x-2.5 z-10"></div>

                  <div className={`ml-16 lg:ml-0 lg:w-1/2 ${index % 2 === 0 ? "lg:pr-12" : "lg:ml-1/2 lg:pl-12"}`}>
                    <Card className="p-6 lg:p-8 bg-[#5c4d46]/20 border border-[#5c4d46]/30">
                      <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
                        <div className={`md:w-2/3 ${index % 2 === 1 ? "md:order-2" : ""}`}>
                          <div className="mb-3">
                            <span className="text-sm lg:text-base font-medium text-[#cb9072] bg-[#5c4d46]/40 px-3 py-1 lg:px-4 lg:py-2 rounded-full">
                              {event.date}
                            </span>
                          </div>
                          <h3 className="font-sans text-xl lg:text-2xl font-light text-[#eec7b4] mb-3 tracking-wide">
                            {event.title}
                          </h3>
                          <p className="text-[#f8f7f3]/80 leading-relaxed text-sm lg:text-base">{event.description}</p>
                        </div>
                        <div className={`md:w-1/3 ${index % 2 === 1 ? "md:order-1" : ""}`}>
                          <img
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            className="w-full h-32 md:h-24 lg:h-32 object-cover rounded-lg"
                          />
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Final message */}
          <div className="mt-16 lg:mt-24 text-center">
            <Card className="p-8 lg:p-12 bg-[#5c4d46]/20 border border-[#5c4d46]/30">
              <h2 className="font-sans text-2xl lg:text-4xl font-light tracking-wider text-[#eec7b4] mb-4">
                Obrigado por fazer parte da nossa história!
              </h2>
              <p className="text-[#f8f7f3]/80 max-w-3xl mx-auto text-sm lg:text-base">
                Cada pessoa que estará conosco no dia 20 de abril de 2026 tem um lugar especial em nossos corações.
                Vocês são parte da nossa jornada e estamos ansiosos para celebrar este momento único com todos vocês.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function NossaHistoriaPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080a09]" />}>
      <TimelineContent />
    </Suspense>
  )
}
