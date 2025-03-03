import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-0">
            <div className="bg-white rounded-lg shadow-lg w-128 p-6">
                <div className="flex justify-center items-center border-b pb-2">
                    <h2 className="text-lg font-semibold">{title}</h2>
                </div>
                <div className="mt-4 justify-center">{children}</div>
                <div className="flex justify-center mt-4">
                    <button
                        onClick={onClose}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
