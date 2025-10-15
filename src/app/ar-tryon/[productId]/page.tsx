"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Camera, Loader2 } from "lucide-react";
import { PoseLandmarker, FilesetResolver, DrawingUtils } from "@mediapipe/tasks-vision";

export default function ARTryOnPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.productId as string;

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const poseLandmarkerRef = useRef<PoseLandmarker | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(0);
  const garmentImageRef = useRef<HTMLImageElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [product, setProduct] = useState<any>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [garmentLoaded, setGarmentLoaded] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>("");

  // Target FPS for pose detection (lower = better performance)
  const TARGET_FPS = 15;
  const FRAME_INTERVAL = 1000 / TARGET_FPS;

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setDebugInfo("Fetching product...");
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) throw new Error("Product not found");
        const data = await response.json();
        setProduct(data);
        setDebugInfo(`Product loaded: ${data.name}`);

        // Preload garment image
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          garmentImageRef.current = img;
          setGarmentLoaded(true);
          setDebugInfo(prev => prev + " | Garment image loaded ✓");
        };
        img.onerror = (e) => {
          console.error("Failed to load garment image:", e);
          setDebugInfo(prev => prev + " | Garment load failed ✗");
        };
        img.src = data.image;
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product");
      }
    };
    fetchProduct();
  }, [productId]);

  // Initialize MediaPipe
  useEffect(() => {
    const initializePoseLandmarker = async () => {
      try {
        setDebugInfo(prev => prev + " | Initializing MediaPipe...");
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

        const poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numPoses: 1,
          minPoseDetectionConfidence: 0.5,
          minPosePresenceConfidence: 0.5,
          minTrackingConfidence: 0.5
        });

        poseLandmarkerRef.current = poseLandmarker;
        setDebugInfo(prev => prev + " | MediaPipe ready ✓");
        setIsInitializing(false);
      } catch (err) {
        console.error("Failed to initialize MediaPipe:", err);
        setError("Failed to initialize AR system");
        setIsInitializing(false);
      }
    };

    initializePoseLandmarker();

    return () => {
      if (poseLandmarkerRef.current) {
        poseLandmarkerRef.current.close();
      }
    };
  }, []);

  const startCamera = async () => {
    if (!poseLandmarkerRef.current) {
      setError("AR system not ready");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      setDebugInfo(prev => prev + " | Requesting camera...");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user"
        },
        audio: false
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        await new Promise<void>((resolve, reject) => {
          if (!videoRef.current) {
            reject(new Error("Video ref lost"));
            return;
          }

          videoRef.current.onloadedmetadata = () => {
            if (videoRef.current) {
              videoRef.current.play()
                .then(() => {
                  setDebugInfo(prev => prev + " | Camera active ✓");
                  setIsCameraActive(true);
                  setIsProcessing(false);
                  resolve();
                  // Start detection
                  requestAnimationFrame(() => detectPose());
                })
                .catch(reject);
            }
          };

          // Timeout after 10 seconds
          setTimeout(() => reject(new Error("Metadata load timeout")), 10000);
        });
      }
    } catch (err: any) {
      console.error("Camera error:", err);
      setError(err.message || "Failed to access camera");
      setIsProcessing(false);
      setDebugInfo(prev => prev + ` | Camera error: ${err.message}`);
    }
  };

  const detectPose = () => {
    if (!videoRef.current || !canvasRef.current || !poseLandmarkerRef.current) {
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      animationFrameRef.current = requestAnimationFrame(detectPose);
      return;
    }

    // Wait for video to have data
    if (video.readyState < video.HAVE_CURRENT_DATA) {
      animationFrameRef.current = requestAnimationFrame(detectPose);
      return;
    }

    // Throttle to target FPS
    const now = performance.now();
    const elapsed = now - lastFrameTimeRef.current;

    if (elapsed < FRAME_INTERVAL) {
      animationFrameRef.current = requestAnimationFrame(detectPose);
      return;
    }

    lastFrameTimeRef.current = now;

    // Set canvas size to match video
    if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }

    // Draw video frame
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    try {
      // Detect pose
      const results = poseLandmarkerRef.current.detectForVideo(video, now);
      
      if (results.landmarks && results.landmarks.length > 0) {
        const landmarks = results.landmarks[0];

        // Draw pose skeleton
        const drawingUtils = new DrawingUtils(ctx);
        drawingUtils.drawLandmarks(landmarks, {
          radius: (data) => DrawingUtils.lerp(data.from!.z, -0.15, 0.1, 5, 1),
          color: "rgba(255, 0, 0, 0.8)"
        });
        drawingUtils.drawConnectors(
          landmarks,
          PoseLandmarker.POSE_CONNECTIONS,
          { color: "rgba(0, 255, 0, 0.8)", lineWidth: 3 }
        );

        // Overlay garment if loaded
        if (garmentImageRef.current && garmentLoaded) {
          const leftShoulder = landmarks[11];
          const rightShoulder = landmarks[12];
          const leftHip = landmarks[23];
          const rightHip = landmarks[24];

          if (leftShoulder && rightShoulder && leftHip && rightHip) {
            // Calculate dimensions
            const shoulderMidX = ((leftShoulder.x + rightShoulder.x) / 2) * canvas.width;
            const shoulderMidY = ((leftShoulder.y + rightShoulder.y) / 2) * canvas.height;
            const hipMidY = ((leftHip.y + rightHip.y) / 2) * canvas.height;
            
            const shoulderWidth = Math.abs(rightShoulder.x - leftShoulder.x) * canvas.width;
            const torsoHeight = hipMidY - shoulderMidY;

            const garmentWidth = shoulderWidth * 2;
            const garmentHeight = torsoHeight * 2;

            // Draw with transparency
            ctx.globalAlpha = 0.8;
            ctx.drawImage(
              garmentImageRef.current,
              shoulderMidX - garmentWidth / 2,
              shoulderMidY - garmentHeight * 0.1,
              garmentWidth,
              garmentHeight
            );
            ctx.globalAlpha = 1.0;
          }
        }
      }
    } catch (err) {
      // Silently handle detection errors
    }

    ctx.restore();

    // Continue loop
    animationFrameRef.current = requestAnimationFrame(detectPose);
  };

  const stopCamera = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsCameraActive(false);
    setDebugInfo(prev => prev + " | Camera stopped");
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Product
          </Button>
          <h1 className="text-2xl font-bold">AR Virtual Try-On</h1>
        </div>

        {/* Product Info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <h2 className="font-semibold text-lg">{product.name}</h2>
              <p className="text-muted-foreground">${product.price}</p>
            </div>
            {garmentLoaded && (
              <span className="text-sm text-green-600 dark:text-green-400">
                ✓ Garment Ready
              </span>
            )}
          </div>
        </div>

        {/* Debug Info */}
        {debugInfo && (
          <div className="bg-gray-100 dark:bg-gray-800 rounded p-2 mb-4 text-xs font-mono overflow-x-auto">
            {debugInfo}
          </div>
        )}

        {/* AR View */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <div className="relative aspect-video bg-gray-100 dark:bg-gray-950 rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ display: "none" }}
              playsInline
              muted
              autoPlay
            />
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full object-contain"
            />
            {!isCameraActive && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <Camera className="h-16 w-16 text-gray-400" />
                <p className="text-gray-500">Camera not active</p>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="mt-6 flex gap-4 justify-center">
            {!isCameraActive ? (
              <Button
                size="lg"
                onClick={startCamera}
                disabled={isProcessing || isInitializing || !garmentLoaded}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Starting Camera...
                  </>
                ) : isInitializing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Initializing AR...
                  </>
                ) : !garmentLoaded ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Loading Garment...
                  </>
                ) : (
                  <>
                    <Camera className="mr-2 h-5 w-5" />
                    Start Camera
                  </>
                )}
              </Button>
            ) : (
              <Button size="lg" variant="destructive" onClick={stopCamera}>
                Stop Camera
              </Button>
            )}
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
              {error}
            </div>
          )}

          {/* Instructions */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">
              How to use:
            </h3>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Click "Start Camera" to begin</li>
              <li>• Stand in front of your camera with good lighting</li>
              <li>• Face the camera directly for best results</li>
              <li>• The garment will overlay on your torso automatically</li>
              <li>• Green lines show your detected pose skeleton</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}