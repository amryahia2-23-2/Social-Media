import { ThumbsUp, MessageCircle, Share2 } from "lucide-react";

export default function PostActions({ isLiked, onLike, onComment, onShare }) {
    return (
        <div className="grid grid-cols-3 gap-2">
            <button
                onClick={onLike}
                className={`flex items-center justify-center space-x-2 py-2 rounded-lg transition ${isLiked
                    ? "text-blue-600 dark:text-[#610094] bg-blue-50 dark:bg-[#610094]/20"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3F0071]/30"
                    }`}
                aria-label={isLiked ? "Unlike post" : "Like post"}
            >
                <ThumbsUp size={20} fill={isLiked ? "currentColor" : "none"} />
                <span className="font-medium">Like</span>
            </button>
            <button
                onClick={onComment}
                className="flex items-center justify-center space-x-2 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3F0071]/30 transition"
                aria-label="Comment on post"
            >
                <MessageCircle size={20} />
                <span className="font-medium">Comment</span>
            </button>
            <button
                onClick={onShare}
                className="flex items-center justify-center space-x-2 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3F0071]/30 transition"
                aria-label="Share post"
            >
                <Share2 size={20} />
                <span className="font-medium">Share</span>
            </button>
        </div>
    );
}
