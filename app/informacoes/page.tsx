import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function InformacoesPage() {
  const weddingDetails = [
    {
      title: "Cerimônia",
      details: [
        "Data: 20 de Abril de 2029",
        "Horário: 17h00",
        "Local: Igreja São Francisco de Assis",
        "Endereço: Rua 10, nº 123, Setor Central, Goiânia - GO",
      ],
    },
    {
      title: "Recepção",
      details: [
        "Horário: 19h00",
        "Local: Espaço Villa Bella",
        "Endereço: Av. T-4, nº 456, Setor Bueno, Goiânia - GO",
        "Jantar servido às 20h30",
      ],
    },
  ]

  const dressCodes = [
    {
      category: "Homens",
      suggestions: [
        "Terno escuro ou claro",
        "Gravata ou gravata borboleta",
        "Sapatos sociais",
        "Evitar shorts e chinelos",
      ],
    },
    {
      category: "Mulheres",
      suggestions: [
        "Vestido de festa",
        "Sapatos confortáveis",
        "Evitar branco, off-white e nude",
        "Acessórios elegantes",
      ],
    },
  ]

  const importantNotes = [
    "Cerimônia religiosa - favor manter silêncio durante a celebração",
    "Recepção com pista de dança - venham preparados para dançar!",
    "Estacionamento disponível nos dois locais",
    "Em caso de chuva, a cerimônia será mantida no local coberto",
    "Favor confirmar presença até 15 dias antes do evento",
  ]

  const thingsToDo = [
    {
      category: "Cafés e Restaurantes",
      places: [
        {
          name: "Café com Letras",
          description: "Livraria-café aconchegante no Setor Oeste",
          address: "Rua 4, Setor Oeste",
        },
        {
          name: "Restaurante Pamonharia",
          description: "Culinária goiana tradicional",
          address: "Av. Anhanguera, Centro",
        },
        {
          name: "Empório Savana",
          description: "Café especial e brunch",
          address: "Rua T-28, Setor Bueno",
        },
      ],
    },
    {
      category: "Pontos Turísticos",
      places: [
        {
          name: "Centro Cultural Oscar Niemeyer",
          description: "Arquitetura moderna e exposições",
          address: "Praça Cívica, Centro",
        },
        {
          name: "Mercado Central",
          description: "Artesanato e produtos locais",
          address: "Av. Araguaia, Centro",
        },
        {
          name: "Parque Vaca Brava",
          description: "Área verde para caminhadas",
          address: "Setor Bueno",
        },
        {
          name: "Feira da Lua",
          description: "Feira noturna com artesanato (sextas e sábados)",
          address: "Praça Tamandaré, Setor Oeste",
        },
      ],
    },
    {
      category: "Vida Noturna",
      places: [
        {
          name: "Setor Oeste",
          description: "Região com diversos bares e restaurantes",
          address: "Ruas 4, 8 e 10, Setor Oeste",
        },
        {
          name: "Passeio das Águas Shopping",
          description: "Cinema e praça de alimentação",
          address: "Av. Perimetral Norte",
        },
      ],
    },
  ]

  const hotels = [
    {
      name: "Hotel Villa Bella",
      category: "Luxo",
      description: "Hotel boutique próximo ao local da recepção",
      amenities: ["Wi-Fi gratuito", "Piscina", "Spa", "Restaurante"],
      distance: "5 min do local da festa",
      contact: "(62) 3000-0000",
    },
    {
      name: "Comfort Hotel Goiânia",
      category: "Conforto",
      description: "Hotel moderno no centro da cidade",
      amenities: ["Wi-Fi gratuito", "Academia", "Business center", "Café da manhã"],
      distance: "15 min do local da festa",
      contact: "(62) 3000-1111",
    },
    {
      name: "Ibis Goiânia",
      category: "Econômico",
      description: "Opção econômica com boa localização",
      amenities: ["Wi-Fi gratuito", "Restaurante 24h", "Estacionamento"],
      distance: "20 min do local da festa",
      contact: "(62) 3000-2222",
    },
    {
      name: "Pousada do Cerrado",
      category: "Charme",
      description: "Pousada aconchegante com decoração regional",
      amenities: ["Wi-Fi gratuito", "Jardim", "Café da manhã caseiro"],
      distance: "25 min do local da festa",
      contact: "(62) 3000-3333",
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
              <Link href="/nossa-historia" className="text-muted-foreground hover:text-primary transition-colors">
                Nossa História
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
              Tudo que você precisa saber sobre nosso casamento e sua estadia em Goiânia
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

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="p-6 bg-card border-border">
                  <h3 className="font-serif text-xl font-semibold text-primary mb-4">Trajes Sugeridos</h3>
                  <div className="space-y-4">
                    {dressCodes.map((dress) => (
                      <div key={dress.category}>
                        <h4 className="font-medium text-primary mb-2">{dress.category}</h4>
                        <ul className="space-y-1">
                          {dress.suggestions.map((suggestion, index) => (
                            <li key={index} className="text-sm text-muted-foreground">
                              • {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 bg-card border-border">
                  <h3 className="font-serif text-xl font-semibold text-primary mb-4">Avisos Importantes</h3>
                  <ul className="space-y-2">
                    {importantNotes.map((note, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        • {note}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </section>

            {/* Things to Do Section */}
            <section>
              <h2 className="font-serif text-3xl font-bold text-primary mb-8 text-center">
                O que fazer em Goiânia e região
              </h2>

              <div className="space-y-8">
                {thingsToDo.map((category) => (
                  <div key={category.category}>
                    <h3 className="font-serif text-2xl font-semibold text-primary mb-6">{category.category}</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.places.map((place) => (
                        <Card key={place.name} className="p-6 bg-card border-border">
                          <h4 className="font-medium text-primary mb-2">{place.name}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{place.description}</p>
                          <p className="text-xs text-muted-foreground">{place.address}</p>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Hotels Section */}
            <section>
              <h2 className="font-serif text-3xl font-bold text-primary mb-8 text-center">Onde se hospedar</h2>

              <div className="grid md:grid-cols-2 gap-8">
                {hotels.map((hotel) => (
                  <Card key={hotel.name} className="p-6 bg-card border-border">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-serif text-xl font-semibold text-primary">{hotel.name}</h3>
                      <Badge variant="secondary">{hotel.category}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{hotel.description}</p>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-primary mb-2">Comodidades:</h4>
                        <div className="flex flex-wrap gap-2">
                          {hotel.amenities.map((amenity) => (
                            <Badge key={amenity} variant="outline" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">{hotel.distance}</span>
                        <span className="font-medium text-primary">{hotel.contact}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="mt-8 p-6 bg-muted rounded-lg">
                <h3 className="font-serif text-lg font-semibold text-primary mb-2">Dica Importante</h3>
                <p className="text-muted-foreground">
                  Recomendamos fazer suas reservas com antecedência, especialmente para o final de semana do casamento.
                  Goiânia é um destino popular e os hotéis podem ficar lotados rapidamente.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
