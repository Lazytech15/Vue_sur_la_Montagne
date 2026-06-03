import { useState, useEffect } from 'react';
import { Menu, X, Phone, ArrowUp } from 'lucide-react';
import logo from "../../public/circle_logo.png";

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Rooms', href: '#rooms' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
    `;
    document.head.appendChild(s);
  }, []);

  return (
    <>
      {/* ── Outer wrapper: transitions from fixed full-width to centered pill ── */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          justifyContent: 'center',
          /* When at top: no padding so nav fills edge-to-edge */
          /* When scrolled: padding pulls it inward to form pill shape */
          padding: scrolled ? '12px 20px' : '0px',
          transition: 'padding 0.55s cubic-bezier(0.4,0,0.2,1)',
          pointerEvents: 'none',
        }}
      >
        <nav
          style={{
            width: '100%',
            pointerEvents: 'auto',
            display: 'flex',
            flexDirection: 'column',

            /* At top: square/flat transparent, full width */
            /* Scrolled: glass pill with shadow, floating */
            background: scrolled
              ? 'rgba(27, 54, 93, 0.80)'
              : 'transparent',
            backdropFilter: scrolled ? 'blur(18px)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none',
            border: scrolled
              ? '1px solid rgba(220, 203, 181, 0.15)'
              : '1px solid transparent',
            borderRadius: scrolled ? '9999px' : '0px',
            boxShadow: scrolled
              ? '0 8px 40px rgba(10, 20, 50, 0.55), 0 2px 12px rgba(10, 20, 50, 0.30)'
              : 'none',
            overflow: 'hidden',
            transition: [
              'background 0.55s cubic-bezier(0.4,0,0.2,1)',
              'border-radius 0.55s cubic-bezier(0.4,0,0.2,1)',
              'box-shadow 0.55s cubic-bezier(0.4,0,0.2,1)',
              'border-color 0.55s cubic-bezier(0.4,0,0.2,1)',
              'backdrop-filter 0.55s',
            ].join(', '),

            /* Floating animation only when pill */
            animation: scrolled ? 'floatPill 5s ease-in-out infinite' : 'none',
          }}
        >
          {/* ── Inner row ── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              /* At top: generous padding matching original; scrolled: tighter */
              padding: scrolled ? '8px 20px' : '16px 40px',
              transition: 'padding 0.55s cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            {/* Logo */}
            <a
              href="#home"
              className="flex items-center gap-3 group"
              style={{ textDecoration: 'none' }}
            >
              <img
                src={logo}
                alt="Rizal Hotel logo"
                style={{ width: '70px', height: '70px', borderRadius: '9999px', objectFit: 'cover' }}
              />
              <div className="flex flex-col leading-none">
                <span
                  className="text-xs tracking-[0.35em] uppercase group-hover:opacity-80 transition-opacity"
                  style={{ fontFamily: 'Cinzel, serif', color: '#DCCBB5' }}
                >
                  Vue sur la Montagne
                </span>
                <span
                  className={`font-light italic tracking-wide transition-all duration-500 ${scrolled ? 'text-xl' : 'text-2xl'}`}
                  style={{ fontFamily: 'Playfair Display, serif', color: '#F5F0E8' }}
                >
                  Hotel
                </span>
              </div>
            </a>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="border-anim text-sm tracking-widest uppercase pb-1 transition-colors"
                  style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(220,203,181,0.75)' }}
                  onMouseEnter={e => e.target.style.color = '#DCCBB5'}
                  onMouseLeave={e => e.target.style.color = 'rgba(220,203,181,0.75)'}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+63281234567"
                className="flex items-center gap-2 text-sm transition-colors"
                style={{ color: 'rgba(220,203,181,0.65)' }}
              >
                <Phone size={14} />
                <span style={{ fontFamily: 'Lato, sans-serif' }}>+63 2 8123 4567</span>
              </a>
              <a
                href="#booking"
                className="px-6 py-2.5 text-sm tracking-widest uppercase font-medium transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  fontFamily: 'Lato, sans-serif',
                  background: '#DCCBB5',
                  color: '#1B365D',
                  /* Pill shape on Book Now when scrolled too */
                  borderRadius: scrolled ? '9999px' : '0px',
                  transition: 'background 0.3s, border-radius 0.55s cubic-bezier(0.4,0,0.2,1)',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#c9aa8e'}
                onMouseLeave={e => e.currentTarget.style.background = '#DCCBB5'}
              >
                Book Now
              </a>
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden transition-colors"
              style={{ color: '#DCCBB5', background: 'none', border: 'none', cursor: 'pointer' }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu — only expands when NOT scrolled (pill) to avoid clipping */}
          <div
            className="lg:hidden"
            style={{
              maxHeight: menuOpen ? '400px' : '0',
              opacity: menuOpen ? 1 : 0,
              overflow: 'hidden',
              transition: 'max-height 0.45s ease, opacity 0.3s ease',
              background: 'rgba(27, 54, 93, 0.75)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              /* When scrolled, pill radius cuts into mobile menu — round bottom only */
              borderRadius: scrolled ? '0 0 32px 32px' : '0',
              transition: 'max-height 0.45s ease, opacity 0.3s ease, border-radius 0.55s cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm tracking-widest uppercase pb-4 border-b border-white/5 transition-colors"
                  style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(220,203,181,0.8)' }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#booking"
                onClick={() => setMenuOpen(false)}
                className="mt-2 px-6 py-3 text-sm tracking-widest uppercase text-center font-medium"
                style={{ background: '#DCCBB5', color: '#1B365D', fontFamily: 'Lato, sans-serif' }}
              >
                Book Now
              </a>
            </div>
          </div>
        </nav>
      </div>

      {/* ── Scroll-to-top button ── */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          title="Back to top"
          style={{
            position: 'fixed',
            bottom: '32px',
            right: '28px',
            zIndex: 60,
            width: '44px',
            height: '44px',
            borderRadius: '9999px',
            background: '#DCCBB5',
            color: '#1B365D',
            border: '1px solid rgba(220,203,181,0.4)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 28px rgba(10,20,50,0.45), 0 2px 8px rgba(10,20,50,0.25)',
            animation: 'topBtnIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both, topBtnFloat 4s ease-in-out 0.35s infinite',
            transition: 'background 0.25s, transform 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#c9aa8e'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#DCCBB5'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <ArrowUp size={18} />
        </button>
      )}
    </>
  );
}
