'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Props {
  resinHex: string;
  woodColor: string;
  legColor: string;
}

export default function TablePreview3D({ resinHex, woodColor, legColor }: Props) {
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
  } | null>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = null;

    // Camera
    const w = el.clientWidth;
    const h = el.clientHeight;
    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);
    camera.position.set(2.8, 2.2, 3.2);
    camera.lookAt(0, 0.1, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(w, h);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    el.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xffffff, 1.8);
    key.position.set(4, 6, 3);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.near = 0.5;
    key.shadow.camera.far = 20;
    key.shadow.camera.left = -3;
    key.shadow.camera.right = 3;
    key.shadow.camera.top = 3;
    key.shadow.camera.bottom = -3;
    scene.add(key);

    const fill = new THREE.DirectionalLight(0x8090ff, 0.4);
    fill.position.set(-3, 2, -2);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xffffff, 0.5);
    rim.position.set(0, 3, -4);
    scene.add(rim);

    // Materials
    const resinMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(resinHex || '#4a90d9'),
      roughness: 0.05,
      metalness: 0.0,
      transmission: 0.45,
      thickness: 0.12,
      ior: 1.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      transparent: true,
      opacity: 0.88,
    });

    const woodMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(woodColor || '#8B6F3E'),
      roughness: 0.75,
      metalness: 0.02,
    });

    const legMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(legColor || '#5a5a5a'),
      roughness: 0.35,
      metalness: 0.6,
    });

    // Table geometry
    const tableGroup = new THREE.Group();

    // Table top — resin slab
    const topGeo = new THREE.BoxGeometry(2.4, 0.09, 1.1);
    const topMesh = new THREE.Mesh(topGeo, resinMat);
    topMesh.position.y = 0.8;
    topMesh.castShadow = true;
    topMesh.receiveShadow = true;
    tableGroup.add(topMesh);

    // Wood edge strip (thin frame around top)
    const edgePositions: [number, number, number, number, number, number][] = [
      // [x, y, z, rotY, scaleX, scaleZ]
      [0, 0.8, 0.585, 0, 2.4, 0.04],   // front
      [0, 0.8, -0.585, 0, 2.4, 0.04],  // back
      [1.23, 0.8, 0, 0, 0.04, 1.1],    // right
      [-1.23, 0.8, 0, 0, 0.04, 1.1],   // left
    ];
    edgePositions.forEach(([x, y, z, , sx, sz]) => {
      const edgeGeo = new THREE.BoxGeometry(sx, 0.09, sz);
      const edgeMesh = new THREE.Mesh(edgeGeo, woodMat);
      edgeMesh.position.set(x, y, z);
      edgeMesh.castShadow = true;
      tableGroup.add(edgeMesh);
    });

    // Legs — 4 cylinders
    const legRadius = 0.045;
    const legHeight = 0.75;
    const legGeo = new THREE.CylinderGeometry(legRadius, legRadius * 1.1, legHeight, 16);
    const legPositions: [number, number][] = [
      [0.98, 0.42],
      [-0.98, 0.42],
      [0.98, -0.42],
      [-0.98, -0.42],
    ];
    legPositions.forEach(([x, z]) => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(x, legHeight / 2, z);
      leg.castShadow = true;
      tableGroup.add(leg);
    });

    // Cross brace
    const braceGeo = new THREE.BoxGeometry(1.96, 0.025, 0.025);
    const brace1 = new THREE.Mesh(braceGeo, legMat);
    brace1.position.set(0, 0.32, 0.42);
    tableGroup.add(brace1);
    const brace2 = new THREE.Mesh(braceGeo, legMat);
    brace2.position.set(0, 0.32, -0.42);
    tableGroup.add(brace2);

    // Floor shadow plane
    const shadowGeo = new THREE.CircleGeometry(2, 32);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.18 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.005;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    scene.add(tableGroup);

    // Animate
    let t = 0;
    function animate() {
      const id = requestAnimationFrame(animate);
      sceneRef.current!.animId = id;
      t += 0.004;
      tableGroup.rotation.y = t;
      renderer.render(scene, camera);
    }

    sceneRef.current = {
      renderer,
      scene,
      camera,
      animId: 0,
      tableGroup,
      materials: { resin: resinMat, wood: woodMat, leg: legMat },
    };

    animate();

    // Resize observer
    const ro = new ResizeObserver(() => {
      if (!el || !sceneRef.current) return;
      const { renderer, camera } = sceneRef.current;
      const nw = el.clientWidth;
      const nh = el.clientHeight;
      renderer.setSize(nw, nh);
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
    });
    ro.observe(el);

    return () => {
      ro.disconnect();
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animId);
        sceneRef.current.renderer.dispose();
      }
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      sceneRef.current = null;
    };
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  // Update colors when props change (without rebuilding scene)
  useEffect(() => {
    if (!sceneRef.current) return;
    const { materials } = sceneRef.current;
    if (resinHex) materials.resin.color.set(resinHex);
  }, [resinHex]);

  useEffect(() => {
    if (!sceneRef.current) return;
    const { materials } = sceneRef.current;
    if (woodColor) materials.wood.color.set(woodColor);
  }, [woodColor]);

  useEffect(() => {
    if (!sceneRef.current) return;
    const { materials } = sceneRef.current;
    if (legColor) materials.leg.color.set(legColor);
  }, [legColor]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      style={{ minHeight: 220 }}
    />
  );
}
