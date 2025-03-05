import React from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

interface ModalProps{
    isOpen: boolean;
    iconName?: string;
    message?: string; 
    buttonText?: string;
    onConfirm?: () => void;
}

function getIconByName(iconName: string) {
    switch (iconName) {
        case "success":
            return <CheckCircleIcon className="text-green-500" />;
        case "error":
            return <XCircleIcon className="text-red-500" />;
        default:
            return null;
    }
}


const Modal: React.FC<ModalProps> = ({
    isOpen,
    iconName,
    message,
    buttonText,
    onConfirm
}) => {
    if (!isOpen) return null;

    const icon = iconName ? getIconByName(iconName) : null;

    return (
        <div className="fixed inset-0 flex items-center justify-center  backdrop-blur-xs z-10">
            {/* กล่อง Modal */}
            <div className="relative border-1 bg-gray-100 border-gray-300 max-w-md px-20 py-20 rounded-lg shadow-lg">
                {/* แสดงไอคอน (ถ้ามี) */}
                {icon && (
                <div className="flex justify-center ">
                    <div className="้h-70 w-60">
                        {icon}
                    </div>
                </div>
                )}

                {/* ข้อความ (message) */}
                <p className="text-center text-xl  pt-5">{message}</p>

                {/* ปุ่มหลัก */}
                <div className="flex justify-center pt-10">
                    <button
                        className="bg-gray-600 text-white text-xl font-medium px-10 py-2 rounded hover:bg-gray-700 cursor-pointer"
                        onClick={() => {
                            if (onConfirm) onConfirm();
                        }}
                    >
                    {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;