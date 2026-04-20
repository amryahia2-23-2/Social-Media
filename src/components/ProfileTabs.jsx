export default function ProfileTabs({ selectedTab, onTabChange, postsCount, savedCount }) {
    return (
        <div className="bg-white dark:bg-[#030637] rounded-2xl shadow-sm px-6 py-4 dark:border dark:border-[#610094]/30">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4 border-b border-gray-200 dark:border-[#3F0071]">
                    <button
                        onClick={() => onTabChange("posts")}
                        className={`flex items-center space-x-2 pb-3 border-b-2 transition-colors ${selectedTab === "posts"
                            ? "text-[#0d47a1] dark:text-[#610094] dark:border-[#610094]"
                            : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                            }`}
                        aria-label="View my posts"
                        aria-pressed={selectedTab === "posts"}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                        </svg>
                        <span className="font-semibold">My Posts</span>
                    </button>
                    <button
                        onClick={() => onTabChange("saved")}
                        className={`flex items-center space-x-2 pb-3 border-b-2 transition-colors ${selectedTab === "saved"
                            ? "text-[#0d47a1] dark:text-[#610094] dark:border-[#610094]"
                            : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                            }`}
                        aria-label="View saved posts"
                        aria-pressed={selectedTab === "saved"}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
                        </svg>
                        <span className="font-semibold">Saved</span>
                    </button>
                </div>
                <div className="w-5 h-5 flex items-center justify-center text-xs bg-blue-100 dark:bg-[#610094]/20 text-blue-600 dark:text-[#610094] p-2 rounded-full font-bold item-">
                    {selectedTab === "posts" ? postsCount : savedCount}
                </div>
            </div>
        </div>
    );
}
