'use client';

import { useCreatedClubs } from '@/app/hook/use-created-club';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@intern-3a/shadcn';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HiOutlineUserCircle } from 'react-icons/hi';

export const SideBarComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedId = searchParams.get('id');
  const [open, setOpen] = useState<boolean>(false);
  const { myCreatedClubs } = useCreatedClubs();

  const handleSelectClub = (id: string | undefined) => {
    router.push(`/club-admin/my-clubs?id=${id}`);
  };

  const handleMyClubs = () => {
    setOpen(!open);

    if (!selectedId && myCreatedClubs?.length > 0) {
      router.push(`/club-admin/my-clubs?id=${myCreatedClubs[0]._id}`);
    }
  };

  const handleAllClubs = () => {
    router.push(`/club-admin/`);
  };

  useEffect(() => {
    if (selectedId) setOpen(true);
  }, [selectedId]);

  return (
    <Sidebar className="sticky top-0 left-0 bottom-0 w-75 h-screen">
      <SidebarContent className="py-5">
        <SidebarGroup className="flex flex-col gap-4 pl-3">
          <div className="flex gap-1 items-center">
            <HiOutlineUserCircle className="w-6 h-6" />

            <SidebarGroupLabel className="text-lg md:text-2xl font-bold leading-7  text-foreground">Миний цонх</SidebarGroupLabel>
          </div>

          <SidebarGroupContent>
            <SidebarMenuItem className="flex flex-col gap-2 ">
              <SidebarMenuButton className="text-md font-normal text-black/70 hover:text-black hover:cursor-pointer" onClick={handleAllClubs}>
                Бүгд
              </SidebarMenuButton>
              <SidebarMenuButton className="text-md font-normal text-black/70 hover:text-black hover:cursor-pointer" onClick={handleMyClubs}>
                <div className="flex justify-between w-81 items-center">
                  <p>Миний үүсгэсэн</p>
                  {open ? <ChevronUp className="w-5" /> : <ChevronDown className="w-5" />}
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenu>
              {open &&
                myCreatedClubs?.map((club) => (
                  <SidebarMenuItem key={club._id} className="pl-4 mt-2">
                    <SidebarMenuButton onClick={() => handleSelectClub(club._id)} className={`justify-start text-left ${selectedId === club._id ? 'bg-gray-100 font-semibold' : ''}`}>
                      {club.clubName}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
