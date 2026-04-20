import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";

export default function ConfirmDeleteModal({
    isOpen,
    onClose,
    onConfirm,
    isLoading,
    title = "Delete",
    message = "Are you sure you want to delete this? This action cannot be undone.",
    size = "sm"
}) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size={size}>
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalBody>
                    <p className="text-sm">{message}</p>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="default"
                        variant="light"
                        size="sm"
                        onPress={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="danger"
                        size="sm"
                        onPress={onConfirm}
                        isLoading={isLoading}
                    >
                        Delete
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
