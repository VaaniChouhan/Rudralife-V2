import React from 'react';
import { motion } from 'framer-motion';

// 1. Lab Scientists: Microscope/Scanner with Pulsing Nodes and Laser Scanning Grid
export const ScientistIcon = () => (
  <svg viewBox="0 0 64 64" width="44" height="44" fill="none" stroke="var(--gold)" strokeWidth="1.5" style={{ margin: '0 auto 12px' }}>
    {/* Concentric Measurement Grid */}
    <circle cx="32" cy="32" r="28" stroke="rgba(196,154,60,0.1)" strokeWidth="1" strokeDasharray="2 2" />
    <circle cx="32" cy="32" r="20" stroke="rgba(196,154,60,0.15)" strokeWidth="1" strokeDasharray="4 4" />
    
    {/* Base structure of spectrometer */}
    <path d="M14 52 H50 M20 52 V44 C20 40, 26 36, 30 36 H34 C38 36, 44 40, 44 44 V52" stroke="rgba(196,154,60,0.4)" strokeWidth="1" />
    
    {/* Microscope Lens System */}
    <path d="M32 10 V26 M24 16 H40 M28 26 H36" strokeWidth="2" strokeLinecap="round" />
    
    {/* Specimen dish & X-Ray Compartment */}
    <ellipse cx="32" cy="34" rx="10" ry="3" fill="rgba(196,154,60,0.15)" stroke="var(--gold)" strokeWidth="1" />
    
    {/* Animated Laser Scan line */}
    <motion.line 
      x1="20" y1="34" x2="44" y2="34" 
      stroke="#FF3B30" 
      strokeWidth="1.5"
      animate={{ 
        y: [31, 37, 31],
        opacity: [0.4, 1, 0.4]
      }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* Digital coordinate crosshairs */}
    <line x1="32" y1="4" x2="32" y2="60" stroke="rgba(196,154,60,0.08)" strokeWidth="0.5" />
    <line x1="4" y1="32" x2="60" y2="32" stroke="rgba(196,154,60,0.08)" strokeWidth="0.5" />
    
    {/* Pulse node */}
    <motion.circle 
      cx="32" cy="34" r="2" 
      fill="var(--gold-lt)" 
      animate={{ scale: [1, 1.8, 1] }} 
      transition={{ duration: 1.2, repeat: Infinity }} 
    />
  </svg>
);

