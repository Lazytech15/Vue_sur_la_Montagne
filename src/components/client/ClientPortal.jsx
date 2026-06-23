import { useState, useCallback, useEffect, useRef } from 'react';
import {
  LayoutDashboard, CalendarDays, Megaphone, MessageSquareWarning,
  Bell, ChevronRight, BedDouble, LogOut, Menu, ChevronLeft,
  ChevronDown, User, Users as UsersIcon, Moon, Wallet,
  CheckCircle2, Clock, X, Send, Sparkles, Calendar,
} from 'lucide-react';

import { C, elev, fmt, fmtDate, STATUS_CONFIG } from '../admin/tokens';

/* ────────────────────────────────────────────────────────────────
   This portal is intentionally self-contained. It never imports
   or reads the company's bookings/guests/billing data store — it
   only knows about the bookings that belong to the signed-in
   guest. Staff (superadmin/admin/cashier) data is out of scope.
   ──────────────────────────────────────────────────────────────── */

// Mock booking history scoped to this guest only
const MY_BOOKINGS = [
  { id: 'BK-0041', room: 'Presidential Villa', checkIn: '2025-06-14', checkOut: '2025-06-17', guests: 4, nights: 3, status: 'confirmed', paid: true,  total: 114000, notes: 'Anniversary celebration. Flowers requested.' },
  { id: 'BK-0022', room: 'Deluxe Mountain View', checkIn: '2025-02-02', checkOut: '2025-02-04', guests: 2, nights: 2, status: 'completed', paid: true,  total: 17000,  notes: '' },
  { id: 'BK-0009', room: 'Garden Pavilion Room', checkIn: '2024-11-10', checkOut: '2024-11-11', guests: 1, nights: 1, status: 'completed', paid: true,  total: 7200,   notes: '' },
];

// Resort-issued news & updates — read-only feed for guests
const NEWS_ITEMS = [
  { id: 1, tag: 'Notice',  date: '2025-06-10', title: 'Pool maintenance schedule', body: 'The infinity pool will be closed for routine maintenance on weekday mornings, 8–10 AM, until further notice. We appreciate your patience.' },
  { id: 2, tag: 'Promo',   date: '2025-06-05', title: 'Extended stay discount', body: 'Book 4 nights or more this season and enjoy a complimentary breakfast for the whole party, plus a late checkout on request.' },
  { id: 3, tag: 'Update',  date: '2025-05-28', title: 'New shuttle schedule to Tinipak River', body: 'Our shuttle to Tinipak River Spring now departs hourly from 7 AM to 3 PM. Reserve a seat at the front desk or through your booking page.' },
  { id: 4, tag: 'Notice',  date: '2025-05-15', title: 'Typhoon-season flexible rebooking', body: 'Bookings affected by weather advisories may be rebooked free of charge within 30 days. Reach out any time through the Adjustments tab.' },
];

const ADJUSTMENT_TYPES = ['Date Change', 'Add Guest', 'Special Request', 'Cancellation'];

const NAV_ITEMS = [
  { id: 'overview',     label: 'Overview',      icon: LayoutDashboard },
  { id: 'bookings',     label: 'My Bookings',   icon: CalendarDays },
  { id: 'adjustments',  label: 'Adjustments',   icon: MessageSquareWarning },
  { id: 'news',         label: 'News & Updates',icon: Megaphone },
];

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const h = () => setWidth(window.innerWidth);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return width;
}

function daysUntil(dateStr) {
  const today = new Date(); today.setHours(0,0,0,0);
  const target = new Date(dateStr);
  return Math.round((target - today) / 86400000);
}

/* ── Status badge ─────────────────────────────────────────────── */
function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20,
      color: cfg.color, background: cfg.bg, textTransform: 'capitalize',
    }}>
      {status}
    </span>
  );
}

