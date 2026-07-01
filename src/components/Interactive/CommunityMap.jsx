import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const cities = [
  { 
    id: 'mumbai', 
    name: 'Mumbai, India', 
    coords: { x: 67, y: 55 }, 
    stats: "Headquarters & Blessing Altar", 
    seekers: "85,000+ Active Seekers", 
    buyer: "Rajesh K. (Industrialist)",
    item: "Siddha Mala (1 to 14 Mukhi)",
    note: "Blessed in our Worli center. Experiencing profound emotional balance and professional clarity within 90 days." 
  },
  { 
    id: 'nyc', 
    name: 'New York, USA', 
    coords: { x: 26, y: 35 }, 
    stats: "Spiritual Exhibition Hub", 
    seekers: "14,000+ Active Seekers", 
    buyer: "Sarah J. (Wellness Coach)",
    item: "Gauri Shankar & 14 Mukhi Combo",
    note: "Acquired during our annual Manhattan Expo. Deepened meditative states and amplified alignment." 
  },
  { 
    id: 'london', 
    name: 'London, UK', 
    coords: { x: 46, y: 30 }, 
    stats: "European Advisory Center", 
    seekers: "11,000+ Active Seekers", 
    buyer: "Dr. Nicholas P. (Researcher)",
    item: "7 Mukhi & 11 Mukhi Mala",
    note: "Utilizes electromagnetic resonance of certified beads for cardiac focus and breath alignment." 
  },
  { 
    id: 'singapore', 
    name: 'Singapore', 
    coords: { x: 76, y: 64 }, 
    stats: "SE Asian Exhibition Hub", 
    seekers: "9,000+ Active Seekers", 
    buyer: "Lina T. (Executive)",
    item: "Ek Mukhi Kaju & 12 Mukhi Surya",
    note: "Sourced through the Singapore Vedic Circle. Enabled powerful decision-making and inner vitality." 
  },
  { 
    id: 'sydney', 
    name: 'Sydney, Australia', 
    coords: { x: 88, y: 82 }, 
    stats: "Oceania Delivery Care", 
    seekers: "6,000+ Active Seekers", 
    buyer: "Marcus S. (Devotee)",
    item: "14 Mukhi Hanuman Pendant",
    note: "A sacred companion during daily trials. Promotes supreme fearlessness and physical strength." 
  }
];

