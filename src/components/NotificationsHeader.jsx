import { Button, Chip } from "@heroui/react";
import { Check } from "lucide-react";

export default function NotificationsHeader({
    unreadCount,
    filter,
    onFilterChange,
    onMarkAllRead
}) {
    return (
        <div className="bg-white dark:bg-[#030637] rounded-2xl shadow-sm p-6 mb-4 dark:border dark:border-[#610094]/30">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Real-time updates for likes, comments, shares, and follows.
                    </p>
                </div>

                {/* Mark All Read Button */}
                {unreadCount > 0 && (
                    <Button
                        size="sm"
                        variant="light"
                        startContent={<Check size={16} />}
                        onPress={onMarkAllRead}
                        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                        aria-label="Mark all notifications as read"
                    >
                        Mark all as read
                    </Button>
                )}
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center space-x-2">
                <Button
                    size="sm"
                    radius="full"
                    className={filter === "all" ? "bg-blue-500 dark:bg-[#610094] text-white" : "bg-gray-100 dark:bg-[#3F0071]/30 text-gray-700 dark:text-gray-300"}
                    onPress={() => onFilterChange("all")}
                    aria-label="Show all notifications"
                    aria-pressed={filter === "all"}
                >
                    All
                </Button>
                <Button
                    size="sm"
                    radius="full"
                    className={filter === "unread" ? "bg-blue-500 dark:bg-[#610094] text-white" : "bg-gray-100 dark:bg-[#3F0071]/30 text-gray-700 dark:text-gray-300"}
                    onPress={() => onFilterChange("unread")}
                    aria-label="Show unread notifications only"
                    aria-pressed={filter === "unread"}
                >
                    Unread
                    {unreadCount > 0 && (
                        <Chip size="sm" className="ml-1 bg-white dark:bg-[#030637] text-blue-500 dark:text-[#610094] min-w-5 h-5">
                            {unreadCount}
                        </Chip>
                    )}
                </Button>
            </div>
        </div>
    );
}
