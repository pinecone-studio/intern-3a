'use client';

import { useFavoriteClubs } from '@/app/hook/use-favorite-clubs';
import { useUser } from '@clerk/nextjs';
import { Button } from '@intern-3a/shadcn';
import { CircleUser, Heart, Mail, MapPin, MessageSquare, Phone, Save, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Хувийн мэдээлэл');
  const { isLoaded, isSignedIn, user } = useUser();
  const { favoriteClubs, loading } = useFavoriteClubs();

  console.log('Profile Page - Clerk Loaded:', isLoaded);
  console.log('Profile Page - Clerk SignedIn:', isSignedIn);
  console.log('Profile Page - Loading:', loading);
  console.log('Profile Page - Favorite Clubs:', favoriteClubs);
  console.log('Profile Page - Favorite Clubs Length:', favoriteClubs.length);
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="relative h-28 bg-[#0A427A] overflow-hidden">
        <div className="absolute top-[-20%] left-[-5%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-[20%] right-[10%] w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-10 -mt-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-lg">
              <img src={user?.imageUrl} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <button className="absolute bottom-1 right-1 bg-orange-600 p-2 rounded-full text-white shadow-md hover:bg-orange-700 transition">
              <User size={16} />
            </button>
          </div>

          <div className="flex-1 text-center md:text-left text-white md:text-gray-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <h1 className="text-xl font-bold md:text-white">Тавтай морилно уу : {user?.primaryEmailAddress?.emailAddress}</h1>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div
                onClick={() => setActiveTab('Миний Бүртгүүлсэн')}
                className={`cursor-pointer p-3 rounded-xl shadow-sm border flex items-center gap-4 min-w-45 transition-all ${activeTab === 'Миний Бүртгүүлсэн' ? 'bg-orange-50 border-orange-600' : 'bg-white border-gray-100'}`}
              >
                <div className={`p-2 rounded-lg ${activeTab === 'Миний Бүртгүүлсэн' ? 'bg-orange-600 text-white' : 'bg-gray-50 text-[#0A427A]'}`}>
                  <img className="h-10 w-10" src="register.png" alt="" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-500">Миний Бүртгүүлсэн</p>
                  <p className="font-bold text-orange-600">0</p>
                </div>
              </div>

              <div
                onClick={() => setActiveTab('Миний хадгалсан')}
                className={`cursor-pointer p-3 rounded-xl shadow-sm border flex items-center gap-4 min-w-45 transition-all ${activeTab === 'Миний хадгалсан' ? 'bg-orange-50 border-orange-600' : 'bg-white border-gray-100'}`}
              >
                <div className={`p-2 rounded-lg ${activeTab === 'Миний хадгалсан' ? 'bg-orange-600 text-white' : 'bg-gray-50 text-[#0A427A]'}`}>
                  <Heart size={20} />
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-500">Миний хадгалсан</p>
                  <p className="font-bold text-orange-600">{loading ? '...' : favoriteClubs.length}</p>
                </div>
              </div>

              {/* <div
                onClick={() => setActiveTab('Миний сэтгэгдэлүүд')}
                className={`cursor-pointer p-3 rounded-xl shadow-sm border flex items-center gap-4 min-w-45 transition-all ${activeTab === 'Миний сэтгэгдэлүүд' ? 'bg-orange-50 border-orange-600' : 'bg-white border-gray-100'}`}
              >
                <div className={`p-2 rounded-lg ${activeTab === 'Миний сэтгэгдэлүүд' ? 'bg-orange-600 text-white' : 'bg-gray-50 text-[#0A427A]'}`}>
                  <MessageSquare size={20} />
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-500">Миний сэтгэгдэлүүд</p>
                  <p className="font-bold text-orange-600">0</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        <div className="mt-10 pb-20">
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 min-h-100">
            <div className="inline-block border-r-4 border-orange-600 pr-4 mb-10">
              <h2 className="text-lg font-bold text-[#0A427A]">{activeTab === 'Хувийн мэдээлэл' ? 'Хувийн мэдээлэл' : activeTab}</h2>
            </div>

            {activeTab === 'Хувийн мэдээлэл' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="Овог" icon={<User size={18} />} placeholder="овог" />
                <InputGroup label="Өөрийн нэр" icon={<User size={18} />} placeholder="нэр" />
                <InputGroup label="Имэйл хаяг" icon={<Mail size={18} />} placeholder="email" />
                <InputGroup label="Утасны дугаар" icon={<Phone size={18} />} placeholder="Утасны дугаар" />
                <div className="md:col-span-2">
                  <InputGroup label="Хаяг/Байршил" icon={<MapPin size={18} />} placeholder="хаяг" />
                </div>
                <div className="mt-4">
                  <button className="bg-[#0A427A] text-white px-8 py-3 rounded-xl flex items-center gap-3 hover:bg-[#083562] transition shadow-lg shadow-blue-900/20">
                    <Button disabled>Хадгалах</Button>
                    <Save size={18} className="text-orange-600" />
                  </button>
                </div>
              </div>
            ) : activeTab === 'Миний хадгалсан' ? (
              loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
                </div>
              ) : favoriteClubs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteClubs.map((favorite: any) => (
                    <Link
                      key={favorite._id}
                      href={`/club/${favorite.clubId._id}`}
                      className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={favorite.clubId.clubImage || '/placeholder.jpg'}
                          alt={favorite.clubId.clubName}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2">
                          <Heart size={18} className="text-orange-600 fill-orange-600" />
                        </div>
                      </div>
                      <div className="p-4">
                        <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full mb-2">{favorite.clubId.clubCategoryName}</span>
                        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">{favorite.clubId.clubName}</h3>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <MapPin size={14} />
                          <span className="line-clamp-1">{favorite.clubId.clubAddress}</span>
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                  <div className="bg-gray-50 p-6 rounded-full mb-4">
                    <Heart size={48} />
                  </div>
                  <p className="text-lg font-medium">Хадгалсан дугуйлан одоогоор байхгүй байна.</p>
                  <Link href="/map" className="mt-4 text-sm text-[#0A427A] hover:underline">
                    Дугуйлан хайх
                  </Link>
                </div>
              )
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <div className="bg-gray-50 p-6 rounded-full mb-4">
                  {activeTab === 'Миний Бүртгүүлсэн' && <CircleUser size={48} />}
                  {activeTab === 'Миний сэтгэгдэлүүд' && <MessageSquare size={48} />}
                </div>
                <p className="text-lg font-medium">"{activeTab}" хэсэг одоогоор хоосон байна.</p>
                <button onClick={() => setActiveTab('Хувийн мэдээлэл')} className="mt-4 text-sm text-[#0A427A] hover:underline">
                  Буцах
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

interface InputGroupProps {
  label: string;
  icon: React.ReactNode;
  placeholder: string;
}

const InputGroup: React.FC<InputGroupProps> = ({ label, icon, placeholder }) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold text-gray-700 ml-1">{label}</label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-600">{icon}</div>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-600 focus:bg-white outline-none transition text-gray-600 placeholder:text-gray-300"
      />
    </div>
  </div>
);

export default ProfilePage;
