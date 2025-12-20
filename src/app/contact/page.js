import ContactSection from '@/components/Contact/ContactSection';

export const metadata = {
  title: 'Contact Us | BellyBuys Enterprise',
  description: 'Get in touch with BellyBuys Enterprise. Order food, book catering services, or inquire about our offerings in Ile-Ife.',
};

export default function ContactPage() {
  return (
    <div style={{ paddingTop: '80px' }}>
      <ContactSection />
    </div>
  );
}