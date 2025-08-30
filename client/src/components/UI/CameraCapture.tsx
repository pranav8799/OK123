import React, { useRef, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, RotateCcw, Check } from 'lucide-react';

interface CameraCaptureProps {
  onCapture: (file: File) => void;
  capturedImage?: File | null;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, capturedImage }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');

  const startCamera = useCallback(async () => {
    try {
      setError('');
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsStreaming(true);
      }
    } catch (err) {
      setError('Unable to access camera. Please ensure camera permissions are granted.');
      console.error('Camera access error:', err);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsStreaming(false);
    }
  }, [stream]);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'selfie.jpg', { type: 'image/jpeg' });
        onCapture(file);
        stopCamera();
      }
    }, 'image/jpeg', 0.9);
  }, [onCapture, stopCamera]);

  const retakePhoto = useCallback(() => {
    startCamera();
  }, [startCamera]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Live Selfie Capture</h3>
      
      <div className="bg-muted border-2 border-dashed border-border rounded-lg p-8 text-center">
        {error && (
          <div className="text-destructive text-sm mb-4" data-testid="camera-error">
            {error}
          </div>
        )}
        
        {!isStreaming && !capturedImage && !error && (
          <>
            <Camera className="h-16 w-16 text-muted-foreground mb-4 mx-auto" />
            <p className="text-muted-foreground mb-4">
              Click to capture live selfie using your device camera
            </p>
            <Button
              onClick={startCamera}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-testid="start-camera"
            >
              <Camera className="mr-2 h-4 w-4" />
              Start Camera
            </Button>
          </>
        )}

        {isStreaming && (
          <div className="space-y-4">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full max-w-md mx-auto rounded-lg bg-black"
              data-testid="camera-preview"
            />
            <div className="flex justify-center space-x-4">
              <Button
                onClick={capturePhoto}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                data-testid="capture-photo"
              >
                <Camera className="mr-2 h-4 w-4" />
                Capture Photo
              </Button>
              <Button
                onClick={stopCamera}
                variant="outline"
                data-testid="cancel-camera"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {capturedImage && (
          <div className="space-y-4">
            <div className="flex items-center justify-center text-green-600">
              <Check className="h-6 w-6 mr-2" />
              <span className="font-medium">Selfie captured successfully!</span>
            </div>
            <div className="text-sm text-muted-foreground">
              File: {capturedImage.name}
            </div>
            <Button
              onClick={retakePhoto}
              variant="outline"
              data-testid="retake-photo"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Retake Photo
            </Button>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};

export default CameraCapture;
