import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const books = [
  {
    id: 1,
    title: "Rudra Mantra — The Bead of the Gods",
    author: "Isha Khandelwal",
    role: "Senior Vedic Researcher",
    coverColor: 'linear-gradient(135deg, #1C3322 0%, #0A1C10 100%)', // Emerald Green
    accentColor: '#4ADE80',
    pages: '284 pages',
    published: 'Vedic Press, 2024',
    bgImage: 'https://images.unsplash.com/photo-1474932430478-367db26836c1?auto=format&fit=crop&w=600&q=80',
    desc: 'The definitive scriptural guide exploring the mystical origin of individual Mukhi beads, correct Vedic seed mantra pronunciation, and structural guidelines for crafting high-power energized combinations.'
  },
  {
    id: 2,
    title: "Spiritual Journey with Rudraksha",
    author: "Kiran Mehta",
    role: "Founding Advisor, Rudralife",
    coverColor: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)', // Dark Navy Blue
    accentColor: '#38BDF8',
    pages: '312 pages',
    published: 'Spiritual Lotus Publishing, 2023',
    bgImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
    desc: 'An inspiring first-person memoir detailing over three decades of global research. Includes detailed personal case studies of corporate leaders, sports stars, and everyday seekers experiencing profound life alignment.'
  },
  {
    id: 3,
    title: "The Power of Rudraksha",
    author: "Vedic Research Team",
    role: "RRTL Science Division",
    coverColor: 'linear-gradient(135deg, #451A03 0%, #1C0A00 100%)', // Rich Mahogany Wood
    accentColor: '#F59E0B',
    pages: '196 pages',
    published: 'RRTL Scientific Reports, 2025',
    bgImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    desc: 'Marrying ancient Vedic knowledge with modern lab analysis. Explores physical parameters of authentic beads, non-destructive X-Ray scan identification methodologies, and the electromagnetic properties of Nepali trees.'
  },
  {
    id: 4,
    title: "Living With Shiva — A Devotee's Guide",
    author: "Rudralife Publications",
    role: "Temple Consecration Board",
    coverColor: 'linear-gradient(135deg, #4C0519 0%, #1C0006 100%)', // Deep Burgundy Red
    accentColor: '#F43F5E',
    pages: '240 pages',
    published: 'Rudralife Press, 2024',
    bgImage: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=600&q=80',
    desc: 'A beautiful devotion manual guiding devotees through morning Abhishek rituals, chanting standard Shiva Sahasranama with rudraksha malas, and setting up sacred home altar spaces for meditation.'
  }
];

