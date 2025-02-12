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
        <div className="flex flex-col items-center space-y-4">
            {!preview ? (
                <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                    Choose Image
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </label>
            ) : (
                <div className="relative">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-40 h-40 object-cover rounded-lg border border-gray-300 shadow-md"
                    />
                    <button
                        onClick={handleRemoveImage}
                        className="absolute top-0 right-0 bg-white rounded-full p-1 shadow-md hover:bg-gray-200"
                    >
                        <XCircle size={24} className="text-red-500" />
                    </button>
                </div>
            )}
            {preview && (
                <button
                    onClick={handleUpload}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                    Upload Image
                </button>
            )}
        </div>
    );
};

export default ImageUpload;
