import { useState } from 'react';
import { Calendar, Users, BedDouble, Search, User, Mail, Loader2 } from 'lucide-react';

const roomTypes = [
  'Deluxe Mountain View',
  'Superior Forest Suite',
  'Premier Lake View',
  'Presidential Villa',
  'Jungle Treehouse Cabin',
];

const WORKER_URL = 'https://sendtouchemail.eablao.workers.dev';

export default function BookingSection() {
  const [form, setForm] = useState({
    guestName: '',
    guestEmail: '',
    checkIn: '',
    checkOut: '',
    guests: '2',
    rooms: '1',
    roomType: roomTypes[0],
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [bookingId, setBookingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const response = await fetch(`${WORKER_URL}/api/booking/guest-confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guestName:  form.guestName,
          guestEmail: form.guestEmail,
          roomType:   form.roomType,
          checkIn:    form.checkIn,
          checkOut:   form.checkOut,
          guests:     form.guests,
        }),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const data = await response.json();
      setBookingId(data.bookingRef ?? null);
      setStatus('success');
    } catch (err) {
      console.error('Booking error:', err);
      setErrorMsg('Something went wrong. Please try again or call us directly.');
      setStatus('error');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setBookingId(null);
    setErrorMsg('');
    setForm({
      guestName: '',
      guestEmail: '',
      checkIn: '',
      checkOut: '',
      guests: '2',
      rooms: '1',
      roomType: roomTypes[0],
    });
  };

  const inputClass =
    'w-full px-4 py-3 text-sm outline-none transition-all duration-200 rounded-sm';
  const inputStyle = {
    background: 'rgba(27,54,93,0.06)',
    border: '1px solid rgba(27,54,93,0.15)',
    color: '#333333',
    fontFamily: 'Lato, sans-serif',
  };
  const labelClass = 'text-xs tracking-widest uppercase flex items-center gap-2';
  const labelStyle = { fontFamily: 'Lato, sans-serif', color: 'rgba(51,51,51,0.55)' };

  return (
    <section id="booking" className="relative z-10 -mt-2 px-4 pb-20">
      <div className="max-w-5xl mx-auto">

        <div
          className="shadow-2xl p-8 lg:p-12 reveal"
          style={{ background: '#F5F0E8', border: '1px solid rgba(220,203,181,0.5)' }}
        >
          <div className="text-center mb-10">
            <span
              className="text-xs tracking-[0.4em] uppercase"
              style={{ fontFamily: 'Cinzel, serif', color: '#1B365D', opacity: 0.7 }}
            >
              Reserve Your Experience
            </span>
            <h2
              className="text-3xl md:text-4xl font-light italic mt-2"
              style={{ fontFamily: 'Playfair Display, serif', color: '#1B365D' }}
            >
              Book Your Stay
            </h2>
          </div>

          {/* ── SUCCESS ── */}
          {status === 'success' && (
            <div className="text-center py-10">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(27,54,93,0.1)', border: '1px solid rgba(27,54,93,0.3)' }}
              >
                <span className="text-2xl" style={{ color: '#1B365D' }}>✓</span>
              </div>
              <h3
                className="text-2xl italic mb-2"
                style={{ fontFamily: 'Playfair Display, serif', color: '#1B365D' }}
              >
                Request Received!
              </h3>
              <p className="text-sm mb-1" style={{ fontFamily: 'Lato, sans-serif', color: '#333333', opacity: 0.6 }}>
                A confirmation email has been sent to{' '}
                <strong style={{ opacity: 1 }}>{form.guestEmail}</strong>.
              </p>
              <p className="text-sm mb-6" style={{ fontFamily: 'Lato, sans-serif', color: '#333333', opacity: 0.6 }}>
                Our reservations team will confirm your booking within 24 hours.
              </p>
              {bookingId && (
                <p className="text-xs mb-6 font-mono" style={{ color: 'rgba(27,54,93,0.45)' }}>
                  Booking ref: {bookingId}
                </p>
              )}
              <button
                onClick={handleReset}
                className="text-xs tracking-widest uppercase px-6 py-2 rounded-sm transition-all duration-200"
                style={{ border: '1px solid rgba(27,54,93,0.3)', color: '#1B365D', fontFamily: 'Lato, sans-serif', background: 'transparent' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(27,54,93,0.08)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                Make Another Booking
              </button>
            </div>
          )}

          {/* ── FORM ── */}
          {(status === 'idle' || status === 'loading' || status === 'error') && (
            <form onSubmit={handleSubmit}>
              {status === 'error' && (
                <div
                  className="mb-6 px-4 py-3 rounded-sm text-sm text-center"
                  style={{ background: 'rgba(180,30,30,0.07)', border: '1px solid rgba(180,30,30,0.2)', color: '#8b1a1a', fontFamily: 'Lato, sans-serif' }}
                >
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                  <label className={labelClass} style={labelStyle}>
                    <User size={12} style={{ color: '#1B365D' }} />Full Name
                  </label>
                  <input type="text" name="guestName" value={form.guestName} onChange={handleChange}
                    placeholder="Juan dela Cruz" required className={inputClass} style={inputStyle} />
                </div>

                <div className="flex flex-col gap-2">
                  <label className={labelClass} style={labelStyle}>
                    <Mail size={12} style={{ color: '#1B365D' }} />Email Address
                  </label>
                  <input type="email" name="guestEmail" value={form.guestEmail} onChange={handleChange}
                    placeholder="juan@email.com" required className={inputClass} style={inputStyle} />
                </div>

                <div className="flex flex-col gap-2">
                  <label className={labelClass} style={labelStyle}>
                    <BedDouble size={12} style={{ color: '#1B365D' }} />Room Type
                  </label>
                  <select name="roomType" value={form.roomType} onChange={handleChange} className={inputClass} style={inputStyle}>
                    {roomTypes.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className={labelClass} style={labelStyle}>
                    <Calendar size={12} style={{ color: '#1B365D' }} />Check-in Date
                  </label>
                  <input type="date" name="checkIn" value={form.checkIn} onChange={handleChange}
                    required className={inputClass} style={{ ...inputStyle, colorScheme: 'light' }} />
                </div>

                <div className="flex flex-col gap-2">
                  <label className={labelClass} style={labelStyle}>
                    <Calendar size={12} style={{ color: '#1B365D' }} />Check-out Date
                  </label>
                  <input type="date" name="checkOut" value={form.checkOut} onChange={handleChange}
                    required className={inputClass} style={{ ...inputStyle, colorScheme: 'light' }} />
                </div>

                <div className="flex flex-col gap-2">
                  <label className={labelClass} style={labelStyle}>
                    <Users size={12} style={{ color: '#1B365D' }} />Guests
                  </label>
                  <select name="guests" value={form.guests} onChange={handleChange} className={inputClass} style={inputStyle}>
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-3 px-8 py-3.5 text-sm tracking-widest uppercase font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg rounded-sm disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
                  style={{ background: '#1B365D', color: '#DCCBB5', fontFamily: 'Lato, sans-serif' }}
                  onMouseEnter={(e) => { if (status !== 'loading') e.currentTarget.style.background = '#152b4a'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#1B365D'; }}
                >
                  {status === 'loading' ? (
                    <><Loader2 size={15} className="animate-spin" />Sending Request...</>
                  ) : (
                    <><Search size={15} />Check Availability</>
                  )}
                </button>
              </div>

              <p className="text-center text-xs mt-4 tracking-wide" style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(51,51,51,0.4)' }}>
                Best rate guaranteed · Free cancellation up to 48 hours before arrival
              </p>
            </form>
          )}
        </div>

        {/* ── Stats strip ── */}
        <div className="grid grid-cols-2 md:grid-cols-4" style={{ border: '1px solid rgba(27,54,93,0.12)', borderTop: 'none' }}>
          {[
            { value: '48',   label: 'Luxury Rooms' },
            { value: '12',   label: 'Private Villas' },
            { value: '4.9★', label: 'Guest Rating' },
            { value: '45',   label: 'Mins from Manila' },
          ].map((stat, i) => (
            <div key={i} className="px-6 py-6 text-center transition-colors cursor-default"
              style={{ borderRight: i < 3 ? '1px solid rgba(27,54,93,0.1)' : 'none', background: 'rgba(27,54,93,0.04)' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(27,54,93,0.08)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(27,54,93,0.04)')}
            >
              <div className="text-3xl font-semibold shimmer-sand" style={{ fontFamily: 'Playfair Display, serif' }}>{stat.value}</div>
              <div className="text-xs tracking-widest uppercase mt-1" style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(51,51,51,0.5)' }}>{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}