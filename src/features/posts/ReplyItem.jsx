import { useState } from "react";
import { useUser } from "../../hooks/useUser";
import { useReplyMutations } from "../../hooks/useReplyMutations";
import ReplyHeader from "./ReplyHeader";
import ReplyContent from "./ReplyContent";
import ReplyActions from "./ReplyActions";
import ContentEditModal from "../../components/ContentEditModal";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";

export default function ReplyItem({ reply, postId, commentId }) {
    const { user } = useUser();
    const { editReplyMutation, deleteReplyMutation, likeReplyMutation } = useReplyMutations(postId, commentId);

    const [localLikesCount, setLocalLikesCount] = useState(reply.likes?.length || 0);
    const [localIsLiked, setLocalIsLiked] = useState(reply.likes?.includes(user?._id));
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const isOwner = user?._id === reply.commentCreator?._id;

    const handleLike = () => {
        setLocalIsLiked(!localIsLiked);
        setLocalLikesCount(localIsLiked ? localLikesCount - 1 : localLikesCount + 1);
        likeReplyMutation.mutate(reply._id, {
            onError: () => {
                setLocalIsLiked(!localIsLiked);
                setLocalLikesCount(localIsLiked ? localLikesCount + 1 : localLikesCount - 1);
            }
        });
    };

    const handleEdit = () => {
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = (editData) => {
        editReplyMutation.mutate({
            replyId: reply._id,
            ...editData
        }, {
            onSuccess: () => {
                setIsEditModalOpen(false);
            }
        });
    };

    const handleDelete = () => {
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        deleteReplyMutation.mutate(reply._id);
        setIsDeleteModalOpen(false);
    };

    return (
        <>
            <ReplyHeader
                reply={reply}
                isOwner={isOwner}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <ReplyContent image={reply.image} />

            <ReplyActions
                isLiked={localIsLiked}
                likesCount={localLikesCount}
                onLike={handleLike}
            />

            <ContentEditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit Reply"
                initialContent={reply.content}
                initialImage={reply.image}
                onSubmit={handleEditSubmit}
                isLoading={editReplyMutation.isPending}
                placeholder="Edit your reply..."
                minRows={2}
                size="sm"
            />

            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                isLoading={deleteReplyMutation.isPending}
                title="Delete Reply"
                message="Are you sure you want to delete this reply? This action cannot be undone."
            />
        </>
    );
}
