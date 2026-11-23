import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Sparkles, Loader2, Volume2, Shield, Bot } from 'lucide-react';

interface Nour3DCanvasProps {
  mode?: 'idle' | 'greeting' | 'calm' | 'talking' | 'listening';
  theme?: 'space' | 'nature' | 'ocean' | 'creative';
  isAr?: boolean;
  onModelLoaded?: () => void;
  onClickCompanion?: () => void;
  className?: string;
}

export const Nour3DCanvas: React.FC<Nour3DCanvasProps> = ({
  mode = 'idle',
  theme = 'space',
  isAr = false,
  onModelLoaded,
  onClickCompanion,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  // References for Three.js state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const baseScaleRef = useRef<number>(1.0);
  const animationFrameRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Theme-based lighting colors
  const themeColors = {
    space: { ambient: 0x172b46, key: 0x2868c7, accent: 0xd8be83, background: 0x0f1e32 },
    nature: { ambient: 0x1a3322, key: 0x34a853, accent: 0xd58c7a, background: 0x13261a },
    ocean: { ambient: 0x0e2a3a, key: 0x00a8cc, accent: 0xa9c5d8, background: 0x0a1c27 },
    creative: { ambient: 0x2d1a38, key: 0x9b51e0, accent: 0xd8be83, background: 0x201227 }
  };

  useEffect(() => {
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

    // 2. Camera - positioned with generous top headroom for rabbit ears
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.16, 4.1);
    camera.lookAt(0, -0.32, 0);

    // 3. Renderer with high performance & power efficiency
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
    const currentTheme = themeColors[theme] || themeColors.space;
    const ambientLight = new THREE.AmbientLight(currentTheme.ambient, 2.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(currentTheme.key, 3.2);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(currentTheme.accent, 2.5, 12);
    rimLight.position.set(-2.5, 2.5, -2);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 1.6);
    fillLight.position.set(0, -2, 2.5);
    scene.add(fillLight);

    // 5. Load GLB Model
    const loader = new GLTFLoader();
    loader.load(
      '/models/bunny-bot_3000.glb',
      (gltf) => {
        const model = gltf.scene;
        modelRef.current = model;

        // Auto-center and fit to viewing volume
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 1.62 / maxDim; // scaled down to guarantee ample top ear headroom
        baseScaleRef.current = scale;
        model.scale.set(scale, scale, scale);

        // Center on X and Z, adjust Y lower so it sits comfortably with full ear clearance
        model.position.x = -center.x * scale;
        model.position.y = -center.y * scale - 0.58;
        model.position.z = -center.z * scale;

        scene.add(model);
        setIsLoaded(true);
        if (onModelLoaded) onModelLoaded();
      },
      (xhr) => {
        if (xhr.total > 0) {
          const percent = Math.min(Math.round((xhr.loaded / xhr.total) * 100), 100);
          setLoadProgress(percent);
        }
      },
      (error) => {
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

    // 7. Pointer tracking for interactive eye contact & tactile click
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current = { x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) };
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const handleClickCompanion = () => {
      if (onClickCompanion) onClickCompanion();
      if (modelRef.current) {
        modelRef.current.position.y += 0.12;
        modelRef.current.rotation.z += 0.08;
      }
    };
    container.addEventListener('click', handleClickCompanion);
    container.style.cursor = 'pointer';

    // 8. High-Performance Render Loop using performance.now() (Zero Deprecation Warnings)
    const startTime = performance.now();
    let lastTime = startTime;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      const now = performance.now();
      const elapsedTime = (now - startTime) * 0.001;
      lastTime = now;

      if (modelRef.current) {
        if (!prefersReducedMotion) {
          // Base position - positioned lower to ensure head & ears have generous top clearance
          const baseY = -0.58;

          // Mode-specific animations
          if (mode === 'talking') {
            // Vivid talking animation: energetic head nod, body bob, and mouth/ear vibration
            modelRef.current.position.y = baseY + Math.sin(elapsedTime * 9) * 0.06;
            modelRef.current.rotation.x = Math.sin(elapsedTime * 11) * 0.07;
            modelRef.current.rotation.z = Math.sin(elapsedTime * 7) * 0.05;
            const speakPulse = 1 + Math.sin(elapsedTime * 14) * 0.02;
            modelRef.current.scale.setScalar(baseScaleRef.current * speakPulse);
          } else if (mode === 'greeting') {
            // Cheerful welcoming wave and friendly bounce
            modelRef.current.position.y = baseY + Math.sin(elapsedTime * 4) * 0.08;
            modelRef.current.rotation.z = Math.sin(elapsedTime * 5) * 0.09;
            modelRef.current.rotation.x = -0.05;
            modelRef.current.scale.setScalar(baseScaleRef.current);
          } else if (mode === 'listening') {
            // Attentive inquisitive tilt towards user
            modelRef.current.position.y = baseY + Math.sin(elapsedTime * 1.5) * 0.02;
            modelRef.current.rotation.z = 0.09;
            modelRef.current.rotation.x = 0.04;
            modelRef.current.scale.setScalar(baseScaleRef.current);
          } else if (mode === 'calm') {
            // Soothing symmetric breathing scale
            const breathe = 1 + Math.sin(elapsedTime * 1.2) * 0.025;
            modelRef.current.position.y = baseY + Math.sin(elapsedTime * 1.2) * 0.02;
            modelRef.current.scale.setScalar(baseScaleRef.current * breathe);
            modelRef.current.rotation.z = 0;
            modelRef.current.rotation.x = 0;
          } else {
            // Idle bobbing & tracking
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
          if (mode !== 'talking' && mode !== 'greeting') {
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
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('click', handleClickCompanion);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

      // Dispose Three.js resources
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
  }, [theme, mode]);

  return (
    <div
      onClick={onClickCompanion}
      className={`relative w-full h-[320px] sm:h-[380px] flex items-center justify-center select-none cursor-pointer group ${className}`}
      title={isAr ? 'انقر للتفاعل مع باني' : 'Cliquez pour interagir avec Bunny'}
    >
      {/* Three.js WebGL Container */}
      <div
        ref={containerRef}
        className={`w-full h-full transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        aria-label="3D Bunny Companion Model"
      />

      {/* Loading & Fallback State with High-Tech Glowing Aura */}
      {(!isLoaded || hasError) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-4 z-10 bg-white/60 backdrop-blur-xs rounded-2xl">
          {/* Animated 3D/CSS Companion Fallback with glowing aura */}
          <div className="relative">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#172B46] via-[#2868C7] to-[#D8BE83] p-1 shadow-2xl animate-pulse">
              <div className="w-full h-full rounded-full bg-[#172B46] flex items-center justify-center border border-white/20">
                <Bot size={44} className="text-[#D8BE83]" />
              </div>
            </div>
            {/* Orbital Rings */}
            <div className="absolute -inset-3 rounded-full border border-[#2868C7]/50 animate-spin" style={{ animationDuration: '10s' }} />
            <div className="absolute -inset-6 rounded-full border border-dashed border-[#D8BE83]/40 animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
          </div>

          {!hasError && (
            <div className="space-y-2 max-w-xs w-full">
              <div className="flex items-center gap-2 justify-center text-xs font-bold text-[#172B46]">
                <Loader2 size={16} className="animate-spin text-[#2868C7]" />
                <span>
                  {isAr ? `جاري تجهيز الرفيق باني (${loadProgress}%)...` : `Chargement de Bunny 3D (${loadProgress}%)...`}
                </span>
              </div>
              <div className="w-full bg-[#172B46]/10 h-2 rounded-full overflow-hidden p-0.5 border border-white/50">
                <div
                  className="bg-gradient-to-r from-[#2868C7] to-[#D8BE83] h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(loadProgress, 8)}%` }}
                />
              </div>
            </div>
          )}

          {hasError && (
            <div className="text-xs text-[#172B46] font-semibold bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-[#A9C5D8]/50 shadow-md">
              {isAr ? 'الرفيق باني التفاعلي (النموذج البديل)' : 'Compagnon interactif Bunny (Mode optimisé)'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
