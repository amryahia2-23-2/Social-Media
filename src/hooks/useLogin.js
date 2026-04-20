import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../api/axios";
import { useUser } from "./useUser";

export const useLogin = () => {
    const { login } = useUser();

    return useMutation({
        mutationFn: async (data) => {
            const res = await axiosInstance.post("users/signin", data);
            return res.data;
        },
        onSuccess: (data) => {
            if (data.token) {
                login(data.token);
            } else if (data.data?.token) {
                login(data.data.token);
            }
            toast.success("Login successful");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Login failed");
        },
        retry: 0
    });
};