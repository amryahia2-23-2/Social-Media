import { Home, FileText, Users, Bookmark } from "lucide-react";

export default function LeftSidebar({ activeFilter, onFilterChange }) {
    const menuItems = [
        { icon: Home, label: "Feed", filter: "feed" },
        { icon: FileText, label: "My Posts", filter: "my-posts" },
        { icon: Users, label: "Community", filter: "community" },
        { icon: Bookmark, label: "Saved", filter: "saved" },
    ];

    return (
        <div className="bg-[#FEFEFE] dark:bg-[#030637] rounded-xl shadow p-3 sticky top-18 h-fit dark:border dark:border-[#610094]/30">
            <div className="flex flex-wrap">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeFilter === item.filter;

                    return (
                        <button
                            key={item.filter}
                            onClick={() => onFilterChange(item.filter)}
                            className={`flex w-1/2 xl:w-full items-center space-x-3 px-4 py-2 rounded-full transition ${isActive
                                ? "bg-blue-50 dark:bg-[#610094] text-[#1877F2] dark:text-white shadow-lg dark:shadow-[#610094]/50"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3F0071]/30"
                                }`}
                        >
                            <Icon size={20} />
                            <span className="font-bold text-sm">{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
