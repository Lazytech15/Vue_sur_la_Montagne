import { useState, useCallback } from 'react';
import {
  LayoutDashboard, CalendarDays, Users, Receipt, BarChart3,
  Bell, ChevronRight, BedDouble, LogOut, Menu, ChevronLeft
} from 'lucide-react';

import { C, elev } from './admin/tokens';
import DashboardView  from './admin/DashboardView';
import BookingsView   from './admin/BookingsView';
import GuestsView     from './admin/GuestsView';
import BillingView    from './admin/BillingView';
import ReportsView    from './admin/ReportsView';
import { BookingModal } from './admin/BookingFormModal';

// ─── Mock data ────────────────────────────────────────────────────
const INITIAL_BOOKINGS = [
  { id:'BK-0041', guest:'Maria Santos',     email:'maria@email.com',  phone:'+63 917 111 2233', room:'Presidential Villa',     checkIn:'2025-06-14', checkOut:'2025-06-17', guests:4, nights:3, status:'confirmed', paid:true,  total:114000, notes:'Anniversary celebration. Flowers requested.' },
  { id:'BK-0040', guest:'James Reyes',      email:'james@email.com',  phone:'+63 918 444 5566', room:'Premier Lake View',       checkIn:'2025-06-13', checkOut:'2025-06-15', guests:2, nights:2, status:'ongoing',   paid:true,  total:31000,  notes:'' },
  { id:'BK-0039', guest:'Anna Lim',         email:'anna@email.com',   phone:'+63 999 777 8890', room:'Superior Forest Suite',   checkIn:'2025-06-12', checkOut:'2025-06-14', guests:2, nights:2, status:'ongoing',   paid:false, total:24000,  notes:'Late checkout requested.' },
  { id:'BK-0038', guest:'Roberto Cruz',     email:'rob@email.com',    phone:'+63 912 222 3344', room:'Jungle Treehouse Cabin',  checkIn:'2025-06-10', checkOut:'2025-06-12', guests:3, nights:2, status:'completed', paid:true,  total:21000,  notes:'' },
  { id:'BK-0037', guest:'Sofia Dela Torre', email:'sofia@email.com',  phone:'+63 905 888 1122', room:'Deluxe Mountain View',    checkIn:'2025-06-20', checkOut:'2025-06-22', guests:2, nights:2, status:'pending',   paid:false, total:17000,  notes:'First stay. VIP.' },
  { id:'BK-0036', guest:'Miguel Bautista',  email:'miguel@email.com', phone:'+63 920 333 6677', room:'Garden Pavilion Room',    checkIn:'2025-06-18', checkOut:'2025-06-19', guests:1, nights:1, status:'pending',   paid:false, total:7200,   notes:'' },
  { id:'BK-0035', guest:'Carla Mendoza',    email:'carla@email.com',  phone:'+63 933 555 9900', room:'Premier Lake View',       checkIn:'2025-07-01', checkOut:'2025-07-05', guests:2, nights:4, status:'confirmed', paid:true,  total:62000,  notes:'Bring extra pillows.' },
  { id:'BK-0034', guest:'David Tan',        email:'david@email.com',  phone:'+63 908 100 2200', room:'Superior Forest Suite',   checkIn:'2025-07-04', checkOut:'2025-07-06', guests:2, nights:2, status:'confirmed', paid:false, total:24000,  notes:'' },
  { id:'BK-0033', guest:'Lea Fernandez',    email:'lea@email.com',    phone:'+63 925 666 3344', room:'Deluxe Mountain View',    checkIn:'2025-05-20', checkOut:'2025-05-22', guests:2, nights:2, status:'cancelled', paid:false, total:17000,  notes:'Cancelled due to typhoon.' },
  { id:'BK-0032', guest:'Paolo Garcia',     email:'paolo@email.com',  phone:'+63 917 444 8800', room:'Presidential Villa',      checkIn:'2025-05-01', checkOut:'2025-05-04', guests:6, nights:3, status:'completed', paid:true,  total:114000, notes:'' },
  { id:'BK-0031', guest:'Nina Villanueva',  email:'nina@email.com',   phone:'+63 932 999 1100', room:'Jungle Treehouse Cabin',  checkIn:'2025-06-25', checkOut:'2025-06-27', guests:2, nights:2, status:'pending',   paid:false, total:21000,  notes:'Honeymoon package.' },
  { id:'BK-0030', guest:'Marco Sy',         email:'marco@email.com',  phone:'+63 910 777 5566', room:'Garden Pavilion Room',    checkIn:'2025-07-10', checkOut:'2025-07-12', guests:2, nights:2, status:'confirmed', paid:true,  total:14400,  notes:'' },
];

const NAV_ITEMS = [
  { id:'dashboard', label:'Dashboard', icon:LayoutDashboard },
  { id:'bookings',  label:'Bookings',  icon:CalendarDays    },
  { id:'guests',    label:'Guests',    icon:Users           },
  { id:'billing',   label:'Billing',   icon:Receipt         },
  { id:'reports',   label:'Reports',   icon:BarChart3       },
];

