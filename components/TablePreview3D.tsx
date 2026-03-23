'use client';

import { useEffect, useRef, useState } from 'react';
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
  's': 0.72, 'm': 1.0, 'l': 1.28, 'xl': 1.56,
};

// ─── Organic lily-pad top geometry ────────────────────────────────
// Diameter 73-78 cm → radius ~0.76 in scene units (1 unit ≈ 50 cm)
function makeOrganicTopGeometry(): THREE.BufferGeometry {
  const baseR = 0.76;
  const pts: THREE.Vector2[] = [];
  const n = 200;

  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    // Gentle undulation — subtle enough to look refined, not chaotic
    const r = baseR
      + baseR * 0.038 * Math.sin(a * 5 + 1.10)
      + baseR * 0.018 * Math.sin(a * 8 + 2.35)
      + baseR * 0.008 * Math.sin(a * 13 + 0.55);
    pts.push(new THREE.Vector2(r * Math.cos(a), r * Math.sin(a)));
  }

  const shape = new THREE.Shape(pts);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.055,         // ~2.7 cm — slim resin slab
    bevelEnabled: true,
    bevelThickness: 0.010,
    bevelSize: 0.008,
    bevelSegments: 5,
  });
  // ExtrudeGeometry extrudes along Z; rotate so top face points up (+Y)
  geo.rotateX(-Math.PI / 2);
  return geo;
}

// ─── Tulip/trumpet pedestal geometry ─────────────────────────────
// LatheGeometry: [radius, y] profile swept around Y-axis
// Heights normalized: full table height ~72 cm → ~1.44 units
function makePedestalGeometry(): THREE.BufferGeometry {
  const pts = [
    new THREE.Vector2(0.395, 0.000),  // base outer rim
    new THREE.Vector2(0.400, 0.014),  // base lip
    new THREE.Vector2(0.375, 0.032),  // base top edge
    new THREE.Vector2(0.150, 0.095),  // sweeping curve inward
    new THREE.Vector2(0.068, 0.220),  // stem begins
    new THREE.Vector2(0.042, 0.460),  // slim stem
    new THREE.Vector2(0.046, 0.610),  // slight flare upward
    new THREE.Vector2(0.062, 0.710),  // top — connects to table underside
  ];
  return new THREE.LatheGeometry(pts, 72);
}

// ─── Radial silk texture (mimics real resin fiber pattern) ────────
function makeResinSilkTexture(hexColor: string): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const cx = size / 2, cy = size / 2, r = size / 2;

  // Base color
  ctx.fillStyle = hexColor;
  ctx.fillRect(0, 0, size, size);

  // Subtle inner glow layer (color lighter at center)
  const innerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 0.55);
  innerGlow.addColorStop(0, 'rgba(255,255,255,0.22)');
  innerGlow.addColorStop(1, 'rgba(255,255,255,0.00)');
  ctx.fillStyle = innerGlow;
  ctx.fillRect(0, 0, size, size);

  // Radial silk lines — deterministic pseudo-random using LCG
  let seed = 9301;
  const lcg = () => {
    seed = (seed * 49297 + 233280) % 233280;
    return seed / 233280;
  };

  const lineCount = 320;
  for (let i = 0; i < lineCount; i++) {
    const baseAngle = (i / lineCount) * Math.PI * 2;
    const jitter = (lcg() - 0.5) * 0.04;
    const a = baseAngle + jitter;
    const len = r * (0.20 + lcg() * 0.80);
    const alpha = 0.018 + lcg() * 0.13;
    const lw = 0.15 + lcg() * 1.3;

    // Slight curve: draw as bezier toward outside
    const midR = len * 0.55;
    const midOffset = (lcg() - 0.5) * 0.06;
    const mAngle = a + midOffset;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.quadraticCurveTo(
      cx + Math.cos(mAngle) * midR,
      cy + Math.sin(mAngle) * midR,
      cx + Math.cos(a) * len,
      cy + Math.sin(a) * len,
    );
    ctx.strokeStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
    ctx.lineWidth = lw;
    ctx.stroke();
  }

  // Bright starburst center
  const star = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 0.25);
  star.addColorStop(0, 'rgba(255,255,255,0.45)');
  star.addColorStop(0.5, 'rgba(255,255,255,0.10)');
  star.addColorStop(1, 'rgba(255,255,255,0.00)');
  ctx.fillStyle = star;
  ctx.fillRect(0, 0, size, size);

  // Edge vignette
  const vig = ctx.createRadialGradient(cx, cy, r * 0.45, cx, cy, r);
  vig.addColorStop(0, 'rgba(0,0,0,0.00)');
  vig.addColorStop(1, 'rgba(0,0,0,0.22)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, size, size);

  const tex = new THREE.CanvasTexture(canvas);
  (tex as THREE.Texture & { colorSpace?: string }).colorSpace = 'srgb';
  return tex;
}

