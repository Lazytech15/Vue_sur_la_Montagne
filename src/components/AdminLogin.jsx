import { useState } from 'react';
import { BedDouble, Eye, EyeOff, Lock, User, AlertCircle, Zap } from 'lucide-react';

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

export default function AdminLogin({ onLogin }) {
  const [username,  setUsername]  = useState('');
  const [password,  setPassword]  = useState('');
  const [showPass,  setShowPass]  = useState(false);
  const [error,     setError]     = useState('');
  const [loading,   setLoading]   = useState(false);
  const [shake,     setShake]     = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 600));
    const ok = onLogin(username.trim(), password);
    if (!ok) {
      setError('Invalid username or password.');
      setLoading(false);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleQuickLogin = () => {
    onLogin('admin', 'admin123');
  };

  const inputStyle = (focused) => ({
    width: '100%',
    padding: '11px 14px 11px 40px',
    fontSize: 14,
    fontFamily: 'Lato, sans-serif',
    color: C.text,
    background: '#fff',
    border: `1px solid ${focused ? C.navy : C.border}`,
    borderRadius: 3,
    outline: 'none',
    transition: 'border-color 0.15s',
    boxSizing: 'border-box',
  });

  const [userFocused, setUserFocused] = useState(false);
  const [passFocused, setPassFocused] = useState(false);

  return (
    <div style={{
      minHeight: '100vh',
      background: C.cream,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      fontFamily: 'Lato, sans-serif',
    }}>
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `repeating-linear-gradient(
          0deg, transparent, transparent 39px,
          rgba(27,54,93,0.04) 39px, rgba(27,54,93,0.04) 40px
        )`,
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        width: '100%', maxWidth: 400,
        animation: shake ? 'shake 0.4s ease' : 'none',
      }}>
        {/* Logo block */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 4,
            background: C.navy, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 14px',
            boxShadow: '0 4px 20px rgba(27,54,93,0.25)',
          }}>
            <BedDouble size={22} color={C.sand} />
          </div>
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 24, fontWeight: 400,
            color: C.navy, margin: '0 0 4px',
          }}>
            Vue sur la Montagne
          </h1>
          <p style={{
            fontSize: 11, textTransform: 'uppercase',
            letterSpacing: '0.18em', color: C.muted, margin: 0,
          }}>
            Admin Portal
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: '#fff',
          border: `1px solid ${C.border}`,
          borderRadius: 4,
          padding: '32px 28px',
          boxShadow: '0 2px 24px rgba(27,54,93,0.08)',
        }}>
          <h2 style={{
            fontFamily: 'Lato, sans-serif', fontSize: 15,
            fontWeight: 700, color: C.text, margin: '0 0 24px',
            textAlign: 'center', letterSpacing: '0.02em',
          }}>
            Sign in to continue
          </h2>

          {error && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 12px', marginBottom: 20,
              background: C.redBg, border: `1px solid ${C.red}33`,
              borderRadius: 3, fontSize: 13, color: C.red,
            }}>
              <AlertCircle size={14} style={{ flexShrink: 0 }} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div style={{ marginBottom: 16, position: 'relative' }}>
              <label style={{
                display: 'block', fontSize: 10, textTransform: 'uppercase',
                letterSpacing: '0.1em', color: C.muted,
                marginBottom: 6, fontWeight: 700,
              }}>
                Username
              </label>
              <div style={{ position: 'relative' }}>
                <User size={14} color={userFocused ? C.navy : C.muted}
                  style={{ position: 'absolute', left: 13, top: '50%',
                    transform: 'translateY(-50%)', pointerEvents: 'none',
                    transition: 'color 0.15s' }} />
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  onFocus={() => setUserFocused(true)}
                  onBlur={() => setUserFocused(false)}
                  placeholder="Enter username"
                  required
                  autoComplete="username"
                  style={inputStyle(userFocused)}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: 24, position: 'relative' }}>
              <label style={{
                display: 'block', fontSize: 10, textTransform: 'uppercase',
                letterSpacing: '0.1em', color: C.muted,
                marginBottom: 6, fontWeight: 700,
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={14} color={passFocused ? C.navy : C.muted}
                  style={{ position: 'absolute', left: 13, top: '50%',
                    transform: 'translateY(-50%)', pointerEvents: 'none',
                    transition: 'color 0.15s' }} />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setPassFocused(true)}
                  onBlur={() => setPassFocused(false)}
                  placeholder="Enter password"
                  required
                  autoComplete="current-password"
                  style={{ ...inputStyle(passFocused), paddingRight: 42 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: 'absolute', right: 12, top: '50%',
                    transform: 'translateY(-50%)', background: 'none',
                    border: 'none', cursor: 'pointer', color: C.muted,
                    padding: 2, display: 'flex', alignItems: 'center',
                  }}
                >
                  {showPass ? <EyeOff size={15}/> : <Eye size={15}/>}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !username || !password}
              style={{
                width: '100%', padding: '12px',
                background: loading ? `${C.navy}aa` : C.navy,
                color: C.sand, border: 'none', borderRadius: 3,
                fontSize: 12, fontFamily: 'Lato, sans-serif',
                fontWeight: 700, letterSpacing: '0.12em',
                textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: 8,
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#152b4a'; }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.background = C.navy; }}
            >
              {loading ? (
                <>
                  <span style={{
                    width: 13, height: 13, border: `2px solid ${C.sand}44`,
                    borderTopColor: C.sand, borderRadius: '50%',
                    display: 'inline-block', animation: 'spin 0.7s linear infinite',
                  }} />
                  Signing in…
                </>
              ) : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display:'flex', alignItems:'center', gap:12, margin:'20px 0 0' }}>
            <div style={{ flex:1, height:1, background:C.border }}/>
            <span style={{ fontSize:11, color:C.muted, letterSpacing:'0.05em' }}>or</span>
            <div style={{ flex:1, height:1, background:C.border }}/>
          </div>

          {/* Quick Login */}
          <button
            onClick={handleQuickLogin}
            style={{
              width: '100%', marginTop: 14, padding: '11px',
              background: C.cream, color: C.navy,
              border: `1px solid ${C.border}`, borderRadius: 3,
              fontSize: 12, fontFamily: 'Lato, sans-serif',
              fontWeight: 700, letterSpacing: '0.08em',
              textTransform: 'uppercase', cursor: 'pointer',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 8,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = C.warm; e.currentTarget.style.borderColor = `${C.navy}44`; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.cream; e.currentTarget.style.borderColor = C.border; }}
          >
            <Zap size={13}/>
            Quick Login (Demo)
          </button>

          {/* Credentials hint */}
          <p style={{
            textAlign: 'center', marginTop: 10, fontSize: 11,
            color: C.muted, fontFamily: 'Lato, sans-serif',
          }}>
            admin / admin123
          </p>
        </div>

        {/* Back to site link */}
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <a href="#" style={{
            fontSize: 12, color: C.muted, textDecoration: 'none',
            fontFamily: 'Lato, sans-serif',
          }}
            onMouseEnter={e => e.currentTarget.style.color = C.navy}
            onMouseLeave={e => e.currentTarget.style.color = C.muted}
          >
            ← Back to resort website
          </a>
        </div>
      </div>

      <style>{`
        @keyframes spin  { to { transform: rotate(360deg); } }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%,60%  { transform: translateX(-8px); }
          40%,80%  { transform: translateX(8px); }
        }
      `}</style>
    </div>
  );
}
