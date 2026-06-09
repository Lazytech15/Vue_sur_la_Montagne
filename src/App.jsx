import { useState, useCallback } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BookingSection from './components/BookingSection';
import RoomsSection from './components/RoomsSection';
import ServicesSection from './components/ServicesSection';
import GallerySection from './components/GallerySection';
import AboutSection from './components/AboutSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import { useReveal } from './hooks/useReveal';

// ─── Simple hash router (no react-router dependency needed) ───────
function useHash() {
  const [hash, setHash] = useState(() => window.location.hash);
  useCallback(() => {
    const handler = () => setHash(window.location.hash);
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, [])();
  return hash;
}

// ─── Auth (session-only — replace with real API call in production)
const ADMIN_USER = 'admin';
const ADMIN_PASS = '12345';

function useAdminAuth() {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem('sierra_admin') === '1'
  );

  const login = (user, pass) => {
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      sessionStorage.setItem('sierra_admin', '1');
      setAuthed(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('sierra_admin');
    setAuthed(false);
    window.location.hash = '';
  };

  return { authed, login, logout };
}

// ─── Public site ──────────────────────────────────────────────────
function MainContent() {
  useReveal();
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#F5F0E8', color: '#333333' }}>
      <Navbar />
      <Hero />
      <BookingSection />
      <RoomsSection />
      <ServicesSection />
      <GallerySection />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const handleDone = useCallback(() => setLoaded(true), []);
  const hash = useHash();
  const { authed, login, logout } = useAdminAuth();

  const isAdminRoute = hash === '#/admin' || hash.startsWith('#/admin/');

  // Admin route — show login or dashboard
  if (isAdminRoute) {
    if (!authed) return <AdminLogin onLogin={login} />;
    return <AdminDashboard onLogout={logout} />;
  }

  // Public site
  return (
    <>
      {!loaded && <LoadingScreen onDone={handleDone} />}
      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease', transitionDelay: '0.1s' }}>
        <MainContent />
      </div>
    </>
  );
}