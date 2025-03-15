import CameraCapture from "../components/CameraCapture";

const IPCamera = () => {
    return ( 
        <div className="flex flex-col items-center justify-center min-h-[max(768px,100vh)] pt-20">
            <CameraCapture />
        </div>
    )
};

export default IPCamera;