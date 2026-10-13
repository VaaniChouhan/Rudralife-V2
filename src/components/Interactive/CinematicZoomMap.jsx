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

  const activeCity = cities[currentIndex];

  // Map viewport dimensions and coordinates
  // Default world: 0 0 100 100
  // Zoomed world: centering on the active city coordinates with a width/height of 25
  const currentViewBox = zoomState === 'out' 
    ? "0 0 100 100" 
    : `${Math.max(10, Math.min(80, activeCity.coords.x - 15.5))} ${Math.max(10, Math.min(75, activeCity.coords.y - 12.5))} 31 25`;

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
      background: 'var(--dark-gradient)',
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
          <div 
            style={{
              background: 'rgba(196, 154, 60, 0.08)',
              border: '1px solid rgba(196, 154, 60, 0.25)',
              borderRadius: '20px',
              padding: '4px 12px',
              fontSize: '10px',
              color: 'var(--gold-lt)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: '600'
            }}
          >
            <span>🌐</span>
            <span>GLOBAL REGISTRY</span>
          </div>
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
            {/* Highly detailed accurate world continents */}
            <g fill="rgba(196, 154, 60, 0.06)" stroke="rgba(196, 154, 60, 0.12)" strokeWidth="0.3">
              {/* North America - detailed with Great Lakes, Florida, Mexico, Central America */}
              <path d="M5,18 L8,15 L12,13 L15,10 L18,9 L20,10 L22,12 L24,14 L25,16 L27,18 L29,20 L30,22 L31,25 L30,28 L28,30 L26,32 L25,35 L24,37 L22,38 L20,40 L18,42 L17,44 L18,46 L20,47 L22,48 L24,47 L25,45 L27,44 L28,42 L27,40 L25,38 L24,36 L26,34 L28,33 L30,32 L31,30 L30,28 L28,26 L26,24 L25,22 L24,20 L22,18 L20,16 L18,15 L16,16 L14,18 L12,20 L10,22 L8,24 L7,26 L8,28 L10,30 L12,32 L14,34 L16,36 L18,38 L20,40 L22,42 L24,44 L22,46 L20,48 L18,50 L16,52 L14,54 L15,56 L17,57 L19,56 L20,54 L18,52 L16,50 L14,48 L12,46 L10,44 L8,42 L6,40 L5,38 L4,36 L3,34 L4,32 L5,30 L4,28 L3,26 L4,24 L5,22 L5,20 Z" />
              {/* Greenland */}
              <path d="M30,8 L33,7 L36,8 L38,10 L39,13 L38,16 L36,18 L34,17 L32,15 L30,12 L29,10 Z" />
              {/* South America - detailed with Brazil bulge, Patagonia */}
              <path d="M20,54 L22,53 L24,54 L26,56 L28,58 L30,60 L31,62 L32,65 L31,68 L30,72 L28,75 L26,78 L24,80 L22,82 L20,84 L18,86 L16,88 L15,90 L16,92 L18,93 L20,92 L22,90 L24,88 L22,86 L20,84 L18,82 L17,80 L18,78 L20,76 L22,74 L24,72 L26,70 L28,68 L29,66 L28,64 L26,62 L24,60 L22,58 L20,56 Z" />
              {/* Europe - detailed with Scandinavia, Italy boot, Iberian peninsula */}
              <path d="M42,12 L44,10 L46,11 L48,13 L50,12 L52,10 L54,11 L55,14 L54,16 L52,18 L50,20 L48,22 L46,24 L44,26 L42,28 L44,30 L46,32 L48,30 L50,28 L52,26 L54,24 L52,22 L50,20 L48,18 L50,16 L52,15 L54,16 L55,18 L54,20 L52,22 L50,24 L48,26 L46,28 L44,30 L42,32 Z" />
              {/* UK + Ireland */}
              <path d="M42,18 L44,16 L45,18 L44,20 L42,20 Z" />
              <path d="M40,18 L41,16 L42,18 L41,20 Z" />
              {/* Africa - detailed with Horn, Madagascar */}
              <path d="M42,34 L44,32 L46,34 L48,36 L50,38 L52,40 L54,42 L56,44 L58,46 L60,48 L62,50 L63,52 L62,55 L60,58 L58,60 L56,62 L54,64 L52,66 L50,68 L48,70 L46,72 L44,74 L42,76 L40,78 L38,80 L40,82 L42,84 L44,82 L46,80 L48,78 L50,76 L52,74 L54,72 L56,70 L58,68 L56,66 L54,64 L52,62 L50,60 L48,58 L46,56 L44,54 L42,52 L40,50 L38,48 L40,46 L42,44 L44,42 L46,40 L44,38 L42,36 Z" />
              {/* Madagascar */}
              <path d="M60,70 L62,68 L63,70 L62,74 L60,76 L59,74 L60,72 Z" />
              {/* Middle East + Arabian Peninsula */}
              <path d="M54,28 L56,26 L58,28 L60,30 L62,32 L64,34 L62,36 L60,38 L58,40 L56,42 L54,40 L52,38 L54,36 L56,34 L58,32 L56,30 Z" />
              {/* India subcontinent - detailed */}
              <path d="M62,38 L64,36 L66,38 L68,40 L70,42 L72,44 L74,46 L72,48 L70,50 L68,52 L66,54 L64,56 L62,58 L64,60 L66,62 L68,60 L70,58 L72,56 L70,54 L68,52 L66,50 L64,48 L66,46 L68,44 L66,42 L64,40 Z" />
              {/* Sri Lanka */}
              <circle cx="68" cy="62" r="1.2" />
              {/* Russia / Central Asia */}
              <path d="M52,10 L56,8 L60,7 L64,8 L68,10 L72,12 L76,14 L80,16 L84,18 L88,20 L90,22 L88,24 L84,26 L80,28 L76,26 L72,24 L68,22 L64,20 L60,18 L56,16 L54,14 Z" />
              {/* China / East Asia */}
              <path d="M68,24 L72,22 L76,24 L78,28 L80,32 L82,36 L80,38 L78,40 L76,42 L74,44 L72,42 L70,40 L68,38 L66,36 L64,34 L66,32 L68,30 L70,28 L68,26 Z" />
              {/* Japan */}
              <path d="M84,28 L86,26 L87,28 L86,32 L84,34 L83,32 L84,30 Z" />
              {/* Korean Peninsula */}
              <path d="M82,30 L83,28 L84,30 L83,32 L82,31 Z" />
              {/* Southeast Asia - Thailand, Vietnam, Malaysia */}
              <path d="M72,44 L74,46 L76,48 L78,50 L76,52 L74,54 L72,56 L70,54 L72,52 L74,50 L72,48 L70,46 Z" />
              {/* Indonesia archipelago */}
              <path d="M72,60 L74,58 L76,60 L78,62 L80,64 L82,62 L84,64 L82,66 L80,68 L78,66 L76,64 L74,62 Z" />
              {/* Philippines */}
              <path d="M80,46 L82,44 L83,46 L82,50 L80,48 Z" />
              {/* Australia - detailed */}
              <path d="M76,70 L80,68 L84,70 L88,72 L90,76 L92,80 L90,84 L88,86 L84,88 L80,86 L78,84 L76,80 L74,76 L76,74 Z" />
              {/* New Zealand */}
              <path d="M92,82 L93,80 L94,82 L93,86 L92,84 Z" />
              <path d="M93,86 L94,85 L95,87 L94,88 Z" />
              {/* Taiwan */}
              <circle cx="80" cy="42" r="0.8" />
            </g>

            {/* Connection curved lines from Mumbai (67, 55) */}
            {cities.map((city) => {
              if (city.id === 'mumbai') return null;
              const dx = city.coords.x - 67;
              const dy = city.coords.y - 55;
              const mx = 67 + dx / 2;
              const my = 55 + dy / 2 - 8; // Arc lift height
              return (
                <g key={`group-arc-${city.id}`}>
                  {/* Outer glow aura path */}
                  <path
                    d={`M 67 55 Q ${mx} ${my} ${city.coords.x} ${city.coords.y}`}
                    fill="none"
                    stroke="var(--gold)"
                    strokeWidth="0.5"
                    opacity={zoomState === 'in' && activeCity.id === city.id ? 0.6 : 0.15}
                    style={{ transition: 'opacity 0.8s ease' }}
                  />
                  {/* Flowing energy dot */}
                  {zoomState === 'in' && activeCity.id === city.id && (
                    <motion.g
                      initial={{ offsetDistance: "0%" }}
                      animate={{
                        x: [0, mx - 67, city.coords.x - 67],
                        y: [0, my - 55, city.coords.y - 55]
                      }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <circle
                        cx={67}
                        cy={55}
                        r="0.5"
                        fill="#fff"
                        style={{ filter: 'drop-shadow(0 0 2px var(--gold))' }}
                      />
                    </motion.g>
                  )}
                </g>
              );
            })}

            {/* Glowing spots */}
            {cities.map((city, idx) => {
              const isActive = activeCity.id === city.id;
              return (
                <g 
                  key={`spot-${city.id}`} 
                  onClick={() => handleCityClick(idx)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Large pulse circle */}
                  <motion.circle
                    cx={city.coords.x}
                    cy={city.coords.y}
                    r={isActive ? 3.8 : 2}
                    fill="none"
                    stroke="var(--gold)"
                    strokeWidth={isActive ? 0.6 : 0.3}
                    animate={isActive ? { scale: [1, 2.6, 1], opacity: [0.7, 0, 0.7] } : { scale: [1, 1.8, 1], opacity: [0.35, 0, 0.35] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.2 }}
                  />
                  {/* Core seed spot */}
                  <circle
                    cx={city.coords.x}
                    cy={city.coords.y}
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
        <div className="city-selector-scroll" style={{
          display: 'flex',
          gap: '8px',
          justifyContent: 'flex-start',
          overflowX: 'auto',
          paddingBottom: '8px',
          width: '100%',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
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
                borderRadius: '20px',
                padding: '10px 16px',
                fontSize: '11px',
                fontWeight: activeCity.id === city.id ? '600' : '500',
                cursor: 'pointer',
                transition: 'all 0.3s',
                minHeight: '44px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
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
