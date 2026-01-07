import { SidebarProvider } from '@intern-3a/shadcn';
import SideBarComponent from '../_components/adminPage/SideBarComponent';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="bg-white h-screen">
      <div className="flex h-full">
        <SideBarComponent />
        <main className="">{children}</main>
      </div>
    </SidebarProvider>
  );
}
