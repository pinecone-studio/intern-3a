'use client';

import { NewClubType } from '@/lib/utils/types';
import { useAuth } from '@clerk/nextjs';
import { Button, DialogContent, DialogFooter, DialogTitle, Input, Label, Textarea } from '@intern-3a/shadcn';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';
import MapSelector from '../MapSelector';

const recommendedClubCategoryNames = ['ART', 'LANGUAGE', 'MUSIC', 'SCIENCE', 'SPORT'];

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  club: NewClubType;
};

export const EditMyClubsDialogContent = ({ setOpen, club }: Props) => {
  const { getToken } = useAuth();

  const [clubCategoryName, setClubCategoryName] = useState<string>('');
  const [clubSubCategoryName, setClubSubCategoryName] = useState('');
  const [clubName, setClubName] = useState('');
  const [clubDescription, setClubDescription] = useState('');
  const [clubAddress, setClubAddress] = useState('');
  const [clubLat, setClubLat] = useState<number | null>(null);
  const [clubLong, setClubLong] = useState<number | null>(null);
  const [clubImage, setClubImage] = useState<File | undefined>();
  const [clubImagePreview, setClubImagePreview] = useState<string>(typeof club.clubImage === 'string' ? club.clubImage : '');

  const [loading, setLoading] = useState(false);
  // const [editedImagePreview, setEditedImagePreview] = useState<string | File | undefined>(club.clubImage); // <=======

  const editedImagePreview: string | File | undefined = club.clubImage;

  useEffect(() => {
    if (!club) return;

    setClubCategoryName(club.clubCategoryName ?? '');
    setClubSubCategoryName(club.clubSubCategoryName ?? '');
    setClubName(club.clubName ?? '');
    setClubDescription(club.clubDescription ?? '');
    setClubAddress(club.clubAddress ?? '');
    setClubLat(club.clubLat ?? null);
    setClubLong(club.clubLong ?? null);
  }, [club]);

  const handleSaveClubInfo = async () => {
    const token = await getToken();
    if (!token) return;

    const form = new FormData();

    form.append('clubCategoryName', clubCategoryName);
    form.append('clubSubCategoryName', clubSubCategoryName);
    form.append('clubName', clubName);
    form.append('clubDescription', clubDescription);
    form.append('clubAddress', clubAddress);
    form.append('clubLat', String(clubLat));
    form.append('clubLong', String(clubLong));

    if (clubImage) form.append('clubImage', clubImage);

    if (editedImagePreview !== club.clubImage && clubImage) {
      form.append('clubImage', clubImage);
    } else if (club.clubImage) {
      form.append('clubImage', club.clubImage);
    }

    setLoading(true);

    const res = await fetch(`/api/edit-club/${club._id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    });

    setLoading(false);

    if (!res.ok) {
      toast.error('Засварлахад алдаа гарлаа');
      return;
    }

    toast.success('Амжилттай засварлагдлаа');
    setOpen(false);
  };

  const handleLocationSelectOnMap = (lat: number, lng: number) => {
    setClubLat(lat);
    setClubLong(lng);
  };

  const imageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setClubImage(file);

    const filePreview = URL.createObjectURL(file);
    setClubImagePreview(filePreview);
  };

  return (
    <DialogContent className="sm:max-w-[95vw] max-h-[90vh] overflow-y-auto">
      <VisuallyHidden>
        <DialogTitle>Дугуйлангийн мэдээлэл засах</DialogTitle>
      </VisuallyHidden>
      <div className="w-full flex flex-col gap-6">
        <div className="flex justify-between">
          <div className="w-1/4 flex flex-col gap-1.5">
            <Label htmlFor="clubCategoryName">Ангилал:</Label>

            <Input
              id="clubCategoryName"
              list="recommendedClubCategoryNames"
              value={clubCategoryName}
              onChange={(e) => {
                setClubCategoryName(e.target.value);
                setClubSubCategoryName('');
              }}
              placeholder="Ангилал сонгох / оруулах"
            />

            <datalist id="recommendedClubCategoryNames">
              {recommendedClubCategoryNames.map((category) => (
                <option key={category} value={category} />
              ))}
            </datalist>
          </div>

          <div className="w-1/4 flex flex-col gap-1.5">
            <Label htmlFor="clubSubCategoryName">Төрөл:</Label>
            <Input
              id="clubSubCategoryName"
              list="recommendedClubSubCategoryNames"
              value={clubSubCategoryName}
              onChange={(e) => setClubSubCategoryName(e.target.value)}
              placeholder="Төрөл сонгох / оруулах"
            />
          </div>

          <div className="w-1/4 flex flex-col gap-1.5">
            <Label htmlFor="clubName">Нэр:</Label>
            <Input id="clubName" value={clubName} onChange={(e) => setClubName(e.target.value)} placeholder="Дугуйлангийн нэр оруулах" />
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="w-3/10 flex flex-col gap-1.5">
          <Label htmlFor="clubDescription">Танилцуулга:</Label>
          <Textarea id="clubDescription" value={clubDescription} onChange={(e) => setClubDescription(e.target.value)} placeholder="Товч танилцуулга оруулах" className="h-65" />
        </div>

        <div className="w-2/3 flex flex-col gap-1.5">
          <Label htmlFor="clubImage">Дугуйлангийн зураг:</Label>

          {clubImagePreview ? (
            <div className="w-full h-65 rounded-md border border-border border-dashed relative overflow-hidden">
              <Image src={clubImagePreview} alt="club image preview" width={440} height={260} className="object-cover w-full h-full" unoptimized />
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setClubImage(undefined);
                  setClubImagePreview('');
                }}
                className="absolute w-9 h-9 rounded-full right-1 top-1"
              >
                <X />
              </Button>
            </div>
          ) : (
            <div className="w-full h-65 bg-gray-800/5 flex justify-center items-center p-4 rounded-md border border-border border-dashed relative">
              <input id="clubImage" type="file" onChange={imageChangeHandler} className="absolute inset-0 opacity-0 cursor-pointer border" />
              <div className="flex flex-col justify-center items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-background flex justify-center items-center">
                  <Upload className="text-muted-foreground" />
                </div>
                <Label className="text-muted-foreground">Choose a file or drag & drop it here</Label>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <div className="w-3/10 flex flex-col gap-1.5">
          <Label>Хаяг:</Label>
          <Textarea value={clubAddress} onChange={(e) => setClubAddress(e.target.value)} placeholder="Хаяг оруулах" />
        </div>

        <div className="w-2/3 flex flex-col gap-1.5">
          <Label>
            Байршил: <span className="text-xs text-muted-foreground">/газрын зурагнаас сонгох/</span>
          </Label>
          <div className="flex gap-1.5">
            <Input type="number" name="clubLat" placeholder="Өргөрөг" value={clubLat || ''} onChange={(e) => setClubLat(Number(e.target.value))} />
            <Input type="number" name="clubLong" placeholder="Уртраг" value={clubLong || ''} onChange={(e) => setClubLong(Number(e.target.value))} />
          </div>

          <MapSelector lat={clubLat || 47.9215} lng={clubLong || 106.9186} setLat={setClubLat} setLng={setClubLong} onLocationSelect={handleLocationSelectOnMap} />
        </div>
      </div>
      <DialogFooter>
        <Button disabled={loading} onClick={handleSaveClubInfo} className="cursor-pointer">
          Мэдээлэл хадгалах
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
