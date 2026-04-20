import { Button, Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import { Image, Smile, Send } from "lucide-react";
import { lazy, Suspense } from "react";

const EmojiPicker = lazy(() => import("emoji-picker-react"));

export default function CommentInputActions({
    onImageClick,
    showEmojiPicker,
    onEmojiPickerChange,
    onEmojiClick,
    onSubmit,
    isLoading,
    isDisabled
}) {
    return (
        <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-2">
                {/* Image Upload */}
                <button
                    onClick={onImageClick}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-[#3F0071]/30 rounded-full transition"
                    aria-label="Add image"
                >
                    <Image size={20} className="text-gray-500 dark:text-gray-400" />
                </button>

                {/* Emoji Picker */}
                <Popover
                    isOpen={showEmojiPicker}
                    onOpenChange={onEmojiPickerChange}
                    placement="top"
                >
                    <PopoverTrigger>
                        <button
                            className="p-2 hover:bg-gray-200 dark:hover:bg-[#3F0071]/30 rounded-full transition"
                            aria-label="Add emoji"
                        >
                            <Smile size={20} className="text-gray-500 dark:text-gray-400" />
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                        <Suspense fallback={<div className="p-4 text-sm text-gray-500">Loading...</div>}>
                            <EmojiPicker onEmojiClick={onEmojiClick} />
                        </Suspense>
                    </PopoverContent>
                </Popover>
            </div>

            {/* Submit Button */}
            <Button
                onPress={onSubmit}
                isLoading={isLoading}
                isDisabled={isDisabled}
                isIconOnly
                className="bg-[#001F6B] dark:bg-[#610094] text-white rounded-full hover:shadow-lg dark:hover:shadow-[#610094]/50 transition"
                size="sm"
                aria-label="Post comment"
            >
                <Send size={18} />
            </Button>
        </div>
    );
}
