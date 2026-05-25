import {
  Routes,
  Route,
} from "react-router-dom";

import { Home } from "@/pages/Home";
import { Layout } from "@/components/layout/Layout";
import { PostDetails } from "@/pages/PostDetails";
import { Login } from "@/pages/Login";
import { Admin } from "@/pages/Admin";
import { CreatePost } from "@/pages/CreatePost";
import { EditPost } from "@/pages/EditPost";
// import { NotFound } from "../pages/NotFound";

import { ProtectedRoute } from "./ProtectedRoute";

export function AppRoutes() {
  return (
    <Routes>

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

      <Route
        path="/admin/post/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <EditPost />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-post"
        element={
          <ProtectedRoute>
            <Layout>
              <CreatePost />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Layout>
              <Admin />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}