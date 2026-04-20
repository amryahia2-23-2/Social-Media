import { Button } from "@heroui/react";
import { Users, Calendar } from "lucide-react";

export default function ProfileInfo({
    profileData,
    isOwnProfile,
    onFollowClick,
    isFollowLoading,
    userPostsCount,
    savedPostsCount
}) {
    return (
        <>
            {/* Follow Button (if not own profile) */}
            {!isOwnProfile && (
                <div className="mt-6 flex justify-end">
                    <Button
                        color={profileData?.isFollowing ? "default" : "primary"}
                        variant={profileData?.isFollowing ? "bordered" : "solid"}
                        startContent={<Users size={18} />}
                        onPress={onFollowClick}
                        isLoading={isFollowLoading}
                        aria-label={profileData?.isFollowing ? "Unfollow user" : "Follow user"}
                    >
                        {profileData?.isFollowing ? "Unfollow" : "Follow"}
                    </Button>
                </div>
            )}

            {/* About and Posts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {/* About Section */}
                <div className="profile-about-card dark:bg-[#02052C] bg-gray-50 rounded-2xl p-6 dark:border dark:border-[#3F0071]">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4">About</h3>
                    <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                        {profileData?.email && (
                            <div className="flex items-center space-x-3">
                                <Calendar size={16} className="text-gray-400 dark:text-[#610094]" />
                                <span>{profileData.email}</span>
                            </div>
                        )}
                        <div className="flex items-center space-x-3">
                            <Users size={16} className="text-gray-400 dark:text-[#610094]" />
                            <span>Active on Route Posts</span>
                        </div>
                    </div>
                </div>

                {/* Posts Stats */}
                <div className="space-y-4">
                    <div className="profile-stats-card dark:bg-[#02052C] bg-blue-50 rounded-2xl p-6 border border-blue-100 dark:border-[#610094]/30">
                        <p className="text-xs text-blue-600 dark:text-[#610094] uppercase font-semibold mb-2">My Posts</p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">{userPostsCount || 0}</p>
                    </div>
                    <div className="profile-stats-card dark:bg-[#02052C] bg-blue-50 rounded-2xl p-6 border border-blue-100 dark:border-[#610094]/30">
                        <p className="text-xs text-blue-600 dark:text-[#610094] uppercase font-semibold mb-2">Saved Posts</p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">{savedPostsCount || 0}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
