import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axios";

export function usePostDetails(postId) {
    return useQuery({
        queryKey: ["post", postId],
        queryFn: async () => {
            const res = await axiosInstance.get(`posts/${postId}`);
            return res.data.data.post;
        },
        enabled: !!postId,
        staleTime: 10000 * 60 * 5,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
        retry: 0,
    });
}

export function usePostComments(postId, enabled = true) {
    return useQuery({
        queryKey: ["comments", postId],
        queryFn: async () => {
            const res = await axiosInstance.get(`posts/${postId}/comments`);
            return res.data.data.comments;
        },
        enabled: !!postId && enabled,
        staleTime: 1000,
        // gcTime:1000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
        retry: 0,
    });
}
