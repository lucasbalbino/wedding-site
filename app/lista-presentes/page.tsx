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
import { Loader2, MessageCircle } from "lucide-react"

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
  isSelected: boolean
  selectedBy?: string
}

export default function ListaPresentesPage() {
  const searchParams = useSearchParams()
  const phoneFromUrl = searchParams.get("telefone")
  const phoneParam = phoneFromUrl ? `?telefone=${phoneFromUrl}` : ""
  const { addPhoneToUrl } = usePhoneParam()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const [houseGifts, setHouseGifts] = useState<HouseGift[]>([])
  const [honeymoonGifts, setHoneymoonGifts] = useState<HoneymoonGift[]>([])
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

  useEffect(() => {
    const honeymoonData: HoneymoonGift[] = [
      {
        id: "h1",
        value: 50,
        description: "Gelato em Veneza: um delicioso sorvete artesanal",
        image: "/h1.jpeg",
        isSelected: false,
      },
      {
        id: "h2",
        value: 500,
        description: "Passeio de gôndola em Veneza: uma experiência romântica",
        image: "/h2.jpeg",
        isSelected: false,
      },
      {
        id: "h3",
        value: 300,
        description: "Jantar em um restaurante típico em Roma: uma noite especial",
        image: "/h3.jpeg",
        isSelected: false,
      },
      {
        id: "h4",
        value: 2500,
        description: "Passeio de balão na Toscana: uma aventura inesquecível",
        image: "/h4.jpeg",
        isSelected: false,
      },
      {
        id: "h5",
        value: 200,
        description: "Tour gastronômico em Florença: degustação de queijos e embutidos",
        image: "/h5.jpeg",
        isSelected: false,
      },
      {
        id: "h6",
        value: 100,
        description: "Entrada para o Coliseu em Roma: uma visita histórica",
        image: "/h6.jpeg",
        isSelected: false,
      },
      {
        id: "h7",
        value: 800,
        description: "Passeio de barco pelo Canal de Veneza: passeio mais privativo",
        image: "/h7.jpeg",
        isSelected: false,
      },
      {
        id: "h8",
        value: 400,
        description: "Experiência de culinária em Roma: aula de preparo de massas",
        image: "/h8.jpeg",
        isSelected: false,
      },
      {
        id: "h9",
        value: 150,
        description: "Passeio de bicicleta pela Toscana: uma manhã explorando a região",
        image: "/h9.jpeg",
        isSelected: false,
      },
      {
        id: "h10",
        value: 300,
        description: "Visita guiada aos Museus Vaticanos: um tour cultural",
        image: "/h10.jpeg",
        isSelected: false,
      },
      {
        id: "h11",
        value: 200,
        description: "Passeio de trem de alta velocidade: traslado entre cidades",
        image: "/honeymoon-extension.png",
        isSelected: false,
      },
      {
        id: "h12",
        value: 1000,
        description: "Experiência de spa em um hotel na Toscana: relaxamento e bem-estar",
        image: "/dream-honeymoon.png",
        isSelected: false,
      },
      {
        id: "h13",
        value: 250,
        description: "Tour de arte em Florença: visita às galerias e museus",
        image: "/dream-honeymoon.png",
        isSelected: false,
      },
      {
        id: "h14",
        value: 1500,
        description: "Noite em um hotel boutique em Veneza: uma experiência romântica",
        image: "/dream-honeymoon.png",
        isSelected: false,
      },
      {
        id: "h15",
        value: 600,
        description: "Passeio de barco pelo Lago de Como: uma tarde especial",
        image: "/dream-honeymoon.png",
        isSelected: false,
      },
      {
        id: "h16",
        value: 150,
        description: "Aula de italiano em Roma: uma introdução à língua",
        image: "/dream-honeymoon.png",
        isSelected: false,
      },
      {
        id: "h17",
        value: 250,
        description: "Passeio de tuk-tuk em Roma: um tour divertido",
        image: "/dream-honeymoon.png",
        isSelected: false,
      },
      {
        id: "h18",
        value: 1000,
        description: "Experiência de fotografia em Veneza: sessão de fotos profissional",
        image: "/dream-honeymoon.png",
        isSelected: false,
      },
      {
        id: "h19",
        value: 400,
        description: "Passeio de barco pelo Rio Arno em Florença: linda vista",
        image: "/dream-honeymoon.png",
        isSelected: false,
      },
      {
        id: "h20",
        value: 800,
        description: "Jantar em um restaurante com vista para o Coliseu: uma noite inesquecível",
        image: "/dream-honeymoon.png",
        isSelected: false,
      },
    ]
    setHoneymoonGifts(honeymoonData)
  }, [])

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
  }, [houseGifts, honeymoonGifts])

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
  }, [honeymoonGifts, priceRange])

  const [selectedGift, setSelectedGift] = useState<HouseGift | HoneymoonGift | null>(null)
  const [giftType, setGiftType] = useState<"house" | "honeymoon">("house")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSelectGift = (gift: HouseGift | HoneymoonGift, type: "house" | "honeymoon") => {
    if ("isSelected" in gift && gift.isSelected) return
    setSelectedGift(gift)
    setGiftType(type)
    setIsModalOpen(true)
  }

  const getAveragePriceForPix = (gift: HouseGift | HoneymoonGift) => {
    if (giftType === "house") {
      const hGift = gift as HouseGift
      const priceRange = hGift.priceRange
      const match = priceRange.match(/R\$\s*(\d+(?:\.\d+)*)\s*-\s*R\$\s*(\d+(?:\.\d+)*)/i)
      if (match) {
        const min = Number.parseInt(match[1].replace(/\./g, ""), 10)
        const max = Number.parseInt(match[2].replace(/\./g, ""), 10)
        return Math.round((min + max) / 2)
      }
      return 0
    }
    return (gift as HoneymoonGift).value
  }

