import { useRef, useEffect, useState, RefObject } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoFeed: React.FC<VideoFeedProps> = ({ src, ref }) => {
  const videoRef = useRef(null);
  const [player, setPlayer] = useState<ReturnType<typeof videojs>>();

  useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!player) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      setPlayer(
        videojs(videoElement, {

        }, () => {
          console.log("player is ready");
        })
      );
    }
  }, [videoRef]);

  useEffect(() => {
    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [player]);

  return (
    <div className="w-full h-full">
      <video autoPlay muted style={{ width: "800px", height: "600px" }} className="video-js " ref={videoRef} controls >
        <source ref={ref} src={src} type="application/x-mpegURL" />
      </video>
    </div>
  );
};

interface VideoFeedProps {
  src: string;
  ref: RefObject<HTMLSourceElement | null>;
}

export default VideoFeed;