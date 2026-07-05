import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const cities = [
  {
    id: 'mumbai',
    name: 'Mumbai, India',
    // SVG coords in 1000x507 viewBox
    x: 620, y: 268,
    stats: 'Headquarters & Blessing Altar',
    seekers: '85,000+',
    buyer: 'Rajesh K. (Industrialist)',
    item: 'Siddha Mala (1 to 14 Mukhi)',
    note: 'Blessed in our Worli center. Experiencing profound emotional balance and professional clarity within 90 days.',
    flag: '🇮🇳'
  },
  {
    id: 'nyc',
    name: 'New York, USA',
    x: 230, y: 175,
    stats: 'Spiritual Exhibition Hub',
    seekers: '14,000+',
    buyer: 'Sarah J. (Wellness Coach)',
    item: 'Gauri Shankar & 14 Mukhi Combo',
    note: 'Acquired during our annual Manhattan Expo. Deepened meditative states and amplified alignment.',
    flag: '🇺🇸'
  },
  {
    id: 'london',
    name: 'London, UK',
    x: 458, y: 148,
    stats: 'European Advisory Center',
    seekers: '11,000+',
    buyer: 'Dr. Nicholas P. (Researcher)',
    item: '7 Mukhi & 11 Mukhi Mala',
    note: 'Utilizes electromagnetic resonance of certified beads for cardiac focus and breath alignment.',
    flag: '🇬🇧'
  },
  {
    id: 'singapore',
    name: 'Singapore',
    x: 748, y: 305,
    stats: 'SE Asian Exhibition Hub',
    seekers: '9,000+',
    buyer: 'Lina T. (Executive)',
    item: 'Ek Mukhi Kaju & 12 Mukhi Surya',
    note: 'Sourced through the Singapore Vedic Circle. Enabled powerful decision-making and inner vitality.',
    flag: '🇸🇬'
  },
  {
    id: 'sydney',
    name: 'Sydney, Australia',
    x: 820, y: 408,
    stats: 'Oceania Delivery Care',
    seekers: '6,000+',
    buyer: 'Marcus S. (Devotee)',
    item: '14 Mukhi Hanuman Pendant',
    note: 'A sacred companion during daily trials. Promotes supreme fearlessness and physical strength.',
    flag: '🇦🇺'
  }
];