function nextId(bookings) {
  const nums = bookings.map(b => parseInt(b.id.replace('BK-',''),10));
  const max  = nums.length ? Math.max(...nums) : 0;
  return `BK-${String(max+1).padStart(4,'0')}`;
}

export default function AdminDashboard({ onLogout }) {
  const [view,        setView]        = useState('dashboard');
  const [bookings,    setBookings]    = useState(INITIAL_BOOKINGS);
  const [selected,    setSelected]    = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleStatusChange = useCallback((id, status, paid) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status, paid } : b));
  }, []);

  const handleMarkPaid = useCallback((id) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, paid: true } : b));
  }, []);

  const handleCreateBooking = useCallback((formData) => {
    const id = nextId(bookings);
    setBookings(prev => [{ id, ...formData }, ...prev]);
  }, [bookings]);

  const pending  = bookings.filter(b => b.status === 'pending').length;
  const sidebarW = sidebarOpen ? 240 : 72;

  const viewProps = {
    bookings,
    loading: false,
    error:   null,
    onRefresh: () => {},
    onRetry:   () => {},
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&family=Roboto+Mono:wght@500;600&family=Playfair+Display:wght@400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${C.bg}; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes ripple { to { transform: scale(4); opacity: 0; } }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${C.container}; border-radius: 3px; }
      `}</style>

      <div style={{
        display:'flex', height:'100vh',
        background: C.bg,
        fontFamily:'Roboto,sans-serif', overflow:'hidden'
      }}>

        {/* ── MD3 Navigation Drawer (sidebar) ─────────────────── */}
        <div style={{
          width: sidebarW,
          background: C.surface,
          display:'flex', flexDirection:'column',
          transition:'width 0.25s cubic-bezier(.4,0,.2,1)',
          flexShrink:0, overflow:'hidden',
          boxShadow: elev[3],
          zIndex: 10
        }}>

          {/* Logo / Brand */}
          <div style={{
            padding: sidebarOpen ? '20px 20px 16px' : '20px 12px 16px',
            borderBottom:`1px solid ${C.border}`,
            display:'flex', alignItems:'center', gap:12, minHeight:72
          }}>
            <div style={{
              width:40, height:40, background: C.navy, borderRadius:12,
              display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
              boxShadow: elev[2]
            }}>
              <BedDouble size={18} color='#fff'/>
            </div>
            {sidebarOpen && (
              <div style={{ overflow:'hidden' }}>
                <div style={{
                  fontFamily:'Playfair Display,serif', fontSize:14,
                  color: C.navy, fontWeight:600, whiteSpace:'nowrap', lineHeight:1.2
                }}>Vue sur la Montagne</div>
                <div style={{ fontSize:10, color:C.muted, letterSpacing:'0.1em', textTransform:'uppercase', marginTop:2 }}>
                  Admin Portal
                </div>
              </div>
            )}
          </div>

          {/* Nav items */}
          <nav style={{ flex:1, padding:'12px 8px', overflow:'hidden' }}>
            {sidebarOpen && (
              <div style={{ fontSize:11, color:C.muted, letterSpacing:'0.08em', textTransform:'uppercase',
                padding:'4px 12px 8px', fontFamily:'Roboto,sans-serif', fontWeight:600 }}>
                Navigation
              </div>
            )}
            {NAV_ITEMS.map(item => {
              const Icon   = item.icon;
              const active = view === item.id;
              return (
                <button key={item.id} onClick={() => setView(item.id)}
                  title={!sidebarOpen ? item.label : undefined}
                  style={{
                    width:'100%', display:'flex', alignItems:'center',
                    gap:12, padding: sidebarOpen ? '12px 16px' : '12px',
                    borderRadius:28, marginBottom:2,
                    // MD3 active indicator
                    background: active ? C.containerLow : 'transparent',
                    border:'none', cursor:'pointer',
                    color: active ? C.navy : C.onSurf,
                    transition:'all 0.2s',
                    justifyContent: sidebarOpen ? 'flex-start' : 'center',
                    position:'relative', overflow:'hidden'
                  }}
                  onMouseEnter={e => { if(!active) e.currentTarget.style.background = C.surfaceVar; }}
                  onMouseLeave={e => { if(!active) e.currentTarget.style.background = 'transparent'; }}>
                  {/* Active indicator bar */}
                  {active && (
                    <div style={{
                      position:'absolute', left:0, top:'20%', bottom:'20%',
                      width:4, background:C.navy, borderRadius:'0 4px 4px 0'
                    }} />
                  )}
                  <Icon size={20} style={{ flexShrink:0 }}/>
                  {sidebarOpen && (
                    <span style={{
                      fontSize:14, fontWeight: active ? 600 : 400,
                      whiteSpace:'nowrap', letterSpacing:'0.01em', flex:1, textAlign:'left'
                    }}>{item.label}</span>
                  )}
                  {item.id === 'bookings' && pending > 0 && (
                    <span style={{
                      background:'#ef4444', color:'#fff',
                      fontSize:10, fontWeight:700, borderRadius:20,
                      minWidth:18, height:18, display:'flex', alignItems:'center',
                      justifyContent:'center', padding:'0 4px', flexShrink:0
                    }}>{pending}</span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User & collapse */}
          <div style={{ borderTop:`1px solid ${C.border}`, padding:'12px 8px' }}>
            {/* Collapse toggle */}
            <button onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                width:'100%', display:'flex', alignItems:'center',
                gap:10, padding:'8px 14px', background:'none',
                border:'none', cursor:'pointer', color:C.muted,
                borderRadius:28, justifyContent: sidebarOpen ? 'flex-start' : 'center',
                marginBottom:8, transition:'background 0.15s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = C.surfaceVar}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}>
              {sidebarOpen ? <ChevronLeft size={16}/> : <Menu size={16}/>}
              {sidebarOpen && <span style={{ fontSize:12, fontFamily:'Roboto,sans-serif' }}>Collapse</span>}
            </button>

            {sidebarOpen && (
              <div style={{
                background: C.surfaceVar, borderRadius:16, padding:'12px 14px',
                boxShadow: elev[1]
              }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
                  <div style={{
                    width:34, height:34, borderRadius:'50%',
                    background: C.container,
                    display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
                    boxShadow: elev[1]
                  }}>
                    <span style={{ fontSize:13, color:C.navy, fontWeight:700, fontFamily:'Playfair Display,serif' }}>A</span>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, color:C.text, fontWeight:600 }}>Admin</div>
                    <div style={{ fontSize:11, color:C.muted, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                      admin@vslm.ph
                    </div>
                  </div>
                </div>
                <button onClick={onLogout}
                  style={{
                    width:'100%', display:'flex', alignItems:'center',
                    justifyContent:'center', gap:8, padding:'8px 12px',
                    background:'transparent', border:`1.5px solid rgba(186,26,26,0.35)`,
                    borderRadius:20, cursor:'pointer', color:'#BA1A1A',
                    fontSize:12, fontFamily:'Roboto,sans-serif', fontWeight:600,
                    transition:'all 0.15s'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background='rgba(186,26,26,0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='transparent'; }}>
                  <LogOut size={13}/> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Main content area ──────────────────────────────── */}
        <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>

          {/* MD3 Top App Bar */}
          <div style={{
            height:64, background: C.surface,
            boxShadow: elev[1],
            display:'flex', alignItems:'center', justifyContent:'space-between',
            padding:'0 28px', flexShrink:0, zIndex:9
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ fontSize:12, color:C.muted, textTransform:'uppercase', letterSpacing:'0.1em' }}>
                Vue sur la Montagne
              </span>
              <ChevronRight size={12} color={C.muted}/>
              <span style={{ fontSize:12, color:C.navy, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em' }}>
                {NAV_ITEMS.find(n => n.id === view)?.label}
              </span>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:14 }}>
              {/* Bell with badge */}
              <button style={{
                position:'relative', background:C.surfaceVar, border:'none',
                cursor:'pointer', color:C.onSurf, padding:10, borderRadius:'50%',
                display:'flex', alignItems:'center', boxShadow: elev[1],
                transition:'box-shadow 0.15s'
              }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = elev[2]}
                onMouseLeave={e => e.currentTarget.style.boxShadow = elev[1]}>
                <Bell size={18}/>
                {pending > 0 && (
                  <span style={{
                    position:'absolute', top:6, right:6, width:9, height:9,
                    background:'#ef4444', borderRadius:'50%',
                    border:`2px solid ${C.surface}`
                  }}/>
                )}
              </button>
              <div style={{ width:1, height:24, background:C.border }}/>
              <span style={{ fontSize:13, color:C.muted, fontFamily:'Roboto,sans-serif' }}>
                {new Date().toLocaleDateString('en-PH',{weekday:'short',month:'short',day:'numeric'})}
              </span>
            </div>
          </div>

          {/* Page content */}
          <div style={{ flex:1, overflowY:'auto', padding:28 }}>
            {view === 'dashboard' && <DashboardView {...viewProps} onSelect={setSelected}/>}
            {view === 'bookings'  && <BookingsView  {...viewProps} onSelect={setSelected} onStatusChange={handleStatusChange} onCreateBooking={handleCreateBooking}/>}
            {view === 'guests'    && <GuestsView    {...viewProps}/>}
            {view === 'billing'   && <BillingView   {...viewProps} onMarkPaid={handleMarkPaid}/>}
            {view === 'reports'   && <ReportsView   {...viewProps}/>}
          </div>
        </div>

        {selected && (
          <BookingModal
            booking={selected}
            onClose={() => setSelected(null)}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>
    </>
  );
}
