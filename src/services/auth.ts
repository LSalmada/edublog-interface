import { api } from "@/services/api"

export type User = {
  id: number
  name: string
  email: string
  role: string
}

type LoginPayload = {
  email: string
  password: string
}

type LoginResponse = {
  token: string
  user: User
}

export async function login(payload: LoginPayload) {
  return api<LoginResponse>(
    "/auth/login",
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  )
}