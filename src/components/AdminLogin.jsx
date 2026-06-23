import { useState, useEffect, useCallback } from 'react';
import {
  Eye, EyeOff, Lock, User, AlertCircle,
  Shield, CreditCard, ChevronRight, BedDouble,
  CalendarCheck, ArrowLeft, Briefcase, Users,
} from 'lucide-react';

// Gallery images for the left carousel
import slide1 from '../assets/gallery/Resort_Forest_Canopy_Suite.jpg';
import slide2 from '../assets/gallery/infinit_pool.jpeg';
import slide3 from '../assets/gallery/Tinipak_River_Spring.jpg';
import slide4 from '../assets/gallery/daraitan_summit.jpg';
import slide5 from '../assets/gallery/pililla_wind_mill.jpg';
import slide6 from '../assets/gallery/angono_binangonan_cave.jpg';

const SLIDES = [
  { src: slide1, caption: 'Forest Canopy Suite', sub: 'Where nature meets luxury' },
  { src: slide2, caption: 'Infinity Pool',        sub: 'Breathtaking panoramic views' },
  { src: slide3, caption: 'Tinipak River',        sub: 'Crystal clear spring waters' },
  { src: slide4, caption: 'Daraitan Summit',      sub: 'Adventure at every peak' },
  { src: slide5, caption: 'Pililla Windmills',    sub: 'Serenity in the highlands' },
  { src: slide6, caption: 'Angono Cave',          sub: 'Ancient wonders await' },
];

const C = {
  navy:   '#1B365D',
  sand:   '#DCCBB5',
  cream:  '#F5F0E8',
  warm:   '#EDE7D9',
  text:   '#333333',
  muted:  'rgba(51,51,51,0.5)',
  border: 'rgba(27,54,93,0.15)',
  red:    '#9b1c1c',
  redBg:  'rgba(155,28,28,0.07)',
};

// Internal company accounts — staff/back-office only, never shown on the guest tab
const STAFF_ACCOUNTS = [
  { role: 'superadmin', label: 'Super Admin', name: 'Rafael Santos',  username: 'superadmin', password: 'super123',   color: '#7C3AED', bg: 'rgba(124,58,237,0.08)',  border: 'rgba(124,58,237,0.25)', icon: Shield     },
  { role: 'admin',      label: 'Admin',       name: 'Maria Reyes',    username: 'admin',      password: 'admin123',   color: '#1B365D', bg: 'rgba(27,54,93,0.07)',   border: 'rgba(27,54,93,0.22)',  icon: User       },
  { role: 'cashier',    label: 'Cashier',     name: 'Juan dela Cruz', username: 'cashier',    password: 'cashier123', color: '#0F766E', bg: 'rgba(15,118,110,0.07)', border: 'rgba(15,118,110,0.25)',icon: CreditCard },
];

// Guest/client accounts — booking holders only, kept fully separate from staff accounts above
const CLIENT_ACCOUNTS = [
  { role: 'client', label: 'Client', name: 'Maria Santos', username: 'client', password: 'client123', color: '#B8860B', bg: 'rgba(184,134,11,0.08)', border: 'rgba(184,134,11,0.25)', icon: CalendarCheck },
];

