'use client';

import { useCreatedClubs } from '@/app/hook/use-created-club';
import { NewClubType } from '@/lib/utils/types';
import { useAuth } from '@clerk/nextjs';
import { Badge, Button, Skeleton } from '@intern-3a/shadcn';
import { ChartBarStacked, MapPin } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { EditMyClubsTrigger } from './EditMyClubsTrigger';
import { MyClubCategoryComponent } from './MyClubCategoryComponent';
import { ProjectDialog } from './ProjectDialog';

export const AdminMyClubsComponent = () => {
  const searchParams = useSearchParams();
  const clubId = searchParams.get('id');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { myCreatedClubs } = useCreatedClubs();
  const { getToken } = useAuth();

  const selectedClub: NewClubType | undefined = myCreatedClubs?.find((club) => club._id === clubId);

  if (!selectedClub) {
    return (
      <div className="flex h-screen w-full">
        <div className="flex-1 p-8">
          <div className="flex gap-10">
            <div className="flex flex-col gap-10">
              <Skeleton className="w-100 h-100 rounded-lg" />
            </div>
            <div className="flex flex-col w-full max-w-113 justify-between h-100">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center mb-4 gap-3">
                  <Skeleton className="h-10 w-48 " />
                  <Skeleton className="h-6 w-20" />
                </div>
                <div className="flex flex-col gap-3">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-20 w-full mt-2" />
                </div>
                <Skeleton className="h-10 w-32 mt-4" />
              </div>
              <div className="flex justify-end gap-5">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      </div>
    );
  }

  const handleDeleteClub = async () => {
    const confirmed = confirm(`"${selectedClub.clubName}" дугуйланг устгах уу?`);
    if (!confirmed) return;
    try {
      setIsLoading(true);
      const token = await getToken();

      const res = await fetch(`/api/delete-club?clubId=${selectedClub._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        toast.error('Дугуйлан устгахад алдаа гарлаа');
      }

      toast.success('Дугуйлан амжилттай устгагдлаа');
    } catch (error) {
      toast.error('Алдаа гарлаа');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-4 md:p-8">
        {/* Гар утсан дээр дээрээсээ доошоо (flex-col), томоохон дэлгэц дээр хажуугаараа (lg:flex-row) */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-10">
          <div className="flex flex-col gap-6 md:gap-10">
            {/* Зургийн хэмжээг гар утсанд тохируулах (w-full md:w-100) */}
            <div className="w-full md:w-100 h-64 md:h-100 rounded-lg overflow-hidden shrink-0">
              <img src={typeof selectedClub.clubImage === 'string' ? selectedClub.clubImage : ''} alt={selectedClub.clubName} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="flex flex-col w-full max-w-full lg:max-w-450 h-auto lg:h-100 justify-between bg-gray-50 rounded-lg p-5">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-4 justify-between items-start md:items-center mb-4">
                <h1 className="text-2xl md:text-4xl font-bold text-[#FCB027]">{selectedClub.clubName}</h1>
                <Badge className="bg-[#FCB027] shrink-0">{selectedClub.clubCategoryName}</Badge>
              </div>

              <p className="flex gap-3 text-sm md:text-base">
                <ChartBarStacked style={{ color: '#FCB027' }} />
                <span className="font-semibold shrink-0">Төрөл: </span>
                {selectedClub.clubSubCategoryName}
              </p>

              <p className="flex gap-3 text-sm md:text-base">
                <MapPin style={{ color: '#FCB027' }} />
                <span className="font-semibold shrink-0">Хаяг: </span>
                {selectedClub.clubAddress}
              </p>

              <p className="text-sm md:text-base leading-relaxed">{selectedClub.clubDescription}</p>

              <div className="mt-2 mb-2 flex gap-3 flex-wrap">
                <ProjectDialog clubId={clubId} />
              </div>
            </div>

            {/* Товчлуурууд гар утсан дээр бүтэн өргөнөөр харагдах эсвэл зэрэгцэх */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 md:gap-5 mt-6 lg:mt-0">
              <Button onClick={handleDeleteClub} disabled={isLoading} className="bg-red-500 hover:bg-red-700 text-sm rounded-lg w-full sm:w-auto order-2 sm:order-1">
                Дугуйлан устгах
              </Button>
              <div className="w-full sm:w-auto order-1 sm:order-2">
                <EditMyClubsTrigger club={selectedClub} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 overflow-x-auto">{selectedClub && <MyClubCategoryComponent selectedClub={selectedClub} />}</div>
      </div>
    </div>
  );
};
