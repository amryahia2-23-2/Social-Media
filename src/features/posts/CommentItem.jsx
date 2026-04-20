import { Avatar } from "@heroui/react";
import { useState } from "react";
import { useUser } from "../../hooks/useUser";
import { useCommentMutations } from "../../hooks/useCommentMutations";
import { useReplies } from "../../hooks/useReplyMutations";
import ReplyItem from "./ReplyItem";
import CommentHeader from "../../components/CommentHeader";
import CommentActions from "../../components/CommentActions";
import CommentReplyInput from "../../components/CommentReplyInput";
import ContentEditModal from "../../components/ContentEditModal";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import { Link } from "react-router-dom";

export default function CommentItem({ comment, postId, postUserId }) {
    const { user } = useUser();
    const [localLikesCount, setLocalLikesCount] = useState(comment.likes?.length || 0);
    const [localIsLiked, setLocalIsLiked] = useState(comment?.likes?.includes(user?._id));
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [showReplies, setShowReplies] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const isOwnerComment = user?._id === comment.commentCreator?._id;
    const isOwnerPost = user?.id === postUserId;


    const { likeCommentMutation, editCommentMutation, deleteCommentMutation, createReplyMutation } = useCommentMutations(postId);

    // Fetch replies using hook
    const { data: replies, isLoading: repliesLoading } = useReplies(postId, comment._id, showReplies);

    const handleLike = () => {
        setLocalIsLiked(!localIsLiked);
        setLocalLikesCount(localIsLiked ? localLikesCount - 1 : localLikesCount + 1);
        likeCommentMutation.mutate(comment._id, {
            onError: () => {
                setLocalIsLiked(!localIsLiked);
                setLocalLikesCount(localIsLiked ? localLikesCount + 1 : localLikesCount - 1);
            }
        });
    };

    const handleReplySubmit = (replyData) => {
        createReplyMutation.mutate(
            { commentId: comment._id, ...replyData },
            {
                onSuccess: () => {
                    setShowReplyInput(false);
                    setShowReplies(true);
                }
            }
        );
    };

    const handleEditSubmit = (editData) => {
        editCommentMutation.mutate(
            { commentId: comment._id, ...editData },
            {
                onSuccess: () => {
                    setIsEditModalOpen(false);
                }
            }
        );
    };

    const handleDeleteConfirm = () => {
        deleteCommentMutation.mutate(comment._id, {
            onSuccess: () => {
                setIsDeleteModalOpen(false);
            }
        });
    };

    return (
        <div id={`comment-${comment._id}`} className="flex items-start space-x-3">
            <Link to={`/profile/${comment.commentCreator?._id}`}>
                <Avatar
                    src={comment.commentCreator?.photo || "https://i.pravatar.cc/150?u=comment"}
                    size="sm"
                    className="w-10 h-10 cursor-pointer hover:opacity-80 transition"
                    alt={`${comment.commentCreator?.name}'s avatar`}
                />
            </Link>
            <div className="flex-1">
                <CommentHeader
                    comment={comment}
                    isOwnerComment={isOwnerComment}
                    isOwnerPost={isOwnerPost}
                    onEdit={() => setIsEditModalOpen(true)}
                    onDelete={() => setIsDeleteModalOpen(true)}
                />

                {/* Comment Image */}
                {comment.image && (
                    <img
                        src={comment.image}
                        alt="Comment attachment"
                        className="mt-2 max-w-xs rounded-lg"
                    />
                )}

                <CommentActions
                    likesCount={localLikesCount}
                    isLiked={localIsLiked}
                    repliesCount={comment.repliesCount}
                    showReplies={showReplies}
                    onLike={handleLike}
                    onReply={() => setShowReplyInput(!showReplyInput)}
                    onToggleReplies={() => setShowReplies(!showReplies)}
                />

                {/* Reply Input */}
                {showReplyInput && (
                    <CommentReplyInput
                        onSubmit={handleReplySubmit}
                        onCancel={() => setShowReplyInput(false)}
                        isLoading={createReplyMutation.isPending}
                    />
                )}

                {/* Replies List */}
                {showReplies && (
                    <div className="mt-3 ml-4 space-y-3 border-l-2 border-gray-200 dark:border-gray-700/50 pl-4">
                        {repliesLoading ? (
                            <p className="text-gray-500 dark:text-gray-400 text-xs">Loading replies...</p>
                        ) : (
                            replies?.map((reply) => (
                                <ReplyItem
                                    key={reply._id}
                                    reply={reply}
                                    postId={postId}
                                    commentId={comment._id}
                                />
                            ))
                        )}
                    </div>
                )}

                {/* Edit Modal */}
                <ContentEditModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    title="Edit Comment"
                    initialContent={comment.content}
                    initialImage={comment.image}
                    onSubmit={handleEditSubmit}
                    isLoading={editCommentMutation.isPending}
                    placeholder="Edit your comment..."
                />

                {/* Delete Modal */}
                <ConfirmDeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={handleDeleteConfirm}
                    isLoading={deleteCommentMutation.isPending}
                    title="Delete Comment"
                    message="Are you sure you want to delete this comment? This action cannot be undone."
                />
            </div>
        </div>
    );
}
