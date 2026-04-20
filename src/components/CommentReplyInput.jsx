import { Textarea, Button, Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import { useState, useRef, lazy, Suspense } from "react";
import { Image as ImageIcon, X, Smile } from "lucide-react";
import toast from "react-hot-toast";

const EmojiPicker = lazy(() => import("emoji-picker-react"));

export default function CommentReplyInput({ onSubmit, onCancel, isLoading }) {
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const fileInputRef = useRef(null);

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = () => {
        if (!content.trim() && !image) {
            toast.error("Reply cannot be empty");
            return;
        }
        onSubmit({ content, image });
        setContent("");
        setImage(null);
        setImagePreview(null);
    };

    return (
        <div className="mt-3 space-y-2">
            <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write a reply..."
                minRows={2}
                size="sm"
                aria-label="Reply content"
            />

            {imagePreview && (
                <div className="relative inline-block">
                    <img
                        src={imagePreview}
                        alt="Reply preview"
                        className="max-w-xs rounded-lg"
                    />
                    <button
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 p-1 bg-gray-800 bg-opacity-70 rounded-full hover:bg-opacity-90 transition"
                        aria-label="Remove reply image"
                    >
                        <X size={16} className="text-white" />
                    </button>
                </div>
            )}

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="hidden"
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-[#3F0071]/30 rounded-full transition"
                        aria-label="Add image to reply"
                    >
                        <ImageIcon size={18} className="text-gray-500 dark:text-gray-400" />
                    </button>

                    <Popover
                        isOpen={showEmojiPicker}
                        onOpenChange={setShowEmojiPicker}
                        placement="top"
                    >
                        <PopoverTrigger>
                            <button className="p-2 hover:bg-gray-200 dark:hover:bg-[#3F0071]/30 rounded-full transition" aria-label="Add emoji">
                                <Smile size={18} className="text-gray-500 dark:text-gray-400" />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                            <Suspense fallback={<div className="p-4 text-sm text-gray-500">Loading...</div>}>
                                <EmojiPicker onEmojiClick={(emojiObject) => {
                                    setContent((prev) => prev + emojiObject.emoji);
                                    setShowEmojiPicker(false);
                                }} />
                            </Suspense>
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="flex items-center space-x-2">
                    <Button
                        size="sm"
                        color="primary"
                        onPress={handleSubmit}
                        isLoading={isLoading}
                        isDisabled={!content.trim() && !image}
                    >
                        Reply
                    </Button>
                    <Button
                        size="sm"
                        variant="light"
                        onPress={onCancel}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
}
