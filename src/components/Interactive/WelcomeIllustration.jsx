import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const benefitItems = [
  {
    id: 0,
    title: "10% Welcome Discount",
    details: "Apply code WELCOME10 at checkout for an instant 10% off your entire first order.",
    svg: (
      <svg viewBox="0 0 120 120" className="welcome-benefit-svg" xmlns="http://www.w3.org/2000/svg" referrerPolicy="no-referrer">
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C49A3C" />
            <stop offset="50%" stopColor="#EED58C" />
            <stop offset="100%" stopColor="#8A6721" />
          </linearGradient>
          <linearGradient id="darkGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E160D" />
            <stop offset="100%" stopColor="#0B0805" />
          </linearGradient>
          <linearGradient id="shineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(238,213,140,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="100%" stopColor="rgba(238,213,140,0)" />
          </linearGradient>
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Glow */}
        <circle cx="60" cy="60" r="45" fill="url(#goldGrad)" opacity="0.08" filter="url(#goldGlow)" />

        {/* Coupon Card Body with left & right punch-out ticket stub look */}
        <path 
          d="M 12 35 
             H 108 
             A 6 6 0 0 1 108 47 
             V 73 
             A 6 6 0 0 1 108 85 
             H 12 
             A 6 6 0 0 1 12 73 
             V 47 
             A 6 6 0 0 1 12 35 
             Z" 
          fill="url(#darkGoldGrad)" 
          stroke="url(#goldGrad)" 
          strokeWidth="1.5" 
        />

        {/* Double Inner Frame Inlay */}
        <path 
          d="M 16 39 
             H 104 
             V 81 
             H 16 
             Z" 
          fill="none" 
          stroke="url(#goldGrad)" 
          strokeWidth="0.6" 
          opacity="0.6" 
        />

        {/* Perforation Line */}
        <line x1="84" y1="39" x2="84" y2="81" stroke="url(#goldGrad)" strokeWidth="1" strokeDasharray="2 2" opacity="0.8" />

        {/* Filigree Corner Ornaments */}
        <path d="M 19 42 H 23 M 19 42 V 46" stroke="url(#goldGrad)" strokeWidth="0.8" />
        <path d="M 101 42 H 97 M 101 42 V 46" stroke="url(#goldGrad)" strokeWidth="0.8" />
        <path d="M 19 78 H 23 M 19 78 V 74" stroke="url(#goldGrad)" strokeWidth="0.8" />
        <path d="M 101 78 H 97 M 101 78 V 74" stroke="url(#goldGrad)" strokeWidth="0.8" />

        {/* Left Side Info */}
        <text x="50" y="52" fill="url(#goldGrad)" fontSize="7" fontFamily="Inter" letterSpacing="1.5" textAnchor="middle" opacity="0.75">PROMO CODE</text>
        <text x="50" y="68" fill="#FFFDF8" fontSize="11" fontFamily="Cormorant Garamond" fontWeight="bold" letterSpacing="1" textAnchor="middle">WELCOME10</text>

        {/* Right Side Info */}
        <text x="94" y="55" fill="url(#goldGrad)" fontSize="9" fontFamily="Cormorant Garamond" fontWeight="bold" textAnchor="middle">10%</text>
        <text x="94" y="67" fill="#FFFDF8" fontSize="6" fontFamily="Inter" fontWeight="600" letterSpacing="0.5" textAnchor="middle">OFF</text>

        {/* Moving reflection shimmer overlay */}
        <path d="M 12 35 H 108 V 85 H 12 Z" fill="url(#shineGrad)" opacity="0.15" />

        {/* Sparkling elements */}
        <path d="M 10 25 Q 12 25 12 23 Q 12 25 14 25 Q 12 25 12 27 Q 12 25 10 25" fill="#EED58C" />
        <path d="M 110 95 Q 111 95 111 93 Q 111 95 112 95 Q 111 95 111 97 Q 111 95 110 95" fill="#EED58C" />
        <circle cx="106" cy="22" r="1.5" fill="#C49A3C" />
      </svg>
    )
  },
  {
    id: 1,
    title: "Complimentary Puja Ceremony",
    details: "A personalized Vedic blessing ritual performed in your name by our resident priests at a Shiva temple. Video recording shared with you.",
    svg: (
      <svg viewBox="0 0 120 120" className="welcome-benefit-svg" xmlns="http://www.w3.org/2000/svg" referrerPolicy="no-referrer">
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C49A3C" />
            <stop offset="50%" stopColor="#EED58C" />
            <stop offset="100%" stopColor="#8A6721" />
          </linearGradient>
          <linearGradient id="fireGrad1" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#C83C3C" />
            <stop offset="50%" stopColor="#E27424" />
            <stop offset="100%" stopColor="#FFC837" />
          </linearGradient>
          <linearGradient id="fireGrad2" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#E27424" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFF275" />
          </linearGradient>
          <linearGradient id="copperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A85032" />
            <stop offset="50%" stopColor="#D97A53" />
            <stop offset="100%" stopColor="#6E2C17" />
          </linearGradient>
          <linearGradient id="leafGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#1B4D22" />
            <stop offset="100%" stopColor="#3FA24B" />
          </linearGradient>
        </defs>

        {/* Sacred backdrop wheel */}
        <circle cx="60" cy="60" r="50" fill="none" stroke="url(#goldGrad)" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.3" />

        {/* Stepped Brick/Copper Havan Kund (Fire Altar) with real depth */}
        <polygon points="25,92 95,92 83,78 37,78" fill="#42251D" stroke="#25130E" strokeWidth="0.8" />
        <polygon points="29,86 91,86 80,74 40,74" fill="url(#copperGrad)" stroke="#521F10" strokeWidth="0.8" />
        <polygon points="35,80 85,80 77,72 43,72" fill="#20100B" />

        {/* Intertwined firewood logs */}
        <rect x="42" y="70" width="36" height="5" rx="1.5" transform="rotate(15 60 72.5)" fill="#633C1D" stroke="#3A210D" strokeWidth="0.6" />
        <rect x="42" y="70" width="36" height="5" rx="1.5" transform="rotate(-15 60 72.5)" fill="#7A4C28" stroke="#3A210D" strokeWidth="0.6" />

        {/* Sacred Agni Fire Waves */}
        <g id="sacred-fire">
          <motion.path 
            d="M50 75 C45 62, 40 50, 52 32 C50 48, 54 52, 62 55 C68 45, 66 36, 73 28 C74 42, 70 52, 70 65 C70 75, 50 75, 50 75 Z" 
            fill="url(#fireGrad1)" 
            opacity="0.9"
            animate={{ scaleY: [1, 1.08, 1.02, 1], y: [0, -1, 0.5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "60px 75px" }}
          />
          <motion.path 
            d="M54 75 C50 66, 48 56, 56 42 C56 52, 58 56, 64 58 C68 50, 68 44, 71 38 C72 48, 68 56, 66 65 C66 75, 54 75, 54 75 Z" 
            fill="url(#fireGrad2)" 
            animate={{ scaleY: [1, 1.15, 0.95, 1], y: [0, -1.5, 1, 0] }}
            transition={{ duration: 1.7, delay: 0.3, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "60px 75px" }}
          />
        </g>

        {/* Ornate Copper Kalash (Sacred Pot) on the side */}
        <g transform="translate(10, 5)">
          <ellipse cx="80" cy="74" rx="11" ry="8" fill="url(#copperGrad)" stroke="#521F10" strokeWidth="0.8" />
          <path d="M72 70 C72 63, 88 63, 88 70 V75 C88 79, 72 79, 72 75 Z" fill="url(#copperGrad)" stroke="#521F10" strokeWidth="0.8" />
          <path d="M74 65 H86 V67 H74 Z" fill="#6E2C17" stroke="#521F10" strokeWidth="0.8" />
          
          {/* Green Mango Leaves */}
          <path d="M71 64 C70 54, 76 56, 77 64 Z" fill="url(#leafGrad)" stroke="#113516" strokeWidth="0.5" />
          <path d="M89 64 C90 54, 84 56, 83 64 Z" fill="url(#leafGrad)" stroke="#113516" strokeWidth="0.5" />
          <path d="M80 64 C80 50, 83 50, 80 64 Z" fill="url(#leafGrad)" stroke="#113516" strokeWidth="0.5" />
          
          {/* Sacred Coconut */}
          <circle cx="80" cy="62" r="4.5" fill="#5C4033" stroke="#3D2B22" strokeWidth="0.8" />
          {/* Vermillion Tilak mark */}
          <path d="M78 72 H82 M80 70 V74" stroke="#C83C3C" strokeWidth="0.8" />
        </g>

        {/* Smoldering incense stick with rising smoke trail */}
        <g transform="translate(-15, 12)">
          <circle cx="45" cy="72" r="3.5" fill="#8C7853" stroke="#5C4D32" strokeWidth="0.6" />
          <line x1="45" y1="72" x2="36" y2="52" stroke="#4F361F" strokeWidth="0.8" strokeLinecap="round" />
          <circle cx="36" cy="52" r="1" fill="#FF5000" />
          
          {/* Dynamic soft smoke path */}
          <motion.path 
            d="M36 50 Q31 43, 35 37 T32 24 T36 12" 
            fill="none" 
            stroke="#E1D7C6" 
            strokeWidth="0.8" 
            strokeLinecap="round" 
            opacity="0.45"
            animate={{ d: [
              "M36 50 Q31 43, 35 37 T32 24 T36 12",
              "M36 50 Q34 45, 31 39 T35 26 T31 14",
              "M36 50 Q31 43, 35 37 T32 24 T36 12"
            ]}}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>

        {/* Flower offerings scattered around altar */}
        <circle cx="32" cy="90" r="3" fill="#FFC107" stroke="#FF9800" strokeWidth="0.5" />
        <circle cx="35" cy="92" r="2.5" fill="#FF9800" stroke="#E65100" strokeWidth="0.5" />
        <circle cx="88" cy="88" r="3" fill="#FFC107" stroke="#FF9800" strokeWidth="0.5" />

        {/* Sacred spiritual sparks */}
        <circle cx="56" cy="24" r="1.2" fill="#FFEB3B" opacity="0.8" />
        <circle cx="68" cy="18" r="1.5" fill="#FFEB3B" opacity="0.9" />
        <circle cx="48" cy="16" r="1" fill="#FFC107" opacity="0.7" />
      </svg>
    )
  },
  {
    id: 2,
    title: "Free Lakshmi Bracelet",
    details: "Receive a sacred 7 Mukhi Nepal Rudraksha bracelet representing Goddess Lakshmi on orders above ₹15,001 to invite wealth & good fortune.",
    svg: (
      <svg viewBox="0 0 120 120" className="welcome-benefit-svg" xmlns="http://www.w3.org/2000/svg" referrerPolicy="no-referrer">
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C49A3C" />
            <stop offset="50%" stopColor="#EED58C" />
            <stop offset="100%" stopColor="#8A6721" />
          </linearGradient>
          <radialGradient id="beadGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A06A3F" />
            <stop offset="65%" stopColor="#6C3E1B" />
            <stop offset="100%" stopColor="#3C1E0A" />
          </radialGradient>
          <linearGradient id="goldCap" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F7E59D" />
            <stop offset="50%" stopColor="#C49A3C" />
            <stop offset="100%" stopColor="#8A6721" />
          </linearGradient>
        </defs>

        {/* Sacred halo circle */}
        <circle cx="60" cy="55" r="48" fill="none" stroke="url(#goldGrad)" strokeWidth="0.5" strokeDasharray="1 5" opacity="0.4" />

        {/* Red & saffron intertwined string of bracelet */}
        <ellipse cx="60" cy="55" rx="40" ry="26" fill="none" stroke="#B22222" strokeWidth="2.5" />
        <ellipse cx="60" cy="55" rx="40" ry="26" fill="none" stroke="#E27424" strokeWidth="1" strokeDasharray="2 3" />

        {/* Spherical sandalwood & wooden beads arranged correctly along loop */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * Math.PI) / 6;
          if (i === 3) return null; // Center bottom reserved for 7 Mukhi Rudraksha
          const cx = Number.isFinite(60 + Math.round(40 * Math.cos(angle))) ? 60 + Math.round(40 * Math.cos(angle)) : 60;
          const cy = Number.isFinite(55 + Math.round(26 * Math.sin(angle))) ? 55 + Math.round(26 * Math.sin(angle)) : 55;
          const safeCx = Number.isFinite(cx) ? cx : 60;
          const safeCy = Number.isFinite(cy) ? cy : 55;
          return (
            <g key={i}>
              <circle cx={safeCx} cy={safeCy + 1} r="5" fill="#140E08" opacity="0.6" />
              <circle cx={safeCx} cy={safeCy} r="4.5" fill="url(#beadGrad)" stroke="#221105" strokeWidth="0.4" />
              <circle cx={safeCx + 3} cy={safeCy - 2} r="1.5" fill="url(#goldCap)" />
            </g>
          );
        })}

        {/* Centerpiece 7 Mukhi Nepal Rudraksha with golden caps at the bottom */}
        <g transform="translate(60, 81)">
          {/* Drop shadow */}
          <ellipse cx="0" cy="3" rx="12" ry="7" fill="#000" opacity="0.7" />

          {/* Golden endcaps on left and right */}
          <path d="M -11 -2 C -11 -9, 11 -9, 11 -2 Z" fill="url(#goldCap)" stroke="#8A6721" strokeWidth="0.6" />
          <path d="M -11 2 C -11 9, 11 9, 11 2 Z" fill="url(#goldCap)" stroke="#8A6721" strokeWidth="0.6" />

          {/* Natural textured Rudraksha core structure */}
          <path 
            d="M -9 -4 
               C -12 -1, -12 1, -9 4 
               C -6 7, 6 7, 9 4 
               C 12 1, 12 -1, 9 -4 
               C 6 -7, -6 -7, -9 -4 Z" 
            fill="url(#beadGrad)" 
            stroke="#1E0D05" 
            strokeWidth="0.8" 
          />

          {/* 7 Vertical Mukhi Facet Ridges (Detailed, natural contours) */}
          <path d="M 0 -6 L 0 6" stroke="#251206" strokeWidth="1.2" strokeLinecap="round" />
          
          <path d="M -3 -6 C -2.2 -2, -2.2 2, -3 6" stroke="#1C0D04" strokeWidth="1" strokeLinecap="round" />
          <path d="M 3 -6 C 2.2 -2, 2.2 2, 3 6" stroke="#1C0D04" strokeWidth="1" strokeLinecap="round" />
          
          <path d="M -6 -5 C -4.5 -2, -4.5 2, -6 5" stroke="#1A0C04" strokeWidth="0.9" strokeLinecap="round" />
          <path d="M 6 -5 C 4.5 -2, 4.5 2, 6 5" stroke="#1A0C04" strokeWidth="0.9" strokeLinecap="round" />

          <path d="M -8 -4 C -7 -1, -7 1, -8 4" stroke="#140903" strokeWidth="0.8" strokeLinecap="round" opacity="0.8" />
          <path d="M 8 -4 C 7 -1, 7 1, 8 4" stroke="#140903" strokeWidth="0.8" strokeLinecap="round" opacity="0.8" />

          {/* Natural fissures & blemishes */}
          <circle cx="-4" cy="-2" r="1" fill="#E27424" opacity="0.3" />
          <circle cx="4" cy="2" r="1" fill="#E27424" opacity="0.3" />
          <circle cx="-1" cy="3" r="1.2" fill="#522405" />
          <circle cx="2" cy="-3" r="1" fill="#522405" />
        </g>

        {/* Sacred red holy thread tassel dangling with a golden Lakshmi Lotus coin */}
        <g transform="translate(60, 93)">
          {/* Tassel collar */}
          <path d="M -4 0 C -4 -3, 4 -3, 4 0 V 4 C 4 6, -4 6, -4 4 Z" fill="url(#goldCap)" stroke="#8A6721" strokeWidth="0.5" />
          
          {/* Rich silk threads */}
          <path d="M -3 5 L -5 20 H 5 L 3 5 Z" fill="#C83C3C" />
          <line x1="-3" y1="5" x2="-4" y2="20" stroke="#9E2A2B" strokeWidth="0.8" />
          <line x1="-1" y1="5" x2="-1" y2="21" stroke="#E05A47" strokeWidth="0.6" />
          <line x1="1" y1="5" x2="1" y2="21" stroke="#FF8F70" strokeWidth="0.5" />
          <line x1="3" y1="5" x2="4" y2="20" stroke="#9E2A2B" strokeWidth="0.8" />
          <circle cx="0" cy="5" r="3.5" fill="#C83C3C" />

          {/* Dangling gold coin of Lakshmi with Lotus motif */}
          <g transform="translate(-10, 10)">
            <line x1="10" y1="-10" x2="0" y2="0" stroke="url(#goldCap)" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="4.5" fill="url(#goldCap)" stroke="#8A6721" strokeWidth="0.5" />
            {/* Engraved lotus bloom */}
            <path d="M -2.5 1 C -2.5 -1, 0 -2, 0 1" stroke="#522405" strokeWidth="0.5" fill="none" />
            <path d="M 2.5 1 C 2.5 -1, 0 -2, 0 1" stroke="#522405" strokeWidth="0.5" fill="none" />
            <circle cx="0" cy="0" r="0.8" fill="#C83C3C" />
          </g>
        </g>
      </svg>
    )
  },
  {
    id: 3,
    title: "1-on-1 Expert Advisor",
    details: "Get direct phone, email or WhatsApp access to a senior Vedic advisor who guides you step-by-step from choosing to wearing and maintaining your bead.",
    svg: (
      <svg viewBox="0 0 120 120" className="welcome-benefit-svg" xmlns="http://www.w3.org/2000/svg" referrerPolicy="no-referrer">
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C49A3C" />
            <stop offset="50%" stopColor="#EED58C" />
            <stop offset="100%" stopColor="#8A6721" />
          </linearGradient>
          <radialGradient id="guruGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF2D4" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#C49A3C" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="saffronGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F2994A" />
            <stop offset="100%" stopColor="#E2574C" />
          </linearGradient>
          <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E5A65E" />
            <stop offset="100%" stopColor="#C67D33" />
          </linearGradient>
        </defs>

        {/* Wise lineage mandala back */}
        <circle cx="60" cy="55" r="45" fill="url(#guruGlow)" />
        <circle cx="60" cy="55" r="38" fill="none" stroke="url(#goldGrad)" strokeWidth="0.6" strokeDasharray="4 4" opacity="0.35" />

        {/* Serene Vedic Guru portrait */}
        <g transform="translate(0, 4)">
          {/* Hair locks halo */}
          <circle cx="60" cy="40" r="16" fill="#F0ECE1" />
          
          {/* Ears */}
          <circle cx="43" cy="43" r="3" fill="url(#skinGrad)" />
          <circle cx="77" cy="43" r="3" fill="url(#skinGrad)" />

          {/* Wise face structure */}
          <path d="M 45 42 Q 45 61, 60 61 Q 75 61, 75 42 Z" fill="url(#skinGrad)" stroke="#8A561D" strokeWidth="0.5" />
          <circle cx="60" cy="38" r="15" fill="url(#skinGrad)" />

          {/* Sandalwood & vermillion lineage Tilak */}
          <path d="M 57 28 H 63 V 33 H 57 Z" fill="#EED58C" opacity="0.9" />
          <line x1="60" y1="26" x2="60" y2="34" stroke="#C83C3C" strokeWidth="1.2" />
          <circle cx="60" cy="36" r="1" fill="#C83C3C" />

          {/* Calm eyes, eyebrows and warm welcoming smile */}
          <path d="M 51 38 Q 54 36, 56 38" fill="none" stroke="#251505" strokeWidth="1" strokeLinecap="round" />
          <path d="M 64 38 Q 66 36, 69 38" fill="none" stroke="#251505" strokeWidth="1" strokeLinecap="round" />
          <circle cx="53.5" cy="40" r="1" fill="#000" />
          <circle cx="66.5" cy="40" r="1" fill="#000" />
          <path d="M 50 34 Q 53 32, 57 34" fill="none" stroke="#FFF" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 63 34 Q 67 32, 70 34" fill="none" stroke="#FFF" strokeWidth="1.2" strokeLinecap="round" />

          {/* Holy silver beard & mustache of experience */}
          <path d="M 50 49 Q 60 52, 70 49 C 68 56, 64 66, 60 66 C 56 66, 52 56, 50 49 Z" fill="#F4F1EA" stroke="#D1CBBF" strokeWidth="0.5" />
          <path d="M 54 48 Q 60 51, 66 48" fill="none" stroke="#FFF" strokeWidth="1.2" strokeLinecap="round" />

          {/* Ornate saffron drape with golden embroidered borders */}
          <path d="M 32 75 C 32 60, 42 56, 60 56 C 78 56, 88 60, 88 75 V 82 H 32 Z" fill="url(#saffronGrad)" stroke="#B73A2A" strokeWidth="0.8" />
          <path d="M 32 75 Q 48 64, 60 76" fill="none" stroke="url(#goldGrad)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 64 56 Q 78 68, 88 75" fill="none" stroke="url(#goldGrad)" strokeWidth="1" strokeLinecap="round" />

          {/* Sacred Rudraksha Mala across neck */}
          <path d="M 45 62 C 45 74, 75 74, 75 62" fill="none" stroke="#5C3415" strokeWidth="1.8" strokeDasharray="2 2" />
          <circle cx="60" cy="71" r="2.5" fill="url(#goldGrad)" stroke="#8A6721" strokeWidth="0.5" />
        </g>

        {/* Decorative dynamic communication icons */}
        {/* WhatsApp Channel */}
        <g transform="translate(18, 30)">
          <line x1="0" y1="0" x2="20" y2="10" stroke="url(#goldGrad)" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.6" />
          <circle cx="0" cy="0" r="9" fill="#1C150E" stroke="url(#goldGrad)" strokeWidth="1" />
          <path d="M -4 1 C -4 -3, -1 -4, 2 -3 L 3 -1 C 2 -2, 0 -2, -1 -1" stroke="#25D366" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <circle cx="2" cy="-2" r="1" fill="#25D366" />
        </g>

        {/* Live Advisor Chat bubble */}
        <g transform="translate(102, 30)">
          <line x1="0" y1="0" x2="-22" y2="10" stroke="url(#goldGrad)" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.6" />
          <circle cx="0" cy="0" r="9" fill="#1C150E" stroke="url(#goldGrad)" strokeWidth="1" />
          <path d="M -4 -3 H 4 V 2 H 0 L -3 5 V 2 H -4 Z" fill="none" stroke="url(#goldGrad)" strokeWidth="0.8" />
          <line x1="-2" y1="-0.5" x2="2" y2="-0.5" stroke="url(#goldGrad)" strokeWidth="0.6" />
        </g>

        {/* Star bursts / elements */}
        <path d="M 10 10 Q 12 10 12 8 Q 12 10 14 10 Q 12 10 12 12 Q 12 10 10 10" fill="url(#goldGrad)" />
        <circle cx="108" cy="70" r="1.5" fill="#EED58C" />
      </svg>
    )
  },
  {
    id: 4,
    title: "Care Guide Included",
    details: "Every shipment includes a hardcopy maintenance manual covering oils, purification, thread replacements, and wearing rules.",
    svg: (
      <svg viewBox="0 0 120 120" className="welcome-benefit-svg" xmlns="http://www.w3.org/2000/svg" referrerPolicy="no-referrer">
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C49A3C" />
            <stop offset="50%" stopColor="#EED58C" />
            <stop offset="100%" stopColor="#8A6721" />
          </linearGradient>
          <linearGradient id="parchmentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF5" />
            <stop offset="70%" stopColor="#F5EEDA" />
            <stop offset="100%" stopColor="#DCD2B5" />
          </linearGradient>
          <linearGradient id="leatherGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#804D1B" />
            <stop offset="100%" stopColor="#4A290B" />
          </linearGradient>
          <radialGradient id="beadGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A06A3F" />
            <stop offset="65%" stopColor="#6C3E1B" />
            <stop offset="100%" stopColor="#3C1E0A" />
          </radialGradient>
        </defs>

        {/* Sacred geometric ring back */}
        <circle cx="60" cy="55" r="48" fill="none" stroke="url(#goldGrad)" strokeWidth="0.6" strokeDasharray="2 3" opacity="0.35" />

        {/* Book shadow casting down */}
        <path d="M 18 84 Q 60 92, 102 84 Q 104 90, 60 96 Q 16 90, 18 84 Z" fill="#000" opacity="0.65" />

        {/* Gilded leather bound hardcopy backcover */}
        <path d="M 16 33 C 16 33, 38 27, 60 34 C 82 27, 104 33, 104 33 V 85 C 104 85, 82 79, 60 86 C 38 79, 16 85, 16 85 Z" fill="url(#leatherGrad)" stroke="#261302" strokeWidth="1" />

        {/* Textured yellowed parchment pages */}
        <path d="M 19 31 C 19 31, 39 25, 60 31 C 81 25, 101 31, 101 31 V 81 C 101 81, 81 75, 60 82 C 39 75, 19 81, 19 81 Z" fill="url(#parchmentGrad)" stroke="#A08C63" strokeWidth="0.6" />

        {/* Book spine line shadow */}
        <path d="M 58 31 C 58 31, 60 32, 62 31 V 82 C 62 82, 60 83, 58 82 Z" fill="#BCAC86" />

        {/* LEFT PAGE: Maintenance Guidelines & miniature action icons */}
        <line x1="24" y1="42" x2="48" y2="42" stroke="#5C4D31" strokeWidth="0.8" opacity="0.8" />
        <line x1="24" y1="48" x2="44" y2="48" stroke="#5C4D31" strokeWidth="0.8" opacity="0.8" />

        {/* Oil Drop Bullet */}
        <g transform="translate(24, 57)">
          <path d="M 0 -3 C -1.5 -1, -2 0, -2 1.5 C -2 2.8, -0.9 3.5, 0 3.5 C 0.9 3.5, 2 2.8, 2 1.5 C 2 0, 1.5 -1, 0 -3 Z" fill="url(#goldGrad)" />
          <line x1="6" y1="0.5" x2="22" y2="0.5" stroke="#7C6D4D" strokeWidth="0.7" />
        </g>
        
        {/* Cleaning Brush Bullet */}
        <g transform="translate(24, 67)">
          <line x1="-1" y1="2" x2="2" y2="-1" stroke="#5C4D31" strokeWidth="0.8" />
          <path d="M 1 -1 L 3 -3 H 4 V -2 L 2 0 Z" fill="#5C4D31" />
          <path d="M -1 2 L -2 4 M -2 3 L -3 5" stroke="url(#goldGrad)" strokeWidth="0.6" />
          <line x1="6" y1="0.5" x2="22" y2="0.5" stroke="#7C6D4D" strokeWidth="0.7" />
        </g>

        {/* RIGHT PAGE: Bead oiling diagram */}
        {/* Sacred instruction diagram frame */}
        <circle cx="80" cy="52" r="14" fill="#EFE8D3" stroke="url(#goldGrad)" strokeWidth="0.6" />
        
        {/* Small bead under maintenance drawing */}
        <g transform="translate(80, 52)">
          <circle cx="0" cy="0" r="8" fill="url(#beadGrad)" stroke="#1E0D05" strokeWidth="0.5" />
          <line x1="0" y1="-8" x2="0" y2="8" stroke="#2D170B" strokeWidth="0.8" />
          <path d="M -3 -7 C -2 -3, -2 3, -3 7" stroke="#2D170B" strokeWidth="0.6" />
          <path d="M 3 -7 C 2 -3, 2 3, 3 7" stroke="#2D170B" strokeWidth="0.6" />
          {/* Oil drop glowing spot */}
          <circle cx="-2" cy="-1" r="1.5" fill="rgba(196,154,60,0.85)" stroke="#FFF" strokeWidth="0.3" />
          <circle cx="-2" cy="-1" r="3" fill="none" stroke="#EED58C" strokeWidth="0.4" opacity="0.6" />
        </g>
        
        {/* Page text indicators */}
        <line x1="68" y1="72" x2="92" y2="72" stroke="#5C4D31" strokeWidth="0.8" opacity="0.8" />
        <line x1="72" y1="76" x2="88" y2="76" stroke="#5C4D31" strokeWidth="0.8" opacity="0.8" />

        {/* Gilded Book Cover Corner Protectors */}
        <polygon points="16,39 21,34 16,34" fill="url(#goldGrad)" stroke="#8A6721" strokeWidth="0.4" />
        <polygon points="104,39 99,34 104,34" fill="url(#goldGrad)" stroke="#8A6721" strokeWidth="0.4" />
        <polygon points="16,79 21,84 16,84" fill="url(#goldGrad)" stroke="#8A6721" strokeWidth="0.4" />
        <polygon points="104,79 99,84 104,84" fill="url(#goldGrad)" stroke="#8A6721" strokeWidth="0.4" />
      </svg>
    )
  }
];

export default function WelcomeIllustration() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeBenefit = benefitItems[activeIndex];

  return (
    <div className="welcome-wrapper">
      <div className="welcome-layout">
        {/* Left Side: Dynamic Vector Illustration Card */}
        <div className="welcome-visual-panel">
          <div className="panel-gold-glow" />
          <div className="panel-svg-holder">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.92, rotateY: 90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.92, rotateY: -90 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ perspective: 1000 }}
              >
                {activeBenefit.svg}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="panel-details">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="benefit-description"
              >
                {activeBenefit.details}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Interactive benefits list */}
        <div className="welcome-list-panel">
          <ul className="welcome-items-list">
            {benefitItems.map((item, idx) => (
              <li
                key={item.id}
                className={`welcome-item-row ${idx === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(idx)}
              >
                <div className="item-radio">
                  <span className="radio-dot" />
                </div>
                <div className="item-text">
                  <h5>{item.title}</h5>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
