import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../api/axios";

export function usePostMutations() {
    const queryClient = useQueryClient();

    // Delete post mutation
    const deletePostMutation = useMutation({
        mutationFn: async (postId) => {
            await axiosInstance.delete(`posts/${postId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            queryClient.invalidateQueries({ queryKey: ["userPosts"] });
            toast.success("Post deleted successfully");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to delete post");
        },
        retry: 0
    });

    // Edit post mutation
    const editPostMutation = useMutation({
        mutationFn: async ({ postId, body, image, removeImage }) => {
            const formData = new FormData();
            if (body && body.trim()) {
                formData.append("body", body);
            }
            if (image) {
                formData.append("image", image);
            }
            if (removeImage) {
                formData.append("removeImage", "true");
            }
            const res = await axiosInstance.put(`posts/${postId}`, formData);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            queryClient.invalidateQueries({ queryKey: ["userPosts"] });
            toast.success("Post updated successfully");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update post");
        },
        retry: 0
    });

    // Like post mutation
    const likePostMutation = useMutation({
        mutationFn: async (postId) => {
            await axiosInstance.put(`posts/${postId}/like`, {});
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to like post");
        },
        retry: 0
    });

    // Share post mutation
    const sharePostMutation = useMutation({
        mutationFn: async ({ postId, body }) => {
            const res = await axiosInstance.post(`posts/${postId}/share`, { body });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            toast.success("Post shared successfully");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to share post");
        },
        retry: 0
    });

    // Bookmark post mutation
    const bookmarkPostMutation = useMutation({
        mutationFn: async (postId) => {
            await axiosInstance.put(`posts/${postId}/bookmark`, {});
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to bookmark post");
        },
        retry: 0
    });

    return {
        deletePostMutation,
        editPostMutation,
        likePostMutation,
        sharePostMutation,
        bookmarkPostMutation,
    };
}
