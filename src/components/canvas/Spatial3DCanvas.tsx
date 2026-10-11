import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { CustomBrewConfig } from '../../types/spatial';

interface Spatial3DCanvasProps {
  currentSection: number;
  customConfig?: CustomBrewConfig;
  onError?: () => void;
  isReducedMotion?: boolean;
}

export const Spatial3DCanvas: React.FC<Spatial3DCanvasProps> = ({
  currentSection,
  customConfig,
  onError,
  isReducedMotion = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const cupGroupRef = useRef<THREE.Group | null>(null);
  const frothMeshRef = useRef<THREE.Mesh | null>(null);
  const liquidMeshRef = useRef<THREE.Mesh | null>(null);
  const steamParticlesRef = useRef<THREE.Points | null>(null);
  const goldFlakesRef = useRef<THREE.Points | null>(null);
  const beansGroupRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: false
      });
    } catch (err) {
      console.warn('WebGL initialization failed, switching to 2.5D Spatial mode:', err);
      onError?.();
      return;
    }

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      console.warn('WebGL context lost');
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      onError?.();
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost, false);

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.2, 5.5);
    cameraRef.current = camera;

    // --- LUXURY STUDIO LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffeedd, 1.4);
    scene.add(ambientLight);

    const keySpot = new THREE.SpotLight(0xfff0db, 5.5);
    keySpot.position.set(4.5, 8, 5.5);
    keySpot.angle = Math.PI / 4;
    keySpot.penumbra = 0.5;
    keySpot.castShadow = true;
    keySpot.shadow.mapSize.width = 2048;
    keySpot.shadow.mapSize.height = 2048;
    keySpot.shadow.bias = -0.0001;
    scene.add(keySpot);

    // Gold Rim Backlight
    const goldRimLight = new THREE.PointLight(0xdfb17b, 4.0, 12);
    goldRimLight.position.set(-3.5, 2.5, -2.5);
    scene.add(goldRimLight);

    // Warm Bronze Fill Light
    const fillLight = new THREE.DirectionalLight(0xc89666, 1.2);
    fillLight.position.set(0, -3, 3);
    scene.add(fillLight);

    // --- SPATIAL COFFEE CUP ASSEMBLY ---
    const cupGroup = new THREE.Group();
    cupGroupRef.current = cupGroup;
    scene.add(cupGroup);

    // 1. Saucer with 24k Gold Foil Edge
    const saucerGeo = new THREE.CylinderGeometry(1.45, 0.95, 0.12, 64);
    const porcelainMat = new THREE.MeshPhysicalMaterial({
      color: 0x0d0b09,
      roughness: 0.1,
      metalness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 0.95
    });
    const saucer = new THREE.Mesh(saucerGeo, porcelainMat);
    saucer.position.y = -0.6;
    saucer.receiveShadow = true;
    saucer.castShadow = true;
    cupGroup.add(saucer);

    // 24k Metallic Gold Foil Rim
    const saucerRimGeo = new THREE.TorusGeometry(1.44, 0.025, 16, 64);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf5cb98,
      metalness: 0.95,
      roughness: 0.15
    });
    const saucerRim = new THREE.Mesh(saucerRimGeo, goldMat);
    saucerRim.rotation.x = Math.PI / 2;
    saucerRim.position.y = -0.535;
    cupGroup.add(saucerRim);

    // 2. Cup Body (Obsidian Porcelain with Gold Inlay)
    const cupGeo = new THREE.LatheGeometry(
      [
        new THREE.Vector2(0.6, -0.5),
        new THREE.Vector2(0.82, -0.3),
        new THREE.Vector2(0.96, 0.3),
        new THREE.Vector2(1.0, 0.7),
        new THREE.Vector2(0.92, 0.7),
        new THREE.Vector2(0.87, 0.3),
        new THREE.Vector2(0.72, -0.3),
        new THREE.Vector2(0.55, -0.45)
      ],
      64
    );
    const cupMesh = new THREE.Mesh(cupGeo, porcelainMat);
    cupMesh.castShadow = true;
    cupMesh.receiveShadow = true;
    cupGroup.add(cupMesh);

    // Cup Handle
    const handleGeo = new THREE.TorusGeometry(0.35, 0.07, 16, 32, Math.PI * 1.2);
    const handle = new THREE.Mesh(handleGeo, porcelainMat);
    handle.position.set(0.96, 0.15, 0);
    handle.rotation.z = -Math.PI / 6;
    handle.castShadow = true;
    cupGroup.add(handle);

    // Handle Gold Band
    const handleGoldGeo = new THREE.TorusGeometry(0.355, 0.015, 16, 32, Math.PI * 1.2);
    const handleGold = new THREE.Mesh(handleGoldGeo, goldMat);
    handleGold.position.set(0.96, 0.15, 0);
    handleGold.rotation.z = -Math.PI / 6;
    cupGroup.add(handleGold);

    // Cup Lip Gold Rim
    const cupGoldRimGeo = new THREE.TorusGeometry(0.985, 0.022, 16, 64);
    const cupGoldRim = new THREE.Mesh(cupGoldRimGeo, goldMat);
    cupGoldRim.rotation.x = Math.PI / 2;
    cupGoldRim.position.y = 0.705;
    cupGroup.add(cupGoldRim);

    // 3. Liquid Espresso Surface (Deep Crema Texture)
    const liquidGeo = new THREE.CircleGeometry(0.92, 64);
    const liquidMat = new THREE.MeshStandardMaterial({
      color: 0x241711,
      roughness: 0.2,
      metalness: 0.08
    });
    const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
    liquidMesh.rotation.x = -Math.PI / 2;
    liquidMesh.position.y = 0.62;
    liquidMeshRef.current = liquidMesh;
    cupGroup.add(liquidMesh);

    // 4. Velvet Microfoam Froth Layer
    const frothGeo = new THREE.CircleGeometry(0.91, 64);
    const frothMat = new THREE.MeshStandardMaterial({
      color: 0xf9f3ea,
      roughness: 0.8,
      metalness: 0.0,
      transparent: true,
      opacity: 0.9
    });
    const frothMesh = new THREE.Mesh(frothGeo, frothMat);
    frothMesh.rotation.x = -Math.PI / 2;
    frothMesh.position.y = 0.64;
    frothMesh.visible = false;
    frothMeshRef.current = frothMesh;
    cupGroup.add(frothMesh);

    // --- STEAM PARTICLES ---
    const steamCount = 40;
    const steamGeo = new THREE.BufferGeometry();
    const steamPositions = new Float32Array(steamCount * 3);

    for (let i = 0; i < steamCount; i++) {
      steamPositions[i * 3] = (Math.random() - 0.5) * 0.8;
      steamPositions[i * 3 + 1] = 0.7 + Math.random() * 1.6;
      steamPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
    }

    steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));

    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255,243,230,0.65)');
      grad.addColorStop(0.5, 'rgba(245,203,152,0.25)');
      grad.addColorStop(1, 'rgba(245,203,152,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }
    const steamTexture = new THREE.CanvasTexture(canvas);

    const steamMat = new THREE.PointsMaterial({
      size: 0.38,
      map: steamTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.4
    });

    const steamParticles = new THREE.Points(steamGeo, steamMat);
    steamParticlesRef.current = steamParticles;
    cupGroup.add(steamParticles);

    // --- FLOATING 24K GOLD DUST PARTICLES ---
    const flakeCount = isReducedMotion ? 15 : 45;
    const flakeGeo = new THREE.BufferGeometry();
    const flakePositions = new Float32Array(flakeCount * 3);

    for (let i = 0; i < flakeCount; i++) {
      flakePositions[i * 3] = (Math.random() - 0.5) * 6;
      flakePositions[i * 3 + 1] = (Math.random() - 0.5) * 4 + 1;
      flakePositions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    flakeGeo.setAttribute('position', new THREE.BufferAttribute(flakePositions, 3));

    const flakeCanvas = document.createElement('canvas');
    flakeCanvas.width = 32;
    flakeCanvas.height = 32;
    const flakeCtx = flakeCanvas.getContext('2d');
    if (flakeCtx) {
      const g = flakeCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      g.addColorStop(0, 'rgba(245, 203, 152, 0.9)');
      g.addColorStop(0.5, 'rgba(223, 177, 123, 0.4)');
      g.addColorStop(1, 'rgba(223, 177, 123, 0)');
      flakeCtx.fillStyle = g;
      flakeCtx.fillRect(0, 0, 32, 32);
    }
    const flakeTex = new THREE.CanvasTexture(flakeCanvas);

    const flakeMat = new THREE.PointsMaterial({
      size: 0.15,
      map: flakeTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.7
    });

    const goldFlakes = new THREE.Points(flakeGeo, flakeMat);
    goldFlakesRef.current = goldFlakes;
    scene.add(goldFlakes);

    // --- FLOATING COFFEE BEANS WITH GOLD SHEEN ---
    const beansGroup = new THREE.Group();
    beansGroupRef.current = beansGroup;
    scene.add(beansGroup);

    const createBeanGeo = () => {
      const beanShape = new THREE.SphereGeometry(0.12, 16, 12);
      beanShape.scale(1.0, 1.4, 0.65);
      return beanShape;
    };

    const beanMat = new THREE.MeshStandardMaterial({
      color: 0x331e13,
      roughness: 0.35,
      metalness: 0.2
    });

    const beanCount = isReducedMotion ? 6 : 14;
    for (let i = 0; i < beanCount; i++) {
      const bean = new THREE.Mesh(createBeanGeo(), beanMat);
      const radius = 2.4 + Math.random() * 1.6;
      const angle = (i / beanCount) * Math.PI * 2;
      const height = (Math.random() - 0.5) * 2.5;

      bean.position.set(
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius - 1.0
      );
      bean.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      bean.userData = {
        rotSpeed: (Math.random() - 0.5) * 0.015
      };

      beansGroup.add(bean);
    }

    // --- MOUSE & RESIZE EVENTS ---
    const handleMouseMove = (e: MouseEvent) => {
      if (isReducedMotion) return;
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = normX;
      mouseRef.current.targetY = normY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // --- ANIMATION RENDER LOOP ---
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

      if (cupGroupRef.current && !isReducedMotion) {
        cupGroupRef.current.rotation.y = Math.sin(elapsedTime * 0.4) * 0.12 + mouseRef.current.x * 0.22;
        cupGroupRef.current.rotation.x = Math.cos(elapsedTime * 0.3) * 0.06 - mouseRef.current.y * 0.12;
        cupGroupRef.current.position.y = Math.sin(elapsedTime * 1.1) * 0.07;
      }

      // Steam animation
      if (steamParticlesRef.current) {
        const pos = steamParticlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < steamCount; i++) {
          pos[i * 3 + 1] += 0.005;
          pos[i * 3] += Math.sin(elapsedTime * 1.8 + i) * 0.0015;
          if (pos[i * 3 + 1] > 2.5) {
            pos[i * 3 + 1] = 0.7;
            pos[i * 3] = (Math.random() - 0.5) * 0.8;
          }
        }
        steamParticlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Gold Flakes drifting animation
      if (goldFlakesRef.current && !isReducedMotion) {
        const pos = goldFlakesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < flakeCount; i++) {
          pos[i * 3 + 1] += Math.sin(elapsedTime * 0.8 + i) * 0.002;
          pos[i * 3] += Math.cos(elapsedTime * 0.5 + i) * 0.0015;
        }
        goldFlakesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Coffee beans animation
      if (beansGroupRef.current && !isReducedMotion) {
        beansGroupRef.current.children.forEach((b) => {
          b.rotation.x += b.userData.rotSpeed;
          b.rotation.y += b.userData.rotSpeed * 0.8;
          b.position.y += Math.sin(elapsedTime * 1.2 + b.position.x) * 0.0015;
        });
      }

      // Camera lerp by section
      if (cameraRef.current) {
        let targetCamPos = { x: 0, y: 1.2, z: 5.5 };
        let targetLookAt = { x: 0, y: 0, z: 0 };

        if (currentSection === 1) {
          targetCamPos = { x: 0, y: 2.2, z: 6.2 };
          targetLookAt = { x: 0, y: -0.5, z: 0 };
        } else if (currentSection === 2) {
          targetCamPos = { x: 1.6, y: 1.1, z: 3.8 };
          targetLookAt = { x: 0, y: 0.2, z: 0 };
        } else if (currentSection === 3) {
          targetCamPos = { x: -1.8, y: 1.5, z: 5.0 };
          targetLookAt = { x: 0, y: 0, z: 0 };
        } else if (currentSection === 4) {
          targetCamPos = { x: 0, y: 3.2, z: 4.8 };
          targetLookAt = { x: 0, y: -0.2, z: 0 };
        }

        targetCamPos.x += mouseRef.current.x * 0.35;
        targetCamPos.y += mouseRef.current.y * 0.25;

        cameraRef.current.position.x += (targetCamPos.x - cameraRef.current.position.x) * 0.04;
        cameraRef.current.position.y += (targetCamPos.y - cameraRef.current.position.y) * 0.04;
        cameraRef.current.position.z += (targetCamPos.z - cameraRef.current.position.z) * 0.04;

        cameraRef.current.lookAt(targetLookAt.x, targetLookAt.y, targetLookAt.z);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);

      saucerGeo.dispose();
      porcelainMat.dispose();
      saucerRimGeo.dispose();
      goldMat.dispose();
      cupGeo.dispose();
      handleGeo.dispose();
      handleGoldGeo.dispose();
      cupGoldRimGeo.dispose();
      liquidGeo.dispose();
      liquidMat.dispose();
      frothGeo.dispose();
      frothMat.dispose();
      steamGeo.dispose();
      steamMat.dispose();
      steamTexture.dispose();
      flakeGeo.dispose();
      flakeMat.dispose();
      flakeTex.dispose();
      beanMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isReducedMotion, onError]);

  useEffect(() => {
    if (!customConfig) return;
    if (liquidMeshRef.current) {
      const liquidMat = liquidMeshRef.current.material as THREE.MeshStandardMaterial;
      if (customConfig.roastLevel === 'light-golden') {
        liquidMat.color.setHex(0x5c3d2e);
      } else if (customConfig.roastLevel === 'medium-velvet') {
        liquidMat.color.setHex(0x382219);
      } else {
        liquidMat.color.setHex(0x140d0a);
      }
    }
    if (frothMeshRef.current) {
      frothMeshRef.current.visible = customConfig.milk !== 'none';
    }
  }, [customConfig]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden w-full h-full"
      aria-hidden="true"
    />
  );
};
