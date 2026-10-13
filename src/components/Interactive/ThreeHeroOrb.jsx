import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

const TAU = Math.PI * 2;
const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
const mix = (a, b, t) => a + (b - a) * t;
const sstep = (a, b, x) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

/* ── Noise Utilities ── */
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
    x *= 2.03; y *= 2.03; z *= 2.03;
    a *= 0.5;
  }
  return s;
}

function rdg(x, y, z, o) {
  let s = 0, a = 0.5;
  for (let i = 0; i < o; i++) {
    s += a * (1 - Math.abs(2 * vn(x, y, z) - 1));
    x *= 2.03; y *= 2.03; z *= 2.03;
    a *= 0.5;
  }
  return s;
}

/* ── Authentic Bead Shape: Five Clefts (Mukhi) Pole-to-Pole ── */
let G1 = 0, G2 = 0;
function grooves(x, y, z) {
  const th = Math.acos(clamp(y, -1, 1)), ph = Math.atan2(z, x);
  const wob = 0.16 * Math.sin(th * 2.4 + 0.7) + 0.14 * (vn(x * 2 + 9, y * 2, z * 2) - 0.5) + 0.05 * Math.sin(th * 7 + ph * 3);
  let d = (ph + wob) / (TAU / 5);
  const id = Math.round(d);
  d -= id;
  const t = d * TAU / 5;
  const wv = 0.75 + 0.5 * vn(id * 7.3 + th * 1.6, 3.1, id * 2.1);
  G1 = Math.exp(-t * t / (0.0045 * wv * wv));
  G2 = Math.exp(-t * t / (0.09 * wv)) * (0.8 + 0.2 * wv);
}

const TS = 0.12;

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

function radius(x, y, z) {
  grooves(x, y, z);
  const th = Math.acos(clamp(y, -1, 1)), s = Math.sin(th), pole = Math.min(th, Math.PI - th);
  let r = 1 + 0.045 * (fbm(x * 1.6, y * 1.6, z * 1.6, 3) - 0.4375)
          + 0.15 * (worm(x, y, z) - 0.5)
          + 0.06 * (rdg(x * 3.2 + 5, y * 3.2, z * 3.2, 2) - 0.375)
          + 0.03 * (1 - wor(x * 6, y * 6, z * 6) * 1.5 - 0.3);
  r -= (0.13 * G1 + 0.055 * G2) * (0.45 + 0.55 * s);
  return r * (1 - 0.12 * sstep(0.34, 0.1, pole));
}

