'use client';

import { RegisterLoginAlertDialog } from '@/app/club/_components';
import { ClassLevelsType, getClassLevelMN, NewClubType } from '@/lib/utils/types';
import { SignedIn, SignedOut, useAuth } from '@clerk/nextjs';
import { Badge, Input } from '@intern-3a/shadcn';
import { ArrowLeftToLine, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { toast } from 'sonner';
import { MapCardSkeleton } from './MapCardSkeleton';

type MapSideBarProps = {
  visibleClubs: NewClubType[];
  sidebarOpen: boolean;
  onToggle: () => void;
  hoveredClubId: string | null;
  setHoveredClubId: (id: string | null) => void;
  isLoadingClubs?: boolean;
};
export default function MapSideBar({ visibleClubs, sidebarOpen, onToggle, hoveredClubId, setHoveredClubId, isLoadingClubs = false }: MapSideBarProps) {
  const router = useRouter();
  const [hoveredAddress, setHoveredAddress] = useState<string | null>(null);
  const [hoveredPrice, setHoveredPrice] = useState<{ clubId: string; level: ClassLevelsType } | null>(null);
  const [hoveredHeart, setHoveredHeart] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedFavorites, setSavedFavorites] = useState<string[]>([]);
  const { getToken } = useAuth();

  const filteredClubs = search.trim() === '' ? visibleClubs : visibleClubs.filter((club) => club.clubName.toLowerCase().includes(search.toLowerCase()));

  const handleSaveFavoriteClub = async (clubId: string) => {
    const token = await getToken();

    if (!clubId || savedFavorites.includes(clubId)) return;

    setIsSaving(true);
    try {
      const res = await fetch('/api/my-favorite-clubs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ clubId }),
      });

      if (!res.ok) {
        toast.error('Дугуйланг хадгалахад алдаа гарлаа!');
      }

      setSavedFavorites((prev) => [...prev, clubId]);
      toast.success('Амжилттай хадгалагдлаа! Миний хуудасны хадгалсан дугуйлан хэсгээс харна уу');
    } catch (error) {
      console.error('');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <div className={`fixed left-0 top-0 h-screen bg-white/5 z-20 transition-all duration-300 ${sidebarOpen ? 'w-85' : 'w-0 pointer-events-none'}`}>
        <div onClick={() => router.back()} className="p-6 pl-6">
          <ArrowLeftToLine size={24} className="text-[#0A427A] hover:text-black cursor-pointer" />
        </div>
        <div className="flex items-center ml-4 p-5">
          <ImSearch size={20} className="-mr-8 text-orange-500" />
          <Input type="text" placeholder="Дугуйлангийн нэрээр хайх" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-11" />
        </div>
        <div className="p-5 pl-7 border-b border-t flex justify-between items-center">
          <p className="font-bold cursor-default">
            <span className="hover:text-[#0A427A]">Надад ойр дугуйлан: </span>
            <span className="hover:text-[#0A427A] text-orange-500">{isLoadingClubs ? '...' : filteredClubs.length}</span>
          </p>
        </div>

        <div className="overflow-y-auto overflow-visible h-full flex flex-col gap-1 py-1 px-3">
          {isLoadingClubs
            ? // Skeleton loading state
              Array.from({ length: 3 }).map((_, index) => <MapCardSkeleton key={index} />)
            : filteredClubs.map((club) => {
                const imageSrc = typeof club.clubImage === 'string' ? club.clubImage : '/placeholder.jpg';

                return (
                  <div
                    key={club._id}
                    onMouseEnter={() => club._id && setHoveredClubId(club._id)}
                    onMouseLeave={() => setHoveredClubId(null)}
                    className={`p-4 border-b transition-all duration-200 flex flex-col gap-2 ${hoveredClubId === club._id ? 'bg-white shadow-[0_6px_16px_rgba(0,0,0,0.15)] scale-101' : 'bg-white hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]'}`}
                  >
                    <img onClick={() => router.push(`/club/${club._id}`)} src={imageSrc} className="w-full h-32 aspect-\[16/9]\ object-cover rounded-md cursor-pointer" />
                    <div className="flex justify-between items-center">
                      <p onClick={() => router.push(`/club/${club._id}`)} className="text-[#0A427A] hover:text-black font-bold cursor-pointer">
                        {club.clubName}
                      </p>

                      <SignedOut>
                        <button onClick={() => setShowLoginAlert(true)} onMouseEnter={() => setHoveredHeart(club._id!)} onMouseLeave={() => setHoveredHeart(null)} className="relative cursor-pointer">
                          {hoveredHeart === club._id ? <IoMdHeart size={18} className="text-red-500" /> : <IoMdHeartEmpty size={18} className="text-red-500" />}
                          {hoveredHeart === club._id && <span className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black text-white rounded-lg px-2 py-1.5 z-50 text-xs">Хадгалах</span>}
                        </button>
                      </SignedOut>

                      <SignedIn>
                        <button
                          disabled={isSaving || savedFavorites.includes(club._id!)}
                          onClick={() => club._id && handleSaveFavoriteClub(club._id)}
                          onMouseEnter={() => setHoveredHeart(club._id!)}
                          onMouseLeave={() => setHoveredHeart(null)}
                          className="relative cursor-pointer"
                        >
                          {savedFavorites.includes(club._id!) ? (
                            <IoMdHeart size={18} className="text-red-500" />
                          ) : hoveredHeart === club._id ? (
                            <IoMdHeart size={18} className="text-red-500" />
                          ) : (
                            <IoMdHeartEmpty size={18} className="text-red-500" />
                          )}
                          {hoveredHeart === club._id && !savedFavorites.includes(club._id) && (
                            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black text-white rounded-lg px-2 py-1.5 z-50 text-xs">Хадгалах</span>
                          )}
                        </button>
                      </SignedIn>

                      <RegisterLoginAlertDialog
                        showLoginAlert={showLoginAlert}
                        setShowLoginAlert={setShowLoginAlert}
                        id={club._id!}
                        message={'Дугуйланг хадгалахын тулд эхлээд нэвтрэх шаардлагатай.'}
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-1">
                        {club?.selectedClassLevelNames?.map((level: ClassLevelsType) => (
                          <div key={level} onMouseEnter={() => club._id && setHoveredPrice({ clubId: club._id, level })} onMouseLeave={() => setHoveredPrice(null)} className="relative">
                            <Badge variant={'secondary'} className="text-xs bg-orange-50 font-bold text-orange-600 hover:text-orange-700 cursor-pointer">
                              {getClassLevelMN(level)} анги
                            </Badge>

                            {hoveredPrice?.clubId === club._id && hoveredPrice?.level === level && (
                              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black text-white rounded-lg px-2 py-1.5 z-50">
                                <p className="text-xs">{club?.clubPrices?.[level as keyof typeof club.clubPrices] ?? 0}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div>
                        <MapPin
                          size={18}
                          className="text-[#0A427A] fill-white hover:text-black cursor-pointer"
                          onMouseEnter={() => club._id && setHoveredAddress(club._id)}
                          onMouseLeave={() => setHoveredAddress(null)}
                        />

                        {hoveredAddress === club._id && (
                          <div className="absolute bottom-10 right-0 bg-black text-white rounded-lg px-2 py-1.5 z-50">
                            <p className="text-xs">{club.clubAddress}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>

      <div>
        <div
          onClick={onToggle}
          className={`fixed bg-white p-5 rounded-tr-lg rounded-br-lg top-0 z-3000 transition-all duration-300 cursor-pointer text-[#0A427A] hover:text-black ${sidebarOpen ? 'left-85' : 'left-0'}`}
        >
          {sidebarOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </div>
      </div>
    </div>
  );
}
