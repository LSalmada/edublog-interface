import { Navigate } from "react-router-dom"

import { useAuth } from "@/hooks/useAuth"

type Props = { children: React.ReactNode }

export const ProtectedRoute = ({ children, }: Props) => {
  const { token } = useAuth()

  if (!token) {
    return (<Navigate to="/login" replace />)
  }

  return children
}