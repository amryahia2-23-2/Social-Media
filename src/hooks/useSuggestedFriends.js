import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import { useFollow } from "./useFollow";

export function useSuggestedFriends() {
    const [searchQuery, setSearchQuery] = useState("");
    const { followMutation, handleFollow } = useFollow();

    // Fetch suggested friends with infinite scroll
    const {
        data,
        isLoading,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
    } = useInfiniteQuery({
        queryKey: ["suggestedFriends"],
        queryFn: async ({ pageParam = 1 }) => {
            const res = await axiosInstance.get(`users/suggestions?page=${pageParam}`);

            return {
                users: res.data.data?.suggestions || [],
                nextPage: pageParam + 1,
                hasMore: (res.data.data?.suggestions || []).length > 0,
            };
        },
        getNextPageParam: (lastPage) => {
            return lastPage.hasMore ? lastPage.nextPage : undefined;
        },
        initialPageParam: 1,
        staleTime: 1000 * 60 * 5,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
        retry: 0,
    });
    // Flatten all pages into single array
    const allFriends = data?.pages.flatMap(page => page.users) || [];

    const onFollowClick = (userId) => {
        handleFollow(userId, "Followed successfully");
    };

    const handleLoadMore = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    // Filter friends based on search
    const filteredFriends = allFriends.filter((user) =>
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    // console.log(filteredFriends)

    return {
        searchQuery,
        setSearchQuery,
        allFriends,
        filteredFriends,
        isLoading,
        isFetchingNextPage,
        hasNextPage,
        followMutation,
        handleFollow: onFollowClick,
        handleLoadMore,
    };
}
