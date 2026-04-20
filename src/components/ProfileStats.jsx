export default function ProfileStats({ profileData, savedPostsCount }) {

    return (
        <div className="flex w-full justify-evenly items-center gap-4">
            <div className="w-40 text-center px-6 py-4 rounded-2xl border-1 border-gray-200 dark:border-[#3F0071] dark:bg-black/20">
                <p className="text-xs font-bold text-gray-500 dark:text-[#610094] uppercase mb-1">Followers</p>
                <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{profileData?.followers?.length || 0}</p>
            </div>
            <div className="w-40 text-center px-6 py-4 rounded-2xl border-1 border-gray-200 dark:border-[#3F0071] dark:bg-black/20">
                <p className="text-xs font-bold text-gray-500 dark:text-[#610094] uppercase mb-1">Following</p>
                <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{profileData?.followingCount || 0}</p>
            </div>
            <div className="w-40 text-center px-6 py-4 rounded-2xl border-1 border-gray-200 dark:border-[#3F0071] dark:bg-black/20">
                <p className="text-xs font-bold text-gray-500 dark:text-[#610094] uppercase mb-1">Bookmarks</p>
                <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{savedPostsCount || 0}</p>
            </div>
        </div>
    );
}
