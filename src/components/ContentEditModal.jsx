import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Textarea, Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import { X, Image as ImageIcon, Smile } from "lucide-react";
import { lazy, Suspense, useState, useRef } from "react";

const EmojiPicker = lazy(() => import("emoji-picker-react"));

export default function ContentEditModal({
    isOpen,
    onClose,
    title = "Edit",
    initialContent = "",
    initialImage = null,
    onSubmit,
    isLoading,
    placeholder = "Edit your content...",
    minRows = 3,
    size = "md"
}) {
    const [content, setContent] = useState(initialContent);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(initialImage);
    const [removeImage, setRemoveImage] = useState(false);
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
            setRemoveImage(false);
        }
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        setImage(null);
        setRemoveImage(true);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = () => {
        onSubmit({ content, image, removeImage });
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose} size={size}>
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalBody>
                    <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        minRows={minRows}
                        placeholder={placeholder}
                        aria-label="Edit content"
                        size="sm"
                    />

                    {imagePreview && (
                        <div className="relative mt-2 inline-block">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="max-w-full rounded-lg"
                            />
                            <button
                                onClick={handleRemoveImage}
                                className="absolute top-2 right-2 p-1 bg-gray-800 bg-opacity-70 rounded-full hover:bg-opacity-90 transition"
                                aria-label="Remove image"
                            >
                                <X size={16} className="text-white" />
                            </button>
                        </div>
                    )}

                    <div className="flex items-center space-x-2 mt-2">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageSelect}
                            className="hidden"
                            aria-label="Upload image"
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3F0071]/30 rounded-lg transition"
                            aria-label={imagePreview ? "Change image" : "Add image"}
                        >
                            <ImageIcon size={16} />
                            <span>{imagePreview ? "Change Image" : "Add Image"}</span>
                        </button>

                        <Popover
                            isOpen={showEmojiPicker}
                            onOpenChange={setShowEmojiPicker}
                            placement="top"
                        >
                            <PopoverTrigger>
                                <button className="p-2 hover:bg-gray-200 dark:hover:bg-[#3F0071]/30 rounded-full transition">
                                    <Smile size={16} className="text-gray-500 dark:text-gray-400" />
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
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="default"
                        variant="light"
                        size="sm"
                        onPress={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        size="sm"
                        onPress={handleSubmit}
                        isLoading={isLoading}
                    >
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
