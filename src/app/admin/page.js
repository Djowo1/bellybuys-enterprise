import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Admin | BellyBuys Enterprise',
  robots: 'noindex, nofollow',
};

export default function AdminPage() {
  // Redirect to login page
  redirect('/admin/login');
}