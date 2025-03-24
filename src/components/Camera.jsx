import { useRef, useState, useEffect } from "react";
import "../styles/camera.css";

const Camera = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState(null);
  const [videoChunks, setVideoChunks] = useState([]);
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [flashEnabled, setFlashEnabled] = useState(false);

  useEffect(() => {
    startCamera(); // Camera starts ONLY when the page is opened

    return () => {
      stopCamera(); // Stop camera when leaving the page
    };
  }, [isFrontCamera]);

  const startCamera = async () => {
    try {
      const userStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: isFrontCamera ? "user" : "environment" },
      });
      videoRef.current.srcObject = userStream;
      setStream(userStream);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop()); // Stops the camera stream
      setStream(null);
    }
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    
    // Convert to image and save to local storage
    const imageUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `photo_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const startRecording = () => {
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setIsRecording(true);

    mediaRecorder.ondataavailable = (event) => {
      setVideoChunks((prev) => [...prev, event.data]);
    };
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);

    const videoBlob = new Blob(videoChunks, { type: "video/mp4" });
    const videoUrl = URL.createObjectURL(videoBlob);
    const link = document.createElement("a");
    link.href = videoUrl;
    link.download = `video_${Date.now()}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const flipCamera = () => {
    setIsFrontCamera((prev) => !prev);
  };

  const toggleFlash = () => {
    setFlashEnabled((prev) => !prev);
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      const capabilities = videoTrack.getCapabilities();
      if (capabilities.torch) {
        videoTrack.applyConstraints({ advanced: [{ torch: !flashEnabled }] });
      }
    }
  };

  return (
    <div className="camera-container">
      <video ref={videoRef} autoPlay className="camera-feed" />
      <canvas ref={canvasRef} className="capture-canvas" hidden></canvas>
      <div className="controls">
        <button onClick={toggleFlash} className="flash-btn">⚡</button>
        <button onClick={flipCamera} className="flip-btn">🔄</button>
        <button onClick={capturePhoto} className="capture-btn"></button>
        <button onClick={toggleRecording} className={isRecording ? "record-btn recording" : "record-btn"}></button>
      </div>
    </div>
  );
};

export default Camera;
