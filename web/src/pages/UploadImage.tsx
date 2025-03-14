import UploadButton from '../components/UploadButton';

const UploadImage = () => {

    return (
        <div className="flex flex-grow items-center justify-center p-6 w-full xl:w-[1024px] mx-auto">
            <div className="bg-white shadow-xl rounded-lg p-8 w-full h-full">
                <UploadButton />

            </div>
        </div>
    );
};

export default UploadImage;
