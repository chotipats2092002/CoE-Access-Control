import { useEffect, useImperativeHandle, useRef } from "react";




const RTSPtoWebMSE = ({ref}: any) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // const mseUrl = "ws://localhost:8083/stream/27aec28e-6181-4753-9acd-0456a75f0289/channel/0/mse?uuid=27aec28e-6181-4753-9acd-0456a75f0289&channel=0";
  const mseUrl = "ws://10.161.112.138:8083/stream/27aec28e-6181-4753-9acd-0456a75f0289/channel/0/mse?uuid=27aec28e-6181-4753-9acd-0456a75f0289&channel=0";
  const mseQueue: Uint8Array[] = [];
  let mseSourceBuffer: SourceBuffer;
  let mseStreamingStarted = false;

  useImperativeHandle(ref, () => ({
    getVideoElement: () => videoRef.current
  }))

  useEffect(() => {
    if (!videoRef.current) return;
    const videoEl = videoRef.current;
    const mse = new MediaSource();
    videoEl.src = URL.createObjectURL(mse);

    mse.addEventListener("sourceopen", () => {
      const ws = new WebSocket(mseUrl);
      ws.binaryType = "arraybuffer";

      ws.onopen = () => console.log("Connected to WebSocket");

      ws.onmessage = (event) => {
        const data = new Uint8Array(event.data);
        if (data[0] === 9) {
          const decodedArr = data.slice(1);
          const mimeCodec = new TextDecoder("utf-8").decode(decodedArr);
          mseSourceBuffer = mse.addSourceBuffer(`video/mp4; codecs=\"${mimeCodec}\"`);
          mseSourceBuffer.mode = "segments";
          mseSourceBuffer.addEventListener("updateend", pushPacket);
        } else {
          readPacket(event.data);
        }
      };
    });

    videoEl.addEventListener("pause", () => {
      if (
        videoEl.currentTime >
        videoEl.buffered.end(videoEl.buffered.length - 1)
      ) {
        videoEl.currentTime =
          videoEl.buffered.end(videoEl.buffered.length - 1) - 0.1;
        videoEl.play();
      }
    });
  }, []);

  const pushPacket = () => {
    if (!mseSourceBuffer.updating && mseQueue.length > 0) {
      const packet = mseQueue.shift();
      if (packet) mseSourceBuffer.appendBuffer(packet);
    } else {
      mseStreamingStarted = false;
    }

    if (videoRef.current && videoRef.current.buffered.length > 0) {
      if (document.hidden) {
        videoRef.current.currentTime =
          videoRef.current.buffered.end(videoRef.current.buffered.length - 1) - 0.5;
      }
    }
  };

  const readPacket = (packet: ArrayBuffer) => {
    if (!mseStreamingStarted) {
      mseSourceBuffer.appendBuffer(packet);
      mseStreamingStarted = true;
      return;
    }
    mseQueue.push(new Uint8Array(packet));
    if (!mseSourceBuffer.updating) {
      pushPacket();
    }
  };

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        controls
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
    </div>
  );
};

export default RTSPtoWebMSE;
