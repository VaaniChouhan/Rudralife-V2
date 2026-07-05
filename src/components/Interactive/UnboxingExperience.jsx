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
      background: 'var(--dark-gradient)',
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
        {/* Horizontal scrollable items selector spanned across all columns at the top */}
        <div className="lg:col-span-12">
          <div className="unboxing-selector-scroll" style={{
            display: 'flex',
            gap: '10px',
            overflowX: 'auto',
            width: '100%',
            paddingBottom: '8px',
            marginBottom: '16px',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch'
          }}>
            {packageItems.map(item => {
              const isSelected = item.id === selectedItemId;
              return (
                <button
                  key={item.id}
                  onClick={() => { setSelectedItemId(item.id); setIsOpen(true); }}
                  style={{
                    background: isSelected ? 'var(--gold)' : 'rgba(255,253,248,0.03)',
                    border: isSelected ? '1px solid var(--gold)' : '1px solid rgba(196,154,60,0.18)',
                    borderRadius: '30px',
                    padding: '8px 18px',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    touchAction: 'manipulation',
                    flexShrink: 0,
                    minHeight: '44px'
                  }}
                >
                  <span style={{ fontSize: '16px' }}>{item.icon}</span>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: isSelected ? '700' : '600',
                    color: isSelected ? 'var(--black)' : 'rgba(255,253,248,0.85)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap'
                  }}>
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

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
            {/* Elegant Teak Box Product Image */}
            <div style={{
              position: 'relative',
              height: '200px',
              background: 'rgba(0, 0, 0, 0.45)',
              border: '1px solid rgba(196,154,60,0.15)',
              borderRadius: 'var(--r-md)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img src="/unboxing_teak_box.jpg" alt="Premium Teak Wooden Casket" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(18, 13, 11, 0.85)',
                border: '1px solid rgba(196,154,60,0.3)',
                borderRadius: '20px',
                padding: '4px 12px',
                fontSize: '9px',
                color: 'var(--gold)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                fontWeight: '600',
                backdropFilter: 'blur(4px)'
              }}>
                Teak Consecration Casket
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Content (Columns 6-12) */}
        <div className="lg:col-span-7 flex flex-col justify-between">

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

                {/* Accessory Image and Specs Detail */}
                <div style={{
                  marginTop: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(196,154,60,0.12)',
                  borderRadius: '12px',
                  padding: '12px',
                  overflow: 'hidden'
                }}>
                  <div style={{ width: '72px', height: '72px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, border: '1px solid rgba(196,154,60,0.2)' }}>
                    <img 
                      src={`/unboxing_${activeItem.id}.jpg`} 
                      alt={activeItem.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                    />
                  </div>
                  <div style={{ flex: 1, fontSize: '11.5px', color: 'rgba(255,253,248,0.75)', lineHeight: 1.45 }}>
                    {activeItem.id === 'certificate' && <span><strong>Lab-verified X-Ray readout</strong> mapped with absolute physical integrity. Certificate of purity included.</span>}
                    {activeItem.id === 'puja' && <span><strong>Pranapratishtha Consecration Certificate</strong> signed by our officiating Vedic priest.</span>}
                    {activeItem.id === 'guide' && <span><strong>Detailed handbook</strong> containing exact scriptural Wearing rules and Sanskrit mantras.</span>}
                    {activeItem.id === 'gangajal' && <span><strong>Glass vial of pure Gangajal</strong> sourced directly from Gangotri for initial purification.</span>}
                    {activeItem.id === 'oil' && <span><strong>Conditioning oil</strong> extracted from pure Sandalwood to protect natural wood fibers.</span>}
                    {activeItem.id === 'brush' && <span><strong>Soft organic cleaning brush</strong> to keep the bead's deep furrows clean and dust-free.</span>}
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