/* ── Procedural Textures from Panchmukhi Rudraksha (2) ── */
function makeTextures(TW, TH, renderer) {
  const mk = () => {
    const c = document.createElement('canvas');
    c.width = TW;
    c.height = TH;
    const x = c.getContext('2d');
    return [c, x, x.createImageData(TW, TH)];
  };
  const [cC, xC, dC] = mk(), [cR, xR, dR] = mk(), [cN, xN, dN] = mk(), [cA, xA, dA] = mk();
  const hh = new Float32Array(TW * TH);

  const RAMP = [
    [30, 16, 10],
    [58, 30, 18],
    [92, 48, 28],
    [128, 68, 38],
    [158, 86, 44],
    [184, 104, 56],
    [204, 124, 72]
  ];

  const cs = new Float32Array(TW), sn = new Float32Array(TW);
  for (let x = 0; x < TW; x++) {
    const p = ((x + 0.5) / TW) * TAU;
    cs[x] = Math.cos(p);
    sn[x] = Math.sin(p);
  }

  for (let y = 0; y < TH; y++) {
    const th = TS + ((y + 0.5) / TH) * (Math.PI - 2 * TS);
    const sT = Math.sin(th), dy = Math.cos(th), pole = Math.min(th, Math.PI - th);

    for (let x = 0; x < TW; x++) {
      const dx = -cs[x] * sT, dz = sn[x] * sT;
      grooves(dx, dy, dz);
      const g1 = G1, g2 = G2;

      const wm = worm(dx, dy, dz), cav = 1 - wm;
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

  const an = renderer.capabilities.getMaxAnisotropy ? Math.min(renderer.capabilities.getMaxAnisotropy(), 4) : 1;
  const T = (c, isSRGB) => {
    const t = new THREE.CanvasTexture(c);
    t.anisotropy = an;
    t.wrapS = THREE.RepeatWrapping;
    if (isSRGB) t.colorSpace = THREE.SRGBColorSpace;
    return t;
  };

  return {
    map: T(cC, true),
    rough: T(cR, false),
    normal: T(cN, false),
    ao: T(cA, false)
  };
}

export default function ThreeHeroOrb() {
  const containerRef = useRef(null);
  const replayRef = useRef(null);
  const [isFormed, setIsFormed] = useState(false);

  const handleReplay = useCallback(() => {
    if (replayRef.current) replayRef.current();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const dom = containerRef.current;
    const width = dom.clientWidth || 320;
    const height = dom.clientHeight || 320;
    const isMobile = window.innerWidth < 768;

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(DPR);
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    dom.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 50);
    let baseZ = 4.6;
    let zoom = 1, zoomT = 1;

    // Studio Environment: warm softboxes + a tall strip light for oily glints
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
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTexture = pmrem.fromScene(envS, 0.03).texture;
    scene.environment = envTexture;
    pmrem.dispose();

    // Directional Lighting
    const key = new THREE.DirectionalLight(0xfff2e4, 2.4);
    key.position.set(-3, 4, 4);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0xffd2ae, 1.8);
    rim.position.set(4, 1, -4);
    scene.add(rim);

    const fill = new THREE.HemisphereLight(0xfff0e2, 0x3a2218, 0.4);
    scene.add(fill);

    const glow = new THREE.PointLight(0xffb43a, 0, 9);
    glow.position.set(0.3, 0.4, 2.4);
    scene.add(glow);

    // Textures
    const TW = isMobile ? 768 : 1024;
    const TH = isMobile ? 384 : 512;
    const tx = makeTextures(TW, TH, renderer);

    // Bead Geometry
    const SW = isMobile ? 320 : 480;
    const SH = isMobile ? 200 : 300;
    const geo = new THREE.SphereGeometry(1, SW, SH, 0, TAU, TS, Math.PI - 2 * TS);
    const P = geo.attributes.position;
    for (let i = 0; i < P.count; i++) {
      const x = P.getX(i), y = P.getY(i), z = P.getZ(i);
      const r = radius(x, y, z);
      P.setXYZ(i, x * r, y * r * 0.9, z * r);
    }
    geo.computeVertexNormals();

    // Normal seam welding
    const NORM = geo.attributes.normal;
    for (let r = 0; r <= SH; r++) {
      const a = r * (SW + 1), b = a + SW;
      let nx = NORM.getX(a) + NORM.getX(b);
      let ny = NORM.getY(a) + NORM.getY(b);
      let nz = NORM.getZ(a) + NORM.getZ(b);
      const L = Math.hypot(nx, ny, nz) || 1;
      nx /= L; ny /= L; nz /= L;
      NORM.setXYZ(a, nx, ny, nz);
      NORM.setXYZ(b, nx, ny, nz);
    }

    geo.setAttribute('uv2', geo.attributes.uv);

    // Physical Material from Panchmukhi Rudraksha (2)
    const mat = new THREE.MeshPhysicalMaterial({
      map: tx.map,
      normalMap: tx.normal,
      normalScale: new THREE.Vector2(2.1, 2.1),
      roughnessMap: tx.rough,
      roughness: 1,
      metalness: 0,
      aoMap: tx.ao,
      aoMapIntensity: 1,
      clearcoat: 0.2,
      clearcoatRoughness: 0.35,
      emissive: new THREE.Color(1, 0.62, 0.12),
      emissiveIntensity: 0,
      transparent: true,
      opacity: 0
    });
    const bead = new THREE.Mesh(geo, mat);

    // Central Bore
    const hole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.107, 0.107, 1.5, 32, 1, true),
      new THREE.MeshStandardMaterial({ color: 0x1a0b04, roughness: 0.9, side: THREE.DoubleSide, transparent: true, opacity: 0 })
    );

    // Sacred Light Particles Formation System
    const N = isMobile ? 8500 : 13000;
    const pS = new Float32Array(N * 3);
    const pT = new Float32Array(N * 3);
    const pR = new Float32Array(N * 4);

    for (let i = 0; i < N; i++) {
      let x, y, z, L;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
        L = Math.hypot(x, y, z);
      } while (L > 1 || L < 0.1);
      x /= L; y /= L; z /= L;
      if (Math.min(Math.acos(y), Math.PI - Math.acos(y)) < 0.115) {
        i--;
        continue;
      }
      const r = radius(x, y, z) * (1 + Math.random() * 0.012);
      pT.set([x * r, y * r * 0.9, z * r], i * 3);
      const d = 3 + Math.random() * 5;
      const a = Math.random() * TAU;
      const c = Math.random() * 2 - 1;
      const s = Math.sqrt(1 - c * c);
      pS.set([d * s * Math.cos(a), d * c * 0.8, d * s * Math.sin(a)], i * 3);
      pR.set([Math.random(), 0.02 + Math.random() * 0.035, Math.random(), Math.random()], i * 4);
    }

    const pg = new THREE.BufferGeometry();
    pg.setAttribute('position', new THREE.BufferAttribute(pS, 3));
    pg.setAttribute('aT', new THREE.BufferAttribute(pT, 3));
    pg.setAttribute('aR', new THREE.BufferAttribute(pR, 4));

    const pm = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uP: { value: 0 },
        uTime: { value: 0 },
        uFade: { value: 1 },
        uPx: { value: 1 }
      },
      vertexShader: `
        attribute vec3 aT;
        attribute vec4 aR;
        uniform float uP, uTime, uPx;
        varying float vB;
        void main() {
          float p = clamp((uP - aR.x * .5) / .5, 0., 1.);
          float e = p * p * (3. - 2. * p);
          vec3 s = position + .18 * vec3(sin(uTime * .8 + aR.w * 30.), cos(uTime * .7 + aR.w * 21.), sin(uTime * .9 + aR.w * 13.)) * (1. - e);
          float an = (1. - e) * (2.5 + aR.z * 2.);
          float c = cos(an), sn = sin(an);
          s.xz = mat2(c, sn, -sn, c) * s.xz;
          vec3 q = mix(s, aT, e);
          q += .008 * vec3(sin(uTime * 3. + aR.w * 40.), cos(uTime * 2.7 + aR.w * 23.), sin(uTime * 3.3 + aR.w * 11.)) * e;
          vec4 mv = modelViewMatrix * vec4(q, 1.);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = aR.y * uPx / -mv.z * (.7 + .7 * e);
          vB = (.55 + .45 * sin(uTime * 4. + aR.w * 60.)) * (.5 + .9 * e);
        }
      `,
      fragmentShader: `
        uniform float uFade;
        varying float vB;
        void main() {
          float d = length(gl_PointCoord - .5);
          float a = pow(smoothstep(.5, 0., d), 1.8);
          vec3 c = mix(vec3(1., .5, .08), vec3(1., .93, .55), a * a) * vB * 2.4;
          gl_FragColor = vec4(c, a * uFade);
        }
      `
    });
    const pts = new THREE.Points(pg, pm);
    pts.frustumCulled = false;

    // Master Bead Group
    const group = new THREE.Group();
    group.add(bead, hole, pts);
    group.quaternion.setFromEuler(new THREE.Euler(0.5, 0, -0.28));
    scene.add(group);

    // Responsive sizing & projection matrix
    const updateSize = () => {
      const w = dom.clientWidth || width;
      const h = dom.clientHeight || height;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      baseZ = 4.6 * Math.max(1, 0.95 / camera.aspect);
      pm.uniforms.uPx.value = h * DPR / (2 * Math.tan(camera.fov * Math.PI / 360));
      camera.updateProjectionMatrix();
    };
    updateSize();

    // ── Interaction: 3D Drag & Inertial Rotation ──
    const qa = new THREE.Quaternion(), AX = new THREE.Vector3(1, 0, 0), AY = new THREE.Vector3(0, 1, 0);
    const spin = (dx, dy) => group.quaternion.premultiply(qa.setFromAxisAngle(AY, dx)).premultiply(qa.setFromAxisAngle(AX, dy));
    const ptr = new Map();
    let vx = 0, vy = 0, pd = 0;
    const getTouchDist = () => {
      const a = [...ptr.values()];
      return Math.hypot(a[0][0] - a[1][0], a[0][1] - a[1][1]) || 1;
    };

    const onPointerDown = (e) => {
      dom.setPointerCapture(e.pointerId);
      ptr.set(e.pointerId, [e.clientX, e.clientY]);
      vx = vy = 0;
      if (ptr.size === 2) pd = getTouchDist();
    };

    const onPointerMove = (e) => {
      const p = ptr.get(e.pointerId);
      if (!p) return;
      const dx = e.clientX - p[0], dy = e.clientY - p[1];
      p[0] = e.clientX; p[1] = e.clientY;
      if (ptr.size === 1) {
        vx = dx * 0.009; vy = dy * 0.009;
        spin(vx, vy);
      } else if (ptr.size === 2) {
        const d = getTouchDist();
        zoomT = clamp(zoomT * pd / d, 0.55, 1.7);
        pd = d;
      }
    };

    const onPointerUp = (e) => ptr.delete(e.pointerId);

    const onWheel = (e) => {
      e.preventDefault();
      zoomT = clamp(zoomT * Math.exp(e.deltaY * 0.001), 0.55, 1.7);
    };

    dom.addEventListener('pointerdown', onPointerDown);
    dom.addEventListener('pointermove', onPointerMove);
    dom.addEventListener('pointerup', onPointerUp);
    dom.addEventListener('pointercancel', onPointerUp);
    dom.addEventListener('wheel', onWheel, { passive: false });

    // Timeline Animation Loop
    let T = 0, last = performance.now();
    let animId;

    replayRef.current = () => {
      T = 0;
      setIsFormed(false);
    };

    let isVisible = true;
    const io = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting;
      if (visible && !isVisible) {
        last = performance.now();
        animId = requestAnimationFrame(frame);
      }
      isVisible = visible;
    }, { threshold: 0.02 });
    io.observe(dom);

    const frame = (now) => {
      if (!isVisible) return;
      animId = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      T += dt;

      const prog = clamp(T / 4.4, 0, 1);
      const gIn = sstep(3, 5, T);
      const melt = sstep(5.2, 8.6, T);
      const flash = Math.exp(-Math.pow((T - 5.3) / 0.45, 2));
      const lit = mix(0.12, 1, melt);
      const calm = 1 - sstep(0, 9, T);

      pm.uniforms.uP.value = prog;
      pm.uniforms.uTime.value = T;
      pm.uniforms.uFade.value = 1 - sstep(5.6, 8.4, T);
      pts.visible = T < 8.5;

      bead.visible = hole.visible = T > 2.9;
      const op = mix(gIn * 0.75, 1, melt);
      mat.opacity = hole.material.opacity = op;
      mat.transparent = hole.material.transparent = op < 0.999;

      mat.emissiveIntensity = 3.2 * gIn * (1 - melt) * (0.85 + 0.15 * Math.sin(T * 5)) + 0.9 * flash;
      glow.intensity = 4 * gIn * (1 - melt) + 6 * flash;

      key.intensity = 1.5 * lit;
      rim.intensity = 1.1 * lit;
      fill.intensity = 0.45 * lit;
      key.position.set(-3 + 1.6 * Math.sin(T * 0.35), 3.6 + 0.8 * Math.sin(T * 0.23), 4);

      if (!ptr.size) {
        spin(vx * dt * 60, vy * dt * 60);
        vx *= 0.94;
        vy *= 0.94;
        spin((0.26 + 0.6 * calm) * dt * sstep(2.8, 4.5, T), 0);
      }

      group.position.y = 0.04 * Math.sin(T * 0.8) * sstep(5.5, 8.5, T);
      zoom += (zoomT - zoom) * 0.1;

      camera.position.set(0, 0.15 + 0.25 * calm, baseZ * zoom * (1 + 0.28 * calm));
      camera.lookAt(0, 0, 0);

      if (T > 8.8) {
        setIsFormed(true);
      }

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(frame);

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(dom);

    return () => {
      cancelAnimationFrame(animId);
      io.disconnect();
      resizeObserver.disconnect();
      dom.removeEventListener('pointerdown', onPointerDown);
      dom.removeEventListener('pointermove', onPointerMove);
      dom.removeEventListener('pointerup', onPointerUp);
      dom.removeEventListener('pointercancel', onPointerUp);
      dom.removeEventListener('wheel', onWheel);

      tx.map.dispose();
      tx.rough.dispose();
      tx.normal.dispose();
      tx.ao.dispose();
      envTexture.dispose();
      geo.dispose();
      mat.dispose();
      hole.geometry.dispose();
      hole.material.dispose();
      pg.dispose();
      pm.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div 
        ref={containerRef} 
        style={{ 
          width: '100%', 
          height: '100%', 
          position: 'absolute', 
          inset: 0, 
          zIndex: 1, 
          cursor: 'grab', 
          touchAction: 'none' 
        }} 
      />

      {/* Replay formation button */}
      <button
        type="button"
        onClick={handleReplay}
        aria-label="Replay Panchmukhi formation"
        title="Replay sacred light formation"
        style={{
          position: 'absolute',
          bottom: '-14px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(28, 20, 14, 0.82)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(196, 154, 60, 0.38)',
          color: 'var(--gold-lt, #DEB96A)',
          borderRadius: '99px',
          padding: '4px 14px',
          fontSize: '9.5px',
          fontWeight: '600',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          zIndex: 10,
          boxShadow: '0 4px 14px rgba(0,0,0,0.5)',
          transition: 'all 0.25s',
          whiteSpace: 'nowrap'
        }}
      >
        <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M1 4v6h6M23 20v-6h-6" />
          <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
        </svg>
        Replay Formation
      </button>
    </div>
  );
}
