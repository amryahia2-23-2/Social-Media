import { Avatar, Button } from "@heroui/react";
import { Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function UserSuggestionCard({ user, onFollow, isFollowing }) {
    // console.log(user)
    return (
        <div className=" bg-white dark:bg-[#030637] border border-gray-200 dark:border-[#3F0071] p-4 rounded-xl hover:shadow-md transition">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                    <Link to={`/profile/${user._id}`}>
                        <Avatar
                            src={user.photo || "https://i.pravatar.cc/150?u=" + user._id}
                            size="lg"
                            className="w-16 h-16 cursor-pointer hover:opacity-80 transition"
                            alt={`${user.name}'s avatar`}
                        />
                    </Link>
                    <div className="flex-1">
                        <Link to={`/profile/${user._id}`}>
                            <p className="font-bold text-gray-900 dark:text-white hover:underline cursor-pointer">
                                {user.name}
                            </p>
                        </Link>
                        <div className="flex gap-2 mt-4">
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
                </div>

                <Button
                    variant="flat"
                    size="md"
                    radius="full"
                    startContent={<Users size={16} className="text-[#1877F2] dark:text-white" />}
                    className="font-bold bg-blue-50 dark:bg-[#610094] hover:bg-blue-100 dark:hover:bg-[#610094] dark:hover:shadow-lg dark:hover:shadow-[#610094]/50 text-[#1877F2] dark:text-white transition"
                    onPress={() => onFollow(user._id)}
                    isLoading={isFollowing}
                    aria-label={`Follow ${user.name}`}
                >
                    Follow
                </Button>
            </div>
        </div>
    );
}
