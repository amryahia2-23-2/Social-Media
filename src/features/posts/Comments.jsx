
import { usePostComments } from "../../hooks/usePostDetails";
import CreateComment from "./CreateComment";
import CommentItem from "./CommentItem";

export default function Comments({ comment, postId, showAll, onToggle, postUserId }) {
    const handleViewAllComments = () => {
        if (onToggle) {
            onToggle();
        }
    };

    // Fetch all comments when user clicks "View all comments"
    const { data: allComments, isLoading } = usePostComments(postId, showAll);

    // If no comment and not showing all, don't render anything
    if (!comment && !showAll) return null;

    return (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700/50">
            <div className="bg-gray-50 dark:bg-black/20 dark:backdrop-blur-sm rounded-xl p-4 dark:border dark:border-gray-800/50 ">
                {/* Header */}
                {!showAll && comment && (
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-3">
                        TOP COMMENT
                    </p>
                )}

                {showAll && (
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-3">
                        ALL COMMENTS
                    </p>
                )}

                {/* Show message if no comments and showing all */}
                {!comment && showAll && !isLoading && allComments?.length === 0 && (
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                        No comments yet. Be the first to comment!
                    </p>
                )}

                {/* Top Comment - Only show when NOT showing all */}
                {
                    !showAll && comment ? ( <div className="mb-3">
                                                <CommentItem comment={comment} postId={postId} />
                                            </div>
                                        )
                                        :
                                        //  All Comments - Show when showing all 
                                        showAll && <div className="space-y-3 mb-3">
                                                        {isLoading ? (
                                                            <p className="text-gray-500 dark:text-gray-400 text-sm">Loading comments...</p>
                                                        ) : (
                                                            allComments?.map((c) => (
                                                                <CommentItem key={c._id} comment={c} postId={postId} postUserId={postUserId} />
                                                            ))
                                                        )}
                                                    </div>
                }

                {/* Toggle Button - Only show if there are comments */}
                {(comment || allComments?.length > 0) && (
                    <button
                        onClick={handleViewAllComments}
                        className="text-blue-600 text-sm font-medium hover:underline cursor-pointer"
                    >
                        {showAll ? "Hide comments" : "View all comments"}
                    </button>
                )}

                {/* Create Comment - Show when showAll is true */}
                {showAll && (
                    <div className="mt-4">
                        <CreateComment postId={postId} />
                    </div>
                )}
            </div>
        </div>
    );
}
