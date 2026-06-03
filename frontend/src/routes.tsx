import { createBrowserRouter, Navigate } from "react-router";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import MajorTest from "@/pages/MajorTest";
import Major from "@/pages/Major";
import Career from "@/pages/Career";
import Resources from "@/pages/Resources";
import SignupPage from "./components/auth/signup-form";
import LoginPage from "./components/auth/login-form";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "major-test", element: <MajorTest /> },
      { path: "major", element: <Major /> },
      { path: "career", element: <Career /> },
      { path: "resources", element: <Resources /> },
      // Catch-all redirect
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
  { path: "/signup", element: <SignupPage /> },
  { path: "/login", element: <LoginPage /> },

]);
