"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { usePhoneParam } from "@/hooks/use-phone-param"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Menu, X, Loader2 } from "lucide-react"

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
  const { addPhoneToUrl } = usePhoneParam()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const [houseGifts, setHouseGifts] = useState<HouseGift[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/gifts")

        if (!response.ok) {
          throw new Error("Falha ao carregar presentes")
        }

        const data = await response.json()
        setHouseGifts(data.gifts || [])
      } catch (err) {
        console.error("Erro ao buscar presentes:", err)
        setError("Erro ao carregar a lista de presentes")
      } finally {
        setLoading(false)
      }
    }

    fetchGifts()
  }, [])

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

  const extractPrice = (priceRange: string): number => {
    if (!priceRange || typeof priceRange !== "string") {
      return 0
    }
    const match = priceRange.match(/R\$\s*(\d+(?:\.\d+)*)/)
    if (match) {
      return Number.parseInt(match[1].replace(/\./g, ""), 10)
    }
    return 0
  }

  const priceRangeData = useMemo(() => {
    const allPrices = [
      ...houseGifts.map((gift) => extractPrice(gift.priceRange)),
      ...honeymoonGifts.map((gift) => gift.value),
    ].filter((price) => price > 0)

    if (allPrices.length === 0) return { min: 0, max: 10000 }

    const min = Math.min(...allPrices)
    const max = Math.max(...allPrices)

    return { min, max }
  }, [houseGifts])

  useEffect(() => {
    if (priceRangeData.min !== 0 || priceRangeData.max !== 10000) {
      setPriceRange([priceRangeData.min, priceRangeData.max])
    }
  }, [priceRangeData])

  const filteredHouseGifts = useMemo(() => {
    return houseGifts.filter((gift) => {
      const price = extractPrice(gift.priceRange)
      return price >= priceRange[0] && price <= priceRange[1]
    })
  }, [houseGifts, priceRange])

  const filteredHoneymoonGifts = useMemo(() => {
    return honeymoonGifts.filter((gift) => {
      return gift.value >= priceRange[0] && gift.value <= priceRange[1]
    })
  }, [priceRange])

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
            <h1 className="text-3xl md:text-4xl font-light tracking-wider mb-2">LISTA DE PRESENTES</h1>
            <p className="text-[#cb9072] text-sm tracking-widest">SUA PRESENÇA JÁ É O MAIOR PRESENTE</p>
            <p className="text-lg mt-8  text-[#f8f7f3]/80 max-w-2xl mx-auto">
              Mas se quiser nos ajudar a começar nossa nova vida juntos ou
              contribuir para nossa lua de mel, ficamos muito gratos!
            </p>
          </div>

          <Tabs defaultValue="casa" className="w-full mt-16">
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

            <div className="mb-16 max-w-md mx-auto">
              <div className="bg-[#5c4d46] p-6 rounded border border-[#cb9072]">
                <h3 className="text-sm text-[#f8f7f3] mb-4 text-center">Filtrar por Preço</h3>
                <div className="space-y-4">
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={priceRangeData.max}
                      min={priceRangeData.min}
                      step={50}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-[#eec7b4]">
                    <span>R$ {priceRange[0].toLocaleString()}</span>
                    <span>R$ {priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <TabsContent value="casa" className="space-y-6 sm:space-y-8">
              <section className="mb-16 text-center">
                <div className="border-t border-b border-[#5c4d46]/30 py-8 mb-8">
                  <h2 className="text-2xl md:text-3xl font-light tracking-wider text-center mb-8 text-[#eec7b4]">
                    PRESENTES PARA A NOSSA CASA
                  </h2>
                  <p className="text-[#f8f7f3]/80">Itens que nos ajudarão a mobiliar e decorar nosso novo lar</p>
                  <p className="text-sm text-[#cb9072] mt-2">
                    {filteredHouseGifts.length} de {houseGifts.length} itens na faixa de preço selecionada
                  </p>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-[#eec7b4]" />
                    <span className="ml-2 text-[#eec7b4]">Carregando presentes...</span>
                  </div>
                ) : error ? (
                  <div className="text-center py-12">
                    <p className="text-red-400 mb-4">{error}</p>
                    <Button
                      onClick={() => window.location.reload()}
                      className="bg-[#eec7b4] text-[#080a09] hover:bg-[#cb9072] hover:text-[#f8f7f3] rounded-none"
                    >
                      Tentar Novamente
                    </Button>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {filteredHouseGifts.map((gift) => (
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
                                      src={
                                        generatePixQR(
                                          Number(gift.priceRange.split(" - ")[0].replace("R$", "").replace(".", "")),
                                        ) || "/placeholder.svg"
                                      }
                                      alt="QR Code PIX"
                                      className="w-48 h-48 mx-auto border border-[#cb9072] rounded"
                                    />
                                    <div className="space-y-2">
                                      <p className="text-sm text-[#eec7b4]">Ou copie o link:</p>
                                      <div className="p-2 bg-[#080a09] rounded text-xs break-all text-[#f8f7f3]">
                                        {generatePixLink(
                                          Number(gift.priceRange.split(" - ")[0].replace("R$", "").replace(".", "")),
                                        )}
                                      </div>
                                      <Button
                                        variant="outline"
                                        onClick={() =>
                                          navigator.clipboard.writeText(
                                            generatePixLink(
                                              Number(gift.priceRange.split(" - ")[0].replace("R$", "").replace(".", "")),
                                            ),
                                          )
                                        }
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
                )}
              </section>
            </TabsContent>

            <TabsContent value="lua-de-mel" className="space-y-6 sm:space-y-8">
              <section className="mb-16 text-center">
                <div className="border-t border-b border-[#5c4d46]/30 py-8 mb-8">
                  <h2 className="text-2xl md:text-3xl font-light tracking-wider text-center mb-8 text-[#eec7b4]">
                    PRESENTES PARA A NOSSA LUA DE MEL
                  </h2>
                  <p className="text-[#f8f7f3]/80">Contribua para tornar nossa lua de mel ainda mais especial</p>
                  <p className="text-sm text-[#cb9072] mt-2">
                    {filteredHouseGifts.length} de {houseGifts.length} itens na faixa de preço selecionada
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {filteredHoneymoonGifts.map((gift) => (
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
              </section>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
