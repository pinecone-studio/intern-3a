import Image from 'next/image';

interface Props {
  club: any;
}

export const SearchBarResults = ({ club }: Props) => {
  return (
    <div className="flex gap-3 p-2 rounded-md hover:bg-muted cursor-pointer">
      <Image src={club.clubImage} alt={club.clubName} width={44} height={44} className="rounded object-cover" />

      <div className="flex flex-col">
        <span className="font-medium text-sm">{club.clubName}</span>
        <span className="text-xs text-muted-foreground">
          {club.clubCategoryName} • {club.clubSubCategoryName}
        </span>
      </div>
    </div>
  );
};