/* ── Profile dropdown ─────────────────────────────────────────── */
function ProfileDropdown({ session, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const name = session?.name || 'Guest';
  const initial = name[0].toUpperCase();

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button onClick={() => setOpen(o => !o)} style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: open ? C.container : C.surfaceVar,
        border: `1px solid ${open ? C.navy + '33' : C.border}`,
        borderRadius: 28, padding: '5px 12px 5px 6px',
        cursor: 'pointer', color: C.navy, boxShadow: open ? elev[2] : elev[1],
        transition: 'all 0.15s',
      }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#B8860B', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontSize: 12, color: '#fff', fontWeight: 700, fontFamily: 'Playfair Display,serif' }}>{initial}</span>
        </div>
        <span style={{ fontSize: 13, fontWeight: 600, fontFamily: 'Roboto,sans-serif', whiteSpace: 'nowrap' }}>{name}</span>
        <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', right: 0, minWidth: 220,
          background: C.surface, borderRadius: 16, boxShadow: elev[4],
          border: `1px solid ${C.border}`, overflow: 'hidden', zIndex: 100,
          animation: 'dropIn 0.18s cubic-bezier(.4,0,.2,1)',
        }}>
          <div style={{ padding: '16px 18px', borderBottom: `1px solid ${C.border}`, background: C.surfaceVar }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: '50%', background: '#B8860B', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: elev[2] }}>
                <span style={{ fontSize: 16, color: '#fff', fontWeight: 700, fontFamily: 'Playfair Display,serif' }}>{initial}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.navy, fontFamily: 'Roboto,sans-serif' }}>{name}</div>
                <div style={{ fontSize: 11, color: C.muted, fontFamily: 'Roboto,sans-serif', marginTop: 1 }}>Guest Account</div>
              </div>
            </div>
          </div>
          <div style={{ padding: '8px' }}>
            <button style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
              borderRadius: 10, background: 'none', border: 'none', cursor: 'pointer',
              color: C.onSurf, fontFamily: 'Roboto,sans-serif', fontSize: 13, fontWeight: 500,
            }}
              onMouseEnter={e => e.currentTarget.style.background = C.surfaceVar}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}>
              <User size={15} color={C.muted} /> My Profile
            </button>
            <div style={{ height: 1, background: C.border, margin: '4px 0' }} />
            <button onClick={() => { setOpen(false); onLogout(); }} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
              borderRadius: 10, background: 'none', border: 'none', cursor: 'pointer',
              color: '#BA1A1A', fontFamily: 'Roboto,sans-serif', fontSize: 13, fontWeight: 600,
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(186,26,26,0.07)'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}>
              <LogOut size={15} /> Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Overview ──────────────────────────────────────────────────── */
