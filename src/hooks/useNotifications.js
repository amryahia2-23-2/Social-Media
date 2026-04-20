import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import toast from "react-hot-toast";

export function useNotifications() {
    const queryClient = useQueryClient();

    // Fetch all notifications
    const { data: notifications, isLoading } = useQuery({
        queryKey: ["notifications"],
        queryFn: async () => {
            const res = await axiosInstance.get("notifications");
            return res.data.data.notifications || [];
        },
        staleTime: 1000 * 60 * 5,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
        retry: 0,
    });

    // Fetch unread count
    const { data: unreadData } = useQuery({
        queryKey: ["notifications", "unread"],
        queryFn: async () => {
            const res = await axiosInstance.get("notifications/unread-count");
            return res.data.data;
        },
        refetchInterval: 30000, // Refetch every 30 seconds
        staleTime: 10000 * 60 * 5,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
        retry: 0,
    });

    // Mark single notification as read
    const markReadMutation = useMutation({
        mutationFn: async (notificationId) => {
            await axiosInstance.patch(`notifications/${notificationId}/read`, {});
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
            queryClient.invalidateQueries({ queryKey: ["notifications", "unread"] });
            toast.success("Marked as read");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to mark as read");
        },
        retry: 0,
    });

    // Mark all notifications as read
    const markAllReadMutation = useMutation({
        mutationFn: async () => {
            await axiosInstance.patch("notifications/read-all", {});
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
            queryClient.invalidateQueries({ queryKey: ["notifications", "unread"] });
            toast.success("All notifications marked as read");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to mark all as read");
        },
        retry: 0
    });

    const unreadCount = unreadData?.unreadCount || 0;

    const handleMarkRead = (notificationId) => {
        markReadMutation.mutate(notificationId);
    };

    const handleMarkAllRead = () => {
        markAllReadMutation.mutate();
    };

    return {
        notifications,
        isLoading,
        unreadCount,
        markReadMutation,
        markAllReadMutation,
        handleMarkRead,
        handleMarkAllRead,
    };
}
