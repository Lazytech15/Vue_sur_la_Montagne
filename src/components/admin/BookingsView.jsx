import { useState, useMemo } from 'react';
import { Search, Plus, Eye } from 'lucide-react';
import { C, elev, STATUS_CONFIG, fmt, fmtDate } from './tokens';
import { Card, StatusBadge, LoadingSpinner, ErrorBanner } from './AdminUI';
import BookingFormModal from './BookingFormModal';

export default function BookingsView({ bookings, onSelect, onStatusChange, onCreateBooking, loading, error }) {
  const [search, setSearch]           = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showForm, setShowForm]       = useState(false);

  const filtered = useMemo(() => {
    return bookings.filter(b => {
      const matchSearch = !search ||
        b.guest.toLowerCase().includes(search.toLowerCase()) ||
        b.id.toLowerCase().includes(search.toLowerCase()) ||
        b.room.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === 'all' || b.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [bookings, search, filterStatus]);

  const statuses = ['all','pending','confirmed','ongoing','completed','cancelled'];

  return (
    <div>
      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24 }}>
        <div>
          <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:28, color:C.navy, fontWeight:600, marginBottom:4 }}>Bookings</h1>
          <p style={{ fontFamily:'Roboto,sans-serif', fontSize:14, color:C.onSurf }}>
            {filtered.length} of {bookings.length} reservations
          </p>
        </div>
        {/* MD3 Filled button */}
        <button onClick={() => setShowForm(true)}
          style={{
            display:'flex', alignItems:'center', gap:8,
            background: C.navy, color:'#fff', border:'none',
            borderRadius:24, padding:'11px 22px',
            fontSize:13, fontFamily:'Roboto,sans-serif',
            fontWeight:600, letterSpacing:'0.04em',
            cursor:'pointer', boxShadow: elev[2],
            transition:'box-shadow 0.2s, transform 0.2s'
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = elev[3]; e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = elev[2]; e.currentTarget.style.transform = 'translateY(0)'; }}>
          <Plus size={16}/> New Booking
        </button>
      </div>

      {error && <ErrorBanner message={error} onRetry={() => {}}/>}

      {/* Filter card */}
      <Card elevation={2} style={{ padding:'14px 18px', marginBottom:16 }}>
        <div style={{ display:'flex', gap:12, flexWrap:'wrap', alignItems:'center' }}>
          {/* MD3 Search field */}
          <div style={{
            display:'flex', alignItems:'center', gap:10, flex:1, minWidth:200,
            background: C.surfaceVar, borderRadius:28, padding:'9px 16px',
            border:`1px solid ${C.border}`
          }}>
            <Search size={15} color={C.muted} />
            <input value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Search guest, ID, room…"
              style={{
                border:'none', background:'none', outline:'none',
                fontSize:14, fontFamily:'Roboto,sans-serif',
                color:C.text, width:'100%'
              }} />
          </div>
          {/* Filter chips */}
          <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
            {statuses.map(s => (
              <button key={s} onClick={() => setFilterStatus(s)}
                style={{
                  padding:'6px 16px', fontSize:12, fontFamily:'Roboto,sans-serif',
                  fontWeight:500, textTransform:'capitalize',
                  borderRadius:20, cursor:'pointer', transition:'all 0.15s',
                  background: filterStatus === s ? C.navy : 'transparent',
                  color: filterStatus === s ? '#fff' : C.onSurf,
                  border: filterStatus === s ? `1px solid ${C.navy}` : `1px solid ${C.border}`,
                  boxShadow: filterStatus === s ? elev[1] : 'none'
                }}>
                {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Table card */}
      {loading ? <LoadingSpinner /> : (
        <Card elevation={3} style={{ overflow:'visible' }}>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead>
                <tr style={{ background: C.surfaceVar, borderBottom:`1px solid ${C.border}` }}>
                  {['Booking ID','Guest','Room','Check-in','Check-out','Total','Status','Payment',''].map(h => (
                    <th key={h} style={{
                      padding:'12px 18px', textAlign:'left', fontSize:11,
                      textTransform:'uppercase', letterSpacing:'0.08em',
                      color:C.onSurf, fontFamily:'Roboto,sans-serif', fontWeight:600, whiteSpace:'nowrap'
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((b, i) => (
                  <tr key={b.id}
                    style={{
                      borderBottom: i < filtered.length-1 ? `1px solid ${C.border}` : 'none',
                      transition:'background 0.12s', cursor:'pointer'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = C.surfaceVar}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding:'13px 18px' }}>
                      <span style={{ fontFamily:'Roboto Mono,monospace', fontSize:12, color:C.navy, fontWeight:600 }}>{b.id}</span>
                    </td>
                    <td style={{ padding:'13px 18px' }}>
                      <div style={{ fontFamily:'Roboto,sans-serif', fontSize:13, fontWeight:600, color:C.text }}>{b.guest}</div>
                      <div style={{ fontSize:11, color:C.muted }}>{b.email}</div>
                    </td>
                    <td style={{ padding:'13px 18px', fontSize:13, fontFamily:'Roboto,sans-serif', color:C.text }}>{b.room}</td>
                    <td style={{ padding:'13px 18px', fontSize:12, fontFamily:'Roboto,sans-serif', color:C.text, whiteSpace:'nowrap' }}>{fmtDate(b.checkIn)}</td>
                    <td style={{ padding:'13px 18px', fontSize:12, fontFamily:'Roboto,sans-serif', color:C.text, whiteSpace:'nowrap' }}>{fmtDate(b.checkOut)}</td>
                    <td style={{ padding:'13px 18px', fontSize:13, fontFamily:'Roboto,sans-serif', fontWeight:700, color:C.navy }}>{fmt(b.total)}</td>
                    <td style={{ padding:'13px 18px' }}><StatusBadge status={b.status}/></td>
                    <td style={{ padding:'13px 18px' }}>
                      <span style={{
                        fontSize:12, fontFamily:'Roboto,sans-serif', fontWeight:600,
                        color: b.paid ? C.green : C.amber,
                        background: b.paid ? C.greenBg : C.amberBg,
                        padding:'3px 10px', borderRadius:20
                      }}>
                        {b.paid ? '✓ Paid' : '⏳ Unpaid'}
                      </span>
                    </td>
                    <td style={{ padding:'13px 18px' }}>
                      <button onClick={() => onSelect(b)}
                        style={{
                          display:'flex', alignItems:'center', gap:5,
                          background: C.containerLow, border:'none',
                          borderRadius:20, padding:'5px 12px', cursor:'pointer',
                          fontSize:11, color:C.navy, fontFamily:'Roboto,sans-serif',
                          fontWeight:600, transition:'background 0.15s, box-shadow 0.15s'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = C.container; e.currentTarget.style.boxShadow = elev[1]; }}
                        onMouseLeave={e => { e.currentTarget.style.background = C.containerLow; e.currentTarget.style.boxShadow = 'none'; }}>
                        <Eye size={12}/> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div style={{ padding:'56px 20px', textAlign:'center', color:C.muted, fontSize:14, fontFamily:'Roboto,sans-serif' }}>
                No bookings match your filters.
              </div>
            )}
          </div>
        </Card>
      )}

      {showForm && (
        <BookingFormModal
          onClose={() => setShowForm(false)}
          onSaved={(data) => { onCreateBooking(data); setShowForm(false); }}
        />
      )}
    </div>
  );
}
