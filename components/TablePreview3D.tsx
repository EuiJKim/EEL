'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// ─── Resin material property lookup ──────────────────────────────
interface ResinProps {
  transmission: number;
  roughness: number;
  opacity: number;
  clearcoat: number;
  ior: number;
}
const RESIN_PROPS: Record<string, ResinProps> = {
  'ocean-blue':   { transmission: 0.72, roughness: 0.02, opacity: 0.84, clearcoat: 1.0,  ior: 1.52 },
  'forest-green': { transmission: 0.50, roughness: 0.05, opacity: 0.88, clearcoat: 0.9,  ior: 1.50 },
  'amber-gold':   { transmission: 0.28, roughness: 0.08, opacity: 0.93, clearcoat: 0.8,  ior: 1.48 },
  'midnight':     { transmission: 0.04, roughness: 0.16, opacity: 0.97, clearcoat: 0.55, ior: 1.45 },
  'arctic':       { transmission: 0.82, roughness: 0.01, opacity: 0.80, clearcoat: 1.0,  ior: 1.56 },
  'sunset':       { transmission: 0.20, roughness: 0.10, opacity: 0.94, clearcoat: 0.7,  ior: 1.47 },
};

// ─── Size scale lookup ────────────────────────────────────────────
const SIZE_SCALE: Record<string, number> = {
  's':  0.72,
  'm':  1.0,
  'l':  1.28,
  'xl': 1.56,
};

// ─── Wood grain config ────────────────────────────────────────────
interface WoodConfig {
  baseColor: string;
  grainColor: string;
  grainAlpha: number;
  grainCount: number;
  roughness: number;
}
const WOOD_CONFIG: Record<string, WoodConfig> = {
  'walnut': { baseColor: '#3d2010', grainColor: '#1e0d05', grainAlpha: 0.35, grainCount: 48, roughness: 0.68 },
  'oak':    { baseColor: '#c8a050', grainColor: '#9a7430', grainAlpha: 0.20, grainCount: 30, roughness: 0.80 },
  'ash':    { baseColor: '#c0b498', grainColor: '#8a7860', grainAlpha: 0.15, grainCount: 35, roughness: 0.75 },
  'pine':   { baseColor: '#18120a', grainColor: '#0a0702', grainAlpha: 0.30, grainCount: 25, roughness: 0.60 },
};

// ─── Procedural wood grain texture ───────────────────────────────
function makeWoodTexture(woodId?: string): THREE.CanvasTexture {
  const cfg = WOOD_CONFIG[woodId ?? ''] ?? WOOD_CONFIG['oak'];
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = cfg.baseColor;
  ctx.fillRect(0, 0, 512, 256);

  // Deterministic RNG seeded by woodId
  const seed = (woodId ?? 'oak').split('').reduce((a, c) => a + c.charCodeAt(0), 42);
  let rng = seed;
  const rand = () => {
    rng = (rng * 1664525 + 1013904223) & 0xffffffff;
    return (rng >>> 0) / 0xffffffff;
  };

  for (let i = 0; i < cfg.grainCount; i++) {
    const yBase = (i / cfg.grainCount) * 256 + (rand() - 0.5) * (256 / cfg.grainCount) * 1.6;
    const cp1y  = yBase + (rand() - 0.5) * 12;
    const cp2y  = yBase + (rand() - 0.5) * 10;
    const endY  = yBase + (rand() - 0.5) * 8;
    const alpha = cfg.grainAlpha * (0.4 + rand() * 0.6);
    const alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0');

    ctx.beginPath();
    ctx.moveTo(0, yBase);
    ctx.bezierCurveTo(128, cp1y, 384, cp2y, 512, endY);
    ctx.strokeStyle = cfg.grainColor + alphaHex;
    ctx.lineWidth = 0.5 + rand() * 1.6;
    ctx.stroke();

    // Occasional wider growth ring
    if (rand() > 0.82) {
      ctx.beginPath();
      ctx.moveTo(0, yBase + 2);
      ctx.bezierCurveTo(128, cp1y + 2, 384, cp2y + 2, 512, endY + 2);
      ctx.strokeStyle = cfg.grainColor + '1a';
      ctx.lineWidth = 2 + rand() * 3;
      ctx.stroke();
    }
  }

  // Subtle edge vignette
  const vignette = ctx.createRadialGradient(256, 128, 60, 256, 128, 230);
  vignette.addColorStop(0, 'rgba(255,255,255,0.0)');
  vignette.addColorStop(1, 'rgba(0,0,0,0.18)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, 512, 256);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 1);
  (tex as THREE.Texture & { colorSpace?: string }).colorSpace = 'srgb';
  return tex;
}

// ─── Studio environment map ───────────────────────────────────────
function createEnvMap(renderer: THREE.WebGLRenderer): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Gradient: warm sky → neutral horizon → dark ground
  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0,    '#c8deff');
  grad.addColorStop(0.38, '#f6f2ec');
  grad.addColorStop(0.50, '#2a2830');
  grad.addColorStop(1,    '#0d0b10');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 256);

  // Warm key-light bloom
  const warm = ctx.createRadialGradient(130, 72, 0, 130, 72, 140);
  warm.addColorStop(0,   'rgba(255,245,210,0.92)');
  warm.addColorStop(0.4, 'rgba(255,225,160,0.35)');
  warm.addColorStop(1,   'rgba(255,225,160,0)');
  ctx.fillStyle = warm;
  ctx.fillRect(0, 0, 512, 256);

  // Cool fill-light bloom (opposite side)
  const cool = ctx.createRadialGradient(400, 105, 0, 400, 105, 110);
  cool.addColorStop(0,   'rgba(180,205,255,0.55)');
  cool.addColorStop(1,   'rgba(180,205,255,0)');
  ctx.fillStyle = cool;
  ctx.fillRect(0, 0, 512, 256);

  const tex = new THREE.CanvasTexture(canvas);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  (tex as THREE.Texture & { colorSpace?: string }).colorSpace = 'srgb';
  tex.needsUpdate = true;

  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();
  const envMap = pmrem.fromEquirectangular(tex).texture;
  pmrem.dispose();
  tex.dispose();
  return envMap;
}

