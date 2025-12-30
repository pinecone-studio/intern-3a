import { User } from '@/lib/models/User';
import connectDB from '@/lib/mongodb';
import { createNewClub } from '@/lib/services/club-service';
import { ClassLevelsType, ClubPricesType, NewClubType, ScheduledClubTimesByClassLevelsType, TeachersByClassLevelsType } from '@/lib/utils/types';
import { uploadImageToCloudinary } from '@/lib/utils/uploadImage';
import Ably from 'ably';
import { NextRequest, NextResponse } from 'next/server';
import { checkAuth } from '../check-create-user/route';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const result = await checkAuth();

    if (!result) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { userClerkId } = result;

    const admin = await User.findOne({
      userClerkId: userClerkId,
    });
    console.log({ admin });

    const newFormData = await req.formData();
    const clubCategoryName = newFormData.get('clubCategoryName')?.toString();
    const clubSubCategoryName = newFormData.get('clubSubCategoryName')?.toString();
    const clubName = newFormData.get('clubName')?.toString();

    const selectedClassLevelNames = JSON.parse(newFormData.get('selectedClassLevelNames')?.toString() || '[]') as ClassLevelsType[];
    const clubPricesRaw = JSON.parse(newFormData.get('clubPrices')?.toString() || '{}') as ClubPricesType;
    const scheduledClubTimesRaw = JSON.parse(newFormData.get('scheduledClubTimes')?.toString() || '{}') as ScheduledClubTimesByClassLevelsType;
    const teachersInfoByClassRaw = JSON.parse(newFormData.get('teachersInfoByClass')?.toString() || '{}') as TeachersByClassLevelsType;

    for (const level of selectedClassLevelNames) {
      const file = newFormData.get(`teacherImage_${level}`) as File | null;
      if (file) {
        const url = await uploadImageToCloudinary(file);
        if (teachersInfoByClassRaw[level]) {
          teachersInfoByClassRaw[level].teacherImage = url;
        }
      }
    }

    const clubDescription = newFormData.get('clubDescription')?.toString();
    const clubImage = newFormData.get('clubImage') as File | null;
    const clubAddress = newFormData.get('clubAddress')?.toString();
    const clubLat = parseFloat(newFormData.get('clubLat')?.toString() || 'NaN');
    const clubLong = parseFloat(newFormData.get('clubLong')?.toString() || 'NaN');

    console.log({
      clubCategoryName,
      clubSubCategoryName,
      clubName,
      selectedClassLevelNames,
      clubPricesRaw,
      scheduledClubTimesRaw,
      teachersInfoByClassRaw,
      clubDescription,
      clubImage,
      clubAddress,
      clubLat,
      clubLong,
    });

    if (
      !clubCategoryName ||
      !clubSubCategoryName ||
      !clubName ||
      selectedClassLevelNames.length === 0 ||
      Object.keys(clubPricesRaw).length === 0 ||
      Object.keys(scheduledClubTimesRaw).length === 0 ||
      Object.keys(teachersInfoByClassRaw).length === 0 ||
      !clubDescription ||
      !clubImage ||
      !clubAddress ||
      isNaN(clubLat) ||
      isNaN(clubLong)
    ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let clubImageUrl = '';
    if (clubImage) {
      clubImageUrl = await uploadImageToCloudinary(clubImage);
    }

    const newClubData: NewClubType = {
      clubCategoryName,
      clubSubCategoryName,
      clubName,
      selectedClassLevelNames,
      clubPrices: clubPricesRaw,
      scheduledClubTimes: scheduledClubTimesRaw,
      teachersInfoByClass: teachersInfoByClassRaw,
      clubDescription,
      clubImage: clubImageUrl,
      clubAddress,
      clubLat,
      clubLong,
      adminId: admin._id,
    };

    let clubCreated;

    if (admin.userStatus !== 'ADMIN') {
      return NextResponse.json({ message: 'Forbidden: Only admins can create clubs' }, { status: 403 });
    } else {
      clubCreated = await createNewClub(newClubData);
    }

    const ably = new Ably.Rest({ key: process.env.ABLY_API_KEY });
    await ably.channels.get('clubs').publish({ name: 'club-created', data: clubCreated });

    return NextResponse.json({ message: 'Club info saved successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error while saving club info', error);
    return NextResponse.json(
      {
        message: 'Failed to save club info',
      },
      { status: 500 },
    );
  }
}
