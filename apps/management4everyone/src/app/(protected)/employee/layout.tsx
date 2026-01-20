import { EmployeeLayout } from '../../_components/employee/EmployeeLayout';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <EmployeeLayout>
        <main>{children}</main>
      </EmployeeLayout>
    </>
  );
}
