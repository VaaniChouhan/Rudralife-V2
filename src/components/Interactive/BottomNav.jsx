import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navItems = [
  { id: 'home', targetId: 's1' },
  { id: 'guidance', targetId: 's4' },
  { id: 'collections', targetId: 's-siddha-mala' },
  { id: 'rare', targetId: 's12' },
  { id: 'account', targetId: 's22' }
];

const icons = {
  home: (isActive) => (
    <svg viewBox="0 0 24 24" width="22" height="22" style={{ transition: 'all 0.3s ease' }}>
      {isActive ? (
        <path d="M12 3L2 12h3v8h14v-8h3L12 3z" fill="#FFFFFF" />
      ) : (
        <>
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="9 22 9 12 15 12 15 22" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
    </svg>
  ),
  guidance: (isActive) => (
    <svg viewBox="0 0 24 24" width="22" height="22" style={{ transition: 'all 0.3s ease' }}>
      {isActive ? (
        <>
          <circle cx="12" cy="12" r="10" fill="none" stroke="#FFFFFF" strokeWidth="2.5" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="#FFFFFF" />
        </>
      ) : (
        <>
          <circle cx="12" cy="12" r="10" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" />
        </>
      )}
    </svg>
  ),
  collections: (isActive) => (
    <svg viewBox="0 0 24 24" width="22" height="22" style={{ transition: 'all 0.3s ease' }}>
      {isActive ? (
        <>
          <rect x="3" y="3" width="7" height="7" fill="#FFFFFF" />
          <rect x="14" y="3" width="7" height="7" fill="#FFFFFF" />
          <rect x="14" y="14" width="7" height="7" fill="#FFFFFF" />
          <rect x="3" y="14" width="7" height="7" fill="#FFFFFF" />
        </>
      ) : (
        <>
          <rect x="3" y="3" width="7" height="7" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" />
          <rect x="14" y="3" width="7" height="7" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" />
          <rect x="14" y="14" width="7" height="7" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" />
          <rect x="3" y="14" width="7" height="7" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" />
        </>
      )}
    </svg>
  ),
  rare: (isActive) => (
    <svg viewBox="0 0 24 24" width="22" height="22" style={{ transition: 'all 0.3s ease' }}>
      {isActive ? (
        <>
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" stroke="#FFFFFF" strokeWidth="2" fill="#FFFFFF" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" stroke="#FFFFFF" strokeWidth="2" fill="#FFFFFF" />
          <path d="M4 22h16" stroke="#FFFFFF" strokeWidth="2" />
          <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" stroke="#FFFFFF" strokeWidth="2" />
          <path d="M12 2a6 6 0 0 1 6 6v3a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8a6 6 0 0 1 6-6z" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="2" />
        </>
      ) : (
        <>
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" />
          <path d="M4 22h16" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" />
          <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" />
          <path d="M12 2a6 6 0 0 1 6 6v3a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8a6 6 0 0 1 6-6z" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" />
        </>
      )}
    </svg>
  ),
  account: (isActive) => (
    <svg viewBox="0 0 24 24" width="22" height="22" style={{ transition: 'all 0.3s ease' }}>
      {isActive ? (
        <>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" fill="#FFFFFF" />
          <circle cx="12" cy="7" r="4" fill="#FFFFFF" />
        </>
      ) : (
        <>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" />
          <circle cx="12" cy="7" r="4" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" />
        </>
      )}
    </svg>
  )
};

export default function BottomNav({ activeTab, setActiveTab }) {
  const [isMobile, setIsMobile] = useState(false);
  const activeIndex = navItems.findIndex((item) => item.id === activeTab);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleTabClick = (itemId, targetId) => {
    setActiveTab(itemId);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isMobile) return null;

  return (
    <>
      {/* Hidden Liquid Goo SVG Filter Matrix */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="liquid-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Floating Bottom Nav Container Dock */}
      <nav 
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3500,
          width: '92vw',
          maxWidth: '430px',
          borderRadius: '40px',
          userSelect: 'none',
          background: 'rgba(18, 22, 28, 0.45)',
          backdropFilter: 'blur(20px) saturate(160%)',
          WebkitBackdropFilter: 'blur(20px) saturate(160%)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.5), inset 0px 1px 1px rgba(255, 255, 255, 0.1)',
          padding: '8px 8px calc(8px + env(safe-area-inset-bottom, 0px)) 8px',
          height: 'calc(60px + env(safe-area-inset-bottom, 0px))',
          boxSizing: 'border-box'
        }}
      >
        {/* Layer 1: Liquid Gooey Indicator Background Track */}
        <div 
          style={{ 
            position: 'absolute',
            inset: 0,
            borderRadius: '40px',
            overflow: 'hidden',
            pointerEvents: 'none',
            filter: 'url(#liquid-goo)',
            padding: '8px 8px calc(8px + env(safe-area-inset-bottom, 0px)) 8px',
            boxSizing: 'border-box'
          }}
        >
          {/* Static liquid gooey anchors at each tab coordinate */}
          {navItems.map((_, idx) => (
            <div
              key={`anchor-${idx}`}
              style={{
                position: 'absolute',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                opacity: 0.15,
                width: '12px',
                height: '12px',
                top: '24px',
                left: `calc(${idx * 20}% + (20% - 12px)/2)`
              }}
            />
          ))}

          {/* Active indicator gooey bubble tracker (translucent capsule matching reference) */}
          {activeIndex !== -1 && (
            <motion.div
              style={{
                position: 'absolute',
                borderRadius: '24px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                width: 'calc(20% - 8px)',
                height: '44px',
                top: '8px'
              }}
              animate={{
                left: `calc(${activeIndex * 20}% + 4px)`
              }}
              transition={{
                type: 'spring',
                stiffness: 380,
                damping: 30
              }}
            />
          )}
        </div>

        {/* Layer 2: Interactive Tabs Grid */}
        <div 
          style={{ 
            position: 'absolute',
            inset: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 10,
            padding: '8px 8px calc(8px + env(safe-area-inset-bottom, 0px)) 8px',
            boxSizing: 'border-box'
          }}
        >
          {navItems.map((item) => {
            const isActive = item.id === activeTab;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id, item.targetId)}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  minWidth: '48px',
                  minHeight: '48px',
                  position: 'relative',
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  cursor: 'pointer',
                  color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.45)',
                  textDecoration: 'none',
                  WebkitTapHighlightColor: 'transparent',
                  touchAction: 'manipulation',
                  padding: 0,
                  boxSizing: 'border-box'
                }}
              >
                {/* Minimal line-art icon */}
                <div 
                  style={{
                    transition: 'all 0.3s ease',
                    transform: isActive ? 'scale(1.08)' : 'scale(1)',
                    color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.45)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {icons[item.id](isActive)}
                </div>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
