import { useState } from 'react';
import { BedDouble, Bath, Maximize, ChevronRight } from 'lucide-react';
import RoomDetailModal from './RoomDetailModal';

import image1 from '../assets/mountain_view.jpg';
import image2 from '../assets/superior_forest_suit.jpg';
import image3 from '../assets/lake_view_reflection.jpg';
import image4 from '../assets/presidential_villa.jpg';
import image5 from '../assets/jungle_treehouse.webp';
import image6 from '../assets/garden_pavillion_room.jpg';

const rooms = [
  {
    name: 'Deluxe Mountain View',
    tagline: 'Wake up to the Sierra Madre',
    price: '₱8,500',
    size: '42 sqm',
    bed: 'King Bed',
    features: ['Mountain panorama', 'Private balcony', 'Rain shower', 'Free Wi-Fi'],
    image: image1,
    description:
      'Perched high above the valley, the Deluxe Mountain View room frames the rugged Sierra Madre in a floor-to-ceiling panorama. Step out onto your private balcony with a morning coffee and watch the mist unravel from the peaks. Inside, natural stone finishes and warm timber accents create a sanctuary that feels as elemental as the landscape itself.',
  },
  {
    name: 'Superior Forest Suite',
    tagline: 'Immersed in the canopy',
    price: '₱12,000',
    size: '60 sqm',
    bed: 'King Bed',
    features: ['Forest view', 'Freestanding tub', 'Living area', 'Butler service'],
    image: image2,
    description:
      'Wrapped on three sides by old-growth forest, this suite places you at eye-level with the treetops. A freestanding soaking tub sits beside floor-to-ceiling glass so you can soak while birdsong fills the air. A dedicated butler ensures every need is met before you think to ask — from pre-drawn baths to curated in-suite dining.',
  },
  {
    name: 'Premier Lake View',
    tagline: 'Reflections on still waters',
    price: '₱15,500',
    size: '75 sqm',
    bed: 'Twin King',
    features: ['Lake panorama', 'Outdoor jacuzzi', 'Kitchenette', 'Premium minibar'],
    image: image3,
    description:
      "Two king beds face an unobstructed vista of the lake, its mirror surface shifting from silver dawn to molten gold at dusk. An outdoor jacuzzi cantilevered over the water's edge invites evening stargazing. The fully-equipped kitchenette and curated minibar make extended stays effortlessly self-sufficient.",
  },
  {
    name: 'Presidential Villa',
    tagline: 'The pinnacle of luxury',
    price: '₱38,000',
    size: '180 sqm',
    bed: 'Master Suite',
    features: ['360° panorama', 'Private pool', 'Chef on request', 'Helipad access'],
    image: image4,
    description:
      'The Presidential Villa occupies the entire top floor of our north wing, commanding a 360-degree horizon of mountains, forest, and water. A temperature-controlled infinity pool wraps the terrace, a private chef is on-call around the clock, and discreet helipad access ensures seamless arrival for the most discerning guests.',
  },
  {
    name: 'Jungle Treehouse Cabin',
    tagline: 'Above the forest floor',
    price: '₱10,500',
    size: '35 sqm',
    bed: 'Queen Bed',
    features: ['Treetop views', 'Open-air deck', 'Hammock lounge', 'Stargazing roof'],
    image: image5,
    description:
      'Suspended eight metres above the forest floor on reclaimed-timber stilts, this cabin delivers the romance of wilderness without sacrificing comfort. The open-air deck and hammock lounge invite lazy afternoons in the canopy, while a retractable roof panel above the bed turns every night into a private observatory.',
  },
  {
    name: 'Garden Pavilion Room',
    tagline: 'Bloom in quiet solitude',
    price: '₱6,800',
    size: '32 sqm',
    bed: 'Queen Bed',
    features: ['Garden access', 'Walk-in shower', 'Daybed patio', 'Aromatic garden'],
    image: image6,
    description:
      'Framed by jasmine-laced trellises and a private aromatic garden, this pavilion room is a study in serene simplicity. Sliding doors open directly onto a stone-paved patio with a daybed shaded by climbing bougainvillea. The walk-in rainfall shower opens to a secluded courtyard for an al-fresco bathing experience unlike any other.',
  },
];

