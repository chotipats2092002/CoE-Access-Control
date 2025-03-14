import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from 'react-dropzone'
import uploadImage from "../services/uploadService";
import { RiFolderUploadFill } from "react-icons/ri";
import Modal from "./Modal";
import ImagePreview from "./ImagePreview";

const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg'];

const UploadButton: React.FC = () => {
    const [preview, setPreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploadResult, setUploadResult] = useState<{ success: boolean, message: string }>({
        success: false,
        message: ""
    });
    const [isUploading, setIsUploading] = useState(false);

    const handleRemoveImage = () => {
        setPreview(null);
        setSelectedFile(null);
    };

    const handleUpload = async () => {
        try {
            if (selectedFile) {
                setIsUploading(true);
                const data = await uploadImage(selectedFile);
                console.log("Upload success:", data);

                setUploadResult({
                    success: true,
                    message: "อัปโหลดสำเร็จ"
                });
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error("Upload error:", error);

            const errorMessage = error instanceof Error
                ? error.message
                : "เกิดข้อผิดพลาดระหว่างการอัปโหลด โปรดลองอีกครั้ง";

            setUploadResult({
                success: false,
                message: errorMessage
            });
            setIsModalOpen(true);
        } finally {
            setIsUploading(false);
        }
    };

    const handleModalConfirm = () => {
        if (uploadResult.success) {
            handleRemoveImage();
        }
        setIsModalOpen(false);
    };

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            if (!ALLOWED_FILE_TYPES.includes(file.type)) {
                alert('กรุณาอัปโหลดไฟล์ JPG เท่านั้น');
                return;
            }

            if (file.size > FILE_SIZE_LIMIT) {
                alert('ขนาดไฟล์ต้องไม่เกิน 5MB');
                return;
            }
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
            setSelectedFile(file);

        }
    }, []);

    const { getRootProps, getInputProps, open } = useDropzone({
        onDrop,
        maxFiles: 1,
        noClick: true,
        accept: {
            'image/jpeg': ['.jpg', '.jpeg']
        },
        maxSize: FILE_SIZE_LIMIT,
    });

    return (
        <div className="flex flex-col">
            <div className="p-6 flex flex-col gap-4 ">
                <div className="flex flex-col gap-3 item-center w-full">
                    <h2 className="text-3xl text-center">Upload your image</h2>
                    <h4 className="text-base text-gray-400 text-center">File should be JPG, and you can upload up to 1 file max</h4>
                </div>
                <div className="border-2 border-dotted rounded-lg">
                    <div className="min-h-[270px] flex flex-col justify-center " {...getRootProps()}>
                        {
                            (!preview) ? (
                                <div className="p-4 flex flex-col justify-center items-center gap-4 ">
                                    <input {...getInputProps()} />
                                    <div className="flex flex-col items-center">
                                        <RiFolderUploadFill className="text-6xl text-[#2354E6]" />
                                        <p className="text-gray-400">Max. file size 5 MB</p>
                                    </div>

                                    <div className="w-1/2 flex flex-row justify-center">
                                        <button
                                            type="button"
                                            onClick={open}
                                            className="cursor-pointer bg-white text-[#2354E6] border border-[#2354E6] px-6 py-3 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out"
                                            aria-label="เลือกไฟล์รูปภาพ"
                                        >
                                            เลือกไฟล์
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-2">
                                    <ImagePreview preview={preview} onRemove={handleRemoveImage} fileName={selectedFile?.name} />
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="h-3">
                    {preview && (
                        <div className="flex flex-row justify-center">
                            <div className="">
                                <button
                                    onClick={handleUpload}
                                    disabled={isUploading}
                                    className={`text-sm bg-gradient-to-r from-green-400 to-teal-500 text-white px-4 py-3 rounded-xl shadow-lg 
                                    ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 transform transition-all duration-300 ease-in-out'}`}
                                    aria-label="อัปโหลดรูปภาพที่เลือก"
                                >
                                    {isUploading ? 'กำลังอัปโหลด...' : 'อัปโหลดรูปภาพ'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                iconName={uploadResult.success ? "success" : "error"}
                title={uploadResult.success ? "success" : "fail"}
                text={uploadResult.message}
                confirmButtonText="OK"
                onConfirm={handleModalConfirm}
            />
        </div>
    );
};

export default UploadButton;