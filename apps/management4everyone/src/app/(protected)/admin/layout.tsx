import { AdminLayout } from '../../_components/admin/AdminLayout';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminLayout>
      <main>{children}</main>
    </AdminLayout>
  );
}
