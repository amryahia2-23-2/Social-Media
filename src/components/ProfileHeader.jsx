import { Avatar } from "@heroui/react";
import { Users, Camera, Eye } from "lucide-react";

export default function ProfileHeader({
    profileData,
    isOwnProfile,
    fileInputRef,
    coverInputRef,
    onPhotoSelect,
    onCoverSelect,
    onViewPhoto,
    onViewCover,
    isUploadingPhoto,
    isUploadingCover,
    children // For stats section
}) {
    // console.log(profileData)
    return (
        <div className="bg-white dark:bg-[#030637] rounded-3xl shadow-sm overflow-hidden relative dark:border dark:border-[#610094]/30">
            {/* Cover Photo */}
            <div
  className="group h-48 bg-gradient-to-r from-[#2c3e50] via-[#34495e] to-[#5dade2] bg-center bg-cover relative"
  style={{
    backgroundImage: profileData?.cover ? `url(${profileData.cover})` : undefined,
  }}
>
                {/* Cover Buttons - Only for own profile */}
                {isOwnProfile && (
                    <div className="opacity-0 group-hover:opacity-100 transition duration-300">
                        <div className="absolute top-4 right-4 space-x-2 flex">
                            {/* Upload Cover Button */}
                            <button
                                onClick={() => coverInputRef.current?.click()}
                                className="flex items-center font-bold text-sm px-2 text-white  hover:bg-gray-900 rounded-full shadow-lg transition cursor-pointer"
                                aria-label="Upload cover"
                                disabled={isUploadingCover}
                            >
                                {isUploadingCover ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <Camera size={14} className="text-white me-2" />

                                )}
                                change cover
                            </button>

                            {/* View Cover Button */}
                            <button
                                onClick={onViewCover}
                                className="flex items-center font-bold text-sm px-2  text-white hover:bg-gray-900 rounded-full shadow-lg transition cursor-pointer"
                                aria-label="View cover"
                            >
                                <Eye size={14} className="text-white me-2" />
                                view cover
                            </button>
                        </div>
                    </div>
                )}

                {/* View Cover Button for other profiles */}
                {!isOwnProfile && profileData?.cover && (
                    <button
                        onClick={onViewCover}
                        className="absolute top-4 right-4 p-2 bg-gray-600 hover:bg-gray-700 rounded-full shadow-lg transition"
                        aria-label="View cover"
                    >
                        <Eye size={20} className="text-white" />
                    </button>
                )}

                {/* Hidden cover input */}
                <input
                    ref={coverInputRef}
                    type="file"
                    accept="image/*"
                    onChange={onCoverSelect}
                    className="hidden"
                />
            </div>

            {/* Profile Content */}
            <div className="px-8 pb-8 relative -mt-16">
                {/* Avatar and Name Section */}
                <div className="bg-white dark:bg-[#030637] px-5 pb-5 rounded-3xl pt-20 dark:border dark:border-[#3F0071]">
                    <div className="flex flex-wrap items-center gap-4 lg:justify-between lg:flex-nowrap lg:gap-0" >
                        {/* Left: Avatar and Name */}
                        <div className="flex w-full items-center space-x-4">
                            <div className="relative">
                                <Avatar
                                    src={profileData?.photo}
                                    className="w-36 h-36 shadow border-4 border-white dark:border-[#3F0071]"
                                    alt={`${profileData?.name}'s profile photo`}
                                />

                                {/* Badges for own profile */}
                                {isOwnProfile && (
                                    <div className="w-full absolute bottom-2 right-0 flex justify-between">
                                        {/* Upload Photo Badge */}
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className="p-2 bg-blue-600 dark:bg-[#610094] hover:bg-blue-700 dark:hover:bg-[#610094] dark:hover:shadow-lg dark:hover:shadow-[#610094]/50 rounded-full shadow-lg transition"
                                            aria-label="Upload photo"
                                            disabled={isUploadingPhoto}
                                        >
                                            {isUploadingPhoto ? (
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                <Camera size={20} className="text-white" />
                                            )}
                                        </button>

                                        {/* View Photo Badge */}
                                        <button
                                            onClick={onViewPhoto}
                                            className="p-2 bg-gray-600 dark:bg-[#3F0071] hover:bg-gray-700 dark:hover:bg-[#3F0071]/80 rounded-full shadow-lg transition"
                                            aria-label="View photo"
                                        >
                                            <Eye size={20} className="text-white" />
                                        </button>
                                    </div>
                                )}

                                {/* View Photo Badge for other profiles */}
                                {!isOwnProfile && (
                                    <button
                                        onClick={onViewPhoto}
                                        className="absolute bottom-0 right-0 p-2 bg-gray-600 dark:bg-[#3F0071] hover:bg-gray-700 dark:hover:bg-[#3F0071]/80 rounded-full shadow-lg transition"
                                        aria-label="View photo"
                                    >
                                        <Eye size={20} className="text-white" />
                                    </button>
                                )}

                                {/* Hidden file input */}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={onPhotoSelect}
                                    className="hidden"
                                />
                            </div>
                            <div>
                                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">{profileData?.name}</h1>
                                <p className="text-gray-500 dark:text-gray-400 text-[20px] font-semibold mb-2">@{profileData?.username}</p>
                                <div className="flex items-center shadow space-x-2 text-sm text-blue-600 dark:text-[#610094] px-3 py-1 bg-blue-50 dark:bg-[#610094]/20 rounded-full">
                                    <Users size={14} />
                                    <span className="font-bold text-xs">Route Posts member</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: Stats section */}
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
