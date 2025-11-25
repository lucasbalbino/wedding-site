import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Rafaela & Lucas - 20.04.2026",
  description: "Celebre conosco nosso grande dia",
  generator: "v0.app",
  icons: {
    icon: "/monograma-white.png",
  },
  openGraph: {
    title: "Rafaela & Lucas - 20.04.2026",
    description: "Celebre conosco nosso grande dia",
    type: "website",
    url: "https://rafaelaelucas.com.br",
    images: [
      {
        url: "https://rafaelaelucas.com.br/rafaelaelucas-imagem-fundo.png",
        width: 1200,
        height: 630,
        alt: "Rafaela & Lucas - 20.04.2026",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
