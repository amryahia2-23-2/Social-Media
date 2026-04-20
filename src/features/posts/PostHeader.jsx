import { Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { MoreHorizontal, Globe, Edit, Trash2, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";

export default function PostHeader({ post, isOwner, onEdit, onDelete, onSave }) {
    return (
        <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
                <Link to={`/profile/${post.user?._id}`}>
                    <Avatar
                        src={post.user?.photo || "https://i.pravatar.cc/150?u=default"}
                        size="lg"
                        className="w-12 h-12 cursor-pointer hover:opacity-80 transition"
                    />
                </Link>
                <div>
                    <Link to={`/profile/${post.user?._id}`}>
                        <h3 className="font-bold text-gray-900 dark:text-white hover:underline cursor-pointer">{post.user?.name || "user"}</h3>
                    </Link>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>@{post.user?.username || "username"}</span>
                        <span>•</span>
                        <span>{timeAgo(post.createdAt)}</span>
                        <span>•</span>
                        <Globe size={14} />
                        <span>{post.privacy}</span>
                    </div>
                </div>
            </div>
            <Dropdown>
                <DropdownTrigger>
                    <button
                        className="p-2 hover:bg-gray-100 dark:hover:bg-[#3F0071]/30 rounded-full transition"
                        aria-label="Post options"
                    >
                        <MoreHorizontal size={20} className="text-gray-500 dark:text-gray-400" />
                    </button>
                </DropdownTrigger>
                <DropdownMenu 
                classNames={{
                        base: "dark:bg-[#030637]",
                        list: "dark:bg-[#030637]",
                }}
                aria-label="Post actions">
                    {isOwner && (
                        <DropdownItem
                            key="edit"
                            startContent={<Edit size={16} />}
                            onPress={onEdit}
                            classNames={{ base: "dark:text-gray-200 dark:data-[hover=true]:bg-[#3F0071]/30" }}
                        >
                            Edit Post
                        </DropdownItem>
                    )}
                    {isOwner && (
                        <DropdownItem
                            key="delete"
                            startContent={<Trash2 size={16} />}
                            onPress={onDelete}
                            color="danger"
                            className="text-danger dark:text-red-400"
                            classNames={{ base: "dark:data-[hover=true]:bg-red-900/30" }}
                        >
                            Delete Post
                        </DropdownItem>
                    )}
                    <DropdownItem
                        key="save"
                        startContent={<Bookmark size={16} />}
                        onPress={onSave}
                        classNames={{ base: "dark:text-gray-200 dark:data-[hover=true]:bg-[#3F0071]/30" }}
                    >
                        Save Post
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}
