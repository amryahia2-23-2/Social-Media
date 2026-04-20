import { useInfinitePosts } from "../hooks/useInfinitePosts";
import CreatePost from "../features/posts/CreatePost";
import PostCard from "../features/posts/PostCard";
import LeftSidebar from "../components/LeftSidebar";
import SuggestedFriends from "../components/SuggestedFriends";
import InfiniteScrollContainer from "../components/InfiniteScrollContainer";
import { useState } from "react";

export default function Home() {
    const [activeFilter, setActiveFilter] = useState("feed");
    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfinitePosts(activeFilter);

    // Flatten all pages into single array
    const posts = data?.pages?.flatMap(page =>
        page?.data?.posts || page?.data?.bookmarks || []
    ) || [];

    return (
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
                {/* Left Sidebar - Hidden on mobile and tablet */}
                <div className="col-span-1 xl:col-span-2">
                    <LeftSidebar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
                </div>

                {/* Main Content */}
                <div className="order-3 xl:order-2 col-span-1 xl:col-span-7 space-y-4 px-0 ">
                    <CreatePost />

                    {isLoading ? (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">Loading posts...</div>
                    ) : (
                        <InfiniteScrollContainer
                            onLoadMore={fetchNextPage}
                            hasMore={hasNextPage}
                            isLoading={isFetchingNextPage}
                        >
                            {posts.map((post) => (
                                <PostCard key={post._id} post={post} />
                            ))}
                        </InfiniteScrollContainer>
                    )}
                </div>

                {/* Right Sidebar */}
                <div className="order-2 xl:order-3 col-span-1 xl:col-span-3">
                    <SuggestedFriends />
                </div>
            </div>
        </div>
    );
}