// CRC-16/CCITT-FALSE -> retorna string hex (ex: "9C99")
const calculateCRC16 = (payload: string): string => {
  let crc = 0xffff
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff
      } else {
        crc = (crc << 1) & 0xffff
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0")
}

// Gera BR Code (Copia e Cola) — sanitiza o TXID (apenas A-Z a-z 0-9) e garante <=25 chars.
// amount em reais (ex: 2400.00). Passe giftId para gerar TXID referente ao item.
const generatePixData = (amount: number, giftId?: string) => {
  const pixKey = "eac0ac2b-4f4b-4e11-8a7b-342d96061aee"
  const merchantName = "Rafaela Teixeira Alvares"
  const merchantCity = "SAO PAULO"

  // --- gera txid legível + sanitiza para permitir apenas alfanuméricos ---
  const rawTxid = giftId ? `GFT${giftId}-${Date.now().toString(36).toUpperCase().slice(-8)}` : `AUTO${Date.now().toString(36).toUpperCase().slice(-10)}`
  const txidSanitized = rawTxid.replace(/[^A-Za-z0-9]/g, "").slice(0, 25) // só letras e dígitos, max 25 chars

  // --- Merchant Account Info (tag 26) corretamente montada ---
  const guiTag = "00" + "14" + "BR.GOV.BCB.PIX"                       // 00 + length(14) + GUI
  const keyTag = "01" + String(pixKey.length).padStart(2, "0") + pixKey // 01 + length + chave
  const maiValue = guiTag + keyTag
  const mai = "26" + String(maiValue.length).padStart(2, "0") + maiValue

  // --- Tags fixas ---
  const mcc = "52040000"
  const currency = "5303986" // 986 = BRL

  // --- Valor (tag 54) : somente se amount > 0 ---
  let valueField = ""
  if (typeof amount === "number" && amount > 0) {
    const amtStr = amount.toFixed(2) // ex: "2400.00"
    valueField = "54" + String(amtStr.length).padStart(2, "0") + amtStr
  }

  // --- País, Nome, Cidade ---
  const country = "5802BR"
  const nameField = "59" + String(merchantName.length).padStart(2, "0") + merchantName
  const cityField = "60" + String(merchantCity.length).padStart(2, "0") + merchantCity

  // --- TXID (tag 62 subtag 05) com txid sanitizado ---
  const sub05 = "05" + String(txidSanitized.length).padStart(2, "0") + txidSanitized
  const additionalData = "62" + String(sub05.length).padStart(2, "0") + sub05

  // --- Monta payload sem CRC ---
  const payloadNoCrc = ["000201", mai, mcc, currency, valueField, country, nameField, cityField, additionalData].join("")

  // --- Calcula CRC e retorna full BR Code ---
  const toCrc = payloadNoCrc + "6304"
  const crc = calculateCRC16(toCrc)
  return toCrc + crc
}

  const handleWhatsAppRedirect = (contact: "lucas" | "rafaela") => {
    if (!selectedGift) return

    const giftName = "name" in selectedGift ? selectedGift.name : selectedGift.description
    const phoneNumber = contact === "lucas" ? "5562991639973" : "5562982720235" // Atualize com números reais
    const message = `Olá! Gostaria de confirmar que vou presentear com: ${giftName}`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

    if (giftType === "house") {
      setHouseGifts((prev) =>
        prev.map((g) =>
          g.id === selectedGift.id
            ? { ...g, isSelected: true, selectedBy: contact === "lucas" ? "Lucas" : "Rafaela" }
            : g,
        ),
      )
    } else {
      setHoneymoonGifts((prev) =>
        prev.map((g) =>
          g.id === selectedGift.id
            ? { ...g, isSelected: true, selectedBy: contact === "lucas" ? "Lucas" : "Rafaela" }
            : g,
        ),
      )
    }

    setIsModalOpen(false)
    window.open(whatsappUrl, "_blank")
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
              Mas se quiser nos ajudar a começar nossa nova vida juntos ou contribuir para nossa lua de mel, ficamos
              muito gratos!
            </p>
          </div>

          <Tabs defaultValue="casa" className="w-full mt-16">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8 bg-[#5c4d46] border-[#cb9072] h-12">
              <TabsTrigger
                value="casa"
                className="data-[state=active]:bg-[#eec7b4] data-[state=active]:text-[#080a09] text-[#f8f7f3] text-lg"
              >
                Para Nossa Casa
              </TabsTrigger>
              <TabsTrigger
                value="lua-de-mel"
                className="data-[state=active]:bg-[#eec7b4] data-[state=active]:text-[#080a09] text-[#f8f7f3] text-lg"
              >
                Para Lua de Mel
              </TabsTrigger>
            </TabsList>

            <div className="mb-16 max-w-md mx-auto">
              <div className="bg-[#5c4d46] p-6 rounded border border-[#cb9072]">
                <h3 className="text-xs text-[#f8f7f3] mb-4 text-center">Filtrar por preço</h3>
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
                  <div className="flex justify-between text-xs text-[#eec7b4]">
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
                  <p className="text-xs text-[#cb9072] mt-2">
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
                            className="w-full h-64 object-cover"
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
                            <Dialog open={isModalOpen && selectedGift?.id === gift.id} onOpenChange={setIsModalOpen}>
                              <DialogTrigger asChild>
                                <Button
                                  className="w-full bg-[#eec7b4] text-[#080a09] hover:bg-[#cb9072] hover:text-[#f8f7f3] rounded-none"
                                  onClick={() => handleSelectGift(gift, "house")}
                                >
                                  Selecionar
                                </Button>
                              </DialogTrigger>
                              {selectedGift?.id === gift.id && (
                                <DialogContent className="max-w-2xl bg-[#5c4d46] border-[#cb9072] text-[#f8f7f3] rounded-none">
                                  <DialogHeader>
                                    <DialogTitle className="text-2xl font-light tracking-wider text-[#eec7b4]">
                                      {gift.name}
                                    </DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-8">
                                    <div className="border-b border-[#5c4d46] pb-6">
                                      <div className="flex items-center gap-3 mb-4">
                                        <div className="h-1 w-8 bg-[#eec7b4]"></div>
                                        <h4 className="text-lg font-light tracking-wider text-[#eec7b4]">
                                          COMPRAR FISICAMENTE
                                        </h4>
                                      </div>
                                      <p className="text-sm text-[#f8f7f3]/70 mb-4 leading-relaxed">
                                        Você pode comprar este presente em uma das seguintes lojas:
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
                                              className="w-full bg-transparent border border-[#cb9072] text-[#eec7b4] hover:bg-[#cb9072] hover:text-[#080a09] hover:border-[#eec7b4] rounded-none transition-all"
                                            >
                                              {store.name}
                                            </Button>
                                          </a>
                                        ))}
                                      </div>
                                    </div>

                                    <div className="border-b border-[#5c4d46] pb-6">
                                      <div className="flex items-center gap-3 mb-4">
                                        <div className="h-1 w-8 bg-[#eec7b4]"></div>
                                        <h4 className="text-lg font-light tracking-wider text-[#eec7b4]">ENVIAR PIX</h4>
                                      </div>
                                      <p className="text-sm text-[#f8f7f3]/70 mb-4 leading-relaxed">
                                        Valor aproximado:{" "}
                                        <span className="text-[#cb9072] font-semibold">
                                          R$ {getAveragePriceForPix(gift).toLocaleString()}
                                        </span>
                                      </p>
                                      <div className="space-y-3">
                                        <div className="p-4 bg-[#080a09] rounded border border-[#cb9072]/30">
                                          <p className="text-xs text-[#f8f7f3]/50 mb-2">Chave PIX (Copia e Cola):</p>
                                          <p className="text-xs break-all text-[#eec7b4] font-mono leading-relaxed">
                                            {generatePixData(getAveragePriceForPix(gift), gift.id)}
                                          </p>
                                        </div>
                                        <Button
                                          variant="outline"
                                          onClick={() =>
                                            navigator.clipboard.writeText(
                                              generatePixData(getAveragePriceForPix(gift), gift.id),
                                            )
                                          }
                                          className="w-full border border-[#cb9072] text-[#eec7b4] hover:bg-[#cb9072] hover:text-[#080a09] bg-transparent rounded-none transition-all"
                                        >
                                          Copiar PIX
                                        </Button>
                                      </div>
                                    </div>

                                    <div>
                                      <div className="flex items-center gap-3 mb-4">
                                        <div className="h-1 w-8 bg-[#eec7b4]"></div>
                                        <h4 className="text-lg font-light tracking-wider text-[#eec7b4]">
                                          CONFIRMAR SELEÇÃO
                                        </h4>
                                      </div>
                                      <p className="text-sm text-[#f8f7f3]/70 mb-4 leading-relaxed">
                                        Para confirmar sua seleção, envie uma mensagem direto para o Lucas ou para a
                                        Rafaela:
                                      </p>
                                      <div className="flex flex-wrap gap-3 justify-center">
                                        <a
                                          href={`https://wa.me/5562991639973?text=Olá! Gostaria de confirmar que vou presentear com: ${gift.name}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          onClick={() => handleWhatsAppRedirect("lucas")}
                                          className="inline-flex items-center gap-2 text-[#25D366] hover:text-[#1ebe5d] transition-colors group"
                                        >
                                          <MessageCircle className="w-4 h-4" />
                                          <span className="font-light tracking-wide">Lucas</span>
                                        </a>
                                        <span className="text-[#f8f7f3]/40">•</span>
                                        <a
                                          href={`https://wa.me/5562982720235?text=Olá! Gostaria de confirmar que vou presentear com: ${gift.name}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          onClick={() => handleWhatsAppRedirect("rafaela")}
                                          className="inline-flex items-center gap-2 text-[#25D366] hover:text-[#1ebe5d] transition-colors group"
                                        >
                                          <MessageCircle className="w-4 h-4" />
                                          <span className="font-light tracking-wide">Rafaela</span>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </DialogContent>
                              )}
                            </Dialog>
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
                  <p className="text-xs text-[#cb9072] mt-2">
                    {filteredHoneymoonGifts.length} de {honeymoonGifts.length} itens na faixa de preço selecionada
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {filteredHoneymoonGifts.map((gift) => (
                    <Card key={gift.id} className="overflow-hidden bg-[#5c4d46] border-[#cb9072]">
                      <img
                        src={gift.image || "/placeholder.svg"}
                        alt={gift.description}
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-4 pt-0">
                        <div className="text-xl sm:text-2xl font-bold text-[#f8f7f3] mb-2">
                          R$ {gift.value.toLocaleString()}
                        </div>
                        <p className="text-sm text-[#eec7b4] mb-4">{gift.description}</p>

                        {!gift.isSelected ? (
                          <Dialog open={isModalOpen && selectedGift?.id === gift.id} onOpenChange={setIsModalOpen}>
                            <DialogTrigger asChild>
                              <Button
                                className="w-full bg-[#eec7b4] text-[#080a09] hover:bg-[#cb9072] hover:text-[#f8f7f3] rounded-none"
                                onClick={() => handleSelectGift(gift, "honeymoon")}
                              >
                                Selecionar
                              </Button>
                            </DialogTrigger>
                            {selectedGift?.id === gift.id && (
                              <DialogContent className="max-w-2xl bg-[#5c4d46] border-[#cb9072] text-[#f8f7f3] rounded-none">
                                <DialogHeader>
                                  <DialogTitle className="text-2xl font-light tracking-wider text-[#eec7b4]">
                                    R$ {gift.value.toLocaleString()} - {gift.description}
                                  </DialogTitle>
                                </DialogHeader>
                                <div className="space-y-8">
                                  <div className="border-b border-[#5c4d46] pb-6">
                                    <div className="flex items-center gap-3 mb-4">
                                      <div className="h-1 w-8 bg-[#eec7b4]"></div>
                                      <h4 className="text-lg font-light tracking-wider text-[#eec7b4]">ENVIAR PIX</h4>
                                    </div>
                                    <p className="text-sm text-[#f8f7f3]/70 mb-4 leading-relaxed">{gift.description}</p>
                                    <div className="space-y-3">
                                      <div className="p-4 bg-[#080a09] rounded border border-[#cb9072]/30">
                                        <p className="text-xs text-[#f8f7f3]/50 mb-2">Chave PIX (Copia e Cola):</p>
                                        <p className="text-xs break-all text-[#eec7b4] font-mono leading-relaxed">
                                          {generatePixData(gift.value, gift.id)}
                                        </p>
                                      </div>
                                      <Button
                                        variant="outline"
                                        onClick={() =>
                                          navigator.clipboard.writeText(generatePixData(gift.value, gift.id))
                                        }
                                        className="w-full border border-[#cb9072] text-[#eec7b4] hover:bg-[#cb9072] hover:text-[#080a09] bg-transparent rounded-none transition-all"
                                      >
                                        Copiar PIX
                                      </Button>
                                    </div>
                                  </div>

                                  <div>
                                    <div className="flex items-center gap-3 mb-4">
                                      <div className="h-1 w-8 bg-[#eec7b4]"></div>
                                      <h4 className="text-lg font-light tracking-wider text-[#eec7b4]">
                                        CONFIRMAR SELEÇÃO
                                      </h4>
                                    </div>
                                    <p className="text-sm text-[#f8f7f3]/70 mb-4 leading-relaxed">
                                      Para confirmar sua seleção, envie uma mensagem direto para o Lucas ou para a
                                      Rafaela:
                                    </p>
                                    <div className="flex flex-wrap gap-3 justify-center">
                                      <a
                                        href={`https://wa.me/5562991639973?text=Olá! Gostaria de confirmar que vou presentear com: R$ ${gift.value}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => handleWhatsAppRedirect("lucas")}
                                        className="inline-flex items-center gap-2 text-[#25D366] hover:text-[#1ebe5d] transition-colors group"
                                      >
                                        <MessageCircle className="w-4 h-4" />
                                        <span className="font-light tracking-wide">Lucas</span>
                                      </a>
                                      <span className="text-[#f8f7f3]/40">•</span>
                                      <a
                                        href={`https://wa.me/5562982720235?text=Olá! Gostaria de confirmar que vou presentear com: R$ ${gift.value}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => handleWhatsAppRedirect("rafaela")}
                                        className="inline-flex items-center gap-2 text-[#25D366] hover:text-[#1ebe5d] transition-colors group"
                                      >
                                        <MessageCircle className="w-4 h-4" />
                                        <span className="font-light tracking-wide">Rafaela</span>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            )}
                          </Dialog>
                        ) : (
                          <Button disabled className="w-full bg-[#5c4d46] text-[#eec7b4] rounded-none">
                            Já Selecionado
                          </Button>
                        )}
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
