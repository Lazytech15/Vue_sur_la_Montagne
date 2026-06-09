// ─── Design tokens — Material Design 3, Blue hotel palette ──────────
export const C = {
  // Primary brand (navy blue — kept from original)
  navy:      '#1B365D',
  navyDim:   '#152b4a',
  navyLight: '#2A4F83',

  // MD3 surface system
  surface:    '#FFFFFF',
  surfaceVar: '#F0F4FA',
  surfaceDim: '#E8EEF7',
  bg:         '#EDF1F9',

  // Tonal surfaces (blue-tinted Material)
  containerLow:  '#E3EAF5',
  container:     '#D6E1F5',
  containerHigh: '#C4D4F0',

  sand:   '#DCCBB5',
  cream:  '#F5F0E8',
  warm:   '#EDE7D9',

  text:   '#1A1C1E',
  onSurf: '#44474F',
  muted:  'rgba(27,54,93,0.45)',
  border: 'rgba(27,54,93,0.10)',

  green:   '#386A30',
  greenBg: '#D5EDCF',
  amber:   '#7A5300',
  amberBg: '#FDEDB8',
  red:     '#BA1A1A',
  redBg:   '#FFDAD6',
  blue:    '#0054A3',
  blueBg:  '#D6E2FF',
};

// ─── Material elevation shadows ───────────────────────────────────
export const elev = {
  1: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
  2: '0 3px 6px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)',
  3: '0 6px 16px rgba(27,54,93,0.14), 0 2px 6px rgba(27,54,93,0.08)',
  4: '0 10px 28px rgba(27,54,93,0.16), 0 4px 10px rgba(27,54,93,0.10)',
};

export const STATUS_CONFIG = {
  pending:   { label:'Pending',   color: C.amber,  bg: C.amberBg, icon: 'Clock'        },
  confirmed: { label:'Confirmed', color: C.blue,   bg: C.blueBg,  icon: 'CheckCircle2' },
  ongoing:   { label:'Ongoing',   color: C.green,  bg: C.greenBg, icon: 'RefreshCw'    },
  completed: { label:'Completed', color: C.onSurf, bg: C.surfaceDim, icon: 'Check'     },
  cancelled: { label:'Cancelled', color: C.red,    bg: C.redBg,   icon: 'XCircle'      },
};

export const fmt     = (n) => `₱${n.toLocaleString()}`;
export const fmtDate = (d) => new Date(d).toLocaleDateString('en-PH', { month:'short', day:'numeric', year:'numeric' });

// ─── Cloudflare D1 API helper ─────────────────────────────────────
export async function dbQuery(endpoint, options = {}) {
  const res = await fetch(`/api/${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
  return res.json();
}

export const api = {
  getBookings:       ()          => dbQuery('bookings'),
  createBooking:     (data)      => dbQuery('bookings', { method:'POST', body: JSON.stringify(data) }),
  updateBooking:     (id, data)  => dbQuery(`bookings/${id}`, { method:'PATCH', body: JSON.stringify(data) }),
  deleteBooking:     (id)        => dbQuery(`bookings/${id}`, { method:'DELETE' }),
  getGuests:         ()          => dbQuery('guests'),
  getGuest:          (id)        => dbQuery(`guests/${id}`),
  getBilling:        ()          => dbQuery('billing'),
  markPaid:          (bookingId) => dbQuery(`billing/${bookingId}/pay`, { method:'POST' }),
  getReports:        (params)    => dbQuery(`reports?${new URLSearchParams(params)}`),
};
