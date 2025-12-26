import React from 'react';

export const Header = () => {
  return (
    <div className="w-full h-20 bg-blue-950">
      <div className="flex items-center ml-10 h-full">
        <img className="text-white font-bold text-xl w-20 h-20 rounded-full" src="/logo.png" alt="Logo" />
        <span
          className="text-2xl font-extrabold uppercase tracking-wider 
                         text-transparent bg-clip-text bg-gradient-to-r 
                         from-pink-500 via-red-500 to-yellow-400
                         animate-pulse hover:scale-110 transition-transform duration-300"
        >
          Growly
        </span>
        <div></div>
      </div>
    </div>
  );
};
