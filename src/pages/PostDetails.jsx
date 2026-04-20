import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect, useRef } from "react";
import { usePostDetails, usePostComments } from "../hooks/usePostDetails";
import PostCard from "../features/posts/PostCard";

export default function PostDetails() {
    const { postId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const commentsRef = useRef(null);

    // Get notification data from navigation state
    const { actorId, notificationTime, scrollToComment } = location.state || {};

    // Fetch post details
    const { data: post, isLoading } = usePostDetails(postId);

    // Fetch all comments to find the specific one (only when coming from notification)
    const { data: comments } = usePostComments(
        postId,
        !!scrollToComment && !!actorId
    );

    // Scroll to comment when coming from notification (triggered when comments load)
    useEffect(() => {
        if (scrollToComment && actorId && comments && comments.length > 0) {
            // Find the comment from the actor closest to notification time
            const actorComments = comments.filter(
                c => c.commentCreator?._id === actorId
            );

            if (actorComments.length > 0) {
                // Get the comment closest to notification time
                const targetComment = actorComments.reduce((closest, current) => {
                    const closestDiff = Math.abs(
                        new Date(closest.createdAt) - new Date(notificationTime)
                    );
                    const currentDiff = Math.abs(
                        new Date(current.createdAt) - new Date(notificationTime)
                    );
                    return currentDiff < closestDiff ? current : closest;
                });

                const commentId = targetComment._id;

                // Wait for DOM to render, then scroll
                setTimeout(() => {
                    const commentElement = document.getElementById(`comment-${commentId}`);

                    if (commentElement) {
                        commentElement.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });
                        commentElement.classList.add("highlight-comment");
                        setTimeout(() => {
                            commentElement.classList.remove("highlight-comment");
                        }, 2000);
                    }
                }, 500);
            }
        }
    }, [comments, scrollToComment, actorId, notificationTime]);

    // Scroll to comments if hash is present (for direct links)
    useEffect(() => {
        if (location.hash && post && !scrollToComment) {
            // Check if it's a specific comment ID in hash
            if (location.hash.startsWith("#comment-")) {
                const commentId = location.hash.replace("#comment-", "");

                // Wait for DOM to render, then scroll
                setTimeout(() => {
                    const commentElement = document.getElementById(`comment-${commentId}`);

                    if (commentElement) {
                        commentElement.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });
                        commentElement.classList.add("highlight-comment");
                        setTimeout(() => {
                            commentElement.classList.remove("highlight-comment");
                        }, 2000);
                    }
                }, 500);

            } else if (location.hash === "#comments" && commentsRef.current) {
                // Scroll to comments section
                setTimeout(() => {
                    commentsRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }, 500);
            }
        }
    }, [location.hash, post, scrollToComment]);

    if (isLoading) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="text-center text-gray-500 dark:text-gray-400">Loading post...</div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="text-center text-gray-500 dark:text-gray-400">Post not found</div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center bg-wihte space-x-2 mb-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
                aria-label="Go back"
            >
                <ArrowLeft size={20} />
                <span>Back</span>
            </button>

            {/* Post */}
            <div ref={commentsRef}>
                <PostCard post={post} />
            </div>
        </div>
    );
}
