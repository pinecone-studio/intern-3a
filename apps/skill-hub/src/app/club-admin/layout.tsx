import { SidebarProvider } from '@intern-3a/shadcn';
import SideBarComponent from '../_components/adminPage/SideBarComponent';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="bg-white">
      <SideBarComponent />
      <main>{children}</main>
    </SidebarProvider>
  );
}
