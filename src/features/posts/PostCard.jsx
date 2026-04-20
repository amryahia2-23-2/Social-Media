import { useState } from "react";
import { useLocation } from "react-router-dom";
import Comments from "./Comments";
import ImageViewer from "../../components/ImageViewer";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostStats from "./PostStats";
import PostActions from "./PostActions";
import PostEditModalWrapper from "./PostEditModalWrapper";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import PostShareModal from "./PostShareModal";
import { useUser } from "../../hooks/useUser";
import { usePostMutations } from "../../hooks/usePostMutations";

export default function PostCard({ post }) {
    const { user } = useUser();
    const location = useLocation();
    const { deletePostMutation, editPostMutation, likePostMutation, sharePostMutation, bookmarkPostMutation } = usePostMutations();

    // Check if hash indicates comments should be open
    const hasHashForComments = location.hash === "#comments" || location.hash.startsWith("#comment-");

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
    const [viewerImageUrl, setViewerImageUrl] = useState("");
    const [manuallyToggledComments, setManuallyToggledComments] = useState(null);
    const [shareBody, setShareBody] = useState("");
    const [localLikesCount, setLocalLikesCount] = useState(post.likesCount);
    const [localIsLiked, setLocalIsLiked] = useState(post.likes?.includes(user?._id));

    const isOwner = user?._id === post.user?._id;

    // Derived state: if user manually toggled, use that; otherwise use hash
    const showComments = manuallyToggledComments !== null ? manuallyToggledComments : hasHashForComments;

    const handleLike = () => {
        setLocalIsLiked(!localIsLiked);
        setLocalLikesCount(localIsLiked ? localLikesCount - 1 : localLikesCount + 1);
        likePostMutation.mutate(post._id, {
            onError: () => {
                setLocalIsLiked(!localIsLiked);
                setLocalLikesCount(localIsLiked ? localLikesCount + 1 : localLikesCount - 1);
            }
        });
    };

    const handleComment = () => {
        setManuallyToggledComments(!showComments);
    };

    const handleShare = () => {
        setIsShareModalOpen(true);
    };

    const handleShareSubmit = () => {
        sharePostMutation.mutate({ postId: post._id, body: shareBody }, {
            onSuccess: () => {
                setIsShareModalOpen(false);
                setShareBody("");
            }
        });
    };

    const handleEdit = () => {
        setIsEditModalOpen(true);
    };

    const handleImageClick = (imageUrl) => {
        setViewerImageUrl(imageUrl);
        setIsImageViewerOpen(true);
    };

    const handleEditSubmit = (editData) => {
        editPostMutation.mutate({
            postId: post._id,
            body: editData.content,
            image: editData.image,
            removeImage: editData.removeImage
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
        deletePostMutation.mutate(post._id);
        setIsDeleteModalOpen(false);
    };

    const handleSave = () => {
        bookmarkPostMutation.mutate(post._id);
    };

    return (
        <div className="bg-white dark:bg-[#030637] rounded-2xl shadow-sm p-6 mb-4 dark:border dark:border-[#610094]/30 dark:shadow-[#610094]/10">
            <PostHeader
                post={post}
                isOwner={isOwner}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSave={handleSave}
            />

            <PostContent
                post={post}
                onImageClick={handleImageClick}
            />

            <PostStats
                postId={post._id}
                likesCount={localLikesCount}
                commentsCount={post.commentsCount}
            />

            <PostActions
                isLiked={localIsLiked}
                onLike={handleLike}
                onComment={handleComment}
                onShare={handleShare}
            />

            <Comments
                comment={post.topComment}
                postId={post._id}
                postUserId={post.user?._id}
                showAll={showComments}
                onToggle={handleComment}
            />

            <PostEditModalWrapper
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                post={post}
                onSubmit={handleEditSubmit}
                isLoading={editPostMutation.isPending}
            />

            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                isLoading={deletePostMutation.isPending}
                title="Delete Post"
                message="Are you sure you want to delete this post? This action cannot be undone."
            />

            <PostShareModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                shareBody={shareBody}
                setShareBody={setShareBody}
                post={post}
                onSubmit={handleShareSubmit}
                isLoading={sharePostMutation.isPending}
            />

            <ImageViewer
                isOpen={isImageViewerOpen}
                onClose={() => setIsImageViewerOpen(false)}
                imageUrl={viewerImageUrl}
                alt="Post Image"
            />
        </div>
    );
}
