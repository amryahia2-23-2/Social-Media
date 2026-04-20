import { Avatar } from "@heroui/react";
import { Check } from "lucide-react";
import { timeAgo } from "../utils/timeAgo";

export default function NotificationCard({ notification, onMarkRead, onClick }) {
    // Get text and color based on notification type
    const getNotificationTypeInfo = (type) => {
        switch (type) {
            case "like_post":
                return { text: "liked your post", color: "text-red-500" };
            case "comment_post":
                return { text: "commented on your post", color: "text-blue-500" };
            case "follow":
                return { text: "started following you", color: "text-green-500" };
            case "share_post":
                return { text: "shared your post", color: "text-purple-500" };
            case "reply_comment":
                return { text: "replied to your comment", color: "text-blue-500" };
            default:
                return { text: "interacted with your post", color: "text-gray-500" };
        }
    };

    const typeInfo = getNotificationTypeInfo(notification.type);

    return (
        <div
            onClick={() => onClick(notification)}
            className={`rounded-2xl shadow-sm p-4 transition hover:shadow-md cursor-pointer dark:border ${!notification.isRead ? "bg-blue-50 dark:bg-[#030637] dark:border-[#610094]/50" : "bg-white dark:bg-[#030637] dark:border-[#3F0071]"
                }`}
            role="button"
            tabIndex={0}
            aria-label={`Notification from ${notification.actor?.name}: ${typeInfo.text}`}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onClick(notification);
                }
            }}
        >
            <div className="flex items-start space-x-3">
                {/* User Avatar */}
                <div className="shrink-0">
                    <Avatar
                        src={notification.actor?.photo || "https://i.pravatar.cc/150?u=" + notification.actor?._id}
                        size="md"
                        className="w-12 h-12"
                        alt={`${notification.actor?.name}'s avatar`}
                    />
                </div>

                {/* Notification Content */}
                <div className="flex-1 min-w-0">
                    {/* Name and Time */}
                    <div className="flex items-start justify-between mb-1">
                        <p className="font-bold text-gray-900 dark:text-white text-sm">
                            {notification.actor?.name}
                        </p>
                        <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                {timeAgo(notification.createdAt)}
                            </span>
                            {!notification.isRead && (
                                <div className="w-2 h-2 bg-[#610094] dark:bg-[#610094] rounded-full shrink-0 shadow-lg shadow-[#610094]/50" aria-label="Unread notification indicator" />
                            )}
                        </div>
                    </div>

                    {/* Action Type */}
                    <p className={`text-xs font-medium mb-2 ${typeInfo.color}`}>
                        {typeInfo.text}
                    </p>

                    {/* Post Preview */}
                    {notification.entity?.body && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 line-clamp-1">
                            {notification.entity.body}
                        </p>
                    )}

                    {/* Mark as Read Button */}
                    {!notification.isRead && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onMarkRead(notification._id);
                            }}
                            className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
                            aria-label="Mark notification as read"
                        >
                            <Check size={12} />
                            <span>Mark as read</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
