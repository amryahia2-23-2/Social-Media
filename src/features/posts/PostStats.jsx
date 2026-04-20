import { ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";

export default function PostStats({ postId, likesCount, commentsCount }) {
    return (
        <div className="flex items-center justify-between py-3 border-t border-b border-gray-200 dark:border-gray-700/50 mb-2">
            <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-6 h-6 bg-blue-500 dark:bg-[#610094] rounded-full">
                    <ThumbsUp size={14} className="text-white" fill="white" />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-300">{likesCount} likes</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                <span>0 shares</span>
                <span>{commentsCount} comments</span>
                <Link
                    to={`/post/${postId}`}
                    className="text-blue-600 dark:text-[#610094] hover:underline"
                    aria-label="View post details"
                >
                    View details
                </Link>
            </div>
        </div>
    );
}