function RoomCard({ room, index, onSelect }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="room-card relative group overflow-hidden cursor-pointer reveal"
      style={{ transitionDelay: `${index * 0.08}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(room)}
    >
      {/* Real image panel */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={room.image}
          alt={room.name}
          className="room-img absolute inset-0 w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
        />

        {/* Price badge */}
        <div
          className="absolute top-4 right-4 px-3 py-1.5"
          style={{
            background: 'rgba(27,54,93,0.7)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(220,203,181,0.25)',
          }}
        >
          <span className="text-sm font-medium" style={{ fontFamily: 'Cinzel, serif', color: '#DCCBB5' }}>
            {room.price}
          </span>
          <span className="text-xs" style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(220,203,181,0.5)' }}>
            {' '}/night
          </span>
        </div>

        {/* Hover overlay */}
        <div
          className={`room-overlay absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}
          style={{ background: 'rgba(27,54,93,0.45)' }}
        >
          <span
            className="px-6 py-2.5 text-xs tracking-widest uppercase font-medium"
            style={{ background: '#DCCBB5', color: '#1B365D', fontFamily: 'Lato, sans-serif' }}
          >
            View Details
          </span>
        </div>
      </div>

      {/* Info */}
      <div
        className="p-5 transition-colors duration-300"
        style={{
          background: '#F5F0E8',
          borderLeft: '1px solid rgba(27,54,93,0.1)',
          borderRight: '1px solid rgba(27,54,93,0.1)',
          borderBottom: '1px solid rgba(27,54,93,0.1)',
        }}
      >
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-xl font-light" style={{ fontFamily: 'Playfair Display, serif', color: '#1B365D' }}>
              {room.name}
            </h3>
            <p className="text-xs italic mt-0.5" style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(51,51,51,0.5)' }}>
              {room.tagline}
            </p>
          </div>
          <ChevronRight
            size={18}
            className={`mt-1 transition-transform duration-300 ${hovered ? 'translate-x-1' : ''}`}
            style={{ color: 'rgba(27,54,93,0.4)' }}
          />
        </div>

        <div className="flex items-center gap-4 my-3">
          {[
            { icon: <Maximize size={11} />, val: room.size },
            { icon: <BedDouble size={11} />, val: room.bed },
            { icon: <Bath size={11} />, val: 'En-suite' },
          ].map((m, i) => (
            <span
              key={i}
              className="flex items-center gap-1 text-xs"
              style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(51,51,51,0.5)' }}
            >
              <span style={{ color: '#1B365D' }}>{m.icon}</span>
              {m.val}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {room.features.map((f) => (
            <span
              key={f}
              className="text-xs px-2.5 py-1 rounded-full"
              style={{
                fontFamily: 'Lato, sans-serif',
                border: '1px solid rgba(27,54,93,0.2)',
                color: '#1B365D',
                background: 'rgba(27,54,93,0.06)',
              }}
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function RoomsSection() {
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <section id="rooms" className="py-24 px-6 lg:px-10" style={{ background: '#F5F0E8' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal">
          <span
            className="text-xs tracking-[0.4em] uppercase"
            style={{ fontFamily: 'Cinzel, serif', color: '#1B365D', opacity: 0.65 }}
          >
            Accommodations
          </span>
          <h2
            className="text-4xl md:text-5xl font-light italic mt-3 mb-4"
            style={{ fontFamily: 'Playfair Display, serif', color: '#1B365D' }}
          >
            Your Private Sanctuary
          </h2>
          <div className="ornament-divider max-w-xs mx-auto">
            <span
              className="text-xs tracking-widest uppercase px-2"
              style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(27,54,93,0.4)' }}
            >
              48 Curated Spaces
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room, i) => (
            <RoomCard key={room.name} room={room} index={i} onSelect={setSelectedRoom} />
          ))}
        </div>
      </div>

      {selectedRoom && (
        <RoomDetailModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
      )}
    </section>
  );
}
