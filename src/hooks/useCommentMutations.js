import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../api/axios";

export function useCommentMutations(postId) {
    const queryClient = useQueryClient();

    // Create comment mutation
    const createCommentMutation = useMutation({
        mutationFn: async ({ content, image }) => {
            const formData = new FormData();
            if (content && content.trim()) {
                formData.append("content", content);
            }
            if (image) {
                formData.append("image", image);
            }
            await axiosInstance.post(`posts/${postId}/comments`, formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", postId] });
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            queryClient.invalidateQueries({ queryKey: ["post", postId] });
            toast.success("Comment added successfully");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to add comment");
        },
        retry: 0
    });

    // Edit comment mutation
    const editCommentMutation = useMutation({
        mutationFn: async ({ commentId, content, image, removeImage }) => {
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
            await axiosInstance.put(`posts/${postId}/comments/${commentId}`, formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", postId] });
            toast.success("Comment updated successfully");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update comment");
        },
        retry: 0
    });

    // Delete comment mutation
    const deleteCommentMutation = useMutation({
        mutationFn: async (commentId) => {
            await axiosInstance.delete(`posts/${postId}/comments/${commentId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", postId] });
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            toast.success("Comment deleted successfully");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to delete comment");
        },
        retry: 0
    });

    // Like comment mutation
    const likeCommentMutation = useMutation({
        mutationFn: async (commentId) => {
            await axiosInstance.put(`posts/${postId}/comments/${commentId}/like`, {});
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to like comment");
        },
        retry: 0
    });

    // Create reply mutation
    const createReplyMutation = useMutation({
        mutationFn: async ({ commentId, content, image }) => {
            const formData = new FormData();
            if (content && content.trim()) {
                formData.append("content", content);
            }
            if (image) {
                formData.append("image", image);
            }
            await axiosInstance.post(`posts/${postId}/comments/${commentId}/replies`, formData);
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["replies", postId, variables.commentId] });
            queryClient.invalidateQueries({ queryKey: ["comments", postId] });
            toast.success("Reply added successfully");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to add reply");
        },
        retry: 0
    });

    return {
        createCommentMutation,
        editCommentMutation,
        deleteCommentMutation,
        likeCommentMutation,
        createReplyMutation,
    };
}
