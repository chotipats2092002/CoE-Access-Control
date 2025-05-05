import UploadButton from '../components/UploadButton';

const UploadImage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[max(768px,100vh)] pt-20 ">
            <div className="flex flex-grow items-center justify-center p-0 sm:p-6 w-full max-w-[1200px] h-full lg:max-h-[600px]  mx-auto">
                <div className="bg-white shadow-xl rounded-lg p-4 sm:p-8 w-full h-full max-w-[1200px]">
                    <UploadButton />
                </div>
            </div>
        </div>
    );
};

export default UploadImage;
