import { useState } from 'react';
import UploadButton from '../components/UploadButton';

const UploadImage = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleImageSelect = (file: File | null) => {
        setSelectedFile(file);
    };

    return (
        <div className="">
            <UploadButton onImageSelect={handleImageSelect} />
            {selectedFile && <p>{selectedFile.name}</p>}
        </div>
    );
};

export default UploadImage;
