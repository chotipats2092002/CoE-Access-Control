import { useRef } from "react";
import VideoFeed from "../components/VideoFeed";
import uploadImage from "../services/uploadService";

const IPCamera = () => {
    const videoRef = useRef<{ getVideoElement: () => HTMLVideoElement } | null>(null);

    const handleCapture = async () => {
        if (videoRef.current) {
            const videoElement = videoRef.current.getVideoElement();
            const canvas = document.createElement("canvas");
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;
            const context = canvas.getContext("2d");
            if (context) {
                context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            }
            const image = canvas.toDataURL("image/jpeg");

            // แปลง base64 เป็นไฟล์
            const byteString = atob(image.split(',')[1]);
            const mimeString = image.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([ab], { type: mimeString });
            const file = new File([blob], "capture.jpg", { type: "image/jpeg" });

            try {
                const response = await uploadImage(file); // อัปโหลดรูปภาพ
                console.log("Image uploaded successfully:", response);
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-grow items-center justify-center p-6">
                <div className="bg-white shadow-xl rounded-lg p-8 h-full flex flex-col justify-center items-center">
                    <VideoFeed src="http://rtsp_to_web:8083/stream/27aec28e-6181-4753-9acd-0456a75f0289/channel/0/hls/live/index.m3u8" ref={videoRef} />
                </div>
            </div>
            <div>
                <button
                    onClick={handleCapture}
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
                >
                    Capture
                </button>
            </div>
        </div>
    )
}

export default IPCamera;