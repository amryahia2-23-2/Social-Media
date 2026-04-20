import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";
import { ProtectedRoute, PublicRoute } from "./features/routes/RouteGuard";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import PageLoader from "./pages/PageLoader";

// Import directly without lazy loading for auth pages
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Home from "./pages/Home";


// Lazy load other components
const ProfilePage = lazy(() => import("./pages/ProfilePage"))
const PostDetails = lazy(() => import("./pages/PostDetails"));
const SuggestionsPage = lazy(() => import("./pages/SuggestionsPage"));
const Notifications = lazy(() => import("./pages/Notifications"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));

// Loading component


export default function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={
            <PublicRoute>
              <AuthLayout />
            </PublicRoute>
          }>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route path="/home" element={<Home />} />
            <Route path="/post/:postId" element={<PostDetails />} />
            <Route path="/suggestions" element={<SuggestionsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

