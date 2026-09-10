import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { playHoverTick, playLetterFlip } from "../../utils/soundEffects";

export default function NeuroScene({ className = "", onLetterSelect = null }) {
  const mountRef = useRef(null);
  const [inversionAngle, setInversionAngle] = useState(0);
  const [activeLetter, setActiveLetter] = useState("b");
  const sceneRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 560;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Studio Lighting (Linear / Stripe style soft lighting)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xe0f2fe, 2.4);
    keyLight.position.set(5, 6, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x818cf8, 1.6);
    fillLight.position.set(-6, -3, 4);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0x38bdf8, 2.0, 15);
    rimLight.position.set(0, 4, -2);
    scene.add(rimLight);

    // Master Group
    const stageGroup = new THREE.Group();
    scene.add(stageGroup);

    // Central Subtle Core (Soft frosted glass orb)
    const coreGeo = new THREE.SphereGeometry(1.35, 48, 48);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e293b,
      emissive: 0x0f172a,
      roughness: 0.15,
      metalness: 0.1,
      transmission: 0.65,
      thickness: 1.2,
      transparent: true,
      opacity: 0.85
    });
    const coreOrb = new THREE.Mesh(coreGeo, coreMat);
    stageGroup.add(coreOrb);

    // Elegant Orbit Rings (Thin, refined satin lines)
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x334155,
      transparent: true,
      opacity: 0.45
    });
    const ringGeo1 = new THREE.RingGeometry(2.7, 2.715, 96);
    const ring1 = new THREE.Mesh(ringGeo1, ringMat);
    stageGroup.add(ring1);

    const ringGeo2 = new THREE.RingGeometry(3.2, 3.215, 96);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat);
    ring2.rotation.x = Math.PI / 3;
    stageGroup.add(ring2);

    // Helper to create clean, tactile letter tile textures
    const createTileTexture = (char, tag) => {
      const c = document.createElement("canvas");
      c.width = 512;
      c.height = 512;
      const ctx = c.getContext("2d");

      // Soft rounded slate tile background
      ctx.fillStyle = "#0f172a";
      ctx.beginPath();
      ctx.roundRect(16, 16, 480, 480, 48);
      ctx.fill();

      // Subtle edge border
      ctx.lineWidth = 6;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
      ctx.stroke();

      // Clean typography
      ctx.fillStyle = "#f8fafc";
      ctx.font = "600 240px 'Lexend', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(char, 256, 250);

      // Subtitle tag
      ctx.fillStyle = "#94a3b8";
      ctx.font = "500 24px 'Plus Jakarta Sans', sans-serif";
      ctx.fillText(tag, 256, 400);

      return new THREE.CanvasTexture(c);
    };

    const letters = [
      { char: "b", alt: "d", tag: "Left Ascender", angle: 0, radius: 2.7, y: 0 },
      { char: "d", alt: "b", tag: "Right Ascender", angle: Math.PI * 0.5, radius: 2.7, y: 0.2 },
      { char: "p", alt: "q", tag: "Left Descender", angle: Math.PI, radius: 2.7, y: -0.2 },
      { char: "q", alt: "p", tag: "Right Descender", angle: Math.PI * 1.5, radius: 2.7, y: 0 }
    ];

    const tileGeo = new THREE.BoxGeometry(0.9, 0.9, 0.12);
    const tileMeshes = [];

    letters.forEach((item, idx) => {
      const tex = createTileTexture(item.char, item.tag);
      const matFace = new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.25,
        metalness: 0.05
      });
      const matEdge = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.35,
        metalness: 0.1
      });

      const mesh = new THREE.Mesh(tileGeo, [matEdge, matEdge, matEdge, matEdge, matFace, matFace]);
      mesh.userData = {
        item,
        baseAngle: item.angle,
        radius: item.radius,
        baseY: item.y
      };

      stageGroup.add(mesh);
      tileMeshes.push(mesh);
    });

    // Subtle ambient dust
    const pCount = 350;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 20;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x64748b,
      size: 0.08,
      transparent: true,
      opacity: 0.4
    });
    const dust = new THREE.Points(pGeo, pMat);
    scene.add(dust);

    // Mouse Interaction
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height * 2 - 1);
      mouse.tx = x;
      mouse.ty = y;

      if (isDragging) {
        const dx = e.clientX - prevMouse.x;
        const dy = e.clientY - prevMouse.y;
        stageGroup.rotation.y += dx * 0.005;
        stageGroup.rotation.x += dy * 0.005;
        prevMouse = { x: e.clientX, y: e.clientY };
      }
    };

    const onPointerDown = (e) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);

    // Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 560;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    sceneRef.current = {
      tileMeshes,
      stageGroup
    };

    // Animation Loop
    let animId;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) * 0.001;

      // Parallax smoothing
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      if (!isDragging) {
        stageGroup.rotation.y = mouse.x * 0.4 + elapsed * 0.15;
        stageGroup.rotation.x = -mouse.y * 0.3;
      }

      // Position tiles along circular path
      tileMeshes.forEach((mesh) => {
        const u = mesh.userData;
        const curAngle = u.baseAngle + elapsed * 0.15;
        mesh.position.x = Math.cos(curAngle) * u.radius;
        mesh.position.z = Math.sin(curAngle) * u.radius;
        mesh.position.y = u.baseY + Math.sin(elapsed + u.baseAngle) * 0.1;
      });

      // Ambient dust rotation
      dust.rotation.y = elapsed * 0.015;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);

      coreGeo.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      tileGeo.dispose();
      pGeo.dispose();
      coreMat.dispose();
      ringMat.dispose();
      pMat.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Handle Inversion Angle Slider
  const handleInversionChange = (angle) => {
    setInversionAngle(angle);
    if (sceneRef.current && sceneRef.current.tileMeshes) {
      const rad = (angle * Math.PI) / 180;
      sceneRef.current.tileMeshes.forEach((m) => {
        m.rotation.y = rad;
      });
    }
  };

  return (
    <div
      className={`neuro-scene-wrapper ${className}`}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <div ref={mountRef} style={{ width: "100%", height: "100%", cursor: "grab" }} />

      {/* Clean Linear/Stripe Style Spatial Inversion Control */}
      <div
        className="spatial-slider-deck"
        style={{
          position: "absolute",
          bottom: "20px",
          background: "rgba(15, 23, 42, 0.85)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "14px",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
          maxWidth: "480px",
          width: "90%",
          zIndex: 10
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: "140px" }}>
          <span style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase" }}>
            Spatial Inversion
          </span>
          <span style={{ fontSize: "0.85rem", color: "#38bdf8", fontWeight: 700 }}>
            {inversionAngle === 0 ? "Standard Orientation" : inversionAngle === 180 ? "Full Mirror (b ↔ d)" : `${inversionAngle}° Rotation`}
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="180"
          step="1"
          value={inversionAngle}
          onChange={(e) => {
            playHoverTick();
            handleInversionChange(Number(e.target.value));
          }}
          style={{
            flex: 1,
            accentColor: "#38bdf8",
            cursor: "pointer"
          }}
        />

        <button
          onClick={() => {
            playLetterFlip();
            handleInversionChange(inversionAngle === 180 ? 0 : 180);
          }}
          style={{
            background: "rgba(56, 189, 248, 0.12)",
            border: "1px solid rgba(56, 189, 248, 0.3)",
            color: "#38bdf8",
            padding: "6px 12px",
            borderRadius: "8px",
            fontSize: "0.8rem",
            fontWeight: 700,
            cursor: "pointer"
          }}
        >
          {inversionAngle === 180 ? "Reset" : "Flip 180°"}
        </button>
      </div>
    </div>
  );
}