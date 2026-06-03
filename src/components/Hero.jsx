import { useState, useEffect, useCallback } from 'react';
import { ChevronDown, Star, ChevronLeft, ChevronRight } from 'lucide-react';

import img1 from '../assets/mountain_view.jpg';
import img2 from '../assets/lake_view_reflection.jpg';
import img3 from '../assets/superior_forest_suit.jpg';
import img4 from '../assets/presidential_villa.jpg';
import img5 from '../assets/jungle_treehouse.webp';
import img6 from '../assets/garden_pavillion_room.jpg';

const slides = [
  { image: img1, label: 'Deluxe Mountain View',     location: 'Sierra Madre Highlands' },
  { image: img2, label: 'Premier Lake View',         location: 'Tanay, Rizal' },
  { image: img3, label: 'Superior Forest Suite',     location: 'Vue sur la Montagne Resort' },
  { image: img4, label: 'Presidential Villa',        location: 'Vue sur la Montagne Resort' },
  { image: img5, label: 'Jungle Treehouse Cabin',    location: 'Forest Reserve, Rizal' },
  { image: img6, label: 'Garden Pavilion Room',      location: 'Vue sur la Montagne Resort' },
];

const INTERVAL = 5500;

export default function Hero() {
  const [visible, setVisible]   = useState(false);
  const [current, setCurrent]   = useState(0);
  const [prev, setPrev]         = useState(null);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const goTo = useCallback((next) => {
    if (transitioning || next === current) return;
    setTransitioning(true);
    setPrev(current);
    setCurrent(next);
    setTimeout(() => {
      setPrev(null);
      setTransitioning(false);
    }, 900);
  }, [current, transitioning]);

  const goPrev = () => goTo((current - 1 + slides.length) % slides.length);
  const goNext = () => goTo((current + 1) % slides.length);

  // Auto-advance
  useEffect(() => {
    const id = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [current, goTo]);

  return (
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden">

      {/* ── Carousel background ─────────────────────────────────── */}
      <div className="absolute inset-0 z-0">

        {/* Previous slide — fades out */}
        {prev !== null && (
          <div
            key={`prev-${prev}`}
            className="absolute inset-0"
            style={{ animation: 'heroFadeOut 0.9s ease forwards' }}
          >
            <img
              src={slides[prev].image}
              alt={slides[prev].label}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(9,20,36,0.55) 0%, rgba(9,20,36,0.3) 40%, rgba(9,20,36,0.72) 100%)' }} />
          </div>
        )}

        {/* Current slide — fades + slow Ken Burns in */}
        <div
          key={`cur-${current}`}
          className="absolute inset-0"
          style={{ animation: 'heroFadeIn 0.9s ease forwards' }}
        >
          <img
            src={slides[current].image}
            alt={slides[current].label}
            className="w-full h-full object-cover"
            style={{ animation: 'kenBurns 6s ease-out forwards' }}
          />
          {/* Multi-layer overlay to ensure text legibility */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(9,20,36,0.55) 0%, rgba(9,20,36,0.25) 40%, rgba(9,20,36,0.75) 100%)' }} />
          {/* Centre vignette to lift text */}
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(9,20,36,0.18) 0%, rgba(9,20,36,0.52) 100%)' }} />
        </div>

        {/* Grain overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none z-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '150px 150px',
          }}
        />
      </div>

      {/* ── Hero content ────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 text-center pt-24 pb-48">

        {/* Location tag */}
        <div
          className={`flex items-center justify-center gap-3 mb-6 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <span className="h-px w-12" style={{ background: 'rgba(220,203,181,0.4)' }} />
          <span className="text-xs tracking-[0.45em] uppercase" style={{ fontFamily: 'Cinzel, serif', color: '#DCCBB5', opacity: 0.85 }}>
            Rizal, Philippines
          </span>
          <span className="h-px w-12" style={{ background: 'rgba(220,203,181,0.4)' }} />
        </div>

        {/* Headline */}
        <h1
          className={`text-5xl md:text-7xl lg:text-8xl font-light leading-none mb-4 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ fontFamily: 'Playfair Display, serif', transitionDelay: '400ms' }}
        >
          <span className="block italic" style={{ color: '#F5F0E8', textShadow: '0 2px 24px rgba(9,20,36,0.55)' }}>Where Mountains</span>
          <span className="block shimmer-sand font-semibold" style={{ textShadow: '0 2px 24px rgba(9,20,36,0.55)' }}>Meet Serenity</span>
        </h1>

        {/* Sub-copy */}
        <p
          className={`text-lg md:text-xl font-light max-w-xl mt-6 leading-relaxed transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(220,203,181,0.7)', transitionDelay: '600ms', textShadow: '0 1px 12px rgba(9,20,36,0.6)' }}
        >
          Nestled in the verdant highlands of Rizal, Vue sur la Montagne invites you to
          rediscover nature's purest luxury — just 45 minutes from Manila.
        </p>

        {/* Stars */}
        <div
          className={`flex items-center gap-2 mt-5 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '700ms' }}
        >
          {[1,2,3,4,5].map(s => <Star key={s} size={14} style={{ fill: '#DCCBB5', color: '#DCCBB5' }} />)}
          <span className="text-sm ml-2 tracking-wide" style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(220,203,181,0.55)' }}>
            Five-Star Mountain Escape
          </span>
        </div>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row gap-4 mt-10 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '800ms' }}
        >
          <a
            href="#booking"
            className="px-10 py-4 text-sm tracking-widest uppercase font-medium transition-all duration-300 hover:-translate-y-0.5"
            style={{ background: '#DCCBB5', color: '#1B365D', fontFamily: 'Lato, sans-serif' }}
            onMouseEnter={e => e.currentTarget.style.background = '#c9aa8e'}
            onMouseLeave={e => e.currentTarget.style.background = '#DCCBB5'}
          >
            Reserve Your Stay
          </a>
          <a
            href="#rooms"
            className="px-10 py-4 text-sm tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5 bg-glass-light"
            style={{ fontFamily: 'Lato, sans-serif', color: '#DCCBB5' }}
          >
            Explore Rooms
          </a>
        </div>
      </div>

      {/* ── Carousel controls ────────────────────────────────────── */}
      {/* Prev / Next arrows */}
      <button
        onClick={goPrev}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 transition-all duration-200 hover:scale-110"
        style={{ background: 'rgba(9,20,36,0.45)', border: '1px solid rgba(220,203,181,0.22)', backdropFilter: 'blur(6px)', color: '#DCCBB5' }}
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={goNext}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 transition-all duration-200 hover:scale-110"
        style={{ background: 'rgba(9,20,36,0.45)', border: '1px solid rgba(220,203,181,0.22)', backdropFilter: 'blur(6px)', color: '#DCCBB5' }}
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Slide caption + dots — bottom strip */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
        {/* Current photo label */}
        <div
          key={current}
          className="flex items-center gap-2"
          style={{ animation: 'captionIn 0.6s ease forwards' }}
        >
          <span className="h-px w-6" style={{ background: 'rgba(220,203,181,0.45)' }} />
          <span className="text-[10px] tracking-[0.35em] uppercase" style={{ fontFamily: 'Cinzel, serif', color: 'rgba(220,203,181,0.65)' }}>
            {slides[current].label}
          </span>
          <span className="h-px w-6" style={{ background: 'rgba(220,203,181,0.45)' }} />
        </div>

        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="transition-all duration-400"
              style={{
                width:  i === current ? '24px' : '6px',
                height: '6px',
                background: i === current ? '#DCCBB5' : 'rgba(220,203,181,0.35)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs tracking-[0.3em] uppercase" style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(220,203,181,0.4)' }}>Scroll</span>
        <ChevronDown size={16} style={{ color: 'rgba(220,203,181,0.5)' }} />
      </div> */}

      <style>{`
        @keyframes heroFadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes heroFadeOut { from { opacity: 1 } to { opacity: 0 } }
        @keyframes kenBurns    { from { transform: scale(1.0) } to { transform: scale(1.08) } }
        @keyframes captionIn   { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes progressBar { from { width: 0% } to { width: 100% } }
      `}</style>
    </section>
  );
}