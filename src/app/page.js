// src/app/page.js
import HeroSection from '@/components/Hero/HeroSection';
import ServicesSection from '@/components/Services/ServicesSection';
import MenuSection from '@/components/Menu/MenuSection';
import AboutSection from '@/components/About/AboutSection';
import TestimonialsSection from '@/components/Testimonials/TestimonialsSection';
import PortfolioSection from '@/components/Portfolio/PortfolioSection';
import BlogSection from '@/components/Blog/BlogSection';
import ContactSection from '@/components/Contact/ContactSection';
import Banner from '@/components/Common/Banner';

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