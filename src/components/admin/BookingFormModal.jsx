import { useState } from 'react';
import { X, Mail, Phone, Printer } from 'lucide-react';
import { C, elev, STATUS_CONFIG, fmt, fmtDate } from './tokens';

const ROOMS = [
  'Deluxe Mountain View',
  'Superior Forest Suite',
  'Premier Lake View',
  'Presidential Villa',
  'Jungle Treehouse Cabin',
  'Garden Pavilion Room',
];

const ROOM_PRICES = {
  'Deluxe Mountain View':   8500,
  'Superior Forest Suite':  12000,
  'Premier Lake View':      15500,
  'Presidential Villa':     38000,
  'Jungle Treehouse Cabin': 10500,
  'Garden Pavilion Room':   7200,
};

const mdInput = {
  width:'100%', padding:'10px 14px',
  border:`1.5px solid ${C.border}`,
  borderRadius:10, fontSize:13,
  fontFamily:'Roboto,sans-serif', color:C.text,
  background:'#fff', outline:'none', boxSizing:'border-box',
  transition:'border-color 0.15s'
};

// ─── View/Edit modal for existing booking ────────────────────────
export function BookingModal({ booking, onClose, onStatusChange }) {
  if (!booking) return null;
  const [status, setStatus] = useState(booking.status);
  const [paid,   setPaid]   = useState(booking.paid);

  function handleSave() {
    onStatusChange(booking.id, status, paid);
    onClose();
  }

  function printInvoice() {
    const win = window.open('', '_blank');
    win.document.write(`
      <html><head><title>Invoice ${booking.id}</title>
      <style>body{font-family:Roboto,sans-serif;padding:32px;color:#333}
      h1{color:#1B365D}table{width:100%;border-collapse:collapse}
      td,th{padding:8px 12px;text-align:left;border-bottom:1px solid #eee}
      .total{font-weight:700;color:#1B365D;font-size:18px}</style></head>
      <body>
        <h1>Vue sur la Montagne Hotel</h1>
        <p>Rizal, Philippines · +63 281 234 567</p><hr/>
        <h2>Invoice INV-${booking.id.slice(3)}</h2>
        <table>
          <tr><th>Guest</th><td>${booking.guest}</td></tr>
          <tr><th>Email</th><td>${booking.email}</td></tr>
          <tr><th>Phone</th><td>${booking.phone}</td></tr>
          <tr><th>Room</th><td>${booking.room}</td></tr>
          <tr><th>Check-in</th><td>${booking.checkIn}</td></tr>
          <tr><th>Check-out</th><td>${booking.checkOut}</td></tr>
          <tr><th>Nights</th><td>${booking.nights}</td></tr>
          <tr><th>Guests</th><td>${booking.guests}</td></tr>
          <tr><th class="total">Total</th><td class="total">₱${booking.total.toLocaleString()}</td></tr>
          <tr><th>Payment</th><td>${booking.paid ? 'PAID' : 'UNPAID'}</td></tr>
          ${booking.notes ? `<tr><th>Notes</th><td>${booking.notes}</td></tr>` : ''}
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
    <div style={{
      position:'fixed', inset:0, zIndex:1000,
      background:'rgba(0,0,0,0.5)',
      display:'flex', alignItems:'center', justifyContent:'center', padding:20
    }} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()}
        style={{
          background:'#fff', borderRadius:24, width:'100%', maxWidth:480,
          maxHeight:'90vh', overflowY:'auto',
          boxShadow: elev[4]
        }}>

        {/* Header */}
        <div style={{
          padding:'20px 24px', borderBottom:`1px solid ${C.border}`,
          display:'flex', justifyContent:'space-between', alignItems:'center',
          background: C.surfaceVar, borderRadius:'24px 24px 0 0'
        }}>
          <div>
            <div style={{ fontFamily:'Playfair Display,serif', fontSize:18, color:C.navy, fontWeight:600 }}>
              {booking.id}
            </div>
            <div style={{ fontSize:12, color:C.muted, fontFamily:'Roboto,sans-serif', marginTop:2 }}>
              {booking.room}
            </div>
          </div>
          <div style={{ display:'flex', gap:8 }}>
            <button onClick={printInvoice}
              style={{
                display:'flex', alignItems:'center', gap:6,
                background: C.containerLow, border:'none',
                borderRadius:20, padding:'7px 14px', cursor:'pointer',
                fontSize:12, color:C.navy, fontFamily:'Roboto,sans-serif', fontWeight:600
              }}>
              <Printer size={13}/> Print
            </button>
            <button onClick={onClose}
              style={{
                background: C.containerLow, border:'none', cursor:'pointer',
                borderRadius:'50%', width:36, height:36,
                display:'flex', alignItems:'center', justifyContent:'center', color:C.onSurf
              }}>
              <X size={16}/>
            </button>
          </div>
        </div>

        <div style={{ padding:'22px 24px', display:'flex', flexDirection:'column', gap:16 }}>
          {/* Guest info */}
          <div style={{ background: C.surfaceVar, borderRadius:16, padding:'14px 18px', boxShadow: elev[1] }}>
            <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:12 }}>
              <div style={{
                width:46, height:46, borderRadius:'50%',
                background: C.container,
                display:'flex', alignItems:'center', justifyContent:'center',
                boxShadow: elev[1]
              }}>
                <span style={{ fontFamily:'Playfair Display,serif', fontSize:18, color:C.navy, fontWeight:700 }}>
                  {booking.guest[0]}
                </span>
              </div>
              <div>
                <div style={{ fontFamily:'Roboto,sans-serif', fontSize:15, fontWeight:700, color:C.text }}>{booking.guest}</div>
                <div style={{ fontSize:12, color:C.muted }}>{booking.guests} guest{booking.guests!==1?'s':''}</div>
              </div>
            </div>
            {[[Mail, booking.email],[Phone, booking.phone]].filter(([,v])=>v).map(([Icon, val]) => (
              <div key={val} style={{ display:'flex', alignItems:'center', gap:10, fontSize:13, color:C.text, fontFamily:'Roboto,sans-serif', marginBottom:6 }}>
                <Icon size={13} color={C.muted}/> {val}
              </div>
            ))}
          </div>

          {/* Stay details */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
            {[
              ['Check-in', fmtDate(booking.checkIn)],
              ['Check-out', fmtDate(booking.checkOut)],
              ['Nights', `${booking.nights} night${booking.nights!==1?'s':''}`],
              ['Total', fmt(booking.total)]
            ].map(([label, val]) => (
              <div key={label} style={{ background: C.containerLow, borderRadius:12, padding:'10px 14px', boxShadow: elev[1] }}>
                <div style={{ fontSize:10, textTransform:'uppercase', letterSpacing:'0.08em', color:C.muted, fontFamily:'Roboto,sans-serif', marginBottom:3 }}>{label}</div>
                <div style={{ fontSize:14, fontWeight:700, fontFamily:'Roboto,sans-serif', color:C.navy }}>{val}</div>
              </div>
            ))}
          </div>

          {booking.notes && (
            <div style={{ padding:'12px 16px', background:'rgba(27,54,93,0.05)', borderRadius:12, fontSize:13, fontFamily:'Roboto,sans-serif', color:C.onSurf, borderLeft:`3px solid ${C.navy}` }}>
              <strong style={{ display:'block', marginBottom:4, fontSize:11, textTransform:'uppercase', letterSpacing:'0.08em', color:C.navy }}>Notes</strong>
              {booking.notes}
            </div>
          )}

          {/* Actions */}
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            <div>
              <div style={{ fontSize:11, textTransform:'uppercase', letterSpacing:'0.08em', color:C.muted, fontFamily:'Roboto,sans-serif', marginBottom:8 }}>
                Update Status
              </div>
              <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                {Object.entries(STATUS_CONFIG).map(([s, cfg]) => (
                  <button key={s} onClick={() => setStatus(s)}
                    style={{
                      padding:'6px 14px', fontSize:12, fontFamily:'Roboto,sans-serif',
                      fontWeight:600, borderRadius:20, cursor:'pointer',
                      background: status===s ? cfg.color : 'transparent',
                      color: status===s ? '#fff' : cfg.color,
                      border:`1.5px solid ${cfg.color}`,
                      transition:'all 0.15s'
                    }}>
                    {cfg.label}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={() => setPaid(!paid)}
              style={{
                padding:'10px 16px', fontSize:13, fontFamily:'Roboto,sans-serif',
                fontWeight:600, borderRadius:20, cursor:'pointer',
                background: paid ? C.greenBg : C.amberBg,
                color: paid ? C.green : C.amber,
                border:`1.5px solid ${paid ? C.green+'55' : C.amber+'55'}`,
                transition:'all 0.15s'
              }}>
              {paid ? '✓ Paid — click to mark unpaid' : '⏳ Unpaid — click to mark paid'}
            </button>
          </div>

          <div style={{ display:'flex', gap:8, justifyContent:'flex-end', paddingTop:4 }}>
            <button onClick={onClose}
              style={{
                padding:'10px 20px', fontSize:13, fontFamily:'Roboto,sans-serif',
                fontWeight:600, borderRadius:24, cursor:'pointer',
                background:'transparent', color:C.onSurf,
                border:`1.5px solid ${C.border}`
              }}>
              Cancel
            </button>
            <button onClick={handleSave}
              style={{
                padding:'10px 24px', fontSize:13, fontFamily:'Roboto,sans-serif',
                fontWeight:600, borderRadius:24, cursor:'pointer',
                background: C.navy, color:'#fff', border:'none',
                boxShadow: elev[2], transition:'box-shadow 0.15s'
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = elev[3]}
              onMouseLeave={e => e.currentTarget.style.boxShadow = elev[2]}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── New booking form modal ───────────────────────────────────────
export default function BookingFormModal({ onClose, onSaved }) {
  const today = new Date().toISOString().slice(0,10);
  const [form, setForm] = useState({
    guest:'', email:'', phone:'', room: ROOMS[0],
    checkIn: today, checkOut:'', guests:2, notes:'', paid:false,
  });
  const [error, setError] = useState(null);

  const nights = form.checkIn && form.checkOut
    ? Math.max(0, Math.round((new Date(form.checkOut) - new Date(form.checkIn)) / 86400000))
    : 0;
  const total = nights * (ROOM_PRICES[form.room] || 0);

  function set(key, val) { setForm(prev => ({ ...prev, [key]: val })); }

  function handleSubmit() {
    if (!form.guest || !form.email || !form.checkIn || !form.checkOut || nights < 1) {
      setError('Please fill all required fields and ensure checkout is after check-in.');
      return;
    }
    onSaved({ ...form, nights, total, status:'pending' });
  }

  const Field = ({ label, children }) => (
    <div>
      <label style={{
        display:'block', fontSize:11, textTransform:'uppercase',
        letterSpacing:'0.08em', color:C.onSurf,
        fontFamily:'Roboto,sans-serif', marginBottom:6, fontWeight:600
      }}>{label}</label>
      {children}
    </div>
  );

  return (
    <div style={{
      position:'fixed', inset:0, zIndex:1000,
      background:'rgba(0,0,0,0.5)',
      display:'flex', alignItems:'center', justifyContent:'center', padding:20
    }} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()}
        style={{
          background:'#fff', borderRadius:24,
          width:'100%', maxWidth:520,
          maxHeight:'90vh', overflowY:'auto',
          boxShadow: elev[4]
        }}>

        <div style={{
          padding:'20px 24px', borderBottom:`1px solid ${C.border}`,
          display:'flex', justifyContent:'space-between', alignItems:'center',
          background: C.navy, borderRadius:'24px 24px 0 0'
        }}>
          <span style={{ fontFamily:'Playfair Display,serif', fontSize:18, color:'#fff', fontWeight:600 }}>
            New Booking
          </span>
          <button onClick={onClose}
            style={{
              background:'rgba(255,255,255,0.15)', border:'none',
              borderRadius:'50%', cursor:'pointer', width:34, height:34,
              display:'flex', alignItems:'center', justifyContent:'center', color:'#fff'
            }}>
            <X size={16}/>
          </button>
        </div>

        <div style={{ padding:'22px 24px', display:'flex', flexDirection:'column', gap:16 }}>
          {error && (
            <div style={{
              padding:'12px 16px', background:'#FFDAD6',
              borderRadius:12, fontSize:13,
              fontFamily:'Roboto,sans-serif', color:'#BA1A1A'
            }}>⚠ {error}</div>
          )}

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
            <Field label="Guest Name *">
              <input type="text" value={form.guest} onChange={e => set('guest', e.target.value)}
                style={mdInput}
                onFocus={e => e.target.style.borderColor = C.navy}
                onBlur={e => e.target.style.borderColor = C.border}/>
            </Field>
            <Field label="Email *">
              <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                style={mdInput}
                onFocus={e => e.target.style.borderColor = C.navy}
                onBlur={e => e.target.style.borderColor = C.border}/>
            </Field>
            <Field label="Phone">
              <input type="text" value={form.phone} onChange={e => set('phone', e.target.value)}
                style={mdInput}
                onFocus={e => e.target.style.borderColor = C.navy}
                onBlur={e => e.target.style.borderColor = C.border}/>
            </Field>
            <Field label="Room *">
              <select value={form.room} onChange={e => set('room', e.target.value)}
                style={{ ...mdInput, cursor:'pointer' }}>
                {ROOMS.map(r => <option key={r}>{r}</option>)}
              </select>
            </Field>
            <Field label="Check-in *">
              <input type="date" value={form.checkIn} onChange={e => set('checkIn', e.target.value)}
                style={mdInput}
                onFocus={e => e.target.style.borderColor = C.navy}
                onBlur={e => e.target.style.borderColor = C.border}/>
            </Field>
            <Field label="Check-out *">
              <input type="date" value={form.checkOut} onChange={e => set('checkOut', e.target.value)}
                style={mdInput}
                onFocus={e => e.target.style.borderColor = C.navy}
                onBlur={e => e.target.style.borderColor = C.border}/>
            </Field>
            <Field label="Guests">
              <input type="number" min={1} max={10} value={form.guests}
                onChange={e => set('guests', Number(e.target.value))}
                style={mdInput}
                onFocus={e => e.target.style.borderColor = C.navy}
                onBlur={e => e.target.style.borderColor = C.border}/>
            </Field>
            <div style={{ gridColumn:'1/-1' }}>
              <Field label="Notes">
                <textarea value={form.notes} onChange={e => set('notes', e.target.value)} rows={2}
                  style={{ ...mdInput, resize:'vertical' }}
                  onFocus={e => e.target.style.borderColor = C.navy}
                  onBlur={e => e.target.style.borderColor = C.border}/>
              </Field>
            </div>
          </div>

          {nights > 0 && (
            <div style={{
              padding:'14px 18px', background: C.containerLow,
              borderRadius:16, display:'flex', justifyContent:'space-between', alignItems:'center',
              boxShadow: elev[1]
            }}>
              <span style={{ fontFamily:'Roboto,sans-serif', fontSize:13, color:C.onSurf }}>
                {nights} night{nights!==1?'s':''} × ₱{(ROOM_PRICES[form.room]||0).toLocaleString()}
              </span>
              <span style={{ fontFamily:'Roboto,sans-serif', fontSize:18, fontWeight:700, color:C.navy }}>
                ₱{total.toLocaleString()}
              </span>
            </div>
          )}

          <label style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer', fontFamily:'Roboto,sans-serif', fontSize:13, color:C.text }}>
            <input type="checkbox" checked={form.paid} onChange={e => set('paid', e.target.checked)}
              style={{ width:18, height:18, accentColor: C.navy }}/>
            Mark as paid upon creation
          </label>

          <div style={{ display:'flex', gap:10, justifyContent:'flex-end', paddingTop:4 }}>
            <button onClick={onClose}
              style={{
                padding:'10px 22px', fontSize:13, fontFamily:'Roboto,sans-serif',
                fontWeight:600, borderRadius:24, cursor:'pointer',
                background:'transparent', color:C.onSurf,
                border:`1.5px solid ${C.border}`
              }}>
              Cancel
            </button>
            <button onClick={handleSubmit}
              style={{
                padding:'10px 26px', fontSize:13, fontFamily:'Roboto,sans-serif',
                fontWeight:600, borderRadius:24, cursor:'pointer',
                background: C.navy, color:'#fff', border:'none',
                boxShadow: elev[2]
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = elev[3]}
              onMouseLeave={e => e.currentTarget.style.boxShadow = elev[2]}>
              Create Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