// 2. Vedic Brahmins: Sacred Fire Altar (Yajna) with Rising Prana sparks & Ohm Aura
export const BrahminIcon = () => (
  <svg viewBox="0 0 64 64" width="44" height="44" fill="none" stroke="var(--gold)" strokeWidth="1.5" style={{ margin: '0 auto 12px' }}>
    {/* Sacred Mandala Halo */}
    <motion.circle 
      cx="32" 
      cy="32" 
      r="28" 
      stroke="rgba(196,154,60,0.2)" 
      strokeDasharray="4 6" 
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
    />
    <circle cx="32" cy="32" r="24" stroke="rgba(196,154,60,0.08)" strokeWidth="1" />

    {/* Three-Tiered Fire Altar / Havan Kund */}
    <polygon points="32,20 54,46 10,46" fill="rgba(196,154,60,0.08)" stroke="var(--gold)" strokeWidth="1.5" />
    <polygon points="32,24 48,43 16,43" fill="rgba(196,154,60,0.12)" stroke="var(--gold)" strokeWidth="1" />
    <line x1="8" y1="46" x2="56" y2="46" stroke="var(--gold-dim)" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="14" y1="50" x2="50" y2="50" stroke="var(--gold-dim)" strokeWidth="1.5" strokeLinecap="round" />

    {/* Rising Holy Prana Flame */}
    <motion.path 
      d="M32 26 Q24 12, 32 4 Q40 12, 32 26" 
      fill="linear-gradient(0deg, var(--gold) 0%, #FF9500 100%)" 
      stroke="none"
      animate={{ 
        scaleY: [1, 1.15, 0.95, 1.08, 1],
        scaleX: [1, 0.9, 1.1, 0.95, 1],
        y: [0, -2, 1, -1, 0]
      }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      style={{ transformOrigin: "32px 26px" }}
    />

    {/* Sacred Ohm Symbol (ॐ) overlay */}
    <text x="32" y="38" textAnchor="middle" fontSize="11" fontFamily="serif" fill="var(--gold-lt)" fontWeight="bold" stroke="none">ॐ</text>

    {/* Rising Sparks */}
    <motion.circle cx="28" cy="22" r="1" fill="#FFCC00" stroke="none" animate={{ y: [10, -5], opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} />
    <motion.circle cx="36" cy="18" r="1" fill="#FFCC00" stroke="none" animate={{ y: [8, -7], opacity: [0, 1, 0] }} transition={{ duration: 1.8, repeat: Infinity, delay: 0.5 }} />
    <motion.circle cx="32" cy="14" r="0.8" fill="#FFF" stroke="none" animate={{ y: [6, -10], opacity: [0, 1, 0] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.9 }} />
  </svg>
);

// 3. Spiritual Advisors: Radiating Jyotish Astro-Alignment Coordinate Compass
export const AdvisorIcon = () => (
  <svg viewBox="0 0 64 64" width="44" height="44" fill="none" stroke="var(--gold)" strokeWidth="1.5" style={{ margin: '0 auto 12px' }}>
    {/* Birth Chart Astrological Divisions */}
    <circle cx="32" cy="32" r="28" stroke="rgba(196,154,60,0.12)" strokeWidth="1" />
    <circle cx="32" cy="32" r="22" stroke="rgba(196,154,60,0.2)" strokeWidth="1" strokeDasharray="3 3" />
    
    {/* Chart axes (12 Bhavas division lines) */}
    <line x1="32" y1="4" x2="32" y2="60" stroke="rgba(196,154,60,0.12)" strokeWidth="0.8" />
    <line x1="4" y1="32" x2="60" y2="32" stroke="rgba(196,154,60,0.12)" strokeWidth="0.8" />
    <line x1="12" y1="12" x2="52" y2="52" stroke="rgba(196,154,60,0.08)" strokeWidth="0.5" />
    <line x1="12" y1="52" x2="52" y2="12" stroke="rgba(196,154,60,0.08)" strokeWidth="0.5" />

    {/* Moving Nakshatra star ring */}
    <motion.g
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      style={{ transformOrigin: '32px 32px' }}
    >
      {/* Astrological pointer arrow */}
      <polygon points="32,6 36,18 28,18" fill="var(--gold-lt)" stroke="none" />
      {/* Tiny stars representing planetary nodes */}
      <circle cx="16" cy="16" r="1.5" fill="var(--gold-lt)" stroke="none" />
      <circle cx="48" cy="16" r="1" fill="#FFF" stroke="none" />
      <circle cx="48" cy="48" r="2" fill="var(--gold)" stroke="none" />
      <circle cx="16" cy="48" r="1.2" fill="var(--gold-lt)" stroke="none" />
    </motion.g>

    {/* Advisor head outline reflecting clarity */}
    <circle cx="32" cy="32" r="6" fill="rgba(196,154,60,0.15)" stroke="var(--gold)" strokeWidth="1" />
    <path d="M20 50 C20 42, 25 40, 32 40 C39 40, 44 42, 44 50" fill="rgba(196,154,60,0.1)" stroke="var(--gold)" strokeWidth="1" />
  </svg>
);

// 4. Mala Artisans: Sacred Geometry Threading Loop & Faceted Mala Knotting
export const ArtisanIcon = () => (
  <svg viewBox="0 0 64 64" width="44" height="44" fill="none" stroke="var(--gold)" strokeWidth="1.5" style={{ margin: '0 auto 12px' }}>
    {/* Infinite loop background - sacred string path */}
    <motion.path 
      d="M12 32 C12 16, 52 16, 52 32 C52 48, 12 48, 12 32" 
      stroke="rgba(196,154,60,0.22)" 
      strokeWidth="1.5" 
      strokeDasharray="4 2"
      animate={{ strokeDashOffset: [0, -12] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />
    
    {/* Concentric alignment rings */}
    <circle cx="32" cy="32" r="26" stroke="rgba(196,154,60,0.06)" strokeWidth="1" />
    
    {/* Hand needle weaving thread */}
    <motion.g
      animate={{ 
        x: [-2, 3, -2],
        y: [-1, 2, -1]
      }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M38 10 L48 20 M44 14 L38 10" stroke="var(--gold-lt)" strokeWidth="2" strokeLinecap="round" />
      <path d="M38 10 C30 18, 28 20, 24 24" stroke="rgba(196,154,60,0.4)" strokeWidth="0.8" />
    </motion.g>
    
    {/* Faceted Rudraksha Beads with inner seed channels */}
    <g>
      {/* Bead 1 */}
      <g transform="translate(18, 32)">
        <circle cx="0" cy="0" r="6" fill="#1C1613" stroke="var(--gold)" strokeWidth="1.2" />
        <line x1="0" y1="-6" x2="0" y2="6" stroke="rgba(196,154,60,0.5)" strokeWidth="1" />
        {/* Facet lines (Mukhi lines) */}
        <path d="M-4 -4 Q0 0 -4 4" stroke="rgba(196,154,60,0.4)" strokeWidth="0.8" />
        <path d="M4 -4 Q0 0 4 4" stroke="rgba(196,154,60,0.4)" strokeWidth="0.8" />
      </g>
      
      {/* Bead 2 (Centerpiece Bead with tassel) */}
      <g transform="translate(32, 32)">
        <circle cx="0" cy="0" r="7.5" fill="#140E08" stroke="var(--gold-lt)" strokeWidth="1.5" />
        <line x1="0" y1="-8" x2="0" y2="8" stroke="var(--gold)" strokeWidth="1.2" />
        {/* Facet lines */}
        <path d="M-5 -5 Q0 0 -5 5" stroke="rgba(196,154,60,0.5)" strokeWidth="0.8" />
        <path d="M5 -5 Q0 0 5 5" stroke="rgba(196,154,60,0.5)" strokeWidth="0.8" />
        {/* Sacred tassel (guru bead) */}
        <path d="M0 8 L-3 18 H3 Z" fill="rgba(196,154,60,0.25)" stroke="var(--gold)" strokeWidth="0.8" />
      </g>

      {/* Bead 3 */}
      <g transform="translate(46, 32)">
        <circle cx="0" cy="0" r="6" fill="#1C1613" stroke="var(--gold)" strokeWidth="1.2" />
        <line x1="0" y1="-6" x2="0" y2="6" stroke="rgba(196,154,60,0.5)" strokeWidth="1" />
        <path d="M-4 -4 Q0 0 -4 4" stroke="rgba(196,154,60,0.4)" strokeWidth="0.8" />
        <path d="M4 -4 Q0 0 4 4" stroke="rgba(196,154,60,0.4)" strokeWidth="0.8" />
      </g>
    </g>
    
    {/* Sacred Knot tie points */}
    <circle cx="25" cy="32" r="1.5" fill="var(--gold)" stroke="none" />
    <circle cx="39" cy="32" r="1.5" fill="var(--gold)" stroke="none" />
  </svg>
);

// 5. Support Team: Secure Shield with Dynamic Protection Waves & Secure Vault rings
export const SupportIcon = () => (
  <svg viewBox="0 0 64 64" width="44" height="44" fill="none" stroke="var(--gold)" strokeWidth="1.5" style={{ margin: '0 auto 12px' }}>
    {/* Global Protection Rings */}
    <circle cx="32" cy="32" r="28" stroke="rgba(196,154,60,0.08)" strokeWidth="1" />
    <circle cx="32" cy="32" r="24" stroke="rgba(196,154,60,0.12)" strokeWidth="1" strokeDasharray="5 3" />
    
    {/* Strong Protective Shield of Sourcing Integrity */}
    <path d="M32 48 C43 42, 45 32, 45 22 L32 15 L19 22 C19 32, 21 42, 32 48 Z" fill="rgba(196,154,60,0.08)" stroke="var(--gold)" strokeWidth="1.8" />
    
    {/* Inner locks representing insurance / security */}
    <path d="M28 26 H36 V34 H28 Z" stroke="rgba(196,154,60,0.5)" strokeWidth="1" />
    <path d="M30 26 V23 A2 2 0 0 1 34 23 V26" stroke="rgba(196,154,60,0.5)" strokeWidth="1" />

    {/* Pulsing Care waves */}
    <motion.path 
      d="M38 24 A 8 8 0 0 1 38 34" 
      stroke="var(--gold-lt)"
      strokeWidth="1.5"
      strokeLinecap="round"
      animate={{ opacity: [0.2, 1, 0.2] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    <motion.path 
      d="M41 21 A 12 12 0 0 1 41 37" 
      stroke="var(--gold-dim)"
      strokeWidth="1"
      strokeLinecap="round"
      animate={{ opacity: [0.1, 0.8, 0.1] }}
      transition={{ duration: 1.5, delay: 0.3, repeat: Infinity }}
    />

    {/* Operations flow ticks */}
    <circle cx="32" cy="42" r="1.2" fill="var(--gold)" stroke="none" />
  </svg>
);
