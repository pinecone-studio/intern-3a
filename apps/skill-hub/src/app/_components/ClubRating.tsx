'use client';

import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ClubRatingProps {
  clubId: string;
}

export function ClubRating({ clubId }: ClubRatingProps) {
  const [rating, setRating] = useState<number>(0);

  // localStorage-с унших
  useEffect(() => {
    const saved = localStorage.getItem(`club-rating-${clubId}`);
    if (saved) setRating(Number(saved));
  }, [clubId]);

  const handleRate = (value: number) => {
    setRating(value);
    localStorage.setItem(`club-rating-${clubId}`, value.toString());
  };

  return (
    <div className="flex items-center gap-1 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg border border-slate-100">
      {[1, 2, 3, 4, 5].map((star) => (
        <button key={star} onClick={() => handleRate(star)}>
          <Star
            className={`w-5 h-5 transition
              ${star <= rating ? 'fill-orange-500 text-orange-500' : 'text-slate-300 hover:text-orange-400'}`}
          />
        </button>
      ))}

      <span className="ml-2 text-xs font-bold text-slate-600">{rating > 0 ? `${rating}.0` : 'Үнэлэх'}</span>
    </div>
  );
}
