import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const packageItems = [
  {
    id: 'certificate',
    title: 'X-Ray Authenticity Certificate',
    short: 'Government-backed lab report',
    icon: '🔬',
    desc: 'Every single high-grade bead we ship is independently tested at the RRTL laboratory. Your package contains a physical, serial-numbered report containing an actual non-destructive X-Ray snapshot confirming the exact interior seed count and density compartments of your bead.',
    visual: 'xray'
  },
  {
    id: 'puja',
    title: 'Vedic Consecration Document',
    short: 'Personalized ritual blessing',
    icon: '📜',
    desc: 'A sacred document signed by the officiating Vedic Brahmin, detailing the specific Beej and Pranapratishtha mantras chanted for your bead. It certifies that the Abhishek and purification rituals were performed specifically under your name, Nakshatra, and Gotra.',
    visual: 'seal'
  },
  {
    id: 'guide',
    title: 'Care & Mantra Handbook',
    short: 'Scriptural wearing rules',
    icon: '📖',
    desc: 'An elegantly bound manual containing correct pronunciation guides for each Mukhi’s mantras, wearing rules (such as removing before sleeping or bathing), and ancient scriptural references detailing the physical, mental, and spiritual properties of your Rudraksha.',
    visual: 'book'
  },
  {
    id: 'gangajal',
    title: 'Holy Gangajal Vial',
    short: 'Copper-capped blessing water',
    icon: '💧',
    desc: 'A small, copper-capped vial containing absolute pure Gangajal water sourced directly from high-altitude Gangotri. This water is used for the initial home consecration ceremony, purifying the aura of the bead before placing it around your neck for the first time.',
    visual: 'vial'
  },
  {
    id: 'oil',
    title: 'Sandalwood conditioning oil',
    short: 'Fiber preservation essence',
    icon: '🧴',
    desc: 'Genuine Mysore Sandalwood oil sachet. Applying a minute drop of this holy conditioning oil once a month preserves the natural moisture inside the Rudraksha’s outer cellulose fibers, locking in its beautiful rich teak luster and preventing future surface micro-cracking.',
    visual: 'oil'
  },
  {
    id: 'brush',
    title: 'Soft Maintenance Brush',
    short: 'Cellulose fiber dusting tool',
    icon: '🧹',
    desc: 'A premium, soft-bristled physical cleaning brush. Regular, gentle cleaning with this brush keeps the deep furrows (Mukhis) of your bead completely free from environmental dust, preserving the pristine flow of physical skin contact and energy resonance.',
    visual: 'brush'
  }
];

