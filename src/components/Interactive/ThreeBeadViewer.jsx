import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const beadTypes = {
  1: {
    name: "1 Mukhi (Kaju / Half-Moon)",
    rarity: "Extremely Rare",
    planet: "Sun (Surya)",
    desc: "The legendary single-furrow bead, naturally shaped like a crescent moon (Kaju-dana). Carries the direct blessing of Lord Shiva."
  },
  14: {
    name: "14 Mukhi (Deva Mani)",
    rarity: "Collector Grade",
    planet: "Saturn (Shani)",
    desc: "Derived from the third eye of Shiva. Awakens strong intuition, supreme courage, and total protection from negative influences."
  },
  21: {
    name: "21 Mukhi (Kubera Bead)",
    rarity: "Ultimate Treasure",
    planet: "Wealth Lord (Kubera)",
    desc: "The rarest of all Rudrakshas, representing Lord Kubera himself. Bestows unimaginable prosperity, luck, and global influence."
  }
};

export default function ThreeBeadViewer() {
  const containerRef = useRef(null);
  const [selectedMukhi, setSelectedMukhi] = useState(1);
  const [inquirySent, setInquirySent] = useState(false);
  const selectedMukhiRef = useRef(selectedMukhi);

  useEffect(() => {
    selectedMukhiRef.current = selectedMukhi;
  }, [selectedMukhi]);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth || 320;
    const height = containerRef.current.clientHeight || 320;

    // Scene
    const scene = new THREE.Scene();

    // Camera - Centered Y to place bead perfectly in center of orbit ring
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.4); // Y set to 0 for perfect centering
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfff5ea, 1.4);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xc49a3c, 1.8);
    dirLight2.position.set(-5, -2, 3);
    scene.add(dirLight2);

    // Group for the bead and orbit rings
    const viewerGroup = new THREE.Group();
    scene.add(viewerGroup);

    // Group for bead specifically (so we can rotate it dynamically)
    const beadGroup = new THREE.Group();
    viewerGroup.add(beadGroup);

    // Golden Orbit Ring - Perfectly aligned
    const orbitGeometry = new THREE.RingGeometry(1.6, 1.62, 64);
    const orbitMaterial = new THREE.MeshBasicMaterial({
      color: 0xc49a3c,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.28
    });
    const orbitRing = new THREE.Mesh(orbitGeometry, orbitMaterial);
    orbitRing.rotation.x = Math.PI / 2.3;
    viewerGroup.add(orbitRing);

    // Mini Orbit nodes
    const nodeGeom = new THREE.SphereGeometry(0.032, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0xffe082 });
    const orbitNodes = [];
    const nodeCount = 3;
    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(nodeGeom, nodeMat);
      viewerGroup.add(node);
      orbitNodes.push(node);
    }

    // Material for the Rudraksha bead - Rich organic wood texture
    const beadMaterial = new THREE.MeshStandardMaterial({
      color: 0x54361e, // Authentic deep teak brown
      roughness: 0.88,
      metalness: 0.04,
      bumpScale: 0.06
    });

    // We build 3 distinct geometries for the three types
    const buildBeadGeometry = (mukhi) => {
      const geometry = new THREE.SphereGeometry(1.0, 80, 80); // Higher detail resolution
      const posAttr = geometry.attributes.position;
      const tempV = new THREE.Vector3();

      for (let i = 0; i < posAttr.count; i++) {
        tempV.fromBufferAttribute(posAttr, i);
        
        // Spherical coordinates
        const theta = Math.atan2(tempV.z, tempV.x);
        const phi = Math.acos(tempV.y / tempV.length());

        if (mukhi === 1) {
          // Kaju Shape: Bend the sphere into a beautiful crescent bean
          const bend = Math.sin(phi) * 0.45;
          tempV.x = tempV.x * (1.25 - bend * 0.3) + bend * 0.55;
          tempV.y = tempV.y * 0.95;
          tempV.z = tempV.z * (0.8 - Math.sin(phi) * 0.1);

          // Add organic bumpy wood texture ridges to Kaju
          const microBumps = Math.sin(theta * 18) * Math.cos(phi * 24) * 0.035
                           + Math.cos(theta * 36) * Math.sin(phi * 30) * 0.015;

          // Add a single dominant Mukhi line
          const groove = Math.abs(Math.sin(theta)) < 0.12 ? -0.07 * Math.sin(phi) : 0;
          tempV.multiplyScalar(1.0 + groove + microBumps);
        } else {
          // 14 or 21 Mukhi: Advanced procedural lobes with deep grooves and organic bumps
          const ridgeCount = mukhi;
          const lobeAngle = (Math.PI * 2) / ridgeCount;
          
          // Normalize theta to 0 to lobeAngle range
          const positiveTheta = theta < 0 ? theta + Math.PI * 2 : theta;
          const localTheta = positiveTheta % lobeAngle;
          
          // Distance to nearest groove boundary
          const distToGroove = Math.min(localTheta, lobeAngle - localTheta);
          const grooveThreshold = 0.11; // width of clefts
          
          let grooveDepth = 0;
          if (distToGroove < grooveThreshold) {
            // Deeper clefts especially in the equator region, fading towards poles
            const factor = (grooveThreshold - distToGroove) / grooveThreshold;
            grooveDepth = -0.22 * Math.pow(factor, 1.5) * Math.sin(phi);
          }
          
          // High-frequency cellular bumpy texture
          const microBumps = Math.sin(theta * 36) * Math.cos(phi * 30) * 0.032
                           + Math.cos(theta * 72) * Math.sin(phi * 54) * 0.015
                           + Math.sin(phi * 10) * 0.018;

          const scale = 1.02 + grooveDepth + microBumps;
          tempV.multiplyScalar(scale);
        }

        posAttr.setXYZ(i, tempV.x, tempV.y, tempV.z);
      }
      geometry.computeVertexNormals();
      return geometry;
    };

    // Instantiate geometries
    const geometries = {
      1: buildBeadGeometry(1),
      14: buildBeadGeometry(14),
      21: buildBeadGeometry(21)
    };

    // Initial mesh creation
    let currentBeadMesh = new THREE.Mesh(geometries[selectedMukhiRef.current], beadMaterial);
    beadGroup.add(currentBeadMesh);

    // Thread running through
    const threadGeom = new THREE.CylinderGeometry(0.018, 0.018, 2.6, 8);
    const threadMat = new THREE.MeshBasicMaterial({ color: 0xc49a3c });
    const threadMesh = new THREE.Mesh(threadGeom, threadMat);
    beadGroup.add(threadMesh);

    // Track dynamic changes
    let activeMukhi = selectedMukhiRef.current;

    // Drag Interaction Logic
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handlePointerDown = (e) => {
      isDragging = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      previousMousePosition = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e) => {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - previousMousePosition.x;
      const deltaY = clientY - previousMousePosition.y;

      beadGroup.rotation.y += deltaX * 0.008;
      beadGroup.rotation.x += deltaY * 0.008;

      previousMousePosition = { x: clientX, y: clientY };
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const dom = containerRef.current;
    dom.addEventListener('mousedown', handlePointerDown);
    dom.addEventListener('mousemove', handlePointerMove);
    dom.addEventListener('mouseup', handlePointerUp);
    dom.addEventListener('touchstart', handlePointerDown);
    dom.addEventListener('touchmove', handlePointerMove);
    dom.addEventListener('touchend', handlePointerUp);

    // Animation loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const tick = () => {
      animationFrameId = requestAnimationFrame(tick);

      const elapsedTime = clock.getElapsedTime();

      // Check if selected mukhi count changed
      if (selectedMukhiRef.current !== activeMukhi) {
        activeMukhi = selectedMukhiRef.current;
        beadGroup.remove(currentBeadMesh);
        currentBeadMesh = new THREE.Mesh(geometries[activeMukhi], beadMaterial);
        beadGroup.add(currentBeadMesh);
      }

      // Auto rotation of bead when not dragging
      if (!isDragging) {
        beadGroup.rotation.y += 0.005;
      }

      // Spin orbit ring slowly
      orbitRing.rotation.z = elapsedTime * 0.15;

      // Position nodes along the orbit ring
      orbitNodes.forEach((node, idx) => {
        const offset = (idx * Math.PI * 2) / nodeCount;
        const angle = elapsedTime * 0.35 + offset;
        const radius = 1.6;
        
        // Compute position on tilted ring plane
        const px = radius * Math.cos(angle);
        const pz = radius * Math.sin(angle);
        
        const pos = new THREE.Vector3(px, 0, pz);
        pos.applyMatrix4(orbitRing.matrixWorld);
        node.position.copy(pos);
      });

      renderer.render(scene, camera);
    };

    tick();

    // Resize observer
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
        dom.removeEventListener('mousedown', handlePointerDown);
        dom.removeEventListener('mousemove', handlePointerMove);
        dom.removeEventListener('mouseup', handlePointerUp);
        dom.removeEventListener('touchstart', handlePointerDown);
        dom.removeEventListener('touchmove', handlePointerMove);
        dom.removeEventListener('touchend', handlePointerUp);
      }
      Object.values(geometries).forEach(g => g.dispose());
      beadMaterial.dispose();
      orbitGeometry.dispose();
      orbitMaterial.dispose();
      nodeGeom.dispose();
      nodeMat.dispose();
      threadGeom.dispose();
      threadMat.dispose();
      renderer.dispose();
      if (dom && renderer.domElement.parentNode) {
        dom.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="three-bead-viewer-wrapper" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div className="three-bead-canvas-container" ref={containerRef} style={{
        position: 'relative',
        width: '280px',
        height: '280px',
        margin: '0 auto',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(36, 29, 26, 0.95) 0%, rgba(18, 13, 11, 0.98) 100%)',
        border: '2px solid rgba(196, 154, 60, 0.35)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 0 20px rgba(196,154,60,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div className="orbit-hint" style={{
          position: 'absolute',
          bottom: '12px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '10px',
          color: 'var(--gold)',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          fontWeight: '500',
          pointerEvents: 'none'
        }}>
          ✦ Drag to rotate in 3D ✦
        </div>
      </div>

      {/* Rarity Tabs */}
      <div className="bead-type-tabs" style={{
        display: 'flex',
        gap: '8px',
        marginTop: '16px',
        marginBottom: '16px'
      }}>
        {Object.keys(beadTypes).map((key) => (
          <button 
            key={key} 
            className={`bead-tab-btn ${selectedMukhi === Number(key) ? 'active' : ''}`}
            onClick={() => setSelectedMukhi(Number(key))}
            style={{
              background: selectedMukhi === Number(key) ? 'var(--gold)' : 'rgba(255,253,248,0.03)',
              color: selectedMukhi === Number(key) ? 'var(--black)' : 'rgba(255,253,248,0.7)',
              border: selectedMukhi === Number(key) ? '1px solid var(--gold)' : '1px solid rgba(196,154,60,0.18)',
              borderRadius: '20px',
              padding: '6px 14px',
              fontSize: '10.5px',
              fontWeight: selectedMukhi === Number(key) ? '600' : '400',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            {key} Mukhi
          </button>
        ))}
      </div>

      {/* Specifications Explainer - Styled elegantly in dark brown matching theme */}
      <div className="bead-specs-box" style={{
        background: 'linear-gradient(135deg, #1C1613 0%, #120D0B 100%)',
        border: '1px solid rgba(196, 154, 60, 0.22)',
        borderRadius: 'var(--r-md)',
        padding: '20px',
        color: '#fff',
        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
        width: '100%'
      }}>
        <div className="spec-meta" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '10px'
        }}>
          <span className="meta-badge" style={{
            background: 'rgba(196,154,60,0.12)',
            border: '1px solid rgba(196,154,60,0.25)',
            borderRadius: '4px',
            padding: '2px 8px',
            fontSize: '8.5px',
            fontWeight: '600',
            textTransform: 'uppercase',
            color: 'var(--gold)'
          }}>{beadTypes[selectedMukhi].rarity}</span>
          <span className="meta-label" style={{ fontSize: '10.5px', color: 'rgba(255,253,248,0.6)' }}>
            Ruling Planet: <strong style={{ color: 'var(--gold-lt)' }}>{beadTypes[selectedMukhi].planet}</strong>
          </span>
        </div>
        <h4 style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '16px',
          fontWeight: '600',
          margin: '0 0 6px 0',
          color: '#fff'
        }}>{beadTypes[selectedMukhi].name}</h4>
        <p style={{
          fontSize: '11.5px',
          color: 'rgba(255,253,248,0.75)',
          lineHeight: 1.5,
          margin: '0 0 16px 0'
        }}>{beadTypes[selectedMukhi].desc}</p>
        
        {inquirySent ? (
          <div style={{
            background: 'rgba(196,154,60,0.1)',
            border: '1px solid rgba(196,154,60,0.3)',
            borderRadius: '8px',
            padding: '12px 16px',
            textAlign: 'center',
            animation: 'fadeIn 0.3s ease-out'
          }}>
            <p style={{ color: 'var(--gold-lt)', fontWeight: '600', fontSize: '12.5px', marginBottom: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg> Inquiry Received!
            </p>
            <p style={{ color: 'rgba(255,253,248,0.8)', fontSize: '11px', margin: 0, lineHeight: 1.35 }}>
              A senior curator will contact you via WhatsApp shortly with certified images and custom pricing.
            </p>
            <button 
              onClick={() => setInquirySent(false)} 
              style={{ background: 'transparent', border: 'none', color: 'rgba(255,253,248,0.5)', fontSize: '9.5px', textDecoration: 'underline', marginTop: '8px', cursor: 'pointer' }}
            >
              Back to Specifications
            </button>
          </div>
        ) : (
          <div className="bead-action-row" style={{
            display: 'flex',
            gap: '8px',
            justifyContent: 'stretch'
          }}>
            <button 
              className="btn-gold-sm" 
              onClick={() => setInquirySent(true)}
              style={{
                flex: 1,
                background: 'var(--gold)',
                color: 'var(--black)',
                border: 'none',
                borderRadius: '4px',
                padding: '8px 12px',
                fontSize: '11px',
                fontWeight: '600',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              Request Certified Images
            </button>
            <a 
              href="#s-siddha-mala" 
              className="btn-outline-sm"
              style={{
                flex: 1,
                background: 'transparent',
                border: '1px solid rgba(196,154,60,0.4)',
                borderRadius: '4px',
                padding: '8px 12px',
                fontSize: '11px',
                color: 'var(--gold-lt)',
                textDecoration: 'none',
                textAlign: 'center',
                fontWeight: '600'
              }}
            >
              View Combinations
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
