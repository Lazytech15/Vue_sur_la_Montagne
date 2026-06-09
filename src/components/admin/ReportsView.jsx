import { useMemo } from 'react';
import { Download } from 'lucide-react';
import { C, elev, fmt } from './tokens';
import { Card, LoadingSpinner, ErrorBanner } from './AdminUI';

export default function ReportsView({ bookings, loading, error, onRetry }) {
  const monthly = useMemo(() => {
    const map = {};
    bookings.forEach(b => {
      const m = b.checkIn.slice(0,7);
      if (!map[m]) map[m] = { month:m, revenue:0, bookings:0, guests:0 };
      if (b.paid) map[m].revenue += b.total;
      map[m].bookings++;
      map[m].guests += b.guests;
    });
    return Object.values(map).sort((a,b) => a.month.localeCompare(b.month));
  }, [bookings]);

  const maxRev = monthly.length ? Math.max(...monthly.map(m => m.revenue)) : 1;

  const byRoom = useMemo(() => {
    const map = {};
    bookings.forEach(b => {
      if (!map[b.room]) map[b.room] = { room:b.room, count:0, revenue:0 };
      map[b.room].count++;
      if (b.paid) map[b.room].revenue += b.total;
    });
    return Object.values(map).sort((a,b) => b.revenue-a.revenue);
  }, [bookings]);

  function exportCSV() {
    const rows = [
      ['Month','Bookings','Guests','Revenue','Avg/Booking'],
      ...monthly.map(m => [
        new Date(m.month+'-01').toLocaleDateString('en',{month:'long',year:'numeric'}),
        m.bookings, m.guests, m.revenue,
        m.bookings > 0 ? Math.round(m.revenue/m.bookings) : 0
      ])
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
    const a = document.createElement('a');
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    a.download = `vslm-report-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  }

  const barColors = [C.navy, '#2563eb', '#16a34a', '#d97706', '#dc2626', '#7c3aed'];

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24 }}>
        <div>
          <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:28, color:C.navy, fontWeight:600, marginBottom:4 }}>Reports</h1>
          <p style={{ fontFamily:'Roboto,sans-serif', fontSize:14, color:C.onSurf }}>Revenue and occupancy analytics</p>
        </div>
        {/* MD3 Outlined button */}
        <button onClick={exportCSV}
          style={{
            display:'flex', alignItems:'center', gap:8,
            background:'transparent', color:C.navy,
            border:`1.5px solid ${C.navy}`,
            borderRadius:24, padding:'10px 20px', fontSize:13,
            fontFamily:'Roboto,sans-serif', fontWeight:600, cursor:'pointer',
            transition:'background 0.15s, box-shadow 0.15s'
          }}
          onMouseEnter={e => { e.currentTarget.style.background = C.containerLow; e.currentTarget.style.boxShadow = elev[1]; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.boxShadow = 'none'; }}>
          <Download size={14}/> Export CSV
        </button>
      </div>

      {error && <ErrorBanner message={error} onRetry={onRetry}/>}

      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:16 }}>
        {/* Revenue bar chart */}
        <Card elevation={3}>
          <div style={{ padding:'18px 22px', borderBottom:`1px solid ${C.border}`, background:C.surfaceVar }}>
            <span style={{ fontFamily:'Roboto,sans-serif', fontWeight:700, fontSize:12, textTransform:'uppercase', letterSpacing:'0.1em', color:C.navy }}>Monthly Revenue</span>
          </div>
          <div style={{ padding:'22px' }}>
            {monthly.length === 0
              ? <p style={{ fontFamily:'Roboto,sans-serif', fontSize:13, color:C.muted }}>No data yet.</p>
              : (
                <div style={{ display:'flex', alignItems:'flex-end', gap:10, height:160 }}>
                  {monthly.map((m, idx) => (
                    <div key={m.month} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                      <div style={{ fontSize:10, color:C.navy, fontFamily:'Roboto,sans-serif', fontWeight:700 }}>
                        {m.revenue > 0 ? `₱${(m.revenue/1000).toFixed(0)}k` : ''}
                      </div>
                      <div title={`₱${m.revenue.toLocaleString()}`} style={{
                        width:'100%',
                        background: m.revenue===maxRev ? C.navy : C.container,
                        height: maxRev > 0 ? `${Math.round((m.revenue/maxRev)*120)+4}px` : '4px',
                        borderRadius:'8px 8px 0 0', transition:'height 0.4s',
                        boxShadow: m.revenue===maxRev ? elev[2] : 'none'
                      }} />
                      <div style={{ fontSize:9, color:C.muted, fontFamily:'Roboto,sans-serif', textAlign:'center' }}>
                        {new Date(m.month+'-01').toLocaleDateString('en',{month:'short'})}
                      </div>
                    </div>
                  ))}
                </div>
              )
            }
          </div>
        </Card>

        {/* Room revenue breakdown */}
        <Card elevation={3}>
          <div style={{ padding:'18px 22px', borderBottom:`1px solid ${C.border}`, background:C.surfaceVar }}>
            <span style={{ fontFamily:'Roboto,sans-serif', fontWeight:700, fontSize:12, textTransform:'uppercase', letterSpacing:'0.1em', color:C.navy }}>Revenue by Room</span>
          </div>
          <div style={{ padding:'18px 22px' }}>
            {byRoom.length === 0
              ? <p style={{ fontFamily:'Roboto,sans-serif', fontSize:13, color:C.muted }}>No data yet.</p>
              : byRoom.map((r, i) => (
                <div key={r.room} style={{ marginBottom:18 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6, fontFamily:'Roboto,sans-serif' }}>
                    <span style={{ fontSize:12, color:C.text, fontWeight:500 }}>{r.room.split(' ').slice(0,2).join(' ')}</span>
                    <span style={{ fontSize:12, fontWeight:700, color:C.navy }}>{fmt(r.revenue)}</span>
                  </div>
                  <div style={{ height:8, background:C.containerLow, borderRadius:4, overflow:'hidden' }}>
                    <div style={{
                      height:'100%', borderRadius:4,
                      width:`${byRoom[0].revenue > 0 ? (r.revenue / byRoom[0].revenue) * 100 : 0}%`,
                      background: barColors[i] || C.navy,
                      transition:'width 0.5s ease'
                    }} />
                  </div>
                  <div style={{ fontSize:11, color:C.muted, marginTop:3, fontFamily:'Roboto,sans-serif' }}>
                    {r.count} booking{r.count!==1?'s':''}
                  </div>
                </div>
              ))
            }
          </div>
        </Card>
      </div>

      {/* Summary table */}
      <Card elevation={3} style={{ marginTop:16 }}>
        <div style={{ padding:'18px 22px', borderBottom:`1px solid ${C.border}`, background:C.surfaceVar }}>
          <span style={{ fontFamily:'Roboto,sans-serif', fontWeight:700, fontSize:12, textTransform:'uppercase', letterSpacing:'0.1em', color:C.navy }}>Monthly Breakdown</span>
        </div>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ background:C.surfaceVar, borderBottom:`1px solid ${C.border}` }}>
                {['Month','Bookings','Total Guests','Revenue','Avg/Booking'].map(h => (
                  <th key={h} style={{
                    padding:'12px 18px', textAlign:'left', fontSize:11,
                    textTransform:'uppercase', letterSpacing:'0.08em',
                    color:C.onSurf, fontFamily:'Roboto,sans-serif', fontWeight:600
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {monthly.map((m,i) => (
                <tr key={m.month}
                  style={{ borderBottom:i<monthly.length-1?`1px solid ${C.border}`:'none', transition:'background 0.12s' }}
                  onMouseEnter={e=>e.currentTarget.style.background=C.surfaceVar}
                  onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  <td style={{ padding:'13px 18px', fontFamily:'Roboto,sans-serif', fontSize:13, fontWeight:600, color:C.text }}>
                    {new Date(m.month+'-01').toLocaleDateString('en',{month:'long',year:'numeric'})}
                  </td>
                  <td style={{ padding:'13px 18px', fontSize:13, fontFamily:'Roboto,sans-serif', color:C.text }}>{m.bookings}</td>
                  <td style={{ padding:'13px 18px', fontSize:13, fontFamily:'Roboto,sans-serif', color:C.text }}>{m.guests}</td>
                  <td style={{ padding:'13px 18px', fontSize:13, fontWeight:700, fontFamily:'Roboto,sans-serif', color:C.navy }}>{fmt(m.revenue)}</td>
                  <td style={{ padding:'13px 18px', fontSize:13, fontFamily:'Roboto,sans-serif', color:C.muted }}>
                    {m.bookings > 0 ? fmt(Math.round(m.revenue/m.bookings)) : '—'}
                  </td>
                </tr>
              ))}
              {monthly.length === 0 && (
                <tr><td colSpan={5} style={{ padding:'56px 20px', textAlign:'center', color:C.muted, fontSize:14, fontFamily:'Roboto,sans-serif' }}>
                  No report data yet.
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
