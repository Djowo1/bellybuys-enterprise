import AboutSection from '@/components/About/AboutSection';
import AboutStory from '@/components/About/AboutStory';

export const metadata = {
  title: 'About Us | BellyBuys Enterprise',
  description: 'Learn about BellyBuys Enterprise - our story, values, and commitment to delivering exceptional culinary experiences in Ile-Ife.',
};

export default function AboutPage() {
  return (
    <>
      <AboutSection />
      <AboutStory />
    </>
  );
}