import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axios";

export function useProfile(userId) {
    return useQuery({
        queryKey: ["profile", userId],
        queryFn: async () => {
            const res = await axiosInstance.get(`users/${userId}/profile`);
            return res.data.data.user;
        },
        enabled: !!userId,
        // suspense: true,
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        retry: 0,
    });
}

export function useUserPosts(userId) {
    return useQuery({
        queryKey: ["userPosts", userId],
        queryFn: async () => {
            const res = await axiosInstance.get(`users/${userId}/posts`);
            return res.data.data.posts || [];
        },
        enabled: !!userId,
        // suspense: true,
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        retry: 0,
    });
}
