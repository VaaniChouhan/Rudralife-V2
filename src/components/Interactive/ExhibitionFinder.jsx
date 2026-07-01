import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const exhibitions = [
  {
    city: 'Mumbai',
    coords: { x: 38, y: 64 },
    venue: 'Nehru Centre Exhibition Hall, Worli',
    dates: 'October 12 - October 16',
    timing: '10:00 AM - 8:00 PM (Daily)',
    highlights: 'Exclusive display of extremely rare 1 to 21 Mukhi beads, original Nepal Siddha Malas, and complimentary scientific verification of your existing beads.'
  },
  {
    city: 'New Delhi',
    coords: { x: 44, y: 35 },
    venue: 'Constitution Club of India, Rafi Marg',
    dates: 'November 03 - November 07',
    timing: '10:00 AM - 8:00 PM (Daily)',
    highlights: 'Vedic planetary alignment consultations, custom-made protective combinations, and authentic energized malas direct from laboratory sources.'
  },
  {
    city: 'Bangalore',
    coords: { x: 46, y: 78 },
    venue: 'Taj West End, Race Course Road',
    dates: 'December 01 - December 05',
    timing: '10:00 AM - 8:00 PM (Daily)',
    highlights: 'One-on-one astrology consultation with senior panel advisers, personalized energized beads, and specialized thread/silver artisan alignments.'
  },
  {
    city: 'Chennai',
    coords: { x: 52, y: 82 },
    venue: 'Sringeri Pravachana Mandiram, T. Nagar',
    dates: 'January 15 - January 19',
    timing: '10:00 AM - 8:00 PM (Daily)',
    highlights: 'South Indian regional exhibition focusing on authentic collector grade Gauri Shankar and Ganesh beads, accompanied by Sanskrit mantra energization sessions.'
  },
  {
    city: 'Kolkata',
    coords: { x: 68, y: 52 },
    venue: 'Ice Skating Rink, Ballygunge',
    dates: 'February 08 - February 12',
    timing: '10:00 AM - 8:00 PM (Daily)',
    highlights: 'Complimentary testing & X-ray grading of your household family beads, and expert guidance on activating long-stored ancient planetary combinations.'
  }
];

