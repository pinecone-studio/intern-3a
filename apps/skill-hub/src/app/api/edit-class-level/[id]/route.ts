import { NewClub } from '@/lib/models/Club';
import { User } from '@/lib/models/User';
import connectDB from '@/lib/mongodb';
import { NewClubType, TeachersByClassLevelsType } from '@/lib/utils/types';
import Ably from 'ably';
import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { checkAuth } from '../../check-create-user/route';

async function saveFileLocally(file: File, folder = 'teachers') {
  const arrayBuffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);

  const fileName = `${Date.now()}-${file.name}`;
  const uploadDir = path.join(process.cwd(), 'public/uploads', folder);

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, fileName);
  fs.writeFileSync(filePath, uint8Array);

  return `/uploads/${folder}/${fileName}`;
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    const result = await checkAuth();
    if (!result) {
      return NextResponse.json({ message: 'Зөвшөөрөлгүй оролдлого!' }, { status: 401 });
    }

    const { id } = await params;
    const { userClerkId } = result;

    const creator = await User.findOne({ userClerkId }, '_id');
    const adminId = creator?._id;

    const formData = await request.formData();

    const clubCategoryName = formData.get('clubCategoryName') as string;
    const selectedClassLevelNames = JSON.parse(formData.get('selectedClassLevelNames') as string);
    const clubPrices = JSON.parse(formData.get('clubPrices') as string);
    const scheduledClubTimes = JSON.parse(formData.get('scheduledClubTimes') as string);
    const teachersInfoByClass = JSON.parse(formData.get('teachersInfoByClass')?.toString() || '{}') as TeachersByClassLevelsType;

    for (const level of Object.keys(teachersInfoByClass) as (keyof TeachersByClassLevelsType)[]) {
      const teacher = teachersInfoByClass[level] || {};
      teachersInfoByClass[level] = {
        ...teacher,
        teacherImage: typeof teacher?.teacherImage === 'string' ? teacher.teacherImage : undefined,
      };
    }

    for (const level of selectedClassLevelNames) {
      const key = level as keyof TeachersByClassLevelsType;
      const file = formData.get(`teacherImage_${key}`) as File | null;

      if (file instanceof File && file.size > 0) {
        const imageUrl = await saveFileLocally(file);
        teachersInfoByClass[key]!.teacherImage = imageUrl;
      } else {
        const currentImage = teachersInfoByClass[key]?.teacherImage || teachersInfoByClass[key]?.teacherImagePreview;
        teachersInfoByClass[key]!.teacherImage = typeof currentImage === 'string' ? currentImage : undefined;
      }
    }

    const updateData: Partial<NewClubType> = {
      clubCategoryName,
      selectedClassLevelNames,
      clubPrices,
      scheduledClubTimes,
      teachersInfoByClass,
      adminId,
    };

    const updatedClassLevel = await NewClub.findOneAndUpdate({ _id: id }, { $set: updateData }, { new: true });

    if (!updatedClassLevel) {
      return NextResponse.json({ message: 'Дугуйлан олдсонгүй' }, { status: 404 });
    }

    const ably = new Ably.Rest({ key: process.env.ABLY_API_KEY });
    await ably.channels.get('clubs').publish('club-updated', updatedClassLevel);

    return NextResponse.json({
      message: 'Анги амжилттай засагдлаа',
      data: updatedClassLevel,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
