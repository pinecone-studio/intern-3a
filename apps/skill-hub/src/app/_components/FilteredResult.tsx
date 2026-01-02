'use client';

import { NewClubType } from '@/lib/utils/types';
import { Button } from '@intern-3a/shadcn';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useClub } from '../hook/use-club';
import Map from './Map';

type FilteredClubsCardProps = {
  filteredClubs: NewClubType[];
  isFiltered: boolean;
  resetFilters: () => void;
};

const FilteredResult = ({ filteredClubs, isFiltered, resetFilters }: FilteredClubsCardProps) => {
  const { isLoading } = useClub();
  const router = useRouter();
  return (
    <div>
      <div>
        {isFiltered && (
          <div className="max-w-6xl mx-auto mt-16">
            <div className="mb-8 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-slate-900">Олдсон дугуйлангууд ({filteredClubs.length})</h3>
              <button onClick={resetFilters} className="px-6 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-700 transition-all">
                Шүүлтүүрийг цэвэрлэх
              </button>
            </div>

            {isLoading ? (
              <div className="text-center py-16 bg-white/50 rounded-2xl border-2 border-slate-200">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
                <p className="text-xl text-slate-600">дугуйлангуудыг хайж байна...</p>
              </div>
            ) : filteredClubs.length === 0 ? (
              <div className="text-center py-16 bg-white/50 rounded-2xl border-2 border-slate-200">
                <p className="text-xl text-slate-600">Таны хайлтад тохирох дугуйлан олдсонгүй</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClubs.map((club) => (
                  <div
                    key={club._id}
                    className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    onClick={() => router.push(`/club/${club._id}`)}
                  >
                    <div className="aspect-video relative overflow-hidden bg-slate-100">
                      {club.clubImage && <img src={typeof club.clubImage === 'string' ? club.clubImage : ''} alt={club.clubName} className="w-full h-full object-cover" />}
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-slate-900 mb-2">{club.clubName}</h4>
                      <p className="text-orange-600 font-semibold mb-2">{club.clubCategoryName}</p>
                      <p className="text-slate-600 text-sm mb-4 line-clamp-2">{club.clubDescription}</p>
                      {club.selectedClassLevelNames && club.selectedClassLevelNames.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {club.selectedClassLevelNames.map((level) => (
                            <span key={level} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full">
                              {level}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="text-sm text-slate-600 mb-2">
                        <strong>Багш:</strong> {club.teacherName}
                      </div>
                      {club.clubAddress && (
                        <div className="text-sm text-slate-600">
                          <strong>Хаяг:</strong> {club.clubAddress}
                        </div>
                      )}
                      <div className="flex justify-between mt-auto">
                        <Link href={`/club/${club._id}`}>
                          <Button className="bg-[#FCB027] hover:bg-[#e69f1c] text-white rounded-full px-5 cursor-pointer">Дэлгэрэнгүй</Button>
                        </Link>

                        <Button className="bg-[#0A427A] hover:bg-[#093662] text-white rounded-full px-5 cursor-pointer" onClick={() => router.push('/register')}>
                          Бүртгүүлэх
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div>
        {isFiltered ? (
          <div className="mt-10" data-scroll-point="map">
            <Map filteredClubs={filteredClubs} />
          </div>
        ) : (
          <div className="m-auto shadow-lg rounded-2xl border-2 border-slate-200  h-50 w-287.5 flex justify-center items-center">
            <p className="text-slate-500 text-lg">Газрын зураг дээр харуулах клуб олдсонгүй</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilteredResult;
