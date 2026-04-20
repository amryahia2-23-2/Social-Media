import { Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";

export default function ReplyHeader({ reply, isOwner, onEdit, onDelete }) {
    return (
        <div className="flex items-start space-x-2">
            <Link to={`/profile/${reply.commentCreator?._id}`}>
                <Avatar
                    src={reply.commentCreator?.photo || "https://i.pravatar.cc/150?u=reply"}
                    size="sm"
                    className="w-8 h-8 cursor-pointer hover:opacity-80 transition"
                />
            </Link>
            <div className="flex-1">
                <div className="flex items-start justify-between">
                    <div className="bg-white dark:bg-[#030637] rounded-xl px-3 py-2 border border-gray-200 dark:border-[#3F0071] flex-1">
                        <Link to={`/profile/${reply.commentCreator?._id}`}>
                            <p className="font-bold text-xs text-gray-900 dark:text-white hover:underline cursor-pointer">
                                {reply.commentCreator?.name || "User"}
                            </p>
                        </Link>
                        <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">
                            @{reply.commentCreator?.username || "member"} • {timeAgo(reply.createdAt)}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 text-xs">{reply.content}</p>
                    </div>

                    {isOwner && (
                        <Dropdown>
                            <DropdownTrigger>
                                <button
                                    className="p-1 hover:bg-gray-200 dark:hover:bg-[#3F0071]/30 rounded-full transition ml-1"
                                    aria-label="Reply options"
                                >
                                    <MoreHorizontal size={14} className="text-gray-500 dark:text-gray-400" />
                                </button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Reply actions">
                                <DropdownItem
                                    key="edit"
                                    startContent={<Edit size={12} />}
                                    onPress={onEdit}
                                >
                                    Edit
                                </DropdownItem>
                                <DropdownItem
                                    key="delete"
                                    startContent={<Trash2 size={12} />}
                                    onPress={onDelete}
                                    className="text-danger"
                                    color="danger"
                                >
                                    Delete
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    )}
                </div>
            </div>
        </div>
    );
}
