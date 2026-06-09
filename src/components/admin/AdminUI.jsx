import { TrendingUp, TrendingDown, Clock, CheckCircle2, RefreshCw, Check, XCircle } from 'lucide-react';
import { C, elev, STATUS_CONFIG } from './tokens';

const ICON_MAP = { Clock, CheckCircle2, RefreshCw, Check, XCircle };

/* ── Ripple effect helper ─────────────────────────────────────── */
function addRipple(e) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const r = document.createElement('span');
  const size = Math.max(rect.width, rect.height) * 2;
  r.style.cssText = `
    position:absolute;width:${size}px;height:${size}px;
    top:${e.clientY - rect.top - size/2}px;
    left:${e.clientX - rect.left - size/2}px;
    background:rgba(27,54,93,0.12);border-radius:50%;
    transform:scale(0);animation:ripple 0.5s linear;pointer-events:none;`;
  el.style.position = el.style.position || 'relative';
  el.style.overflow = 'hidden';
  el.appendChild(r);
  r.addEventListener('animationend', () => r.remove());
}

/* ── StatusBadge ──────────────────────────────────────────────── */
export function StatusBadge({ status, size = 'sm' }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  const Icon = ICON_MAP[cfg.icon];
  const pad = size === 'sm' ? '3px 10px' : '5px 14px';
  const fs  = size === 'sm' ? 11 : 12;
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap:5,
      background: cfg.bg, color: cfg.color,
      borderRadius: 20, padding: pad, fontSize: fs,
      fontFamily:'Roboto,Lato,sans-serif', fontWeight:500,
      letterSpacing:'0.02em', whiteSpace:'nowrap'
    }}>
      <Icon size={fs} /> {cfg.label}
    </span>
  );
}

/* ── Material Card — floating with elevation ──────────────────── */
export function Card({ children, style = {}, elevation = 2 }) {
  return (
    <div style={{
      background: C.surface,
      borderRadius: 16,
      boxShadow: elev[elevation],
      overflow: 'hidden',
      ...style
    }}>
      {children}
    </div>
  );
}

/* ── Stat Card — Material tonal container style ───────────────── */
export function StatCard({ label, value, sub, trend, icon: Icon, accent }) {
  const up = trend == null || trend >= 0;
  return (
    <div style={{
      background: C.surface,
      borderRadius: 20,
      boxShadow: elev[3],
      padding: '22px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      transition: 'box-shadow 0.2s, transform 0.2s',
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = elev[4]; e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = elev[3]; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
        {/* Tonal icon container */}
        <div style={{
          width: 48, height: 48, borderRadius: 14,
          background: `${accent}18`,
          display:'flex', alignItems:'center', justifyContent:'center'
        }}>
          <Icon size={22} color={accent} />
        </div>
        {trend !== undefined && (
          <span style={{
            fontSize: 11, fontFamily:'Roboto,sans-serif', fontWeight:500,
            color: up ? C.green : C.red,
            display:'flex', alignItems:'center', gap:3,
            background: up ? C.greenBg : C.redBg,
            borderRadius: 20, padding: '2px 8px'
          }}>
            {up ? <TrendingUp size={11}/> : <TrendingDown size={11}/>}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div>
        <div style={{
          fontSize: 30, fontWeight: 700,
          fontFamily: 'Playfair Display,serif',
          color: C.navy, lineHeight: 1, marginBottom: 4
        }}>{value}</div>
        <div style={{ fontSize: 11, color: C.onSurf, fontFamily:'Roboto,sans-serif',
          textTransform:'uppercase', letterSpacing:'0.08em', marginBottom: 2 }}>{label}</div>
        {sub && <div style={{ fontSize: 12, color: C.muted, fontFamily:'Roboto,sans-serif' }}>{sub}</div>}
      </div>
    </div>
  );
}

/* ── Loading Spinner ──────────────────────────────────────────── */
export function LoadingSpinner() {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:60, flexDirection:'column', gap:12 }}>
      <div style={{
        width: 40, height: 40,
        border: `3px solid ${C.containerLow}`,
        borderTopColor: C.navy, borderRadius: '50%',
        animation: 'spin 0.7s linear infinite'
      }}/>
      <span style={{ fontSize:13, color:C.muted, fontFamily:'Roboto,sans-serif' }}>Loading…</span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } @keyframes ripple { to { transform:scale(1); opacity:0; } }`}</style>
    </div>
  );
}

/* ── Error Banner ─────────────────────────────────────────────── */
export function ErrorBanner({ message, onRetry }) {
  return (
    <div style={{
      padding:'14px 18px', background: C.redBg,
      borderRadius: 12, color: C.red,
      fontFamily:'Roboto,sans-serif', fontSize: 13,
      display:'flex', justifyContent:'space-between', alignItems:'center',
      marginBottom: 16, boxShadow: elev[1]
    }}>
      <span>⚠ {message}</span>
      {onRetry && (
        <button onClick={onRetry} style={{
          fontSize: 12, color: C.red, background: 'none',
          border: `1px solid ${C.red}44`, borderRadius: 20,
          padding: '4px 12px', cursor: 'pointer', fontFamily:'Roboto,sans-serif'
        }}>
          Retry
        </button>
      )}
    </div>
  );
}
