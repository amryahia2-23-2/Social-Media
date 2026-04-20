import { createContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));

    // Fetch user data using React Query
    const { data: user, isLoading, refetch, error } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await axiosInstance.get("users/profile-data");
            return res.data.data.user;
        },
        enabled: !!token, // Only fetch if token exists
        retry: false, // Don't retry on failure
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    });

    // Auto logout if token is invalid or API returns error
    useEffect(() => {
        if (error && token) {
            // If there's an error (401, 403, etc.) and we have a token, it means token is invalid
            console.log("Token is invalid, logging out...");
            logout();
        }
    }, [error, token]);

    // Check token on mount
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken && token) {
            // Token was removed from localStorage but still in state
            logout();
        }
    }, []);

    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
        // Refetch user data after login
        refetch();
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    return (
        <UserContext.Provider value={{ user, loading: isLoading, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
