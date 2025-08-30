import Link from "next/link"
import { Card } from "@/components/ui/card"

interface TimelineEvent {
  date: string
  title: string
  description: string
  image: string
}

export default function NossaHistoriaPage() {
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
      date: "Abril 2029",
      title: "O Grande Dia",
      description:
        "E aqui estamos nós, prestes a nos tornar marido e mulher! Depois de 10 anos juntos, estamos mais apaixonados do que nunca. Obrigado por fazer parte da nossa história e por estar conosco neste dia tão especial. Que nossa jornada continue sendo repleta de amor, risadas e aventuras!",
      image: "/wedding-day.png",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="font-serif text-2xl font-bold text-primary">
              R&L
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/confirmar-presenca" className="text-muted-foreground hover:text-primary transition-colors">
                Confirmar Presença
              </Link>
              <Link href="/lista-presentes" className="text-muted-foreground hover:text-primary transition-colors">
                Lista de Presentes
              </Link>
              <Link href="/informacoes" className="text-muted-foreground hover:text-primary transition-colors">
                Informações
              </Link>
              <Link href="/nossa-historia" className="text-primary font-medium">
                Nossa História
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl font-bold text-primary mb-4">Nossa História</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Uma jornada de amor que começou na universidade e nos trouxe até aqui. Cada momento foi especial e nos
              moldou como casal.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform md:-translate-x-0.5"></div>

            <div className="space-y-12">
              {timeline.map((event, index) => (
                <div key={index} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-primary rounded-full transform md:-translate-x-2 z-10"></div>

                  {/* Content */}
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-8" : "md:ml-1/2 md:pl-8"}`}>
                    <Card className="p-6 bg-card border-border">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className={`md:w-2/3 ${index % 2 === 1 ? "md:order-2" : ""}`}>
                          <div className="mb-3">
                            <span className="text-sm font-medium text-accent bg-secondary px-3 py-1 rounded-full">
                              {event.date}
                            </span>
                          </div>
                          <h3 className="font-serif text-xl font-semibold text-primary mb-3">{event.title}</h3>
                          <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                        </div>
                        <div className={`md:w-1/3 ${index % 2 === 1 ? "md:order-1" : ""}`}>
                          <img
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            className="w-full h-32 md:h-24 object-cover rounded-lg"
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
          <div className="mt-16 text-center">
            <Card className="p-8 bg-secondary/20 border-secondary">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-full mb-6">
                <span className="font-serif text-2xl font-bold text-primary">R&L</span>
              </div>
              <h2 className="font-serif text-2xl font-semibold text-primary mb-4">
                Obrigado por fazer parte da nossa história!
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Cada pessoa que estará conosco no dia 20 de abril de 2029 tem um lugar especial em nossos corações.
                Vocês são parte da nossa jornada e estamos ansiosos para celebrar este momento único com todos vocês.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
