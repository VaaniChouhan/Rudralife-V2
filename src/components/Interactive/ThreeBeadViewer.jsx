import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import * as THREE from 'three';

// ── Advanced Procedural Noise Engine (from Panchmukhi Rudraksha reference) ──
const TAU = Math.PI * 2;
const TS = 0.12;
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const mix = (a, b, t) => a + (b - a) * t;
const sstep = (a, b, x) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

function hash(i, j, k) {
  let h = (Math.imul(i, 374761393) + Math.imul(j, 668265263) + Math.imul(k, 1274126177)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

function vn(x, y, z) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  let fx = x - xi, fy = y - yi, fz = z - zi;
  fx *= fx * (3 - 2 * fx);
  fy *= fy * (3 - 2 * fy);
  fz *= fz * (3 - 2 * fz);
  return mix(
    mix(
      mix(hash(xi, yi, zi), hash(xi + 1, yi, zi), fx),
      mix(hash(xi, yi + 1, zi), hash(xi + 1, yi + 1, zi), fx),
      fy
    ),
    mix(
      mix(hash(xi, yi, zi + 1), hash(xi + 1, yi, zi + 1), fx),
      mix(hash(xi, yi + 1, zi + 1), hash(xi + 1, yi + 1, zi + 1), fx),
      fy
    ),
    fz
  );
}

function fbm(x, y, z, o) {
  let s = 0, a = 0.5;
  for (let i = 0; i < o; i++) {
    s += a * vn(x, y, z);
    x *= 2.03;
    y *= 2.03;
    z *= 2.03;
    a *= 0.5;
  }
  return s;
}

function rdg(x, y, z, o) {
  let s = 0, a = 0.5;
  for (let i = 0; i < o; i++) {
    s += a * (1 - Math.abs(2 * vn(x, y, z) - 1));
    x *= 2.03;
    y *= 2.03;
    z *= 2.03;
    a *= 0.5;
  }
  return s;
}

function wor(x, y, z) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const sx = x - xi > 0.5 ? 1 : -1;
  const sy = y - yi > 0.5 ? 1 : -1;
  const sz = z - zi > 0.5 ? 1 : -1;
  let m = 9;
  for (let k = 0; k < 2; k++) {
    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < 2; i++) {
        const cx = xi + i * sx, cy = yi + j * sy, cz = zi + k * sz;
        const dx = cx + 0.5 + (hash(cx, cy, cz) - 0.5) * 0.8 - x;
        const dy = cy + 0.5 + (hash(cx + 57, cy, cz + 13) - 0.5) * 0.8 - y;
        const dz = cz + 0.5 + (hash(cx, cy + 91, cz + 7) - 0.5) * 0.8 - z;
        const d = dx * dx + dy * dy + dz * dz;
        if (d < m) m = d;
      }
    }
  }
  return Math.sqrt(m);
}

function worm(x, y, z) {
  const w1 = fbm(x * 2.6 + 7, y * 2.6, z * 2.6, 2);
  const w2 = fbm(x * 2.6 + 3, y * 2.6 + 9, z * 2.6, 2);
  const n = fbm(x * 7.5 + w1 * 4, y * 7.5 + w2 * 4, z * 7.5, 3) / 0.875;
  return 1 - sstep(0.45, 1.1, Math.abs((n - 0.5) / 0.14));
}

// ── Precise Natural Clefts (Grooves) per Mukhi ──
let G1 = 0, G2 = 0;
function grooves(x, y, z, mukhi = 5) {
  const th = Math.acos(clamp(y, -1, 1));
  const ph = Math.atan2(z, x);

  if (mukhi === 1) {
    // 1 Mukhi (Eka Mukhi / Kaju / Half-Moon): Single natural cleft running along ridge
    const wob = 0.14 * Math.sin(th * 2.4 + 0.7) + 0.1 * (vn(x * 2 + 9, y * 2, z * 2) - 0.5);
    let t = ph + wob;
    while (t > Math.PI) t -= TAU;
    while (t < -Math.PI) t += TAU;
    const wv = 0.75 + 0.5 * vn(th * 1.6 + 4.2, 3.1, 2.1);
    G1 = Math.exp(-t * t / (0.0055 * wv * wv));
    G2 = Math.exp(-t * t / (0.11 * wv)) * (0.8 + 0.2 * wv);
    return;
  }

  // Multi-Mukhi (5, 7, 14, 21): Symmetrical natural furrows pole-to-pole
  const sec = TAU / mukhi;
  const scale = Math.min(1.0, 5.0 / mukhi);
  const wob = (0.16 * Math.sin(th * 2.4 + 0.7) + 0.14 * (vn(x * 2 + 9, y * 2, z * 2) - 0.5) + 0.05 * Math.sin(th * 7 + ph * 3)) * scale;
  let d = (ph + wob) / sec;
  const id = Math.round(d);
  d -= id;
  const t = d * sec;
  const wv = 0.75 + 0.5 * vn(id * 7.3 + th * 1.6, 3.1, id * 2.1);
  const w1 = 0.0045 * scale * scale * wv * wv;
  const w2 = 0.09 * scale * scale * wv;
  G1 = Math.exp(-t * t / Math.max(0.00015, w1));
  G2 = Math.exp(-t * t / Math.max(0.002, w2)) * (0.8 + 0.2 * wv);
}

