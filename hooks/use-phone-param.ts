"use client"

import { useSearchParams } from "next/navigation"
import { useMemo } from "react"

export function usePhoneParam() {
  const searchParams = useSearchParams()
  const phone = searchParams.get("telefone")

  const addPhoneToUrl = useMemo(() => {
    return (url: string) => {
      if (!phone) return url

      const separator = url.includes("?") ? "&" : "?"
      return `${url}${separator}telefone=${encodeURIComponent(phone)}`
    }
  }, [phone])

  return {
    phone,
    addPhoneToUrl,
  }
}
