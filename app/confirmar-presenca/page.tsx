"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Menu, X } from "lucide-react"

interface Guest {
  id: string
  name: string
  attendance: "sim" | "nao" | ""
}

export default function ConfirmarPresencaPage() {
  const searchParams = useSearchParams()
  const phoneFromUrl = searchParams.get("telefone")

  const [phone, setPhone] = useState(phoneFromUrl || "")
  const [phoneConfirmed, setPhoneConfirmed] = useState(!!phoneFromUrl)
  const [guests, setGuests] = useState<Guest[]>([])
  const [hasSelectedGift, setHasSelectedGift] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (phoneConfirmed && phone) {
      const mockGuests: Guest[] = [
        { id: "1", name: "João Silva", attendance: "" },
        { id: "2", name: "Maria Silva", attendance: "" },
        { id: "3", name: "Pedro Silva (criança)", attendance: "" },
      ]
      setGuests(mockGuests)
      setHasSelectedGift(Math.random() > 0.5)
    }
  }, [phoneConfirmed, phone])

  const handlePhoneSubmit = () => {
    if (phone.length >= 10) {
      setPhoneConfirmed(true)
      window.history.replaceState({}, "", `/confirmar-presenca?telefone=${phone}`)
    }
  }

  const handleAttendanceChange = (guestId: string, attendance: "sim" | "nao") => {
    setGuests((prev) => prev.map((guest) => (guest.id === guestId ? { ...guest, attendance } : guest)))
  }

  const handleSubmit = () => {
    console.log("Confirmação enviada:", { phone, guests })
    setIsSubmitted(true)
  }

  const allGuestsAnswered = guests.length > 0 && guests.every((guest) => guest.attendance !== "")

  const phoneParam = phoneFromUrl ? `?telefone=${phoneFromUrl}` : ""

  if (isSubmitted) {
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
                  className="block text-[#eec7b4] font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Confirmar Presença
                </Link>
                <Link
                  href={`/lista-presentes${phoneParam}`}
                  className="block text-[#f8f7f3] hover:text-[#eec7b4] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Lista de Presentes
                </Link>
              </div>
            </div>
          )}
        </nav>

        <div className="pt-20 pb-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-[#cb9072] rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl text-[#f8f7f3]">✓</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#f8f7f3] mb-4">Confirmação Enviada!</h1>
            <p className="text-base sm:text-lg text-[#eec7b4] mb-8">
              Obrigado por confirmar sua presença. Estamos ansiosos para celebrar conosco!
            </p>
            <Link href={`/${phoneParam}`}>
              <Button className="bg-[#eec7b4] text-[#080a09] hover:bg-[#cb9072] hover:text-[#f8f7f3] font-medium px-8 py-3 rounded-none">
                Voltar ao Início
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
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
                className="block text-[#eec7b4] font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Confirmar Presença
              </Link>
              <Link
                href={`/lista-presentes${phoneParam}`}
                className="block text-[#f8f7f3] hover:text-[#eec7b4] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Lista de Presentes
              </Link>
            </div>
          </div>
        )}
      </nav>

      <div className="pt-20 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16 mt-16 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#f8f7f3] mb-4">Confirmar Presença</h1>
            <p className="text-base sm:text-lg text-[#eec7b4] mb-4">
              Sua presença é muito importante para nós!
            </p>
            <p className="text-base sm:text-lg text-[#eec7b4]">
              Por favor, confirme se você e seus acompanhantes poderão estar conosco no nosso grande dia.
            </p>
          </div>

          {!phoneConfirmed ? (
            <Card className="p-6 sm:p-8 bg-[#5c4d46] border-[#cb9072]">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#f8f7f3] mb-4">Identificação</h2>
              <p className="text-[#eec7b4] mb-6">
                Para acessar sua lista de convidados, precisamos do seu número de telefone.
              </p>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="phone" className="text-[#f8f7f3]">
                    Número de Telefone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 bg-[#080a09] border-[#cb9072] text-[#f8f7f3] placeholder:text-[#eec7b4]"
                  />
                </div>
                <Button
                  onClick={handlePhoneSubmit}
                  disabled={phone.length < 10}
                  className="w-full bg-[#eec7b4] text-[#080a09] hover:bg-[#cb9072] hover:text-[#f8f7f3] font-medium rounded-none"
                >
                  Continuar
                </Button>
              </div>
            </Card>
          ) : (
            <div className="space-y-6 sm:space-y-8">
              <Card className="p-6 sm:p-8 bg-[#5c4d46] border-[#cb9072]">
                <h2 className="text-xl sm:text-2xl font-semibold text-[#f8f7f3] mb-6">Lista de Convidados</h2>
                <p className="text-[#eec7b4] mb-6">
                  Telefone: <span className="font-medium text-[#f8f7f3]">{phone}</span>
                </p>

                <div className="space-y-6 mb-8">
                  {guests.map((guest) => (
                    <div key={guest.id}>
                      <h3 className="font-medium text-[#f8f7f3] mb-3">{guest.name}</h3>
                    </div>
                  ))}
                </div>

                <Link href={`/lista-presentes${phoneParam}`}>
                    <Button
                    variant="outline"
                    className="border-[#eec7b4] text-[#eec7b4] hover:bg-[#eec7b4] hover:text-[#080a09] bg-transparent rounded-none"
                    >
                    Confirmar presença
                    </Button>
                </Link>
              </Card>

              <Card className="p-6 sm:p-8 bg-[#5c4d46] border-[#cb9072]">
                <h2 className="text-xl sm:text-2xl font-semibold text-[#f8f7f3] mb-4">Status do Presente</h2>
                {hasSelectedGift ? (
                  <div className="flex items-center space-x-3 text-[#eec7b4]">
                    <span className="text-xl">✓</span>
                    <span className="font-medium">Você já selecionou um presente da nossa lista!</span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-[#cb9072]">
                      <span className="text-xl">⚠️</span>
                      <span className="font-medium">Você ainda não selecionou um presente.</span>
                    </div>
                    <Link href={`/lista-presentes${phoneParam}`}>
                      <Button
                        variant="outline"
                        className="border-[#eec7b4] text-[#eec7b4] hover:bg-[#eec7b4] hover:text-[#080a09] bg-transparent rounded-none"
                      >
                        Ver Lista de Presentes
                      </Button>
                    </Link>
                  </div>
                )}
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
