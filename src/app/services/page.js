import ServicesSection from '@/components/Services/ServicesSection';
import Banner from '@/components/Common/Banner';

export const metadata = {
  title: 'Our Services | BellyBuys Enterprise',
  description: 'Explore our premium services: weekend meals, event catering, private chef, logistics, and more. Quality culinary experiences in Ile-Ife.',
};

export default function ServicesPage() {
  return (
    <>
      <div style={{ paddingTop: '80px' }}>
        <ServicesSection />
        <Banner />
      </div>
    </>
  );
}