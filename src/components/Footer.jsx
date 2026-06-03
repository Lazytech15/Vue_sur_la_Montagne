export default function Footer() {
  return (
    <footer className="py-14 px-6 lg:px-10" style={{ background: '#091424', borderTop: '1px solid rgba(220,203,181,0.08)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <div className="text-xs tracking-[0.35em] uppercase mb-1" style={{ fontFamily: 'Cinzel, serif', color: '#DCCBB5', opacity: 0.7 }}>Vue sur la Montagne</div>
            <div className="text-2xl font-light italic mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#F5F0E8' }}>Hotel</div>
            <p className="text-xs leading-relaxed" style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(220,203,181,0.35)' }}>
              A luxury mountain retreat in the highlands of Tanay, Rizal — where nature and elegance find perfect balance.
            </p>
          </div>

          {[
            { title: 'Explore', links: ['Our Rooms', 'Dining', 'Spa & Wellness', 'Adventures', 'Gallery', 'Events'] },
            { title: 'Information', links: ['About Us', 'Sustainability', 'Press & Media', 'Careers', 'FAQ', 'Policies'] },
            { title: 'Contact', links: ['+63 2 8123 4567', 'reservations@vuesurmontagne.ph', 'Km. 28 Tanay–Sampaloc Rd', 'Tanay, Rizal 1980', 'Open 24/7'] },
          ].map((col, i) => (
            <div key={i}>
              <h4 className="text-xs tracking-[0.3em] uppercase mb-4" style={{ fontFamily: 'Cinzel, serif', color: 'rgba(220,203,181,0.45)' }}>{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="border-anim text-xs tracking-wide pb-0.5 transition-colors"
                      style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(220,203,181,0.35)' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'rgba(220,203,181,0.7)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(220,203,181,0.35)'}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(220,203,181,0.07)' }}>
          <p className="text-xs tracking-wide" style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(220,203,181,0.25)' }}>
            © 2024 Vue sur la Montagne, Tanay, Rizal. All rights reserved. Credit to all photo use in this porfolio goes to their respective owners.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a key={item} href="#"
                className="text-xs transition-colors"
                style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(220,203,181,0.25)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(220,203,181,0.55)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(220,203,181,0.25)'}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
