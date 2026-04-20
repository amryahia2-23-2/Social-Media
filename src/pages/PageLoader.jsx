import React from 'react'

export default function PageLoader() {
    return (
            <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
                <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 border-2 border-[#610094] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 dark:text-gray-400">Loading profile...</p>
                </div>
            </div>
    
    )
}
