import MenuSection from '@/components/Menu/MenuSection';
import Banner from '@/components/Common/Banner';

export const metadata = {
  title: 'Menu | BellyBuys Enterprise',
  description: 'Browse our delicious menu featuring authentic Nigerian cuisine, jollof rice, soups, pasta, and more. View prices and order online.',
};

export default function MenuPage() {
  return (
    <>
      <div style={{ paddingTop: '80px' }}>
        <MenuSection />
        <Banner />
      </div>
    </>
  );
}