export default function ExhibitionFinder() {
  const [activeCityIndex, setActiveCityIndex] = useState(0);
  const [isManual, setIsManual] = useState(false);

  useEffect(() => {
    if (isManual) return;

    // Automatic cycling between exhibition cities every 4.5s
    const timer = setInterval(() => {
      setActiveCityIndex((prev) => (prev + 1) % exhibitions.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isManual]);

  const activeExh = exhibitions[activeCityIndex];

  return (
    <div className="exhibition-finder-card" style={{
      background: 'linear-gradient(135deg, #1C1613 0%, #120D0B 100%)',
      border: '1px solid rgba(196, 154, 60, 0.22)',
      borderRadius: 'var(--r-lg)',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.45)'
    }}>
      {/* Decors */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(196, 154, 60, 0.25), transparent)'
      }} />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
        {/* Left Side: Animated Sourced Map representation (Cols 1-5) */}
        <div className="md:col-span-5 flex flex-col justify-between">
          <div>
            <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--gold)' }}>
              📍 Live Exhibition Tracker
            </span>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', fontWeight: '600', color: '#fff', margin: '4px 0 8px' }}>
              Interactive Exhibition Locator
            </h3>
            <p style={{ fontSize: '11.5px', color: 'rgba(255,253,248,0.7)', lineHeight: 1.4, margin: '0 0 16px' }}>
              Tap any glowing hub on our map layout to view certified schedules and venues. Meet our senior panel in person.
            </p>
          </div>

          {/* India Regional Map Outline Representation */}
          <div style={{
            height: '210px',
            background: 'rgba(0, 0, 0, 0.45)',
            border: '1px solid rgba(196,154,60,0.1)',
            borderRadius: 'var(--r-md)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            {/* Detailed India Grid and Route Infographic */}
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
              {/* Coordinate Grid Lines */}
              <g stroke="rgba(196, 154, 60, 0.05)" strokeWidth="0.5">
                <line x1="10" y1="0" x2="10" y2="100" />
                <line x1="30" y1="0" x2="30" y2="100" />
                <line x1="50" y1="0" x2="50" y2="100" />
                <line x1="70" y1="0" x2="70" y2="100" />
                <line x1="90" y1="0" x2="90" y2="100" />
                <line x1="0" y1="20" x2="100" y2="20" />
                <line x1="0" y1="40" x2="100" y2="40" />
                <line x1="0" y1="60" x2="100" y2="60" />
                <line x1="0" y1="80" x2="100" y2="80" />
              </g>

              {/* High-Fidelity India boundary path representation */}
              <path
                d="M48,12 L50,15 L52,14 L55,18 L53,23 L58,26 L60,30 L55,34 L54,39 L57,41 L59,45 L62,44 L66,46 L70,45 L74,47 L78,45 L82,48 L80,52 L76,51 L72,53 L69,50 L68,54 L65,56 L61,54 L59,57 L55,59 L52,63 L50,67 L48,72 L49,78 L52,82 L50,86 L47,89 L45,84 L42,80 L39,76 L38,71 L36,66 L34,62 L32,58 L30,55 L28,50 L25,48 L22,46 L20,42 L23,38 L27,36 L31,35 L33,31 L36,28 L35,23 L38,20 L42,18 Z"
                fill="none"
                stroke="rgba(196, 154, 60, 0.28)"
                strokeWidth="1.2"
                strokeDasharray="1,2"
              />

              {/* Major Rivers / Geological highlights (Subtle vector details) */}
              <path
                d="M33,35 Q40,38 48,39 T68,52"
                fill="none"
                stroke="rgba(196, 154, 60, 0.15)"
                strokeWidth="0.8"
              />
              <path
                d="M44,35 Q48,50 46,78"
                fill="none"
                stroke="rgba(196, 154, 60, 0.12)"
                strokeWidth="0.6"
                strokeDasharray="2,2"
              />

              {/* Pulsing tour connection lines between active city and other cities */}
              {exhibitions.map((exh, idx) => {
                if (idx === activeCityIndex) return null;
                const currentActive = exhibitions[activeCityIndex];
                // Robust safety check for undefined coordinates
                if (!currentActive || !currentActive.coords || !exh || !exh.coords) return null;
                const { x: x1, y: y1 } = currentActive.coords;
                const { x: x2, y: y2 } = exh.coords;
                if (typeof x1 !== 'number' || typeof y1 !== 'number' || typeof x2 !== 'number' || typeof y2 !== 'number') return null;
                return (
                  <motion.line
                    key={`line-${idx}`}
                    x1={`${x1}%`}
                    y1={`${y1}%`}
                    x2={`${x2}%`}
                    y2={`${y2}%`}
                    stroke="url(#goldGradient)"
                    strokeWidth="1"
                    initial={{ strokeDasharray: "4, 4", strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: -20 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    style={{ opacity: 0.4 }}
                  />
                );
              })}

              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(196,154,60,0.1)" />
                  <stop offset="50%" stopColor="rgba(196,154,60,0.8)" />
                  <stop offset="100%" stopColor="rgba(196,154,60,0.1)" />
                </linearGradient>
              </defs>
            </svg>

            {/* Glowing spot beacons for exhibitions */}
            {exhibitions.map((exh, idx) => {
              const isActive = activeCityIndex === idx;
              return (
                <div
                  key={exh.city}
                  onClick={() => { setActiveCityIndex(idx); setIsManual(true); }}
                  style={{
                    position: 'absolute',
                    left: `${exh.coords.x}%`,
                    top: `${exh.coords.y}%`,
                    cursor: 'pointer',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 2
                  }}
                >
                  {/* Outer pulsating ring */}
                  <motion.div
                    animate={isActive ? { scale: [1, 2.5, 1], opacity: [0.75, 0, 0.75] } : { scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      border: '1.2px solid var(--gold)',
                      position: 'absolute',
                      top: '-6px',
                      left: '-6px',
                      pointerEvents: 'none'
                    }}
                  />
                  {/* Central solid dot */}
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: isActive ? '#fff' : 'var(--gold)',
                    boxShadow: isActive ? '0 0 8px #fff, 0 0 14px var(--gold)' : 'none',
                    transition: 'all 0.4s ease'
                  }} />

                  {/* Tiny label on map (shown only for active) */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        position: 'absolute',
                        top: '10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(0,0,0,0.85)',
                        border: '1px solid var(--gold)',
                        padding: '2px 6px',
                        borderRadius: '3px',
                        fontSize: '8px',
                        color: 'var(--gold-lt)',
                        whiteSpace: 'nowrap',
                        fontWeight: 'bold'
                      }}
                    >
                      {exh.city} Live
                    </motion.div>
                  )}
                </div>
              );
            })}

            {/* Quick map helper legend */}
            <div style={{ position: 'absolute', bottom: '8px', right: '10px', fontSize: '8px', color: 'rgba(255,253,248,0.4)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              ✦ Interactive City Finder
            </div>
          </div>
        </div>

        {/* Right Side: Venue details & timings (Cols 6-12) */}
        <div className="md:col-span-7 flex flex-col justify-between" style={{ minHeight: '280px' }}>
          {/* Quick city navigation chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
            {exhibitions.map((exh, idx) => {
              const isActive = activeCityIndex === idx;
              return (
                <button
                  key={`btn-tab-${exh.city}`}
                  onClick={() => { setActiveCityIndex(idx); setIsManual(true); }}
                  style={{
                    background: isActive ? 'var(--gold)' : 'rgba(255,253,248,0.03)',
                    color: isActive ? 'var(--black)' : 'rgba(255,253,248,0.7)',
                    border: isActive ? '1px solid var(--gold)' : '1px solid rgba(196,154,60,0.18)',
                    borderRadius: '20px',
                    padding: '4px 12px',
                    fontSize: '10.5px',
                    fontWeight: isActive ? '600' : '400',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {exh.city}
                </button>
              );
            })}
          </div>

          {/* Exhibition Specific Card Info */}
          <div style={{
            background: 'rgba(0,0,0,0.3)',
            border: '1px solid rgba(196,154,60,0.14)',
            borderRadius: 'var(--r-md)',
            padding: '20px',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExh.city}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                    <span style={{
                      background: 'rgba(0, 226, 100, 0.1)',
                      border: '1px solid rgba(0, 226, 100, 0.3)',
                      color: '#00ff77',
                      fontSize: '8.5px',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      letterSpacing: '0.04em'
                    }}>
                      Free Entry &amp; Lab-Testing
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--gold)', fontWeight: 'bold' }}>
                      {activeExh.dates}
                    </span>
                  </div>

                  <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '17px', fontWeight: '600', color: '#fff', margin: '4px 0' }}>
                    🏢 {activeExh.venue}
                  </h4>
                  <p style={{ fontSize: '11px', color: 'rgba(255,253,248,0.5)', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Timings: {activeExh.timing}
                  </p>
                  
                  <p style={{ fontSize: '12px', color: 'rgba(255,253,248,0.75)', lineHeight: 1.5, margin: 0 }}>
                    {activeExh.highlights}
                  </p>
                </div>

                {/* Real interactive amenities badges */}
                <div style={{
                  marginTop: '16px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px'
                }}>
                  <span style={{ fontSize: '9.5px', background: 'rgba(196,154,60,0.06)', border: '1px solid rgba(196,154,60,0.15)', color: 'var(--gold-lt)', padding: '2px 8px', borderRadius: '4px' }}>
                    ✓ complimentary bead evaluation
                  </span>
                  <span style={{ fontSize: '9.5px', background: 'rgba(196,154,60,0.06)', border: '1px solid rgba(196,154,60,0.15)', color: 'var(--gold-lt)', padding: '2px 8px', borderRadius: '4px' }}>
                    ✓ 1-on-1 expert advisory
                  </span>
                  <span style={{ fontSize: '9.5px', background: 'rgba(196,154,60,0.06)', border: '1px solid rgba(196,154,60,0.15)', color: 'var(--gold-lt)', padding: '2px 8px', borderRadius: '4px' }}>
                    ✓ on-spot silver wire crafting
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
