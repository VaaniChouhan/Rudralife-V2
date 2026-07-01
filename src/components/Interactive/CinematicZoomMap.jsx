import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const cities = [
  { id: 'mumbai', name: 'Mumbai, India', coords: { x: 67, y: 55 }, stats: "Global HQ & Blessing Altar", seekers: "85,000+ Seekers", note: "Over 25 years of local expert consulting and custom gold/silver mala crafting.", highlights: "Primary hub for rare bead consecrations and expert consultations." },
  { id: 'delhi', name: 'New Delhi, India', coords: { x: 65, y: 50 }, stats: "Divine Heritage Sourcing", seekers: "42,000+ Seekers", note: "Our primary North India center for sourcing authentic Nepali beads.", highlights: "Direct relationships with sacred monasteries and high-altitude farmers." },
  { id: 'dubai', name: 'Dubai, UAE', coords: { x: 58, y: 53 }, stats: "Gulf Region Care Center", seekers: "12,000+ Seekers", note: "Serving corporate leaders, wellness studios, and spiritual collectors.", highlights: "Major annual blessing exhibitions in premium business zones." },
  { id: 'london', name: 'London, UK', coords: { x: 47, y: 34 }, stats: "European Advisory Center", seekers: "11,000+ Seekers", note: "Providing ISO-laboratory certified beads and personal advice.", highlights: "Dedicated virtual consulting sessions for spiritual practitioners." },
  { id: 'nyc', name: 'New York, USA', coords: { x: 26, y: 36 }, stats: "North American Hub", seekers: "14,000+ Seekers", note: "Bringing certified Vedic consultations and authentic malas to the West.", highlights: "Fast, fully-insured FedEx shipping with customs clearance assistance." },
  { id: 'singapore', name: 'Singapore', coords: { x: 74, y: 64 }, stats: "South-East Asian Hub", seekers: "9,000+ Seekers", note: "Host of major annual blessing events and spiritual expositions.", highlights: "Custom thread alignment service and localized shipping support." },
  { id: 'sydney', name: 'Sydney, Australia', coords: { x: 86, y: 80 }, stats: "Oceania Delivery Center", seekers: "6,000+ Seekers", note: "Reaching devotees and spiritual communities across the region.", highlights: "Secure high-grade insured transit to Australia and New Zealand." }
];

