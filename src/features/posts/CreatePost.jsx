import { Textarea, Button, Avatar, Select, SelectItem, Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import { useState, useRef, lazy, Suspense } from "react";
import { Image, Smile, Send, Globe, X } from "lucide-react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../api/axios";
import { useUser } from "../../hooks/useUser";

// Lazy load emoji picker
const EmojiPicker = lazy(() => import("emoji-picker-react"));

export default function CreatePost() {
    const [text, setText] = useState("");
    const [privacy, setPrivacy] = useState("public");
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const fileInputRef = useRef(null);
    const { user } = useUser();
    const queryClient = useQueryClient();

    // Mutation for creating post
    const createPostMutation = useMutation({
        mutationFn: async (postData) => {
            const formData = new FormData();
            if (postData.text) {
                formData.append("body", postData.text);
            }
            if (postData.privacy) {
                formData.append("privacy", postData.privacy);
            }
            if (postData.image) {
                formData.append("image", postData.image);
            }
            const res = await axiosInstance.post("posts", formData);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            setText("");
            setSelectedImage(null);
            setImagePreview(null);
            toast.success("Post created successfully");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to create post");
        },
    });

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

    const onEmojiClick = (emojiObject) => {
        setText((prev) => prev + emojiObject.emoji);
        setShowEmojiPicker(false);
    };

    const handlePost = () => {
        if (!text.trim() && !selectedImage) return;
        createPostMutation.mutate({
            text,
            privacy,
            image: selectedImage,
        });
    };

    return (
        <div className="bg-[#FEFEFE] dark:bg-[#030637] rounded-2xl shadow-xl p-6 dark:border dark:border-[#610094]/30 dark:shadow-[#610094]/20">
            {/* Header with Avatar and Privacy */}
            <div className="flex items-center space-x-3 mb-4">
                <Avatar
                    src={user?.photo || "https://i.pravatar.cc/150?u=default"}
                    size="lg"
                    className="w-12 h-12"
                />
                <div className="flex flex-col">
                    <span className="font-bold text-gray-900 dark:text-gray-200">{user?.name || "amr"}</span>
                    <Select
                        size="sm"
                        selectedKeys={[privacy]}
                        onSelectionChange={(keys) => setPrivacy(Array.from(keys)[0])}
                        startContent={<Globe size={14} className="text-gray-500 dark:text-gray-400" />}
                        aria-label="Post privacy"
                        classNames={{
                            base: "w-28",
                            trigger: "h-8 min-h-8 px-3 bg-gray-100 dark:bg-black/30 rounded-lg border-0 data-[hover=true]:bg-gray-200 dark:data-[hover=true]:bg-black/40",
                            value: "text-xs text-gray-700 dark:text-gray-300",
                            popoverContent: "bg-white dark:bg-[#030637] dark:border dark:border-[#3F0071]",
                            listbox: "dark:bg-[#030637]",
                        }}
                    >
                        <SelectItem key="public" classNames={{ base: "dark:text-gray-200 dark:data-[hover=true]:bg-[#3F0071]/30" }}>Public</SelectItem>
                        <SelectItem key="following" classNames={{ base: "dark:text-gray-200 dark:data-[hover=true]:bg-[#3F0071]/30" }}>Friends</SelectItem>
                        <SelectItem key="only_me" classNames={{ base: "dark:text-gray-200 dark:data-[hover=true]:bg-[#3F0071]/30" }}>Private</SelectItem>
                    </Select>
                </div>
            </div>

            {/* Textarea */}
            <Textarea
                placeholder="What's on your mind, amr?"
                value={text}
                onChange={(e) => setText(e.target.value)}
                minRows={4}
                aria-label="Post content"
                classNames={{
                    base: "mb-4 ",
                    inputWrapper: "bg-gray-50 dark:bg-black/30 border-0 shadow-none rounded-2xl p-4 focus-within:ring-1 focus-within:ring-[#1877F2] dark:focus-within:ring-[#610094] focus-within:border-transparent",
                    input: "text-gray-600 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500",
                }}
            />

            {/* Image Preview */}
            {imagePreview && (
                <div className="relative mb-4 inline-block">
                    <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-w-md rounded-lg"
                    />
                    <button
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 p-1 bg-gray-800 bg-opacity-70 rounded-full hover:bg-opacity-90 transition"
                        aria-label="Remove image"
                    >
                        <X size={20} className="text-white" />
                    </button>
                </div>
            )}

            {/* Divider */}
            <div className="border-t border-gray-200 dark:border-gray-700/50 mb-4"></div>

            {/* Footer with Actions */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                    {/* Image Upload */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="hidden"
                        aria-label="Upload image file"
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition"
                        aria-label="Upload photo or video"
                    >
                        <Image size={22} className="text-teal-500" />
                        <span className="text-sm font-medium">Photo/video</span>
                    </button>

                    {/* Emoji Picker */}
                    <Popover
                        isOpen={showEmojiPicker}
                        onOpenChange={setShowEmojiPicker}
                        placement="top"
                    >
                        <PopoverTrigger>
                            <button
                                className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition"
                                aria-label="Add feeling or activity"
                            >
                                <Smile size={22} className="text-yellow-500" />
                                <span className="text-sm font-medium">Feeling/activity</span>
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                            <Suspense fallback={<div className="p-4 text-sm text-gray-500 dark:text-gray-400">Loading...</div>}>
                                <EmojiPicker onEmojiClick={onEmojiClick} />
                            </Suspense>
                        </PopoverContent>
                    </Popover>
                </div>
                <Button
                    onPress={handlePost}
                    isDisabled={!text.trim() && !selectedImage}
                    isLoading={createPostMutation.isPending}
                    endContent={!createPostMutation.isPending && <Send size={18} />}
                    className="bg-[#001F6B] hover:bg-[#092a80] dark:bg-[#610094] dark:hover:bg-[#610094]/80 dark:hover:shadow-lg dark:hover:shadow-[#610094]/50 text-white font-semibold px-6 rounded-xl shadow-lg transition-all"
                    size="md"
                >
                    Post
                </Button>
            </div>
        </div>
    );
}
