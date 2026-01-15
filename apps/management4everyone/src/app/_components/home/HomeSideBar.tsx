'use client';

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarTrigger } from '@intern-3a/shadcn';

type Props = { open: boolean };

const HomeSideBar = ({ open }: Props) => {
  return (
    <Sidebar className="z-10">
      <SidebarContent className="pt-14 bg-white">
        <SidebarGroup>
          <div className="flex justify-between items-center">
            <SidebarGroupLabel className="text-base font-semibold text-foreground">History</SidebarGroupLabel>
            {open && <SidebarTrigger className="w-6 h-6" />}
          </div>

          <SidebarGroupContent>
            <SidebarMenu></SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default HomeSideBar;
