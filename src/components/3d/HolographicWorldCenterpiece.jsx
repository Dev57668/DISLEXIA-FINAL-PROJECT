import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { playHoverTick, playLetterFlip, playSynapsePulse } from "../../utils/soundEffects";

export default function HolographicWorldCenterpiece({
  onSelectDomain = null
}) {
  const mountRef = useRef(null);
  const [activeMode, setActiveMode] = useState("all");
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 900;
    let height = container.clientHeight || 580;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    // Isometric-angled perspective
    camera.position.set(5.5, 4.8, 6.8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // =========================================================================
    // LIGHTING SYSTEM (Sophisticated Studio Atmosphere)
    // =========================================================================
    const ambientLight = new THREE.AmbientLight(0xf1f5f9, 1.0);
    scene.add(ambientLight);

    const softTealKeyLight = new THREE.DirectionalLight(0x2dd4bf, 1.8);
    softTealKeyLight.position.set(6, 8, 6);
    scene.add(softTealKeyLight);

    const warmAmberFillLight = new THREE.DirectionalLight(0xe2b170, 1.4);
    warmAmberFillLight.position.set(-6, 4, -4);
    scene.add(warmAmberFillLight);

    const subtleIrisLight = new THREE.PointLight(0x818cf8, 2.0, 22);
    subtleIrisLight.position.set(0, 4, 2);
    scene.add(subtleIrisLight);

    // Master World Group
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // =========================================================================
    // 1. ISOMETRIC TITANIUM COMMAND DECK (Matte Obsidian Velvet)
    // =========================================================================
    // Base Deck Slab
    const slabGeo = new THREE.BoxGeometry(6.4, 0.28, 5.2);
    const slabMat = new THREE.MeshPhysicalMaterial({
      color: 0x080c14,
      roughness: 0.25,
      metalness: 0.5,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
      transmission: 0.5,
      thickness: 0.8,
      transparent: true,
      opacity: 0.94
    });
    const slabMesh = new THREE.Mesh(slabGeo, slabMat);
    slabMesh.position.y = -0.7;
    worldGroup.add(slabMesh);

    // Subtle Champagne Perimeter Trace
    const neonGeo = new THREE.BoxGeometry(6.46, 0.06, 5.26);
    const neonMat = new THREE.MeshBasicMaterial({
      color: 0xe2b170,
      transparent: true,
      opacity: 0.65
    });
    const neonMesh = new THREE.Mesh(neonGeo, neonMat);
    neonMesh.position.y = -0.84;
    worldGroup.add(neonMesh);

    // Soft Ambient Underglow
    const underlight = new THREE.PointLight(0x2dd4bf, 1.8, 7);
    underlight.position.set(0, -1.2, 0);
    worldGroup.add(underlight);

    // Minimal Titanium Grid Surface
    const deckGrid = new THREE.GridHelper(5.2, 16, 0x334155, 0x0f172a);
    deckGrid.position.y = -0.55;
    deckGrid.material.transparent = true;
    deckGrid.material.opacity = 0.25;
    worldGroup.add(deckGrid);

    // =========================================================================
    // 2. EXTRUDED 3D GLOWING TELEMETRY BAR GRAPHS (Refined Dual-Tone)
    // =========================================================================
    const barGroup = new THREE.Group();
    worldGroup.add(barGroup);

    const barData = [
      // Cluster 1 (Reading Speed & Accuracy - Warm Champagne Amber)
      { x: -1.8, z: 0.8, h: 1.4, color: 0xd97706 },
      { x: -1.5, z: 0.8, h: 1.9, color: 0xe2b170 },
      { x: -1.2, z: 0.8, h: 1.6, color: 0xfbbf24 },
      { x: -1.8, z: 1.1, h: 1.1, color: 0xd97706 },
      { x: -1.5, z: 1.1, h: 2.1, color: 0xe2b170 },
      { x: -1.2, z: 1.1, h: 1.7, color: 0xf59e0b },
      { x: -0.9, z: 0.95, h: 1.3, color: 0xe2b170 },

      // Cluster 2 (Spelling & Word Recognition - Bioluminescent Teal)
      { x: 1.3, z: 0.9, h: 1.2, color: 0x0f766e },
      { x: 1.6, z: 0.9, h: 1.8, color: 0x14b8a6 },
      { x: 1.9, z: 0.9, h: 1.5, color: 0x2dd4bf },
      { x: 1.3, z: 1.2, h: 0.9, color: 0x14b8a6 },
      { x: 1.6, z: 1.2, h: 1.4, color: 0x2dd4bf },
      { x: 1.9, z: 1.2, h: 1.1, color: 0x0f766e },

      // Cluster 3 (Spatial Geometry Towers - Muted Iris)
      { x: 1.9, z: -1.2, h: 1.6, color: 0x6366f1 },
      { x: 2.15, z: -0.9, h: 2.3, color: 0x818cf8 },
      { x: 1.7, z: -0.9, h: 1.3, color: 0x6366f1 }
    ];

    const bars = [];
    barData.forEach((b) => {
      const geo = new THREE.BoxGeometry(0.22, b.h, 0.22);
      const mat = new THREE.MeshStandardMaterial({
        color: b.color,
        roughness: 0.2,
        metalness: 0.6,
        emissive: b.color,
        emissiveIntensity: 0.35,
        transparent: true,
        opacity: 0.92
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(b.x, -0.55 + b.h / 2, b.z);
      barGroup.add(mesh);
      bars.push({ mesh, baseY: -0.55, origH: b.h });
    });

    // =========================================================================
    // 3. FLOATING 3D OPEN KNOWLEDGE BOOK (Center Stage)
    // =========================================================================
    const bookGroup = new THREE.Group();
    bookGroup.position.set(0, 0.35, 0.1);
    worldGroup.add(bookGroup);

    // Left Page
    const pageLeftGeo = new THREE.BoxGeometry(0.95, 0.04, 1.35);
    const pageMat = new THREE.MeshPhysicalMaterial({
      color: 0x0e1726,
      roughness: 0.1,
      metalness: 0.2,
      clearcoat: 0.6,
      transmission: 0.6,
      transparent: true,
      opacity: 0.92
    });
    const pageLeft = new THREE.Mesh(pageLeftGeo, pageMat);
    pageLeft.position.set(-0.52, 0, 0);
    pageLeft.rotation.z = 0.12;
    bookGroup.add(pageLeft);

    // Right Page
    const pageRight = new THREE.Mesh(pageLeftGeo, pageMat);
    pageRight.position.set(0.52, 0, 0);
    pageRight.rotation.z = -0.12;
    bookGroup.add(pageRight);

    // Subtle Glowing Book Spine
    const bookSpineGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.45, 16);
    const bookSpineMat = new THREE.MeshBasicMaterial({ color: 0x2dd4bf });
    const bookSpine = new THREE.Mesh(bookSpineGeo, bookSpineMat);
    bookSpine.rotation.x = Math.PI / 2;
    bookGroup.add(bookSpine);

    const bookCoreLight = new THREE.PointLight(0x2dd4bf, 2.0, 5);
    bookCoreLight.position.set(0, 0.2, 0);
    bookGroup.add(bookCoreLight);

    // =========================================================================
    // 4. FLOATING 3D PARTICLE BRAIN CONSTELLATION
    // =========================================================================
    const brainParticleCount = 850;
    const brainPos = new Float32Array(brainParticleCount * 3);
    const brainColors = new Float32Array(brainParticleCount * 3);

    for (let i = 0; i < brainParticleCount; i++) {
      const isRight = Math.random() > 0.5;
      const hemiSign = isRight ? 1 : -1;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2 * Math.PI;
      const phi = Math.acos(2 * v - 1);

      let x = 0.85 * Math.sin(phi) * Math.cos(theta);
      let y = 0.7 * Math.sin(phi) * Math.sin(theta);
      let z = 1.0 * Math.cos(phi);

      const noise = Math.sin(x * 6) * Math.cos(y * 6) * 0.08;
      x = (x * (1 + noise)) * 0.9 + hemiSign * 0.12;
      y = y * (1 + noise);
      z = z * (1 + noise);

      brainPos[i * 3] = x;
      brainPos[i * 3 + 1] = y + 1.25; // Elevated above the book
      brainPos[i * 3 + 2] = z;

      // Soft Teal to Warm Gold gradient across hemisphere
      if (isRight) {
        brainColors[i * 3] = 0.17; // R
        brainColors[i * 3 + 1] = 0.83; // G
        brainColors[i * 3 + 2] = 0.75; // B (Teal)
      } else {
        brainColors[i * 3] = 0.88; // R
        brainColors[i * 3 + 1] = 0.69; // G
        brainColors[i * 3 + 2] = 0.44; // B (Warm Gold)
      }
    }

    const brainGeo = new THREE.BufferGeometry();
    brainGeo.setAttribute("position", new THREE.BufferAttribute(brainPos, 3));
    brainGeo.setAttribute("color", new THREE.BufferAttribute(brainColors, 3));

    const brainMat = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const brainPoints = new THREE.Points(brainGeo, brainMat);
    bookGroup.add(brainPoints);

    // =========================================================================
    // 5. 3D FLOATING & SUBTLY REARRANGING LETTERS
    //    Visualizes dyslexic rotational mirror inversions (b <-> d, p <-> q, w <-> m)
    // =========================================================================
    const lettersData = [
      { char: "b", mirror: "d", radius: 2.1, speed: 0.45, phase: 0.0, color: "#2dd4bf" },
      { char: "d", mirror: "b", radius: 2.4, speed: 0.52, phase: 1.2, color: "#e2b170" },
      { char: "p", mirror: "q", radius: 2.2, speed: 0.48, phase: 2.5, color: "#818cf8" },
      { char: "q", mirror: "p", radius: 2.5, speed: 0.55, phase: 3.8, color: "#2dd4bf" },
      { char: "w", mirror: "m", radius: 2.0, speed: 0.42, phase: 4.6, color: "#e2b170" },
      { char: "m", mirror: "w", radius: 2.3, speed: 0.50, phase: 5.4, color: "#818cf8" }
    ];

    const letterMeshObjects = [];

    // Helper: Create Canvas Texture with high-resolution crisp typography
    const createLetterTexture = (char, colorStr) => {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, 256, 256);
      // Circular translucent background disk
      ctx.beginPath();
      ctx.arc(128, 128, 110, 0, 2 * Math.PI);
      ctx.fillStyle = "rgba(10, 16, 26, 0.82)";
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = colorStr;
      ctx.stroke();

      // Letter glyph
      ctx.font = "bold 130px 'Lexend', 'Inter', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(char, 128, 134);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    lettersData.forEach((item) => {
      const frontTex = createLetterTexture(item.char, item.color);
      const backTex = createLetterTexture(item.mirror, item.color);

      const diskGroup = new THREE.Group();

      const diskGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.04, 32);
      const diskEdgeMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.7,
        roughness: 0.3
      });

      const frontMat = new THREE.MeshBasicMaterial({ map: frontTex, transparent: true });
      const backMat = new THREE.MeshBasicMaterial({ map: backTex, transparent: true });

      const materials = [
        diskEdgeMat,
        frontMat,
        backMat
      ];

      const diskMesh = new THREE.Mesh(diskGeo, materials);
      diskMesh.rotation.x = Math.PI / 2;
      diskGroup.add(diskMesh);

      worldGroup.add(diskGroup);
      letterMeshObjects.push({
        group: diskGroup,
        data: item,
        mesh: diskMesh
      });
    });

    // =========================================================================
    // 6. MINIMAL CIRCULAR TELEMETRY GAUGE
    // =========================================================================
    const ringGeo = new THREE.RingGeometry(1.1, 1.18, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x2dd4bf,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.set(-1.6, -0.48, -1.2);
    ringMesh.rotation.x = Math.PI / 2;
    worldGroup.add(ringMesh);

    // =========================================================================
    // INTERACTION CONTROLS
    // =========================================================================
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let rotVelocityX = 0;
    let rotVelocityY = 0;

    const handleMouseDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      rotVelocityY += deltaX * 0.0035;
      rotVelocityX += deltaY * 0.002;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    // =========================================================================
    // ANIMATION LOOP (Calm, Silky Harmonic Motion)
    // =========================================================================
    let animationId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Slow, meditative orbit
      if (isRotating && !isDragging) {
        worldGroup.rotation.y += 0.0018;
      }

      // Drag inertia
      worldGroup.rotation.y += rotVelocityY;
      worldGroup.rotation.x += rotVelocityX;
      rotVelocityY *= 0.93;
      rotVelocityX *= 0.93;

      worldGroup.rotation.x = Math.max(-0.35, Math.min(0.55, worldGroup.rotation.x));

      // Organic Harmonic Wave Modulation on Extruded Bars
      bars.forEach((b, i) => {
        const scaleMod = 1.0 + Math.sin(elapsed * 1.2 + i * 0.5) * 0.12;
        b.mesh.scale.y = scaleMod;
        b.mesh.position.y = b.baseY + (b.origH * scaleMod) / 2;
      });

      // Gentle floating of the open book & particle brain
      bookGroup.position.y = 0.28 + Math.sin(elapsed * 0.9) * 0.05;
      bookGroup.rotation.y = Math.sin(elapsed * 0.5) * 0.08;

      // Silky, Continuous Orbital Drift of Letters with Slow Inversion
      letterMeshObjects.forEach((lObj) => {
        const t = elapsed * (lObj.data.speed * 0.65) + lObj.data.phase;
        const x = Math.cos(t) * lObj.data.radius;
        const z = Math.sin(t) * (lObj.data.radius * 0.85);
        const y = 0.6 + Math.sin(t * 1.2) * 0.28;

        lObj.group.position.set(x, y, z);

        // Smooth spatial rotation cycle
        const flipProgress = (Math.sin(elapsed * 0.6 + lObj.data.phase) + 1) / 2;
        lObj.group.rotation.y = -t + flipProgress * Math.PI;
        lObj.group.rotation.z = Math.sin(t) * 0.12;
      });

      // Gauge ring rotation
      ringMesh.rotation.z += 0.003;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isRotating]);

  return (
    <div className="holo-centerpiece-container">
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="holo-canvas-wrapper" />

      {/* Top HUD Status */}
      <div className="holo-overlay-header">
        <div className="holo-live-tag">
          <span className="holo-dot" />
          <span className="holo-title">COGNITIVE OBSERVATION VIEWPORT</span>
        </div>
        <div className="holo-fps">3D REALTIME 60 FPS</div>
      </div>

      {/* Subtle Callout Tags */}
      <div className="deck-quick-tags">
        <span className="deck-badge teal">ORTHOGRAPHY</span>
        <span className="deck-badge amber">FLUENCY</span>
        <span className="deck-badge iris">SPATIAL</span>
      </div>

      {/* Bottom Interactive Controls Bar */}
      <div className="holo-controls-bar">
        <div className="holo-mode-buttons">
          <button
            className={`holo-ctrl-btn ${isRotating ? "active" : ""}`}
            onClick={() => {
              playHoverTick();
              setIsRotating((prev) => !prev);
            }}
          >
            {isRotating ? "Orbiting ⏸" : "Resume Orbit ▶"}
          </button>
        </div>

        <span className="holo-hint-tag">Drag mouse to freely inspect 3D deck</span>
      </div>
    </div>
  );
}
