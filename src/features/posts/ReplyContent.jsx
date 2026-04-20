export default function ReplyContent({ image }) {
    if (!image) return null;

    return (
        <img
            src={image}
            alt="Reply"
            className="mt-2 max-w-xs rounded-lg ml-10"
        />
    );
}
