import { Modal, ModalContent } from "@heroui/react";


export default function ImageViewer({ isOpen, onClose, imageUrl, alt = "Image" }) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="full"
            classNames={{
                base: "bg-black/95",
                backdrop: "bg-black/80",
            }}
        >
            <ModalContent className="bg-transparent shadow-none">
                {/* Image Container */}
                <div className="flex items-center justify-center h-screen p-4">
                    <img
                        src={imageUrl}
                        alt={alt}
                        className="max-w-full max-h-full object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            </ModalContent>
        </Modal>
    );
}
