import { useRef } from "react";
import VideoFeed from "../components/VideoFeed";
import uploadImage from "../services/uploadService";
import { showPreviewModal } from "../components/PreviewModal";
import { showAlertModal } from "../components/AlertModal";
import { UploadResponse } from "../models/index";

const IPCamera = () => {
    const videoRef = useRef<{ getVideoElement: () => HTMLVideoElement } | null>(null);

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

        showPreviewModal({
            image,
            onConfirm: () => handleUpload(image),
        });
    };

    const handleUpload = async (capturedImage: string) => {
        try {
            const file = new File(
                [Uint8Array.from(atob(capturedImage.split(",")[1]), (c) => c.charCodeAt(0))],
                "capture.jpg",
                { type: "image/jpeg" }
            );

            const response = await uploadImage(file) as unknown as UploadResponse;

            showAlertModal({
                type: "success",
                message: response.message,
            });
        } catch {
            showAlertModal({
                type: "error",
                message: "There was an error uploading the image. Please try again.",
            });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-grow items-center justify-center p-6">
                <div className="bg-white shadow-xl rounded-lg p-8 h-full flex flex-col justify-center items-center gap-6">
                    <VideoFeed
                        src="http://localhost:8083/stream/27aec28e-6181-4753-9acd-0456a75f0289/channel/0/hls/live/index.m3u8"
                        ref={videoRef}
                    />
                    <button
                        onClick={handleCapture}
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                    >
                        Capture
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IPCamera;