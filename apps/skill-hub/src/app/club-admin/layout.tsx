import { SidebarProvider } from '@intern-3a/shadcn';
import SideBarComponent from '../_components/adminPage/SideBarComponent';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="bg-white ">
      <div className="flex h-[calc(100vh-80px)]">
        <SideBarComponent />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
