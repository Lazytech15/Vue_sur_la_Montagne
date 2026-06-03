import { MapPin, Clock, Award, Heart } from 'lucide-react';

const highlights = [
  { icon: <MapPin size={18} />, title: 'Prime Location', desc: "Tucked in the highlands of Tanay, Rizal — gateway to Sierra Madre and the cleanest air in Metro Manila's surrounds." },
  { icon: <Clock size={18} />, title: '45-Min Escape', desc: 'Just a short drive from Ortigas or BGC via Antipolo or the Marikina–Infanta Highway. Complimentary shuttles available.' },
  { icon: <Award size={18} />, title: 'Award-Winning', desc: "Recipient of the DOT's Sustainable Tourism Award 2023 and Philippines' Best Eco-Resort by Travel + Leisure Asia." },
  { icon: <Heart size={18} />, title: 'Community Rooted', desc: "We partner with 18 local Rizaleño families for produce, crafts, guiding, and cultural storytelling. Local by heart." },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 lg:px-10 overflow-hidden" style={{ background: '#F5F0E8' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Map */}
          <div className="relative reveal-left">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute -inset-4 rounded-sm" style={{ border: '1px solid rgba(27,54,93,0.12)' }} />
              <div className="absolute -inset-8 rounded-sm" style={{ border: '1px solid rgba(27,54,93,0.05)' }} />

              <svg viewBox="0 0 400 400" className="w-full h-full rounded-sm" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="mapbg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#F5F0E8" />
                    <stop offset="100%" stopColor="#e8dfd0" />
                  </linearGradient>
                  <radialGradient id="mapglow" cx="55%" cy="45%" r="30%">
                    <stop offset="0%" stopColor="#1B365D" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#1B365D" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <rect width="400" height="400" fill="url(#mapbg)" />
                <rect width="400" height="400" fill="url(#mapglow)" />
                {[50,100,150,200,250,300,350].map(x=>(
                  <line key={`v${x}`} x1={x} y1="0" x2={x} y2="400" stroke="#1B365D" strokeWidth="0.3" opacity="0.1" />
                ))}
                {[50,100,150,200,250,300,350].map(y=>(
                  <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} stroke="#1B365D" strokeWidth="0.3" opacity="0.1" />
                ))}
                <path
                  d="M180,80 L220,60 L270,70 L310,100 L330,140 L320,180 L340,220 L310,260 L280,290 L250,310 L210,320 L180,300 L160,270 L140,240 L130,200 L140,160 L160,120 Z"
                  fill="#1B365D" stroke="#1B365D" strokeWidth="1.5" opacity="0.12"
                />
                <path
                  d="M60,180 Q80,160 120,170 Q140,175 150,195 Q160,215 140,235 Q120,255 90,250 Q60,245 55,220 Q50,195 60,180Z"
                  fill="#1B365D" opacity="0.15"
                />
                <text x="68" y="215" fontFamily="serif" fontSize="8" fill="#1B365D" opacity="0.5" fontStyle="italic">Laguna de Bay</text>
                {[[220,140],[250,160],[195,170],[270,190],[230,200]].map(([x,y],i)=>(
                  <polygon key={i} points={`${x},${y-15} ${x-10},${y+4} ${x+10},${y+4}`}
                    fill="#1B365D" stroke="#1B365D" strokeWidth="0.5" opacity="0.35" />
                ))}
                <path d="M150,350 L160,270 L180,200 L200,160 L210,100" stroke="#1B365D" strokeWidth="1.5" strokeDasharray="6,3" fill="none" opacity="0.25" />
                <path d="M80,200 L150,195 L220,190 L300,200" stroke="#DCCBB5" strokeWidth="1" strokeDasharray="4,2" fill="none" opacity="0.5" />
                {[
                  { x: 220, y: 170, label: 'Vue sur la Montagne', primary: true },
                  { x: 165, y: 270, label: 'Antipolo', primary: false },
                  { x: 270, y: 230, label: 'Tanay', primary: false },
                  { x: 195, y: 310, label: 'Binangonan', primary: false },
                  { x: 240, y: 140, label: 'Mt. Daraitan', primary: false },
                ].map((loc, i) => (
                  <g key={i}>
                    <circle cx={loc.x} cy={loc.y} r={loc.primary ? 7 : 4.5}
                      fill={loc.primary ? '#1B365D' : '#DCCBB5'} opacity={loc.primary ? 1 : 0.8} />
                    {loc.primary && (
                      <circle cx={loc.x} cy={loc.y} r={12} fill="none" stroke="#1B365D" strokeWidth="1" opacity="0.3">
                        <animate attributeName="r" from="7" to="18" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.4" to="0" dur="2s" repeatCount="indefinite" />
                      </circle>
                    )}
                    <text x={loc.x + 9} y={loc.y + 4} fontFamily="serif" fontSize={loc.primary ? 9 : 7}
                      fill={loc.primary ? '#1B365D' : '#333333'} fontWeight={loc.primary ? 'bold' : 'normal'} opacity={loc.primary ? 1 : 0.6}>
                      {loc.label}
                    </text>
                  </g>
                ))}
                <g transform="translate(350,50)">
                  <circle cx="0" cy="0" r="16" fill="#F5F0E8" stroke="#1B365D" strokeWidth="0.8" opacity="0.9" />
                  <polygon points="0,-10 -3,0 0,3 3,0" fill="#1B365D" opacity="0.9" />
                  <polygon points="0,10 -3,0 0,-3 3,0" fill="#DCCBB5" opacity="0.7" />
                  <text x="-2" y="-12" fontSize="6" fill="#1B365D" fontFamily="sans-serif" opacity="0.8">N</text>
                </g>
                <text x="20" y="378" fontFamily="Cinzel, serif" fontSize="9" fill="#1B365D" opacity="0.3" letterSpacing="3">RIZAL PROVINCE</text>
              </svg>

              {/* Badge */}
              <div className="absolute -bottom-4 -right-4 px-5 py-3 shadow-xl" style={{ background: '#1B365D' }}>
                <div className="text-2xl font-semibold leading-none" style={{ fontFamily: 'Playfair Display, serif', color: '#DCCBB5' }}>45</div>
                <div className="text-xs tracking-wider uppercase leading-tight" style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(220,203,181,0.65)' }}>min from<br/>Manila</div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="reveal-right">
            <span className="text-xs tracking-[0.4em] uppercase" style={{ fontFamily: 'Cinzel, serif', color: '#1B365D', opacity: 0.65 }}>Our Story</span>
            <h2 className="text-4xl md:text-5xl font-light italic mt-3 mb-6 leading-tight" style={{ fontFamily: 'Playfair Display, serif', color: '#1B365D' }}>
              Rizal's Best-Kept<br />Secret, Unveiled
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(51,51,51,0.65)' }}>
              Vue sur la Montagne Resort was founded on a simple belief: that the Philippines' most extraordinary landscapes deserve equally extraordinary hospitality. Nestled between the Sierra Madre mountains and the shores of Laguna de Bay, Rizal has long been a province of quiet wonders.
            </p>
            <p className="text-sm leading-relaxed mb-10" style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(51,51,51,0.65)' }}>
              We built our resort in partnership with the local community — preserving old-growth forests, restoring watershed areas, and weaving Rizaleño culture into every room, dish, and guided experience. Vue sur la Montagne is not just a place to stay. It is a place to belong.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {highlights.map((h, i) => (
                <div key={i} className="flex gap-4">
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(27,54,93,0.08)', border: '1px solid rgba(27,54,93,0.2)', color: '#1B365D' }}
                  >
                    {h.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1" style={{ fontFamily: 'Lato, sans-serif', color: '#1B365D' }}>{h.title}</h4>
                    <p className="text-xs leading-relaxed" style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(51,51,51,0.55)' }}>{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
