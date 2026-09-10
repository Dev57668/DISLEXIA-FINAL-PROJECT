import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { playHoverTick, playSynapsePulse } from "../../utils/soundEffects";
import { IconSunAltar, IconRefresh, IconShapes } from "../Icons";

/**
 * ShapeViewer3D - The Sunstone Altar
 * Restyled for the hand-drawn 2.5D jungle world:
 * - Warm sunlit lighting casting soft shadows onto a carved ancient sandstone altar
 * - Stylized toon crystal solids with hand-inked dark outlines
 * - Wooden bamboo controls with tactile audio feedback
 */
export default function ShapeViewer3D({
  shape = "cube",
  color = "#22c55e",
  height = 280,
  interactive = true
}) {
  const mountRef = useRef(null);
  const [wireframe, setWireframe] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  const materialRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const h = height;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / h, 0.1, 100);
    camera.position.set(3.4, 2.8, 4.4);
    camera.lookAt(0, 0.2, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Warm Tropical Jungle Lighting
    const hemiLight = new THREE.HemisphereLight(0xffedd5, 0x84cc16, 1.4); // Sun sky & grass bounce
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xfef08a, 2.2);
    sunLight.position.set(5, 8, 4);
    sunLight.castShadow = true;
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0xfffdf2, 0.8);
    scene.add(ambientLight);

    // Ancient Sandstone Altar Pedestal
    const altarGeo = new THREE.CylinderGeometry(2.4, 2.6, 0.35, 32);
    const altarMat = new THREE.MeshStandardMaterial({
      color: 0xd4a373,
      roughness: 0.85,
      metalness: 0.1
    });
    const altar = new THREE.Mesh(altarGeo, altarMat);
    altar.position.y = -1.35;
    scene.add(altar);

    // Carved Altar Rim Ring
    const rimGeo = new THREE.TorusGeometry(2.4, 0.08, 16, 32);
    const rimMat = new THREE.MeshBasicMaterial({ color: 0x78350f });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.rotation.x = Math.PI / 2;
    rim.position.y = -1.18;
    scene.add(rim);

    // Shape Geometry Generator based on shape name
    const normalized = (shape || "").toLowerCase();
    let geometry;

    if (normalized.includes("sphere") || normalized.includes("circle")) {
      geometry = new THREE.SphereGeometry(1.3, 32, 32);
    } else if (normalized.includes("cylinder")) {
      geometry = new THREE.CylinderGeometry(0.95, 0.95, 2.0, 32);
    } else if (normalized.includes("cone")) {
      geometry = new THREE.ConeGeometry(1.15, 2.1, 32);
    } else if (normalized.includes("pyramid")) {
      geometry = new THREE.ConeGeometry(1.35, 1.9, 4); // 4 sides = square pyramid
    } else if (normalized.includes("prism") || normalized.includes("triangle")) {
      geometry = new THREE.CylinderGeometry(1.15, 1.15, 2.0, 3); // triangular prism
    } else if (normalized.includes("octa") || normalized.includes("diamond")) {
      geometry = new THREE.OctahedronGeometry(1.3);
    } else {
      // Default: Cube / Rectangular Prism
      geometry = new THREE.BoxGeometry(1.65, 1.65, 1.65);
    }

    // Hand-Drawn / Cel-Shaded Style Material
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color || "#22c55e"),
      roughness: 0.3,
      metalness: 0.15,
      wireframe: false
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 0.2;
    scene.add(mesh);

    // Dark Hand-Inked Contour Edges
    const edgesGeo = new THREE.EdgesGeometry(geometry);
    const edgesMat = new THREE.LineBasicMaterial({
      color: 0x451a03,
      linewidth: 3
    });
    const edgeLines = new THREE.LineSegments(edgesGeo, edgesMat);
    mesh.add(edgeLines);

    // Drag Interaction (Touch & Pointer)
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };

    const onPointerDown = (e) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouse.x;
      const dy = e.clientY - prevMouse.y;
      mesh.rotation.y += dx * 0.015;
      mesh.rotation.x += dy * 0.015;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    if (interactive) {
      container.addEventListener("pointerdown", onPointerDown);
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
    }

    // Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Render Loop
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (isRotating && !isDragging) {
        mesh.rotation.y += 0.011;
        mesh.rotation.x += 0.005;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      if (interactive) {
        container.removeEventListener("pointerdown", onPointerDown);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
      }
      geometry.dispose();
      material.dispose();
      edgesGeo.dispose();
      edgesMat.dispose();
      altarGeo.dispose();
      altarMat.dispose();
      rimGeo.dispose();
      rimMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [shape, color, height, interactive, isRotating]);

  const toggleWireframe = () => {
    playHoverTick();
    const next = !wireframe;
    setWireframe(next);
    if (materialRef.current) {
      materialRef.current.wireframe = next;
    }
  };

  const toggleSpin = () => {
    playHoverTick();
    setIsRotating((prev) => !prev);
  };

  return (
    <div
      className="sunstone-altar-container"
      style={{
        position: "relative",
        width: "100%",
        height: `${height}px`,
        borderRadius: "24px",
        overflow: "hidden",
        background: "radial-gradient(circle at 50% 35%, #fffdf2 0%, #fefae0 65%, #fef08a 100%)",
        border: "3.5px solid #78350f",
        boxShadow: "0 8px 0 #78350f, 0 12px 24px rgba(69, 26, 3, 0.15)",
        cursor: interactive ? "grab" : "default"
      }}
    >
      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />

      {/* Top Tag */}
      <div
        style={{
          position: "absolute",
          top: "12px",
          left: "14px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          background: "#ecfccb",
          border: "2px solid #65a30d",
          borderRadius: "10px 12px 10px 12px",
          padding: "4px 12px",
          fontSize: "0.82rem",
          fontWeight: 700,
          fontFamily: "var(--font-display)",
          color: "#365314"
        }}
      >
        <span><IconSunAltar size={16} /></span>
        <span>SUNSTONE ALTAR • 3D SPATIAL ROTATION</span>
      </div>

      {/* Interactive Controls Bar: Bamboo Wooden Buttons */}
      <div
        className="altar-toolbar"
        style={{
          position: "absolute",
          bottom: "14px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "10px",
          background: "#fffdf2",
          border: "2.5px solid #78350f",
          borderRadius: "12px 14px 11px 13px",
          padding: "4px 12px",
          boxShadow: "0 3px 0 #78350f",
          zIndex: 10
        }}
      >
        <button
          onClick={toggleSpin}
          style={{
            background: "transparent",
            border: "none",
            color: isRotating ? "#15803d" : "#78350f",
            fontSize: "0.84rem",
            fontWeight: 800,
            fontFamily: "var(--font-display)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "5px"
          }}
        >
          <span><IconRefresh size={15} /></span> {isRotating ? "Pause Spin" : "Auto Spin"}
        </button>

        <span style={{ color: "#d97706", fontWeight: 700 }}>•</span>

        <button
          onClick={toggleWireframe}
          style={{
            background: "transparent",
            border: "none",
            color: wireframe ? "#ea580c" : "#78350f",
            fontSize: "0.84rem",
            fontWeight: 800,
            fontFamily: "var(--font-display)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "5px"
          }}
        >
          <span><IconShapes size={15} /></span> {wireframe ? "Solid Stone" : "Crystal Wireframe"}
        </button>
      </div>

      {/* Touch/Drag Guide */}
      <div
        style={{
          position: "absolute",
          top: "12px",
          right: "16px",
          fontSize: "0.78rem",
          fontWeight: 700,
          fontFamily: "var(--font-display)",
          color: "#b45309",
          pointerEvents: "none"
        }}
      >
        Drag to Rotate
      </div>
    </div>
  );
}