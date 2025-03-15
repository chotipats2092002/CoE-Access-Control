import { useRef, useState, useCallback } from "react";
import uploadImage from "../services/uploadService";
import Modal from "../components/Modal";
import RTSPtoWebMSE from "../components/RTSPtoWebMSE";
import Button from "../components/Button";
import { UploadResponse } from "../models/index";

type AlertModalConfig = {
    isOpen: boolean;
    iconName?: "success" | "error" | "warning";
    title: string;
    text: string;
    onConfirm?: () => void;
};

type PreviewModalConfig = {
    isOpen: boolean;
    image: string;
};

const CameraCapture = () => {
    const videoRef = useRef<{ getVideoElement: () => HTMLVideoElement } | null>(null);

    const [previewModal, setPreviewModal] = useState<PreviewModalConfig>({
        isOpen: false,
        image: "",
    });

    const [alertModal, setAlertModal] = useState<AlertModalConfig>({
        isOpen: false,
        title: "",
        text: "",
    });

    const handleCapture = useCallback(() => {
        if (!videoRef.current) {
            console.error("Video reference not found");
            return;
        }

        const videoElement = videoRef.current.getVideoElement();
        if (!videoElement) {
            setAlertModal({
                isOpen: true,
                iconName: "error",
                title: "Capture Failed",
                text: "Video element not found",
            });
            return;
        }

        try {
            const canvas = document.createElement("canvas");
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;
            const context = canvas.getContext("2d");

            if (!context) {
                throw new Error("Canvas context not available");
            }

            context.drawImage(videoElement, 0, 0);
            const image = canvas.toDataURL("image/jpeg");

            setPreviewModal({ isOpen: true, image });
        } catch (error) {
            setAlertModal({
                isOpen: true,
                iconName: "error",
                title: "Capture Error",
                text: error instanceof Error ? error.message : "Failed to capture image",
            });
        }
    }, []);

    const createImageFile = useCallback((dataUrl: string): File => {
        const [meta, base64] = dataUrl.split(",");
        const mimeType = meta.split(":")[1]?.split(";")[0] ?? "image/jpeg";
        const binary = atob(base64);
        const buffer = new Uint8Array(binary.length).map((_, i) => binary.charCodeAt(i));
        return new File([buffer], "capture.jpg", { type: mimeType });
    }, []);

    const handleUpload = useCallback(async (image: string) => {
        try {
            const file = createImageFile(image);
            const response = await uploadImage(file) as unknown as UploadResponse;

            setAlertModal({
                isOpen: true,
                iconName: "success",
                title: "Upload Successful",
                text: response.message,
                onConfirm: () => setAlertModal(prev => ({ ...prev, isOpen: false })),
            });
        } catch (error) {
            setAlertModal({
                isOpen: true,
                iconName: "error",
                title: "Upload Failed",
                text: error instanceof Error ? error.message : "Unknown upload error",
                onConfirm: () => setAlertModal(prev => ({ ...prev, isOpen: false })),
            });
        } finally {
            setPreviewModal(prev => prev.isOpen ? { ...prev, isOpen: false } : prev);
        }
    }, [createImageFile]);

    return (
        <div className="flex flex-grow items-center justify-center p-0 sm:p-6 w-full max-w-[1400px] h-full xl:max-h-[800px]  mx-auto">
            <div className="bg-white shadow-xl rounded-lg p-4 sm:p-8 w-full h-full max-w-[1200px] flex flex-col justify-center">
                <div className="flex flex-col gap-4 sm:gap-6r">
                <RTSPtoWebMSE ref={videoRef} />
                <div className="flex justify-center">
                    <Button onClick={handleCapture} aria-label="Capture image from video">
                        Capture
                    </Button>
                </div>
                </div>
            </div>


            <Modal
                key={previewModal.image}
                isOpen={previewModal.isOpen}
                title="Preview Image"
                text="Do you want to upload this image?"
                previewImage={previewModal.image}
                confirmButtonText="Upload"
                cancelButtonText="Cancel"
                onConfirm={() => handleUpload(previewModal.image)}
                onCancel={() => setPreviewModal(prev => prev.isOpen ? { ...prev, isOpen: false } : prev)}
            />

            <Modal
                key={alertModal.text}
                isOpen={alertModal.isOpen}
                iconName={alertModal.iconName}
                title={alertModal.title}
                text={alertModal.text}
                confirmButtonText="OK"
                onConfirm={alertModal.onConfirm}
            />
        </div>
    );
};

export default CameraCapture;