// ── Surface Relief & Radial Displacement ──
function radius(x, y, z, mukhi = 5) {
  grooves(x, y, z, mukhi);
  const th = Math.acos(clamp(y, -1, 1));
  const s = Math.sin(th);
  const pole = Math.min(th, Math.PI - th);

  let r = 1 + 0.045 * (fbm(x * 1.6, y * 1.6, z * 1.6, 3) - 0.4375)
    + 0.15 * (worm(x, y, z) - 0.5)
    + 0.06 * (rdg(x * 3.2 + 5, y * 3.2, z * 3.2, 2) - 0.375)
    + 0.03 * (1 - wor(x * 6, y * 6, z * 6) * 1.5 - 0.3);

  const depthFactor = mukhi === 1 ? 0.9 : Math.max(0.65, Math.min(1.0, 8 / mukhi));
  r -= (0.13 * G1 + 0.055 * G2) * (0.45 + 0.55 * s) * (0.75 + 0.25 * depthFactor);
  return r * (1 - 0.12 * sstep(0.34, 0.1, pole));
}

// ── Procedural Color, Tangent Normal, Roughness & AO Map Generator ──
function makeTextures(renderer, mukhi = 5, isHighDef = false) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const TW = isHighDef ? (isMobile ? 768 : 1024) : (isMobile ? 512 : 768);
  const TH = isHighDef ? (isMobile ? 384 : 512) : (isMobile ? 256 : 384);

  const mk = () => {
    const c = document.createElement('canvas');
    c.width = TW;
    c.height = TH;
    const x = c.getContext('2d');
    return [c, x, x.createImageData(TW, TH)];
  };

  const [cC, xC, dC] = mk();
  const [cR, xR, dR] = mk();
  const [cN, xN, dN] = mk();
  const [cA, xA, dA] = mk();
  const hh = new Float32Array(TW * TH);

  // Sacred Nepal terracotta/amber color ramp
  const RAMP = [
    [30, 16, 10],
    [58, 30, 18],
    [92, 48, 28],
    [128, 68, 38],
    [158, 86, 44],
    [184, 104, 56],
    [204, 124, 72]
  ];

  const cs = new Float32Array(TW);
  const sn = new Float32Array(TW);
  for (let x = 0; x < TW; x++) {
    const p = (x + 0.5) / TW * TAU;
    cs[x] = Math.cos(p);
    sn[x] = Math.sin(p);
  }

  for (let y = 0; y < TH; y++) {
    const th = TS + (y + 0.5) / TH * (Math.PI - 2 * TS);
    const sT = Math.sin(th);
    const dy = Math.cos(th);
    const pole = Math.min(th, Math.PI - th);

    for (let x = 0; x < TW; x++) {
      const dx = -cs[x] * sT;
      const dz = sn[x] * sT;
      grooves(dx, dy, dz, mukhi);
      const g1 = G1, g2 = G2;

      const wm = worm(dx, dy, dz);
      const cav = 1 - wm;
      const tub = clamp(1 - wor(dx * 11, dy * 11, dz * 11) * 1.5, 0, 1);
      const gr = fbm(dx * 62, dy * 62, dz * 62, 2);
      const gr2 = vn(dx * 150 + 3, dy * 150, dz * 150);
      const mn = vn(dx * 3 + 11, dy * 3, dz * 3);
      const mn2 = vn(dx * 14, dy * 14 + 7, dz * 14);
      const crk = Math.pow(1 - Math.abs(2 * vn(dx * 10 + 5, dy * 10, dz * 10) - 1), 10);
      const sp = sstep(0.64, 0.8, vn(dx * 80 + 5, dy * 80, dz * 80)) * (0.4 + 0.6 * cav);

      const hn = 0.55 * gr + 0.25 * gr2 + 0.2 * tub + 0.35 * wm - 0.5 * crk - 0.5 * g1 - 0.1 * g2;
      const tt = clamp(0.52 + (wm - 0.5) * 0.6 + (tub - 0.5) * 0.12 + (gr - 0.375) * 0.5 + (mn - 0.5) * 0.3, 0, 1) * 6;
      const i = Math.min(5, tt | 0);
      const f = tt - i;
      const a = RAMP[i], b = RAMP[i + 1];

      const ed = 4 * wm * (1 - wm);
      const k = (1 - 0.5 * cav) * (1 - 0.1 * ed) * (1 - 0.5 * g1 - 0.18 * g2) * (1 - 0.3 * sstep(0.36, 0.13, pole)) * (1 - 0.3 * crk) * (1 - 0.5 * sp) * (0.92 + 0.16 * mn2) * (0.94 + 0.12 * gr2);
      const o = (y * TW + x) * 4;
      hh[y * TW + x] = hn;

      dC.data[o] = (a[0] + (b[0] - a[0]) * f) * k * (1 + 0.12 * (mn - 0.5));
      dC.data[o + 1] = (a[1] + (b[1] - a[1]) * f) * k * (1 - 0.1 * cav);
      dC.data[o + 2] = (a[2] + (b[2] - a[2]) * f) * k * (1 - 0.2 * (mn - 0.5)) * (1 - 0.15 * cav);
      dC.data[o + 3] = 255;

      const ro = 255 * clamp(0.36 + 0.5 * cav + 0.1 * (gr - 0.375) + 0.08 * sp, 0.3, 0.95);
      dR.data[o] = dR.data[o + 1] = dR.data[o + 2] = ro;
      dR.data[o + 3] = 255;

      const ao = 255 * clamp(0.3 + 0.7 * wm, 0.25, 1) * (1 - 0.12 * ed) * (1 - 0.35 * g1) * (1 - 0.2 * crk) * (1 - 0.3 * sp);
      dA.data[o] = dA.data[o + 1] = dA.data[o + 2] = ao;
      dA.data[o + 3] = 255;
    }
  }

  // Tangent normal map via finite differences on heightfield
  for (let y = 0; y < TH; y++) {
    for (let x = 0; x < TW; x++) {
      const l = hh[y * TW + ((x - 1 + TW) % TW)];
      const r = hh[y * TW + ((x + 1) % TW)];
      const u = hh[Math.max(0, y - 1) * TW + x];
      const d = hh[Math.min(TH - 1, y + 1) * TW + x];
      const nx = -(r - l) * 9;
      const ny = (d - u) * 9;
      const L = Math.hypot(nx, ny, 1);
      const o = (y * TW + x) * 4;
      dN.data[o] = (nx / L * 0.5 + 0.5) * 255;
      dN.data[o + 1] = (ny / L * 0.5 + 0.5) * 255;
      dN.data[o + 2] = (1 / L * 0.5 + 0.5) * 255;
      dN.data[o + 3] = 255;
    }
  }

  xC.putImageData(dC, 0, 0);
  xR.putImageData(dR, 0, 0);
  xN.putImageData(dN, 0, 0);
  xA.putImageData(dA, 0, 0);

  const an = renderer ? Math.min(renderer.capabilities.getMaxAnisotropy(), 4) : 1;
  const T = (canvas, isSRGB) => {
    const t = new THREE.CanvasTexture(canvas);
    t.anisotropy = an;
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.ClampToEdgeWrapping;
    if (isSRGB) {
      t.colorSpace = THREE.SRGBColorSpace;
    }
    return t;
  };

  return {
    map: T(cC, true),
    rough: T(cR, false),
    normal: T(cN, false),
    ao: T(cA, false)
  };
}