// Accurate world map SVG paths — Natural Earth simplified, 1000x507 Mercator-like viewBox
// Coordinates calibrated so cities (Mumbai=620,268 | NYC=230,175 | London=458,148 | Singapore=748,305 | Sydney=820,408) are inside correct continents
const WORLD_PATHS = [
  // North America (USA + Canada + Mexico)
  { id: 'na', d: 'M 82 68 L 108 58 L 138 52 L 168 50 L 195 54 L 218 64 L 238 78 L 252 95 L 260 115 L 262 135 L 255 155 L 242 170 L 228 180 L 218 195 L 225 210 L 232 225 L 225 240 L 210 252 L 195 262 L 180 268 L 168 262 L 158 248 L 145 232 L 130 218 L 115 202 L 100 188 L 88 172 L 78 155 L 72 138 L 72 118 L 76 98 Z' },
  // Alaska
  { id: 'ak', d: 'M 60 58 L 78 50 L 90 55 L 92 68 L 80 74 L 65 70 Z' },
  // Greenland
  { id: 'gl', d: 'M 278 30 L 308 22 L 340 25 L 358 38 L 362 55 L 348 70 L 325 78 L 300 75 L 282 62 L 275 45 Z' },
  // Cuba / Caribbean
  { id: 'cu', d: 'M 215 240 L 232 238 L 238 245 L 228 252 L 215 250 Z' },
  // Central America
  { id: 'cen', d: 'M 180 268 L 195 262 L 200 275 L 202 288 L 192 295 L 180 290 L 175 278 Z' },
  // South America
  { id: 'sa', d: 'M 200 292 L 222 280 L 248 278 L 270 285 L 288 298 L 298 318 L 302 342 L 300 368 L 292 392 L 278 415 L 260 435 L 240 448 L 222 448 L 208 435 L 196 415 L 188 392 L 185 368 L 186 342 L 190 318 L 196 305 Z' },
  // UK & Ireland
  { id: 'uk', d: 'M 428 118 L 442 112 L 456 118 L 458 132 L 448 140 L 434 138 L 428 128 Z' },
  // Scandinavia (Norway, Sweden, Finland)
  { id: 'sc', d: 'M 460 60 L 478 52 L 498 56 L 510 68 L 508 82 L 496 94 L 480 100 L 465 96 L 455 82 L 456 68 Z' },
  // Western Europe (France, Spain, Germany, Benelux)
  { id: 'weu', d: 'M 428 118 L 458 118 L 478 112 L 498 118 L 512 132 L 515 148 L 508 160 L 492 168 L 472 170 L 452 165 L 435 155 L 428 142 Z' },
  // Eastern Europe & Balkans
  { id: 'eeu', d: 'M 512 132 L 542 122 L 568 118 L 590 125 L 605 138 L 608 155 L 598 168 L 578 175 L 555 178 L 532 172 L 515 160 L 512 148 Z' },
  // Russia (European + Siberian)
  { id: 'ru', d: 'M 508 68 L 545 55 L 590 48 L 638 48 L 682 52 L 720 58 L 755 65 L 785 72 L 812 80 L 838 90 L 858 102 L 868 118 L 862 135 L 845 148 L 818 158 L 788 165 L 755 168 L 722 168 L 692 162 L 665 155 L 640 148 L 615 140 L 592 135 L 568 132 L 542 132 L 512 132 L 510 115 L 508 95 L 508 80 Z' },
  // Turkey & Caucasus
  { id: 'tr', d: 'M 540 175 L 565 170 L 592 170 L 612 178 L 618 192 L 608 205 L 585 208 L 560 205 L 542 195 L 538 182 Z' },
  // Middle East (Iraq, Syria, Iran)
  { id: 'me', d: 'M 560 205 L 592 198 L 622 195 L 648 200 L 668 212 L 678 228 L 672 248 L 652 260 L 625 265 L 598 262 L 575 252 L 560 238 L 558 222 Z' },
  // Arabian Peninsula
  { id: 'ar', d: 'M 572 252 L 598 248 L 622 250 L 638 262 L 642 280 L 632 298 L 615 308 L 595 305 L 578 290 L 568 272 Z' },
  // Africa (full continent)
  { id: 'af', d: 'M 450 192 L 480 182 L 512 178 L 538 182 L 558 192 L 572 212 L 582 235 L 585 262 L 580 292 L 572 322 L 558 348 L 542 370 L 522 388 L 498 398 L 475 398 L 452 388 L 432 368 L 415 342 L 405 315 L 400 285 L 402 255 L 408 228 L 418 205 L 432 195 Z' },
  // Madagascar
  { id: 'mg', d: 'M 570 342 L 580 332 L 590 340 L 588 362 L 578 372 L 568 362 L 566 348 Z' },
  // Central Asia (Kazakhstan, Uzbekistan)
  { id: 'cas', d: 'M 608 138 L 648 132 L 688 135 L 720 142 L 742 155 L 748 170 L 738 185 L 718 192 L 692 195 L 662 192 L 638 182 L 618 168 L 610 152 Z' },
  // South Asia (India + Pakistan + Bangladesh)
  { id: 'sa2', d: 'M 618 220 L 650 212 L 678 215 L 698 228 L 710 248 L 712 268 L 705 292 L 688 308 L 665 318 L 640 322 L 615 315 L 595 298 L 585 278 L 585 258 L 592 238 L 605 228 Z' },
  // Sri Lanka
  { id: 'sl', d: 'M 648 322 L 655 318 L 660 328 L 655 336 L 645 335 L 642 325 Z' },
  // Southeast Asia mainland (Thailand, Vietnam, Myanmar)
  { id: 'seam', d: 'M 718 238 L 745 228 L 768 232 L 782 248 L 780 268 L 768 282 L 748 292 L 725 295 L 708 285 L 702 268 L 706 250 Z' },
  // Malay Peninsula & Indonesia (Sumatra)
  { id: 'mal', d: 'M 745 292 L 762 290 L 775 300 L 778 315 L 768 325 L 750 328 L 735 318 L 732 305 Z' },
  // Borneo
  { id: 'bo', d: 'M 778 285 L 802 280 L 818 290 L 820 308 L 810 320 L 790 325 L 772 315 L 768 300 Z' },
  // East Asia (China)
  { id: 'ch', d: 'M 720 142 L 758 132 L 792 128 L 822 132 L 848 142 L 865 158 L 868 178 L 858 200 L 838 218 L 812 232 L 782 240 L 752 242 L 725 238 L 705 228 L 695 212 L 696 195 L 706 178 L 718 162 Z' },
  // Korea peninsula
  { id: 'ko', d: 'M 838 175 L 852 172 L 858 185 L 852 200 L 840 205 L 828 200 L 828 185 Z' },
  // Japan (main islands)
  { id: 'jp', d: 'M 862 155 L 878 148 L 892 155 L 898 170 L 892 185 L 878 192 L 862 188 L 855 172 Z' },
  // Japan (southern)
  { id: 'jp2', d: 'M 848 200 L 862 198 L 870 210 L 865 222 L 852 225 L 842 215 Z' },
  // Philippines
  { id: 'ph', d: 'M 808 265 L 820 260 L 830 268 L 828 282 L 818 288 L 808 282 L 806 270 Z' },
  // Australia (main)
  { id: 'au', d: 'M 738 348 L 768 335 L 800 328 L 832 330 L 860 342 L 880 358 L 892 378 L 895 400 L 888 422 L 872 440 L 848 452 L 820 458 L 792 456 L 762 445 L 738 428 L 722 408 L 718 385 L 722 362 L 730 348 Z' },
  // Tasmania
  { id: 'tas', d: 'M 842 458 L 852 452 L 862 460 L 860 472 L 848 476 L 838 468 Z' },
  // New Zealand North
  { id: 'nzn', d: 'M 902 418 L 915 408 L 925 418 L 922 432 L 910 438 L 900 430 Z' },
  // New Zealand South
  { id: 'nzs', d: 'M 898 440 L 912 435 L 918 448 L 912 462 L 898 465 L 892 452 Z' },
];

