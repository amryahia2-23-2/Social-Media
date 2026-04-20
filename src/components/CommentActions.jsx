export default function CommentActions({
    likesCount,
    isLiked,
    repliesCount,
    showReplies,
    onLike,
    onReply,
    onToggleReplies
}) {
    return (
        <div className="flex items-center space-x-4 mt-2 text-xs">
            <button
                onClick={onLike}
                className={`hover:underline ${isLiked ? "text-blue-600 dark:text-[#610094] font-semibold" : "text-gray-500 dark:text-gray-400"}`}
                aria-label={isLiked ? "Unlike comment" : "Like comment"}
            >
                Like ({likesCount})
            </button>
            <button
                onClick={onReply}
                className="text-gray-500 dark:text-gray-400 hover:underline"
                aria-label="Reply to comment"
            >
                Reply
            </button>
            {repliesCount > 0 && (
                <button
                    onClick={onToggleReplies}
                    className="text-blue-600 dark:text-[#610094] hover:underline font-medium"
                    aria-label={showReplies ? "Hide replies" : "View replies"}
                >
                    {showReplies ? "Hide" : "View"} {repliesCount} {repliesCount === 1 ? "reply" : "replies"}
                </button>
            )}
        </div>
    );
}
