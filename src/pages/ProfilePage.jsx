import { useParams } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { useFollow } from "../hooks/useFollow";
import { useProfileMutations } from "../hooks/useProfileMutations";
import { useProfile, useUserPosts } from "../hooks/useProfile";
import PostCard from "../features/posts/PostCard";
import ImageViewer from "../components/ImageViewer";
import PhotoUploadModal from "../components/PhotoUploadModal";
import ProfileHeader from "../components/ProfileHeader";
import ProfileStats from "../components/ProfileStats";
import ProfileInfo from "../components/ProfileInfo";
import ProfileTabs from "../components/ProfileTabs";
import InfiniteScrollContainer from "../components/InfiniteScrollContainer";
import { useInfinitePosts } from "../hooks/useInfinitePosts";
import { useState, useRef } from "react";

export default function ProfilePage() {
    const { userId } = useParams();
    const { user: currentUser } = useUser();
    const { followMutation, handleFollow } = useFollow();
    const [selectedTab, setSelectedTab] = useState("posts");
    const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadType, setUploadType] = useState("photo");
    const fileInputRef = useRef(null);
    const coverInputRef = useRef(null);

    const profileUserId = userId || currentUser?._id;
    const isOwnProfile = !userId || userId === currentUser?._id;

    const { updateImageMutation } = useProfileMutations(profileUserId);
    const { data: profileData, isLoading: profileLoading, isFetching: profileFetching } = useProfile(profileUserId);
    const { data: userPosts, isLoading: postsLoading } = useUserPosts(profileUserId);

    const {
        data: savedPostsData,
        isLoading: savedLoading,
        fetchNextPage: fetchNextSaved,
        hasNextPage: hasNextSaved,
        isFetchingNextPage: isFetchingNextSaved
    } = useInfinitePosts("saved");
    const savedPosts = savedPostsData?.pages?.flatMap(page => page?.data?.bookmarks || []) || [];

    const handlePhotoSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setUploadType("photo");
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setIsUploadModalOpen(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCoverSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setUploadType("cover");
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setIsUploadModalOpen(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadSubmit = ({ privacy }) => {
        if (selectedFile) {
            updateImageMutation.mutate(
                { file: selectedFile, privacy, type: uploadType },
                {
                    onSuccess: () => {
                        setIsUploadModalOpen(false);
                        setPreviewImage(null);
                        setSelectedFile(null);
                        setUploadType("photo");
                    }
                }
            );
        }
    };

    const handleCancelUpload = () => {
        setIsUploadModalOpen(false);
        setPreviewImage(null);
        setSelectedFile(null);
        setUploadType("photo");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        if (coverInputRef.current) {
            coverInputRef.current.value = "";
        }
    };

    const handleViewPhoto = () => {
        setSelectedImage(profileData?.photo);
        setIsImageViewerOpen(true);
    };

    const handleViewCover = () => {
        setSelectedImage(profileData?.cover);
        setIsImageViewerOpen(true);
    };

    const onFollowClick = () => {
        const message = profileData?.isFollowing ? "Unfollowed successfully" : "Followed successfully";
        handleFollow(profileUserId, message);
    };

    

    return (
        profileLoading && profileFetching ?  <div className="max-w-4xl mx-auto px-4 py-8">
                            <div className="text-center  text-gray-500 dark:bg-[#04001b] dark:text-gray-400">Loading Profile...</div>
                        </div>
            
            :
            <div className="min-h-screen bg-gray-100 dark:bg-[#04001b]">
            <div className="max-w-7xl  mx-auto px-4 py-8">
                {/* Profile Header with Stats */}
                <ProfileHeader
                    profileData={profileData}
                    profileUserId={profileUserId}
                    isOwnProfile={isOwnProfile}
                    fileInputRef={fileInputRef}
                    coverInputRef={coverInputRef}
                    onPhotoSelect={handlePhotoSelect}
                    onCoverSelect={handleCoverSelect}
                    onViewPhoto={handleViewPhoto}
                    onViewCover={handleViewCover}
                    isUploadingPhoto={updateImageMutation.isPending && uploadType === "photo"}
                    isUploadingCover={updateImageMutation.isPending && uploadType === "cover"}
                >
                    <ProfileStats profileData={profileData} savedPostsCount={savedPosts?.length || 0} />
                </ProfileHeader>

                {/* Profile Info (Follow button, About, Stats) */}
                <div className="bg-white dark:bg-[#030637] rounded-3xl shadow-sm p-8 mt-4 dark:border dark:border-[#610094]/30">
                    <ProfileInfo
                        profileData={profileData}
                        isOwnProfile={isOwnProfile}
                        onFollowClick={onFollowClick}
                        isFollowLoading={followMutation.isPending}
                        userPostsCount={userPosts?.length || 0}
                        savedPostsCount={savedPosts?.length || 0}
                    />
                </div>

                {/* Tabs */}
                <div className="mt-6">
                    <ProfileTabs
                        selectedTab={selectedTab}
                        onTabChange={setSelectedTab}
                        postsCount={userPosts?.length || 0}
                        savedCount={savedPosts?.length || 0}
                    />
                </div>

                {/* Posts Content */}
                <div className="mt-4 space-y-4">
                    {selectedTab === "posts" && (
                        <>
                            {postsLoading ? (
                                <div className="bg-white dark:bg-[#030637] rounded-2xl shadow-sm p-8 text-center border dark:border-[#610094]/30">
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-[#610094] border-t-transparent rounded-full animate-spin"></div>
                                        <p className="text-gray-500 dark:text-gray-400">Loading posts...</p>
                                    </div>
                                </div>
                            ) : userPosts?.length === 0 ? (
                                <div className="bg-white dark:bg-[#030637] rounded-2xl shadow-sm p-8 text-center border dark:border-[#610094]/30">
                                    <p className="text-gray-500 dark:text-gray-400">No posts yet</p>
                                </div>
                            ) : (
                                userPosts?.map((post) => (
                                    <PostCard key={post._id} post={post} />
                                ))
                            )}
                        </>
                    )}
                    {selectedTab === "saved" && (
                        <>
                            {savedLoading ? (
                                <div className="bg-white dark:bg-[#030637] rounded-2xl shadow-sm p-8 text-center border dark:border-[#610094]/30">
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-[#610094] border-t-transparent rounded-full animate-spin"></div>
                                        <p className="text-gray-500 dark:text-gray-400">Loading saved posts...</p>
                                    </div>
                                </div>
                            ) : savedPosts?.length === 0 ? (
                                <div className="bg-white dark:bg-[#030637] rounded-2xl shadow-sm p-8 text-center border dark:border-[#610094]/30">
                                    <p className="text-gray-500 dark:text-gray-400">No saved posts yet</p>
                                </div>
                            ) : (
                                <InfiniteScrollContainer
                                    onLoadMore={fetchNextSaved}
                                    hasMore={hasNextSaved}
                                    isLoading={isFetchingNextSaved}
                                >
                                    {savedPosts?.map((post) => (
                                        <PostCard key={post._id} post={post} />
                                    ))}
                                </InfiniteScrollContainer>
                            )}
                        </>
                    )}
                </div>
            </div>

            <ImageViewer
                isOpen={isImageViewerOpen}
                onClose={() => setIsImageViewerOpen(false)}
                imageUrl={selectedImage}
                alt="Profile Photo"
            />

            <PhotoUploadModal
                isOpen={isUploadModalOpen}
                onClose={handleCancelUpload}
                previewImage={previewImage}
                onUpload={handleUploadSubmit}
                isUploading={updateImageMutation.isPending}
            />
        </div>
    );
}
