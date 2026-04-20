import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Slider, Select, SelectItem } from "@heroui/react";
import { useState } from "react";

export default function PhotoUploadModal({
    isOpen,
    onClose,
    previewImage,
    onUpload,
    isUploading
}) {
    const [zoomLevel, setZoomLevel] = useState(100);
    const [privacy, setPrivacy] = useState("public");

    const handleUpload = () => {
        onUpload({ privacy, zoomLevel });
        // Reset state after upload
        setZoomLevel(100);
        setPrivacy("public");
    };

    const handleClose = () => {
        // Reset state on close
        setZoomLevel(100);
        setPrivacy("public");
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            size="2xl"
        >
            <ModalContent>
                <ModalHeader>Upload Profile Photo</ModalHeader>
                <ModalBody>
                    {/* Image Preview */}
                    <div className="flex justify-center items-center bg-gray-100 rounded-lg p-4 mb-4">
                        <div
                            className="overflow-hidden rounded-full border-4 border-white shadow-lg"
                            style={{ width: '200px', height: '200px' }}
                            role="img"
                            aria-label="Profile photo preview"
                        >
                            <img
                                src={previewImage}
                                alt="Profile photo preview"
                                className="w-full h-full object-cover"
                                style={{
                                    transform: `scale(${zoomLevel / 100})`,
                                    transition: 'transform 0.2s'
                                }}
                            />
                        </div>
                    </div>

                    {/* Zoom Control */}
                    <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2 block">
                            Zoom Level: {zoomLevel}%
                        </p>
                        <Slider
                            aria-label="Zoom level control"
                            size="sm"
                            step={5}
                            minValue={50}
                            maxValue={200}
                            value={zoomLevel}
                            onChange={setZoomLevel}
                            className="max-w-full"
                        />
                    </div>

                    {/* Privacy Select */}
                    <Select
                        label="Privacy"
                        placeholder="Select privacy"
                        aria-label="Photo privacy settings"
                        defaultSelectedKeys={["public"]}
                        selectedKeys={[privacy]}
                        onSelectionChange={(keys) => {
                            const selected = Array.from(keys)[0];
                            setPrivacy(selected);
                        }}
                    >
                        <SelectItem key="public" value="public">
                            Public
                        </SelectItem>
                        <SelectItem key="following" value="following">
                            Following Only
                        </SelectItem>
                        <SelectItem key="only_me" value="only_me">
                            Only Me
                        </SelectItem>
                    </Select>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="default"
                        variant="light"
                        onPress={handleClose}
                        aria-label="Cancel photo upload"
                    >
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        onPress={handleUpload}
                        isLoading={isUploading}
                        aria-label="Upload profile photo"
                    >
                        Upload
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
