import VideoFeed from "../components/VideoFeed"

const IPCamera = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-grow items-center justify-center p-6">
                <div className="bg-white shadow-xl rounded-lg p-8  h-full flex flex-col justify-center items-center">
                <VideoFeed src="http://localhost:8083/stream/27aec28e-6181-4753-9acd-0456a75f0289/channel/0/hls/live/index.m3u8" />
                </div>
            </div>
            <div>
                <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
                    Capture
                </button>
            </div>
        </div>
    )
}

export default IPCamera