import React, { useState, useEffect } from "react";
import { XCircle } from "lucide-react";
import uploadImage from "../services/uploadService";

interface ImageUploadProps {
    onImageSelect: (file: File | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
            setSelectedFile(file);
            onImageSelect(file);
        }
    };

    const handleRemoveImage = () => {
        setPreview(null);
        setSelectedFile(null)
        onImageSelect(null);
    };
    const handleUpload = async () => {
        try {
            if (selectedFile) {
                const data = await uploadImage(selectedFile);
                console.log(data);
            }
        } catch (error) {
            alert("Upload failed!");
            console.error("Upload error:", error);
        }
    }

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    return (
        <div className="flex flex-col items-center space-y-6">
            {!preview ? (
                <label className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out">
                    Choose Image
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </label>
            ) : (
                <div className="relative">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-48 h-48 object-cover rounded-xl border-4 border-gray-300 shadow-lg transform transition-all hover:scale-105 duration-300"
                    />
                    <button
                        onClick={handleRemoveImage}
                        className="absolute top-0 right-0 bg-white text-gray-700 rounded-full p-2 shadow-xl hover:bg-gray-200 transition-all duration-200"
                    >
                        <XCircle size={28} className="text-red-500" />
                    </button>
                </div>
            )}
            {preview && (
                <button
                    onClick={handleUpload}
                    className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out"
                >
                    Upload Image
                </button>
            )}
        </div>
    );
};

export default ImageUpload;