// ── Studio Environment Lighting ──
function makeEnv(renderer) {
  const envS = new THREE.Scene();
  envS.add(new THREE.Mesh(new THREE.SphereGeometry(10, 32, 16), new THREE.MeshBasicMaterial({ color: 0x161210, side: THREE.BackSide })));
  [
    [6, 4, [-5, 4, 4], 0xfff6ee, 6],
    [3, 6, [6, 1, -2], 0xffe0c8, 3.5],
    [8, 2, [0, 7, -1], 0xdde8ff, 3.5],
    [5, 3, [0, -5, 5], 0x7a5238, 1.8],
    [0.7, 7, [-6, 0, 1], 0xfff6ea, 7],
    [4, 4, [3, -2, 6], 0xffe6d0, 1.6]
  ].forEach(([w, h, p, c, i]) => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(i), side: THREE.DoubleSide })
    );
    m.position.set(...p);
    m.lookAt(0, 0, 0);
    envS.add(m);
  });
  const pm = new THREE.PMREMGenerator(renderer);
  const t = pm.fromScene(envS, 0.03).texture;
  pm.dispose();
  return t;
}

// ── Complete Procedural Bead Builder ──
function createBeadMesh(renderer, mukhi = 5, isHighDef = false, threadGeom, threadMat) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const SW = isHighDef ? (isMobile ? 320 : 480) : (isMobile ? 240 : 360);
  const SH = isHighDef ? (isMobile ? 200 : 300) : (isMobile ? 150 : 220);

  const geo = new THREE.SphereGeometry(1, SW, SH, 0, TAU, TS, Math.PI - 2 * TS);
  const pos = geo.attributes.position;

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const r = radius(x, y, z, mukhi);

    if (mukhi === 1) {
      // 1 Mukhi (Kaju-dana crescent morphology)
      const th = Math.acos(clamp(y, -1, 1));
      const bend = Math.sin(th) * 0.48;
      const kx = (x * (1.22 - bend * 0.25) + bend * 0.54) * r;
      const ky = y * r * 0.92;
      const kz = (z * (0.8 - Math.sin(th) * 0.14)) * r;
      pos.setXYZ(i, kx, ky, kz);
    } else {
      pos.setXYZ(i, x * r, y * r * 0.9, z * r);
    }
  }
  geo.computeVertexNormals();

  // Longitude seam normal welding
  const nr = geo.attributes.normal;
  for (let iy = 0; iy <= SH; iy++) {
    const a = iy * (SW + 1), b = a + SW;
    let nx = nr.getX(a) + nr.getX(b);
    let ny = nr.getY(a) + nr.getY(b);
    let nz = nr.getZ(a) + nr.getZ(b);
    const l = Math.hypot(nx, ny, nz) || 1;
    nr.setXYZ(a, nx / l, ny / l, nz / l);
    nr.setXYZ(b, nx / l, ny / l, nz / l);
  }
  geo.setAttribute('uv2', geo.attributes.uv);

  const tx = makeTextures(renderer, mukhi, isHighDef);
  const mat = new THREE.MeshPhysicalMaterial({
    map: tx.map,
    normalMap: tx.normal,
    normalScale: new THREE.Vector2(2.1, 2.1),
    roughnessMap: tx.rough,
    roughness: 1.0,
    metalness: 0.0,
    aoMap: tx.ao,
    aoMapIntensity: 1.0,
    clearcoat: 0.2,
    clearcoatRoughness: 0.35
  });

  const mesh = new THREE.Mesh(geo, mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  // Central natural bore
  const rEdge = 1 - 0.11;
  const rh = rEdge * Math.sin(TS);
  const boreMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(rh, rh, 2 * rEdge * Math.cos(TS), 32, 1, true),
    new THREE.MeshStandardMaterial({ color: 0x120a06, roughness: 0.9, side: THREE.BackSide })
  );

  const threadMesh = new THREE.Mesh(threadGeom, threadMat);

  const subGroup = new THREE.Group();
  subGroup.add(mesh, boreMesh, threadMesh);
  subGroup.scale.y = 0.92;

  return {
    group: subGroup,
    geo,
    mat,
    tx,
    boreGeom: boreMesh.geometry,
    boreMat: boreMesh.material
  };
}

