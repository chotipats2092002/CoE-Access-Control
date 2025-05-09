import React from "react";
import { XCircle } from "lucide-react";

interface ImagePreviewProps {
    preview: string;
    onRemove: () => void;
    fileName?: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ preview, onRemove, fileName }) => (
    <div className="flex flex-col justify-center items-center p-2">
      <div className="relative">
        <img
          src={preview}
          alt="Image preview"
          className="w-60 h-60 object-cover rounded-xl border-4 border-gray-300 shadow-lg transform transition-all hover:scale-105 duration-300"
        />
        <button
          onClick={onRemove}
          className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-white text-gray-700 rounded-full p-1 shadow-lg hover:bg-gray-200 transition-all duration-200"
          aria-label="Remove image"
        >
          <XCircle size={40} className=" text-red-500" />
        </button>
      </div>
      {fileName && (
        <p className="text-sm text-gray-600 font-medium mt-2 text-center break-words max-w-[200px] sm:max-w-full">
          {fileName}
        </p>
      )}
    </div>
  );

export default ImagePreview;