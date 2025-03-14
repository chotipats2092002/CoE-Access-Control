import UploadButton from '../components/UploadButton';

const UploadImage = () => {
  return (
    <div className="flex flex-grow items-center justify-center p-4 sm:p-6 w-full max-w-[1200px] mx-auto">
      <div className="bg-white shadow-xl rounded-lg p-4 sm:p-8 w-full h-full max-w-[600px]">
        <UploadButton />
      </div>
    </div>
  );
};

export default UploadImage;
