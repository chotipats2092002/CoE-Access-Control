import React from "react";

interface ModalTestProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

const ModalTest: React.FC<ModalTestProps> = ({ isOpen, onClose, imageUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg">
        <button onClick={onClose} className="mb-4">Close</button>
        <img src={imageUrl} alt="Selected" className="max-w-full max-h-full" />
      </div>
    </div>
  );
};

export default ModalTest;