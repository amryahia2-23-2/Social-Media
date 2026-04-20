import { ArrowLeft } from "lucide-react";

export default function SuggestionsHeader({ onBack }) {
    return (
        <div className="bg-white dark:bg-[#030637] shadow-sm rounded-xl p-4 mb-6 border dark:border-[#610094]/30">
            <div className="flex items-center space-x-4">
                <button
                    onClick={onBack}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-[#3F0071]/30 rounded-lg transition"
                    aria-label="Go back"
                >
                    <ArrowLeft size={24} className="text-gray-700 dark:text-gray-300" />
                </button>
                <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Suggested Friends</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">People you may know</p>
                </div>
            </div>
        </div>
    );
}
