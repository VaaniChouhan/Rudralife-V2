import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const stepData = [
  {
    level: 1,
    title: "Level 1: Beginner Alignment",
    tagline: "Purification & Daily Stability",
    desc: "Build your foundation. Connect with grounding energies to release stress, establish physical stability, and purify your energetic field. Perfect for daily wear.",
    beads: ["5 Mukhi (Kalagni Rudra)", "6 Mukhi (Kartikeya)", "5 Mukhi Bracelet"],
    chakra: "Muladhara (Root) & Swadhisthana (Sacral)",
    color: "rgba(196, 154, 60, 0.2)",
    svg: (
      <svg viewBox="0 0 120 120" className="stepper-svg" xmlns="http://www.w3.org/2000/svg" referrerPolicy="no-referrer">
        <defs>
          <linearGradient id="goldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C49A3C" />
            <stop offset="50%" stopColor="#EED58C" />
            <stop offset="100%" stopColor="#8A6721" />
          </linearGradient>
          <radialGradient id="beadGrad1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#B3784A" />
            <stop offset="65%" stopColor="#7E4E29" />
            <stop offset="100%" stopColor="#43240F" />
          </radialGradient>
          <filter id="glow1" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Base Mandala / Lotus Foundation */}
        <g opacity="0.45">
          <circle cx="60" cy="60" r="48" fill="none" stroke="url(#goldGrad1)" strokeWidth="0.5" strokeDasharray="3 3" />
          {/* Lotus Petals */}
          <path d="M60 12 C64 25, 56 25, 60 12 Z M60 108 C64 95, 56 95, 60 108 Z" fill="none" stroke="url(#goldGrad1)" strokeWidth="0.8" />
          <path d="M12 60 C25 64, 25 56, 12 60 Z M108 60 C95 64, 95 56, 108 60 Z" fill="none" stroke="url(#goldGrad1)" strokeWidth="0.8" />
          <path d="M26 26 C36 34, 32 38, 26 26 Z M94 94 C84 86, 88 82, 94 94 Z" fill="none" stroke="url(#goldGrad1)" strokeWidth="0.8" />
          <path d="M26 94 C36 86, 32 82, 26 94 Z M94 26 C84 34, 88 38, 94 26 Z" fill="none" stroke="url(#goldGrad1)" strokeWidth="0.8" />
        </g>

        {/* Active grounding waves radiating */}
        <motion.circle 
          cx="60" cy="60" r="24" 
          fill="none" 
          stroke="url(#goldGrad1)" 
          strokeWidth="0.8" 
          opacity="0.5"
          animate={{ scale: [0.8, 1.8], opacity: [0.8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.circle 
          cx="60" cy="60" r="24" 
          fill="none" 
          stroke="#EED58C" 
          strokeWidth="0.5" 
          opacity="0.3"
          animate={{ scale: [0.5, 1.4], opacity: [0.6, 0] }}
          transition={{ duration: 4, delay: 2, repeat: Infinity, ease: "easeOut" }}
        />

        {/* 5 Mukhi Central Rudraksha Bead */}
        <g transform="translate(60, 60)">
          {/* Soft aura */}
          <circle cx="0" cy="0" r="18" fill="url(#goldGrad1)" opacity="0.15" filter="url(#glow1)" />
          
          {/* Wooden bead body */}
          <circle cx="0" cy="0" r="14" fill="url(#beadGrad1)" stroke="#2C1608" strokeWidth="0.8" />
          
          {/* Bead Caps */}
          <path d="M -5 -13 C -5 -11, 5 -11, 5 -13 Z" fill="url(#goldGrad1)" />
          <path d="M -5 13 C -5 11, 5 11, 5 13 Z" fill="url(#goldGrad1)" />

          {/* 5 Mukhi Facet Ridges */}
          <path d="M 0 -13 V 13" stroke="#261005" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M -4 -12 C -2 -4, -2 4, -4 12" stroke="#1D0A02" strokeWidth="1" strokeLinecap="round" />
          <path d="M 4 -12 C 2 -4, 2 4, 4 12" stroke="#1D0A02" strokeWidth="1" strokeLinecap="round" />
          <path d="M -8 -10 C -5 -3, -5 3, -8 10" stroke="#140601" strokeWidth="0.8" opacity="0.8" />
          <path d="M 8 -10 C 5 -3, 5 3, 8 10" stroke="#140601" strokeWidth="0.8" opacity="0.8" />

          {/* Small natural surface micro-textures */}
          <circle cx="-3" cy="-4" r="0.6" fill="#D28C4F" opacity="0.5" />
          <circle cx="3" cy="4" r="0.8" fill="#5A2E12" />
          <circle cx="2" cy="-5" r="0.5" fill="#D28C4F" opacity="0.4" />
        </g>
      </svg>
    )
  },
  {
    level: 2,
    title: "Level 2: Active Vitality",
    tagline: "Concentration, Wealth & Aura Balance",
    desc: "Amplify personal power, remove obstacles, and manifest prosperity. Develop greater concentration and emotional resilience to meet professional goals.",
    beads: ["7 Mukhi (Mahalaxmi)", "8 Mukhi (Ganesha)", "Power Combination (5-6-7-8)"],
    chakra: "Manipura (Solar Plexus) & Ajna (Third Eye)",
    color: "rgba(196, 154, 60, 0.35)",
    svg: (
      <svg viewBox="0 0 120 120" className="stepper-svg" xmlns="http://www.w3.org/2000/svg" referrerPolicy="no-referrer">
        <defs>
          <linearGradient id="goldGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C49A3C" />
            <stop offset="50%" stopColor="#EED58C" />
            <stop offset="100%" stopColor="#8A6721" />
          </linearGradient>
          <radialGradient id="beadGrad2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A66E3C" />
            <stop offset="70%" stopColor="#6C3E1B" />
            <stop offset="100%" stopColor="#3C1E0A" />
          </radialGradient>
        </defs>

        {/* Manifestation Triangle Backdrop */}
        <polygon points="60,20 95,85 25,85" fill="none" stroke="url(#goldGrad2)" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.3" />

        {/* Active orbiting rings */}
        <motion.ellipse 
          cx="60" cy="55" rx="46" ry="18" 
          fill="none" stroke="url(#goldGrad2)" strokeWidth="0.8" opacity="0.4"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "60px 55px" }}
        />
        <motion.ellipse 
          cx="60" cy="55" rx="46" ry="18" 
          fill="none" stroke="#FFA726" strokeWidth="0.5" opacity="0.2"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "60px 55px" }}
        />

        {/* Glowing Energy streams between beads */}
        <line x1="60" y1="28" x2="35" y2="78" stroke="url(#goldGrad2)" strokeWidth="1.2" opacity="0.6" />
        <line x1="60" y1="28" x2="85" y2="78" stroke="url(#goldGrad2)" strokeWidth="1.2" opacity="0.6" />
        <line x1="35" y1="78" x2="85" y2="78" stroke="url(#goldGrad2)" strokeWidth="1.2" opacity="0.6" />

        {/* Beads Group with floating animation */}
        <motion.g animate={{ y: [0, -3, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
          {/* Top Bead (8 Mukhi Ganesha Bead) */}
          <g transform="translate(60, 28)">
            <circle cx="0" cy="0" r="10" fill="url(#beadGrad2)" stroke="#221105" strokeWidth="0.6" />
            {/* Caps */}
            <path d="M -3.5 -9 C -3.5 -8, 3.5 -8, 3.5 -9 Z" fill="url(#goldGrad2)" />
            <path d="M -3.5 9 C -3.5 8, 3.5 8, 3.5 9 Z" fill="url(#goldGrad2)" />
            {/* Ridges */}
            <line x1="0" y1="-9" x2="0" y2="9" stroke="#1C0D03" strokeWidth="0.8" />
            <path d="M -3 -8 C -1.5 -3, -1.5 3, -3 8" stroke="#1C0D03" strokeWidth="0.6" />
            <path d="M 3 -8 C 1.5 -3, 1.5 3, 3 8" stroke="#1C0D03" strokeWidth="0.6" />
          </g>

          {/* Bottom Left Bead (7 Mukhi Mahalaxmi Bead) */}
          <g transform="translate(35, 78)">
            <circle cx="0" cy="0" r="10" fill="url(#beadGrad2)" stroke="#221105" strokeWidth="0.6" />
            <path d="M -3.5 -9 C -3.5 -8, 3.5 -8, 3.5 -9 Z" fill="url(#goldGrad2)" />
            <path d="M -3.5 9 C -3.5 8, 3.5 8, 3.5 9 Z" fill="url(#goldGrad2)" />
            <line x1="0" y1="-9" x2="0" y2="9" stroke="#1C0D03" strokeWidth="0.8" />
            <path d="M -3 -8 C -1.5 -3, -1.5 3, -3 8" stroke="#1C0D03" strokeWidth="0.6" />
            <path d="M 3 -8 C 1.5 -3, 1.5 3, 3 8" stroke="#1C0D03" strokeWidth="0.6" />
          </g>

          {/* Bottom Right Bead (Power combination bead) */}
          <g transform="translate(85, 78)">
            <circle cx="0" cy="0" r="10" fill="url(#beadGrad2)" stroke="#221105" strokeWidth="0.6" />
            <path d="M -3.5 -9 C -3.5 -8, 3.5 -8, 3.5 -9 Z" fill="url(#goldGrad2)" />
            <path d="M -3.5 9 C -3.5 8, 3.5 8, 3.5 9 Z" fill="url(#goldGrad2)" />
            <line x1="0" y1="-9" x2="0" y2="9" stroke="#1C0D03" strokeWidth="0.8" />
            <path d="M -3 -8 C -1.5 -3, -1.5 3, -3 8" stroke="#1C0D03" strokeWidth="0.6" />
            <path d="M 3 -8 C 1.5 -3, 1.5 3, 3 8" stroke="#1C0D03" strokeWidth="0.6" />
          </g>
        </motion.g>

        {/* Sparkles */}
        <circle cx="15" cy="40" r="1" fill="#FFFDF8" opacity="0.8" />
        <circle cx="105" cy="40" r="1" fill="#FFFDF8" opacity="0.8" />
        <circle cx="60" cy="110" r="1.5" fill="#EED58C" />
      </svg>
    )
  },
  {
    level: 3,
    title: "Level 3: Advanced Ascension",
    tagline: "Chakra Awakening & Planetary Shield",
    desc: "Mitigate severe malefic planetary influences, align all major chakras, and transition from material focus to deep spiritual awareness. Ideal for meditators.",
    beads: ["9 Mukhi (Durga)", "10 Mukhi (Vishnu)", "11-14 Mukhi Kantha Malas"],
    chakra: "Anahata (Heart), Vishuddha (Throat), Ajna",
    color: "rgba(196, 154, 60, 0.5)",
    svg: (
      <svg viewBox="0 0 120 120" className="stepper-svg" xmlns="http://www.w3.org/2000/svg" referrerPolicy="no-referrer">
        <defs>
          <linearGradient id="goldGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C49A3C" />
            <stop offset="50%" stopColor="#EED58C" />
            <stop offset="100%" stopColor="#8A6721" />
          </linearGradient>
          <radialGradient id="beadGrad3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#9C6236" />
            <stop offset="70%" stopColor="#5E3314" />
            <stop offset="100%" stopColor="#301605" />
          </radialGradient>
        </defs>

        {/* Spine / Sushumna Nadi Line */}
        <line x1="60" y1="10" x2="60" y2="110" stroke="url(#goldGrad3)" strokeWidth="0.8" opacity="0.25" />
        <line x1="60" y1="10" x2="60" y2="110" stroke="#FFF" strokeWidth="0.3" strokeDasharray="2 3" opacity="0.4" />

        {/* Outer protective shield orb */}
        <circle cx="60" cy="60" r="46" fill="none" stroke="url(#goldGrad3)" strokeWidth="0.5" strokeDasharray="3 4" opacity="0.25" />
        <motion.circle 
          cx="60" cy="60" r="42" 
          fill="none" stroke="#2D9CDB" strokeWidth="0.8" opacity="0.3"
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "60px 60px" }}
        />

        {/* Chakra nodes glowing (top to bottom) */}
        {/* Crown */}
        <circle cx="60" cy="18" r="3" fill="#9B51E0" opacity="0.8" />
        <circle cx="60" cy="18" r="6" fill="none" stroke="#9B51E0" strokeWidth="0.5" opacity="0.4" />
        
        {/* Third Eye */}
        <circle cx="60" cy="36" r="3" fill="#2D9CDB" opacity="0.8" />
        <circle cx="60" cy="36" r="6" fill="none" stroke="#2D9CDB" strokeWidth="0.5" opacity="0.4" />

        {/* Throat */}
        <circle cx="60" cy="54" r="2.5" fill="#56CCF2" opacity="0.8" />

        {/* Heart */}
        <circle cx="60" cy="72" r="3" fill="#27AE60" opacity="0.8" />
        <circle cx="60" cy="72" r="7" fill="none" stroke="#27AE60" strokeWidth="0.5" opacity="0.4" />

        {/* Solar Plexus */}
        <circle cx="60" cy="90" r="3" fill="#F2C94C" opacity="0.8" />

        {/* Sacral */}
        <circle cx="60" cy="102" r="2.5" fill="#F2994A" opacity="0.8" />

        {/* Central Advanced Ascension Bead (9 Mukhi Durga Bead) */}
        <g transform="translate(60, 54)">
          {/* Energy halo */}
          <motion.circle 
            cx="0" cy="0" r="16" 
            fill="none" stroke="url(#goldGrad3)" strokeWidth="0.8"
            animate={{ scale: [0.9, 1.2, 0.9], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          <circle cx="0" cy="0" r="11" fill="url(#beadGrad3)" stroke="#1F0E03" strokeWidth="0.8" />
          <path d="M -4 -10 C -4 -8, 4 -8, 4 -10 Z" fill="url(#goldGrad3)" />
          <path d="M -4 10 C -4 8, 4 8, 4 10 Z" fill="url(#goldGrad3)" />
          
          {/* 9 Mukhi facets (densely spaced) */}
          <line x1="0" y1="-10" x2="0" y2="10" stroke="#140601" strokeWidth="1" />
          <path d="M -2 -10 C -1 -4, -1 4, -2 10" stroke="#140601" strokeWidth="0.8" />
          <path d="M 2 -10 C 1 -4, 1 4, 2 10" stroke="#140601" strokeWidth="0.8" />
          <path d="M -5 -9 C -3 -3, -3 3, -5 9" stroke="#140601" strokeWidth="0.7" />
          <path d="M 5 -9 C 3 -3, 3 3, 5 9" stroke="#140601" strokeWidth="0.7" />
          <path d="M -8 -7 C -5 -3, -5 3, -8 7" stroke="#140601" strokeWidth="0.6" opacity="0.8" />
          <path d="M 8 -7 C 5 -3, 5 3, 8 7" stroke="#140601" strokeWidth="0.6" opacity="0.8" />
        </g>
      </svg>
    )
  },
  {
    level: 4,
    title: "Level 4: Master Integration",
    tagline: "Leadership, Cosmic Protection & Custom Malas",
    desc: "For leaders, healers, and visionaries. Attain ultimate mental strength, remove professional limitations, and envelope yourself in an impenetrable protective field.",
    beads: ["Custom Personal Mala", "14 Mukhi (Dev Mani)", "Rare Nepal Collector Beads"],
    chakra: "Ajna (Third Eye) & Sahasrara (Crown)",
    color: "rgba(196, 154, 60, 0.7)",
    svg: (
      <svg viewBox="0 0 120 120" className="stepper-svg" xmlns="http://www.w3.org/2000/svg" referrerPolicy="no-referrer">
        <defs>
          <linearGradient id="goldGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C49A3C" />
            <stop offset="50%" stopColor="#EED58C" />
            <stop offset="100%" stopColor="#8A6721" />
          </linearGradient>
          <radialGradient id="beadGrad4" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8E5328" />
            <stop offset="70%" stopColor="#512A0E" />
            <stop offset="100%" stopColor="#2D1302" />
          </radialGradient>
        </defs>

        {/* Shatkona / Interlocking Sacred Star */}
        <g opacity="0.35">
          <polygon points="60,15 100,85 20,85" fill="none" stroke="url(#goldGrad4)" strokeWidth="0.8" />
          <polygon points="60,95 100,25 20,25" fill="none" stroke="url(#goldGrad4)" strokeWidth="0.8" />
          <circle cx="60" cy="55" r="40" fill="none" stroke="url(#goldGrad4)" strokeWidth="0.5" strokeDasharray="1 3" />
        </g>

        {/* Orbiting necklace / mala loops */}
        <g opacity="0.8">
          {[...Array(8)].map((_, i) => {
            const angle = (i * Math.PI) / 4;
            const cx = 60 + 32 * Math.cos(angle);
            const cy = 55 + 32 * Math.sin(angle);
            return (
              <circle key={i} cx={cx} cy={cy} r="3" fill="url(#beadGrad4)" stroke="#1F0E03" strokeWidth="0.4" />
            );
          })}
          <path d="M 28 55 A 32 32 0 1 1 92 55" fill="none" stroke="url(#goldGrad4)" strokeWidth="0.5" opacity="0.6" />
        </g>

        {/* Central Master Bead (14 Mukhi Dev Mani Bead) */}
        <g transform="translate(60, 55)">
          {/* Power vibration aura */}
          <motion.circle 
            cx="0" cy="0" r="18" 
            fill="none" stroke="#EED58C" strokeWidth="0.6" strokeDasharray="3 2"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <circle cx="0" cy="0" r="13" fill="url(#beadGrad4)" stroke="#220F03" strokeWidth="1" />
          
          {/* Premium Gold Caps */}
          <path d="M -5 -12.5 C -5 -10, 5 -10, 5 -12.5 Z" fill="url(#goldGrad4)" stroke="#8A6721" strokeWidth="0.5" />
          <path d="M -5 12.5 C -5 10, 5 10, 5 12.5 Z" fill="url(#goldGrad4)" stroke="#8A6721" strokeWidth="0.5" />

          {/* Facets - Highly dense representation of 14 Mukhi */}
          <line x1="0" y1="-12" x2="0" y2="12" stroke="#110500" strokeWidth="1" />
          <path d="M -2 -12 Q -1 0, -2 12" stroke="#110500" strokeWidth="0.8" />
          <path d="M 2 -12 Q 1 0, 2 12" stroke="#110500" strokeWidth="0.8" />
          <path d="M -4 -11.5 Q -2 0, -4 11.5" stroke="#110500" strokeWidth="0.7" />
          <path d="M 4 -11.5 Q 2 0, 4 11.5" stroke="#110500" strokeWidth="0.7" />
          <path d="M -6 -10.5 Q -3 0, -6 10.5" stroke="#110500" strokeWidth="0.6" />
          <path d="M 6 -10.5 Q 3 0, 6 10.5" stroke="#110500" strokeWidth="0.6" />
          <path d="M -8 -9.5 Q -4 0, -8 9.5" stroke="#110500" strokeWidth="0.5" opacity="0.8" />
          <path d="M 8 -9.5 Q 4 0, 8 9.5" stroke="#110500" strokeWidth="0.5" opacity="0.8" />
        </g>
      </svg>
    )
  },
  {
    level: 5,
    title: "Level 5: Siddha / Indra Mala",
    tagline: "Cosmic Union & Absolute Abundance",
    desc: "The absolute pinnacle of spiritual and material protection. Contains all Mukhis from 1 to 14, Gauri Shankar, and Ganesh beads, aligning you with the full cosmic order.",
    beads: ["Siddha Mala (1-14 Mukhi + GS + G)", "Indra Mala (Rarest 1-21 Mukhi)"],
    chakra: "All 7 Chakras Harmonized & Sahasrara (Crown)",
    color: "rgba(196, 154, 60, 0.9)",
    svg: (
      <svg viewBox="0 0 120 120" className="stepper-svg" xmlns="http://www.w3.org/2000/svg" referrerPolicy="no-referrer">
        <defs>
          <linearGradient id="goldGrad5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C49A3C" />
            <stop offset="50%" stopColor="#EED58C" />
            <stop offset="100%" stopColor="#8A6721" />
          </linearGradient>
          <radialGradient id="beadGrad5" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8A4A1C" />
            <stop offset="65%" stopColor="#4E260A" />
            <stop offset="100%" stopColor="#250F02" />
          </radialGradient>
          <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFE082" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#C49A3C" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer cosmic rotating ring with script markers */}
        <circle cx="60" cy="60" r="50" fill="none" stroke="url(#goldGrad5)" strokeWidth="0.5" strokeDasharray="3 5" opacity="0.4" />
        <circle cx="60" cy="60" r="42" fill="none" stroke="url(#goldGrad5)" strokeWidth="0.3" opacity="0.2" />

        {/* Central Golden Sun Glow */}
        <circle cx="60" cy="60" r="28" fill="url(#sunGlow)" />

        {/* Double Intersecting Yantras rotating in background */}
        <motion.path 
          d="M 60 16 L 98 82 L 22 82 Z M 60 104 L 98 38 L 22 38 Z" 
          fill="none" 
          stroke="url(#goldGrad5)" 
          strokeWidth="0.6" 
          opacity="0.3"
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "60px 60px" }}
        />
        <motion.path 
          d="M 60 22 L 93 78 L 27 78 Z M 60 98 L 93 42 L 27 42 Z" 
          fill="none" 
          stroke="#EED58C" 
          strokeWidth="0.4" 
          opacity="0.2"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "60px 60px" }}
        />

        {/* Orbiting Siddha Mala Beads (14 small beads in a perfect circle representing the 1-14 Mukhis) */}
        <g>
          {[...Array(14)].map((_, i) => {
            const angle = (i * 2 * Math.PI) / 14;
            const cx = 60 + 38 * Math.cos(angle);
            const cy = 60 + 38 * Math.sin(angle);
            return (
              <circle 
                key={i} 
                cx={cx} 
                cy={cy} 
                r="2.5" 
                fill="url(#beadGrad5)" 
                stroke="url(#goldGrad5)" 
                strokeWidth="0.3" 
              />
            );
          })}
        </g>

        {/* Central Supreme Deity / Gauri Shankar Bead (Dual naturally joined bead representing Union of Shiva & Parvati) */}
        <g transform="translate(60, 60)">
          {/* Outer radiating divine sparks */}
          <circle cx="0" cy="0" r="16" fill="none" stroke="url(#goldGrad5)" strokeWidth="0.8" strokeDasharray="1 4" />
          
          {/* Left Lobed Bead */}
          <circle cx="-3.5" cy="0" r="7.5" fill="url(#beadGrad5)" stroke="#1C0A02" strokeWidth="0.6" />
          {/* Right Lobed Bead */}
          <circle cx="3.5" cy="0" r="7.5" fill="url(#beadGrad5)" stroke="#1C0A02" strokeWidth="0.6" />

          {/* Naturally joined central union seam */}
          <path d="M 0 -7.5 C -0.8 -3, -0.8 3, 0 7.5" stroke="#110500" strokeWidth="1.2" />

          {/* Gold Caps for the Gauri Shankar pair */}
          <path d="M -7 -7.5 C -7 -6, 0 -6, 0 -7.5 Z" fill="url(#goldGrad5)" />
          <path d="M 0 -7.5 C 0 -6, 7 -6, 7 -7.5 Z" fill="url(#goldGrad5)" />
          <path d="M -7 7.5 C -7 6, 0 6, 0 7.5 Z" fill="url(#goldGrad5)" />
          <path d="M 0 7.5 C 0 6, 7 6, 7 7.5 Z" fill="url(#goldGrad5)" />

          {/* Mukhi facets on both lobes */}
          <path d="M -3.5 -7.5 V 7.5" stroke="#110500" strokeWidth="0.8" />
          <path d="M 3.5 -7.5 V 7.5" stroke="#110500" strokeWidth="0.8" />
          <path d="M -5.5 -6 C -4.5 -2, -4.5 2, -5.5 6" stroke="#110500" strokeWidth="0.6" />
          <path d="M 5.5 -6 C 4.5 -2, 4.5 2, 5.5 6" stroke="#110500" strokeWidth="0.6" />
        </g>

        {/* Heavenly star sparkles */}
        <path d="M 15 15 Q 17 15 17 13 Q 17 15 19 15 Q 17 15 17 17 Q 17 15 15 15" fill="#FFFDF8" opacity="0.8" />
        <path d="M 105 15 Q 107 15 107 13 Q 107 15 109 15 Q 107 15 107 17 Q 107 15 105 15" fill="#FFFDF8" opacity="0.8" />
        <circle cx="10" cy="85" r="1" fill="#EED58C" />
        <circle cx="110" cy="85" r="1.5" fill="#EED58C" />
      </svg>
    )
  }
];

