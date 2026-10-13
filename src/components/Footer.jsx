import React, { useState, useEffect } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [collapsibles, setCollapsibles] = useState({
    collections: false,
    services: false
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSection = (section) => {
    if (isMobile) {
      setCollapsibles(prev => ({
        ...prev,
        [section]: !prev[section]
      }));
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: 'linear-gradient(180deg, #1E130C 0%, #0A0604 100%)',
      borderTop: '1px solid rgba(196, 154, 60, 0.28)',
      padding: isMobile ? '48px 16px calc(24px + 90px)' : '64px 20px calc(32px + 56px)',
      color: 'rgba(255, 253, 248, 0.85)',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Main Section */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          gap: isMobile ? '32px' : '40px',
          marginBottom: '48px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '40px'
        }}>
          
          {/* Column 1: Brand Info */}
          <div style={{
            flex: '1.2',
            display: 'flex',
            flexDirection: 'column',
            alignItems: isMobile ? 'center' : 'flex-start',
            textAlign: isMobile ? 'center' : 'left',
            gap: '16px'
          }}>
            <p style={{ fontSize: '12px', color: 'rgba(255, 253, 248, 0.65)', lineHeight: '1.65', margin: 0, maxWidth: isMobile ? '400px' : 'none' }}>
              The global authority on authentic, certified Rudraksha beads. Helping seekers align their inner energy through pure Vedic wisdom since 2001.
            </p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '4px' }}>
              {/* Instagram */}
              <a href="#" aria-label="Instagram" style={{ color: 'var(--gold)', opacity: 0.75, transition: 'opacity 0.2s' }}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              {/* YouTube */}
              <a href="#" aria-label="YouTube" style={{ color: 'var(--gold)', opacity: 0.75, transition: 'opacity 0.2s' }}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
              </a>
              {/* WhatsApp */}
              <a href="https://wa.me/919867291461" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" style={{ color: 'var(--gold)', opacity: 0.75, transition: 'opacity 0.2s' }}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Collections Accordion */}
          <div style={{
            flex: '1',
            borderBottom: isMobile ? '1px solid rgba(255,255,255,0.05)' : 'none',
            paddingBottom: isMobile ? '16px' : '0'
          }}>
            <button 
              onClick={() => toggleSection('collections')}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                padding: 0,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: isMobile ? 'pointer' : 'default',
                outline: 'none',
                textAlign: 'left'
              }}
            >
              <h4 style={{ fontSize: '13px', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0, fontWeight: '600' }}>Collections</h4>
              {isMobile && (
                <span style={{ color: 'var(--gold)', fontSize: '14px', transition: 'transform 0.2s', transform: collapsibles.collections ? 'rotate(45deg)' : 'none' }}>+</span>
              )}
            </button>
            <div style={{
              display: (!isMobile || collapsibles.collections) ? 'block' : 'none',
              marginTop: '16px'
            }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px' }}>
                <li><a href="#s12" style={{ color: 'rgba(255,253,248,0.7)', textDecoration: 'none' }}>Rarest Creations</a></li>
                <li><a href="#s-siddha-mala" style={{ color: 'rgba(255,253,248,0.7)', textDecoration: 'none' }}>Siddha Mala™ Flagship</a></li>
                <li><a href="#s13" style={{ color: 'rgba(255,253,248,0.7)', textDecoration: 'none' }}>Collector Combinations</a></li>
                <li><a href="#s14" style={{ color: 'rgba(255,253,248,0.7)', textDecoration: 'none' }}>Sacred Yantras</a></li>
              </ul>
            </div>
          </div>

          {/* Column 3: Services Accordion */}
          <div style={{
            flex: '1',
            borderBottom: isMobile ? '1px solid rgba(255,255,255,0.05)' : 'none',
            paddingBottom: isMobile ? '16px' : '0'
          }}>
            <button 
              onClick={() => toggleSection('services')}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                padding: 0,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: isMobile ? 'pointer' : 'default',
                outline: 'none',
                textAlign: 'left'
              }}
            >
              <h4 style={{ fontSize: '13px', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0, fontWeight: '600' }}>Services</h4>
              {isMobile && (
                <span style={{ color: 'var(--gold)', fontSize: '14px', transition: 'transform 0.2s', transform: collapsibles.services ? 'rotate(45deg)' : 'none' }}>+</span>
              )}
            </button>
            <div style={{
              display: (!isMobile || collapsibles.services) ? 'block' : 'none',
              marginTop: '16px'
            }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px' }}>
                <li><a href="#s8" style={{ color: 'rgba(255,253,248,0.7)', textDecoration: 'none' }}>ACE Energization Process</a></li>
                <li><a href="#s10" style={{ color: 'rgba(255,253,248,0.7)', textDecoration: 'none' }}>Vedic Astrological Pujas</a></li>
                <li><a href="#s7" style={{ color: 'rgba(255,253,248,0.7)', textDecoration: 'none' }}>Free Bead Recommendation</a></li>
                <li><a href="#s16" style={{ color: 'rgba(255,253,248,0.7)', textDecoration: 'none' }}>Lab Certificate Verification</a></li>
              </ul>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div style={{
            flex: '1.2',
            textAlign: isMobile ? 'center' : 'left',
            display: 'flex',
            flexDirection: 'column',
            alignItems: isMobile ? 'center' : 'flex-start'
          }}>
            <h4 style={{ fontSize: '13px', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px', fontWeight: '600', margin: '0 0 12px 0' }}>Vedic Almanac</h4>
            <p style={{ fontSize: '12px', color: 'rgba(255, 253, 248, 0.65)', lineHeight: '1.5', marginBottom: '14px', margin: '0 0 12px 0', maxWidth: isMobile ? '400px' : 'none' }}>
              Receive recommendations, auspicious dates, and insights directly from our pundits.
            </p>
            {subscribed ? (
              <div style={{ width: '100%', boxSizing: 'border-box', fontSize: '12px', color: 'var(--gold)', background: 'rgba(196,154,60,0.08)', padding: '10px', borderRadius: '6px', textAlign: 'center', border: '1px solid rgba(196,154,60,0.2)' }}>
                ✓ Joined the Vedic Almanac
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '6px', width: '100%', maxWidth: '320px' }}>
                <input 
                  id="newsletter-email-input"
                  name="email"
                  type="email" 
                  autoComplete="email"
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    flex: 1,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    color: '#fff',
                    fontSize: '12px',
                    outline: 'none',
                    transition: 'border-color 0.3s',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}
                />
                <button 
                  type="submit"
                  style={{
                    background: 'var(--gold)',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '8px 16px',
                    color: 'var(--black)',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'opacity 0.2s',
                    flexShrink: 0
                  }}
                >
                  Join
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Middle: Premium styled Trust Badges */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: isMobile ? '12px' : '16px',
          marginBottom: '40px'
        }}>
          {[
            {
              icon: <path d="M9 11l3 3L22 4M21 12a9 9 0 11-18 0 9 9 0 0115.6-6" />,
              title: '7-Day Easy Returns',
              desc: 'Risk-free selection guarantee.'
            },
            {
              icon: <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />,
              title: 'Worldwide Shipping',
              desc: 'Insured transit to your doorstep.'
            },
            {
              icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
              title: 'ISO Certified Lab Verification',
              desc: 'Every bead independently certified.'
            },
            {
              icon: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />,
              title: 'Tamper-Proof Sourcing',
              desc: 'Sourced directly and ethically.'
            }
          ].map((item, idx) => (
            <div key={idx} style={{
              background: 'rgba(255, 253, 248, 0.02)',
              border: '1px solid rgba(196, 154, 60, 0.14)',
              borderRadius: '8px',
              padding: isMobile ? '12px 14px' : '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span style={{ color: 'var(--gold)', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {item.icon}
                </svg>
              </span>
              <div>
                <h5 style={{ margin: 0, fontSize: '12px', fontWeight: '700', color: '#fff', marginBottom: '1px' }}>{item.title}</h5>
                <p style={{ margin: 0, fontSize: '11px', color: 'rgba(255,253,248,0.5)', lineHeight: 1.3 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar: Copyright, ISO, Back to Top */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'center' : 'center',
          flexDirection: isMobile ? 'column-reverse' : 'row',
          textAlign: isMobile ? 'center' : 'left',
          gap: '20px'
        }}>
          <div>
            <p style={{ fontSize: '11px', color: 'rgba(255, 253, 248, 0.45)', margin: 0, lineHeight: '1.6' }}>
              © {new Date().getFullYear()} All Rights Reserved. ISO 9001:2015 Accredited.
            </p>
            <p style={{ fontSize: '10px', color: 'rgba(255, 253, 248, 0.35)', margin: '6px 0 0 0', lineHeight: '1.45', maxWidth: isMobile ? '320px' : 'none' }}>
              Vedic descriptions are for spiritual guidance. Actual results may vary based on individual alignment.
            </p>
          </div>
          <button 
            onClick={scrollToTop}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--gold)',
              transition: 'all 0.2s',
              outline: 'none',
              marginBottom: isMobile ? '8px' : '0'
            }}
            aria-label="Back to top"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>
        </div>

      </div>
    </footer>
  );
}
