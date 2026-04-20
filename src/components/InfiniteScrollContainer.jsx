import { useEffect, useRef } from "react";

export default function InfiniteScrollContainer({
    children,
    onLoadMore,
    hasMore,
    isLoading
}) {
    const observerTarget = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isLoading) {
                    onLoadMore();
                }
            },
            { threshold: 0.1 }
        );

        const currentTarget = observerTarget.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [hasMore, isLoading, onLoadMore]);

    return (
        <div>
            {children}

            {/* Loading indicator */}
            {isLoading && (
                <div className="flex justify-center py-8">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            {/* Observer target */}
            <div ref={observerTarget} className="h-4" />

            {/* End message */}
            {!hasMore && !isLoading && (
                <div className="text-center py-8 text-gray-500">
                    <p>No more posts to load</p>
                </div>
            )}
        </div>
    );
}
