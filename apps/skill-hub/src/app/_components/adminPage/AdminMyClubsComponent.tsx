'use client';

import { useCreatedClubs } from '@/app/hook/use-created-club';
import { NewClubType } from '@/lib/utils/types';
import { useAuth } from '@clerk/nextjs';
import { Badge, Button } from '@intern-3a/shadcn';
import { ChartBarStacked, MapPin } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import EditMyClubsTrigger from './EditMyClubsTrigger';
import { MyClubCategoryComponent } from './MyClubCategoryComponent';
import ProjectDialog from './ProjectDialog';

const AdminMyClubsComponent = () => {
  const searchParams = useSearchParams();
  const clubId = searchParams.get('id');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { myCreatedClubs } = useCreatedClubs();
  const { getToken } = useAuth();

  const selectedClub: NewClubType | undefined = myCreatedClubs?.find((club) => club._id === clubId);

  if (!selectedClub) return null;

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
    <div className="flex h-screen">
      <div className="flex-1 p-8">
        <div className="flex gap-10">
          <div className="flex flex-col gap-10">
            <div className="w-100 h-100 rounded-lg overflow-hidden">
              <img src={typeof selectedClub.clubImage === 'string' ? selectedClub.clubImage : ''} alt={selectedClub.clubName} className="w-full h-full object-cover" />
            </div>
            {/* {selectedClub && <MyClubCategoryComponent selectedClub={selectedClub} />} */}
          </div>

          <div className="flex flex-col max-w-450 h-100 justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex gap-10 justify-between items-center mb-4">
                <h1 className="text-4xl font-bold text-[#FCB027]">{selectedClub.clubName}</h1>
                <Badge className="bg-[#FCB027]">{selectedClub.clubCategoryName}</Badge>
              </div>
              <p className="flex gap-3 ">
                <ChartBarStacked style={{ color: '#FCB027' }} />

                <span className="font-semibold">Төрөл: </span>
                {selectedClub.clubSubCategoryName}
              </p>
              <p className="flex gap-3 ">
                <MapPin style={{ color: '#FCB027' }} />
                <span className="font-semibold">Хаяг: </span>
                {selectedClub.clubAddress}
              </p>
              <p>{selectedClub.clubDescription}</p>

              <ProjectDialog clubId={clubId} />
            </div>

            <div className="flex justify-end gap-5">
              <Button onClick={handleDeleteClub} disabled={isLoading} className="bg-red-500 hover:bg-red-700 text-sm rounded-lg">
                Дугуйлан устгах
              </Button>
              <EditMyClubsTrigger club={selectedClub} />
            </div>
          </div>
        </div>
        <div className="mt-10">{selectedClub && <MyClubCategoryComponent selectedClub={selectedClub} />}</div>
      </div>
    </div>
  );
};

export default AdminMyClubsComponent;
