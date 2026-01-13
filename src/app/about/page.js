import dynamic from 'next/dynamic';
import AboutSection from '@/components/About/AboutSection';

// Lazy load AboutStory since it's below the fold
const AboutStory = dynamic(() => import('@/components/About/AboutStory'), {
  loading: () => <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>
});

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