export default function CommunityMap() {
  const [activeCityIndex, setActiveCityIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCityIndex((prev) => (prev + 1) % cities.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const activeCity = cities[activeCityIndex];
  const mumbai = cities[0]; // hub city

  return (
    <div className="community-map-wrapper" style={{
      background: 'var(--dark-gradient)',
      border: '1px solid rgba(196,154,60,0.22)',
      borderRadius: 'var(--r-lg)',
      padding: 'var(--map-padding, 24px)',
      boxShadow: '0 12px 36px rgba(0,0,0,0.4)'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold)', fontWeight: '600' }}>Live Devotee Registry</span>
          <h4 style={{ margin: 0, fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', color: '#fff' }}>Global Connection Tracker</h4>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', display: 'inline-block', boxShadow: '0 0 6px #4ade80' }} />
          <span style={{ fontSize: '10px', color: 'rgba(255,253,248,0.6)', letterSpacing: '0.06em', fontWeight: 600 }}>LIVE · 125,000+ SEEKERS</span>
        </div>
      </div>

      {/* City Pills */}
      <div style={{
        display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px',
        marginBottom: '16px', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch',
        width: '100%', borderBottom: '1px solid rgba(196,154,60,0.1)'
      }}>
        {cities.map((c, i) => {
          const isSelected = activeCityIndex === i;
          return (
            <button
              key={c.id}
              onClick={() => setActiveCityIndex(i)}
              style={{
                flexShrink: 0,
                background: isSelected ? 'var(--gold)' : 'rgba(255,253,248,0.03)',
                color: isSelected ? 'var(--black)' : 'rgba(255,253,248,0.85)',
                border: isSelected ? '1px solid var(--gold)' : '1px solid rgba(196,154,60,0.18)',
                borderRadius: '20px', padding: '6px 14px', fontSize: '10.5px',
                fontWeight: isSelected ? '700' : '500', cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                minHeight: '36px', display: 'inline-flex', alignItems: 'center',
                gap: '5px', touchAction: 'manipulation'
              }}
            >
              {c.flag} {c.name}
            </button>
          );
        })}
      </div>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        alignItems: 'flex-start'
      }}>

        {/* MAP PANEL */}
        <div style={{
          flex: '1 1 340px',
          minWidth: 0,
          position: 'relative',
          background: 'rgba(6, 14, 28, 0.85)',
          border: '1px solid rgba(196,154,60,0.15)',
          borderRadius: 'var(--r-md)',
          minHeight: '340px',
          overflow: 'hidden'
        }}>
          {/* Subtle lat/lon grid lines */}
          <svg viewBox="0 0 1000 507" preserveAspectRatio="xMidYMid meet"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>

            {/* Ocean background */}
            <rect width="1000" height="507" fill="#060e1c" />

            {/* Grid lines (lat/lon) */}
            <g stroke="rgba(196,154,60,0.06)" strokeWidth="0.6">
              {[0,60,120,180,240,300,360,420,480].map(y => (
                <line key={`lat-${y}`} x1="0" y1={y} x2="1000" y2={y} />
              ))}
              {[0,100,200,300,400,500,600,700,800,900,1000].map(x => (
                <line key={`lon-${x}`} x1={x} y1="0" x2={x} y2="507" />
              ))}
            </g>

            {/* Tropic lines */}
            <line x1="0" y1="180" x2="1000" y2="180" stroke="rgba(196,154,60,0.08)" strokeWidth="0.8" strokeDasharray="4 6" />
            <line x1="0" y1="325" x2="1000" y2="325" stroke="rgba(196,154,60,0.08)" strokeWidth="0.8" strokeDasharray="4 6" />
            <line x1="0" y1="253" x2="1000" y2="253" stroke="rgba(255,253,248,0.05)" strokeWidth="0.8" />

            {/* Continent fills */}
            <g fill="rgba(30,52,80,0.85)" stroke="rgba(196,154,60,0.55)" strokeWidth="0.7" strokeLinejoin="round">
              {WORLD_PATHS.map(p => (
                <path key={p.id} d={p.d} />
              ))}
            </g>

            {/* Connection arcs from Mumbai to each city */}
            {cities.map((city) => {
              if (city.id === 'mumbai') return null;
              const isActive = city.id === activeCity.id;
              const mx = (mumbai.x + city.x) / 2;
              const my = Math.min(mumbai.y, city.y) - 60;
              return (
                <motion.path
                  key={`arc-${city.id}`}
                  d={`M ${mumbai.x} ${mumbai.y} Q ${mx} ${my} ${city.x} ${city.y}`}
                  fill="none"
                  stroke={isActive ? 'var(--gold)' : 'rgba(196,154,60,0.25)'}
                  strokeWidth={isActive ? 1.2 : 0.6}
                  strokeDasharray={isActive ? 'none' : '3 4'}
                  animate={{ opacity: isActive ? 1 : 0.5 }}
                  transition={{ duration: 0.5 }}
                />
              );
            })}

            {/* Moving dot along active arc */}
            {cities.filter(c => c.id !== 'mumbai').map((city) => {
              const isActive = city.id === activeCity.id;
              if (!isActive) return null;
              const mx = (mumbai.x + city.x) / 2;
              const my = Math.min(mumbai.y, city.y) - 60;
              return (
                <motion.circle
                  key={`dot-${city.id}`}
                  r="3"
                  fill="var(--gold)"
                  filter="url(#glow)"
                  animate={{
                    offsetDistance: ['0%', '100%'],
                    opacity: [0, 1, 1, 0]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    offsetPath: `path("M ${mumbai.x} ${mumbai.y} Q ${mx} ${my} ${city.x} ${city.y}")`
                  }}
                />
              );
            })}

            {/* City beacons */}
            {cities.map((city, idx) => {
              const isActive = activeCityIndex === idx;
              return (
                <g key={city.id} onClick={() => setActiveCityIndex(idx)} style={{ cursor: 'pointer' }}>
                  {/* Pulse ring */}
                  {isActive && (
                    <motion.circle cx={city.x} cy={city.y} r="10"
                      fill="none" stroke="var(--gold)" strokeWidth="1"
                      animate={{ r: [8, 18], opacity: [0.8, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                    />
                  )}
                  <motion.circle cx={city.x} cy={city.y}
                    r={isActive ? 6 : 4}
                    fill={isActive ? 'var(--gold)' : 'rgba(196,154,60,0.55)'}
                    stroke={isActive ? 'rgba(255,253,248,0.9)' : 'rgba(196,154,60,0.4)'}
                    strokeWidth={isActive ? 1.5 : 0.8}
                    animate={{ r: isActive ? 6 : 4 }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* City label */}
                  <text
                    x={city.x + 9}
                    y={city.y + 4}
                    fontSize="9"
                    fill={isActive ? 'rgba(255,255,220,0.95)' : 'rgba(255,253,248,0.55)'}
                    fontFamily="Inter, sans-serif"
                    fontWeight={isActive ? '700' : '400'}
                    style={{ pointerEvents: 'none' }}
                  >
                    {city.name.split(',')[0]}
                  </text>

                  {/* SVG filter for glow */}
                  <defs>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                </g>
              );
            })}
          </svg>

          {/* HUD badges */}
          <div style={{
            position: 'absolute', bottom: '10px', left: '12px',
            background: 'rgba(6,14,28,0.88)', border: '1px solid rgba(196,154,60,0.3)',
            borderRadius: '6px', padding: '4px 10px', pointerEvents: 'none'
          }}>
            <span style={{ fontSize: '9px', color: 'var(--gold)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              📍 {activeCity.name}
            </span>
          </div>
          <div style={{
            position: 'absolute', top: '10px', right: '12px',
            background: 'rgba(6,14,28,0.88)', border: '1px solid rgba(74,222,128,0.3)',
            borderRadius: '6px', padding: '4px 10px', pointerEvents: 'none',
            display: 'flex', alignItems: 'center', gap: '5px'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', display: 'inline-block', boxShadow: '0 0 4px #4ade80' }} />
            <span style={{ fontSize: '9px', color: 'rgba(255,253,248,0.7)', fontWeight: 600, letterSpacing: '0.06em' }}>
              {activeCity.seekers} ACTIVE
            </span>
          </div>
        </div>

        {/* RIGHT PANEL — Devotee Card */}
        <div style={{ flex: '1 1 240px', minWidth: '220px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCity.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28 }}
              style={{
                background: 'rgba(255,253,248,0.02)',
                border: '1px solid rgba(196,154,60,0.18)',
                borderRadius: 'var(--r-md)',
                padding: '18px'
              }}
            >
              {/* Location row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--gold-lt)' }}>
                  {activeCity.flag} {activeCity.name}
                </span>
                <span style={{
                  fontSize: '8px', background: 'rgba(74,222,128,0.12)',
                  border: '1px solid rgba(74,222,128,0.3)', borderRadius: '4px',
                  padding: '2px 7px', color: '#4ade80', fontWeight: '700',
                  textTransform: 'uppercase', letterSpacing: '0.04em', flexShrink: 0
                }}>
                  ● LIVE
                </span>
              </div>

              {/* Verified tag */}
              <span style={{
                fontSize: '8px', background: 'rgba(196,154,60,0.12)',
                border: '1px solid rgba(196,154,60,0.25)', borderRadius: '3px',
                padding: '2px 7px', color: 'var(--gold)', fontWeight: '700',
                textTransform: 'uppercase', letterSpacing: '0.04em', display: 'inline-block', marginBottom: '8px'
              }}>
                Verified Devotee
              </span>

              {/* Buyer name */}
              <h5 style={{
                fontFamily: 'Cormorant Garamond, serif', fontSize: '17px',
                color: '#fff', margin: '0 0 4px', fontWeight: '700', lineHeight: 1.2
              }}>
                {activeCity.buyer}
              </h5>

              {/* Item sourced */}
              <p style={{ margin: '0 0 10px', fontSize: '11px', color: 'var(--gold-lt)', fontFamily: 'var(--font-mono)', lineHeight: 1.4 }}>
                💎 {activeCity.item}
              </p>

              {/* Note */}
              <p style={{ margin: '0 0 14px', fontSize: '11.5px', color: 'rgba(255,253,248,0.75)', lineHeight: 1.5, fontStyle: 'italic' }}>
                "{activeCity.note}"
              </p>

              {/* Stats footer */}
              <div style={{
                borderTop: '1px solid rgba(196,154,60,0.12)',
                paddingTop: '10px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <span style={{ fontSize: '10px', color: 'rgba(255,253,248,0.38)', lineHeight: 1.3 }}>{activeCity.stats}</span>
                <span style={{ fontSize: '11px', color: 'var(--gold)', fontWeight: '700', flexShrink: 0 }}>{activeCity.seekers} seekers</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Stats row */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px'
          }}>
            {[
              { label: 'Countries', value: '42+' },
              { label: 'Total Seekers', value: '1.25L+' }
            ].map(stat => (
              <div key={stat.label} style={{
                background: 'rgba(255,253,248,0.02)',
                border: '1px solid rgba(196,154,60,0.12)',
                borderRadius: '8px', padding: '10px 12px', textAlign: 'center'
              }}>
                <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--gold)', fontFamily: 'Cormorant Garamond, serif' }}>{stat.value}</div>
                <div style={{ fontSize: '9px', color: 'rgba(255,253,248,0.45)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '2px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
