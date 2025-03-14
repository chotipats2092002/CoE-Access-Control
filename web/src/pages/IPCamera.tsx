import React, { useRef, useState } from "react";
import uploadImage from "../services/uploadService";
import Modal from "../components/Modal";
import { UploadResponse } from "../models/index";
import RTSPtoWebMSE from "../components/RTSPtoWebMSE";

const IPCamera = () => {
    const videoRef = useRef<{ getVideoElement: () => HTMLVideoElement } | null>(null);

    // State สำหรับ preview modal
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [capturedImage, setCapturedImage] = useState("");
    // State สำหรับ alert modal (ใช้ทั้ง success/error)
    const [alertModalConfig, setAlertModalConfig] = useState<{
        isOpen: boolean;
        iconName?: "success" | "error" | "warning";
        title: string;
        text: string;
        onConfirm?: () => void;
        onCancel?: () => void;
    }>({
        isOpen: false,
        iconName: undefined,
        title: "",
        text: "",
    });

    const handleCapture = () => {
        if (!videoRef.current) return;

        const videoElement = videoRef.current.getVideoElement();
        if (!videoElement) {
            console.error("Video element not found");
            return;
        }

        const canvas = document.createElement("canvas");
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        const context = canvas.getContext("2d");
        context?.drawImage(videoElement, 0, 0);

        const image = canvas.toDataURL("image/jpeg");

        // แสดง preview modal
        setCapturedImage(image);
        setIsPreviewOpen(true);
    };

    const handleUpload = async (image: string) => {
        try {
            const file = new File(
                [Uint8Array.from(atob(image.split(",")[1]), (c) => c.charCodeAt(0))],
                "capture.jpg",
                { type: "image/jpeg" }
            );

            const response = (await uploadImage(file)) as unknown as UploadResponse;
            console.log(response)
            // แสดง alert modal เมื่ออัปโหลดสำเร็จ
            setAlertModalConfig({
                isOpen: true,
                iconName: "success",
                title: "Upload Successful",
                text: response.message,
                onConfirm: () =>
                    setAlertModalConfig((prev) => ({ ...prev, isOpen: false })),
            });
        } catch {
            // แสดง alert modal เมื่ออัปโหลดล้มเหลว
            setAlertModalConfig({
                isOpen: true,
                iconName: "error",
                title: "Upload Failed",
                text: "There was an error uploading the image. Please try again.",
                onConfirm: () =>
                    setAlertModalConfig((prev) => ({ ...prev, isOpen: false })),
            });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-5xl">
                <div className="bg-white shadow-xl rounded-lg p-4 md:p-8 flex flex-col gap-4">
                    <RTSPtoWebMSE ref={videoRef} />
                    <div className="flex justify-center">
                        <button
                            onClick={handleCapture}
                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors cursor-pointer"
                        >
                            Capture
                        </button>
                    </div>
                </div>
            </div>
            {isPreviewOpen && (
                <Modal
                    isOpen={isPreviewOpen}
                    title="Preview Image"
                    text="Do you want to upload this image?"
                    previewImage={capturedImage}
                    confirmButtonText="Upload"
                    cancelButtonText="Cancel"
                    onConfirm={() => {
                        handleUpload(capturedImage);
                        setIsPreviewOpen(false);
                    }}
                    onCancel={() => setIsPreviewOpen(false)}
                />
            )}
            {alertModalConfig.isOpen && (
                <Modal
                    isOpen={alertModalConfig.isOpen}
                    iconName={alertModalConfig.iconName}
                    title={alertModalConfig.title}
                    text={alertModalConfig.text}
                    confirmButtonText="OK"
                    onConfirm={alertModalConfig.onConfirm}
                />
            )}
        </div>
    );
};

export default IPCamera;