'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export type TableShape = 'organic' | 'round' | 'square' | 'rectangle';

interface Props {
  resinColor: string;
  size: 'S' | 'M' | 'L' | null;
  height: '30–40 cm' | '40–50 cm' | '72–75 cm' | null;
  legs: '4' | '1' | null;
  shape: TableShape;
  opacity?: '투명' | '반투명' | '불투명' | null;
}

const SIZE_SCALE: Record<string, number> = { S: 0.62, M: 0.75, L: 0.88 };
const HEIGHT_MAP: Record<string, number> = {
  '30–40 cm': 3.0,
  '40–50 cm': 4.2,
  '72–75 cm': 5.0,
};

/* ── Shape builders ── */
function makeOrganicShape(): THREE.Shape {
  const s = new THREE.Shape();
  s.moveTo(0.29, 4.29);
  s.bezierCurveTo(2.29, 5.0, 4.43, 4.29, 5.14, 2.57);
  s.bezierCurveTo(5.86, 0.86, 5.29, -1.21, 4.21, -2.64);
  s.bezierCurveTo(3.0, -4.29, 0.86, -5.0, -1.14, -4.57);
  s.bezierCurveTo(-3.14, -4.14, -4.71, -2.71, -5.14, -0.86);
  s.bezierCurveTo(-5.57, 1.0, -4.86, 3.0, -3.14, 3.86);
  s.bezierCurveTo(-2.14, 4.36, -1.0, 3.57, 0.29, 4.29);
  return s;
}

function makeRoundShape(): THREE.Shape {
  const s = new THREE.Shape();
  const r = 5;
  for (let i = 0; i <= 64; i++) {
    const a = (i / 64) * Math.PI * 2;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) s.moveTo(x, y);
    else s.lineTo(x, y);
  }
  return s;
}

function makeRoundedRect(w: number, h: number, radius: number): THREE.Shape {
  const s = new THREE.Shape();
  const hw = w / 2, hh = h / 2, r = Math.min(radius, hw, hh);
  s.moveTo(-hw + r, -hh);
  s.lineTo(hw - r, -hh);
  s.quadraticCurveTo(hw, -hh, hw, -hh + r);
  s.lineTo(hw, hh - r);
  s.quadraticCurveTo(hw, hh, hw - r, hh);
  s.lineTo(-hw + r, hh);
  s.quadraticCurveTo(-hw, hh, -hw, hh - r);
  s.lineTo(-hw, -hh + r);
  s.quadraticCurveTo(-hw, -hh, -hw + r, -hh);
  return s;
}

function getShape(type: TableShape): THREE.Shape {
  switch (type) {
    case 'round': return makeRoundShape();
    case 'square': return makeRoundedRect(9, 9, 0.8);
    case 'rectangle': return makeRoundedRect(12, 7, 0.8);
    default: return makeOrganicShape();
  }
}

/* ── Leg positions per shape ── */
function getLegPositions(type: TableShape): [number, number][] {
  switch (type) {
    case 'round': return [[3.2, 3.2], [-3.2, 3.2], [3.2, -3.2], [-3.2, -3.2]];
    case 'square': return [[3.5, 3.5], [-3.5, 3.5], [3.5, -3.5], [-3.5, -3.5]];
    case 'rectangle': return [[4.8, 2.5], [-4.8, 2.5], [4.8, -2.5], [-4.8, -2.5]];
    default: return [[3.4, 2.6], [-3.1, 2.6], [3.8, -2.8], [-2.8, -2.8]];
  }
}

const EXTRUDE_SETTINGS: THREE.ExtrudeGeometryOptions = {
  depth: 0.38,
  bevelEnabled: true,
  bevelThickness: 0.06,
  bevelSize: 0.06,
  bevelSegments: 4,
};

