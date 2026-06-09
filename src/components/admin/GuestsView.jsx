import { useState, useMemo } from 'react';
import { Mail, Phone, X } from 'lucide-react';
import { C, elev, fmt, fmtDate } from './tokens';
import { Card, StatusBadge, LoadingSpinner, ErrorBanner } from './AdminUI';

export default function GuestsView({ bookings, loading, error, onRetry }) {
  const clients = useMemo(() => {
    const map = {};
    bookings.forEach(b => {
      if (!map[b.email]) {
        map[b.email] = { name:b.guest, email:b.email, phone:b.phone, bookings:[], totalSpent:0, lastVisit:b.checkIn };
      }
      map[b.email].bookings.push(b);
      if (b.paid) map[b.email].totalSpent += b.total;
      if (b.checkIn > map[b.email].lastVisit) map[b.email].lastVisit = b.checkIn;
    });
    return Object.values(map).sort((a,b) => b.totalSpent - a.totalSpent);
  }, [bookings]);

  const [selected, setSelected] = useState(null);
  const client = selected ? clients.find(c => c.email === selected) : null;

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:28, color:C.navy, fontWeight:600, marginBottom:4 }}>Guests</h1>
      <p style={{ fontFamily:'Roboto,sans-serif', fontSize:14, color:C.onSurf, marginBottom:24 }}>
        {clients.length} registered guests
      </p>

      {error && <ErrorBanner message={error} onRetry={onRetry}/>}

      <div style={{ display:'grid', gridTemplateColumns: client ? '1fr 1fr' : '1fr', gap:16 }}>
        <Card elevation={3} style={{ overflow:'visible' }}>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead>
                <tr style={{ background:C.surfaceVar, borderBottom:`1px solid ${C.border}` }}>
                  {['Guest','Stays','Total Spent','Last Visit',''].map(h => (
                    <th key={h} style={{
                      padding:'12px 18px', textAlign:'left', fontSize:11,
                      textTransform:'uppercase', letterSpacing:'0.08em',
                      color:C.onSurf, fontFamily:'Roboto,sans-serif', fontWeight:600
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {clients.map((c,i) => (
                  <tr key={c.email}
                    style={{
                      borderBottom: i<clients.length-1 ? `1px solid ${C.border}`:'none',
                      background: selected===c.email ? C.surfaceVar : 'transparent',
                      cursor:'pointer', transition:'background 0.12s'
                    }}
                    onClick={() => setSelected(selected===c.email ? null : c.email)}
                    onMouseEnter={e => { if(selected!==c.email) e.currentTarget.style.background=C.surfaceVar }}
                    onMouseLeave={e => { if(selected!==c.email) e.currentTarget.style.background='transparent' }}>
                    <td style={{ padding:'13px 18px' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                        <div style={{
                          width:38, height:38, borderRadius:'50%',
                          background: C.containerLow,
                          display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
                          boxShadow: elev[1]
                        }}>
                          <span style={{ fontFamily:'Playfair Display,serif', fontSize:14, color:C.navy, fontWeight:700 }}>{c.name[0]}</span>
                        </div>
                        <div>
                          <div style={{ fontFamily:'Roboto,sans-serif', fontSize:13, fontWeight:600, color:C.text }}>{c.name}</div>
                          <div style={{ fontSize:11, color:C.muted }}>{c.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding:'13px 18px', fontSize:13, fontFamily:'Roboto,sans-serif', color:C.text }}>{c.bookings.length}</td>
                    <td style={{ padding:'13px 18px', fontSize:13, fontFamily:'Roboto,sans-serif', fontWeight:700, color:C.navy }}>{fmt(c.totalSpent)}</td>
                    <td style={{ padding:'13px 18px', fontSize:12, fontFamily:'Roboto,sans-serif', color:C.muted }}>{fmtDate(c.lastVisit)}</td>
                    <td style={{ padding:'13px 18px' }}>
                      {c.totalSpent > 50000 && (
                        <span style={{
                          fontSize:10, color:'#7A5300', background:'#FDEDB8',
                          borderRadius:20, padding:'3px 10px',
                          fontFamily:'Roboto,sans-serif', fontWeight:700
                        }}>VIP</span>
                      )}
                    </td>
                  </tr>
                ))}
                {clients.length === 0 && (
                  <tr><td colSpan={5} style={{ padding:'56px 20px', textAlign:'center', color:C.muted, fontSize:13, fontFamily:'Roboto,sans-serif' }}>
                    No guests yet.
                  </td></tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {client && (
          <Card elevation={3}>
            <div style={{
              padding:'16px 22px', borderBottom:`1px solid ${C.border}`,
              display:'flex', justifyContent:'space-between', alignItems:'center',
              background: C.surfaceVar
            }}>
              <span style={{ fontFamily:'Roboto,sans-serif', fontWeight:700, fontSize:12, color:C.navy, textTransform:'uppercase', letterSpacing:'0.08em' }}>Guest Profile</span>
              <button onClick={() => setSelected(null)}
                style={{ background:C.containerLow, border:'none', cursor:'pointer', color:C.onSurf, borderRadius:'50%', width:28, height:28, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <X size={14}/>
              </button>
            </div>
            <div style={{ padding:'22px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:22 }}>
                <div style={{
                  width:58, height:58, borderRadius:'50%',
                  background: C.container,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  boxShadow: elev[2]
                }}>
                  <span style={{ fontFamily:'Playfair Display,serif', fontSize:22, color:C.navy, fontWeight:700 }}>{client.name[0]}</span>
                </div>
                <div>
                  <div style={{ fontFamily:'Playfair Display,serif', fontSize:20, color:C.navy }}>{client.name}</div>
                  <div style={{ fontSize:12, color:C.muted, fontFamily:'Roboto,sans-serif' }}>
                    {client.bookings.length} stay{client.bookings.length!==1?'s':''}
                  </div>
                </div>
              </div>
              {[[Mail, client.email],[Phone, client.phone]].map(([Icon, val]) => (
                <div key={val} style={{
                  display:'flex', alignItems:'center', gap:12, marginBottom:12,
                  fontFamily:'Roboto,sans-serif', fontSize:13, color:C.text,
                  padding:'9px 14px', background:C.surfaceVar, borderRadius:10
                }}>
                  <Icon size={14} color={C.navy}/> {val}
                </div>
              ))}
              <div style={{ borderTop:`1px solid ${C.border}`, marginTop:18, paddingTop:18 }}>
                <div style={{ fontFamily:'Roboto,sans-serif', fontSize:11, textTransform:'uppercase', letterSpacing:'0.1em', color:C.muted, marginBottom:12 }}>
                  Booking History
                </div>
                {client.bookings.map(b => (
                  <div key={b.id} style={{
                    display:'flex', justifyContent:'space-between', alignItems:'center',
                    padding:'10px 0', borderBottom:`1px solid ${C.border}`
                  }}>
                    <div>
                      <div style={{ fontSize:13, fontFamily:'Roboto,sans-serif', fontWeight:600, color:C.text }}>{b.room}</div>
                      <div style={{ fontSize:11, color:C.muted, fontFamily:'Roboto,sans-serif' }}>{fmtDate(b.checkIn)} → {fmtDate(b.checkOut)}</div>
                    </div>
                    <div style={{ textAlign:'right' }}>
                      <div style={{ fontSize:12, fontWeight:700, fontFamily:'Roboto,sans-serif', color:C.navy, marginBottom:4 }}>{fmt(b.total)}</div>
                      <StatusBadge status={b.status}/>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{
                marginTop:18, padding:'14px 18px',
                background: C.containerLow,
                borderRadius:14, display:'flex', justifyContent:'space-between',
                boxShadow: elev[1]
              }}>
                <span style={{ fontFamily:'Roboto,sans-serif', fontSize:13, color:C.onSurf }}>Lifetime Value</span>
                <span style={{ fontFamily:'Roboto,sans-serif', fontSize:15, fontWeight:700, color:C.navy }}>{fmt(client.totalSpent)}</span>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
