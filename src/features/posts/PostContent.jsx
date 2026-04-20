import { Avatar } from "@heroui/react";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";

export default function PostContent({ post, onImageClick }) {
    return (
        <div className="mb-4">
            <p className="text-gray-800 dark:text-gray-200 text-wrap overflow-wrap wrap-break-word">{post.body}</p>

            {/* Shared Post */}
            {post.sharedPost && (
                <div className="mt-3 border border-gray-200 dark:border-[#3F0071] rounded-xl bg-gray-50 dark:bg-[#030637] relative">
                    {/* Original Post Badge */}
                    <Link
                        to={`/post/${post.sharedPost._id}`}
                        className="absolute top-3 right-3 flex items-center space-x-1 text-xs text-blue-600 dark:text-[#610094] hover:text-blue-700 dark:hover:text-[#610094] bg-blue-50 dark:bg-[#610094]/20 hover:bg-blue-100 dark:hover:bg-[#610094]/30 px-2 py-1 rounded-full transition"
                    >
                        <ExternalLink size={12} />
                        <span className="font-medium">Original Post</span>
                    </Link>

                    {/* Shared Post Header */}
                    <div className="flex items-center space-x-3 p-3 pr-32">
                        <Link to={`/profile/${post.sharedPost.user?._id}`}>
                            <Avatar
                                src={post.sharedPost.user?.photo || "https://i.pravatar.cc/150?u=shared"}
                                size="sm"
                                className="w-10 h-10 cursor-pointer hover:opacity-80 transition"
                            />
                        </Link>
                        <div>
                            <Link to={`/profile/${post.sharedPost.user?._id}`}>
                                <h4 className="font-bold text-sm text-gray-900 dark:text-white hover:underline cursor-pointer">
                                    {post.sharedPost.user?.name || "User"}
                                </h4>
                            </Link>
                            <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                                <span>@{post.sharedPost.user?.username || "username"}</span>
                                <span>•</span>
                                <span>{timeAgo(post.sharedPost.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                    {/* Shared Post Content */}
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-2 p-2">{post.sharedPost.body}</p>
                    {/* Shared Post Image */}
                    {post.sharedPost.image && (
                        <img
                            src={post.sharedPost.image}
                            alt="Shared Post"
                            className="w-full rounded-bottom object-cover cursor-pointer hover:opacity-90 transition"
                            onClick={() => onImageClick(post.sharedPost.image)}
                        />
                    )}
                </div>
            )}

            {/* Post Image (only if not a shared post) */}
            {post.image && !post.sharedPost && (
                <img
                    src={post.image}
                    alt="Post"
                    className="mt-3 w-full rounded-xl object-cover cursor-pointer hover:opacity-90 transition"
                    onClick={() => onImageClick(post.image)}
                />
            )}
        </div>
    );
}
