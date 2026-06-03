import { useState } from 'react';
import { Calendar, Users, BedDouble, Search } from 'lucide-react';

const roomTypes = [
  'Deluxe Mountain View',
  'Superior Forest Suite',
  'Premier Lake View',
  'Presidential Villa',
  'Jungle Treehouse Cabin',
];

export default function BookingSection() {
  const [form, setForm] = useState({ checkIn: '', checkOut: '', guests: '2', rooms: '1', roomType: roomTypes[0] });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const inputClass = "w-full px-4 py-3 text-sm outline-none transition-all duration-200 rounded-sm";
  const inputStyle = {
    background: 'rgba(27,54,93,0.06)',
    border: '1px solid rgba(27,54,93,0.15)',
    color: '#333333',
    fontFamily: 'Lato, sans-serif',
  };

  return (
    <section id="booking" className="relative z-10 -mt-2 px-4 pb-20">
      <div className="max-w-5xl mx-auto">
        {/* Card */}
        <div
          className="shadow-2xl p-8 lg:p-12 reveal"
          style={{ background: '#F5F0E8', border: '1px solid rgba(220,203,181,0.5)' }}
        >
          <div className="text-center mb-10">
            <span className="text-xs tracking-[0.4em] uppercase" style={{ fontFamily: 'Cinzel, serif', color: '#1B365D', opacity: 0.7 }}>
              Reserve Your Experience
            </span>
            <h2 className="text-3xl md:text-4xl font-light italic mt-2" style={{ fontFamily: 'Playfair Display, serif', color: '#1B365D' }}>
              Book Your Stay
            </h2>
          </div>

          {submitted ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(27,54,93,0.1)', border: '1px solid rgba(27,54,93,0.3)' }}>
                <span className="text-2xl" style={{ color: '#1B365D' }}>✓</span>
              </div>
              <h3 className="text-2xl italic mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#1B365D' }}>Request Received!</h3>
              <p className="text-sm" style={{ fontFamily: 'Lato, sans-serif', color: '#333333', opacity: 0.6 }}>Our reservations team will confirm within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { label: 'Check-in Date', name: 'checkIn', type: 'date', icon: <Calendar size={12} /> },
                  { label: 'Check-out Date', name: 'checkOut', type: 'date', icon: <Calendar size={12} /> },
                ].map(({ label, name, type, icon }) => (
                  <div key={name} className="flex flex-col gap-2">
                    <label className="text-xs tracking-widest uppercase flex items-center gap-2" style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(51,51,51,0.55)' }}>
                      <span style={{ color: '#1B365D' }}>{icon}</span>{label}
                    </label>
                    <input
                      type={type} name={name} value={form[name]} onChange={handleChange} required
                      className={inputClass}
                      style={{ ...inputStyle, colorScheme: 'light' }}
                    />
                  </div>
                ))}

                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-widest uppercase flex items-center gap-2" style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(51,51,51,0.55)' }}>
                    <BedDouble size={12} style={{ color: '#1B365D' }} />Room Type
                  </label>
                  <select name="roomType" value={form.roomType} onChange={handleChange} className={inputClass} style={inputStyle}>
                    {roomTypes.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-widest uppercase flex items-center gap-2" style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(51,51,51,0.55)' }}>
                    <Users size={12} style={{ color: '#1B365D' }} />Guests
                  </label>
                  <select name="guests" value={form.guests} onChange={handleChange} className={inputClass} style={inputStyle}>
                    {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} {n===1?'Guest':'Guests'}</option>)}
                  </select>
                </div>

                <div className="flex flex-col justify-end">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 px-8 py-3.5 text-sm tracking-widest uppercase font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg rounded-sm"
                    style={{ background: '#1B365D', color: '#DCCBB5', fontFamily: 'Lato, sans-serif' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#152b4a'}
                    onMouseLeave={e => e.currentTarget.style.background = '#1B365D'}
                  >
                    <Search size={15} />Check Availability
                  </button>
                </div>
              </div>
              <p className="text-center text-xs mt-6 tracking-wide" style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(51,51,51,0.4)' }}>
                Best rate guaranteed · Free cancellation up to 48 hours before arrival
              </p>
            </form>
          )}
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4" style={{ border: '1px solid rgba(27,54,93,0.12)', borderTop: 'none' }}>
          {[
            { value: '48', label: 'Luxury Rooms' },
            { value: '12', label: 'Private Villas' },
            { value: '4.9★', label: 'Guest Rating' },
            { value: '45', label: 'Mins from Manila' },
          ].map((stat, i) => (
            <div
              key={i}
              className="px-6 py-6 text-center transition-colors cursor-default"
              style={{ borderRight: i < 3 ? '1px solid rgba(27,54,93,0.1)' : 'none', background: 'rgba(27,54,93,0.04)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(27,54,93,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(27,54,93,0.04)'}
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
