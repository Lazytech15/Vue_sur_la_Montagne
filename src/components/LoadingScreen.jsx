import { useEffect, useState } from 'react';
import logo from "../../public/circle_logo.png";

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const steps = [
      { to: 30, delay: 0 },
      { to: 60, delay: 600 },
      { to: 85, delay: 1200 },
      { to: 100, delay: 1800 },
    ];

    steps.forEach(({ to, delay }) => {
      setTimeout(() => setProgress(to), delay);
    });

    setTimeout(() => {
      setFading(true);
      setTimeout(onDone, 700);
    }, 2400);
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center transition-opacity duration-700 ${fading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      style={{ background: '#1B365D' }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute border border-sand-200/30"
            style={{
              width: `${120 + i * 60}px`,
              height: `${120 + i * 60}px`,
              borderRadius: '50%',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>

      {/* SVG landscape icon */}
      <img
          src={logo}
          alt="Rizal Hotel logo"
          style={{ width: '150px', height: '150px', borderRadius: '9999px', objectFit: 'cover' }}
        />

      {/* Brand */}
      <div className="text-center mb-10">
        <p
          className="font-accent text-sand-200 text-xs tracking-[0.5em] uppercase mb-2"
          style={{ fontFamily: 'Cinzel, serif', color: '#DCCBB5', opacity: 0.7 }}
        >
          Vue sur la Montagne
        </p>
        <h1
          className="text-4xl font-light italic"
          style={{ fontFamily: 'Playfair Display, serif', color: '#DCCBB5' }}
        >
          Hotel
        </h1>
      </div>

      {/* Progress bar */}
      <div className="w-64 h-px bg-white/10 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full transition-all duration-500 ease-out"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #DCCBB5, #c9aa8e)',
          }}
        />
      </div>
      <p
        className="mt-4 text-xs tracking-[0.3em] uppercase"
        style={{ fontFamily: 'Lato, sans-serif', color: 'rgba(220,203,181,0.4)' }}
      >
        {progress < 100 ? 'Preparing your experience' : 'Welcome'}
      </p>
    </div>
  );
}