export default function CinematicZoomMap() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomState, setZoomState] = useState('in'); // 'in' | 'out'
  const [isManual, setIsManual] = useState(false);

  useEffect(() => {
    if (isManual) return;

    // Timer to cycle through cities
    const interval = setInterval(() => {
      // Step 1: Start Zoom-Out transition
      setZoomState('out');
      
      setTimeout(() => {
        // Step 2: Switch city and start Zoom-In transition
        setCurrentIndex((prev) => (prev + 1) % cities.length);
        setZoomState('in');
      }, 1200); // Wait for zoom-out transition to complete

    }, 5500); // Total cycle time per city is 5.5s

    return () => clearInterval(interval);
  }, [isManual]);

  const activeCity = cities[currentIndex] ?? cities[0];
  const activeCoords = activeCity?.coords ?? { x: 50, y: 50 };

  // Map viewport dimensions and coordinates
  // Default world: 0 0 100 100
  // Zoomed world: centering on the active city coordinates with a width/height of 25
  const currentViewBox = zoomState === 'out' 
    ? "0 0 100 100" 
    : `${Math.max(10, Math.min(80, (activeCoords.x ?? 50) - 15.5))} ${Math.max(10, Math.min(75, (activeCoords.y ?? 50) - 12.5))} 31 25`;

  const handleCityClick = (index) => {
    setIsManual(true);
    setZoomState('out');
    setTimeout(() => {
      setCurrentIndex(index);
      setZoomState('in');
    }, 1000);
  };

  return (
    <div className="cinematic-map-card" style={{
      background: 'linear-gradient(135deg, #1C1613 0%, #120D0B 100%)',
      border: '1px solid rgba(196, 154, 60, 0.22)',
      borderRadius: 'var(--r-lg)',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.45)',
      marginTop: '28px'
    }}>
      {/* Glow lines decoration */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '10%',
        right: '10%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(196, 154, 60, 0.3), transparent)'
      }} />

      {/* Grid pattern background overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(196, 154, 60, 0.04) 1px, transparent 1px)',
        backgroundSize: '16px 16px',
        opacity: 0.7,
        pointerEvents: 'none'
      }} />

      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Header with manual/auto indicator */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: '600', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.12em', margin: 0 }}>
            ⚡ Global Connection Tracker
          </h4>
          <button 
            onClick={() => { setIsManual(false); setZoomState('in'); }} 
            style={{
              background: 'rgba(196, 154, 60, 0.08)',
              border: isManual ? '1px solid rgba(196, 154, 60, 0.2)' : '1px solid var(--gold)',
              borderRadius: '20px',
              padding: '4px 12px',
              fontSize: '10px',
              color: isManual ? 'rgba(255,253,248,0.6)' : 'var(--gold-lt)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.3s ease'
            }}
          >
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: isManual ? '#888' : '#00ff66',
              boxShadow: isManual ? 'none' : '0 0 6px #00ff66',
              display: 'inline-block'
            }} />
            {isManual ? 'Resume Cinematic Autopilot' : 'Cinematic Live Tracking'}
          </button>
        </div>

        {/* Map Stage */}
        <div className="map-view-stage" style={{
          position: 'relative',
          height: '280px',
          background: 'rgba(0, 0, 0, 0.4)',
          borderRadius: 'var(--r-md)',
          border: '1px solid rgba(196, 154, 60, 0.08)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <motion.svg 
            animate={{ viewBox: currentViewBox }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }} // Elegant cinematic slow pan-zoom ease
            style={{ width: '100%', height: '100%' }}
          >
            {/* Highly stylized minimalist continents paths */}
            <g fill="none" stroke="rgba(196, 154, 60, 0.07)" strokeWidth="0.6">
              {/* North America */}
              <path d="M10,12 C14,10 24,15 28,25 C31,32 25,45 20,48 C16,50 15,58 12,60 Z" />
              {/* South America */}
              <path d="M18,52 C22,54 28,62 26,72 C24,80 18,92 14,94 Z" strokeDasharray="1 2" />
              {/* Europe & Africa */}
              <path d="M42,15 C48,12 55,18 52,28 C49,38 42,48 45,58 C48,68 45,78 38,88 Z" />
              {/* Asia & Middle East */}
              <path d="M54,20 C62,15 75,18 78,28 C81,38 72,50 78,58 C84,66 76,74 70,76 Z" />
              {/* Australia */}
              <path d="M78,72 C82,72 88,78 86,86 C84,92 78,94 76,90 Z" />
            </g>

            {/* Connection curved lines from Mumbai (67, 55) */}
            {cities.map((city) => {
              if (city.id === 'mumbai') return null;
              const safeX = city.coords?.x ?? 50;
              const safeY = city.coords?.y ?? 50;
              const dx = safeX - 67;
              const dy = safeY - 55;
              const mx = 67 + dx / 2;
              const my = 55 + dy / 2 - 8; // Arc lift height
              return (
                <g key={`group-arc-${city.id}`}>
                  {/* Outer glow aura path */}
                  <path
                    d={`M 67 55 Q ${mx} ${my} ${safeX} ${safeY}`}
                    fill="none"
                    stroke="var(--gold)"
                    strokeWidth="0.5"
                    opacity={zoomState === 'in' && activeCity.id === city.id ? 0.6 : 0.15}
                    style={{ transition: 'opacity 0.8s ease' }}
                  />
                  {/* Flowing energy dot */}
                  {zoomState === 'in' && activeCity.id === city.id && (
                    <motion.circle
                      cx={67}
                      cy={55}
                      r="0.5"
                      fill="#fff"
                      style={{ filter: 'drop-shadow(0 0 2px var(--gold))' }}
                      initial={{ offsetDistance: "0%" }}
                      animate={{
                        cx: [67, mx, safeX],
                        cy: [55, my, safeY]
                      }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}
                </g>
              );
            })}

            {/* Glowing spots */}
            {cities.map((city, idx) => {
              const isActive = activeCity.id === city.id;
              const safeX = city.coords?.x ?? 50;
              const safeY = city.coords?.y ?? 50;
              return (
                <g 
                  key={`spot-${city.id}`} 
                  onClick={() => handleCityClick(idx)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Large pulse circle */}
                  <motion.circle
                    cx={safeX}
                    cy={safeY}
                    r={isActive ? 3.8 : 2}
                    fill="none"
                    stroke="var(--gold)"
                    strokeWidth={isActive ? 0.6 : 0.3}
                    animate={isActive ? { scale: [1, 2.6, 1], opacity: [0.7, 0, 0.7] } : { scale: [1, 1.8, 1], opacity: [0.35, 0, 0.35] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.2 }}
                  />
                  {/* Core seed spot */}
                  <circle
                    cx={safeX}
                    cy={safeY}
                    r={isActive ? 1.2 : 0.7}
                    fill={isActive ? '#fff' : 'var(--gold)'}
                    style={{ filter: isActive ? 'drop-shadow(0 0 3px var(--gold))' : 'none', transition: 'all 0.5s ease' }}
                  />
                </g>
              );
            })}
          </motion.svg>

          {/* Holographic Radar Scanner sweeping effect */}
          <div style={{
            position: 'absolute',
            inset: 0,
            border: '1px solid rgba(196,154,60,0.1)',
            borderRadius: 'var(--r-md)',
            boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)',
            pointerEvents: 'none'
          }} />

          {/* Quick Stats Overlay (Floating on Left of map) */}
          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            background: 'rgba(15, 12, 6, 0.85)',
            border: '1px solid rgba(196, 154, 60, 0.2)',
            borderRadius: '6px',
            padding: '8px 12px',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
            pointerEvents: 'none'
          }}>
            <div style={{ fontSize: '18px' }}>🌍</div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#fff', lineHeight: 1.1 }}>2.75 Lakh+ Seekers</div>
              <div style={{ fontSize: '8.5px', color: 'var(--gold)', letterSpacing: '0.04em', textTransform: 'uppercase', marginTop: '1px' }}>Insured Global Shipping</div>
            </div>
          </div>
        </div>

        {/* Selected City Details Panel (Beautiful, legible typography, fully responsive) */}
        <div style={{ marginTop: '18px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCity.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              style={{
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(196, 154, 60, 0.12)',
                borderRadius: 'var(--r-md)',
                padding: '16px 20px',
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '12px'
              }}
              className="md:grid-cols-3"
            >
              {/* Column 1: Title and Count */}
              <div>
                <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold)' }}>
                  Active Connection Hub
                </span>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', fontWeight: '600', color: '#fff', margin: '4px 0 2px' }}>
                  {activeCity.name}
                </h3>
                <span style={{
                  background: 'rgba(196, 154, 60, 0.12)',
                  color: 'var(--gold-lt)',
                  fontSize: '10px',
                  fontWeight: '600',
                  padding: '2px 8px',
                  borderRadius: '20px',
                  display: 'inline-block',
                  marginTop: '4px'
                }}>
                  {activeCity.seekers} Guided
                </span>
              </div>

              {/* Column 2: Role / Service details */}
              <div className="border-t border-[rgba(196,154,60,0.1)] pt-3 md:border-t-0 md:pt-0 md:border-l md:pl-6">
                <span style={{ fontSize: '9.5px', textTransform: 'uppercase', color: 'rgba(255,253,248,0.5)', display: 'block', marginBottom: '2px' }}>
                  Regional Role &amp; Operations
                </span>
                <p style={{ fontSize: '11.5px', color: 'var(--gold-dim)', fontWeight: '600', margin: '0 0 4px', lineHeight: 1.3 }}>
                  {activeCity.stats}
                </p>
                <p style={{ fontSize: '11px', color: 'rgba(255,253,248,0.75)', margin: 0, lineHeight: 1.4 }}>
                  {activeCity.note}
                </p>
              </div>

              {/* Column 3: Trust Highlight */}
              <div className="border-t border-[rgba(196,154,60,0.1)] pt-3 md:border-t-0 md:pt-0 md:border-l md:pl-6">
                <span style={{ fontSize: '9.5px', textTransform: 'uppercase', color: 'rgba(255,253,248,0.5)', display: 'block', marginBottom: '2px' }}>
                  Regional Seeker Focus
                </span>
                <p style={{ fontSize: '11px', color: 'rgba(255,253,248,0.85)', margin: 0, lineHeight: 1.45, fontStyle: 'italic' }}>
                  "{activeCity.highlights}"
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Manual City Selector Navigation Buttons */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          justifyContent: 'center',
          marginTop: '16px'
        }}>
          {cities.map((city, idx) => (
            <button
              key={`btn-${city.id}`}
              onClick={() => handleCityClick(idx)}
              style={{
                background: activeCity.id === city.id ? 'var(--gold)' : 'rgba(255,253,248,0.03)',
                color: activeCity.id === city.id ? 'var(--black)' : 'rgba(255,253,248,0.7)',
                border: activeCity.id === city.id ? '1px solid var(--gold)' : '1px solid rgba(196,154,60,0.15)',
                borderRadius: '4px',
                padding: '5px 10px',
                fontSize: '10px',
                fontWeight: activeCity.id === city.id ? '600' : '400',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              {city.name.split(',')[0]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
