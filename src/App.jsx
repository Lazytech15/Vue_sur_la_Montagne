import { useState, useCallback, useEffect } from 'react';
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
import ClientPortal from './components/client/ClientPortal';
import { useReveal } from './hooks/useReveal';

// ─── Simple hash router ───────────────────────────────────────────
function useHash() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const handler = () => setHash(window.location.hash);
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);
  return hash;
}

// ─── Role-based credentials ───────────────────────────────────────
// Internal company accounts (back-office only)
const STAFF_ACCOUNTS = [
  {
    username: 'superadmin',
    password: 'super123',
    role: 'superadmin',
    name: 'Rafael Santos',
    label: 'Super Admin',
  },
  {
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    name: 'Maria Reyes',
    label: 'Admin',
  },
  {
    username: 'cashier',
    password: 'cashier123',
    role: 'cashier',
    name: 'Juan dela Cruz',
    label: 'Cashier',
  },
];

// Guest/client accounts — booking holders only, never granted staff/company data
const CLIENT_ACCOUNTS = [
  {
    username: 'client',
    password: 'client123',
    role: 'client',
    name: 'Maria Santos',
    label: 'Client',
    email: 'maria@email.com',
  },
];

const ACCOUNTS = [...STAFF_ACCOUNTS, ...CLIENT_ACCOUNTS];

// ─── Auth hook ────────────────────────────────────────────────────
function useAdminAuth() {
  const [session, setSession] = useState(() => {
    try {
      const raw = sessionStorage.getItem('sierra_admin_session');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const login = (user, pass) => {
    const account = ACCOUNTS.find(
      a => a.username === user && a.password === pass
    );
    if (account) {
      const s = { role: account.role, name: account.name, label: account.label, email: account.email };
      sessionStorage.setItem('sierra_admin_session', JSON.stringify(s));
      setSession(s);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('sierra_admin_session');
    setSession(null);
    window.location.hash = '#/admin';
  };

  return { authed: !!session, session, login, logout };
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
  const { authed, session, login, logout } = useAdminAuth();

  const isAdminRoute = hash === '#/admin' || hash.startsWith('#/admin/');

  const goToLanding = useCallback(() => { window.location.hash = ''; }, []);

  if (isAdminRoute) {
    if (!authed) return <AdminLogin onLogin={login} onBack={goToLanding} />;
    if (session?.role === 'client') return <ClientPortal onLogout={logout} session={session} />;
    return <AdminDashboard onLogout={logout} session={session} />;
  }

  return (
    <>
      {!loaded && <LoadingScreen onDone={handleDone} />}
      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease', transitionDelay: '0.1s' }}>
        <MainContent />
      </div>
    </>
  );
}
