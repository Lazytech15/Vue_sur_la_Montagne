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
import { useReveal } from './hooks/useReveal';

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

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const handleDone = useCallback(() => setLoaded(true), []);

  return (
    <>
      {!loaded && <LoadingScreen onDone={handleDone} />}
      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease', transitionDelay: '0.1s' }}>
        <MainContent />
      </div>
    </>
  );
}
