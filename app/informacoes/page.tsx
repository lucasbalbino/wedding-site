import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function InformacoesPage() {
  const weddingDetails = [
    {
      title: "Cerimônia e Recepção",
      details: [
        "Data: 20 de Abril de 2029",
        "Horário: 16h00",
        "Local: Kauai Eventos",
        "Endereço: Rua 10, nº 123, Setor Central, Goiânia - GO",
      ],
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
              <Link href="/informacoes" className="text-primary font-medium">
                Informações
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl font-bold text-primary mb-4">Informações Gerais</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tudo que você precisa saber sobre a localização do nosso casamento
            </p>
          </div>

          <div className="space-y-16">
            {/* Wedding Details Section */}
            <section>
              <h2 className="font-serif text-3xl font-bold text-primary mb-8 text-center">Detalhes do Casamento</h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {weddingDetails.map((section) => (
                  <Card key={section.title} className="p-6 bg-card border-border">
                    <h3 className="font-serif text-xl font-semibold text-primary mb-4">{section.title}</h3>
                    <ul className="space-y-2">
                      {section.details.map((detail, index) => (
                        <li key={index} className="text-muted-foreground">
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
