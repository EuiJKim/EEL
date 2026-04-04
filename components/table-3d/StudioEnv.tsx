'use client';

import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

/**
 * Procedural studio environment map — no external HDRI download needed.
 * Generates a canvas-based equirectangular environment and applies it to the scene.
 */
export default function StudioEnv() {
  const { gl, scene } = useThree();

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;

    // Vertical gradient: sky → horizon → dark floor
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, '#c8deff');
    grad.addColorStop(0.38, '#f6f2ec');
    grad.addColorStop(0.50, '#2a2830');
    grad.addColorStop(1, '#0d0b10');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);

    // Warm key light area
    const warm = ctx.createRadialGradient(130, 72, 0, 130, 72, 140);
    warm.addColorStop(0, 'rgba(255,245,210,0.92)');
    warm.addColorStop(0.4, 'rgba(255,225,160,0.35)');
    warm.addColorStop(1, 'rgba(255,225,160,0)');
    ctx.fillStyle = warm;
    ctx.fillRect(0, 0, 512, 256);

    // Cool fill area
    const cool = ctx.createRadialGradient(400, 105, 0, 400, 105, 110);
    cool.addColorStop(0, 'rgba(180,205,255,0.55)');
    cool.addColorStop(1, 'rgba(180,205,255,0)');
    ctx.fillStyle = cool;
    ctx.fillRect(0, 0, 512, 256);

    const tex = new THREE.CanvasTexture(canvas);
    tex.mapping = THREE.EquirectangularReflectionMapping;
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;

    const pmrem = new THREE.PMREMGenerator(gl);
    pmrem.compileEquirectangularShader();
    const envMap = pmrem.fromEquirectangular(tex).texture;
    pmrem.dispose();
    tex.dispose();

    scene.environment = envMap;

    return () => {
      envMap.dispose();
      scene.environment = null;
    };
  }, [gl, scene]);

  return null;
}
