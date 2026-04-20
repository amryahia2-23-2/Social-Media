export default function ReplyActions({ isLiked, likesCount, onLike }) {
    return (
        <div className="flex items-center space-x-3 mt-1 ml-10">
            <button
                onClick={onLike}
                className={`text-xs hover:underline ${isLiked ? "text-blue-600 dark:text-[#610094] font-semibold" : "text-gray-500 dark:text-gray-400"}`}
                aria-label={isLiked ? "Unlike reply" : "Like reply"}
            >
                Like ({likesCount})
            </button>
        </div>
    );
}
