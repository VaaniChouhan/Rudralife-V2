import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeHeroOrb() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Dimensions
    const width = containerRef.current.clientWidth || 300;
    const height = containerRef.current.clientHeight || 300;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    const isMobile = window.innerWidth < 768;
    camera.position.z = isMobile ? 4.3 : 5.6;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    // 1. Particle Texture creation programmatically with a hot center and a soft volumetric halo
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const ctx = pCanvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');     // Pure brilliant center
    grad.addColorStop(0.12, 'rgba(255, 230, 150, 0.95)'); // Warm glowing inner halo
    grad.addColorStop(0.35, 'rgba(215, 150, 45, 0.45)');  // Golden amber body
    grad.addColorStop(0.75, 'rgba(150, 75, 15, 0.12)');   // Soft terracotta volumetric tail
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);
    const texture = new THREE.CanvasTexture(pCanvas);

    // 2. Volumetric Glow Sprite behind the bead (gives the "sacred volumetric golden light" background)
    const glowCanvas = document.createElement('canvas');
    glowCanvas.width = 64;
    glowCanvas.height = 64;
    const gCtx = glowCanvas.getContext('2d');
    const gGrad = gCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gGrad.addColorStop(0, 'rgba(235, 160, 40, 0.38)');   // Golden core glow
    gGrad.addColorStop(0.32, 'rgba(180, 95, 20, 0.18)');  // Soft warm amber halo
    gGrad.addColorStop(0.75, 'rgba(90, 40, 5, 0.05)');     // Dimming warm red boundary
    gGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    gCtx.fillStyle = gGrad;
    gCtx.fillRect(0, 0, 64, 64);
    const glowTexture = new THREE.CanvasTexture(glowCanvas);

    const glowMaterial = new THREE.SpriteMaterial({
      map: glowTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.92
    });
    const glowSprite = new THREE.Sprite(glowMaterial);
    glowSprite.scale.set(4.8, 4.8, 1.0);
    scene.add(glowSprite);

    // 3. Particle Configuration
    // We split particles into three dedicated classes:
    // - mainCount: 100% original surface forming the rugged Rudraksha
    // - yantraCount: Embedded glowing mathematical lines (Yantras) conforming to the ridges
    // - coreCount: Energy center particles glowing inside the bead
    const mainCount = 30000;
    const yantraCount = 8000;
    const coreCount = 6000;
    const particleCount = mainCount + yantraCount + coreCount;

    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Math Parameters for Rudraksha Bead
    const R = 1.62; // Base radius
    const mukhiCount = 5; // Authentic 5-mukhi

    // Mathematical formula defining the organic, rugged, multi-faceted geometry of a real Rudraksha
    const getBeadRadius = (theta, phi) => {
      const grooveFactor = Math.sin(phi); // Grooves taper and converge cleanly at poles
      
      // Extremely sharp, deep vertical lines (Mukhis) separating the segments
      const groove = Math.pow(0.5 + 0.5 * Math.cos(theta * mukhiCount), 14.0) * 0.44 * grooveFactor;

      // Central canal / natural polar opening shape
      const shapeFactor = 0.82 + 0.18 * Math.sin(phi);

      // Multi-frequency rugged bumps (Fractional Brownian Motion simulation for wood bark)
      const bump1 = Math.sin(theta * 14) * Math.cos(phi * 14) * 0.11;
      const bump2 = Math.sin(theta * 28 + 1.2) * Math.sin(phi * 24 + 0.4) * 0.07;
      const bump3 = Math.cos(theta * 56) * Math.cos(phi * 52) * 0.035;
      const bump4 = Math.sin(theta * 110) * Math.cos(phi * 110) * 0.015; // Fine grain micro-texture

      const macroRidges = Math.cos(phi * 6) * 0.035;

      return R * shapeFactor - Math.abs(groove) + bump1 + bump2 + bump3 + bump4 + macroRidges;
    };

    // Generate Particles
    for (let i = 0; i < particleCount; i++) {
      let x = 0, y = 0, z = 0;
      let r = 0, g = 0, b = 0;

      if (i < mainCount) {
        // --- CLASS A: RUGGED BEAD SURFACE ---
        const u = Math.random();
        const v = Math.random();
        const theta = u * Math.PI * 2;
        const phi = Math.acos(2 * v - 1);

        const currentR = getBeadRadius(theta, phi);

        x = currentR * Math.sin(phi) * Math.cos(theta);
        y = currentR * Math.cos(phi);
        z = currentR * Math.sin(phi) * Math.sin(theta);

        // Height factor for ambient occlusion (crevices are dark wood; peaks are shimmering gold)
        let heightFactor = (currentR - 1.05) / 0.8;
        heightFactor = Math.max(0, Math.min(1, heightFactor));

        // Crevice: Deep rich terracotta & mahogany teak wood
        const cBase = { r: 0.28, g: 0.11, b: 0.04 };
        // Slopes: Warm glowing copper & amber gold
        const cMid = { r: 0.72, g: 0.46, b: 0.16 };
        // Peaks: Shimmering brilliant gold highlights
        const cPeak = { r: 0.98, g: 0.80, b: 0.30 };

        if (heightFactor < 0.4) {
          const t = heightFactor / 0.4;
          r = cBase.r + (cMid.r - cBase.r) * t;
          g = cBase.g + (cMid.g - cBase.g) * t;
          b = cBase.b + (cMid.b - cBase.b) * t;
        } else {
          const t = (heightFactor - 0.4) / 0.6;
          r = cMid.r + (cPeak.r - cMid.r) * t;
          g = cMid.g + (cPeak.g - cMid.g) * t;
          b = cMid.b + (cPeak.b - cMid.b) * t;
        }

        // Add 12% high-contrast dazzling gold sparkles for that shimmering look
        if (Math.random() < 0.12) {
          r = 1.0; g = 0.94; b = 0.65;
        } else {
          // Add organic color variance for wood realism
          const variance = (Math.random() - 0.5) * 0.05;
          r = Math.max(0, Math.min(1, r + variance));
          g = Math.max(0, Math.min(1, g + variance));
          b = Math.max(0, Math.min(1, b + variance));
        }

      } else if (i < mainCount + yantraCount) {
        // --- CLASS B: SACRED GEOMETRY YANTRAS ---
        // Float precisely above the ridges in elegant mathematical paths
        const j = i - mainCount;
        let theta = 0;
        let phi = 0;

        if (j < 2200) {
          // Double Helical Spirals (Interlocking sacred geometry diamond mesh)
          const t = (j % 1100) / 1100;
          phi = 0.12 + t * (Math.PI - 0.24);
          const isSpiralB = j >= 1100;
          theta = (isSpiralB ? -1 : 1) * phi * 7.5 + (isSpiralB ? Math.PI : 0);
        } else if (j < 3700) {
          // Vertical lines (Meridians) running perfectly down the center of each of the 5 Mukhi Ridges
          const k = Math.floor((j - 2200) / 300);
          theta = (k * 2 * Math.PI / 5) + (Math.PI / 5); // halfway between deep grooves
          const t = ((j - 2200) % 300) / 300;
          phi = 0.12 + t * (Math.PI - 0.24);
        } else if (j < 5700) {
          // Concentric Latitudinal Rings (Circles representing energy shells)
          const k = Math.floor((j - 3700) / 400);
          const ringPhis = [Math.PI / 2, Math.PI / 3, 2 * Math.PI / 3, Math.PI / 4, 3 * Math.PI / 4];
          phi = ringPhis[k];
          const t = ((j - 3700) % 400) / 400;
          theta = t * 2 * Math.PI;
        } else {
          // Wavy Sacred Equator Ribbon (Epicycloid/trochoid wave representing Kundalini/Sri Yantra lines)
          const t = (j - 5700) / 2300;
          theta = t * 2 * Math.PI * 2; // double wrap for density
          phi = Math.PI / 2 + Math.sin(theta * 8) * 0.16;
        }

        // Project onto bead radius, floating exactly 0.04 units above the surface
        const currentR = getBeadRadius(theta, phi) + 0.04;

        x = currentR * Math.sin(phi) * Math.cos(theta);
        y = currentR * Math.cos(phi);
        z = currentR * Math.sin(phi) * Math.sin(theta);

        // Radiant, celestial divine white-gold
        r = 1.0; g = 0.95; b = 0.78;

      } else {
        // --- CLASS C: BURNING EMBERS CORE ---
        // Distributed near the core within radius 0.85 to shine from within
        const rCore = Math.pow(Math.random(), 1.6) * 0.85;
        const u = Math.random();
        const v = Math.random();
        const theta = u * Math.PI * 2;
        const phi = Math.acos(2 * v - 1);

        x = rCore * Math.sin(phi) * Math.cos(theta);
        y = rCore * Math.cos(phi);
        z = rCore * Math.sin(phi) * Math.sin(theta);

        // Molten golden-orange core energy
        const t = Math.random();
        r = 1.0;
        g = 0.40 + t * 0.40; // Range from sacred orange-red to yellow fire
        b = 0.04 + t * 0.15;
      }

      const i3 = i * 3;
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;

      velocities[i3] = 0;
      velocities[i3 + 1] = 0;
      velocities[i3 + 2] = 0;

      colors[i3] = r;
      colors[i3 + 1] = g;
      colors[i3 + 2] = b;
    }

    const geometry = new THREE.BufferAttribute(positions, 3);
    const colorGeometry = new THREE.BufferAttribute(colors, 3);
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', geometry);
    particleGeometry.setAttribute('color', colorGeometry);

    // Points material with vertexColors enabled
    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.048 : 0.034, // fine size for sharp details
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
      opacity: 0.96
    });

    const points = new THREE.Points(particleGeometry, material);
    scene.add(points);

    // Mouse Tracking setup
    const mouse = new THREE.Vector2(-999, -999);
    const targetMouse = new THREE.Vector2(-999, -999);
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0); // Intersection plane

    const handlePointerMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      targetMouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      targetMouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handlePointerLeave = () => {
      targetMouse.set(-999, -999);
    };

    const dom = containerRef.current;
    dom.addEventListener('mousemove', handlePointerMove);
    dom.addEventListener('mouseleave', handlePointerLeave);
    dom.addEventListener('touchstart', handlePointerMove, { passive: true });
    dom.addEventListener('touchmove', handlePointerMove, { passive: true });
    dom.addEventListener('touchend', handlePointerLeave);

    // Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const tick = () => {
      animationFrameId = requestAnimationFrame(tick);

      const delta = Math.min(clock.getDelta(), 0.03); // Cap delta to prevent crazy jumps

      // Smooth mouse interpolation
      if (targetMouse.x !== -999) {
        if (mouse.x === -999) {
          mouse.copy(targetMouse);
        } else {
          mouse.x += (targetMouse.x - mouse.x) * 0.12;
          mouse.y += (targetMouse.y - mouse.y) * 0.12;
        }
      } else {
        mouse.set(-999, -999);
      }

      // Rotate whole bead slowly and majestically
      points.rotation.y += 0.12 * delta;
      points.rotation.x = Math.sin(points.rotation.y * 0.4) * 0.12;

      // Project mouse coordinates to 3D space
      let mouse3D = null;
      if (mouse.x !== -999) {
        raycaster.setFromCamera(mouse, camera);
        const intersectPoint = new THREE.Vector3();
        raycaster.ray.intersectPlane(plane, intersectPoint);
        mouse3D = intersectPoint;
        // Invert points rotation to align coordinates
        mouse3D.applyEuler(new THREE.Euler(-points.rotation.x, -points.rotation.y, 0));
      }

      // Interactive Physics loop
      const positionsArray = particleGeometry.attributes.position.array;
      const repulsionRadius = 0.95;
      const repulsionRadiusSq = repulsionRadius * repulsionRadius;
      const repulsionStrength = 22.0;
      const springStrength = 4.2;
      const damping = 0.88;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Current coords
        let px = positionsArray[i3];
        let py = positionsArray[i3 + 1];
        let pz = positionsArray[i3 + 2];

        // Target original positions
        const tx = originalPositions[i3];
        const ty = originalPositions[i3 + 1];
        const tz = originalPositions[i3 + 2];

        // Fetch velocities
        let vx = velocities[i3];
        let vy = velocities[i3 + 1];
        let vz = velocities[i3 + 2];

        // 1. Repulsion from pointer (Optimized: check squared distance first to bypass costly sqrt)
        if (mouse3D) {
          const dx = px - mouse3D.x;
          const dy = py - mouse3D.y;
          const dz = pz - mouse3D.z;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < repulsionRadiusSq && distSq > 0.001) {
            const dist = Math.sqrt(distSq);
            const force = (repulsionRadius - dist) / repulsionRadius * repulsionStrength;
            // Push direction
            vx += (dx / dist) * force * delta;
            vy += (dy / dist) * force * delta;
            vz += (dz / dist) * force * delta;
          }
        }

        // 2. Spring pull to target position
        const sx = (tx - px) * springStrength;
        const sy = (ty - py) * springStrength;
        const sz = (tz - pz) * springStrength;

        vx += sx * delta;
        vy += sy * delta;
        vz += sz * delta;

        // 3. Thermal jitter flutter for energy core to simulate flickering fire
        if (i >= mainCount + yantraCount) {
          vx += (Math.random() - 0.5) * 0.14 * delta;
          vy += (Math.random() - 0.5) * 0.14 * delta;
          vz += (Math.random() - 0.5) * 0.14 * delta;
        }

        // 4. Damping and Integration
        vx *= damping;
        vy *= damping;
        vz *= damping;

        px += vx;
        py += vy;
        pz += vz;

        // Update positions
        positionsArray[i3] = px;
        positionsArray[i3 + 1] = py;
        positionsArray[i3 + 2] = pz;

        // Save velocities
        velocities[i3] = vx;
        velocities[i3 + 1] = vy;
        velocities[i3 + 2] = vz;
      }

      particleGeometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    tick();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(containerRef.current);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (dom) {
        dom.removeEventListener('mousemove', handlePointerMove);
        dom.removeEventListener('mouseleave', handlePointerLeave);
        dom.removeEventListener('touchstart', handlePointerMove);
        dom.removeEventListener('touchmove', handlePointerMove);
        dom.removeEventListener('touchend', handlePointerLeave);
      }
      material.dispose();
      texture.dispose();
      glowMaterial.dispose();
      glowTexture.dispose();
      particleGeometry.dispose();
      renderer.dispose();
      if (dom && renderer.domElement.parentNode) {
        dom.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        height: '100%', 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0,
        zIndex: 1,
        pointerEvents: 'auto',
        touchAction: 'none'
      }} 
    />
  );
}
