import ContentEditModal from "../../components/ContentEditModal";

export default function PostEditModalWrapper({
    isOpen,
    onClose,
    post,
    onSubmit,
    isLoading
}) {
    const handleSubmit = (editData) => {
        onSubmit(editData);
    };

    return (
        <ContentEditModal
            isOpen={isOpen}
            onClose={onClose}
            title="Edit Post"
            initialContent={post.body}
            initialImage={post.image}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            placeholder="What's on your mind?"
            minRows={4}
        />
    );
}
