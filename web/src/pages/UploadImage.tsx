import { useState } from 'react';
import UploadButton from '../components/UploadButton';

const UploadImage = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleImageSelect = (file: File | null) => {
        setSelectedFile(file);
    };

    return (
        <div className="flex flex-grow items-center justify-center p-6">
            <div className="bg-white shadow-xl rounded-lg p-8 w-full h-full">
                <UploadButton onImageSelect={handleImageSelect} />
                {selectedFile && <p>{selectedFile.name}</p>}
            </div>
        </div>
    );
};

export default UploadImage;
