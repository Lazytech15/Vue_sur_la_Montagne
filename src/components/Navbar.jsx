import { useState, useEffect } from 'react';
import { Menu, X, Phone, ArrowUp } from 'lucide-react';
import logo from "../../public/circle_logo.png";

const navLinks = [
  { label: 'Home',     href: '#home'     },
  { label: 'Rooms',    href: '#rooms'    },
  { label: 'Services', href: '#services' },
  { label: 'Gallery',  href: '#gallery'  },
  { label: 'About',    href: '#about'    },
  { label: 'Contact',  href: '#contact'  },
];

const scrollToBooking = (e) => {
  e.preventDefault();
  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
};

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [showTop,   setShowTop]   = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    if (document.getElementById('navbar-keyframes')) return;
    const s = document.createElement('style');
    s.id = 'navbar-keyframes';
    s.textContent = `
      @keyframes floatPill {
        0%, 100% { transform: translateY(0px); }
        50%       { transform: translateY(-3px); }
      }
      @keyframes topBtnIn {
        from { opacity: 0; transform: translateY(12px) scale(0.8); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
      }
      @keyframes topBtnFloat {
        0%, 100% { transform: translateY(0px); }
        50%       { transform: translateY(-3px); }
      }
      @keyframes mobileMenuIn {
        from { opacity: 0; transform: translateX(-100%); }
        to   { opacity: 1; transform: translateX(0); }
      }
    `;
    document.head.appendChild(s);
  }, []);

  const close = () => setMenuOpen(false);

  return (
    <>
      {/* ── Floating nav bar ──────────────────────────────────────── */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 50, display: 'flex', justifyContent: 'center',
        padding: scrolled ? '12px 20px' : '0px',
        transition: 'padding 0.55s cubic-bezier(0.4,0,0.2,1)',
        pointerEvents: 'none',
      }}>
        <nav style={{
          width: '100%',
          pointerEvents: 'auto',
          display: 'flex',
          flexDirection: 'column',
          background: scrolled ? 'rgba(27, 54, 93, 0.80)' : 'transparent',
          backdropFilter: scrolled ? 'blur(18px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none',
          border: scrolled
            ? '1px solid rgba(220, 203, 181, 0.15)'
            : '1px solid transparent',
          borderRadius: scrolled ? '9999px' : '0px',
          boxShadow: scrolled
            ? '0 8px 40px rgba(10,20,50,0.55), 0 2px 12px rgba(10,20,50,0.30)'
            : 'none',
          // NO overflow:hidden — that clips the mobile menu when pill
          overflow: 'visible',
          transition: [
            'background 0.55s cubic-bezier(0.4,0,0.2,1)',
            'border-radius 0.55s cubic-bezier(0.4,0,0.2,1)',
            'box-shadow 0.55s cubic-bezier(0.4,0,0.2,1)',
            'border-color 0.55s cubic-bezier(0.4,0,0.2,1)',
          ].join(', '),
          animation: scrolled ? 'floatPill 5s ease-in-out infinite' : 'none',
        }}>
          {/* Inner row */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: scrolled ? '8px 20px' : '16px 40px',
            transition: 'padding 0.55s cubic-bezier(0.4,0,0.2,1)',
          }}>
            {/* Logo */}
            <a href="#home" className="flex items-center gap-3 group" style={{ textDecoration: 'none' }}>
              <img src={logo} alt="Rizal Hotel logo"
                style={{ width: '70px', height: '70px', borderRadius: '9999px', objectFit: 'cover' }}
              />
              <div className="flex flex-col leading-none">
                <span className="text-xs tracking-[0.35em] uppercase group-hover:opacity-80 transition-opacity"
                  style={{ fontFamily: 'Cinzel, serif', color: '#DCCBB5' }}>
                  Vue sur la Montagne
                </span>
                <span className={`font-light italic tracking-wide transition-all duration-500 ${scrolled ? 'text-xl' : 'text-2xl'}`}
                  style={{ fontFamily: 'Playfair Display, serif', color: '#F5F0E8' }}>
                  Hotel
                </span>
              </div>
            </a>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <a key={link.label} href={link.href}
                  className="border-anim text-sm tracking-widest uppercase pb-1 transition-colors"
                  style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(220,203,181,0.75)' }}
                  onMouseEnter={e => e.target.style.color = '#DCCBB5'}
                  onMouseLeave={e => e.target.style.color = 'rgba(220,203,181,0.75)'}>
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a href="tel:+63281234567" className="flex items-center gap-2 text-sm transition-colors"
                style={{ color: 'rgba(220,203,181,0.65)' }}>
                <Phone size={14}/>
                <span style={{ fontFamily: 'Lato, sans-serif' }}>+63 2 8123 4567</span>
              </a>
              <a href="#/admin"
                className="px-6 py-2.5 text-sm tracking-widest uppercase font-medium transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  fontFamily: 'Lato, sans-serif',
                  background: '#DCCBB5', color: '#1B365D',
                  borderRadius: scrolled ? '9999px' : '0px',
                  transition: 'background 0.3s, border-radius 0.55s cubic-bezier(0.4,0,0.2,1)',
                  textDecoration: 'none', display: 'inline-block',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#c9aa8e'}
                onMouseLeave={e => e.currentTarget.style.background = '#DCCBB5'}>
                Login
              </a>
            </div>

            {/* Mobile hamburger */}
            <button className="lg:hidden transition-colors"
              style={{ color: '#DCCBB5', background: 'none', border: 'none', cursor: 'pointer' }}
              onClick={() => setMenuOpen(true)}>
              <Menu size={24}/>
            </button>
          </div>
        </nav>
      </div>

      {/* ── Mobile menu — full-screen slide-in drawer, fully outside nav ── */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div onClick={close} style={{
            position: 'fixed', inset: 0, background: 'rgba(10,20,40,0.55)',
            zIndex: 200, backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)',
          }}/>

          {/* Drawer panel */}
          <div style={{
            position: 'fixed', top: 0, left: 0, bottom: 0,
            width: 'min(300px, 85vw)',
            background: 'rgba(20, 40, 75, 0.97)',
            backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            zIndex: 201,
            display: 'flex', flexDirection: 'column',
            boxShadow: '4px 0 40px rgba(10,20,50,0.6)',
            animation: 'mobileMenuIn 0.3s cubic-bezier(0.4,0,0.2,1)',
          }}>
            {/* Drawer header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '20px 24px',
              borderBottom: '1px solid rgba(220,203,181,0.12)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <img src={logo} alt="logo" style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }}/>
                <div>
                  <div style={{ fontFamily: 'Cinzel,serif', fontSize: 9, color: '#DCCBB5', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
                    Vue sur la Montagne
                  </div>
                  <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 18, color: '#F5F0E8', fontStyle: 'italic' }}>
                    Hotel
                  </div>
                </div>
              </div>
              <button onClick={close}
                style={{ color: '#DCCBB5', background: 'rgba(220,203,181,0.08)', border: 'none',
                  cursor: 'pointer', padding: 8, borderRadius: '50%', display: 'flex', alignItems: 'center' }}>
                <X size={20}/>
              </button>
            </div>

            {/* Nav links */}
            <nav style={{ flex: 1, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {navLinks.map(link => (
                <a key={link.label} href={link.href} onClick={close}
                  style={{
                    display: 'block', padding: '14px 16px',
                    fontFamily: 'Lato,sans-serif', fontSize: 13,
                    letterSpacing: '0.22em', textTransform: 'uppercase',
                    color: 'rgba(220,203,181,0.85)', textDecoration: 'none',
                    borderRadius: 8, transition: 'background 0.15s, color 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background='rgba(220,203,181,0.08)'; e.currentTarget.style.color='#DCCBB5'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='rgba(220,203,181,0.85)'; }}>
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Bottom CTA */}
            <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(220,203,181,0.12)', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a href="#/admin" onClick={close}
                style={{
                  display: 'block', textAlign: 'center',
                  padding: '13px 24px',
                  fontFamily: 'Lato,sans-serif', fontSize: 12,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: '#1B365D', textDecoration: 'none',
                  background: '#DCCBB5', borderRadius: 4,
                  fontWeight: 600,
                }}>
                Login
              </a>
              <a href="#booking" onClick={(e) => { scrollToBooking(e); close(); }}
                style={{
                  display: 'block', textAlign: 'center',
                  padding: '13px 24px',
                  fontFamily: 'Lato,sans-serif', fontSize: 12,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: '#DCCBB5', textDecoration: 'none',
                  border: '1px solid rgba(220,203,181,0.35)', borderRadius: 4,
                }}>
                Reserve Your Stay
              </a>
            </div>
          </div>
        </>
      )}

      {/* ── Scroll-to-top button ── */}
      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          title="Back to top"
          style={{
            position: 'fixed', bottom: '32px', right: '28px', zIndex: 60,
            width: '44px', height: '44px', borderRadius: '9999px',
            background: '#DCCBB5', color: '#1B365D',
            border: '1px solid rgba(220,203,181,0.4)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 28px rgba(10,20,50,0.45), 0 2px 8px rgba(10,20,50,0.25)',
            animation: 'topBtnIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both, topBtnFloat 4s ease-in-out 0.35s infinite',
            transition: 'background 0.25s, transform 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background='#c9aa8e'; e.currentTarget.style.transform='translateY(-3px)'; }}
          onMouseLeave={e => { e.currentTarget.style.background='#DCCBB5'; e.currentTarget.style.transform='translateY(0)'; }}>
          <ArrowUp size={18}/>
        </button>
      )}
    </>
  );
}
