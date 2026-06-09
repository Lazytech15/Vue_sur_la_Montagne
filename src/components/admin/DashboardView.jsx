import { useMemo } from 'react';
import { Banknote, CreditCard, Clock, BedDouble, CalendarDays } from 'lucide-react';
import { C, elev, fmt, fmtDate } from './tokens';
import { Card, StatCard, StatusBadge, LoadingSpinner, ErrorBanner } from './AdminUI';

export default function DashboardView({ bookings, onSelect, loading, error, onRetry }) {
  const stats = useMemo(() => {
    const pending   = bookings.filter(b => b.status === 'pending').length;
    const ongoing   = bookings.filter(b => b.status === 'ongoing').length;
    const confirmed = bookings.filter(b => b.status === 'confirmed').length;
    const revenue   = bookings.filter(b => b.paid).reduce((s,b) => s + b.total, 0);
    const unpaid    = bookings.filter(b => !b.paid && b.status !== 'cancelled').reduce((s,b) => s + b.total, 0);
    return { pending, ongoing, confirmed, revenue, unpaid };
  }, [bookings]);

  const recent = bookings.slice(0, 6);

  const roomOcc = useMemo(() => {
    const map = {};
    bookings.filter(b => ['ongoing','confirmed','completed'].includes(b.status)).forEach(b => {
      map[b.room] = (map[b.room] || 0) + 1;
    });
    return Object.entries(map).sort((a,b) => b[1]-a[1]).slice(0,5);
  }, [bookings]);

  if (loading) return <LoadingSpinner />;

  const maxCount = roomOcc.length ? Math.max(...roomOcc.map(r=>r[1])) : 1;
  const barColors = [C.navy, C.navyLight, '#3A5F8A', '#4E749F', '#6589B4'];

  return (
    <div>
      {/* Page header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{
          fontFamily:'Playfair Display,serif', fontSize: 28,
          color: C.navy, fontWeight: 600, marginBottom: 4, letterSpacing:'-0.01em'
        }}>Overview</h1>
        <p style={{ fontFamily:'Roboto,sans-serif', fontSize: 14, color: C.onSurf }}>
          Welcome back. Here's what's happening at the resort today.
        </p>
      </div>

      {error && <ErrorBanner message={error} onRetry={onRetry}/>}

      {/* Stats grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(190px,1fr))', gap:16, marginBottom:24 }}>
        <StatCard label="Total Revenue"    value={fmt(stats.revenue)}  sub="Paid bookings"        trend={12}  icon={Banknote}     accent={C.green} />
        <StatCard label="Unpaid Balance"   value={fmt(stats.unpaid)}   sub="Awaiting settlement"  trend={-4}  icon={CreditCard}   accent={C.amber} />
        <StatCard label="Pending Approval" value={stats.pending}       sub="Need your review"                 icon={Clock}        accent={C.amber} />
        <StatCard label="Active Stays"     value={stats.ongoing}       sub="Currently checked in" trend={8}   icon={BedDouble}    accent={C.blue}  />
        <StatCard label="Upcoming"         value={stats.confirmed}     sub="Confirmed bookings"               icon={CalendarDays} accent={C.navy}  />
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:16 }}>

        {/* Recent bookings card */}
        <Card elevation={3}>
          <div style={{
            padding:'18px 22px', borderBottom:`1px solid ${C.border}`,
            display:'flex', justifyContent:'space-between', alignItems:'center',
            background: C.surfaceVar
          }}>
            <span style={{
              fontFamily:'Roboto,sans-serif', fontWeight:700, fontSize:12,
              textTransform:'uppercase', letterSpacing:'0.1em', color:C.navy
            }}>Recent Bookings</span>
          </div>
          <div>
            {recent.map((b, i) => (
              <div key={b.id} onClick={() => onSelect(b)}
                style={{
                  padding:'13px 22px', display:'flex', alignItems:'center',
                  gap:14, cursor:'pointer',
                  borderBottom: i < recent.length-1 ? `1px solid ${C.border}` : 'none',
                  transition:'background 0.15s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = C.surfaceVar}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                {/* Avatar */}
                <div style={{
                  width:40, height:40, borderRadius:'50%',
                  background: C.containerLow,
                  display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
                  boxShadow: elev[1]
                }}>
                  <span style={{ fontFamily:'Playfair Display,serif', fontSize:15, color:C.navy, fontWeight:700 }}>
                    {b.guest[0]}
                  </span>
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{
                    fontFamily:'Roboto,sans-serif', fontSize:14, fontWeight:600,
                    color:C.text, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'
                  }}>{b.guest}</div>
                  <div style={{ fontSize:12, color:C.muted, fontFamily:'Roboto,sans-serif' }}>
                    {b.room} · {fmtDate(b.checkIn)}
                  </div>
                </div>
                <div style={{ textAlign:'right', flexShrink:0 }}>
                  <div style={{ fontSize:14, fontWeight:700, fontFamily:'Roboto,sans-serif', color:C.navy, marginBottom:4 }}>
                    {fmt(b.total)}
                  </div>
                  <StatusBadge status={b.status} />
                </div>
              </div>
            ))}
            {recent.length === 0 && (
              <div style={{ padding:'40px 22px', textAlign:'center', color:C.muted, fontSize:13, fontFamily:'Roboto,sans-serif' }}>
                No bookings yet.
              </div>
            )}
          </div>
        </Card>

        {/* Room demand card */}
        <Card elevation={3}>
          <div style={{
            padding:'18px 22px', borderBottom:`1px solid ${C.border}`,
            background: C.surfaceVar
          }}>
            <span style={{
              fontFamily:'Roboto,sans-serif', fontWeight:700, fontSize:12,
              textTransform:'uppercase', letterSpacing:'0.1em', color:C.navy
            }}>Room Demand</span>
          </div>
          <div style={{ padding:'18px 22px' }}>
            {roomOcc.length === 0 && (
              <p style={{ fontFamily:'Roboto,sans-serif', fontSize:13, color:C.muted }}>No data yet.</p>
            )}
            {roomOcc.map(([room, count], i) => {
              const pct = Math.round((count / maxCount) * 100);
              return (
                <div key={room} style={{ marginBottom:18 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:7, fontFamily:'Roboto,sans-serif' }}>
                    <span style={{ fontSize:13, color:C.text, fontWeight:500 }}>
                      {room.replace(' Room','').replace(' Suite','')}
                    </span>
                    <span style={{ fontSize:12, color:C.muted }}>{count} booking{count>1?'s':''}</span>
                  </div>
                  {/* MD3 linear progress */}
                  <div style={{ height:8, background:C.containerLow, borderRadius:4, overflow:'hidden' }}>
                    <div style={{
                      height:'100%', width:`${pct}%`, borderRadius:4,
                      background: barColors[i] || C.navy,
                      transition:'width 0.6s ease'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

      </div>
    </div>
  );
}