export default function CommissionPreview3D({ resinColor, size, height, legs, shape, opacity }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    tableGroup: THREE.Group;
    tableMesh: THREE.Mesh;
    tableMat: THREE.MeshPhysicalMaterial;
    legMat: THREE.MeshStandardMaterial;
    legs4Group: THREE.Group;
    legs1Group: THREE.Group;
    legMeshes4: THREE.Mesh[];
    legMeshes1: THREE.Mesh[];
    footMeshes: THREE.Mesh[];
    baseMesh: THREE.Mesh;
    currentLegH: number;
  } | null>(null);

  /* ── Init scene (runs once) ── */
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const W = container.clientWidth || 300;
    const H = container.clientHeight || 400;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, W / H, 0.1, 200);
    camera.position.set(0, 6, 22);
    camera.lookAt(0, -1, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(6, 10, 8);
    keyLight.castShadow = true;
    scene.add(keyLight);
    scene.add(new THREE.DirectionalLight(0x8ab4d4, 0.4).translateX(-6).translateY(2).translateZ(-4));
    scene.add(new THREE.DirectionalLight(0xffffff, 0.3).translateY(-4).translateZ(-8));

    const tableMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(resinColor),
      roughness: 0.12, metalness: 0.0,
      clearcoat: 1.0, clearcoatRoughness: 0.08,
      transparent: true, opacity: 0.93,
    });

    const legMat = new THREE.MeshStandardMaterial({ color: 0xb0b0b0, roughness: 0.25, metalness: 0.9 });

    // Build initial table
    const topGeo = new THREE.ExtrudeGeometry(getShape('organic'), EXTRUDE_SETTINGS);
    topGeo.center();
    const tableMesh = new THREE.Mesh(topGeo, tableMat);
    tableMesh.rotation.x = -Math.PI / 2;
    tableMesh.castShadow = true;

    const legH = 5.0;
    const legs4Group = new THREE.Group();
    const legMeshes4: THREE.Mesh[] = [];
    const footMeshes: THREE.Mesh[] = [];

    getLegPositions('organic').forEach(([x, z]) => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.13, legH, 10), legMat);
      leg.rotation.x = z > 0 ? 0.04 : -0.04;
      leg.rotation.z = x > 0 ? 0.04 : -0.04;
      leg.position.set(x, -legH / 2 - 0.18, z);
      leg.castShadow = true;
      legs4Group.add(leg);
      legMeshes4.push(leg);

      const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.06, 12), legMat);
      foot.position.set(x, -legH - 0.18, z);
      legs4Group.add(foot);
      footMeshes.push(foot);
    });

    const legs1Group = new THREE.Group();
    legs1Group.visible = false;
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.28, legH, 16), legMat);
    post.position.set(0, -legH / 2 - 0.18, 0);
    post.castShadow = true;
    legs1Group.add(post);
    const baseMesh = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.8, 0.1, 24), legMat);
    baseMesh.position.set(0, -legH - 0.18, 0);
    legs1Group.add(baseMesh);

    const tableGroup = new THREE.Group();
    tableGroup.add(tableMesh);
    tableGroup.add(legs4Group);
    tableGroup.add(legs1Group);
    tableGroup.rotation.x = 0.28;
    tableGroup.rotation.y = -0.42;
    scene.add(tableGroup);

    let animId = 0;
    const animate = () => { animId = requestAnimationFrame(animate); renderer.render(scene, camera); };
    animate();

    const ro = new ResizeObserver(() => {
      const w = container.clientWidth, h = container.clientHeight;
      if (w && h) { camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h); }
    });
    ro.observe(container);

    let dragging = false, startX = 0, startY = 0, rotX = 0.28, rotY = -0.42;
    const onDown = (e: PointerEvent) => { dragging = true; startX = e.clientX; startY = e.clientY; (e.target as HTMLElement).setPointerCapture(e.pointerId); };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      rotY += (e.clientX - startX) * 0.008; rotX += (e.clientY - startY) * 0.008;
      rotX = Math.max(-1.2, Math.min(1.2, rotX));
      tableGroup.rotation.x = rotX; tableGroup.rotation.y = rotY;
      startX = e.clientX; startY = e.clientY;
    };
    const onUp = () => { dragging = false; };
    renderer.domElement.addEventListener('pointerdown', onDown);
    renderer.domElement.addEventListener('pointermove', onMove);
    renderer.domElement.addEventListener('pointerup', onUp);
    renderer.domElement.style.cursor = 'grab';
    renderer.domElement.style.touchAction = 'none';

    sceneRef.current = {
      renderer, scene, camera, tableGroup, tableMesh, tableMat, legMat,
      legs4Group, legs1Group, legMeshes4, legMeshes1: [post], footMeshes, baseMesh,
      currentLegH: legH,
    };

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      renderer.domElement.removeEventListener('pointerdown', onDown);
      renderer.domElement.removeEventListener('pointermove', onMove);
      renderer.domElement.removeEventListener('pointerup', onUp);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      sceneRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Update color ── */
  useEffect(() => {
    if (!sceneRef.current) return;
    sceneRef.current.tableMat.color.setStyle(resinColor);
  }, [resinColor]);

  /* ── Update opacity ── */
  useEffect(() => {
    if (!sceneRef.current) return;
    const mat = sceneRef.current.tableMat;
    if (opacity === '투명') { mat.opacity = 0.25; mat.transmission = 0.95; mat.roughness = 0.04; }
    else if (opacity === '반투명') { mat.opacity = 0.6; mat.transmission = 0.5; mat.roughness = 0.08; }
    else { mat.opacity = 0.93; mat.transmission = 0; mat.roughness = 0.12; }
    mat.needsUpdate = true;
  }, [opacity]);

  /* ── Update size ── */
  useEffect(() => {
    if (!sceneRef.current || !size) return;
    sceneRef.current.tableGroup.scale.setScalar(SIZE_SCALE[size] ?? 0.75);
  }, [size]);

  /* ── Update height ── */
  useEffect(() => {
    if (!sceneRef.current || !height) return;
    const legH = HEIGHT_MAP[height] ?? 5.0;
    const s = sceneRef.current;
    s.currentLegH = legH;

    s.legMeshes4.forEach((leg) => {
      leg.geometry.dispose();
      leg.geometry = new THREE.CylinderGeometry(0.1, 0.13, legH, 10);
      leg.position.y = -legH / 2 - 0.18;
    });
    s.footMeshes.forEach((foot) => { foot.position.y = -legH - 0.18; });
    s.legMeshes1.forEach((post) => {
      post.geometry.dispose();
      post.geometry = new THREE.CylinderGeometry(0.18, 0.28, legH, 16);
      post.position.y = -legH / 2 - 0.18;
    });
    s.baseMesh.position.y = -legH - 0.18;
  }, [height]);

  /* ── Update legs ── */
  useEffect(() => {
    if (!sceneRef.current || !legs) return;
    sceneRef.current.legs4Group.visible = legs === '4';
    sceneRef.current.legs1Group.visible = legs === '1';
  }, [legs]);

  /* ── Update shape ── */
  useEffect(() => {
    if (!sceneRef.current) return;
    const s = sceneRef.current;
    const legH = s.currentLegH;

    // Rebuild table top
    s.tableMesh.geometry.dispose();
    const newGeo = new THREE.ExtrudeGeometry(getShape(shape), EXTRUDE_SETTINGS);
    newGeo.center();
    s.tableMesh.geometry = newGeo;

    // Rebuild 4-legs positions
    const positions = getLegPositions(shape);
    s.legMeshes4.forEach((leg, i) => {
      const [x, z] = positions[i];
      leg.position.set(x, -legH / 2 - 0.18, z);
      leg.rotation.x = z > 0 ? 0.04 : -0.04;
      leg.rotation.z = x > 0 ? 0.04 : -0.04;
    });
    s.footMeshes.forEach((foot, i) => {
      const [x, z] = positions[i];
      foot.position.set(x, -legH - 0.18, z);
    });
  }, [shape]);

  return <div ref={mountRef} className="w-full h-full" style={{ minHeight: 200 }} />;
}
