import { X } from "lucide-react";

export default function CommentImagePreview({ imagePreview, onRemove }) {
    if (!imagePreview) return null;

    return (
        <div className="relative mt-2 inline-block">
            <img
                src={imagePreview}
                alt="Comment preview"
                className="max-w-xs rounded-lg"
            />
            <button
                onClick={onRemove}
                className="absolute top-2 right-2 p-1 bg-gray-800 bg-opacity-70 rounded-full hover:bg-opacity-90 transition"
                aria-label="Remove image"
            >
                <X size={16} className="text-white" />
            </button>
        </div>
    );
}
