import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

interface VideoFeedProps {
  src: string;
}

interface VideoFeedHandle {
  getVideoElement: () => HTMLVideoElement | null;
}

const VideoFeed = forwardRef<VideoFeedHandle, VideoFeedProps>(({ src }, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [player, setPlayer] = useState<ReturnType<typeof videojs>>();

  useImperativeHandle(ref, () => ({
    getVideoElement: () => videoRef.current
  }));

  useEffect(() => {
    if (!player) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      setPlayer(
        videojs(videoElement, {}, () => {
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
      <video autoPlay muted style={{ width: "1024px", height: "512px" }} className="video-js" ref={videoRef} controls>
        <source src={src} type="application/x-mpegURL" />
      </video>
    </div>
  );
});

export default VideoFeed;