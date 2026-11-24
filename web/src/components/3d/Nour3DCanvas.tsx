import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Sparkles, Loader2, Volume2, Shield, Bot } from 'lucide-react';
import { useSensoryPreferences } from '../../context/SensoryPreferencesContext';

interface Nour3DCanvasProps {
  mode?: 'idle' | 'greeting' | 'calm' | 'talking' | 'listening';
  theme?: 'space' | 'nature' | 'ocean' | 'creative';
  isAr?: boolean;
  lang?: 'ar' | 'fr' | 'en';
  onModelLoaded?: () => void;
  onClickCompanion?: () => void;
  className?: string;
}

// Theme-based lighting colors matching official palette
const themeColors = {
  space: { ambient: 0x172b46, key: 0x2868c7, accent: 0xd8be83 },
  nature: { ambient: 0x172b46, key: 0x2d7a58, accent: 0xd58c7a },
  ocean: { ambient: 0x172b46, key: 0x2868c7, accent: 0xa9c5d8 },
  creative: { ambient: 0x172b46, key: 0x9e4e3d, accent: 0xd8be83 }
};

export const Nour3DCanvas: React.FC<Nour3DCanvasProps> = ({
  mode = 'idle',
  theme = 'space',
  isAr = false,
  lang = 'fr',
  onModelLoaded,
  onClickCompanion,
  className = ''
}) => {
  const isEn = lang === 'en';
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const { effectiveReducedMotion } = useSensoryPreferences();

  // References for Three.js state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const baseScaleRef = useRef<number>(1.0);
  const animationFrameRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Mode and Theme mutable refs to eliminate WebGL teardown and model reloads!
  const modeRef = useRef(mode);
  const themeRef = useRef(theme);
  const effectiveReducedMotionRef = useRef(effectiveReducedMotion);
  const lightsRef = useRef<{ ambient: THREE.AmbientLight; key: THREE.DirectionalLight; rim: THREE.PointLight } | null>(null);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    effectiveReducedMotionRef.current = effectiveReducedMotion;
  }, [effectiveReducedMotion]);

  useEffect(() => {
    themeRef.current = theme;
    if (lightsRef.current) {
      const colors = themeColors[theme] || themeColors.space;
      lightsRef.current.ambient.color.setHex(colors.ambient);
      lightsRef.current.key.color.setHex(colors.key);
      lightsRef.current.rim.color.setHex(colors.accent);
    }
  }, [theme]);

  // One-time WebGL setup and GLTF loading
  useEffect(() => {
    let isCancelled = false;
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setHasError(true);
      return;
    }

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 340;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera - positioned level with clearance
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.1, 3.8);
    camera.lookAt(0, 0, 0);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting setup
    const initialThemeColors = themeColors[themeRef.current] || themeColors.space;
    const ambientLight = new THREE.AmbientLight(initialThemeColors.ambient, 2.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(initialThemeColors.key, 3.2);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(initialThemeColors.accent, 2.5, 12);
    rimLight.position.set(-2.5, 2.5, -2);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 1.6);
    fillLight.position.set(0, -2, 2.5);
    scene.add(fillLight);

    lightsRef.current = { ambient: ambientLight, key: keyLight, rim: rimLight };

    // 5. Load GLB Model ONCE
    const loader = new GLTFLoader();
    loader.load(
      '/models/bunny-bot_3000.glb',
      (gltf) => {
        if (isCancelled) return;
        const model = gltf.scene;
        modelRef.current = model;

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 1.70 / maxDim;
        baseScaleRef.current = scale;
        model.scale.set(scale, scale, scale);

        model.position.x = -center.x * scale;
        model.position.y = -center.y * scale - 0.58;
        model.position.z = -center.z * scale;

        scene.add(model);
        setIsLoaded(true);
        if (onModelLoaded) onModelLoaded();
      },
      (xhr) => {
        if (isCancelled) return;
        if (xhr.total > 0) {
          const percent = Math.min(Math.round((xhr.loaded / xhr.total) * 100), 100);
          setLoadProgress(percent);
        }
      },
      (error) => {
        if (isCancelled) return;
        console.warn('OFOQ: GLB Model loading deferred or unavailable, using 3D avatar fallback.', error);
        setHasError(true);
      }
    );

    // 6. IntersectionObserver to pause rendering when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // 7. Pointer tracking
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current = { x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) };
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    let hopOffset = 0;
    let hopVelocity = 0;
    const handleClickCompanion = () => {
      if (onClickCompanion) onClickCompanion();
      hopVelocity = 0.12;
    };
    container.addEventListener('click', handleClickCompanion);

    // 8. Animation loop reading mutable modeRef without re-init
    const startTime = performance.now();

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      const now = performance.now();
      const elapsedTime = (now - startTime) * 0.001;
      const currentMode = modeRef.current;
      const isReducedMotion = effectiveReducedMotionRef.current;

      // Handle tactile click physics hop
      if (hopVelocity > 0 || hopOffset > 0) {
        hopOffset += hopVelocity;
        hopVelocity -= 0.012;
        if (hopOffset <= 0) {
          hopOffset = 0;
          hopVelocity = 0;
        }
      }

      if (modelRef.current) {
        if (!isReducedMotion) {
          const baseY = -0.58 + hopOffset;

          if (currentMode === 'talking') {
            modelRef.current.position.y = baseY + Math.sin(elapsedTime * 9) * 0.06;
            modelRef.current.rotation.x = Math.sin(elapsedTime * 11) * 0.07;
            modelRef.current.rotation.z = Math.sin(elapsedTime * 7) * 0.05;
            const speakPulse = 1 + Math.sin(elapsedTime * 14) * 0.02;
            modelRef.current.scale.setScalar(baseScaleRef.current * speakPulse);
          } else if (currentMode === 'greeting') {
            modelRef.current.position.y = baseY + Math.sin(elapsedTime * 4) * 0.08;
            modelRef.current.rotation.z = Math.sin(elapsedTime * 5) * 0.09;
            modelRef.current.rotation.x = -0.05;
            modelRef.current.scale.setScalar(baseScaleRef.current);
          } else if (currentMode === 'listening') {
            modelRef.current.position.y = baseY + Math.sin(elapsedTime * 1.5) * 0.02;
            modelRef.current.rotation.z = 0.09;
            modelRef.current.rotation.x = 0.04;
            modelRef.current.scale.setScalar(baseScaleRef.current);
          } else if (currentMode === 'calm') {
            const breathe = 1 + Math.sin(elapsedTime * 1.2) * 0.025;
            modelRef.current.position.y = baseY + Math.sin(elapsedTime * 1.2) * 0.02;
            modelRef.current.scale.setScalar(baseScaleRef.current * breathe);
            modelRef.current.rotation.z = 0;
            modelRef.current.rotation.x = 0;
          } else {
            const bobSpeed = 1.8;
            const bobAmplitude = 0.04;
            modelRef.current.position.y = baseY + Math.sin(elapsedTime * bobSpeed) * bobAmplitude;
            modelRef.current.rotation.z = Math.sin(elapsedTime * 1.5) * 0.015;
            modelRef.current.scale.setScalar(baseScaleRef.current);
          }

          // Cursor eye-contact tracking
          const targetRotY = mouseRef.current.x * 0.35;
          const targetRotX = -mouseRef.current.y * 0.18;
          modelRef.current.rotation.y += (targetRotY - modelRef.current.rotation.y) * 0.06;
          if (currentMode !== 'talking' && currentMode !== 'greeting') {
            modelRef.current.rotation.x += (targetRotX - modelRef.current.rotation.x) * 0.06;
          }
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    // 9. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 320;
      const newH = container.clientHeight || 340;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      isCancelled = true;
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('click', handleClickCompanion);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

      if (modelRef.current) {
        modelRef.current.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            if (mesh.geometry) mesh.geometry.dispose();
            if (mesh.material) {
              if (Array.isArray(mesh.material)) {
                mesh.material.forEach((m) => m.dispose());
              } else {
                mesh.material.dispose();
              }
            }
          }
        });
      }
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []); // Run ONCE on mount!

  return (
    <div
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (onClickCompanion) onClickCompanion();
        }
      }}
      className={`relative w-full h-[320px] sm:h-[380px] flex items-center justify-center select-none cursor-pointer group focus-ring rounded-2xl ${className}`}
      title={isAr ? 'انقر للتفاعل مع باني' : isEn ? 'Click to interact with Bunny' : 'Cliquez pour interagir avec Bunny'}
      aria-label={isAr ? 'مجسم الرفيق نور ثلاثي الأبعاد، اضغط للتفاعل' : isEn ? '3D Nour Companion, press to interact' : 'Compagnon 3D Nour, appuyez pour interagir'}
    >
      {/* Three.js WebGL Container */}
      <div
        ref={containerRef}
        className={`w-full h-full transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        aria-label="3D Bunny Companion Model"
      />

      {/* Loading & Fallback State */}
      {(!isLoaded || hasError) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#172B46] to-[#1E3B60] text-center p-6 space-y-3 rounded-2xl">
          {hasError ? (
            <>
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-[#D8BE83] shadow-inner">
                <Bot size={36} />
              </div>
              <p className="text-xs font-bold text-white">
                {isAr ? 'الرفيق الافتراضي نور (وضع خفيف)' : 'Nour Companion (Lite 3D)'}
              </p>
              <p className="text-[11px] text-[#A9C5D8] max-w-xs">
                {isAr
                  ? 'جاهز للتفاعل الصوتي وبناء الجمل بصوت بشري طبيعي'
                  : 'Ready for interactive vocalization and calming routines'}
              </p>
            </>
          ) : (
            <>
              <Loader2 size={32} className="text-[#2868C7] animate-spin" />
              <p className="text-xs font-bold text-white">
                {isAr ? 'جاري تحضير الرفيق نور...' : 'Preparing Nour Companion...'}
              </p>
              <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#2868C7] to-[#D8BE83] transition-all duration-300"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