// ─── Component ────────────────────────────────────────────────────
interface Props {
  resinHex: string;
  woodColor: string;
  legColor: string;
  sizeId?: string;
  resinId?: string;
  woodId?: string;
}

export default function TablePreview3D({ resinHex, woodColor, legColor, sizeId, resinId, woodId }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    animId: number;
    tableGroup: THREE.Group;
    materials: {
      resin: THREE.MeshPhysicalMaterial;
      wood: THREE.MeshStandardMaterial;
      leg: THREE.MeshStandardMaterial;
    };
    envMap: THREE.Texture;
    autoT: number;
    isDragging: boolean;
    rotY: number;
    rotX: number;
    woodMeshes: THREE.Mesh[];
  } | null>(null);

  // ── Scene setup ─────────────────────────────────────────────────
  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const w = el.clientWidth || 400;
    const h = el.clientHeight || 300;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);
    camera.position.set(2.8, 2.2, 3.2);
    camera.lookAt(0, 0.1, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    el.appendChild(renderer.domElement);

    // Studio environment map (for reflections)
    const envMap = createEnvMap(renderer);
    scene.environment = envMap;

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xfff8f0, 2.2);
    key.position.set(4, 7, 3);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 22;
    key.shadow.camera.left = -3;
    key.shadow.camera.right = 3;
    key.shadow.camera.top = 3;
    key.shadow.camera.bottom = -3;
    key.shadow.bias = -0.0004;
    scene.add(key);

    const fill = new THREE.DirectionalLight(0x8090ff, 0.55);
    fill.position.set(-4, 2, -3);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xfff0e0, 0.65);
    rim.position.set(0, 4, -5);
    scene.add(rim);

    // Floor shadow receiver
    const floorGeo = new THREE.PlaneGeometry(8, 8);
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.22 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.002;
    floor.receiveShadow = true;
    scene.add(floor);

    // Materials
    const resinMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(resinHex || '#4a90d9'),
      roughness: 0.04,
      metalness: 0.0,
      transmission: 0.55,
      thickness: 0.15,
      ior: 1.52,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      transparent: true,
      opacity: 0.88,
      envMap,
      envMapIntensity: 0.9,
    });

    const woodTex = makeWoodTexture(woodId);
    const woodMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(woodColor || '#8B6F3E'),
      map: woodTex,
      roughness: WOOD_CONFIG[woodId ?? '']?.roughness ?? 0.75,
      metalness: 0.02,
      envMap,
      envMapIntensity: 0.2,
    });

    const legMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(legColor || '#5a5a5a'),
      roughness: 0.28,
      metalness: 0.68,
      envMap,
      envMapIntensity: 0.85,
    });

    // Table group
    const tableGroup = new THREE.Group();
    const woodMeshes: THREE.Mesh[] = [];

    // Resin top slab
    const topGeo = new THREE.BoxGeometry(2.4, 0.09, 1.1);
    const topMesh = new THREE.Mesh(topGeo, resinMat);
    topMesh.position.y = 0.8;
    topMesh.castShadow = true;
    topMesh.receiveShadow = true;
    tableGroup.add(topMesh);

    // Wood edge strips
    const edgeDefs: [number, number, number, number, number][] = [
      [0,      0.8,  0.585,  2.4,  0.04],
      [0,      0.8, -0.585,  2.4,  0.04],
      [ 1.23,  0.8,  0,      0.04, 1.1],
      [-1.23,  0.8,  0,      0.04, 1.1],
    ];
    edgeDefs.forEach(([x, y, z, sx, sz]) => {
      const geo  = new THREE.BoxGeometry(sx, 0.09, sz);
      const mesh = new THREE.Mesh(geo, woodMat);
      mesh.position.set(x, y, z);
      mesh.castShadow = true;
      tableGroup.add(mesh);
      woodMeshes.push(mesh);
    });

    // Legs
    const legRadius = 0.045;
    const legHeight = 0.75;
    const legGeo    = new THREE.CylinderGeometry(legRadius, legRadius * 1.08, legHeight, 20);
    const legPositions: [number, number][] = [
      [ 0.98,  0.42], [-0.98,  0.42],
      [ 0.98, -0.42], [-0.98, -0.42],
    ];
    legPositions.forEach(([x, z]) => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(x, legHeight / 2, z);
      leg.castShadow = true;
      tableGroup.add(leg);
    });

    // Cross braces
    const braceGeo = new THREE.BoxGeometry(1.96, 0.025, 0.025);
    [0.42, -0.42].forEach((z) => {
      const brace = new THREE.Mesh(braceGeo, legMat);
      brace.position.set(0, 0.32, z);
      tableGroup.add(brace);
    });

    scene.add(tableGroup);

    // Animation loop
    function animate() {
      const id = requestAnimationFrame(animate);
      sceneRef.current!.animId = id;
      if (!sceneRef.current!.isDragging) {
        sceneRef.current!.autoT += 0.004;
      }
      tableGroup.rotation.y = sceneRef.current!.autoT + sceneRef.current!.rotY;
      tableGroup.rotation.x = sceneRef.current!.rotX;
      renderer.render(scene, camera);
    }

    sceneRef.current = {
      renderer, scene, camera, animId: 0,
      tableGroup,
      materials: { resin: resinMat, wood: woodMat, leg: legMat },
      envMap,
      autoT: 0, isDragging: false, rotY: 0, rotX: 0,
      woodMeshes,
    };

    animate();

    const ro = new ResizeObserver(() => {
      if (!el || !sceneRef.current) return;
      const { renderer: r, camera: c } = sceneRef.current;
      const nw = el.clientWidth;
      const nh = el.clientHeight;
      if (nw > 0 && nh > 0) {
        r.setSize(nw, nh);
        c.aspect = nw / nh;
        c.updateProjectionMatrix();
      }
    });
    ro.observe(el);

    return () => {
      ro.disconnect();
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animId);
        sceneRef.current.materials.resin.dispose();
        sceneRef.current.materials.wood.map?.dispose();
        sceneRef.current.materials.wood.dispose();
        sceneRef.current.materials.leg.dispose();
        sceneRef.current.envMap.dispose();
        sceneRef.current.renderer.dispose();
      }
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      sceneRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Drag-to-rotate ──────────────────────────────────────────────
  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    let lastX = 0;
    let lastY = 0;

    const onDown = (e: PointerEvent) => {
      if (!sceneRef.current) return;
      sceneRef.current.isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = 'grabbing';
    };
    const onMove = (e: PointerEvent) => {
      if (!sceneRef.current?.isDragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      sceneRef.current.rotY += dx * 0.012;
      sceneRef.current.rotX  = Math.max(-0.35, Math.min(0.35,
        sceneRef.current.rotX + dy * 0.008
      ));
    };
    const onUp = () => {
      if (!sceneRef.current) return;
      sceneRef.current.isDragging = false;
      el.style.cursor = 'grab';
    };

    el.style.cursor = 'grab';
    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup',   onUp);
    el.addEventListener('pointerleave', onUp);
    return () => {
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup',   onUp);
      el.removeEventListener('pointerleave', onUp);
    };
  }, []);

  // ── Color updates ────────────────────────────────────────────────
  useEffect(() => {
    if (!sceneRef.current) return;
    sceneRef.current.materials.resin.color.set(resinHex || '#4a90d9');
  }, [resinHex]);

  useEffect(() => {
    if (!sceneRef.current) return;
    sceneRef.current.materials.wood.color.set(woodColor || '#8B6F3E');
  }, [woodColor]);

  useEffect(() => {
    if (!sceneRef.current) return;
    sceneRef.current.materials.leg.color.set(legColor || '#5a5a5a');
  }, [legColor]);

  // ── Resin physics per resinId ─────────────────────────────────────
  useEffect(() => {
    if (!sceneRef.current || !resinId) return;
    const props = RESIN_PROPS[resinId];
    if (!props) return;
    const mat = sceneRef.current.materials.resin;
    mat.transmission        = props.transmission;
    mat.roughness           = props.roughness;
    mat.opacity             = props.opacity;
    mat.clearcoat           = props.clearcoat;
    mat.ior                 = props.ior;
    mat.needsUpdate         = true;
  }, [resinId]);

  // ── Size scale ────────────────────────────────────────────────────
  useEffect(() => {
    if (!sceneRef.current) return;
    const scale = SIZE_SCALE[sizeId ?? ''] ?? 1.0;
    sceneRef.current.tableGroup.scale.setScalar(scale);
  }, [sizeId]);

  // ── Wood texture per woodId ───────────────────────────────────────
  useEffect(() => {
    if (!sceneRef.current) return;
    const mat    = sceneRef.current.materials.wood;
    const oldTex = mat.map;
    const newTex = makeWoodTexture(woodId);
    mat.map      = newTex;
    mat.roughness = WOOD_CONFIG[woodId ?? '']?.roughness ?? 0.75;
    mat.needsUpdate = true;
    oldTex?.dispose();
  }, [woodId]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full select-none"
      style={{ minHeight: 220, touchAction: 'none' }}
    />
  );
}
