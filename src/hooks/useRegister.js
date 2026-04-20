import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../api/axios";
import { useUser } from "./useUser";

export const useRegister = () => {
    const { login } = useUser();

    return useMutation({
        mutationFn: async (data) => {
            const res = await axiosInstance.post("users/signup", data);
            return res.data;
        },
        onSuccess: (data) => {
            if (data.token) {
                login(data.token);
            } else if (data.data?.token) {
                login(data.data.token);
            }
            toast.success("Registration successful");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Registration failed");
        },
        retry: 0
    });
};