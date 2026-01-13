import AdminRedirect from '@/components/Admin/AdminRedirect';

export const metadata = {
  title: 'Admin | BellyBuys Enterprise',
  robots: 'noindex, nofollow',
};

export default function AdminPage() {
  // Keep this as a server component (no "use client" here)
  // Render a small client redirect component to avoid exporting metadata from a client module
  return <AdminRedirect />;
}