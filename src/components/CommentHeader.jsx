import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { timeAgo } from "../utils/timeAgo";

export default function CommentHeader({ comment, isOwnerComment, isOwnerPost, onEdit, onDelete }) {

    return (
        <div className="flex items-start justify-between">
            <div className="bg-gray-100 dark:bg-[#030637] rounded-2xl px-4 py-2 flex-1 dark:border dark:border-[#3F0071]/30">
                <Link to={`/profile/${comment.commentCreator?._id}`}>
                    <p className="font-bold text-sm text-gray-900 dark:text-white hover:underline cursor-pointer">
                        {comment.commentCreator?.name || "User"}
                    </p>
                </Link>
                <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">
                    @{comment.commentCreator?.username || "member"} • {timeAgo(comment.createdAt)}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{comment.content}</p>
            </div>

            {/* Comment Options - Only for owner */}
            {(isOwnerComment || isOwnerPost) && (
                <Dropdown>
                    <DropdownTrigger>
                        <button
                            className="p-1 hover:bg-gray-200 dark:hover:bg-[#3F0071]/30 rounded-full transition ml-2"
                            aria-label="Comment options"
                        >
                            <MoreHorizontal size={16} className="text-gray-500 dark:text-gray-400" />
                        </button>
                    </DropdownTrigger>
                    <DropdownMenu 
                    aria-label="Comment actions"
                    classNames={{
                                    base: "dark:bg-[#030637]",
                                    list: "dark:bg-[#030637]",
                                }}
                    >
                        {isOwnerComment && <DropdownItem
                            key="edit"
                            startContent={<Edit size={14} />}
                            onPress={onEdit}
                            classNames={{ base: "dark:text-gray-200 dark:data-[hover=true]:bg-[#3F0071]/30" }}
                            
                        >
                            Edit
                        </DropdownItem>}
                        <DropdownItem
                            key="delete"
                            startContent={<Trash2 size={14} />}
                            onPress={onDelete}
                            color="danger"
                            className="text-danger dark:text-red-400"
                            classNames={{ base: "dark:data-[hover=true]:bg-red-900/30" }}
                        >
                            Delete
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            )}
        </div>
    );
}
