import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0A427A] text-gray-200 py-12 px-6 sm:px-16 flex flex-col md:flex-row justify-between gap-8 mt-10 h-50">
      <div className="flex flex-col gap-2 flex-1 items-center">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 flex-1">
          <div className="mr-20 flex items-center gap-3">
            <Image src="/logo.png" alt="Logo" width={50} height={50} />
            <Link href="/">
              <span
                className="text-xl sm:text-2xl font-extrabold uppercase tracking-wider
              text-transparent bg-clip-text bg-gradient-to-r
              from-pink-500 via-red-500 to-yellow-400
              hover:scale-110 duration-300 cursor-pointer"
              >
                Growly
              </span>
            </Link>
          </div>
        </div>
        <div className="flex justify-center gap-2">
          <Mail size={20} className="text-gray-300" />
          <span>email: example@example.com</span>
        </div>
        <div className="flex justify-center gap-2 mr-16">
          <Phone size={20} className="text-gray-300" />
          <span>phone: +1234567890</span>
        </div>
      </div>

      <div className="flex flex-col gap-1 flex-1">
        <div className="font-semibold flex items-center gap-2">
          <MapPin size={20} />
          Хаяг / Байршил
        </div>
        <div className="text-sm border-t-2 border-gray-400 border-dotted  mt-5 pt-5">Chinggis Ave 17, 3rd floor Gurvan Gol Office, Ulaanbaatar 14240</div>
      </div>

      <div className="flex flex-col gap-2 flex-1">
        <div className="font-semibold ">Бидэнтэй нэгдэх</div>
        <div className="flex gap-4  text-gray-400 border-t-2 border-dotted mt-4 pt-5  border-gray-400">
          <Facebook size={24} />
          <Instagram size={24} />
          <Twitter size={24} />
        </div>
      </div>
    </footer>
  );
}
