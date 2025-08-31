"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Menu, X } from "lucide-react"

interface HouseGift {
  id: string
  name: string
  description: string
  priceRange: string
  image: string
  isSelected: boolean
  selectedBy?: string
  storeLinks: { name: string; url: string }[]
}

interface HoneymoonGift {
  id: string
  value: number
  description: string
  image: string
}

export default function ListaPresentesPage() {
  const searchParams = useSearchParams()
  const phoneFromUrl = searchParams.get("telefone")
  const phoneParam = phoneFromUrl ? `?telefone=${phoneFromUrl}` : ""
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const [houseGifts, setHouseGifts] = useState<HouseGift[]>([
    {
      id: "1",
      name: "Sofá 3 Lugares",
      description: "Sofá confortável para nossa sala de estar",
      priceRange: "R$ 1.500 - R$ 3.000",
      image: "/modern-sofa.png",
      isSelected: false,
      storeLinks: [
        { name: "Magazine Luiza", url: "https://magazineluiza.com.br" },
        { name: "Casas Bahia", url: "https://casasbahia.com.br" },
      ],
    },
    {
      id: "2",
      name: "Geladeira Duplex",
      description: "Geladeira moderna para nossa cozinha",
      priceRange: "R$ 2.000 - R$ 4.000",
      image: "/modern-refrigerator.png",
      isSelected: true,
      selectedBy: "Maria Silva",
      storeLinks: [
        { name: "Magazine Luiza", url: "https://magazineluiza.com.br" },
        { name: "Extra", url: "https://extra.com.br" },
      ],
    },
    {
      id: "3",
      name: "Conjunto de Panelas",
      description: "Conjunto completo de panelas antiaderentes",
      priceRange: "R$ 300 - R$ 800",
      image: "/cookware-set.png",
      isSelected: false,
      storeLinks: [
        { name: "Americanas", url: "https://americanas.com.br" },
        { name: "Submarino", url: "https://submarino.com.br" },
      ],
    },
    {
      id: "4",
      name: "Mesa de Jantar",
      description: "Mesa de jantar para 6 pessoas",
      priceRange: "R$ 800 - R$ 2.000",
      image: "/elegant-dining-table.png",
      isSelected: false,
      storeLinks: [
        { name: "Tok&Stok", url: "https://tokstok.com.br" },
        { name: "Mobly", url: "https://mobly.com.br" },
      ],
    },
    {
      id: "5",
      name: "Micro-ondas",
      description: "Micro-ondas moderno para facilitar o dia a dia",
      priceRange: "R$ 400 - R$ 800",
      image: "/microwave-oven.png",
      isSelected: false,
      storeLinks: [
        { name: "Magazine Luiza", url: "https://magazineluiza.com.br" },
        { name: "Casas Bahia", url: "https://casasbahia.com.br" },
      ],
    },
    {
      id: "6",
      name: "Jogo de Cama Casal",
      description: "Jogo de cama king size em algodão",
      priceRange: "R$ 200 - R$ 500",
      image: "/bed-sheets-set.png",
      isSelected: false,
      storeLinks: [
        { name: "Lojas Renner", url: "https://lojasrenner.com.br" },
        { name: "Zara Home", url: "https://zarahome.com" },
      ],
    },
  ])

  const honeymoonGifts: HoneymoonGift[] = [
    { id: "h1", value: 50, description: "Contribuição para jantar romântico", image: "/romantic-dinner.png" },
    { id: "h2", value: 100, description: "Passeio turístico", image: "/vibrant-city-square.png" },
    { id: "h3", value: 150, description: "Spa para o casal", image: "/couple-spa.png" },
    { id: "h4", value: 200, description: "Excursão de um dia", image: "/scenic-day-trip.png" },
    { id: "h5", value: 250, description: "Jantar em restaurante especial", image: "/fine-dining-experience.png" },
    { id: "h6", value: 300, description: "Atividade de aventura", image: "/mountain-biking-adventure.png" },
    { id: "h7", value: 500, description: "Hospedagem em hotel boutique", image: "/boutique-hotel.png" },
    { id: "h8", value: 750, description: "Cruzeiro romântico", image: "/romantic-cruise.png" },
    { id: "h9", value: 1000, description: "Experiência gastronômica exclusiva", image: "/exclusive-dining.png" },
    { id: "h10", value: 1500, description: "Pacote de atividades premium", image: "/premium-activities.png" },
    { id: "h11", value: 2000, description: "Extensão da lua de mel", image: "/honeymoon-extension.png" },
    { id: "h12", value: 5000, description: "Lua de mel dos sonhos", image: "/dream-honeymoon.png" },
  ]

  const [selectedGift, setSelectedGift] = useState<HouseGift | HoneymoonGift | null>(null)
  const [giftType, setGiftType] = useState<"house" | "honeymoon">("house")
  const [paymentMethod, setPaymentMethod] = useState<"physical" | "pix">("physical")

  const handleSelectHouseGift = (gift: HouseGift, method: "physical" | "pix") => {
    if (gift.isSelected) return

    setSelectedGift(gift)
    setGiftType("house")
    setPaymentMethod(method)
  }

  const handleSelectHoneymoonGift = (gift: HoneymoonGift) => {
    setSelectedGift(gift)
    setGiftType("honeymoon")
    setPaymentMethod("pix")
  }

  const handleConfirmSelection = () => {
    if (selectedGift && giftType === "house") {
      setHouseGifts((prev) =>
        prev.map((gift) => (gift.id === selectedGift.id ? { ...gift, isSelected: true, selectedBy: "Você" } : gift)),
      )
    }
    setSelectedGift(null)
  }

  const generatePixQR = (value: number) => {
    return `/placeholder.svg?height=200&width=200&query=QR code PIX R$${value}`
  }

  const generatePixLink = (value: number) => {
    return `pix://pay?amount=${value}&description=Presente%20Casamento%20Rafaela%20Lucas`
  }

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
                className="block text-[#f8f7f3] hover:text-[#eec7b4] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Confirmar Presença
              </Link>
              <Link
                href={`/lista-presentes${phoneParam}`}
                className="block text-[#eec7b4] font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Lista de Presentes
              </Link>
            </div>
          </div>
        )}
      </nav>

      <div className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 mt-16 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#f8f7f3] mb-4">Lista de Presentes</h1>
            <p className="text-base sm:text-lg text-[#eec7b4] max-w-2xl mx-auto">
              Sua presença já é o maior presente, mas se quiser nos ajudar a começar nossa nova vida juntos ou
              contribuir para nossa lua de mel, ficamos muito gratos!
            </p>
          </div>

          <Tabs defaultValue="casa" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8 bg-[#5c4d46] border-[#cb9072]">
              <TabsTrigger
                value="casa"
                className="data-[state=active]:bg-[#eec7b4] data-[state=active]:text-[#080a09] text-[#f8f7f3]"
              >
                Para Nossa Casa
              </TabsTrigger>
              <TabsTrigger
                value="lua-de-mel"
                className="data-[state=active]:bg-[#eec7b4] data-[state=active]:text-[#080a09] text-[#f8f7f3]"
              >
                Para Lua de Mel
              </TabsTrigger>
            </TabsList>

            <TabsContent value="casa" className="space-y-6 sm:space-y-8">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-[#f8f7f3] mb-2">Presentes para Nossa Casa</h2>
                <p className="text-[#eec7b4]">Itens que nos ajudarão a mobiliar e decorar nosso novo lar</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {houseGifts.map((gift) => (
                  <Card key={gift.id} className="overflow-hidden bg-[#5c4d46] border-[#cb9072]">
                    <div className="relative">
                      <img
                        src={gift.image || "/placeholder.svg"}
                        alt={gift.name}
                        className="w-full h-48 object-cover"
                      />
                      {gift.isSelected && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Badge className="bg-[#eec7b4] text-[#080a09]">Selecionado por {gift.selectedBy}</Badge>
                        </div>
                      )}
                    </div>
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-semibold text-[#f8f7f3] mb-2">{gift.name}</h3>
                      <p className="text-[#eec7b4] mb-3 text-sm sm:text-base">{gift.description}</p>
                      <p className="font-medium text-[#cb9072] mb-4">{gift.priceRange}</p>

                      {!gift.isSelected ? (
                        <div className="space-y-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                className="w-full bg-[#eec7b4] text-[#080a09] hover:bg-[#cb9072] hover:text-[#f8f7f3] rounded-none"
                                onClick={() => handleSelectHouseGift(gift, "physical")}
                              >
                                Comprar Fisicamente
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md bg-[#5c4d46] border-[#cb9072] text-[#f8f7f3]">
                              <DialogHeader>
                                <DialogTitle className="text-[#f8f7f3]">Comprar {gift.name}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <p className="text-[#eec7b4]">
                                  Você pode comprar este presente em uma das lojas abaixo:
                                </p>
                                <div className="space-y-2">
                                  {gift.storeLinks.map((store) => (
                                    <a
                                      key={store.name}
                                      href={store.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="block"
                                    >
                                      <Button
                                        variant="outline"
                                        className="w-full bg-transparent border-[#eec7b4] text-[#eec7b4] hover:bg-[#eec7b4] hover:text-[#080a09] rounded-none"
                                      >
                                        {store.name}
                                      </Button>
                                    </a>
                                  ))}
                                </div>
                                <Button
                                  onClick={handleConfirmSelection}
                                  className="w-full bg-[#eec7b4] text-[#080a09] hover:bg-[#cb9072] hover:text-[#f8f7f3] rounded-none"
                                >
                                  Confirmar Seleção
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full border-[#eec7b4] text-[#eec7b4] hover:bg-[#eec7b4] hover:text-[#080a09] bg-transparent rounded-none"
                                onClick={() => handleSelectHouseGift(gift, "pix")}
                              >
                                Enviar PIX
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md bg-[#5c4d46] border-[#cb9072] text-[#f8f7f3]">
                              <DialogHeader>
                                <DialogTitle className="text-[#f8f7f3]">PIX - {gift.name}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 text-center">
                                <p className="text-[#eec7b4]">
                                  Escaneie o QR Code ou use o link abaixo para enviar o PIX:
                                </p>
                                <img
                                  src={generatePixQR(1500) || "/placeholder.svg"}
                                  alt="QR Code PIX"
                                  className="w-48 h-48 mx-auto border border-[#cb9072] rounded"
                                />
                                <div className="space-y-2">
                                  <p className="text-sm text-[#eec7b4]">Ou copie o link:</p>
                                  <div className="p-2 bg-[#080a09] rounded text-xs break-all text-[#f8f7f3]">
                                    {generatePixLink(1500)}
                                  </div>
                                  <Button
                                    variant="outline"
                                    onClick={() => navigator.clipboard.writeText(generatePixLink(1500))}
                                    className="w-full border-[#eec7b4] text-[#eec7b4] hover:bg-[#eec7b4] hover:text-[#080a09] bg-transparent rounded-none"
                                  >
                                    Copiar Link PIX
                                  </Button>
                                </div>
                                <Button
                                  onClick={handleConfirmSelection}
                                  className="w-full bg-[#eec7b4] text-[#080a09] hover:bg-[#cb9072] hover:text-[#f8f7f3] rounded-none"
                                >
                                  Confirmar Seleção
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      ) : (
                        <Button disabled className="w-full bg-[#5c4d46] text-[#eec7b4] rounded-none">
                          Já Selecionado
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="lua-de-mel" className="space-y-6 sm:space-y-8">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-[#f8f7f3] mb-2">
                  Presentes para Nossa Lua de Mel
                </h2>
                <p className="text-[#eec7b4]">Contribua para tornar nossa lua de mel ainda mais especial</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {honeymoonGifts.map((gift) => (
                  <Card key={gift.id} className="overflow-hidden bg-[#5c4d46] border-[#cb9072]">
                    <img
                      src={gift.image || "/placeholder.svg"}
                      alt={gift.description}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <div className="text-xl sm:text-2xl font-bold text-[#f8f7f3] mb-2">
                        R$ {gift.value.toLocaleString()}
                      </div>
                      <p className="text-sm text-[#eec7b4] mb-4">{gift.description}</p>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            className="w-full bg-[#eec7b4] text-[#080a09] hover:bg-[#cb9072] hover:text-[#f8f7f3] rounded-none"
                            onClick={() => handleSelectHoneymoonGift(gift)}
                          >
                            Enviar PIX
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md bg-[#5c4d46] border-[#cb9072] text-[#f8f7f3]">
                          <DialogHeader>
                            <DialogTitle className="text-[#f8f7f3]">PIX - R$ {gift.value.toLocaleString()}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 text-center">
                            <p className="text-[#eec7b4]">{gift.description}</p>
                            <img
                              src={generatePixQR(gift.value) || "/placeholder.svg"}
                              alt="QR Code PIX"
                              className="w-48 h-48 mx-auto border border-[#cb9072] rounded"
                            />
                            <div className="space-y-2">
                              <p className="text-sm text-[#eec7b4]">Ou copie o link:</p>
                              <div className="p-2 bg-[#080a09] rounded text-xs break-all text-[#f8f7f3]">
                                {generatePixLink(gift.value)}
                              </div>
                              <Button
                                variant="outline"
                                onClick={() => navigator.clipboard.writeText(generatePixLink(gift.value))}
                                className="w-full border-[#eec7b4] text-[#eec7b4] hover:bg-[#eec7b4] hover:text-[#080a09] bg-transparent rounded-none"
                              >
                                Copiar Link PIX
                              </Button>
                            </div>
                            <p className="text-xs text-[#eec7b4]">Obrigado por contribuir para nossa lua de mel!</p>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