function disposeBeadEntry(entry) {
  if (!entry) return;
  entry.geo?.dispose();
  entry.mat?.dispose();
  entry.boreGeom?.dispose();
  entry.boreMat?.dispose();
  if (entry.tx) {
    entry.tx.map?.dispose();
    entry.tx.normal?.dispose();
    entry.tx.rough?.dispose();
    entry.tx.ao?.dispose();
  }
}

// ── Specification metadata across states ──
const beadTypes = {
  1: {
    name: "1 Mukhi (Kaju / Half-Moon)",
    rarity: "Extremely Rare",
    planet: "Sun (Surya)",
    faces: "Single natural cleft",
    desc: "The legendary single-furrow bead, naturally shaped like a crescent moon (Kaju-dana). Carries the direct blessing of Lord Shiva, awakening pure supreme consciousness."
  },
  5: {
    name: "5 Mukhi (Panchmukhi Rudraksha)",
    rarity: "Sacred Baseline",
    planet: "Jupiter (Brihaspati)",
    faces: "Five natural clefts",
    desc: "The quintessential five-faced Nepal bead embodying Lord Kalagni Rudra. Purifies the five elements, balances mind and body, and radiates serene equilibrium."
  },
  7: {
    name: "7 Mukhi (Mahalaxmi Swaroop)",
    rarity: "Sacred Grade",
    planet: "Venus (Shukra)",
    faces: "Seven natural clefts",
    desc: "Seven sacred natural faces consecrated for Goddess Mahalakshmi. Bestows sustained abundance, auspicious fortune, and creative balance."
  },
  14: {
    name: "14 Mukhi (Deva Mani)",
    rarity: "Collector Grade",
    planet: "Saturn (Shani) / Mars",
    faces: "Fourteen natural clefts",
    desc: "Awakened from the third eye of Shiva. Awakens profound intuitive foresight, unwavering courage, and impenetrable shielding from negative influences."
  },
  21: {
    name: "21 Mukhi (Kubera Bead)",
    rarity: "Ultimate Treasure",
    planet: "Wealth Lord (Kubera)",
    faces: "Twenty-one natural clefts",
    desc: "The pinnacle of sacred botany with twenty-one natural faces running pole to pole. Embodies Lord Kubera himself, bestowing cosmic abundance and universal influence."
  }
};

