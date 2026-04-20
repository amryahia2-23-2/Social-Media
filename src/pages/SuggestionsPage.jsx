import { Button, Input } from "@heroui/react";
import { Search, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSuggestedFriends } from "../hooks/useSuggestedFriends";
import SuggestionsHeader from "../components/SuggestionsHeader";
import UserSuggestionCard from "../components/UserSuggestionCard";

export default function SuggestionsPage() {
    const navigate = useNavigate();

    const {
        searchQuery,
        setSearchQuery,
        filteredFriends,
        isLoading,
        isFetchingNextPage,
        hasNextPage,
        followMutation,
        handleFollow,
        handleLoadMore,
    } = useSuggestedFriends();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black">
            <div className="max-w-4xl mx-auto px-4 pt-4">
                <SuggestionsHeader onBack={() => navigate(-1)} />
            </div>

            <div className="max-w-4xl mx-auto px-4 pb-6">
                <Input
                    placeholder="Search friends..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    startContent={<Search size={20} className="text-gray-400" />}
                    classNames={{
                        inputWrapper: "bg-white dark:bg-[#030637] focus-within:ring-2 focus-within:ring-[#1877F2] dark:focus-within:ring-[#610094]",
                    }}
                    size="lg"
                    className="mb-6"
                    aria-label="Search friends"
                />

                {isLoading ? (
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">Loading...</div>
                ) : filteredFriends.length === 0 ? (
                    <div className="text-center py-12">
                        <Users size={48} className="text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">
                            {searchQuery ? "No friends found" : "No suggestions available"}
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="space-y-4">
                            {filteredFriends.map((user) => (
                                <UserSuggestionCard
                                    key={user._id}
                                    user={user}
                                    onFollow={handleFollow}
                                    isFollowing={followMutation.isPending && followMutation.variables === user._id}
                                />
                            ))}
                        </div>

                        {hasNextPage && (
                            <div className="text-center mt-8">
                                <Button
                                    size="lg"
                                    variant="bordered"
                                    onPress={handleLoadMore}
                                    isLoading={isFetchingNextPage}
                                    className="font-bold"
                                    aria-label="Load more suggestions"
                                >
                                    Load More
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