export default function BestsellingBooksStack() {
  const [stack, setStack] = useState(books);

  // Move the top card (the last element in the array) to the back of the stack
  const cycleCard = () => {
    setStack((prev) => {
      const nextStack = [...prev];
      const topCard = nextStack.pop();
      return [topCard, ...nextStack];
    });
  };

  const cycleCardBackward = () => {
    setStack((prev) => {
      const nextStack = [...prev];
      const bottomCard = nextStack.shift();
      return [...nextStack, bottomCard];
    });
  };

  const handleDragEnd = (event, info) => {
    // If swiped significantly left or right, trigger cycle
    if (Math.abs(info.offset.x) > 100) {
      cycleCard();
    }
  };

  // Top card is the last item in our state array
  const topCard = stack[stack.length - 1];

  return (
    <div className="bestselling-books-wrapper" style={{
      maxWidth: '850px',
      margin: '28px auto 0',
      position: 'relative'
    }}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left Side: 3D-like Stack Deck (Cols 1-6) */}
        <div className="md:col-span-6 flex flex-col items-center justify-center" style={{ height: '360px', position: 'relative' }}>
          
          {/* Card Deck container */}
          <div style={{ position: 'relative', width: '230px', height: '320px' }}>
            <AnimatePresence>
              {stack.map((book, index) => {
                const isTop = index === stack.length - 1;
                
                // Card stack physical transformations (stacked looking down-left)
                let zIndex = index;
                let scale = 1;
                let yOffset = 0;
                let xOffset = 0;
                let rotate = 0;
                let opacity = 1;

                if (!isTop) {
                  scale = 1 - (stack.length - 1 - index) * 0.06;
                  yOffset = (stack.length - 1 - index) * 14;
                  xOffset = (stack.length - 1 - index) * 12;
                  rotate = (stack.length - 1 - index) * -2.5;
                  opacity = index < stack.length - 3 ? 0 : 0.85;
                }

                return (
                  <motion.div
                    key={book.id}
                    drag={isTop ? 'x' : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={handleDragEnd}
                    animate={{
                      scale,
                      y: yOffset,
                      x: xOffset,
                      rotate,
                      opacity,
                      zIndex
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 25
                    }}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      background: book.coverColor,
                      border: '1.5px solid rgba(196,154,60,0.4)',
                      borderRadius: '8px 16px 16px 8px', // Hardcover book round edge
                      boxShadow: isTop ? '0 20px 40px rgba(0,0,0,0.65), 0 0 0 1px rgba(196,154,60,0.2)' : '0 8px 16px rgba(0,0,0,0.4)',
                      overflow: 'hidden',
                      cursor: isTop ? 'grab' : 'default',
                      touchAction: 'none'
                    }}
                    whileDrag={isTop ? { scale: 1.04, cursor: 'grabbing' } : {}}
                  >
                    {/* Cover art background image with premium overlay */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url(${book.bgImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      opacity: 0.35,
                      mixBlendMode: 'overlay'
                    }} />

                    {/* Leather texture grain overlay */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'radial-gradient(circle, transparent 20%, rgba(0,0,0,0.4) 100%)',
                      pointerEvents: 'none',
                      zIndex: 1
                    }} />

                    {/* Gold Foil Embossed Inner Border */}
                    <div style={{
                      position: 'absolute',
                      inset: '12px',
                      border: '1.5px solid rgba(196,154,60,0.4)',
                      borderRadius: '6px',
                      pointerEvents: 'none',
                      zIndex: 2
                    }} />

                    {/* Hardcover book spine simulator */}
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '18px',
                      background: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 40%, rgba(255,255,255,0.15) 75%, rgba(0,0,0,0.3) 100%)',
                      borderRight: '1px solid rgba(255,255,255,0.06)',
                      zIndex: 3
                    }} />

                    {/* Real Physical Page Sheets simulation on right edge */}
                    <div style={{
                      position: 'absolute',
                      right: '1px',
                      top: '6px',
                      bottom: '6px',
                      width: '4px',
                      background: 'linear-gradient(to right, #e2e2e2, #fbfbfb 50%, #dcdcdc)',
                      borderRadius: '1px',
                      boxShadow: 'inset 0 0 2px rgba(0,0,0,0.2)',
                      zIndex: 3
                    }} />

                    {/* Cover Text */}
                    <div style={{
                      position: 'relative',
                      height: '100%',
                      padding: '26px 20px 24px 32px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      color: '#fff',
                      zIndex: 4
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: '18px', color: 'var(--gold)', textShadow: '0 0 4px rgba(196,154,60,0.5)' }}>ॐ</span>
                        <span style={{ fontSize: '8px', textTransform: 'uppercase', color: 'rgba(255,253,248,0.7)', letterSpacing: '0.12em', fontWeight: 'bold' }}>
                          Vedic Library
                        </span>
                      </div>

                      <div style={{ margin: '14px 0' }}>
                        <h4 style={{
                          fontFamily: 'Cormorant Garamond, serif',
                          fontSize: '19px',
                          fontWeight: 'bold',
                          lineHeight: 1.25,
                          color: '#fff',
                          textShadow: '0 2px 6px rgba(0,0,0,0.8)',
                          marginBottom: '8px'
                        }}>
                          {book.title}
                        </h4>
                        <div style={{ width: '36px', height: '1.5px', background: 'var(--gold)', margin: '10px 0', boxShadow: '0 1px 3px rgba(0,0,0,0.5)' }} />
                        <span style={{ fontSize: '10.5px', color: 'rgba(255,253,248,0.9)', letterSpacing: '0.03em', fontWeight: '500', textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>
                          by {book.author}
                        </span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '8.5px', color: 'var(--gold)', background: 'rgba(196,154,60,0.25)', border: '1px solid rgba(196,154,60,0.5)', padding: '2px 8px', borderRadius: '4px', fontWeight: '600' }}>
                          {book.pages}
                        </span>
                        {isTop && (
                          <span style={{ fontSize: '8.5px', color: 'rgba(255,253,248,0.55)', letterSpacing: '0.08em', fontWeight: '600' }}>
                            ◀ SWIPE ▶
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Swipe indicator helper text */}
          <p style={{ fontSize: '10.5px', color: 'rgba(26,18,9,0.5)', marginTop: '22px', textAlign: 'center', fontWeight: '600', letterSpacing: '0.04em' }}>
            💡 Swipe left/right on cover, or use buttons below
          </p>
        </div>

        {/* Right Side: Active Book Metadata & Details (Cols 7-12) */}
        <div className="md:col-span-6 flex flex-col justify-between" style={{ minHeight: '320px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #1C1613 0%, #120D0B 100%)',
            border: '1px solid rgba(196, 154, 60, 0.22)',
            borderRadius: 'var(--r-md)',
            padding: '24px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={topCard.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{
                      background: 'rgba(196,154,60,0.12)',
                      border: '1px solid rgba(196,154,60,0.25)',
                      borderRadius: '4px',
                      padding: '2px 8px',
                      fontSize: '8px',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      color: 'var(--gold)'
                    }}>
                      Bestselling Research Volume
                    </span>
                    <span style={{ fontSize: '10.5px', color: 'rgba(255,253,248,0.5)' }}>
                      {topCard.published}
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '24px',
                    fontWeight: '600',
                    color: '#fff',
                    lineHeight: 1.25,
                    margin: '6px 0 2px'
                  }}>
                    {topCard.title}
                  </h3>
                  
                  <p style={{ fontSize: '12px', color: 'var(--gold-lt)', fontWeight: '600', margin: '0 0 14px' }}>
                    ✍ Written by: {topCard.author} <span style={{ color: 'rgba(255,253,248,0.4)', fontWeight: 'normal', fontSize: '11px' }}>({topCard.role})</span>
                  </p>

                  <p style={{ fontSize: '12px', color: 'rgba(255,253,248,0.75)', lineHeight: 1.55, margin: 0 }}>
                    {topCard.desc}
                  </p>
                </div>

                <div style={{
                  marginTop: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid rgba(196,154,60,0.1)',
                  paddingTop: '12px'
                }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={cycleCardBackward}
                      style={{
                        background: 'rgba(255,253,248,0.03)',
                        border: '1px solid rgba(196,154,60,0.2)',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        color: 'var(--gold)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.style.background = 'rgba(196,154,60,0.08)'}
                      onMouseLeave={(e) => e.target.style.background = 'rgba(255,253,248,0.03)'}
                    >
                      ◀
                    </button>
                    <button
                      onClick={cycleCard}
                      style={{
                        background: 'rgba(255,253,248,0.03)',
                        border: '1px solid rgba(196,154,60,0.2)',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        color: 'var(--gold)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.style.background = 'rgba(196,154,60,0.08)'}
                      onMouseLeave={(e) => e.target.style.background = 'rgba(255,253,248,0.03)'}
                    >
                      ▶
                    </button>
                  </div>

                  <a
                    href="https://wa.me/919867291461"
                    target="_blank"
                    style={{
                      background: 'var(--gold)',
                      color: 'var(--black)',
                      textDecoration: 'none',
                      fontSize: '11px',
                      fontWeight: '600',
                      padding: '6px 14px',
                      borderRadius: '4px',
                      boxShadow: '0 2px 8px rgba(196,154,60,0.3)',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
                    onMouseLeave={(e) => e.target.style.transform = 'none'}
                  >
                    Get Free PDF Copy
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