// ─── Studio environment map ───────────────────────────────────────
function createEnvMap(renderer: THREE.WebGLRenderer): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0,    '#c8deff');
  grad.addColorStop(0.38, '#f6f2ec');
  grad.addColorStop(0.50, '#2a2830');
  grad.addColorStop(1,    '#0d0b10');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 256);

  const warm = ctx.createRadialGradient(130, 72, 0, 130, 72, 140);
  warm.addColorStop(0,   'rgba(255,245,210,0.92)');
  warm.addColorStop(0.4, 'rgba(255,225,160,0.35)');
  warm.addColorStop(1,   'rgba(255,225,160,0)');
  ctx.fillStyle = warm;
  ctx.fillRect(0, 0, 512, 256);

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
  woodColor: string;  // kept for API compat
  legColor: string;
  sizeId?: string;
  resinId?: string;
  woodId?: string;    // kept for API compat
}

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    );
  } catch {
    return false;
  }
}

export default function TablePreview3D({ resinHex, legColor, sizeId, resinId }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGLFailed, setWebGLFailed] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    animId: number;
    tableGroup: THREE.Group;
    materials: {
      resin: THREE.MeshPhysicalMaterial;
      leg: THREE.MeshStandardMaterial;
    };
    envMap: THREE.Texture;
    silkTex: THREE.CanvasTexture;
    autoT: number;
    isDragging: boolean;
    rotY: number;
    rotX: number;
  } | null>(null);

  // ── Scene setup ─────────────────────────────────────────────────
  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    if (!supportsWebGL()) {
      setWebGLFailed(true);
      return;
    }

    const w = el.clientWidth || 400;
    const h = el.clientHeight || 300;

    const scene = new THREE.Scene();
    scene.background = null;

    // Camera: slightly above and to the side to show organic top beautifully
    const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
    camera.position.set(2.0, 1.95, 2.5);
    camera.lookAt(0, 0.50, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    el.appendChild(renderer.domElement);

    const envMap = createEnvMap(renderer);
    scene.environment = envMap;

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.38);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xfff8f0, 2.5);
    key.position.set(3.5, 6, 3);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 20;
    key.shadow.camera.left   = -2.5;
    key.shadow.camera.right  =  2.5;
    key.shadow.camera.top    =  2.5;
    key.shadow.camera.bottom = -2.5;
    key.shadow.bias = -0.0004;
    scene.add(key);

    const fill = new THREE.DirectionalLight(0x8090ff, 0.50);
    fill.position.set(-4, 2, -2);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xfff0e0, 0.60);
    rim.position.set(0, 3, -4);
    scene.add(rim);

    // Under-table bounce (slight warm from below)
    const bounce = new THREE.PointLight(0xffeedd, 0.25, 5);
    bounce.position.set(0, -0.2, 0);
    scene.add(bounce);

    // Floor shadow receiver
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 8),
      new THREE.ShadowMaterial({ opacity: 0.18 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.002;
    floor.receiveShadow = true;
    scene.add(floor);

    // ── Silk texture ────────────────────────────────────────────────
    const silkTex = makeResinSilkTexture(resinHex || '#3ba8c8');

    // ── Materials ────────────────────────────────────────────────────
    const resinMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(resinHex || '#3ba8c8'),
      map: silkTex,
      roughness: 0.035,
      metalness: 0.0,
      transmission: 0.62,
      thickness: 0.10,
      ior: 1.52,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      transparent: true,
      opacity: 0.88,
      envMap,
      envMapIntensity: 1.1,
    });

    // Stainless steel pedestal — default is polished silver
    const legMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(legColor || '#c0c8d0'),
      roughness: 0.16,
      metalness: 0.88,
      envMap,
      envMapIntensity: 1.4,
    });

    // ── Table group ──────────────────────────────────────────────────
    const tableGroup = new THREE.Group();

    // Organic resin top — positioned so pedestal top aligns at its bottom
    const topGeo = makeOrganicTopGeometry();
    const topMesh = new THREE.Mesh(topGeo, resinMat);
    topMesh.position.y = 0.710;  // pedestal top = 0.710, slab sits flush
    topMesh.castShadow = true;
    topMesh.receiveShadow = true;
    tableGroup.add(topMesh);

    // Tulip pedestal body
    const pedestalGeo = makePedestalGeometry();
    const pedestalMesh = new THREE.Mesh(pedestalGeo, legMat);
    pedestalMesh.castShadow = true;
    pedestalMesh.receiveShadow = true;
    tableGroup.add(pedestalMesh);

    // Base disc cap (closes the bottom of the pedestal visually)
    const baseCap = new THREE.Mesh(
      new THREE.CylinderGeometry(0.395, 0.395, 0.014, 72),
      legMat,
    );
    baseCap.position.y = 0.007;
    tableGroup.add(baseCap);

    scene.add(tableGroup);

    // ── Animation ────────────────────────────────────────────────────
    function animate() {
      const id = requestAnimationFrame(animate);
      sceneRef.current!.animId = id;
      if (!sceneRef.current!.isDragging) {
        sceneRef.current!.autoT += 0.003;
      }
      tableGroup.rotation.y = sceneRef.current!.autoT + sceneRef.current!.rotY;
      tableGroup.rotation.x = sceneRef.current!.rotX;
      renderer.render(scene, camera);
    }

    sceneRef.current = {
      renderer, scene, camera, animId: 0,
      tableGroup,
      materials: { resin: resinMat, leg: legMat },
      envMap, silkTex,
      autoT: 0, isDragging: false, rotY: 0, rotX: 0,
    };

    // Mark canvas ready after first frame renders
    requestAnimationFrame(() => setCanvasReady(true));

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
        sceneRef.current.materials.resin.map?.dispose();
        sceneRef.current.materials.resin.dispose();
        sceneRef.current.materials.leg.dispose();
        sceneRef.current.silkTex.dispose();
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
    let lastX = 0, lastY = 0;

    const onDown = (e: PointerEvent) => {
      if (!sceneRef.current) return;
      sceneRef.current.isDragging = true;
      lastX = e.clientX; lastY = e.clientY;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = 'grabbing';
    };
    const onMove = (e: PointerEvent) => {
      if (!sceneRef.current?.isDragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX; lastY = e.clientY;
      sceneRef.current.rotY += dx * 0.012;
      sceneRef.current.rotX  = Math.max(-0.40, Math.min(0.40,
        sceneRef.current.rotX + dy * 0.008,
      ));
    };
    const onUp = () => {
      if (!sceneRef.current) return;
      sceneRef.current.isDragging = false;
      el.style.cursor = 'grab';
    };

    el.style.cursor = 'grab';
    el.addEventListener('pointerdown',  onDown);
    el.addEventListener('pointermove',  onMove);
    el.addEventListener('pointerup',    onUp);
    el.addEventListener('pointerleave', onUp);
    return () => {
      el.removeEventListener('pointerdown',  onDown);
      el.removeEventListener('pointermove',  onMove);
      el.removeEventListener('pointerup',    onUp);
      el.removeEventListener('pointerleave', onUp);
    };
  }, []);

  // ── Resin color + re-bake silk texture ───────────────────────────
  useEffect(() => {
    if (!sceneRef.current) return;
    const hex = resinHex || '#3ba8c8';
    sceneRef.current.materials.resin.color.set(hex);
    const oldTex = sceneRef.current.silkTex;
    const newTex = makeResinSilkTexture(hex);
    sceneRef.current.materials.resin.map = newTex;
    sceneRef.current.materials.resin.needsUpdate = true;
    sceneRef.current.silkTex = newTex;
    oldTex.dispose();
  }, [resinHex]);

  // ── Leg color ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!sceneRef.current) return;
    sceneRef.current.materials.leg.color.set(legColor || '#c0c8d0');
  }, [legColor]);

  // ── Resin physics per resinId ─────────────────────────────────────
  useEffect(() => {
    if (!sceneRef.current || !resinId) return;
    const props = RESIN_PROPS[resinId];
    if (!props) return;
    const mat = sceneRef.current.materials.resin;
    mat.transmission = props.transmission;
    mat.roughness    = props.roughness;
    mat.opacity      = props.opacity;
    mat.clearcoat    = props.clearcoat;
    mat.ior          = props.ior;
    mat.needsUpdate  = true;
  }, [resinId]);

  // ── Size scale ────────────────────────────────────────────────────
  useEffect(() => {
    if (!sceneRef.current) return;
    sceneRef.current.tableGroup.scale.setScalar(SIZE_SCALE[sizeId ?? ''] ?? 1.0);
  }, [sizeId]);

  if (webGLFailed) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-4" style={{ minHeight: 220 }}>
        <div
          className="w-24 h-24 rounded-2xl shadow-lg border border-white/10"
          style={{ backgroundColor: resinHex || '#3ba8c8' }}
        />
        <p className="text-xs text-zinc-500 text-center">
          3D 미리보기를 사용할 수 없습니다.<br />
          선택한 색상이 위에 표시됩니다.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full" style={{ minHeight: 220 }}>
      {/* Shimmer shown while canvas initialises */}
      {!canvasReady && (
        <div
          className="absolute inset-0 animate-pulse rounded-lg"
          style={{
            background: `radial-gradient(ellipse at 50% 60%, ${resinHex}33 0%, transparent 70%)`,
            backgroundColor: 'rgb(24,24,27)',
          }}
        />
      )}
      <div
        ref={mountRef}
        className="w-full h-full select-none"
        style={{ touchAction: 'none', opacity: canvasReady ? 1 : 0, transition: 'opacity 0.3s ease' }}
      />
    </div>
  );
}
