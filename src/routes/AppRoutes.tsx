import {
  Routes,
  Route,
} from "react-router-dom";

import { Home } from "@/pages/Home";
import { Layout } from "@/components/layout/Layout";
import { PostDetails } from "@/pages/PostDetails";
import { Login } from "../pages/Login";
// import { Admin } from "../pages/Admin";
// import { CreatePost } from "../pages/CreatePost";
// import { EditPost } from "../pages/EditPost";
// import { PostDetails } from "../pages/PostDetails";
// import { NotFound } from "../pages/NotFound";

// import { PrivateRoute } from "./PrivateRoute";

export function AppRoutes() {
  return (
    <Routes>

      {/* Públicas */}

      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />

      <Route
        path="/post/:id"
        element={
          <Layout>
            <PostDetails />
          </Layout>
        }
      />

      <Route
        path="/login"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />
    </Routes>
  );
}