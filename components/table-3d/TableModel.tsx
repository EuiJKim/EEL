'use client';

import { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { RESIN_PROPS, DEFAULT_RESIN, SIZE_SCALE } from './constants';

interface TableModelProps {
  resinHex: string;
  legColor: string;
  sizeId?: string;
  resinId?: string;
}

// ─── Radial silk texture (mimics real resin fiber pattern) ────────
function makeResinSilkTexture(hexColor: string): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const cx = size / 2, cy = size / 2, r = size / 2;

  ctx.fillStyle = hexColor;
  ctx.fillRect(0, 0, size, size);

  const innerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 0.55);
  innerGlow.addColorStop(0, 'rgba(255,255,255,0.22)');
  innerGlow.addColorStop(1, 'rgba(255,255,255,0.00)');
  ctx.fillStyle = innerGlow;
  ctx.fillRect(0, 0, size, size);

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

  const star = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 0.25);
  star.addColorStop(0, 'rgba(255,255,255,0.45)');
  star.addColorStop(0.5, 'rgba(255,255,255,0.10)');
  star.addColorStop(1, 'rgba(255,255,255,0.00)');
  ctx.fillStyle = star;
  ctx.fillRect(0, 0, size, size);

  const vig = ctx.createRadialGradient(cx, cy, r * 0.45, cx, cy, r);
  vig.addColorStop(0, 'rgba(0,0,0,0.00)');
  vig.addColorStop(1, 'rgba(0,0,0,0.22)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, size, size);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export default function TableModel({ resinHex, legColor, sizeId, resinId }: TableModelProps) {
  const { scene } = useGLTF('/models/table.glb');
  const groupRef = useRef<THREE.Group>(null);
  const silkTexRef = useRef<THREE.CanvasTexture | null>(null);
  const resinMatRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const legMatRef = useRef<THREE.MeshStandardMaterial | null>(null);

  // Find meshes from the loaded GLB
  const meshes = useMemo(() => {
    const resinTop = scene.getObjectByName('ResinTop') as THREE.Mesh | undefined;
    const pedestal = scene.getObjectByName('Pedestal') as THREE.Mesh | undefined;
    const baseCap = scene.getObjectByName('BaseCap') as THREE.Mesh | undefined;
    return { resinTop, pedestal, baseCap };
  }, [scene]);

  // Create and apply resin material
  useEffect(() => {
    if (!meshes.resinTop) return;

    const hex = resinHex || '#3ba8c8';
    const props = resinId ? (RESIN_PROPS[resinId] ?? DEFAULT_RESIN) : DEFAULT_RESIN;

    // Dispose old silk texture
    if (silkTexRef.current) silkTexRef.current.dispose();
    const silkTex = makeResinSilkTexture(hex);
    silkTexRef.current = silkTex;

    // Dispose old material
    if (resinMatRef.current) resinMatRef.current.dispose();

    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(hex),
      map: silkTex,
      roughness: props.roughness,
      metalness: 0.0,
      transmission: props.transmission,
      thickness: 0.10,
      ior: props.ior,
      clearcoat: props.clearcoat,
      clearcoatRoughness: 0.03,
      transparent: true,
      opacity: props.opacity,
      envMapIntensity: 1.1,
    });
    resinMatRef.current = mat;

    meshes.resinTop.material = mat;
    meshes.resinTop.castShadow = true;
    meshes.resinTop.receiveShadow = true;
  }, [resinHex, resinId, meshes.resinTop]);

  // Create and apply leg material
  useEffect(() => {
    if (!meshes.pedestal && !meshes.baseCap) return;

    // Dispose old material
    if (legMatRef.current) legMatRef.current.dispose();

    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(legColor || '#c0c8d0'),
      roughness: 0.16,
      metalness: 0.88,
      envMapIntensity: 1.4,
    });
    legMatRef.current = mat;

    if (meshes.pedestal) {
      meshes.pedestal.material = mat;
      meshes.pedestal.castShadow = true;
      meshes.pedestal.receiveShadow = true;
    }
    if (meshes.baseCap) {
      meshes.baseCap.material = mat;
      meshes.baseCap.castShadow = true;
    }
  }, [legColor, meshes.pedestal, meshes.baseCap]);

  // Size scaling
  useEffect(() => {
    if (!groupRef.current) return;
    const scale = SIZE_SCALE[sizeId ?? ''] ?? 1.0;
    groupRef.current.scale.setScalar(scale);
  }, [sizeId]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      silkTexRef.current?.dispose();
      resinMatRef.current?.dispose();
      legMatRef.current?.dispose();
    };
  }, []);

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/models/table.glb');
