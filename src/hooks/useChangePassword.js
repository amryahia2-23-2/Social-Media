import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../api/axios";

export function useChangePassword(onSuccessCallback) {
    const changePasswordMutation = useMutation({
        mutationFn: async (data) => {
            const res = await axiosInstance.patch("users/change-password", data);
            return res.data;
        },
        onSuccess: () => {
            // Call the callback immediately after success
            if (onSuccessCallback) {
                onSuccessCallback();
            }
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to change password");
        },
        retry: 0,

    });

    const handleChangePassword = (data) => {
        changePasswordMutation.mutate(data);
    };

    return {
        changePasswordMutation,
        handleChangePassword,
        isLoading: changePasswordMutation.isPending,
    };
}
