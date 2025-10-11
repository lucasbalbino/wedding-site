import { NextResponse } from "next/server"

interface GiftData {
  title: string
  image: string
  description: string
  price_range: string
  store_1: string
  link_1: string
  store_2: string
  link_2: string
  store_3?: string
  link_3?: string
  bought: string
}

export async function GET() {
  try {
    const SHEET_ID = "1lpLwfHeN5P86W8ruz9jSlZu-IxM2gmhErH-IFi-tmT4"
    const RANGE = "A:K" // Colunas A até K para cobrir todas as colunas
    const API_KEY = process.env.GOOGLE_SHEETS_API_KEY

    if (!API_KEY) {
      console.error("Google Sheets API key not found")
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`

    const response = await fetch(url)

    if (!response.ok) {
      console.error("Failed to fetch from Google Sheets:", response.statusText)
      return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
    }

    const data = await response.json()
    const rows = data.values || []

    if (rows.length === 0) {
      return NextResponse.json({ gifts: [] })
    }

    const headers = rows[0]
    const gifts = rows.slice(1).map((row: string[], index: number) => {
      const gift: any = { id: (index + 1).toString() }

      headers.forEach((header: string, colIndex: number) => {
        const value = row[colIndex] || ""

        switch (header.toLowerCase()) {
          case "title":
            gift.name = value
            break
          case "image":
            gift.image = value
            break
          case "description":
            gift.description = value
            break
          case "price_range":
            gift.priceRange = value
            break
          case "store_1":
            gift.store1 = value
            break
          case "link_1":
            gift.link1 = value
            break
          case "store_2":
            gift.store2 = value
            break
          case "link_2":
            gift.link2 = value
            break
          case "store_3":
            gift.store3 = value
            break
          case "link_3":
            gift.link3 = value
            break
          case "bought":
            gift.isSelected = value.toLowerCase() === "sim"
            gift.selectedBy = gift.isSelected ? "Convidado" : undefined
            break
        }
      })

      gift.storeLinks = []
      if (gift.store1 && gift.link1) {
        gift.storeLinks.push({ name: gift.store1, url: gift.link1 })
      }
      if (gift.store2 && gift.link2) {
        gift.storeLinks.push({ name: gift.store2, url: gift.link2 })
      }
      if (gift.store3 && gift.link3) {
        gift.storeLinks.push({ name: gift.store3, url: gift.link3 })
      }

      return gift
    })

    return NextResponse.json({ gifts })
  } catch (error) {
    console.error("Error fetching gifts:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
