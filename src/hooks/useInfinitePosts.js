import { useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import { useUser } from "./useUser";

export function useInfinitePosts(filter = "feed") {
    const { user } = useUser();

    // Map filter to API endpoints
    const endpoints = {
        "feed": "posts/feed",
        "my-posts": user?._id ? `users/${user._id}/posts` : null,
        "community": "posts",
        "saved": "users/bookmarks"
    };

    return useInfiniteQuery({
        queryKey: ["posts", filter],
        queryFn: async ({ pageParam = 1 }) => {
            const endpoint = endpoints[filter];
            const res = await axiosInstance.get(endpoint, {
                params: {
                    page: pageParam,
                    limit: 10, // عدد البوستات في كل صفحة
                    sort: "-createdAt"
                }
            });
            return res?.data;
        },
        staleTime: 10000 * 60 * 5,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
        retry: 0,
        getNextPageParam: (lastPage, allPages) => {
            // Safety checks - return undefined if no data
            if (!lastPage || !allPages || !Array.isArray(allPages)) {
                return undefined;
            }

            const currentPage = allPages.length;

            // Try to get totalPages from different possible locations
            const totalPages = lastPage?.data?.totalPages ||
                lastPage?.totalPages ||
                lastPage?.data?.pagination?.totalPages;

            // Try to get posts array to check if there's more data
            const posts = lastPage?.data?.posts || lastPage?.data?.bookmarks || [];

            // If we have pagination info, use it
            if (totalPages && currentPage < totalPages) {
                return currentPage + 1;
            }

            // Fallback: If no pagination but we got a full page (10 items), try next page
            if (!totalPages && posts.length === 10) {
                return currentPage + 1;
            }

            // No more pages
            return undefined;
        },
        initialPageParam: 1,
        // Disable if endpoint is null (e.g., my-posts without user)
        enabled: filter !== "my-posts" || !!user?._id,
    });

}