export default function CommunityMap() {
  const [activeCityIndex, setActiveCityIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(true);
  const [viewBox, setViewBox] = useState("0 0 100 100");

  useEffect(() => {
    // Zoom cycle interval:
    // 1. Zoomed in on City (4s)
    // 2. Zoom out to World view (2s)
    // 3. Move to next City & Zoom in (repeat)
    const interval = setInterval(() => {
      if (isZoomed) {
        // Zoom out phase
        setIsZoomed(false);
        setViewBox("0 0 100 100");
      } else {
        // Zoom in phase to next city
        setActiveCityIndex((prev) => (prev + 1) % cities.length);
        setIsZoomed(true);
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isZoomed]);

  useEffect(() => {
    if (isZoomed) {
      const activeCity = cities[activeCityIndex];
      // Compute perfect bounding box of 32x32 units centered on city
      let minX = activeCity.coords.x - 16;
      let minY = activeCity.coords.y - 16;
      // Clamp values to keep viewBox inside 0-100 bounds
      minX = Math.max(0, Math.min(68, minX));
      minY = Math.max(0, Math.min(68, minY));
      setViewBox(`${minX} ${minY} 32 32`);
    } else {
      setViewBox("0 0 100 100");
    }
  }, [activeCityIndex, isZoomed]);

  const activeCity = cities[activeCityIndex];

  return (
    <div className="community-map-wrapper" style={{
      background: 'linear-gradient(135deg, #1C1613 0%, #120D0B 100%)',
      border: '1px solid rgba(196,154,60,0.22)',
      borderRadius: 'var(--r-lg)',
      padding: '24px',
      boxShadow: '0 12px 36px rgba(0,0,0,0.4)',
      overflow: 'hidden'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold)', fontWeight: '600' }}>Live Devotee Registry</span>
          <h4 style={{ margin: 0, fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', color: '#fff' }}>Global Connection Tracker</h4>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="pulse-indicator-dot" />
          <span style={{ fontSize: '11px', color: 'rgba(255,253,248,0.5)', fontFamily: 'var(--font-mono)' }}>AUTO-ROTATING NETWORKS</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Side: Dynamic SVG Map (Cols 1-8) */}
        <div className="lg:col-span-8 relative flex items-center justify-center" style={{ 
          background: 'rgba(0, 0, 0, 0.35)', 
          border: '1px solid rgba(196,154,60,0.1)', 
          borderRadius: 'var(--r-md)', 
          height: '280px',
          overflow: 'hidden'
        }}>
          
          <motion.svg 
            viewBox={viewBox} 
            animate={{ viewBox }}
            transition={{ type: 'spring', stiffness: 50, damping: 15 }}
            style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
          >
            {/* Fine Grid Mesh underlay */}
            <g stroke="rgba(196, 154, 60, 0.04)" strokeWidth="0.15">
              {Array.from({ length: 20 }).map((_, i) => (
                <line key={`lh-${i}`} x1="0" y1={i * 5} x2="100" y2={i * 5} />
              ))}
              {Array.from({ length: 20 }).map((_, i) => (
                <line key={`lv-${i}`} x1={i * 5} y1="0" x2={i * 5} y2="100" />
              ))}
            </g>

            {/* Stylized high-detail world outline representations */}
            <g stroke="rgba(196,154,60,0.22)" fill="none" strokeWidth="0.4">
              {/* North America */}
              <path d="M10,20 L30,18 L32,30 L22,42 L18,50 L25,52 L26,40 L35,32 L28,25 Z" opacity="0.3" />
              {/* South America */}
              <path d="M25,55 L35,62 L32,85 L28,88 L22,65 Z" opacity="0.35" />
              {/* Europe & Africa */}
              <path d="M42,20 L58,15 L52,38 L48,52 L54,72 L46,80 L40,65 L45,45 Z" opacity="0.4" />
              {/* Asia */}
              <path d="M55,18 L85,22 L88,40 L78,55 L70,68 L62,55 L58,35 Z" opacity="0.45" />
              {/* Oceania */}
              <path d="M80,72 L92,75 L90,88 L80,82 Z" opacity="0.45" />
            </g>

            {/* Geodesic Connection Arcs from Mumbai (67, 55) */}
            {cities.map((city) => {
              if (city.id === 'mumbai') return null;
              const dx = city.coords.x - 67;
              const dy = city.coords.y - 55;
              const mx = 67 + dx / 2;
              const my = 55 + dy / 2 - 12; // Arced offset upwards
              return (
                <motion.path
                  key={`arc-${city.id}`}
                  d={`M 67 55 Q ${mx} ${my} ${city.coords.x} ${city.coords.y}`}
                  fill="none"
                  stroke="var(--gold)"
                  strokeWidth="0.3"
                  opacity={isZoomed ? 0.6 : 0.25}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5 }}
                />
              );
            })}

            {/* Glowing spot beacons */}
            {cities.map((city, idx) => {
              const isActive = activeCityIndex === idx;
              return (
                <g 
                  key={city.id}
                  onClick={() => { setActiveCityIndex(idx); setIsZoomed(true); }}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Outer pulsing ring for active spot */}
                  {isActive && (
                    <motion.circle
                      cx={city.coords.x}
                      cy={city.coords.y}
                      r="2.5"
                      fill="none"
                      stroke="var(--gold)"
                      strokeWidth="0.4"
                      animate={{ scale: [1, 2.2, 1], opacity: [0.8, 0, 0.8] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                  {/* Outer spot halo */}
                  <circle
                    cx={city.coords.x}
                    cy={city.coords.y}
                    r={isActive ? "1.2" : "0.8"}
                    fill="var(--gold-lt)"
                    opacity={isActive ? 0.9 : 0.5}
                  />
                  {/* Core Spot Dot */}
                  <circle
                    cx={city.coords.x}
                    cy={city.coords.y}
                    r="0.5"
                    fill="var(--gold)"
                  />
                </g>
              );
            })}
          </motion.svg>

          {/* Quick HUD indicator overlays inside map */}
          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            background: 'rgba(28, 22, 19, 0.82)',
            border: '1px solid rgba(196, 154, 60, 0.25)',
            borderRadius: '4px',
            padding: '4px 8px',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span style={{ fontSize: '8px', color: 'var(--gold)', letterSpacing: '0.04em', fontFamily: 'var(--font-mono)' }}>
              {isZoomed ? `ZOOMED_LOC: [${activeCity.name.toUpperCase()}]` : "WORLD_VIEW: GLOBAL_MAP"}
            </span>
          </div>

          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            display: 'flex',
            gap: '4px'
          }}>
            {cities.map((c, i) => (
              <button
                key={c.id}
                onClick={() => { setActiveCityIndex(i); setIsZoomed(true); }}
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: activeCityIndex === i ? 'var(--gold)' : 'rgba(255,253,248,0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'background 0.2s'
                }}
              />
            ))}
          </div>
        </div>

        {/* Right Side: Detailed Buyer Profile Card (Cols 9-12) */}
        {/* On smaller screens, this card stacks perfectly and layout never breaks! */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div style={{
            background: 'rgba(255, 253, 248, 0.02)',
            border: '1px solid rgba(196, 154, 60, 0.15)',
            borderRadius: 'var(--r-md)',
            padding: '18px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            minHeight: '220px'
          }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCity.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
                style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--gold-lt)' }}>
                      📍 {activeCity.name}
                    </span>
                    <span style={{ fontSize: '10px', color: 'rgba(255,253,248,0.4)', fontFamily: 'var(--font-mono)' }}>
                      {activeCity.seekers.split(' ')[0]}
                    </span>
                  </div>

                  <span style={{ fontSize: '8px', background: 'rgba(196,154,60,0.12)', border: '1px solid rgba(196,154,60,0.25)', borderRadius: '3px', padding: '1px 5px', color: 'var(--gold)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Verified Devotee Sourcing
                  </span>

                  <h5 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', color: '#fff', margin: '8px 0 2px', fontWeight: 'bold' }}>
                    {activeCity.buyer}
                  </h5>

                  <p style={{ margin: 0, fontSize: '11px', color: 'var(--gold-lt)', fontFamily: 'var(--font-mono)', marginBottom: '10px' }}>
                    💎 Sourced: {activeCity.item}
                  </p>

                  <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,253,248,0.8)', lineHeight: '1.5', fontStyle: 'italic' }}>
                    "{activeCity.note}"
                  </p>
                </div>

                <div style={{ borderTop: '1px solid rgba(196,154,60,0.1)', paddingTop: '10px', marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '10px', color: 'rgba(255,253,248,0.5)' }}>
                    {activeCity.stats}
                  </span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button 
                      onClick={() => { setIsZoomed(false); setViewBox("0 0 100 100"); }}
                      style={{
                        background: !isZoomed ? 'rgba(196,154,60,0.25)' : 'rgba(255,253,248,0.03)',
                        border: '1px solid rgba(196,154,60,0.2)',
                        borderRadius: '4px',
                        padding: '2px 8px',
                        fontSize: '9px',
                        color: 'var(--gold)',
                        cursor: 'pointer'
                      }}
                    >
                      World
                    </button>
                    <button 
                      onClick={() => { setIsZoomed(true); }}
                      style={{
                        background: isZoomed ? 'rgba(196,154,60,0.25)' : 'rgba(255,253,248,0.03)',
                        border: '1px solid rgba(196,154,60,0.2)',
                        borderRadius: '4px',
                        padding: '2px 8px',
                        fontSize: '9px',
                        color: 'var(--gold)',
                        cursor: 'pointer'
                      }}
                    >
                      Zoom
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
