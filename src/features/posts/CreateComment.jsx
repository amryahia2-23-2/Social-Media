import { Avatar, Textarea } from "@heroui/react";
import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { useCommentMutations } from "../../hooks/useCommentMutations";
import { useUser } from "../../hooks/useUser";
import CommentImagePreview from "../../components/CommentImagePreview";
import CommentInputActions from "../../components/CommentInputActions";

export default function CreateComment({ postId }) {
    const [comment, setComment] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const fileInputRef = useRef(null);
    const { user } = useUser();

    // Use existing hook
    const { createCommentMutation } = useCommentMutations(postId);

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = () => {
        if (!comment.trim() && !selectedImage) {
            toast.error("Comment cannot be empty");
            return;
        }
        createCommentMutation.mutate(
            {
                content: comment,
                image: selectedImage,
            },
            {
                onSuccess: () => {
                    setComment("");
                    setSelectedImage(null);
                    setImagePreview(null);
                }
            }
        );
    };

    const onEmojiClick = (emojiObject) => {
        setComment((prev) => prev + emojiObject.emoji);
        setShowEmojiPicker(false);
    };

    return (
        <div className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-[#030637] rounded-xl">
            <Avatar
                src={user?.photo || "https://i.pravatar.cc/150?u=default"}
                size="md"
                className="w-10 h-10"
                alt={`${user?.name}'s avatar`}
            />
            <div className="flex-1">
                <Textarea
                    placeholder={`Comment as ${user?.name || "User"}...`}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    minRows={2}
                    aria-label="Write a comment"
                    classNames={{
                        inputWrapper: "bg-white dark:bg-black/30 border-0 shadow-none",
                        input: "text-sm dark:text-white",
                    }}
                />

                {/* Image Preview */}
                <CommentImagePreview
                    imagePreview={imagePreview}
                    onRemove={handleRemoveImage}
                />

                {/* Hidden file input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                    aria-label="Upload comment image"
                />

                {/* Actions */}
                <CommentInputActions
                    fileInputRef={fileInputRef}
                    onImageClick={() => fileInputRef.current?.click()}
                    showEmojiPicker={showEmojiPicker}
                    onEmojiPickerChange={setShowEmojiPicker}
                    onEmojiClick={onEmojiClick}
                    onSubmit={handleSubmit}
                    isLoading={createCommentMutation.isPending}
                    isDisabled={!comment.trim() && !selectedImage}
                />
            </div>
        </div>
    );
}
