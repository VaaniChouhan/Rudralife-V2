import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleCanvas from './ParticleCanvas';

const steps = [
  { id: 'authenticate', label: 'A · Authenticate', icon: '🔬' },
  { id: 'cleanse', label: 'C · Cleanse', icon: '💧' },
  { id: 'energize', label: 'E · Energize', icon: '⚡' }
];

export default function AceProcess() {
  const [activeStep, setActiveStep] = useState('authenticate');

  return (
    <div className="ace-infographic reveal" style={{
      background: 'linear-gradient(135deg, #1C1613 0%, #120D0B 100%)',
      border: '1.5px solid rgba(196, 154, 60, 0.25)',
      borderRadius: 'var(--r-lg)',
      padding: '24px',
      marginTop: '24px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 12px 36px rgba(0,0,0,0.45)'
    }}>
      
      {/* Background Ambience */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle, rgba(196,154,60,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Option Toggle Buttons - Styled flawlessly with uniform layout */}
      <div className="grid grid-cols-3 gap-2" style={{
        background: 'rgba(0, 0, 0, 0.45)',
        padding: '6px',
        borderRadius: '10px',
        marginBottom: '24px',
        position: 'relative',
        zIndex: 2,
        border: '1px solid rgba(196, 154, 60, 0.12)'
      }}>
        {steps.map(step => {
          const isActive = activeStep === step.id;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              style={{
                background: isActive ? 'var(--gold)' : 'transparent',
                color: isActive ? 'var(--black)' : 'rgba(255,253,248,0.7)',
                border: 'none',
                borderRadius: '6px',
                padding: '12px 6px',
                fontSize: '11px',
                fontWeight: isActive ? '700' : '500',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                sm: { flexDirection: 'row' },
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                touchAction: 'manipulation'
              }}
              className="focus:outline-none"
            >
              <span style={{ fontSize: '14px' }}>{step.icon}</span>
              <span style={{ letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '10px', textAlign: 'center' }}>
                {step.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Infographic Workspace */}
      <div className="ace-workspace" style={{ position: 'relative', minHeight: '300px', zIndex: 1 }}>
        <AnimatePresence mode="wait">
          
          {/* STEP 1: AUTHENTICATE */}
          {activeStep === 'authenticate' && (
            <motion.div
              key="auth"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              {/* Detailed X-Ray and Scientific Schematic */}
              <div style={{
                position: 'relative',
                height: '180px',
                background: 'rgba(0,0,0,0.55)',
                borderRadius: 'var(--r-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                border: '1px solid rgba(196,154,60,0.18)'
              }}>
                {/* Scientific Grid & Radiographic lines */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'radial-gradient(rgba(0, 210, 255, 0.08) 1px, transparent 1px)',
                  backgroundSize: '10px 10px',
                  opacity: 0.7
                }} />

                {/* X-Ray circular scanning schematic */}
                <svg viewBox="0 0 100 100" width="120" height="120" style={{ position: 'relative', zIndex: 1 }}>
                  {/* Calibrator rings */}
                  <circle cx="50" cy="50" r="45" stroke="#00d2ff" strokeWidth="0.25" fill="none" strokeDasharray="1 3" opacity="0.4" />
                  <circle cx="50" cy="50" r="40" stroke="#00d2ff" strokeWidth="0.5" fill="none" strokeDasharray="3 2" opacity="0.6" />
                  <circle cx="50" cy="50" r="32" stroke="var(--gold)" strokeWidth="1" fill="none" opacity="0.8" />
                  
                  {/* Density scan lines & interior compartments */}
                  {[...Array(5)].map((_, i) => {
                    const angle = (i * 360) / 5;
                    const rad = (angle * Math.PI) / 180;
                    const cx = 50 + 16 * Math.cos(rad);
                    const cy = 50 + 16 * Math.sin(rad);
                    return (
                      <g key={i}>
                        {/* Compartment dividers */}
                        <line x1="50" y1="50" x2={50 + 32 * Math.cos(rad)} y2={50 + 32 * Math.sin(rad)} stroke="#00d2ff" strokeWidth="0.4" opacity="0.4" />
                        
                        {/* Seed compartment curves */}
                        <path 
                          d={`M 50 50 Q ${50 + 20 * Math.cos(rad - 0.3)} ${50 + 20 * Math.sin(rad - 0.3)} ${50 + 32 * Math.cos(rad)} ${50 + 32 * Math.sin(rad)}`}
                          fill="none" 
                          stroke="var(--gold)" 
                          strokeWidth="0.3" 
                          opacity="0.5" 
                        />

                        {/* Highly detailed botanical seed kernel representation */}
                        <ellipse cx={cx} cy={cy} rx="4" ry="2.2" fill="none" stroke="var(--gold-lt)" strokeWidth="0.5" transform={`rotate(${angle} ${cx} ${cy})`} />
                        <circle cx={cx} cy={cy} r="1.2" fill="#00d2ff" opacity="0.8" />
                      </g>
                    );
                  })}
                  
                  {/* Central cavity hole */}
                  <circle cx="50" cy="50" r="4" fill="#0c0806" stroke="var(--gold)" strokeWidth="0.6" />
                  
                  {/* Scanning metrics labels */}
                  <text x="50" y="93" textAnchor="middle" fill="#00d2ff" fontSize="3.5" fontFamily="monospace" opacity="0.75">CELLULOSE_DENSITY: 100%</text>
                  <text x="50" y="8" textAnchor="middle" fill="var(--gold)" fontSize="3.5" fontFamily="monospace" opacity="0.75">SUSHUMNA_PASSAGE: CLEAR</text>
                </svg>

                {/* Laser Scanning Bar */}
                <motion.div
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    width: '2px',
                    background: 'linear-gradient(to bottom, transparent, #fff, #00d2ff, transparent)',
                    boxShadow: '0 0 12px #00d2ff, 0 0 24px #00d2ff',
                    opacity: 0.9,
                    zIndex: 2
                  }}
                  animate={{ left: ['5%', '95%', '5%'] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Tech floating telemetry */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  fontFamily: 'monospace',
                  fontSize: '8px',
                  color: '#00d2ff',
                  background: 'rgba(0,0,0,0.72)',
                  border: '1px solid rgba(0, 210, 255, 0.25)',
                  padding: '3px 6px',
                  borderRadius: '3px'
                }}>
                  SCAN_FREQ: 432Hz
                </div>

                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                  fontFamily: 'monospace',
                  fontSize: '8px',
                  color: 'var(--gold-lt)',
                  background: 'rgba(0,0,0,0.72)',
                  border: '1px solid rgba(196,154,60,0.25)',
                  padding: '3px 6px',
                  borderRadius: '3px'
                }}>
                  MUKHI_CHECK: PASS
                </div>
              </div>

              {/* Technical readout grid - styled with zero empty boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" style={{ fontSize: '11.5px', color: 'rgba(255,253,248,0.75)' }}>
                <div style={{ background: 'rgba(0,0,0,0.25)', padding: '12px', borderRadius: '8px', borderLeft: '3px solid var(--gold)', border: '1px solid rgba(196,154,60,0.08)' }}>
                  <strong style={{ color: 'var(--gold-lt)', display: 'block', marginBottom: '3px' }}>✦ Radiographic Imaging</strong>
                  Identifies internal seed cavities to confirm structural integrity, weeding out hollow or glued fakes.
                </div>
                <div style={{ background: 'rgba(0,0,0,0.25)', padding: '12px', borderRadius: '8px', borderLeft: '3px solid var(--gold)', border: '1px solid rgba(196,154,60,0.08)' }}>
                  <strong style={{ color: 'var(--gold-lt)', display: 'block', marginBottom: '3px' }}>✦ Density Calibration</strong>
                  Ensures perfect weight-to-volume ratio, guaranteeing natural oil deposits and decades of durability.
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: CLEANSE */}
          {activeStep === 'cleanse' && (
            <motion.div
              key="cleanse"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              {/* Sacred Purifying Liquid and Fluid Dynamics */}
              <div style={{
                position: 'relative',
                height: '180px',
                background: 'rgba(0,0,0,0.55)',
                borderRadius: 'var(--r-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                border: '1px solid rgba(196,154,60,0.18)'
              }}>
                {/* Auric blue-gold radial gradient */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle at center, rgba(196,154,60,0.05) 0%, transparent 80%)'
                }} />

                {/* Floating Rudraksha in a sacred copper immersion bowl */}
                <div className="relative flex items-center justify-center">
                  
                  {/* Floating Bead Avatar */}
                  <motion.div
                    style={{
                      width: '68px',
                      height: '68px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, #3a2213 0%, #1c0e06 100%)',
                      border: '2.2px solid var(--gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px',
                      color: 'var(--gold-lt)',
                      position: 'relative',
                      zIndex: 3,
                      boxShadow: '0 0 24px rgba(196,154,60,0.45)'
                    }}
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 3, -3, 0]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    ॐ
                  </motion.div>

                  {/* Circling fluid rings */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      width: '100px',
                      height: '35px',
                      borderRadius: '50%',
                      border: '1.2px solid rgba(196, 154, 60, 0.4)',
                      zIndex: 2,
                      transform: 'rotateX(70deg)'
                    }}
                    animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.1, 0.6] }}
                    transition={{ duration: 2.2, repeat: Infinity }}
                  />
                  
                  <motion.div
                    style={{
                      position: 'absolute',
                      width: '120px',
                      height: '42px',
                      borderRadius: '50%',
                      border: '1px dashed rgba(0, 210, 255, 0.3)',
                      zIndex: 1,
                      transform: 'rotateX(70deg)'
                    }}
                    animate={{ scale: [1.2, 0.95, 1.2], opacity: [0.2, 0.7, 0.2] }}
                    transition={{ duration: 2.8, repeat: Infinity }}
                  />
                </div>

                {/* Flowing liquid wave overlay */}
                <motion.div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '40px',
                    background: 'linear-gradient(to top, rgba(196, 154, 60, 0.15) 0%, transparent 100%)',
                    zIndex: 4
                  }}
                  animate={{ height: ['35px', '45px', '35px'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Bubbles rising up */}
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    style={{
                      position: 'absolute',
                      width: `${3 + (i % 3) * 2}px`,
                      height: `${3 + (i % 3) * 2}px`,
                      borderRadius: '50%',
                      background: i % 2 === 0 ? 'rgba(196,154,60,0.5)' : 'rgba(0,210,255,0.4)',
                      bottom: '4px',
                      left: `${8 + i * 9.5}%`,
                      filter: 'blur(0.4px)'
                    }}
                    animate={{
                      y: [-8, -120],
                      opacity: [0, 0.75, 0]
                    }}
                    transition={{
                      duration: 1.6 + (i % 3) * 0.4,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: 'easeOut'
                    }}
                  />
                ))}

                {/* Sacred ingredient telemetry overlay */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  fontFamily: 'monospace',
                  fontSize: '8px',
                  color: 'var(--gold-lt)',
                  background: 'rgba(0,0,0,0.72)',
                  border: '1px solid rgba(196,154,60,0.25)',
                  padding: '3px 6px',
                  borderRadius: '3px'
                }}>
                  PURITY_STABILIZER: ACTIVE
                </div>
              </div>

              {/* Technical description block */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" style={{ fontSize: '11.5px', color: 'rgba(255,253,248,0.75)' }}>
                <div style={{ background: 'rgba(0,0,0,0.25)', padding: '12px', borderRadius: '8px', borderLeft: '3px solid var(--gold)', border: '1px solid rgba(196,154,60,0.08)' }}>
                  <strong style={{ color: 'var(--gold-lt)', display: 'block', marginBottom: '3px' }}>✦ Herbal Purification</strong>
                  Bathed in rich copper-pot Gangajal and pure Panchgavya ingredients to completely purge negative residual vibrations.
                </div>
                <div style={{ background: 'rgba(0,0,0,0.25)', padding: '12px', borderRadius: '8px', borderLeft: '3px solid var(--gold)', border: '1px solid rgba(196,154,60,0.08)' }}>
                  <strong style={{ color: 'var(--gold-lt)', display: 'block', marginBottom: '3px' }}>✦ Oil Preservation</strong>
                  Dressed lightly with highly aromatic sandalwood and mustard oil extract to seal moisture, preventing dryness.
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: ENERGIZE */}
          {activeStep === 'energize' && (
            <motion.div
              key="energize"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              {/* Sacred Sanskrit Consecration Mandala */}
              <div style={{
                position: 'relative',
                height: '180px',
                background: 'rgba(0,0,0,0.55)',
                borderRadius: 'var(--r-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                border: '1px solid rgba(196,154,60,0.18)'
              }}>
                {/* Star-particle canvas in background */}
                <ParticleCanvas count={36} color="rgba(196, 154, 60, " style={{ opacity: 0.85 }} />

                {/* Golden rotating Sanskrit mantra wheels */}
                <motion.svg 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                  viewBox="0 0 100 100" 
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.25, pointerEvents: 'none' }}
                >
                  {/* Concentric rings */}
                  <circle cx="50" cy="50" r="44" stroke="var(--gold)" strokeWidth="0.4" fill="none" />
                  <circle cx="50" cy="50" r="36" stroke="var(--gold)" strokeWidth="0.3" fill="none" strokeDasharray="3 1" />
                  <circle cx="50" cy="50" r="28" stroke="var(--gold)" strokeWidth="0.4" fill="none" />
                  
                  {/* Rays of blessing */}
                  {[...Array(12)].map((_, i) => {
                    const angle = (i * 360) / 12;
                    const rad = (angle * Math.PI) / 180;
                    return (
                      <line
                        key={i}
                        x1="50"
                        y1="50"
                        x2={50 + 44 * Math.cos(rad)}
                        y2={50 + 44 * Math.sin(rad)}
                        stroke="var(--gold)"
                        strokeWidth="0.25"
                        opacity="0.35"
                      />
                    );
                  })}
                </motion.svg>

                <motion.svg 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
                  viewBox="0 0 100 100" 
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15, pointerEvents: 'none' }}
                >
                  <circle cx="50" cy="50" r="40" stroke="var(--gold)" strokeWidth="0.3" fill="none" strokeDasharray="1 2" />
                </motion.svg>

                {/* Radiating central seed */}
                <motion.div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(196,154,60,0.5) 0%, transparent 75%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                    color: 'var(--gold)',
                    fontWeight: 'bold',
                    position: 'relative',
                    zIndex: 2,
                    textShadow: '0 0 16px rgba(196,154,60,0.95)'
                  }}
                  animate={{
                    scale: [0.95, 1.1, 0.95],
                    boxShadow: [
                      '0 0 12px rgba(196,154,60,0.2)',
                      '0 0 28px rgba(196,154,60,0.6)',
                      '0 0 12px rgba(196,154,60,0.2)'
                    ]
                  }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  ॐ
                </motion.div>

                {/* Prana Pratishta tag */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  fontFamily: 'monospace',
                  fontSize: '8px',
                  color: 'var(--gold-lt)',
                  background: 'rgba(0,0,0,0.72)',
                  border: '1px solid rgba(196,154,60,0.25)',
                  padding: '3px 6px',
                  borderRadius: '3px'
                }}>
                  PRANAPRATISHTHA CONSECRATED
                </div>
              </div>

              {/* Technical description block */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" style={{ fontSize: '11.5px', color: 'rgba(255,253,248,0.75)' }}>
                <div style={{ background: 'rgba(0,0,0,0.25)', padding: '12px', borderRadius: '8px', borderLeft: '3px solid var(--gold)', border: '1px solid rgba(196,154,60,0.08)' }}>
                  <strong style={{ color: 'var(--gold-lt)', display: 'block', marginBottom: '3px' }}>✦ Authentic Consecration</strong>
                  Conducted by scholarly Vedic priests chanting precise Beej Mantras corresponding to each bead's governing deity.
                </div>
                <div style={{ background: 'rgba(0,0,0,0.25)', padding: '12px', borderRadius: '8px', borderLeft: '3px solid var(--gold)', border: '1px solid rgba(196,154,60,0.08)' }}>
                  <strong style={{ color: 'var(--gold-lt)', display: 'block', marginBottom: '3px' }}>✦ Customized Sankalpa</strong>
                  Performed with custom prayers incorporating your specific name, birth gotra, and planetary alignment requests.
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
