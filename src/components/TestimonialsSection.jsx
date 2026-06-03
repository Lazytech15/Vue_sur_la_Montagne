import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  { name: 'Maria Santos', title: 'Travel Blogger, Maynila Chronicles', rating: 5, quote: 'Vue sur la Montagne changed how I think about staycations. Waking up to the Sierra Madre clouds from my suite balcony, sipping Benguet coffee — I never wanted to leave. The staff felt like family.', stay: 'Forest Suite · 3 Nights' },
  { name: 'James & Celine Reyes', title: 'Honeymoon Couple, Quezon City', rating: 5, quote: 'We celebrated our honeymoon here and it was absolutely magical. The private villa with the jacuzzi overlooking the lake, the candlelit dinner set up by the pool — every detail was perfect.', stay: 'Presidential Villa · 4 Nights' },
  { name: 'Dr. Ramon Villanueva', title: 'Wellness Retreat Guest', rating: 5, quote: "I came for a weekend detox and left completely transformed. The hilot spa, the mountain walks, the silence — it's therapeutic in a way no clinic can replicate. I return every quarter now.", stay: 'Garden Pavilion · 5 Nights' },
  { name: 'Sofia & Miko Lim', title: 'Anniversary Guests, Makati', rating: 5, quote: "From the treehouse cabin to the stargazing session at 10pm — Vue sur la Montagne curates magic effortlessly. The Rizal farm-to-table dinner was the best meal we've had in the Philippines.", stay: 'Treehouse Cabin · 2 Nights' },
];

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];

  return (
    <section className="py-24 px-6 lg:px-10" style={{ background: '#1B365D' }}>
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-xs tracking-[0.4em] uppercase reveal" style={{ fontFamily: 'Cinzel, serif', color: '#DCCBB5', opacity: 0.7 }}>Guest Stories</span>
        <h2 className="text-4xl md:text-5xl font-light italic mt-3 mb-14 reveal" style={{ fontFamily: 'Playfair Display, serif', color: '#F5F0E8' }}>
          Voices of Vue sur la Montagne
        </h2>

        <div className="relative p-10 md:p-14 reveal" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(220,203,181,0.15)' }}>
          <Quote size={38} className="absolute top-8 left-8" style={{ color: 'rgba(220,203,181,0.15)' }} />
          <div className="flex items-center justify-center gap-1.5 mb-6">
            {[...Array(t.rating)].map((_, i) => (
              <Star key={i} size={14} style={{ fill: '#DCCBB5', color: '#DCCBB5' }} />
            ))}
          </div>
          <blockquote className="text-xl md:text-2xl font-light italic leading-relaxed mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'Playfair Display, serif', color: '#F5F0E8' }}>
            "{t.quote}"
          </blockquote>
          <div className="ornament-divider max-w-xs mx-auto mb-6" style={{ '--ornament-color': 'rgba(220,203,181,0.3)' }}>
            <span className="px-3 text-xs" style={{ color: 'rgba(220,203,181,0.35)' }}>✦</span>
          </div>
          <div>
            <div className="font-medium text-sm tracking-wide" style={{ fontFamily: 'Lato, sans-serif', color: '#F5F0E8' }}>{t.name}</div>
            <div className="text-xs mt-0.5" style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(220,203,181,0.5)' }}>{t.title}</div>
            <div className="mt-2 inline-block px-3 py-1 text-xs tracking-wide rounded-sm" style={{ background: 'rgba(220,203,181,0.1)', border: '1px solid rgba(220,203,181,0.2)', color: '#DCCBB5', fontFamily: 'Lato, sans-serif' }}>
              {t.stay}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={() => setIndex((index - 1 + testimonials.length) % testimonials.length)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ border: '1px solid rgba(220,203,181,0.2)', color: 'rgba(220,203,181,0.6)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(220,203,181,0.5)'; e.currentTarget.style.color = '#DCCBB5'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(220,203,181,0.2)'; e.currentTarget.style.color = 'rgba(220,203,181,0.6)'; }}
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === index ? '24px' : '8px',
                  height: '8px',
                  background: i === index ? '#DCCBB5' : 'rgba(220,203,181,0.25)',
                }}
              />
            ))}
          </div>
          <button
            onClick={() => setIndex((index + 1) % testimonials.length)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ border: '1px solid rgba(220,203,181,0.2)', color: 'rgba(220,203,181,0.6)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(220,203,181,0.5)'; e.currentTarget.style.color = '#DCCBB5'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(220,203,181,0.2)'; e.currentTarget.style.color = 'rgba(220,203,181,0.6)'; }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
