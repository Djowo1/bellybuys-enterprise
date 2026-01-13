// src/app/page.js
import dynamic from 'next/dynamic';
import HeroSection from '@/components/Hero/HeroSection';
import ServicesSection from '@/components/Services/ServicesSection';
import MenuSection from '@/components/Menu/MenuSection';
import AboutSection from '@/components/About/AboutSection';
import TestimonialsSection from '@/components/Testimonials/TestimonialsSection';
import PortfolioSection from '@/components/Portfolio/PortfolioSection';
import Banner from '@/components/Common/Banner';

// Lazy load BlogSection since it's not immediately visible
const BlogSection = dynamic(() => import('@/components/Blog/BlogSection'), {
  loading: () => <div className="loading-placeholder" style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>
});

const ContactSection = dynamic(() => import('@/components/Contact/ContactSection'), {
  loading: () => <div className="loading-placeholder" style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>
});

export const metadata = {
  title: 'BellyBuys Enterprise | Premium Catering & Food Services in Ile-Ife',
  description: 'Experience exceptional culinary services in Ile-Ife. Weekend meals, event catering, private chef, and logistics services. Order now!',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <Banner />
      <MenuSection />
      <AboutSection />
      <TestimonialsSection />
      <PortfolioSection />
      <BlogSection />
      <ContactSection />
    </>
  );
}