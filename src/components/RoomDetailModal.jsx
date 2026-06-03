import { useEffect } from 'react';
import { X, BedDouble, Bath, Maximize, Wifi, ChevronRight } from 'lucide-react';

export default function RoomDetailModal({ room, onClose }) {
  // Lock scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!room) return null;

  const amenityIcons = {
    'Free Wi-Fi':       <Wifi size={14} />,
    'Butler service':   <ChevronRight size={14} />,
    'En-suite':         <Bath size={14} />,
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(7,13,26,0.75)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      {/* Modal panel */}
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
        style={{
          background: '#F5F0E8',
          boxShadow: '0 32px 80px rgba(7,13,26,0.55)',
          border: '1px solid rgba(27,54,93,0.15)',
          animation: 'modalIn 0.35s cubic-bezier(0.22,1,0.36,1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero image */}
        <div className="relative h-72 flex-shrink-0 overflow-hidden">
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.88)' }}
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(7,13,26,0.65) 0%, transparent 55%)' }}
          />

          {/* Price badge */}
          <div
            className="absolute top-5 left-5 px-4 py-2"
            style={{ background: 'rgba(7,13,26,0.6)', backdropFilter: 'blur(10px)', border: '1px solid rgba(220,203,181,0.3)' }}
          >
            <span className="text-base font-semibold" style={{ fontFamily: 'Cinzel, serif', color: '#DCCBB5' }}>
              {room.price}
            </span>
            <span className="text-xs ml-1" style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(220,203,181,0.55)' }}>
              / night
            </span>
          </div>

          {/* Room name over image */}
          <div className="absolute bottom-5 left-6 right-16">
            <h2
              className="text-3xl font-light italic leading-tight"
              style={{ fontFamily: 'Playfair Display, serif', color: '#F5F0E8' }}
            >
              {room.name}
            </h2>
            <p
              className="text-sm mt-1 italic"
              style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(245,240,232,0.65)' }}
            >
              {room.tagline}
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 flex items-center justify-center w-9 h-9 transition-colors duration-200"
            style={{ background: 'rgba(7,13,26,0.55)', border: '1px solid rgba(220,203,181,0.25)', color: '#DCCBB5' }}
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content body */}
        <div className="overflow-y-auto flex-1 p-6 md:p-8">

          {/* Stats row */}
          <div
            className="flex flex-wrap gap-6 pb-6 mb-6"
            style={{ borderBottom: '1px solid rgba(27,54,93,0.12)' }}
          >
            {[
              { icon: <Maximize size={16} />, label: 'Room Size', value: room.size },
              { icon: <BedDouble size={16} />, label: 'Bed Type',  value: room.bed  },
              { icon: <Bath size={16} />,     label: 'Bathroom',   value: 'En-suite' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center w-9 h-9"
                  style={{ background: 'rgba(27,54,93,0.08)', color: '#1B365D' }}
                >
                  {stat.icon}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest" style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(51,51,51,0.4)' }}>
                    {stat.label}
                  </p>
                  <p className="text-sm font-medium mt-0.5" style={{ fontFamily: 'Lato, sans-serif', color: '#1B365D' }}>
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Amenities */}
          <div className="mb-8">
            <h3
              className="text-xs tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: 'Cinzel, serif', color: '#1B365D', opacity: 0.55 }}
            >
              Included Amenities
            </h3>
            <div className="flex flex-wrap gap-2">
              {room.features.map((f) => (
                <span
                  key={f}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5"
                  style={{
                    fontFamily: 'Lato, sans-serif',
                    border: '1px solid rgba(27,54,93,0.22)',
                    color: '#1B365D',
                    background: 'rgba(27,54,93,0.05)',
                  }}
                >
                  {amenityIcons[f] ?? <span className="w-1 h-1 rounded-full" style={{ background: '#1B365D', display: 'inline-block' }} />}
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3
              className="text-xs tracking-[0.3em] uppercase mb-3"
              style={{ fontFamily: 'Cinzel, serif', color: '#1B365D', opacity: 0.55 }}
            >
              About This Room
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(51,51,51,0.75)', lineHeight: '1.8' }}
            >
              {room.description}
            </p>
          </div>

          {/* CTA */}
          <div className="flex gap-3">
            <a
              href="#booking"
              onClick={onClose}
              className="flex-1 flex items-center justify-center py-3.5 text-sm tracking-widest uppercase font-medium transition-opacity duration-200 hover:opacity-90"
              style={{ background: '#1B365D', color: '#F5F0E8', fontFamily: 'Lato, sans-serif' }}
            >
              Reserve This Room
            </a>
            <button
              onClick={onClose}
              className="px-6 py-3.5 text-sm tracking-widest uppercase font-medium transition-colors duration-200"
              style={{
                border: '1px solid rgba(27,54,93,0.3)',
                color: '#1B365D',
                fontFamily: 'Lato, sans-serif',
                background: 'transparent',
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
      `}</style>
    </div>
  );
}
