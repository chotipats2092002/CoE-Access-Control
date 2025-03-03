import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from 'react-dropzone'
import { XCircle } from "lucide-react";
import uploadImage from "../services/uploadService";
import { RiFolderUploadFill } from "react-icons/ri";


interface ImageUploadProps {
    onImageSelect: (file: File | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

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
        setSelectedFile(null);
        onImageSelect(null);
    };

    const handleUpload = async () => {
        try {
            if (selectedFile) {
                const data = await uploadImage(selectedFile);
                console.log("Upload success:", data);
                setModalMessage("Image uploaded successfully! 🎉");
            } else {
                setModalMessage("No image selected! ❌");
            }
        } catch (error) {
            setModalMessage("Upload failed! Please try again. ❌");
            console.error("Upload error:", error);
        }
        setIsModalOpen(true);
    };

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);


    const onDrop = useCallback((acceptedFiles: FileList) => {
        // Do something with the files
        const objectUrl = URL.createObjectURL(acceptedFiles[0]);
        setPreview(objectUrl);
        setSelectedFile(acceptedFiles[0])
        console.log(acceptedFiles[0])
        console.log("ok")
    }, [])
    const { getRootProps, getInputProps, open } = useDropzone({
        onDrop, maxFiles: 1, noClick: true,
    })

    return (
        <div className="flex flex-col">


            <div className="p-6 flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                    <h2 className="text-3xl">Upload your image</h2>
                    <h4 className="text-base text-gray-400">File should be JPG, and you can upload up to 5 files max</h4>

                </div>
                <div className="border-2 border-dotted rounded-lg">
                    <div className="min-h-[270px] flex flex-col justify-center" {...getRootProps()}>
                        {
                            (!preview) ? (
                                <div className="p-4 flex flex-col justify-center items-center gap-4 ">
                                    <input {...getInputProps()} />
                                    <div className="flex flex-col items-center">
                                        <RiFolderUploadFill className="text-6xl" />
                                        <p>Max. file size 5 MB</p>
                                    </div>

                                    <div className="w-1/2 flex flex-row justify-center">
                                        <button type="button" onClick={open} className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out">
                                            Browse file
                                        </button>
                                    </div>
                                </div>
                            ) :
                                (<div className="flex flex-row justify-center">
                                    <div className="relative w-1/3">
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="w-48 h-48 object-cover rounded-xl border-4 border-gray-300 shadow-lg transform transition-all hover:scale-105 duration-300"
                                        />
                                        <button
                                            onClick={handleRemoveImage}
                                            className="absolute -top-4 right-5 bg-white text-gray-700 rounded-full p-2 shadow-xl hover:bg-gray-200 transition-all duration-200"
                                        >
                                            <XCircle size={28} className="text-red-500" />
                                        </button>

                                    </div>
                                </div>)
                        }
                    </div>
                </div>
                <div className="h-3">
                    {preview && (
                        <div className="flex flex-row justify-center">
                            <div className="">
                                <button
                                    onClick={handleUpload}
                                    className="text-sm bg-gradient-to-r from-green-400 to-teal-500 text-white px-4 py-3 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out"
                                >
                                    Upload Image
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* // <label className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out">
                //     Choose Image
                //     <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                // </label> */}
            {/* 
                <div className="relative">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-96 h-96 object-cover rounded-xl border-4 border-gray-300 shadow-lg transform transition-all hover:scale-105 duration-300"
                    />
                    <button
                        onClick={handleRemoveImage}
                        className="absolute top-0 right-0 bg-white text-gray-700 rounded-full p-2 shadow-xl hover:bg-gray-200 transition-all duration-200"
                    >
                        <XCircle size={28} className="text-red-500" />
                    </button>
                </div> */}



        </div>
    );
};

export default ImageUpload;
