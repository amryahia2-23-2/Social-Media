import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../api/axios";

// Fetch replies
export function useReplies(postId, commentId, enabled = true) {
    return useQuery({
        queryKey: ["replies", postId, commentId],
        queryFn: async () => {
            const res = await axiosInstance.get(`posts/${postId}/comments/${commentId}/replies`);
            return res.data.data.replies;
        },
        enabled: !!postId && !!commentId && enabled,
        // staleTime: 1000 * 60 * 5,
        gcTime: 1000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
        retry: 0,
    });
}

export function useReplyMutations(postId, commentId) {
    const queryClient = useQueryClient();

    // Edit reply mutation
    const editReplyMutation = useMutation({
        mutationFn: async ({ replyId, content, image, removeImage }) => {
            const formData = new FormData();
            if (content && content.trim()) {
                formData.append("content", content);
            }
            if (image) {
                formData.append("image", image);
            }
            if (removeImage) {
                formData.append("removeImage", "true");
            }
            await axiosInstance.put(`posts/${postId}/comments/${replyId}`, formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["replies", postId, commentId] });
            toast.success("Reply updated successfully");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update reply");
        },
        retry: 0
    });

    // Delete reply mutation
    const deleteReplyMutation = useMutation({
        mutationFn: async (replyId) => {
            await axiosInstance.delete(`posts/${postId}/comments/${replyId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["replies", postId, commentId] });
            queryClient.invalidateQueries({ queryKey: ["comments", postId] });
            toast.success("Reply deleted successfully");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to delete reply");
        },
        retry: 0
    });

    // Like reply mutation
    const likeReplyMutation = useMutation({
        mutationFn: async (replyId) => {
            await axiosInstance.put(`posts/${postId}/comments/${replyId}/like`, {});
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to like reply");
        },
        retry: 0
    });

    return {
        editReplyMutation,
        deleteReplyMutation,
        likeReplyMutation,
    };
}
