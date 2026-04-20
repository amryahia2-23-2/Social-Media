import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../api/axios";

export function useProfileMutations(profileUserId) {
    const queryClient = useQueryClient();

    // Helper function to update profile data in cache
    const updateProfileCache = (field, value) => {
        // Update profile cache
        queryClient.setQueryData(["profile", profileUserId], (oldData) => {
            if (oldData) {
                return {
                    ...oldData,
                    [field]: value
                };
            }
            return oldData;
        });

        // Update user cache if it's the current user's profile
        queryClient.setQueryData(["user"], (oldData) => {
            if (oldData && oldData._id === profileUserId) {
                return {
                    ...oldData,
                    [field]: value
                };
            }
            return oldData;
        });
    };

    // Generic update image mutation (for photo and cover)
    const updateImageMutation = useMutation({
        mutationFn: async ({ file, privacy, type }) => {
            const formData = new FormData();
            formData.append(type, file); // 'photo' or 'cover'
            formData.append("privacy", privacy);
            const res = await axiosInstance.put(`users/upload-${type}`, formData);
            return { data: res.data, type };
        },
        onSuccess: ({ data, type }) => {
            updateProfileCache(type, data.data[type]);
            const message = type === "photo" ? "Profile photo updated successfully" : "Cover photo updated successfully";
            toast.success(message);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update image");
        },
        retry: 0
    });

    return {
        updateImageMutation,
    };
}
