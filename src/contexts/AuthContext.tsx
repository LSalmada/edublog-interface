import { useState, type ReactNode, } from "react"
import { login as loginRequest, type User, } from "@/services/auth"
import { AuthContext } from "@/contexts/auth-context"

type Props = { children: ReactNode }

export const AuthProvider = ({ children, }: Props) => {
  const [user, setUser] =
    useState<User | null>(() => {
      const storedUser =
        localStorage.getItem("user")

      return storedUser
        ? JSON.parse(storedUser)
        : null
    })

  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"))

  const login = async (email: string, password: string) => {
    const data = await loginRequest({ email, password, })

    setUser(data.user)
    setToken(data.token)

    localStorage.setItem("token", data.token)

    localStorage.setItem("user", JSON.stringify(data.user))
  }

  const logout = () => {
    setUser(null)
    setToken(null)

    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