export default function AdminLogin({ onLogin, onBack }) {
  const [username,    setUsername]    = useState('');
  const [password,    setPassword]    = useState('');
  const [showPass,    setShowPass]    = useState(false);
  const [error,       setError]       = useState('');
  const [loading,     setLoading]     = useState(false);
  const [shake,       setShake]       = useState(false);
  const [userFocused, setUserFocused] = useState(false);
  const [passFocused, setPassFocused] = useState(false);
  const [slide,       setSlide]       = useState(0);
  const [fading,      setFading]      = useState(false);
  const [loginTab,    setLoginTab]    = useState('staff'); // 'staff' | 'client'

  const ACTIVE_ACCOUNTS = loginTab === 'staff' ? STAFF_ACCOUNTS : CLIENT_ACCOUNTS;

  const handleBack = useCallback((e) => {
    e.preventDefault();
    if (onBack) onBack();
    else window.location.hash = '';
  }, [onBack]);

  const switchTab = (tab) => {
    if (tab === loginTab) return;
    setLoginTab(tab);
    setUsername(''); setPassword(''); setError('');
  };

  // Auto-advance carousel
  useEffect(() => {
    const t = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setSlide(s => (s + 1) % SLIDES.length);
        setFading(false);
      }, 600);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  const goSlide = useCallback((i) => {
    if (i === slide) return;
    setFading(true);
    setTimeout(() => { setSlide(i); setFading(false); }, 400);
  }, [slide]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    await new Promise(r => setTimeout(r, 600));
    const ok = onLogin(username.trim(), password);
    if (!ok) {
      setError('Invalid username or password.');
      setLoading(false);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const fillAccount = (acc) => {
    setUsername(acc.username);
    setPassword(acc.password);
    setError('');
  };

  const inputStyle = (focused) => ({
    width: '100%',
    padding: '12px 14px 12px 42px',
    fontSize: 14,
    fontFamily: 'Lato, sans-serif',
    color: C.text,
    background: '#fff',
    border: `1.5px solid ${focused ? C.navy : C.border}`,
    borderRadius: 2,
    outline: 'none',
    transition: 'border-color 0.15s',
    boxSizing: 'border-box',
  });

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      fontFamily: 'Lato, sans-serif',
      overflow: 'hidden',
    }}>
      {/* ── LEFT: Carousel ───────────────────────────────────────── */}
      <div style={{
        flex: '0 0 55%',
        position: 'relative',
        overflow: 'hidden',
        display: 'none',
      }}
        className="carousel-panel"
      >
        {/* Image */}
        <img
          key={slide}
          src={SLIDES[slide].src}
          alt={SLIDES[slide].caption}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            opacity: fading ? 0 : 1,
            transition: 'opacity 0.6s ease',
          }}
        />

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(10,20,40,0.85) 0%, rgba(10,20,40,0.3) 50%, rgba(10,20,40,0.15) 100%)',
        }} />

        {/* Top-left: brand */}
        <div style={{ position: 'absolute', top: 32, left: 36, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 3,
            background: C.navy, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(27,54,93,0.4)',
          }}>
            <BedDouble size={18} color={C.sand} />
          </div>
          <div>
            <div style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(220,203,181,0.7)', fontWeight: 700 }}>Vue sur la Montagne</div>
            <div style={{ fontSize: 16, fontFamily: 'Playfair Display, serif', color: C.sand, fontWeight: 400, marginTop: 1 }}>Admin Portal</div>
          </div>
        </div>

        {/* Back to site link */}
        <a
          href="#/"
          onClick={handleBack}
          style={{
            position: 'absolute', top: 36, right: 36,
            fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'rgba(220,203,181,0.6)', textDecoration: 'none',
            fontWeight: 700, transition: 'color 0.2s',
            display: 'flex', alignItems: 'center', gap: 6,
          }}
          onMouseEnter={e => e.currentTarget.style.color = C.sand}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(220,203,181,0.6)'}
        >
          <ArrowLeft size={12} /> Back to site
        </a>

        {/* Bottom caption */}
        <div style={{ position: 'absolute', bottom: 48, left: 36, right: 36 }}>
          <div style={{
            opacity: fading ? 0 : 1,
            transition: 'opacity 0.6s ease',
          }}>
            <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.sand, opacity: 0.7, margin: '0 0 6px', fontWeight: 700 }}>
              Our Property
            </p>
            <h2 style={{ fontSize: 28, fontFamily: 'Playfair Display, serif', color: '#fff', margin: '0 0 4px', fontWeight: 400 }}>
              {SLIDES[slide].caption}
            </h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', margin: 0 }}>
              {SLIDES[slide].sub}
            </p>
          </div>

          {/* Dots */}
          <div style={{ display: 'flex', gap: 6, marginTop: 20 }}>
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goSlide(i)}
                style={{
                  height: 3, width: i === slide ? 28 : 14,
                  borderRadius: 2,
                  background: i === slide ? C.sand : 'rgba(220,203,181,0.35)',
                  border: 'none', cursor: 'pointer', padding: 0,
                  transition: 'all 0.35s ease',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT: Login form ─────────────────────────────────────── */}
      <div style={{
        flex: 1,
        background: C.cream,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 40px',
        overflowY: 'auto',
        position: 'relative',
      }}>
        {/* Subtle grid */}
        <div style={{
          position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(27,54,93,0.04) 39px, rgba(27,54,93,0.04) 40px)`,
        }} />

        {/* Desktop-only: back to landing page, anchored to the form panel itself */}
        <a
          href="#/"
          onClick={handleBack}
          className="form-back-desktop"
          style={{
            position: 'absolute', top: 24, right: 32,
            display: 'none', alignItems: 'center', gap: 6,
            fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase',
            color: C.muted, textDecoration: 'none', fontWeight: 700,
            zIndex: 2, transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = C.navy}
          onMouseLeave={e => e.currentTarget.style.color = C.muted}
        >
          <ArrowLeft size={13} /> Back to landing page
        </a>

        {/* Mobile-only logo */}
        <div className="carousel-hide" style={{ textAlign: 'center', marginBottom: 28, position: 'relative', zIndex: 1 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 3,
            background: C.navy, display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 12px',
            boxShadow: '0 4px 20px rgba(27,54,93,0.25)',
          }}>
            <BedDouble size={20} color={C.sand} />
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 400, color: C.navy, margin: '0 0 3px' }}>
            Vue sur la Montagne
          </h1>
          <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.18em', color: C.muted, margin: 0 }}>Admin Portal</p>
        </div>

        {/* Form card */}
        <div style={{
          position: 'relative', zIndex: 1,
          width: '100%', maxWidth: 400,
          animation: shake ? 'shake 0.4s ease' : 'none',
        }}>
          {/* Header */}
          <div style={{ marginBottom: 22 }}>
            <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.sand, fontWeight: 700, margin: '0 0 6px' }}>
              {loginTab === 'staff' ? '— Staff Access' : '— Guest Access'}
            </p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 34, fontWeight: 400, color: C.navy, margin: '0 0 4px', lineHeight: 1.1 }}>
              Welcome
            </h2>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 34, fontWeight: 700, color: C.navy, margin: '0 0 10px', lineHeight: 1.1 }}>
              Back.
            </h2>
            <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>
              {loginTab === 'staff' ? 'Sign in to access your dashboard' : 'Track your booking, request changes & catch up on news'}
            </p>
          </div>

          {/* Tab switcher: Staff vs Client — these two account pools never mix */}
          <div style={{
            display: 'flex', gap: 4, marginBottom: 22,
            background: C.warm, borderRadius: 2, padding: 4,
          }}>
            <button type="button" onClick={() => switchTab('staff')}
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                padding: '9px 10px', border: 'none', borderRadius: 2, cursor: 'pointer',
                background: loginTab === 'staff' ? '#fff' : 'transparent',
                boxShadow: loginTab === 'staff' ? '0 1px 4px rgba(27,54,93,0.18)' : 'none',
                color: loginTab === 'staff' ? C.navy : C.muted,
                fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                fontFamily: 'Lato, sans-serif', transition: 'all 0.15s',
              }}>
              <Briefcase size={13} /> Staff
            </button>
            <button type="button" onClick={() => switchTab('client')}
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                padding: '9px 10px', border: 'none', borderRadius: 2, cursor: 'pointer',
                background: loginTab === 'client' ? '#fff' : 'transparent',
                boxShadow: loginTab === 'client' ? '0 1px 4px rgba(27,54,93,0.18)' : 'none',
                color: loginTab === 'client' ? C.navy : C.muted,
                fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                fontFamily: 'Lato, sans-serif', transition: 'all 0.15s',
              }}>
              <Users size={13} /> Client
            </button>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 12px', marginBottom: 20,
              background: C.redBg, border: `1px solid ${C.red}33`,
              borderRadius: 2, fontSize: 13, color: C.red,
            }}>
              <AlertCircle size={14} style={{ flexShrink: 0 }} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: C.muted, marginBottom: 6, fontWeight: 700 }}>
                Username
              </label>
              <div style={{ position: 'relative' }}>
                <User size={14} color={userFocused ? C.navy : C.muted}
                  style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', transition: 'color 0.15s' }} />
                <input
                  type="text" value={username}
                  onChange={e => setUsername(e.target.value)}
                  onFocus={() => setUserFocused(true)}
                  onBlur={() => setUserFocused(false)}
                  placeholder="Enter your username"
                  required autoComplete="username"
                  style={inputStyle(userFocused)}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: 28 }}>
              <label style={{ display: 'block', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: C.muted, marginBottom: 6, fontWeight: 700 }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={14} color={passFocused ? C.navy : C.muted}
                  style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', transition: 'color 0.15s' }} />
                <input
                  type={showPass ? 'text' : 'password'} value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setPassFocused(true)}
                  onBlur={() => setPassFocused(false)}
                  placeholder="Enter your password"
                  required autoComplete="current-password"
                  style={{ ...inputStyle(passFocused), paddingRight: 42 }}
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: C.muted, padding: 2, display: 'flex', alignItems: 'center' }}>
                  {showPass ? <EyeOff size={15}/> : <Eye size={15}/>}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !username || !password}
              style={{
                width: '100%', padding: '13px',
                background: loading ? `${C.navy}aa` : C.navy,
                color: C.sand, border: 'none', borderRadius: 2,
                fontSize: 11, fontFamily: 'Lato, sans-serif',
                fontWeight: 700, letterSpacing: '0.14em',
                textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#152b4a'; }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.background = C.navy; }}
            >
              {loading ? (
                <>
                  <span style={{ width: 13, height: 13, border: `2px solid ${C.sand}44`, borderTopColor: C.sand, borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                  Signing in…
                </>
              ) : (
                <>Sign In Securely <ChevronRight size={15}/></>
              )}
            </button>
          </form>

          {/* Demo accounts */}
          <div style={{ marginTop: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ flex: 1, height: 1, background: C.border }} />
              <span style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.14em', color: C.muted, fontWeight: 700, whiteSpace: 'nowrap' }}>
                {loginTab === 'staff' ? 'Demo Accounts — Click to Fill' : 'Demo Guest Account — Click to Fill'}
              </span>
              <div style={{ flex: 1, height: 1, background: C.border }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {ACTIVE_ACCOUNTS.map((acc) => {
                const Icon = acc.icon;
                const isSelected = username === acc.username;
                return (
                  <button key={acc.role} type="button" onClick={() => fillAccount(acc)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '10px 14px',
                      background: isSelected ? acc.bg : '#fff',
                      border: `1.5px solid ${isSelected ? acc.border : C.border}`,
                      borderRadius: 2, cursor: 'pointer', transition: 'all 0.15s', textAlign: 'left', width: '100%',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = acc.bg; e.currentTarget.style.borderColor = acc.border; }}
                    onMouseLeave={e => { if (!isSelected) { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = C.border; } }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: acc.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={14} color="#fff" />
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: C.text, fontFamily: 'Lato, sans-serif', lineHeight: 1.2 }}>{acc.name}</div>
                        <div style={{ fontSize: 11, color: C.muted, fontFamily: 'Lato, sans-serif', marginTop: 1 }}>{acc.username}</div>
                      </div>
                    </div>
                    <span style={{
                      fontSize: 9, fontWeight: 700, fontFamily: 'Lato, sans-serif',
                      textTransform: 'uppercase', letterSpacing: '0.1em',
                      color: acc.color, background: acc.bg, border: `1px solid ${acc.border}`,
                      padding: '3px 8px', borderRadius: 2, flexShrink: 0,
                    }}>{acc.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile back link */}
          <div className="carousel-hide" style={{ textAlign: 'center', marginTop: 24 }}>
            <a href="#/" onClick={handleBack} style={{ fontSize: 12, color: C.muted, textDecoration: 'none', fontFamily: 'Lato, sans-serif' }}
              onMouseEnter={e => e.currentTarget.style.color = C.navy}
              onMouseLeave={e => e.currentTarget.style.color = C.muted}>
              ← Back to resort website
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin  { to { transform: rotate(360deg); } }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%,60%  { transform: translateX(-8px); }
          40%,80%  { transform: translateX(8px); }
        }
        /* Show carousel panel on md+ screens */
        @media (min-width: 768px) {
          .carousel-panel { display: block !important; }
          .carousel-hide  { display: none !important; }
          .form-back-desktop { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
