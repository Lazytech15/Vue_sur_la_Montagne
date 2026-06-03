import { Waves, UtensilsCrossed, TreePine, Camera, Dumbbell, Car, Wind, Moon } from 'lucide-react';

const services = [
  { icon: <Waves size={26} />, title: 'Infinity Pool & Spa', desc: 'Float above the forest canopy in our heated infinity pool. Rejuvenate with Filipino-inspired wellness treatments.', tag: 'Wellness' },
  { icon: <UtensilsCrossed size={26} />, title: 'Rizal Farm-to-Table', desc: "Chef-curated menus celebrating Rizal's highland harvests — fresh river fish, organic vegetables, and heirloom recipes.", tag: 'Dining' },
  { icon: <TreePine size={26} />, title: 'Guided Trail Expeditions', desc: 'Explore Mt. Daraitan, Tinipak River, and hidden waterfalls with our expert local naturalist guides.', tag: 'Adventure' },
  { icon: <Camera size={26} />, title: 'Photography Retreats', desc: "Capture Rizal's breathtaking landscapes with guided photography walks, drone sessions, and studio printing.", tag: 'Creative' },
  { icon: <Dumbbell size={26} />, title: 'Outdoor Fitness Studio', desc: 'Open-air yoga pavilions with mountain views, morning meditation circles, and a fully-equipped training center.', tag: 'Fitness' },
  { icon: <Car size={26} />, title: 'Curated Rizal Tours', desc: "Private transfers to Angono's art scene, Laguna de Bay, Binangonan ancestral sites, and heritage churches.", tag: 'Culture' },
  { icon: <Wind size={26} />, title: 'Signature Spa Rituals', desc: 'Immerse in hilot healing ceremonies, volcanic stone massages, and forest bathing inspired by ancient Filipino wellness.', tag: 'Spa' },
  { icon: <Moon size={26} />, title: 'Stargazing Evenings', desc: "Far from city lights, Rizal's clear highland skies reveal the Milky Way. Guided astronomy nights with telescopes.", tag: 'Night' },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 px-6 lg:px-10" style={{ background: '#1B365D' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal">
          <span className="text-xs tracking-[0.4em] uppercase" style={{ fontFamily: 'Cinzel, serif', color: '#DCCBB5', opacity: 0.7 }}>Curated Experiences</span>
          <h2 className="text-4xl md:text-5xl font-light italic mt-3 mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#F5F0E8' }}>
            Every Moment, Elevated
          </h2>
          <p className="text-sm max-w-lg mx-auto leading-relaxed" style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(220,203,181,0.55)' }}>
            Vue sur la Montagne offers carefully crafted experiences that connect you to the natural wonders and living culture of Rizal province.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'rgba(220,203,181,0.08)' }}>
          {services.map((service, i) => (
            <div
              key={i}
              className="relative group p-7 cursor-default overflow-hidden transition-all duration-500 reveal"
              style={{
                background: 'rgba(27,54,93,0.95)',
                transitionDelay: `${i * 0.06}s`,
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(21,43,74,0.98)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(27,54,93,0.95)'}
            >
              {/* Hover glow */}
              <div
                className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-xl"
                style={{ background: '#DCCBB5' }}
              />

              {/* Tag */}
              <span
                className="text-[10px] tracking-[0.3em] uppercase px-2 py-1 rounded-sm mb-5 inline-block"
                style={{
                  fontFamily: 'Cinzel, serif',
                  color: '#DCCBB5',
                  background: 'rgba(220,203,181,0.1)',
                  border: '1px solid rgba(220,203,181,0.2)',
                }}
              >
                {service.tag}
              </span>

              {/* Icon */}
              <div className="mb-4 transition-transform duration-300 group-hover:-translate-y-1" style={{ color: '#DCCBB5' }}>
                {service.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg font-light leading-snug mb-3" style={{ fontFamily: 'Playfair Display, serif', color: '#F5F0E8' }}>
                {service.title}
              </h3>
              <p className="text-xs leading-relaxed transition-colors duration-300" style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(220,203,181,0.5)' }}>
                {service.desc}
              </p>

              {/* Bottom line */}
              <div
                className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                style={{ background: 'linear-gradient(90deg, #DCCBB5, transparent)' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
