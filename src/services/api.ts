import { env } from "@/env"

export async function api<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem("token")

  const hasBody = options?.body != null

  const response = await fetch(
    `${env.VITE_API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers: {
        ...(hasBody && { "Content-Type": "application/json" }),
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options?.headers,
      },
    }
  )

  if (!response.ok) {
    throw new Error("Erro na requisição")
  }

  if (response.status === 204 || response.headers.get("content-length") === "0") {
    return undefined as T
  }

  return response.json()
}