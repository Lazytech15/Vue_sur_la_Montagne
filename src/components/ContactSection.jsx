import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }, 4000);
  };

  const inputClass = "w-full px-4 py-3 text-sm outline-none transition-all duration-200 rounded-sm";
  const inputStyle = {
    background: 'rgba(27,54,93,0.04)',
    border: '1px solid rgba(27,54,93,0.15)',
    color: '#333333',
    fontFamily: 'Lato, sans-serif',
  };

  return (
    <section id="contact" className="py-24 px-6 lg:px-10" style={{ background: '#F5F0E8' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal">
          <span className="text-xs tracking-[0.4em] uppercase" style={{ fontFamily: 'Cinzel, serif', color: '#1B365D', opacity: 0.65 }}>Get in Touch</span>
          <h2 className="text-4xl md:text-5xl font-light italic mt-3" style={{ fontFamily: 'Playfair Display, serif', color: '#1B365D' }}>
            We'd Love to Hear From You
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Info */}
          <div className="lg:col-span-2 space-y-8 reveal-left">
            <div>
              <h3 className="text-2xl font-light italic mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#1B365D' }}>Vue sur la Montagne Hotel</h3>
              <p className="text-sm leading-relaxed" style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(51,51,51,0.6)' }}>
                For inquiries, group bookings, corporate events, and wedding packages, our dedicated team is available 7 days a week.
              </p>
            </div>
            {[
              { icon: <MapPin size={15} />, label: 'Address', value: 'Km. 28 Tanay–Sampaloc Road, Tanay, Rizal 1980, Philippines' },
              { icon: <Phone size={15} />, label: 'Telephone', value: '+63 2 8123 4567\n+63 917 555 8900' },
              { icon: <Mail size={15} />, label: 'Email', value: 'reservations@vuesurmontagne.ph\ninfo@vuesurmontagne.ph' },
              { icon: <Clock size={15} />, label: 'Front Desk', value: 'Open 24 hours, 7 days a week' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(27,54,93,0.08)', border: '1px solid rgba(27,54,93,0.2)', color: '#1B365D' }}>
                  {item.icon}
                </div>
                <div>
                  <div className="text-xs tracking-widest uppercase mb-1" style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(51,51,51,0.4)' }}>{item.label}</div>
                  <div className="text-sm leading-relaxed whitespace-pre-line" style={{ fontFamily: 'Lato, sans-serif', color: '#333333' }}>{item.value}</div>
                </div>
              </div>
            ))}
            <div>
              <div className="text-xs tracking-widest uppercase mb-3" style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(51,51,51,0.4)' }}>Follow Us</div>
              <div className="flex flex-wrap gap-2">
                {['Facebook', 'Instagram', 'Twitter', 'TripAdvisor'].map((s) => (
                  <a key={s} href="#"
                    className="px-3 py-1.5 text-xs transition-colors"
                    style={{ border: '1px solid rgba(27,54,93,0.15)', color: 'rgba(27,54,93,0.55)', fontFamily: 'Lato, sans-serif' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(27,54,93,0.4)'; e.currentTarget.style.color = '#1B365D'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(27,54,93,0.15)'; e.currentTarget.style.color = 'rgba(27,54,93,0.55)'; }}
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 p-8 md:p-10 reveal-right" style={{ background: '#ffffff', border: '1px solid rgba(27,54,93,0.1)' }}>
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(27,54,93,0.08)', border: '1px solid rgba(27,54,93,0.25)' }}>
                  <Send size={20} style={{ color: '#1B365D' }} />
                </div>
                <h3 className="text-2xl italic mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#1B365D' }}>Message Sent!</h3>
                <p className="text-sm" style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(51,51,51,0.55)' }}>We'll reply within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {['name', 'email'].map(field => (
                    <div key={field} className="flex flex-col gap-2">
                      <label className="text-xs tracking-widest uppercase" style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(51,51,51,0.5)' }}>
                        {field === 'name' ? 'Full Name' : 'Email'}
                      </label>
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        placeholder={field === 'name' ? 'Juan dela Cruz' : 'juan@email.com'}
                        value={form[field]}
                        onChange={e => setForm({...form, [field]: e.target.value})}
                        required
                        className={inputClass}
                        style={inputStyle}
                        onFocus={e => e.currentTarget.style.borderColor = 'rgba(27,54,93,0.4)'}
                        onBlur={e => e.currentTarget.style.borderColor = 'rgba(27,54,93,0.15)'}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-widest uppercase" style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(51,51,51,0.5)' }}>Subject</label>
                  <input
                    type="text"
                    placeholder="Room inquiry, group booking, event..."
                    value={form.subject}
                    onChange={e => setForm({...form, subject: e.target.value})}
                    className={inputClass}
                    style={inputStyle}
                    onFocus={e => e.currentTarget.style.borderColor = 'rgba(27,54,93,0.4)'}
                    onBlur={e => e.currentTarget.style.borderColor = 'rgba(27,54,93,0.15)'}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-widest uppercase" style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(51,51,51,0.5)' }}>Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell us how we can make your stay extraordinary..."
                    value={form.message}
                    onChange={e => setForm({...form, message: e.target.value})}
                    required
                    className={`${inputClass} resize-none`}
                    style={inputStyle}
                    onFocus={e => e.currentTarget.style.borderColor = 'rgba(27,54,93,0.4)'}
                    onBlur={e => e.currentTarget.style.borderColor = 'rgba(27,54,93,0.15)'}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 text-sm tracking-widest uppercase font-medium transition-all duration-300 hover:-translate-y-0.5 rounded-sm"
                  style={{ background: '#1B365D', color: '#DCCBB5', fontFamily: 'Lato, sans-serif' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#152b4a'}
                  onMouseLeave={e => e.currentTarget.style.background = '#1B365D'}
                >
                  <Send size={14} />Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
