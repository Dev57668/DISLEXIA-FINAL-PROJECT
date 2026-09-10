import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { playHoverTick, playLetterFlip, playSynapsePulse } from "../../utils/soundEffects";

export default function CinematicNeuralCanvas({
  onSelectLobe = null,
  activeModule = null
}) {
  const mountRef = useRef(null);
  const [inversionAngle, setInversionAngle] = useState(0);
  const [activeLetter, setActiveLetter] = useState("b");
  const [activeLobe, setActiveLobe] = useState("occipital");
  const [calloutPositions, setCalloutPositions] = useState({
    occipital: { x: 0, y: 0, visible: false },
    temporal: { x: 0, y: 0, visible: false },
    parietal: { x: 0, y: 0, visible: false },
    frontal: { x: 0, y: 0, visible: false }
  });

  const letterMeshRef = useRef(null);
  const letterGroupRef = useRef(null);
  const brainGroupRef = useRef(null);
  const letters = ["b", "d", "p", "q"];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 560;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 7.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // =========================================================================
    // LIGHTING: Cinematic Studio Depth
    // =========================================================================
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const cyanKeyLight = new THREE.DirectionalLight(0x00f2fe, 3.2);
    cyanKeyLight.position.set(6, 6, 6);
    scene.add(cyanKeyLight);

    const violetFillLight = new THREE.DirectionalLight(0xa855f7, 2.5);
    violetFillLight.position.set(-6, -4, 4);
    scene.add(violetFillLight);

    const rimLight = new THREE.PointLight(0x38bdf8, 4.0, 20);
    rimLight.position.set(0, 5, -3);
    scene.add(rimLight);

    // =========================================================================
    // MASTER HOLOGRAPHIC BRAIN GROUP
    // =========================================================================
    const brainGroup = new THREE.Group();
    brainGroupRef.current = brainGroup;
    scene.add(brainGroup);

    // =========================================================================
    // 1. PROCEDURAL 3D NEURAL BRAIN PARTICLE CONSTELLATION (Moffett AI style)
    // =========================================================================
    const particleCount = 1800;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const particleData = [];

    const baseColorCyan = new THREE.Color(0x38bdf8);
    const baseColorViolet = new THREE.Color(0x818cf8);
    const baseColorAmber = new THREE.Color(0xf59e0b);
    const baseColorEmerald = new THREE.Color(0x10b981);

    // Generate dual-hemisphere brain geometry with organic gyri & sulci
    for (let i = 0; i < particleCount; i++) {
      // Hemisphere sign: left (-1) or right (+1) with inter-hemispheric fissure gap
      const isRight = Math.random() > 0.5;
      const hemiSign = isRight ? 1 : -1;

      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);

      // Ellipsoid radii matching human brain proportions
      const rx = 1.35;
      const ry = 1.15;
      const rz = 1.65;

      let x = rx * Math.sin(phi) * Math.cos(theta);
      let y = ry * Math.sin(phi) * Math.sin(theta);
      let z = rz * Math.cos(phi);

      // Organic lobe deformation & gyri folding noise
      const gyriWave = Math.sin(x * 6.0) * Math.cos(y * 6.0) * Math.sin(z * 6.0) * 0.12;
      const sulciWave = Math.cos(x * 12.0) * 0.05;
      const radiusMod = 1.0 + gyriWave + sulciWave;

      x *= radiusMod;
      y *= radiusMod;
      z *= radiusMod;

      // Flatten inferior base (ventral surface)
      if (y < -0.4) y *= 0.75;

      // Add inter-hemispheric separation
      x = x * 0.88 + hemiSign * 0.18;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Assign lobe color coding
      let pColor = baseColorCyan;
      if (z < -0.6) {
        // Occipital lobe (Visual)
        pColor = baseColorCyan;
      } else if (Math.abs(x) > 0.8 && y < 0.2) {
        // Temporal lobe (Auditory speech)
        pColor = baseColorViolet;
      } else if (y > 0.4 && z > 0) {
        // Parietal lobe (Spatial geometry)
        pColor = baseColorEmerald;
      } else {
        // Frontal & Executive
        pColor = baseColorAmber;
      }

      colors[i * 3] = pColor.r;
      colors[i * 3 + 1] = pColor.g;
      colors[i * 3 + 2] = pColor.b;

      particleData.push({
        origX: x,
        origY: y,
        origZ: z,
        phase: Math.random() * Math.PI * 2,
        speed: 0.8 + Math.random() * 1.5,
        energy: 0.5 + Math.random() * 0.5
      });
    }

    const brainGeometry = new THREE.BufferGeometry();
    brainGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    brainGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Glow dot texture
    const canvasDot = document.createElement("canvas");
    canvasDot.width = 32;
    canvasDot.height = 32;
    const ctxDot = canvasDot.getContext("2d");
    const gradient = ctxDot.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.3, "rgba(100, 200, 255, 0.8)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctxDot.fillStyle = gradient;
    ctxDot.fillRect(0, 0, 32, 32);

    const dotTexture = new THREE.CanvasTexture(canvasDot);

    const brainMaterial = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      map: dotTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const brainPoints = new THREE.Points(brainGeometry, brainMaterial);
    brainGroup.add(brainPoints);

    // =========================================================================
    // 2. SYNAPTIC FILAMENT LINES (Moffett AI wireframe connection network)
    // =========================================================================
    const maxConnections = 1200;
    const linePositions = new Float32Array(maxConnections * 6);
    const lineColors = new Float32Array(maxConnections * 6);

    let connectionCount = 0;
    const connectionDistSq = 0.42 * 0.42;

    for (let i = 0; i < particleCount && connectionCount < maxConnections; i += 2) {
      for (let j = i + 1; j < particleCount && connectionCount < maxConnections; j += 3) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < connectionDistSq) {
          const idx = connectionCount * 6;
          linePositions[idx] = positions[i * 3];
          linePositions[idx + 1] = positions[i * 3 + 1];
          linePositions[idx + 2] = positions[i * 3 + 2];

          linePositions[idx + 3] = positions[j * 3];
          linePositions[idx + 4] = positions[j * 3 + 1];
          linePositions[idx + 5] = positions[j * 3 + 2];

          const alpha = 1.0 - Math.sqrt(distSq) / 0.42;
          lineColors[idx] = 0.22 * alpha;
          lineColors[idx + 1] = 0.65 * alpha;
          lineColors[idx + 2] = 0.95 * alpha;

          lineColors[idx + 3] = 0.45 * alpha;
          lineColors[idx + 4] = 0.35 * alpha;
          lineColors[idx + 5] = 0.95 * alpha;

          connectionCount++;
        }
      }
    }

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions.slice(0, connectionCount * 6), 3)
    );
    linesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(lineColors.slice(0, connectionCount * 6), 3)
    );

    const linesMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });

    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    brainGroup.add(linesMesh);

    // =========================================================================
    // 3. GENERATIVE 3D FLUID WAVE RIBBON (Inspired by Reference Image 3)
    // =========================================================================
    const waveWidth = 40;
    const waveLength = 120;
    const waveGeo = new THREE.PlaneGeometry(16, 8, waveWidth, waveLength);
    const waveMat = new THREE.MeshPhysicalMaterial({
      color: 0x8b5cf6,
      emissive: 0x2e1065,
      roughness: 0.2,
      metalness: 0.3,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending
    });
    const waveMesh = new THREE.Mesh(waveGeo, waveMat);
    waveMesh.rotation.x = -Math.PI / 2.3;
    waveMesh.position.set(0, -2.4, -1.0);
    scene.add(waveMesh);

    // Ambient floating stardust embers
    const stardustCount = 300;
    const stardustGeo = new THREE.BufferGeometry();
    const stardustPos = new Float32Array(stardustCount * 3);
    for (let s = 0; s < stardustCount * 3; s += 3) {
      stardustPos[s] = (Math.random() - 0.5) * 14;
      stardustPos[s + 1] = (Math.random() - 0.5) * 8;
      stardustPos[s + 2] = (Math.random() - 0.5) * 10;
    }
    stardustGeo.setAttribute("position", new THREE.BufferAttribute(stardustPos, 3));
    const stardustMat = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const stardustPoints = new THREE.Points(stardustGeo, stardustMat);
    scene.add(stardustPoints);

    // =========================================================================
    // 4. FLOATING 3D TACTILE LETTER TILE (Embedded with Inversion Feature)
    // =========================================================================
    const letterGroup = new THREE.Group();
    letterGroupRef.current = letterGroup;
    letterGroup.position.set(2.4, 0.4, 1.2);
    scene.add(letterGroup);

    const tileGeo = new THREE.BoxGeometry(1.2, 1.4, 0.25);
    const tileMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      roughness: 0.1,
      metalness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transmission: 0.75,
      thickness: 0.8,
      transparent: true,
      opacity: 0.95
    });
    const tileMesh = new THREE.Mesh(tileGeo, tileMat);
    letterGroup.add(tileMesh);

    // Create Canvas Texture for active letter
    const updateTileGlyph = (letter) => {
      const tileCanvas = document.createElement("canvas");
      tileCanvas.width = 512;
      tileCanvas.height = 512;
      const c = tileCanvas.getContext("2d");

      c.fillStyle = "#090d16";
      c.fillRect(0, 0, 512, 512);

      // Glowing border frame
      c.strokeStyle = "#38bdf8";
      c.lineWidth = 14;
      c.strokeRect(16, 16, 480, 480);

      // Subtle grid
      c.strokeStyle = "rgba(56, 189, 248, 0.12)";
      c.lineWidth = 2;
      for (let p = 64; p < 480; p += 64) {
        c.beginPath();
        c.moveTo(p, 20);
        c.lineTo(p, 492);
        c.stroke();
        c.beginPath();
        c.moveTo(20, p);
        c.lineTo(492, p);
        c.stroke();
      }

      // Letter glyph
      c.font = "bold 320px 'Lexend', 'Plus Jakarta Sans', sans-serif";
      c.textAlign = "center";
      c.textBaseline = "middle";
      c.fillStyle = "#f8fafc";
      c.shadowColor = "#38bdf8";
      c.shadowBlur = 35;
      c.fillText(letter, 256, 275);

      const glyphTex = new THREE.CanvasTexture(tileCanvas);
      const faceMat = new THREE.MeshBasicMaterial({ map: glyphTex, transparent: true });

      if (letterMeshRef.current) {
        letterGroup.remove(letterMeshRef.current);
      }

      const glyphPlane = new THREE.Mesh(new THREE.PlaneGeometry(1.15, 1.35), faceMat);
      glyphPlane.position.z = 0.13;
      letterMeshRef.current = glyphPlane;
      letterGroup.add(glyphPlane);
    };

    updateTileGlyph("b");

    // =========================================================================
    // INTERACTIVITY: Mouse Parallax & Orbit
    // =========================================================================
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / height - 0.5;
      mouseX = relX * 2;
      mouseY = relY * 2;
    };

    container.addEventListener("mousemove", handleMouseMove);

    // =========================================================================
    // LOBE ANCHOR POSITIONS (for Moffett AI style technical callout projections)
    // =========================================================================
    const lobe3DAnchors = {
      occipital: new THREE.Vector3(0, -0.3, -1.5),
      temporal: new THREE.Vector3(1.35, -0.25, 0.2),
      parietal: new THREE.Vector3(-0.9, 0.75, -0.4),
      frontal: new THREE.Vector3(0, 0.85, 1.25)
    };

    const projectVector = (v3) => {
      const p = v3.clone();
      brainGroup.localToWorld(p);
      p.project(camera);
      const hw = width / 2;
      const hh = height / 2;
      return {
        x: p.x * hw + hw,
        y: -(p.y * hh) + hh,
        visible: p.z < 1
      };
    };

    // =========================================================================
    // ANIMATION LOOP
    // =========================================================================
    let animationId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth brain rotation with gentle mouse inertia
      targetRotY += 0.003;
      brainGroup.rotation.y += (targetRotY + mouseX * 0.45 - brainGroup.rotation.y) * 0.05;
      brainGroup.rotation.x += (mouseY * 0.3 - brainGroup.rotation.x) * 0.05;

      // Float tile
      letterGroup.position.y = 0.4 + Math.sin(elapsed * 1.8) * 0.12;

      // Animate fluid wave ribbon
      const wavePos = waveGeo.attributes.position;
      for (let w = 0; w < wavePos.count; w++) {
        const u = wavePos.getX(w);
        const v = wavePos.getY(w);
        const zWave = Math.sin(u * 0.8 + elapsed * 1.5) * Math.cos(v * 0.6 + elapsed * 1.2) * 0.6;
        wavePos.setZ(w, zWave);
      }
      waveGeo.attributes.position.needsUpdate = true;

      // Project callout positions
      const occ = projectVector(lobe3DAnchors.occipital);
      const temp = projectVector(lobe3DAnchors.temporal);
      const par = projectVector(lobe3DAnchors.parietal);
      const fro = projectVector(lobe3DAnchors.frontal);

      setCalloutPositions({
        occipital: occ,
        temporal: temp,
        parietal: par,
        frontal: fro
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 800;
      height = container.clientHeight || 560;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update Inversion Slider
  const handleInversionChange = (e) => {
    const angle = Number(e.target.value);
    setInversionAngle(angle);
    if (letterGroupRef.current) {
      letterGroupRef.current.rotation.y = (angle * Math.PI) / 180;
    }
  };

  const flipLetter = () => {
    playLetterFlip();
    const next = inversionAngle === 0 ? 180 : 0;
    setInversionAngle(next);
    if (letterGroupRef.current) {
      letterGroupRef.current.rotation.y = (next * Math.PI) / 180;
    }
  };

  const selectLobe = (key) => {
    playSynapsePulse();
    setActiveLobe(key);
    if (onSelectLobe) onSelectLobe(key);
  };

  return (
    <div className="cinematic-canvas-wrapper" ref={mountRef}>
      {/* =====================================================================
          MOFFETT AI STYLE TECHNICAL CALLOUT OVERLAYS
          ===================================================================== */}
      {calloutPositions.occipital.visible && (
        <div
          className={`neural-callout callout-occipital ${activeLobe === "occipital" ? "active" : ""}`}
          style={{
            transform: `translate(${calloutPositions.occipital.x}px, ${calloutPositions.occipital.y}px)`
          }}
          onClick={() => selectLobe("occipital")}
        >
          <div className="callout-line" />
          <div className="callout-content">
            <span className="callout-tag">[OCCIPITAL CORTEX]</span>
            <strong className="callout-title">Visual Orthography</strong>
            <p className="callout-desc">Mirror Inversion & Tracking</p>
          </div>
        </div>
      )}

      {calloutPositions.temporal.visible && (
        <div
          className={`neural-callout callout-temporal ${activeLobe === "temporal" ? "active" : ""}`}
          style={{
            transform: `translate(${calloutPositions.temporal.x}px, ${calloutPositions.temporal.y}px)`
          }}
          onClick={() => selectLobe("temporal")}
        >
          <div className="callout-line" />
          <div className="callout-content">
            <span className="callout-tag">[TEMPORAL LOBE]</span>
            <strong className="callout-title">Phonological Loop</strong>
            <p className="callout-desc">Speech Sound Awareness</p>
          </div>
        </div>
      )}

      {calloutPositions.parietal.visible && (
        <div
          className={`neural-callout callout-parietal ${activeLobe === "parietal" ? "active" : ""}`}
          style={{
            transform: `translate(${calloutPositions.parietal.x}px, ${calloutPositions.parietal.y}px)`
          }}
          onClick={() => selectLobe("parietal")}
        >
          <div className="callout-line" />
          <div className="callout-content">
            <span className="callout-tag">[PARIETAL CORTEX]</span>
            <strong className="callout-title">3D Spatial Geometry</strong>
            <p className="callout-desc">Structural Mental Rotation</p>
          </div>
        </div>
      )}

      {calloutPositions.frontal.visible && (
        <div
          className={`neural-callout callout-frontal ${activeLobe === "frontal" ? "active" : ""}`}
          style={{
            transform: `translate(${calloutPositions.frontal.x}px, ${calloutPositions.frontal.y}px)`
          }}
          onClick={() => selectLobe("frontal")}
        >
          <div className="callout-line" />
          <div className="callout-content">
            <span className="callout-tag">[FRONTAL LOBE]</span>
            <strong className="callout-title">Executive Fluency</strong>
            <p className="callout-desc">Working Memory & Logic</p>
          </div>
        </div>
      )}

      {/* Floating Tactical Inversion Controller */}
      <div className="tactical-inversion-overlay">
        <div className="inversion-hud-header">
          <span className="hud-indicator-dot" />
          <span className="hud-title">SPATIAL INVERSION TELEMETRY</span>
          <span className="hud-angle-val">{inversionAngle}°</span>
        </div>

        <div className="inversion-slider-row">
          <span className="slider-edge-label">0° NORMAL</span>
          <input
            type="range"
            min="0"
            max="180"
            step="1"
            value={inversionAngle}
            onChange={handleInversionChange}
            className="hud-range-slider"
          />
          <span className="slider-edge-label">180° REVERSED</span>
        </div>

        <div className="inversion-actions-row">
          <button className="hud-flip-btn" onClick={flipLetter}>
            <span>FLIP MIRROR (180°)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
