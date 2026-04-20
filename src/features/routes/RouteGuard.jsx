import { Navigate } from "react-router-dom";

export default function RouteGuard({ children, requireAuth = true, redirectTo = "/" }) {
    const token = localStorage.getItem("token");
    const isAuthenticated = !!token;

    // Protected route: requires authentication
    if (requireAuth && !isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    // Public route: redirect if already authenticated
    if (!requireAuth && isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    return children;
}

// Helper components for better readability
export function ProtectedRoute({ children }) {
    return <RouteGuard requireAuth={true} redirectTo="/">{children}</RouteGuard>;
}

export function PublicRoute({ children }) {
    return <RouteGuard requireAuth={false} redirectTo="/home">{children}</RouteGuard>;
}