function OverviewView({ session, bookings, requests, onGo }) {
  const upcoming = bookings.find(b => ['confirmed','pending','ongoing'].includes(b.status));
  const completedCount = bookings.filter(b => b.status === 'completed').length;
  const pendingRequests = requests.filter(r => r.status === 'submitted').length;

  const cards = [
    { label: 'Next Stay', value: upcoming ? `${daysUntil(upcoming.checkIn)}d` : '—', sub: upcoming ? upcoming.room : 'No upcoming stays', icon: Calendar, color: C.blue, bg: C.blueBg },
    { label: 'Stays Completed', value: completedCount, sub: 'Lifetime visits', icon: CheckCircle2, color: C.green, bg: C.greenBg },
    { label: 'Pending Requests', value: pendingRequests, sub: 'Awaiting staff review', icon: Clock, color: C.amber, bg: C.amberBg },
  ];

  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <h1 style={{ fontFamily: 'Playfair Display,serif', fontSize: 24, color: C.navy, margin: 0 }}>
          Welcome back, {session?.name?.split(' ')[0] || 'Guest'}
        </h1>
        <p style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>Here's a snapshot of your stays with us.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 24 }}>
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <div key={i} style={{ background: C.surface, borderRadius: 16, padding: 18, boxShadow: elev[1] }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, color: C.muted, fontWeight: 600 }}>{c.label}</span>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={15} color={c.color} />
                </div>
              </div>
              <div style={{ fontSize: 26, fontWeight: 700, color: C.navy, marginTop: 8, fontFamily: 'Roboto,sans-serif' }}>{c.value}</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{c.sub}</div>
            </div>
          );
        })}
      </div>

      {upcoming && (
        <div style={{ background: C.surface, borderRadius: 16, padding: 20, boxShadow: elev[1], marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <h3 style={{ fontSize: 15, color: C.navy, fontWeight: 700, margin: 0 }}>Your Upcoming Stay</h3>
            <StatusBadge status={upcoming.status} />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
            <Info icon={BedDouble} label="Room" value={upcoming.room} />
            <Info icon={Calendar} label="Check-in" value={fmtDate(upcoming.checkIn)} />
            <Info icon={Calendar} label="Check-out" value={fmtDate(upcoming.checkOut)} />
            <Info icon={UsersIcon} label="Guests" value={upcoming.guests} />
            <Info icon={Wallet} label="Total" value={fmt(upcoming.total)} />
          </div>
          <button onClick={() => onGo('bookings')} style={{
            marginTop: 16, background: C.navy, color: '#fff', border: 'none', borderRadius: 24,
            padding: '9px 18px', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'inline-flex',
            alignItems: 'center', gap: 6,
          }}>
            View booking schedule <ChevronRight size={14} />
          </button>
        </div>
      )}

      <div style={{ background: C.surface, borderRadius: 16, padding: 20, boxShadow: elev[1] }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h3 style={{ fontSize: 15, color: C.navy, fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Sparkles size={15} color="#B8860B" /> Latest News
          </h3>
          <button onClick={() => onGo('news')} style={{ background: 'none', border: 'none', color: C.blue, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>See all</button>
        </div>
        {NEWS_ITEMS.slice(0, 2).map(n => (
          <div key={n.id} style={{ padding: '10px 0', borderTop: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{n.title}</div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{fmtDate(n.date)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Info({ icon: Icon, label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, minWidth: 110 }}>
      <Icon size={15} color={C.muted} style={{ marginTop: 1 }} />
      <div>
        <div style={{ fontSize: 11, color: C.muted }}>{label}</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{value}</div>
      </div>
    </div>
  );
}

/* ── My Bookings (schedule monitor) ───────────────────────────── */
function BookingsView({ bookings, onRequestAdjustment }) {
  return (
    <div>
      <h1 style={{ fontFamily: 'Playfair Display,serif', fontSize: 22, color: C.navy, margin: '0 0 4px' }}>My Booking Schedule</h1>
      <p style={{ fontSize: 13, color: C.muted, marginBottom: 20 }}>Monitor your past and upcoming stays. Need a change? Request an adjustment.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {bookings.map(b => (
          <div key={b.id} style={{ background: C.surface, borderRadius: 16, padding: 18, boxShadow: elev[1] }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontFamily: 'Roboto Mono,monospace', fontSize: 12, color: C.muted, fontWeight: 600 }}>{b.id}</span>
                <span style={{ fontSize: 15, fontWeight: 700, color: C.navy }}>{b.room}</span>
              </div>
              <StatusBadge status={b.status} />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginBottom: 12 }}>
              <Info icon={Calendar} label="Check-in" value={fmtDate(b.checkIn)} />
              <Info icon={Calendar} label="Check-out" value={fmtDate(b.checkOut)} />
              <Info icon={Moon} label="Nights" value={b.nights} />
              <Info icon={UsersIcon} label="Guests" value={b.guests} />
              <Info icon={Wallet} label="Total" value={fmt(b.total)} />
            </div>
            {b.notes && (
              <div style={{ fontSize: 12, color: C.onSurf, background: C.surfaceVar, padding: '8px 12px', borderRadius: 10, marginBottom: 12 }}>
                {b.notes}
              </div>
            )}
            {['confirmed','pending','ongoing'].includes(b.status) && (
              <button onClick={() => onRequestAdjustment(b)} style={{
                background: C.container, color: C.navy, border: 'none', borderRadius: 20,
                padding: '8px 16px', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}>
                <MessageSquareWarning size={14} /> Request Adjustment
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Adjustment requests ──────────────────────────────────────── */
function AdjustmentsView({ requests, onOpenNew }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4, flexWrap: 'wrap', gap: 10 }}>
        <h1 style={{ fontFamily: 'Playfair Display,serif', fontSize: 22, color: C.navy, margin: 0 }}>Adjustment Requests</h1>
        <button onClick={() => onOpenNew(null)} style={{
          background: C.navy, color: '#fff', border: 'none', borderRadius: 20,
          padding: '8px 16px', fontSize: 12, fontWeight: 700, cursor: 'pointer',
        }}>
          + New Request
        </button>
      </div>
      <p style={{ fontSize: 13, color: C.muted, marginBottom: 20 }}>Track the status of changes you've asked our staff to review.</p>

      {requests.length === 0 ? (
        <div style={{ background: C.surface, borderRadius: 16, padding: 30, textAlign: 'center', boxShadow: elev[1] }}>
          <MessageSquareWarning size={28} color={C.muted} style={{ marginBottom: 8 }} />
          <div style={{ fontSize: 13, color: C.muted }}>No adjustment requests yet.</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {requests.map(r => (
            <div key={r.id} style={{ background: C.surface, borderRadius: 14, padding: 16, boxShadow: elev[1] }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, flexWrap: 'wrap', gap: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.navy }}>{r.type} — {r.bookingId}</span>
                <span style={{
                  fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20,
                  color: r.status === 'submitted' ? C.amber : C.green,
                  background: r.status === 'submitted' ? C.amberBg : C.greenBg,
                  textTransform: 'capitalize',
                }}>{r.status}</span>
              </div>
              <div style={{ fontSize: 13, color: C.onSurf }}>{r.message}</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 6 }}>Submitted {fmtDate(r.createdAt)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── News & Updates ───────────────────────────────────────────── */
function NewsView() {
  return (
    <div>
      <h1 style={{ fontFamily: 'Playfair Display,serif', fontSize: 22, color: C.navy, margin: '0 0 4px' }}>News & Updates</h1>
      <p style={{ fontSize: 13, color: C.muted, marginBottom: 20 }}>Announcements from Vue sur la Montagne.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {NEWS_ITEMS.map(n => (
          <div key={n.id} style={{ background: C.surface, borderRadius: 16, padding: 18, boxShadow: elev[1] }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span style={{
                fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
                color: '#B8860B', background: 'rgba(184,134,11,0.1)', padding: '3px 9px', borderRadius: 12,
              }}>{n.tag}</span>
              <span style={{ fontSize: 11, color: C.muted }}>{fmtDate(n.date)}</span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.navy, marginBottom: 4 }}>{n.title}</div>
            <div style={{ fontSize: 13, color: C.onSurf, lineHeight: 1.5 }}>{n.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Adjustment request modal ─────────────────────────────────── */
function AdjustmentModal({ booking, bookings, onClose, onSubmit }) {
  const [bookingId, setBookingId] = useState(booking?.id || bookings[0]?.id || '');
  const [type, setType] = useState(ADJUSTMENT_TYPES[0]);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSubmit({ bookingId, type, message: message.trim() });
  };

  const fieldStyle = {
    width: '100%', padding: '10px 12px', fontSize: 13, border: `1.5px solid ${C.border}`,
    borderRadius: 10, outline: 'none', fontFamily: 'Roboto,sans-serif', boxSizing: 'border-box',
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(10,20,40,0.45)', zIndex: 200,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: C.surface, borderRadius: 20, padding: 24, width: '100%', maxWidth: 420,
        boxShadow: elev[4],
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: C.navy, margin: 0, fontFamily: 'Playfair Display,serif' }}>Request an Adjustment</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted }}><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 11, color: C.muted, fontWeight: 600, marginBottom: 5 }}>Booking</label>
            <select value={bookingId} onChange={e => setBookingId(e.target.value)} style={fieldStyle}>
              {bookings.map(b => <option key={b.id} value={b.id}>{b.id} — {b.room}</option>)}
            </select>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 11, color: C.muted, fontWeight: 600, marginBottom: 5 }}>Request type</label>
            <select value={type} onChange={e => setType(e.target.value)} style={fieldStyle}>
              {ADJUSTMENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', fontSize: 11, color: C.muted, fontWeight: 600, marginBottom: 5 }}>Details</label>
            <textarea value={message} onChange={e => setMessage(e.target.value)} rows={4} required
              placeholder="Tell us what you'd like changed..."
              style={{ ...fieldStyle, resize: 'vertical', fontFamily: 'Roboto,sans-serif' }} />
          </div>

          <button type="submit" style={{
            width: '100%', background: C.navy, color: '#fff', border: 'none', borderRadius: 24,
            padding: '11px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <Send size={14} /> Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}

/* ── Root ──────────────────────────────────────────────────────── */
export default function ClientPortal({ onLogout, session }) {
  const [view, setView] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [modalBooking, setModalBooking] = useState(null);
  const [requests, setRequests] = useState([]);

  const width = useWindowWidth();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  useEffect(() => {
    if (isMobile || isTablet) setSidebarOpen(false);
    else setSidebarOpen(true);
  }, [isMobile, isTablet]);

  const sidebarW = sidebarOpen ? 240 : 72;

  const handleNewRequest = useCallback((booking) => setModalBooking(booking || MY_BOOKINGS[0]), []);

  const handleSubmitRequest = useCallback((data) => {
    setRequests(prev => [{ id: `RQ-${prev.length + 1}`, status: 'submitted', createdAt: new Date().toISOString().slice(0,10), ...data }, ...prev]);
    setModalBooking(null);
    setView('adjustments');
  }, []);

  const SidebarContent = () => (
    <>
      <div style={{
        padding: sidebarOpen ? '0 20px' : '0 12px', borderBottom: `1px solid ${C.border}`,
        display: 'flex', alignItems: 'center', gap: 12, height: 64, flexShrink: 0,
      }}>
        <div style={{ width: 40, height: 40, background: C.navy, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: elev[2] }}>
          <BedDouble size={18} color="#fff" />
        </div>
        {sidebarOpen && (
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 14, color: C.navy, fontWeight: 600, whiteSpace: 'nowrap', lineHeight: 1.2 }}>Vue sur la Montagne</div>
            <div style={{ fontSize: 10, color: C.muted, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>Guest Portal</div>
          </div>
        )}
      </div>

      <nav style={{ flex: 1, padding: '12px 8px', overflow: 'hidden auto' }}>
        {sidebarOpen && (
          <div style={{ fontSize: 11, color: C.muted, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 12px 8px', fontWeight: 600 }}>
            Navigation
          </div>
        )}
        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          const active = view === item.id;
          return (
            <button key={item.id} onClick={() => setView(item.id)} title={!sidebarOpen ? item.label : undefined}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                padding: sidebarOpen ? '12px 16px' : '12px', borderRadius: 28, marginBottom: 2,
                background: active ? C.container : 'none', border: 'none', cursor: 'pointer',
                color: active ? C.navy : C.onSurf, transition: 'background 0.15s, color 0.15s',
                justifyContent: !sidebarOpen ? 'center' : 'flex-start', position: 'relative',
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = C.surfaceVar; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'none'; }}>
              {active && <span style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 3, height: 28, background: C.navy, borderRadius: '0 4px 4px 0' }} />}
              <Icon size={20} style={{ flexShrink: 0 }} />
              {sidebarOpen && <span style={{ fontSize: 14, fontWeight: active ? 600 : 400, whiteSpace: 'nowrap', flex: 1, textAlign: 'left' }}>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div style={{ borderTop: `1px solid ${C.border}`, padding: '12px 8px' }}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px',
          background: 'none', border: 'none', cursor: 'pointer', color: C.muted, borderRadius: 28,
          justifyContent: sidebarOpen ? 'flex-start' : 'center', marginBottom: sidebarOpen ? 8 : 0,
        }}
          onMouseEnter={e => e.currentTarget.style.background = C.surfaceVar}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}>
          {sidebarOpen ? <ChevronLeft size={16} /> : <Menu size={16} />}
          {sidebarOpen && <span style={{ fontSize: 12 }}>Collapse</span>}
        </button>
      </div>
    </>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&family=Roboto+Mono:wght@500;600&family=Playfair+Display:wght@400;600&display=swap');
        * { box-sizing: border-box; }
        body { background: ${C.bg}; }
        @keyframes dropIn { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${C.container}; border-radius: 3px; }
      `}</style>

      <div style={{ display: 'flex', height: '100vh', background: C.bg, fontFamily: 'Roboto,sans-serif', overflow: 'hidden' }}>
        {!isMobile && (
          <div style={{ width: sidebarW, background: C.surface, display: 'flex', flexDirection: 'column', transition: 'width 0.25s cubic-bezier(.4,0,.2,1)', flexShrink: 0, overflow: 'hidden', boxShadow: elev[3], zIndex: 10 }}>
            <SidebarContent />
          </div>
        )}

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{
            height: 56, background: C.surface, boxShadow: elev[1], display: 'flex',
            alignItems: 'center', justifyContent: 'space-between', padding: isMobile ? '0 14px' : '0 24px',
            flexShrink: 0, zIndex: 9,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {!isMobile && (<><span style={{ fontSize: 12, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Vue sur la Montagne</span><ChevronRight size={12} color={C.muted} /></>)}
              <span style={{ fontSize: isMobile ? 15 : 12, color: C.navy, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {NAV_ITEMS.find(n => n.id === view)?.label}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button style={{ position: 'relative', background: C.surfaceVar, border: 'none', cursor: 'pointer', color: C.onSurf, padding: 9, borderRadius: '50%', display: 'flex', alignItems: 'center', boxShadow: elev[1] }}>
                <Bell size={18} />
              </button>
              <ProfileDropdown session={session} onLogout={onLogout} />
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '16px 12px 80px' : '28px' }}>
            {view === 'overview'    && <OverviewView session={session} bookings={MY_BOOKINGS} requests={requests} onGo={setView} />}
            {view === 'bookings'    && <BookingsView bookings={MY_BOOKINGS} onRequestAdjustment={handleNewRequest} />}
            {view === 'adjustments' && <AdjustmentsView requests={requests} onOpenNew={handleNewRequest} />}
            {view === 'news'        && <NewsView />}
          </div>
        </div>

        {isMobile && (
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: 64, background: C.surface, boxShadow: '0 -2px 12px rgba(0,0,0,0.10)', display: 'flex', alignItems: 'stretch', zIndex: 40, borderTop: `1px solid ${C.border}` }}>
            {NAV_ITEMS.map(item => {
              const Icon = item.icon;
              const active = view === item.id;
              return (
                <button key={item.id} onClick={() => setView(item.id)} style={{
                  flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  gap: 4, background: 'none', border: 'none', cursor: 'pointer', color: active ? C.navy : C.muted, position: 'relative',
                }}>
                  {active && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 32, height: 3, background: C.navy, borderRadius: '0 0 4px 4px' }} />}
                  <Icon size={20} />
                  <span style={{ fontSize: 9.5 }}>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {modalBooking !== null && (
          <AdjustmentModal
            booking={modalBooking}
            bookings={MY_BOOKINGS}
            onClose={() => setModalBooking(null)}
            onSubmit={handleSubmitRequest}
          />
        )}
      </div>
    </>
  );
}
