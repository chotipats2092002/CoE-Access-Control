const IPCamera = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-grow items-center justify-center p-6">
                <div className="bg-white shadow-xl rounded-lg p-8  h-full flex flex-col justify-center items-center">
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
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