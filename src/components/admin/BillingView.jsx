import { useState } from 'react';
import { AlertCircle, CheckCircle2, TrendingUp, Printer } from 'lucide-react';
import { C, elev, fmt, fmtDate } from './tokens';
import { Card, StatCard, LoadingSpinner } from './AdminUI';

export default function BillingView({ bookings, onMarkPaid }) {
  const [tab, setTab] = useState('unpaid');

  const unpaid    = bookings.filter(b => !b.paid && b.status !== 'cancelled');
  const paid      = bookings.filter(b => b.paid);
  const list      = tab === 'unpaid' ? unpaid : paid;
  const totalUnpaid = unpaid.reduce((s,b) => s+b.total, 0);
  const totalPaid   = paid.reduce((s,b) => s+b.total, 0);
  const collectionRate = totalPaid + totalUnpaid > 0
    ? Math.round(totalPaid / (totalPaid + totalUnpaid) * 100) : 0;

  function handlePrint(b) {
    const win = window.open('', '_blank');
    win.document.write(`
      <html><head><title>Invoice ${b.id}</title>
      <style>body{font-family:Roboto,sans-serif;padding:32px;color:#333}
      h1{color:#1B365D}table{width:100%;border-collapse:collapse}
      td,th{padding:8px 12px;text-align:left;border-bottom:1px solid #eee}
      .total{font-weight:700;color:#1B365D}</style></head>
      <body>
        <h1>Vue sur la Montagne Hotel</h1>
        <p>Rizal, Philippines · +63 281 234 567</p>
        <hr/>
        <h2>Invoice INV-${b.id.slice(3)}</h2>
        <table>
          <tr><th>Guest</th><td>${b.guest}</td></tr>
          <tr><th>Room</th><td>${b.room}</td></tr>
          <tr><th>Check-in</th><td>${b.checkIn}</td></tr>
          <tr><th>Check-out</th><td>${b.checkOut}</td></tr>
          <tr><th>Nights</th><td>${b.nights}</td></tr>
          <tr><th class="total">Total</th><td class="total">₱${b.total.toLocaleString()}</td></tr>
          <tr><th>Status</th><td>${b.paid ? 'PAID' : 'UNPAID'}</td></tr>
        </table>
        <p style="margin-top:32px;font-size:12px;color:#888">
          Generated ${new Date().toLocaleDateString('en-PH',{dateStyle:'long'})}
        </p>
      </body></html>
    `);
    win.document.close();
    win.print();
  }

  return (
    <div>
      <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:28, color:C.navy, fontWeight:600, marginBottom:4 }}>Billing & Payments</h1>
      <p style={{ fontFamily:'Roboto,sans-serif', fontSize:14, color:C.onSurf, marginBottom:24 }}>
        Track outstanding balances and payment records
      </p>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:16, marginBottom:24 }}>
        <StatCard label="Outstanding"     value={fmt(totalUnpaid)} sub={`${unpaid.length} invoices`}  icon={AlertCircle}  accent={C.amber} />
        <StatCard label="Collected"       value={fmt(totalPaid)}   sub={`${paid.length} payments`}    icon={CheckCircle2} accent={C.green} />
        <StatCard label="Collection Rate" value={`${collectionRate}%`} sub="of total billed"          icon={TrendingUp}   accent={C.navy}  />
      </div>

      <Card elevation={3}>
        {/* MD3 Tab bar */}
        <div style={{ padding:'6px 18px', borderBottom:`1px solid ${C.border}`, display:'flex', gap:4, background:C.surfaceVar }}>
          {['unpaid','paid'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{
                padding:'10px 22px', fontSize:13, fontFamily:'Roboto,sans-serif',
                fontWeight:600, borderRadius:20, cursor:'pointer',
                border:'none', transition:'all 0.15s',
                background: tab===t ? C.navy : 'transparent',
                color: tab===t ? '#fff' : C.onSurf,
                boxShadow: tab===t ? elev[1] : 'none'
              }}>
              {t === 'unpaid' ? `Unpaid (${unpaid.length})` : `Paid (${paid.length})`}
            </button>
          ))}
        </div>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ background:C.surfaceVar, borderBottom:`1px solid ${C.border}` }}>
                {['Invoice','Guest','Room','Nights','Amount','Due Date','Status','Action'].map(h => (
                  <th key={h} style={{
                    padding:'12px 18px', textAlign:'left', fontSize:11,
                    textTransform:'uppercase', letterSpacing:'0.08em',
                    color:C.onSurf, fontFamily:'Roboto,sans-serif', fontWeight:600
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map((b,i) => (
                <tr key={b.id}
                  style={{ borderBottom:i<list.length-1?`1px solid ${C.border}`:'none', transition:'background 0.12s' }}
                  onMouseEnter={e=>e.currentTarget.style.background=C.surfaceVar}
                  onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  <td style={{ padding:'13px 18px', fontFamily:'Roboto Mono,monospace', fontSize:12, color:C.navy, fontWeight:700 }}>INV-{b.id.slice(3)}</td>
                  <td style={{ padding:'13px 18px', fontSize:13, fontFamily:'Roboto,sans-serif', color:C.text, fontWeight:600 }}>{b.guest}</td>
                  <td style={{ padding:'13px 18px', fontSize:12, fontFamily:'Roboto,sans-serif', color:C.text }}>{b.room}</td>
                  <td style={{ padding:'13px 18px', fontSize:13, fontFamily:'Roboto,sans-serif', color:C.text }}>{b.nights}n</td>
                  <td style={{ padding:'13px 18px', fontSize:13, fontFamily:'Roboto,sans-serif', fontWeight:700, color:C.navy }}>{fmt(b.total)}</td>
                  <td style={{ padding:'13px 18px', fontSize:12, fontFamily:'Roboto,sans-serif', color:C.muted, whiteSpace:'nowrap' }}>{fmtDate(b.checkOut)}</td>
                  <td style={{ padding:'13px 18px' }}>
                    <span style={{
                      fontSize:12, fontFamily:'Roboto,sans-serif', fontWeight:600,
                      color: b.paid ? C.green : C.amber,
                      background: b.paid ? C.greenBg : C.amberBg,
                      padding:'3px 12px', borderRadius:20
                    }}>
                      {b.paid ? '✓ Paid' : '⏳ Pending'}
                    </span>
                  </td>
                  <td style={{ padding:'13px 18px' }}>
                    <div style={{ display:'flex', gap:8 }}>
                      {!b.paid && (
                        <button onClick={() => onMarkPaid(b.id)}
                          style={{
                            fontSize:12, padding:'5px 12px', borderRadius:20,
                            background: C.greenBg, color: C.green,
                            border:'none', cursor:'pointer',
                            fontFamily:'Roboto,sans-serif', fontWeight:600,
                            transition:'box-shadow 0.15s'
                          }}
                          onMouseEnter={e => e.currentTarget.style.boxShadow = elev[1]}
                          onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                          Mark Paid
                        </button>
                      )}
                      <button onClick={() => handlePrint(b)}
                        style={{
                          fontSize:12, padding:'5px 12px', borderRadius:20,
                          background: C.containerLow, color: C.navy,
                          border:'none', cursor:'pointer',
                          fontFamily:'Roboto,sans-serif', fontWeight:500,
                          display:'flex', alignItems:'center', gap:5,
                          transition:'box-shadow 0.15s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.boxShadow = elev[1]}
                        onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                        <Printer size={11}/> Print
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {list.length === 0 && (
                <tr><td colSpan={8} style={{ padding:'56px 20px', textAlign:'center', color:C.muted, fontSize:14, fontFamily:'Roboto,sans-serif' }}>
                  No records in this category.
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
