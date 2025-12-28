'use client';

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@intern-3a/shadcn';
import { useRouter } from 'next/navigation';
import React from 'react';

export const SideBarComponent = () => {
  const router = useRouter();

  const handleMyClubs = () => {
    router.push(`/club-admin/my-clubs`);
  };

  const handleAllClubs = () => {
    router.push(`/club-admin/`);
  };
  return (
    <div>
      <Sidebar className=" sticky left-0 top-0">
        <SidebarContent>
          <SidebarGroup className="flex flex-col gap-4">
            <div className="">
              <SidebarGroupLabel className="text-xl leading-7 font-semibold text-foreground">Миний цонх</SidebarGroupLabel>
            </div>

            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem className="flex flex-col gap-2 ">
                  <SidebarMenuButton className="text-md font-normal text-black/70 hover:text-black hover:cursor-pointer" onClick={handleAllClubs}>
                    Бүгд
                  </SidebarMenuButton>
                  <SidebarMenuButton className="text-md font-normal text-black/70 hover:text-black hover:cursor-pointer" onClick={handleMyClubs}>
                    Миний үүсгэсэн
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
};
