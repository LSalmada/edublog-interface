import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom";

import "./index.css"
import { AppRoutes } from "./routes/AppRoutes.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { PostsProvider } from "./contexts/PostsContext"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <PostsProvider>
          <AppRoutes />
        </PostsProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)
