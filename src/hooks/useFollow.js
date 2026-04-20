import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import toast from "react-hot-toast";

export function useFollow() {
    const queryClient = useQueryClient();

    const followMutation = useMutation({
        mutationFn: async (userId) => {
            await axiosInstance.put(`users/${userId}/follow`, {});
        },
        onSuccess: (_, userId) => {
            // Invalidate all related queries
            queryClient.invalidateQueries({ queryKey: ["suggestedFriends"] });
            queryClient.invalidateQueries({ queryKey: ["profile", userId] });
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to follow/unfollow");
        },
        retry: 0
    });

    const handleFollow = (userId, successMessage) => {
        followMutation.mutate(userId, {
            onSuccess: () => {
                if (successMessage) {
                    toast.success(successMessage);
                }
            }
        });
    };

    return {
        followMutation,
        handleFollow,
    };
}
