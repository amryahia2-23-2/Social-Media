import { Avatar, Button, Input } from "@heroui/react";
import { Search, Users } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSuggestedFriends } from "../hooks/useSuggestedFriends";

export default function SuggestedFriends() {
    const [showSuggestion, setShowSuggestion] = useState(false);
    const {
        searchQuery,
        setSearchQuery,
        filteredFriends,
        isLoading,
        followMutation,
        handleFollow,
    } = useSuggestedFriends();

    const displayedFriends = filteredFriends.slice(0, 5);
    const displayCount = filteredFriends.length;

    return (
        <div className="sticky top-18">
            <button
                onClick={() => setShowSuggestion(!showSuggestion)}
                className={`xl:hidden w-full bg-white dark:bg-[#030637] rounded-xl shadow-sm p-4 ${showSuggestion ? 'mb-4' : 'mb-0'} hover:bg-gray-50 dark:hover:bg-[#3F0071]/30 transition cursor-pointer dark:border dark:border-[#610094]/30`}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Users size={20} className="text-[#0d47a1] dark:text-[#610094]" />
                        <h3 className="text-sm font-extrabold text-gray-900 dark:text-gray-200">Suggested Friends</h3>
                    </div>
                    <div>
                        <span className="text-xs text-gray-600 dark:text-gray-300 bg-blue-100 dark:bg-[#610094]/20 p-2 rounded-full w-2.5 h-2.5 inline-flex justify-center items-center">{displayCount}</span>
                        <span className="text-xs text-[#1877F2] dark:text-[#610094] ms-2 font-bold">{showSuggestion ? "Hide" : "Show"}</span>
                    </div>
                </div>
            </button>

            <div className={`${showSuggestion ? 'block' : 'hidden'} xl:block w-full bg-white dark:bg-[#030637] rounded-xl shadow-xl p-4 xl:sticky xl:top-20 h-fit transition-all dark:border dark:border-[#610094]/30`}>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <Users size={20} className="text-[#0d47a1] dark:text-[#610094]" />
                        <h3 className="text-base font-extrabold text-gray-900 dark:text-gray-200">Suggested Friends</h3>
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-300 bg-blue-100 dark:bg-[#610094]/20 p-2 rounded-full w-2.5 h-2.5 flex justify-center items-center">{displayCount}</span>
                </div>

                <Input
                    placeholder="Search friends..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    startContent={<Search size={18} className="text-gray-400 " />}
                    classNames={{
                        inputWrapper: "bg-gray-50 dark:bg-black/30 focus-within:ring-1 focus-within:ring-[#1877F2] dark:focus-within:ring-[#610094] focus-within:border-transparent",
                        input: "dark:text-white dark:placeholder:text-gray-500",
                    }}
                    size="sm"
                    className="mb-4"
                />

                {isLoading ? (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">Loading...</div>
                ) : filteredFriends.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
                        {searchQuery ? "No friends found" : "No suggestions available"}
                    </div>
                ) : (
                    <div className="space-y-3">
                        {displayedFriends.map((user) => (
                            <div key={user._id} className="border-1 border-gray-200 dark:border-[#3F0071] dark:bg-black/20 p-3 rounded-xl backdrop-blur-sm">
                                <div className="flex items-center justify-between ">
                                    <div className="flex items-center space-x-3">
                                        <Link to={`/profile/${user._id}`}>
                                            <Avatar
                                                src={user.photo || "https://i.pravatar.cc/150?u=" + user._id}
                                                size="sm"
                                                className="w-10 h-10 cursor-pointer hover:opacity-80 transition"
                                            />
                                        </Link>
                                        <div>
                                            <Link to={`/profile/${user._id}`}>
                                                <p className="font-medium text-sm text-gray-900 dark:text-gray-200 hover:underline cursor-pointer">{user.name}</p>
                                            </Link>

                                        </div>
                                    </div>

                                    <Button
                                        variant="flat"
                                        size="sm"
                                        radius="full"
                                        startContent={<Users size={14} className="text-[#1877F2] dark:text-white" />}
                                        className="font-bold bg-blue-50 dark:bg-[#610094] hover:bg-blue-100 dark:hover:bg-[#610094] dark:hover:shadow-lg dark:hover:shadow-[#610094]/50 text-xs px-3 py-1 h-7 text-[#1877F2] dark:text-white transition"
                                        onPress={() => handleFollow(user._id)}
                                        isLoading={followMutation.isPending && followMutation.variables === user._id}
                                    >
                                        Follow
                                    </Button>
                                </div>
                                <div className="flex gap-2 mt-3">
                                    {user.followersCount !== undefined && (
                                        <div className="text-[11px] text-gray-500 dark:text-gray-300 bg-gray-100 dark:bg-[#3F0071]/30 px-2 w-fit rounded-full">
                                            {user.followersCount} followers
                                        </div>
                                    )}
                                    {user.mutualFollowersCount !== undefined && (
                                        <div className="text-[11px] text-blue-500 dark:text-[#610094] bg-blue-100 dark:bg-[#610094]/20 px-2 w-fit rounded-full">
                                            {user.mutualFollowersCount} mutual
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {filteredFriends.length > 7 && (
                    <Link
                        to="/suggestions"
                        className="block w-full text-center font-bold text-sm text-gray-600 dark:text-gray-300 hover:text-[#0d47a1] dark:hover:text-[#610094] mt-4 py-2 border-1 border-gray-200 dark:border-[#3F0071] p-3 rounded-lg transition"
                    >
                        View more
                    </Link>
                )}
            </div>
        </div>
    );
}
