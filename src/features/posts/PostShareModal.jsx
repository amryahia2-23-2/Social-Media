import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Textarea, Avatar } from "@heroui/react";
import { timeAgo } from "../../utils/timeAgo";

export default function PostShareModal({
    isOpen,
    onClose,
    shareBody,
    setShareBody,
    post,
    onSubmit,
    isLoading
}) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader>Share Post</ModalHeader>
                <ModalBody>
                    <Textarea
                        value={shareBody}
                        onChange={(e) => setShareBody(e.target.value)}
                        minRows={3}
                        placeholder="Say something about this..."
                        aria-label="Share post caption"
                    />
                    {/* Preview of shared post */}
                    <div className="mt-3 p-3 border border-gray-200 dark:border-[#3F0071] rounded-lg bg-gray-50 dark:bg-[#030637]">
                        <div className="flex items-center space-x-2 mb-2">
                            <Avatar
                                src={post.user?.photo || "https://i.pravatar.cc/150?u=default"}
                                size="sm"
                                className="w-8 h-8"
                            />
                            <div>
                                <p className="text-sm font-bold dark:text-white">{post.user?.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{timeAgo(post.createdAt)}</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{post.body}</p>
                        {post.image && (
                            <img
                                src={post.image}
                                alt="Post preview"
                                className="mt-2 w-full rounded-lg max-h-40 object-cover"
                            />
                        )}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="default"
                        variant="light"
                        onPress={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        onPress={onSubmit}
                        isLoading={isLoading}
                    >
                        Share
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