export default function StepperInfographics() {
  const [activeStep, setActiveStep] = useState(0);

  const activeData = stepData[activeStep];

  return (
    <div className="stepper-wrapper" style={{ marginTop: '28px' }}>
      {/* Step dots selector */}
      <div className="stepper-line">
        {stepData.map((step, idx) => (
          <button
            key={idx}
            className={`step-dot ${idx === activeStep ? 'active' : ''} ${idx < activeStep ? 'completed' : ''}`}
            onClick={() => setActiveStep(idx)}
            aria-label={`Select level ${idx + 1}`}
          >
            <span>{step.level}</span>
          </button>
        ))}
      </div>

      {/* Stepper split grid */}
      <div className="stepper-grid">
        {/* Left column: Highly detailed animated vector infographic */}
        <div className="stepper-visual-card">
          <div className="visual-card-glow" style={{ background: `radial-gradient(circle, ${activeData.color} 0%, transparent 70%)` }} />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="visual-svg-container"
            >
              {activeData.svg}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right column: Details box */}
        <div className="stepper-details-box">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <span className="step-tag">{activeData.tagline}</span>
              <h4 className="display step-title">{activeData.title}</h4>
              <p className="step-desc">{activeData.desc}</p>
              
              <div className="step-meta">
                <div className="meta-row">
                  <span className="meta-label">Recommended Beads:</span>
                  <div className="meta-chips">
                    {activeData.beads.map((bead, i) => (
                      <span key={i} className="meta-chip">{bead}</span>
                    ))}
                  </div>
                </div>
                <div className="meta-row">
                  <span className="meta-label">Chakra Focus:</span>
                  <span className="meta-value">{activeData.chakra}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
