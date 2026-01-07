import { Bookmark } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function BookmarkButton({ majorId }: { majorId: number }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('bookmarkedMajors');
    if (saved) {
      const ids = JSON.parse(saved) as number[];
      setIsFavorite(ids.includes(majorId));
    }
  }, [majorId]);

  const toggleFavorite = () => {
    const saved = localStorage.getItem('bookmarkedMajors');
    let ids = saved ? (JSON.parse(saved) as number[]) : [];

    if (isFavorite) {
      ids = ids.filter((id) => id !== majorId);
    } else {
      ids.push(majorId);
    }

    localStorage.setItem('bookmarkedMajors', JSON.stringify(ids));
    setIsFavorite(!isFavorite);
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`p-2 rounded-xl transition-colors ${isFavorite ? 'text-amber-500 dark:bg-black bg-amber-50' : 'text-gray-400 hover:text-sky-500  dark:hover:bg-neutral-800 hover:bg-sky-50'}`}
    >
      <Bookmark className="w-5 h-5" />
    </button>
  );
}