export default function UnboxingExperience() {
  const [selectedItemId, setSelectedItemId] = useState('certificate');
  const [isOpen, setIsOpen] = useState(true);

  const activeItem = packageItems.find(item => item.id === selectedItemId);

  return (
    <div className="unboxing-container" style={{
      background: 'linear-gradient(135deg, #1C1613 0%, #120D0B 100%)',
      border: '1px solid rgba(196, 154, 60, 0.22)',
      borderRadius: 'var(--r-lg)',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.45)',
      marginTop: '28px'
    }}>
      {/* Decorative Golden Corner Frames */}
      <div style={{ position: 'absolute', top: '10px', left: '10px', width: '12px', height: '12px', borderTop: '2px solid var(--gold)', borderLeft: '2px solid var(--gold)', opacity: 0.5 }} />
      <div style={{ position: 'absolute', top: '10px', right: '10px', width: '12px', height: '12px', borderTop: '2px solid var(--gold)', borderRight: '2px solid var(--gold)', opacity: 0.5 }} />
      <div style={{ position: 'absolute', bottom: '10px', left: '10px', width: '12px', height: '12px', borderBottom: '2px solid var(--gold)', borderLeft: '2px solid var(--gold)', opacity: 0.5 }} />
      <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '12px', height: '12px', borderBottom: '2px solid var(--gold)', borderRight: '2px solid var(--gold)', opacity: 0.5 }} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        {/* Left Side: The Wooden Box Visualizer (Columns 1-5) */}
        <div className="lg:col-span-5 flex flex-col justify-between" style={{ minHeight: '340px' }}>
          <div>
            <h4 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--gold)', fontWeight: 600, margin: '0 0 4px' }}>
              ✦ Interactive Packaging Blueprint
            </h4>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '24px', fontWeight: '600', color: '#fff', margin: '0 0 12px' }}>
              The Premium Wooden Box
            </h3>
            <p style={{ fontSize: '11.5px', color: 'rgba(255,253,248,0.7)', lineHeight: 1.5, margin: '0 0 16px' }}>
              Every Rudraksha from Rudralife is shipped inside a custom-designed, lockable teak-finished wooden casket designed to protect the bead’s energy from outside contamination.
            </p>
          </div>

          {/* Elegant 3D-like Box Illustration */}
          <div style={{
            position: 'relative',
            height: '200px',
            background: 'rgba(0, 0, 0, 0.45)',
            border: '1px solid rgba(196,154,60,0.1)',
            borderRadius: 'var(--r-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            <div style={{ textAlign: 'center', position: 'relative' }}>
              {/* Box Lid */}
              <motion.div
                animate={{
                  y: isOpen ? -30 : 0,
                  rotateX: isOpen ? -45 : 0,
                  opacity: isOpen ? 0.8 : 1
                }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{
                  width: '130px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #4A3418, #2E1E0B)',
                  border: '1.5px solid var(--gold)',
                  borderRadius: '4px',
                  margin: '0 auto',
                  boxShadow: '0 -4px 12px rgba(0,0,0,0.5)',
                  transformOrigin: 'bottom',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--gold)' }} />
              </motion.div>

              {/* Box Base */}
              <div style={{
                width: '132px',
                height: '75px',
                background: 'linear-gradient(135deg, #3B2812, #1C1206)',
                border: '1.5px solid rgba(196,154,60,0.6)',
                borderTop: 'none',
                borderRadius: '0 0 6px 6px',
                position: 'relative',
                boxShadow: '0 8px 24px rgba(0,0,0,0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {/* Velvet interior lining showing glowing core when open */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{
                        position: 'absolute',
                        inset: '3px',
                        background: 'radial-gradient(circle, rgba(196,154,60,0.4) 0%, transparent 80%)',
                        zIndex: 1
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* Brass Lock accent */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '20px',
                  height: '18px',
                  background: 'var(--gold)',
                  borderBottomLeftRadius: '4px',
                  borderBottomRightRadius: '4px',
                  zIndex: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{ width: '4px', height: '6px', background: '#000', borderRadius: '1px' }} />
                </div>

                {/* Floating accessory item icon emerging from casket */}
                {isOpen && (
                  <motion.div
                    key={`floating-${selectedItemId}`}
                    initial={{ y: 15, opacity: 0, scale: 0.5 }}
                    animate={{ y: [-10, -26, -10], opacity: [0.85, 1, 0.85], scale: [0.95, 1.15, 0.95] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      position: 'absolute',
                      top: '-18px',
                      fontSize: '24px',
                      zIndex: 4,
                      filter: 'drop-shadow(0 0 4px var(--gold))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {activeItem.icon}
                  </motion.div>
                )}

                <div style={{ color: 'var(--gold)', fontSize: '20px', zIndex: 3, fontWeight: 'bold', opacity: isOpen ? 0.3 : 1 }}>ॐ</div>
              </div>

              {/* Item selection glowing line link indicator */}
              <div style={{
                position: 'absolute',
                top: '55%',
                left: '50%',
                width: '1px',
                height: '40px',
                background: 'linear-gradient(to bottom, var(--gold), transparent)',
                opacity: isOpen ? 0.35 : 0
              }} />
            </div>

            {/* Toggle open button overlay */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{
                position: 'absolute',
                bottom: '12px',
                background: 'rgba(0,0,0,0.6)',
                border: '1px solid rgba(196,154,60,0.4)',
                borderRadius: '20px',
                padding: '4px 12px',
                fontSize: '9.5px',
                color: 'var(--gold-lt)',
                cursor: 'pointer',
                fontWeight: '600',
                letterSpacing: '0.04em'
              }}
            >
              {isOpen ? 'Close Casket Lid' : 'Open Casket Lid'}
            </button>
          </div>
        </div>

        {/* Right Side: Interactive Content (Columns 6-12) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          {/* Package items grid selector */}
          <div className="grid grid-cols-3 gap-2" style={{ marginBottom: '16px' }}>
            {packageItems.map(item => {
              const isSelected = item.id === selectedItemId;
              return (
                <button
                  key={item.id}
                  onClick={() => { setSelectedItemId(item.id); setIsOpen(true); }}
                  style={{
                    background: isSelected ? 'rgba(196,154,60,0.12)' : 'rgba(255,253,248,0.02)',
                    border: isSelected ? '1px solid var(--gold)' : '1px solid rgba(196,154,60,0.12)',
                    borderRadius: 'var(--r-md)',
                    padding: '10px 6px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span style={{ fontSize: '18px' }}>{item.icon}</span>
                  <span style={{
                    fontSize: '9px',
                    fontWeight: isSelected ? '600' : '400',
                    color: isSelected ? 'var(--gold-lt)' : 'rgba(255,253,248,0.6)',
                    lineHeight: 1.15,
                    display: 'block'
                  }}>
                    {item.title.split(' ')[0]} {item.title.split(' ')[1] || ''}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Item Specs Display */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.35)',
            border: '1px solid rgba(196, 154, 60, 0.15)',
            borderRadius: 'var(--r-md)',
            padding: '20px',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '230px'
          }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '6px' }}>
                    <span style={{
                      background: 'rgba(196,154,60,0.12)',
                      border: '1px solid rgba(196,154,60,0.25)',
                      borderRadius: '4px',
                      padding: '2px 8px',
                      fontSize: '8.5px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      color: 'var(--gold)',
                      letterSpacing: '0.05em'
                    }}>
                      Authentic Included Accessory
                    </span>
                    <span style={{ fontSize: '11px', color: 'rgba(255,253,248,0.5)' }}>
                      {activeItem.short}
                    </span>
                  </div>

                  <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '18px', fontWeight: '600', color: '#fff', margin: '4px 0 8px' }}>
                    {activeItem.icon} {activeItem.title}
                  </h4>
                  <p style={{ fontSize: '12px', color: 'rgba(255,253,248,0.75)', lineHeight: 1.55, margin: 0 }}>
                    {activeItem.desc}
                  </p>
                </div>

                {/* Animated Graphic based on selected item */}
                <div style={{
                  marginTop: '16px',
                  background: 'rgba(0,0,0,0.25)',
                  borderRadius: '6px',
                  padding: '12px',
                  border: '1px solid rgba(196,154,60,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  {activeItem.visual === 'xray' && (
                    <>
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '4px',
                        background: '#0a101d',
                        border: '1px solid #1e3a8a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        position: 'relative'
                      }}>
                        {/* Glow blueprint circle */}
                        <div style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px dashed #00d2ff', opacity: 0.5, position: 'absolute', animation: 'spin 20s linear infinite' }} />
                        <span style={{ color: '#00d2ff', fontSize: '14px', zIndex: 2, fontWeight: 'bold', filter: 'drop-shadow(0 0 2px #00d2ff)' }}>☢</span>
                      </div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,253,248,0.7)' }}>
                        <strong>X-Ray scan readout</strong> maps 5 distinct interior seed compartments with 100% genuine structure.
                      </div>
                    </>
                  )}

                  {activeItem.visual === 'seal' && (
                    <>
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        background: 'rgba(196,154,60,0.1)',
                        border: '1px dashed var(--gold)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span style={{ color: 'var(--gold)', fontSize: '20px' }}>印</span>
                      </div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,253,248,0.7)' }}>
                        <strong>Holy Temple Seal of Consecration</strong> applied directly in red lacquer on the certificate wrapper.
                      </div>
                    </>
                  )}

                  {activeItem.visual === 'book' && (
                    <>
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '4px',
                        background: 'linear-gradient(135deg, #1A0F04, #3B2812)',
                        border: '1px solid var(--gold)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px'
                      }}>
                        📖
                      </div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,253,248,0.7)' }}>
                        <strong>Dynamic wearing guidelines</strong> translated into clear English and Hindi Sanskrit phonetics.
                      </div>
                    </>
                  )}

                  {activeItem.visual === 'vial' && (
                    <>
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '4px',
                        background: 'rgba(0,0,0,0.3)',
                        border: '1px solid #c49a3c',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        {/* Wave ripple */}
                        <motion.div
                          animate={{ y: [16, 12, 16] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '24px',
                            background: '#00d2ff',
                            opacity: 0.3
                          }}
                        />
                        <span style={{ fontSize: '18px', zIndex: 2 }}>💧</span>
                      </div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,253,248,0.7)' }}>
                        <strong>Gangotri-sourced water</strong> used for purification bath ceremony prior to first-time wearing.
                      </div>
                    </>
                  )}

                  {activeItem.visual === 'oil' && (
                    <>
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '4px',
                        background: 'rgba(196,154,60,0.1)',
                        border: '1px solid #c49a3c',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px'
                      }}>
                        🧴
                      </div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,253,248,0.7)' }}>
                        <strong>100% natural sandalwood conditioning extract</strong> locks-in moisture and prevents fiber breakdown.
                      </div>
                    </>
                  )}

                  {activeItem.visual === 'brush' && (
                    <>
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '4px',
                        background: 'rgba(0,0,0,0.3)',
                        border: '1px solid #888',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px'
                      }}>
                        🧹
                      </div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,253,248,0.7)' }}>
                        <strong>Anti-static physical cleaning brush</strong> reaches deep into micro-clefts to clean wood fibers.
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
