import { useNavigate } from "react-router-dom";
import { useNotifications } from "../hooks/useNotifications";
import NotificationCard from "../components/NotificationCard";
import NotificationsHeader from "../components/NotificationsHeader";
import { useState } from "react";

export default function Notifications() {
    const navigate = useNavigate();
    const {
        notifications,
        isLoading,
        unreadCount,
        handleMarkRead,
        handleMarkAllRead,
    } = useNotifications();

    const [filter, setFilter] = useState("all"); // "all" or "unread"

    // Handle notification click
    const handleNotificationClick = (notification) => {
        // Mark as read if unread
        if (!notification.isRead) {
            handleMarkRead(notification._id);
        }

        // Navigate based on notification type
        if (notification.type === "follow") {
            // Go to actor's profile
            navigate(`/profile/${notification.actor?._id}`);
        } else if (notification.entityType === "post" && notification.entityId) {
            // Go to post details with hash for comments
            if (notification.type === "comment_post" || notification.type === "reply_comment") {
                // Pass actor ID and notification time to help find the specific comment
                const actorId = notification.actor?._id;
                const notificationTime = notification.createdAt;
                navigate(`/post/${notification.entityId}#comments`, {
                    state: { actorId, notificationTime, scrollToComment: true }
                });
            } else {
                // Navigate to post normally
                navigate(`/post/${notification.entityId}`);
            }
        }
    };

    // Filter notifications
    const filteredNotifications = filter === "unread"
        ? notifications?.filter(n => !n.isRead)
        : notifications;

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="text-center  text-gray-500 dark:bg-[#04001b] dark:text-gray-400">Loading notifications...</div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            {/* Header */}
            <NotificationsHeader
                unreadCount={unreadCount}
                filter={filter}
                onFilterChange={setFilter}
                onMarkAllRead={handleMarkAllRead}
            />

            {/* Notifications List */}
            {filteredNotifications?.length === 0 ? (
                <div className="bg-white dark:bg-[#030637] rounded-2xl shadow-sm p-12 text-center dark:border dark:border-[#610094]/30">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No notifications yet</h3>
                    <p className="text-gray-500 dark:text-gray-400">When you get notifications, they'll show up here</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {filteredNotifications?.map((notification) => (
                        <NotificationCard
                            key={notification._id}
                            notification={notification}
                            onMarkRead={handleMarkRead}
                            onClick={handleNotificationClick}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