export default function ThreeBeadViewer() {
  const containerRef = useRef(null);
  const modalCanvasRef = useRef(null);
  const [selectedMukhi, setSelectedMukhi] = useState(21);
  const [inquirySent, setInquirySent] = useState(false);
  const [isSpinning, setIsSpinning] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // References for live 3D sync
  const activeMukhiRef = useRef(selectedMukhi);
  const isSpinningRef = useRef(isSpinning);
  const changeBeadFnRef = useRef(null);
  const modalChangeBeadFnRef = useRef(null);

  useEffect(() => {
    activeMukhiRef.current = selectedMukhi;
    if (changeBeadFnRef.current) changeBeadFnRef.current(selectedMukhi);
    if (modalChangeBeadFnRef.current) modalChangeBeadFnRef.current(selectedMukhi);
  }, [selectedMukhi]);

  useEffect(() => {
    isSpinningRef.current = isSpinning;
  }, [isSpinning]);

  // Modal scroll lock and WhatsApp hide/show
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      window.dispatchEvent(new CustomEvent('hide-whatsapp'));
    } else {
      document.body.style.overflow = '';
      window.dispatchEvent(new CustomEvent('show-whatsapp'));
    }
    return () => {
      document.body.style.overflow = '';
      window.dispatchEvent(new CustomEvent('show-whatsapp'));
    };
  }, [isModalOpen]);

  // Keyboard shortcut to close 3D Modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // ── Main Inline Three.js Setup ──
  useEffect(() => {
    if (!containerRef.current) return;
    const dom = containerRef.current;
    const width = dom.clientWidth || 320;
    const height = dom.clientHeight || 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 60);
    const T_target = new THREE.Vector3(0, 0, 0);

    let az = 0.55;
    let el = 0.32;
    let dist = 4.6;
    let pd = 0;
    const ptrs = new Map();

    const placeCam = () => {
      const a = (dom.clientWidth || width) / (dom.clientHeight || height);
      const d = dist * (a < 0.85 ? 0.85 / a : 1);
      camera.position.set(
        T_target.x + d * Math.sin(az) * Math.cos(el),
        T_target.y + d * Math.sin(el),
        T_target.z + d * Math.cos(az) * Math.cos(el)
      );
      camera.lookAt(T_target);
    };

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.domElement.style.borderRadius = '24px';
    dom.appendChild(renderer.domElement);

    scene.environment = makeEnv(renderer);

    // Studio Lighting matching Panchmukhi reference
    const keyLight = new THREE.DirectionalLight(0xfff2e4, 2.4);
    keyLight.position.set(-3, 4, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.bias = -0.0003;
    keyLight.shadow.normalBias = 0.02;

    const rimLight = new THREE.DirectionalLight(0xffd2ae, 1.8);
    rimLight.position.set(4, 1, -4);

    const fillLight = new THREE.HemisphereLight(0xfff0e2, 0x3a2218, 0.45);
    scene.add(keyLight, rimLight, fillLight);

    // Contact radial shadow under bead
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    const sGrad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
    sGrad.addColorStop(0, 'rgba(0,0,0,0.65)');
    sGrad.addColorStop(0.5, 'rgba(0,0,0,0.22)');
    sGrad.addColorStop(1, 'rgba(0,0,0,0)');
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 128, 128);
    const shadowMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(3.6, 3.6),
      new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(shadowCanvas), transparent: true, depthWrite: false })
    );
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.15;
    scene.add(shadowMesh);

    // Golden Cosmic Orbit Ring
    const orbitRingGeom = new THREE.RingGeometry(1.68, 1.70, 64);
    const orbitRingMat = new THREE.MeshBasicMaterial({
      color: 0xc49a3c,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.22
    });
    const orbitRing = new THREE.Mesh(orbitRingGeom, orbitRingMat);
    orbitRing.rotation.x = Math.PI / 2.3;
    scene.add(orbitRing);

    // Mini Orbit nodes
    const nodeGeom = new THREE.SphereGeometry(0.035, 12, 12);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0xffe082 });
    const orbitNodes = [];
    for (let i = 0; i < 3; i++) {
      const node = new THREE.Mesh(nodeGeom, nodeMat);
      scene.add(node);
      orbitNodes.push(node);
    }

    // Sacred Thread through bore
    const threadGeom = new THREE.CylinderGeometry(0.03, 0.03, 3.0, 16);
    const threadMat = new THREE.MeshStandardMaterial({
      color: 0xc49a3c,
      roughness: 0.4,
      metalness: 0.6
    });

    // Master bead groups
    const spinGroup = new THREE.Group();
    const tiltGroup = new THREE.Group();
    tiltGroup.rotation.set(0.18, 0, 1.28);
    spinGroup.add(tiltGroup);
    scene.add(spinGroup);

    // Caches for instant switching
    const cache = {};

    const getBeadEntry = (mukhi) => {
      if (cache[mukhi]) return cache[mukhi];
      cache[mukhi] = createBeadMesh(renderer, mukhi, false, threadGeom, threadMat);
      return cache[mukhi];
    };

    let currentBeadEntry = getBeadEntry(activeMukhiRef.current);
    tiltGroup.add(currentBeadEntry.group);

    // Switch handler
    const changeBead = (mukhi) => {
      setIsLoading(true);
      setTimeout(() => {
        tiltGroup.clear();
        currentBeadEntry = getBeadEntry(mukhi);
        tiltGroup.add(currentBeadEntry.group);
        setIsLoading(false);
      }, 20);
    };
    changeBeadFnRef.current = changeBead;

    // Pointer event controls (drag, pinch, wheel)
    const cv = renderer.domElement;
    const onPointerDown = (e) => {
      cv.setPointerCapture(e.pointerId);
      ptrs.set(e.pointerId, [e.clientX, e.clientY]);
      pd = 0;
      window.dispatchEvent(new CustomEvent('hide-whatsapp'));
    };

    const onPointerMove = (e) => {
      const p = ptrs.get(e.pointerId);
      if (!p) return;
      if (ptrs.size === 1) {
        az -= (e.clientX - p[0]) * 0.007;
        el = cl(el + (e.clientY - p[1]) * 0.006, -0.6, 1.25);
      }
      p[0] = e.clientX;
      p[1] = e.clientY;
      if (ptrs.size === 2) {
        const [a, b] = [...ptrs.values()];
        const d = Math.hypot(a[0] - b[0], a[1] - b[1]);
        if (pd) dist = cl(dist * pd / d, 2.3, 7.5);
        pd = d;
      }
      placeCam();
    };

    const onPointerUp = (e) => {
      ptrs.delete(e.pointerId);
      pd = 0;
      window.dispatchEvent(new CustomEvent('show-whatsapp'));
    };

    const onWheel = (e) => {
      e.preventDefault();
      dist = cl(dist * Math.exp(e.deltaY * 0.001), 2.3, 7.5);
      placeCam();
    };

    cv.addEventListener('pointerdown', onPointerDown);
    cv.addEventListener('pointermove', onPointerMove);
    cv.addEventListener('pointerup', onPointerUp);
    cv.addEventListener('pointercancel', onPointerUp);
    cv.addEventListener('wheel', onWheel, { passive: false });

    placeCam();

    // Resize handler
    const onResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth || 320;
      const h = containerRef.current.clientHeight || 320;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      placeCam();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(dom);

    // Animation render loop
    let animId;
    let isVisible = true;
    let lastTime = performance.now();
    const io = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting;
      if (visible && !isVisible) {
        lastTime = performance.now();
        animId = requestAnimationFrame(loop);
      }
      isVisible = visible;
    }, { threshold: 0.02 });
    io.observe(dom);

    const loop = (now) => {
      if (!isVisible) return;
      animId = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      // Auto rotation when not dragging
      if (isSpinningRef.current && !ptrs.size) {
        spinGroup.rotation.y += dt * 0.45;
      }

      // Animate Orbit nodes
      const elapsedTime = now * 0.001;
      orbitRing.rotation.z = elapsedTime * 0.12;
      orbitNodes.forEach((node, idx) => {
        const offset = (idx * Math.PI * 2) / 3;
        const angle = elapsedTime * 0.35 + offset;
        const radius = 1.69;
        const px = radius * Math.cos(angle);
        const pz = radius * Math.sin(angle);
        const pos = new THREE.Vector3(px, 0, pz);
        pos.applyMatrix4(orbitRing.matrixWorld);
        node.position.copy(pos);
      });

      renderer.render(scene, camera);
    };
    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      io.disconnect();
      ro.disconnect();
      cv.removeEventListener('pointerdown', onPointerDown);
      cv.removeEventListener('pointermove', onPointerMove);
      cv.removeEventListener('pointerup', onPointerUp);
      cv.removeEventListener('pointercancel', onPointerUp);
      cv.removeEventListener('wheel', onWheel);

      Object.values(cache).forEach(disposeBeadEntry);
      orbitRingGeom.dispose();
      orbitRingMat.dispose();
      nodeGeom.dispose();
      nodeMat.dispose();
      threadGeom.dispose();
      threadMat.dispose();
      renderer.dispose();
      if (cv.parentNode) cv.parentNode.removeChild(cv);
    };
  }, []);

  // ── Fullscreen 3D Modal Three.js Setup ──
  useEffect(() => {
    if (!isModalOpen || !modalCanvasRef.current) return;
    const dom = modalCanvasRef.current;
    const width = dom.clientWidth || window.innerWidth;
    const height = dom.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 60);
    const T_target = new THREE.Vector3(0, 0, 0);

    let az = 0.55;
    let el = 0.32;
    let dist = 4.0;
    let pd = 0;
    const ptrs = new Map();

    const placeCam = () => {
      const a = (dom.clientWidth || width) / (dom.clientHeight || height);
      const d = dist * (a < 0.85 ? 0.85 / a : 1);
      camera.position.set(
        T_target.x + d * Math.sin(az) * Math.cos(el),
        T_target.y + d * Math.sin(el),
        T_target.z + d * Math.cos(az) * Math.cos(el)
      );
      camera.lookAt(T_target);
    };

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    dom.appendChild(renderer.domElement);

    scene.environment = makeEnv(renderer);

    const keyLight = new THREE.DirectionalLight(0xfff2e4, 2.5);
    keyLight.position.set(-3, 4, 4);
    keyLight.castShadow = true;
    const rimLight = new THREE.DirectionalLight(0xffd2ae, 1.9);
    rimLight.position.set(4, 1, -4);
    const fillLight = new THREE.HemisphereLight(0xfff0e2, 0x3a2218, 0.45);
    scene.add(keyLight, rimLight, fillLight);

    // Modal Ground shadow
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    const sGrad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
    sGrad.addColorStop(0, 'rgba(0,0,0,0.7)');
    sGrad.addColorStop(0.5, 'rgba(0,0,0,0.25)');
    sGrad.addColorStop(1, 'rgba(0,0,0,0)');
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 128, 128);
    const shadowMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(4.0, 4.0),
      new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(shadowCanvas), transparent: true, depthWrite: false })
    );
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.18;
    scene.add(shadowMesh);

    // Master groups
    const spinGroup = new THREE.Group();
    const tiltGroup = new THREE.Group();
    tiltGroup.rotation.set(0.18, 0, 1.28);
    spinGroup.add(tiltGroup);
    scene.add(spinGroup);

    const threadGeom = new THREE.CylinderGeometry(0.03, 0.03, 3.2, 16);
    const threadMat = new THREE.MeshStandardMaterial({ color: 0xc49a3c, roughness: 0.35, metalness: 0.7 });

    const modalCache = {};
    const getModalBeadEntry = (mukhi) => {
      if (modalCache[mukhi]) return modalCache[mukhi];
      modalCache[mukhi] = createBeadMesh(renderer, mukhi, true, threadGeom, threadMat);
      return modalCache[mukhi];
    };

    let currentModalBead = getModalBeadEntry(activeMukhiRef.current);
    tiltGroup.add(currentModalBead.group);

    const changeModalBead = (mukhi) => {
      tiltGroup.clear();
      currentModalBead = getModalBeadEntry(mukhi);
      tiltGroup.add(currentModalBead.group);
    };
    modalChangeBeadFnRef.current = changeModalBead;

    const cv = renderer.domElement;
    const onPointerDown = (e) => {
      cv.setPointerCapture(e.pointerId);
      ptrs.set(e.pointerId, [e.clientX, e.clientY]);
      pd = 0;
    };

    const onPointerMove = (e) => {
      const p = ptrs.get(e.pointerId);
      if (!p) return;
      if (ptrs.size === 1) {
        az -= (e.clientX - p[0]) * 0.006;
        el = cl(el + (e.clientY - p[1]) * 0.005, -0.6, 1.25);
      }
      p[0] = e.clientX;
      p[1] = e.clientY;
      if (ptrs.size === 2) {
        const [a, b] = [...ptrs.values()];
        const d = Math.hypot(a[0] - b[0], a[1] - b[1]);
        if (pd) dist = cl(dist * pd / d, 2.0, 7.5);
        pd = d;
      }
      placeCam();
    };

    const onPointerUp = (e) => {
      ptrs.delete(e.pointerId);
      pd = 0;
    };

    const onWheel = (e) => {
      e.preventDefault();
      dist = cl(dist * Math.exp(e.deltaY * 0.001), 2.0, 7.5);
      placeCam();
    };

    cv.addEventListener('pointerdown', onPointerDown);
    cv.addEventListener('pointermove', onPointerMove);
    cv.addEventListener('pointerup', onPointerUp);
    cv.addEventListener('pointercancel', onPointerUp);
    cv.addEventListener('wheel', onWheel, { passive: false });

    placeCam();

    const onResize = () => {
      if (!modalCanvasRef.current) return;
      const w = modalCanvasRef.current.clientWidth || window.innerWidth;
      const h = modalCanvasRef.current.clientHeight || window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      placeCam();
    };
    window.addEventListener('resize', onResize);

    let animId;
    let lastTime = performance.now();
    const loop = (now) => {
      animId = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      if (isSpinningRef.current && !ptrs.size) {
        spinGroup.rotation.y += dt * 0.45;
      }
      renderer.render(scene, camera);
    };
    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      cv.removeEventListener('pointerdown', onPointerDown);
      cv.removeEventListener('pointermove', onPointerMove);
      cv.removeEventListener('pointerup', onPointerUp);
      cv.removeEventListener('pointercancel', onPointerUp);
      cv.removeEventListener('wheel', onWheel);

      Object.values(modalCache).forEach(disposeBeadEntry);
      threadGeom.dispose();
      threadMat.dispose();
      renderer.dispose();
      if (cv.parentNode) cv.parentNode.removeChild(cv);
    };
  }, [isModalOpen]);

  const activeData = beadTypes[selectedMukhi] || beadTypes[21];

  return (
    <div className="three-bead-viewer-wrapper" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative'
    }}>
      {/* 3D Canvas Box */}
      <div
        className="three-bead-canvas-container"
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '440px',
          height: '360px',
          margin: '0 auto',
          borderRadius: '24px',
          background: 'radial-gradient(ellipse at 50% 42%, #FBF7EE 0%, rgba(232, 223, 200, 0.96) 68%, #DECEB4 100%)',
          border: '1.5px solid rgba(196, 154, 60, 0.35)',
          boxShadow: '0 10px 32px rgba(74, 52, 24, 0.1), inset 0 0 35px rgba(255, 255, 255, 0.55)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Loading Overlay */}
        {isLoading && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(232, 223, 200, 0.85)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#4A3418',
            fontSize: '11px',
            fontWeight: '600',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            zIndex: 10,
            pointerEvents: 'none'
          }}>
            ✦ Carving Vedic Grooves…
          </div>
        )}

        {/* Orbit Hint Badge */}
        <div className="orbit-hint" style={{
          position: 'absolute',
          bottom: '12px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '9.5px',
          color: '#5C3E1B',
          background: 'rgba(255, 253, 248, 0.88)',
          padding: '4px 12px',
          borderRadius: '12px',
          border: '1px solid rgba(196, 154, 60, 0.3)',
          boxShadow: '0 2px 6px rgba(74, 52, 24, 0.08)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          fontWeight: '600',
          pointerEvents: 'none',
          whiteSpace: 'nowrap'
        }}>
          ✦ Drag to turn · Pinch/Scroll to zoom ✦
        </div>

        {/* Action Controls in Corner */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          display: 'flex',
          gap: '6px',
          zIndex: 5
        }}>
          <button
            type="button"
            onClick={() => setIsSpinning(prev => !prev)}
            aria-label={isSpinning ? "Pause spin" : "Resume spin"}
            title={isSpinning ? "Pause auto-spin" : "Resume auto-spin"}
            style={{
              background: 'rgba(255, 253, 248, 0.9)',
              border: '1px solid rgba(196, 154, 60, 0.4)',
              color: '#4A3418',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '12px',
              boxShadow: '0 2px 8px rgba(74, 52, 24, 0.1)',
              transition: 'all 0.2s'
            }}
          >
            {isSpinning ? (
              <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                <polygon points="6,4 20,12 6,20" />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            aria-label="Expand 3D Modal View"
            title="Inspect in Fullscreen 3D Modal"
            style={{
              background: 'rgba(255, 253, 248, 0.9)',
              border: '1px solid rgba(196, 154, 60, 0.4)',
              color: '#4A3418',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '12px',
              boxShadow: '0 2px 8px rgba(74, 52, 24, 0.1)',
              transition: 'all 0.2s'
            }}
          >
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Rarity Tabs */}
      <div className="bead-type-tabs" style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '22px',
        marginBottom: '22px'
      }}>
        {[1, 5, 7, 14, 21].map((key) => {
          const isSelected = selectedMukhi === key;
          return (
            <button
              key={key}
              type="button"
              className={`bead-tab-btn ${isSelected ? 'active' : ''}`}
              onClick={() => setSelectedMukhi(key)}
              style={{
                background: isSelected ? 'var(--gold)' : 'rgba(255, 253, 248, 0.75)',
                color: isSelected ? '#120a06' : '#4A3418',
                border: isSelected ? '1px solid var(--gold)' : '1px solid rgba(196, 154, 60, 0.35)',
                borderRadius: '20px',
                padding: '6px 14px',
                fontSize: '11px',
                fontWeight: isSelected ? '700' : '600',
                cursor: 'pointer',
                transition: 'all 0.25s',
                boxShadow: isSelected ? '0 0 12px rgba(196,154,60,0.35)' : 'none'
              }}
            >
              {key} Mukhi
            </button>
          );
        })}
      </div>

      {/* Specifications Box */}
      <div className="bead-specs-box" style={{
        background: 'var(--dark-gradient)',
        border: '1px solid rgba(196, 154, 60, 0.25)',
        borderRadius: 'var(--r-md)',
        padding: '20px',
        color: '#fff',
        boxShadow: '0 8px 28px rgba(0,0,0,0.4)',
        width: '100%',
        textAlign: 'left'
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
            background: 'rgba(196,154,60,0.15)',
            border: '1px solid rgba(196,154,60,0.3)',
            borderRadius: '4px',
            padding: '3px 8px',
            fontSize: '9px',
            fontWeight: '600',
            textTransform: 'uppercase',
            color: 'var(--gold)'
          }}>
            {activeData.rarity}
          </span>
          <span className="meta-label" style={{ fontSize: '11px', color: 'rgba(255,253,248,0.7)' }}>
            Ruling Planet: <strong style={{ color: 'var(--gold-lt)' }}>{activeData.planet}</strong>
          </span>
        </div>

        <h4 style={{
          fontFamily: 'var(--font-editorial-serif)',
          fontSize: '19px',
          fontWeight: '600',
          margin: '0 0 4px 0',
          color: '#fff'
        }}>
          {activeData.name}
        </h4>

        <p style={{
          fontSize: '10.5px',
          color: 'var(--gold-lt)',
          marginBottom: '8px',
          fontWeight: '500',
          letterSpacing: '0.02em'
        }}>
          {activeData.faces}
        </p>

        <p style={{
          fontSize: '12px',
          color: 'rgba(255,253,248,0.78)',
          lineHeight: 1.55,
          margin: '0 0 16px 0'
        }}>
          {activeData.desc}
        </p>

        {inquirySent ? (
          <div style={{
            background: 'rgba(196,154,60,0.12)',
            border: '1px solid rgba(196,154,60,0.35)',
            borderRadius: '8px',
            padding: '12px 16px',
            textAlign: 'center'
          }}>
            <p style={{
              color: 'var(--gold-lt)',
              fontWeight: '600',
              fontSize: '12.5px',
              marginBottom: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Inquiry Received!
            </p>
            <p style={{ color: 'rgba(255,253,248,0.85)', fontSize: '11px', margin: 0, lineHeight: 1.35 }}>
              A senior Vedic curator will contact you via WhatsApp shortly with laboratory X-Ray certificates and images.
            </p>
            <button
              type="button"
              onClick={() => setInquirySent(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(255,253,248,0.5)',
                fontSize: '9.5px',
                textDecoration: 'underline',
                marginTop: '8px',
                cursor: 'pointer'
              }}
            >
              Back to Specifications
            </button>
          </div>
        ) : (
          <div className="bead-action-row" style={{
            display: 'flex',
            gap: '8px',
            justifyContent: 'stretch',
            flexWrap: 'wrap'
          }}>
            <button
              type="button"
              className="btn-gold"
              onClick={() => setInquirySent(true)}
              style={{
                flex: 1,
                fontSize: '11px',
                padding: '10px 14px',
                justifyContent: 'center',
                display: 'inline-flex',
                alignItems: 'center',
                whiteSpace: 'nowrap'
              }}
            >
              Request Certified Images
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="btn-outline-white"
              style={{
                flex: 1,
                fontSize: '11px',
                padding: '10px 14px',
                textDecoration: 'none',
                textAlign: 'center',
                justifyContent: 'center',
                display: 'inline-flex',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#FFFFFF',
                borderRadius: '6px',
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              3D Modal Inspection ↗
            </button>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════
          HIGH-DEFINITION FULLSCREEN 3D MODAL VIEWER
          ══════════════════════════════════════════════════ */}
      {isModalOpen && typeof document !== 'undefined' && createPortal(
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999999,
          background: 'radial-gradient(ellipse at 50% 38%, #F7F2E7 0%, #E8DFC8 60%, #D4C7AE 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'space-between',
          overflow: 'hidden'
        }}>
          {/* Modal Header */}
          <div style={{
            padding: '20px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            zIndex: 10,
            background: 'linear-gradient(to bottom, rgba(232, 223, 200, 0.95) 0%, transparent 100%)',
            pointerEvents: 'auto'
          }}>
            <div>
              <div style={{
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#5C3E1B',
                fontWeight: '700',
                marginBottom: '4px'
              }}>
                Sacred 3D Examination · {activeData.rarity}
              </div>
              <h2 style={{
                fontFamily: 'var(--font-editorial-serif)',
                fontSize: 'clamp(22px, 4vw, 32px)',
                color: '#1A0F04',
                margin: 0,
                fontWeight: '600'
              }}>
                {activeData.name}
              </h2>
              <p style={{
                color: 'rgba(26, 15, 4, 0.72)',
                fontSize: '12px',
                margin: '4px 0 0 0',
                maxWidth: '480px'
              }}>
                {activeData.desc}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close 3D Modal"
              style={{
                background: 'rgba(255, 253, 248, 0.9)',
                border: '1px solid rgba(196, 154, 60, 0.4)',
                color: '#1A0F04',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 2px 8px rgba(74, 52, 24, 0.12)',
                flexShrink: 0
              }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Modal 3D Canvas Area */}
          <div
            ref={modalCanvasRef}
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              position: 'relative',
              cursor: 'grab'
            }}
          />

          {/* Modal Bottom Controls */}
          <div style={{
            padding: '16px 24px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            zIndex: 10,
            background: 'linear-gradient(to top, rgba(232, 223, 200, 0.96) 0%, transparent 100%)'
          }}>
            {/* Mukhi selector pill row */}
            <div style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              {[1, 5, 7, 14, 21].map((key) => {
                const isSelected = selectedMukhi === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedMukhi(key)}
                    style={{
                      background: isSelected ? 'var(--gold)' : 'rgba(255, 253, 248, 0.75)',
                      color: isSelected ? '#120a06' : '#4A3418',
                      border: isSelected ? '1px solid var(--gold)' : '1px solid rgba(196, 154, 60, 0.3)',
                      borderRadius: '24px',
                      padding: '8px 18px',
                      fontSize: '12px',
                      fontWeight: isSelected ? '700' : '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: isSelected ? '0 0 14px rgba(196, 154, 60, 0.35)' : 'none'
                    }}
                  >
                    {key} Mukhi
                  </button>
                );
              })}
            </div>

            {/* Interaction note & pause button */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              fontSize: '11px',
              color: 'rgba(26, 15, 4, 0.72)'
            }}>
              <span>Drag to turn · Scroll or pinch to zoom</span>
              <button
                type="button"
                onClick={() => setIsSpinning(prev => !prev)}
                style={{
                  background: 'rgba(255, 253, 248, 0.9)',
                  border: '1px solid rgba(196, 154, 60, 0.4)',
                  color: '#4A3418',
                  borderRadius: '20px',
                  padding: '5px 14px',
                  fontSize: '11px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                {isSpinning ? 'Pause spin' : 'Resume spin'}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
