import { useState, useEffect } from 'react';
import { X, MapPin } from 'lucide-react';

import imgTinipak   from '../assets/gallery/Tinipak_River_Spring.jpg';
import imgDaraitan  from '../assets/gallery/daraitan_summit.jpg';
import imgCanopy    from '../assets/gallery/Resort_Forest_Canopy_Suite.jpg';
import imgCave      from '../assets/gallery/angono_binangonan_cave.jpg';
import imgWindmill  from '../assets/gallery/pililla_wind_mill.jpg';
import imgPool      from '../assets/gallery/infinit_pool.jpeg';

const galleryItems = [
  {
    title: 'Tinipak River at Dawn',
    location: 'Tanay, Rizal',
    size: 'col-span-2 row-span-2',
    image: imgTinipak,
  },
  {
    title: 'Mt. Daraitan Summit',
    location: 'Tanay, Rizal',
    size: 'col-span-1 row-span-1',
    image: imgDaraitan,
  },
  {
    title: 'Forest Canopy Suite',
    location: 'Vue sur la Montagne Resort',
    size: 'col-span-1 row-span-1',
    image: imgCanopy,
  },
  {
    title: 'Angono-Binangonan Cave Petroglyphs',
    location: 'Binangonan, Rizal',
    size: 'col-span-1 row-span-2',
    image: imgCave,
  },
  {
    title: 'Pililla Wind Farm',
    location: 'Pililla, Rizal',
    size: 'col-span-1 row-span-1',
    image: imgWindmill,
  },
  {
    title: 'Infinity Pool at Dusk',
    location: 'Vue sur la Montagne Resort',
    size: 'col-span-1 row-span-1',
    image: imgPool,
  },
];

/* ── Lightbox ─────────────────────────────────────────────────────────── */
function Lightbox({ item, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(5,10,20,0.88)', backdropFilter: 'blur(8px)', animation: 'fadeIn 0.25s ease' }}
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full"
        style={{ animation: 'scaleIn 0.3s cubic-bezier(0.22,1,0.36,1)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <img
          src={item.image}
          alt={item.title}
          className="w-full max-h-[78vh] object-cover"
          style={{ display: 'block' }}
        />

        {/* Caption bar */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ background: '#0f1f37', borderTop: '1px solid rgba(220,203,181,0.12)' }}
        >
          <div>
            <h3
              className="text-lg font-light italic"
              style={{ fontFamily: 'Playfair Display, serif', color: '#F5F0E8' }}
            >
              {item.title}
            </h3>
            <p
              className="flex items-center gap-1 text-xs mt-0.5"
              style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(220,203,181,0.55)' }}
            >
              <MapPin size={11} />
              {item.location}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-9 h-9 transition-colors duration-200 hover:bg-white/10"
            style={{ border: '1px solid rgba(220,203,181,0.25)', color: '#DCCBB5' }}
            aria-label="Close lightbox"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95) } to { opacity: 1; transform: scale(1) } }
      `}</style>
    </div>
  );
}

/* ── Main section ─────────────────────────────────────────────────────── */
export default function GallerySection() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section id="gallery" className="py-24 px-6 lg:px-10" style={{ background: '#F5F0E8' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 reveal">
          <div>
            <span
              className="text-xs tracking-[0.4em] uppercase"
              style={{ fontFamily: 'Cinzel, serif', color: '#1B365D', opacity: 0.65 }}
            >
              Visual Journey
            </span>
            <h2
              className="text-4xl md:text-5xl font-light italic mt-2"
              style={{ fontFamily: 'Playfair Display, serif', color: '#1B365D' }}
            >
              Rizal Through Our Lens
            </h2>
          </div>
          <p
            className="text-sm max-w-xs leading-relaxed"
            style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(51,51,51,0.5)' }}
          >
            A glimpse of the landscapes, spaces, and experiences that define Vue sur la Montagne.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[160px]">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className={`relative group overflow-hidden cursor-pointer reveal ${item.size}`}
              style={{ transitionDelay: `${i * 0.07}s` }}
              onClick={() => setLightbox(item)}
            >
              {/* Photo */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient */}
              <div
                className="absolute inset-0 opacity-50 group-hover:opacity-75 transition-opacity duration-300"
                style={{ background: 'linear-gradient(to top, #091424 0%, transparent 60%)' }}
              />

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <p
                  className="flex items-center gap-1 text-[10px] tracking-[0.3em] uppercase"
                  style={{ fontFamily: 'Cinzel, serif', color: '#DCCBB5' }}
                >
                  <MapPin size={9} />
                  {item.location}
                </p>
                <h3
                  className="text-base md:text-lg font-light leading-tight mt-0.5"
                  style={{ fontFamily: 'Playfair Display, serif', color: '#F5F0E8' }}
                >
                  {item.title}
                </h3>
              </div>

              {/* Border shimmer on hover */}
              <div
                className="absolute inset-0 border border-transparent group-hover:border-[rgba(220,203,181,0.3)] transition-colors duration-300 pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && <Lightbox item={lightbox} onClose={() => setLightbox(null)} />}
    </section>
  );
}