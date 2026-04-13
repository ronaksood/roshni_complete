import React, { useEffect, useRef, useState } from 'react';
import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

const NECKLACES = [
  {
    id: 'gold-starburst',
    name: 'Gold Starburst',
    description: 'Aura Collection Pendant',
    svg: `<svg viewBox='0 0 200 150' xmlns='http://www.w3.org/2000/svg'><defs><filter id='glow' x='-20%' y='-20%' width='140%' height='140%'><feGaussianBlur stdDeviation='2' result='blur' /><feComposite in='SourceGraphic' in2='blur' operator='over' /></filter><filter id='shadow' x='-20%' y='-20%' width='140%' height='140%'><feDropShadow dx='0' dy='4' stdDeviation='4' flood-color='%23000' flood-opacity='0.6'/></filter></defs><path d='M 20 0 Q 100 110 180 0' fill='none' stroke='#FFD700' stroke-width='4' stroke-linecap='round' filter='url(#shadow)'/><path d='M 20 0 Q 100 110 180 0' fill='none' stroke='#FFF8B0' stroke-width='1.5' stroke-linecap='round' opacity='0.7'/><g filter='url(#shadow)'><circle cx='100' cy='65' r='16' fill='#FFD700'/><circle cx='100' cy='65' r='12' fill='#E5C100'/><polygon points='100,53 105,63 115,65 107,72 109,82 100,77 91,82 93,72 85,65 95,63' fill='#FFFFFF' filter='url(#glow)'/></g></svg>`
  },
  {
    id: 'trad-mangal',
    name: 'Traditional Mangalsutra',
    description: 'Classic Black Beads & Gold',
    svg: `<svg viewBox='0 0 200 150' xmlns='http://www.w3.org/2000/svg'><defs><filter id='shadow' x='-20%' y='-20%' width='140%' height='140%'><feDropShadow dx='0' dy='4' stdDeviation='4' flood-color='%23000' flood-opacity='0.6'/></filter></defs><path d='M 20 0 Q 100 110 180 0' fill='none' stroke='#111111' stroke-width='3' stroke-dasharray='4 3' filter='url(#shadow)'/><path d='M 25 0 Q 100 100 175 0' fill='none' stroke='#FFD700' stroke-width='1.5' filter='url(#shadow)'/><g filter='url(#shadow)'><path d='M 80 60 C 80 80, 120 80, 120 60 Z' fill='#FFD700'/><circle cx='100' cy='70' r='4' fill='#111111'/><circle cx='90' cy='62' r='3' fill='#111111'/><circle cx='110' cy='62' r='3' fill='#111111'/></g></svg>`
  },
  {
    id: 'mod-mangal',
    name: 'Modern Mangalsutra',
    description: 'Minimalist Diamond Pendant',
    svg: `<svg viewBox='0 0 200 150' xmlns='http://www.w3.org/2000/svg'><defs><filter id='shadow' x='-20%' y='-20%' width='140%' height='140%'><feDropShadow dx='0' dy='4' stdDeviation='4' flood-color='%23000' flood-opacity='0.6'/></filter></defs><path d='M 20 0 Q 100 110 180 0' fill='none' stroke='#111111' stroke-width='2' stroke-dasharray='5 2' filter='url(#shadow)'/><g filter='url(#shadow)'><polygon points='100,55 110,65 100,75 90,65' fill='#E0F7FA' stroke='#B2EBF2' stroke-width='1'/><polygon points='100,58 106,65 100,72 94,65' fill='#FFFFFF'/></g></svg>`
  },
  {
    id: 'pearl-choker',
    name: 'Pearl Choker',
    description: 'Elegant White Pearls',
    svg: `<svg viewBox='0 0 200 150' xmlns='http://www.w3.org/2000/svg'><defs><filter id='shadow' x='-20%' y='-20%' width='140%' height='140%'><feDropShadow dx='0' dy='4' stdDeviation='4' flood-color='%23000' flood-opacity='0.6'/></filter></defs><path d='M 30 0 Q 100 80 170 0' fill='none' stroke='#F5F5F5' stroke-width='12' stroke-linecap='round' stroke-dasharray='1 14' filter='url(#shadow)'/><path d='M 30 0 Q 100 80 170 0' fill='none' stroke='#FFFFFF' stroke-width='6' stroke-linecap='round' stroke-dasharray='1 14' opacity='0.8'/></svg>`
  },
  {
    id: 'emerald-drop',
    name: 'Emerald Drop',
    description: 'Silver & Green Gemstone',
    svg: `<svg viewBox='0 0 200 150' xmlns='http://www.w3.org/2000/svg'><defs><filter id='shadow' x='-20%' y='-20%' width='140%' height='140%'><feDropShadow dx='0' dy='4' stdDeviation='4' flood-color='%23000' flood-opacity='0.6'/></filter></defs><path d='M 20 0 Q 100 110 180 0' fill='none' stroke='#E0E0E0' stroke-width='2' filter='url(#shadow)'/><g filter='url(#shadow)'><path d='M 100 55 C 110 70, 110 85, 100 90 C 90 85, 90 70, 100 55 Z' fill='#1B5E20' stroke='#81C784' stroke-width='1'/><path d='M 100 60 C 105 70, 105 80, 100 85 C 95 80, 95 70, 100 60 Z' fill='#4CAF50'/></g></svg>`
  },
  {
    id: 'ruby-kundan',
    name: 'Ruby Kundan',
    description: 'Heavy Gold & Red Stones',
    svg: `<svg viewBox='0 0 200 150' xmlns='http://www.w3.org/2000/svg'><defs><filter id='shadow' x='-20%' y='-20%' width='140%' height='140%'><feDropShadow dx='0' dy='4' stdDeviation='4' flood-color='%23000' flood-opacity='0.6'/></filter></defs><path d='M 20 0 Q 100 110 180 0' fill='none' stroke='#D4AF37' stroke-width='8' filter='url(#shadow)'/><path d='M 20 0 Q 100 110 180 0' fill='none' stroke='#B71C1C' stroke-width='4' stroke-dasharray='10 10' filter='url(#shadow)'/><g filter='url(#shadow)'><circle cx='100' cy='65' r='15' fill='#B71C1C' stroke='#D4AF37' stroke-width='3'/><circle cx='75' cy='52' r='10' fill='#B71C1C' stroke='#D4AF37' stroke-width='2'/><circle cx='125' cy='52' r='10' fill='#B71C1C' stroke='#D4AF37' stroke-width='2'/><circle cx='100' cy='65' r='5' fill='#FFFFFF'/></g></svg>`
  },
  {
    id: 'silver-heart',
    name: 'Silver Heart',
    description: 'Simple Silver Chain',
    svg: `<svg viewBox='0 0 200 150' xmlns='http://www.w3.org/2000/svg'><defs><filter id='shadow' x='-20%' y='-20%' width='140%' height='140%'><feDropShadow dx='0' dy='4' stdDeviation='4' flood-color='%23000' flood-opacity='0.6'/></filter></defs><path d='M 20 0 Q 100 110 180 0' fill='none' stroke='#BDBDBD' stroke-width='2' filter='url(#shadow)'/><g filter='url(#shadow)'><path d='M 100 65 C 100 65, 95 55, 85 55 C 75 55, 75 70, 85 80 L 100 95 L 115 80 C 125 70, 125 55, 115 55 C 105 55, 100 65, 100 65 Z' fill='#F5F5F5' stroke='#9E9E9E' stroke-width='1'/></g></svg>`
  }
];

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const necklaceRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [hasCameraAccess, setHasCameraAccess] = useState<boolean | null>(null);
  const [initError, setInitError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Smoothing state (using refs to avoid re-renders during animation loop)
  const smoothedState = useRef({
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0,
    initialized: false
  });

  useEffect(() => {
    let faceLandmarker: FaceLandmarker;
    let animationFrameId: number;
    let lastVideoTime = -1;
    let isUnmounted = false;

    const initializeMediaPipe = async () => {
      let timeoutId: ReturnType<typeof setTimeout>;
      try {
        // Add a timeout to catch hanging initialization
        const timeoutPromise = new Promise((_, reject) => {
          timeoutId = setTimeout(() => reject(new Error("MediaPipe initialization timed out after 30 seconds. Please check your network connection and try refreshing.")), 30000);
        });

        const initPromise = async () => {
          // Load the MediaPipe vision task WASM files
          const vision = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.34/wasm"
          );
          
          if (isUnmounted) return;

          // Initialize the Face Landmarker
          faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
            baseOptions: {
              modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
              delegate: "CPU"
            },
            outputFaceBlendshapes: false,
            runningMode: "VIDEO",
            numFaces: 1
          });
          
          if (isUnmounted) {
            faceLandmarker.close();
            return;
          }

          setIsModelLoaded(true);
          startCamera();
        };

        await Promise.race([initPromise(), timeoutPromise]);
      } catch (error: any) {
        if (isUnmounted) return;
        console.error("Error initializing MediaPipe:", error);
        setInitError(error.message || String(error));
      } finally {
        if (timeoutId!) clearTimeout(timeoutId);
      }
    };

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: "user"
          }
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play().then(() => {
              setHasCameraAccess(true);
              predictWebcam();
            }).catch(e => {
              console.error("Error playing video:", e);
              setInitError("Could not play video stream. Please ensure your browser allows autoplay for camera streams.");
            });
          };
        }
      } catch (error: any) {
        console.error("Error accessing camera:", error);
        setHasCameraAccess(false);
        setInitError(`Camera access failed: ${error.message || String(error)}. Please ensure you have granted camera permissions.`);
      }
    };

    const predictWebcam = () => {
      if (!videoRef.current || !faceLandmarker || !necklaceRef.current || !containerRef.current) return;

      const video = videoRef.current;
      const necklace = necklaceRef.current;
      const container = containerRef.current;

      // Only run detection if the video frame has updated
      if (video.currentTime !== lastVideoTime) {
        lastVideoTime = video.currentTime;
        const results = faceLandmarker.detectForVideo(video, performance.now());

        if (results.faceLandmarks && results.faceLandmarks.length > 0) {
          const landmarks = results.faceLandmarks[0];

          // 4. LANDMARK STRATEGY
          // 152: Chin bottom
          // 234: Left face edge
          // 454: Right face edge
          const chin = landmarks[152];
          const leftEdge = landmarks[234];
          const rightEdge = landmarks[454];

          // Calculate face width in normalized coordinates (0-1)
          const faceWidth = Math.sqrt(
            Math.pow(rightEdge.x - leftEdge.x, 2) + Math.pow(rightEdge.y - leftEdge.y, 2)
          );

          // 6. ROTATION CALCULATION
          // Calculate head tilt using atan2
          let angleRad = Math.atan2(rightEdge.y - leftEdge.y, rightEdge.x - leftEdge.x);
          let angleDeg = angleRad * (180 / Math.PI);
          
          // Because the video is mirrored horizontally via CSS scaleX(-1), 
          // we need to negate the angle to match the visual rotation.
          angleDeg = -angleDeg;

          // Get container dimensions to map normalized coordinates to pixels
          const rect = container.getBoundingClientRect();
          const videoWidth = video.videoWidth;
          const videoHeight = video.videoHeight;

          // Calculate object-fit: cover dimensions to correctly map coordinates
          const containerRatio = rect.width / rect.height;
          const videoRatio = videoWidth / videoHeight;

          let renderWidth, renderHeight, offsetX = 0, offsetY = 0;

          if (containerRatio > videoRatio) {
            renderWidth = rect.width;
            renderHeight = rect.width / videoRatio;
            offsetY = (rect.height - renderHeight) / 2;
          } else {
            renderHeight = rect.height;
            renderWidth = rect.height * videoRatio;
            offsetX = (rect.width - renderWidth) / 2;
          }

          // 5. POSITION CALCULATION
          // Map chin coordinates to screen pixels
          // Since video is mirrored, we invert the X coordinate (1 - x)
          const mirroredX = 1 - chin.x;
          
          const targetX = mirroredX * renderWidth + offsetX;
          const targetY = chin.y * renderHeight + offsetY;

          // Calculate scale based on face width
          // The necklace SVG chain width is roughly 160px.
          // We want the chain to attach slightly narrower than the full face width.
          const targetFaceWidthPx = faceWidth * renderWidth;
          const targetScale = (targetFaceWidthPx * 0.9) / 160;

          // 7. SMOOTHING (LERP)
          const alpha = 0.2; // Smoothing factor for premium feel
          const state = smoothedState.current;

          if (!state.initialized) {
            state.x = targetX;
            state.y = targetY;
            state.scale = targetScale;
            state.rotation = angleDeg;
            state.initialized = true;
          } else {
            state.x = state.x + (targetX - state.x) * alpha;
            state.y = state.y + (targetY - state.y) * alpha;
            state.scale = state.scale + (targetScale - state.scale) * alpha;
            
            // Handle rotation wrap-around for smooth interpolation
            let diff = angleDeg - state.rotation;
            while (diff < -180) diff += 360;
            while (diff > 180) diff -= 360;
            state.rotation = state.rotation + diff * alpha;
          }

          // 8. CSS TRANSFORM
          // We set transform-origin to 'top' (50% 0%) in the class.
          // 1. scale and rotate happen around the top-center.
          // 2. translate(-50%, 0) moves the top-center to the origin (0,0).
          // 3. translate(x, y) moves the top-center to the chin position.
          necklace.style.display = 'block';
          necklace.style.transform = `
            translate(${state.x}px, ${state.y}px)
            translate(-50%, 0%)
            rotate(${state.rotation}deg)
            scale(${state.scale})
          `;
        } else {
          // 11. EDGE CASE HANDLING: No face detected
          necklace.style.display = 'none';
          smoothedState.current.initialized = false;
        }
      }

      // 9. PERFORMANCE OPTIMIZATION: requestAnimationFrame loop
      animationFrameId = requestAnimationFrame(predictWebcam);
    };

    initializeMediaPipe();

    return () => {
      isUnmounted = true;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (faceLandmarker) faceLandmarker.close();
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-neutral-900 overflow-hidden flex items-center justify-center font-sans">
      {/* Loading State */}
      {!isModelLoaded && hasCameraAccess !== false && !initError && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-neutral-900/80 backdrop-blur-sm text-white">
          <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-medium tracking-wide">Loading AR Experience...</p>
        </div>
      )}

      {/* Error State */}
      {initError && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-neutral-900 text-white p-6 text-center">
          <div className="bg-red-500/20 p-4 rounded-full mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Initialization Error</h2>
          <p className="text-neutral-400 max-w-md break-all">
            {initError}
          </p>
        </div>
      )}

      {/* Camera Denied State */}
      {hasCameraAccess === false && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-neutral-900 text-white p-6 text-center">
          <div className="bg-red-500/20 p-4 rounded-full mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Camera Access Denied</h2>
          <p className="text-neutral-400 max-w-md">
            Please allow camera access in your browser settings to use the AR necklace try-on feature.
          </p>
        </div>
      )}

      {/* Main AR Container */}
      <div ref={containerRef} className="relative w-full max-w-md h-full max-h-[850px] mx-auto shadow-2xl overflow-hidden bg-black sm:rounded-3xl sm:h-[90vh]">
        
        {/* 1. Webcam Setup */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: 'scaleX(-1)' }}
          playsInline
          muted
        />

        {/* 3. Overlay System */}
        <div ref={overlayRef} className="absolute inset-0 pointer-events-none">
          {/* 12. VISUAL QUALITY: Premium SVG Necklace with drop shadow and glow */}
          <img
            ref={necklaceRef}
            src={`data:image/svg+xml;utf8,${encodeURIComponent(NECKLACES[selectedIndex].svg)}`}
            alt="AR Necklace"
            className="absolute top-0 left-0 w-[200px] h-[150px] origin-top hidden"
            style={{ 
              willChange: 'transform',
              filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.3))'
            }}
          />
        </div>

        {/* UI Overlay */}
        <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none flex flex-col justify-end">
          <div className="mb-4">
            <h1 className="text-white font-semibold text-lg tracking-wide">{NECKLACES[selectedIndex].name}</h1>
            <p className="text-amber-400/90 text-sm font-medium">{NECKLACES[selectedIndex].description}</p>
          </div>
          
          {/* Carousel */}
          <div className="flex gap-3 overflow-x-auto pb-2 snap-x pointer-events-auto" style={{ scrollbarWidth: 'none' }}>
            {NECKLACES.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setSelectedIndex(idx)}
                className={`relative flex-shrink-0 w-16 h-16 rounded-2xl border-2 overflow-hidden bg-neutral-800/50 backdrop-blur-md transition-all snap-center ${
                  selectedIndex === idx ? 'border-amber-400 scale-105 shadow-lg shadow-amber-400/20' : 'border-white/10 hover:border-white/30'
                }`}
              >
                <img 
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(item.svg)}`} 
                  alt={item.name}
                  className="w-full h-full object-contain p-2 drop-shadow-md" 
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
