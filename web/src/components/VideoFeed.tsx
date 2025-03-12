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
        videojs(videoElement, {
          // เพิ่มการตั้งค่าเหล่านี้
          fluid: true, // เปิดโหมด responsive
          aspectRatio: '2:1', // อัตราส่วน 2:1
          responsive: true,
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

  // components/VideoFeed.tsx
return (
  <div className="w-full h-full max-w-[1024px] mx-auto"> {/* กำหนดขนาดสูงสุดและจัดกลาง */}
    <div 
      className="relative" 
      style={{ 
      }}
    >
      <video 
        autoPlay 
        muted 
        className="video-js absolute top-0 left-0 w-full h-full object-contain" 
        ref={videoRef} 
        controls
      >
        <source src={src} type="application/x-mpegURL" />
      </video>
    </div>
  </div>
);
});

export default VideoFeed;