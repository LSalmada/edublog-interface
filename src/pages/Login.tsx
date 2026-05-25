import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setLoading(true)
      setError(null)

      await login(email, password)

      navigate("/admin")
    } catch {
      setError(
        "Email ou senha inválidos"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="flex justify-center mt-10">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>
            Login do docente
          </CardTitle>
          <CardDescription>
            Entre com suas credenciais
            para gerenciar postagens.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>

              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">
                {error}
              </p>
            )}
            <Button type="submit" disabled={loading}>
              {loading ? "Entrando..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}