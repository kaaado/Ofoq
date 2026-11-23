import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Sparkles, Loader2, Volume2, Shield } from 'lucide-react';

interface Nour3DCanvasProps {
  mode?: 'idle' | 'greeting' | 'calm' | 'talking' | 'listening';
  theme?: 'space' | 'nature' | 'ocean' | 'creative';
  isAr?: boolean;
  onModelLoaded?: () => void;
  className?: string;
}

export const Nour3DCanvas: React.FC<Nour3DCanvasProps> = ({
  mode = 'idle',
  theme = 'space',
  isAr = false,
  onModelLoaded,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [showAttribution, setShowAttribution] = useState<boolean>(false);

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

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.6, 3.8);

    // 3. Renderer with power-efficient settings
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
    const ambientLight = new THREE.AmbientLight(currentTheme.ambient, 2.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(currentTheme.key, 3.0);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(currentTheme.accent, 2.0, 10);
    rimLight.position.set(-2, 2, -2);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 1.5);
    fillLight.position.set(0, -2, 2);
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
        const scale = 2.0 / maxDim;
        baseScaleRef.current = scale;
        model.scale.set(scale, scale, scale);

        // Center on X and Z, adjust Y so it rests on floor plane
        model.position.x = -center.x * scale;
        model.position.y = -center.y * scale - 0.15;
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

    // 7. Pointer tracking for interactive eye contact
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current = { x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) };
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // 8. Render Loop
    let clock = new THREE.Clock();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      if (modelRef.current) {
        if (!prefersReducedMotion) {
          // Floating idle bobbing
          const baseY = -0.15;
          const bobSpeed = mode === 'calm' ? 1.0 : mode === 'talking' ? 3.5 : 1.8;
          const bobAmplitude = mode === 'calm' ? 0.03 : mode === 'talking' ? 0.07 : 0.05;
          modelRef.current.position.y = baseY + Math.sin(elapsedTime * bobSpeed) * bobAmplitude;

          // Head / body tilt following visitor's cursor
          const targetRotY = mouseRef.current.x * 0.35;
          const targetRotX = -mouseRef.current.y * 0.2;
          modelRef.current.rotation.y += (targetRotY - modelRef.current.rotation.y) * 0.06;
          modelRef.current.rotation.x += (targetRotX - modelRef.current.rotation.x) * 0.06;

          // Mode-specific micro-animations
          if (mode === 'talking') {
            // Subtle expressive head nod and side bounce
            modelRef.current.rotation.z = Math.sin(elapsedTime * 8) * 0.04;
          } else if (mode === 'listening') {
            // Attentive inquisitive tilt
            modelRef.current.rotation.z = 0.08;
          } else if (mode === 'calm') {
            // Soothing symmetric breathing scale
            const breathe = 1 + Math.sin(elapsedTime * 1.2) * 0.02;
            modelRef.current.scale.setScalar(baseScaleRef.current * breathe);
            modelRef.current.rotation.z = 0;
          } else {
            modelRef.current.rotation.z = Math.sin(elapsedTime * 1.5) * 0.015;
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
    <div className={`relative w-full h-[320px] sm:h-[380px] flex items-center justify-center select-none ${className}`}>
      {/* Three.js WebGL Container */}
      <div
        ref={containerRef}
        className={`w-full h-full transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        aria-label="3D Nour Companion Model"
      />

      {/* Loading & Fallback State */}
      {(!isLoaded || hasError) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-3 z-10">
          {/* Animated 3D/CSS Companion Fallback with glowing aura */}
          <div className="relative">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#172B46] via-[#2868C7] to-[#D8BE83] p-1 shadow-xl animate-pulse">
              <div className="w-full h-full rounded-full bg-[#172B46] flex items-center justify-center text-4xl sm:text-5xl border border-white/20">
                🤖
              </div>
            </div>
            {/* Orbital Rings */}
            <div className="absolute -inset-3 rounded-full border border-[#2868C7]/40 animate-spin" style={{ animationDuration: '12s' }} />
            <div className="absolute -inset-6 rounded-full border border-dashed border-[#D8BE83]/30 animate-spin" style={{ animationDuration: '24s', animationDirection: 'reverse' }} />
          </div>

          {!hasError && (
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 justify-center text-xs font-bold text-[#172B46]">
                <Loader2 size={14} className="animate-spin text-[#2868C7]" />
                <span>
                  {isAr ? `جاري تحميل رفيق أفق 3D (${loadProgress}%)...` : `Chargement du compagnon 3D (${loadProgress}%)...`}
                </span>
              </div>
              <p className="text-[10px] text-[#5B6E85]">
                {isAr ? 'نموذج ثلاثي الأبعاد تفاعلي خفيف' : 'Modèle 3D interactif optimisé'}
              </p>
            </div>
          )}

          {hasError && (
            <div className="text-xs text-[#172B46] font-semibold bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#A9C5D8]/40 shadow-xs">
              {isAr ? 'رفيق أفق التفاعلي (النموذج البديل)' : 'Compagnon interactif OFOQ (Mode sécurisé)'}
            </div>
          )}
        </div>
      )}

      {/* Attribution & Legal CC-BY-4.0 Toggle Pill */}
      <div className="absolute bottom-2 end-2 z-20">
        <button
          type="button"
          onClick={() => setShowAttribution(!showAttribution)}
          className="text-[9px] bg-white/85 hover:bg-white text-[#172B46]/70 hover:text-[#172B46] px-2 py-0.5 rounded-full border border-[#A9C5D8]/40 shadow-xs transition-all flex items-center gap-1 cursor-pointer"
          title="Attribution 3D"
        >
          <span>3D Asset</span>
          <span className="text-[#2868C7] font-bold">CC-BY-4.0</span>
        </button>

        {showAttribution && (
          <div className="absolute bottom-6 end-0 w-64 p-2.5 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-[#A9C5D8]/40 text-[10px] text-[#172B46] space-y-1 text-start">
            <p className="font-bold">Bunny-Bot 3000</p>
            <p className="text-gray-500 text-[9px] leading-tight">
              By <span className="font-semibold">321_Blender</span> on Sketchfab, licensed under CC-BY-4.0 for commercial and non-commercial use with author attribution.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
